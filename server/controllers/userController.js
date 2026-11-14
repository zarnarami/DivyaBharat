// server/controllers/userController.js
const User = require('../models/User');
const Progress = require('../models/Progress');
const QuizResult = require('../models/QuizResult');

// @desc    Get all users (Admin)
// @route   GET /api/users
exports.getUsers = async (req, res) => {
  try {
    const { search, role, page = 1, limit = 20 } = req.query;
    const query = {};
    if (search) query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
    if (role) query.role = role;

    const skip = (Number(page) - 1) * Number(limit);
    const total = await User.countDocuments(query);
    const users = await User.find(query).sort('-createdAt').skip(skip).limit(Number(limit));

    res.json({ success: true, total, users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('savedPlaces', 'name state category image');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Update user (Admin)
// @route   PUT /api/users/:id
exports.updateUser = async (req, res) => {
  try {
    const { name, role, isActive, phone, location } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, role, isActive, phone, location },
      { new: true, runValidators: true }
    );
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Delete user (Admin)
// @route   DELETE /api/users/:id
exports.deleteUser = async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'Cannot delete your own account' });
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get user stats (Admin dashboard)
// @route   GET /api/users/stats
exports.getUserStats = async (req, res) => {
  try {
    const total = await User.countDocuments();
    const students = await User.countDocuments({ role: 'student' });
    const teachers = await User.countDocuments({ role: 'teacher' });
    const admins = await User.countDocuments({ role: 'admin' });
    res.json({ success: true, stats: { total, students, teachers, admins } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Add to wishlist
// @route   POST /api/users/wishlist/:heritageId
exports.addToWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.savedPlaces.includes(req.params.heritageId)) {
      return res.status(400).json({ success: false, message: 'Already in wishlist' });
    }
    user.savedPlaces.push(req.params.heritageId);
    await user.save();
    await user.populate('savedPlaces', 'name state category image');
    res.json({ success: true, savedPlaces: user.savedPlaces });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Remove from wishlist
// @route   DELETE /api/users/wishlist/:heritageId
exports.removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.savedPlaces = user.savedPlaces.filter(
      id => id.toString() !== req.params.heritageId
    );
    await user.save();
    res.json({ success: true, message: 'Removed from wishlist' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get wishlist
// @route   GET /api/users/wishlist
exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('savedPlaces', 'name state category image description');
    res.json({ success: true, savedPlaces: user.savedPlaces });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get user preferences (Sound, Language, Notification)
// @route   GET /api/users/preferences
exports.getPreferences = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('preferences');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({
      success: true,
      preferences: user.preferences || {
        soundEnabled: false,
        volume: 0.45,
        language: 'en',
        notificationsEnabled: true
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error retrieving preferences' });
  }
};

// @desc    Update user preferences
// @route   PUT /api/users/preferences
exports.updatePreferences = async (req, res) => {
  try {
    const { soundEnabled, volume, language, notificationsEnabled } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (!user.preferences) {
      user.preferences = {};
    }

    if (soundEnabled !== undefined) user.preferences.soundEnabled = Boolean(soundEnabled);
    if (volume !== undefined) user.preferences.volume = Number(volume);
    if (language !== undefined && (language === 'en' || language === 'hi')) user.preferences.language = language;
    if (notificationsEnabled !== undefined) user.preferences.notificationsEnabled = Boolean(notificationsEnabled);

    await user.save({ validateBeforeSave: false });

    res.json({
      success: true,
      message: 'Preferences updated successfully',
      preferences: user.preferences
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error updating preferences' });
  }
};
