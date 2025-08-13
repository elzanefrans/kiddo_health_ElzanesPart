import react from 'react';
import './SignupLogin.css';
import logo from '../images/logo.png';

const SharedPage = ({ children }) => {
    return (
        <div className="shared-page">
        <div className="shared-page-header">
            <div className="logo-heading-container">
                    <img src={logo} alt="Kiddo Health Logo" className="logo" />
                    <h1>WELCOME TO KIDDO HEALTH  </h1>
                    <h2>YOUR HEALTH, OUR PRIORITY</h2>
                </div>
        
           </div>
         
            {children}
            
            <div className="shared-page-footer">
                <p>Kiddo Health</p>
                </div>
    
        </div>
    );
}

export default SharedPage;