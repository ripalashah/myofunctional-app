// src/components/LogProgress.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LogProgress = () => {
    const [progressData, setProgressData] = useState({
        exercisePlanId: '',
        exercises: [{ exerciseTitle: '', status: '' }],
        sessionNotes: ''
    });

    const fetchExercisePlan = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/exercise/patient-plan/your-patient-id', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setProgressData({ ...progressData, exercisePlanId: res.data._id, exercises: res.data.exercises.map(ex => ({ exerciseTitle: ex.title, status: '' })) });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchExercisePlan();
    }, []);

    const onChange = (e, index) => {
        const { name, value } = e.target;
        const exercises = [...progressData.exercises];
        exercises[index][name] = value;
        setProgressData({ ...progressData, exercises });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/progress/log-progress', progressData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            alert(res.data.message);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <h2>Log Progress</h2>
            {progressData.exercises.map((exercise, index) => (
                <div key={index}>
                    <label>{exercise.exerciseTitle}</label>
                    <select name="status" value={exercise.status} onChange={(e) => onChange(e, index)}>
                        <option value="">Select Status</option>
                        <option value="completed">Completed</option>
                        <option value="skipped">Skipped</option>
                        <option value="incomplete">Incomplete</option>
                    </select>
                </div>
            ))}
            <textarea name="sessionNotes" placeholder="Session Notes" value={progressData.sessionNotes} onChange={(e) => setProgressData({ ...progressData, sessionNotes: e.target.value })} />
            <button type="submit">Submit Progress</button>
        </form>
    );
};

export default LogProgress;
