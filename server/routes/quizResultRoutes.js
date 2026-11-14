// server/routes/quizResultRoutes.js
const express = require('express');
const router = express.Router();
const QuizResult = require('../models/QuizResult');
const Quiz = require('../models/Quiz');
const { protect } = require('../middleware/auth');

// POST submit quiz result
router.post('/', protect, async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    // Get quiz with correct answers
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ success: false, message: 'Quiz not found' });

    // Calculate score
    let score = 0;
    const processedAnswers = answers.map((ans, idx) => {
      const question = quiz.questions[idx];
      const isCorrect = question && ans.selectedAnswer === question.correctAnswer;
      if (isCorrect) score++;
      return {
        questionIndex: idx,
        selectedAnswer: ans.selectedAnswer,
        isCorrect
      };
    });

    const percentage = Math.round((score / quiz.questions.length) * 100);
    const passed = percentage >= quiz.passingScore;

    const result = await QuizResult.create({
      user: req.user._id,
      quiz: quizId,
      answers: processedAnswers,
      score,
      totalQuestions: quiz.questions.length,
      percentage,
      passed
    });

    // Return result with explanations
    const quizWithAnswers = quiz.toObject();
    res.json({
      success: true,
      result: {
        ...result.toObject(),
        quizTitle: quiz.title,
        questions: quizWithAnswers.questions
      }
    });
  } catch (error) {
    console.error('Quiz result error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET user's quiz results
router.get('/user/:userId', protect, async (req, res) => {
  try {
    const results = await QuizResult.find({ user: req.params.userId })
      .populate('quiz', 'title category')
      .sort('-completedAt')
      .limit(20);
    res.json({ success: true, results });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET my quiz results
router.get('/my', protect, async (req, res) => {
  try {
    const results = await QuizResult.find({ user: req.user._id })
      .populate('quiz', 'title category')
      .sort('-completedAt');

    const stats = {
      total: results.length,
      passed: results.filter(r => r.passed).length,
      avgScore: results.length > 0
        ? Math.round(results.reduce((acc, r) => acc + r.percentage, 0) / results.length)
        : 0,
      highestScore: results.length > 0
        ? Math.max(...results.map(r => r.percentage))
        : 0
    };

    res.json({ success: true, results, stats });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
