import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SharedPage from './SharedPage'; 
import './SignupLogin.css';
import { loginUser, getChildrenByParent} from '../../services/apiService';
import { useUser } from "../../context/UserContext";



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [termsConditions, setTermsConditions] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [userType, setUserType] = useState('patient');
      const { setUser, setChild } = useUser(); // get context setters
    const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await loginUser(email, password, userType);

      let firstChild = null;
      if (userData.role === 'PATIENT') {
        const children = await getChildrenByParent(userData.userId);
        firstChild = children.length > 0 ? children[0] : null;
      }
       // ✅ Update context
      setUser(userData);
      setChild(firstChild);

      // Navigate with state containing user and child
      if (userData.role === 'PATIENT') {
        navigate('/dashboard/patient', { state: { user: userData, child: firstChild } });
      } else if (userData.role === 'DOCTOR') {
        navigate('/dashboard/doctor', { state: { user: userData } });
      }

    } catch (error) {
      console.error(error);
      alert('Invalid credentials or server error');
    }
  };

    return (
        <SharedPage title={`Welcome To Kiddo Health ${userType === 'doctor' ? 'Doctor' : ''}`}>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                
                <div className="form-options">
                    <label>
                        <input
                            type="checkbox"
                            checked={termsConditions}
                            onChange={(e) => setTermsConditions(e.target.checked)}
                            required
                        />
                        I agree to the terms and conditions
                    </label>
                    
                    <Link to="/forgot-password" style={{ fontSize: '0.9em', color: '#007bff', textDecoration: 'none' ,marginLeft: '110px'}}>
                        Forgot Password?
                    </Link>
                </div>
                
                <div className="user-type-selector">
                    <button
                        type="button"
                        className="dropdown-toggle"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        Login as {userType === 'patient' ? 'Patient' : 'Doctor'}
                        <span className="dropdown-arrow">▼</span>
                    </button>
                    
                    {showDropdown && (
                        <div className="dropdown-menu">
                            <button
                                type="button"
                                className={`dropdown-item ${userType === 'patient' ? 'active' : ''}`}
                                onClick={() => {
                                    setUserType('patient');
                                    setShowDropdown(false);
                                }}
                            >
                                Patient
                            </button>
                            <button
                                type="button"
                                className={`dropdown-item ${userType === 'doctor' ? 'active' : ''}`}
                                onClick={() => {
                                    setUserType('doctor');
                                    setShowDropdown(false);
                                }}
                            >
                                Doctor
                            </button>
                        </div>
                    )}
                </div>
                
                <button type="submit" className="login-button">
                    Login
                </button>
                
                <div className="auth-divider">or</div>
                
                <div className="social-login">
                    <button type="button" className="social-button google">
                        Sign in with Google
                    </button>
                    <button type="button" className="social-button apple">
                        Sign in with Apple
                    </button>
                </div>
                
                <div className="auth-switch">
                      Don't have an account? <Link to={`/signup/${userType}`}>Sign Up</Link>
                </div>
            </form>
        </SharedPage>
    );
};

export default Login;