// src/Vaccination.jsx
import React, { useState } from 'react';
import './Vaccination.css';

const Vaccination = () => {
    const [vaccine, setVaccine] = useState({
        vaccineName: '',
        dateGiven: '',
        doseNumber: '',
        nextDueDate: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVaccine({ ...vaccine, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Vaccination Record:', vaccine);
        alert('Vaccination recorded!');
    };

    return (
        <div className="vaccination-container">
            <h2>💉 Vaccination Record</h2>
            <form onSubmit={handleSubmit}>
                <label>Vaccine Name</label>
                <input
                    name="vaccineName"
                    placeholder="e.g., MMR, DTaP, Polio"
                    value={vaccine.vaccineName}
                    onChange={handleChange}
                    required
                />

                <label>Date Given</label>
                <input
                    name="dateGiven"
                    type="date"
                    value={vaccine.dateGiven}
                    onChange={handleChange}
                    required
                />

                <label>Dose Number</label>
                <input
                    name="doseNumber"
                    type="number"
                    min="1"
                    placeholder="e.g., 1, 2, 3"
                    value={vaccine.doseNumber}
                    onChange={handleChange}
                    required
                />

                <label>Next Due Date (Optional)</label>
                <input
                    name="nextDueDate"
                    type="date"
                    value={vaccine.nextDueDate}
                    onChange={handleChange}
                />

                <button type="submit">✅ Record Vaccination</button>
            </form>
        </div>
    );
};

export default Vaccination;