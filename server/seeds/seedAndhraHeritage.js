// server/seeds/seedAndhraHeritage.js — Permanent MongoDB Seeder for Exactly 20 Andhra Pradesh Heritage Destinations
const mongoose = require('mongoose');
const Heritage = require('../models/Heritage');
const State = require('../models/State');

const ANDHRA_PRADESH_20_HERITAGE = [
  // 1. Gandikota
  {
    name: 'Gandikota',
    altName: 'The Grand Canyon of India',
    altNames: ['Gandikota Fort', 'Gorge of Pennar', 'Grand Canyon of India'],
    category: 'Forts & Palaces',
    state: 'Andhra Pradesh',
    stateCode: 'AP',
    district: 'YSR Kadapa',
    city: 'Gandikota',
    location: 'Pennar River Gorge, Jammalamadugu Mandal',
    address: 'Gandikota Fort Complex, Jammalamadugu, YSR Kadapa District, Andhra Pradesh - 516434',
    description: 'Perched breathtakingly atop a 300-foot-deep red sandstone canyon carved by the Pennar River over millions of years, Gandikota is a 12th-century medieval citadel celebrated worldwide as the "Grand Canyon of India".',
    historicalBackground: 'Founded in 1123 CE by Kapa Raja of the Western Chalukya feudatories, Gandikota evolved into an impregnable military stronghold under the Kakatiyas, the Pemmasani Nayaks (who ruled for nearly 300 years), the Vijayanagara Empire, and later Mir Jumla of Golconda.',
    establishmentPeriod: '1123 CE (12th Century CE)',
    historicalPeriod: 'Medieval India (12th – 17th Century CE)',
    timeline: [
      { period: '1123 CE', event: 'Kapa Raja constructs sand fort after discovering natural defensive gorge.' },
      { period: '1375–1650 CE', event: 'Pemmasani Nayaks rule and build the monumental red sandstone battlements, granary, and palaces.' },
      { period: '1650 CE', event: 'Mir Jumla of Golconda captures fort after a protracted siege.' },
      { period: '1799 CE', event: 'British East India Company annexes fort after the fall of Tipu Sultan.' }
    ],
    dynasty: 'Kalyani Chalukyas, Pemmasani Nayaks & Vijayanagara Empire',
    historicalRulers: 'Kapa Raja, Pemmasani Ramalinga Nayudu, Timma Nayudu, Mir Jumla',
    culturalImportance: 'Immortalized in Telugu ballads and historical chronicles (Rayavachakamu) as an unbreachable bastion of Rayalaseema valor and medieval architectural audacity.',
    archaeologicalImportance: 'Protected monument under Archaeological Survey of India featuring 10-meter-high ramparts, massive magazine granary (Dhanyagara), subterranean water cisterns, and a 40-pillar mandapa.',
    architecture: 'Indo-Islamic and Vijayanagara Military Fort Architecture with cyclopean red sandstone masonry, sculpted bastions, and royal domed gateways.',
    architecturalStyle: 'Medieval Dravidian Military & Indo-Islamic Architecture',
    unescoStatus: 'Tentative List Consideration',
    unescoListed: false,
    deityDetails: {
      hasReligiousSignificance: true,
      mainDeity: 'Lord Madhava Swamy & Lord Raghunatha Swamy',
      associatedDeities: ['Lord Vishnu', 'Goddess Lakshmi'],
      religiousSignificance: 'Houses the historic Madhavaraya and Raghunatha temples with ornate Vijayanagara gopurams alongside the historic Jamia Masjid.',
      mythology: 'Legend records that Lord Rama stopped at the gorge during his search for Sita, and the sacred Pennar was sanctified by rishis.',
      worshipPractices: 'Historical monument complex with active prayer at nearby local shrines.'
    },
    rituals: {
      daily: ['Monument opens at sunrise and closes at sunset for visitors.'],
      poojaSchedule: 'Occasional traditional prayers during festivals.',
      specialCeremonies: 'Gandikota Heritage Festival cultural programs organized by AP Tourism.',
      festivals: 'Gandikota Utsav, Maha Shivaratri, Sankranti'
    },
    visitorInformation: {
      bestTimeToVisit: 'October to March (pleasant breeze across the canyon)',
      openingTime: '06:00 AM',
      closingTime: '06:00 PM',
      timings: '06:00 AM – 06:00 PM (Daily)',
      entryFees: 'Free Entry (Nominal parking charges for vehicles)',
      ticketBooking: 'No ticket required; on-spot entry',
      guidelines: 'Stay on demarcated cliff paths; do not climb unsecured perimeter gorge edges; carry water and sun protection',
      photography: 'Permitted throughout fort and canyon viewpoints; drone flying requires district administration permit',
      dressCode: 'Comfortable sports/trekking attire and durable hiking footwear',
      restrictions: 'Camping directly on the canyon brink is restricted after dusk',
      accessibility: 'Fort entrance is accessible; inner canyon viewpoint involves rocky walking paths',
      visitingDuration: '3 to 5 hours'
    },
    coordinates: { lat: 14.8142, lng: 78.2861 },
    latitude: 14.8142,
    longitude: 78.2861,
    googleMapsUrl: 'https://maps.google.com/?q=14.8142,78.2861',
    mapsUrl: 'https://maps.google.com/?q=14.8142,78.2861',
    nearbyFacilities: {
      hotels: 'Haritha Resort Gandikota (AP Tourism), Royal County Jammalamadugu (15 km), Proddatur hotels (38 km)',
      guestHouses: 'AP Tourism Cottages and private glamping luxury tent stays overlooking the gorge',
      restaurants: 'Haritha Valley View Restaurant, local Rayalaseema food stalls serving hot ragi mudda and naatu kodi',
      parking: true,
      drinkingWater: true,
      restrooms: true,
      touristCentres: 'AP Tourism Information Counter at Haritha Complex Gandikota',
      nearbyAttractions: ['Belum Caves (60 km)', 'Mylavaram Dam (18 km)', 'Tadipatri Temples (85 km)', 'Rayachoty (95 km)']
    },
    transportInformation: {
      nearestRailway: 'Jammalamadugu Railway Station (JMDG) – 18 km; Muddanur (MOO) – 40 km',
      nearestAirport: 'Kadapa Airport (CDP) – 85 km; Bengaluru International Airport (BLR) – 260 km',
      nearestBus: 'Jammalamadugu Bus Station – 16 km (regular APSRTC buses to Gandikota)',
      roadConnectivity: 'Well connected via NH-40, State Highway 28 and Jammalamadugu–Tadipatri road',
      localTransport: 'Auto-rickshaws, private tourist jeeps, and state RTC buses from Jammalamadugu'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Gandikota_Gorge_Pennar_River.jpg/800px-Gandikota_Gorge_Pennar_River.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Gandikota_Gorge_Pennar_River.jpg/800px-Gandikota_Gorge_Pennar_River.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Madhavaraya_Temple_Gandikota.jpg/800px-Madhavaraya_Temple_Gandikota.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Gandikota_Jamia_Masjid_and_Granary.jpg/800px-Gandikota_Jamia_Masjid_and_Granary.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Gandikota_Fort_Battlements.jpg/800px-Gandikota_Fort_Battlements.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Gandikota_Gorge_Pennar_River.jpg/800px-Gandikota_Gorge_Pennar_River.jpg', caption: 'The awe-inspiring Pennar River canyon at Gandikota gorge', category: 'Canyon View' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Madhavaraya_Temple_Gandikota.jpg/800px-Madhavaraya_Temple_Gandikota.jpg', caption: 'The grand soaring gopuram of Madhavaraya Swamy Temple', category: 'Architecture' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Gandikota_Jamia_Masjid_and_Granary.jpg/800px-Gandikota_Jamia_Masjid_and_Granary.jpg', caption: 'The historic Jamia Masjid and medieval granary vaults', category: 'Monuments' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Gandikota_Fort_Battlements.jpg/800px-Gandikota_Fort_Battlements.jpg', caption: 'Massive red sandstone perimeter defensive ramparts', category: 'Fortifications' }
    ],
    festivals: [
      { name: 'Gandikota Heritage Utsav', month: 'January / February', description: 'Annual state cultural carnival featuring traditional music, classical dance, paragliding and gorge laser shows.', isAnnual: true }
    ],
    featured: true,
    isPopular: true,
    popularity: 98,
    averageRating: 4.9,
    reviewCount: 42
  },

  // 2. Lepakshi
  {
    name: 'Lepakshi',
    altName: 'Veerabhadra Temple & Monolithic Nandi Heritage Complex',
    altNames: ['Lepakshi Heritage Site', 'Veerabhadra Temple Complex', 'Lepakshi Archaeological Complex'],
    category: 'Archaeological Sites',
    state: 'Andhra Pradesh',
    stateCode: 'AP',
    district: 'Sri Sathya Sai',
    city: 'Lepakshi',
    location: 'Kurma Saila Hill, Lepakshi Mandal',
    address: 'Lepakshi Archaeological Complex, Lepakshi, Sri Sathya Sai District, Andhra Pradesh - 515331',
    description: 'A 16th-century Vijayanagara architectural masterpiece on Kurma Saila (tortoise-shaped hill), renowned worldwide for its gravity-defying Hanging Pillar, the world’s largest monolithic granite Nandi bull, and exquisite ceiling frescoes.',
    historicalBackground: 'Constructed in 1538 CE during the reign of Vijayanagara Emperor Achyuta Deva Raya by two merchant brothers, Virupanna and Veeranna, who served as governors of Penukonda. The site retains deep Ramayana epic roots.',
    establishmentPeriod: '1538 CE (16th Century CE)',
    historicalPeriod: 'Vijayanagara Empire (16th Century CE)',
    timeline: [
      { period: '1530–1538 CE', event: 'Virupanna Nayaka directs royal treasury towards sculpting Kurma Saila complex.' },
      { period: '1540 CE', event: 'Completion of Natya Mandapam with 70 carved monolithic pillars and ceiling murals.' },
      { period: '1910 CE', event: 'Survey of India documents the architectural marvel of the Hanging Pillar.' },
      { period: '2022 CE', event: 'Nominated to India’s tentative list of UNESCO World Heritage Sites.' }
    ],
    dynasty: 'Vijayanagara Empire (Tuluva Dynasty)',
    historicalRulers: 'Achyuta Deva Raya, Virupanna Nayaka, Veeranna Nayaka',
    culturalImportance: 'According to the Ramayana, the wounded demigod bird Jatayu fell here after battling Ravana; Lord Rama blessed him uttering "Le, Pakshi" (Rise, O Bird in Telugu), giving the hallowed town its name.',
    archaeologicalImportance: 'Centrally protected monument under ASI containing the world-famous Hanging Pillar, the largest monolithic granite Nandi (4.5m high, 8.2m long), and a colossal 7-hooded Nagalinga carved from a single boulder.',
    architecture: 'High Vijayanagara Dravidian Temple Architecture with sculpted musicians, dancers, celestial beings, and hanging ceiling beams.',
    architecturalStyle: 'Vijayanagara Dravidian Style',
    unescoStatus: 'UNESCO World Heritage Tentative List (2022)',
    unescoListed: false,
    deityDetails: {
      hasReligiousSignificance: true,
      mainDeity: 'Lord Veerabhadra Swamy (Fierce manifestation of Shiva)',
      associatedDeities: ['Bhadrakali', 'Papanasheshwara', 'Raghunatha', 'Durga'],
      religiousSignificance: 'Sacred Mukti Kshetra where Jatayu attained Moksha and Shiva manifests in his fierce, cosmic protective form.',
      mythology: 'Site of the footprint of Goddess Sita (Sita Paadam) with perennial natural holy water seepage.',
      worshipPractices: 'Daily archana, aarti, and abhishekam performed according to Shaiva Agamas.'
    },
    rituals: {
      daily: ['Suprabhatam (06:00 AM)', 'Maha Mangala Harathi (08:30 AM & 12:30 PM)', 'Sandhya Aarti (06:30 PM)'],
      poojaSchedule: 'Daily darshan from 6:00 AM to 6:30 PM.',
      specialCeremonies: 'Rudra Abhishekam on Pradosham and Mondays; Car Festival during Brahmotsavam.',
      festivals: 'Maha Shivaratri, Lepakshi Utsavam, Vijayanagara Heritage Fest'
    },
    visitorInformation: {
      bestTimeToVisit: 'September to March',
      openingTime: '06:00 AM',
      closingTime: '06:30 PM',
      timings: '06:00 AM – 06:30 PM (Daily)',
      entryFees: 'Free Entry to Temple and Monolithic Nandi',
      ticketBooking: 'No ticket required',
      guidelines: 'Remove footwear before entering inner temple courtyards; maintain decorum around sanctum; touching frescoes prohibited',
      photography: 'Photography permitted in mandapam and outer courtyards; restricted inside sanctum',
      dressCode: 'Modest traditional or respectful attire',
      restrictions: 'Do not scratch pillars or attempt to force objects under the hanging pillar',
      accessibility: 'Ramps and level stone pathways available across main courtyards',
      visitingDuration: '2 to 3 hours'
    },
    coordinates: { lat: 13.8042, lng: 77.6047 },
    latitude: 13.8042,
    longitude: 77.6047,
    googleMapsUrl: 'https://maps.google.com/?q=13.8042,77.6047',
    mapsUrl: 'https://maps.google.com/?q=13.8042,77.6047',
    nearbyFacilities: {
      hotels: 'Haritha Resort Lepakshi (AP Tourism), Sai Towers Hindupur (14 km), Prasanthi Nilayam hotels (65 km)',
      guestHouses: 'AP Tourism guest rooms opposite temple complex',
      restaurants: 'Haritha Restaurant Lepakshi, local South Indian canteens serving piping hot idlis and Andhra thalis',
      parking: true,
      drinkingWater: true,
      restrooms: true,
      touristCentres: 'ASI Heritage Center at temple entrance',
      nearbyAttractions: ['Penukonda Fort (52 km)', 'Puttaparthi (65 km)', 'Hemavathi (68 km)', 'Dharmavaram Silk Hub (90 km)']
    },
    transportInformation: {
      nearestRailway: 'Hindupur Railway Station (HUP) – 14 km (Bengaluru–Hyderabad mainline)',
      nearestAirport: 'Kempegowda International Airport Bengaluru (BLR) – 98 km',
      nearestBus: 'Lepakshi Bus Stand – 500 m; frequent buses from Hindupur and Bengaluru',
      roadConnectivity: 'Directly off NH-44 (Bengaluru–Hyderabad Highway) via Kodikonda Checkpost',
      localTransport: 'Auto-rickshaws, shared taxis, and local APSRTC shuttle buses from Hindupur'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Lepakshi_Temple_Courtyard.jpg/800px-Lepakshi_Temple_Courtyard.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Lepakshi_Temple_Courtyard.jpg/800px-Lepakshi_Temple_Courtyard.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lepakshi_Nandi_Bull.jpg/800px-Lepakshi_Nandi_Bull.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Lepakshi_Nagalinga.jpg/800px-Lepakshi_Nagalinga.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Lepakshi_Pillared_Hall.jpg/800px-Lepakshi_Pillared_Hall.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Lepakshi_Temple_Courtyard.jpg/800px-Lepakshi_Temple_Courtyard.jpg', caption: 'The sculpted mandapam and courtyard of Lepakshi', category: 'Architecture' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lepakshi_Nandi_Bull.jpg/800px-Lepakshi_Nandi_Bull.jpg', caption: 'Colossal monolithic Nandi bull facing the Veerabhadra temple', category: 'Monoliths' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Lepakshi_Nagalinga.jpg/800px-Lepakshi_Nagalinga.jpg', caption: 'Seven-hooded Nagalinga sculpted from a single granite boulder', category: 'Sculptures' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Lepakshi_Pillared_Hall.jpg/800px-Lepakshi_Pillared_Hall.jpg', caption: 'Intricately sculpted dance hall (Natya Mandapam) pillars', category: 'Interior' }
    ],
    festivals: [
      { name: 'Maha Shivaratri Brahmotsavam', month: 'February / March', description: 'Ten-day annual temple car festival with sacred Kalyanotsavam and chariot procession.', isAnnual: true }
    ],
    featured: true,
    isPopular: true,
    popularity: 97,
    averageRating: 4.9,
    reviewCount: 38
  },

  // 3. Amaravati
  {
    name: 'Amaravati',
    altName: 'Ancient Dhanyakataka & Buddhist Mahachaitya Heritage',
    altNames: ['Amaravati Mahachaitya', 'Dhanyakataka', 'Amaravati Buddhist Stupa', 'Dhyana Buddha'],
    category: 'Buddhist Heritage',
    state: 'Andhra Pradesh',
    stateCode: 'AP',
    district: 'Palnadu',
    city: 'Amaravati',
    location: 'Southern bank of Krishna River, Palnadu District',
    address: 'Amaravati Archaeological Complex, Amaravati, Palnadu District, Andhra Pradesh - 522020',
    description: 'The ancient cradle of Andhra civilization and royal capital of the Satavahana Empire (3rd century BCE to 3rd century CE), renowned across Asia for the Great Buddhist Mahachaitya Stupa and the towering 125-foot Dhyana Buddha monument.',
    historicalBackground: 'Flourished for over a thousand years as Dhanyakataka, the premier center of Buddhist art, learning, and trade in South India. Master stonecarvers created the celebrated "Amaravati School of Art" in distinctive white limestone (Palnad marble).',
    establishmentPeriod: 'c. 3rd Century BCE (Ashokan & Satavahana Era)',
    historicalPeriod: 'Ancient India (3rd Century BCE – 12th Century CE)',
    timeline: [
      { period: 'c. 250 BCE', event: 'Emperor Ashoka sends Buddhist missionaries to Andhra; foundational Stupa built.' },
      { period: '2nd Century BCE – 2nd Century CE', event: 'Satavahanas expand the Mahachaitya into a 49-meter-diameter marvel with carved limestone railings.' },
      { period: '1797 CE', event: 'Colin Mackenzie uncovers the buried Buddhist sculptural remnants.' },
      { period: '2015 CE', event: 'Inauguration of the 125-foot colossal Dhyana Buddha bronze statue on Krishna River.' }
    ],
    dynasty: 'Mauryan Empire, Satavahana Dynasty, Ikshvakus, Kota Kings',
    historicalRulers: 'Emperor Ashoka, Gautamiputra Satakarni, Vashishtiputra Pulumavi, Raja Vasireddy Venkatadri Nayudu',
    culturalImportance: 'Cradle of Mahayana and Vajrayana Buddhism where Acharya Nagarjuna taught. Revered by global Buddhist pilgrims as the sanctuary of the sacred relics of the Buddha.',
    archaeologicalImportance: 'ASI protected site featuring the Mahachaitya Stupa ruins, the Amaravati Archaeological Museum containing limestone Jataka story relief panels, and the ancient Amaralingeswara Pancharama shrine.',
    architecture: 'Ancient Buddhist Stupa Architecture and Amaravati School of Art featuring graceful human figures, medallion rosettes, and stupa drum slabs.',
    architecturalStyle: 'Amaravati Buddhist School & Dravidian Architecture',
    unescoStatus: 'Archaeological Protection (ASI)',
    unescoListed: false,
    deityDetails: {
      hasReligiousSignificance: true,
      mainDeity: 'Gautama Buddha & Lord Amaralingeswara Swamy (Pancharama Kshetra)',
      associatedDeities: ['Bala Chamundika Devi', 'Bodhisattva Avalokiteshvara'],
      religiousSignificance: 'Dual holy sanctuary: supreme Buddhist teertha and one of the 5 sacred Pancharama Shiva Kshetras on the Krishna River.',
      mythology: 'Indra performed penance here to cleanse the sin of slaying demon Vritrasura, establishing the Amaralingam.',
      worshipPractices: 'Buddhist meditation at Dhyana Buddha; Shaivite Vedic rituals at Amaralingeswara Temple.'
    },
    rituals: {
      daily: ['Buddha Dhyana Sessions (07:00 AM – 06:00 PM)', 'Amaralingeswara Abhishekam (06:00 AM & 05:30 PM)'],
      poojaSchedule: 'Daily museum timings: 09:00 AM to 05:00 PM (Closed on Fridays).',
      specialCeremonies: 'Kalachakra initiations and global Buddhist peace conferences.',
      festivals: 'Buddha Purnima, Maha Shivaratri, Krishna Pushkaralu'
    },
    visitorInformation: {
      bestTimeToVisit: 'October to March (pleasant riverside weather)',
      openingTime: '09:00 AM',
      closingTime: '05:30 PM',
      timings: '09:00 AM – 05:30 PM (Museum closed on Fridays)',
      entryFees: 'ASI Museum: ₹25 for Indian Citizens, ₹300 for Foreign Tourists; Stupa Ground: Free',
      ticketBooking: 'Available on-spot at ASI Museum ticket counter or online via asi.nic.in',
      guidelines: 'Maintain silence inside meditation zones; do not touch ancient limestone carvings; shoes prohibited near sanctums',
      photography: 'Outer complex photography permitted; museum interior photography subject to ASI tickets',
      dressCode: 'Comfortable modest clothing',
      restrictions: 'No shoes on stupa circumambulation pedestal',
      accessibility: 'Wheelchair access available at Dhyana Buddha park and ASI museum ramps',
      visitingDuration: '3 to 4 hours'
    },
    coordinates: { lat: 16.5742, lng: 80.3578 },
    latitude: 16.5742,
    longitude: 80.3578,
    googleMapsUrl: 'https://maps.google.com/?q=16.5742,80.3578',
    mapsUrl: 'https://maps.google.com/?q=16.5742,80.3578',
    nearbyFacilities: {
      hotels: 'Haritha Amaravati (AP Tourism), Guntur City Hotels (32 km), Vijayawada Luxury Hotels (35 km)',
      guestHouses: 'AP Tourism riverside cottages, Buddhist Pilgrim Dhyana Rest Houses',
      restaurants: 'Haritha Restaurant Amaravati, Krishna riverfront eateries serving Andhra meals',
      parking: true,
      drinkingWater: true,
      restrooms: true,
      touristCentres: 'AP Tourism Information Kiosk at Dhyana Buddha Complex',
      nearbyAttractions: ['Undavalli Caves (30 km)', 'Kondaveedu Fort (48 km)', 'Mangalagiri Temple (38 km)', 'Prakasam Barrage (35 km)']
    },
    transportInformation: {
      nearestRailway: 'Guntur Junction (GNT) – 32 km; Vijayawada Junction (BZA) – 35 km',
      nearestAirport: 'Vijayawada International Airport (VGA) – 55 km',
      nearestBus: 'Amaravati Bus Station – 1 km; direct buses from Vijayawada and Guntur every 15 minutes',
      roadConnectivity: 'Four-lane Amaravati Seed Access Road connecting Vijayawada and Guntur',
      localTransport: 'APSRTC express buses, auto-rickshaws, and app-based tourist taxis'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Dhyana_Buddha_Statue_Amaravathi.jpg/800px-Dhyana_Buddha_Statue_Amaravathi.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Dhyana_Buddha_Statue_Amaravathi.jpg/800px-Dhyana_Buddha_Statue_Amaravathi.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Amaravati_Buddhist_Stupa_Ruins.jpg/800px-Amaravati_Buddhist_Stupa_Ruins.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Amaravati_Museum_Sculpture_Rail.jpg/800px-Amaravati_Museum_Sculpture_Rail.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Dhyana_Buddha_Statue_Amaravathi.jpg/800px-Dhyana_Buddha_Statue_Amaravathi.jpg', caption: 'The colossal 125-foot Dhyana Buddha statue on the Krishna River', category: 'Monuments' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Amaravati_Buddhist_Stupa_Ruins.jpg/800px-Amaravati_Buddhist_Stupa_Ruins.jpg', caption: 'Ancient stone foundation and pradakshinapatha of the Mahachaitya', category: 'Archaeology' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Amaravati_Museum_Sculpture_Rail.jpg/800px-Amaravati_Museum_Sculpture_Rail.jpg', caption: 'Intricate white limestone Jataka relief panel in the ASI Museum', category: 'Museum Relics' }
    ],
    festivals: [
      { name: 'Buddha Jayanti Celebrations', month: 'May (Vaisakha Purnima)', description: 'Grand worldwide gathering of monks, chanting, peace lamp processions, and dharma lectures.', isAnnual: true }
    ],
    featured: true,
    isPopular: true,
    popularity: 95,
    averageRating: 4.8,
    reviewCount: 34
  },

  // 4. Kurnool
  {
    name: 'Kurnool',
    altName: 'Historic Gateway of Rayalaseema & First Capital of Andhra',
    altNames: ['Kandanavolu', 'Gateway of Rayalaseema', 'Kurnool Historic City'],
    category: 'Historical Towns',
    state: 'Andhra Pradesh',
    stateCode: 'AP',
    district: 'Kurnool',
    city: 'Kurnool',
    location: 'Confluence of Tungabhadra and Hundri Rivers',
    address: 'Kurnool Historic District, Kurnool, Andhra Pradesh - 518001',
    description: 'The storied historical gateway of Rayalaseema and the first capital of Andhra State (1953–1956), celebrated for its centuries of Kakatiya, Vijayanagara, and Nawab history, the iconic Konda Reddy Buruju, and the royal Tomb of Abdul Wahab.',
    historicalBackground: 'Mentioned as Kandanavolu in 11th-century Chola inscriptions, Kurnool served as a major crossing point over the Tungabhadra. It flourished under the Vijayanagara Empire and later became the autonomous principality of the Nawabs of Kurnool.',
    establishmentPeriod: 'c. 11th Century CE (Fortified in 16th Century CE)',
    historicalPeriod: 'Medieval & Modern Era (11th – 20th Century CE)',
    timeline: [
      { period: '11th Century CE', event: 'Founded as Kandanavolu by carters greasing cartwheels at the river.' },
      { period: '1530 CE', event: 'Achyuta Deva Raya constructs the riverside stone citadel and watchtower.' },
      { period: '1690–1839 CE', event: 'Rule of the Nawabs of Kurnool; construction of royal mausoleums.' },
      { period: '1953–1956 CE', event: 'Kurnool serves as the inaugural capital of Andhra State post-independence.' }
    ],
    dynasty: 'Western Chalukyas, Vijayanagara Empire, Nawabs of Kurnool',
    historicalRulers: 'Achyuta Deva Raya, Abdul Wahab Khan, Nawab Alif Khan, Tanguturi Prakasam Pantulu',
    culturalImportance: 'Renowned as the heart of Rayalaseema culture, legendary culinary traditions, historic stone monuments, and sacred river sangams.',
    archaeologicalImportance: 'Preserves the multi-tiered Konda Reddy Buruju watchtower, Gol Gumbaz style Tomb of Abdul Wahab, Venugopala Swamy temple, and Orvakal rock garden archaeological formations.',
    architecture: 'Blend of Vijayanagara stone bastions, Deccan Sultanate dome architecture, and colonial administrative buildings.',
    architecturalStyle: 'Vijayanagara Military & Deccan Indo-Islamic Style',
    unescoStatus: 'State Heritage Protection',
    unescoListed: false,
    deityDetails: {
      hasReligiousSignificance: true,
      mainDeity: 'Lord Jagannatha Swamy & Lord Venugopala Swamy',
      associatedDeities: ['Goddess Lakshmi', 'Lord Anjaneya'],
      religiousSignificance: 'Sacred river sangam of Tungabhadra where pilgrims perform pushkaram rituals.',
      mythology: 'Sacred river banks blessed by sage Agastya and saint Raghavendra Swamy.',
      worshipPractices: 'Daily riverside temple pooja and traditional aarti.'
    },
    rituals: {
      daily: ['Tungabhadra Harathi at river ghats (06:30 PM)', 'Konda Reddy Buruju monument open daily.'],
      poojaSchedule: 'Daily visitor access from 09:00 AM to 06:00 PM.',
      specialCeremonies: 'Tungabhadra Pushkaram celebrated once every 12 years.',
      festivals: 'Tungabhadra Pushkaralu, Kurnool Heritage Utsav, Ugadi'
    },
    visitorInformation: {
      bestTimeToVisit: 'October to February',
      openingTime: '09:00 AM',
      closingTime: '06:00 PM',
      timings: '09:00 AM – 06:00 PM (Daily)',
      entryFees: 'Free entry to Konda Reddy Buruju and city monuments',
      ticketBooking: 'No ticket required',
      guidelines: 'Follow city traffic safety; respect historical structures; wear comfortable walking shoes',
      photography: 'Permitted across all city monuments and river ghats',
      dressCode: 'Casual comfortable attire',
      restrictions: 'Do not deface historic stone ramparts',
      accessibility: 'Paved roads and urban vehicle accessibility',
      visitingDuration: '1 to 2 days'
    },
    coordinates: { lat: 15.8281, lng: 78.0373 },
    latitude: 15.8281,
    longitude: 78.0373,
    googleMapsUrl: 'https://maps.google.com/?q=15.8281,78.0373',
    mapsUrl: 'https://maps.google.com/?q=15.8281,78.0373',
    nearbyFacilities: {
      hotels: 'Mourya Inn, Hotel DVR Mansion, Triguna Clarks Inn Kurnool, Hotel Sasya Deluxe',
      guestHouses: 'AP Tourism Haritha Hotel Kurnool, Government Circuit House',
      restaurants: 'Famous Kurnool spicy Biryani outlets, rayalaseema thali restaurants, and sweet stalls',
      parking: true,
      drinkingWater: true,
      restrooms: true,
      touristCentres: 'District Tourism Information Center, Collectorate Complex, Kurnool',
      nearbyAttractions: ['Orvakal Rock Garden (22 km)', 'Alampur Navabrahma Temples (25 km)', 'Yaganti (80 km)', 'Mahanandi (85 km)']
    },
    transportInformation: {
      nearestRailway: 'Kurnool City Railway Station (KRNT) – In heart of city; major junction on Hyderabad–Bengaluru line',
      nearestAirport: 'Uyyalawada Narasimha Reddy Airport Kurnool (KJB) – 18 km at Orvakal',
      nearestBus: 'Kurnool APSRTC Central Bus Stand – 1 km; round-the-clock connectivity to Hyderabad, Bengaluru, Vijayawada',
      roadConnectivity: 'Located right along National Highway 44 (Kashmir to Kanyakumari Highway)',
      localTransport: 'City auto-rickshaws, app cabs (Ola/Uber), and city RTC buses'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Konda_Reddy_Buruju_Kurnool.jpg/800px-Konda_Reddy_Buruju_Kurnool.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Konda_Reddy_Buruju_Kurnool.jpg/800px-Konda_Reddy_Buruju_Kurnool.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Tomb_of_Abdul_Wahab_Kurnool.jpg/800px-Tomb_of_Abdul_Wahab_Kurnool.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Orvakal_Rock_Gardens_Kurnool.jpg/800px-Orvakal_Rock_Gardens_Kurnool.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Konda_Reddy_Buruju_Kurnool.jpg/800px-Konda_Reddy_Buruju_Kurnool.jpg', caption: 'The iconic circular bastion of Konda Reddy Buruju in Kurnool center', category: 'City Landmark' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Tomb_of_Abdul_Wahab_Kurnool.jpg/800px-Tomb_of_Abdul_Wahab_Kurnool.jpg', caption: 'The 17th-century domed mausoleum of Abdul Wahab Khan', category: 'Architecture' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Orvakal_Rock_Gardens_Kurnool.jpg/800px-Orvakal_Rock_Gardens_Kurnool.jpg', caption: 'Ancient natural quartz and silica formations at nearby Orvakal', category: 'Nature' }
    ],
    festivals: [
      { name: 'Kurnool District Heritage Festival', month: 'December / January', description: 'Celebration of Rayalaseema folk arts, classical dance, food carnivals, and cultural symposia.', isAnnual: true }
    ],
    featured: false,
    isPopular: true,
    popularity: 90,
    averageRating: 4.7,
    reviewCount: 29
  },

  // 5. Borra Caves
  {
    name: 'Borra Caves',
    altName: 'Million-Year-Old Karstic Limestone Speleothem Caves',
    altNames: ['Borra Guhalu', 'Borra Caverns', 'Ananthagiri Limestone Caves'],
    category: 'Ancient Caves',
    state: 'Andhra Pradesh',
    stateCode: 'AP',
    district: 'Alluri Sitharama Raju',
    city: 'Borra',
    location: 'Ananthagiri Hills of the Eastern Ghats, Araku Valley',
    address: 'Borra Caves Complex, Ananthagiri Mandal, Alluri Sitharama Raju District, Andhra Pradesh - 531149',
    description: 'Dating back over 150 million years, Borra Caves is one of the largest, deepest and most spectacular natural karstic limestone cave formations in India, plunging 80 meters deep into the Ananthagiri mountain range.',
    historicalBackground: 'Discovered for geological records by William King of the Geological Survey of India in 1807. Formed by the subterranean Gosthani River dissolving calcium carbonate over geological epochs into breathtaking stalactites and stalagmites.',
    establishmentPeriod: '150 Million Years Ago (Middle Jurassic Period)',
    historicalPeriod: 'Prehistoric / Geological Era',
    timeline: [
      { period: '150 Million BCE', event: 'Percolating Gosthani river waters initiate karstic limestone dissolution.' },
      { period: '1807 CE', event: 'British geologist William King surveys and documents the cavern chambers.' },
      { period: '1990s CE', event: 'AP Tourism installs dynamic multi-colored eco-friendly lighting systems.' }
    ],
    dynasty: 'Geological Natural Heritage (Protected by AP Tourism & Forest Dept)',
    historicalRulers: 'Tribal Jatapu and Kondadoru communities who venerate the natural cave lingam',
    culturalImportance: 'Local tribal lore states that a cow fell into the cave opening; its owner found it safe near a naturally formed Shiva lingam. Since then, it has been revered as a sacred subterranean Shiva shrine.',
    archaeologicalImportance: 'Presents rare subterranean speleothems including soda straws, columns, draperies, and prehistoric microlith stone tools dating back 30,000 to 50,000 years.',
    architecture: 'Spectacular subterranean natural karst cavern chambers extending over 200 meters with dramatic soaring limestone ceilings.',
    architecturalStyle: 'Natural Karst Limestone Cavern Architecture',
    unescoStatus: 'Natural Geological Monument',
    unescoListed: false,
    deityDetails: {
      hasReligiousSignificance: true,
      mainDeity: 'Swayambhu Lord Shiva (Natural Stalagmite Lingam) & Kamadhenu',
      associatedDeities: ['Nandi', 'Goddess Parvati'],
      religiousSignificance: 'Sacred subterranean natural lingam where pilgrims climb steep stone steps to seek divine blessings.',
      mythology: 'The cow of a cowherd slipped into the cavern and emerged miraculously unscathed at the feet of the Shivalinga.',
      worshipPractices: 'Devotees offer holy water, milk, and flowers at the natural stalagmite lingam inside the central chamber.'
    },
    rituals: {
      daily: ['Cave illumination operates daily from 10:00 AM to 05:00 PM.', 'Continuous prayer lamp lit at the Swayambhu Lingam.'],
      poojaSchedule: 'Daily visitor hours: 10:00 AM to 05:00 PM (1:00 PM – 2:00 PM lunch break for lighting cool-down).',
      specialCeremonies: 'Special Rudrabhishekam on Maha Shivaratri drawing thousands of tribal devotees.',
      festivals: 'Maha Shivaratri, Karthika Masam tribal fairs'
    },
    visitorInformation: {
      bestTimeToVisit: 'October to March (pleasantly cool hill station climate)',
      openingTime: '10:00 AM',
      closingTime: '05:00 PM',
      timings: '10:00 AM – 05:00 PM (Lunch break: 01:00 PM – 02:00 PM)',
      entryFees: 'Adults: ₹80, Children: ₹60; Still Camera: ₹100, Video: ₹200',
      ticketBooking: 'Available on-spot at entrance ticket counters and online via AP Tourism portal',
      guidelines: 'Wear non-slip rubber soled walking shoes; hold handrails on moist staircases; do not touch or break stalactites',
      photography: 'Permitted with camera ticket; dynamic LED lighting illuminates the formations brilliantly',
      dressCode: 'Comfortable clothing and sturdy sneakers',
      restrictions: 'Littering and smoking inside cave strictly prohibited',
      accessibility: 'Involves over 300 steps inside the cave; not wheelchair accessible inside subterranean chambers',
      visitingDuration: '2 to 3 hours'
    },
    coordinates: { lat: 18.2803, lng: 83.0392 },
    latitude: 18.2803,
    longitude: 83.0392,
    googleMapsUrl: 'https://maps.google.com/?q=18.2803,83.0392',
    mapsUrl: 'https://maps.google.com/?q=18.2803,83.0392',
    nearbyFacilities: {
      hotels: 'Haritha Valley Resort Araku, Haritha Hill Resort Ananthagiri (9 km), Tyda Jungle Bells Nature Camp',
      guestHouses: 'AP Tourism cottages at Ananthagiri and Borra Caves entrance',
      restaurants: 'Haritha Restaurant Borra Caves, famous bamboo chicken and tribal honey stalls',
      parking: true,
      drinkingWater: true,
      restrooms: true,
      touristCentres: 'AP Tourism Helpdesk at Borra Caves entrance gate',
      nearbyAttractions: ['Araku Valley (36 km)', 'Katiki Waterfalls (7 km)', 'Ananthagiri Coffee Plantations (9 km)', 'Padmapuram Gardens (38 km)']
    },
    transportInformation: {
      nearestRailway: 'Borra Guhalu Railway Station (BGHU) – 1 km (Visakhapatnam–Kirandul Vistadome scenic route)',
      nearestAirport: 'Visakhapatnam International Airport (VTZ) – 90 km',
      nearestBus: 'Borra Caves Bus Stand – 500 m; frequent APSRTC buses from Vizag and Araku',
      roadConnectivity: 'Spectacular mountain ghat road via S.Kota and Ananthagiri on Vizag–Araku State Highway',
      localTransport: 'Vistadome tourist train, private cabs from Visakhapatnam, and local jeeps'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Borra_Caves_Illumination.jpg/800px-Borra_Caves_Illumination.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Borra_Caves_Illumination.jpg/800px-Borra_Caves_Illumination.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Borra_Caves_Stalactite_Chamber.jpg/800px-Borra_Caves_Stalactite_Chamber.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Borra_Caves_Natural_Formations.jpg/800px-Borra_Caves_Natural_Formations.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Borra_Caves_Illumination.jpg/800px-Borra_Caves_Illumination.jpg', caption: 'Dynamic colorful illumination highlighting massive limestone formations', category: 'Illumination' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Borra_Caves_Stalactite_Chamber.jpg/800px-Borra_Caves_Stalactite_Chamber.jpg', caption: 'Cathedral-like subterranean cavern chamber with ancient stalactites', category: 'Geology' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Borra_Caves_Natural_Formations.jpg/800px-Borra_Caves_Natural_Formations.jpg', caption: 'Natural Shivling stalagmite formation venerated by pilgrims', category: 'Spiritual Shrine' }
    ],
    festivals: [
      { name: 'Maha Shivaratri at Borra Caves', month: 'February / March', description: 'Massive influx of tribal devotees performing overnight jagaran and abhishekam at the subterranean lingam.', isAnnual: true }
    ],
    featured: true,
    isPopular: true,
    popularity: 96,
    averageRating: 4.8,
    reviewCount: 45
  },

  // 6. Chintala Venkataramana Swamy Temple – Tadipatri
  {
    name: 'Chintala Venkataramana Swamy Temple – Tadipatri',
    altName: 'Stone Chariot Temple of Tadipatri',
    altNames: ['Chintalarayaswami Temple', 'Tadipatri Venkataramana Temple', 'Chintala Swamy Temple'],
    category: 'Ancient Temples',
    state: 'Andhra Pradesh',
    stateCode: 'AP',
    district: 'Anantapur',
    city: 'Tadipatri',
    location: 'Heart of Tadipatri town, Pennar River Valley',
    address: 'Chintala Venkataramana Temple Road, Tadipatri, Anantapur District, Andhra Pradesh - 515411',
    description: 'An architectural jewel of the Vijayanagara Empire built in the 16th century, celebrated for its monolithic stone chariot, world-renowned musical stone pillars, and intricately sculpted granite friezes depicting the Ramayana and Bhagavata.',
    historicalBackground: 'Commissioned by Pemmasani Timmanayudu, the commander of Vijayanagara Emperor Saluva Narasimha Deva Raya, in the mid-16th century. Built according to Silpa Sastra guidelines following a divine dream of Lord Vishnu inside a tamarind (chinta) grove.',
    establishmentPeriod: 'c. 1550 CE (16th Century CE)',
    historicalPeriod: 'Vijayanagara Empire (16th Century CE)',
    timeline: [
      { period: '1540–1560 CE', event: 'Pemmasani Timmanayudu commissions grand granite temple and stone chariot.' },
      { period: '1888 CE', event: 'Archaeological Survey of India documents the master stone carvings.' },
      { period: 'Present', event: 'Recognized as an ASI Monument of National Importance.' }
    ],
    dynasty: 'Vijayanagara Empire & Pemmasani Nayaks',
    historicalRulers: 'Pemmasani Timmanayudu, Achyuta Deva Raya, Aliya Rama Raya',
    culturalImportance: 'Renowned for its rare architectural precision where sunlight passes through the gopuram doorway to illuminate the holy feet of the presiding deity on specific astronomical days.',
    archaeologicalImportance: 'Centrally protected ASI monument featuring a monolithic stone chariot, a 40-pillar Ranga Mandapa with delicate ceiling rosettes, and miniature elephant processions carved in granite.',
    architecture: 'High Vijayanagara Dravidian Temple Architecture with granite bas-reliefs, inverted lotus ceilings, and miniature gopuram spires.',
    architecturalStyle: 'Vijayanagara Dravidian Architecture',
    unescoStatus: 'ASI Monument of National Importance',
    unescoListed: false,
    deityDetails: {
      hasReligiousSignificance: true,
      mainDeity: 'Lord Chintala Venkataramana Swamy (Form of Lord Vishnu / Venkateswara)',
      associatedDeities: ['Goddess Padmavathi', 'Goddess Lakshmi', 'Lord Garuda'],
      religiousSignificance: 'One of the most sacred Vaishnava kshetras in Rayalaseema, considered spiritually equal to Tirupati.',
      mythology: 'The deity manifested miraculously from a tamarind tree (Chinta chettu) to protect devotees from famine and afflictions.',
      worshipPractices: 'Vaikhanasa Agama worship, daily archana, sahasranamarchana, and grand rathotsavam.'
    },
    rituals: {
      daily: ['Suprabhata Seva (06:00 AM)', 'Nitya Archana & Abhishekam (07:30 AM)', 'Maha Nivedana (12:00 PM)', 'Sayana Seva (08:30 PM)'],
      poojaSchedule: 'Daily temple darshan: 06:00 AM to 12:30 PM and 04:30 PM to 08:30 PM.',
      specialCeremonies: 'Kalyanotsavam and chariot procession during Brahmotsavam.',
      festivals: 'Annual Brahmotsavam (Chaitra month), Vaikunta Ekadasi, Ratha Saptami'
    },
    visitorInformation: {
      bestTimeToVisit: 'October to March',
      openingTime: '06:00 AM',
      closingTime: '08:30 PM',
      timings: '06:00 AM – 12:30 PM & 04:30 PM – 08:30 PM',
      entryFees: 'Free Darshan for all devotees',
      ticketBooking: 'No ticket required',
      guidelines: 'Deposit footwear at designated counter; photography allowed in outer mandapa; respectful attire required',
      photography: 'Permitted in outer prakaram and near stone chariot; prohibited in garbhagriha',
      dressCode: 'Traditional Indian clothing recommended',
      restrictions: 'Touching sanctum murtis prohibited',
      accessibility: 'Ramps available at temple entry gates',
      visitingDuration: '1.5 to 2.5 hours'
    },
    coordinates: { lat: 14.9125, lng: 78.0125 },
    latitude: 14.9125,
    longitude: 78.0125,
    googleMapsUrl: 'https://maps.google.com/?q=14.9125,78.0125',
    mapsUrl: 'https://maps.google.com/?q=14.9125,78.0125',
    nearbyFacilities: {
      hotels: 'Hotel Sri Balaji Residency Tadipatri, Hotel Royal Palace, Anantapur luxury hotels (54 km)',
      guestHouses: 'Temple Devasthanam pilgrim rooms, AP Tourism accommodations',
      restaurants: 'Pure vegetarian South Indian restaurants and traditional Rayalaseema mess in Tadipatri town',
      parking: true,
      drinkingWater: true,
      restrooms: true,
      touristCentres: 'ASI Caretaker Office at temple entrance',
      nearbyAttractions: ['Bugga Ramalingeswara Temple (2 km)', 'Belum Caves (32 km)', 'Yaganti (55 km)', 'Gandikota (85 km)']
    },
    transportInformation: {
      nearestRailway: 'Tadipatri Railway Station (TU) – 2 km (well-connected on Guntakal–Chennai mainline)',
      nearestAirport: 'Kadapa Airport (CDP) – 100 km; Bengaluru International Airport (BLR) – 220 km',
      nearestBus: 'Tadipatri APSRTC Bus Stand – 1.5 km; frequent direct buses from Anantapur, Kurnool, and Kadapa',
      roadConnectivity: 'Situated on State Highway 63 and NH-67 connecting Anantapur and Kadapa',
      localTransport: 'Auto-rickshaws, cycle rickshaws, and private taxis easily available'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Chintala_Venkataramana_Temple_Tadipatri.jpg/800px-Chintala_Venkataramana_Temple_Tadipatri.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Chintala_Venkataramana_Temple_Tadipatri.jpg/800px-Chintala_Venkataramana_Temple_Tadipatri.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Tadipatri_Stone_Chariot.jpg/800px-Tadipatri_Stone_Chariot.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Tadipatri_Carved_Pillars.jpg/800px-Tadipatri_Carved_Pillars.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Chintala_Venkataramana_Temple_Tadipatri.jpg/800px-Chintala_Venkataramana_Temple_Tadipatri.jpg', caption: 'The majestic stone entrance gopuram and courtyard at Tadipatri', category: 'Architecture' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Tadipatri_Stone_Chariot.jpg/800px-Tadipatri_Stone_Chariot.jpg', caption: 'The exquisitely carved monolithic granite stone chariot', category: 'Stonecraft' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Tadipatri_Carved_Pillars.jpg/800px-Tadipatri_Carved_Pillars.jpg', caption: 'Ornate Yali pillars and mythical friezes in the Ranga Mandapa', category: 'Sculptures' }
    ],
    festivals: [
      { name: 'Srivari Brahmotsavam & Rathotsavam', month: 'March / April (Chaitra Suddha Purnima)', description: 'Grand annual 10-day festival featuring the pulling of the massive temple wooden chariot.', isAnnual: true }
    ],
    featured: false,
    isPopular: true,
    popularity: 88,
    averageRating: 4.8,
    reviewCount: 26
  },

  // 7. Bugga Ramalingeswara Swamy Temple – Tadipatri
  {
    name: 'Bugga Ramalingeswara Swamy Temple – Tadipatri',
    altName: 'Perennial Underground Spring Shiva Temple',
    altNames: ['Bugga Ramalingeswara Temple', 'Tadipatri Shiva Temple', 'Bugga Temple'],
    category: 'Ancient Temples',
    state: 'Andhra Pradesh',
    stateCode: 'AP',
    district: 'Anantapur',
    city: 'Tadipatri',
    location: 'Southern bank of Pennar River, Tadipatri',
    address: 'Bugga Temple Road, Near Pennar River, Tadipatri, Anantapur District, Andhra Pradesh - 515411',
    description: 'An architectural marvel of the late Vijayanagara era, renowned for a perennial natural underground water spring (Bugga in Telugu) that constantly bathes the Swayambhu Shiva Lingam before flowing into the sacred Pennar River.',
    historicalBackground: 'Constructed between 1490 and 1509 CE by Ramalinga Nayudu, a chief subordinate of the Vijayanagara ruler Vira Narasimha Raya. Renowned architectural historian James Fergusson praised its unfinished gopurams as some of the most elaborately carved sculptures in South India.',
    establishmentPeriod: 'c. 1490–1509 CE (15th–16th Century CE)',
    historicalPeriod: 'Vijayanagara Empire (Tuluva Dynasty)',
    timeline: [
      { period: '1490 CE', event: 'Ramalinga Nayudu initiates temple construction along Pennar River.' },
      { period: '1509 CE', event: 'Sanctum and grand pillared halls completed under royal patronage.' },
      { period: '1876 CE', event: 'James Fergusson publishes detailed drawings praising its stone relief carvings.' }
    ],
    dynasty: 'Vijayanagara Empire & Saluva/Tuluva Dynasties',
    historicalRulers: 'Ramalinga Nayudu, Vira Narasimha Raya, Sri Krishnadevaraya',
    culturalImportance: 'Revered as Dakshina Kashi because of the North-flowing (Uttara Vahini) Pennar River alongside the temple, where sins are believed to be washed away.',
    archaeologicalImportance: 'ASI protected monument with intricate stone carvings portraying scenes from the Shiva Purana, Lingodbhava, and 108 Natya Karanas (dance postures).',
    architecture: 'Dravidian Temple Architecture with unfinished monolithic gopurams displaying some of the most delicate granite carvings in India.',
    architecturalStyle: 'Vijayanagara Dravidian Stonecraft',
    unescoStatus: 'ASI Monument of National Importance',
    unescoListed: false,
    deityDetails: {
      hasReligiousSignificance: true,
      mainDeity: 'Lord Ramalingeswara Swamy (Swayambhu Shiva Lingam)',
      associatedDeities: ['Goddess Parvati', 'Lord Ganesha', 'Lord Shanmukha'],
      religiousSignificance: 'The Swayambhu Lingam is consecration by Lord Rama according to local sthala purana; perennial spring water trickles continuously from the base of the pedestal.',
      mythology: 'Consecrated by Lord Rama on his journey southward to atone for sins of warfare and seek Shiva’s benediction.',
      worshipPractices: 'Shaiva Agama rituals, continuous Jalabhishekam powered by the natural spring.'
    },
    rituals: {
      daily: ['Abhishekam with holy spring water (06:00 AM)', 'Maha Rudrabhishekam (08:00 AM)', 'Sandhya Aarti (06:30 PM)', 'Pavalimpu Seva (08:00 PM)'],
      poojaSchedule: 'Open daily: 06:00 AM – 12:30 PM and 04:00 PM – 08:30 PM.',
      specialCeremonies: 'Maha Shivaratri night-long 4-kala abhishekam; Karthika Somavaram deepotsavam.',
      festivals: 'Maha Shivaratri, Karthika Masam, Shravana Masam'
    },
    visitorInformation: {
      bestTimeToVisit: 'October to March',
      openingTime: '06:00 AM',
      closingTime: '08:30 PM',
      timings: '06:00 AM – 12:30 PM & 04:00 PM – 08:30 PM',
      entryFees: 'Free Entry',
      ticketBooking: 'No ticket required',
      guidelines: 'Remove footwear before entering; holy spring water is sacred, do not wash hands/feet directly inside inner spring well',
      photography: 'Permitted in outer temple complex; prohibited in inner sanctum',
      dressCode: 'Modest traditional attire required',
      restrictions: 'Maintain silence inside sanctum',
      accessibility: 'Ground level access across temple compound',
      visitingDuration: '1 to 2 hours'
    },
    coordinates: { lat: 14.9083, lng: 78.0083 },
    latitude: 14.9083,
    longitude: 78.0083,
    googleMapsUrl: 'https://maps.google.com/?q=14.9083,78.0083',
    mapsUrl: 'https://maps.google.com/?q=14.9083,78.0083',
    nearbyFacilities: {
      hotels: 'Local lodges in Tadipatri; luxury hotels in Anantapur (54 km)',
      guestHouses: 'Temple accommodation and AP Tourism guest facilities',
      restaurants: 'Tadipatri town restaurants serving traditional Rayalaseema meals and snacks',
      parking: true,
      drinkingWater: true,
      restrooms: true,
      touristCentres: 'ASI Counter at temple entrance',
      nearbyAttractions: ['Chintala Venkataramana Temple (2 km)', 'Belum Caves (32 km)', 'Gandikota (85 km)', 'Gooty Fort (60 km)']
    },
    transportInformation: {
      nearestRailway: 'Tadipatri Railway Station (TU) – 2.5 km',
      nearestAirport: 'Kadapa Airport (CDP) – 100 km; Bengaluru Airport (BLR) – 220 km',
      nearestBus: 'Tadipatri Bus Stand – 2 km; frequent local town buses and autos',
      roadConnectivity: 'Good road network along Pennar River bank in Tadipatri municipality',
      localTransport: 'Auto-rickshaws available from any part of Tadipatri'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Bugga_Ramalingeswara_Temple_Tadipatri.jpg/800px-Bugga_Ramalingeswara_Temple_Tadipatri.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Bugga_Ramalingeswara_Temple_Tadipatri.jpg/800px-Bugga_Ramalingeswara_Temple_Tadipatri.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Bugga_Temple_Sculpted_Gopuram.jpg/800px-Bugga_Temple_Sculpted_Gopuram.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Bugga_Temple_Pennar_River_View.jpg/800px-Bugga_Temple_Pennar_River_View.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Bugga_Ramalingeswara_Temple_Tadipatri.jpg/800px-Bugga_Ramalingeswara_Temple_Tadipatri.jpg', caption: 'The riverside Bugga Ramalingeswara temple complex', category: 'Architecture' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Bugga_Temple_Sculpted_Gopuram.jpg/800px-Bugga_Temple_Sculpted_Gopuram.jpg', caption: 'Unfinished gopuram famous for its intricate relief carvings', category: 'Stonecraft' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Bugga_Temple_Pennar_River_View.jpg/800px-Bugga_Temple_Pennar_River_View.jpg', caption: 'View of the North-flowing Pennar river from the temple walls', category: 'Landscape' }
    ],
    festivals: [
      { name: 'Maha Shivaratri Brahmotsavam', month: 'February / March', description: 'Extensive 5-day celebration with special Bilvarchana, chariot procession and holy bath in Pennar river.', isAnnual: true }
    ],
    featured: false,
    isPopular: false,
    popularity: 84,
    averageRating: 4.7,
    reviewCount: 22
  },

  // 8. Chandragiri Fort
  {
    name: 'Chandragiri Fort',
    altName: 'Royal Citadel & 4th Capital of Vijayanagara Empire',
    altNames: ['Chandragiri Mahal', 'Raja Mahal Chandragiri', 'Chandragiri Fort & Palace'],
    category: 'Forts & Palaces',
    state: 'Andhra Pradesh',
    stateCode: 'AP',
    district: 'Tirupati',
    city: 'Chandragiri',
    location: 'Chandragiri foothills, 14 km west of Tirupati',
    address: 'Chandragiri Fort Complex, Chandragiri, Tirupati District, Andhra Pradesh - 517101',
    description: 'An imposing 11th-century hill citadel and royal palace complex built by the Yadava Rayas and later serving as the fourth capital of the Vijayanagara Empire, famed for its Indo-Saracenic Raja Mahal and Rani Mahal.',
    historicalBackground: 'Founded in 1000 CE by Immadi Narasinga Yadavaraya. Reached its golden peak when the Vijayanagara rulers shifted their capital here in 1565 CE following the battle of Talikota. It was here in 1639 CE that King Sri Ranga Raya granted land to the British East India Company to establish Fort St. George (modern Chennai).',
    establishmentPeriod: 'c. 1000 CE (Palace rebuilt 16th Century CE)',
    historicalPeriod: 'Medieval Era (11th – 17th Century CE)',
    timeline: [
      { period: '1000 CE', event: 'Built by Immadi Narasinga Yadavaraya of the Yadava dynasty.' },
      { period: '1367 CE', event: 'Annexed by Vijayanagara Empire under Saluva Narasimha.' },
      { period: '1565 CE', event: 'Serves as the proud fourth and final capital of the Vijayanagara Empire.' },
      { period: '1639 CE', event: 'Grant deed signed in Raja Mahal transferring site of modern Chennai to the British.' }
    ],
    dynasty: 'Yadava Rayas, Vijayanagara Empire (Aravidu Dynasty), Golconda Sultanate',
    historicalRulers: 'Immadi Narasinga Yadavaraya, Saluva Narasimha, Venkatapati Raya II, Sri Ranga Raya III',
    culturalImportance: 'A symbol of royal Telugu sovereignty and resilience where Vijayanagara monarchs governed while worshiping their family deity Lord Venkateswara of Tirumala.',
    archaeologicalImportance: 'ASI protected monument complex housing the three-storied Raja Mahal (now an archaeological museum), Queen’s Palace (Rani Mahal), deep defensive moats, watchtowers, and ruined temples.',
    architecture: 'Unique Indo-Saracenic palace architecture constructed entirely of stone, brick, lime mortar and devoid of wooden beams in ceilings.',
    architecturalStyle: 'Vijayanagara Indo-Saracenic Palace Architecture',
    unescoStatus: 'ASI Monument of National Importance',
    unescoListed: false,
    deityDetails: {
      hasReligiousSignificance: false,
      mainDeity: 'Information not currently available (Historical Military Citadel)',
      associatedDeities: [],
      religiousSignificance: 'Historical royal palace and defensive hill fort with ruined Shaiva and Vaishnava shrines inside.',
      mythology: 'Kings sought blessings at Tirumala hills visible from the summit citadel.',
      worshipPractices: 'Historical monument complex maintained by the Archaeological Survey of India.'
    },
    rituals: {
      daily: ['Sound and Light Show (Telugu & English) conducted every evening in the palace lawns.'],
      poojaSchedule: 'Monument & Museum open daily from 09:00 AM to 05:00 PM (Closed on Fridays).',
      specialCeremonies: 'Laser light and historical narration spectacles on Vijayanagara history.',
      festivals: 'Chandragiri Heritage Fest, Independence Day celebrations'
    },
    visitorInformation: {
      bestTimeToVisit: 'September to March',
      openingTime: '09:00 AM',
      closingTime: '05:30 PM',
      timings: '09:00 AM – 05:30 PM (Museum closed on Fridays); Sound & Light Show: 06:30 PM – 08:00 PM',
      entryFees: 'Fort Entry: ₹25 for Indian Citizens, ₹300 for Foreign Tourists; Sound & Light Show: Adults ₹100, Children ₹60',
      ticketBooking: 'Available on-spot at ASI entrance ticket counter or online via ASI portal',
      guidelines: 'Preserve cleanliness; do not lean on ancient palace balconies; follow audio visual guide rules during evening shows',
      photography: 'Permitted in palace courtyards and exterior lawns; museum exhibits have designated rules',
      dressCode: 'Comfortable clothing and walking shoes for exploring gardens and ramparts',
      restrictions: 'Climbing perimeter ruined ramparts without trail guide is prohibited',
      accessibility: 'Ground floor of Raja Mahal and garden pathways are wheelchair friendly',
      visitingDuration: '2 to 3 hours'
    },
    coordinates: { lat: 13.5828, lng: 79.3175 },
    latitude: 13.5828,
    longitude: 79.3175,
    googleMapsUrl: 'https://maps.google.com/?q=13.5828,79.3175',
    mapsUrl: 'https://maps.google.com/?q=13.5828,79.3175',
    nearbyFacilities: {
      hotels: 'Extensive luxury and budget hotels in Tirupati city (14 km), Fortune Select Grand Ridge, Marasa Sarovar Premiere',
      guestHouses: 'AP Tourism Haritha Hotel Chandragiri, TTD Guest Houses in Tirupati',
      restaurants: 'Haritha Restaurant at Chandragiri, extensive dining in Tirupati town',
      parking: true,
      drinkingWater: true,
      restrooms: true,
      touristCentres: 'ASI Museum & Tourist Facilitation Center, Raja Mahal Ground Floor',
      nearbyAttractions: ['Tirumala Venkateswara Temple (25 km)', 'Srikalahasti (50 km)', 'Kanipakam (60 km)', 'Kalyani Dam (8 km)']
    },
    transportInformation: {
      nearestRailway: 'Chandragiri Railway Station (CGI) – 1.5 km; Tirupati Main Railway Station (TPTY) – 14 km',
      nearestAirport: 'Tirupati International Airport (TIR) at Renigunta – 28 km',
      nearestBus: 'Chandragiri Bus Stand – 1 km; city buses from Tirupati Central Bus Station run every 15 minutes',
      roadConnectivity: 'Located right along National Highway 140 (Tirupati–Chittoor Highway)',
      localTransport: 'APSRTC city buses, app cabs, and auto-rickshaws readily available from Tirupati'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Raja_Mahal_Chandragiri_Fort.jpg/800px-Raja_Mahal_Chandragiri_Fort.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Raja_Mahal_Chandragiri_Fort.jpg/800px-Raja_Mahal_Chandragiri_Fort.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Rani_Mahal_Chandragiri.jpg/800px-Rani_Mahal_Chandragiri.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Chandragiri_Fort_Ramparts_and_Hills.jpg/800px-Chandragiri_Fort_Ramparts_and_Hills.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Raja_Mahal_Chandragiri_Fort.jpg/800px-Raja_Mahal_Chandragiri_Fort.jpg', caption: 'The magnificent three-storey Indo-Saracenic Raja Mahal', category: 'Palace' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Rani_Mahal_Chandragiri.jpg/800px-Rani_Mahal_Chandragiri.jpg', caption: 'The elegant Queen’s Palace (Rani Mahal) with ornamental stucco', category: 'Architecture' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Chandragiri_Fort_Ramparts_and_Hills.jpg/800px-Chandragiri_Fort_Ramparts_and_Hills.jpg', caption: 'Surrounding granite crags and medieval defensive ramparts', category: 'Fortifications' }
    ],
    festivals: [
      { name: 'Chandragiri Cultural Utsavam', month: 'December / January', description: 'Annual cultural heritage fest featuring classical carnatic music and theatrical plays on royal Vijayanagara history.', isAnnual: true }
    ],
    featured: true,
    isPopular: true,
    popularity: 94,
    averageRating: 4.8,
    reviewCount: 36
  },

  // 9. Penukonda Fort
  {
    name: 'Penukonda Fort',
    altName: 'Second Capital of the Vijayanagara Empire & Gagan Mahal',
    altNames: ['Ghanagiri', 'Penukonda Citadel', 'Gagan Mahal Penukonda'],
    category: 'Forts & Palaces',
    state: 'Andhra Pradesh',
    stateCode: 'AP',
    district: 'Sri Sathya Sai',
    city: 'Penukonda',
    location: 'Penukonda Hill, Sri Sathya Sai District',
    address: 'Penukonda Fort Complex, Penukonda, Sri Sathya Sai District, Andhra Pradesh - 515110',
    description: 'A colossal 14th-century mountain stronghold that served as the fortified second capital of the Vijayanagara Empire, famed for its Gagan Mahal palace, 365 ancient temples, and impregnable hill bastions.',
    historicalBackground: 'Constructed under King Bukka I of the Sangama dynasty in 1354 CE to guard the southern dominions. After the fall of Hampi in 1565 CE, King Tirumala Deva Raya made Penukonda the royal imperial seat of the Vijayanagara Empire.',
    establishmentPeriod: '1354 CE (14th Century CE)',
    historicalPeriod: 'Vijayanagara Empire (14th – 16th Century CE)',
    timeline: [
      { period: '1354 CE', event: 'King Bukka Raya I commissions fort construction on Ghanagiri hill.' },
      { period: '1509–1529 CE', event: 'Emperor Sri Krishnadevaraya uses Penukonda as a royal monsoon retreat.' },
      { period: '1565 CE', event: 'Becomes official capital of Vijayanagara Empire under Tirumala Deva Raya.' },
      { period: '1577 CE', event: 'Bijapur Sultanate siege successfully repelled by Jagadeva Rao.' }
    ],
    dynasty: 'Vijayanagara Empire (Sangama, Tuluva & Aravidu Dynasties)',
    historicalRulers: 'Bukka Raya I, Sri Krishnadevaraya, Tirumala Deva Raya, Venkatapati Raya I',
    culturalImportance: 'Celebrated in inscriptions as "Ghanagiri", housing a unique cultural synthesis of Hindu temples, the royal Gagan Mahal, Jain bastis, and the revered Babayya Dargah.',
    archaeologicalImportance: 'Centrally protected ASI complex containing the two-storied Gagan Mahal summer palace, massive granite bastions, the 11-foot monolithic Anjaneya statue, and deep water tanks.',
    architecture: 'Indo-Islamic and Vijayanagara civic architecture featuring octagonal watch towers, arched arcades, and lotus-petal motifs.',
    architecturalStyle: 'Vijayanagara Military & Royal Palace Architecture',
    unescoStatus: 'ASI Protected Monument',
    unescoListed: false,
    deityDetails: {
      hasReligiousSignificance: true,
      mainDeity: 'Lord Yoga Narasimha Swamy & Monolithic Anjaneya Swamy',
      associatedDeities: ['Lord Kashi Vishwanatha', 'Goddess Chennakesava'],
      religiousSignificance: 'Famous for the colossal monolithic Anjaneya Swamy carving and historic royal temples.',
      mythology: 'Believed to be protected by 365 guardian deities across 365 temples built around the hill.',
      worshipPractices: 'Active pooja at Yoga Narasimha Swamy and Anjaneya shrines.'
    },
    rituals: {
      daily: ['Daily darshan at fort temples from 06:00 AM to 06:00 PM.'],
      poojaSchedule: 'Monument and Gagan Mahal open daily: 08:00 AM – 06:00 PM.',
      specialCeremonies: 'Hanuman Jayanti and Narasimha Jayanti celebrations.',
      festivals: 'Hanuman Jayanti, Urs of Hazrat Babayya, Maha Shivaratri'
    },
    visitorInformation: {
      bestTimeToVisit: 'October to February',
      openingTime: '08:00 AM',
      closingTime: '06:00 PM',
      timings: '08:00 AM – 06:00 PM (Daily)',
      entryFees: 'Free Entry to fort grounds and Gagan Mahal',
      ticketBooking: 'No ticket required',
      guidelines: 'Trek along designated stone paths; carry sufficient drinking water for hill climbs; respect sacred sites',
      photography: 'Permitted across all monuments and hill viewpoints',
      dressCode: 'Comfortable trekking clothing and hiking shoes',
      restrictions: 'Do not climb unstable ancient ramparts',
      accessibility: 'Gagan Mahal ground floor is accessible; hill summit requires trekking up stone steps',
      visitingDuration: '2 to 4 hours'
    },
    coordinates: { lat: 14.0833, lng: 77.6000 },
    latitude: 14.0833,
    longitude: 77.6000,
    googleMapsUrl: 'https://maps.google.com/?q=14.0833,77.6000',
    mapsUrl: 'https://maps.google.com/?q=14.0833,77.6000',
    nearbyFacilities: {
      hotels: 'Local lodges in Penukonda town; luxury stay at Puttaparthi (40 km) or Hindupur (35 km)',
      guestHouses: 'AP Tourism accommodations and government inspection bungalows',
      restaurants: 'Traditional Andhra eateries in Penukonda market serving spicy ragi sankati and meals',
      parking: true,
      drinkingWater: true,
      restrooms: true,
      touristCentres: 'ASI Caretaker Office at Gagan Mahal, Penukonda',
      nearbyAttractions: ['Lepakshi (52 km)', 'Puttaparthi (40 km)', 'Hemavathi (72 km)', 'Dharmavaram (45 km)']
    },
    transportInformation: {
      nearestRailway: 'Penukonda Junction (PKD) – 2 km (major junction on Bengaluru–Dharmavaram line)',
      nearestAirport: 'Kempegowda International Airport Bengaluru (BLR) – 115 km',
      nearestBus: 'Penukonda APSRTC Bus Stand – 1 km; frequent buses connecting Bengaluru, Anantapur, and Kurnool',
      roadConnectivity: 'Located directly off National Highway 44 (Bengaluru–Hyderabad Highway)',
      localTransport: 'Local auto-rickshaws and state transport buses'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Gagan_Mahal_Penukonda.jpg/800px-Gagan_Mahal_Penukonda.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Gagan_Mahal_Penukonda.jpg/800px-Gagan_Mahal_Penukonda.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Penukonda_Fort_Hill_View.jpg/800px-Penukonda_Fort_Hill_View.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Penukonda_Hanuman_Monolith.jpg/800px-Penukonda_Hanuman_Monolith.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Gagan_Mahal_Penukonda.jpg/800px-Gagan_Mahal_Penukonda.jpg', caption: 'The two-storey Indo-Islamic Gagan Mahal palace at Penukonda', category: 'Palace' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Penukonda_Fort_Hill_View.jpg/800px-Penukonda_Fort_Hill_View.jpg', caption: 'The panoramic view of the mountain fortress and defensive walls', category: 'Landscape' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Penukonda_Hanuman_Monolith.jpg/800px-Penukonda_Hanuman_Monolith.jpg', caption: 'The monumental monolithic granite Anjaneya sculpture at fort gate', category: 'Sculptures' }
    ],
    festivals: [
      { name: 'Penukonda Heritage Utsavam', month: 'February', description: 'Celebration of Vijayanagara royal history, folk arts, literary symposia and spiritual gatherings.', isAnnual: true }
    ],
    featured: false,
    isPopular: false,
    popularity: 82,
    averageRating: 4.6,
    reviewCount: 20
  },

  // 10. Belum Caves
  {
    name: 'Belum Caves',
    altName: 'Second Largest Underground Cave Network in Indian Subcontinent',
    altNames: ['Belum Guhalu', 'Belum Caverns', 'Patalaganga Caves'],
    category: 'Ancient Caves',
    state: 'Andhra Pradesh',
    stateCode: 'AP',
    district: 'Nandyal',
    city: 'Belum',
    location: 'Near Kolimigundla, Nandyal District',
    address: 'Belum Caves Road, Kolimigundla Mandal, Nandyal District, Andhra Pradesh - 518123',
    description: 'The second largest and longest subterranean cave system in the Indian subcontinent (3.22 km surveyed), formed over millions of years by the underground Chitravati River, famed for the 150-foot-deep Patalaganga chamber and ancient Buddhist meditation relics.',
    historicalBackground: 'Geologically formed in black limestone deposits millions of years ago. Mentioned in 1884 expedition logs by British surveyor Robert Bruce Foote and scientifically explored in detail between 1982 and 1984 by a German speleological team headed by H. Daniel Gebauer.',
    establishmentPeriod: 'Millions of Years Ago (Pre-Cambrian to Pleistocene)',
    historicalPeriod: 'Prehistoric to Buddhist Era (4500 BCE – Present)',
    timeline: [
      { period: '4500 BCE', event: 'Prehistoric humans inhabit cave chambers as evidenced by Neolithic pottery shards.' },
      { period: 'c. 2nd Century BCE', event: 'Buddhist and Jain monks utilize quiet cavern halls for Dhyana meditation.' },
      { period: '1884 CE', event: 'Robert Bruce Foote documents presence of Belum cave system.' },
      { period: '2002 CE', event: 'AP Tourism develops illuminated pathways, ventilation ducts, and tourist amenities.' }
    ],
    dynasty: 'Natural Geological Heritage (Managed by AP Tourism)',
    historicalRulers: 'Buddhist Monks of the Satavahana era who established meditation chambers',
    culturalImportance: 'Revered as a sacred spiritual retreat where Buddhist monks attained deep contemplative silence in the subterranean "Meditation Hall" (Dhyana Mandir).',
    archaeologicalImportance: 'Vast limestone caverns featuring speleothems, siphon shafts, musical limestone columns (Saptaswara), and the 46-meter-deep Patalaganga spring.',
    architecture: 'Natural underground karstic limestone subterranean chambers with smooth water-carved vaults and high ceilings.',
    architecturalStyle: 'Karstic Limestone Underground Cavern Architecture',
    unescoStatus: 'National Geo-Heritage Monument',
    unescoListed: false,
    deityDetails: {
      hasReligiousSignificance: true,
      mainDeity: 'Lord Shiva & Holy Patalaganga Water Stream',
      associatedDeities: ['Buddha Relics', 'Saptarishi'],
      religiousSignificance: 'Patalaganga is considered a holy subterranean teertham with perennial pristine crystal water flowing deep below.',
      mythology: 'Sacred subterranean stream linked by local legend to the divine celestial Ganga flowing beneath the earth.',
      worshipPractices: 'Devotees bow reverently at the Patalaganga stream and Meditation Hall.'
    },
    rituals: {
      daily: ['Cave illumination and oxygen ventilation fans operational daily.'],
      poojaSchedule: 'Open for visitors daily from 10:00 AM to 05:00 PM.',
      specialCeremonies: 'Buddha Purnima celebrations at the colossal 40-foot Buddha statue outside the cave entrance.',
      festivals: 'Belum Caves Music Festival, Buddha Purnima, Maha Shivaratri'
    },
    visitorInformation: {
      bestTimeToVisit: 'October to February (cooler months)',
      openingTime: '10:00 AM',
      closingTime: '05:00 PM',
      timings: '10:00 AM – 05:00 PM (Daily)',
      entryFees: 'Adults: ₹70, Children: ₹50, Foreign Nationals: ₹300',
      ticketBooking: 'Available on-spot at entrance ticket counter and online via AP Tourism',
      guidelines: 'Carry water bottles; individuals with severe respiratory/cardiac ailments should exercise caution; follow illuminated pathways',
      photography: 'Permitted throughout cave chambers; professional video equipment requires fee',
      dressCode: 'Comfortable light cotton clothing and rubber-soled walking shoes',
      restrictions: 'Do not touch delicate limestone stalactite tips; no littering inside caverns',
      accessibility: 'Ramps and stairs into cave mouth; underground pathways are paved but feature gentle gradients',
      visitingDuration: '2 to 3.5 hours'
    },
    coordinates: { lat: 15.1033, lng: 78.1114 },
    latitude: 15.1033,
    longitude: 78.1114,
    googleMapsUrl: 'https://maps.google.com/?q=15.1033,78.1114',
    mapsUrl: 'https://maps.google.com/?q=15.1033,78.1114',
    nearbyFacilities: {
      hotels: 'Haritha Belum Caves (AP Tourism), Tadipatri hotels (32 km), Banganapalle lodges (35 km)',
      guestHouses: 'AP Tourism Haritha Resort directly opposite cave entrance with AC and non-AC rooms',
      restaurants: 'Haritha Restaurant Belum, local food stalls serving tea, snacks, and Andhra meals',
      parking: true,
      drinkingWater: true,
      restrooms: true,
      touristCentres: 'AP Tourism Information and Ticket Booking Office at entrance',
      nearbyAttractions: ['Gandikota (60 km)', 'Yaganti (45 km)', 'Mahanandi (80 km)', 'Tadipatri Temples (32 km)']
    },
    transportInformation: {
      nearestRailway: 'Tadipatri Railway Station (TU) – 32 km; Banaganapalli (BGNP) – 35 km',
      nearestAirport: 'Kadapa Airport (CDP) – 105 km; Kurnool Airport (KJB) – 85 km; Bengaluru Airport – 250 km',
      nearestBus: 'Belum Caves Bus Stop – 200 m; regular buses from Tadipatri, Banaganapalli, and Kurnool',
      roadConnectivity: 'Smooth two-lane State Highway 28 connecting Tadipatri and Kolimigundla',
      localTransport: 'APSRTC buses, private tourist taxis, and auto-rickshaws from Tadipatri'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Belum_Caves_Illuminated_Passage.jpg/800px-Belum_Caves_Illuminated_Passage.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Belum_Caves_Illuminated_Passage.jpg/800px-Belum_Caves_Illuminated_Passage.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Belum_Caves_Buddha_Statue.jpg/800px-Belum_Caves_Buddha_Statue.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Belum_Caves_Meditation_Hall.jpg/800px-Belum_Caves_Meditation_Hall.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Belum_Caves_Illuminated_Passage.jpg/800px-Belum_Caves_Illuminated_Passage.jpg', caption: 'The stunning illuminated limestone pathway deep inside Belum Caves', category: 'Cavern Passages' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Belum_Caves_Buddha_Statue.jpg/800px-Belum_Caves_Buddha_Statue.jpg', caption: 'The colossal 40-foot white Buddha statue presiding over cave entrance', category: 'Monuments' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Belum_Caves_Meditation_Hall.jpg/800px-Belum_Caves_Meditation_Hall.jpg', caption: 'The silent subterranean Meditation Hall utilized by ancient monks', category: 'Interior' }
    ],
    festivals: [
      { name: 'Belum Caves Festival', month: 'December / January', description: 'Annual state tourist festival with musical nights, heritage walks, and cave exploration workshops.', isAnnual: true }
    ],
    featured: true,
    isPopular: true,
    popularity: 97,
    averageRating: 4.9,
    reviewCount: 48
  },

  // 11. Undavalli Caves
  {
    name: 'Undavalli Caves',
    altName: 'Monolithic Rock-Cut Cave Temples of Anantasayana Vishnu',
    altNames: ['Undavalli Rock Cut Caves', 'Anantasayana Caves', 'Undavalli Gunturu Caves'],
    category: 'Ancient Caves',
    state: 'Andhra Pradesh',
    stateCode: 'AP',
    district: 'Guntur',
    city: 'Undavalli',
    location: 'Southern bank of Krishna River, 6 km from Vijayawada',
    address: 'Undavalli Cave Road, Undavalli, Guntur District, Andhra Pradesh - 522501',
    description: 'A monumental four-tiered rock-cut cave temple complex carved out of solid sandstone in the 4th–7th century CE by the Vishnukundina kings, celebrated for a colossal 5-meter monolithic sculpture of Lord Vishnu reclining on the serpent Adisesha.',
    historicalBackground: 'Originally excavated as Buddhist and Jain viharas during the 4th century CE, the caves were later transformed into grand Hindu sanctums under the royal patronage of the Vishnukundina dynasty (420–555 CE) and the Eastern Chalukyas.',
    establishmentPeriod: 'c. 4th–7th Century CE (Vishnukundina Dynasty)',
    historicalPeriod: 'Ancient & Early Medieval Era (4th – 8th Century CE)',
    timeline: [
      { period: '4th Century CE', event: 'Initial rock-cut chambers excavated by Buddhist monks.' },
      { period: '5th–6th Century CE', event: 'Vishnukundina kings commission monumental 4-tiered monolithic Vishnu complex.' },
      { period: '7th Century CE', event: 'Eastern Chalukyas carve Brahma, Vishnu, and Maheshwara pantheon reliefs.' },
      { period: '1900s CE', event: 'Declared a protected monument of national importance by the Archaeological Survey of India.' }
    ],
    dynasty: 'Vishnukundina Dynasty, Eastern Chalukyas & Pallavas',
    historicalRulers: 'Govindavarma, Madhavavarma II, Kubja Vishnuvardhana',
    culturalImportance: 'A supreme testament to early Indian rock-cut architecture in South India, demonstrating the harmonious transition from Buddhist rock-cut monasteries to classical Sanatana Dharma cave shrines.',
    archaeologicalImportance: 'Centrally protected ASI monument featuring a 4-storied facade with pillared halls, ornate chaitya arches, lion pillars, and the magnificent 5-meter reclining Anantasayana Padmanabha.',
    architecture: 'Rock-Cut Cave Temple Architecture carved directly into the eastern sandstone hillside facing the Krishna River.',
    architecturalStyle: 'Gupta-Vishnukundina Rock-Cut Cave Architecture',
    unescoStatus: 'ASI Monument of National Importance',
    unescoListed: false,
    deityDetails: {
      hasReligiousSignificance: true,
      mainDeity: 'Lord Anantasayana Padmanabha Swamy (Reclining Vishnu on Adisesha)',
      associatedDeities: ['Lord Brahma', 'Lord Shiva', 'Goddess Lakshmi', 'Garuda'],
      religiousSignificance: 'Colossal 5-meter monolithic reclining Vishnu image carved out of single living sandstone block.',
      mythology: 'Depicts Lord Vishnu in celestial cosmic slumber (Yoga Nidra) creating universes from the lotus sprouting from his navel.',
      worshipPractices: 'Historical monument with traditional flower offerings by visiting devotees.'
    },
    rituals: {
      daily: ['Monument and rock-cut galleries open daily from sunrise to sunset.'],
      poojaSchedule: 'Daily visitor hours: 09:00 AM to 05:30 PM.',
      specialCeremonies: 'Vaikunta Ekadasi and Krishna Pushkaralu heritage events.',
      festivals: 'Vaikunta Ekadasi, Maha Shivaratri, Vijayawada Dasara'
    },
    visitorInformation: {
      bestTimeToVisit: 'October to March (pleasant breeze from Krishna river)',
      openingTime: '09:00 AM',
      closingTime: '05:30 PM',
      timings: '09:00 AM – 05:30 PM (Daily)',
      entryFees: '₹25 for Indian Citizens, ₹300 for Foreign Tourists; Free for children below 15 years',
      ticketBooking: 'Available on-spot at ASI entrance ticket counter or online via asi.nic.in',
      guidelines: 'Climb staircases carefully; do not lean over balcony railings; touching 1500-year-old sandstone sculptures is strictly forbidden',
      photography: 'Permitted in all open courtyards and upper cave tiers; commercial photography requires permit',
      dressCode: 'Comfortable clothing and walking shoes for climbing sandstone cave levels',
      restrictions: 'Littering and scratching names on ancient rock surfaces strictly penalised',
      accessibility: 'Ground level is accessible; upper tiers involve stone staircases',
      visitingDuration: '1.5 to 2.5 hours'
    },
    coordinates: { lat: 16.4950, lng: 80.5794 },
    latitude: 16.4950,
    longitude: 80.5794,
    googleMapsUrl: 'https://maps.google.com/?q=16.4950,80.5794',
    mapsUrl: 'https://maps.google.com/?q=16.4950,80.5794',
    nearbyFacilities: {
      hotels: 'Extensive luxury hotels in Vijayawada (6 km), Vivanta Vijayawada, Novotel Vijayawada Varun, The Gateway Hotel',
      guestHouses: 'AP Tourism Haritha Berm Park (5 km), government guest houses in Vijayawada',
      restaurants: 'Famous riverside restaurants and Andhra thali joints in Vijayawada and Tadepalle',
      parking: true,
      drinkingWater: true,
      restrooms: true,
      touristCentres: 'ASI Ticket and Heritage Information Counter at entrance gate',
      nearbyAttractions: ['Prakasam Barrage (5 km)', 'Kanaka Durga Temple (7 km)', 'Bhavani Island (8 km)', 'Amaravati (32 km)', 'Kondapalli Fort (22 km)']
    },
    transportInformation: {
      nearestRailway: 'Vijayawada Junction (BZA) – 6 km (one of the largest railway junctions in India)',
      nearestAirport: 'Vijayawada International Airport (VGA) at Gannavaram – 26 km',
      nearestBus: 'Pandit Nehru Bus Station (PNBS) Vijayawada – 5 km; regular city buses to Undavalli village',
      roadConnectivity: 'Located off NH-16 (Chennai–Kolkata Highway) and Amaravati Road near Prakasam Barrage',
      localTransport: 'City auto-rickshaws, app cabs (Ola/Uber), and city RTC buses run frequently'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Undavalli_Caves_Facade.jpg/800px-Undavalli_Caves_Facade.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Undavalli_Caves_Facade.jpg/800px-Undavalli_Caves_Facade.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Undavalli_Anantasayana_Vishnu.jpg/800px-Undavalli_Anantasayana_Vishnu.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Undavalli_Caves_Pillared_Hall.jpg/800px-Undavalli_Caves_Pillared_Hall.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Undavalli_Caves_Facade.jpg/800px-Undavalli_Caves_Facade.jpg', caption: 'The monumental four-tiered rock-cut facade facing Krishna River', category: 'Cave Facade' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Undavalli_Anantasayana_Vishnu.jpg/800px-Undavalli_Anantasayana_Vishnu.jpg', caption: 'The 5-meter colossal monolithic reclining Vishnu in the upper tier', category: 'Monoliths' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Undavalli_Caves_Pillared_Hall.jpg/800px-Undavalli_Caves_Pillared_Hall.jpg', caption: 'Pillared rock-cut mandapa with lion capital columns', category: 'Architecture' }
    ],
    festivals: [
      { name: 'Undavalli Heritage Fest', month: 'January / February', description: 'Cultural programs celebrating early rock-cut Andhra art, Kuchipudi dance and classical music.', isAnnual: true }
    ],
    featured: true,
    isPopular: true,
    popularity: 96,
    averageRating: 4.8,
    reviewCount: 40
  },

  // 12. Kondapalli Fort
  {
    name: 'Kondapalli Fort',
    altName: 'Hill Citadel of the Reddi Kings & Gaja Saala',
    altNames: ['Kondapalli Quilla', 'Kondapalli Killa', 'Kondapalle Fort'],
    category: 'Forts & Palaces',
    state: 'Andhra Pradesh',
    stateCode: 'AP',
    district: 'NTR',
    city: 'Kondapalli',
    location: 'Kondapalli Hill range, 24 km west of Vijayawada',
    address: 'Kondapalli Fort Road, Kondapalli, NTR District, Andhra Pradesh - 521228',
    description: 'A 14th-century medieval hill fortress built by Prolaya Vema Reddi, renowned for its triple-tiered stone fortifications, the majestic Dargah Darwaza entrance, the Elephant Stables (Gaja Saala), and the world-famous GI-tagged Kondapalli wooden toy craft tradition.',
    historicalBackground: 'Built in 1360 CE by Prolaya Vema Reddi, the founder of the Reddi dynasty of Kondaveedu. Strategically controlling the Krishna river valley, the fort was fiercely contested and held by the Gajapatis of Odisha, Emperor Sri Krishnadevaraya of Vijayanagara, the Qutb Shahis, and the British East India Company.',
    establishmentPeriod: 'c. 1360 CE (14th Century CE)',
    historicalPeriod: 'Medieval Era (14th – 18th Century CE)',
    timeline: [
      { period: '1360 CE', event: 'Prolaya Vema Reddi constructs the hill fortress and battlements.' },
      { period: '1515 CE', event: 'Vijayanagara Emperor Sri Krishnadevaraya captures fort from Gajapati king Prataparudra.' },
      { period: '1579 CE', event: 'Annexed by Qutb Shahi Sultanate under Ibrahim Qutb Shah.' },
      { period: '1766 CE', event: 'British forces under General Caillaud establish military garrison.' }
    ],
    dynasty: 'Reddi Dynasty, Gajapatis of Odisha, Vijayanagara Empire, Qutb Shahis',
    historicalRulers: 'Prolaya Vema Reddi, Sri Krishnadevaraya, Prataparudra Gajapati, Ibrahim Qutb Shah',
    culturalImportance: 'Birthplace of the 400-year-old GI-tagged Kondapalli Bommalu (wooden toys carved from sacred Tella Poniki softwood), reflecting village folklore, mythological epics, and royal processions.',
    archaeologicalImportance: 'State protected monument featuring the three-tiered defensive gateways, the royal Rani Mahal palace with arched corridors, the high-vaulted Gaja Saala (Elephant Stables), and mountain reservoirs.',
    architecture: 'Medieval Hill Fortress and Indo-Islamic Citadel Architecture built of heavy granite blocks along jagged ridgelines.',
    architecturalStyle: 'Medieval Dravidian Military & Indo-Islamic Architecture',
    unescoStatus: 'State Protected Heritage Monument',
    unescoListed: false,
    deityDetails: {
      hasReligiousSignificance: false,
      mainDeity: 'Information not currently available (Historical Hill Citadel)',
      associatedDeities: [],
      religiousSignificance: 'Historic multi-dynasty citadel with ruined temples and the Hazrat Ghouse Badshah Dargah.',
      mythology: 'Guarded by divine hilltop blessings according to regional folklore.',
      worshipPractices: 'Historical monument with active toy craft village at the base.'
    },
    rituals: {
      daily: ['Fort open for historical trekking and exploration daily.'],
      poojaSchedule: 'Daily visitor timings: 10:00 AM to 05:00 PM.',
      specialCeremonies: 'Kondapalli Toys Exhibition and state cultural exhibitions.',
      festivals: 'Sankranti Kondapalli Bommala Koluvu, World Tourism Day'
    },
    visitorInformation: {
      bestTimeToVisit: 'October to February',
      openingTime: '10:00 AM',
      closingTime: '05:00 PM',
      timings: '10:00 AM – 05:00 PM (Daily)',
      entryFees: 'Adults: ₹20, Children: ₹10',
      ticketBooking: 'Available on-spot at fort entrance counter',
      guidelines: 'Follow paved ghat road or stone stairs; beware of monkeys; carry water and light snacks',
      photography: 'Permitted throughout the fort complex, palaces, and scenic viewpoints',
      dressCode: 'Comfortable clothing and sturdy walking/hiking shoes',
      restrictions: 'Do not venture off-trail into dense forest slopes after sunset',
      accessibility: 'Paved motorable road leads directly to fort palace courtyard',
      visitingDuration: '2 to 3.5 hours'
    },
    coordinates: { lat: 16.6200, lng: 80.5400 },
    latitude: 16.6200,
    longitude: 80.5400,
    googleMapsUrl: 'https://maps.google.com/?q=16.6200,80.5400',
    mapsUrl: 'https://maps.google.com/?q=16.6200,80.5400',
    nearbyFacilities: {
      hotels: 'Hotels in Ibrahimpatnam (6 km) and Vijayawada city (24 km)',
      guestHouses: 'AP Tourism guest cottages and private resorts near Ibrahimpatnam',
      restaurants: 'Local restaurants at Kondapalli town serving traditional Andhra meals and snacks',
      parking: true,
      drinkingWater: true,
      restrooms: true,
      touristCentres: 'Kondapalli Craft Council Center in toy craft artisan village at fort foothills',
      nearbyAttractions: ['Kondapalli Toy Village (2 km)', 'Ibrahimpatnam Ferry Ghat (6 km)', 'Undavalli Caves (22 km)', 'Prakasam Barrage (24 km)']
    },
    transportInformation: {
      nearestRailway: 'Kondapalli Railway Station (KI) – 3 km; Vijayawada Junction (BZA) – 24 km',
      nearestAirport: 'Vijayawada International Airport (VGA) – 42 km',
      nearestBus: 'Kondapalli Bus Stand – 2 km; city buses running from Vijayawada PNBS station every 20 minutes',
      roadConnectivity: 'Accessible via National Highway 65 (Vijayawada–Hyderabad Highway) via Ibrahimpatnam',
      localTransport: 'City auto-rickshaws, shared taxis, and local APSRTC buses'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Kondapalli_Fort_Entrance.jpg/800px-Kondapalli_Fort_Entrance.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Kondapalli_Fort_Entrance.jpg/800px-Kondapalli_Fort_Entrance.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Kondapalli_Gaja_Saala.jpg/800px-Kondapalli_Gaja_Saala.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Kondapalli_Toys_Display.jpg/800px-Kondapalli_Toys_Display.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Kondapalli_Fort_Entrance.jpg/800px-Kondapalli_Fort_Entrance.jpg', caption: 'The massive medieval arched gateway (Dargah Darwaza) of Kondapalli', category: 'Fort Gateway' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Kondapalli_Gaja_Saala.jpg/800px-Kondapalli_Gaja_Saala.jpg', caption: 'The vaulted Gaja Saala (Elephant Stables) and palace courtyards', category: 'Palace' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Kondapalli_Toys_Display.jpg/800px-Kondapalli_Toys_Display.jpg', caption: 'World-renowned traditional GI-tagged Kondapalli wooden toys', category: 'Living Heritage' }
    ],
    festivals: [
      { name: 'Kondapalli Utsavam & Toy Craft Expo', month: 'January (Sankranti)', description: 'Grand exhibition of artisan mastercrafts, live wood carving demonstrations, and folk carnivals.', isAnnual: true }
    ],
    featured: false,
    isPopular: true,
    popularity: 91,
    averageRating: 4.7,
    reviewCount: 31
  },

  // 13. Kondaveedu Fort
  {
    name: 'Kondaveedu Fort',
    altName: 'Royal Capital Citadel of the Reddi Kings',
    altNames: ['Kondavidu Fort', 'Kondaveedu Killa', 'Kondaveedu Hill Fortress'],
    category: 'Forts & Palaces',
    state: 'Andhra Pradesh',
    stateCode: 'AP',
    district: 'Palnadu',
    city: 'Kondaveedu',
    location: 'Kondaveedu Hill range, 25 km from Guntur',
    address: 'Kondaveedu Fort Hilltop, Yadlapadu Mandal, Palnadu District, Andhra Pradesh - 522549',
    description: 'An impregnable medieval mountain fortress perched 1,700 feet above sea level, founded in 1323 CE as the capital of the Reddi Kingdom, celebrated for its 21 formidable stone bastions, royal stepwells (Kathula Baavi), and scenic 5.1-km ghat road.',
    historicalBackground: 'Constructed by the Reddi kings following the collapse of the Kakatiya Empire. Flourished as a vibrant center of Telugu literature, arts, and military engineering under Prolaya Vema Reddi and Kumaragiri Reddi, before falling to the Vijayanagara Empire under Sri Krishnadevaraya in 1515 CE.',
    establishmentPeriod: '1323 CE (14th Century CE)',
    historicalPeriod: 'Medieval Era (14th – 16th Century CE)',
    timeline: [
      { period: '1323 CE', event: 'Reddi kings establish royal hilltop capital at Kondaveedu.' },
      { period: '1353–1424 CE', event: 'Golden age of Telugu literature under Srinatha and royal Reddi courts.' },
      { period: '1515 CE', event: 'Emperor Sri Krishnadevaraya captures the citadel after an eight-month siege.' },
      { period: '2020 CE', event: 'AP Tourism completes world-class 5.1-km winding panoramic hill ghat road.' }
    ],
    dynasty: 'Reddi Dynasty of Kondaveedu, Vijayanagara Empire, French East India Company',
    historicalRulers: 'Prolaya Vema Reddi, Anavema Reddi, Kumaragiri Reddi, Sri Krishnadevaraya',
    culturalImportance: 'Immortalized as the royal court of Maha Kavi Srinatha (author of Haravilasa), who held the coveted title of "Kavi Sarvabhauma" here.',
    archaeologicalImportance: 'State protected monument encompassing massive stone curtain walls, 21 bastions, the historic Kathula Baavi (well of swords), residential palace foundations, and ancient reservoirs.',
    architecture: 'High Medieval Hill Fortress Architecture constructed of polygonal granite blocks without mortar on sheer cliff drops.',
    architecturalStyle: 'Medieval Dravidian Military Architecture',
    unescoStatus: 'State Protected Monument',
    unescoListed: false,
    deityDetails: {
      hasReligiousSignificance: true,
      mainDeity: 'Lord Gopinatha Swamy & Lord Ramalingeswara Swamy',
      associatedDeities: ['Lord Anjaneya', 'Goddess Lakshmi'],
      religiousSignificance: 'Site of historic hilltop temples where royal Reddi kings offered prayer before military campaigns.',
      mythology: 'Sacred mountain ponds believed to possess medicinal minerals from rare herbal hills.',
      worshipPractices: 'Devotional visits to newly restored Gopinatha Swamy temple and Dargah.'
    },
    rituals: {
      daily: ['Ghat road and fort gates open daily for tourists and pilgrims.'],
      poojaSchedule: 'Open daily: 09:00 AM to 05:30 PM.',
      specialCeremonies: 'Kondaveedu Fest cultural symposiums on Reddi dynasty history.',
      festivals: 'Kondaveedu Fort Festival, Maha Shivaratri, Karthika Masam'
    },
    visitorInformation: {
      bestTimeToVisit: 'October to February (breezy hilltop weather with sweeping plains view)',
      openingTime: '09:00 AM',
      closingTime: '05:30 PM',
      timings: '09:00 AM – 05:30 PM (Daily)',
      entryFees: 'Ghat Road Toll: Car ₹100, Two-Wheeler ₹30; Fort Entry: Free',
      ticketBooking: 'Toll tickets available at the base of the ghat road',
      guidelines: 'Drive carefully on winding hairpin curves; stay on designated viewing decks; carry trash back down',
      photography: 'Permitted across all viewpoints, ramparts, and historic palace ruins',
      dressCode: 'Comfortable clothing and sturdy sneakers for walking among stone structures',
      restrictions: 'Vehicles must depart hilltop by 05:30 PM; no night stays allowed',
      accessibility: 'Directly reachable by motorable road all the way to hilltop palace plateau',
      visitingDuration: '3 to 4 hours'
    },
    coordinates: { lat: 16.2570, lng: 80.2600 },
    latitude: 16.2570,
    longitude: 80.2600,
    googleMapsUrl: 'https://maps.google.com/?q=16.2570,80.2600',
    mapsUrl: 'https://maps.google.com/?q=16.2570,80.2600',
    nearbyFacilities: {
      hotels: 'Hotels in Chilakaluripet (12 km) and Guntur City (25 km), Hotel Geetha Regency Guntur',
      guestHouses: 'AP Tourism Haritha guest house facilities, Guntur circuit houses',
      restaurants: 'Hilltop refreshment canteen, famous spicy Andhra restaurants in Guntur and Chilakaluripet',
      parking: true,
      drinkingWater: true,
      restrooms: true,
      touristCentres: 'Kondaveedu Fort Development Society Information Counter at Hilltop',
      nearbyAttractions: ['Kotappakonda Temple (24 km)', 'Amaravati (48 km)', 'Undavalli Caves (42 km)', 'Mangalagiri (40 km)']
    },
    transportInformation: {
      nearestRailway: 'Guntur Junction (GNT) – 25 km; Narasaraopet (NRT) – 28 km',
      nearestAirport: 'Vijayawada International Airport (VGA) – 75 km',
      nearestBus: 'Yadlapadu Bus Stop on NH-16 – 6 km; Guntur RTC Central Bus Station – 25 km',
      roadConnectivity: 'Connected via scenic 5.1-km ghat road off National Highway 16 (Chennai–Kolkata Highway)',
      localTransport: 'Private cabs from Guntur, auto-rickshaws from Yadlapadu, and tourist coaches'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Kondaveedu_Fort_Ghat_Road.jpg/800px-Kondaveedu_Fort_Ghat_Road.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Kondaveedu_Fort_Ghat_Road.jpg/800px-Kondaveedu_Fort_Ghat_Road.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Kondaveedu_Fort_Ramparts.jpg/800px-Kondaveedu_Fort_Ramparts.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Kathula_Baavi_Kondaveedu.jpg/800px-Kathula_Baavi_Kondaveedu.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Kondaveedu_Fort_Ghat_Road.jpg/800px-Kondaveedu_Fort_Ghat_Road.jpg', caption: 'The panoramic 5.1-km winding ghat road leading up to Kondaveedu citadel', category: 'Landscape' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Kondaveedu_Fort_Ramparts.jpg/800px-Kondaveedu_Fort_Ramparts.jpg', caption: 'Formidable medieval cyclopean stone battlements overlooking Palnadu', category: 'Fortifications' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Kathula_Baavi_Kondaveedu.jpg/800px-Kathula_Baavi_Kondaveedu.jpg', caption: 'The historic Kathula Baavi (Well of Swords) stepwell', category: 'Ancient Wells' }
    ],
    festivals: [
      { name: 'Kondaveedu Fort Heritage Fest', month: 'February', description: 'State government cultural celebration showcasing Reddi history, poetry recitations, and paragliding exhibitions.', isAnnual: true }
    ],
    featured: false,
    isPopular: true,
    popularity: 89,
    averageRating: 4.7,
    reviewCount: 28
  },

  // 14. Konda Reddy Buruju / Konda Reddy Fort
  {
    name: 'Konda Reddy Buruju / Konda Reddy Fort',
    altName: 'Historic Bastion & Watchtower of Kurnool',
    altNames: ['Konda Reddy Buruju', 'Kurnool Fort Tower', 'Konda Reddy Bastion'],
    category: 'Forts & Palaces',
    state: 'Andhra Pradesh',
    stateCode: 'AP',
    district: 'Kurnool',
    city: 'Kurnool',
    location: 'Heart of Kurnool old city, Raj Vihar Center',
    address: 'Old Bus Stand Road, Near Raj Vihar Center, Kurnool, Andhra Pradesh - 518001',
    description: 'An iconic multi-tiered circular stone bastion and military observation tower erected in the 16th century during the Vijayanagara Empire, named in honor of the legendary Telugu chieftain Konda Reddy who was imprisoned here and made a daring escape.',
    historicalBackground: 'Constructed by Achyuta Deva Raya (1529–1542 CE) of the Vijayanagara Empire as the primary defense bastion of Kurnool citadel. In the 17th century, the valiant chieftain of Alampur, Konda Reddy, resisted the Nawab of Kurnool and was held captive in the underground dungeon of this bastion.',
    establishmentPeriod: 'c. 1530 CE (16th Century CE)',
    historicalPeriod: 'Vijayanagara & Nawab Era (16th – 18th Century CE)',
    timeline: [
      { period: '1530 CE', event: 'Achyuta Deva Raya constructs the circular bastion and tunnel network.' },
      { period: '17th Century CE', event: 'Chieftain Konda Reddy imprisoned in the bastion; escapes through underground tunnel.' },
      { period: '1900s CE', event: 'Preserved as the prime historical symbol and emblem of Kurnool city.' }
    ],
    dynasty: 'Vijayanagara Empire & Nawabs of Kurnool',
    historicalRulers: 'Achyuta Deva Raya, Konda Reddy, Nawabs of Kurnool',
    culturalImportance: 'The proud cultural landmark of Rayalaseema, featured prominently in regional literature, cinema, and historical folklore celebrating unyielding courage.',
    archaeologicalImportance: 'State protected monument featuring three circular stone tiers, an underground dungeon chamber, gun embrasures, and panoramic observation platforms over the city.',
    architecture: 'Military Bastion Architecture constructed of dressed sandstone and granite with defensive parapets and a subterranean passage.',
    architecturalStyle: 'Vijayanagara Military Bastion Style',
    unescoStatus: 'State Protected Monument',
    unescoListed: false,
    deityDetails: {
      hasReligiousSignificance: false,
      mainDeity: 'Information not currently available (Military Bastion)',
      associatedDeities: [],
      religiousSignificance: 'Secular military fortification commemorating the bravery of warrior Konda Reddy.',
      mythology: 'Folklore speaks of a secret underground tunnel leading from the bastion directly to Alampur across the river.',
      worshipPractices: 'Historical monument.'
    },
    rituals: {
      daily: ['Illuminated with decorative lights every evening.'],
      poojaSchedule: 'Open for visitors daily: 09:00 AM to 06:00 PM.',
      specialCeremonies: 'Independence Day and Republic Day ceremonial flag hoisting.',
      festivals: 'Ugadi, Kurnool Heritage Days'
    },
    visitorInformation: {
      bestTimeToVisit: 'October to February',
      openingTime: '09:00 AM',
      closingTime: '06:00 PM',
      timings: '09:00 AM – 06:00 PM (Daily)',
      entryFees: 'Free Entry for all visitors',
      ticketBooking: 'No ticket required',
      guidelines: 'Climb spiral staircase carefully; do not lean over parapet railings; keep premises clean',
      photography: 'Permitted across all tiers of the bastion',
      dressCode: 'Casual comfortable attire',
      restrictions: 'Do not write on historic stone walls',
      accessibility: 'Ground level surrounding park is accessible; tower climb involves spiral stone stairs',
      visitingDuration: '45 minutes to 1.5 hours'
    },
    coordinates: { lat: 15.8281, lng: 78.0373 },
    latitude: 15.8281,
    longitude: 78.0373,
    googleMapsUrl: 'https://maps.google.com/?q=15.8281,78.0373',
    mapsUrl: 'https://maps.google.com/?q=15.8281,78.0373',
    nearbyFacilities: {
      hotels: 'Mourya Inn (1 km), Hotel DVR Mansion, Triguna Clarks Inn Kurnool, Sasya Deluxe',
      guestHouses: 'AP Tourism Haritha Hotel Kurnool, Government Circuit House',
      restaurants: 'Popular restaurants nearby serving Rayalaseema meals, street food, and biryani',
      parking: true,
      drinkingWater: true,
      restrooms: true,
      touristCentres: 'District Tourism Promotion Council (DTPC) Kurnool',
      nearbyAttractions: ['Tomb of Abdul Wahab (2 km)', 'Tungabhadra River Ghats (1.5 km)', 'Orvakal Rock Garden (22 km)', 'Alampur (25 km)']
    },
    transportInformation: {
      nearestRailway: 'Kurnool City Railway Station (KRNT) – 2 km',
      nearestAirport: 'Kurnool Airport (KJB) at Orvakal – 18 km; Hyderabad Airport (HYD) – 190 km',
      nearestBus: 'Kurnool Old Bus Stand – 300 m; Central Bus Stand – 1.5 km',
      roadConnectivity: 'Located centrally in Kurnool city along main arterial avenues off NH-44',
      localTransport: 'City auto-rickshaws and local taxis available 24 hours'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Konda_Reddy_Buruju_Kurnool.jpg/800px-Konda_Reddy_Buruju_Kurnool.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Konda_Reddy_Buruju_Kurnool.jpg/800px-Konda_Reddy_Buruju_Kurnool.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Konda_Reddy_Buruju_Night.jpg/800px-Konda_Reddy_Buruju_Night.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Tomb_of_Abdul_Wahab_Kurnool.jpg/800px-Tomb_of_Abdul_Wahab_Kurnool.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Konda_Reddy_Buruju_Kurnool.jpg/800px-Konda_Reddy_Buruju_Kurnool.jpg', caption: 'The majestic multi-tiered bastion standing proudly in central Kurnool', category: 'Bastion' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Konda_Reddy_Buruju_Night.jpg/800px-Konda_Reddy_Buruju_Night.jpg', caption: 'Vibrant evening architectural lighting at Konda Reddy Buruju', category: 'Illumination' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Tomb_of_Abdul_Wahab_Kurnool.jpg/800px-Tomb_of_Abdul_Wahab_Kurnool.jpg', caption: 'Nearby 17th-century Gol Gumbaz tomb of Nawab Abdul Wahab Khan', category: 'Nearby Heritage' }
    ],
    festivals: [
      { name: 'Kurnool City Heritage Day', month: 'November', description: 'Heritage walks, photography contests, and illumination celebrations at the bastion.', isAnnual: true }
    ],
    featured: false,
    isPopular: true,
    popularity: 92,
    averageRating: 4.8,
    reviewCount: 35
  },

  // 15. Gooty Fort
  {
    name: 'Gooty Fort',
    altName: 'Shell-Shaped Mountain Fortress of Morari Rao',
    altNames: ['Gouthampuri Fort', 'Gooty Hill Fort', 'Ravalakonda Fort'],
    category: 'Forts & Palaces',
    state: 'Andhra Pradesh',
    stateCode: 'AP',
    district: 'Anantapur',
    city: 'Gooty',
    location: 'Gooty isolated granite monolith hill, 50 km from Anantapur',
    address: 'Gooty Fort Hill, Gooty, Anantapur District, Andhra Pradesh - 515401',
    description: 'One of the oldest and most formidable hill fortresses in Andhra Pradesh, rising 1,000 feet above the surrounding plains in a unique shell-shaped structure fortified by 15 concentric gateways, ancient reservoirs, and a dizzying cliff-top pavilion.',
    historicalBackground: 'Epigraphical records refer to it as "Gadharasani" in 7th-century Western Chalukya inscriptions. Ruled successively by the Chalukyas, Vijayanagara monarchs, the Maratha warrior Morari Rao Ghorpade (who ruled from 1746 to 1775 CE), Hyder Ali, and the British under Sir Thomas Munro.',
    establishmentPeriod: 'c. 7th Century CE (Fortified 16th–18th Century CE)',
    historicalPeriod: 'Medieval Era (7th – 18th Century CE)',
    timeline: [
      { period: 'c. 7th Century CE', event: 'Inscriptions mention Gouthampuri stronghold under Western Chalukyas.' },
      { period: '1509–1565 CE', event: 'Vijayanagara Empire bolsters 15 concentric gateways.' },
      { period: '1746–1775 CE', event: 'Maratha ruler Morari Rao Ghorpade makes Gooty his imperial seat.' },
      { period: '1799 CE', event: 'British East India Company garrisons fort post-Srirangapatna.' }
    ],
    dynasty: 'Western Chalukyas, Vijayanagara Empire, Maratha Ghorpade Dynasty',
    historicalRulers: 'Vikramaditya VI, Sri Krishnadevaraya, Morari Rao Ghorpade, Sir Thomas Munro',
    culturalImportance: 'Celebrated for the cliff-top "Morari Rao Pavilion" offering a 360-degree bird’s eye panorama where the Maratha king played chess while surveying the plains.',
    archaeologicalImportance: 'ASI Monument of National Importance featuring 15 concentric wall rings, rock-cut water cisterns, royal granaries, the Nageswara Swamy temple, and the tomb of Sir Thomas Munro.',
    architecture: 'Shell-like defensive hill architecture utilizing natural granite precipices, crenelated ramparts, and serpentine stone pathways.',
    architecturalStyle: 'Medieval Chalukyan & Maratha Hill Fort Architecture',
    unescoStatus: 'ASI Monument of National Importance',
    unescoListed: false,
    deityDetails: {
      hasReligiousSignificance: true,
      mainDeity: 'Lord Nageswara Swamy & Lord Lakshminarasimha',
      associatedDeities: ['Lord Ganesha', 'Goddess Parvati'],
      religiousSignificance: 'Ancient Shaivite rock shrines constructed atop the summit by early Chalukya kings.',
      mythology: 'Sage Gautama is said to have performed penance here, lending the ancient name Gouthampuri.',
      worshipPractices: 'Historical monument with active prayer at hill base shrines.'
    },
    rituals: {
      daily: ['Fort open for historical trekking from sunrise to sunset.'],
      poojaSchedule: 'Open daily: 06:00 AM to 06:00 PM.',
      specialCeremonies: 'Maha Shivaratri night gatherings at Nageswara Swamy shrine.',
      festivals: 'Maha Shivaratri, Gooty Heritage Walks'
    },
    visitorInformation: {
      bestTimeToVisit: 'October to February (early mornings are best for the summit hike)',
      openingTime: '06:00 AM',
      closingTime: '06:00 PM',
      timings: '06:00 AM – 06:00 PM (Daily)',
      entryFees: 'Free Entry for all visitors',
      ticketBooking: 'No ticket required',
      guidelines: 'Moderate trek involving over 500 stone steps; carry sufficient drinking water; wear cap and sunglasses',
      photography: 'Permitted across all gateways, ramparts, and the Morari Rao pavilion',
      dressCode: 'Light trekking attire and high-traction sports shoes',
      restrictions: 'Do not hike without flashlight if visiting near dusk; no glass bottles permitted',
      accessibility: 'Requires physical walking and stair climbing to reach upper citadel',
      visitingDuration: '2.5 to 4 hours'
    },
    coordinates: { lat: 15.1167, lng: 77.6333 },
    latitude: 15.1167,
    longitude: 77.6333,
    googleMapsUrl: 'https://maps.google.com/?q=15.1167,77.6333',
    mapsUrl: 'https://maps.google.com/?q=15.1167,77.6333',
    nearbyFacilities: {
      hotels: 'Hotel Sri Balaji Gooty, lodges near Gooty railway station; luxury hotels in Anantapur (50 km)',
      guestHouses: 'Railway Retiring Rooms at Gooty Junction, government inspection bungalows',
      restaurants: 'Local restaurants in Gooty town serving piping hot South Indian tiffins and Rayalaseema meals',
      parking: true,
      drinkingWater: true,
      restrooms: true,
      touristCentres: 'ASI Caretaker Office at lower fort entrance',
      nearbyAttractions: ['Belum Caves (55 km)', 'Tadipatri Temples (60 km)', 'Alur (45 km)', 'Guntakal (28 km)']
    },
    transportInformation: {
      nearestRailway: 'Gooty Junction (GY) – 3 km (major historic railway junction connecting Mumbai, Chennai, and Bengaluru)',
      nearestAirport: 'Kurnool Airport (KJB) – 70 km; Bengaluru International Airport (BLR) – 240 km',
      nearestBus: 'Gooty APSRTC Bus Stand – 1 km; situated directly on the NH-44 highway',
      roadConnectivity: 'Located directly along National Highway 44 (Bengaluru–Hyderabad Highway)',
      localTransport: 'Auto-rickshaws from Gooty Junction and town center readily available'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Gooty_Fort_Hilltop_View.jpg/800px-Gooty_Fort_Hilltop_View.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Gooty_Fort_Hilltop_View.jpg/800px-Gooty_Fort_Hilltop_View.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Gooty_Fort_Stone_Ramparts.jpg/800px-Gooty_Fort_Stone_Ramparts.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Gooty_Fort_Gateway.jpg/800px-Gooty_Fort_Gateway.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Gooty_Fort_Hilltop_View.jpg/800px-Gooty_Fort_Hilltop_View.jpg', caption: 'The soaring shell-shaped hill citadel rising dramatically above Gooty', category: 'Citadel' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Gooty_Fort_Stone_Ramparts.jpg/800px-Gooty_Fort_Stone_Ramparts.jpg', caption: 'The 15 concentric stone fortification walls spanning the rocky ridge', category: 'Fortifications' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Gooty_Fort_Gateway.jpg/800px-Gooty_Fort_Gateway.jpg', caption: 'One of the massive medieval arched stone gateways leading to the summit', category: 'Gateways' }
    ],
    festivals: [
      { name: 'Gooty Fort Trekking & Heritage Day', month: 'January', description: 'Annual adventure tourism trek, photography camps, and heritage walks.', isAnnual: true }
    ],
    featured: false,
    isPopular: false,
    popularity: 81,
    averageRating: 4.6,
    reviewCount: 19
  },

  // 16. Rayadurgam Fort
  {
    name: 'Rayadurgam Fort',
    altName: 'Medieval Hill Citadel of the Vijayanagara Nayakas',
    altNames: ['Rayadurg Fort', 'Raja Durgam', 'Rayadurg Citadel'],
    category: 'Forts & Palaces',
    state: 'Andhra Pradesh',
    stateCode: 'AP',
    district: 'Anantapur',
    city: 'Rayadurgam',
    location: 'Rayadurgam Hill, 98 km from Anantapur',
    address: 'Rayadurgam Fort Hill, Rayadurgam, Anantapur District, Andhra Pradesh - 515865',
    description: 'A historic medieval hill fortress rising to 2,727 feet above sea level, constructed during the Vijayanagara Empire by Janga Nayaka, renowned for its ancient Rasasiddha rock carvings, the Venugopala Swamy temple, and monumental defensive gateways.',
    historicalBackground: 'Founded by Janga Nayaka, a feudatory chieftain under Vijayanagara Emperor Achyuta Deva Raya in the 16th century. Held by the Bedar Nayakas of Chitradurga, the fort played a vital defensive role on the Karnataka-Andhra frontier before passing to Tipu Sultan and the British.',
    establishmentPeriod: 'c. 16th Century CE',
    historicalPeriod: 'Vijayanagara & Nayaka Era (16th – 18th Century CE)',
    timeline: [
      { period: '16th Century CE', event: 'Janga Nayaka constructs the granite mountain fortification and temple.' },
      { period: '17th Century CE', event: 'Bedar Nayakas expand the defensive stone walls and subterranean grain vaults.' },
      { period: '1780 CE', event: 'Hyder Ali and Tipu Sultan garrison fort.' },
      { period: '1799 CE', event: 'Annexed by the British following the Fourth Anglo-Mysore War.' }
    ],
    dynasty: 'Vijayanagara Empire, Bedar Nayakas of Rayadurgam',
    historicalRulers: 'Janga Nayaka, Achyuta Deva Raya, Timma Nayaka, Tipu Sultan',
    culturalImportance: 'Renowned for the mystical "Rasasiddha Sulige" — ancient rock sculptures and natural rock caverns where medieval alchemists and siddha saints practiced spiritual sadhana.',
    archaeologicalImportance: 'State protected monument featuring the ruined Venugopala Swamy, Prasanna Venkateswara, and Jambukeswara temples, massive stone bastions, and the Queens’ bath.',
    architecture: 'Vijayanagara Military Hill Architecture utilizing natural granite boulder slopes and fortified gateways.',
    architecturalStyle: 'Vijayanagara Military & Temple Architecture',
    unescoStatus: 'State Protected Monument',
    unescoListed: false,
    deityDetails: {
      hasReligiousSignificance: true,
      mainDeity: 'Lord Venugopala Swamy & Lord Prasanna Venkateswara',
      associatedDeities: ['Lord Ganesha', 'Goddess Lakshmi'],
      religiousSignificance: 'Sacred hilltop Vaishnava temples with intricately carved pillars portraying Krishna Leela.',
      mythology: 'Siddha purushas are believed to have attained immortality and alchemical wisdom in the hilltop caves.',
      worshipPractices: 'Daily pooja at Venugopala Swamy temple in the lower fort area.'
    },
    rituals: {
      daily: ['Hill fort open for visitors from morning to evening.'],
      poojaSchedule: 'Daily visitor hours: 07:00 AM to 05:30 PM.',
      specialCeremonies: 'Janmashtami and Vaikunta Ekadasi poojas.',
      festivals: 'Gokulashtami, Vaikunta Ekadasi, Rayadurgam Utsav'
    },
    visitorInformation: {
      bestTimeToVisit: 'October to February',
      openingTime: '07:00 AM',
      closingTime: '05:30 PM',
      timings: '07:00 AM – 05:30 PM (Daily)',
      entryFees: 'Free Entry for all visitors',
      ticketBooking: 'No ticket required',
      guidelines: 'Moderate hill climb; carry water and sun hat; watch for monkeys near temple ruins',
      photography: 'Permitted across all fort structures and rock reliefs',
      dressCode: 'Comfortable trekking clothing and sneakers',
      restrictions: 'Descend before dark; do not enter unexplored deep crevices',
      accessibility: 'Involves moderate stone stair climbing',
      visitingDuration: '2 to 3 hours'
    },
    coordinates: { lat: 14.7000, lng: 76.8500 },
    latitude: 14.7000,
    longitude: 76.8500,
    googleMapsUrl: 'https://maps.google.com/?q=14.7000,76.8500',
    mapsUrl: 'https://maps.google.com/?q=14.7000,76.8500',
    nearbyFacilities: {
      hotels: 'Local lodges in Rayadurgam; star hotels in Ballari (50 km) or Anantapur (98 km)',
      guestHouses: 'Government guest houses in Rayadurgam',
      restaurants: 'Local restaurants in Rayadurgam town serving South Indian tiffins and meals',
      parking: true,
      drinkingWater: true,
      restrooms: true,
      touristCentres: 'Rayadurgam Municipality Tourist Office',
      nearbyAttractions: ['Ballari Fort (50 km)', 'Kalyandurg (45 km)', 'Hemavathi (65 km)', 'Hampi (110 km)']
    },
    transportInformation: {
      nearestRailway: 'Rayadurg Railway Station (RDG) – 3 km (connected to Ballari and Bengaluru lines)',
      nearestAirport: 'Jindal Vijayanagar Airport Vidyanagar (VDY) – 80 km; Bengaluru Airport – 250 km',
      nearestBus: 'Rayadurgam APSRTC Bus Stand – 1.5 km; regular buses to Ballari, Anantapur, and Kalyandurg',
      roadConnectivity: 'Located on State Highway 44 connecting Anantapur with Ballari (Karnataka)',
      localTransport: 'Auto-rickshaws readily available from town center and railway station'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Rayadurgam_Fort_View.jpg/800px-Rayadurgam_Fort_View.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Rayadurgam_Fort_View.jpg/800px-Rayadurgam_Fort_View.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Rayadurgam_Venugopala_Temple.jpg/800px-Rayadurgam_Venugopala_Temple.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Rayadurgam_Rock_Carvings.jpg/800px-Rayadurgam_Rock_Carvings.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Rayadurgam_Fort_View.jpg/800px-Rayadurgam_Fort_View.jpg', caption: 'The rugged granite ridge of Rayadurgam hill fortress', category: 'Citadel' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Rayadurgam_Venugopala_Temple.jpg/800px-Rayadurgam_Venugopala_Temple.jpg', caption: 'The ancient sculpted Venugopala Swamy temple in the fort', category: 'Architecture' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Rayadurgam_Rock_Carvings.jpg/800px-Rayadurgam_Rock_Carvings.jpg', caption: 'Ancient Rasasiddha mystical alchemical rock relief carvings', category: 'Carvings' }
    ],
    festivals: [
      { name: 'Sri Krishna Janmashtami at Rayadurgam', month: 'August / September', description: 'Traditional temple festivities, special alankaram, and chariot procession in the old town.', isAnnual: true }
    ],
    featured: false,
    isPopular: false,
    popularity: 78,
    averageRating: 4.5,
    reviewCount: 16
  },

  // 17. Hemavathi
  {
    name: 'Hemavathi',
    altName: 'Ancient Imperial Capital of the Nolamba Pallava Dynasty',
    altNames: ['Henjeru', 'Hemavathi Temple Complex', 'Doddeshwara Temple Hemavathi'],
    category: 'Archaeological Sites',
    state: 'Andhra Pradesh',
    stateCode: 'AP',
    district: 'Sri Sathya Sai',
    city: 'Hemavathi',
    location: 'Amarapuram Mandal, on Karnataka-Andhra border',
    address: 'Hemavathi Archaeological Complex, Amarapuram Mandal, Sri Sathya Sai District, Andhra Pradesh - 515281',
    description: 'The ancient capital (known as Henjeru) of the Nolamba Pallava dynasty during the 8th to 10th century CE, celebrated across South India for its Doddeshwara, Mallikarjuna, and Siddheshwara temples featuring mirror-polished black granite sculptures of unmatched craftsmanship.',
    historicalBackground: 'Henjeru flourished as the imperial seat of the Nolamba Pallavas from 750 to 975 CE. Known as master sculptors who fused Western Ganga, Pallava, and Chalukya aesthetics into the distinctive "Nolamba style", characterized by polished basalt and lyrical feminine figures.',
    establishmentPeriod: 'c. 8th–10th Century CE (Nolamba Pallava Era)',
    historicalPeriod: 'Early Medieval Era (8th – 11th Century CE)',
    timeline: [
      { period: 'c. 750 CE', event: 'Nolambas make Henjeru their imperial capital.' },
      { period: '9th–10th Century CE', event: 'Construction of the Doddeshwara, Siddheshwara, and Mallikarjuna temples.' },
      { period: '974 CE', event: 'Chola Emperor Rajaraja Chola I admires and transfers Hemavathi stone pillars to Thanjavur.' },
      { period: '1960s CE', event: 'ASI establishes on-site sculpture museum displaying master Nolamba bronzes and stone panels.' }
    ],
    dynasty: 'Nolamba Pallava Dynasty, Western Gangas, Cholas',
    historicalRulers: 'King Mahendra I, Ayyapadeva, Dilipa, Vira Mahendra Nolambadhiraja',
    culturalImportance: 'Renowned as the pinnacle of Nolamba artistic genius, so admired by Chola conquerors that they dismantled and transported Hemavathi pillars as war trophies to enrich the Brihadisvara Temple at Thanjavur.',
    archaeologicalImportance: 'Centrally protected ASI monument complex and sculpture shed featuring mirror-polished black stone Nataraja images, Sapta Matrikas, Surya images, and an 8-foot monolithic Nandi bull.',
    architecture: 'Nolamba Dravidian Temple Architecture featuring hyper-detailed polished granite friezes, ceiling lotuses, and sculpted perforated stone jali windows.',
    architecturalStyle: 'Nolamba Pallava Dravidian Style',
    unescoStatus: 'ASI Monument of National Importance',
    unescoListed: false,
    deityDetails: {
      hasReligiousSignificance: true,
      mainDeity: 'Lord Doddeshwara Swamy & Lord Siddheshwara (Forms of Shiva)',
      associatedDeities: ['Goddess Parvati', 'Sapta Matrikas', 'Lord Surya', 'Lord Ganesha'],
      religiousSignificance: 'Sacred Shaivite teertha featuring mirror-finished Shiva Lingams and exquisite Nandi sculptures.',
      mythology: 'Consecrated by Nolamba kings seeking divine victory and prosperity for their empire.',
      worshipPractices: 'Daily Vedic rituals performed at Doddeshwara Swamy temple.'
    },
    rituals: {
      daily: ['Nitya Pooja & Abhishekam (07:00 AM)', 'Maha Mangala Harathi (12:00 PM & 06:00 PM)'],
      poojaSchedule: 'Open daily: 06:30 AM to 06:30 PM; ASI sculpture shed: 09:00 AM – 05:00 PM.',
      specialCeremonies: 'Maha Shivaratri night abhishekam with Panchamritam.',
      festivals: 'Maha Shivaratri, Karthika Somavaram, Hemavathi Utsav'
    },
    visitorInformation: {
      bestTimeToVisit: 'September to March',
      openingTime: '06:30 AM',
      closingTime: '06:30 PM',
      timings: '06:30 AM – 06:30 PM (Daily)',
      entryFees: 'Free Entry to all temples and ASI sculpture shed',
      ticketBooking: 'No ticket required',
      guidelines: 'Remove footwear before entering temple mandapams; do not touch fragile ancient museum sculptures',
      photography: 'Permitted in temple courtyards and grounds',
      dressCode: 'Modest respectful attire recommended',
      restrictions: 'Touching black stone sculptures in the ASI shed prohibited',
      accessibility: 'Ground level paved courtyards accessible for visitors',
      visitingDuration: '1.5 to 2.5 hours'
    },
    coordinates: { lat: 14.1333, lng: 76.9667 },
    latitude: 14.1333,
    longitude: 76.9667,
    googleMapsUrl: 'https://maps.google.com/?q=14.1333,76.9667',
    mapsUrl: 'https://maps.google.com/?q=14.1333,76.9667',
    nearbyFacilities: {
      hotels: 'Lodges in Madhugiri (35 km) or Sira (30 km); luxury stay at Bengaluru (140 km) or Hindupur (70 km)',
      guestHouses: 'Temple Devasthanam rooms at Hemavathi',
      restaurants: 'Small South Indian eateries in Hemavathi village serving hot dosas and meals',
      parking: true,
      drinkingWater: true,
      restrooms: true,
      touristCentres: 'ASI Caretaker Office and Museum Shed at Doddeshwara Temple',
      nearbyAttractions: ['Lepakshi (68 km)', 'Penukonda Fort (72 km)', 'Madhugiri Monolith (35 km)', 'Sira Fort (30 km)']
    },
    transportInformation: {
      nearestRailway: 'Hindupur Railway Station (HUP) – 68 km; Madhugiri (Karnataka) – 35 km',
      nearestAirport: 'Kempegowda International Airport Bengaluru (BLR) – 145 km',
      nearestBus: 'Hemavathi Bus Stand – 300 m; connected by rural buses from Amarapuram, Madhugiri, and Hindupur',
      roadConnectivity: 'Accessible via State Highway via Amarapuram on the Andhra-Karnataka border',
      localTransport: 'Local shared autos and state RTC buses from Madhugiri and Amarapuram'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Doddeshwara_Temple_Hemavathi.jpg/800px-Doddeshwara_Temple_Hemavathi.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Doddeshwara_Temple_Hemavathi.jpg/800px-Doddeshwara_Temple_Hemavathi.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Hemavathi_Nandi_Sculpture.jpg/800px-Hemavathi_Nandi_Sculpture.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Hemavathi_ASI_Sculpture_Museum.jpg/800px-Hemavathi_ASI_Sculpture_Museum.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Doddeshwara_Temple_Hemavathi.jpg/800px-Doddeshwara_Temple_Hemavathi.jpg', caption: 'The ancient Doddeshwara temple complex at Hemavathi', category: 'Architecture' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Hemavathi_Nandi_Sculpture.jpg/800px-Hemavathi_Nandi_Sculpture.jpg', caption: 'The celebrated mirror-polished black granite monolithic Nandi', category: 'Sculptures' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Hemavathi_ASI_Sculpture_Museum.jpg/800px-Hemavathi_ASI_Sculpture_Museum.jpg', caption: 'Masterpiece Nolamba stone carvings in the ASI site museum', category: 'Museum' }
    ],
    festivals: [
      { name: 'Hemavathi Maha Shivaratri', month: 'February / March', description: 'Ancient annual temple car procession and night-long devotional music honoring Doddeshwara.', isAnnual: true }
    ],
    featured: false,
    isPopular: false,
    popularity: 80,
    averageRating: 4.6,
    reviewCount: 18
  },

  // 18. Adoni Fort
  {
    name: 'Adoni Fort',
    altName: 'One of the Largest Mountain Strongholds of the Deccan',
    altNames: ['Adavani Fort', 'Adoni Killa', 'Adoni Granite Citadel'],
    category: 'Forts & Palaces',
    state: 'Andhra Pradesh',
    stateCode: 'AP',
    district: 'Kurnool',
    city: 'Adoni',
    location: 'Adoni Hill range, 95 km west of Kurnool',
    address: 'Adoni Fort Hills, Adoni, Kurnool District, Andhra Pradesh - 518301',
    description: 'One of the most colossal medieval granite hill fortresses in the Deccan with an expansive defensive perimeter of over 12 kilometers across multiple hillocks, renowned for its Jamia Masjid, the Malik Rahman Dargah, and natural rock water reservoirs.',
    historicalBackground: 'Founded by the Yadavas of Deogiri in the 12th century, Adoni rose to premier strategic prominence under the Vijayanagara Empire as a northern bastion. In 1568 CE, it was annexed by the Bijapur Sultanate under Sidi Masud, who served as governor and built the magnificent Jamia Masjid.',
    establishmentPeriod: 'c. 12th Century CE (Enlarged 16th–17th Century CE)',
    historicalPeriod: 'Medieval Era (12th – 18th Century CE)',
    timeline: [
      { period: '12th Century CE', event: 'Founded by Yadava kings as Adavani hill stronghold.' },
      { period: '1365–1565 CE', event: 'Key northern frontier fortress of the Vijayanagara Empire.' },
      { period: '1668 CE', event: 'Bijapur Governor Sidi Masud constructs the grand Jamia Masjid.' },
      { period: '1786 CE', event: 'Tipu Sultan captures fort after heavy artillery bombardment.' },
      { period: '1799 CE', event: 'Ceded to the British East India Company.' }
    ],
    dynasty: 'Yadavas of Devagiri, Vijayanagara Empire, Bijapur Sultanate, Mysore Kingdom',
    historicalRulers: 'Ramachandra of Devagiri, Aliya Rama Raya, Sidi Masud, Tipu Sultan',
    culturalImportance: 'A symbol of medieval Deccan military syncretism blending Hindu hill bastions, Persian inscriptions, and Deccan Sultanate architecture.',
    archaeologicalImportance: 'ASI Monument featuring 12 km of stone ramparts across 5 granite peaks, deep rock-cut tanks (Singara Sarovaram), granaries, the historic Jamia Masjid, and cannon batteries.',
    architecture: 'Composite Medieval Deccan Military and Indo-Islamic Architecture utilizing natural granite boulder precipices.',
    architecturalStyle: 'Medieval Deccan Fort & Indo-Islamic Architecture',
    unescoStatus: 'ASI Protected Monument',
    unescoListed: false,
    deityDetails: {
      hasReligiousSignificance: true,
      mainDeity: 'Lord Ranganatha Swamy & Hazrat Malik Rahman Dargah',
      associatedDeities: ['Lord Anjaneya'],
      religiousSignificance: 'Sacred hill featuring ancient cave temples alongside the venerated hill shrine of Hazrat Malik Rahman.',
      mythology: 'Kings sought divine protection from the hilltop deity against invading cavalry.',
      worshipPractices: 'Devotional visits to Ranganatha temple and annual Urs at Malik Rahman Dargah.'
    },
    rituals: {
      daily: ['Fort open for trekking and visits daily.'],
      poojaSchedule: 'Open daily: 07:00 AM to 06:00 PM.',
      specialCeremonies: 'Annual Urs of Hazrat Malik Rahman and Hanuman Jayanti.',
      festivals: 'Urs Celebrations, Maha Shivaratri, Eid'
    },
    visitorInformation: {
      bestTimeToVisit: 'October to February (early morning climbs recommended)',
      openingTime: '07:00 AM',
      closingTime: '06:00 PM',
      timings: '07:00 AM – 06:00 PM (Daily)',
      entryFees: 'Free Entry for all visitors',
      ticketBooking: 'No ticket required',
      guidelines: 'Strenuous hike up granite boulders; wear proper trekking shoes; carry at least 2 liters of water; beware of heat',
      photography: 'Permitted across all fort battlements and historic monuments',
      dressCode: 'Comfortable trekking clothing and sports shoes',
      restrictions: 'Descend before sunset; no climbing cliff edges',
      accessibility: 'Requires physical stamina and hill stair climbing',
      visitingDuration: '3 to 5 hours'
    },
    coordinates: { lat: 15.6300, lng: 77.2700 },
    latitude: 15.6300,
    longitude: 77.2700,
    googleMapsUrl: 'https://maps.google.com/?q=15.6300,77.2700',
    mapsUrl: 'https://maps.google.com/?q=15.6300,77.2700',
    nearbyFacilities: {
      hotels: 'Hotel Rajshree Adoni, Hotel MM Residency, lodges near Adoni railway station; luxury stay in Kurnool (95 km)',
      guestHouses: 'Government inspection bungalows and railway retiring rooms at Adoni',
      restaurants: 'Famous Adoni cotton-market area restaurants serving spicy Rayalaseema meals and biryani',
      parking: true,
      drinkingWater: true,
      restrooms: true,
      touristCentres: 'ASI Caretaker Office at Adoni Fort Base',
      nearbyAttractions: ['Alampur (90 km)', 'Mantralayam (52 km)', 'Yaganti (110 km)', 'Kurnool (95 km)']
    },
    transportInformation: {
      nearestRailway: 'Adoni Railway Station (AD) – 2 km (major junction on Mumbai–Chennai mainline)',
      nearestAirport: 'Jindal Vidyanagar Airport (VDY) – 85 km; Kurnool Airport (KJB) – 80 km',
      nearestBus: 'Adoni APSRTC Bus Stand – 1.5 km; regular buses to Kurnool, Hyderabad, and Bengaluru',
      roadConnectivity: 'Connected via State Highway 16 and NH-167 to Kurnool and Ballari',
      localTransport: 'City auto-rickshaws available from railway station and bus stand'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Adoni_Fort_Battlements.jpg/800px-Adoni_Fort_Battlements.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Adoni_Fort_Battlements.jpg/800px-Adoni_Fort_Battlements.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Adoni_Jamia_Masjid.jpg/800px-Adoni_Jamia_Masjid.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Adoni_Fort_Granite_Peaks.jpg/800px-Adoni_Fort_Granite_Peaks.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Adoni_Fort_Battlements.jpg/800px-Adoni_Fort_Battlements.jpg', caption: 'The imposing granite battlements spanning multiple crags at Adoni', category: 'Fortifications' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Adoni_Jamia_Masjid.jpg/800px-Adoni_Jamia_Masjid.jpg', caption: 'The 17th-century Jamia Masjid commissioned by Governor Sidi Masud', category: 'Architecture' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Adoni_Fort_Granite_Peaks.jpg/800px-Adoni_Fort_Granite_Peaks.jpg', caption: 'Panoramic view of the granite hilltops and medieval water cisterns', category: 'Landscape' }
    ],
    festivals: [
      { name: 'Adoni Urs & Heritage Fest', month: 'November / December', description: 'Annual spiritual gathering at the hill dargah and cultural celebrations in Adoni town.', isAnnual: true }
    ],
    featured: false,
    isPopular: false,
    popularity: 83,
    averageRating: 4.6,
    reviewCount: 21
  },

  // 19. Thotlakonda Buddhist Complex
  {
    name: 'Thotlakonda Buddhist Complex',
    altName: 'Coastal Hinayana Buddhist Monastery Overlooking the Bay of Bengal',
    altNames: ['Thotlakonda Monastic Complex', 'Thotlakonda Buddhist Heritage', 'Hill of Stone Troughs'],
    category: 'Buddhist Heritage',
    state: 'Andhra Pradesh',
    stateCode: 'AP',
    district: 'Visakhapatnam',
    city: 'Bheemunipatnam (near Visakhapatnam)',
    location: 'Mangamaripeta hilltop, 15 km north of Visakhapatnam',
    address: 'Thotlakonda Hill, Beach Road, Visakhapatnam District, Andhra Pradesh - 530048',
    description: 'An ancient coastal Hinayana Buddhist monastic complex perched on a 128-meter-high hill overlooking the azure waters of the Bay of Bengal, flourishing from the 2nd century BCE to the 2nd century CE as an international maritime Buddhist teaching hub.',
    historicalBackground: 'Discovered during an aerial naval reconnaissance survey in 1976 and excavated systematically by the Andhra Pradesh State Department of Archaeology from 1988 to 1993. The name "Thotlakonda" derives from numerous circular stone troughs (thotlu) carved into bedrock to harvest rainwater for resident monks.',
    establishmentPeriod: 'c. 2nd Century BCE to 2nd Century CE',
    historicalPeriod: 'Ancient Buddhist Maritime Era (3rd BCE – 3rd CE)',
    timeline: [
      { period: 'c. 200 BCE', event: 'Monastery founded on coastal hill overlooking maritime trade route.' },
      { period: '1st Century CE', event: 'Flourishes with over 100 resident monks; gold coins from Roman Empire recovered.' },
      { period: '3rd Century CE', event: 'Decline in maritime sea routes leads to peaceful abandonment.' },
      { period: '1976 CE', event: 'Indian Navy pilot spots circular stupa formations from the air.' }
    ],
    dynasty: 'Satavahana Dynasty & Maritime Buddhist Sangha',
    historicalRulers: 'Satavahana Monarchs and merchant guilds (Sarthavahas) of the Bay of Bengal',
    culturalImportance: 'A pivotal international transit point where Buddhist missionaries and merchants set sail toward Sri Lanka, Burma, and Southeast Asia, spreading the Theravada tradition.',
    archaeologicalImportance: 'Extensive archaeological complex preserving the Maha Stupa, apsidal chaityagrihas, vihara cells, a refractory dining hall (Bhojanasala), and rock-cut water cisterns.',
    architecture: 'Ancient Buddhist Monastic Architecture built of local khondalite stone, burnt bricks, and lime plaster.',
    architecturalStyle: 'Hinayana Buddhist Monastic Architecture',
    unescoStatus: 'State Protected Archaeological Monument',
    unescoListed: false,
    deityDetails: {
      hasReligiousSignificance: true,
      mainDeity: 'Gautama Buddha & Sacred Relics (Dhatu Stupa)',
      associatedDeities: ['Bodhisattvas'],
      religiousSignificance: 'Sacred monastery where the holy relics of Lord Buddha were enshrined for global veneration.',
      mythology: 'Monks practiced deep Vipassana meditation attuned to the rhythmic ocean waves below.',
      worshipPractices: 'Reverent walking along the ancient circumambulation path (pradakshinapatha).'
    },
    rituals: {
      daily: ['Monument and museum grounds open daily from morning to evening.'],
      poojaSchedule: 'Open daily: 09:00 AM to 05:30 PM.',
      specialCeremonies: 'Buddha Purnima meditation and prayer sessions conducted by international Buddhist delegations.',
      festivals: 'Buddha Purnima, Visakha Heritage Festival'
    },
    visitorInformation: {
      bestTimeToVisit: 'October to March (delightful coastal sea breeze)',
      openingTime: '09:00 AM',
      closingTime: '05:30 PM',
      timings: '09:00 AM – 05:30 PM (Daily)',
      entryFees: 'Adults: ₹20, Children: ₹10',
      ticketBooking: 'Available on-spot at entrance ticket counter',
      guidelines: 'Stay on designated brick walkways; do not sit or climb on ancient brick stupa walls; carry drinking water',
      photography: 'Permitted throughout the hilltop ruins and panoramic ocean viewpoints',
      dressCode: 'Comfortable modest clothing and walking shoes',
      restrictions: 'Do not remove or displace ancient bricks or stones',
      accessibility: 'Hilltop has motorable road access and paved pathways across the ruins',
      visitingDuration: '1.5 to 2.5 hours'
    },
    coordinates: { lat: 17.8242, lng: 83.4114 },
    latitude: 17.8242,
    longitude: 83.4114,
    googleMapsUrl: 'https://maps.google.com/?q=17.8242,83.4114',
    mapsUrl: 'https://maps.google.com/?q=17.8242,83.4114',
    nearbyFacilities: {
      hotels: 'The Bheemli Resort by Accor (8 km), Radisson Blu Visakhapatnam (10 km), Novotel Visakhapatnam Varun Beach (16 km)',
      guestHouses: 'AP Tourism Haritha Rushikonda Beach Resort (8 km)',
      restaurants: 'Seafront cafes and restaurants along Bheemili Beach Road serving seafood and Andhra meals',
      parking: true,
      drinkingWater: true,
      restrooms: true,
      touristCentres: 'Department of Archaeology & Tourism Interpretation Center at entrance',
      nearbyAttractions: ['Bavikonda Buddhist Complex (4 km)', 'Rushikonda Beach (8 km)', 'INS Kursura Submarine Museum (16 km)', 'Kailasagiri (12 km)']
    },
    transportInformation: {
      nearestRailway: 'Visakhapatnam Junction (VSKP) – 18 km',
      nearestAirport: 'Visakhapatnam International Airport (VTZ) – 26 km',
      nearestBus: 'Mangamaripeta Bus Stop on Beach Road – 1 km; city buses running between Vizag and Bheemili',
      roadConnectivity: 'Located directly off the scenic Visakhapatnam–Bheemunipatnam Marine Beach Road',
      localTransport: 'City auto-rickshaws, app cabs (Ola/Uber), and tourist rental cars from Vizag'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Thotlakonda_Maha_Stupa_Ocean_View.jpg/800px-Thotlakonda_Maha_Stupa_Ocean_View.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Thotlakonda_Maha_Stupa_Ocean_View.jpg/800px-Thotlakonda_Maha_Stupa_Ocean_View.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Thotlakonda_Chaitya_Ruins.jpg/800px-Thotlakonda_Chaitya_Ruins.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Thotlakonda_Water_Troughs.jpg/800px-Thotlakonda_Water_Troughs.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Thotlakonda_Maha_Stupa_Ocean_View.jpg/800px-Thotlakonda_Maha_Stupa_Ocean_View.jpg', caption: 'The sacred Maha Stupa ruins overlooking the turquoise Bay of Bengal', category: 'Stupa' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Thotlakonda_Chaitya_Ruins.jpg/800px-Thotlakonda_Chaitya_Ruins.jpg', caption: 'Apsidal Chaityagriha and monastic cells dating to the Satavahana era', category: 'Monastery' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Thotlakonda_Water_Troughs.jpg/800px-Thotlakonda_Water_Troughs.jpg', caption: 'Ancient rainwater harvesting rock-cut cisterns on the hill plateau', category: 'Archaeology' }
    ],
    festivals: [
      { name: 'Buddha Purnima International Gathering', month: 'May', description: 'Gathering of Buddhist monks from Southeast Asia, sacred chanting, and peace candle lighting on the ocean hill.', isAnnual: true }
    ],
    featured: true,
    isPopular: true,
    popularity: 93,
    averageRating: 4.8,
    reviewCount: 33
  },

  // 20. Bavikonda Buddhist Complex
  {
    name: 'Bavikonda Buddhist Complex',
    altName: 'Ancient Monastic University with Sacred Buddha Bone Relics',
    altNames: ['Bavikonda Buddhist Heritage', 'Hill of Wells', 'Bavikonda Maha Chaitya'],
    category: 'Buddhist Heritage',
    state: 'Andhra Pradesh',
    stateCode: 'AP',
    district: 'Visakhapatnam',
    city: 'Bheemunipatnam (near Visakhapatnam)',
    location: 'Bavikonda hill, 16 km north of Visakhapatnam',
    address: 'Bavikonda Hill, Beach Road, Visakhapatnam District, Andhra Pradesh - 530048',
    description: 'A major ancient Buddhist monastic university established in the 3rd century BCE, famed worldwide for the archaeological discovery of an authentic stone relic casket containing sacred bone relics of the Gautama Buddha, alongside 26 rock-cut rainwater wells.',
    historicalBackground: 'Flourished between the 3rd century BCE and the 3rd century CE as one of the premier centers of Theravada Buddhist learning in South India. The name "Bavikonda" means "Hill of Wells" in Telugu, named after 26 deep circular wells cut into the rocky hill to store rainwater.',
    establishmentPeriod: 'c. 3rd Century BCE to 3rd Century CE',
    historicalPeriod: 'Ancient Era (3rd Century BCE – 3rd Century CE)',
    timeline: [
      { period: 'c. 300 BCE', event: 'Monastic complex founded under early Mauryan and Satavahana influence.' },
      { period: '1st Century BCE', event: 'Enshrinement of sacred bone relics in silver and gold caskets inside the Maha Stupa.' },
      { period: '3rd Century CE', event: 'Gradual abandonment as maritime trade shifted to southern ports.' },
      { period: '1993 CE', event: 'State Archaeological Department excavates the intact Buddhist Relic Casket.' }
    ],
    dynasty: 'Satavahana Dynasty & Ancient Kalinga-Andhra Maritime Guilds',
    historicalRulers: 'Satavahana Kings and Buddhist Acharyas',
    culturalImportance: 'Revered globally as an authentic Dhatu Garbha Stupa (shrine containing the holy physical relics of the Buddha), attracting scholars and pilgrims from Japan, Thailand, Sri Lanka, and Tibet.',
    archaeologicalImportance: 'State protected monument encompassing a majestic Maha Chaitya, 5 circular stupas, an apsidal chaitya hall, rectangular congregation halls, stone-carved Buddhapada (sacred footprints), and pottery with Brahmi script.',
    architecture: 'Classical Early Buddhist Stupa Architecture featuring dressed khondalite masonry, brick circumambulatory pathways, and stone umbrella umbrellas (chhatras).',
    architecturalStyle: 'Early Theravada Buddhist Monastic Style',
    unescoStatus: 'State Protected Archaeological Monument',
    unescoListed: false,
    deityDetails: {
      hasReligiousSignificance: true,
      mainDeity: 'Gautama Buddha & Sacred Mahaparinirvana Relics',
      associatedDeities: ['Bodhisattvas'],
      religiousSignificance: 'One of the rare sites in the world where authentic Buddha bone relics in multi-layered urns were discovered.',
      mythology: 'Sacred hill blessed by enlightened Arhats who preserved the Dhamma teachings.',
      worshipPractices: 'Silent meditative circumambulation and offering of lotus flowers.'
    },
    rituals: {
      daily: ['Archaeological park open daily from 09:00 AM to 05:30 PM.'],
      poojaSchedule: 'Open daily: 09:00 AM – 05:30 PM.',
      specialCeremonies: 'Buddha Purnima dhamma sermons and global peace prayer assemblies.',
      festivals: 'Buddha Purnima, Visakha Buddhist Heritage Utsav'
    },
    visitorInformation: {
      bestTimeToVisit: 'October to March',
      openingTime: '09:00 AM',
      closingTime: '05:30 PM',
      timings: '09:00 AM – 05:30 PM (Daily)',
      entryFees: 'Adults: ₹20, Children: ₹10',
      ticketBooking: 'Available on-spot at entrance ticket counter',
      guidelines: 'Walk only on designated stone pathways; do not touch or disturb 2000-year-old brickwork; carry umbrella for sun protection',
      photography: 'Permitted across all stupas and hilltop viewpoints',
      dressCode: 'Respectful modest clothing and walking shoes',
      restrictions: 'Littering and smoking strictly prohibited on the sacred monastic grounds',
      accessibility: 'Paved approach road and gentle walkways across the plateau',
      visitingDuration: '1.5 to 2.5 hours'
    },
    coordinates: { lat: 17.8183, lng: 83.3861 },
    latitude: 17.8183,
    longitude: 83.3861,
    googleMapsUrl: 'https://maps.google.com/?q=17.8183,83.3861',
    mapsUrl: 'https://maps.google.com/?q=17.8183,83.3861',
    nearbyFacilities: {
      hotels: 'The Bheemli Resort (10 km), Radisson Blu Visakhapatnam (8 km), Novotel Visakhapatnam (15 km)',
      guestHouses: 'AP Tourism Haritha Rushikonda Resort (6 km)',
      restaurants: 'Seafront restaurants and cafes along Vizag-Bheemili Beach Road',
      parking: true,
      drinkingWater: true,
      restrooms: true,
      touristCentres: 'Department of Archaeology Interpretation Shed at site entrance',
      nearbyAttractions: ['Thotlakonda (4 km)', 'Rushikonda Beach (6 km)', 'Bheemunipatnam Dutch Cemetery & Beach (12 km)', 'Kailasagiri (10 km)']
    },
    transportInformation: {
      nearestRailway: 'Visakhapatnam Junction (VSKP) – 16 km',
      nearestAirport: 'Visakhapatnam International Airport (VTZ) – 24 km',
      nearestBus: 'Timmapuram Bus Stop on Beach Road – 1.5 km; regular city buses from Vizag to Bheemili',
      roadConnectivity: 'Directly off the scenic four-lane Bheemili Marine Beach Road',
      localTransport: 'City auto-rickshaws, app cabs, and tourist taxis from Visakhapatnam'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Bavikonda_Maha_Chaitya_Stupa.jpg/800px-Bavikonda_Maha_Chaitya_Stupa.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Bavikonda_Maha_Chaitya_Stupa.jpg/800px-Bavikonda_Maha_Chaitya_Stupa.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Bavikonda_Monastic_Cells.jpg/800px-Bavikonda_Monastic_Cells.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Bavikonda_Water_Wells.jpg/800px-Bavikonda_Water_Wells.jpg'
    ],
    gallery: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Bavikonda_Maha_Chaitya_Stupa.jpg/800px-Bavikonda_Maha_Chaitya_Stupa.jpg', caption: 'The grand Maha Chaitya stupa where the Buddha bone relics were excavated', category: 'Stupa' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Bavikonda_Monastic_Cells.jpg/800px-Bavikonda_Monastic_Cells.jpg', caption: 'Vihara residential cells and teaching halls of ancient Buddhist scholars', category: 'Monastery' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Bavikonda_Water_Wells.jpg/800px-Bavikonda_Water_Wells.jpg', caption: 'Ancient rainwater harvesting rock-cut wells on Bavikonda hill', category: 'Ancient Wells' }
    ],
    festivals: [
      { name: 'Bavikonda Buddha Purnima Dhamma Utsav', month: 'May (Vaisakha Purnima)', description: 'Chanting of Theravada suttas, flower offerings, and meditation retreats.', isAnnual: true }
    ],
    featured: false,
    isPopular: true,
    popularity: 90,
    averageRating: 4.8,
    reviewCount: 27
  }
];

