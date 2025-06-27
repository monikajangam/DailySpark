const Habit = require('../models/Habit');
const moment = require('moment');

exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.userId });
    res.json(habits);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.markHabitComplete = async (req, res) => {
  try {
    const { habitId } = req.params;
    const today = moment().startOf('day');
    const habit = await Habit.findOne({ _id: habitId, user: req.user.userId });
    if (!habit) return res.status(404).json({ message: 'Habit not found' });
    // Prevent duplicate completion for today
    if (habit.completions.some(c => moment(c.date).isSame(today, 'day'))) {
      return res.status(400).json({ message: 'Already marked as complete for today' });
    }
    habit.completions.push({ date: today });
    await habit.save();
    res.json(habit);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getHabitStats = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.userId });
    const stats = habits.map(habit => {
      const now = moment();
      const startOfMonth = now.clone().startOf('month');
      const completionsThisMonth = habit.completions.filter(c => moment(c.date).isSameOrAfter(startOfMonth));
      // Calculate streak
      let streak = 0;
      let day = now.clone();
      while (completionsThisMonth.some(c => moment(c.date).isSame(day, 'day'))) {
        streak++;
        day.subtract(1, 'day');
      }
      // Completion percentage
      const daysInMonth = now.daysInMonth();
      const completionPercent = (completionsThisMonth.length / daysInMonth) * 100;
      return {
        habitId: habit._id,
        name: habit.name,
        streak,
        completionPercent: Math.round(completionPercent),
        completions: completionsThisMonth.map(c => c.date),
      };
    });
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 