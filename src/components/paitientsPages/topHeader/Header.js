import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faClock, faMapMarkerAlt, faUserCircle, faSearch, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import logo from '../../images/logo.png';
import './Header.css';

const Header = ({ children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
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

  return (
    <div className="header-container">
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
            <li><a href="#">Home</a></li>
            <li><a href="#">Doctors</a></li>
            <li><a href="#">Health Tips</a></li>
            <li><a href="#">About</a></li>
            <li className="profile-item" ref={dropdownRef}>
              <div className="profile-link" onClick={toggleDropdown}>
                <FontAwesomeIcon icon={faUserCircle} className="profile-icon" />
                <span>Profile</span>
                <FontAwesomeIcon icon={faCaretDown} className="dropdown-arrow" />
              </div>
              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  <li><a href="#">My Account</a></li>
                  <li><a href="#">Settings</a></li>
                  <li><a href="#">Notifications</a></li>
                  <li><a href="#">Log Out</a></li>
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

      {children}
    </div>
  );
};

export default Header;