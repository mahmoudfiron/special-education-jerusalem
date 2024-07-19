import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleAuth = async (event) => {
    event.preventDefault();
    setMessage('');
    setMessageType('');

    if (isSignUp && password !== confirmPassword) {
      setMessage('Passwords do not match');
      setMessageType('error');
      return;
    }

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: `${firstName} ${lastName}`
        });

        await setDoc(doc(db, 'users', user.uid), {
          email: email,
          role: 'user', // Default role for new users is 'user'
          firstName: firstName,
          lastName: lastName,
          uid: user.uid
        });

        setMessage('יצרת חשבון בהצלחה');
        setMessageType('success');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage('התחברת בהצלחה');
        setMessageType('success');
      }
    } catch (error) {
      console.error('Error during authentication:', error.message);
      if (error.code === 'auth/email-already-in-use') {
        setMessage('החשבון קיים כבר');
      } else {
        setMessage(error.message);
      }
      setMessageType('error');
    }
  };

  const handleCloseMessage = () => {
    setMessage('');
    if (messageType === 'success') {
      navigate('/');
    }
  };

  return (
    <div className="login-page">
      <div className={`overlay ${message ? 'active' : ''}`} />
      <h2>{isSignUp ? 'יצירת חשבון' : 'התחברות לאתר'}</h2>
      <div className="login-container">
        {message && (
          <div className={`message ${messageType}`}>
            <p>{message}</p>
            <button onClick={handleCloseMessage}>Close</button>
          </div>
        )}
        <form onSubmit={handleAuth}>
          {isSignUp && (
            <>
              <div className="form-group">
                <label htmlFor="firstName" dir='rtl'>שם:</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName" dir='rtl'>שם משפחה:</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          <div className="form-group">
            <label htmlFor="email" dir='rtl'>מייל:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" dir='rtl'>סיסמה:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="confirmPassword" dir='rtl'>אמת סיסמה:</label >
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          <button type="submit">{isSignUp ? 'יצירת חשבון' : 'התחבר'}</button>
        </form>
        <button className="toggle-auth" onClick={() => setIsSignUp(!isSignUp)} dir='rtl'>
          {isSignUp ? 'יש לך חשבון ? התחבר' : "אין לך חשבון? יצירת חשבון"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
