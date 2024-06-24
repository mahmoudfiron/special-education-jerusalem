import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState({});
  const dropdownRefs = useRef({});

  const handleDropdownToggle = (menu) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  const handleMenuItemClick = (path) => {
    setDropdownOpen({});
    navigate(path);
  };

  const handleClickOutside = (event) => {
    Object.keys(dropdownRefs.current).forEach((menu) => {
      if (dropdownRefs.current[menu] && !dropdownRefs.current[menu].contains(event.target)) {
        setDropdownOpen((prevState) => ({
          ...prevState,
          [menu]: false,
        }));
      }
    });
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
        <div className="dropdown" ref={(el) => (dropdownRefs.current['pedagogical-coordination'] = el)}>
          <button onClick={() => handleDropdownToggle('pedagogical-coordination')}>ריכוז פדגוגי</button>
        </div>
        <div className="dropdown" ref={(el) => (dropdownRefs.current['populations'] = el)}>
          <button onClick={() => handleDropdownToggle('populations')}>אוכלוסיות</button>
          {isDropdownOpen['populations'] && (
            <div className="dropdown-menu">
              <button onClick={() => handleMenuItemClick('/early-childhood')}>גיל הרך</button>
              <button onClick={() => handleMenuItemClick('/challenging-behavior')}>התנהגות מאתגרת</button>
              <button onClick={() => handleMenuItemClick('/ana')}>אנ"ה</button>
              <button onClick={() => handleMenuItemClick('/teacher-as-beacon')}>המורה כמגדלור</button>
              <button onClick={() => handleMenuItemClick('/cvi')}>CVI</button>
            </div>
          )}
        </div>
        <div className="dropdown" ref={(el) => (dropdownRefs.current['technopedagogy'] = el)}>
          <button onClick={() => handleDropdownToggle('technopedagogy')}>טכנופדגוגיה</button>
        </div>
        <div className="dropdown" ref={(el) => (dropdownRefs.current['youth-society'] = el)}>
          <button onClick={() => handleDropdownToggle('youth-society')}>חברה ונוער</button>
          {isDropdownOpen['youth-society'] && (
            <div className="dropdown-menu">
              <button onClick={() => handleMenuItemClick('/social-educational-community')}>חינוך חברת ערכי קהילתי</button>
              <button onClick={() => handleMenuItemClick('/shl')}>של"ח</button>
            </div>
          )}
        </div>
        <div className="dropdown" ref={(el) => (dropdownRefs.current['life-preparation'] = el)}>
          <button onClick={() => handleDropdownToggle('life-preparation')}>הכנה לחיים</button>
          {isDropdownOpen['life-preparation'] && (
            <div className="dropdown-menu">
              <button onClick={() => handleMenuItemClick('/transitions')}>מעברים</button>
              <button onClick={() => handleMenuItemClick('/life-preparation-21')}>הכנה לחיים - לב 21</button>
              <button onClick={() => handleMenuItemClick('/social-sexual-education')}>חינוך מיני חברתי</button>
            </div>
          )}
        </div>
        <div className="dropdown" ref={(el) => (dropdownRefs.current['discipline-areas'] = el)}>
          <button onClick={() => handleDropdownToggle('discipline-areas')}>תחומי דעת</button>
          {isDropdownOpen['discipline-areas'] && (
            <div className="dropdown-menu">
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
