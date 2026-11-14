// server/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const connectDB = require('./config/db');
const createCategoryRouter = require('./routes/categoryContentRouter');

// Connect to MongoDB
connectDB();

const app = express();

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS setup
const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(null, true); // Dev-friendly fallback
  },
  credentials: true
}));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/temples', require('./routes/templeRoutes'));
app.use('/api/heritage', require('./routes/heritageRoutes'));
app.use('/api/states', require('./routes/stateRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/modules', require('./routes/moduleRoutes'));
app.use('/api/quizzes', require('./routes/quizRoutes'));
app.use('/api/quiz-results', require('./routes/quizResultRoutes'));
app.use('/api/progress', require('./routes/progressRoutes'));
app.use('/api/wishlist', require('./routes/wishlistRoutes'));
app.use('/api/favorites', require('./routes/wishlistRoutes'));
app.use('/api/bookmarks', require('./routes/wishlistRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/settings', require('./routes/settingRoutes'));
app.use('/api/media', require('./routes/mediaRoutes'));

// Specialized category endpoints
app.use('/api/festivals', createCategoryRouter('Festival'));
app.use('/api/traditions', createCategoryRouter('Tradition'));
app.use('/api/art', createCategoryRouter('Art Form'));
app.use('/api/historical-events', createCategoryRouter('Historical Place'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;
  res.json({
    success: true,
    server: 'ok',
    database: isDbConnected ? 'connected' : 'disconnected',
    databaseName: isDbConnected ? mongoose.connection.name : null,
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Something went wrong!'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

let server;
if (require.main === module) {
  const PORT = process.env.PORT && process.env.PORT !== '3000' ? process.env.PORT : (process.env.SERVER_PORT || 5000);
  server = app.listen(PORT, () => {
    console.log(`🚀 DivyaBharat Server running on port ${PORT}`);
    console.log(`🌐 API Endpoint: http://localhost:${PORT}/api`);
    console.log(`🩺 Health check: http://localhost:${PORT}/api/health`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err.message);
    server.close(() => process.exit(1));
  });
}

module.exports = app;
