// src/components/PatientDashboard.js
import React from 'react';  // Ensure this import is declared only once

import ProgressChart from './ProgressChart';
import CompletionRateChart from './CompletionRateChart';

const PatientDashboard = ({ patientId }) => {
    return (
        <div>
            <h1>Patient Dashboard</h1>
            <ProgressChart patientId={patientId} />
            <CompletionRateChart patientId={patientId} />
        </div>
    );
};

export default PatientDashboard;
