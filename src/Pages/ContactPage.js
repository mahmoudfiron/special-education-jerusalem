import React from 'react';
import './ContactPage.css';

require('../assets/background.avif')

const ContactPage = () => {
  return (
    <div className="contact-page">
      <h1>צור קשר</h1>
      <div className="contact-section">
        <form>
          <div className="form-group">
            <label htmlFor="name">שם:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">אימייל:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">טלפון:</label>
            <input type="tel" id="phone" name="phone" />
          </div>
          <div className="form-group">
            <label htmlFor="message">הודעה:</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button type="submit">שלח</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
