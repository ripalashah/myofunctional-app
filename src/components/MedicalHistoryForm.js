// src/components/MedicalHistoryForm.js
import React, { useState } from 'react';
import axios from 'axios';

const MedicalHistoryForm = () => {
    const [formData, setFormData] = useState({
        personalInfo: { patientName: '', dob: '', phone: '', email: '', address: '' },
        healthInfo: { physicianName: '', lastPhysicalExam: '', chiefComplaint: '' },
        history: { prematureBirth: false, prenatalHistory: '', developmentalHistory: '', feedingHistory: '' }
    });

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/forms/medical-history', formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            alert(res.data.message);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <h2>Medical History Form</h2>
            <input type="text" name="patientName" placeholder="Patient Name" onChange={onChange} />
            <input type="date" name="dob" placeholder="Date of Birth" onChange={onChange} />
            <input type="text" name="phone" placeholder="Phone" onChange={onChange} />
            <input type="email" name="email" placeholder="Email" onChange={onChange} />
            <input type="text" name="address" placeholder="Address" onChange={onChange} />
            <h3>Health Info</h3>
            <input type="text" name="physicianName" placeholder="Physician Name" onChange={onChange} />
            <input type="date" name="lastPhysicalExam" placeholder="Last Physical Exam" onChange={onChange} />
            <input type="text" name="chiefComplaint" placeholder="Chief Complaint" onChange={onChange} />
            <h3>History</h3>
            <label>Premature Birth:</label>
            <input type="checkbox" name="prematureBirth" onChange={onChange} />
            <input type="text" name="prenatalHistory" placeholder="Prenatal History" onChange={onChange} />
            <input type="text" name="developmentalHistory" placeholder="Developmental History" onChange={onChange} />
            <input type="text" name="feedingHistory" placeholder="Feeding History" onChange={onChange} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default MedicalHistoryForm;
