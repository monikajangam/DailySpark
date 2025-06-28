import React from 'react';
import './Topbar.css';

function Topbar({ onLogout }) {
  return (
    <header className="topbar">
      <div className="topbar-logo">Habit Tracker</div>
      <nav className="topbar-nav">
        <button className="topbar-icon" title="Profile">
          <span role="img" aria-label="profile">👤</span>
        </button>
        <button className="topbar-icon" title="Settings">
          <span role="img" aria-label="settings">⚙️</span>
        </button>
        <button className="topbar-icon" title="Logout" onClick={onLogout}>
          <span role="img" aria-label="logout">🚪</span>
        </button>
      </nav>
    </header>
  );
}

export default Topbar; 