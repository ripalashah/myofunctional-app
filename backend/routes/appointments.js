const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, async (req, res) => {
    try {
        const { patientId, therapistId, date, notes } = req.body;
        const newAppointment = new Appointment({ patientId, therapistId, date, notes });
        await newAppointment.save();
        res.status(201).json({ message: 'Appointment created successfully', newAppointment });
    } catch (error) {
        res.status(500).json({ error: 'Error creating appointment' });
    }
});

router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const appointments = await Appointment.find({ $or: [{ patientId: id }, { therapistId: id }] });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching appointments' });
    }
});

module.exports = router;
