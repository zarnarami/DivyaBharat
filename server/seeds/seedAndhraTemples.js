// server/seeds/seedAndhraTemples.js — Permanent MongoDB Seeder for 15 Andhra Pradesh Temples
const mongoose = require('mongoose');
const path = require('path');
const Temple = require('../models/Temple');
const State = require('../models/State');

const ANDHRA_PRADESH_15_TEMPLES = [
  {
    name: 'Sri Venkateswara Swamy Temple',
    altNames: ['Tirumala Balaji Temple', 'Tirupati Temple', 'Srinivasa Temple', 'Kaliyuga Vaikuntham'],
    state: 'Andhra Pradesh',
    city: 'Tirumala',
    district: 'Tirupati',
    location: 'Seshachalam Hills, Venkatadri Peak',
    address: 'S Sannidhi St, Tirumala, Tirupati, Andhra Pradesh',
    pincode: '517504',
    category: 'Divya Desam',
    deity: 'Lord Venkateswara (Sri Balaji / Srinivasa, incarnation of Lord Vishnu)',
    associatedDeities: ['Goddess Padmavathi', 'Goddess Lakshmi', 'Lord Varaha Swamy'],
    architecture: 'Dravidian Architecture featuring the Ananda Nilayam golden vimana, majestic multi-tiered gopurams, and grand pillared halls built over centuries.',
    history: 'Venerated since the Sangam period (c. 300 BCE–300 CE) and praised by the Tamil Alvars in the Naalayira Divya Prabandham. The temple received royal endowments from the Pallavas, Cholas, Pandyas, Hoysalas, and reached its zenith under the Vijayanagara Empire, especially Emperor Sri Krishnadevaraya who donated gold for gilding the Ananda Nilayam vimana in 1517 CE.',
    significance: 'Celebrated as Kaliyuga Vaikuntha where Lord Vishnu manifested to redeem humanity from the trials of the Kali Yuga. It is the most visited sacred pilgrimage shrine in the world.',
    mythology: 'According to the Varaha and Padma Puranas, Lord Srinivasa came to Venkatadri to seek solace after Goddess Lakshmi departed Vaikuntha. He wed Goddess Padmavathi, borrowing funds from Kubera, and promised to reside at Tirumala until the end of the Kali Yuga granting boons to his devotees.',
    rituals: {
      daily: [
        'Suprabhata Seva (03:00 AM) – Awakening of the Lord with Vedic hymns',
        'Thomala Seva (03:30 AM) – Adornment of presiding deity with fragrant garlands',
        'Archana / Sahasranamarchana (04:15 AM) – Chanting of 1008 divine names',
        'Kalyanotsavam (10:30 AM) – Daily celestial wedding of Srinivasa and Padmavathi',
        'Sahasra Deepalankara Seva (05:30 PM) – Procession in glow of 1000 oil lamps',
        'Ekantha Seva / Pavalimpu Seva (01:30 AM) – Night lullaby and slumber ritual'
      ],
      morningPooja: 'Suprabhatam at 3:00 AM, Thomala Seva at 3:30 AM, Archana at 4:15 AM',
      eveningAarti: 'Sahasra Deepalankara Seva at 5:30 PM, Night Naivedyam and Ekantha Seva at 1:30 AM',
      prasadInfo: 'World-renowned GI-tagged Tirupati Laddu, Pulihora (Tamarind Rice), Daddojanam (Curd Rice), Vadai, and free Annaprasadam at Tarigonda Vengamamba Complex serving over 100,000 pilgrims daily.',
      specialPooja: 'Visesha Pooja on Mondays, Ashtadala Pada Padmaradhana on Tuesdays, Sahasra Kalasabhishekam on Wednesdays, Tiruppavada on Thursdays, Poorabhishekam and Nijapada Darshanam on Fridays.'
    },
    timings: '03:00 AM – 01:30 AM (Open almost 22 hours daily)',
    darshan: {
      openingTime: '03:00 AM',
      closingTime: '01:30 AM',
      morningDarshan: '06:00 AM – 11:30 AM',
      afternoonBreak: 'Intermittent cleaning & Sevas (Continuous Sarva Darshan queues active)',
      eveningDarshan: '02:00 PM – 11:00 PM',
      specialDarshan: 'Special Entry Darshan (₹300 booked online in advance), Divya Darshan (for pedestrian trekkers via Alipiri and Srivari Mettu), Slotted Sarva Darshan (SSD).'
    },
    bestTimeToVisit: 'September to February (pleasantly cool hill station weather)',
    festivalsList: [
      { name: 'Srivari Salakatla Brahmotsavam', month: 'September–October (Navaratri)', duration: '9 Days', significance: 'Grandest annual festival initiated by Lord Brahma; Garuda Vahanam draws over 500,000 devotees.' },
      { name: 'Vaikunta Ekadasi & Dwadasi', month: 'December–January', duration: '10 Days', significance: 'Opening of the sacred Vaikunta Dwaram doorway surrounding the sanctum sanctorum.' },
      { name: 'Rathasapthami', month: 'January–February', duration: '1 Day', significance: 'Known as Mini-Brahmotsavam; the Lord is paraded on seven different celestial vahanams from dawn to dusk.' },
      { name: 'Teppotsavam (Float Festival)', month: 'March (Phalguna month)', duration: '5 Days', significance: 'Lord rides on an illuminated raft in the sacred Swami Pushkarini holy tank.' }
    ],
    guidelines: {
      dressCode: 'Mandatory traditional Indian attire: Dhoti and Kurta/Angavastram for men (no shirts during special sevas); Saree, Half-saree, or Churidar with Dupatta for women. Western wear strictly prohibited.',
      photography: 'Strictly prohibited inside the temple premises. Mobile phones, cameras, and electronic items must be deposited in TTD free lockers before entering the queue complexes.',
      footwear: 'Footwear strictly prohibited across the entire sanctum hill area. Free storage available at Alipiri, Srivari Mettu, and all entry gates.',
      entryRules: 'Pilgrims must carry official government photo ID (Aadhaar/Passport). Non-Hindus must submit a faith declaration form confirming reverence for Lord Venkateswara.',
      accessibility: 'Special dedicated queues and battery-operated carts for senior citizens, differently abled pilgrims, and parents with infants below 1 year.'
    },
    facilities: {
      parking: true,
      drinkingWater: true,
      restrooms: true,
      accommodation: true,
      dharamshala: 'TTD manages over 6,000 guest rooms, cottages, and mega-complexes including Srinivasam, Vishnu Nivasam, and Madhavam.',
      nearbyHotels: 'Wide range of star hotels, boutique guest houses, and budget lodges in both Tirumala and Tirupati city.',
      transport: 'Continuous fleet of TTD free electric buses in Tirumala; 24x7 APSRTC express buses connecting Tirupati and Tirumala every 2 minutes.'
    },
    nearbyTransport: {
      railway: 'Tirupati Main Railway Station (TPTY) – 26 km; Renigunta Junction (RU) – 35 km.',
      airport: 'Tirupati International Airport, Renigunta (TIR) – 38 km; Chennai International Airport (MAA) – 145 km.',
      bus: 'Tirupati Central Bus Station (CBS) – 24 km; direct interstate buses from Bengaluru, Chennai, Hyderabad, Vijayawada.',
      local: 'TTD free green buses across Tirumala hills, prepaid taxis, auto-rickshaws at Tirupati foothill.'
    },
    coordinates: { lat: 13.6833, lng: 79.3472 },
    mapsUrl: 'https://maps.google.com/?q=13.6833,79.3472',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Tirumala_090615.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/4/4e/Tirumala_090615.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Ananda_Nilayam_Tirumala.jpg/800px-Ananda_Nilayam_Tirumala.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Swami_Pushkarini_Tirumala.jpg/800px-Swami_Pushkarini_Tirumala.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Tirumala_Brahmotsavam_Garuda_Vahanam.jpg/800px-Tirumala_Brahmotsavam_Garuda_Vahanam.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Tirumala_090615.jpg', caption: 'Sri Venkateswara Swamy Temple complex atop Tirumala hills', category: 'Exterior' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Ananda_Nilayam_Tirumala.jpg/800px-Ananda_Nilayam_Tirumala.jpg', caption: 'The sacred Ananda Nilayam golden vimana tower', category: 'Architecture' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Swami_Pushkarini_Tirumala.jpg/800px-Swami_Pushkarini_Tirumala.jpg', caption: 'Holy Swami Pushkarini sacred theertham tank', category: 'Landscape' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Tirumala_Brahmotsavam_Garuda_Vahanam.jpg/800px-Tirumala_Brahmotsavam_Garuda_Vahanam.jpg', caption: 'Srivari Brahmotsavam celestial Garuda Vahanam procession', category: 'Festival' }
    ],
    pilgrimageCircuits: ['Tirupati Spiritual Circuit'],
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Sri Bhramaramba Mallikarjuna Swamy Temple',
    altNames: ['Srisailam Temple', 'Srisaila Kshetram', 'Mallikarjuna Jyotirlinga', 'Bhramaramba Shakti Peeth'],
    state: 'Andhra Pradesh',
    city: 'Srisailam',
    district: 'Nandyal',
    location: 'Nallamala Forest Range, Rishabhagiri Hill on Krishna River',
    address: 'Srisailam Devasthanam, Nandyal District, Andhra Pradesh',
    pincode: '518101',
    category: 'Jyotirlinga & Shakti Peeth',
    deity: 'Lord Mallikarjuna Swamy (Lord Shiva - 2nd Jyotirlinga) and Goddess Bhramaramba Devi (Mahashakti Peeth)',
    associatedDeities: ['Goddess Bhramaramba Devi', 'Lord Vighneswara', 'Sahasra Linga Swamy'],
    architecture: 'Classical Vijayanagara and Chalukya Dravidian architecture. The temple is enclosed by formidable stone prakaram walls (600 ft by 500 ft) adorned with intricate relief carvings depicting scenes from the Ramayana, Mahabharata, and Shiva Puranas.',
    history: 'Inscribed records date back to the Ikshvaku dynasty (c. 3rd century CE). Expanded by the Reddi Kings, Kakatiya queen Rudrama Devi, and the Vijayanagara Emperors. In 1677 CE, the Maratha ruler Chhatrapati Shivaji Maharaj visited Srisailam, built the magnificent northern gopuram, and spent time in intense spiritual meditation here.',
    significance: 'One of the most extraordinary pilgrimage centers in Bharat where one of the 12 sacred Jyotirlingas of Lord Shiva and one of the 18 Maha Shakti Peethas of Goddess Sati (neck portion) exist within the same holy compound. Known as "Kailasa of the South".',
    mythology: 'According to the Shiva Purana, Lord Kartikeya left Mount Kailash and settled on Mount Krauncha in grief. Lord Shiva and Parvati visited him as Mallikarjuna (Lord adorned with jasmine) and Bhramaramba (the Bee incarnation who vanquished demon Arunasura).',
    rituals: {
      daily: [
        'Mangala Vadyam & Suprabhata Seva (04:30 AM)',
        'Maha Mangala Harathi & Shiva Sahasranama Archana (05:30 AM)',
        'Sparsha Darshanam (Devotees are permitted to touch the sacred Jyotirlinga during specific morning and evening hours)',
        'Chandi Homam & Rudrahomam at Bhramaramba Ammavari sanctum (09:00 AM)',
        'Rudra Abhishekam and Nityakalyanam (11:00 AM)',
        'Shayanotsavam / Ekantha Seva (10:00 PM)'
      ],
      morningPooja: 'Suprabhatam at 4:30 AM, Rudrabhishekam from 6:30 AM',
      eveningAarti: 'Sandhya Harathi at 6:30 PM, Lingodbhava Abhishekam at 8:00 PM',
      prasadInfo: 'Holy Vibhuti prasad, Kumkum, Laddu, and free Annadanam served continuously to thousands of pilgrims at the Nitya Annadana Bhavan.',
      specialPooja: 'Maha Rudrabhishekam, Laksha Bilvarchana on Mondays, Suvasini Pooja on Fridays at Bhramaramba shrine.'
    },
    timings: '04:30 AM – 03:30 PM, 06:00 PM – 10:00 PM',
    darshan: {
      openingTime: '04:30 AM',
      closingTime: '10:00 PM',
      morningDarshan: '05:00 AM – 03:30 PM',
      afternoonBreak: '03:30 PM – 06:00 PM (Temple sanitization & preparation)',
      eveningDarshan: '06:00 PM – 10:00 PM',
      specialDarshan: 'Sparsha Darshan tickets (₹500), Sheegra Darshan (₹150), and Free Sarva Darshan queues.'
    },
    bestTimeToVisit: 'October to March (pleasant weather in Nallamala forest)',
    festivalsList: [
      { name: 'Maha Shivaratri Brahmotsavam', month: 'February–March', duration: '7 Days', significance: 'Celebrates celestial wedding (Kalyanotsavam) of Lord Mallikarjuna and Goddess Bhramaramba.' },
      { name: 'Dasara Navaratri Utsavam', month: 'September–October', duration: '10 Days', significance: 'Dedicated to Goddess Bhramaramba in nine divine alankarams culminating in Vijayadasami.' },
      { name: 'Karthika Masam', month: 'November–December', duration: '30 Days', significance: 'Holy month with Jwala Thoranam, Laksha Deepotsavam, and sacred Krishna river dips.' }
    ],
    guidelines: {
      dressCode: 'Strict traditional attire. Men must wear Dhoti without upper shirt for Sparsha Darshan (touching Jyotirlinga); Kurta-Pyjama allowed for general darshan. Women must wear Saree or Salwar with Dupatta.',
      photography: 'Prohibited inside all sanctums and inner courtyards. Allowed only at Patala Ganga and outer viewpoint.',
      footwear: 'Footwear must be deposited at temple footwear counters before entering the outer prakaram.',
      entryRules: 'Pilgrims entering Nallamala Tiger Reserve forest ghat road must pass through forest checkpoints (closed between 9 PM and 6 AM for wildlife protection).',
      accessibility: 'Ramps and wheelchairs available; ropeway and steps connect hill to Patala Ganga river ghat.'
    },
    facilities: {
      parking: true,
      drinkingWater: true,
      restrooms: true,
      accommodation: true,
      dharamshala: 'Ganga Sadan, Gauri Sadan, Mallikarjuna Sadan, and state tourism Haritha Hotel cottages.',
      nearbyHotels: 'Private lodges and community choultries (Arya Vysya, Reddy, Brahmin choultries).',
      transport: 'APSRTC direct super luxury buses from Hyderabad, Vijayawada, Kurnool, Guntur, and Bengaluru.'
    },
    nearbyTransport: {
      railway: 'Markapur Road Railway Station (MRK) – 85 km; Nandyal Junction (NDL) – 140 km.',
      airport: 'Rajiv Gandhi International Airport Hyderabad (HYD) – 215 km; Kurnool Airport (KJB) – 180 km.',
      bus: 'Srisailam APSRTC Bus Station – 1 km; direct buses to all major cities in AP and Telangana.',
      local: 'Auto-rickshaws, jeeps, and state-operated safari vehicles for local sightseeing (Sakshi Ganapathi, Shikhareswaram, Phaladhara Panchadhara).'
    },
    coordinates: { lat: 16.0741, lng: 78.8682 },
    mapsUrl: 'https://maps.google.com/?q=16.0741,78.8682',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Srisailam_Temple_Complex.jpg/800px-Srisailam_Temple_Complex.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Srisailam_Temple_Complex.jpg/800px-Srisailam_Temple_Complex.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Srisailam_temple_gopuram.jpg/800px-Srisailam_temple_gopuram.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Carvings_on_Srisailam_Temple_wall.jpg/800px-Carvings_on_Srisailam_Temple_wall.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Srisailam_dam_and_river.jpg/800px-Srisailam_dam_and_river.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Srisailam_Temple_Complex.jpg/800px-Srisailam_Temple_Complex.jpg', caption: 'The sprawling Mallikarjuna Swamy Temple complex at Srisailam', category: 'Exterior' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Srisailam_temple_gopuram.jpg/800px-Srisailam_temple_gopuram.jpg', caption: 'Majestic Eastern Raja Gopuram tower', category: 'Architecture' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Carvings_on_Srisailam_Temple_wall.jpg/800px-Carvings_on_Srisailam_Temple_wall.jpg', caption: 'Intricate Vijayanagara stone friezes on the temple prakaram walls', category: 'Architecture' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Srisailam_dam_and_river.jpg/800px-Srisailam_dam_and_river.jpg', caption: 'Scenic Patala Ganga and Krishna River gorge at Srisailam', category: 'Landscape' }
    ],
    pilgrimageCircuits: ['Jyotirlinga Circuit', 'Shiva Temple Circuit', 'Devi Shakti Circuit'],
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Sri Kanaka Durga Temple',
    altNames: ['Kanaka Durga Temple Vijayawada', 'Indrakeeladri Temple', 'Durga Gudi'],
    state: 'Andhra Pradesh',
    city: 'Vijayawada',
    district: 'NTR',
    location: 'Indrakeeladri Hill overlooking Krishna River',
    address: 'Indrakeeladri, Vijayawada, NTR District, Andhra Pradesh',
    pincode: '520001',
    category: 'Shakti Peeth & Swayambhu Shrine',
    deity: 'Goddess Kanaka Durga (Swayambhu Mahishasuramardini with eight arms)',
    associatedDeities: ['Lord Malleswara Swamy', 'Lord Subrahmanya', 'Lord Ganesha'],
    architecture: 'Dravidian Hill Temple architecture with golden shikhara, carved stone ghat corridors, ornate pillared mandapas, and a modern ropeway and elevator ascending the hill.',
    history: 'Mentioned in the Kalika Purana and Mahabharata. Arjuna is said to have performed rigorous penance atop this hill to receive the divine Pashupatastra from Lord Shiva. Jagadguru Sri Adi Shankaracharya visited Indrakeeladri and installed the sacred Sri Chakra to appease the fierce Ugra form of the Goddess into a compassionate, benevolent mother.',
    significance: 'One of the most potent Shakti Kshetras in South India. The Goddess is self-manifested (Swayambhu) in golden splendour as the conqueror of evil who protects the fertile Krishna river delta.',
    mythology: 'Sage Indrakila performed intense tapas to the Divine Mother requesting her to make his hill her permanent abode. After vanquishing the demon Mahishasura, Goddess Durga granted his wish and established her sanctum on Indrakeeladri.',
    rituals: {
      daily: [
        'Suprabhata Seva (04:00 AM)',
        'Snapana Abhishekam (04:30 AM)',
        'Khadgamala & Sahasranama Archana (06:00 AM)',
        'Kumkumarchana (07:00 AM to 05:00 PM continuous batches)',
        'Maha Nivedana (12:30 PM)',
        'Pallaki Seva & Chandi Homam (05:00 PM)',
        'Maha Harathi & Shayanotsavam (09:00 PM)'
      ],
      morningPooja: 'Suprabhatam at 4:00 AM, Snapana Abhishekam at 4:30 AM',
      eveningAarti: 'Sandhya Harathi at 6:30 PM, Pavalimpu Seva at 9:00 PM',
      prasadInfo: 'Laddu, Pulihora, and free Annadanam at Sri Sringeri Sankara Math Annadana Bhavan serving thousands of devotees daily.',
      specialPooja: 'Laksha Kumkumarchana, Sri Chakra Navavarana Pooja, and Chandi Homam during Pournami.'
    },
    timings: '04:00 AM – 09:00 PM',
    darshan: {
      openingTime: '04:00 AM',
      closingTime: '09:00 PM',
      morningDarshan: '05:00 AM – 01:00 PM',
      afternoonBreak: 'Continuous darshan without break',
      eveningDarshan: '01:00 PM – 09:00 PM',
      specialDarshan: 'VIP Sheegra Darshan (₹300), Antaralaya Darshan (₹100), and Free Dharma Darshan queue.'
    },
    bestTimeToVisit: 'September to February (celebration of Dasara Navaratri)',
    festivalsList: [
      { name: 'Dasara Navaratri Brahmotsavam', month: 'September–October', duration: '10 Days', significance: 'Largest festival in Andhra Pradesh; Goddess appears in 9 different Alankarams ending with Teppotsavam in Krishna River.' },
      { name: 'Bhavani Deeksha Viramana', month: 'December–January', duration: '5 Days', significance: 'Millions of Bhavani devotees in red robes arrive on foot to surrender their spiritual vows.' },
      { name: 'Shakambhari Utsavam', month: 'July (Ashadha Purnima)', duration: '3 Days', significance: 'The deity and temple are breathtakingly decorated with hundreds of tons of fresh vegetables and fruits.' }
    ],
    guidelines: {
      dressCode: 'Modest Indian traditional clothing required. Saree, Half-saree, Salwar Kameez for women; Dhoti, Kurta, Pyjama for men. Shorts, ripped jeans, and sleeveless tops not permitted.',
      photography: 'Strictly prohibited inside the sanctum sanctorum and queue lines.',
      footwear: 'Footwear stands available at the foothill and at the hilltop entrance.',
      entryRules: 'Lifts and ropeway cars available for elderly and physically challenged devotees.',
      accessibility: 'Two Ghat roads allow cars and authorized state mini-buses directly to the hilltop.'
    },
    facilities: {
      parking: true,
      drinkingWater: true,
      restrooms: true,
      accommodation: true,
      dharamshala: 'Sri Durga Malleswara Choultries at foothill, Madapati Guest House, Sri Mallikarjuna Sadan.',
      nearbyHotels: 'Abundant luxury and business hotels near Vijayawada Railway Station and MG Road (within 3 km).',
      transport: 'Frequent city buses, autos, and temple ghat buses running from Pandit Nehru Bus Station directly to the hill.'
    },
    nearbyTransport: {
      railway: 'Vijayawada Junction (BZA) – 3 km (one of the largest railway hubs in India).',
      airport: 'Vijayawada International Airport, Gannavaram (VGA) – 22 km.',
      bus: 'Pandit Nehru Bus Station (PNBS) – 2.5 km (Asia’s second largest bus terminus).',
      local: 'Auto-rickshaws, app cabs (Ola, Uber), and dedicated ghat mini-buses to hilltop.'
    },
    coordinates: { lat: 16.5161, lng: 80.6052 },
    mapsUrl: 'https://maps.google.com/?q=16.5161,80.6052',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Kanaka_Durga_Temple_Vijayawada.jpg/800px-Kanaka_Durga_Temple_Vijayawada.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Kanaka_Durga_Temple_Vijayawada.jpg/800px-Kanaka_Durga_Temple_Vijayawada.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Kanaka_Durga_Temple_Golden_Gopuram.jpg/800px-Kanaka_Durga_Temple_Golden_Gopuram.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Indrakeeladri_Hill_View.jpg/800px-Indrakeeladri_Hill_View.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Prakasam_Barrage_and_Indrakeeladri.jpg/800px-Prakasam_Barrage_and_Indrakeeladri.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Kanaka_Durga_Temple_Vijayawada.jpg/800px-Kanaka_Durga_Temple_Vijayawada.jpg', caption: 'Kanaka Durga Temple overlooking the holy Krishna River', category: 'Exterior' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Kanaka_Durga_Temple_Golden_Gopuram.jpg/800px-Kanaka_Durga_Temple_Golden_Gopuram.jpg', caption: 'The sacred gilded Swarna Gopuram', category: 'Architecture' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Indrakeeladri_Hill_View.jpg/800px-Indrakeeladri_Hill_View.jpg', caption: 'Indrakeeladri hill approach and scenic ghat view', category: 'Landscape' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Prakasam_Barrage_and_Indrakeeladri.jpg/800px-Prakasam_Barrage_and_Indrakeeladri.jpg', caption: 'Prakasam Barrage and the sacred hill illuminated at dusk', category: 'Festival' }
    ],
    pilgrimageCircuits: ['Devi Shakti Circuit'],
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Sri Kalahasteeswara Temple',
    altNames: ['Srikalahasti Temple', 'Dakshina Kailasam', 'Rahu Ketu Kshetram', 'Vayu Linga Kshetram'],
    state: 'Andhra Pradesh',
    city: 'Srikalahasti',
    district: 'Tirupati',
    location: 'Banks of Swarnamukhi River at the foot of Kailasagiri Hill',
    address: 'Srikalahasti, Tirupati District, Andhra Pradesh',
    pincode: '517644',
    category: 'Pancha Bhoota Sthalam (Air / Vayu)',
    deity: 'Lord Shiva as Kalahasteeswara (Vayu Lingam) and Goddess Gnana Prasunambika Devi',
    associatedDeities: ['Bhakta Kannappa', 'Lord Ganesha (Pathala Vinayaka)', 'Lord Subrahmanya'],
    architecture: 'Magnificent Dravidian stone temple built into the hillside. Features the 120-ft towering 7-tiered Raja Gopuram constructed by Vijayanagara Emperor Sri Krishnadevaraya in 1516 CE, a 100-pillared mandapam, and rock-hewn caves.',
    history: 'Mentioned in the Skanda Purana and Shiva Purana. Consecrated by the Pallavas in the 5th century CE, and lavishly expanded by the Cholas and Vijayanagara rulers. Famous for the lore of Bhakta Kannappa, an ardent tribal devotee who offered his own eyes to Lord Shiva when he saw blood trickling from the Lingam.',
    significance: 'One of the five sacred Pancha Bhoota Sthalas representing the Air (Vayu) element. Inside the sanctum sanctorum, where there is no breeze, a flame continuously flickers gently, testifying to the presence of the Air element in the Shiva Lingam.',
    mythology: 'Named after Sri (Spider), Kala (Serpent), and Hasti (Elephant) who worshipped the Shiva Lingam through their natural instincts and achieved divine liberation (Moksha). World-renowned for Rahu-Ketu Sarpa Dosha Nivarana Pooja.',
    rituals: {
      daily: [
        'Suprabhata Seva (05:30 AM)',
        'Gomatha Pooja & Prathakala Abhishekam (06:00 AM)',
        'Rahu-Ketu Sarpa Dosha Nivarana Pooja (continuous hourly batches from 06:00 AM to 06:00 PM)',
        'Nitya Kalyanotsavam (10:30 AM)',
        'Pradosha Kala Pooja & Rudrabhishekam (05:30 PM)',
        'Pallaki Seva & Ekantha Seva (09:00 PM)'
      ],
      morningPooja: 'Gomatha Pooja at 6:00 AM, Rudrabhishekam from 6:30 AM',
      eveningAarti: 'Pradosha Harathi at 6:00 PM, Ekantha Seva at 9:00 PM',
      prasadInfo: 'Holy Panchamrutha prasadam, Bilva patra, Pulihora, and free Nitya Annadanam served to pilgrims.',
      specialPooja: 'Rahu-Ketu Pooja in designated mandapams with specialized brass serpent idols and Vedic archakas.'
    },
    timings: '06:00 AM – 09:00 PM',
    darshan: {
      openingTime: '06:00 AM',
      closingTime: '09:00 PM',
      morningDarshan: '06:00 AM – 01:30 PM',
      afternoonBreak: 'Continuous queue access',
      eveningDarshan: '02:00 PM – 09:00 PM',
      specialDarshan: 'Rahu-Ketu Pooja passes (₹500 / ₹750 / ₹1500 / ₹2500 / ₹5000 according to hall location), Sheegra Darshan (₹200), and Free Sarva Darshan.'
    },
    bestTimeToVisit: 'November to February (pleasant winter climate)',
    festivalsList: [
      { name: 'Maha Shivaratri Brahmotsavam', month: 'February–March', duration: '10 Days', significance: 'Celebrates Kalyanotsavam of Kalahasteeswara and Giri Pradakshina with chariot procession.' },
      { name: 'Giri Pradakshina (Full Moon)', month: 'Every Purnima (Monthly)', duration: '1 Day', significance: 'Thousands circumambulate the sacred 14 km perimeter of the Kailasagiri hill.' },
      { name: 'Aani Tirumanjanam & Karthika Deepam', month: 'November–December', duration: '1 Day', significance: 'Sacred lighting of massive oil flame atop the hill overlooking Swarnamukhi river.' }
    ],
    guidelines: {
      dressCode: 'Strict Indian traditional attire. Men must wear Dhoti, Kurta or Pyjama; Women must wear Saree or Salwar with Dupatta. Western clothes not permitted for pooja rituals.',
      photography: 'Strictly prohibited in inner sanctum and Rahu Ketu mandapams.',
      footwear: 'Footwear stands available outside all temple gopurams.',
      entryRules: 'Devotees performing Rahu-Ketu pooja must obtain tickets and enter through assigned gates.',
      accessibility: 'Pathala Vinayaka shrine is subterranean (35 steps down); main temple ground level is wheelchair accessible.'
    },
    facilities: {
      parking: true,
      drinkingWater: true,
      restrooms: true,
      accommodation: true,
      dharamshala: 'Sri Kalahasteeswara Devasthanam choultries, TTD Choultries, and Sringeri Shankara Math.',
      nearbyHotels: 'Numerous family hotels and budget lodges within 1 km of the temple.',
      transport: 'Direct buses and trains from Chennai (115 km), Tirupati (36 km), and Bengaluru (285 km).'
    },
    nearbyTransport: {
      railway: 'Srikalahasti Railway Station (KHT) – 2.5 km (direct trains to Tirupati, Chennai, Vijayawada, Hyderabad).',
      airport: 'Tirupati International Airport (TIR) – 25 km.',
      bus: 'Srikalahasti APSRTC Bus Station – 1.5 km.',
      local: 'Auto-rickshaws, taxis, cycle-rickshaws readily available across town.'
    },
    coordinates: { lat: 13.7500, lng: 79.7032 },
    mapsUrl: 'https://maps.google.com/?q=13.7500,79.7032',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Srikalahasti_temple_gopuram.jpg/800px-Srikalahasti_temple_gopuram.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Srikalahasti_temple_gopuram.jpg/800px-Srikalahasti_temple_gopuram.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Srikalahasti_Temple_Tower.jpg/800px-Srikalahasti_Temple_Tower.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Srikalahasti_Temple_across_river.jpg/800px-Srikalahasti_Temple_across_river.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Srikalahasti_temple_gopuram.jpg/800px-Srikalahasti_temple_gopuram.jpg', caption: 'Majestic Raja Gopuram of Srikalahasteeswara Temple', category: 'Architecture' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Srikalahasti_Temple_Tower.jpg/800px-Srikalahasti_Temple_Tower.jpg', caption: 'Intricately sculpted tower at Srikalahasti', category: 'Exterior' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Srikalahasti_Temple_across_river.jpg/800px-Srikalahasti_Temple_across_river.jpg', caption: 'Temple panoramic view across the sacred Swarnamukhi river', category: 'Landscape' }
    ],
    pilgrimageCircuits: ['Shiva Temple Circuit'],
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Sri Varaha Lakshmi Narasimha Swamy Temple',
    altNames: ['Simhachalam Temple', 'Simhadri Temple', 'Varaha Narasimha Temple'],
    state: 'Andhra Pradesh',
    city: 'Simhachalam, Visakhapatnam',
    district: 'Visakhapatnam',
    location: 'Simhachalam Hill, Eastern Ghats',
    address: 'Simhachalam, Visakhapatnam, Andhra Pradesh',
    pincode: '530028',
    category: 'Ancient Hill Temple',
    deity: 'Lord Varaha Lakshmi Narasimha Swamy (Unique composite deity with boar head and human-lion form)',
    associatedDeities: ['Goddess Lakshmi', 'Lord Vaikunthanatha', 'Lord Kasi Visweswara'],
    architecture: 'Magnificent synthesis of Kalinga and Dravidian architectural traditions. Features an ornate 16-pillared Natya Mandapa, 96 ornately sculpted stone pillars depicting the incarnations of Vishnu, and majestic elephant friezes.',
    history: 'Mentioned in the Sthala Purana as founded by Bhakta Prahlada. Heavily expanded in 1267 CE by King Narasimhadeva I of the Eastern Ganga Dynasty of Odisha. Over 525 stone inscriptions survive here, reflecting endowments from Cholas, Gangas, Gajapatis, and Vijayanagara Emperor Sri Krishnadevaraya in 1516 CE.',
    significance: 'The only temple where Lord Vishnu is worshipped in his composite Varaha-Narasimha incarnation. Except for one sacred day in the year (Chandanotsavam on Akshaya Tritiya), the deity is permanently covered in an authentic thick layer of sacred sandalwood paste (Chandanam), giving the idol the appearance of a Shiva Lingam.',
    mythology: 'Prahlada was cast down from the mountain by his demon father Hiranyakashipu. Lord Narasimha manifested with the agility of Varaha to save the child, and established his permanent resting place on this "Hill of the Lion" (Simhachalam).',
    rituals: {
      daily: [
        'Suprabhatam (05:00 AM)',
        'Prathakala Pooja & Nityakalyanam (09:00 AM)',
        'Sahasranama Archana & Ashtottara Sathanama Archana (10:00 AM)',
        'Maha Nivedana (11:30 AM)',
        'Sarva Darshanam (06:30 AM to 07:00 PM with intermittent breaks)',
        'Pavalimpu Seva & Shayanotsavam (09:00 PM)'
      ],
      morningPooja: 'Suprabhatam at 5:00 AM, Nitya Kalyanam at 9:00 AM',
      eveningAarti: 'Sandhya Harathi at 6:00 PM, Pavalimpu Seva at 9:00 PM',
      prasadInfo: 'Simhachalam famous Laddu, Pulihora, Daddojanam, and Nitya Annaprasadam at Devasthanam Annadana Hall.',
      specialPooja: 'Nityakalyanam (daily celestial wedding ritual), Swati Nakshatra Abhishekam, and Sudarshana Homam.'
    },
    timings: '06:30 AM – 11:30 AM, 12:30 PM – 07:00 PM, 08:30 PM – 09:00 PM',
    darshan: {
      openingTime: '06:30 AM',
      closingTime: '09:00 PM',
      morningDarshan: '06:30 AM – 11:30 AM',
      afternoonBreak: '11:30 AM – 12:30 PM (Maha Nivedana)',
      eveningDarshan: '12:30 PM – 07:00 PM, 08:30 PM – 09:00 PM',
      specialDarshan: 'Special Entry Darshan (₹100), Antaralaya Darshan (₹300), and Free Dharma Darshan.'
    },
    bestTimeToVisit: 'October to March (pleasant coastal breeze)',
    festivalsList: [
      { name: 'Chandanotsavam (Akshaya Tritiya)', month: 'April–May', duration: '1 Day', significance: 'The single day when the sandalwood paste is removed and the Lord appears in his original form (Nijaroopa Darshanam); draws over 150,000 pilgrims.' },
      { name: 'Narasimha Jayanti', month: 'May (Vaisakha Suddha Chaturdasi)', duration: '1 Day', significance: 'Celebrates the divine manifestation of Lord Narasimha with midnight abhishekam.' },
      { name: 'Giri Pradakshina', month: 'July (Ashadha Purnima)', duration: '1 Day', significance: 'Devotees circumambulate the 32 km perimeter of the sacred Simhachalam hill on foot.' }
    ],
    guidelines: {
      dressCode: 'Traditional Indian attire. Dhoti, Kurta, Pyjama for men; Saree, Churidar with Dupatta for women. Shorts and western casuals not allowed.',
      photography: 'Photography prohibited inside temple sanctum and pillared halls.',
      footwear: 'Footwear counters available at the hilltop entrance and foothill bus stand.',
      entryRules: 'Toll road permits cars and authorized buses directly up to the hilltop parking.',
      accessibility: 'Steps and paved ramp corridors for wheel chairs; battery cars available for senior citizens.'
    },
    facilities: {
      parking: true,
      drinkingWater: true,
      restrooms: true,
      accommodation: true,
      dharamshala: 'Simhadri Sadan, Chandana Yatri Nivas, Pushkarini Guest Houses.',
      nearbyHotels: 'Wide choice of premium and seaside hotels in Visakhapatnam city (15 km).',
      transport: 'City buses (Bus No. 6A, 6H) run every 5 minutes from Vizag Railway Station and RTC Complex.'
    },
    nearbyTransport: {
      railway: 'Simhachalam Railway Station (SCM) – 4 km; Visakhapatnam Junction (VSKP) – 16 km.',
      airport: 'Visakhapatnam International Airport (VTZ) – 12 km.',
      bus: 'Dwaraka Bus Station (RTC Complex), Visakhapatnam – 14 km; Simhachalam Foothill Bus Stand – 1.5 km.',
      local: 'Auto-rickshaws, app cabs (Uber, Ola), and frequent hilltop ghat shuttle buses.'
    },
    coordinates: { lat: 17.7667, lng: 83.2500 },
    mapsUrl: 'https://maps.google.com/?q=17.7667,83.2500',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Simhachalam_Temple_Visakhapatnam.jpg/800px-Simhachalam_Temple_Visakhapatnam.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Simhachalam_Temple_Visakhapatnam.jpg/800px-Simhachalam_Temple_Visakhapatnam.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Simhachalam_Temple_Pillars.jpg/800px-Simhachalam_Temple_Pillars.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Simhachalam_Gopuram.jpg/800px-Simhachalam_Gopuram.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Simhachalam_Temple_Visakhapatnam.jpg/800px-Simhachalam_Temple_Visakhapatnam.jpg', caption: 'The ancient stone temple of Simhachalam atop the hill', category: 'Exterior' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Simhachalam_Temple_Pillars.jpg/800px-Simhachalam_Temple_Pillars.jpg', caption: 'Sculptured stone pillars of the Kalyana Mandapa', category: 'Architecture' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Simhachalam_Gopuram.jpg/800px-Simhachalam_Gopuram.jpg', caption: 'Towering Kalinga vimana of Simhachalam', category: 'Architecture' }
    ],
    pilgrimageCircuits: ['Narasimha Circuit'],
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Sri Veera Venkata Satyanarayana Swamy Temple',
    altNames: ['Annavaram Temple', 'Ratnagiri Satyanarayana Swamy Temple', 'Annavaram Devasthanam'],
    state: 'Andhra Pradesh',
    city: 'Annavaram',
    district: 'Kakinada',
    location: 'Ratnagiri Hill on the banks of Pampa River',
    address: 'Annavaram, Kakinada District, Andhra Pradesh',
    pincode: '533406',
    category: 'Sacred Vrata Kshetram',
    deity: 'Lord Veera Venkata Satyanarayana Swamy and Goddess Anantha Lakshmi Satyavathi Devi',
    associatedDeities: ['Lord Shiva', 'Goddess Vanadurga', 'Lord Kanaka Durga'],
    architecture: 'Designed in the form of a majestic celestial chariot (Ratha) with four wheels representing the Sun, Earth, Moon, and Stars. The sanctum is built on two levels: the ground floor houses the Yantra and the first floor houses the holy idols.',
    history: 'Consecrated in 1891 CE by Raja I.V. Ramanarayanam, Zamindar of Gorsa and Kirlampudi, following a divine dream. Revered in the Skanda Purana where Lord Vishnu promised to manifest on Ratnagiri hill to grant boons (Anina-Varam) to devotees.',
    significance: 'The premier center in the world for performing the holy Sri Satyanarayana Swamy Vratam. Thousands of newly married couples and families gather here every day to perform the Vratam for prosperity, health, and peace.',
    mythology: 'According to the Skanda Purana, Sage Narada was distressed by human suffering on Earth. Lord Vishnu revealed that performing the Sri Satyanarayana Vrata was the easiest and most efficacious spiritual path to liberation in the Kali Yuga.',
    rituals: {
      daily: [
        'Suprabhata Seva (05:00 AM)',
        'Sri Satyanarayana Swamy Vratams (conducted in continuous batches from 06:00 AM to 06:00 PM)',
        'Nitya Kalyanotsavam (09:30 AM)',
        'Maha Nivedana (12:30 PM)',
        'Veda Parayanam & Sahasranamarchana (06:00 PM)',
        'Pavalimpu Seva (09:00 PM)'
      ],
      morningPooja: 'Suprabhatam at 5:00 AM, First batch of Vratams at 6:00 AM',
      eveningAarti: 'Sandhya Deeparadhana at 6:30 PM, Sayana Seva at 9:00 PM',
      prasadInfo: 'Famous Annavaram Prasadam made of pure broken wheat, ghee, cardamom, and jaggery (universally loved for its divine taste). Free Nitya Annadanam served to all pilgrims.',
      specialPooja: 'Special AC Vratam halls, Visishta Vratam, and Rajabhogam tickets.'
    },
    timings: '05:00 AM – 09:00 PM',
    darshan: {
      openingTime: '05:00 AM',
      closingTime: '09:00 PM',
      morningDarshan: '05:00 AM – 01:00 PM',
      afternoonBreak: 'Continuous Vratam and Darshan services',
      eveningDarshan: '01:00 PM – 09:00 PM',
      specialDarshan: 'Vratam tickets range from ₹150 (General), ₹300, ₹500, to ₹1000 (AC VIP Hall); Quick Darshan tickets ₹100.'
    },
    bestTimeToVisit: 'October to March (cool river breezes on Ratnagiri hill)',
    festivalsList: [
      { name: 'Sri Satyanarayana Swamy Jayanti', month: 'May (Vaisakha Suddha Ekadasi)', duration: '5 Days', significance: 'Celebrates the divine manifestation day of the Lord with celestial Kalyanotsavam.' },
      { name: 'Giri Pradakshina', month: 'November (Karthika Purnima)', duration: '1 Day', significance: 'Lakhs of devotees walk around the sacred Ratnagiri hill in holy prayer.' },
      { name: 'Devi Navaratri Utsavam', month: 'September–October', duration: '9 Days', significance: 'Grand celebrations at the adjacent Vanadurga and Kanaka Durga sanctums.' }
    ],
    guidelines: {
      dressCode: 'Traditional Indian clothing. Men must wear Dhoti/Kurta; Women must wear Saree or Punjabi dress with dupatta.',
      photography: 'Photography permitted in outer courtyard; prohibited inside the sanctum sanctorum.',
      footwear: 'Footwear stands available at the foothill toll gate and hill parking area.',
      entryRules: 'Both stepped pedestrian pathway and a well-paved ghat road connect foothill to hilltop.',
      accessibility: 'Lifts and wheelchair ramps facilitate easy movement between the chariot floors.'
    },
    facilities: {
      parking: true,
      drinkingWater: true,
      restrooms: true,
      accommodation: true,
      dharamshala: 'Extensive cottages and guest houses managed by the Devasthanam (Pampa Sadan, Ratnagiri Guest House).',
      nearbyHotels: 'Lodge and hotel facilities available at Annavaram town and foothill junction.',
      transport: 'Direct express trains halt at Annavaram station on the Howrah-Chennai mainline.'
    },
    nearbyTransport: {
      railway: 'Annavaram Railway Station (ANV) – 2 km (major stop on Chennai-Kolkata rail line).',
      airport: 'Rajahmundry Airport (RJA) – 72 km; Visakhapatnam International Airport (VTZ) – 110 km.',
      bus: 'Annavaram APSRTC Bus Stand – 1 km; National Highway 16 passes right through the town.',
      local: 'Auto-rickshaws, shared taxis, and dedicated temple mini-buses from railway station to hill.'
    },
    coordinates: { lat: 17.2800, lng: 82.4042 },
    mapsUrl: 'https://maps.google.com/?q=17.2800,82.4042',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Annavaram_Temple.jpg/800px-Annavaram_Temple.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Annavaram_Temple.jpg/800px-Annavaram_Temple.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Annavaram_hill_temple.jpg/800px-Annavaram_hill_temple.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Annavaram_Ratnagiri.jpg/800px-Annavaram_Ratnagiri.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Annavaram_Temple.jpg/800px-Annavaram_Temple.jpg', caption: 'The divine chariot-shaped temple of Annavaram atop Ratnagiri hill', category: 'Exterior' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Annavaram_hill_temple.jpg/800px-Annavaram_hill_temple.jpg', caption: 'The sacred hill and gopuram illuminated against the morning sky', category: 'Landscape' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Annavaram_Ratnagiri.jpg/800px-Annavaram_Ratnagiri.jpg', caption: 'View of the holy Pampa river flowing near Ratnagiri hill', category: 'Landscape' }
    ],
    pilgrimageCircuits: ['Tirupati Spiritual Circuit'],
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Sri Varasiddhi Vinayaka Temple',
    altNames: ['Kanipakam Temple', 'Kanipakam Vinayaka Temple', 'Swayambhu Varasiddhi Vinayaka'],
    state: 'Andhra Pradesh',
    city: 'Kanipakam',
    district: 'Chittoor',
    location: 'Banks of Bahuda River, Irala Mandal',
    address: 'Kanipakam, Chittoor District, Andhra Pradesh',
    pincode: '517131',
    category: 'Swayambhu Ganesha Temple',
    deity: 'Lord Varasiddhi Vinayaka Swamy (Swayambhu idol emerging from a holy fresh water well)',
    associatedDeities: ['Lord Shiva (Manikanteswara)', 'Lord Varadaraja Swamy'],
    architecture: 'Classical Chola and Vijayanagara Dravidian architecture. Built inside an expansive stone prakaram with a tall Raja Gopuram, a holy water tank (Bahuda Pushkarini), and the central sanctum built over the original well.',
    history: 'Constructed in the early 11th century CE by Chola Emperor Kulothunga Chola I and expanded by the Vijayanagara Emperors in 1336 CE. Historical lore tells of three physically challenged farmers whose plow struck a stone in a dried-up well; blood gushed forth, water filled the well, and their afflictions were miraculously healed.',
    significance: 'Famous as the "Court of Truth" (Pramanam). It is an age-old tradition that anyone taking an oath before Kanipakam Vinayaka will never speak falsehood due to the fear of divine retribution. The deity idol in the well is scientifically noted to be continually growing in size.',
    mythology: 'Swayambhu idol emerged in the holy well and could not be fully unearthed even when the deepest excavation was attempted. The water in the well never dries up and serves as the holy Teertham.',
    rituals: {
      daily: [
        'Suprabhatam (04:00 AM)',
        'Nijaroopa Darshanam (05:00 AM)',
        'Maha Ganapathi Homam (06:00 AM)',
        'Palabhishekam (Milk Abhishekam to the growing idol)',
        'Sahasranamarchana & Ashtottara Archana (10:00 AM)',
        'Kalyanotsavam (11:00 AM)',
        'Pavalimpu Seva (09:30 PM)'
      ],
      morningPooja: 'Suprabhatam at 4:00 AM, Ganapathi Homam at 6:00 AM',
      eveningAarti: 'Sandhya Harathi at 6:30 PM, Ekantha Seva at 9:30 PM',
      prasadInfo: 'Holy Well Teertham (miraculous healing water), Laddu, Vada, and free Nitya Annadanam provided by Devasthanam.',
      specialPooja: 'Maha Ganapathi Homam, Unjal Seva, and special silver car procession (Velli Ratham).'
    },
    timings: '04:00 AM – 09:30 PM',
    darshan: {
      openingTime: '04:00 AM',
      closingTime: '09:30 PM',
      morningDarshan: '05:00 AM – 01:00 PM',
      afternoonBreak: 'Continuous queue access',
      eveningDarshan: '01:00 PM – 09:30 PM',
      specialDarshan: 'Special Entry Darshan (₹100 / ₹150), Abhishekam tickets (₹500), and Free Sarva Darshan.'
    },
    bestTimeToVisit: 'September to February (celebration of Vinayaka Chavithi Brahmotsavam)',
    festivalsList: [
      { name: 'Vinayaka Chavithi Brahmotsavam', month: 'August–September (Bhadrapada month)', duration: '21 Days', significance: 'Massive annual car festival where Lord Vinayaka is taken in procession on celestial vahanams for 21 days.' },
      { name: 'Sankranti Utsavam', month: 'January', duration: '3 Days', significance: 'Pongal celebrations with Kanuma Rathotsavam across the town.' },
      { name: 'Ugadi (Telugu New Year)', month: 'March–April', duration: '1 Day', significance: 'Panchanga Sravanam and special jewel adornment (Swarna Kavacham).' }
    ],
    guidelines: {
      dressCode: 'Modest traditional Indian clothing. Men must wear Dhoti, Kurta, Pyjama; Women must wear Saree or Salwar with Dupatta. Western casuals not allowed in inner sanctum.',
      photography: 'Strictly prohibited inside the sanctum sanctorum and pooja halls.',
      footwear: 'Footwear stands located outside the temple main gopuram.',
      entryRules: 'Pilgrims entering the oath courtyard must maintain total silence and spiritual reverence.',
      accessibility: 'Wheelchair access available throughout the main temple corridors and courtyard.'
    },
    facilities: {
      parking: true,
      drinkingWater: true,
      restrooms: true,
      accommodation: true,
      dharamshala: 'Sri Varasiddhi Vinayaka Choultries, TTD Guest House, Chola Nivas, and Ganesh Sadan.',
      nearbyHotels: 'Hotels and lodges at Kanipakam town and nearby district headquarters Chittoor (12 km).',
      transport: 'Direct APSRTC express buses from Tirupati, Chennai, Vellore, and Bengaluru.'
    },
    nearbyTransport: {
      railway: 'Chittoor Railway Station (CTO) – 12 km; Tirupati Railway Station (TPTY) – 72 km.',
      airport: 'Tirupati International Airport (TIR) – 85 km; Bengaluru Kempegowda Airport (BLR) – 165 km.',
      bus: 'Kanipakam APSRTC Bus Stand – 500 m; frequent shuttles to Chittoor and Tirupati.',
      local: 'Auto-rickshaws and taxis available 24x7 outside the temple.'
    },
    coordinates: { lat: 13.2847, lng: 79.0347 },
    mapsUrl: 'https://maps.google.com/?q=13.2847,79.0347',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Kanipakam_Temple_Gopuram.jpg/800px-Kanipakam_Temple_Gopuram.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Kanipakam_Temple_Gopuram.jpg/800px-Kanipakam_Temple_Gopuram.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Kanipakam_temple_complex.jpg/800px-Kanipakam_temple_complex.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Kanipakam_Holy_Tank.jpg/800px-Kanipakam_Holy_Tank.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Kanipakam_Temple_Gopuram.jpg/800px-Kanipakam_Temple_Gopuram.jpg', caption: 'The main Raja Gopuram tower of Kanipakam Vinayaka Temple', category: 'Architecture' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Kanipakam_temple_complex.jpg/800px-Kanipakam_temple_complex.jpg', caption: 'The sacred temple courtyard and surrounding stone corridors', category: 'Exterior' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Kanipakam_Holy_Tank.jpg/800px-Kanipakam_Holy_Tank.jpg', caption: 'Bahuda sacred Pushkarini theertham at Kanipakam', category: 'Landscape' }
    ],
    pilgrimageCircuits: ['Ganesha Circuit'],
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Sri Ahobilam Narasimha Swamy Temple',
    altNames: ['Ahobila Kshetram', 'Nava Narasimha Kshetram', 'Singavel Kundram'],
    state: 'Andhra Pradesh',
    city: 'Ahobilam',
    district: 'Nandyal',
    location: 'Nallamala Hills Forest Range, Allagadda Mandal',
    address: 'Ahobilam, Nandyal District, Andhra Pradesh',
    pincode: '518545',
    category: 'Divya Desam & Nava Narasimha Kshetram',
    deity: 'Nava Narasimha (Nine Divine Forms: Jwala, Ahobila, Malola, Kroda, Karanja, Bhargava, Yogananda, Chatravata, and Pavana Narasimha)',
    associatedDeities: ['Goddess Chenchu Lakshmi', 'Goddess Amruthavalli', 'Bhakta Prahlada'],
    architecture: 'Ancient rock-cut shrines, natural mountain cave sanctums, and elaborate Vijayanagara stone mandapams with sculpted pillars dating from the 14th to 16th centuries.',
    history: 'Celebrated in the Brahmanda Purana and glorified by the Alvars as a Divya Desam. The epic center where Lord Narasimha emerged from the pillar (Ugra Stambham) to slay Hiranyakashipu. Maintained since centuries by the historic Sri Ahobila Mutt spiritual lineage.',
    significance: 'The only pilgrimage site in the world where all nine divine forms (Nava Narasimha) of Lord Vishnu are worshipped in their original sacred mountain locations across Upper and Lower Ahobilam.',
    mythology: 'When Lord Narasimha tore open the golden pillar, the devas exclaimed "Aho Veeryam! Aho Shauryam! Aho Bahu Parakramam! Narasimham Param Daivam Ahobilam Aho Balam!" which gave this sacred valley its eternal name Ahobilam.',
    rituals: {
      daily: [
        'Suprabhatam (06:00 AM at Lower Ahobilam)',
        'Thirumanjanam (Abhishekam) with forest theertham waters',
        'Nitya Kalyanotsavam of Malola Narasimha Swamy (10:00 AM)',
        'Cave Pooja offerings across the upper mountain shrines',
        'Sahasranamarchana (06:00 PM)',
        'Sayana Seva (08:00 PM)'
      ],
      morningPooja: 'Suprabhatam at 6:00 AM, Thirumanjanam at 7:30 AM',
      eveningAarti: 'Sayana Seva at 8:00 PM',
      prasadInfo: 'Sacred Puliyodharai, Dadhyodhanam, and free Annadanam at Sri Ahobila Mutt Annadana Hall.',
      specialPooja: 'Swati Nakshatram Abhishekam (monthly auspicious star of Lord Narasimha), Sudarshana Narasimha Homam.'
    },
    timings: '06:00 AM – 01:00 PM, 03:00 PM – 08:00 PM (Upper Ahobilam closes at 5:00 PM for forest safety)',
    darshan: {
      openingTime: '06:00 AM',
      closingTime: '08:00 PM',
      morningDarshan: '06:00 AM – 01:00 PM',
      afternoonBreak: '01:00 PM – 03:00 PM',
      eveningDarshan: '03:00 PM – 08:00 PM',
      specialDarshan: 'Special Seva tickets available at Sri Ahobila Mutt administrative office.'
    },
    bestTimeToVisit: 'October to March (pleasant weather for forest mountain trekking)',
    festivalsList: [
      { name: 'Narasimha Jayanti', month: 'May (Vaisakha Suddha Chaturdasi)', duration: '1 Day', significance: 'Celebrates the divine emergence of Lord Narasimha with midnight cave abhishekams.' },
      { name: 'Ahobilam Brahmotsavam', month: 'February–March (Phalguna month)', duration: '10 Days', significance: 'Grand chariot festival uniting tribal Chenchu devotees and pilgrims from across Bharat.' },
      { name: 'Swati Nakshatram (Monthly)', month: 'Every month on Swati star', duration: '1 Day', significance: 'Grand Maha Abhishekam conducted simultaneously across all 9 shrines.' }
    ],
    guidelines: {
      dressCode: 'Traditional Indian clothing for darshan. Sturdy walking shoes and comfortable attire recommended for trekking to upper forest cave shrines.',
      photography: 'Photography permitted in forest trails; prohibited inside cave sanctums.',
      footwear: 'Footwear must be removed before entering cave thresholds.',
      entryRules: 'Trekking to Upper Ahobilam and Ugra Stambham should be completed before sunset; local authorized guides recommended.',
      accessibility: 'Lower Ahobilam is road-accessible; Upper Ahobilam requires mountain path and rock stair climbing.'
    },
    facilities: {
      parking: true,
      drinkingWater: true,
      restrooms: true,
      accommodation: true,
      dharamshala: 'Sri Ahobila Mutt Guest House, Malola Nilayam, and TTD Choultry.',
      nearbyHotels: 'Budget lodges and AP Tourism Haritha facilities in Allagadda (30 km).',
      transport: 'APSRTC buses operate regularly between Allagadda, Nandyal, and Ahobilam.'
    },
    nearbyTransport: {
      railway: 'Nandyal Junction (NDL) – 65 km; Allagadda Railway Station – 30 km.',
      airport: 'Kurnool Airport (KJB) – 110 km; Hyderabad International Airport (HYD) – 310 km.',
      bus: 'Ahobilam Bus Stand – 200 m (direct buses from Allagadda, Kurnool, and Tirupati).',
      local: 'Local jeeps (doli service available for elderly pilgrims to upper shrines).'
    },
    coordinates: { lat: 15.1333, lng: 78.7167 },
    mapsUrl: 'https://maps.google.com/?q=15.1333,78.7167',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Ahobilam_Temple_Tower.jpg/800px-Ahobilam_Temple_Tower.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Ahobilam_Temple_Tower.jpg/800px-Ahobilam_Temple_Tower.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Upper_Ahobilam_Temple.jpg/800px-Upper_Ahobilam_Temple.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Ahobilam_Forest_Gorge.jpg/800px-Ahobilam_Forest_Gorge.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Ugra_Stambham_Ahobilam.jpg/800px-Ugra_Stambham_Ahobilam.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Ahobilam_Temple_Tower.jpg/800px-Ahobilam_Temple_Tower.jpg', caption: 'The main Raja Gopuram of Lower Ahobilam Temple', category: 'Exterior' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Upper_Ahobilam_Temple.jpg/800px-Upper_Ahobilam_Temple.jpg', caption: 'Upper Ahobilam sacred cave shrine in the Nallamala cliffs', category: 'Architecture' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Ahobilam_Forest_Gorge.jpg/800px-Ahobilam_Forest_Gorge.jpg', caption: 'Jwala Narasimha waterfalls and deep mountain gorge trail', category: 'Landscape' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Ugra_Stambham_Ahobilam.jpg/800px-Ugra_Stambham_Ahobilam.jpg', caption: 'The sacred Ugra Stambham rocky cleft peak high above the valley', category: 'Landscape' }
    ],
    pilgrimageCircuits: ['Narasimha Circuit'],
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Sri Panakala Lakshmi Narasimha Swamy Temple',
    altNames: ['Mangalagiri Temple', 'Panakala Swamy Temple', 'Mangalagiri Narasimha Temple'],
    state: 'Andhra Pradesh',
    city: 'Mangalagiri',
    district: 'Guntur',
    location: 'Mangalagiri Hill (shaped like an elephant)',
    address: 'Mangalagiri, Guntur District, Andhra Pradesh',
    pincode: '522503',
    category: 'Swayambhu Mahakshetram',
    deity: 'Sri Panakala Lakshmi Narasimha Swamy (Hilltop deity drinking sweet jaggery water) and Sri Lakshmi Narasimha Swamy (Foothill temple)',
    associatedDeities: ['Goddess Rajya Lakshmi', 'Lord Anjaneya Swamy'],
    architecture: 'Features an ancient rock-cave sanctum atop the hill and the soaring 153-foot 11-storeyed Gali Gopuram at the foothill, constructed by Vasireddy Venkatadri Nayudu in 1807 CE.',
    history: 'One of the eight sacred Swayamvyakta Kshetras of Lord Vishnu. Celebrated in the Brahma Vaivarta Purana. The hill was known in the Kritha Yuga as Mukthyadri, in Treta Yuga as Totadri, in Dvapara Yuga as Hamsadri, and in Kali Yuga as Mangalagiri (The Auspicious Hill).',
    significance: 'World-famous divine miracle: The deity has a wide-open stone mouth into which pots of sweet jaggery water (Panakam) are poured using a conch. The deity drinks exactly half of any quantity poured and leaves the remaining half as holy prasadam. Incredibly, despite thousands of liters of sweet water offered daily, not a single ant is ever seen inside the sanctum.',
    mythology: 'Lord Vishnu slew the demon Namuchi with foam (since the demon had boons against weapons wet or dry). Lord Narasimha then settled on the volcanic hill, asking for sweet nectar (Panakam) to quench the scorching heat of his divine rage.',
    rituals: {
      daily: [
        'Suprabhatam (05:00 AM)',
        'Panaka Nivedana (Continuous sweet jaggery water offerings from 07:00 AM to 03:30 PM)',
        'Sahasranama Archana (09:00 AM)',
        'Nitya Kalyanotsavam at foothill temple (10:00 AM)',
        'Maha Harathi (03:00 PM)',
        'Foothill temple remains open till 08:30 PM for Shayanotsavam'
      ],
      morningPooja: 'Suprabhatam at 5:00 AM, First Panakam offering at 7:00 AM',
      eveningAarti: 'Evening Harathi at foothill temple at 7:00 PM',
      prasadInfo: 'Holy Panakam (spiced jaggery water with cardamom and black pepper) and Annaprasadam at the foothill Devasthanam hall.',
      specialPooja: 'Sudarshana Narasimha Homam, Kalyanotsavam, and Swarna Kavacha Alankaram on festival days.'
    },
    timings: '07:00 AM – 03:30 PM (Hilltop shrine closes at 3:30 PM; foothill temple open 05:00 AM – 08:30 PM)',
    darshan: {
      openingTime: '07:00 AM',
      closingTime: '03:30 PM',
      morningDarshan: '07:00 AM – 03:30 PM (Hilltop Panakala Swamy)',
      afternoonBreak: 'Hill shrine closes at 03:30 PM strictly',
      eveningDarshan: 'Foothill Temple open 04:00 PM – 08:30 PM',
      specialDarshan: 'Special Entry Darshan (₹100) and Free Dharma Darshan.'
    },
    bestTimeToVisit: 'October to March (cooler weather for climbing hill stairs)',
    festivalsList: [
      { name: 'Sri Panakala Swamy Brahmotsavam', month: 'March (Phalguna Suddha Purnima)', duration: '11 Days', significance: 'Celebrates the celestial marriage of Lord Narasimha with Goddess Rajya Lakshmi.' },
      { name: 'Narasimha Jayanti', month: 'May (Vaisakha month)', duration: '1 Day', significance: 'Special Panakam abhishekams with golden vessels.' },
      { name: 'Vaikunta Ekadasi', month: 'December–January', duration: '1 Day', significance: 'Grand procession of the Lord through the historic Gali Gopuram.' }
    ],
    guidelines: {
      dressCode: 'Traditional Indian clothing. Men must wear Dhoti, Kurta, Pyjama; Women must wear Saree or Salwar with Dupatta.',
      photography: 'Strictly prohibited inside the rock cave and sanctum sanctorum.',
      footwear: 'Footwear stands available at the foothill and hilltop stair landing.',
      entryRules: 'Hilltop shrine closes promptly at 03:30 PM daily; devotees must reach the hill before 02:30 PM.',
      accessibility: 'Ghat road allows vehicles up to the hilltop parking; steps also available.'
    },
    facilities: {
      parking: true,
      drinkingWater: true,
      restrooms: true,
      accommodation: true,
      dharamshala: 'Devasthanam Guest Houses, TTD Choultries, and private lodges at Mangalagiri town.',
      nearbyHotels: 'Extensive modern hotels in Vijayawada (12 km) and Guntur (22 km).',
      transport: 'City buses connect Mangalagiri with Vijayawada and Guntur every 10 minutes.'
    },
    nearbyTransport: {
      railway: 'Mangalagiri Railway Station (MAG) – 2 km; Vijayawada Junction (BZA) – 12 km.',
      airport: 'Vijayawada International Airport, Gannavaram (VGA) – 32 km.',
      bus: 'Mangalagiri APSRTC Bus Stand – 1 km; on the Chennai-Kolkata National Highway.',
      local: 'Auto-rickshaws, app cabs, and shared jeeps to hilltop.'
    },
    coordinates: { lat: 16.4328, lng: 80.5647 },
    mapsUrl: 'https://maps.google.com/?q=16.4328,80.5647',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Mangalagiri_Gali_Gopuram.jpg/800px-Mangalagiri_Gali_Gopuram.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Mangalagiri_Gali_Gopuram.jpg/800px-Mangalagiri_Gali_Gopuram.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Mangalagiri_Hill_Temple.jpg/800px-Mangalagiri_Hill_Temple.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Mangalagiri_Temple_Complex.jpg/800px-Mangalagiri_Temple_Complex.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Mangalagiri_Gali_Gopuram.jpg/800px-Mangalagiri_Gali_Gopuram.jpg', caption: 'The 153-foot historic Gali Gopuram of Mangalagiri Temple', category: 'Architecture' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Mangalagiri_Hill_Temple.jpg/800px-Mangalagiri_Hill_Temple.jpg', caption: 'Hilltop Panakala Swamy temple approach stairs', category: 'Exterior' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Mangalagiri_Temple_Complex.jpg/800px-Mangalagiri_Temple_Complex.jpg', caption: 'The sacred temple courtyard at the foothill', category: 'Architecture' }
    ],
    pilgrimageCircuits: ['Narasimha Circuit'],
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Sri Mahanandiswara Swamy Temple',
    altNames: ['Mahanandi Temple', 'Mahanandi Shiva Temple', 'Nava Nandi Kshetram'],
    state: 'Andhra Pradesh',
    city: 'Mahanandi',
    district: 'Nandyal',
    location: 'Nallamala Foothills, surrounded by dense groves',
    address: 'Mahanandi, Nandyal District, Andhra Pradesh',
    pincode: '518502',
    category: 'Ancient Chalukyan Temple & Holy Spring',
    deity: 'Lord Mahanandiswara (Swayambhu Shiva Lingam located over a natural freshwater spring) and Goddess Kameswari Devi',
    associatedDeities: ['Goddess Kameswari Devi', 'Kodanda Rama Swamy', 'Vinayaka Swamy'],
    architecture: 'Badami Chalukya and Vijayanagara architectural styles. Features unique pushkarini pools (Kalyani) where crystal-clear mineral water flows ceaselessly at a constant 27°C (81°F) throughout all seasons.',
    history: 'Built in the early 7th century CE by Chalukya kings and enhanced by the Nanda Dynasty kings who ruled this region. Central to the historic Nava Nandi (Nine Sacred Bulls) pilgrimage circuit centered around Nandyal.',
    significance: 'Famous for the astonishing clarity of its sacred mineral pushkarini spring: the water is so crystal transparent that even a small needle lying at the bottom 5-feet deep is clearly visible from the surface. Bathing here is believed to cure skin ailments.',
    mythology: 'According to Sthala Purana, a cow belonging to King Nanda used to graze on the hill and miraculously milk itself into a termite mound containing a Shiva Lingam. The king saw this in wonder, and when the cow accidentally stepped on the mound, the imprint of the cow’s hoof remained permanently visible on the top of the Lingam.',
    rituals: {
      daily: [
        'Pushkarini Snanam (Devotees take holy dip in the crystal water before darshan)',
        'Suprabhata Seva (05:30 AM)',
        'Rudrabhishekam (06:30 AM)',
        'Bilvarchana & Kumkumarchana (08:30 AM)',
        'Maha Mangala Harathi (12:30 PM)',
        'Pradosha Kala Pooja (05:30 PM)',
        'Ekantha Seva (09:00 PM)'
      ],
      morningPooja: 'Suprabhatam at 5:30 AM, Rudrabhishekam at 6:30 AM',
      eveningAarti: 'Sandhya Harathi at 6:00 PM, Ekantha Seva at 9:00 PM',
      prasadInfo: 'Holy Theertham from the underground spring, Bilva Patra, Laddu, and free Nitya Annadanam.',
      specialPooja: 'Maha Rudrabhishekam on Mondays and Pradosham days.'
    },
    timings: '05:30 AM – 01:00 PM, 03:30 PM – 09:00 PM',
    darshan: {
      openingTime: '05:30 AM',
      closingTime: '09:00 PM',
      morningDarshan: '05:30 AM – 01:00 PM',
      afternoonBreak: '01:00 PM – 03:30 PM',
      eveningDarshan: '03:30 PM – 09:00 PM',
      specialDarshan: 'Special Entry Darshan (₹100), Abhishekam passes (₹300), and Free Dharma Darshan.'
    },
    bestTimeToVisit: 'September to February (lush green forest surroundings)',
    festivalsList: [
      { name: 'Maha Shivaratri Brahmotsavam', month: 'February–March', duration: '5 Days', significance: 'Celebrates the marriage of Lord Mahanandiswara with grand chariot car festival drawing lakhs of pilgrims.' },
      { name: 'Karthika Masam', month: 'November–December', duration: '30 Days', significance: 'Holy dips in the warm pushkarini followed by lighting thousands of deepams.' },
      { name: 'Ugadi Festival', month: 'March–April', duration: '1 Day', significance: 'Special flower decoration and temple car procession.' }
    ],
    guidelines: {
      dressCode: 'Traditional attire. Devotees may wear bathing clothes for outer pushkarini bath, but must change into dry traditional attire before entering inner sanctum.',
      photography: 'Photography allowed around outer pushkarini; strictly prohibited inside sanctum.',
      footwear: 'Footwear stands available at the main archway entrance.',
      entryRules: 'Bathers must avoid using soap, shampoo or oils in the sacred temple pushkarinis.',
      accessibility: 'Ground-level entry with gentle stone ramps accessible for senior citizens.'
    },
    facilities: {
      parking: true,
      drinkingWater: true,
      restrooms: true,
      accommodation: true,
      dharamshala: 'Mahanandi Devasthanam Cottages, TTD Choultry, and AP Tourism Haritha Resort.',
      nearbyHotels: 'Comfortable family hotels in Nandyal town (18 km).',
      transport: 'Frequent RTC shuttle buses run between Nandyal railway station/bus stand and Mahanandi.'
    },
    nearbyTransport: {
      railway: 'Nandyal Junction (NDL) – 18 km (connected to Guntur, Bengaluru, Hyderabad, Hubli).',
      airport: 'Kurnool Airport (KJB) – 85 km; Hyderabad International Airport (HYD) – 290 km.',
      bus: 'Mahanandi APSRTC Bus Stand – 300 m.',
      local: 'Auto-rickshaws, shared taxis, and RTC mini-buses.'
    },
    coordinates: { lat: 15.4858, lng: 78.6256 },
    mapsUrl: 'https://maps.google.com/?q=15.4858,78.6256',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Mahanandi_Temple_Tank.jpg/800px-Mahanandi_Temple_Tank.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Mahanandi_Temple_Tank.jpg/800px-Mahanandi_Temple_Tank.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Mahanandiswara_Temple_Tower.jpg/800px-Mahanandiswara_Temple_Tower.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Mahanandi_Kalyani.jpg/800px-Mahanandi_Kalyani.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Mahanandi_Temple_Tank.jpg/800px-Mahanandi_Temple_Tank.jpg', caption: 'The crystal-clear pushkarini spring pool at Mahanandi Temple', category: 'Landscape' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Mahanandiswara_Temple_Tower.jpg/800px-Mahanandiswara_Temple_Tower.jpg', caption: 'Ancient Chalukyan stone tower over the sanctum', category: 'Architecture' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Mahanandi_Kalyani.jpg/800px-Mahanandi_Kalyani.jpg', caption: 'The stepped Kalyani pushkarini with natural warm spring currents', category: 'Exterior' }
    ],
    pilgrimageCircuits: ['Shiva Temple Circuit'],
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Arasavalli Sun Temple',
    altNames: ['Sri Suryanarayana Swamy Temple', 'Arasavalli Devasthanam', 'Suryanarayana Temple Srikakulam'],
    state: 'Andhra Pradesh',
    city: 'Arasavalli, Srikakulam',
    district: 'Srikakulam',
    location: 'Arasavalli village on the outskirts of Srikakulam town',
    address: 'Arasavalli, Srikakulam District, Andhra Pradesh',
    pincode: '532001',
    category: 'Ancient Sun Temple',
    deity: 'Lord Suryanarayana Swamy (Sun God carved in monolithic black granite flanked by Usha, Padmini, and Chhaya)',
    associatedDeities: ['Lord Shiva', 'Lord Vishnu', 'Lord Ganesha', 'Goddess Parvati'],
    architecture: 'Kalinga architectural style. Celebrated for its unique architectural wonder: twice a year during the solar equinoxes (in February on Ratha Saptami and in October), the early morning rays of the rising sun pass through the five consecutive entrance doorways and fall directly onto the feet of the Lord in the innermost sanctum.',
    history: 'Built in the 7th century CE by King Devendra Varma of the Eastern Kalinga Dynasty. Recorded in the Padma Purana as founded by Sage Kasyapa for the welfare of mankind. One of the extremely rare ancient and living Sun temples in all of India.',
    significance: 'Dedicated to the Sun God who bestows health, vision, vitality, and cures from chronic ailments. Worship of Lord Suryanarayana on Sundays is believed to eradicate eye and skin afflictions.',
    mythology: 'According to legend, Lord Indra was struck by Nandi when he attempted to enter Lord Shiva’s sanctum uninvited. Indra fell unconscious and prayed to Lord Surya for healing. When restored, Indra established this temple and dug the holy Indra Pushkarini.',
    rituals: {
      daily: [
        'Usha-Kala Seva (05:00 AM on Sundays, 06:00 AM on weekdays)',
        'Surya Namaskara Pooja & Aditya Hrudaya Parayanam',
        'Ksheerabhishekam (Milk Abhishekam to the Sun God)',
        'Sahasranamarchana (09:00 AM)',
        'Maha Nivedana & Harathi (12:30 PM)',
        'Sandhya Deeparadhana (06:00 PM)',
        'Ekantha Seva (08:00 PM)'
      ],
      morningPooja: 'Usha-Kala Seva at 6:00 AM, Surya Namaskaram at 7:00 AM',
      eveningAarti: 'Maha Harathi at 6:30 PM, Ekantha Seva at 8:00 PM',
      prasadInfo: 'Holy Pongali, Laddu, Pulihora, and Nitya Annadanam served daily to visiting pilgrims.',
      specialPooja: 'Surya Namaskaram with 108 mantras, Tailabhishekam on Sundays, and Aditya Hrudayam recitations.'
    },
    timings: '06:00 AM – 12:30 PM, 03:30 PM – 08:00 PM (Opens at 05:00 AM on Sundays)',
    darshan: {
      openingTime: '06:00 AM',
      closingTime: '08:00 PM',
      morningDarshan: '06:00 AM – 12:30 PM',
      afternoonBreak: '12:30 PM – 03:30 PM',
      eveningDarshan: '03:30 PM – 08:00 PM',
      specialDarshan: 'Special Entry Darshan (₹100), Abhishekam tickets (₹200), and Free Dharma Darshan.'
    },
    bestTimeToVisit: 'October to March (especially during Ratha Saptami in February)',
    festivalsList: [
      { name: 'Ratha Saptami (Surya Jayanti)', month: 'February (Magha Suddha Saptami)', duration: '1 Day', significance: 'Grandest Sun festival in South India where sunrays illuminate the sanctum; over 200,000 pilgrims take holy dip in Indra Pushkarini.' },
      { name: 'Magha Masam Sundays', month: 'January–February', duration: '4 Sundays', significance: 'Special early morning Surya Namaskaras and thousands offer milk porridge to the Sun.' },
      { name: 'Kalyanotsavam', month: 'April (Chaitra Suddha Ekadasi)', duration: '5 Days', significance: 'Celestial marriage festival of Lord Suryanarayana with consorts Usha and Chhaya.' }
    ],
    guidelines: {
      dressCode: 'Traditional Indian attire. Dhoti/Kurta for men; Saree/Salwar for women. Western wear strictly prohibited during Abhishekam.',
      photography: 'Strictly prohibited in the sanctum sanctorum.',
      footwear: 'Footwear stands available at the temple entrance gateway.',
      entryRules: 'Sundays witness heavy morning crowds; online tokens recommended.',
      accessibility: 'Level entrance and paved pathways accessible for senior citizens.'
    },
    facilities: {
      parking: true,
      drinkingWater: true,
      restrooms: true,
      accommodation: true,
      dharamshala: 'Arasavalli Devasthanam Yatri Nivas, TTD Kalyana Mandapam, and Srikakulam Town Guest Houses.',
      nearbyHotels: 'Hotels and business lodges in Srikakulam town (2 km).',
      transport: 'City buses and autos link Srikakulam town directly with Arasavalli every 5 minutes.'
    },
    nearbyTransport: {
      railway: 'Srikakulam Road Railway Station (Amadalavalasa) – 13 km (on Howrah-Chennai mainline).',
      airport: 'Visakhapatnam International Airport (VTZ) – 105 km.',
      bus: 'Srikakulam APSRTC Bus Station – 2 km.',
      local: 'Auto-rickshaws, city buses, and taxis.'
    },
    coordinates: { lat: 18.2936, lng: 83.9039 },
    mapsUrl: 'https://maps.google.com/?q=18.2936,83.9039',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Arasavalli_Sun_Temple.jpg/800px-Arasavalli_Sun_Temple.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Arasavalli_Sun_Temple.jpg/800px-Arasavalli_Sun_Temple.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Arasavalli_Pushkarini.jpg/800px-Arasavalli_Pushkarini.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Arasavalli_Temple_Prakaram.jpg/800px-Arasavalli_Temple_Prakaram.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Arasavalli_Sun_Temple.jpg/800px-Arasavalli_Sun_Temple.jpg', caption: 'The sacred Kalinga tower of Arasavalli Sun Temple', category: 'Architecture' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Arasavalli_Pushkarini.jpg/800px-Arasavalli_Pushkarini.jpg', caption: 'Indra Pushkarini theertham at Arasavalli', category: 'Landscape' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Arasavalli_Temple_Prakaram.jpg/800px-Arasavalli_Temple_Prakaram.jpg', caption: 'The stone prakaram courtyard of the Sun God', category: 'Exterior' }
    ],
    pilgrimageCircuits: ['Tirupati Spiritual Circuit'],
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Draksharamam Bhimeswara Temple',
    altNames: ['Draksharama Temple', 'Bhimeswara Swamy Temple', 'Dakshina Kasi', 'Pancharama Kshetram Draksharamam'],
    state: 'Andhra Pradesh',
    city: 'Draksharamam',
    district: 'Konaseema',
    location: 'Sacred Godavari Delta, Ramachandrapuram Mandal',
    address: 'Draksharamam, Konaseema District, Andhra Pradesh',
    pincode: '533262',
    category: 'Pancharama & Ashta Dasha Shakti Peeth',
    deity: 'Lord Bhimeswara Swamy (14-foot massive crystal-black Spatika Lingam spanning two storeys) and Goddess Manikyamba Devi (12th Ashta Dasha Shakti Peeth)',
    associatedDeities: ['Goddess Manikyamba', 'Lord Ganesha', 'Lord Surya'],
    architecture: 'Two-storeyed Eastern Chalukyan stone temple built inside massive double-walled prakarams. The Shiva Lingam rises 14 feet through two floors; pooja and abhishekam to the head of the lingam are performed on the upper floor balcony.',
    history: 'Constructed between 892 and 922 CE by Eastern Chalukya King Chalukya Bhima I. Known in ancient inscriptions as "Dakshina Kasi" (Southern Varanasi). The site of the legendary Daksha Yagna and Sati’s self-immolation in Hindu sacred tradition.',
    significance: 'One of the holiest shrines of Bharat holding a dual supreme sanctity: it is one of the five Pancharama Kshetras of Lord Shiva and houses the 12th Ashta Dasha Shakti Peeth (navel of Sati) of Goddess Manikyamba.',
    mythology: 'When Lord Kartikeya broke the demon Tarakasura’s Atma Linga into five pieces, the largest piece fell at Draksharamam. Lord Indra and the Seven Rishis (Sapta Rishis) established the Sapta Godavari theertham here to cool the divine Lingam.',
    rituals: {
      daily: [
        'Suprabhata Seva (05:30 AM)',
        'Maha Abhishekam to the 14-foot Lingam on the upper storey (06:30 AM)',
        'Manikyamba Devi Kumkumarchana (08:30 AM)',
        'Maha Nivedana (12:00 PM)',
        'Pradosha Kala Pooja (05:30 PM)',
        'Ekantha Seva & Pavalimpu Seva (08:00 PM)'
      ],
      morningPooja: 'Suprabhatam at 5:30 AM, Upper storey Abhishekam at 6:30 AM',
      eveningAarti: 'Sandhya Harathi at 6:00 PM, Ekantha Seva at 8:00 PM',
      prasadInfo: 'Holy Sapta Godavari Teertham, Kumkum from Manikyamba shrine, Laddu, and Nitya Annadanam.',
      specialPooja: 'Laksha Bilvarchana, Rudra Homam, and Sri Chakra Kumkumarchana at the Shakti Peeth.'
    },
    timings: '06:00 AM – 12:00 PM, 03:00 PM – 08:00 PM',
    darshan: {
      openingTime: '06:00 AM',
      closingTime: '08:00 PM',
      morningDarshan: '06:00 AM – 12:00 PM',
      afternoonBreak: '12:00 PM – 03:00 PM',
      eveningDarshan: '03:00 PM – 08:00 PM',
      specialDarshan: 'Special Entry Darshan (₹100), Upper Floor Abhishekam pass (₹300), and Free Dharma Darshan.'
    },
    bestTimeToVisit: 'October to March (pleasant weather in fertile Godavari region)',
    festivalsList: [
      { name: 'Maha Shivaratri', month: 'February–March', duration: '5 Days', significance: 'Celebrates Kalyanotsavam of Bhimeswara Swamy and Manikyamba Ammavaru with celestial rathotsavam.' },
      { name: 'Sharannavaratri (Dasara)', month: 'September–October', duration: '9 Days', significance: 'Dedicated to Goddess Manikyamba in 9 divine alankarams attracting Shakti devotees.' },
      { name: 'Karthika Masam', month: 'November–December', duration: '30 Days', significance: 'Daily Laksha Deepotsavam and holy bath in the Sapta Godavari lake.' }
    ],
    guidelines: {
      dressCode: 'Traditional Indian clothing. Dhoti/Kurta for men; Saree/Salwar for women.',
      photography: 'Photography permitted in outer courtyard; prohibited in inner sanctum and upper balcony.',
      footwear: 'Footwear stands available at the outer entrance.',
      entryRules: 'Pilgrims must climb stone stairs to reach the upper viewing balcony for the lingam crown darshan.',
      accessibility: 'Ground level provides darshan of the Lingam base; upper storey accessible by stone steps.'
    },
    facilities: {
      parking: true,
      drinkingWater: true,
      restrooms: true,
      accommodation: true,
      dharamshala: 'Draksharamam Devasthanam Choultry, TTD Kalyana Mandapam, and local guest houses.',
      nearbyHotels: 'Hotels in nearby towns Ramachandrapuram (6 km), Kakinada (28 km), and Rajahmundry (48 km).',
      transport: 'Regular RTC buses connecting Kakinada, Rajahmundry, Kotipalli, and Draksharamam.'
    },
    nearbyTransport: {
      railway: 'Kakinada Town Railway Station (CCT) – 28 km; Samalkot Junction (SLO) – 45 km.',
      airport: 'Rajahmundry Domestic Airport (RJA) – 65 km; Visakhapatnam International Airport (VTZ) – 180 km.',
      bus: 'Draksharamam Bus Stand – 1 km; on the Kakinada-Kotipalli highway.',
      local: 'Auto-rickshaws, shared taxis, and RTC buses.'
    },
    coordinates: { lat: 16.7933, lng: 82.0628 },
    mapsUrl: 'https://maps.google.com/?q=16.7933,82.0628',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Draksharamam_Temple_Outer_Wall.jpg/800px-Draksharamam_Temple_Outer_Wall.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Draksharamam_Temple_Outer_Wall.jpg/800px-Draksharamam_Temple_Outer_Wall.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Draksharama_Gopuram.jpg/800px-Draksharama_Gopuram.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Sapta_Godavari_Draksharamam.jpg/800px-Sapta_Godavari_Draksharamam.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Draksharamam_Temple_Outer_Wall.jpg/800px-Draksharamam_Temple_Outer_Wall.jpg', caption: 'Massive stone outer prakaram walls of Draksharamam Temple', category: 'Architecture' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Draksharama_Gopuram.jpg/800px-Draksharama_Gopuram.jpg', caption: 'Ancient Eastern Chalukyan temple gopuram tower', category: 'Exterior' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Sapta_Godavari_Draksharamam.jpg/800px-Sapta_Godavari_Draksharamam.jpg', caption: 'The sacred Sapta Godavari theertham tank', category: 'Landscape' }
    ],
    pilgrimageCircuits: ['Shiva Temple Circuit', 'Devi Shakti Circuit'],
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Sri Dwaraka Tirumala Temple',
    altNames: ['Chinna Tirupati', 'Dwaraka Tirumala Temple', 'Sri Venkateswara Swamy Dwaraka Tirumala'],
    state: 'Andhra Pradesh',
    city: 'Dwaraka Tirumala',
    district: 'Eluru',
    location: 'Seshachala Hillock, Eluru District',
    address: 'Dwaraka Tirumala, Eluru District, Andhra Pradesh',
    pincode: '534426',
    category: 'Sacred Hill Temple (Chinna Tirupati)',
    deity: 'Lord Venkateswara Swamy (Swayambhu idol manifested up to the waist, with a full idol consecrated by Sri Ramanujacharya installed behind it)',
    associatedDeities: ['Goddess Padmavathi', 'Goddess Alivelumanga', 'Lord Garuda Swamy'],
    architecture: 'South Indian Dravidian hill architecture with tall Rajagopuram, circular vimanam, and shrines for Anjaneya and Garuda facing the sanctum.',
    history: 'Founded by Saint Dwaraka who undertook severe penance inside an anthill. Greatly developed by the Zamindars of Mylavaram and Nuzvid in the 18th and 19th centuries. Holy Vaishnavite saint Sri Ramanujacharya visited this sacred hill and installed the full-form Venkateswara idol.',
    significance: 'Known reverently as "Chinna Tirupati" (Little Tirupati). Devotees whose vows (mokku) to visit Tirumala Tirupati cannot be fulfilled due to distance, age or health come to Dwaraka Tirumala to offer their vows with equal spiritual fulfillment.',
    mythology: 'Saint Dwaraka was blessed by Lord Venkateswara who emerged from the earth up to his waist. To allow devotees to perform full pada-sevanam (worship of holy lotus feet), Ramanujacharya later consecrated the full vigraha behind the self-manifested idol.',
    rituals: {
      daily: [
        'Suprabhata Seva (06:00 AM)',
        'Snapana Thirumanjanam (07:30 AM)',
        'Nitya Kalyanotsavam (09:30 AM to 12:30 PM)',
        'Sahasranama Archana (10:00 AM)',
        'Maha Nivedana (01:00 PM)',
        'Unjal Seva (06:00 PM)',
        'Pavalimpu Seva (09:00 PM)'
      ],
      morningPooja: 'Suprabhatam at 6:00 AM, Nitya Kalyanam at 9:30 AM',
      eveningAarti: 'Unjal Seva at 6:00 PM, Pavalimpu Seva at 9:00 PM',
      prasadInfo: 'Famous Chinna Tirupati Laddu, Pulihora, and free Annadanam for thousands of pilgrims at the Devasthanam Annadana Hall.',
      specialPooja: 'Nitya Kalyanotsavam (daily celestial wedding ceremony) and tonsure (mundan) offerings.'
    },
    timings: '06:00 AM – 01:00 PM, 03:00 PM – 09:00 PM',
    darshan: {
      openingTime: '06:00 AM',
      closingTime: '09:00 PM',
      morningDarshan: '06:00 AM – 01:00 PM',
      afternoonBreak: '01:00 PM – 03:00 PM',
      eveningDarshan: '03:00 PM – 09:00 PM',
      specialDarshan: 'Special Entry Darshan (₹100), Seeghra Darshan (₹150), and Free Dharma Darshan.'
    },
    bestTimeToVisit: 'October to March (cool and pleasant)',
    festivalsList: [
      { name: 'Vaisakha Suddha Ekadasi Brahmotsavam', month: 'May (Vaisakha month)', duration: '10 Days', significance: 'Celebrates the grand annual chariot car festival and celestial marriage ceremony.' },
      { name: 'Asvina Suddha Purnima Brahmotsavam', month: 'October (Asvina month)', duration: '10 Days', significance: 'Second grand annual festival celebrated during the autumn festival season.' },
      { name: 'Vaikunta Ekadasi', month: 'December–January', duration: '1 Day', significance: 'Special darshan of Lord Venkateswara through the northern gate.' }
    ],
    guidelines: {
      dressCode: 'Traditional Indian clothing. Dhoti/Kurta for men; Saree/Salwar with Dupatta for women. Shorts and casual wear strictly prohibited.',
      photography: 'Prohibited inside sanctum sanctorum.',
      footwear: 'Footwear stands available at the foothill and hilltop.',
      entryRules: 'Tonsure (hair offering) and Thulabharam facilities operated on the model of Tirumala.',
      accessibility: 'Ghat road connects foothill to hilltop temple entrance; steps also available.'
    },
    facilities: {
      parking: true,
      drinkingWater: true,
      restrooms: true,
      accommodation: true,
      dharamshala: 'Padmavathi Sadan, Srinivasa Guest House, and TTD Choultries.',
      nearbyHotels: 'Hotels in nearby towns Eluru (42 km) and Bhimadole (16 km).',
      transport: 'Regular APSRTC buses from Vijayawada, Eluru, Rajahmundry, and Bhimadole.'
    },
    nearbyTransport: {
      railway: 'Bhimadole Railway Station (BMD) – 16 km; Eluru Railway Station (EE) – 42 km.',
      airport: 'Vijayawada International Airport, Gannavaram (VGA) – 75 km.',
      bus: 'Dwaraka Tirumala Bus Stand – 500 m.',
      local: 'Auto-rickshaws, shared taxis, and RTC buses.'
    },
    coordinates: { lat: 16.9536, lng: 81.2583 },
    mapsUrl: 'https://maps.google.com/?q=16.9536,81.2583',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Dwaraka_Tirumala_Temple.jpg/800px-Dwaraka_Tirumala_Temple.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Dwaraka_Tirumala_Temple.jpg/800px-Dwaraka_Tirumala_Temple.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Dwaraka_Tirumala_Gopuram.jpg/800px-Dwaraka_Tirumala_Gopuram.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Dwaraka_Tirumala_Hill.jpg/800px-Dwaraka_Tirumala_Hill.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Dwaraka_Tirumala_Temple.jpg/800px-Dwaraka_Tirumala_Temple.jpg', caption: 'The sacred hill temple of Chinna Tirupati Dwaraka Tirumala', category: 'Exterior' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Dwaraka_Tirumala_Gopuram.jpg/800px-Dwaraka_Tirumala_Gopuram.jpg', caption: 'Majestic Raja Gopuram at Dwaraka Tirumala', category: 'Architecture' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Dwaraka_Tirumala_Hill.jpg/800px-Dwaraka_Tirumala_Hill.jpg', caption: 'Panoramic view of the Seshachala hillock', category: 'Landscape' }
    ],
    pilgrimageCircuits: ['Tirupati Spiritual Circuit'],
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Yaganti Temple',
    altNames: ['Sri Yaganti Uma Maheswara Temple', 'Yagantiswara Swamy', 'Growing Nandi Temple Yaganti'],
    state: 'Andhra Pradesh',
    city: 'Yaganti',
    district: 'Nandyal',
    location: 'Foot of Yerramala Sandstone Cliffs, Banaganapalle Mandal',
    address: 'Yaganti, Nandyal District, Andhra Pradesh',
    pincode: '518124',
    category: 'Ancient Cave & Miracle Temple',
    deity: 'Lord Uma Maheswara Swamy (Lord Shiva and Parvati carved together from a single stone) and the Growing Nandi',
    associatedDeities: ['Goddess Parvati', 'Sage Agastya', 'Sri Potuluri Veera Brahmendra Swamy'],
    architecture: 'Spectacular Vijayanagara rock-cut cave architecture nestling under towering red sandstone cliffs. Features the Agastya Pushkarini with sweet mountain water flowing through a carved Nandi’s mouth, and three cave sanctums: Agastya Cave, Venkateswara Cave, and Veera Brahmam Cave.',
    history: 'Built in the 15th century by King Harihara Bukka Raya of the Vijayanagara Empire. The great saint and prophet Sri Potuluri Veera Brahmendra Swamy wrote portions of his prophetic text "Kalajnana" in the caves of Yaganti.',
    significance: 'World-famous for the Growing Nandi: The stone idol of Nandi has been officially certified by the Archaeological Survey of India (ASI) to be naturally expanding in size by approximately 1 inch every 20 years. Also miraculous: crows are completely absent from the entire Yaganti valley due to a mythological curse by Sage Agastya.',
    mythology: 'Sage Agastya sought to consecrate an idol of Lord Venkateswara here, but found the idol chipped. He then prayed to Lord Shiva, who appeared with Goddess Parvati as Uma Maheswara carved out of a single monolithic stone.',
    rituals: {
      daily: [
        'Pushkarini Snanam (Devotees take holy dip in the crystal cold natural spring)',
        'Suprabhata Seva (06:00 AM)',
        'Rudrabhishekam (07:00 AM)',
        'Archana & Bilvarchana (08:30 AM)',
        'Maha Nivedana (12:30 PM)',
        'Sandhya Deeparadhana (06:00 PM)',
        'Ekantha Seva (08:00 PM)'
      ],
      morningPooja: 'Suprabhatam at 6:00 AM, Rudrabhishekam at 7:00 AM',
      eveningAarti: 'Sandhya Harathi at 6:00 PM, Ekantha Seva at 8:00 PM',
      prasadInfo: 'Holy Agastya Theertham, Bilva leaves, Laddu, and free Annadanam at Devasthanam Annadana Hall.',
      specialPooja: 'Special abhishekam to the growing Nandi and cave lamps during Pradosham.'
    },
    timings: '06:00 AM – 01:00 PM, 03:00 PM – 08:00 PM',
    darshan: {
      openingTime: '06:00 AM',
      closingTime: '08:00 PM',
      morningDarshan: '06:00 AM – 01:00 PM',
      afternoonBreak: '01:00 PM – 03:00 PM',
      eveningDarshan: '03:00 PM – 08:00 PM',
      specialDarshan: 'Special Entry Darshan (₹50) and Free Dharma Darshan.'
    },
    bestTimeToVisit: 'October to March (pleasant winter climate in Rayalaseema)',
    festivalsList: [
      { name: 'Maha Shivaratri', month: 'February–March', duration: '3 Days', significance: 'Tens of thousands congregate for holy vigil, night dips in Agastya Pushkarini, and chariot car procession.' },
      { name: 'Karthika Purnima', month: 'November', duration: '1 Day', significance: 'Special lighting of thousands of earthen lamps around the sacred sandstone cliffs and caves.' }
    ],
    guidelines: {
      dressCode: 'Traditional Indian attire. Dhoti/Kurta for men; Saree/Salwar for women.',
      photography: 'Allowed in outer courtyard and cave exteriors; strictly prohibited in inner sanctum.',
      footwear: 'Footwear stands available at the main arch entrance.',
      entryRules: 'Steep stone steps lead to Agastya Cave and Veera Brahmam Cave; visitors must exercise caution.',
      accessibility: 'Main temple and pushkarini are ground-level; cave exploration requires climbing stairs.'
    },
    facilities: {
      parking: true,
      drinkingWater: true,
      restrooms: true,
      accommodation: true,
      dharamshala: 'Yaganti Devasthanam Choultry and AP Tourism Haritha Hotel.',
      nearbyHotels: 'Hotels in Banaganapalle (15 km) and Nandyal (55 km).',
      transport: 'Regular RTC buses from Banaganapalle and Kurnool.'
    },
    nearbyTransport: {
      railway: 'Banaganapalle Railway Station (BGNP) – 17 km; Nandyal Junction (NDL) – 55 km.',
      airport: 'Kurnool Airport (KJB) – 75 km; Hyderabad International Airport (HYD) – 295 km.',
      bus: 'Banaganapalle APSRTC Bus Stand – 15 km; Yaganti temple bus stop – 200 m.',
      local: 'Auto-rickshaws, shared jeeps, and RTC buses.'
    },
    coordinates: { lat: 15.3522, lng: 78.1408 },
    mapsUrl: 'https://maps.google.com/?q=15.3522,78.1408',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Yaganti_Temple_Complex.jpg/800px-Yaganti_Temple_Complex.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Yaganti_Temple_Complex.jpg/800px-Yaganti_Temple_Complex.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Yaganti_Nandi.jpg/800px-Yaganti_Nandi.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Yaganti_Pushkarini.jpg/800px-Yaganti_Pushkarini.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Yaganti_Caves.jpg/800px-Yaganti_Caves.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Yaganti_Temple_Complex.jpg/800px-Yaganti_Temple_Complex.jpg', caption: 'Yaganti Temple nestling under towering red sandstone cliffs', category: 'Landscape' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Yaganti_Nandi.jpg/800px-Yaganti_Nandi.jpg', caption: 'The world-famous Growing Nandi stone bull sculpture', category: 'Architecture' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Yaganti_Pushkarini.jpg/800px-Yaganti_Pushkarini.jpg', caption: 'Agastya Pushkarini fed by natural subterranean springs', category: 'Exterior' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Yaganti_Caves.jpg/800px-Yaganti_Caves.jpg', caption: 'Ancient meditation caves of Sage Agastya in the cliff walls', category: 'Landscape' }
    ],
    pilgrimageCircuits: ['Shiva Temple Circuit'],
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Lepakshi Veerabhadra Temple',
    altNames: ['Lepakshi Temple', 'Veerabhadra Swamy Temple Lepakshi', 'Hanging Pillar Temple'],
    state: 'Andhra Pradesh',
    city: 'Lepakshi',
    district: 'Sri Sathya Sai',
    location: 'Kurma Saila (Tortoise-shaped hillock), Lepakshi Mandal',
    address: 'Lepakshi, Sri Sathya Sai District, Andhra Pradesh',
    pincode: '515331',
    category: 'UNESCO Tentative & Vijayanagara Heritage Temple',
    deity: 'Lord Veerabhadra (Fierce manifestation of Lord Shiva created from his matted locks)',
    associatedDeities: ['Goddess Bhadrakali', 'Colossal Monolithic Nandi', 'Sapta Phani Nagalinga'],
    architecture: 'High watermark of Vijayanagara architecture and art. World-renowned for the legendary "Hanging Pillar" (one of the 70 stone pillars that does not touch the ground), the magnificent 27-foot-long monolithic Nandi bull, the 7-hooded monolithic Nagalinga coiled over a black granite lingam, and the grand ceiling frescoes depicting the Vijayanagara imperial courts and Hindu epics.',
    history: 'Built in 1530 CE by the brothers Virupanna and Veeranna, governors of Penukonda under Vijayanagara Emperor Achyuta Deva Raya. The name originates from the Ramayana where Lord Rama found the fallen, wounded bird-king Jatayu and compassionately uttered "Le, Pakshi" ("Rise, Bird" in Telugu).',
    significance: 'An Archaeological Survey of India (ASI) protected national monument on the tentative list of UNESCO World Heritage Sites, functioning as both an active sanctum of worship and an architectural marvel of India.',
    mythology: 'According to the Ramayana, Jatayu fought demon king Ravana in the skies above Lepakshi to rescue Goddess Sita. A gigantic footprint carved into the rock near the temple courtyard is venerated by devotees as Sita’s footprint (Sita Paadam).',
    rituals: {
      daily: [
        'Prathakala Pooja & Archana (06:30 AM)',
        'Rudrabhishekam (07:30 AM)',
        'Maha Nivedana (12:30 PM)',
        'Pradosha Kala Deeparadhana (05:30 PM)',
        'Temple closure at dusk (06:00 PM as per ASI guidelines)'
      ],
      morningPooja: 'Prathakala Pooja at 6:30 AM, Rudrabhishekam at 7:30 AM',
      eveningAarti: 'Sandhya Harathi at 5:30 PM',
      prasadInfo: 'Holy Theertham, Vibhuti, Bilva leaves, and temple Prasadam.',
      specialPooja: 'Special abhishekams and Laksha Deepotsavam on Maha Shivaratri.'
    },
    timings: '06:00 AM – 06:00 PM (ASI Monument timings)',
    darshan: {
      openingTime: '06:00 AM',
      closingTime: '06:00 PM',
      morningDarshan: '06:00 AM – 01:00 PM',
      afternoonBreak: 'Open continuously throughout day',
      eveningDarshan: '01:00 PM – 06:00 PM',
      specialDarshan: 'Free entry for all pilgrims and tourists.'
    },
    bestTimeToVisit: 'September to February (comfortable walking temperatures for exploring stone courtyards)',
    festivalsList: [
      { name: 'Maha Shivaratri Utsavam', month: 'February–March', duration: '3 Days', significance: 'Annual temple car festival (Rathotsavam) drawing thousands of devotees from Andhra and Karnataka.' },
      { name: 'Durgashtami', month: 'October', duration: '1 Day', significance: 'Special pooja to Goddess Bhadrakali inside the sanctum.' }
    ],
    guidelines: {
      dressCode: 'Modest clothing recommended. Saree, Salwar for women; Dhoti, Kurta, Pyjama, or pants for men.',
      photography: 'Photography permitted in outer courtyard, Nandi bull, and Nagalinga; tripods and commercial filming require ASI permit.',
      footwear: 'Footwear stands available at the main monument gate.',
      entryRules: 'ASI certified local guides available for architectural explanations of the Hanging Pillar and frescoes.',
      accessibility: 'Smooth stone pathways throughout the pillared halls.'
    },
    facilities: {
      parking: true,
      drinkingWater: true,
      restrooms: true,
      accommodation: true,
      dharamshala: 'AP Tourism Haritha Hotel Lepakshi (adjacent to the monolithic Nandi bull).',
      nearbyHotels: 'Hotels in Hindupur town (14 km).',
      transport: 'Buses and taxis run frequently between Hindupur, Anantapur, and Bengaluru.'
    },
    nearbyTransport: {
      railway: 'Hindupur Railway Station (HUP) – 14 km (well-connected on Bengaluru-Hyderabad mainline).',
      airport: 'Kempegowda International Airport Bengaluru (BLR) – 98 km.',
      bus: 'Lepakshi Bus Stand – 500 m; direct buses to Hindupur and Bengaluru.',
      local: 'Auto-rickshaws, taxis, and state RTC buses.'
    },
    coordinates: { lat: 13.8042, lng: 77.6047 },
    mapsUrl: 'https://maps.google.com/?q=13.8042,77.6047',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Lepakshi_Temple_Courtyard.jpg/800px-Lepakshi_Temple_Courtyard.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Lepakshi_Temple_Courtyard.jpg/800px-Lepakshi_Temple_Courtyard.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lepakshi_Nandi_Bull.jpg/800px-Lepakshi_Nandi_Bull.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Lepakshi_Nagalinga.jpg/800px-Lepakshi_Nagalinga.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Lepakshi_Pillared_Hall.jpg/800px-Lepakshi_Pillared_Hall.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Lepakshi_Temple_Courtyard.jpg/800px-Lepakshi_Temple_Courtyard.jpg', caption: 'The magnificent Vijayanagara courtyard of Lepakshi Veerabhadra Temple', category: 'Architecture' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lepakshi_Nandi_Bull.jpg/800px-Lepakshi_Nandi_Bull.jpg', caption: 'The world-famous colossal monolithic Nandi bull', category: 'Architecture' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Lepakshi_Nagalinga.jpg/800px-Lepakshi_Nagalinga.jpg', caption: 'Seven-hooded monolithic Nagalinga protecting the Shiva Lingam', category: 'Architecture' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Lepakshi_Pillared_Hall.jpg/800px-Lepakshi_Pillared_Hall.jpg', caption: 'The world-renowned Hanging Pillar and sculpted mandapam', category: 'Interior' }
    ],
    pilgrimageCircuits: ['Shiva Temple Circuit'],
    isFeatured: true,
    isActive: true
  }
];

