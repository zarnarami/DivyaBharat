// server/models/Setting.js
const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  siteName: {
    type: String,
    default: 'DivyaBharat',
    trim: true
  },
  tagline: {
    type: String,
    default: 'Rooted in Culture, United in Spirit',
    trim: true
  },
  heroHeading: {
    type: String,
    default: 'Discover the Divine. Experience Bharat.',
    trim: true
  },
  heroSubtitle: {
    type: String,
    default: "Explore India's sacred temples, timeless heritage, ancient traditions and spiritual wonders.",
    trim: true
  },
  contactEmail: {
    type: String,
    default: 'contact@divyabharat.in',
    trim: true
  },
  contactPhone: {
    type: String,
    default: '+91 98765 43210',
    trim: true
  },
  address: {
    type: String,
    default: 'New Delhi, Bharat (India)',
    trim: true
  },
  footerDescription: {
    type: String,
    default: 'Preserving, documenting, and celebrating the sacred temple architecture, monumental citadels, and living traditions of Bharat.',
    trim: true
  },
  announcement: {
    type: String,
    default: 'Welcome to DivyaBharat — India Temple Heritage & Pilgrimage Information Portal',
    trim: true
  },
  enableRegistrations: {
    type: Boolean,
    default: true
  },
  socialLinks: {
    facebook: { type: String, default: 'https://facebook.com/divyabharat' },
    twitter: { type: String, default: 'https://twitter.com/divyabharat' },
    instagram: { type: String, default: 'https://instagram.com/divyabharat' },
    youtube: { type: String, default: 'https://youtube.com/divyabharat' }
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Singleton helper: get or initialize default settings
settingSchema.statics.getSettings = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

module.exports = mongoose.model('Setting', settingSchema);
