// server/controllers/heritageController.js — Complete Heritage and Review Controller
const mongoose = require('mongoose');
const Heritage = require('../models/Heritage');
const Review = require('../models/Review');
const { createSystemNotification } = require('./notificationController');

// @desc    Get all heritage (with search, filter, pagination)
// @route   GET /api/heritage
// @access  Public
exports.getHeritage = async (req, res) => {
  try {
    const {
      search,
      category,
      state,
      district,
      historicalPeriod,
      dynasty,
      status,
      featured,
      isPopular,
      page = 1,
      limit = 50,
      sort = '-createdAt'
    } = req.query;

    const query = {};

    // Only show approved content to public unless admin
    if (!req.user || req.user.role !== 'admin') {
      query.status = 'approved';
    } else if (status) {
      query.status = status;
    }

    // Search
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { altName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { state: { $regex: search, $options: 'i' } },
        { district: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
        { dynasty: { $regex: search, $options: 'i' } },
        { historicalPeriod: { $regex: search, $options: 'i' } }
      ];
    }

    if (category && category !== 'All') {
      query.category = { $regex: category, $options: 'i' };
    }

    if (state && state !== 'All') {
      query.state = { $regex: `^${state}$`, $options: 'i' };
    }

    if (district && district !== 'All') {
      query.district = { $regex: district, $options: 'i' };
    }

    if (historicalPeriod && historicalPeriod !== 'All') {
      query.historicalPeriod = { $regex: historicalPeriod, $options: 'i' };
    }

    if (dynasty && dynasty !== 'All') {
      query.dynasty = { $regex: dynasty, $options: 'i' };
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (isPopular === 'true') {
      query.$or = [{ isPopular: true }, { popularity: { $gte: 80 } }, { averageRating: { $gte: 4.6 } }];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Heritage.countDocuments(query);

    const heritage = await Heritage.find(query)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      count: heritage.length,
      total,
      pages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      heritage
    });
  } catch (error) {
    console.error('Get heritage error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get featured heritage
// @route   GET /api/heritage/featured
// @access  Public
exports.getFeaturedHeritage = async (req, res) => {
  try {
    const query = { status: 'approved', featured: true };
    if (req.query.state) {
      query.state = { $regex: `^${req.query.state}$`, $options: 'i' };
    }
    const heritage = await Heritage.find(query).limit(10);
    res.json({ success: true, count: heritage.length, heritage });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get popular heritage
// @route   GET /api/heritage/popular
// @access  Public
exports.getPopularHeritage = async (req, res) => {
  try {
    const query = { status: 'approved' };
    if (req.query.state) {
      query.state = { $regex: `^${req.query.state}$`, $options: 'i' };
    }
    const heritage = await Heritage.find(query)
      .sort({ popularity: -1, averageRating: -1 })
      .limit(10);
    res.json({ success: true, count: heritage.length, heritage });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get distinct categories
// @route   GET /api/heritage/categories
// @access  Public
exports.getCategories = async (req, res) => {
  try {
    const query = { status: 'approved' };
    if (req.query.state) {
      query.state = { $regex: `^${req.query.state}$`, $options: 'i' };
    }
    const categories = await Heritage.distinct('category', query);
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get single heritage
// @route   GET /api/heritage/:id
// @access  Public
exports.getSingleHeritage = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ success: false, message: 'Heritage destination not found' });
    }
    const heritage = await Heritage.findById(req.params.id);

    if (!heritage) {
      return res.status(404).json({ success: false, message: 'Heritage destination not found' });
    }

    // Get related heritage in same state or category
    const related = await Heritage.find({
      _id: { $ne: heritage._id },
      status: 'approved',
      $or: [{ category: heritage.category }, { state: heritage.state }, { district: heritage.district }]
    }).limit(4);

    res.json({ success: true, heritage, related });
  } catch (error) {
    console.error('Get single heritage error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get reviews for a heritage destination
// @route   GET /api/heritage/:id/reviews
// @access  Public
exports.getHeritageReviews = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ success: false, message: 'Heritage destination not found' });
    }

    const reviews = await Review.find({
      heritage: req.params.id,
      status: { $in: ['approved', 'reported'] }
    }).sort({ createdAt: -1 });

    res.json({ success: true, count: reviews.length, reviews });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Submit a review for a heritage destination
// @route   POST /api/heritage/:id/reviews
// @access  Private
exports.addHeritageReview = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ success: false, message: 'Heritage destination not found' });
    }

    const heritage = await Heritage.findById(req.params.id);
    if (!heritage) {
      return res.status(404).json({ success: false, message: 'Heritage destination not found' });
    }

    const { rating, reviewText, visitDate, images } = req.body;
    if (!rating || !reviewText) {
      return res.status(400).json({ success: false, message: 'Please provide rating and review text' });
    }

    // Check if user already submitted a review for this heritage site
    const existing = await Review.findOne({
      user: req.user._id,
      heritage: req.params.id
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted a review for this heritage destination'
      });
    }

    const review = await Review.create({
      user: req.user._id,
      userName: req.user.name || 'DivyaBharat Devotee',
      userAvatar: req.user.avatar || '',
      heritage: req.params.id,
      rating: Number(rating),
      reviewText: reviewText.trim(),
      visitDate: visitDate || '',
      images: Array.isArray(images) ? images : [],
      status: 'approved'
    });

    res.status(201).json({ success: true, review });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

