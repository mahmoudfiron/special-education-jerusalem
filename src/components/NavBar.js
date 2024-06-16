import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="nav-bar-container">
      <nav className="nav-bar">
        <button onClick={() => navigate('/')}>דף הבית</button>
        <button onClick={() => navigate('/about')}>אודות</button>
        <button onClick={() => navigate('/tutorials')}>הדרכות</button>
        <button onClick={() => navigate('/contact')}>צור קשר</button>
        <button onClick={() => navigate('/login')}>כניסה</button>
      </nav>
    </div>
  );
};

export default NavBar;
