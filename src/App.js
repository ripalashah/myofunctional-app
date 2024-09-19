// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Replace Switch with Routes
import PatientDashboard from './components/PatientDashboard';
import Store from './components/StoreProducts';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>  {/* Replace Switch with Routes */}
                    <Route path="/" element={<h1>Welcome to the Myofunctional Therapy App</h1>} />  {/* Use element prop */}
                    <Route path="/dashboard" element={<PatientDashboard />} />  {/* Update Route */}
                    <Route path="/store" element={<Store />} />  {/* Update Route */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
