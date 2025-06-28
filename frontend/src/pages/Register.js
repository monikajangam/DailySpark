import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css';
import Footer from '../components/Footer';
import meditationImg from '../meditation.jpg';
import axios from '../api/axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('/auth/register', { name, email, password });
      navigate('/login');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        'Registration failed'
      );
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <img src={meditationImg} alt="Meditation" className="auth-illustration" />
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Start your peaceful habit journey</p>
        <form onSubmit={handleRegister} className="auth-form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="auth-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="auth-input"
          />
          <button type="submit" className="auth-btn">Register</button>
        </form>
        <div className="auth-links">
          <Link to="/login" className="auth-link">Already have an account? Login</Link>
        </div>
        {error && <div className="auth-error">{error}</div>}
      </div>
      <Footer />
    </div>
  );
};

export default Register; 