async function seedAndhraHeritage() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/divyabharat?directConnection=true';
  const conn = await mongoose.connect(uri, { family: 4, serverSelectionTimeoutMS: 5000 });
  console.log('✅ Connected to MongoDB for Heritage Seeding:', conn.connection.name);

  // Find or verify Andhra Pradesh state document
  let apState = await State.findOne({ name: { $regex: '^Andhra Pradesh$', $options: 'i' } });
  if (!apState) {
    apState = await State.create({
      name: 'Andhra Pradesh',
      capital: 'Amaravati',
      region: 'South',
      description: 'Known for its rich history, classical dance forms like Kuchipudi, ancient Buddhist heritage sites, and monumental forts.',
      icon: '🏛️',
      isUT: false
    });
    console.log('Created AP State doc in DB');
  }

  // Remove existing heritage destinations for Andhra Pradesh so the count is EXACTLY 20
  const deleteResult = await Heritage.deleteMany({ state: { $regex: '^Andhra Pradesh$', $options: 'i' } });
  console.log(`🧹 Cleaned ${deleteResult.deletedCount} old Andhra Pradesh heritage record(s)`);

  // Insert the EXACT 20 approved Andhra Pradesh heritage destinations
  for (let i = 0; i < ANDHRA_PRADESH_20_HERITAGE.length; i++) {
    const data = ANDHRA_PRADESH_20_HERITAGE[i];
    data.stateId = apState._id;
    data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    data.status = 'approved';
    data.isActive = true;

    // Backward-compatibility field mappings
    data.visitingInfo = {
      timings: data.visitorInformation?.timings || '09:00 AM – 05:30 PM',
      entryFee: data.visitorInformation?.entryFees || 'Nominal Entry Fee',
      bestTime: data.visitorInformation?.bestTimeToVisit || 'October to March',
      guidelines: data.visitorInformation?.guidelines || 'Follow designated walkways'
    };
    data.howToReach = {
      byRoad: data.transportInformation?.roadConnectivity || '',
      byRail: data.transportInformation?.nearestRailway || '',
      byAir: data.transportInformation?.nearestAirport || ''
    };
    data.culturalSignificance = data.culturalImportance || data.description;
    data.architecturalSignificance = data.architecture || data.architecturalStyle;
    data.history = data.historicalBackground || data.description;

    const doc = await Heritage.create(data);
    console.log(`[${i + 1}/20] Saved Heritage: ${doc.name} (District: ${doc.district}, Category: ${doc.category})`);
  }

  const finalApCount = await Heritage.countDocuments({ state: { $regex: '^Andhra Pradesh$', $options: 'i' } });
  const totalCount = await Heritage.countDocuments();
  console.log(`\n🎉 Heritage Seeding Verification:`);
  console.log(`👉 Andhra Pradesh Heritage Count: ${finalApCount} (Expected: EXACTLY 20)`);
  console.log(`👉 Total Heritage in Database: ${totalCount}`);

  await mongoose.disconnect();
  console.log('✅ Disconnected from MongoDB');
}

if (require.main === module) {
  seedAndhraHeritage().catch(err => {
    console.error('❌ Heritage Seeder Error:', err);
    process.exit(1);
  });
}

module.exports = { ANDHRA_PRADESH_20_HERITAGE, seedAndhraHeritage };
