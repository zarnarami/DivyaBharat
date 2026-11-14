// server/models/MediaAsset.js
const mongoose = require('mongoose');

const mediaAssetSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  originalName: {
    type: String,
    required: true,
    trim: true
  },
  contentType: {
    type: String,
    required: true,
    trim: true
  },
  size: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['temple', 'heritage', 'state', 'profile', 'banner', 'logo', 'icon', 'general'],
    default: 'general'
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  gridFsId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

mediaAssetSchema.index({ category: 1 });
mediaAssetSchema.index({ createdAt: -1 });

module.exports = mongoose.model('MediaAsset', mediaAssetSchema);
