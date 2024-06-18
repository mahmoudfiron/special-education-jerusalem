import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';


require('../assets/background.avif')


const LoginPage = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>{isSignUp ? 'הרשמה' : 'התחברות'}</h2>
        <form>
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="username">שם משתמש:</label>
              <input type="text" id="username" name="username" required />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">אימייל:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">סיסמה:</label>
            <input type="password" id="password" name="password" required />
          </div>
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="confirm-password">אשר סיסמה:</label>
              <input type="password" id="confirm-password" name="confirm-password" required />
            </div>
          )}
          <button type="submit">{isSignUp ? 'הרשם' : 'התחבר'}</button>
        </form>
        <button className="toggle-button" onClick={toggleForm}>
          {isSignUp ? 'כבר יש לך חשבון? התחבר' : 'אין לך חשבון? הרשם'}
        </button>
        <button className="back-button" onClick={() => navigate(-1)}>חזור</button>
      </div>
    </div>
  );
};

export default LoginPage;
