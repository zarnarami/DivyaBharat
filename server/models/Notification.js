// server/models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Notification title is required'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Notification message is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['temple', 'heritage', 'festival', 'announcement', 'admin', 'system', 'info', 'alert', 'update'],
    default: 'announcement'
  },
  icon: {
    type: String,
    default: '🔔'
  },
  link: {
    type: String,
    default: '/home'
  },
  targetRole: {
    type: String,
    enum: ['all', 'student', 'teacher', 'admin'],
    default: 'all'
  },
  isRead: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

notificationSchema.index({ createdAt: -1 });
notificationSchema.index({ targetRole: 1 });
notificationSchema.index({ type: 1 });

module.exports = mongoose.model('Notification', notificationSchema);
