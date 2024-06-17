import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <div className="nav-bar-container">
      <nav className="nav-bar">
        <button onClick={() => navigate('/')}>דף הבית</button>
        <div 
          className="dropdown"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button>תחומי דעת</button>
          {isDropdownVisible && (
            <div className="dropdown-menu">
              <button onClick={() => navigate('/linguistic-education')}>חינוך לשוני</button>
              <button onClick={() => navigate('/math')}>מתמטיקה</button>
              <button onClick={() => navigate('/science-and-technology')}>מדע וטכנולוגיה</button>
              <button onClick={() => navigate('/english')}>אנגלית</button>
              <button onClick={() => navigate('/art')}>אמנות</button>
              <button onClick={() => navigate('/civics')}>אזרחות</button>
              <button onClick={() => navigate('/bible')}>תנ"ך</button>
            </div>
          )}
        </div>
        <button onClick={() => navigate('/tutorials')}>הדרכות</button>
        <button onClick={() => navigate('/contact')}>צור קשר</button>
        <button onClick={() => navigate('/login')}>כניסה</button>
      </nav>
    </div>
  );
};

export default NavBar;
