// server/migrateAssetsToGridFS.js
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const stream = require('stream');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '..', '.env') });
const MediaAsset = require('./models/MediaAsset');
const Setting = require('./models/Setting');

async function seedGridFS() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/divyabharat';
  console.log('Connecting to MongoDB GridFS at:', uri);
  await mongoose.connect(uri);

  const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads'
  });

  // 1. Initialize Website Settings in MongoDB if not present
  console.log('⚙️ Checking Website Settings in MongoDB...');
  let settings = await Setting.findOne();
  if (!settings) {
    settings = await Setting.create({
      siteName: 'DivyaBharat',
      tagline: 'Rooted in Culture, United in Spirit',
      heroHeading: 'Discover the Divine. Experience Bharat.',
      heroSubtitle: "Explore India's sacred temples, timeless heritage, ancient traditions and spiritual wonders.",
      contactEmail: 'contact@divyabharat.in',
      contactPhone: '+91 98765 43210',
      address: 'New Delhi, Bharat (India)',
      footerDescription: 'Preserving, documenting, and celebrating the sacred temple architecture, monumental citadels, and living traditions of Bharat.',
      announcement: 'Welcome to DivyaBharat — India Temple Heritage & Pilgrimage Information Portal'
    });
    console.log('✓ Initialized default Website Settings in MongoDB!');
  } else {
    console.log('✓ Website Settings already stored in MongoDB');
  }

  // 2. Upload Core Assets to GridFS
  const assetsDir = path.join(__dirname, '..', 'src', 'assets');
  const filesToUpload = [
    { file: 'logo.png', category: 'logo', desc: 'Official DivyaBharat Sacred Logo' },
    { file: 'homebg.png', category: 'banner', desc: 'Indian Temple Sunrise Hero Backdrop' },
    { file: 'temple.png', category: 'temple', desc: 'Sacred Nagara Shikhara Temple Sunrise' },
    { file: 'heritage.png', category: 'heritage', desc: 'Monumental Royal Ghat & Citadel' },
    { file: 'footer-temple.png', category: 'banner', desc: 'Footer Temple Silhouette Illustration' },
    { file: 'jammu1_katra.png', category: 'state', desc: 'Jammu and Kashmir Katra Sacred Shrine' },
  ];

  console.log('\n📦 Seeding Core Image Assets into MongoDB GridFS...');

  for (const item of filesToUpload) {
    const fullPath = path.join(assetsDir, item.file);
    if (!fs.existsSync(fullPath)) {
      console.warn(`File not found: ${fullPath}`);
      continue;
    }

    // Check if already stored in MediaAsset
    const existing = await MediaAsset.findOne({ originalName: item.file });
    if (existing) {
      console.log(`- Already in GridFS: ${item.file} -> ${existing.url}`);
      continue;
    }

    const buffer = fs.readFileSync(fullPath);
    const uniqueFilename = `seed_${Date.now()}_${item.file}`;
    const contentType = item.file.endsWith('.png') ? 'image/png' : 'image/jpeg';

    await new Promise((resolve, reject) => {
      const readableStream = new stream.Readable();
      readableStream.push(buffer);
      readableStream.push(null);

      const uploadStream = bucket.openUploadStream(uniqueFilename, {
        contentType,
        metadata: {
          originalName: item.file,
          category: item.category,
          isSeeded: true
        }
      });

      readableStream.pipe(uploadStream);

      uploadStream.on('error', reject);
      uploadStream.on('finish', async () => {
        try {
          const fileId = uploadStream.id;
          const asset = await MediaAsset.create({
            filename: uniqueFilename,
            originalName: item.file,
            contentType,
            size: buffer.length,
            category: item.category,
            description: item.desc,
            gridFsId: fileId,
            url: `/api/media/${fileId}`
          });
          console.log(`✓ Stored ${item.file} (${(buffer.length / 1024).toFixed(1)} KB) -> ${asset.url}`);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  // Count GridFS assets
  const totalAssets = await MediaAsset.countDocuments();
  console.log(`\n🎉 Total Media Assets in MongoDB GridFS: ${totalAssets}`);

  await mongoose.disconnect();
}

seedGridFS().catch(err => {
  console.error('GridFS seeding error:', err);
  process.exit(1);
});
