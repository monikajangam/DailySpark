import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css';
import Footer from '../components/Footer';
import meditationImg from '../meditation.jpg';
import axios from '../api/axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        'Login failed'
      );
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <img src={meditationImg} alt="Meditation" className="auth-illustration" />
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Log in to continue your peaceful journey</p>
        <form onSubmit={handleLogin} className="auth-form">
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
          <button type="submit" className="auth-btn">Login</button>
        </form>
        <div className="auth-links">
          <Link to="/reset-password" className="auth-link">Forgot password?</Link>
          <span> | </span>
          <Link to="/register" className="auth-link">Create an account</Link>
        </div>
        {error && <div className="auth-error">{error}</div>}
      </div>
      <Footer />
    </div>
  );
};

export default Login; 