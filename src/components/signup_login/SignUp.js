import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import SharedPage from './SharedPage';
import './SignupLogin.css';
import { registerParent, registerChild,registerDoctor } from '../../services/apiService';

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
    childGender: ''
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
      savedUser = await registerDoctor(formData);  // <-- call doctor API
    } else {
      savedUser = await registerParent(formData);  // <-- call parent API
    }

    console.log('Saved user:', savedUser);
    setParentId(savedUser.userId);  // or savedUser.id depending on your backend
     if (userType !== 'doctor') setStep(2);
     else navigate('/login/doctor');

  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    setErrorMessage(`Failed to register ${userType}. Please try again.`);
  } finally {
    setLoading(false);
  }
};
/*  try {
    const savedParent = await registerParent(formData);
    console.log('Saved parent:', savedParent);  // <-- log the successful response
setParentId(savedParent.userId);
    setStep(2);
  } catch (error) {
    console.error('Parent registration error:', error.response?.data || error.message);
    setErrorMessage('Failed to register parent. Please try again.');
  } finally {
    setLoading(false);
  }
  };*/



  const handleChildSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await registerChild(parentId, childData);
      setSuccessMessage('Parent and child registered successfully!');
      setChildData({
          identityNumber: '',
         name: '',
        surname: '',
        age: '',
         dateOfBirth: '',
        childGender: ''
      });

      navigate(`/login/${userType === 'doctor' ? 'doctor' : 'patient'}`);

    } catch (error) {
      setErrorMessage('Failed to register child. Please try again.');
      console.log('Submitting doctor data:', formData);

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
            <input type="tel" id="role" name="role"   value={userType.toUpperCase()}  readOnly />
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
            <label htmlFor="identityNumber">Identity Number</label>
            <input type="text" id="identityNumber" name="identityNumber" value={childData.identityNumber} onChange={handleChildChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={childData.name} onChange={handleChildChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Surname</label>
            <input type="text" id="surname" name="surname" value={childData.surname} onChange={handleChildChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input type="number" id="age" name="age" value={childData.age} onChange={handleChildChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input type="date" id="dateOfBirth" name="dateOfBirth" value={childData.dateOfBirth} onChange={handleChildChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="childGender">Gender</label>
            <select id="childGender" name="childGender" value={childData.childGender} onChange={handleChildChange} required>
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
