// server/migrateStateThemes.js
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '..', '.env') });
const State = require('./models/State');

// Read STATE_CULTURAL_THEMES from src/data/stateCulturalThemes.js
const fs = require('fs');
const content = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'stateCulturalThemes.js'), 'utf8');

// Parse the JS object export safely
const match = content.match(/export const STATE_CULTURAL_THEMES = (\{[\s\S]*?\n\};)/);
if (!match) {
  console.error('Could not find STATE_CULTURAL_THEMES in stateCulturalThemes.js');
  process.exit(1);
}

// Evaluate object in safe function context
const rawObjStr = match[1].replace(/;\s*$/, '');
const themesObj = eval(`(${rawObjStr})`);

async function migrate() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/divyabharat';
  console.log('Connecting to:', uri);
  await mongoose.connect(uri);

  let updatedCount = 0;
  for (const [stateName, theme] of Object.entries(themesObj)) {
    const updateData = {
      archStyle: theme.archStyle || '',
      divineTitle: theme.divineTitle || '',
      spiritualTradition: theme.spiritualTradition || '',
      deity: theme.deity || '',
      keyPilgrimages: theme.keyPilgrimages || [],
      heritageLandmarks: theme.heritageLandmarks || [],
      shloka: theme.shloka || '',
      accentColor: theme.accentColor || '',
      bgGradient: theme.bgGradient || ''
    };

    const res = await State.updateOne(
      { name: stateName },
      { $set: updateData }
    );

    if (res.matchedCount > 0) {
      updatedCount++;
      console.log(`✓ Updated state cultural theme: ${stateName}`);
    } else {
      // Case-insensitive match fallback
      const caseMatch = await State.findOne({ name: new RegExp(`^${stateName}$`, 'i') });
      if (caseMatch) {
        await State.updateOne({ _id: caseMatch._id }, { $set: updateData });
        updatedCount++;
        console.log(`✓ Updated state (case-insensitive): ${caseMatch.name}`);
      } else {
        console.warn(`! State not found in DB: ${stateName}`);
      }
    }
  }

  console.log(`\n🎉 Successfully migrated cultural themes for ${updatedCount} States & UTs in MongoDB!`);
  await mongoose.disconnect();
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
