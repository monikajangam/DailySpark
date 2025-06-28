import React from 'react';
import './CircularProgress.css';

const CircularProgress = ({ value = 0, label = '', color = '#7f53ac' }) => {
  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="circular-progress-wrapper">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#f3e9fa"
          fill="none"
          strokeWidth={stroke}
          cx={radius}
          cy={radius}
          r={normalizedRadius}
        />
        <circle
          stroke={color}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.5s' }}
        />
      </svg>
      <div className="circular-progress-label">
        <span className="circular-progress-value">{value}%</span>
        <span className="circular-progress-text">{label}</span>
      </div>
    </div>
  );
};

export default CircularProgress; 