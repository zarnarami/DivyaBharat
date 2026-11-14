// server/seeds/seedArunachalHeritage.js — Permanent MongoDB Seeder for 32 Arunachal Pradesh Heritage Destinations
const mongoose = require('mongoose');
const Heritage = require('../models/Heritage');
const State = require('../models/State');

const ARUNACHAL_PRADESH_32_HERITAGE = [
  // 1. Ita Fort
  {
    name: 'Ita Fort',
    altName: 'Fort of Bricks',
    altNames: ['Itanagar Brick Citadel', 'Ita Killa', 'Chutia Kingdom Fort'],
    category: 'Forts & Palaces',
    state: 'Arunachal Pradesh',
    stateCode: 'AR',
    district: 'Papum Pare',
    city: 'Itanagar',
    location: 'Hilltop, Center of Itanagar Capital Complex',
    address: 'Ita Fort Heritage Complex, Itanagar, Papum Pare District, Arunachal Pradesh - 791111',
    description: 'An iconic medieval brick citadel from which Arunachal Pradesh\'s capital Itanagar derives its name ("City of Bricks"). Constructed with over 8 million kiln-baked bricks between the 14th and 15th centuries.',
    historicalBackground: 'Built by the Chutia Kingdom rulers (often attributed to King Ramachandra or King Jitari) during the 14th–15th century CE. It served as a vital administrative and defensive outpost on the high ridges overlooking the fertile Dikrong and Papum valleys.',
    establishmentPeriod: '14th–15th Century CE',
    historicalPeriod: 'Medieval India (14th – 15th Century CE)',
    timeline: [
      { period: '1350–1450 CE', event: 'Construction of the monumental brick fort utilizing specialized kiln-burnt masonry.' },
      { period: '1970s', event: 'Archaeological Survey of India and State Research Department excavate northern and eastern ramparts.' },
      { period: '1974 CE', event: 'New capital of Arunachal Pradesh officially named Itanagar after Ita Fort.' }
    ],
    dynasty: 'Chutia Kingdom / Jitari Dynasty',
    historicalRulers: 'King Ramachandra, Chutia Monarchs',
    culturalImportance: 'Stands as an architectural symbol of civilizational identity and ancient urbanization in the Eastern Himalayan foothills.',
    archaeologicalImportance: 'Protected State Heritage Monument featuring three grand gates (Eastern, Western, and Southern gates), irregular ramparts spanning 45,000 cubic meters of masonry, and defensive bastions.',
    architecture: 'Medieval brick fort architecture built with interlocking bricks and indigenous lime-surkhi mortar along the natural hill contours.',
    architecturalStyle: 'Medieval Eastern Himalayan Brick Architecture',
    unescoStatus: 'State Protected Monument',
    unescoListed: false,
    visitorInformation: {
      openingTime: '08:00 AM',
      closingTime: '05:00 PM',
      timings: '08:00 AM – 05:00 PM (Tuesday to Sunday, Closed Mondays)',
      entryFees: 'Adults: ₹20, Students: ₹10, Foreign Tourists: ₹100',
      ticketBooking: 'Available on-spot at entrance counter',
      guidelines: 'Follow paved walking trails; do not dislodge or scratch ancient brickwork; dispose of trash in bins.',
      photography: 'Permitted across all ramparts and surrounding gardens.',
      dressCode: 'Comfortable clothing and walking shoes.',
      restrictions: 'Littering, smoking, and climbing on unstable brick walls strictly prohibited.',
      accessibility: 'Paved walkways and gentle step ascents to major gates.',
      bestTimeToVisit: 'October to April (Pleasant, sunny hill station weather).',
      visitingDuration: '1.5 to 2 hours'
    },
    coordinates: { lat: 27.0988, lng: 93.6267 },
    googleMapsUrl: 'https://maps.google.com/?q=27.0988,93.6267',
    mapsUrl: 'https://maps.google.com/?q=27.0988,93.6267',
    transportInformation: {
      nearestRailway: 'Naharlagun Railway Station (NHLN) – 15 km.',
      nearestAirport: 'Donyi Polo Airport, Itanagar (HGI) – 25 km.',
      nearestBus: 'Itanagar Central Bus Station – 3 km.',
      roadConnectivity: 'Excellent all-weather NH-415 highway connectivity.',
      localTransport: 'City auto-rickshaws, shared taxis, and local buses available throughout Itanagar.'
    },
    image: 'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=900&auto=format&fit=crop&q=80'
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80', caption: 'Ancient brick ramparts of Ita Fort in Itanagar', category: 'Architecture' },
      { url: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=900&auto=format&fit=crop&q=80', caption: 'Eastern Gate excavations of the 14th century fort', category: 'Rampart' }
    ],
    festivals: [
      { name: 'Itanagar Heritage Festival', month: 'February', description: 'Celebration of local arts, crafts, and heritage tourism at the fort grounds.' }
    ],
    featured: true,
    isPopular: true,
    averageRating: 4.8,
    reviewCount: 14
  },

  // 2. Bhismaknagar Fort
  {
    name: 'Bhismaknagar Fort',
    altName: 'Citadel of King Bhismaka',
    altNames: ['Bhismaknagar Ruins', 'Kundina Nagar', 'Roing Archaeological Fort'],
    category: 'Archaeological Sites',
    state: 'Arunachal Pradesh',
    stateCode: 'AR',
    district: 'Lower Dibang Valley',
    location: 'Foot of Mishmi Hills, near Roing',
    address: 'Bhismaknagar Heritage Site, near Roing, Lower Dibang Valley, Arunachal Pradesh - 792110',
    description: 'An ancient burnt-brick citadel sprawling over 10 square kilometers at the foot of the Mishmi hills, revered in legend as the royal capital of King Bhismaka, the father of Princess Rukmini who wed Lord Krishna.',
    historicalBackground: 'Dated by archaeologists to the 8th–12th century CE, with later Chutia additions in the 14th century. Excavations in 1969–1973 by the Directorate of Research uncovered high defensive ramparts, terracotta figurines, glazed pottery, and ornate stone artifacts.',
    establishmentPeriod: '8th–12th Century CE',
    historicalPeriod: 'Ancient & Early Medieval Era',
    timeline: [
      { period: 'c. 8th–10th Century CE', event: 'Foundation of the burnt-brick citadel in the Dibang river basin.' },
      { period: '12th–14th Century CE', event: 'Strengthening of outer fortifications by Chutia kings.' },
      { period: '1969–1973', event: 'Systematic excavation reveals the royal palace complex and defense ditches.' }
    ],
    dynasty: 'Bhismaka Dynasty / Chutia Kingdom',
    historicalRulers: 'King Bhismaka, Chutia Rulers',
    culturalImportance: 'A sacred link connecting Mahabharata legends (Krishna-Rukmini Vivaha) with Eastern Himalayan frontier archaeology.',
    archaeologicalImportance: 'Protected Archaeological Monument with dual wall defense systems, burnt clay bricks, and excavated palace plinths.',
    architecture: 'High-walled clay and burnt-brick defense engineering with stone foundations and drainage conduits.',
    architecturalStyle: 'Pre-Ahom Himalayan Brick Citadel Architecture',
    unescoStatus: 'State Protected Monument',
    unescoListed: false,
    visitorInformation: {
      openingTime: '08:00 AM',
      closingTime: '05:00 PM',
      timings: '08:00 AM – 05:00 PM (Daily)',
      entryFees: 'Free Entry / Nominal state preservation fee of ₹20',
      ticketBooking: 'On-spot at site entry',
      guidelines: 'Walk along marked paths; do not dig or touch excavated brick masonry.',
      photography: 'Permitted across all ruins and landscape.',
      dressCode: 'Comfortable clothing and sturdy walking shoes.',
      restrictions: 'Littering and vandalism strictly prohibited.',
      accessibility: 'Flat trail through serene semi-evergreen forest.',
      bestTimeToVisit: 'October to March.',
      visitingDuration: '2 to 3 hours'
    },
    coordinates: { lat: 28.1633, lng: 95.8344 },
    googleMapsUrl: 'https://maps.google.com/?q=28.1633,95.8344',
    mapsUrl: 'https://maps.google.com/?q=28.1633,95.8344',
    transportInformation: {
      nearestRailway: 'Tinsukia Junction (TSK) – 110 km; Murkongselek – 120 km.',
      nearestAirport: 'Pasighat Airport (IXT) – 90 km; Dibrugarh Airport (DIB) – 145 km via Dhola-Sadiya bridge.',
      nearestBus: 'Roing Bus Terminal – 28 km.',
      roadConnectivity: 'Well connected via NH-115 across the majestic Dhola-Sadiya (Bhupen Hazarika) bridge.',
      localTransport: 'Shared Sumos and private taxis from Roing town.'
    },
    image: 'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80'
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80', caption: 'Excavated brick citadel walls at Bhismaknagar', category: 'Excavation' }
    ],
    festivals: [
      { name: 'Reh Festival', month: 'February', description: 'Idumishu tribal festival celebrated with ritual chants and community dances.' }
    ],
    featured: true,
    isPopular: true,
    averageRating: 4.9,
    reviewCount: 16
  },

  // 3. Malinithan Archaeological Site
  {
    name: 'Malinithan Archaeological Site',
    altName: 'Malini Temple Excavations',
    altNames: ['Malini Than Site', 'Likabali Temple Ruins'],
    category: 'Archaeological Sites',
    state: 'Arunachal Pradesh',
    stateCode: 'AR',
    district: 'Lower Siang',
    location: 'Foothills near Likabali',
    address: 'Malinithan Archaeological Site, Likabali, Lower Siang, Arunachal Pradesh - 787059',
    description: 'A celebrated 14th-century archaeological complex featuring intricately carved granitic sculptures of Hindu deities, floral lintels, and temple ruins on the border of Assam and Arunachal Pradesh.',
    historicalBackground: 'Discovered during archaeological excavations between 1968 and 1971, proving that sophisticated temple stonecraft flourished in the Siang foothills under the medieval Chutia kings.',
    establishmentPeriod: '13th–14th Century CE',
    historicalPeriod: 'Medieval India',
    timeline: [
      { period: '13th Century CE', event: 'Construction of the granitic temple complex dedicated to Goddess Durga.' },
      { period: '1968–1971', event: 'Excavation uncovers over 24 high-relief stone deities and temple foundation plinths.' }
    ],
    dynasty: 'Chutia Dynasty',
    historicalRulers: 'Medieval Chutia Kings',
    culturalImportance: 'A unique cultural bridge uniting regional tribal folklore with classical pan-Indian Shakta iconography.',
    archaeologicalImportance: 'Preserves rare granitic sculptures of Durga Mahisasuramardini, Surya, Ganesha, and erotic panels.',
    architecture: 'Classical Asomiya-Kalinga influenced carved granite and basalt stone architecture.',
    architecturalStyle: 'Medieval Nagara-Kalinga Influenced Stonecraft',
    unescoStatus: 'State Protected Archaeological Site',
    unescoListed: false,
    visitorInformation: {
      openingTime: '06:00 AM',
      closingTime: '06:00 PM',
      timings: '06:00 AM – 06:00 PM (Daily)',
      entryFees: '₹20 for museum and garden maintenance',
      ticketBooking: 'On-spot at site ticket window',
      guidelines: 'Respect ancient sculptures; photography allowed in open complex.',
      photography: 'Permitted in open complex and sculpture park.',
      dressCode: 'Modest clothing recommended.',
      restrictions: 'Do not touch or scratch sculpted stone panels.',
      accessibility: 'Paved paths and manicured lawns accessible for all.',
      bestTimeToVisit: 'October to April.',
      visitingDuration: '1.5 to 2.5 hours'
    },
    coordinates: { lat: 27.6521, lng: 94.6974 },
    googleMapsUrl: 'https://maps.google.com/?q=27.6521,94.6974',
    mapsUrl: 'https://maps.google.com/?q=27.6521,94.6974',
    transportInformation: {
      nearestRailway: 'Silapathar (SPTR) – 10 km.',
      nearestAirport: 'Lilabari (IXI) – 85 km.',
      nearestBus: 'Likabali Bus Stand – 1.5 km.',
      roadConnectivity: 'NH-15 and Likabali State Highway.',
      localTransport: 'Auto-rickshaws and cabs from Likabali and Silapathar.'
    },
    image: 'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80', caption: 'Relief sculptures preserved at Malinithan', category: 'Sculpture' }
    ],
    festivals: [
      { name: 'Basanti Durga Puja', month: 'April', description: 'Springtime festival celebrated with floral offerings and devotional fair.' }
    ],
    featured: true,
    isPopular: true,
    averageRating: 4.8,
    reviewCount: 18
  },

  // 4. Rukmini Nati Ruins
  {
    name: 'Rukmini Nati Ruins',
    altName: 'Chimiri Fort Ruins',
    altNames: ['Chimiri Brick Mounds', 'Rukminis Citadel'],
    category: 'Archaeological Sites',
    state: 'Arunachal Pradesh',
    stateCode: 'AR',
    district: 'Lower Dibang Valley',
    location: 'Chimiri Village, near Roing',
    address: 'Chimiri Village, Roing, Lower Dibang Valley, Arunachal Pradesh - 792110',
    description: 'An ancient archaeological mound and brick fortification complex associated in local traditions with Princess Rukmini, featuring medieval burnt-brick defense ramparts and defensive moats.',
    historicalBackground: 'Dating to the 14th century, the ruins at Chimiri village were part of the fortified defensive perimeter surrounding the greater Bhismaknagar capital territory in the Dibang valley.',
    establishmentPeriod: '14th Century CE',
    historicalPeriod: 'Medieval Era',
    timeline: [
      { period: '14th Century CE', event: 'Construction of the defensive brick ramparts at Chimiri.' },
      { period: '1970s', event: 'Archaeological surveys map brick defensive towers and bastions.' }
    ],
    dynasty: 'Chutia Dynasty',
    historicalRulers: 'Local Medieval Kings',
    culturalImportance: 'Celebrated in folklore as the tranquil retreat and royal nursery of Princess Rukmini.',
    archaeologicalImportance: 'Features ancient brick ramparts, drainage canals, and medieval pottery shards.',
    architecture: 'Earthen defense walls revetted with burnt-clay bricks.',
    architecturalStyle: 'Medieval Frontier Fort Architecture',
    unescoStatus: 'State Protected Site',
    unescoListed: false,
    visitorInformation: {
      openingTime: '08:00 AM',
      closingTime: '05:00 PM',
      timings: '08:00 AM – 05:00 PM (Daily)',
      entryFees: 'Free Entry',
      ticketBooking: 'No ticket required',
      guidelines: 'Respect local rural settings; do not disturb historical mounds.',
      photography: 'Permitted.',
      dressCode: 'Comfortable clothing and walking shoes.',
      restrictions: 'Do not damage ancient structures.',
      accessibility: 'Walking trail from Chimiri village.',
      bestTimeToVisit: 'October to March.',
      visitingDuration: '1 to 2 hours'
    },
    coordinates: { lat: 28.1822, lng: 95.8455 },
    googleMapsUrl: 'https://maps.google.com/?q=28.1822,95.8455',
    mapsUrl: 'https://maps.google.com/?q=28.1822,95.8455',
    transportInformation: {
      nearestRailway: 'Tinsukia – 115 km.',
      nearestAirport: 'Pasighat – 95 km.',
      nearestBus: 'Roing Bus Stand – 12 km.',
      roadConnectivity: 'Roing-Chimiri rural road.',
      localTransport: 'Taxis from Roing town.'
    },
    image: 'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80', caption: 'Rukmini Nati brick ruins in Chimiri', category: 'Ruins' }
    ],
    festivals: [
      { name: 'Roing Heritage Walk', month: 'December', description: 'Winter heritage exploration walk across historical sites.' }
    ],
    featured: false,
    isPopular: false,
    averageRating: 4.6,
    reviewCount: 8
  },

  // 5. Tamreswari Temple Ruins
  {
    name: 'Tamreswari Temple Ruins',
    altName: 'Copper Temple Site',
    altNames: ['Kechaikhati Temple Ruins', 'Tamreswari Than', 'Dikkaravasini Shrine'],
    category: 'Archaeological Sites',
    state: 'Arunachal Pradesh',
    stateCode: 'AR',
    district: 'Lohit',
    location: 'Near Paya, Lohit / Sadiya border',
    address: 'Tamreswari Heritage Site, Lohit District, Arunachal Pradesh - 792102',
    description: 'Ruins of a renowned medieval stone-and-brick temple once covered with a famous copper roof (hence Tamreswari), dedicated to Goddess Kechaikhati (an avatar of Mother Kali / Dikkaravasini).',
    historicalBackground: 'Constructed by Chutia king Muktadharmanarayana in 1442 CE. Historic British accounts and ASI surveys in the 19th century documented its exquisite stone lintels, copper-plated roof, and four grand carved entrance doors.',
    establishmentPeriod: '1442 CE (15th Century CE)',
    historicalPeriod: 'Medieval India',
    timeline: [
      { period: '1442 CE', event: 'King Muktadharmanarayana erects stone temple with copper roof for Goddess Kechaikhati.' },
      { period: '1848 CE', event: 'Major Hannay visits and documents the temple architecture and inscriptions.' }
    ],
    dynasty: 'Chutia Dynasty',
    historicalRulers: 'King Muktadharmanarayana',
    culturalImportance: 'Historical center of Shakta and Tantric worship in eastern Assam and southeastern Arunachal Pradesh.',
    archaeologicalImportance: 'Features ancient stone plinths, carved floral door jambs, and evidence of copper-roofing engineering.',
    architecture: 'Stone-and-brick sanctum with octagonal plinth and heavy carved lintels.',
    architecturalStyle: 'Medieval Shakta Stone Architecture',
    unescoStatus: 'Protected Archaeological Site',
    unescoListed: false,
    visitorInformation: {
      openingTime: '08:00 AM',
      closingTime: '04:30 PM',
      timings: '08:00 AM – 04:30 PM (Daily)',
      entryFees: 'Free Entry',
      ticketBooking: 'No ticket required',
      guidelines: 'Respect the archaeological site; avoid disturbing historical stones.',
      photography: 'Permitted.',
      dressCode: 'Modest clothing.',
      restrictions: 'Strict prohibition on removing any stone or brick fragments.',
      accessibility: 'Short walking path from the rural approach road.',
      bestTimeToVisit: 'November to March.',
      visitingDuration: '1 to 2 hours'
    },
    coordinates: { lat: 27.8105, lng: 95.8924 },
    googleMapsUrl: 'https://maps.google.com/?q=27.8105,95.8924',
    mapsUrl: 'https://maps.google.com/?q=27.8105,95.8924',
    transportInformation: {
      nearestRailway: 'Tinsukia – 95 km.',
      nearestAirport: 'Tezu Airport – 55 km.',
      nearestBus: 'Tezu Bus Stand – 45 km.',
      roadConnectivity: 'Connected via Tezu-Sadiya road.',
      localTransport: 'Cabs from Tezu or Chapakhowa.'
    },
    image: 'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80', caption: 'Tamreswari Temple stone foundation plinths', category: 'Ruins' }
    ],
    festivals: [
      { name: 'Annual Kali Puja Observance', month: 'October–November', description: 'Traditional community prayer offered at the site.' }
    ],
    featured: false,
    isPopular: false,
    averageRating: 4.7,
    reviewCount: 9
  },

  // 6. Naksaparbat
  {
    name: 'Naksaparbat',
    altName: 'Medieval Stone City of Kameng',
    altNames: ['Naksha Parbat', 'Naksaparbat Ruins'],
    category: 'Archaeological Sites',
    state: 'Arunachal Pradesh',
    stateCode: 'AR',
    district: 'East Kameng',
    location: 'Dense forests near Seijosa / Bhalukpong border',
    address: 'Naksaparbat Archaeological Area, near Seijosa, East Kameng, Arunachal Pradesh - 790103',
    description: 'An extensive 14th–15th-century medieval archaeological complex featuring carved stone pillars, elevated platforms, defensive ramparts, and stone ring-wells buried deep in the sub-Himalayan rainforest.',
    historicalBackground: 'Excavated in the 1980s by the Directorate of Research. The excavations proved the existence of an advanced pre-modern stone-carving civilization with residential quarters and defensive fortifications along the Kameng valley.',
    establishmentPeriod: '14th–15th Century CE',
    historicalPeriod: 'Medieval India',
    timeline: [
      { period: '14th Century CE', event: 'Urban stone settlement and fortification established in East Kameng.' },
      { period: '1982–1983', event: 'Major excavations reveal carved pillars, stone masonry, and ring wells.' }
    ],
    dynasty: 'Medieval Regional Kingdom',
    historicalRulers: 'Early Kameng Monarchs',
    culturalImportance: 'Evidence of early Himalayan urbanism, sophisticated water management, and artistic stone carving.',
    archaeologicalImportance: 'Stone pillars, pedestals, and ancient ring-well systems under state archaeological protection.',
    architecture: 'Dressed sandstone masonry, defensive earthen bunds, and sculpted column capitals.',
    architecturalStyle: 'Medieval Indigenous Himalayan Stone Masonry',
    unescoStatus: 'Protected Archaeological Site',
    unescoListed: false,
    visitorInformation: {
      openingTime: '08:00 AM',
      closingTime: '04:30 PM',
      timings: '08:00 AM – 04:30 PM (Daily)',
      entryFees: 'Free Entry',
      ticketBooking: 'No ticket required',
      guidelines: 'Guided exploration recommended due to dense forest surroundings.',
      photography: 'Permitted.',
      dressCode: 'Outdoor trekking clothing and sturdy boots.',
      restrictions: 'Do not remove any historical stones or pottery fragments.',
      accessibility: 'Forest trek path of ~2 km from nearest motorable road.',
      bestTimeToVisit: 'November to February.',
      visitingDuration: '2 to 3 hours'
    },
    coordinates: { lat: 26.9744, lng: 92.9811 },
    googleMapsUrl: 'https://maps.google.com/?q=26.9744,92.9811',
    mapsUrl: 'https://maps.google.com/?q=26.9744,92.9811',
    transportInformation: {
      nearestRailway: 'Tezpur – 65 km.',
      nearestAirport: 'Tezpur Airport – 60 km.',
      nearestBus: 'Seijosa Bus Stop – 10 km.',
      roadConnectivity: 'Accessible via Tezpur-Pakke Kessang corridor.',
      localTransport: 'Jeeps and 4x4 vehicles from Seijosa.'
    },
    image: 'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80', caption: 'Naksaparbat medieval stone columns and platforms', category: 'Excavation' }
    ],
    festivals: [
      { name: 'Nyokum Yullo', month: 'February', description: 'Nishi tribal festival celebrating nature harmony and prosperity.' }
    ],
    featured: false,
    isPopular: false,
    averageRating: 4.6,
    reviewCount: 7
  },

  // 7. Manabhum Fort
  {
    name: 'Manabhum Fort',
    altName: 'Manabhum Earthen Citadel',
    altNames: ['Manabhum Ramparts', 'Lohit Frontier Bastion'],
    category: 'Forts & Palaces',
    state: 'Arunachal Pradesh',
    stateCode: 'AR',
    district: 'Lohit',
    location: 'Manabhum Hill Range, near Namsai / Lohit',
    address: 'Manabhum Ridge, Lohit District, Arunachal Pradesh - 792103',
    description: 'An ancient defensive hill fortress featuring massive earthen ramparts, stone-revetted bastions, and watch points overlooking the expansive Lohit and Noa-Dihing river plains.',
    historicalBackground: 'Constructed by medieval regional rulers to guard the southeastern entrance into the upper Brahmaputra and Lohit valleys against invasions.',
    establishmentPeriod: 'Medieval Period',
    historicalPeriod: 'Medieval India',
    timeline: [
      { period: '15th Century CE', event: 'Construction of the defensive ridge fort along Manabhum hills.' },
      { period: '20th Century', event: 'State archaeological department documents earthen ramparts and pottery.' }
    ],
    dynasty: 'Medieval Regional Dynasties',
    historicalRulers: 'Lohit Frontier Chieftains',
    culturalImportance: 'Demonstrates ancient military strategy using natural ridge topography for defensive warfare.',
    archaeologicalImportance: 'Earthen ramparts, defensive ditches, and timber-stone bastion foundations.',
    architecture: 'Earthen redoubt engineering adapted to steep ridge terrain.',
    architecturalStyle: 'Medieval Frontier Fort Architecture',
    unescoStatus: 'State Recorded Site',
    unescoListed: false,
    visitorInformation: {
      openingTime: '08:00 AM',
      closingTime: '05:00 PM',
      timings: '08:00 AM – 05:00 PM (Daily)',
      entryFees: 'Free Entry',
      ticketBooking: 'No ticket required',
      guidelines: 'Trek along designated ridge paths; carry drinking water.',
      photography: 'Permitted.',
      dressCode: 'Trekking attire.',
      restrictions: 'Keep the forested ridge clean and pristine.',
      accessibility: 'Mountain trail walk suitable for moderate trekking.',
      bestTimeToVisit: 'October to March.',
      visitingDuration: '2 hours'
    },
    coordinates: { lat: 27.7333, lng: 96.0167 },
    googleMapsUrl: 'https://maps.google.com/?q=27.7333,96.0167',
    mapsUrl: 'https://maps.google.com/?q=27.7333,96.0167',
    transportInformation: {
      nearestRailway: 'Tinsukia – 80 km.',
      nearestAirport: 'Tezu – 45 km.',
      nearestBus: 'Namsai Bus Stand – 25 km.',
      roadConnectivity: 'Accessible from Namsai-Tezu highway.',
      localTransport: 'Taxis from Namsai.'
    },
    image: 'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80', caption: 'Manabhum ridge overlooking the Lohit plains', category: 'Landscape' }
    ],
    festivals: [
      { name: 'Poi Pee Mau', month: 'November', description: 'Tai Khamti new year celebrations in nearby Namsai.' }
    ],
    featured: false,
    isPopular: false,
    averageRating: 4.5,
    reviewCount: 6
  },

  // 8. Bhalukpong Fort Ruins
  {
    name: 'Bhalukpong Fort Ruins',
    altName: 'Fort of King Bhaluka',
    altNames: ['Bhaluka Fort', 'Bhalukpong Citadel'],
    category: 'Archaeological Sites',
    state: 'Arunachal Pradesh',
    stateCode: 'AR',
    district: 'West Kameng',
    location: 'Foothill bluff overlooking Kameng River',
    address: 'Bhalukpong Fort Heritage Site, Bhalukpong, West Kameng, Arunachal Pradesh - 790114',
    description: 'Ancient stone-and-brick fortress ruins perched on a hill above the Kameng River, attributed in mythology to King Bhaluka, grandfather of King Bana of Mahabharata fame.',
    historicalBackground: 'Dated by historians to the 10th–12th century CE, the fort protected the strategic river gateway into the western mountains of Arunachal Pradesh. Traces of ancient walls, towers, and brickworks remain visible.',
    establishmentPeriod: '10th–12th Century CE',
    historicalPeriod: 'Early Medieval Period',
    timeline: [
      { period: '10th–12th Century CE', event: 'Construction of river defense fortress by King Bhaluka.' },
      { period: '1970s', event: 'Archaeological exploration documents boundary masonry and ceramics.' }
    ],
    dynasty: 'Bhaluka / Pal Dynasty Feudatories',
    historicalRulers: 'King Bhaluka',
    culturalImportance: 'Commemorates ancient indigenous kingship along the Kameng River trade corridor.',
    archaeologicalImportance: 'Stone rampart footings, ancient bricks, and scenic river defense bastion.',
    architecture: 'Semi-dressed stone masonry laid with earthen mortar.',
    architecturalStyle: 'Early Medieval Stone Fortress Architecture',
    unescoStatus: 'State Protected Site',
    unescoListed: false,
    visitorInformation: {
      openingTime: '08:00 AM',
      closingTime: '05:00 PM',
      timings: '08:00 AM – 05:00 PM (Daily)',
      entryFees: 'Free Entry',
      ticketBooking: 'No ticket required',
      guidelines: 'Exercise caution along river bluff edges.',
      photography: 'Permitted.',
      dressCode: 'Comfortable footwear and casual attire.',
      restrictions: 'Do not deface stone ruins.',
      accessibility: 'Short walking ascent from the Bhalukpong highway.',
      bestTimeToVisit: 'October to April.',
      visitingDuration: '1 to 1.5 hours'
    },
    coordinates: { lat: 27.0167, lng: 92.6489 },
    googleMapsUrl: 'https://maps.google.com/?q=27.0167,92.6489',
    mapsUrl: 'https://maps.google.com/?q=27.0167,92.6489',
    transportInformation: {
      nearestRailway: 'Bhalukpong (BHNG) – 2 km.',
      nearestAirport: 'Tezpur (TEZ) – 55 km.',
      nearestBus: 'Bhalukpong Bus Stand – 1 km.',
      roadConnectivity: 'NH-13 gateway into Western Arunachal.',
      localTransport: 'Auto-rickshaws from Bhalukpong market.'
    },
    image: 'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80', caption: 'Bhalukpong fort ruins overlooking the Kameng river', category: 'Ruins' }
    ],
    festivals: [
      { name: 'Nyethidow Festival', month: 'March', description: 'Hrusso (Aka) tribal cultural celebration of Bhalukpong.' }
    ],
    featured: false,
    isPopular: true,
    averageRating: 4.7,
    reviewCount: 11
  },

  // 9. Dirang Dzong
  {
    name: 'Dirang Dzong',
    altName: 'Dirang Fortress Village',
    altNames: ['Dirang Stone Fort', 'Monpa Dzong'],
    category: 'Forts & Palaces',
    state: 'Arunachal Pradesh',
    stateCode: 'AR',
    district: 'West Kameng',
    location: 'Old Dirang Village, Dirang Valley',
    address: 'Old Dirang Dzong Village, Dirang, West Kameng, Arunachal Pradesh - 790101',
    description: 'A 17th-century Monpa stone fortress and traditional fortified village built in 1831 CE atop a hillock, featuring four-story stone watchtowers, historic wooden balconies, and traditional rammed-stone residences.',
    historicalBackground: 'Constructed by Monpa chiefs to defend the picturesque Dirang valley from neighboring tribal raids and external invasions. The fortress housed administrative offices, grain stores, and prison cells, remaining an active living heritage settlement today.',
    establishmentPeriod: '17th–19th Century CE (Fortified in 1831 CE)',
    historicalPeriod: 'Late Medieval / Early Modern Himalayan Era',
    timeline: [
      { period: '17th Century CE', event: 'Initial Monpa stone watchtower established in Dirang valley.' },
      { period: '1831 CE', event: 'Comprehensive fortification of Dirang Dzong completed.' },
      { period: 'World War II', event: 'Served as an administrative and signal outpost.' }
    ],
    dynasty: 'Monpa Chieftains',
    historicalRulers: 'Dirang Monpa Council of Elders',
    culturalImportance: 'Exemplifies the living community-heritage of the Monpa people who continue to dwell inside the historic fortified stone village.',
    archaeologicalImportance: 'Four-story stone tower, wooden cantilevers, stone defensive walls, and traditional slate-roofed homes.',
    architecture: 'Traditional Monpa stone and timber architecture with thick dry-stone masonry walls designed to withstand seismic tremors.',
    architecturalStyle: 'Traditional Monpa Fortified Himalayan Architecture',
    unescoStatus: 'State Documented Living Heritage',
    unescoListed: false,
    visitorInformation: {
      openingTime: '08:00 AM',
      closingTime: '05:30 PM',
      timings: '08:00 AM – 05:30 PM (Daily)',
      entryFees: 'Free Entry',
      ticketBooking: 'No ticket required',
      guidelines: 'Respect local residents living in the historic village; ask permission before photographing people.',
      photography: 'Permitted in village lanes and fort exteriors.',
      dressCode: 'Modest warm clothing.',
      restrictions: 'Please do not cause loud disturbances in the residential areas.',
      accessibility: 'Stone paved alleys with gentle steps.',
      bestTimeToVisit: 'Throughout the year; autumn (Oct-Nov) and spring (March-April) are ideal.',
      visitingDuration: '1.5 to 2 hours'
    },
    coordinates: { lat: 27.3583, lng: 92.2356 },
    googleMapsUrl: 'https://maps.google.com/?q=27.3583,92.2356',
    mapsUrl: 'https://maps.google.com/?q=27.3583,92.2356',
    transportInformation: {
      nearestRailway: 'Bhalukpong – 140 km; Rangapara – 185 km.',
      nearestAirport: 'Tezpur – 200 km; Guwahati – 340 km.',
      nearestBus: 'Dirang Bus Stand – 1 km.',
      roadConnectivity: 'On the main Bhalukpong-Bomdila-Tawang highway.',
      localTransport: 'Walking distance from Dirang market; local taxis available.'
    },
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80', caption: 'Traditional stone architecture of Dirang Dzong', category: 'Architecture' }
    ],
    festivals: [
      { name: 'Losar (Monpa New Year)', month: 'February–March', description: 'Grand Tibetan-Monpa new year celebrations with mask dances.' }
    ],
    featured: true,
    isPopular: true,
    averageRating: 4.8,
    reviewCount: 15
  },

  // 10. Taklung Dzong
  {
    name: 'Taklung Dzong',
    altName: 'Taklung Mountain Outpost',
    altNames: ['Taklung Fort', 'West Kameng Stone Outpost'],
    category: 'Forts & Palaces',
    state: 'Arunachal Pradesh',
    stateCode: 'AR',
    district: 'West Kameng',
    location: 'High mountain ridge, West Kameng',
    address: 'Taklung Heritage Area, West Kameng District, Arunachal Pradesh - 790115',
    description: 'An ancient high-altitude stone watchtower and defensive outpost erected on a strategic spur in West Kameng to monitor ancient trans-Himalayan trade routes and troop movements.',
    historicalBackground: 'Constructed in the 17th century by Monpa defense scouts, Taklung Dzong worked in tandem with Dirang and Thembang to form a fortified defensive network across the Kameng valleys.',
    establishmentPeriod: '17th Century CE',
    historicalPeriod: 'Medieval Himalayan Period',
    timeline: [
      { period: '17th Century CE', event: 'Construction of stone watchtower and signal post.' }
    ],
    dynasty: 'Monpa Chieftaincies',
    historicalRulers: 'Local Monpa Chiefs',
    culturalImportance: 'Illustrates medieval defensive signalling and trade security in the eastern Himalayas.',
    archaeologicalImportance: 'Stone masonry watchtower base and arrow slits.',
    architecture: 'Heavy dry-stone fortress walls built with local mountain schist.',
    architecturalStyle: 'Himalayan Frontier Stone Watchtower',
    unescoStatus: 'State Surveyed Site',
    unescoListed: false,
    visitorInformation: {
      openingTime: '08:00 AM',
      closingTime: '04:30 PM',
      timings: '08:00 AM – 04:30 PM (Daily)',
      entryFees: 'Free Entry',
      ticketBooking: 'No ticket required',
      guidelines: 'Suitable for trekking and heritage enthusiasts; wear sturdy shoes.',
      photography: 'Permitted.',
      dressCode: 'Trekking attire.',
      restrictions: 'Keep the mountain trails clean.',
      accessibility: 'Mountain footpath with moderate ascent.',
      bestTimeToVisit: 'October to April.',
      visitingDuration: '1.5 hours'
    },
    coordinates: { lat: 27.2833, lng: 92.3167 },
    googleMapsUrl: 'https://maps.google.com/?q=27.2833,92.3167',
    mapsUrl: 'https://maps.google.com/?q=27.2833,92.3167',
    transportInformation: {
      nearestRailway: 'Bhalukpong – 120 km.',
      nearestAirport: 'Tezpur – 180 km.',
      nearestBus: 'Bomdila – 20 km.',
      roadConnectivity: 'Accessible via Bomdila-Rupa corridor.',
      localTransport: 'Jeeps from Bomdila or Rupa.'
    },
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80', caption: 'Taklung Dzong mountain outpost', category: 'Watchtower' }
    ],
    festivals: [
      { name: 'Chhoskar Festival', month: 'May', description: 'Monpa religious book procession through agricultural fields.' }
    ],
    featured: false,
    isPopular: false,
    averageRating: 4.6,
    reviewCount: 5
  },

  // 11. Thembang Fortified Village
  {
    name: 'Thembang Fortified Village',
    altName: 'UNESCO Tentative Listed Monpa Dzong',
    altNames: ['Thembang Bapu', 'Thembang Dzong Village'],
    category: 'Living Tribal & Cultural Heritage',
    state: 'Arunachal Pradesh',
    stateCode: 'AR',
    district: 'West Kameng',
    location: 'Ridge atop Dirang-Bomdila junction, West Kameng',
    address: 'Thembang Village, West Kameng District, Arunachal Pradesh - 790101',
    description: 'An ancient fortified Monpa village inscribed on India\'s UNESCO World Heritage Tentative List (2014), entered through massive medieval stone gates (Lho & Byang), featuring continuous stone boundary ramparts, a central Dzong, and centuries-old stone-and-wood residences.',
    historicalBackground: 'Founded prior to the 12th century by the Thembang Bapu clan. In the 19th century, the villagers constructed high stone ramparts and massive wooden gate wickets to defend against invasions. The village witnessed fierce historical battles and retains its traditional democratic council governance.',
    establishmentPeriod: '12th Century CE (Fortified in 19th Century CE)',
    historicalPeriod: 'Medieval & Traditional Himalayan Era',
    timeline: [
      { period: '12th Century CE', event: 'Settlement established on high mountain ridge by Monpa Bapu clan.' },
      { period: '1830s CE', event: 'Construction of the Northern (Byang) and Southern (Lho) fortification stone gates.' },
      { period: '2014 CE', event: 'Inscribed on the UNESCO World Heritage Tentative List.' }
    ],
    dynasty: 'Thembang Bapu Monpa Chieftaincy',
    historicalRulers: 'Village Council (Tshokpa)',
    culturalImportance: 'A world-class exemplar of community-managed living heritage where age-old customary laws, architecture, and sustainable mountain ecology remain completely intact.',
    archaeologicalImportance: 'Two monumental stone gateway arches (Bapu Dzas), stone ramparts, historic mane shrines, and vernacular houses.',
    architecture: 'Traditional Monpa vernacular stone, bamboo, and pine timber architecture with wood-shake roofs weighted down by river boulders.',
    architecturalStyle: 'Fortified Vernacular Himalayan Monpa Architecture',
    unescoStatus: 'UNESCO World Heritage Tentative List (Inscribed 2014)',
    unescoListed: false,
    visitorInformation: {
      openingTime: '08:00 AM',
      closingTime: '05:00 PM',
      timings: '08:00 AM – 05:00 PM (Daily)',
      entryFees: 'Nominal village community tourism development fee of ₹50',
      ticketBooking: 'Community tourism counter at village gate',
      guidelines: 'Respect local community privacy; support community-run homestays; do not litter.',
      photography: 'Permitted in village paths; ask before photographing residents.',
      dressCode: 'Modest warm clothing.',
      restrictions: 'No plastic pollution; alcohol consumption restricted in public areas.',
      accessibility: 'Stone-paved village alleys with stepped slopes.',
      bestTimeToVisit: 'October to May (Clear skies, stunning panoramic snow-peak views).',
      visitingDuration: '2 to 4 hours'
    },
    coordinates: { lat: 27.3517, lng: 92.3922 },
    googleMapsUrl: 'https://maps.google.com/?q=27.3517,92.3922',
    mapsUrl: 'https://maps.google.com/?q=27.3517,92.3922',
    transportInformation: {
      nearestRailway: 'Bhalukpong – 140 km.',
      nearestAirport: 'Tezpur – 195 km; Guwahati – 330 km.',
      nearestBus: 'Dirang Bus Stand – 14 km.',
      roadConnectivity: 'Connected via scenic mountain branch road off NH-13 from Munna Camp.',
      localTransport: 'Taxis from Dirang and Bomdila.'
    },
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&auto=format&fit=crop&q=80'
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80', caption: 'Thembang Fortified Village stone entrance gate', category: 'Gate' },
      { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&auto=format&fit=crop&q=80', caption: 'Panoramic mountain ridge setting of UNESCO tentative site', category: 'Landscape' }
    ],
    festivals: [
      { name: 'Losar Celebration', month: 'February–March', description: 'Village-wide new year celebration with mask dances and butter lamps.' }
    ],
    featured: true,
    isPopular: true,
    averageRating: 4.9,
    reviewCount: 20
  },

  // 12. Vijaynagar Archaeological Site
  {
    name: 'Vijaynagar Archaeological Site',
    altName: 'Ancient Stupas of Namdapha Valley',
    altNames: ['Vijaynagar Stupa Site', 'Changlang Buddhist Ruins'],
    category: 'Archaeological Sites',
    state: 'Arunachal Pradesh',
    stateCode: 'AR',
    district: 'Changlang',
    location: 'Remote Vijaynagar Valley, beyond Namdapha National Park',
    address: 'Vijaynagar Valley, Changlang District, Arunachal Pradesh - 792055',
    description: 'An extraordinary remote archaeological site in easternmost Arunachal Pradesh featuring ancient stone stupas, terracotta relics, and votive tablets dating from the early medieval era, discovered near the Indo-Myanmar border.',
    historicalBackground: 'Discovered during Assam Rifles expeditions and research surveys in the 1970s. The site revealed ancient Buddhist stupas constructed with river boulders and dressed stone, proving that ancient trade and pilgrimage routes crossed the Patkai mountains centuries ago.',
    establishmentPeriod: '7th–11th Century CE',
    historicalPeriod: 'Early Medieval Buddhist Era',
    timeline: [
      { period: 'c. 8th Century CE', event: 'Erection of Buddhist votive stupas along the trans-Patkai route.' },
      { period: '1971 CE', event: 'Archaeological discovery of stone stupa plinths and bronze Buddha figurines.' }
    ],
    dynasty: 'Early Buddhist Kingdoms',
    historicalRulers: 'Early Frontier Monks & Chieftains',
    culturalImportance: 'Marks the easternmost documented footprint of early Buddhist stupa architecture in India.',
    archaeologicalImportance: 'Preserves boulder-built stupa bases, carved stone pedestals, and terracotta artifacts.',
    architecture: 'Concentric circular stone stupa foundations built with riverine quartz and granite boulders.',
    architecturalStyle: 'Early Medieval Buddhist Stupa Architecture',
    unescoStatus: 'State Surveyed Archaeological Monument',
    unescoListed: false,
    visitorInformation: {
      openingTime: '08:00 AM',
      closingTime: '04:30 PM',
      timings: '08:00 AM – 04:30 PM (Daily)',
      entryFees: 'Free Entry',
      ticketBooking: 'No ticket required',
      guidelines: 'Extremely remote valley; requires special permits, fitness, and advance planning.',
      photography: 'Permitted.',
      dressCode: 'Expedition trekking clothing.',
      restrictions: 'Do not disturb ancient stupa stone foundations.',
      accessibility: 'Accessible via newly built Miao-Vijaynagar road or helicopter flights from Miao/Mohanbari.',
      bestTimeToVisit: 'November to March.',
      visitingDuration: '3 to 4 hours'
    },
    coordinates: { lat: 27.2011, lng: 96.9944 },
    googleMapsUrl: 'https://maps.google.com/?q=27.2011,96.9944',
    mapsUrl: 'https://maps.google.com/?q=27.2011,96.9944',
    transportInformation: {
      nearestRailway: 'Ledo Railway Station – 210 km; Tinsukia – 260 km.',
      nearestAirport: 'Dibrugarh Airport (DIB) – 290 km.',
      nearestBus: 'Miao Bus Stand – 157 km.',
      roadConnectivity: 'Miao-Vijaynagar Highway through Namdapha National Park.',
      localTransport: 'Specialized 4x4 vehicles from Miao.'
    },
    image: 'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80', caption: 'Ancient Buddhist stupa foundations at Vijaynagar', category: 'Stupa' }
    ],
    festivals: [
      { name: 'Buddha Jayanti', month: 'May', description: 'Celebrated by local Yobin and Gorkha Buddhist residents.' }
    ],
    featured: false,
    isPopular: false,
    averageRating: 4.7,
    reviewCount: 6
  },

  // 13. Tawang Monastery
  {
    name: 'Tawang Monastery',
    altName: 'Galden Namgey Lhatse',
    altNames: ['Tawang Gompa', 'Celestial Paradise of Divine Victory'],
    category: 'Monasteries & Buddhist Heritage',
    state: 'Arunachal Pradesh',
    stateCode: 'AR',
    district: 'Tawang',
    location: 'Ridge overlooking Tawang Chu valley, at 10,000 ft',
    address: 'Tawang Monastery, Tawang Town, Tawang District, Arunachal Pradesh - 790104',
    description: 'Founded in 1680–1681 CE, Tawang Monastery is the largest Buddhist monastery in India and the second largest in the world after the Potala Palace in Lhasa. Home to over 400 monks, an 18-foot gilded Buddha statue, and ancient Buddhist scriptures.',
    historicalBackground: 'Founded by Merag Lama Lodre Gyatso in accordance with the wishes of the 5th Dalai Lama, Ngawang Lobsang Gyatso. Perched dramatically at 10,000 feet, the massive three-story Dukhang (assembly hall) houses a library of sacred Kangyur and Tengyur manuscripts handwritten in gold ink.',
    establishmentPeriod: '1680–1681 CE (17th Century CE)',
    historicalPeriod: 'Late Medieval Himalayan Buddhist Era',
    timeline: [
      { period: '1680 CE', event: 'Foundation laid by Merag Lama Lodre Gyatso.' },
      { period: '1681 CE', event: 'Consecration of Galden Namgey Lhatse with blessing of 5th Dalai Lama.' },
      { period: '1959 CE', event: 'The 14th Dalai Lama finds refuge here after crossing from Tibet.' }
    ],
    dynasty: 'Gelugpa School of Tibetan Buddhism',
    historicalRulers: 'Merag Lama Lodre Gyatso & 5th Dalai Lama',
    culturalImportance: 'The supreme spiritual and cultural beacon of Mahayana Buddhism in India, revered globally for its sacred rituals, monastic debate, and Thangka preservation.',
    archaeologicalImportance: 'Centuries-old wooden Dukhang, sacred Thangkas, gold-lettered Buddhist Kangyur manuscripts, and 65 residential quarters.',
    architecture: 'Majestic Tibetan-Monpa monastic palace architecture with fortified stone whitewashed walls, golden roof finials, carved wooden window frames, and vibrant multi-colored murals.',
    architecturalStyle: 'Classical Tibetan Gelugpa Monastic Architecture',
    unescoStatus: 'Recognized National & International Heritage Monastic Complex',
    unescoListed: false,
    visitorInformation: {
      openingTime: '07:00 AM',
      closingTime: '06:00 PM',
      timings: '07:00 AM – 06:00 PM (Daily)',
      entryFees: 'Free Entry / Small museum maintenance donation of ₹20',
      ticketBooking: 'No ticket required for monastery',
      guidelines: 'Remove shoes before entering the Dukhang (Assembly Hall); walk clockwise around shrines and prayer wheels; maintain respectful silence during chanting.',
      photography: 'Permitted in courtyard; photography strictly prohibited inside the main sanctum.',
      dressCode: 'Respectful, modest clothing. Warm woolens essential throughout the year.',
      restrictions: 'No smoking, alcohol, or touching of sacred Thangkas and statues.',
      accessibility: 'Paved paths and stone ramps available to main courtyard.',
      bestTimeToVisit: 'March to October; winter (Dec-Jan) for snow landscapes and Torgya festival.',
      visitingDuration: '2 to 4 hours'
    },
    coordinates: { lat: 27.5861, lng: 91.8594 },
    googleMapsUrl: 'https://maps.google.com/?q=27.5861,91.8594',
    mapsUrl: 'https://maps.google.com/?q=27.5861,91.8594',
    transportInformation: {
      nearestRailway: 'Bhalukpong – 280 km; Rangapara – 330 km.',
      nearestAirport: 'Salonibari / Tezpur – 340 km; Guwahati – 480 km.',
      nearestBus: 'Tawang Bus Stand – 2 km.',
      roadConnectivity: 'Spectacular mountain highway via Sela Pass (13,700 ft) on NH-13.',
      localTransport: 'Taxis, shared sumos, and local buses available in Tawang.'
    },
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&auto=format&fit=crop&q=80'
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80', caption: 'The majestic three-story Tawang Monastery on the mountain ridge', category: 'Monastery' },
      { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&auto=format&fit=crop&q=80', caption: 'Panoramic view of Tawang valley from the monastery courtyard', category: 'Landscape' },
      { url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&auto=format&fit=crop&q=80', caption: 'Sacred monastic architecture and golden roof finials', category: 'Architecture' }
    ],
    festivals: [
      { name: 'Torgya Festival', month: 'January', description: 'Monastic 3-day festival featuring sacred monastic Cham dances and the burning of the Torgya effigy to ward off evil.' },
      { name: 'Losar (Monpa New Year)', month: 'February–March', description: '15-day celebration with family feasts, prayers, and flag hoisting.' },
      { name: 'Saka Dawa', month: 'May–June', description: 'Commemorating the Buddha\'s birth, enlightenment, and Mahaparinirvana.' }
    ],
    featured: true,
    isPopular: true,
    averageRating: 5.0,
    reviewCount: 35
  },

  // 14. Urgelling Monastery
  {
    name: 'Urgelling Monastery',
    altName: 'Birthplace of the 6th Dalai Lama',
    altNames: ['Urgyelling Gompa', 'Urgelling Shrine'],
    category: 'Monasteries & Buddhist Heritage',
    state: 'Arunachal Pradesh',
    stateCode: 'AR',
    district: 'Tawang',
    location: '5 km south of Tawang town',
    address: 'Urgelling Village, Tawang, Arunachal Pradesh - 790104',
    description: 'An ancient monastery founded around 1489 CE, internationally celebrated as the birthplace of Tsangyang Gyatso, the 6th Dalai Lama, in 1683 CE.',
    historicalBackground: 'Founded by Urgyen Sangpo, the younger brother of Terton Pema Lingpa. The monastery preserves a sacred weeping willow tree believed to have grown from a walking stick planted by the 6th Dalai Lama before his departure for Lhasa.',
    establishmentPeriod: 'c. 1489 CE (15th Century CE)',
    historicalPeriod: 'Medieval Himalayan Era',
    timeline: [
      { period: '1489 CE', event: 'Monastery founded by Urgyen Sangpo.' },
      { period: '1683 CE', event: 'Birth of Tsangyang Gyatso, the 6th Dalai Lama.' }
    ],
    dynasty: 'Nyingma & Gelugpa Traditions',
    historicalRulers: 'Lama Urgyen Sangpo & 6th Dalai Lama',
    culturalImportance: 'A sacred pilgrimage destination for Buddhists worldwide honoring the poetic and spiritually revered 6th Dalai Lama.',
    archaeologicalImportance: 'Historic stone footprint impression of the child Dalai Lama and ancient prayer hall relics.',
    architecture: 'Traditional stone-and-timber gompa with prayer wheels and sacred willow garden.',
    architecturalStyle: 'Traditional Tibetan Buddhist Monastic Architecture',
    unescoStatus: 'Recognized Historic Heritage Site',
    unescoListed: false,
    visitorInformation: {
      openingTime: '07:30 AM',
      closingTime: '05:30 PM',
      timings: '07:30 AM – 05:30 PM (Daily)',
      entryFees: 'Free Entry',
      ticketBooking: 'No ticket required',
      guidelines: 'Maintain silence; walk clockwise around the sacred prayer hall and holy willow tree.',
      photography: 'Permitted in gardens; restricted inside the prayer sanctum.',
      dressCode: 'Modest clothing.',
      restrictions: 'Respect the tranquil monastic environment.',
      accessibility: 'Level stone walkway from the vehicle parking area.',
      bestTimeToVisit: 'March to November.',
      visitingDuration: '1 to 1.5 hours'
    },
    coordinates: { lat: 27.5683, lng: 91.8622 },
    googleMapsUrl: 'https://maps.google.com/?q=27.5683,91.8622',
    mapsUrl: 'https://maps.google.com/?q=27.5683,91.8622',
    transportInformation: {
      nearestRailway: 'Bhalukpong – 285 km.',
      nearestAirport: 'Tezpur – 345 km.',
      nearestBus: 'Tawang Bus Stand – 5 km.',
      roadConnectivity: 'Short scenic drive from Tawang town.',
      localTransport: 'Local taxis from Tawang main market.'
    },
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80', caption: 'Urgelling Monastery prayer hall and sacred willow tree', category: 'Monastery' }
    ],
    festivals: [
      { name: 'Dalai Lama Birth Anniversary', month: 'March', description: 'Special prayers and butter lamps offered in remembrance.' }
    ],
    featured: true,
    isPopular: true,
    averageRating: 4.8,
    reviewCount: 17
  },

  // 15. Bomdila Monastery
  {
    name: 'Bomdila Monastery',
    altName: 'Gentse Gaden Rabgyel Lling',
    altNames: ['Bomdila Gompa', 'Upper Gompa Bomdila'],
    category: 'Monasteries & Buddhist Heritage',
    state: 'Arunachal Pradesh',
    stateCode: 'AR',
    district: 'West Kameng',
    location: 'Hilltop overlooking Bomdila town, at 8,500 ft',
    address: 'Upper Gompa, Bomdila, West Kameng District, Arunachal Pradesh - 790001',
    description: 'Established in 1965 by the 12th reincarnate of the Tsona Gontse Rinpoche, Bomdila Monastery is a grand Mahayana Buddhist complex modeled after the celebrated Tsona Gontse Monastery in Tibet.',
    historicalBackground: 'Founded to preserve Mahayana monastic scholarship and spiritual training following the 1959 migration. The monastery comprises the Upper Gompa, Middle Gompa, and Lower Gompa, housing an immense Buddha statue and monastic school.',
    establishmentPeriod: '1965 CE (20th Century CE)',
    historicalPeriod: 'Modern Himalayan Buddhist Era',
    timeline: [
      { period: '1965 CE', event: 'Monastery established by 12th Tsona Gontse Rinpoche.' },
      { period: '1997 CE', event: 'Expansion of the grand Upper Gompa assembly hall and museum.' }
    ],
    dynasty: 'Gelugpa School of Buddhism',
    historicalRulers: '12th Tsona Gontse Rinpoche',
    culturalImportance: 'The premier center for Buddhist education, monastic philosophy, and community welfare in West Kameng.',
    archaeologicalImportance: 'Intricate Buddhist wall frescoes, prayer drums, ancient thangkas, and Buddhist library.',
    architecture: 'Magnificent multi-tiered Tibetan Buddhist architecture adorned with rich red-and-gold woodwork and dragon reliefs.',
    architecturalStyle: 'Contemporary Tibetan Buddhist Monastic Architecture',
    unescoStatus: 'Major Buddhist Monastic Center',
    unescoListed: false,
    visitorInformation: {
      openingTime: '06:00 AM',
      closingTime: '06:00 PM',
      timings: '06:00 AM – 06:00 PM (Daily)',
      entryFees: 'Free Entry',
      ticketBooking: 'No ticket required',
      guidelines: 'Remove shoes before entering prayer halls; photography permitted in open courtyard.',
      photography: 'Permitted in courtyard; follow monk instructions inside.',
      dressCode: 'Modest warm attire.',
      restrictions: 'Maintain meditative silence during monk chanting sessions.',
      accessibility: 'Vehicle drive directly to Upper Gompa gate with gentle steps.',
      bestTimeToVisit: 'Throughout the year; snow-capped Himalayan peaks in winter.',
      visitingDuration: '1.5 to 2.5 hours'
    },
    coordinates: { lat: 27.2644, lng: 92.4189 },
    googleMapsUrl: 'https://maps.google.com/?q=27.2644,92.4189',
    mapsUrl: 'https://maps.google.com/?q=27.2644,92.4189',
    transportInformation: {
      nearestRailway: 'Bhalukpong – 100 km; Rangapara – 145 km.',
      nearestAirport: 'Tezpur – 160 km; Guwahati – 290 km.',
      nearestBus: 'Bomdila Bus Stand – 2 km.',
      roadConnectivity: 'Central junction on the main NH-13 highway to Tawang.',
      localTransport: 'Local taxis and shared sumos from Bomdila center.'
    },
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80', caption: 'Upper Gompa prayer hall at Bomdila Monastery', category: 'Monastery' }
    ],
    festivals: [
      { name: 'Losar Celebration', month: 'February', description: 'Monastic prayers, trumpets, and new year blessings.' },
      { name: 'Saka Dawa', month: 'June', description: 'Prayers honoring Lord Buddha\'s enlightenment.' }
    ],
    featured: true,
    isPopular: true,
    averageRating: 4.8,
    reviewCount: 19
  },

  // 16. Taktsang Gompa
  {
    name: 'Taktsang Gompa',
    altName: "Tiger's Den Monastery",
    altNames: ['Taksang Monastery', 'Guru Padmasambhava Cave Gompa'],
    category: 'Monasteries & Buddhist Heritage',
    state: 'Arunachal Pradesh',
    stateCode: 'AR',
    district: 'Tawang',
    location: 'Perched at 12,500 ft near Sangestar Tso, Tawang',
    address: 'Taktsang Ridge, near Lumla / Sangestar, Tawang District, Arunachal Pradesh - 790104',
    description: 'A legendary 8th-century cliffside cave monastery perched at an altitude of 12,500 feet amidst pristine rhododendron forests, revered as one of the sacred meditation retreats of Guru Padmasambhava (Guru Rinpoche).',
    historicalBackground: 'Founded in the 8th century CE during Guru Padmasambhava\'s spiritual journey through the Himalayas. Legend recounts that Guru Rinpoche manifested in the wrathful form of Dorje Drolo and meditated in this cliff cave, subduing malevolent spirits.',
    establishmentPeriod: '8th Century CE',
    historicalPeriod: 'Early Medieval Himalayan Era',
    timeline: [
      { period: 'c. 750 CE', event: 'Guru Padmasambhava meditates in the cliffside cave.' },
      { period: '17th Century', event: 'Monastic stone sanctum and retreat cells built around the cave.' }
    ],
    dynasty: 'Nyingmapa School',
    historicalRulers: 'Guru Padmasambhava',
    culturalImportance: 'One of the most sacred pilgrimage destinations in Arunachal Pradesh, drawing pilgrims seeking spiritual empowerment and peace.',
    archaeologicalImportance: 'Sacred meditation cave, holy rock foot and hand impressions of Guru Rinpoche.',
    architecture: 'Cliff-hugging stone masonry and wooden balcony architecture overlooking deep Himalayan gorges.',
    architecturalStyle: 'Traditional Himalayan Cliff Cave Monastery',
    unescoStatus: 'Revered Sacred Natural & Religious Site',
    unescoListed: false,
    visitorInformation: {
      openingTime: '08:00 AM',
      closingTime: '04:00 PM',
      timings: '08:00 AM – 04:00 PM (Daily)',
      entryFees: 'Free Entry',
      ticketBooking: 'No ticket required',
      guidelines: 'Inner Line Permit and local Army/DC movement pass required for this border route; carry heavy woolens.',
      photography: 'Permitted in outdoor viewpoints; restricted inside meditation cave.',
      dressCode: 'Heavy winter woolens and sturdy trekking boots.',
      restrictions: 'Keep the alpine surroundings pristine.',
      accessibility: 'Short walking ascent from the high-altitude road head.',
      bestTimeToVisit: 'April to October (Winter features heavy snowfall).',
      visitingDuration: '1.5 to 2 hours'
    },
    coordinates: { lat: 27.6711, lng: 91.8155 },
    googleMapsUrl: 'https://maps.google.com/?q=27.6711,91.8155',
    mapsUrl: 'https://maps.google.com/?q=27.6711,91.8155',
    transportInformation: {
      nearestRailway: 'Bhalukpong – 320 km.',
      nearestAirport: 'Tezpur – 380 km.',
      nearestBus: 'Tawang Bus Stand – 45 km.',
      roadConnectivity: 'Rugged high-altitude mountain road from Tawang via PTSO Lake.',
      localTransport: 'Specialized 4x4 SUVs / Tata Sumos hired in Tawang.'
    },
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80', caption: 'Taktsang Gompa perched at 12,500 ft amid rhododendrons', category: 'Cliff' }
    ],
    festivals: [
      { name: 'Guru Rinpoche Tsechu', month: 'July', description: 'Celebration of Guru Padmasambhava with sacred prayers and butter offerings.' }
    ],
    featured: true,
    isPopular: true,
    averageRating: 5.0,
    reviewCount: 22
  },

  // 17. Samten Yongcha Monastery
  {
    name: 'Samten Yongcha Monastery',
    altName: '400-Year-Old Mechuka Gompa',
    altNames: ['Samten Yongcha Gompa', 'Old Mechuka Monastery'],
    category: 'Monasteries & Buddhist Heritage',
    state: 'Arunachal Pradesh',
    stateCode: 'AR',
    district: 'Shi-Yomi',
    location: 'Hilltop overlooking the mystical Mechuka Valley',
    address: 'Hilltop Gompa, Mechuka Town, Shi-Yomi District, Arunachal Pradesh - 791003',
    description: 'A 400-year-old Mahayana Buddhist monastery perched on a hilltop overlooking the snow-capped peaks and the meandering Yargyap Chu river in the mystical Mechuka valley, pre-dating Tawang Monastery.',
    historicalBackground: 'Founded in the 14th–15th century CE, the monastery belongs to the Gelugpa sect and houses ancient Buddhist statues, carved wooden masks, and centuries-old thangkas revered by the Memba and Ramo communities.',
    establishmentPeriod: 'c. 1600 CE (16th–17th Century CE)',
    historicalPeriod: 'Medieval Himalayan Buddhist Era',
    timeline: [
      { period: 'c. 1600 CE', event: 'Foundation laid by Buddhist spiritual masters in the remote valley.' },
      { period: '20th Century', event: 'Preservation of ancient wooden mask collections used in Cham dances.' }
    ],
    dynasty: 'Gelugpa Buddhist Tradition',
    historicalRulers: 'Early Memba Buddhist Lamas',
    culturalImportance: 'The spiritual heart of the Memba people and a repository of unique trans-Himalayan Buddhist art.',
    archaeologicalImportance: 'Centuries-old wooden sculptures, sacred masks, and handwritten Buddhist scriptures.',
    architecture: 'Traditional wooden cantilever and stone-block architecture designed to withstand heavy alpine snow.',
    architecturalStyle: 'Traditional Memba Wooden Monastic Architecture',
    unescoStatus: 'Ancient Monastic Heritage Site',
    unescoListed: false,
    visitorInformation: {
      openingTime: '07:30 AM',
      closingTime: '05:00 PM',
      timings: '07:30 AM – 05:00 PM (Daily)',
      entryFees: 'Free Entry',
      ticketBooking: 'No ticket required',
      guidelines: 'Remove shoes before entering; enjoy breathtaking valley views from the outer perimeter.',
      photography: 'Permitted in courtyard; follow monk guidance inside.',
      dressCode: 'Warm woolen clothing.',
      restrictions: 'Do not touch historical wooden statues.',
      accessibility: 'Scenic hill walk of about 15 minutes from nearest road approach.',
      bestTimeToVisit: 'October to May (Spring brings blooming wildflowers across Mechuka valley).',
      visitingDuration: '1.5 to 2 hours'
    },
    coordinates: { lat: 28.6011, lng: 94.1333 },
    googleMapsUrl: 'https://maps.google.com/?q=28.6011,94.1333',
    mapsUrl: 'https://maps.google.com/?q=28.6011,94.1333',
    transportInformation: {
      nearestRailway: 'Silapathar – 240 km.',
      nearestAirport: 'Mechuka Advanced Landing Ground (charter flights); Pasighat – 280 km.',
      nearestBus: 'Mechuka Bus Stop – 3 km.',
      roadConnectivity: 'Connected via Aalo-Mechuka scenic highway.',
      localTransport: 'Shared Sumos and local taxis in Mechuka.'
    },
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80', caption: 'Samten Yongcha Monastery perched high above Mechuka valley', category: 'Landscape' }
    ],
    festivals: [
      { name: 'Losar Festival', month: 'February', description: 'Memba community new year celebration with mask dances.' }
    ],
    featured: true,
    isPopular: true,
    averageRating: 4.9,
    reviewCount: 16
  },

  // 18. Lhagyala Gompa
  {
    name: 'Lhagyala Gompa',
    altName: 'Place of a Hundred Gods',
    altNames: ['Lhagyala Monastery', 'Morshing Gompa'],
    category: 'Monasteries & Buddhist Heritage',
    state: 'Arunachal Pradesh',
    stateCode: 'AR',
    district: 'West Kameng',
    location: 'Hilltop near Morshing Village, West Kameng',
    address: 'Lhagyala Gompa Ridge, Morshing, West Kameng, Arunachal Pradesh - 790115',
    description: 'An ancient monastery founded in the 7th century CE by Kalsang Lama, venerated as the "Place of a Hundred Gods" and known for its repository of ancient Buddhist manuscripts, thangkas, and sacred weapons.',
    historicalBackground: 'One of the oldest monasteries in Arunachal Pradesh, dating back over 1,300 years to the era of the Tibetan king Songtsen Gampo. It preserves ancient handwritten Buddhist scriptures, sacred ritual swords, and historic murals.',
    establishmentPeriod: '7th Century CE',
    historicalPeriod: 'Early Medieval Himalayan Era',
    timeline: [
      { period: 'c. 7th Century CE', event: 'Founded by Kalsang Lama as a sacred retreat.' },
      { period: '18th Century CE', event: 'Renovation and expansion of the main prayer hall.' }
    ],
    dynasty: 'Kagyu & Gelug Traditions',
    historicalRulers: 'Kalsang Lama',
    culturalImportance: 'A sacred ancient bastion of Buddhist scriptures and religious relics in the Morshing-Rupa valley.',
    archaeologicalImportance: 'Ancient copper-leafed scriptures, ancient ritual daggers (Phurba), and murals.',
    architecture: 'Traditional stone-and-timber structure set against alpine pine trees.',
    architecturalStyle: 'Ancient Himalayan Monastic Stone Architecture',
    unescoStatus: 'Historic Sacred Monastic Site',
    unescoListed: false,
    visitorInformation: {
      openingTime: '08:00 AM',
      closingTime: '05:00 PM',
      timings: '08:00 AM – 05:00 PM (Daily)',
      entryFees: 'Free Entry',
      ticketBooking: 'No ticket required',
      guidelines: 'Respect ancient manuscripts and peaceful meditation setting.',
      photography: 'Permitted in courtyard.',
      dressCode: 'Modest clothing.',
      restrictions: 'Do not handle historical relics.',
      accessibility: 'Short walking trail from the road terminus.',
      bestTimeToVisit: 'October to May.',
      visitingDuration: '1.5 hours'
    },
    coordinates: { lat: 27.1833, lng: 92.2500 },
    googleMapsUrl: 'https://maps.google.com/?q=27.1833,92.2500',
    mapsUrl: 'https://maps.google.com/?q=27.1833,92.2500',
    transportInformation: {
      nearestRailway: 'Bhalukpong – 115 km.',
      nearestAirport: 'Tezpur – 175 km.',
      nearestBus: 'Rupa Bus Stand – 15 km.',
      roadConnectivity: 'Branch road from Rupa-Kalaktang highway.',
      localTransport: 'Shared cabs from Rupa.'
    },
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80', caption: 'Lhagyala Gompa overlooking the valley of Morshing', category: 'Monastery' }
    ],
    festivals: [
      { name: 'Kro-Chekor Festival', month: 'June', description: 'Procession of ancient Buddhist scriptures around the villages.' }
    ],
    featured: false,
    isPopular: false,
    averageRating: 4.8,
    reviewCount: 9
  },

  // 19. Kalachakra Gompa
  {
    name: 'Kalachakra Gompa',
    altName: 'Wheel of Time Monastery',
    altNames: ['Kalachakra Temple', 'Dirang Kalachakra Gompa'],
    category: 'Monasteries & Buddhist Heritage',
    state: 'Arunachal Pradesh',
    stateCode: 'AR',
    district: 'West Kameng',
    location: 'Kalachakra Village, near Dirang',
    address: 'Kalachakra Village, Dirang, West Kameng, Arunachal Pradesh - 790101',
    description: 'A 500-year-old Gelugpa school Buddhist monastery dedicated to Kalachakra (The Wheel of Cosmic Time), celebrated for its intricate mandalas, peaceful meditation caves, and apple orchard surroundings.',
    historicalBackground: 'Built approximately five centuries ago as a spiritual retreat dedicated to Kalachakra Tantra. It contains sacred cosmic mandalas painted with mineral pigments and a serene statue of the Buddha.',
    establishmentPeriod: 'c. 15th–16th Century CE',
    historicalPeriod: 'Medieval Era',
    timeline: [
      { period: '15th Century CE', event: 'Consecration of the Kalachakra meditation sanctum.' }
    ],
    dynasty: 'Gelugpa Tradition',
    historicalRulers: 'Local Buddhist Masters',
    culturalImportance: 'Center for Kalachakra peace prayers and Tantric meditation.',
    archaeologicalImportance: 'Ancient Kalachakra cosmic wheel murals and thangkas.',
    architecture: 'Traditional stone-masonry gompa with prayer wheels and apple orchard perimeter.',
    architecturalStyle: 'Traditional Tibetan Buddhist Architecture',
    unescoStatus: 'Historic Monastic Shrine',
    unescoListed: false,
    visitorInformation: {
      openingTime: '08:00 AM',
      closingTime: '05:00 PM',
      timings: '08:00 AM – 05:00 PM (Daily)',
      entryFees: 'Free Entry',
      ticketBooking: 'No ticket required',
      guidelines: 'Maintain silence; walk clockwise around prayer wheels.',
      photography: 'Permitted in outer garden.',
      dressCode: 'Modest clothing.',
      restrictions: 'Respect meditation sanctum.',
      accessibility: 'Short walking path from Kalachakra village road.',
      bestTimeToVisit: 'October to April.',
      visitingDuration: '1 hour'
    },
    coordinates: { lat: 27.3522, lng: 92.2411 },
    googleMapsUrl: 'https://maps.google.com/?q=27.3522,92.2411',
    mapsUrl: 'https://maps.google.com/?q=27.3522,92.2411',
    transportInformation: {
      nearestRailway: 'Bhalukpong – 140 km.',
      nearestAirport: 'Tezpur – 200 km.',
      nearestBus: 'Dirang – 2 km.',
      roadConnectivity: 'Short branch road from Dirang market.',
      localTransport: 'Taxis or short walk from Dirang.'
    },
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80', caption: 'Kalachakra Gompa in peaceful Dirang valley', category: 'Temple' }
    ],
    festivals: [
      { name: 'Kalachakra Puja', month: 'October', description: 'Sacred chanting and butter lamp offerings for universal peace.' }
    ],
    featured: false,
    isPopular: false,
    averageRating: 4.7,
    reviewCount: 11
  },

  // 20. Pelden Thuwang Monastery
  {
    name: 'Pelden Thuwang Monastery',
    altName: 'Ancient Wooden Gompa of Mechuka',
    altNames: ['Pelden Thuwang Gompa', 'Old Wooden Monastery'],
    category: 'Monasteries & Buddhist Heritage',
    state: 'Arunachal Pradesh',
    stateCode: 'AR',
    district: 'Shi-Yomi',
    location: 'Mechuka Valley outskirts',
    address: 'Mechuka Valley, Shi-Yomi District, Arunachal Pradesh - 791003',
    description: 'An ancient wooden Buddhist monastery set against the breathtaking snow-covered peaks of the Eastern Himalayas in Mechuka, showcasing masterly woodwork, prayer wheels, and ancient ritual bells.',
    historicalBackground: 'Constructed centuries ago by Memba wood craftsmen and lamas, utilizing indigenous pinewood and slate. It has preserved continuous Buddhist monastic routines in one of the most secluded valleys on earth.',
    establishmentPeriod: '17th Century CE',
    historicalPeriod: 'Medieval Era',
    timeline: [
      { period: '17th Century CE', event: 'Construction of the wooden monastic shrine.' }
    ],
    dynasty: 'Memba Buddhist Lineage',
    historicalRulers: 'Memba Lamas',
    culturalImportance: 'Preserves traditional Himalayan woodcraft, ancient Buddhist chanting rituals, and community harmony.',
    archaeologicalImportance: 'Hand-hewn timber pillars, ancient bronze prayer wheels, and sacred thangka relics.',
    architecture: 'High-pitch timber gabled roof designed for heavy alpine snowfall.',
    architecturalStyle: 'Traditional Vernacular Wooden Monastic Architecture',
    unescoStatus: 'Historic Cultural Shrine',
    unescoListed: false,
    visitorInformation: {
      openingTime: '08:00 AM',
      closingTime: '04:30 PM',
      timings: '08:00 AM – 04:30 PM (Daily)',
      entryFees: 'Free Entry',
      ticketBooking: 'No ticket required',
      guidelines: 'Wear warm clothing; remove shoes at the wooden threshold.',
      photography: 'Permitted in courtyard.',
      dressCode: 'Warm modest clothing.',
      restrictions: 'Keep the sacred valley quiet and litter-free.',
      accessibility: 'Walking trail from Mechuka village.',
      bestTimeToVisit: 'October to May.',
      visitingDuration: '1.5 hours'
    },
    coordinates: { lat: 28.5944, lng: 94.1422 },
    googleMapsUrl: 'https://maps.google.com/?q=28.5944,94.1422',
    mapsUrl: 'https://maps.google.com/?q=28.5944,94.1422',
    transportInformation: {
      nearestRailway: 'Silapathar – 240 km.',
      nearestAirport: 'Pasighat – 280 km.',
      nearestBus: 'Mechuka – 2 km.',
      roadConnectivity: 'Aalo-Mechuka highway.',
      localTransport: 'Walking or local sumo from Mechuka.'
    },
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80', caption: 'Wooden structure of Pelden Thuwang Monastery in Mechuka', category: 'Woodwork' }
    ],
    festivals: [
      { name: 'Mechuka Adventure & Cultural Festival', month: 'November', description: 'Valley festival celebrating culture and outdoor adventure.' }
    ],
    featured: false,
    isPopular: false,
    averageRating: 4.8,
    reviewCount: 10
  },

  // 21. Nyukong Gompa
  {
    name: 'Nyukong Gompa',
    altName: 'Pemakod Hidden Land Monastery',
    altNames: ['Nyukong Monastery', 'Tuting Sacred Gompa'],
    category: 'Monasteries & Buddhist Heritage',
    state: 'Arunachal Pradesh',
    stateCode: 'AR',
    district: 'Upper Siang',
    location: 'Tuting, sacred Pemakod valley',
    address: 'Nyukong, Tuting, Upper Siang District, Arunachal Pradesh - 791105',
    description: 'A deeply revered Nyingmapa Buddhist monastery situated in the sacred Pemakod ("Lotus Arrayed Land") hidden valley along the Siang River, famous for its peace stupa, sacred relics, and panoramic river vistas.',
    historicalBackground: 'Founded according to prophecy in the sacred Pemakod valley, recognized in Tibetan Buddhist tradition as one of the supreme hidden holy lands (Beyul) sanctified by Guru Padmasambhava.',
    establishmentPeriod: '19th Century CE',
    historicalPeriod: 'Late Himalayan Buddhist Period',
    timeline: [
      { period: '19th Century CE', event: 'Established by Nyingmapa yogis along the sacred Siang river.' }
    ],
    dynasty: 'Nyingmapa Tradition',
    historicalRulers: 'Pemakod Lamas',
    culturalImportance: 'A primary spiritual anchor for Buddhist communities in the remote Upper Siang border region.',
    archaeologicalImportance: 'Ancient prayer wheels, Mani stones, and Guru Padmasambhava frescoes.',
    architecture: 'Traditional Himalayan monastic pavilion with colorful prayer flags and brass finials.',
    architecturalStyle: 'Traditional Nyingmapa Monastic Architecture',
    unescoStatus: 'Sacred Himalayan Pilgrimage Site',
    unescoListed: false,
    visitorInformation: {
      openingTime: '07:30 AM',
      closingTime: '05:00 PM',
      timings: '07:30 AM – 05:00 PM (Daily)',
      entryFees: 'Free Entry',
      ticketBooking: 'No ticket required',
      guidelines: 'Maintain silence; walk clockwise around stupas.',
      photography: 'Permitted in courtyard.',
      dressCode: 'Modest clothing.',
      restrictions: 'Do not litter in the sacred valley.',
      accessibility: 'Walkway from Tuting town.',
      bestTimeToVisit: 'October to April.',
      visitingDuration: '1.5 hours'
    },
    coordinates: { lat: 28.9833, lng: 94.9000 },
    googleMapsUrl: 'https://maps.google.com/?q=28.9833,94.9000',
    mapsUrl: 'https://maps.google.com/?q=28.9833,94.9000',
    transportInformation: {
      nearestRailway: 'Murkongselek – 260 km.',
      nearestAirport: 'Pasighat – 280 km.',
      nearestBus: 'Tuting Bus Stop – 2 km.',
      roadConnectivity: 'Yinkiong-Tuting Highway along Siang River.',
      localTransport: 'Sumos from Yingkiong.'
    },
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80', caption: 'Nyukong Gompa in sacred Pemakod valley', category: 'Monastery' }
    ],
    festivals: [
      { name: 'Pemakod Prayer Festival', month: 'December', description: 'Annual prayers for world peace and environmental harmony.' }
    ],
    featured: false,
    isPopular: false,
    averageRating: 4.8,
    reviewCount: 7
  },

  // 22. Mud Gompa – Shergaon
  {
    name: 'Mud Gompa – Shergaon',
    altName: 'Sherdukpen Earthen Monastery',
    altNames: ['Lhakhang Mud Temple', 'Zengbu Gompa'],
    category: 'Monasteries & Buddhist Heritage',
    state: 'Arunachal Pradesh',
    stateCode: 'AR',
    district: 'West Kameng',
    location: 'Shergaon Village, West Kameng',
    address: 'Shergaon Village, West Kameng District, Arunachal Pradesh - 790001',
    description: 'A centuries-old earthen monastery constructed with traditional rammed-earth, river stones, and heavy timber by the Sherdukpen community, showcasing rare vernacular Himalayan earthen architecture.',
    historicalBackground: 'Built centuries ago in the idyllic Shergaon valley by Sherdukpen village elders and lamas. It preserves unique mud-rendered walls adorned with mineral frescoes and historical prayer wheels.',
    establishmentPeriod: '17th Century CE',
    historicalPeriod: 'Medieval Sherdukpen Era',
    timeline: [
      { period: '17th Century CE', event: 'Construction of the rammed-earth monastery in Shergaon.' }
    ],
    dynasty: 'Sherdukpen Tribal Chieftaincy',
    historicalRulers: 'Sherdukpen Thongs and Chao Council',
    culturalImportance: 'The spiritual centerpiece of the Sherdukpen tribe\'s religious and community life.',
    archaeologicalImportance: 'Unique rammed-earth building technology, ancient mud sculptures, and hand-carved prayer wheels.',
    architecture: 'Rammed-earth and timber architecture with thick thermal earthen walls.',
    architecturalStyle: 'Indigenous Sherdukpen Earthen Himalayan Architecture',
    unescoStatus: 'Community Protected Living Heritage Site',
    unescoListed: false,
    visitorInformation: {
      openingTime: '08:00 AM',
      closingTime: '05:00 PM',
      timings: '08:00 AM – 05:00 PM (Daily)',
      entryFees: 'Free Entry',
      ticketBooking: 'No ticket required',
      guidelines: 'Respect indigenous village customs; take off footwear at the door.',
      photography: 'Permitted outside; ask village elder before photographing inside.',
      dressCode: 'Modest attire.',
      restrictions: 'Do not scratch or lean heavily on ancient mud walls.',
      accessibility: 'Flat village walking trail.',
      bestTimeToVisit: 'Throughout the year; autumn and spring are pleasant.',
      visitingDuration: '1 to 1.5 hours'
    },
    coordinates: { lat: 27.1244, lng: 92.2611 },
    googleMapsUrl: 'https://maps.google.com/?q=27.1244,92.2611',
    mapsUrl: 'https://maps.google.com/?q=27.1244,92.2611',
    transportInformation: {
      nearestRailway: 'Bhalukpong – 105 km.',
      nearestAirport: 'Tezpur – 165 km.',
      nearestBus: 'Rupa – 25 km.',
      roadConnectivity: 'Connected via scenic Rupa-Shergaon road.',
      localTransport: 'Taxis from Rupa or Bomdila.'
    },
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80', caption: 'Traditional rammed-earth architecture of Mud Gompa in Shergaon', category: 'Earthen' }
    ],
    festivals: [
      { name: 'Kro-Chekor', month: 'May', description: 'Sherdukpen agricultural blessings festival with scriptures.' }
    ],
    featured: false,
    isPopular: false,
    averageRating: 4.8,
    reviewCount: 12
  },

  // 23. Tawang War Memorial
  {
    name: 'Tawang War Memorial',
    altName: '1962 War Martyrs Memorial Stupa',
    altNames: ['Tawang Smriti Sthal', 'Amar Jawan Tawang'],
    category: 'War Memorials',
    state: 'Arunachal Pradesh',
    stateCode: 'AR',
    district: 'Tawang',
    location: 'Hilltop ridge near Tawang town',
    address: 'Tawang War Memorial, Tawang Town, Arunachal Pradesh - 790104',
    description: 'A poignant 40-foot-high multi-hued memorial stupa designed in traditional Buddhist chorten style, commemorating the supreme sacrifice of 2,420 brave soldiers of the Indian Army who laid down their lives in the 1962 Sino-Indian War.',
    historicalBackground: 'Inaugurated by the Indian Army in memory of the martyrs who defended the Kameng frontier during October–November 1962. It features bronze bust statues of Subedar Joginder Singh (Param Vir Chakra) and other national heroes, weapon displays, and an evening sound-and-light presentation.',
    establishmentPeriod: '1999–2000 CE',
    historicalPeriod: 'Contemporary Military History',
    timeline: [
      { period: 'October–November 1962', event: 'Fierce battles fought across the Kameng sector.' },
      { period: '1999 CE', event: 'Construction of the stupa memorial by Indian Army.' }
    ],
    dynasty: 'Republic of India Military History',
    historicalRulers: 'Indian Armed Forces',
    culturalImportance: 'A national shrine of courage, valor, and patriotic remembrance for all visiting citizens and soldiers.',
    archaeologicalImportance: 'Memorial Stupa, eternal flame (Amar Jawan Jyoti), 1962 war artifacts, and battle maps.',
    architecture: 'Sacred Buddhist Stupa architecture harmonized with military regimental insignia and granite memorial walls.',
    architecturalStyle: 'Indo-Tibetan Memorial Stupa Architecture',
    unescoStatus: 'National Military Heritage Memorial',
    unescoListed: false,
    visitorInformation: {
      openingTime: '07:45 AM',
      closingTime: '06:00 PM',
      timings: '07:45 AM – 06:00 PM (Daily; Sound & Light show at 05:30 PM)',
      entryFees: 'Free Entry (Sound & Light show: ₹40 nominal)',
      ticketBooking: 'Counter at memorial entrance',
      guidelines: 'Maintain patriotic respect and decorum; salute the martyrs.',
      photography: 'Permitted in memorial grounds.',
      dressCode: 'Warm clothing.',
      restrictions: 'Loud music, littering, and disrespectful behavior strictly prohibited.',
      accessibility: 'Paved walkways and wheelchair ramps.',
      bestTimeToVisit: 'Throughout the year.',
      visitingDuration: '1.5 to 2 hours'
    },
    coordinates: { lat: 27.5855, lng: 91.8711 },
    googleMapsUrl: 'https://maps.google.com/?q=27.5855,91.8711',
    mapsUrl: 'https://maps.google.com/?q=27.5855,91.8711',
    transportInformation: {
      nearestRailway: 'Bhalukpong – 280 km.',
      nearestAirport: 'Tezpur – 340 km.',
      nearestBus: 'Tawang Bus Stand – 1 km.',
      roadConnectivity: 'On the main entry road into Tawang town.',
      localTransport: 'Walking or short cab ride from Tawang market.'
    },
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80', caption: 'The 40-foot Buddhist stupa at Tawang War Memorial', category: 'Memorial' }
    ],
    festivals: [
      { name: 'Vijay Diwas & Kargil Vijay Diwas', month: 'July & December', description: 'Wreath-laying ceremonies honoring brave soldiers.' }
    ],
    featured: true,
    isPopular: true,
    averageRating: 5.0,
    reviewCount: 30
  },

  // 24. Jaswant Garh War Memorial
  {
    name: 'Jaswant Garh War Memorial',
    altName: 'Memorial of the Hero of Nuranang',
    altNames: ['Jaswantgarh Shrine', 'Jaswant Singh Rawat Memorial'],
    category: 'War Memorials',
    state: 'Arunachal Pradesh',
    stateCode: 'AR',
    district: 'Tawang',
    location: 'Nuranang, between Sela Pass and Jang',
    address: 'NH-13, Nuranang, Tawang District, Arunachal Pradesh - 790105',
    description: 'A deeply venerated military shrine dedicated to Rifleman Jaswant Singh Rawat, Maha Vir Chakra (4th Garhwal Rifles), who single-handedly held off the advancing enemy for 72 hours during the Battle of Nuranang on November 17, 1962.',
    historicalBackground: 'Jaswant Singh Rawat, aided by two local Monpa heroines Sela and Nura, set up firing points across the ridge to deceive the enemy that an entire company was entrenched. He was posthumously decorated with the Maha Vir Chakra. The Indian Army treats him as still on duty, serving him meals and maintaining his personal room.',
    establishmentPeriod: 'Post-1962 CE',
    historicalPeriod: 'Contemporary Military History',
    timeline: [
      { period: 'November 17, 1962', event: 'Battle of Nuranang fought heroically by Jaswant Singh Rawat.' },
      { period: '1963 CE', event: 'Memorial established on the battle ridge beside the highway.' }
    ],
    dynasty: 'Republic of India Military Valor',
    historicalRulers: 'Rifleman Jaswant Singh Rawat (MVC)',
    culturalImportance: 'A sacred shrine where every passing traveler, soldier, and general stops to pay homage and drink hot tea served free by the Garhwal Rifles.',
    archaeologicalImportance: 'Preserves the original trench bunkers, the hero\'s uniform, brass rifle replicas, and personal room.',
    architecture: 'Hillside military memorial pavilion overlooking the scenic Nuranang valley.',
    architecturalStyle: 'Indian Army Memorial Shrine Architecture',
    unescoStatus: 'National Monument of Valor',
    unescoListed: false,
    visitorInformation: {
      openingTime: '06:00 AM',
      closingTime: '07:00 PM',
      timings: '06:00 AM – 07:00 PM (Daily, open all 365 days)',
      entryFees: 'Free Entry (Free hot herbal tea served to all travelers by Indian Army)',
      ticketBooking: 'No ticket required',
      guidelines: 'Pay respects at the memorial; salute the hero.',
      photography: 'Permitted.',
      dressCode: 'Warm clothing (high altitude near Sela Pass).',
      restrictions: 'Maintain dignity and respect.',
      accessibility: 'Direct highway frontage with easy ramp access.',
      bestTimeToVisit: 'Throughout the year.',
      visitingDuration: '45 minutes to 1 hour'
    },
    coordinates: { lat: 27.5183, lng: 92.0167 },
    googleMapsUrl: 'https://maps.google.com/?q=27.5183,92.0167',
    mapsUrl: 'https://maps.google.com/?q=27.5183,92.0167',
    transportInformation: {
      nearestRailway: 'Bhalukpong – 250 km.',
      nearestAirport: 'Tezpur – 310 km.',
      nearestBus: 'Jang – 15 km; Tawang – 25 km.',
      roadConnectivity: 'Located directly on the NH-13 Sela Pass-Tawang highway.',
      localTransport: 'All buses, sumos, and cabs stop at Jaswant Garh.'
    },
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80', caption: 'Jaswant Garh War Memorial along the highway to Tawang', category: 'Memorial' }
    ],
    festivals: [
      { name: 'Nuranang Battle Commemoration Day', month: 'November 17', description: 'Special ceremonial guard of honor and wreath laying.' }
    ],
    featured: true,
    isPopular: true,
    averageRating: 5.0,
    reviewCount: 28
  },

  // 25. World War II Cemetery – Jairampur
  {
    name: 'World War II Cemetery – Jairampur',
    altName: 'Stilwell Road War Cemetery',
    altNames: ['Ledo Road Cemetery', 'Jairampur Allied Soldiers Cemetery'],
    category: 'War Memorials',
    state: 'Arunachal Pradesh',
    stateCode: 'AR',
    district: 'Changlang',
    location: 'Near Jairampur, on the historic Stilwell (Ledo) Road',
    address: 'Stilwell Road, Jairampur, Changlang District, Arunachal Pradesh - 792121',
    description: 'A historic World War II cemetery containing hundreds of graves of allied soldiers, engineers, and pioneer laborers who laid down their lives while constructing the historic 1,079-mile Stilwell (Ledo) Road across the rugged Patkai ranges.',
    historicalBackground: 'Rediscovered in the dense jungles of Jairampur in the late 1990s. The cemetery holds graves of soldiers from India, China, the United States, and Great Britain who perished due to malaria, enemy aerial bombing, and rugged terrain between 1942 and 1945.',
    establishmentPeriod: '1942–1945 CE',
    historicalPeriod: 'World War II Era',
    timeline: [
      { period: '1942–1945', event: 'Construction of the historic Ledo-Burma road by General Joseph Stilwell.' },
      { period: '1997 CE', event: 'Rediscovery of the cemetery and subsequent memorial beautification.' }
    ],
    dynasty: 'Allied Forces Military Heritage',
    historicalRulers: 'General Joseph W. Stilwell',
    culturalImportance: 'A poignant global memorial commemorating international cooperation and human endurance during World War II.',
    archaeologicalImportance: 'Original wartime epitaphs, brick graves, and commemorative stone obelisk.',
    architecture: 'Terraced military cemetery with brick-lined graves and commemorative pillars amidst lush pine hills.',
    architecturalStyle: 'World War II Military Cemetery Architecture',
    unescoStatus: 'State Maintained Historical Memorial',
    unescoListed: false,
    visitorInformation: {
      openingTime: '08:00 AM',
      closingTime: '05:00 PM',
      timings: '08:00 AM – 05:00 PM (Daily)',
      entryFees: 'Free Entry',
      ticketBooking: 'No ticket required',
      guidelines: 'Walk respectfully along the grass avenues between the graves.',
      photography: 'Permitted.',
      dressCode: 'Casual respectful attire.',
      restrictions: 'Do not damage headstones or memorials.',
      accessibility: 'Flat grassy ground easily accessible from road.',
      bestTimeToVisit: 'October to March.',
      visitingDuration: '1 to 1.5 hours'
    },
    coordinates: { lat: 27.3511, lng: 96.0422 },
    googleMapsUrl: 'https://maps.google.com/?q=27.3511,96.0422',
    mapsUrl: 'https://maps.google.com/?q=27.3511,96.0422',
    transportInformation: {
      nearestRailway: 'Ledo – 30 km; Tinsukia – 85 km.',
      nearestAirport: 'Dibrugarh (DIB) – 130 km.',
      nearestBus: 'Jairampur Bus Stand – 6 km.',
      roadConnectivity: 'On the historic Stilwell Road (NH-315).',
      localTransport: 'Taxis and sumos from Jairampur and Jagun.'
    },
    image: 'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?w=900&auto=format&fit=crop&q=80', caption: 'World War II cemetery at Jairampur on Stilwell Road', category: 'Cemetery' }
    ],
    festivals: [
      { name: 'Pangsau Pass Winter Festival', month: 'January', description: 'Cultural extravaganza celebrating the border history and tribal heritage.' }
    ],
    featured: false,
    isPopular: true,
    averageRating: 4.8,
    reviewCount: 14
  },

  // 26. Pangsau Pass
  {
    name: 'Pangsau Pass',
    altName: 'Gateway to the East on Stilwell Road',
    altNames: ['Hell Pass', 'Indo-Myanmar Border Pass'],
    category: 'Forts & Palaces',
    state: 'Arunachal Pradesh',
    stateCode: 'AR',
    district: 'Changlang',
    location: 'Patkai Mountain Range, Indo-Myanmar Border',
    address: 'Pangsau Pass, Patkai Range, Changlang District, Arunachal Pradesh - 792121',
    description: 'A historic 3,727-foot mountain pass situated on the crest of the Patkai Hills on the international border between India and Myanmar, famous as the crucial crossing point on General Joseph Stilwell\'s World War II Ledo Road.',
    historicalBackground: 'Used for millennia by Ahoms, Burmese traders, and migrating tribes. During World War II, it was the formidable gateway through which thousands of allied troops and Chinese forces were supplied to fight the Pacific campaign.',
    establishmentPeriod: 'Ancient Route / 1942–1945 Road Heritage',
    historicalPeriod: 'Ancient Trade & Modern War History',
    timeline: [
      { period: '13th Century CE', event: 'Sukaphaa, founder of Ahom Kingdom, crosses into Assam via Patkai passes.' },
      { period: '1943–1945', event: 'Allied forces complete the Ledo-Stilwell road crossing into Myanmar.' }
    ],
    dynasty: 'Historic International Frontier',
    historicalRulers: 'Ahom & British-Allied Era',
    culturalImportance: 'A living historical monument of international trade, military audacity, and friendly cross-border tribal ties with the Tangsa people.',
    archaeologicalImportance: 'Original milestone markers, wartime road cuttings, and border pillar.',
    architecture: 'Mountain pass road cutting through rugged sub-tropical rainforest.',
    architecturalStyle: 'Wartime Highway Engineering & Mountain Pass',
    unescoStatus: 'Historic International Mountain Pass',
    unescoListed: false,
    visitorInformation: {
      openingTime: '09:00 AM',
      closingTime: '04:00 PM',
      timings: '09:00 AM – 04:00 PM (Border protocols apply)',
      entryFees: 'Free Entry (Inner Line Permit and border security clearance required)',
      ticketBooking: 'Checkpost clearance at Nampong',
      guidelines: 'Carry valid photo identification and Inner Line Permit; respect border security protocols.',
      photography: 'Permitted in designated areas; avoid photographing military posts.',
      dressCode: 'Outdoor warm clothing.',
      restrictions: 'Border security rules must be strictly adhered to.',
      accessibility: 'Motorable road from Nampong to the pass summit.',
      bestTimeToVisit: 'November to March (Famous Pangsau Pass Winter Festival in January).',
      visitingDuration: '2 to 3 hours'
    },
    coordinates: { lat: 27.2472, lng: 96.1417 },
    googleMapsUrl: 'https://maps.google.com/?q=27.2472,96.1417',
    mapsUrl: 'https://maps.google.com/?q=27.2472,96.1417',
    transportInformation: {
      nearestRailway: 'Ledo – 45 km; Tinsukia – 100 km.',
      nearestAirport: 'Dibrugarh (DIB) – 145 km.',
      nearestBus: 'Nampong Bus Stand – 12 km.',
      roadConnectivity: 'Stilwell Road (NH-315) via Jairampur and Nampong.',
      localTransport: 'Sumos and 4x4 vehicles from Nampong and Jairampur.'
    },
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&auto=format&fit=crop&q=80'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&auto=format&fit=crop&q=80', caption: 'Pangsau Pass looking towards the emerald Patkai ranges', category: 'Pass' }
    ],
    festivals: [
      { name: 'Pangsau Pass Winter Festival', month: 'January', description: 'Celebrates indigenous crafts, folk dances, and border bonhomie.' }
    ],
    featured: false,
    isPopular: true,
    averageRating: 4.8,
    reviewCount: 16
  },

  // 27. Kekar Monying Historical Site
  {
    name: 'Kekar Monying Historical Site',
    altName: 'Anglo-Abor War Battlefield',
    altNames: ['Kekar Monying Cliff', 'Black Rock Battlefield'],
    category: 'Forts & Palaces',
    state: 'Arunachal Pradesh',
    stateCode: 'AR',
    district: 'Upper Siang',
    location: 'Babuk Village cliff overlooking Siang River',
    address: 'Kekar Monying, near Babuk, Upper Siang District, Arunachal Pradesh - 791102',
    description: 'A historic mountain cliff ("Black Rock") on the banks of the Siang River where brave Adi warriors fought a decisive battle against British forces on December 4, 1911 during the historic Anglo-Abor War.',
    historicalBackground: 'Following the death of British officer Noel Williamson at Komsing, the British sent a massive military expedition in 1911. The Adi warriors built a 500-yard-long stockade across the steep Kekar Monying cliff and rolled massive boulders down on British troops in an epic struggle for tribal freedom.',
    establishmentPeriod: '1911 CE',
    historicalPeriod: 'Colonial Freedom Struggle Era',
    timeline: [
      { period: 'March 1911', event: 'Noel Williamson expedition killed at Komsing.' },
      { period: 'December 4, 1911', event: 'Historic Battle of Kekar Monying fought on the cliffside stockades.' }
    ],
    dynasty: 'Adi Tribal Freedom Fighters',
    historicalRulers: 'Adi Kebang Councils & Warriors',
    culturalImportance: 'An enduring monument to indigenous anti-colonial resistance and valor in the Eastern Himalayas.',
    archaeologicalImportance: 'Natural cliff fortifications, stone chutes, and memorial plaque.',
    architecture: 'Natural vertical rock face utilized as an impregnable natural defense redoubt.',
    architecturalStyle: 'Indigenous Natural Defensive Fortress',
    unescoStatus: 'State Historical Memorial Site',
    unescoListed: false,
    visitorInformation: {
      openingTime: '08:00 AM',
      closingTime: '05:00 PM',
      timings: '08:00 AM – 05:00 PM (Daily)',
      entryFees: 'Free Entry',
      ticketBooking: 'No ticket required',
      guidelines: 'Exercise care on mountain cliff paths; view the commemorative memorial stone.',
      photography: 'Permitted.',
      dressCode: 'Trekking shoes and casual attire.',
      restrictions: 'Do not litter the historic site.',
      accessibility: 'Short walking trek from Babuk village.',
      bestTimeToVisit: 'October to April.',
      visitingDuration: '1.5 hours'
    },
    coordinates: { lat: 28.2111, lng: 95.1167 },
    googleMapsUrl: 'https://maps.google.com/?q=28.2111,95.1167',
    mapsUrl: 'https://maps.google.com/?q=28.2111,95.1167',
    transportInformation: {
      nearestRailway: 'Murkongselek – 65 km.',
      nearestAirport: 'Pasighat – 45 km.',
      nearestBus: 'Pasighat Bus Station – 45 km.',
      roadConnectivity: 'Pasighat-Pangin-Yingkiong road.',
      localTransport: 'Sumos from Pasighat or Pangin.'
    },
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&auto=format&fit=crop&q=80'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&auto=format&fit=crop&q=80', caption: 'Kekar Monying cliff battle site above the Siang river', category: 'Cliff' }
    ],
    festivals: [
      { name: 'Solung Festival', month: 'September', description: 'Traditional celebration of Adi heritage and folk songs.' }
    ],
    featured: false,
    isPopular: false,
    averageRating: 4.7,
    reviewCount: 9
  },

  // 28. Jawaharlal Nehru State Museum
  {
    name: 'Jawaharlal Nehru State Museum',
    altName: 'Itanagar State Ethnographic Museum',
    altNames: ['Arunachal State Museum', 'JN State Museum Itanagar'],
    category: 'State Museums & Archives',
    state: 'Arunachal Pradesh',
    stateCode: 'AR',
    district: 'Papum Pare',
    location: 'Cona, Itanagar Capital Complex',
    address: 'Near Old Assembly, Itanagar, Papum Pare, Arunachal Pradesh - 791111',
    description: 'The premier ethnographic and cultural museum of Arunachal Pradesh, housing comprehensive galleries of tribal costumes, musical instruments, woodcarvings, cane-and-bamboo craft, and archaeological finds from across the state.',
    historicalBackground: 'Established in the 1980s under the Department of Cultural Affairs, Government of Arunachal Pradesh. The museum meticulously documents the material culture, sacred textiles, and living traditions of all 26 major tribes and over 100 sub-tribes.',
    establishmentPeriod: '1980s CE',
    historicalPeriod: 'Contemporary Institutional Heritage',
    timeline: [
      { period: '1980s', event: 'Establishment of the State Museum in Itanagar.' },
      { period: '2000s', event: 'Modernization of interactive ethnographic and archaeological galleries.' }
    ],
    dynasty: 'Government of Arunachal Pradesh',
    historicalRulers: 'Directorate of Research',
    culturalImportance: 'The definitive encyclopedic repository of tribal culture, languages, arts, and archaeological relics in Northeast India.',
    archaeologicalImportance: 'Houses excavated sculptures from Malinithan, brick relics from Ita Fort, and stone tools from ancient Neolithic sites.',
    architecture: 'Two-story modern architectural building featuring dedicated gallery halls and handicraft demonstration workshops.',
    architecturalStyle: 'Modern Institutional Museum Architecture',
    unescoStatus: 'State Premier Museum',
    unescoListed: false,
    visitorInformation: {
      openingTime: '09:30 AM',
      closingTime: '05:30 PM',
      timings: '09:30 AM – 05:30 PM (Tuesday to Sunday, Closed Mondays & National Holidays)',
      entryFees: 'Adults: ₹20, Children: ₹10, Foreign Tourists: ₹100',
      ticketBooking: 'Ticket counter at main entrance',
      guidelines: 'Follow museum map; do not touch exhibited tribal artifacts.',
      photography: 'Permitted in general galleries with nominal camera fee.',
      dressCode: 'Casual decent attire.',
      restrictions: 'Food and drinks not allowed inside display galleries.',
      accessibility: 'Ground floor and ramps accessible for differently abled visitors.',
      bestTimeToVisit: 'Throughout the year.',
      visitingDuration: '2 to 3 hours'
    },
    coordinates: { lat: 27.0911, lng: 93.6189 },
    googleMapsUrl: 'https://maps.google.com/?q=27.0911,93.6189',
    mapsUrl: 'https://maps.google.com/?q=27.0911,93.6189',
    transportInformation: {
      nearestRailway: 'Naharlagun (NHLN) – 14 km.',
      nearestAirport: 'Donyi Polo Airport (HGI) – 26 km.',
      nearestBus: 'Itanagar Bus Stand – 2 km.',
      roadConnectivity: 'Central road in Itanagar capital.',
      localTransport: 'City auto-rickshaws and cabs available.'
    },
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=900&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=900&auto=format&fit=crop&q=80'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=900&auto=format&fit=crop&q=80', caption: 'Jawaharlal Nehru State Museum galleries in Itanagar', category: 'Museum' }
    ],
    festivals: [
      { name: 'State Museum Heritage Week', month: 'May', description: 'Celebration of International Museum Day with school children and live crafts.' }
    ],
    featured: true,
    isPopular: true,
    averageRating: 4.8,
    reviewCount: 21
  },

  // 29. Khonsa Museum
  {
    name: 'Khonsa Museum',
    altName: 'Tirap District Ethnographic Museum',
    altNames: ['Nocté & Wancho Heritage Museum', 'Khonsa Tribal Gallery'],
    category: 'State Museums & Archives',
    state: 'Arunachal Pradesh',
    stateCode: 'AR',
    district: 'Tirap',
    location: 'Khonsa Town, Tirap District',
    address: 'Khonsa Museum, Khonsa, Tirap District, Arunachal Pradesh - 792130',
    description: 'A distinguished regional ethnographic museum in Tirap district celebrated for its rare collection of Nocté and Wancho tribal wood carvings, traditional headgear, antique bead jewelry, and historical war weapons.',
    historicalBackground: 'Established to document and preserve the distinct material heritage of the Patkai hill tribes, particularly the Nocté and Wancho communities known for their masterly wood sculpting and intricate beadwork traditions.',
    establishmentPeriod: '1970s CE',
    historicalPeriod: 'Contemporary Institutional Heritage',
    timeline: [
      { period: '1970s', event: 'Museum opened in Khonsa by the Department of Cultural Affairs.' }
    ],
    dynasty: 'Nocté & Wancho Chieftaincies Heritage',
    historicalRulers: 'Nocté & Wancho Kings (Lowangs)',
    culturalImportance: 'Showcases the master woodcarving and ceremonial adornments of the ancient Patkai warrior clans.',
    archaeologicalImportance: 'Antique wood carvings, historical brass bells, and headhunting-era ceremonial armor.',
    architecture: 'Single-story regional museum building with curated display halls.',
    architecturalStyle: 'Regional Civic Museum Architecture',
    unescoStatus: 'District Heritage Museum',
    unescoListed: false,
    visitorInformation: {
      openingTime: '09:30 AM',
      closingTime: '04:30 PM',
      timings: '09:30 AM – 04:30 PM (Tuesday to Saturday)',
      entryFees: '₹10 nominal entry fee',
      ticketBooking: 'At entrance',
      guidelines: 'Respect displayed ancestral artifacts.',
      photography: 'Permitted in designated halls.',
      dressCode: 'Casual clothing.',
      restrictions: 'Do not touch fragile woodcarvings.',
      accessibility: 'Ground floor accessible.',
      bestTimeToVisit: 'October to April.',
      visitingDuration: '1 to 1.5 hours'
    },
    coordinates: { lat: 26.9833, lng: 95.5000 },
    googleMapsUrl: 'https://maps.google.com/?q=26.9833,95.5000',
    mapsUrl: 'https://maps.google.com/?q=26.9833,95.5000',
    transportInformation: {
      nearestRailway: 'Naharkatiya – 65 km; Tinsukia – 120 km.',
      nearestAirport: 'Dibrugarh (DIB) – 140 km.',
      nearestBus: 'Khonsa Bus Stand – 1 km.',
      roadConnectivity: 'Connected via Khonsa-Naharkatiya highway.',
      localTransport: 'Walking or local sumos in Khonsa.'
    },
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=900&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=900&auto=format&fit=crop&q=80'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=900&auto=format&fit=crop&q=80', caption: 'Exquisite Nocté and Wancho wood carvings in Khonsa Museum', category: 'Carving' }
    ],
    festivals: [
      { name: 'Chalo Loku Festival', month: 'November', description: 'Nocté agricultural festival celebrating harvest and prosperity.' }
    ],
    featured: false,
    isPopular: false,
    averageRating: 4.7,
    reviewCount: 9
  },

  // 30. Apatani Traditional Cultural Heritage – Ziro Valley
  {
    name: 'Apatani Traditional Cultural Heritage',
    altName: 'Ziro Valley Cultural Landscape',
    altNames: ['Apatani Cultural Landscape', 'Ziro Valley Living Heritage'],
    category: 'Living Tribal & Cultural Heritage',
    state: 'Arunachal Pradesh',
    stateCode: 'AR',
    district: 'Lower Subansiri',
    location: 'Ziro Plateau, Lower Subansiri',
    address: 'Ziro Valley, Lower Subansiri District, Arunachal Pradesh - 791120',
    description: 'Inscribed on India\'s UNESCO World Heritage Tentative List (2014), the Apatani Cultural Landscape is a world-renowned example of sustainable ecological harmony, featuring terraced wet-rice and fish agroforestry, bamboo groves, distinct vernacular villages, and living oral traditions.',
    historicalBackground: 'Inhabited by the Apatani tribe for centuries. Unlike shifting cultivation practiced elsewhere in the hills, the Apatanis developed a permanent, self-sustaining valley-bottom farming system that combines rice cultivation with pisciculture and meticulously managed private bamboo and pine forests.',
    establishmentPeriod: 'Millennia-Old Living Tradition',
    historicalPeriod: 'Ancient to Living Contemporary Heritage',
    timeline: [
      { period: 'Pre-Colonial Era', event: 'Evolution of the unique sustainable wet-rice-fish polyculture.' },
      { period: '2014 CE', event: 'Inscribed on the UNESCO World Heritage Tentative List.' }
    ],
    dynasty: 'Apatani Democratic Village Councils (Bulyang)',
    historicalRulers: 'Village Clan Elders (Gaon Burahs)',
    culturalImportance: 'Recognized globally for deep ecological wisdom, democratic clan-governance (Bulyang), sustainable craft traditions, and vibrant festivals (Dree and Myoko).',
    archaeologicalImportance: 'Traditional bamboo and timber houses built on stilts, sacred Lapang stone platforms, and canal irrigation channels.',
    architecture: 'Raised timber-and-bamboo stilt architecture thatched with local wild leaves and split bamboo screens.',
    architecturalStyle: 'Traditional Apatani Vernacular Bamboo & Timber Architecture',
    unescoStatus: 'UNESCO World Heritage Tentative List (Inscribed 2014)',
    unescoListed: false,
    visitorInformation: {
      openingTime: '06:00 AM',
      closingTime: '06:00 PM',
      timings: '06:00 AM – 06:00 PM (Daily)',
      entryFees: 'Free Entry (Respect village community pathways)',
      ticketBooking: 'No ticket required',
      guidelines: 'Respect local privacy and clan traditions; hire registered local guides for village walks.',
      photography: 'Permitted in landscapes; ask permission before photographing tribal elders.',
      dressCode: 'Modest outdoor attire.',
      restrictions: 'Zero tolerance for plastic littering in rice fields and bamboo groves.',
      accessibility: 'Walking paths and village lanes across the flat Ziro valley.',
      bestTimeToVisit: 'March to October; Dree Festival in July and Ziro Music Festival in autumn.',
      visitingDuration: 'Half day to multiple days'
    },
    coordinates: { lat: 27.5583, lng: 93.8389 },
    googleMapsUrl: 'https://maps.google.com/?q=27.5583,93.8389',
    mapsUrl: 'https://maps.google.com/?q=27.5583,93.8389',
    transportInformation: {
      nearestRailway: 'Naharlagun – 100 km; North Lakhimpur – 115 km.',
      nearestAirport: 'Donyi Polo Airport, Itanagar (HGI) – 125 km; Lilabari – 120 km.',
      nearestBus: 'Hapoli / Ziro Bus Stand – 2 km.',
      roadConnectivity: 'Good mountain road via Potin and Kimin from Assam/Itanagar.',
      localTransport: 'Shared Sumos, auto-rickshaws, and walking in Ziro.'
    },
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80'
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&auto=format&fit=crop&q=80', caption: 'Pristine emerald paddy fields of Ziro Valley', category: 'Landscape' },
      { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80', caption: 'Traditional Apatani bamboo village settlement', category: 'Village' }
    ],
    festivals: [
      { name: 'Dree Festival', month: 'July 5', description: 'Grand agricultural festival of the Apatanis seeking bumper harvest and protection.' },
      { name: 'Myoko Festival', month: 'March', description: 'Month-long friendship and clan alliance festival.' }
    ],
    featured: true,
    isPopular: true,
    averageRating: 5.0,
    reviewCount: 26
  },

  // 31. Monpa Traditional Heritage – Tawang
  {
    name: 'Monpa Traditional Heritage – Tawang',
    altName: 'Monpa Living Cultural Heritage',
    altNames: ['Tawang Monpa Traditions', 'Monpa Craft & Living Culture'],
    category: 'Living Tribal & Cultural Heritage',
    state: 'Arunachal Pradesh',
    stateCode: 'AR',
    district: 'Tawang',
    location: 'Tawang & West Kameng Valleys',
    address: 'Tawang Cultural Center, Tawang District, Arunachal Pradesh - 790104',
    description: 'The ancient living cultural heritage of the Monpa people, renowned for their Thangka scroll painting, sacred mask dances (Cham), wood carving, handmade paper making (Mon-Shugu), wool weaving, and vibrant Buddhist traditions.',
    historicalBackground: 'The Monpas have inhabited the high valleys of western Arunachal Pradesh for over a millennium. They adhere to Mahayana Buddhism infused with ancient Bon traditions, maintaining community cohesion, democratic council practices, and sustainable mountain agriculture.',
    establishmentPeriod: 'Millennia-Old Living Heritage',
    historicalPeriod: 'Ancient to Contemporary Living Heritage',
    timeline: [
      { period: 'Ancient Era', event: 'Development of indigenous handmade paper from the Daphne plant (Daphne papyracea).' },
      { period: '17th Century', event: 'Flowering of Thangka painting and wood-block printing at Tawang Monastery.' }
    ],
    dynasty: 'Monpa Community Councils',
    historicalRulers: 'Monpa Village Councils (Tsorgeng)',
    culturalImportance: 'A precious living repository of Himalayan intangible cultural heritage, performing arts, and traditional botanical paper craftsmanship.',
    archaeologicalImportance: 'Ancient wooden printing blocks, historic Thangkas, and handlooms.',
    architecture: 'Traditional two-story stone houses with timber framework, slate roofs, and sacred prayer flags.',
    architecturalStyle: 'Traditional Vernacular Monpa Architecture',
    unescoStatus: 'Living Intangible Cultural Heritage',
    unescoListed: false,
    visitorInformation: {
      openingTime: '08:00 AM',
      closingTime: '05:00 PM',
      timings: '08:00 AM – 05:00 PM (Daily)',
      entryFees: 'Free Entry (Demonstration centers charge small craft fees)',
      ticketBooking: 'No ticket required',
      guidelines: 'Interact respectfully with local artisans; support authentic handmade crafts.',
      photography: 'Permitted in craft workshops with artisan permission.',
      dressCode: 'Warm clothing.',
      restrictions: 'Respect traditional customs.',
      accessibility: 'Accessible across Tawang and Dirang craft centers.',
      bestTimeToVisit: 'October to May.',
      visitingDuration: '2 to 3 hours'
    },
    coordinates: { lat: 27.5872, lng: 91.8655 },
    googleMapsUrl: 'https://maps.google.com/?q=27.5872,91.8655',
    mapsUrl: 'https://maps.google.com/?q=27.5872,91.8655',
    transportInformation: {
      nearestRailway: 'Bhalukpong – 280 km.',
      nearestAirport: 'Tezpur – 340 km; Guwahati – 480 km.',
      nearestBus: 'Tawang Bus Stand – 1 km.',
      roadConnectivity: 'NH-13 via Sela Pass.',
      localTransport: 'Taxis and sumos in Tawang.'
    },
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80', caption: 'Traditional Monpa Thangka painting and woodcraft in Tawang', category: 'Craft' }
    ],
    festivals: [
      { name: 'Torgya Festival', month: 'January', description: 'Sacred cham mask dance festival of the Monpas.' },
      { name: 'Losar', month: 'February–March', description: 'Monpa traditional new year celebrations.' }
    ],
    featured: true,
    isPopular: true,
    averageRating: 4.9,
    reviewCount: 24
  },

  // 32. Adi Tribal Cultural Heritage – East Siang
  {
    name: 'Adi Tribal Cultural Heritage',
    altName: 'Siang Valley Adi Living Culture',
    altNames: ['Adi Culture & Tradition', 'Pasighat Adi Heritage'],
    category: 'Living Tribal & Cultural Heritage',
    state: 'Arunachal Pradesh',
    stateCode: 'AR',
    district: 'East Siang',
    location: 'Pasighat and Siang River Valley',
    address: 'East Siang Cultural Complex, Pasighat, Arunachal Pradesh - 791102',
    description: 'The vibrant, millennia-old living cultural heritage of the Adi people of the Siang valley, celebrated for their architectural cane and bamboo suspension bridges, traditional Kebang democratic governance, Solung and Aran festivals, and lyrical Ponung dances.',
    historicalBackground: 'The Adi tribe are ancient masters of the Siang river valley. Known for their egalitarian democratic village council (Kebang) that dispenses justice through customary law, and their peerless engineering skill in constructing hanging cane suspension bridges spanning up to 300 feet over roaring rivers without nails or metal.',
    establishmentPeriod: 'Millennia-Old Living Heritage',
    historicalPeriod: 'Ancient to Contemporary Living Heritage',
    timeline: [
      { period: 'Ancient Era', event: 'Development of indigenous cane suspension bridge technology over Siang River.' },
      { period: '1911 CE', event: 'Defense of ancestral lands documented in Anglo-Abor War historical records.' }
    ],
    dynasty: 'Adi Kebang Councils',
    historicalRulers: 'Kebang Village Council Elders',
    culturalImportance: 'Exemplifies community cohesion, rich oral literature (Aabang), and indigenous sustainable natural engineering.',
    archaeologicalImportance: 'Traditional cane hanging suspension bridges and village council platforms.',
    architecture: 'Traditional stilt houses made of timber, bamboo, and wild cane with central hearth (Merom).',
    architecturalStyle: 'Traditional Adi Vernacular Cane & Bamboo Architecture',
    unescoStatus: 'Living Intangible Cultural Heritage',
    unescoListed: false,
    visitorInformation: {
      openingTime: '06:00 AM',
      closingTime: '06:00 PM',
      timings: '06:00 AM – 06:00 PM (Daily)',
      entryFees: 'Free Entry',
      ticketBooking: 'No ticket required',
      guidelines: 'Respect village customs and Kebang council sanctity; visit cane suspension bridges with local guides.',
      photography: 'Permitted; seek permission before photographing ceremonies.',
      dressCode: 'Comfortable clothing.',
      restrictions: 'Do not damage cane bridges or litter the riverbanks.',
      accessibility: 'Level access in Pasighat; rural trails near suspension bridges.',
      bestTimeToVisit: 'October to April; September for Solung Festival.',
      visitingDuration: '2 to 4 hours'
    },
    coordinates: { lat: 28.0655, lng: 95.3311 },
    googleMapsUrl: 'https://maps.google.com/?q=28.0655,95.3311',
    mapsUrl: 'https://maps.google.com/?q=28.0655,95.3311',
    transportInformation: {
      nearestRailway: 'Murkongselek – 35 km.',
      nearestAirport: 'Pasighat Airport (IXT) – 4 km; Dibrugarh – 140 km.',
      nearestBus: 'Pasighat Bus Station – 2 km.',
      roadConnectivity: 'NH-15 and Pasighat-Yingkiong highway.',
      localTransport: 'Auto-rickshaws and cabs in Pasighat.'
    },
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&auto=format&fit=crop&q=80'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&auto=format&fit=crop&q=80', caption: 'Traditional Adi cane and bamboo suspension bridge over Siang River', category: 'Bridge' }
    ],
    festivals: [
      { name: 'Solung Festival', month: 'September 1–5', description: 'Premier 5-day socio-religious harvest festival of the Adis.' },
      { name: 'Aran Festival', month: 'March', description: 'Springtime festival celebrating nature and hunting traditions.' }
    ],
    featured: true,
    isPopular: true,
    averageRating: 4.9,
    reviewCount: 22
  }
];

