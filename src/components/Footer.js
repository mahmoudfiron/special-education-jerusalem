import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section contact">
          <h3>צור קשר</h3>
          <p>כתובת:  מרכז פסגה מנח"י. רחוב מרדכי נרקיס 11. ירושלים.92461
          </p>
          <p>טלפון: 02-1234567</p>
          <p>אימייל: homarim556@gmail</p>
        </div>
        <div className="footer-section links">
          <h3>קישורים</h3>
          <ul>
            <li><a href="/privacy-policy">מדיניות פרטיות</a></li>
            <li><a href="/terms-of-service">תנאי שירות</a></li>
            <li><a href="/about">אודות</a></li>
            <li><a href="/contact">צור קשר</a></li>
          </ul>
        </div>
        <div className="footer-section social">
          <h3>עקבו אחרינו</h3>
          <ul>
            <li><a href="https://www.facebook.com/groups/809498406553638" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://www.youtube.com/channel/UCDx-HPB2f5VEKWrnz6ZY8Bg" target="_blank" rel="noopener noreferrer">youtube</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© Mahmoud Faroun, Samer Neiroukh and Wajdi Farawna.</p>
      </div>
    </footer>
  );
};

export default Footer;
