// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
  getUsers, getUser, updateUser, deleteUser, getUserStats,
  addToWishlist, removeFromWishlist, getWishlist,
  getPreferences, updatePreferences
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

router.get('/preferences', protect, getPreferences);
router.put('/preferences', protect, updatePreferences);
router.get('/stats', protect, authorize('admin'), getUserStats);
router.get('/wishlist', protect, getWishlist);
router.post('/wishlist/:heritageId', protect, addToWishlist);
router.delete('/wishlist/:heritageId', protect, removeFromWishlist);

router.get('/', protect, authorize('admin'), getUsers);
router.get('/:id', protect, getUser);
router.put('/:id', protect, authorize('admin'), updateUser);
router.delete('/:id', protect, authorize('admin'), deleteUser);

module.exports = router;
