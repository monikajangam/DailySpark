import React, { useState } from 'react';
import './CalendarCard.css';

const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

const CalendarCard = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const month = today.getMonth();
  const year = today.getFullYear();
  const daysInMonth = getDaysInMonth(month, year);
  const monthName = today.toLocaleString('default', { month: 'long' });

  return (
    <div className="calendar-card">
      <div className="calendar-header">
        <span>{monthName} {year}</span>
      </div>
      <div className="calendar-days">
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const isToday = day === today.getDate();
          const isSelected = day === selectedDate;
          return (
            <button
              key={day}
              className={`calendar-day${isToday ? ' today' : ''}${isSelected ? ' selected' : ''}`}
              onClick={() => setSelectedDate(day)}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarCard; 