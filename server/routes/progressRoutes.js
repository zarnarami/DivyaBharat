// server/routes/progressRoutes.js
const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const Module = require('../models/Module');
const { protect } = require('../middleware/auth');

// GET user's progress
router.get('/my', protect, async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user._id })
      .populate('module', 'title category level lessons thumbnail');

    const totalModules = await Module.countDocuments({ isPublished: true });
    const completed = progress.filter(p => p.completed).length;
    const inProgress = progress.filter(p => !p.completed && p.completedLessons.length > 0).length;

    res.json({
      success: true,
      progress,
      stats: {
        totalModules,
        startedModules: progress.length,
        completedModules: completed,
        inProgressModules: inProgress,
        overallPercentage: progress.length > 0
          ? Math.round(progress.reduce((acc, p) => acc + p.percentage, 0) / progress.length)
          : 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST update progress (mark lesson complete)
router.post('/', protect, async (req, res) => {
  try {
    const { moduleId, lessonIndex } = req.body;

    const module = await Module.findById(moduleId);
    if (!module) return res.status(404).json({ success: false, message: 'Module not found' });

    let progress = await Progress.findOne({ user: req.user._id, module: moduleId });

    if (!progress) {
      progress = new Progress({ user: req.user._id, module: moduleId, completedLessons: [] });
    }

    if (!progress.completedLessons.includes(lessonIndex)) {
      progress.completedLessons.push(lessonIndex);
    }

    const totalLessons = module.lessons.length;
    progress.percentage = totalLessons > 0
      ? Math.round((progress.completedLessons.length / totalLessons) * 100)
      : 0;
    progress.completed = progress.percentage === 100;
    progress.lastAccessed = Date.now();

    await progress.save();
    await progress.populate('module', 'title category level');

    res.json({ success: true, progress });
  } catch (error) {
    console.error('Progress update error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET progress for a specific module
router.get('/module/:moduleId', protect, async (req, res) => {
  try {
    const progress = await Progress.findOne({
      user: req.user._id,
      module: req.params.moduleId
    });
    res.json({ success: true, progress });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
