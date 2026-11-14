// server/migrateStateIcons.js
// Migration script: Add authentic cultural icons to all 36 States & UTs in MongoDB
const mongoose = require('mongoose');

const ICONS = {
  'Andhra Pradesh': '🎭',
  'Arunachal Pradesh': '🌄',
  'Assam': '🦏',
  'Bihar': '🪷',
  'Chhattisgarh': '🏺',
  'Goa': '⛪',
  'Gujarat': '🦁',
  'Haryana': '🏹',
  'Himachal Pradesh': '🏔️',
  'Jharkhand': '🌲',
  'Karnataka': '👑',
  'Kerala': '🌴',
  'Madhya Pradesh': '🏛️',
  'Maharashtra': '🚩',
  'Manipur': '🌸',
  'Meghalaya': '🌿',
  'Mizoram': '🌾',
  'Nagaland': '🪶',
  'Odisha': '🛕',
  'Punjab': '🌾',
  'Rajasthan': '🏰',
  'Sikkim': '🏔️',
  'Tamil Nadu': '🛕',
  'Telangana': '💎',
  'Tripura': '👑',
  'Uttar Pradesh': '🕌',
  'Uttarakhand': '🏔️',
  'West Bengal': '🐅',
  'Delhi': '🏛️',
  'Jammu and Kashmir': '❄️',
  'Ladakh': '🏔️',
  'Puducherry': '🌸',
  'Andaman and Nicobar Islands': '🏝️',
  'Lakshadweep': '🌊',
  'Chandigarh': '✋',
  'Dadra and Nagar Haveli and Daman and Diu': '🏰'
};

async function migrate() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/divyabharat';
  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  const statesCol = mongoose.connection.db.collection('states');

  for (const [name, icon] of Object.entries(ICONS)) {
    const res = await statesCol.updateOne(
      { name },
      { $set: { icon, image: '' } }
    );
    console.log(`Updated ${name} => icon: ${icon} (matched: ${res.matchedCount}, modified: ${res.modifiedCount})`);
  }

  const updatedCount = await statesCol.countDocuments({ icon: { $exists: true, $ne: '' } });
  console.log(`\nMigration completed: ${updatedCount} / 36 states now have icons stored in MongoDB.`);

  await mongoose.disconnect();
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
