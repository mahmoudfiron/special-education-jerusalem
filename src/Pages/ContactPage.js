import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './ContactPage.css';

const ContactPage = () => {
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const validateName = (name) => /^[a-zA-Z\u0590-\u05FF\s]+$/.test(name); // Hebrew characters and spaces allowed
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  const sendEmail = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;

    let isValid = true;

    if (!validateName(name)) {
      setNameError('שם חייב להיות באותיות בלבד');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!validateEmail(email)) {
      setEmailError('כתובת אימייל לא תקינה');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (phone && !validatePhone(phone)) {
      setPhoneError('מספר טלפון חייב להיות בן 10 ספרות');
      isValid = false;
    } else {
      setPhoneError('');
    }

    if (isValid) {
      emailjs.sendForm('service_2sfk59c', 'template_wn7jy0e', e.target, '6-OJUc5nQaHSBu_Wa')
        .then((result) => {
          console.log(result.text);
          alert('ההודעה נשלחה בהצלחה!');
        }, (error) => {
          console.log(error.text);
          alert('שליחת ההודעה נכשלה, אנא נסה שוב');
        });

      e.target.reset();
    }
  };

  return (
    <div className="contact-page">
      <h1>צור קשר</h1>
      <div className="contact-section">
        <form onSubmit={sendEmail}>
          <div className="form-group">
            <label className="form-group-text" htmlFor="name">שם:</label>
            <input className="form-group-label" type="text" id="name" name="name" required />
            {nameError && <span className="error">{nameError}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">אימייל:</label>
            <input type="email" id="email" name="email" required />
            {emailError && <span className="error">{emailError}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">טלפון:</label>
            <input type="tel" id="phone" name="phone" />
            {phoneError && <span className="error">{phoneError}</span>}
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
