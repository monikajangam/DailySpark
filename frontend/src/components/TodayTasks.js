import React, { useState } from 'react';
import './TodayTasks.css';

const initialTasks = [
  { id: 1, label: 'Drink Water 2L', icon: '💧', done: false },
  { id: 2, label: 'Workout', icon: '🏋️‍♂️', done: false },
  { id: 3, label: 'Meditation', icon: '🧘‍♀️', done: false },
  { id: 4, label: 'Walk the dog', icon: '🐕', done: false },
  { id: 5, label: 'Read a book', icon: '📚', done: false },
];

const TodayTasks = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (id) => {
    setTasks(tasks => tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  return (
    <div className="today-tasks-card">
      <div className="today-tasks-header">Today's Tasks</div>
      <ul className="today-tasks-list">
        {tasks.map(task => (
          <li key={task.id} className={task.done ? 'done' : ''}>
            <span className="task-icon">{task.icon}</span>
            <span className="task-label">{task.label}</span>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodayTasks; 