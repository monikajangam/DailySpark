import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Chart({ stats }) {
  const data = {
    labels: stats.map(s => s.name),
    datasets: [
      {
        label: 'Completion % (This Month)',
        data: stats.map(s => s.completionPercent),
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };
  const options = {
    scales: {
      y: { beginAtZero: true, max: 100 },
    },
  };
  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  );
}

export default Chart; 