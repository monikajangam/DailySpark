import React from 'react';

function HabitItem({ habit, stat, onComplete }) {
  return (
    <div className="habit-item">
      <h3>{habit.name}</h3>
      <p>Current Streak: {stat?.streak || 0}</p>
      <p>Completion: {stat ? stat.completionPercent : 0}%</p>
      <button onClick={() => onComplete(habit._id)} disabled={stat && stat.completions.some(date => new Date(date).toDateString() === new Date().toDateString())}>
        {stat && stat.completions.some(date => new Date(date).toDateString() === new Date().toDateString()) ? 'Completed Today' : 'Mark as Complete'}
      </button>
    </div>
  );
}

export default HabitItem; 