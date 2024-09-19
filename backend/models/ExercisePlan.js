// backend/models/ExercisePlan.js
const mongoose = require('mongoose');

// Define the Exercise Plan Schema
const ExercisePlanSchema = new mongoose.Schema({
    therapistId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },  // Reference to the therapist
    patientId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },  // Reference to the patient
    exercises: [{
        title: { 
            type: String, 
            required: [true, 'Exercise title is required'] 
        },  // Title of the exercise
        description: { 
            type: String, 
            required: [true, 'Exercise description is required'] 
        },  // Detailed description of the exercise
        mediaUrl: { 
            type: String 
        },  // Optional instructional video or image URL
        frequency: { 
            type: String, 
            required: [true, 'Frequency is required'] 
        },  // Frequency, e.g., "3 times a day"
        duration: { 
            type: Number, 
            required: [true, 'Duration is required'], 
            min: [1, 'Duration must be at least 1 minute'] 
        }  // Duration in minutes, e.g., "5 minutes per session"
    }]
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Export the ExercisePlan model
module.exports = mongoose.model('ExercisePlan', ExercisePlanSchema);
