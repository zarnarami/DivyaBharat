// server/routes/categoryContentRouter.js
const express = require('express');
const Heritage = require('../models/Heritage');
const { protect, authorize } = require('../middleware/auth');

function createCategoryRouter(categoryName) {
  const router = express.Router();

  // GET all for category
  router.get('/', async (req, res) => {
    try {
      const { state, search, page = 1, limit = 20 } = req.query;
      const query = { category: categoryName, status: 'approved' };

      if (state) query.state = { $regex: state, $options: 'i' };
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }

      const total = await Heritage.countDocuments(query);
      const items = await Heritage.find(query)
        .sort('-createdAt')
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit));

      res.json({
        success: true,
        count: items.length,
        total,
        category: categoryName,
        data: items
      });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });

  // GET single
  router.get('/:id', async (req, res) => {
    try {
      const item = await Heritage.findOne({ _id: req.params.id, category: categoryName });
      if (!item) return res.status(404).json({ success: false, message: `${categoryName} not found` });
      res.json({ success: true, item });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });

  // Admin POST
  router.post('/', protect, authorize('admin'), async (req, res) => {
    try {
      const item = await Heritage.create({ ...req.body, category: categoryName, createdBy: req.user._id });
      res.status(201).json({ success: true, item });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  });

  // Admin PUT
  router.put('/:id', protect, authorize('admin'), async (req, res) => {
    try {
      const item = await Heritage.findOneAndUpdate({ _id: req.params.id, category: categoryName }, req.body, { new: true });
      if (!item) return res.status(404).json({ success: false, message: `${categoryName} not found` });
      res.json({ success: true, item });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  });

  // Admin DELETE
  router.delete('/:id', protect, authorize('admin'), async (req, res) => {
    try {
      const item = await Heritage.findOneAndDelete({ _id: req.params.id, category: categoryName });
      if (!item) return res.status(404).json({ success: false, message: `${categoryName} not found` });
      res.json({ success: true, message: `${categoryName} deleted successfully` });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });

  return router;
}

module.exports = createCategoryRouter;
