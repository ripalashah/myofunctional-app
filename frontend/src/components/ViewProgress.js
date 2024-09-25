// src/components/ViewProgress.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewProgress = ({ patientId }) => {
    const [progressLogs, setProgressLogs] = useState([]);

    const fetchProgressLogs = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/progress/progress-log/${patientId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setProgressLogs(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProgressLogs();
    }, [patientId]);

    return (
        <div>
            <h2>Progress Logs for Patient {patientId}</h2>
            {progressLogs.map((log, index) => (
                <div key={index}>
                    <p>Session Date: {new Date(log.createdAt).toLocaleDateString()}</p>
                    {log.exercises.map((exercise, i) => (
                        <div key={i}>
                            <p>{exercise.exerciseTitle} - {exercise.status}</p>
                        </div>
                    ))}
                    <p>Session Notes: {log.sessionNotes}</p>
                </div>
            ))}
        </div>
    );
};

export default ViewProgress;