// @desc    Report an inappropriate review
// @route   POST /api/heritage/reviews/:reviewId/report
// @access  Public / Private
exports.reportHeritageReview = async (req, res) => {
  try {
    const { reason } = req.body;
    const review = await Review.findByIdAndUpdate(
      req.params.reviewId,
      { status: 'reported', reportReason: reason || 'Reported by user as inappropriate' },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    res.json({ success: true, message: 'Review reported for moderation' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get all reviews for moderation (admin)
// @route   GET /api/heritage/reviews/all
// @access  Private (Admin)
exports.getAllReviews = async (req, res) => {
  try {
    const { status, limit = 50 } = req.query;
    const query = {};
    if (status && status !== 'all') {
      query.status = status;
    }
    const reviews = await Review.find(query)
      .populate('heritage', 'name state category')
      .sort('-createdAt')
      .limit(Number(limit));
    res.json({ success: true, count: reviews.length, reviews });
  } catch (error) {
    console.error('Get all reviews error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Moderate review status (admin)
// @route   PUT /api/heritage/reviews/:reviewId/status
// @access  Private (Admin)
exports.moderateReview = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'pending', 'rejected', 'reported'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const review = await Review.findByIdAndUpdate(
      req.params.reviewId,
      { status },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    await Review.calculateAverageRating(review.heritage);

    res.json({ success: true, review });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Delete review (admin)
// @route   DELETE /api/heritage/reviews/:reviewId
// @access  Private (Admin)
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    await Review.calculateAverageRating(review.heritage);
    res.json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Create heritage
// @route   POST /api/heritage
// @access  Private (Admin)
exports.createHeritage = async (req, res) => {
  try {
    req.body.createdBy = req.user._id;
    req.body.status = 'approved';

    const heritage = await Heritage.create(req.body);

    createSystemNotification({
      title: 'New Heritage Destination Added',
      message: `${heritage.name} in ${heritage.state} is now cataloged in DivyaBharat!`,
      type: 'heritage',
      link: `/heritage/${heritage._id}`,
      icon: '🏛️'
    });

    res.status(201).json({ success: true, heritage });
  } catch (error) {
    console.error('Create heritage error:', error);
    res.status(400).json({ success: false, message: error.message || 'Server error' });
  }
};

// @desc    Update heritage
// @route   PUT /api/heritage/:id
// @access  Private (Admin)
exports.updateHeritage = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ success: false, message: 'Heritage destination not found' });
    }
    const heritage = await Heritage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!heritage) {
      return res.status(404).json({ success: false, message: 'Heritage destination not found' });
    }

    createSystemNotification({
      title: 'Heritage Site Updated',
      message: `Information and timings for ${heritage.name} (${heritage.state}) have been updated.`,
      type: 'heritage',
      link: `/heritage/${heritage._id}`,
      icon: '🏛️'
    });

    res.json({ success: true, heritage });
  } catch (error) {
    console.error('Update heritage error:', error);
    res.status(400).json({ success: false, message: error.message || 'Server error' });
  }
};

// @desc    Delete heritage
// @route   DELETE /api/heritage/:id
// @access  Private (Admin)
exports.deleteHeritage = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ success: false, message: 'Heritage destination not found' });
    }
    const heritage = await Heritage.findByIdAndDelete(req.params.id);

    if (!heritage) {
      return res.status(404).json({ success: false, message: 'Heritage destination not found' });
    }

    // Clean up reviews for this heritage
    await Review.deleteMany({ heritage: req.params.id });

    res.json({ success: true, message: 'Heritage destination deleted successfully' });
  } catch (error) {
    console.error('Delete heritage error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Approve/Reject heritage content
// @route   PUT /api/heritage/:id/status
// @access  Private (Admin)
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['draft', 'pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const heritage = await Heritage.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!heritage) {
      return res.status(404).json({ success: false, message: 'Heritage destination not found' });
    }

    res.json({ success: true, heritage });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
