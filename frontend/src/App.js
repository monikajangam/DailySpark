import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from './api/axios';
import meditationImg from './meditation.jpg';

// Helper for calendar
const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

const defaultHabitsList = [
  { id: 1, label: 'Drink Water 2L', icon: '💧', done: true },
  { id: 2, label: 'Workout', icon: '🏋️‍♂️', done: false },
  { id: 3, label: 'Meditation', icon: '🧘‍♀️', done: false },
  { id: 4, label: 'Read Book', icon: '📚', done: false },
  { id: 5, label: 'Gardening', icon: '🪴', done: false },
  { id: 6, label: 'Cooking', icon: '👩‍🍳', done: false },
  { id: 7, label: 'Watch Movie', icon: '🎬', done: false },
  { id: 8, label: 'Listen Music', icon: '🎵', done: false },
];

const weekDaysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const habitIconMap = {
  'Drink Water 2L': '💧',
  'Workout': '🏋️',
  'Meditation': '🧘',
  'Gardening': '🪴',
  'Watch Movie': '🎬',
  'Read Book': '📚',
  'Cooking': '🍳',
  'Listen Music': '🎵',
};

function CircularProgress({ value = 0, label = '', color = 'fill-purple-500', textColor = 'text-purple-700' }) {
  const radius = 65; // bigger
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="flex flex-col items-center justify-center relative w-[150px] h-[150px]">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#f3e9fa"
          fill="none"
          strokeWidth={stroke}
          cx={radius}
          cy={radius}
          r={normalizedRadius}
        />
        <motion.circle
          stroke="#a18cd1"
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1 }}
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <span className={`block text-2xl font-bold ${textColor}`}>{value}%</span>
        <span className="block text-base text-purple-500">{label}</span>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, status }) {
  return (
    <motion.div
      className={`flex items-center bg-white rounded-xl shadow p-4 min-w-[160px] mb-2 ${status === 'Completed' ? 'bg-green-50' : ''}`}
      whileHover={{ scale: 1.04 }}
    >
      <span className="text-2xl mr-3">{icon}</span>
      <div className="flex-1">
        <div className="text-purple-500 font-semibold text-sm">{label}</div>
        <div className="text-purple-800 font-bold text-base">{value}</div>
        {status && (
          <div className={`text-xs mt-1 ${status === 'Completed' ? 'text-green-600' : 'text-red-500'}`}>{status}</div>
        )}
      </div>
    </motion.div>
  );
}

function LoginRegister({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      if (email && password) {
        try {
          const res = await axios.post('/auth/login', { email, password });
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('username', email.split('@')[0]);
          localStorage.removeItem('name');
          onLogin();
        } catch (err) {
          setError('Invalid credentials');
        }
      } else {
        setError('Please enter email and password');
      }
    } else {
      if (name && email && password) {
        try {
          const res = await axios.post('/auth/register', { email, password });
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('username', email.split('@')[0]);
          localStorage.setItem('name', name);
          onLogin();
        } catch (err) {
          setError('Registration failed');
        }
      } else {
        setError('Please enter name, email and password');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-sans relative overflow-x-hidden">
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none" style={{ backgroundImage: `url(${require('./meditation.jpg')})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.25 }}></div>
      <div className="fixed inset-0 w-full h-full z-10 pointer-events-none" style={{ background: 'rgba(168,85,247,0.35)' }}></div>
      <div className="relative z-10 w-full flex flex-col items-center">
        <motion.div className="bg-white rounded-2xl shadow p-8 w-full max-w-md flex flex-col items-center" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h2 className="text-2xl font-bold text-purple-700 mb-2">{isLogin ? 'Login' : 'Register'}</h2>
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <input className="rounded-xl border border-purple-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300" type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            )}
            <input className="rounded-xl border border-purple-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input className="rounded-xl border border-purple-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button className="bg-gradient-to-br from-purple-400 to-pink-300 text-white font-semibold rounded-xl px-4 py-2 shadow hover:from-purple-500 transition" type="submit">{isLogin ? 'Login' : 'Register'}</button>
          </form>
          <button className="mt-4 text-purple-500 underline" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'No account? Register' : 'Already have an account? Login'}
          </button>
          {error && <div className="text-red-500 mt-2 text-sm">{error}</div>}
        </motion.div>
        <footer className="w-full text-center py-4 text-purple-400 text-sm font-medium">&copy; {new Date().getFullYear()} _monikaJangam</footer>
      </div>
    </div>
  );
}

