const express = require('express');
const router = express.Router();
const { getHabits, markHabitComplete, getHabitStats } = require('../controllers/habitController');
const auth = require('../middleware/auth');

router.get('/', auth, getHabits);
router.post('/:habitId/complete', auth, markHabitComplete);
router.get('/stats', auth, getHabitStats);

module.exports = router; 