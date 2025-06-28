import React from 'react';
import './Sidebar.css';

function Sidebar({ user, habits, dueHabits }) {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <aside className="sidebar">
      <div className="sidebar-user">
        <div className="avatar"></div>
        <div>
          <div className="user-name">{user?.name || 'User'}</div>
        </div>
      </div>
      <div className="sidebar-date">{dateStr}</div>
      <div className="sidebar-calendar">
        <div className="calendar-placeholder">Calendar</div>
      </div>
      <div className="sidebar-due">
        <div className="sidebar-due-title">Due This Month</div>
        <ul>
          {dueHabits && dueHabits.length > 0 ? dueHabits.map((habit, i) => (
            <li key={i} className="sidebar-due-item">{habit.name}</li>
          )) : <li>No due habits</li>}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar; 