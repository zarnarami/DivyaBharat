// server/controllers/templeController.js
const Temple = require('../models/Temple');
const { createSystemNotification } = require('./notificationController');

// @desc    Get all temples with filtering, searching, pagination
// @route   GET /api/temples
// @access  Public
exports.getTemples = async (req, res) => {
  try {
    const {
      search, state, city, district, deity, category, circuit,
      featured, architecture, page = 1, limit = 50, sort = 'name'
    } = req.query;

    const query = { isActive: true };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { state: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
        { district: { $regex: search, $options: 'i' } },
        { deity: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    if (state) {
      query.state = { $regex: `^${state.trim()}$`, $options: 'i' };
    }

    if (city) {
      query.city = { $regex: city.trim(), $options: 'i' };
    }

    if (district) {
      query.district = { $regex: district.trim(), $options: 'i' };
    }

    if (deity) {
      query.deity = { $regex: deity, $options: 'i' };
    }

    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    if (circuit) {
      query.pilgrimageCircuits = { $regex: circuit.trim(), $options: 'i' };
    }

    if (architecture) {
      query.architecture = { $regex: architecture, $options: 'i' };
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.max(1, parseInt(limit, 10));
    const skip = (pageNum - 1) * limitNum;

    const total = await Temple.countDocuments(query);
    const temples = await Temple.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    res.json({
      success: true,
      count: temples.length,
      total,
      pages: Math.ceil(total / limitNum) || 1,
      currentPage: pageNum,
      temples
    });
  } catch (error) {
    console.error('Get temples error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving temples' });
  }
};

// @desc    Get single temple by ID or slug
// @route   GET /api/temples/:id
// @access  Public
exports.getSingleTemple = async (req, res) => {
  try {
    const { id } = req.params;
    let temple;

    // Check if ID is a valid Mongo ObjectId
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      temple = await Temple.findById(id);
    } else {
      temple = await Temple.findOne({ slug: id.toLowerCase() });
    }

    if (!temple) {
      return res.status(404).json({ success: false, message: 'Temple not found' });
    }

    // Related temples in same state
    const related = await Temple.find({
      _id: { $ne: temple._id },
      state: temple.state,
      isActive: true
    }).limit(4);

    res.json({ success: true, temple, related });
  } catch (error) {
    console.error('Get single temple error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Create temple
// @route   POST /api/temples
// @access  Private (Admin)
exports.createTemple = async (req, res) => {
  try {
    const templeData = {
      ...req.body,
      createdBy: req.user?._id
    };

    const temple = await Temple.create(templeData);

    // Broadcast real-time notification
    createSystemNotification({
      title: 'New Temple Added',
      message: `${temple.name} in ${temple.state} is now available for exploration!`,
      type: 'temple',
      link: `/states/${encodeURIComponent(temple.state)}`,
      icon: '🛕'
    });

    res.status(201).json({ success: true, temple });
  } catch (error) {
    console.error('Create temple error:', error);
    res.status(400).json({ success: false, message: error.message || 'Error creating temple' });
  }
};

// @desc    Update temple
// @route   PUT /api/temples/:id
// @access  Private (Admin)
exports.updateTemple = async (req, res) => {
  try {
    const temple = await Temple.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!temple) {
      return res.status(404).json({ success: false, message: 'Temple not found' });
    }

    // Broadcast real-time notification
    createSystemNotification({
      title: 'Temple Information Updated',
      message: `Details and timings for ${temple.name} (${temple.state}) have been updated.`,
      type: 'temple',
      link: `/states/${encodeURIComponent(temple.state)}`,
      icon: '🛕'
    });

    res.json({ success: true, temple });
  } catch (error) {
    console.error('Update temple error:', error);
    res.status(400).json({ success: false, message: error.message || 'Error updating temple' });
  }
};

// @desc    Delete temple (or soft delete)
// @route   DELETE /api/temples/:id
// @access  Private (Admin)
exports.deleteTemple = async (req, res) => {
  try {
    const temple = await Temple.findByIdAndDelete(req.params.id);

    if (!temple) {
      return res.status(404).json({ success: false, message: 'Temple not found' });
    }

    res.json({ success: true, message: 'Temple removed successfully' });
  } catch (error) {
    console.error('Delete temple error:', error);
    res.status(500).json({ success: false, message: 'Error deleting temple' });
  }
};
