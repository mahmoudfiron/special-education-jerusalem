import React from 'react';
import emailjs from 'emailjs-com';
import './ContactPage.css';

const ContactPage = () => {
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_2sfk59c', 'template_wn7jy0e', e.target, '6-OJUc5nQaHSBu_Wa')
      .then((result) => {
          console.log(result.text);
          alert('Message sent successfully!');
      }, (error) => {
          console.log(error.text);
          alert('Failed to send the message, please try again.');
      });

    e.target.reset();
  };

  return (
    <div className="contact-page">
      <h1>צור קשר</h1>
      <div className="contact-section">
        <form onSubmit={sendEmail}>
          <div className="form-group">
            <label className="form-group-text" htmlFor="name">שם:</label>
            <input className="form-group-label" type="text" id="name" name="name" required />
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
