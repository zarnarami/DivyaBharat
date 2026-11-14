// server/models/Module.js
const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  duration: { type: Number, default: 10 }, // minutes
  order: { type: Number, default: 0 }
});

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Module title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  category: {
    type: String,
    enum: ['Monument', 'Temple', 'Historical Place', 'Festival', 'Tradition', 'Art Form', 'General'],
    default: 'General'
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  duration: {
    type: Number, // total minutes
    default: 30
  },
  thumbnail: {
    type: String,
    default: ''
  },
  lessons: [lessonSchema],
  heritageReferences: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Heritage'
  }],
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'
  },
  objectives: [{
    type: String
  }],
  isPublished: {
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

module.exports = mongoose.model('Module', moduleSchema);
