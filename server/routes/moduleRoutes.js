// server/routes/moduleRoutes.js
const express = require('express');
const router = express.Router();
const Module = require('../models/Module');
const { protect, authorize } = require('../middleware/auth');

// GET all modules
router.get('/', async (req, res) => {
  try {
    const { category, level, page = 1, limit = 12 } = req.query;
    const query = { isPublished: true };
    if (category) query.category = category;
    if (level) query.level = level;

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Module.countDocuments(query);
    const modules = await Module.find(query)
      .populate('heritageReferences', 'name state image')
      .sort('-createdAt')
      .skip(skip)
      .limit(Number(limit));

    res.json({ success: true, total, modules });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET single module
router.get('/:id', async (req, res) => {
  try {
    const module = await Module.findById(req.params.id)
      .populate('heritageReferences', 'name state image description')
      .populate('quiz');
    if (!module) return res.status(404).json({ success: false, message: 'Module not found' });
    res.json({ success: true, module });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST create module (Admin/Teacher)
router.post('/', protect, authorize('admin', 'teacher'), async (req, res) => {
  try {
    req.body.createdBy = req.user._id;
    const module = await Module.create(req.body);
    res.status(201).json({ success: true, module });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT update module (Admin)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const module = await Module.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!module) return res.status(404).json({ success: false, message: 'Module not found' });
    res.json({ success: true, module });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE module (Admin)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    await Module.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Module deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
