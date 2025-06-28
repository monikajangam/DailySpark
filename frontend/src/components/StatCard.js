import React from 'react';
import './StatCard.css';

const StatCard = ({ icon, label, value, status }) => (
  <div className={`stat-card${status === 'Completed' ? ' completed' : ''}`}>
    <span className="stat-icon">{icon}</span>
    <div className="stat-info">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {status && <div className={`stat-status ${status === 'Completed' ? 'completed' : 'pending'}`}>{status}</div>}
    </div>
  </div>
);

export default StatCard; 