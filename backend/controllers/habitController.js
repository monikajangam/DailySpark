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

// New: Get productive days for the month
exports.getCalendar = async (req, res) => {
  try {
    const { month, year } = req.query;
    const userId = req.user.userId;
    const start = moment(`${year}-${month}-01`).startOf('month');
    const end = start.clone().endOf('month');
    const habits = await Habit.find({ user: userId });
    const daysSet = new Set();
    habits.forEach(habit => {
      habit.completions.forEach(c => {
        const d = moment(c.date);
        if (d.isBetween(start, end, 'day', '[]')) {
          daysSet.add(d.date());
        }
      });
    });
    res.json({ days: Array.from(daysSet) });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// New: Get tracker stats for daily/weekly/yearly
exports.getTracker = async (req, res) => {
  try {
    const { period } = req.query;
    const userId = req.user.userId;
    const habits = await Habit.find({ user: userId });
    let stats = [];
    const now = moment();
    if (period === 'daily') {
      // Last 7 days
      for (let i = 6; i >= 0; i--) {
        const day = now.clone().subtract(i, 'days');
        let count = 0;
        habits.forEach(habit => {
          if (habit.completions.some(c => moment(c.date).isSame(day, 'day'))) count++;
        });
        stats.push(count);
      }
    } else if (period === 'weekly') {
      // Last 7 weeks
      for (let i = 6; i >= 0; i--) {
        const weekStart = now.clone().subtract(i, 'weeks').startOf('week');
        const weekEnd = weekStart.clone().endOf('week');
        let count = 0;
        habits.forEach(habit => {
          if (habit.completions.some(c => moment(c.date).isBetween(weekStart, weekEnd, 'day', '[]'))) count++;
        });
        stats.push(count);
      }
    } else if (period === 'yearly') {
      // Last 7 years
      for (let i = 6; i >= 0; i--) {
        const yearStart = now.clone().subtract(i, 'years').startOf('year');
        const yearEnd = yearStart.clone().endOf('year');
        let count = 0;
        habits.forEach(habit => {
          if (habit.completions.some(c => moment(c.date).isBetween(yearStart, yearEnd, 'day', '[]'))) count++;
        });
        stats.push(count);
      }
    }
    res.json({ stats });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// New: Mark a habit complete for any day
exports.markHabitAnyDay = async (req, res) => {
  try {
    const { date, habit } = req.body;
    const userId = req.user.userId;
    const d = moment(date).startOf('day');
    const habitDoc = await Habit.findOne({ user: userId, name: habit });
    if (!habitDoc) return res.status(404).json({ message: 'Habit not found' });
    if (habitDoc.completions.some(c => moment(c.date).isSame(d, 'day'))) {
      return res.status(400).json({ message: 'Already marked as complete for this day' });
    }
    habitDoc.completions.push({ date: d });
    await habitDoc.save();
    res.json(habitDoc);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// New: Unmark a habit complete for any day
exports.unmarkHabitAnyDay = async (req, res) => {
  try {
    const { date, habit } = req.body;
    const userId = req.user.userId;
    const d = moment(date).startOf('day');
    const habitDoc = await Habit.findOne({ user: userId, name: habit });
    if (!habitDoc) return res.status(404).json({ message: 'Habit not found' });
    habitDoc.completions = habitDoc.completions.filter(c => !moment(c.date).isSame(d, 'day'));
    await habitDoc.save();
    res.json(habitDoc);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Create a new habit for the user
exports.createHabit = async (req, res) => {
  try {
    const { name, icon } = req.body;
    const userId = req.user.userId;
    if (!name) return res.status(400).json({ message: 'Name is required' });
    // Prevent duplicate habit names for the user
    const existing = await Habit.findOne({ user: userId, name });
    if (existing) return res.status(400).json({ message: 'Habit already exists' });
    const habit = new Habit({ user: userId, name, icon: icon || '💧' });
    await habit.save();
    res.status(201).json(habit);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// PATCH: Update completion for a habit by id, date, and completed status
exports.patchHabitCompletion = async (req, res) => {
  try {
    const { habitId } = req.params;
    const { date, completed } = req.body;
    const userId = req.user.userId;
    const d = moment(date).startOf('day');
    const habit = await Habit.findOne({ _id: habitId, user: userId });
    if (!habit) return res.status(404).json({ message: 'Habit not found' });
    const already = habit.completions.some(c => moment(c.date).isSame(d, 'day'));
    if (completed && !already) {
      habit.completions.push({ date: d });
    } else if (!completed && already) {
      habit.completions = habit.completions.filter(c => !moment(c.date).isSame(d, 'day'));
    }
    await habit.save();
    res.json(habit);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 