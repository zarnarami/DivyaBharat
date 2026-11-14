// server/routes/stateRoutes.js
const express = require('express');
const router = express.Router();
const {
  getStates,
  getStateByName,
  createState,
  updateState,
  deleteState
} = require('../controllers/stateController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getStates);
router.get('/:name', getStateByName);

// Admin routes
router.post('/', protect, authorize('admin'), createState);
router.put('/:id', protect, authorize('admin'), updateState);
router.delete('/:id', protect, authorize('admin'), deleteState);

module.exports = router;
