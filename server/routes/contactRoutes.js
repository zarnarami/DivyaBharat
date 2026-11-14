// server/routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');
const { protect, authorize } = require('../middleware/auth');

// POST /api/contact - Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All required fields must be provided' });
    }
    const newMessage = await ContactMessage.create({ name, email, phone, subject, message });
    res.status(201).json({ success: true, message: 'Message received. We will get back to you shortly!', data: newMessage });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ success: false, message: 'Server error sending message' });
  }
});

// GET /api/contact - Admin view messages
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort('-createdAt');
    res.json({ success: true, count: messages.length, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error retrieving messages' });
  }
});

// PUT /api/contact/:id/status - Admin update status
router.put('/:id/status', protect, authorize('admin'), async (req, res) => {
  try {
    const updated = await ContactMessage.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Message not found' });
    res.json({ success: true, message: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error updating message' });
  }
});

// DELETE /api/contact/:id - Admin delete message
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error deleting message' });
  }
});

module.exports = router;
