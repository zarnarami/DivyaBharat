// server/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/divyabharat';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });

    console.log(`✅ MongoDB connected successfully`);
    console.log(`💾 Database: ${conn.connection.name}`);
    console.log(`📍 Host: ${conn.connection.host}:${conn.connection.port}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    console.warn(`👉 Please ensure MongoDB Community Server is running at ${uri}`);
  }
};

// Handle graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
  } catch (err) {
    process.exit(1);
  }
});

module.exports = connectDB;
