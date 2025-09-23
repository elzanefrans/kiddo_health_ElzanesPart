import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import SharedPage from './SharedPage';
import './SignupLogin.css';
import { registerParent, registerChild, registerDoctor } from '../../services/apiService';

const SignUp = ({ userType }) => {
  const [step, setStep] = useState(1); // Step 1 = parent form, Step 2 = child form
  const [parentId, setParentId] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    number: '',
    role: userType.toUpperCase(),
    username: '',
    password: '',
    ...(userType === 'doctor'
      ? { licenseNumber: '', specialization: '' }
      : { address: '' })
  });

  const [childData, setChildData] = useState({
    childIdentityNumber: '',
    childName: '',
    childSurname: '',
    childAge: '',
    childDOB: '',
    gender: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleChildChange = (e) => {
    const { name, value } = e.target;
    setChildData(prev => ({ ...prev, [name]: value }));
  };

  const handleParentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      let savedUser;
      if (userType === 'doctor') {
        savedUser = await registerDoctor(formData);
      } else {
        savedUser = await registerParent(formData);
      }

      console.log('Saved user:', savedUser);
      setParentId(savedUser.userId); // adjust based on backend
      if (userType !== 'doctor') setStep(2);
      else navigate('/login/doctor');

    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      setErrorMessage(`Failed to register ${userType}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleChildSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    // Validate age <= 10
    if (parseInt(childData.childAge) > 10) {
      setErrorMessage('Child must be 10 years old or younger.');
      setLoading(false);
      return;
    }

    // Validate ID matches DOB (assuming South African ID: YYMMDD...)
    const id = childData.childIdentityNumber;
    const dob = new Date(childData.childDOB);
    const idYear = id.substring(0, 2);
    const idMonth = id.substring(2, 4);
    const idDay = id.substring(4, 6);
    const dobYear = dob.getFullYear().toString().substring(2);
    const dobMonth = (dob.getMonth() + 1).toString().padStart(2, '0');
    const dobDay = dob.getDate().toString().padStart(2, '0');

    if (idYear !== dobYear || idMonth !== dobMonth || idDay !== dobDay) {
      setErrorMessage('Identity number does not match the date of birth.');
      setLoading(false);
      return;
    }

    try {
      await registerChild(parentId, {
        identityNumber: childData.childIdentityNumber,
        name: childData.childName,
        surname: childData.childSurname,
        age: parseInt(childData.childAge),
        dateOfBirth: childData.childDOB,
        gender: childData.gender
      });

      setSuccessMessage('Parent and child registered successfully!');
      setChildData({
        childIdentityNumber: '',
        childName: '',
        childSurname: '',
        childAge: '',
        childDOB: '',
        gender: ''
      });

      navigate(`/login/${userType === 'doctor' ? 'doctor' : 'patient'}`);
    } catch (error) {
      setErrorMessage('Failed to register child. Please try again.');
      console.log('Submitting child data error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SharedPage title="Sign Up">
      {step === 1 && (
        <form onSubmit={handleParentSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Surname</label>
            <input type="text" id="surname" name="surname" value={formData.surname} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="number">Phone Number</label>
            <input type="tel" id="number" name="number" value={formData.number} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input type="text" id="role" name="role" value={userType.toUpperCase()} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          {userType === 'doctor' && (
            <>
              <div className="form-group">
                <label htmlFor="licenseNumber">License Number</label>
                <input type="text" id="licenseNumber" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="specialization">Specialization</label>
                <input type="text" id="specialization" name="specialization" value={formData.specialization} onChange={handleChange} required />
              </div>
            </>
          )}

          {userType !== 'doctor' && (
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
            </div>
          )}

          <button type="submit" className="signUp-button" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>

          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleChildSubmit} className="signup-form">
          <h3>Register Child</h3>
          <div className="form-group">
            <label htmlFor="childIdentityNumber">Identity Number</label>
            <input type="text" id="childIdentityNumber" name="childIdentityNumber" value={childData.childIdentityNumber} onChange={handleChildChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="childName">Name</label>
            <input type="text" id="childName" name="childName" value={childData.childName} onChange={handleChildChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="childSurname">Surname</label>
            <input type="text" id="childSurname" name="childSurname" value={childData.childSurname} onChange={handleChildChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="childAge">Age</label>
            <input type="number" id="childAge" name="childAge" value={childData.childAge} onChange={handleChildChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="childDOB">Date of Birth</label>
            <input type="date" id="childDOB" name="childDOB" value={childData.childDOB} onChange={handleChildChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select id="gender" name="gender" value={childData.gender} onChange={handleChildChange} required>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <button type="submit" className="signUp-button" disabled={loading}>
            {loading ? 'Registering Child...' : 'Register Child'}
          </button>

          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
      )}

      {step === 1 && (
        <>
          <div className="auth-divider">or</div>
          <div className="social-login">
            <button type="button" className="social-button google">Sign in with Google</button>
            <button type="button" className="social-button apple">Sign in with Apple</button>
          </div>
          <div className="auth-switch">
            Already have an account? <Link to={`/login/${userType === 'doctor' ? 'doctor' : 'patient'}`}>Login here</Link>
          </div>
        </>
      )}
    </SharedPage>
  );
};

export default SignUp;
