import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import meditationImg from '../meditation.jpg';
import Footer from '../components/Footer';
import CircularProgress from '../components/CircularProgress';
import StatCard from '../components/StatCard';
import './Dashboard.css';

const habitsList = [
  { id: 1, label: 'Drink Water 2L', icon: '💧' },
  { id: 2, label: 'Workout', icon: '🏋️‍♂️' },
  { id: 3, label: 'Meditation', icon: '🧘‍♀️' },
  { id: 4, label: 'Read a Book', icon: '📚' },
  { id: 5, label: 'Walk the Dog', icon: '🐕' },
];

const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [habits, setHabits] = useState(habitsList.map(h => ({ ...h, done: false })));
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const daysInMonth = getDaysInMonth(month, year);
  const monthName = today.toLocaleString('default', { month: 'long' });

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleHabit = (id) => {
    setHabits(habits => habits.map(h => h.id === id ? { ...h, done: !h.done } : h));
  };

  // Simple weekly tracker (count of completed habits per day)
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const trackerData = [3, 4, 2, 5, 1, 4, 3]; // Example data

  // Calendar grid logic
  const firstDay = new Date(year, month, 1).getDay(); // 0 (Sun) - 6 (Sat)
  const weekDaysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const calendarRows = [];
  let cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(d);
    if (cells.length === 7) {
      calendarRows.push(cells);
      cells = [];
    }
  }
  if (cells.length) while (cells.length < 7) cells.push(null);
  if (cells.length) calendarRows.push(cells);

  // Example stats
  const dailyGoal = 70; // percent
  const calories = 320; // kcal
  const steps = 6500;
  const screenTime = 2.5; // hours
  const goalStatus = dailyGoal >= 100 ? 'Completed' : 'Yet to complete';

  return (
    <div className="dashboard-bg" style={{ backgroundImage: `url(${meditationImg})` }}>
      <div className="dashboard-overlay">
        <div className="dashboard-topbar">
          <div className="dashboard-title">Habit Tracker</div>
          <button className="dashboard-logout" onClick={handleLogout}>Logout</button>
        </div>
        <div className="dashboard-content">
          {/* Calendar Grid */}
          <div className="dashboard-calendar-card">
            <div className="calendar-header">{monthName} {year}</div>
            <div className="calendar-grid">
              <div className="calendar-weekdays">
                {weekDaysShort.map(day => (
                  <div key={day} className="calendar-weekday">{day}</div>
                ))}
              </div>
              {calendarRows.map((row, i) => (
                <div key={i} className="calendar-row">
                  {row.map((day, j) => (
                    <button
                      key={j}
                      className={`calendar-day${day === today.getDate() ? ' today' : ''}${day === selectedDate ? ' selected' : ''}`}
                      onClick={() => day && setSelectedDate(day)}
                      disabled={!day}
                    >
                      {day || ''}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {/* Daily Goal Circular Progress */}
          <div className="dashboard-goal-section">
            <CircularProgress value={dailyGoal} label="Daily Goal" color="#7f53ac" />
            <div className="dashboard-stat-cards">
              <StatCard icon="🔥" label="Calories Burnt" value={`${calories} kcal`} />
              <StatCard icon="👣" label="Steps" value={steps} />
              <StatCard icon="📱" label="Screen Time" value={`${screenTime} hrs`} />
              <StatCard icon="🎯" label="Goal Status" value={dailyGoal + '%'} status={goalStatus} />
            </div>
          </div>
          {/* Habits and Tracker as before */}
          <div className="dashboard-habits-section">
            <div className="habits-header">Today's Habits</div>
            <div className="habits-list">
              {habits.map(habit => (
                <div key={habit.id} className={`habit-card${habit.done ? ' done' : ''}`}>
                  <span className="habit-icon">{habit.icon}</span>
                  <span className="habit-label">{habit.label}</span>
                  <input
                    type="checkbox"
                    checked={habit.done}
                    onChange={() => toggleHabit(habit.id)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="dashboard-tracker-section">
            <div className="tracker-header">Weekly Tracker</div>
            <div className="tracker-bar-chart">
              {trackerData.map((val, idx) => (
                <div key={idx} className="tracker-bar-item">
                  <div className="tracker-bar" style={{ height: `${val * 18}px` }}></div>
                  <div className="tracker-label">{weekDays[idx]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard; 