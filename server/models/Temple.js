// server/models/Temple.js
const mongoose = require('mongoose');

const templeSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'Temple name is required'],
    trim: true
  },
  nameHi: {
    type: String,
    trim: true,
    default: ''
  },
  slug: {
    type: String,
    lowercase: true,
    trim: true
  },
  altNames: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    trim: true,
    default: 'Ancient Temple' // e.g. Jyotirlinga, Shakti Peeth, Char Dham, Divya Desam, Cave Temple
  },
  deity: {
    type: String,
    trim: true,
    default: ''
  },
  deityHi: {
    type: String,
    trim: true,
    default: ''
  },
  associatedDeities: [{
    type: String,
    trim: true
  }],
  state: {
    type: String,
    required: [true, 'State is required'],
    trim: true
  },
  city: {
    type: String,
    trim: true,
    default: ''
  },
  district: {
    type: String,
    trim: true,
    default: ''
  },
  location: {
    type: String,
    trim: true,
    default: ''
  },
  address: {
    type: String,
    trim: true,
    default: ''
  },
  pincode: {
    type: String,
    trim: true,
    default: ''
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  descriptionHi: {
    type: String,
    default: ''
  },

  // Historical Information
  history: {
    type: String,
    default: ''
  },
  origin: {
    type: String,
    default: ''
  },
  founder: {
    type: String,
    default: ''
  },
  constructionPeriod: {
    type: String,
    default: ''
  },
  significance: {
    type: String,
    default: ''
  },
  significanceHi: {
    type: String,
    default: ''
  },
  legends: {
    type: String,
    default: ''
  },
  mythology: {
    type: String,
    default: ''
  },
  renovationHistory: {
    type: String,
    default: ''
  },

  // Architecture
  architecture: {
    type: String,
    default: 'Traditional Indian Architecture' // e.g. Nagara, Dravidian, Vesara, Kalinga, Hemadpanthi
  },
  shikharaDetails: {
    type: String,
    default: ''
  },
  mandapamDetails: {
    type: String,
    default: ''
  },
  garbhagrihaDetails: {
    type: String,
    default: ''
  },
  materialsUsed: {
    type: String,
    default: ''
  },
  specialArchitecturalFeatures: [{
    type: String
  }],

  // Deity & Worship
  deityForm: {
    type: String,
    default: ''
  },
  worshipTraditions: {
    type: String,
    default: ''
  },

  // Rituals & Worship
  rituals: {
    daily: [{ type: String }],
    morningPooja: { type: String, default: '' },
    eveningAarti: { type: String, default: '' },
    prasadInfo: { type: String, default: '' },
    specialPooja: { type: String, default: '' }
  },

  // Darshan Information & Timings
  timings: {
    type: String,
    default: '6:00 AM – 8:00 PM'
  },
  darshan: {
    openingTime: { type: String, default: '6:00 AM' },
    closingTime: { type: String, default: '8:00 PM' },
    morningDarshan: { type: String, default: '6:00 AM – 12:00 PM' },
    afternoonBreak: { type: String, default: '12:00 PM – 4:00 PM' },
    eveningDarshan: { type: String, default: '4:00 PM – 8:00 PM' },
    specialDarshan: { type: String, default: '' }
  },
  bestTimeToVisit: {
    type: String,
    default: 'October to March'
  },

  // Festivals
  festivalsList: [{
    name: { type: String, required: true },
    month: { type: String, default: '' },
    duration: { type: String, default: '' },
    significance: { type: String, default: '' },
    rituals: { type: String, default: '' }
  }],

  // Visitor Guidelines
  guidelines: {
    dressCode: { type: String, default: 'Traditional modest attire recommended' },
    photography: { type: String, default: 'Allowed in outer complex; restricted inside sanctum sanctorum' },
    footwear: { type: String, default: 'Must be deposited at designated counter before entering temple' },
    entryRules: { type: String, default: 'Open to all devotees with respectful conduct' },
    accessibility: { type: String, default: 'Wheelchair and ramps available at major entry points' }
  },

  // Facilities
  facilities: {
    parking: { type: Boolean, default: true },
    drinkingWater: { type: Boolean, default: true },
    restrooms: { type: Boolean, default: true },
    accommodation: { type: Boolean, default: false },
    dharamshala: { type: String, default: 'Available near temple complex' },
    nearbyHotels: { type: String, default: 'Available in town/city vicinity' },
    transport: { type: String, default: 'Auto-rickshaws, taxis and local buses accessible' }
  },

  // Pilgrimage Information
  pilgrimageInfo: {
    howToReachRoad: { type: String, default: '' },
    howToReachRail: { type: String, default: '' },
    howToReachAir: { type: String, default: '' },
    nearbyTemples: [{ type: String }],
    suggestedCircuit: { type: String, default: '' }
  },

  // Imagery & Media
  image: {
    type: String,
    default: ''
  },
  images: [{
    type: String
  }],
  gallery: [{
    url: { type: String, default: '' },
    caption: { type: String, default: '' },
    category: { type: String, default: 'General' }
  }],
  mapLocation: {
    type: String,
    default: ''
  },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  },
  mapsUrl: {
    type: String,
    default: ''
  },
  nearbyTransport: {
    railway: { type: String, default: '' },
    airport: { type: String, default: '' },
    bus: { type: String, default: '' },
    local: { type: String, default: '' }
  },
  pilgrimageCircuits: [{
    type: String,
    trim: true
  }],
  stateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'State'
  },

  // Portal Attributes
  isFeatured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Auto-generate slug before saving
templeSchema.pre('save', function(next) {
  if (this.name && !this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  next();
});

// Indexes for high performance searching & filtering
templeSchema.index({ name: 'text', description: 'text', state: 'text', deity: 'text', city: 'text' });
templeSchema.index({ state: 1 });
templeSchema.index({ city: 1 });
templeSchema.index({ deity: 1 });
templeSchema.index({ category: 1 });
templeSchema.index({ slug: 1 });
templeSchema.index({ isFeatured: 1 });
templeSchema.index({ isActive: 1 });
templeSchema.index({ status: 1 });

module.exports = mongoose.model('Temple', templeSchema);
