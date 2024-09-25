// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PatientDashboard from './components/PatientDashboard';
import StoreProducts from './components/StoreProducts'; // Ensure this import matches the correct file path
import LogProgress from './components/LogProgress';
import UsersList from './components/UsersList'; // Include other necessary imports

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">Patient Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/users">Users List</Link>
                        </li>
                        <li>
                            <Link to="/store">Store Products</Link>
                        </li>
                        <li>
                            <Link to="/log-progress">Log Progress</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<h1>Welcome to the Myofunctional Therapy App</h1>} />
                    <Route path="/dashboard" element={<PatientDashboard />} />
                    <Route path="/users" element={<UsersList />} />
                    <Route path="/store" element={<StoreProducts />} />
                    <Route path="/log-progress" element={<LogProgress />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
