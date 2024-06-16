import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section contact">
          <h3>צור קשר</h3>
          <p>כתובת: רחוב החינוך 123, ירושלים</p>
          <p>טלפון: 02-1234567</p>
          <p>אימייל: info@special-education-jerusalem.org</p>
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
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2023 כל הזכויות שמורות למערכת הדרכה ופיקוח לחינוך מיוחד בירושלים</p>
      </div>
    </footer>
  );
};

export default Footer;
