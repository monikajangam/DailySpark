const express = require('express');
const router = express.Router();
const { getHabits, markHabitComplete, getHabitStats, getCalendar, getTracker, markHabitAnyDay, unmarkHabitAnyDay, createHabit } = require('../controllers/habitController');
const auth = require('../middleware/auth');

router.get('/', auth, getHabits);
router.post('/:habitId/complete', auth, markHabitComplete);
router.get('/stats', auth, getHabitStats);

// New endpoints for calendar, tracker, and flexible completion
router.get('/calendar', auth, getCalendar);
router.get('/tracker', auth, getTracker);
router.post('/complete', auth, markHabitAnyDay);
router.delete('/complete', auth, unmarkHabitAnyDay);

router.post('/', auth, createHabit);

router.patch('/:habitId/complete', auth, require('../controllers/habitController').patchHabitCompletion);

module.exports = router; 