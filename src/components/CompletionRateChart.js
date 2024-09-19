// src/components/CompletionRateChart.js
import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

const CompletionRateChart = ({ patientId }) => {
    const [chartData, setChartData] = useState({});

    const fetchCompletionRate = async () => {
        try {
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 30);  // Example: Past 30 days

            const res = await axios.get(`http://localhost:5000/api/progress/progress-logs/${patientId}`, {
                params: {
                    startDate: startDate.toISOString(),
                    endDate: new Date().toISOString()
                },
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            const progressLogs = res.data;

            const totalExercises = progressLogs.reduce((acc, log) => acc + log.exercises.length, 0);
            const completedExercises = progressLogs.reduce((acc, log) => acc + log.exercises.filter(ex => ex.status === 'completed').length, 0);
            const skippedExercises = totalExercises - completedExercises;

            setChartData({
                labels: ['Completed', 'Skipped'],
                datasets: [{
                    data: [completedExercises, skippedExercises],
                    backgroundColor: ['#36A2EB', '#FF6384']
                }]
            });
        } catch (error) {
            console.error('Error fetching completion rate:', error);
        }
    };

    useEffect(() => {
        const fetchCompletionRate = async () => {
            // Your fetch logic here
        };
        fetchCompletionRate();
    }, []);  // Empty dependency array means it only runs on mount
    
    return (
        <div>
            <h2>Exercise Completion Rate</h2>
            <Pie data={chartData} />
        </div>
    );
};

export default CompletionRateChart;
