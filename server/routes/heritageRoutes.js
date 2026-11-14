// server/routes/heritageRoutes.js
const express = require('express');
const router = express.Router();
const {
  getHeritage,
  getFeaturedHeritage,
  getPopularHeritage,
  getCategories,
  getSingleHeritage,
  getHeritageReviews,
  getAllReviews,
  addHeritageReview,
  reportHeritageReview,
  moderateReview,
  deleteReview,
  createHeritage,
  updateHeritage,
  deleteHeritage,
  updateStatus
} = require('../controllers/heritageController');
const { protect, authorize, optionalAuth } = require('../middleware/auth');

// Public listing & discovery routes (must precede /:id)
router.get('/', optionalAuth, getHeritage);
router.get('/featured', getFeaturedHeritage);
router.get('/popular', getPopularHeritage);
router.get('/categories', getCategories);

// Reviews management
router.get('/reviews/all', protect, authorize('admin'), getAllReviews);
router.post('/reviews/:reviewId/report', reportHeritageReview);
router.put('/reviews/:reviewId/status', protect, authorize('admin'), moderateReview);
router.delete('/reviews/:reviewId', protect, authorize('admin'), deleteReview);

// Single heritage & heritage reviews
router.get('/:id', getSingleHeritage);
router.get('/:id/reviews', getHeritageReviews);
router.post('/:id/reviews', protect, addHeritageReview);

// Admin-only management
router.post('/', protect, authorize('admin', 'teacher'), createHeritage);
router.put('/:id', protect, authorize('admin'), updateHeritage);
router.put('/:id/status', protect, authorize('admin'), updateStatus);
router.delete('/:id', protect, authorize('admin'), deleteHeritage);

module.exports = router;
