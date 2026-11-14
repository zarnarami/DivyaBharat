// server/seeds/seedArunachalTemples.js — Permanent MongoDB Seeder for 12 Arunachal Pradesh Sacred Temples & Pilgrimages
const mongoose = require('mongoose');
const Temple = require('../models/Temple');
const State = require('../models/State');

const ARUNACHAL_PRADESH_12_TEMPLES = [
  // 1. Shri Siddheshwar Nath Temple – Ziro
  {
    name: 'Shri Siddheshwar Nath Temple',
    altNames: ['Siddheshwar Nath Shivling', 'Kardo Shiva Temple', 'Ziro Swayambhu Shivling'],
    state: 'Arunachal Pradesh',
    city: 'Ziro',
    district: 'Lower Subansiri',
    location: 'Kardo Hills, near Hapoli, Ziro Plateau',
    address: 'Kardo Forest, Hapoli, Ziro, Lower Subansiri District, Arunachal Pradesh - 791120',
    pincode: '791120',
    category: 'Sacred Natural Site / Active Temple',
    deity: 'Lord Shiva (Swayambhu Siddheshwar Nath)',
    associatedDeities: ['Goddess Parvati', 'Lord Ganesha', 'Nandi'],
    architecture: 'Sacred open-air Himalayan rock sanctuary surrounding a monolithic self-manifested Shivalinga towering ~25 feet high and 22 feet in circumference, shaded by ancient sub-tropical pine and blue-pine groves.',
    history: 'Discovered miraculously on July 26, 2004 by woodcutter Prem Subba in the pristine Kardo forest. The discovery drew archaeological and spiritual scholars who identified the massive monolithic natural rock formation as an authentic self-manifested (Swayambhu) manifestation of Lord Shiva as praised in ancient regional Shaivite lore.',
    significance: 'Celebrated across Northeast India as one of the tallest naturally formed Shivalingas on earth. A perennial natural spring flows continuously beneath the lingam base, and adjacent natural stone contours clearly outline Goddess Parvati and Lord Ganesha with his trunk.',
    mythology: 'According to local belief and Shaivite sages, the Kardo hills were an ancient tapobhumi where sage rishis performed tapasya to Lord Shiva. The natural confluence of the Shivalinga, Mother Parvati, and Ganesha symbolizes the cosmic divine family blessing the Eastern Himalayan frontier.',
    rituals: {
      daily: [
        'Pratah Snanam & Jalabhishek with pure Kardo spring water (06:00 AM)',
        'Bilva Patra & Chandanam Arpana (06:30 AM)',
        'Pratah Aarti & Shankhanaad (07:00 AM)',
        'Madhyahna Pooja & Bhog Arpana (12:00 PM)',
        'Sandhya Deeparadhana & Maha Aarti (06:00 PM)'
      ],
      morningPooja: 'Pratah Jalabhishek at 06:00 AM followed by Maha Mangala Aarti at 07:00 AM.',
      eveningAarti: 'Sandhya Deepa Aarti at 06:00 PM with traditional bells and damru chanting.',
      prasadInfo: 'Kheer prasad, seasonal fruits, panchamrit, and fresh hill water offered to all visiting devotees.',
      specialPooja: 'Special Rudrabhishekam on all Mondays of Shravan month and grand night-long 4-Prahar Abhishekam during Maha Shivaratri.'
    },
    timings: '06:00 AM – 07:00 PM (Daily)',
    darshan: {
      openingTime: '06:00 AM',
      closingTime: '07:00 PM',
      morningDarshan: '06:00 AM – 12:00 PM',
      afternoonBreak: '12:00 PM – 01:00 PM',
      eveningDarshan: '01:00 PM – 07:00 PM',
      specialDarshan: 'Special morning abhishek darshan during Maha Shivaratri and Shravan Somwar.'
    },
    bestTimeToVisit: 'March to October (Pleasant alpine mountain weather; festive season during Shivaratri in Feb/March).',
    festivalsList: [
      { name: 'Maha Shivaratri', month: 'February–March', duration: '3 Days', significance: 'Grand 3-day Mela drawing tens of thousands of pilgrims from Arunachal Pradesh, Assam, and all across India.', rituals: 'Continuous 24-hour Rudrabhishekam, night vigil (Jagaran), and bhajan kirtan.' },
      { name: 'Shravan Maas Somwar', month: 'July–August', duration: '4–5 Weeks', significance: 'Sacred Mondays dedicated to Lord Shiva with holy river water offerings.', rituals: 'Special Jalabhishek and fasting.' },
      { name: 'Kartik Purnima', month: 'November', duration: '1 Day', significance: 'Celebration of lights with hundreds of earthen diyas illuminating the forested sanctum.', rituals: 'Deepotsav and evening Maha Aarti.' }
    ],
    guidelines: {
      dressCode: 'Modest, respectful attire recommended for sacred Himalayan shrine. Warm woolens required in winter.',
      photography: 'Photography permitted in outer forest courtyard; photography restricted during sanctum abhishek rituals.',
      footwear: 'Footwear must be deposited at the outer stone perimeter before ascending the sanctum pedestal.',
      entryRules: 'Free entry for all pilgrims and travelers regardless of background. Respect the sacred natural ecosystem.',
      accessibility: 'Stone stepped pathway through forest; gentle assistance provided for elderly devotees.'
    },
    facilities: {
      parking: true,
      drinkingWater: true,
      restrooms: true,
      accommodation: true,
      dharamshala: 'Community pilgrim rest house near temple complex; comfortable eco-lodges in Hapoli and Ziro.',
      nearbyHotels: 'Resorts, homestays, and boutique lodges in Ziro Valley (6 km away).',
      transport: 'Shared and private sumos, taxis available from Hapoli and Old Ziro town.'
    },
    nearbyTransport: {
      railway: 'Naharlagun Railway Station (NHLN) – 100 km; North Lakhimpur Railway Station (NLP) – 115 km.',
      airport: 'Hollongi Airport / Donyi Polo Airport, Itanagar (HGI) – 125 km; Lilabari Airport, Lakhimpur (IXI) – 120 km.',
      bus: 'APSTC Bus Terminal at Hapoli (6 km); regular overnight buses from Itanagar and Guwahati.',
      local: 'Local taxis, shared Tata Sumos from Ziro/Hapoli main market.'
    },
    coordinates: { lat: 27.5611, lng: 93.8428 },
    mapsUrl: 'https://maps.google.com/?q=27.5611,93.8428',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=900&auto=format&fit=crop&q=80'
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80', caption: 'Shri Siddheshwar Nath sacred forested sanctum in Kardo hills', category: 'Exterior' },
      { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&auto=format&fit=crop&q=80', caption: 'Pristine Himalayan pine landscape enveloping Ziro temple', category: 'Landscape' },
      { url: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=900&auto=format&fit=crop&q=80', caption: 'Devotees offering prayers during Maha Shivaratri', category: 'Ritual' }
    ],
    pilgrimageCircuits: ['Subansiri Sacred Shiva Circuit'],
    isFeatured: true,
    isActive: true
  },

  // 2. Malinithan Temple – Likabali
  {
    name: 'Malinithan Temple',
    altNames: ['Malini Than Shrine', 'Malini Mandir', 'Malinithan Ruins'],
    state: 'Arunachal Pradesh',
    city: 'Likabali',
    district: 'Lower Siang',
    location: 'Likabali Foothills, Lower Siang',
    address: 'Malinithan Archaeological Complex, Likabali, Lower Siang District, Arunachal Pradesh - 787059',
    pincode: '787059',
    category: 'Archaeological Temple Site / Active Temple',
    deity: 'Goddess Malini (Goddess Durga / Mahisasuramardini)',
    associatedDeities: ['Lord Shiva', 'Lord Krishna', 'Lord Surya', 'Lord Ganesha', 'Nandi'],
    architecture: 'Classical Asomiya-Kalinga influenced carved granite and basalt stone temple architecture dating to the 13th–14th century CE, featuring intricately sculpted plinths, floral friezes, and iconic deities carved out of hard granitic rock.',
    history: 'Excavated between 1968 and 1971 by the Department of Cultural Affairs, Government of Arunachal Pradesh. The excavations revealed an extensive medieval temple complex built by the Chutia Kings of eastern Assam and Arunachal. Over 24 sculpted images of gods and goddesses, erotic panels, and animal figures were unearthed.',
    significance: 'A renowned Shakti shrine where historical classical temple masonry blends with vibrant local mythological traditions of the Siang valley. It is revered as a sacred confluence of Vaishnava and Shakta heritage.',
    mythology: 'According to legend, Lord Krishna and his bride Rukmini (daughter of King Bhismaka of Vidarbha / Bhismaknagar) were traveling to Dwarka when Lord Shiva and Goddess Parvati greeted them with garlands of celestial fragrant flowers. Enchanted by her warmth and the divine garland, Krishna affectionately addressed Parvati as "Malini" (she who weaves flower garlands), and proclaimed that the site would forever be revered as Malinithan.',
    rituals: {
      daily: [
        'Pratah Puja & Kumkumarchana at the active sanctum (07:00 AM)',
        'Pushparchana & Naivedya offering (10:00 AM)',
        'Bhog distribution to visiting pilgrims (12:30 PM)',
        'Sandhya Aarti & Lamp Offering (05:30 PM)'
      ],
      morningPooja: 'Daily morning puja at 07:00 AM with fragrant flower garlands.',
      eveningAarti: 'Deepa Aarti at 05:30 PM facing the scenic Siang foothill valley.',
      prasadInfo: 'Khichdi prasad, fruits, and dry sweets blessed at the Goddess sanctum.',
      specialPooja: 'Chandi Path and Navachandi Homa conducted during Navaratri.'
    },
    timings: '06:00 AM – 06:00 PM (Daily)',
    darshan: {
      openingTime: '06:00 AM',
      closingTime: '06:00 PM',
      morningDarshan: '06:00 AM – 12:00 PM',
      afternoonBreak: 'Open continuously for visitors and devotees',
      eveningDarshan: '12:00 PM – 06:00 PM',
      specialDarshan: 'Basanti Puja and Autumn Durga Puja special darshans.'
    },
    bestTimeToVisit: 'October to April (Pleasant weather; festive celebrations in autumn and spring).',
    festivalsList: [
      { name: 'Malinithan Basanti Puja (Chaitra Navaratri)', month: 'March–April', duration: '4 Days', significance: 'Historical festival drawing thousands of pilgrims from across Assam and Arunachal Pradesh.', rituals: 'Goddess Mahisasuramardini special Abhishek, Chandi Path, and folk cultural fair.' },
      { name: 'Sharad Navaratri & Durga Puja', month: 'October', duration: '5 Days', significance: 'Autumn worship of Mother Durga with floral offerings.', rituals: 'Sandhi Puja, Pushpanjali, and community feast.' },
      { name: 'Maha Shivaratri', month: 'February–March', duration: '1 Day', significance: 'Worship of the ancient Nandi bull and Shivalinga uncovered at the site.', rituals: 'Jalabhishekam and evening lamps.' }
    ],
    guidelines: {
      dressCode: 'Decent, respectful clothing. Devotees are requested to wear traditional or modest attire.',
      photography: 'Photography allowed across the archaeological garden and museum; prohibited inside the active deity sanctum.',
      footwear: 'Footwear must be removed before entering the sanctum platform.',
      entryRules: 'Nominal ASI / State Archaeological site entry fee applies for museum complex maintenance.',
      accessibility: 'Paved walkways and manicured lawns accessible for visitors.'
    },
    facilities: {
      parking: true,
      drinkingWater: true,
      restrooms: true,
      accommodation: true,
      dharamshala: 'Tourism department guest house and private lodges in Likabali town (1 km away).',
      nearbyHotels: 'Hotels and resorts in Likabali and nearby Silapathar (Assam border, 10 km).',
      transport: 'Auto-rickshaws, shared taxis from Likabali bus stop and Silapathar railway station.'
    },
    nearbyTransport: {
      railway: 'Silapathar Railway Station (SPTR) – 10 km; Murkongselek Railway Station (MZS) – 65 km.',
      airport: 'Lilabari Airport, North Lakhimpur (IXI) – 85 km; Donyi Polo Airport, Itanagar (HGI) – 165 km.',
      bus: 'Likabali Bus Stand – 1.5 km; regular buses from Itanagar, Pasighat, and North Lakhimpur.',
      local: 'Auto-rickshaws, local private taxis stationed at Likabali junction.'
    },
    coordinates: { lat: 27.6521, lng: 94.6974 },
    mapsUrl: 'https://maps.google.com/?q=27.6521,94.6974',
    image: 'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=900&auto=format&fit=crop&q=80'
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80', caption: 'Carved granitic sculptures and temple ruins at Malinithan', category: 'Architecture' },
      { url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=900&auto=format&fit=crop&q=80', caption: 'Lush greenery of Likabali foothills enveloping the sanctum', category: 'Landscape' },
      { url: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=900&auto=format&fit=crop&q=80', caption: 'Historic stone carvings dating to the 13th–14th century', category: 'Detail' }
    ],
    pilgrimageCircuits: ['Siang Shakti & Ancient Tirtha Circuit'],
    isFeatured: true,
    isActive: true
  },

  // 3. Parashuram Kund – Lohit District
  {
    name: 'Parashuram Kund',
    altNames: ['Brahma Kund', 'Parashuram Tirtha', 'Holy Lohit Kund'],
    state: 'Arunachal Pradesh',
    city: 'Wakro',
    district: 'Lohit',
    location: 'Lower reaches of Lohit River, near Wakro',
    address: 'Parashuram Kund Pilgrimage Site, Wakro, Lohit District, Arunachal Pradesh - 792102',
    pincode: '792102',
    category: 'Pilgrimage Site (Tirtha) / Sacred Natural Site',
    deity: 'Lord Parashuram (Sixth Incarnation of Lord Vishnu)',
    associatedDeities: ['Lord Shiva', 'Sage Jamadagni', 'Mother Renuka', 'Goddess Ganga / Lohit'],
    architecture: 'Sacred natural riverine amphitheater enclosed by towering Mishmi mountain cliffs, with flight of stone steps descending to the crystal-clear turquoise waters of the Lohit River, accompanied by a dedicated cliffside mandir complex.',
    history: 'Venerated since the Puranic age and documented in the Kalika Purana, Srimad Bhagavatam, and Mahabharata. Renowned sadhus and kings from across Bharat have made pilgrimages here for millennia. In the early 20th century, a holy hermit named Swami Govindananda renovated the shrine steps.',
    significance: 'One of the most sacred Hindu pilgrimage sites in Northeast India. A holy dip in the crystal waters during Makar Sankranti is believed to cleanse devotees of all sins and grant spiritual salvation, mirroring the sanctity of Prayagraj and Haridwar.',
    mythology: 'According to the Kalika Purana, Sage Parashuram obeyed his father Sage Jamadagni\'s order and beheaded his mother Renuka. Struck by guilt, the battle-axe (parashu) became miraculously stuck to his hand. Parashuram visited holy rivers across the subcontinent, but the axe would not detach. When he finally took a dip in the sacred Brahma Kund in the Lohit gorge of Arunachal Pradesh, the axe slipped from his hand, washing away all sin. Parashuram then cleaved the mountain to let the holy waters flow forth for humanity.',
    rituals: {
      daily: [
        'Holy Snanam (Bathing ritual) in sacred Kund at sunrise (05:30 AM)',
        'Tarpanam and Pitru Pooja on riverbank (07:00 AM)',
        'Parashuram Mandir Puja & Mangal Aarti (08:00 AM)',
        'Sandhya Deepa Dan on Lohit river waters (05:00 PM)'
      ],
      morningPooja: 'Morning Snanam followed by Temple Archana at 08:00 AM.',
      eveningAarti: 'Evening River Aarti with brass lamps and conch blowing at 05:00 PM.',
      prasadInfo: 'Mahaprasad consisting of khichdi, halwa, and holy water (Charnamrit) from the Kund.',
      specialPooja: 'Maha Snanam and special Hawan during Makar Sankranti dawn.'
    },
    timings: '05:00 AM – 06:30 PM (Daily)',
    darshan: {
      openingTime: '05:00 AM',
      closingTime: '06:30 PM',
      morningDarshan: '05:00 AM – 12:00 PM',
      afternoonBreak: 'Open continuously for river snanam and temple visits',
      eveningDarshan: '12:00 PM – 06:30 PM',
      specialDarshan: 'Round-the-clock festival darshan during Makar Sankranti Mela.'
    },
    bestTimeToVisit: 'November to February (Winter months are pleasant and holy dip season peaks during Makar Sankranti in mid-January).',
    festivalsList: [
      { name: 'Parashuram Kund Mela (Makar Sankranti)', month: 'January 13–16', duration: '4 Days', significance: 'Grand pilgrimage fair drawing over 100,000 sadhus, pilgrims, and international visitors.', rituals: 'Holy dawn bath in Lohit river, Hawan, mass Bhandara, and cultural fairs.' },
      { name: 'Kartik Purnima', month: 'November', duration: '1 Day', significance: 'Sacred river worship with floating lamps on Lohit waters.', rituals: 'Deepa Dan and Ganga Aarti.' },
      { name: 'Parashuram Jayanti', month: 'April–May (Akshaya Tritiya)', duration: '1 Day', significance: 'Celebration of Lord Parashuram\'s appearance day with scripture recitations.', rituals: 'Special Abhishekam and Shastra Puja.' }
    ],
    guidelines: {
      dressCode: 'Modest traditional clothes. Carry extra dry clothes for after taking holy river bath.',
      photography: 'Photography permitted along riverbank and landscape; follow local priest instructions inside deity sanctum.',
      footwear: 'Footwear allowed on approach trails; must be removed before entering holy Kund steps and mandir.',
      entryRules: 'Free entry for all pilgrims. Inner Line Permit (ILP) required to enter Arunachal Pradesh.',
      accessibility: 'Steep stone steps lead down to the riverbed; handrails provided. Caution advised along rocky riverbank.'
    },
    facilities: {
      parking: true,
      drinkingWater: true,
      restrooms: true,
      accommodation: true,
      dharamshala: 'Large permanent pilgrim complex, tourist lodges, and government guest houses at Wakro and Tezu.',
      nearbyHotels: 'Eco-resorts, homestays, and government inspection bungalows in Wakro (18 km) and Tezu (45 km).',
      transport: 'Shared sumos, private cabs, and state transport buses operating from Tinsukia, Tezu, and Namsai.'
    },
    nearbyTransport: {
      railway: 'Tinsukia Junction (TSK) – 140 km; Rupai Railway Station – 110 km.',
      airport: 'Tezu Airport (TEZ) – 45 km; Dibrugarh Airport / Mohanbari (DIB) – 180 km.',
      bus: 'Wakro Bus Station – 18 km; Tezu Bus Terminal – 45 km; special mela bus services deployed by APSTC.',
      local: 'Shared jeeps, tourist cabs from Namsai, Tezu, and Wakro.'
    },
    coordinates: { lat: 27.8767, lng: 96.3572 },
    mapsUrl: 'https://maps.google.com/?q=27.8767,96.3572',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=900&auto=format&fit=crop&q=80'
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&auto=format&fit=crop&q=80', caption: 'Sacred Parashuram Kund river gorge and azure Lohit waters', category: 'Landscape' },
      { url: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=900&auto=format&fit=crop&q=80', caption: 'Mountain cascades feeding the sacred pilgrimage pool', category: 'Nature' },
      { url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=900&auto=format&fit=crop&q=80', caption: 'Mishmi mountain ridge guarding the holy tirtha', category: 'View' }
    ],
    pilgrimageCircuits: ['Holy Lohit & Parashuram Circuit'],
    isFeatured: true,
    isActive: true
  },

  // 4. Akashiganga Temple – Lower Siang
  {
    name: 'Akashiganga Temple',
    altNames: ['Akashi Ganga Shrine', 'Akashiganga Shakti Peeth', 'Holy Waterfall of Siang'],
    state: 'Arunachal Pradesh',
    city: 'Likabali',
    district: 'Lower Siang',
    location: 'Likabali-Basar Road, Lower Siang',
    address: 'Akashiganga Mountain Ridge, Along-Likabali Highway, Lower Siang District, Arunachal Pradesh - 787059',
    pincode: '787059',
    category: 'Pilgrimage Site (Shakti Peetha) / Sacred Natural Site',
    deity: 'Goddess Sati / Bhagavati Akashiganga (Divine Mother)',
    associatedDeities: ['Lord Shiva', 'Bhairava', 'Lord Ganesha'],
    architecture: 'Sacred mountain ridge shrine situated atop a hill overlooking the Brahmaputra valley, with a flight of stone steps descending into a narrow rocky ravine where a perennial stream of holy water springs directly from the cliff into a sacred pool.',
    history: 'Referenced in ancient Puranic texts including the Kalika Purana. Revered as one of the sacred 51 Shakti Peethas of ancient Bharat. Devotees and sages have undertaken holy treks down into the ravine for centuries to receive blessings from the divine mother.',
    significance: 'Legend holds that the head (or forehead) of Goddess Sati fell here when Lord Vishnu severed her body into pieces with the Sudarshana Chakra. The sacred water pool in the ravine is venerated for its miraculous healing properties and spiritual purity.',
    mythology: 'According to the Sati mythos, following the destruction of Daksha\'s sacrifice, Lord Shiva wandered in celestial grief carrying Sati\'s body. As Vishnu\'s discus severed her limbs, Sati\'s head plummeted onto these Eastern Himalayan hills. A celestial spring gushed forth from the heavens to sanctify the sacred spot, giving it the name "Akashiganga" (Ganges of the Sky).',
    rituals: {
      daily: [
        'Pratah Puja & Sanctum Mangal Aarti (07:00 AM)',
        'Holy Snanam in sacred stream by pilgrims (08:00 AM)',
        'Kumkumarchana & Devi Stotram recitation (11:00 AM)',
        'Sandhya Deeparadhana (05:00 PM)'
      ],
      morningPooja: 'Morning prayer at 07:00 AM with red vermilion and flowers.',
      eveningAarti: 'Evening Deepa Aarti at 05:00 PM with sunset panoramic valley view.',
      prasadInfo: 'Sweet batasha, coconut, and charnamrit from the sacred mountain stream.',
      specialPooja: 'Navaratri Chandi Path and Maha Ashtami Hawan.'
    },
    timings: '06:00 AM – 05:30 PM (Daily)',
    darshan: {
      openingTime: '06:00 AM',
      closingTime: '05:30 PM',
      morningDarshan: '06:00 AM – 12:00 PM',
      afternoonBreak: 'Open continuously during daylight hours',
      eveningDarshan: '12:00 PM – 05:30 PM',
      specialDarshan: 'Navaratri and Makar Sankranti special darshans.'
    },
    bestTimeToVisit: 'October to April (Dry winter months provide safe stone trail trekking down into the ravine).',
    festivalsList: [
      { name: 'Chaitra Navaratri', month: 'March–April', duration: '9 Days', significance: 'Celebration of the Divine Mother with special pujas and fasting.', rituals: 'Daily Durga Saptashati recitation and flower offerings.' },
      { name: 'Sharad Navaratri', month: 'September–October', duration: '9 Days', significance: 'Autumn worship attracting devotees from all across Northeast India.', rituals: 'Deepa Dan, Kumkumarchana, and Prasad distribution.' },
      { name: 'Makar Sankranti', month: 'January 14', duration: '1 Day', significance: 'Holy bath in the Akashiganga stream pool.', rituals: 'Holy dip and Surya Arghya.' }
    ],
    guidelines: {
      dressCode: 'Comfortable clothing and sturdy walking shoes suitable for mountain steps.',
      photography: 'Photography permitted in viewpoints and hill trails; restricted inside the deity sanctum.',
      footwear: 'Footwear to be removed at the sanctum entrance and holy pool precinct.',
      entryRules: 'Free entry for all pilgrims. Inner Line Permit (ILP) required to enter Arunachal Pradesh.',
      accessibility: 'Stone steps descend approximately 100 meters down into the ravine; elderly pilgrims can worship at the top hilltop temple.'
    },
    facilities: {
      parking: true,
      drinkingWater: true,
      restrooms: true,
      accommodation: false,
      dharamshala: 'Pilgrim shelter and rest sheds at ridge; hotels available in Likabali (12 km away).',
      nearbyHotels: 'Lodges and guest houses in Likabali and Basar.',
      transport: 'Taxis and shared sumos ply regularly between Likabali, Basar, and Aalo.'
    },
    nearbyTransport: {
      railway: 'Silapathar Railway Station (SPTR) – 22 km; North Lakhimpur – 95 km.',
      airport: 'Lilabari Airport, North Lakhimpur (IXI) – 95 km; Donyi Polo Airport, Itanagar – 175 km.',
      bus: 'Likabali Bus Stand – 12 km; roadside buses drop directly at temple gate on highway.',
      local: 'Shared taxis and Sumos from Likabali and Silapathar.'
    },
    coordinates: { lat: 27.6978, lng: 94.7542 },
    mapsUrl: 'https://maps.google.com/?q=27.6978,94.7542',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=900&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&auto=format&fit=crop&q=80'
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=900&auto=format&fit=crop&q=80', caption: 'Akashiganga mountain stream cascading through the rocky ravine', category: 'Waterfall' },
      { url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&auto=format&fit=crop&q=80', caption: 'Himalayan foothills overlooking the Brahmaputra plains', category: 'Landscape' }
    ],
    pilgrimageCircuits: ['Siang Shakti & Ancient Tirtha Circuit'],
    isFeatured: true,
    isActive: true
  },

  // 5. Shivalinga at Kardo Hills – Ziro
  {
    name: 'Shivalinga at Kardo Hills',
    altNames: ['Kardo Forest Shivalingam', 'Miracle Shivalinga of Ziro', 'Swayambhu Kardoeshwar'],
    state: 'Arunachal Pradesh',
    city: 'Ziro',
    district: 'Lower Subansiri',
    location: 'Kardo Forest Ridge, Ziro Plateau',
    address: 'Kardo Hills, near Hapoli, Lower Subansiri District, Arunachal Pradesh - 791120',
    pincode: '791120',
    category: 'Sacred Natural Site / Active Temple',
    deity: 'Lord Shiva (Swayambhu Monolith)',
    associatedDeities: ['Goddess Uma / Parvati', 'Goddess Ganga', 'Lord Nandi'],
    architecture: 'Monolithic open-sky self-manifested granite and sandstone Shivalinga rising majestically from the earth, flanked by naturally contoured stone representations of Parvati and Ganesha, protected by a rustic stone-paved pradakshina path and brass bells.',
    history: 'Discovered in July 2004 during timber clearance, the discovery quickly garnered national reverence. Devotees recognized the exact geographic descriptors corresponding to Puranic traditions of sacred Shivalingas in the eastern mountains (Purva Himalaya).',
    significance: 'Measuring 25 feet in height, 22 feet in girth, with a naturally flowing underground spring at its base, the monolithic lingam is recognized as an awe-inspiring natural wonder and sacred pilgrimage destination in the serene Apatani tribal heartland.',
    mythology: 'Believed to be a self-existent cosmic pillar (Swayambhu Jyotirlinga manifestation) where Lord Shiva manifests in his formless stone majesty to bless the peaceful valley and its ecological guardians.',
    rituals: {
      daily: [
        'Dawn Jalabhishekam with spring water and wild flowers (06:30 AM)',
        'Panchamrit Abhishek & Chandan Lepanam (08:30 AM)',
        'Bhajan Sandhya & Damru Aarti (06:00 PM)'
      ],
      morningPooja: 'Morning Jalabhishek at 06:30 AM with Vedic mantras.',
      eveningAarti: 'Evening Deepa Aarti at 06:00 PM with conch resonance.',
      prasadInfo: 'Dry fruits, peda, and sacred hill water blessed at the lingam base.',
      specialPooja: 'Rudri Path and Maha Mrityunjaya Japa performed by visiting pandits.'
    },
    timings: '06:00 AM – 06:30 PM (Daily)',
    darshan: {
      openingTime: '06:00 AM',
      closingTime: '06:30 PM',
      morningDarshan: '06:00 AM – 12:00 PM',
      afternoonBreak: 'Open continuously for parikrama and darshan',
      eveningDarshan: '12:00 PM – 06:30 PM',
      specialDarshan: 'Maha Shivaratri night darshan with oil lamps.'
    },
    bestTimeToVisit: 'March to November (Mild mountain temperatures; scenic pine forest views).',
    festivalsList: [
      { name: 'Maha Shivaratri Festival', month: 'February–March', duration: '3 Days', significance: 'Massive devotional gathering with free community kitchen and cultural programs.', rituals: 'Continuous milk and honey Abhishekam, night vigil, and devotional singing.' },
      { name: 'Guru Purnima', month: 'July', duration: '1 Day', significance: 'Reverence of cosmic guru Lord Shiva (Adiyogi).', rituals: 'Special Pushpanjali and Guru Puja.' }
    ],
    guidelines: {
      dressCode: 'Modest warm clothing. Respect the peaceful forest sanctity.',
      photography: 'Photography permitted; please do not disturb devotees in silent meditation.',
      footwear: 'Footwear strictly prohibited within 20 meters of the sacred lingam perimeter.',
      entryRules: 'Free entry for all. Keep the sacred pine forest clean and plastic-free.',
      accessibility: 'Paved walking path through pine trees with gentle slope.'
    },
    facilities: {
      parking: true,
      drinkingWater: true,
      restrooms: true,
      accommodation: true,
      dharamshala: 'Pilgrim shelter at Kardo; wide range of homestays and hotels in Ziro Valley.',
      nearbyHotels: 'Ziro Valley homestays, Apatani bamboo cottages, and hotels in Hapoli.',
      transport: 'Local taxis, auto-rickshaws, and sumos from Ziro center.'
    },
    nearbyTransport: {
      railway: 'Naharlagun (NHLN) – 100 km; North Lakhimpur – 115 km.',
      airport: 'Donyi Polo Airport, Itanagar (HGI) – 125 km; Lilabari – 120 km.',
      bus: 'Hapoli APSTC Bus Stand – 6 km.',
      local: 'Taxis, shared jeeps available in Hapoli market.'
    },
    coordinates: { lat: 27.5615, lng: 93.8432 },
    mapsUrl: 'https://maps.google.com/?q=27.5615,93.8432',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&auto=format&fit=crop&q=80'
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80', caption: 'The awe-inspiring monolithic Swayambhu Shivalinga at Kardo Hills', category: 'Monolith' },
      { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&auto=format&fit=crop&q=80', caption: 'Tranquil Himalayan pine canopy sheltering Kardo sanctum', category: 'Forest' }
    ],
    pilgrimageCircuits: ['Subansiri Sacred Shiva Circuit'],
    isFeatured: false,
    isActive: true
  },

  // 6. Meghna Cave Temple – Daporijo
  {
    name: 'Meghna Cave Temple',
    altNames: ['Meghna Guha Mandir', 'Daporijo Cave Temple', 'Lakulisha Shiva Cave'],
    state: 'Arunachal Pradesh',
    city: 'Daporijo',
    district: 'Upper Subansiri',
    location: 'Mountaintop cliff near Daporijo town',
    address: 'Meghna Cave Temple Road, Daporijo, Upper Subansiri District, Arunachal Pradesh - 791122',
    pincode: '791122',
    category: 'Sacred Natural Site / Active Cave Temple',
    deity: 'Lord Shiva (Lakulisha Mahadev)',
    associatedDeities: ['Nandi', 'Lord Ganesha', 'Goddess Parvati'],
    architecture: 'Natural limestone and rock-hewn cave sanctum situated at an elevation of approximately 3,000 feet above sea level, reached via a grand flight of around 200 stone steps carved through subtropical rainforest, offering 360-degree views of the rushing Subansiri River.',
    history: 'The ancient cave is believed to date back to antiquity and was rediscovered in 1962 during infrastructure surveys. Archaeological exploration revealed ancient carved motifs, Shivalinga pedestals, and stone carvings testifying to centuries of Shaivite hermit meditation in the remote Subansiri valley.',
    significance: 'A prominent pilgrimage sanctuary in Upper Subansiri where ancient nature spirituality meets Vedic Shaivite worship. The sublime mountain ambiance creates an atmosphere of deep meditative stillness for sadhus and pilgrims.',
    mythology: 'Legend recounts that ancient rishis traveled to these high cliffs along the sacred Subansiri (Swarnashri) river to perform austerities to Lord Lakulisha, the 28th manifestation of Lord Shiva, receiving divine vision and cosmic peace.',
    rituals: {
      daily: [
        'Pratah Cave Deepa Prajvalan & Jalabhishek (07:00 AM)',
        'Shiva Sahasranama Chanting (09:00 AM)',
        'Sandhya Dhupa & Aarti (05:00 PM)'
      ],
      morningPooja: 'Morning Puja and Jalabhishek at 07:00 AM.',
      eveningAarti: 'Evening Deepa Aarti at 05:00 PM overlooking the Subansiri valley.',
      prasadInfo: 'Fruits, batasha, and herbal tea offered to pilgrims.',
      specialPooja: 'Special Maha Shivaratri cave night vigil and Havan.'
    },
    timings: '06:00 AM – 05:30 PM (Daily)',
    darshan: {
      openingTime: '06:00 AM',
      closingTime: '05:30 PM',
      morningDarshan: '06:00 AM – 12:00 PM',
      afternoonBreak: 'Open continuously during daylight hours',
      eveningDarshan: '12:00 PM – 05:30 PM',
      specialDarshan: 'Maha Shivaratri all-day darshan with special security.'
    },
    bestTimeToVisit: 'October to April (Cool, clear skies with breathtaking Himalayan mountain views).',
    festivalsList: [
      { name: 'Maha Shivaratri', month: 'February–March', duration: '2 Days', significance: 'Annual high-altitude pilgrimage fair celebrated with great devotion by local tribes and Hindu devotees.', rituals: 'Abhishekam inside the cave, lighting of hundreds of oil lamps, and community feasts.' },
      { name: 'Makar Sankranti', month: 'January', duration: '1 Day', significance: 'Sun entering Capricorn observed with prayers and river snanam in the Subansiri River.', rituals: 'Holy bath in river and cave climbing.' }
    ],
    guidelines: {
      dressCode: 'Comfortable clothing and non-slip walking shoes for climbing stone steps.',
      photography: 'Photography permitted on viewpoints and stairs; respectful conduct inside cave sanctum.',
      footwear: 'Footwear must be deposited at cave entrance before stepping onto the sanctum stone floor.',
      entryRules: 'Free entry. Devotees are requested to maintain the quiet sanctity of the cave.',
      accessibility: 'Requires climbing ~200 steps; rest benches provided along the ascent.'
    },
    facilities: {
      parking: true,
      drinkingWater: true,
      restrooms: true,
      accommodation: false,
      dharamshala: 'Tourist lodges, circuit house, and inspection bungalows in Daporijo town (6 km away).',
      nearbyHotels: 'Hotels and guest houses in Daporijo market and riverfront.',
      transport: 'Shared Sumos, auto-rickshaws, and private cabs available from Daporijo.'
    },
    nearbyTransport: {
      railway: 'Silapathar Railway Station – 180 km; North Lakhimpur – 220 km.',
      airport: 'Daporijo Airstrip (charter/military); Donyi Polo Airport, Itanagar (HGI) – 260 km; Lilabari – 210 km.',
      bus: 'Daporijo APSTC Bus Terminal – 6 km; daily bus/sumo service from Itanagar, Ziro, and Aalo.',
      local: 'Local taxis, shared Sumos from Daporijo town.'
    },
    coordinates: { lat: 27.9867, lng: 94.2214 },
    mapsUrl: 'https://maps.google.com/?q=27.9867,94.2214',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&auto=format&fit=crop&q=80'
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&auto=format&fit=crop&q=80', caption: 'Meghna Cave entrance set high on the mountain cliff', category: 'Cave' },
      { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&auto=format&fit=crop&q=80', caption: 'Panoramic Subansiri River valley view from the cave ridge', category: 'View' }
    ],
    pilgrimageCircuits: ['Subansiri Sacred Shiva Circuit'],
    isFeatured: true,
    isActive: true
  },

  // 7. Dangoria Baba Mandir – Pasighat
  {
    name: 'Dangoria Baba Mandir',
    altNames: ['Dangoria Baba Temple', 'Pasighat Dangoria Than', '2 Mile Baba Mandir'],
    state: 'Arunachal Pradesh',
    city: 'Pasighat',
    district: 'East Siang',
    location: '2 Mile Area, Pasighat',
    address: '2 Mile, Pasighat Town, East Siang District, Arunachal Pradesh - 791102',
    pincode: '791102',
    category: 'Active Temple',
    deity: 'Dangoria Baba (Spiritual Guardian / Shiva Manifestation)',
    associatedDeities: ['Lord Shiva', 'Lord Hanuman', 'Goddess Kali'],
    architecture: 'Traditional temple pavilion architecture surrounded by serene banyan and peepal trees, featuring an ornate sanctum tower, brass bells, and an open prayer hall.',
    history: 'Established decades ago by devotees honoring Dangoria Baba, an ancient spiritual guardian recognized across the Brahmaputra and Siang valleys as a protective deity of travelers, frontiersmen, and villagers. Both Adi communities and Hindu devotees offer prayers here before embarking on journeys.',
    significance: 'Celebrated as the spiritual guardian shrine of Pasighat. Devotees believe that sincere prayers to Dangoria Baba grant protection from road perils, illnesses, and negative energies, while fostering harmony among all valley communities.',
    mythology: 'Rooted in regional spiritual traditions wherein enlightened forest ascetics (Dangoria Babas) attained oneness with Lord Shiva and continue to spiritually safeguard the eastern Himalayan foothills.',
    rituals: {
      daily: [
        'Pratah Mangal Aarti & Dhoop Seva (06:30 AM)',
        'Bhajan & Hanuman Chalisa recitations (08:00 AM)',
        'Madhyahna Bhog (12:00 PM)',
        'Sandhya Deeparadhana & Maha Aarti (06:00 PM)'
      ],
      morningPooja: 'Morning Mangal Aarti at 06:30 AM.',
      eveningAarti: 'Evening Deepa Aarti at 06:00 PM with conch shells and cymbals.',
      prasadInfo: 'Sweet boondi, roasted chickpeas, fruits, and panchamrit.',
      specialPooja: 'Special Tuesdays and Saturdays Hanuman & Dangoria Baba rituals.'
    },
    timings: '05:30 AM – 08:00 PM (Daily)',
    darshan: {
      openingTime: '05:30 AM',
      closingTime: '08:00 PM',
      morningDarshan: '05:30 AM – 12:30 PM',
      afternoonBreak: '12:30 PM – 03:00 PM',
      eveningDarshan: '03:00 PM – 08:00 PM',
      specialDarshan: 'Annual Dangoria Baba Mela all-day darshan.'
    },
    bestTimeToVisit: 'Throughout the year; October to April has ideal pleasant weather.',
    festivalsList: [
      { name: 'Annual Dangoria Baba Mela', month: 'April', duration: '2 Days', significance: 'Community devotional festival uniting diverse tribal and non-tribal residents.', rituals: 'Continuous Akhand Path, community feast (bhandara), and cultural hymns.' },
      { name: 'Guru Purnima', month: 'July', duration: '1 Day', significance: 'Worship of spiritual masters and holy gurus.', rituals: 'Special Paduka Puja and Bhajan.' },
      { name: 'Maha Shivaratri', month: 'February–March', duration: '1 Day', significance: 'Celebration of Lord Shiva with night-long vigils.', rituals: 'Milk Abhishekam and Aarti.' }
    ],
    guidelines: {
      dressCode: 'Clean, modest clothing. Devotees remove shoes before entering the temple courtyard.',
      photography: 'Photography permitted in outer courtyard; restricted inside the sanctum sanctorum.',
      footwear: 'Footwear stand available at the main gate.',
      entryRules: 'Open to all devotees and visitors. Maintain peace and reverence.',
      accessibility: 'Ground level temple with easy wheelchair and walker accessibility.'
    },
    facilities: {
      parking: true,
      drinkingWater: true,
      restrooms: true,
      accommodation: false,
      dharamshala: 'Community pilgrim hall; numerous hotels and homestays in Pasighat town (2 km).',
      nearbyHotels: 'Star hotels, riverside resorts, and lodges in Pasighat.',
      transport: 'Auto-rickshaws, e-rickshaws, and town buses readily available.'
    },
    nearbyTransport: {
      railway: 'Murkongselek Railway Station (MZS) – 35 km; Silapathar – 90 km.',
      airport: 'Pasighat Airport (IXT) – 5 km; Dibrugarh Airport (DIB) – 140 km via Bogibeel Bridge.',
      bus: 'Pasighat Bus Station – 2.5 km; regular buses to Itanagar, Dibrugarh, and Guwahati.',
      local: 'Auto-rickshaws and cabs available throughout Pasighat.'
    },
    coordinates: { lat: 28.0672, lng: 95.3265 },
    mapsUrl: 'https://maps.google.com/?q=28.0672,95.3265',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=900&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=900&auto=format&fit=crop&q=80'
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=900&auto=format&fit=crop&q=80', caption: 'Dangoria Baba Mandir complex in Pasighat', category: 'Exterior' },
      { url: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=900&auto=format&fit=crop&q=80', caption: 'Devotional aarti lamps lit in the evening prayer hall', category: 'Ritual' }
    ],
    pilgrimageCircuits: ['Siang Shakti & Ancient Tirtha Circuit'],
    isFeatured: false,
    isActive: true
  },

  // 8. Gomsi Temple Site – East Siang
  {
    name: 'Gomsi Temple Site',
    altNames: ['Gomsi Archaeological Site', 'Gomsi Rani Ruins', 'Ancient Brick Temple of Rani'],
    state: 'Arunachal Pradesh',
    city: 'Pasighat',
    district: 'East Siang',
    location: 'Rani Village, East Siang',
    address: 'Rani Village, near Pasighat, East Siang District, Arunachal Pradesh - 791102',
    pincode: '791102',
    category: 'Archaeological Temple Site',
    deity: 'Historic Hindu Sanctum (Lord Shiva & Lord Vishnu)',
    associatedDeities: ['Goddess Parvati', 'Nandi'],
    architecture: 'Medieval baked-brick temple complex discovered by archaeologists, featuring multiple concentric brick enclosure walls, sanctum plinths, elevated garbha-griha foundations, terracotta tiles, and pottery dating to the 13th–14th century CE.',
    history: 'Excavated in 1996 by the Directorate of Research, Government of Arunachal Pradesh. The excavations revealed an extensive pre-Ahom medieval Hindu temple complex built with exceptionally uniform baked bricks, evidencing advanced architectural planning and long-standing cultural exchange along the Siang corridor.',
    significance: 'A major archaeological milestone confirming that medieval Hindu temple architecture and organized settlements flourished along the lower Himalayan terraces of Arunachal Pradesh alongside other monumental sites like Malinithan and Bhismaknagar.',
    mythology: 'Associated in local lore with medieval regional kingdoms that maintained sacred shrines dedicated to Lord Shiva and Goddess Shakti along the sacred Siang riverway.',
    rituals: {
      daily: [
        'Site open for heritage pilgrimage, historical study, and floral tribute during daylight hours.'
      ],
      morningPooja: 'Occasional traditional prayers offered by local villagers during auspicious days.',
      eveningAarti: 'Sunset lighting of earthen lamps during heritage events.',
      prasadInfo: 'Traditional community offerings during annual heritage commemorations.',
      specialPooja: 'Maha Shivaratri traditional homage.'
    },
    timings: '08:00 AM – 05:00 PM (Daily)',
    darshan: {
      openingTime: '08:00 AM',
      closingTime: '05:00 PM',
      morningDarshan: '08:00 AM – 12:00 PM',
      afternoonBreak: 'Open continuously during daylight',
      eveningDarshan: '12:00 PM – 05:00 PM',
      specialDarshan: 'Heritage week special guided exploration.'
    },
    bestTimeToVisit: 'October to March (Dry, pleasant winter season ideal for archaeological visits).',
    festivalsList: [
      { name: 'Archaeological Heritage Day', month: 'November', duration: '1 Day', significance: 'Celebration of ancient architectural heritage and preservation awareness.', rituals: 'Guided heritage walks and cultural discussions.' },
      { name: 'Maha Shivaratri Observance', month: 'February–March', duration: '1 Day', significance: 'Local devotees pay homage at the ancient temple sanctum.', rituals: 'Floral offerings and lamp lighting.' }
    ],
    guidelines: {
      dressCode: 'Comfortable outdoor attire and walking shoes.',
      photography: 'Photography permitted for personal and educational use. Commercial photography requires state permission.',
      footwear: 'Please do not step or walk directly on the ancient 700-year-old brick walls.',
      entryRules: 'Free entry. Do not disturb or remove ancient bricks or terracotta artefacts.',
      accessibility: 'Level grass and stone trail; easy to navigate on foot.'
    },
    facilities: {
      parking: true,
      drinkingWater: true,
      restrooms: false,
      accommodation: false,
      dharamshala: 'Available in Pasighat town (12 km away).',
      nearbyHotels: 'Hotels, homestays, and resorts in Pasighat and Rani village.',
      transport: 'Shared taxis and Sumos connecting Rani Village with Pasighat and Ruksin.'
    },
    nearbyTransport: {
      railway: 'Murkongselek Railway Station (MZS) – 25 km; Silapathar – 80 km.',
      airport: 'Pasighat Airport (IXT) – 14 km; Dibrugarh Airport (DIB) – 150 km.',
      bus: 'Pasighat Bus Station – 12 km; Ruksin Bus Stand – 20 km.',
      local: 'Local taxis and shared sumos from Pasighat.'
    },
    coordinates: { lat: 27.9734, lng: 95.2891 },
    mapsUrl: 'https://maps.google.com/?q=27.9734,95.2891',
    image: 'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=900&auto=format&fit=crop&q=80'
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80', caption: 'Ancient medieval brick foundations at Gomsi temple site', category: 'Excavation' },
      { url: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=900&auto=format&fit=crop&q=80', caption: 'Protected archaeological plinth at Rani village', category: 'Monument' }
    ],
    pilgrimageCircuits: ['Siang Shakti & Ancient Tirtha Circuit'],
    isFeatured: false,
    isActive: true
  },

  // 9. Tenga Valley Shiva Mandir – Tenga, West Kameng
  {
    name: 'Tenga Valley Shiva Mandir',
    altNames: ['Tenga Shiva Temple', 'Tenga Valley Mandir', 'Shiv Dham Tenga'],
    state: 'Arunachal Pradesh',
    city: 'Tenga Valley',
    district: 'West Kameng',
    location: 'Beside Tenga River, Tenga Valley',
    address: 'NH-13, Tenga Valley, West Kameng District, Arunachal Pradesh - 790115',
    pincode: '790115',
    category: 'Active Temple',
    deity: 'Lord Shiva (Tenga-Eshwar Mahadev)',
    associatedDeities: ['Goddess Parvati', 'Lord Ganesha', 'Lord Hanuman', 'Nandi'],
    architecture: 'Picturesque Himalayan hill-shrine featuring traditional multi-tiered spire architecture with bright saffron crests, set against the backdrop of pine-clad hills and the crystal-clear Tenga River flowing gently alongside.',
    history: 'Constructed by devotees and armed forces personnel stationed in the valley in the mid-20th century, the temple has become an indispensable spiritual stop for every pilgrim and traveler journeying along the high mountain route towards Bomdila and Tawang.',
    significance: 'Revered as a sanctuary of spiritual tranquility where pilgrims seek blessings for safe passage across the formidable Sela Pass and high mountain roads of Western Arunachal.',
    mythology: 'Dedicated to Lord Shiva, the protector of the Himalayan peaks and wanderers, whose divine grace is invoked for inner peace and courage amidst the rugged mountain heights.',
    rituals: {
      daily: [
        'Pratah Mangal Aarti & Jalabhishek (06:00 AM)',
        'Hanuman Chalisa recitation & Bhog (08:30 AM)',
        'Sandhya Maha Aarti with bell chimes (06:00 PM)'
      ],
      morningPooja: 'Morning Jalabhishek and Aarti at 06:00 AM.',
      eveningAarti: 'Evening Deepa Aarti at 06:00 PM with oil lamps and conch resonance.',
      prasadInfo: 'Sweet halwa, chana, and sacred charnamrit.',
      specialPooja: 'Rudrabhishekam on all Shravan Mondays.'
    },
    timings: '06:00 AM – 07:30 PM (Daily)',
    darshan: {
      openingTime: '06:00 AM',
      closingTime: '07:30 PM',
      morningDarshan: '06:00 AM – 12:30 PM',
      afternoonBreak: 'Open continuously for traveling pilgrims',
      eveningDarshan: '12:30 PM – 07:30 PM',
      specialDarshan: 'Maha Shivaratri night-long prayer vigil.'
    },
    bestTimeToVisit: 'March to November (Pleasant Himalayan valley weather; winter features snow on surrounding peaks).',
    festivalsList: [
      { name: 'Maha Shivaratri', month: 'February–March', duration: '2 Days', significance: 'Valley-wide festival celebrated by local residents, pilgrims, and personnel.', rituals: 'Continuous Jalabhishek, bhajan kirtan, and community feast.' },
      { name: 'Shravan Somwar', month: 'July–August', duration: '1 Month', significance: 'Holy month prayers with river water offerings.', rituals: 'Special Bilva Patra puja and fasts.' }
    ],
    guidelines: {
      dressCode: 'Decent, modest attire. Woolens advised throughout the year.',
      photography: 'Photography permitted in courtyard and river garden; restricted inside sanctum.',
      footwear: 'Footwear must be deposited outside the temple portico.',
      entryRules: 'Free entry for all. Maintain cleanliness along the sacred riverside.',
      accessibility: 'Gentle ramp and step access; easily reachable from the highway.'
    },
    facilities: {
      parking: true,
      drinkingWater: true,
      restrooms: true,
      accommodation: true,
      dharamshala: 'Pilgrim rest sheds at temple; hotels, resorts, and army transit camp in Tenga.',
      nearbyHotels: 'Resorts and eco-lodges in Tenga Valley and Rupa (10 km away).',
      transport: 'Regular shared Sumos, buses between Tezpur, Bhalukpong, Bomdila, and Tawang.'
    },
    nearbyTransport: {
      railway: 'Bhalukpong Railway Station (BHNG) – 80 km; Rangapara North – 130 km.',
      airport: 'Tezpur Airport (TEZ) – 150 km; Lokpriya Gopinath Bordoloi Airport, Guwahati – 290 km.',
      bus: 'Tenga Valley Bus Stop – 500 meters; daily buses from Tezpur, Bomdila, and Tawang.',
      local: 'Shared Sumos, private tourist taxis on the Tezpur-Tawang highway.'
    },
    coordinates: { lat: 27.2023, lng: 92.4278 },
    mapsUrl: 'https://maps.google.com/?q=27.2023,92.4278',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&auto=format&fit=crop&q=80'
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80', caption: 'Tenga Valley Shiva Mandir beside the gentle river waters', category: 'Temple' },
      { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&auto=format&fit=crop&q=80', caption: 'Pine-fringed mountain slopes surrounding Tenga valley', category: 'Landscape' }
    ],
    pilgrimageCircuits: ['Kameng Valley Himalayan Temple Circuit'],
    isFeatured: false,
    isActive: true
  },

  // 10. Hanuman Mandir – Hawa Camp, Kimin / Papum Pare
  {
    name: 'Hanuman Mandir – Hawa Camp',
    altNames: ['Hawa Camp Hanuman Temple', 'Pawan Putra Mandir Hawa Camp', 'Kimin Hanuman Mandir'],
    state: 'Arunachal Pradesh',
    city: 'Kimin',
    district: 'Papum Pare',
    location: 'Hawa Camp Ridge, Kimin-Ziro Road',
    address: 'Hawa Camp Mountain Point, Kimin-Potin Highway, Papum Pare District, Arunachal Pradesh - 791121',
    pincode: '791121',
    category: 'Active Temple',
    deity: 'Lord Hanuman (Sankat Mochan Mahaveer)',
    associatedDeities: ['Lord Rama', 'Goddess Sita', 'Lord Lakshmana', 'Lord Shiva'],
    architecture: 'Vibrant hilltop temple structure painted in auspicious saffron-red hues with a magnificent idol of Lord Hanuman, perched high on a windy mountain ridge ("Hawa Camp") providing breath-taking vistas of the emerald valley below.',
    history: 'Established in the mid-20th century at a strategic high point on the mountainous gateway connecting the Assam plains with the interior valleys of Lower Subansiri and Ziro. The shrine was built by highway builders, local residents, and travelers to seek blessings for protection against landslides and road hazards.',
    significance: 'Regarded as a powerful protector shrine for all travelers navigating the steep Himalayan ghats. No driver or traveler passes Hawa Camp without stopping to offer coconuts, bow, and ring the auspicious brass bells.',
    mythology: 'Celebrates Lord Hanuman\'s role as the divine protector (Sankat Mochan) who carried the Sanjeevani mountain across the Himalayan skies, embodying boundless strength, devotion, and safe passage.',
    rituals: {
      daily: [
        'Pratah Hanuman Chalisa & Mangal Aarti (06:00 AM)',
        'Sindoor & Jasmine Oil Arpana (08:00 AM)',
        'Sandhya Deepa Aarti & Prasad Vitaran (06:00 PM)'
      ],
      morningPooja: 'Morning Aarti at 06:00 AM with Sundarkand hymns.',
      eveningAarti: 'Evening Deepa Aarti at 06:00 PM with conch resonance and bells.',
      prasadInfo: 'Besan laddoos, boondi, bananas, and panchamrit.',
      specialPooja: 'Special Tuesday and Saturday Hanuman Chalisa 108-recitation path.'
    },
    timings: '05:30 AM – 07:30 PM (Daily)',
    darshan: {
      openingTime: '05:30 AM',
      closingTime: '07:30 PM',
      morningDarshan: '05:30 AM – 12:00 PM',
      afternoonBreak: 'Open continuously for highway pilgrims',
      eveningDarshan: '12:00 PM – 07:30 PM',
      specialDarshan: 'Hanuman Jayanti all-day festival darshan.'
    },
    bestTimeToVisit: 'Throughout the year; October to May offers clear blue skies and mountain visibility.',
    festivalsList: [
      { name: 'Hanuman Jayanti', month: 'March–April (Chaitra Purnima)', duration: '1 Day', significance: 'Celebration of Lord Hanuman\'s appearance with massive community feast.', rituals: 'Sindoor Abhishekam, Akhand Ramayan path, and Maha Aarti.' },
      { name: 'Diwali & Deepotsav', month: 'October–November', duration: '2 Days', significance: 'Lighting of hundreds of earthen lamps on the mountain ridge.', rituals: 'Deepa Dan and Hanuman Stuti.' }
    ],
    guidelines: {
      dressCode: 'Modest travel clothing. Warm jacket recommended due to strong mountain winds at Hawa Camp.',
      photography: 'Photography permitted from temple viewing terrace overlooking the valley.',
      footwear: 'Footwear must be deposited in shoe racks before ascending sanctum steps.',
      entryRules: 'Free entry for all. Maintain reverence and avoid littering.',
      accessibility: 'Highway-adjacent location with few easy steps to the mandir deck.'
    },
    facilities: {
      parking: true,
      drinkingWater: true,
      restrooms: true,
      accommodation: false,
      dharamshala: 'Pilgrim shelter on ridge; guest houses available in Kimin (15 km) and Naharlagun (60 km).',
      nearbyHotels: 'Hotels and lodges in Kimin, Doimukh, and Naharlagun.',
      transport: 'Shared Sumos, commercial cabs, and buses connecting Ziro, Kimin, and Itanagar.'
    },
    nearbyTransport: {
      railway: 'Naharlagun Railway Station (NHLN) – 60 km; North Lakhimpur – 65 km.',
      airport: 'Donyi Polo Airport, Itanagar (HGI) – 75 km; Lilabari Airport – 65 km.',
      bus: 'Kimin Bus Stand – 15 km; roadside bus boarding directly at Hawa Camp.',
      local: 'Shared Tata Sumos between Itanagar/Naharlagun and Ziro.'
    },
    coordinates: { lat: 27.3211, lng: 93.9782 },
    mapsUrl: 'https://maps.google.com/?q=27.3211,93.9782',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=900&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&auto=format&fit=crop&q=80'
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=900&auto=format&fit=crop&q=80', caption: 'Hanuman Mandir perched on the windy Hawa Camp mountain ridge', category: 'Temple' },
      { url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&auto=format&fit=crop&q=80', caption: 'Spectacular valley view from the temple observation deck', category: 'View' }
    ],
    pilgrimageCircuits: ['Kameng Valley Himalayan Temple Circuit'],
    isFeatured: false,
    isActive: true
  },

  // 11. Bhalukpong Shiva Mandir – Bhalukpong
  {
    name: 'Bhalukpong Shiva Mandir',
    altNames: ['Kameng River Shiva Temple', 'Bhalukpong Shiv Dham', 'Riverside Mahadev Temple'],
    state: 'Arunachal Pradesh',
    city: 'Bhalukpong',
    district: 'West Kameng',
    location: 'Kameng Riverbank, Bhalukpong Foothills',
    address: 'Kameng River Road, Bhalukpong, West Kameng District, Arunachal Pradesh - 790114',
    pincode: '790114',
    category: 'Active Temple / Sacred Natural Site',
    deity: 'Lord Shiva (Kamengeshwar Mahadev)',
    associatedDeities: ['Goddess Parvati', 'Lord Ganesha', 'Nandi'],
    architecture: 'Riverside stone-and-masonry temple situated on the sandy banks of the sparkling Kameng River, featuring a traditional Shikhara tower and an open-air riverfront platform for sacred snanam and evening deepa aarti.',
    history: 'Bhalukpong is steeped in ancient lore associated with King Bhaluka, the grandfather of Bana Raja of Mahabharata fame. The riverside Shiva temple has served as a sacred threshold where pilgrims entering the Kameng and Tawang valleys seek the blessings of Lord Shiva.',
    significance: 'Considered the gateway sanctum of Western Arunachal Pradesh. Devotees take holy water from the Kameng (Jia Bhareli) River to offer abhishek to the Shivalinga before embarking on mountain journeys.',
    mythology: 'According to regional Puranic legends, the pristine Kameng river was sanctified by Lord Shiva during his cosmic wanderings through the Eastern Himalayas, making its waters auspicious for spiritual cleansing.',
    rituals: {
      daily: [
        'Pratah Kameng River Snanam & Jalabhishek (06:00 AM)',
        'Bilva Patra & Dhoop Seva (08:00 AM)',
        'Sandhya Nadi Aarti with brass lamps (05:30 PM)'
      ],
      morningPooja: 'Morning Jalabhishek at 06:00 AM with river water.',
      eveningAarti: 'Evening River Aarti at 05:30 PM facing the sunset over Kameng River.',
      prasadInfo: 'Fruits, panchamrit, and sweet prasad distributed to pilgrims.',
      specialPooja: 'Maha Shivaratri night vigil and special milk abhishek.'
    },
    timings: '06:00 AM – 07:00 PM (Daily)',
    darshan: {
      openingTime: '06:00 AM',
      closingTime: '07:00 PM',
      morningDarshan: '06:00 AM – 12:00 PM',
      afternoonBreak: 'Open continuously for devotees',
      eveningDarshan: '12:00 PM – 07:00 PM',
      specialDarshan: 'Maha Shivaratri all-day darshan.'
    },
    bestTimeToVisit: 'October to April (Dry winter months; crystal-clear emerald waters in the Kameng River).',
    festivalsList: [
      { name: 'Maha Shivaratri', month: 'February–March', duration: '2 Days', significance: 'Grand riverside festival with thousands of devotees taking holy river bath and offering prayers.', rituals: 'Continuous Rudrabhishekam, night bhajan, and Prasad bhandara.' },
      { name: 'Makar Sankranti', month: 'January', duration: '1 Day', significance: 'Sacred river bath at the confluence of mountain waters.', rituals: 'River snanam and Surya Arghya.' }
    ],
    guidelines: {
      dressCode: 'Modest attire. Extra clothes recommended if taking river bath.',
      photography: 'Photography permitted along riverbank; follow respectful norms inside sanctum.',
      footwear: 'Footwear to be deposited at temple entrance steps.',
      entryRules: 'Free entry. Exercise caution near fast-flowing river currents.',
      accessibility: 'Paved river approach with easy walking access.'
    },
    facilities: {
      parking: true,
      drinkingWater: true,
      restrooms: true,
      accommodation: true,
      dharamshala: 'Tourist lodges, eco-resorts, and forest inspection bungalow in Bhalukpong.',
      nearbyHotels: 'Wide range of hotels, river resorts, and homestays along Bhalukpong highway.',
      transport: 'Shared sumos, auto-rickshaws, and private cabs readily available.'
    },
    nearbyTransport: {
      railway: 'Bhalukpong Railway Station (BHNG) – 2 km; Rangapara North – 50 km.',
      airport: 'Tezpur Airport (TEZ) – 55 km; Guwahati Airport (GAU) – 220 km.',
      bus: 'Bhalukpong Bus Stand – 1 km; regular buses to Tezpur, Bomdila, and Itanagar.',
      local: 'Auto-rickshaws and cabs stationed at Bhalukpong checkpost.'
    },
    coordinates: { lat: 27.0142, lng: 92.6514 },
    mapsUrl: 'https://maps.google.com/?q=27.0142,92.6514',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=900&auto=format&fit=crop&q=80'
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&auto=format&fit=crop&q=80', caption: 'Scenic Kameng riverbank at Bhalukpong Shiva Mandir', category: 'River' },
      { url: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=900&auto=format&fit=crop&q=80', caption: 'Crystal turquoise mountain waters rushing through the foothills', category: 'Nature' }
    ],
    pilgrimageCircuits: ['Kameng Valley Himalayan Temple Circuit'],
    isFeatured: false,
    isActive: true
  },

  // 12. Central Kargu Gamgi / Donyi Polo Spiritual Sanctum – Pasighat
  {
    name: 'Central Kargu Gamgi (Donyi Polo Spiritual Sanctum)',
    altNames: ['Central Donyi Polo Gamgi', 'Kargu Gamgi Pasighat', 'Donyi Polo Temple'],
    state: 'Arunachal Pradesh',
    city: 'Pasighat',
    district: 'East Siang',
    location: 'Central Pasighat, East Siang',
    address: 'Kargu Gamgi Complex, Pasighat, East Siang District, Arunachal Pradesh - 791102',
    pincode: '791102',
    category: 'Indigenous Sacred Sanctum / Active Temple',
    deity: 'Donyi-Polo (The Supreme Cosmic Divine – Divine Sun & Moon)',
    associatedDeities: ['Sedi (Cosmic Creator)', 'Keyum (Primeval Source)', 'Pedong Nane (Universal Mother)'],
    architecture: 'Magnificent indigenous sacred architecture constructed with fine cane, bamboo, and carved timber pillars, featuring a soaring circular prayer pavilion, sacred ceremonial altar, and the iconic solar-lunar emblem of Donyi-Polo.',
    history: 'Institutionalized as the central spiritual temple (Gamgi) of the ancient indigenous Donyi-Polo Sanatana faith of Arunachal Pradesh. Established under the guidance of reverent community elders to preserve, document, and celebrate the unadulterated cosmic nature-worship traditions passed down orally across millennia.',
    significance: 'The preeminent spiritual sanctuary of the indigenous faith in the state. Devotees gather here in pristine white traditional attire for community prayer, meditation, and recitation of the sacred oral hymns (Aabang) honoring the all-seeing Sun and Moon as cosmic guides.',
    mythology: 'According to ancient Adi cosmology, the universe originated from Keyum (the primeval void), giving rise to Sedi (the cosmic creator) whose eyes became Donyi (the Sun – embodiment of light, truth, and warmth) and Polo (the Moon – embodiment of mercy, wisdom, and cosmic balance). They are venerated as the omnipresent cosmic parents.',
    rituals: {
      daily: [
        'Pratah Donyi Aradhana with incense and sacred chants (07:00 AM)',
        'Communal meditation and silent prayer (08:30 AM)',
        'Sunday Special Congregational Prayer (Gamgi Prayer Service) (09:30 AM)',
        'Sandhya Deepa Prajvalan & Hymn singing (05:30 PM)'
      ],
      morningPooja: 'Morning invocation to the Sun Goddess at 07:00 AM.',
      eveningAarti: 'Evening twilight prayer honoring the Moon God at 05:30 PM.',
      prasadInfo: 'Sacred ginger, apong/rice offering, seasonal fruits, and herbal water.',
      specialPooja: 'Annual Donyi-Polo Day special cosmic ceremonies on December 31st.'
    },
    timings: '06:00 AM – 06:30 PM (Daily)',
    darshan: {
      openingTime: '06:00 AM',
      closingTime: '06:30 PM',
      morningDarshan: '06:00 AM – 12:00 PM',
      afternoonBreak: 'Open continuously for prayer and meditation',
      eveningDarshan: '12:00 PM – 06:30 PM',
      specialDarshan: 'Sunday community prayer gathering (09:00 AM – 12:00 PM).'
    },
    bestTimeToVisit: 'Throughout the year; December 31st for Donyi-Polo Day, and September for Solung Festival.',
    festivalsList: [
      { name: 'Donyi-Polo Day', month: 'December 31', duration: '1 Day', significance: 'State-wide indigenous spiritual day marked by grand prayer processions, hoisting of the sacred flag, and cultural hymns.', rituals: 'Flag hoisting, mass choral prayer, and community feast.' },
      { name: 'Solung Festival', month: 'September 1–5', duration: '5 Days', significance: 'Premier agricultural and spiritual festival of the Adi community honoring Goddess Kine Nane.', rituals: 'Sacred dances (Ponung), ritual offerings, and myth recitations.' },
      { name: 'Aran Festival', month: 'March', duration: '3 Days', significance: 'Spring hunting and nature thanksgiving festival.', rituals: 'Traditional rites and youth celebrations.' }
    ],
    guidelines: {
      dressCode: 'Clean, modest clothing. Traditional white attire preferred during Sunday prayers.',
      photography: 'Photography permitted in outer courtyard; please take permission before filming congregational prayers.',
      footwear: 'Footwear must be removed before stepping onto the sacred cane prayer hall floor.',
      entryRules: 'Warmly open to all seekers, visitors, and devotees of all backgrounds.',
      accessibility: 'Flat entrance and wide doorways accessible to all visitors.'
    },
    facilities: {
      parking: true,
      drinkingWater: true,
      restrooms: true,
      accommodation: false,
      dharamshala: 'Community guest rooms; numerous hotels and homestays in Pasighat town.',
      nearbyHotels: 'Hotels, guest houses, and resorts in Pasighat.',
      transport: 'Auto-rickshaws, e-rickshaws, and local cabs available in Pasighat.'
    },
    nearbyTransport: {
      railway: 'Murkongselek Railway Station (MZS) – 35 km; Silapathar – 90 km.',
      airport: 'Pasighat Airport (IXT) – 4 km; Dibrugarh Airport (DIB) – 140 km.',
      bus: 'Pasighat Bus Station – 2 km; daily bus connectivity with major state towns.',
      local: 'Auto-rickshaws and cabs stationed throughout Pasighat.'
    },
    coordinates: { lat: 28.0612, lng: 95.3341 },
    mapsUrl: 'https://maps.google.com/?q=28.0612,95.3341',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&auto=format&fit=crop&q=80'
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80', caption: 'Central Kargu Gamgi indigenous prayer sanctum in Pasighat', category: 'Sanctum' },
      { url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&auto=format&fit=crop&q=80', caption: 'Intricate traditional bamboo and cane craftsmanship of the prayer hall', category: 'Architecture' }
    ],
    pilgrimageCircuits: ['Indigenous Donyi-Polo Spiritual Circuit'],
    isFeatured: true,
    isActive: true
  }
];

// Seed function
async function seedArunachalTemples() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect('mongodb://127.0.0.1:27017/divyabharat');
    console.log('MongoDB connected.');

    // Look up Arunachal Pradesh state document
    const arunachalState = await State.findOne({ name: /Arunachal/i });
    const stateId = arunachalState ? arunachalState._id : null;
    console.log('Matched State ID for Arunachal Pradesh:', stateId);

    // Delete ONLY existing Arunachal Pradesh temples (DO NOT touch Andhra Pradesh or other states)
    const delResult = await Temple.deleteMany({ state: /Arunachal/i });
    console.log(`Cleaned up ${delResult.deletedCount} old Arunachal Pradesh temple records.`);

    // Attach stateId and format documents
    const templesToInsert = ARUNACHAL_PRADESH_12_TEMPLES.map(temple => ({
      ...temple,
      description: temple.description || temple.significance || `${temple.name} is a revered sacred temple and pilgrimage sanctuary of ${temple.district}, Arunachal Pradesh.`,
      stateId,
      slug: temple.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      state: 'Arunachal Pradesh',
      isActive: true,
      verified: true
    }));

    const inserted = await Temple.insertMany(templesToInsert);
    console.log(`✅ Successfully seeded ${inserted.length} Arunachal Pradesh temples to MongoDB!`);

    // Verify counts in DB
    const totalArunachal = await Temple.countDocuments({ state: /Arunachal/i });
    const totalAndhra = await Temple.countDocuments({ state: /Andhra/i });
    const totalTemples = await Temple.countDocuments();

    console.log('\n--- VERIFICATION STATS ---');
    console.log('Arunachal Pradesh Temples in DB:', totalArunachal);
    console.log('Andhra Pradesh Temples in DB (Preserved):', totalAndhra);
    console.log('Total Temples in DB:', totalTemples);

    process.exit(0);
  } catch (error) {
    console.error('Seeding Arunachal Pradesh temples failed:', error);
    process.exit(1);
  }
}

seedArunachalTemples();
