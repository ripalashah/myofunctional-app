// backend/routes/appointments.js
const sendEmail = require('../utils/sendEmail');
// backend/routes/appointments.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const authMiddleware = require('../middleware/auth');

// Create a new appointment
router.post('/', authMiddleware, async (req, res) => {
    const { patientId, therapistId, date, time, notes } = req.body;
    try {
        const newAppointment = new Appointment({ patientId, therapistId, date, time, notes });
        await newAppointment.save();
        res.status(201).json({ message: 'Appointment created successfully', newAppointment });
    } catch (error) {
        res.status(500).json({ error: 'Error creating appointment' });
    }
});

// Fetch appointments by patient or therapist
router.get('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const appointments = await Appointment.find({ $or: [{ patientId: id }, { therapistId: id }] });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching appointments' });
    }
});

// Update an appointment
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: 'Appointment updated successfully', updatedAppointment });
    } catch (error) {
        res.status(500).json({ error: 'Error updating appointment' });
    }
});

// Delete an appointment
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting appointment' });
    }
});

module.exports = router;

router.post('/confirm-appointment', async (req, res) => {
    const { patientEmail, appointmentDate } = req.body;

    try {
        // Send email confirmation
        const subject = 'Appointment Confirmation';
        const text = `Your appointment has been confirmed for ${appointmentDate}. Please arrive 10 minutes early.`;
        await sendEmail(patientEmail, subject, text);

        res.status(200).json({ message: 'Appointment confirmed and email sent' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send appointment confirmation' });
    }
});
