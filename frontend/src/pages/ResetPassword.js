import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
import Footer from '../components/Footer';
import meditationImg from '../meditation.jpg';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = (e) => {
    e.preventDefault();
    // TODO: Add reset password logic
    setMessage('If this email exists, a reset link will be sent.');
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <img src={meditationImg} alt="Meditation" className="auth-illustration" />
        <h2 className="auth-title">Reset Password</h2>
        <p className="auth-subtitle">Enter your email to receive a reset link</p>
        <form onSubmit={handleReset} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="auth-input"
          />
          <button type="submit" className="auth-btn">Send Reset Link</button>
        </form>
        {message && <div className="auth-message">{message}</div>}
        <div className="auth-links">
          <Link to="/login" className="auth-link">Back to Login</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword; 