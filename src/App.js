import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/paitientsPages/topHeader/Header';
import Profile from './components/paitientsPages/topHeader/Profile';
import PatientDashboard from './components/paitientsPages/PatientDashboard';
import DoctorDashboard from './components/doctorPages/DoctorDashboard';
import HealthTips from './components/paitientsPages/topHeader/HealthTips';
import Login from './components/signup_login/Login';  
import SignUp from './components/signup_login/SignUp';
import ForgotPassword from './components/signup_login/ForgotPassword'    

function App() {
  return (
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
            <>
              <Header>
                <Profile />
                <HealthTips />
              </Header>
              <PatientDashboard />
            </>
          } />

           <Route path="/dashboard/doctor" element={
            <>
            
              <DoctorDashboard />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;