import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SharedPage from './SharedPage';
import './SignupLogin.css';
import { getUserByEmail, updateUserPassword } from '../../services/apiService';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('patient');
  const [userData, setUserData] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Step 1: Verify email exists
  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const user = await getUserByEmail(email, role);
      setUserData(user);
    } catch (error) {
      setErrorMessage('No user found with this email');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      await updateUserPassword(userData.userId, newPassword, role);
      setSuccessMessage('Password updated successfully! Redirecting to login...');
      setTimeout(() => navigate(`/login/${role}`), 2000);
    } catch (error) {
      setErrorMessage('Failed to update password. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SharedPage title="Forgot Password">
      {!userData ? (
        <form onSubmit={handleVerifyEmail} className="signup-form">
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Role:</label>
            <select value={role} onChange={e => setRole(e.target.value)}>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
      ) : (
        <form onSubmit={handleResetPassword} className="signup-form">
          <div className="form-group">
            <label>New Password:</label>
            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Password'}
          </button>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </form>
      )}
    </SharedPage>
  );
};

export default ForgotPassword;
