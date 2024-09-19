// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User Schema
const UserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Name is required'] 
    },  // User's name
    email: { 
        type: String, 
        required: [true, 'Email is required'], 
        unique: true, 
        lowercase: true, 
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] // Basic email validation
    },  // User's email, must be unique
    password: { 
        type: String, 
        required: [true, 'Password is required'], 
        minlength: [6, 'Password must be at least 6 characters long'] 
    },  // Hashed password
    role: { 
        type: String, 
        enum: ['patient', 'therapist', 'referral-source'], 
        required: [true, 'User role is required'] 
    },  // Role of the user, restricted to specific values
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Middleware to hash the password before saving the user
UserSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();
    
    try {
        // Hash the password with a salt round of 10
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error); // Pass errors to the next middleware
    }
});

// Method to compare entered password with hashed password in the database
UserSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Export the User model
module.exports = mongoose.model('User', UserSchema);
