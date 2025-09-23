import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faClock, faMapMarkerAlt, faUserCircle, faSearch, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Link , useLocation} from 'react-router-dom';
import logo from '../images/logo.png';
import './Header.css';
import { useUser } from "../../context/UserContext";

const Header = ({ children }) => {
//const { user, child } = useContext(UserContext); 
  // const location = useLocation();
//  const { user, child } = location.state || {}; 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
   const { user, child } = useUser(); 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
 
   // ✅ Greeting logic
  let greetingName = "";
  if (user) {
    if (user.role === "DOCTOR") {
      greetingName = user.firstName;       // Doctor → own name
    } else if (user.role === "PATIENT") {
      greetingName = child ? child.name : user.firstName; // Patient → child’s name (or fallback)
    }
  }

  return (
    <div className="app-layout">
      {/* Header Section */}
      <div className="header-wrapper">
        {/* Top Info Bar */}
        <header className="top-bar">
          <div className="brand">
            <span className="kiddo">KIDDO</span>
            <span className="health">HEALTH</span>
          </div>
          <div className="top-info">
            <div><FontAwesomeIcon icon={faPhone} /> Emergency: (237) 681-812-255</div>
            <div><FontAwesomeIcon icon={faClock} /> 09:00 - 20:00 Everyday</div>
            <div><FontAwesomeIcon icon={faMapMarkerAlt} /> 0123 Some Place</div>
          </div>
        </header>

        {/* Navbar */}
        <nav className="navbar">
          <div className="nav-brand">
            <img src={logo} alt="Kiddo Health Logo" className="logo-img"/>
            <span className="logo-text">Healthcare</span>
          </div>

          <div className="nav-menu">
            <ul>
              <li><Link to="/dashboard/patient">Home</Link></li>
              <li><Link to="/doctors">Doctors</Link></li>
              <li><Link to="/health-tips">Health Tips</Link></li>
              <li><Link to="/about">About</Link></li>
              <li className="profile-item" ref={dropdownRef}>
                <div className="profile-link" onClick={toggleDropdown}>
                  {user && (
                    
                     <span className="greeting">Hi, {greetingName}</span>
                  )}
                  <FontAwesomeIcon icon={faUserCircle} className="profile-icon" />
                  
                  <FontAwesomeIcon icon={faCaretDown} className="dropdown-arrow" />
                  
                </div>
                {isDropdownOpen && (
                  <ul className="dropdown-menu">
                    <li><Link to="/profile">My Account</Link></li>
                    <li><Link to="/settings">Settings</Link></li>
                    <li><Link to="/notifications">Notifications</Link></li>
                     <li>
      <Link to="/login/patient">Log Out</Link>
    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>

          <div className="search-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input type="text" placeholder="Search..." />
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <main className="content-wrapper">
        {children}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-column">
            <h3 className="footer-heading">Product</h3>
            <Link to="/features" className="footer-link">Features</Link>
            <Link to="/pricing" className="footer-link">Pricing</Link>
            <Link to="/integrations" className="footer-link">Integrations</Link>
          </div>
          <div className="footer-column">
            <h3 className="footer-heading">Company</h3>
            <Link to="/about" className="footer-link">About Us</Link>
            <Link to="/careers" className="footer-link">Careers</Link>
            <Link to="/blog" className="footer-link">Blog</Link>
          </div>
          <div className="footer-column">
            <h3 className="footer-heading">Resources</h3>
            <Link to="/help" className="footer-link">Help Center</Link>
            <Link to="/tutorials" className="footer-link">Tutorials</Link>
            <Link to="/webinars" className="footer-link">Webinars</Link>
          </div>
          <div className="footer-column">
            <h3 className="footer-heading">Connect</h3>
            <div className="social-links">
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">LinkedIn</a>
              <a href="#" className="social-link">Facebook</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copyright">© {new Date().getFullYear()} Kiddo Health. All rights reserved.</p>
          <div className="legal-links">
            <Link to="/privacy" className="legal-link">Privacy Policy</Link>
            <Link to="/terms" className="legal-link">Terms of Service</Link>
            <Link to="/cookies" className="legal-link">Cookie Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Header;