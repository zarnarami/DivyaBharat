// server/controllers/notificationController.js
const Notification = require('../models/Notification');

// Active Server-Sent Events (SSE) connections
const sseClients = new Set();

/**
 * Broadcast notification in real-time to all connected SSE clients
 */
const broadcast = (notification) => {
  const payload = `data: ${JSON.stringify(notification)}\n\n`;
  for (const client of sseClients) {
    try {
      client.res.write(payload);
    } catch (err) {
      sseClients.delete(client);
    }
  }
};

// @desc    Real-time SSE event stream
// @route   GET /api/notifications/stream
// @access  Public
exports.getStream = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });

  res.write(': connected\n\n');

  const client = { id: Date.now(), res };
  sseClients.add(client);

  req.on('close', () => {
    sseClients.delete(client);
  });
};

// @desc    Get recent notifications from MongoDB
// @route   GET /api/notifications
// @access  Public
exports.getNotifications = async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    res.json({
      success: true,
      count: notifications.length,
      notifications
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Create and broadcast new notification
// @route   POST /api/notifications
// @access  Private (Admin)
exports.createNotification = async (req, res) => {
  try {
    const { title, message, type, link, targetRole, icon } = req.body;

    if (!title || !message) {
      return res.status(400).json({ success: false, message: 'Title and message are required' });
    }

    const notification = await Notification.create({
      title,
      message,
      type: type || 'announcement',
      link: link || '/home',
      targetRole: targetRole || 'all',
      icon: icon || '🔔',
      createdBy: req.user?._id
    });

    // Real-time SSE broadcast
    broadcast(notification);

    res.status(201).json({ success: true, notification });
  } catch (error) {
    console.error('Create notification error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Public
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }
    res.json({ success: true, notification });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Delete notification
// @route   DELETE /api/notifications/:id
// @access  Private (Admin)
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }
    res.json({ success: true, message: 'Notification removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Export broadcast helper so other controllers can emit real-time updates
exports.broadcast = broadcast;
exports.createSystemNotification = async ({ title, message, type, link, icon }) => {
  try {
    const notif = await Notification.create({
      title,
      message,
      type: type || 'announcement',
      link: link || '/home',
      icon: icon || '🛕'
    });
    broadcast(notif);
    return notif;
  } catch (err) {
    console.error('Error creating system notification:', err);
  }
};
