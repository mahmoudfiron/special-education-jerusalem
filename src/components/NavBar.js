import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleMenuItemClick = (path) => {
    setDropdownOpen(false); // Close the dropdown menu
    navigate(path); // Navigate to the selected page
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="nav-bar-container">
      <nav className="nav-bar">
        <button onClick={() => handleMenuItemClick('/login')}>כניסה</button>
        <button onClick={() => handleMenuItemClick('/contact')}>צור קשר</button>
        <button onClick={() => handleMenuItemClick('/tutorials')}>פורום</button>
        <div className="dropdown" ref={dropdownRef}>
          <button onClick={handleDropdownToggle}>תחומי דעת</button>
          {isDropdownOpen && (
            <div className="dropdown-content">
              <button onClick={() => handleMenuItemClick('/linguistic-education')}>חינוך לשוני</button>
              <button onClick={() => handleMenuItemClick('/math')}>מתמטיקה</button>
              <button onClick={() => handleMenuItemClick('/science')}>מדע וטכנולוגיה</button>
              <button onClick={() => handleMenuItemClick('/english')}>אנגלית</button>
              <button onClick={() => handleMenuItemClick('/art')}>אמנות</button>
              <button onClick={() => handleMenuItemClick('/citizenship')}>אזרחות</button>
              <button onClick={() => handleMenuItemClick('/bible')}>תנ"ך</button>
            </div>
          )}
        </div>
        <button onClick={() => handleMenuItemClick('/')}>דף הבית</button>
        <div className="icon-label" onClick={() => navigate('/feedback')}>
          <FontAwesomeIcon icon={faStar} /> 
        </div>
        <div className="text-label">
            דרגו אותנו
          </div>
      </nav>
    </div>
  );
};

export default NavBar;
