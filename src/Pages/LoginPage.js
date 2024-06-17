import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>התחברות</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">שם משתמש:</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">סיסמה:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">התחבר</button>
        </form>
        <button className="back-button" onClick={() => navigate(-1)}>חזור</button>
      </div>
    </div>
  );
};

export default LoginPage;
