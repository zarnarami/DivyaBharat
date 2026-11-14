// server/controllers/mediaController.js
const mongoose = require('mongoose');
const stream = require('stream');
const path = require('path');
const MediaAsset = require('../models/MediaAsset');

// Helper to get or create GridFSBucket instance
const getGridFSBucket = () => {
  if (!mongoose.connection.db) {
    throw new Error('Database not connected');
  }
  return new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads'
  });
};

// @desc    Upload image/file to MongoDB GridFS
// @route   POST /api/media/upload
// @access  Private/Admin or authenticated users
exports.uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please select an image or file to upload'
      });
    }

    const bucket = getGridFSBucket();
    const { category = 'general', description = '' } = req.body;

    const ext = path.extname(req.file.originalname) || '.png';
    const cleanBaseName = path.basename(req.file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueFilename = `${Date.now()}_${cleanBaseName}${ext}`;

    // Create a readable stream from file buffer
    const readableStream = new stream.Readable();
    readableStream.push(req.file.buffer);
    readableStream.push(null);

    // Open upload stream to GridFS
    const uploadStream = bucket.openUploadStream(uniqueFilename, {
      contentType: req.file.mimetype,
      metadata: {
        originalName: req.file.originalname,
        category,
        uploadedBy: req.user ? req.user._id : null
      }
    });

    readableStream.pipe(uploadStream);

    uploadStream.on('error', (err) => {
      console.error('GridFS Upload Error:', err);
      return res.status(500).json({
        success: false,
        message: 'Failed to write file to MongoDB GridFS'
      });
    });

    uploadStream.on('finish', async () => {
      try {
        const fileId = uploadStream.id;
        const mediaAsset = await MediaAsset.create({
          filename: uniqueFilename,
          originalName: req.file.originalname,
          contentType: req.file.mimetype,
          size: req.file.size,
          category,
          description,
          gridFsId: fileId,
          url: `/api/media/${fileId}`,
          uploadedBy: req.user ? req.user._id : null
        });

        res.status(201).json({
          success: true,
          message: 'Image stored permanently in MongoDB GridFS',
          media: mediaAsset
        });
      } catch (assetErr) {
        console.error('MediaAsset metadata creation error:', assetErr);
        res.status(500).json({
          success: false,
          message: 'Saved binary to GridFS but failed to record metadata'
        });
      }
    });
  } catch (error) {
    console.error('Upload media error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during image upload'
    });
  }
};

// @desc    Stream image directly from MongoDB GridFS by ID
// @route   GET /api/media/:id
// @access  Public
exports.getMediaStream = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid media ID' });
    }

    const objectId = new mongoose.Types.ObjectId(id);
    const bucket = getGridFSBucket();

    // Check if file exists in uploads.files
    const files = await bucket.find({ _id: objectId }).toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({ success: false, message: 'Image not found in MongoDB' });
    }

    const file = files[0];

    res.set('Content-Type', file.contentType || 'image/jpeg');
    res.set('Cache-Control', 'public, max-age=86400, s-maxage=86400'); // Cache for 24 hours

    const downloadStream = bucket.openDownloadStream(objectId);
    downloadStream.on('error', (err) => {
      console.error('Download stream error:', err);
      res.status(404).json({ success: false, message: 'Error streaming image' });
    });

    downloadStream.pipe(res);
  } catch (error) {
    console.error('Get media stream error:', error);
    res.status(500).json({ success: false, message: 'Failed to stream media asset' });
  }
};

// @desc    Stream image directly from MongoDB GridFS by Filename
// @route   GET /api/media/file/:filename
// @access  Public
exports.getMediaByFilename = async (req, res) => {
  try {
    const { filename } = req.params;
    const bucket = getGridFSBucket();

    const files = await bucket.find({ filename }).toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({ success: false, message: 'File not found in MongoDB' });
    }

    const file = files[0];
    res.set('Content-Type', file.contentType || 'image/jpeg');
    res.set('Cache-Control', 'public, max-age=86400');

    const downloadStream = bucket.openDownloadStreamByName(filename);
    downloadStream.pipe(res);
  } catch (error) {
    console.error('Get media by filename error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve media file' });
  }
};

// @desc    List all media assets in MongoDB
// @route   GET /api/media
// @access  Public
exports.getAllMedia = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 50 } = req.query;
    const query = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { originalName: { $regex: search, $options: 'i' } },
        { filename: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.max(1, parseInt(limit, 10));
    const skip = (pageNum - 1) * limitNum;

    const total = await MediaAsset.countDocuments(query);
    const media = await MediaAsset.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    // Compute total storage size
    const stats = await MediaAsset.aggregate([
      { $group: { _id: null, totalBytes: { $sum: '$size' }, count: { $sum: 1 } } }
    ]);

    const totalBytes = stats.length > 0 ? stats[0].totalBytes : 0;

    res.json({
      success: true,
      count: media.length,
      total,
      pages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      totalStorageMB: (totalBytes / (1024 * 1024)).toFixed(2),
      media
    });
  } catch (error) {
    console.error('Get all media error:', error);
    res.status(500).json({ success: false, message: 'Failed to list media assets' });
  }
};

// @desc    Delete media asset and remove from GridFS
// @route   DELETE /api/media/:id
// @access  Private/Admin
exports.deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid media ID' });
    }

    const mediaAsset = await MediaAsset.findById(id);
    if (!mediaAsset) {
      return res.status(404).json({ success: false, message: 'Media asset not found' });
    }

    const bucket = getGridFSBucket();

    // Delete from GridFS bucket
    try {
      await bucket.delete(new mongoose.Types.ObjectId(mediaAsset.gridFsId));
    } catch (gridFsErr) {
      console.warn('GridFS delete warning (may have already been removed):', gridFsErr.message);
    }

    // Delete metadata
    await MediaAsset.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Media asset deleted from MongoDB permanently'
    });
  } catch (error) {
    console.error('Delete media error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete media asset' });
  }
};
