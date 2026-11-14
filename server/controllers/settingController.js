// server/controllers/settingController.js
const Setting = require('../models/Setting');

// @desc    Get website settings
// @route   GET /api/settings
// @access  Public
exports.getSettings = async (req, res) => {
  try {
    const settings = await Setting.getSettings();
    res.json({
      success: true,
      settings
    });
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve website settings'
    });
  }
};

// @desc    Update website settings
// @route   PUT /api/settings
// @access  Private/Admin
exports.updateSettings = async (req, res) => {
  try {
    let settings = await Setting.getSettings();

    const allowedFields = [
      'siteName', 'tagline', 'heroHeading', 'heroSubtitle',
      'contactEmail', 'contactPhone', 'address', 'footerDescription',
      'announcement', 'enableRegistrations', 'socialLinks'
    ];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        settings[field] = req.body[field];
      }
    });

    if (req.user) {
      settings.updatedBy = req.user._id;
    }

    await settings.save();

    res.json({
      success: true,
      message: 'Website settings updated successfully',
      settings
    });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update website settings'
    });
  }
};
