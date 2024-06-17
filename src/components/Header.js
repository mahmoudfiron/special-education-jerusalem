import React from 'react';
import './Header.css';
import logo from '../assets/logo.jpg';
import NavBar from './NavBar';

const Header = () => {
  return (
    <div className="header-container">
      <img src={logo} alt="Logo" className="logo" />
      <NavBar />
    </div>
  );
};

export default Header;
