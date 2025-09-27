// src/MedicalHistory.jsx
import React, { useState } from 'react';
import './MedicalHistory.css';

const MedicalHistory = () => {
    const [history, setHistory] = useState({
        condition: '',
        diagnosisDate: '',
        treatment: '',
        notes: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHistory({ ...history, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Medical History Entry:', history);
        alert('Medical history saved!');
    };

    return (
        <div className="medical-history-container">
            <h2>📚 Medical History</h2>
            <form onSubmit={handleSubmit}>
                <label>Condition or Illness</label>
                <input
                    name="condition"
                    placeholder="e.g., Asthma, Ear Infection, Chickenpox"
                    value={history.condition}
                    onChange={handleChange}
                    required
                />

                <label>Diagnosis Date</label>
                <input
                    name="diagnosisDate"
                    type="date"
                    value={history.diagnosisDate}
                    onChange={handleChange}
                    required
                />

                <label>Treatment or Medication</label>
                <textarea
                    name="treatment"
                    placeholder="e.g., Antibiotics, Inhaler, Rest"
                    value={history.treatment}
                    onChange={handleChange}
                />

                <label>Additional Notes</label>
                <textarea
                    name="notes"
                    placeholder="e.g., Hospitalized in 2022, Recurring symptoms..."
                    value={history.notes}
                    onChange={handleChange}
                />

                <button type="submit">📁 Add to Medical History</button>
            </form>
        </div>
    );
};

export default MedicalHistory;