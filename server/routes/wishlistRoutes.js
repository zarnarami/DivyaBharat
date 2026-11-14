// server/routes/wishlistRoutes.js
const express = require('express');
const router = express.Router();
const {
  addToWishlist,
  removeFromWishlist,
  getWishlist
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getWishlist);
router.post('/:heritageId', protect, addToWishlist);
router.delete('/:heritageId', protect, removeFromWishlist);

module.exports = router;
