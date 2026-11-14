// server/routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const {
  getStream,
  getNotifications,
  createNotification,
  markAsRead,
  deleteNotification
} = require('../controllers/notificationController');
const { protect, authorize } = require('../middleware/auth');

// Public endpoints
router.get('/stream', getStream);
router.get('/', getNotifications);
router.put('/:id/read', markAsRead);

// Admin-only endpoints
router.post('/', protect, authorize('admin'), createNotification);
router.delete('/:id', protect, authorize('admin'), deleteNotification);

module.exports = router;
