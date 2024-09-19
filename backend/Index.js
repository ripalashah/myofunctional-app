// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  // To use environment variables from .env file

const app = express();

// Middleware
app.use(cors());  // Enable CORS for cross-origin requests
app.use(express.json());  // To handle JSON request bodies

// Connect to MongoDB using connection string from .env or fallback to local MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/myofunctional_therapy_db', {      
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Import and use the user routes
const userRoutes = require('./routes/UserRoutes');
app.use('/api/users', userRoutes);  // Mount the route

// Basic route for checking if the server is running
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Define more routes for your backend here (e.g., for exercises, patients, etc.)

// Start the server on port specified in .env or default to 5001
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
