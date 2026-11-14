// server/routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const { protect, authorize, optionalAuth } = require('../middleware/auth');

// POST /api/feedback - Submit feedback
router.post('/', optionalAuth, async (req, res) => {
  try {
    const { name, email, subject, message, rating } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email and message are required' });
    }
    const feedback = await Feedback.create({
      name,
      email,
      subject,
      message,
      rating: rating || 5,
      user: req.user?._id
    });
    res.status(201).json({ success: true, message: 'Thank you for your valuable feedback!', feedback });
  } catch (error) {
    console.error('Feedback submit error:', error);
    res.status(500).json({ success: false, message: 'Server error saving feedback' });
  }
});

// GET /api/feedback - View feedbacks
router.get('/', async (req, res) => {
  try {
    const feedback = await Feedback.find().sort('-createdAt').limit(20);
    res.json({ success: true, count: feedback.length, feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/feedback/:id - Admin delete feedback
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Feedback removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
