const mongoose = require('mongoose');

const completionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
});

const habitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  completions: [completionSchema],
});

module.exports = mongoose.model('Habit', habitSchema); 