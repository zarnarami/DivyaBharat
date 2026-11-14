// server/createAdmin.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const readline = require('readline');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const User = require('./models/User');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function createAdmin() {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/divyabharat';

  try {
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB:', uri);

    // Check command line arguments first: node createAdmin.js <email> <password> <name>
    const args = process.argv.slice(2);
    let name = args[2];
    let email = args[0];
    let password = args[1];

    if (!email || !password) {
      if (process.stdin.isTTY) {
        console.log('\n👑 Create DivyaBharat Administrator Account:');
        name = (await question('Enter Admin Name (DivyaBharat Admin): ')).trim() || 'DivyaBharat Admin';
        email = (await question('Enter Admin Email: ')).trim();
        password = (await question('Enter Admin Password: ')).trim();
      } else {
        name = 'DivyaBharat Admin';
        email = process.env.ADMIN_EMAIL || 'admin@divyabharat.in';
        password = process.env.ADMIN_PASSWORD || 'Admin@DivyaBharat2024';
        console.log(`Using environment configuration for admin: ${email}`);
      }
    }

    if (!email || !password) {
      console.error('❌ Email and password are required');
      process.exit(1);
    }

    if (password.length < 6) {
      console.error('❌ Password must be at least 6 characters');
      process.exit(1);
    }

    // Check if user already exists
    let user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      console.log(`⚠️ User with email ${email} already exists. Updating role to 'admin'...`);
      user.role = 'admin';
      user.isActive = true;
      user.password = password; // Pre-save hook will hash it
      await user.save();
      console.log(`✅ User ${email} is now an active Administrator!`);
    } else {
      user = await User.create({
        name: name || 'DivyaBharat Admin',
        email: email.toLowerCase(),
        password,
        role: 'admin',
        location: 'Bharat',
        phone: '+91 9876543210',
        isActive: true
      });
      console.log(`✅ Administrator account created successfully for: ${email}`);
    }

    console.log('\nAdmin Credentials Summary:');
    console.log(`  Name:  ${user.name}`);
    console.log(`  Email: ${user.email}`);
    console.log(`  Role:  ${user.role}`);
    console.log('  Database: divyabharat\n');

    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating admin:', err.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

createAdmin();
