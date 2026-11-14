// server/routes/mediaRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  uploadMedia,
  getMediaStream,
  getMediaByFilename,
  getAllMedia,
  deleteMedia
} = require('../controllers/mediaController');
const { protect, authorize } = require('../middleware/auth');

// Configure multer memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024 // 25 MB max
  },
  fileFilter: (req, file, cb) => {
    // Allow images, svg, icons, audio, and pdf dossiers
    const allowedMime = [
      'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml',
      'image/x-icon', 'image/vnd.microsoft.icon', 'application/pdf', 'audio/mpeg'
    ];
    if (allowedMime.includes(file.mimetype) || file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image, icon, SVG, and PDF files are allowed'));
    }
  }
});

// Public endpoints to stream and list media
router.get('/', getAllMedia);
router.get('/:id', getMediaStream);
router.get('/file/:filename', getMediaByFilename);

// Upload endpoint (protected or admin)
router.post('/upload', protect, upload.single('file'), uploadMedia);

// Delete endpoint (admin only)
router.delete('/:id', protect, authorize('admin'), deleteMedia);

module.exports = router;
