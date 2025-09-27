// src/GrowthRecord.jsx
import React, { useState } from 'react';
import './GrowthRecord.css';

const GrowthRecord = () => {
    const [growth, setGrowth] = useState({
        date: '',
        heightCm: '',
        weightKg: '',
        headCircumferenceCm: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGrowth({ ...growth, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Growth Entry:', growth);
        alert('Growth record added!');
    };

    return (
        <div className="growth-record-container">
            <h2>📏 Growth Record</h2>
            <form onSubmit={handleSubmit}>
                <label>Date</label>
                <input
                    name="date"
                    type="date"
                    value={growth.date}
                    onChange={handleChange}
                    required
                />

                <label>Height (cm)</label>
                <input
                    name="heightCm"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 75.5"
                    value={growth.heightCm}
                    onChange={handleChange}
                    required
                />

                <label>Weight (kg)</label>
                <input
                    name="weightKg"
                    type="number"
                    step="0.01"
                    placeholder="e.g., 9.2"
                    value={growth.weightKg}
                    onChange={handleChange}
                    required
                />

                <label>Head Circumference (cm)</label>
                <input
                    name="headCircumferenceCm"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 44.0"
                    value={growth.headCircumferenceCm}
                    onChange={handleChange}
                />

                <button type="submit">📈 Add Growth Entry</button>
            </form>
        </div>
    );
};

export default GrowthRecord;