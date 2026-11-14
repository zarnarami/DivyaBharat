// server/models/State.js
const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'State name is required'],
    unique: true,
    trim: true
  },
  slug: {
    type: String,
    lowercase: true,
    trim: true
  },
  capital: {
    type: String,
    trim: true,
    default: ''
  },
  region: {
    type: String,
    enum: ['North', 'South', 'East', 'West', 'Central', 'Northeast', 'Islands', 'Other'],
    default: 'Other'
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: '🏛️'
  },
  temples: {
    type: String,
    default: ''
  },
  highlights: [{
    type: String
  }],
  // Cultural, Architectural & Spiritual Identity
  archStyle: {
    type: String,
    default: ''
  },
  divineTitle: {
    type: String,
    default: ''
  },
  spiritualTradition: {
    type: String,
    default: ''
  },
  deity: {
    type: String,
    default: ''
  },
  keyPilgrimages: [{
    type: String
  }],
  heritageLandmarks: [{
    type: String
  }],
  shloka: {
    type: String,
    default: ''
  },
  accentColor: {
    type: String,
    default: ''
  },
  bgGradient: {
    type: String,
    default: ''
  },
  isUT: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Auto-populate slug before saving
stateSchema.pre('save', function(next) {
  if (this.name && !this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  next();
});

// Indexes
stateSchema.index({ name: 'text', description: 'text', temples: 'text' });
stateSchema.index({ slug: 1 });
stateSchema.index({ isUT: 1 });
stateSchema.index({ region: 1 });

module.exports = mongoose.model('State', stateSchema);