// Helper to calculate streak up to a given day
function calculateStreak(productiveDays, upToDay) {
  let streak = 0;
  for (let d = upToDay; d > 0; d--) {
    if (productiveDays.includes(d)) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const [username, setUsername] = useState(localStorage.getItem('name') || localStorage.getItem('username') || 'User');
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const daysInMonth = getDaysInMonth(month, year);
  const monthName = today.toLocaleString('default', { month: 'long' });
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [habits, setHabits] = useState(defaultHabitsList);
  const [showAdd, setShowAdd] = useState(false);
  const [newActivity, setNewActivity] = useState('');
  const [newIcon, setNewIcon] = useState('');
  const [trackerView, setTrackerView] = useState('weekly');
  const [productiveDays, setProductiveDays] = useState([]);
  const [trackerData, setTrackerData] = useState([3, 4, 2, 5, 1, 4, 3]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch calendar and tracker data from backend
  useEffect(() => {
    if (!loggedIn) return;
    const fetchCalendar = async () => {
      try {
        setLoading(true);
        setError('');
        const token = localStorage.getItem('token');
        const res = await axios.get(`/habits/calendar?month=${month + 1}&year=${year}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProductiveDays(res.data.days || []);
      } catch (err) {
        setError('Failed to load calendar data');
      } finally {
        setLoading(false);
      }
    };
    fetchCalendar();
  }, [loggedIn, month, year]);

  const fetchTracker = async () => {
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      const res = await axios.get(`/habits/tracker?period=${trackerView}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTrackerData(res.data.stats || [3, 4, 2, 5, 1, 4, 3]);
    } catch (err) {
      setError('Failed to load tracker data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch habits from backend for the selected date
  const fetchHabits = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/habits', { headers: { Authorization: `Bearer ${token}` } });
      setHabits(res.data.map(h => ({
        id: h._id,
        label: h.name,
        icon: habitIconMap[h.name] || h.icon || '💧',
        done: h.completions.some(c => {
          const d = new Date(c.date);
          return d.getFullYear() === year && d.getMonth() === month && d.getDate() === selectedDate;
        })
      })));
    } catch (err) {
      setError('Failed to load habits');
    }
  };

  useEffect(() => {
    if (loggedIn) fetchHabits();
    // eslint-disable-next-line
  }, [loggedIn, selectedDate, month, year]);

  // Calculate daily goal percentage and status
  const completedCount = habits.filter(h => h.done).length;
  const totalCount = habits.length;
  const dailyGoal = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  // Calendar grid logic
  const firstDay = new Date(year, month, 1).getDay();
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

  // Calories per activity type
  const calorieMap = {
    'Workout': 200,
    'Gym': 200,
    'Cooking': 50,
    'Meditation': 20,
    'Gardening': 80,
    'Walk': 100,
    'Steps': 100,
    'Drink Water 2L': 0,
    'Read Book': 10,
    'Watch Movie': 10,
    'Listen Music': 10,
  };
  const caloriesBurnt = habits.filter(h => h.done).reduce((sum, h) => sum + (calorieMap[h.label] || 10), 0);

  // Handlers
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('name');
    setLoggedIn(false);
  };
  const toggleHabit = async (id) => {
    const habit = habits.find(h => h.id === id);
    if (!habit) return;
    const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
    const token = localStorage.getItem('token');
    // Optimistic UI update
    const updatedHabits = habits.map(h => h.id === id ? { ...h, done: !h.done } : h);
    setHabits(updatedHabits);
    try {
      await axios.patch(`/habits/${id}/complete`, { date, completed: !habit.done }, { headers: { Authorization: `Bearer ${token}` } });
      fetchHabits();
      fetchTracker();
    } catch (err) {
      setHabits(habits); // Rollback UI
      setError('Failed to update goal');
    }
  };

  const handleAddActivity = async () => {
    if (newActivity && newIcon) {
      try {
        const token = localStorage.getItem('token');
        await axios.post('/habits', { name: newActivity, icon: newIcon }, { headers: { Authorization: `Bearer ${token}` } });
        setShowAdd(false);
        setNewActivity('');
        setNewIcon('');
        fetchHabits();
      } catch (err) {
        setError('Failed to add activity');
      }
    }
  };

  // Yearly tracker labels: only up to current year
  const currentYear = new Date().getFullYear();
  const trackerLabels = trackerView === 'yearly'
    ? Array.from({ length: 7 }, (_, i) => String(currentYear - 6 + i))
    : trackerView === 'weekly'
      ? ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7']
      : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Replace the emoji array in the Add Activity form with the following:
  const emojiSuggestions = [
    { icon: '🚶', label: 'Walking / Daily Steps' },
    { icon: '🚴', label: 'Cycling' },
    { icon: '🧹', label: 'Cleaning / Tidying Up' },
    { icon: '🛏️', label: 'Making the Bed / Sleep Hygiene' },
    { icon: '🪥', label: 'Oral Care / Brush Teeth' },
    { icon: '✍️', label: 'Journaling / Writing' },
    { icon: '🖼️', label: 'Drawing / Art / Creativity' },
    { icon: '🥗', label: 'Healthy Eating' },
    { icon: '🪴', label: 'Gardening / Plant Care' },
    { icon: '💻', label: 'Coding / Learning' },
    { icon: '🧑‍💻', label: 'Side Project / Study Session' },
    { icon: '🧺', label: 'Laundry' },
    { icon: '🐕', label: 'Walk the Dog / Pet Care' },
    { icon: '🌳', label: 'Nature Walk' },
    { icon: '📖', label: 'Reading' },
    { icon: '✨', label: 'Gratitude / Positive Reflection' },
    { icon: '⛑️', label: 'Volunteering' },
    { icon: '🩺', label: 'Health Check / Medication' },
    { icon: '🛀', label: 'Self-Care / Bath' },
    { icon: '🚰', label: 'Hydration Reminder' },
  ];

  if (!loggedIn) return <LoginRegister onLogin={() => { setLoggedIn(true); setUsername(localStorage.getItem('name') || localStorage.getItem('username') || 'User'); }} />;

  // Stats array with dynamic dailyGoal (remove Goal Status stat)
  const stats = [
    { icon: '🔥', label: 'Calories Burnt', value: `${caloriesBurnt} kcal` },
    { icon: '👣', label: 'Steps', value: '6500' },
    { icon: '📱', label: 'Screen Time', value: '2.5 hrs' },
    { icon: '🎯', label: 'Goal Completion', value: `${dailyGoal}%` },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center font-sans relative overflow-x-hidden">
      {/* Meditation faded background image */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none" style={{ backgroundImage: `url(${meditationImg})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.25 }}></div>
      {/* Purple overlay for stronger color */}
      <div className="fixed inset-0 w-full h-full z-10 pointer-events-none" style={{ background: 'rgba(168,85,247,0.35)' }}></div>
      {/* Main content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Topbar */}
        <motion.div className="w-full max-w-3xl flex flex-col items-center py-6 px-4" initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-2xl font-bold text-purple-700 tracking-tight">Daily Spark</h1>
          <div className="text-lg text-purple-500 font-semibold mt-1 mb-2">Hello, {username}</div>
          <button className="bg-white text-purple-600 font-semibold rounded-xl px-5 py-2 shadow hover:bg-purple-100 transition self-end" onClick={handleLogout}>Logout</button>
        </motion.div>

        {/* Goal Completion Notification */}
        {dailyGoal === 100 && (
          <motion.div className="w-full max-w-3xl mb-4 bg-green-100 text-green-700 text-center py-3 rounded-xl font-semibold shadow" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            🎉 Congratulations! You have completed your daily goal!
          </motion.div>
        )}

        {/* Stats Grid (compact) */}
        <motion.div className="w-full max-w-3xl grid grid-cols-2 gap-3 mb-4" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          {stats.map((s, i) => (
            <StatCard key={i} {...s} />
          ))}
        </motion.div>

        {/* Calendar */}
        <motion.div className="bg-white rounded-2xl shadow p-6 w-full max-w-3xl mb-6" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold text-purple-600">{monthName} {year}</span>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-1">
            {weekDaysShort.map(day => (
              <div key={day} className="text-center text-xs text-purple-400 font-bold">{day}</div>
            ))}
          </div>
          {calendarRows.map((row, i) => (
            <div key={i} className="grid grid-cols-7 gap-1 mb-1">
              {row.map((day, j) => (
                <button
                  key={j}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition
                    ${day === today.getDate() ? 'border-2 border-purple-400' : ''}
                    ${day === selectedDate ? 'bg-gradient-to-br from-purple-400 to-pink-200 text-white' : 'text-purple-700'}
                    ${!day ? 'opacity-0 cursor-default' : productiveDays.includes(day) ? 'bg-green-200 text-green-700' : 'bg-gray-100 text-gray-400'}`}
                  onClick={() => day && setSelectedDate(day)}
                  disabled={!day}
                  style={{ position: 'relative' }}
                >
                  {day || ''}
                  {/* Streak badge */}
                  {day && productiveDays.includes(day) && (
                    <span style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '-6px',
                      background: '#a18cd1',
                      color: 'white',
                      borderRadius: '50%',
                      fontSize: '0.7em',
                      padding: '0 4px',
                      minWidth: '18px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      boxShadow: '0 1px 4px rgba(127,83,172,0.15)'
                    }} title="Streak up to this day">
                      {calculateStreak(productiveDays, day)}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ))}
          {loading && <div className="text-purple-400 text-center mt-2">Loading...</div>}
          {error && <div className="text-red-500 text-center mt-2">{error}</div>}
        </motion.div>

        {/* Tracker View Toggle */}
        <div className="w-full max-w-3xl flex justify-end mb-2">
          <div className="flex gap-2">
            {['daily', 'weekly', 'yearly'].map(view => (
              <button key={view} className={`px-3 py-1 rounded-full font-semibold text-sm transition ${trackerView === view ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-600'}`} onClick={() => setTrackerView(view)}>{view.charAt(0).toUpperCase() + view.slice(1)}</button>
            ))}
          </div>
        </div>

        {/* Weekly Tracker Bar Chart */}
        <motion.div className="bg-white rounded-2xl shadow p-6 w-full max-w-3xl mb-6" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="text-lg font-semibold text-purple-600 mb-3">{trackerView.charAt(0).toUpperCase() + trackerView.slice(1)} Tracker</div>
          {trackerData.length === 0 || trackerData.every(val => val === 0) ? (
            <div className="text-purple-400 text-center mt-2">No tracker data available.</div>
          ) : (
            <div className="flex items-end gap-4 h-32">
              {trackerData.map((val, idx) => (
                <motion.div key={idx} className="flex flex-col items-center justify-end flex-1" whileHover={{ scale: 1.08 }}>
                  <div className="w-6 rounded-t-lg bg-gradient-to-br from-purple-400 to-pink-200" style={{ height: `${val * 18}px`, minHeight: '4px' }}></div>
                  <div className="text-xs text-purple-500 mt-1">{trackerLabels[idx]}</div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Today's Habits List */}
        <motion.div className="bg-white rounded-2xl shadow p-6 w-full max-w-3xl mb-6" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="text-lg font-semibold text-purple-600 mb-3">Today's Goal</div>
          <div className="grid grid-cols-2 gap-3">
            {habits.map(habit => (
              <motion.div key={habit.id} className={`flex items-center bg-purple-50 rounded-xl px-4 py-3 shadow-sm`} whileHover={{ scale: 1.02 }}>
                <span className="text-2xl mr-4">{habit.icon}</span>
                <span className="flex-1 text-purple-800 font-medium">{habit.label}</span>
                <input type="checkbox" checked={habit.done} onChange={() => toggleHabit(habit.id)} className="w-5 h-5 accent-purple-500" />
              </motion.div>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <button className="bg-gradient-to-br from-purple-400 to-pink-300 text-white font-semibold rounded-xl px-4 py-2 shadow hover:from-purple-500 transition flex items-center gap-2" onClick={() => setShowAdd(true)}>
              + Add Activity
            </button>
          </div>
          {showAdd && (
            <div className="mt-4 flex flex-col gap-2 w-full">
              <div className="flex flex-row gap-2 items-center w-full">
                <input className="rounded-xl border border-purple-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 flex-1" type="text" placeholder="Activity name" value={newActivity} onChange={e => setNewActivity(e.target.value)} />
                <input className="rounded-xl border border-purple-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 w-20 text-center" type="text" placeholder="Icon (emoji)" value={newIcon} onChange={e => setNewIcon(e.target.value)} maxLength={2} />
                <button className="bg-purple-500 text-white font-semibold rounded-xl px-4 py-2 shadow hover:bg-purple-600 transition" onClick={handleAddActivity}>Add</button>
                <button className="ml-2 text-purple-400 underline" onClick={() => setShowAdd(false)}>Cancel</button>
              </div>
              <div className="flex flex-wrap gap-2 justify-center mt-1 max-w-2xl mx-auto">
                {emojiSuggestions.map(({icon, label}) => (
                  <button key={icon} type="button" className={`text-2xl rounded hover:bg-purple-100 ${newIcon === icon ? 'ring-2 ring-purple-400' : ''}`} onClick={() => setNewIcon(icon)} title={label}>{icon}</button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
      <footer className="fixed bottom-0 left-0 w-full text-center py-3 text-white text-sm font-medium z-50" style={{background: 'rgba(168,85,247,0.7)'}}>
        © 2024 Daily Spark
      </footer>
    </div>
  );
}
