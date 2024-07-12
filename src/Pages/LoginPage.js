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
  const [role, setRole] = useState('user');
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
          role: role,
          firstName: firstName,
          lastName: lastName,
          uid: user.uid
        });

        setMessage('Signed up successfully!');
        setMessageType('success');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage('Logged in successfully!');
        setMessageType('success');
      }
    } catch (error) {
      console.error('Error during authentication:', error.message);
      if (error.code === 'auth/email-already-in-use') {
        setMessage('Email already exists');
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
      <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
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
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
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
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
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
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="role">Role:</label>
              <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">User</option>
                <option value="guide">Guide</option>
              </select>
            </div>
          )}
          <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
        </form>
        <button className="toggle-auth" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
