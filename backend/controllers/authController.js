const User = require('../models/User');
const Habit = require('../models/Habit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const predefinedHabits = [
  'Drink Water 2L',
  'Workout',
  'Meditation',
  'Gardening',
  'Watch Movie',
  'Read Book',
  'Cooking',
  'Listen Music'
];

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    // Create predefined habits for the user
    for (const habitName of predefinedHabits) {
      const habit = new Habit({ user: user._id, name: habitName });
      await habit.save();
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 