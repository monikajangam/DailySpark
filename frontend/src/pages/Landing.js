import React from 'react';
import Footer from '../components/Footer';
import './Landing.css';
import CalendarCard from '../components/CalendarCard';
import TodayTasks from '../components/TodayTasks';

const Landing = () => {
  return (
    <div className="landing-bg">
      <div className="landing-hero">
        <div className="landing-illustration">
          {/* Placeholder for illustration or logo */}
          <span role="img" aria-label="logo" style={{fontSize: '5rem'}}>🌟</span>
        </div>
        <h1 className="landing-title">Habit Tracker</h1>
        <p className="landing-tagline">Build habits, track progress, and achieve your goals with ease!</p>
        <a href="/register" className="landing-btn">Get Started</a>
      </div>
      <div className="landing-preview" style={{flexDirection: 'column', alignItems: 'center'}}>
        <CalendarCard />
        <TodayTasks />
      </div>
      <Footer />
    </div>
  );
};

export default Landing; 