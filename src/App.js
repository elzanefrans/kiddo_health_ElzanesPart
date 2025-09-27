import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from "./context/UserContext";
import Header from './components/SharedPages/Header';
import Profile from './components/paitientsPages/Profile';
import PatientDashboard from './components/paitientsPages/PatientDashboard';
import DoctorDashboard from './components/doctorPages/DoctorDashboard';
import HealthTips from './components/paitientsPages/HealthTips';
import Login from './components/signup_login/Login';  
import SignUp from './components/signup_login/SignUp';
import ForgotPassword from './components/signup_login/ForgotPassword'



function App() {
  return (
      <UserProvider>
    <Router> 
      <div className="App">
        <Routes>
          {/* SignUp_Login routes */}
            <Route path="/" element={<Login userType="patient" />} />
          <Route path="/login/patient" element={<Login userType="patient" />} />
          <Route path="/login/doctor" element={<Login userType="doctor" />} />
          <Route path="/signup/patient" element={<SignUp userType="patient" />} />
          <Route path="/signup/doctor" element={<SignUp userType="doctor" />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />


        
             {/* Dashboard routes */}
           <Route path="/dashboard/patient" element={
            <Header>
              <PatientDashboard />
            </Header>
          } />

           <Route path="/dashboard/doctor" element={
            <>
              <DoctorDashboard />
            </>
          } />
            {/* Health Tips route */}
          <Route path="/health-tips" element={
            <Header>
              <HealthTips />
            </Header>
          } />
          {/* Profile route */}
            <Route path="/profile" element={
              <Header>
                <Profile />
              </Header>
            } />

        </Routes>
      </div>
    </Router>
    </UserProvider>
  );
}

export default App;