// Seed function
async function seedArunachalHeritage() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect('mongodb://127.0.0.1:27017/divyabharat');
    console.log('MongoDB connected.');

    // Look up Arunachal Pradesh state document
    const arunachalState = await State.findOne({ name: /Arunachal/i });
    const stateId = arunachalState ? arunachalState._id : null;
    console.log('Matched State ID for Arunachal Pradesh:', stateId);

    // Delete ONLY existing Arunachal Pradesh heritage records (DO NOT touch Andhra Pradesh or other states)
    const delResult = await Heritage.deleteMany({ state: /Arunachal/i });
    console.log(`Cleaned up ${delResult.deletedCount} old Arunachal Pradesh heritage records.`);

    // Attach stateId and format documents
    const heritageToInsert = ARUNACHAL_PRADESH_32_HERITAGE.map(item => ({
      ...item,
      stateId,
      slug: item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      state: 'Arunachal Pradesh',
      stateCode: 'AR',
      status: 'approved',
      isActive: true,
      verified: true
    }));

    const inserted = await Heritage.insertMany(heritageToInsert);
    console.log(`✅ Successfully seeded ${inserted.length} Arunachal Pradesh heritage destinations to MongoDB!`);

    // Verify counts in DB
    const totalArunachal = await Heritage.countDocuments({ state: /Arunachal/i });
    const totalAndhra = await Heritage.countDocuments({ state: /Andhra/i });
    const totalHeritage = await Heritage.countDocuments();

    console.log('\n--- VERIFICATION STATS ---');
    console.log('Arunachal Pradesh Heritage in DB:', totalArunachal);
    console.log('Andhra Pradesh Heritage in DB (Preserved):', totalAndhra);
    console.log('Total Heritage in DB:', totalHeritage);

    process.exit(0);
  } catch (error) {
    console.error('Seeding Arunachal Pradesh heritage failed:', error);
    process.exit(1);
  }
}

seedArunachalHeritage();
