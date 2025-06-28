// Utility functions for Habit Tracker

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function calculateStreak(completions) {
  // completions: array of ISO date strings
  if (!completions || completions.length === 0) return 0;
  const today = new Date();
  let streak = 0;
  for (let i = completions.length - 1; i >= 0; i--) {
    const compDate = new Date(completions[i]);
    const diff = Math.floor((today - compDate) / (1000 * 60 * 60 * 24));
    if (diff === streak) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
} 