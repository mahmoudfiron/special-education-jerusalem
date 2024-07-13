import React from 'react';
import './Footer.css';
import { faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section contact">
          <h3 className="tsour_kesher"> CONTACT </h3>
          <div className="line"></div>
          <p>כתובת:  מרכז פסגה מנח"י. רחוב מרדכי נרקיס 11. ירושלים.92461
          </p>
          <p>טלפון: 02-1234567</p>
          <p dir="rtl">אימייל: homarim556@gmail</p>

        </div>
        <div className="footer-section links">
          <h3> USEFUL LINKS </h3>
          <div className="line"></div>
          <ul>
            <li><a href="/feedback"> דרגו אותנו</a></li>
            <li><a href="/contact">צור קשר</a></li>
          </ul>
        </div>
        <div className="footer-section social">
          <h3>  Follow Us </h3>
          <div className="line"></div>
          <a href="https://www.facebook.com/groups/809498406553638" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a className="yo_icon" href="https://www.youtube.com/channel/UCDx-HPB2f5VEKWrnz6ZY8Bg" color="#cf0000" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faYoutube} size="2x" />
            </a>


        </div>
      </div>
      <div className="footer-bottom">
        <p>© Mahmoud Faroun, Samer Neiroukh and Wajdi Farawna.</p>
      </div>
    </footer>
  );
};

export default Footer;
