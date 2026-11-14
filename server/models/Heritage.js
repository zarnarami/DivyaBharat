// server/models/Heritage.js — Comprehensive Heritage Model for DivyaBharat
const mongoose = require('mongoose');

const heritageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Heritage name is required'],
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
  altName: {
    type: String,
    trim: true,
    default: ''
  },
  altNames: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    default: 'Monument' // e.g. 'Forts & Palaces', 'Ancient Caves', 'Buddhist Heritage', 'Ancient Temples', 'Historical Towns', 'Archaeological Sites'
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    trim: true
  },
  stateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'State'
  },
  stateCode: {
    type: String,
    default: 'AP'
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
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  descriptionHi: {
    type: String,
    default: ''
  },

  // Historical Information & Background
  historicalBackground: {
    type: String,
    default: ''
  },
  history: {
    type: String,
    default: ''
  },
  establishmentPeriod: {
    type: String,
    default: ''
  },
  historicalPeriod: {
    type: String,
    trim: true,
    default: ''
  },
  timeline: [{
    period: { type: String, default: '' },
    event: { type: String, default: '' }
  }],
  dynasty: {
    type: String,
    default: ''
  },
  historicalRulers: {
    type: String,
    default: ''
  },

  // Significance & Architecture
  culturalImportance: {
    type: String,
    default: ''
  },
  culturalSignificance: {
    type: String,
    default: ''
  },
  archaeologicalImportance: {
    type: String,
    default: ''
  },
  architecture: {
    type: String,
    default: ''
  },
  architecturalStyle: {
    type: String,
    default: ''
  },
  architecturalSignificance: {
    type: String,
    default: ''
  },
  importantFacts: [{
    type: String
  }],
  unescoStatus: {
    type: String,
    default: 'None'
  },
  unescoListed: {
    type: Boolean,
    default: false
  },

  // Deity & Religious Details (for religious heritage only)
  deityDetails: {
    hasReligiousSignificance: { type: Boolean, default: false },
    mainDeity: { type: String, default: '' },
    associatedDeities: [{ type: String }],
    religiousSignificance: { type: String, default: '' },
    mythology: { type: String, default: '' },
    worshipPractices: { type: String, default: '' }
  },

  // Rituals & Schedules (where applicable)
  rituals: {
    daily: [{ type: String }],
    poojaSchedule: { type: String, default: '' },
    specialCeremonies: { type: String, default: '' },
    festivals: { type: String, default: '' }
  },
  schedules: {
    type: String,
    default: ''
  },

  // Visitor Information & Timings
  visitorInformation: {
    bestTimeToVisit: { type: String, default: 'October to March' },
    openingTime: { type: String, default: '09:00 AM' },
    closingTime: { type: String, default: '05:30 PM' },
    timings: { type: String, default: '09:00 AM – 05:30 PM' },
    entryFees: { type: String, default: 'Free / Nominal ASI Entry Fee' },
    ticketBooking: { type: String, default: 'Available at site entrance counter and online via ASI portal' },
    guidelines: { type: String, default: 'Respect monument rules; do not litter or deface ancient structures' },
    photography: { type: String, default: 'Permitted in outer complex' },
    dressCode: { type: String, default: 'Comfortable modest clothing and walking shoes recommended' },
    restrictions: { type: String, default: 'No smoking, drones require prior ASI authorization' },
    accessibility: { type: String, default: 'Wheelchair accessible pathways available at ground areas' },
    visitingDuration: { type: String, default: '2 to 3 hours' }
  },

  // Backward compatible visitingInfo
  visitingInfo: {
    timings: { type: String, default: 'Sunrise to Sunset / 9:00 AM – 5:30 PM' },
    entryFee: { type: String, default: 'Nominal entry fee applies' },
    bestTime: { type: String, default: 'October to March' },
    guidelines: { type: String, default: 'Follow designated pathways' }
  },

  // Facilities
  facilities: {
    parking: { type: Boolean, default: true },
    drinkingWater: { type: Boolean, default: true },
    restrooms: { type: Boolean, default: true },
    guideService: { type: Boolean, default: true }
  },
  nearbyFacilities: {
    hotels: { type: String, default: '' },
    guestHouses: { type: String, default: '' },
    restaurants: { type: String, default: '' },
    parking: { type: Boolean, default: true },
    drinkingWater: { type: Boolean, default: true },
    restrooms: { type: Boolean, default: true },
    touristCentres: { type: String, default: '' },
    nearbyAttractions: [{ type: String }]
  },

  // Geographic Location & Google Maps
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  },
  googleMapsUrl: {
    type: String,
    default: ''
  },
  mapsUrl: {
    type: String,
    default: ''
  },

  // Transport & Connectivity
  transportInformation: {
    nearestRailway: { type: String, default: '' },
    nearestAirport: { type: String, default: '' },
    nearestBus: { type: String, default: '' },
    roadConnectivity: { type: String, default: '' },
    localTransport: { type: String, default: '' }
  },
  howToReach: {
    byRoad: { type: String, default: '' },
    byRail: { type: String, default: '' },
    byAir: { type: String, default: '' }
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
    category: { type: String, default: 'Architecture' }
  }],
  videoUrl: {
    type: String,
    default: ''
  },

  // Festivals & Events Calendar
  festivals: [{
    name: { type: String, required: true },
    date: { type: String, default: '' },
    month: { type: String, default: '' },
    description: { type: String, default: '' },
    location: { type: String, default: '' },
    culturalImportance: { type: String, default: '' },
    isAnnual: { type: Boolean, default: true }
  }],
  events: [{
    name: { type: String, required: true },
    date: { type: String, default: '' },
    month: { type: String, default: '' },
    description: { type: String, default: '' },
    location: { type: String, default: '' },
    culturalImportance: { type: String, default: '' },
    isAnnual: { type: Boolean, default: true }
  }],

  // Featured, Popularity & Ratings
  featured: {
    type: Boolean,
    default: false
  },
  popularity: {
    type: Number,
    default: 0
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  averageRating: {
    type: Number,
    default: 4.8,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },

  // Metadata & Moderation
  sourceName: {
    type: String,
    default: 'Archaeological Survey of India / Andhra Pradesh Tourism'
  },
  sourceUrl: {
    type: String,
    default: 'https://aptourism.gov.in'
  },
  verified: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ['draft', 'pending', 'approved', 'rejected'],
    default: 'approved'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Indexes
heritageSchema.index({ name: 'text', description: 'text', state: 'text', category: 'text', city: 'text', district: 'text' });
heritageSchema.index({ state: 1 });
heritageSchema.index({ district: 1 });
heritageSchema.index({ category: 1 });
heritageSchema.index({ status: 1 });
heritageSchema.index({ featured: 1 });
heritageSchema.index({ isPopular: 1 });

module.exports = mongoose.model('Heritage', heritageSchema);
