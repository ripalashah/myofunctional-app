// backend/models/Appointment.js
const mongoose = require('mongoose');

// Define the Appointment Schema
const AppointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  therapistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model for the therapist
  date: { type: Date, required: true }, // Date of the appointment
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' }, // Status of the appointment
  notes: { type: String }, // Optional field for additional notes
}, {
  timestamps: true // Automatically adds createdAt and updatedAt timestamps
});

// Create the Appointment model from the schema
const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;
