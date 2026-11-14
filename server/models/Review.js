// server/models/Review.js — Review and Rating Model for Heritage Sites
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  userName: {
    type: String,
    required: [true, 'User name is required'],
    trim: true
  },
  userAvatar: {
    type: String,
    default: ''
  },
  heritage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Heritage',
    required: [true, 'Heritage ID is required']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required (1 to 5 stars)'],
    min: [1, 'Minimum rating is 1'],
    max: [5, 'Maximum rating is 5']
  },
  reviewText: {
    type: String,
    required: [true, 'Review text is required'],
    trim: true,
    maxlength: [2000, 'Review cannot exceed 2000 characters']
  },
  visitDate: {
    type: String,
    default: ''
  },
  images: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['approved', 'pending', 'rejected', 'reported'],
    default: 'approved'
  },
  reportReason: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Prevent duplicate reviews from same user on same heritage destination
reviewSchema.index({ user: 1, heritage: 1 }, { unique: true });
reviewSchema.index({ heritage: 1, status: 1 });
reviewSchema.index({ createdAt: -1 });

// Static helper to recalculate average rating for a heritage site
reviewSchema.statics.calculateAverageRating = async function(heritageId) {
  const stats = await this.aggregate([
    { $match: { heritage: new mongoose.Types.ObjectId(heritageId), status: 'approved' } },
    {
      $group: {
        _id: '$heritage',
        avgRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 }
      }
    }
  ]);

  const Heritage = mongoose.model('Heritage');
  if (stats.length > 0) {
    await Heritage.findByIdAndUpdate(heritageId, {
      averageRating: Math.round(stats[0].avgRating * 10) / 10,
      reviewCount: stats[0].totalReviews
    });
  } else {
    await Heritage.findByIdAndUpdate(heritageId, {
      averageRating: 4.8,
      reviewCount: 0
    });
  }
};

reviewSchema.post('save', async function() {
  await this.constructor.calculateAverageRating(this.heritage);
});

reviewSchema.post('findOneAndDelete', async function(doc) {
  if (doc) {
    await doc.constructor.calculateAverageRating(doc.heritage);
  }
});

module.exports = mongoose.model('Review', reviewSchema);
