import React from 'react';
import HabitItem from './HabitItem';

function HabitList({ habits, stats, onComplete }) {
  return (
    <div className="habit-list">
      {habits.map(habit => {
        const stat = stats.find(s => s.habitId === habit._id);
        return (
          <HabitItem
            key={habit._id}
            habit={habit}
            stat={stat}
            onComplete={onComplete}
          />
        );
      })}
    </div>
  );
}

export default HabitList; 