// server/routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const { protect, authorize } = require('../middleware/auth');

// GET all quizzes
router.get('/', async (req, res) => {
  try {
    const { category, module: moduleId } = req.query;
    const query = { isPublished: true };
    if (category) query.category = category;
    if (moduleId) query.module = moduleId;

    const quizzes = await Quiz.find(query)
      .select('-questions.correctAnswer -questions.explanation')
      .populate('module', 'title');
    res.json({ success: true, quizzes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET single quiz (without answers for students)
router.get('/:id', protect, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('module', 'title');
    if (!quiz) return res.status(404).json({ success: false, message: 'Quiz not found' });

    // Only return answers if admin
    if (req.user.role !== 'admin') {
      const quizData = quiz.toObject();
      quizData.questions = quizData.questions.map(q => ({
        _id: q._id,
        question: q.question,
        options: q.options
      }));
      return res.json({ success: true, quiz: quizData });
    }

    res.json({ success: true, quiz });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST create quiz (Admin/Teacher)
router.post('/', protect, authorize('admin', 'teacher'), async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json({ success: true, quiz });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT update quiz (Admin)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!quiz) return res.status(404).json({ success: false, message: 'Quiz not found' });
    res.json({ success: true, quiz });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE quiz (Admin)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Quiz deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
