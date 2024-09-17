// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'patient' });

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            alert('User registered');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input type="text" name="name" value={formData.name} onChange={onChange} placeholder="Name" required />
            <input type="email" name="email" value={formData.email} onChange={onChange} placeholder="Email" required />
            <input type="password" name="password" value={formData.password} onChange={onChange} placeholder="Password" required />
            <select name="role" value={formData.role} onChange={onChange}>
                <option value="patient">Patient</option>
                <option value="therapist">Therapist</option>
                <option value="referral-source">Referral Source</option>
            </select>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
