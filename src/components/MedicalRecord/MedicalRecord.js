// src/MedicalRecord.jsx
import React, { useState } from 'react';
import './MedicalRecord.css';

const MedicalRecord = () => {
    const [record, setRecord] = useState({
        childName: '',
        dateOfBirth: '',
        bloodType: '',
        allergies: '',
        emergencyContact: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecord({ ...record, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Medical Record Saved:', record);
        alert('Medical record saved!');
    };

    return (
        <div className="medical-record-container">
            <h2>👶 Medical Record</h2>
            <form onSubmit={handleSubmit}>
                <label>Child's Name</label>
                <input
                    name="childName"
                    placeholder="e.g., Liam Chen"
                    value={record.childName}
                    onChange={handleChange}
                    required
                />

                <label>Date of Birth</label>
                <input
                    name="dateOfBirth"
                    type="date"
                    value={record.dateOfBirth}
                    onChange={handleChange}
                    required
                />

                <label>Blood Type</label>
                <input
                    name="bloodType"
                    placeholder="e.g., O-, A+"
                    value={record.bloodType}
                    onChange={handleChange}
                />

                <label>Allergies</label>
                <textarea
                    name="allergies"
                    placeholder="List any known allergies (e.g., peanuts, penicillin)..."
                    value={record.allergies}
                    onChange={handleChange}
                />

                <label>Emergency Contact</label>
                <input
                    name="emergencyContact"
                    placeholder="Name & Phone (e.g., Mom: +1 555-1234)"
                    value={record.emergencyContact}
                    onChange={handleChange}
                    required
                />

                <button type="submit">💾 Save Medical Record</button>
            </form>
        </div>
    );
};

export default MedicalRecord;