async function seedAndhraTemples() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/divyabharat?directConnection=true';
  const conn = await mongoose.connect(uri, { family: 4, serverSelectionTimeoutMS: 5000 });
  console.log('✅ Connected to MongoDB:', conn.connection.name);

  // Find or verify Andhra Pradesh state document
  let apState = await State.findOne({ name: { $regex: '^Andhra Pradesh$', $options: 'i' } });
  if (!apState) {
    apState = await State.create({
      name: 'Andhra Pradesh',
      capital: 'Amaravati',
      region: 'South',
      description: 'Known for its rich history, classical dance forms like Kuchipudi, ancient Buddhist heritage sites, and world-renowned sacred temples like Tirupati Balaji and Srisailam.',
      temples: 'Sri Venkateswara Swamy, Sri Mallikarjuna Swamy, Sri Kanaka Durga, Srikalahasteeswara, Simhachalam',
      icon: '🛕',
      isUT: false
    });
    console.log('Created AP State doc in DB');
  }

  // Remove existing temples for Andhra Pradesh so the count is EXACTLY 15
  const deleteResult = await Temple.deleteMany({ state: { $regex: '^Andhra Pradesh$', $options: 'i' } });
  console.log(`🧹 Cleaned ${deleteResult.deletedCount} old Andhra Pradesh temple record(s)`);

  // Insert the 15 approved Andhra Pradesh temples
  for (let i = 0; i < ANDHRA_PRADESH_15_TEMPLES.length; i++) {
    const data = ANDHRA_PRADESH_15_TEMPLES[i];
    data.stateId = apState._id;
    if (!data.description) {
      data.description = data.significance || data.history || `${data.name} is a renowned Hindu pilgrimage temple situated in ${data.city || data.district}, Andhra Pradesh.`;
    }
    const doc = await Temple.create(data);
    console.log(`[${i + 1}/15] Saved: ${doc.name} (District: ${doc.district})`);
  }

  const finalApCount = await Temple.countDocuments({ state: { $regex: '^Andhra Pradesh$', $options: 'i' } });
  const totalCount = await Temple.countDocuments();
  console.log(`\n🎉 Verification Success:`);
  console.log(`👉 Andhra Pradesh Temple Count: ${finalApCount} (Expected: EXACTLY 15)`);
  console.log(`👉 Total Temples in Database: ${totalCount}`);

  await mongoose.disconnect();
  console.log('✅ Disconnected from MongoDB');
}

if (require.main === module) {
  seedAndhraTemples().catch(err => {
    console.error('❌ Seeder Error:', err);
    process.exit(1);
  });
}

module.exports = { ANDHRA_PRADESH_15_TEMPLES, seedAndhraTemples };
