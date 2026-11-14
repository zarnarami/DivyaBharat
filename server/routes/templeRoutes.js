// server/routes/templeRoutes.js
const express = require('express');
const router = express.Router();
const {
  getTemples,
  getSingleTemple,
  createTemple,
  updateTemple,
  deleteTemple
} = require('../controllers/templeController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getTemples);
router.get('/:id', getSingleTemple);

// Admin-only management
router.post('/', protect, authorize('admin'), createTemple);
router.put('/:id', protect, authorize('admin'), updateTemple);
router.delete('/:id', protect, authorize('admin'), deleteTemple);

module.exports = router;
