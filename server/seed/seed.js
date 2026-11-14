// server/seed/seed.js
// DivyaBharat Heritage Learning Hub — Database Seed Script
// All heritage data sourced from: UNESCO World Heritage List, Archaeological Survey of India (ASI),
// Ministry of Culture (Government of India), Incredible India portal

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

const User = require('../models/User');
const Heritage = require('../models/Heritage');
const Category = require('../models/Category');
const Module = require('../models/Module');
const Quiz = require('../models/Quiz');
const State = require('../models/State');
const Temple = require('../models/Temple');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/divyabharat';
  await mongoose.connect(uri);
  console.log('✅ MongoDB Connected for seeding');
};

// ============ CATEGORIES ============
const categories = [
  {
    name: 'Monument',
    description: 'Historic structures, forts, palaces, tombs, and architectural marvels that represent India\'s glorious past.',
    icon: '🏛️'
  },
  {
    name: 'Temple',
    description: 'Ancient and medieval Hindu, Jain, and Buddhist temples representing India\'s profound spiritual and architectural traditions.',
    icon: '🛕'
  },
  {
    name: 'Historical Place',
    description: 'Sites of significant historical events, ancient cities, and locations that shaped the course of Indian history.',
    icon: '🗺️'
  },
  {
    name: 'Festival',
    description: 'Traditional celebrations, religious observances, and cultural festivals that bring communities together across India.',
    icon: '🎊'
  },
  {
    name: 'Tradition',
    description: 'Living traditions, customs, rituals, and practices passed down through generations that form the cultural fabric of India.',
    icon: '🪔'
  },
  {
    name: 'Art Form',
    description: 'Classical dance, music, painting, sculpture, and performing arts that are recognized as India\'s intangible cultural heritage.',
    icon: '🎭'
  },
  {
    name: 'Natural Heritage',
    description: 'Forests, wildlife sanctuaries, biosphere reserves, and natural landscapes that are integral to India\'s cultural identity.',
    icon: '🌿'
  }
];

// ============ AUTHENTIC HERITAGE DATA ============
// Sources: UNESCO WHL, ASI, Ministry of Culture India, Incredible India
const heritageData = [
  // ---- UNESCO WHS MONUMENTS ----
  {
    name: 'Konark Sun Temple',
    category: 'Temple',
    state: 'Odisha',
    location: 'Konark, Puri District, Odisha',
    description: 'The Konark Sun Temple is a 13th-century CE temple dedicated to the Hindu god Surya (Sun). Built by King Narasimhadeva I of the Eastern Ganga dynasty around 1250 CE, it is conceived as a colossal chariot of the Sun god with 24 elaborately carved wheels and 7 horses. The temple is a masterpiece of Kalinga architecture and is one of the most celebrated temples in India.',
    historicalPeriod: '13th century CE (c. 1250 CE), Eastern Ganga Dynasty',
    culturalSignificance: 'The temple represents the zenith of Odishan art and architecture. Its name derives from two Sanskrit words — Kona (corner/angle) and Arka (Sun). The intricate erotic carvings, celestial nymphs (apsaras), and mythological scenes illustrate the philosophical concept of time and creation. The temple embodies the concept of the cosmos being driven by the chariot of the Sun.',
    architecturalSignificance: 'A supreme example of Kalinga architecture, the main sanctuary (now fallen) once stood 70 metres high. The jagamohana (assembly hall) still stands at 38.5 metres. The 24 wheels with 8 spokes represent the 24 hours of the day, with each wheel functioning as a sundial.',
    importantFacts: [
      'Inscribed as a UNESCO World Heritage Site in 1984',
      'Built by King Narasimhadeva I of the Eastern Ganga dynasty around 1250 CE',
      'The 24 intricately carved wheels can be used as sundials to tell accurate time',
      'The Black Pagoda was historically used as a landmark by European sailors',
      'Built from khondalite rocks (a local metamorphic stone)',
      'Archaeological Survey of India (ASI) has been maintaining the site since 1901'
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Konarka_Temple.jpg/1200px-Konarka_Temple.jpg',
    sourceName: 'UNESCO World Heritage Centre, Archaeological Survey of India',
    sourceUrl: 'https://whc.unesco.org/en/list/246',
    unescoListed: true,
    featured: true,
    status: 'approved',
    verified: true
  },
  {
    name: 'Khajuraho Group of Monuments',
    category: 'Temple',
    state: 'Madhya Pradesh',
    location: 'Khajuraho, Chhatarpur District, Madhya Pradesh',
    description: 'The Khajuraho Group of Monuments is a collection of Hindu and Jain temples built between 950 and 1050 CE by the Chandela dynasty. Originally there were 85 temples; today 25 remain spread over an area of 20 square kilometres. The temples are famous for their nagara-style architecture and their erotic sculptures — a small fraction of the overall carvings which predominantly depict gods, goddesses, warriors, musicians, and scenes of daily life.',
    historicalPeriod: '950–1050 CE, Chandela Rajput Dynasty',
    culturalSignificance: 'The temples represent the creative spirit of the Chandela Rajputs who sought to express the full spectrum of human experience through art. The sculptures reflect the Tantric philosophy that considers kama (desire) as one of the four aims of human life. The temples were largely forgotten by the outside world until 1838, when British officer T.S. Burt rediscovered them.',
    architecturalSignificance: 'Built in the Nagara style of North Indian temple architecture, the temples feature soaring sikharas (tower spires) and richly sculptured exterior walls. The sculptures, executed in sandstone, demonstrate extraordinary craftsmanship in depicting motion, emotion, and detail in stone.',
    importantFacts: [
      'UNESCO World Heritage Site since 1986',
      'Originally 85 temples were built; 25 survive today',
      'Built by the Chandela dynasty between 950-1050 CE',
      'The erotic sculptures represent only about 10% of the total carvings',
      'Divided into three groups: Western (most preserved), Eastern, and Southern',
      'The Kandariya Mahadeva temple is the largest with a 31-metre high sikhara'
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Kandariya_mahadeva.jpg/1200px-Kandariya_mahadeva.jpg',
    sourceName: 'UNESCO World Heritage Centre, Archaeological Survey of India',
    sourceUrl: 'https://whc.unesco.org/en/list/240',
    unescoListed: true,
    featured: true,
    status: 'approved',
    verified: true
  },
  {
    name: 'Ajanta Caves',
    category: 'Historical Place',
    state: 'Maharashtra',
    location: 'Ajintha, Aurangabad District, Maharashtra',
    description: 'The Ajanta Caves are 30 rock-cut Buddhist cave monuments dating from the 2nd century BCE to approximately 480 CE. Located in the Sahyadri mountain range, the caves contain paintings and sculptures considered masterpieces of Buddhist religious art. The caves served as monsoon retreats for Buddhist monks and were gradually abandoned around the 7th century CE, only to be rediscovered in 1819 by a British officer.',
    historicalPeriod: '2nd century BCE to 480 CE, Satavahana and Vakataka dynasties',
    culturalSignificance: 'The caves represent the pinnacle of ancient Indian art and are significant for depicting the life of the Buddha and Jataka tales (stories of the Buddha\'s previous lives). The paintings use a sophisticated technique employing natural pigments and are considered the finest surviving examples of ancient Indian painting.',
    architecturalSignificance: 'The caves are divided into chaitya-grihas (prayer halls with apsidal ends and a stupa) and viharas (residential halls). The paintings on the walls and ceilings demonstrate the sophisticated understanding of perspective, naturalism, and color that ancient Indian artists possessed.',
    importantFacts: [
      'UNESCO World Heritage Site since 1983',
      '30 rock-cut caves dating from 2nd century BCE to 480 CE',
      'Rediscovered in 1819 by British officer John Smith during a tiger hunt',
      'The paintings were created using natural pigments such as lapis lazuli, haematite, and terra verte',
      'Cave 1 and 17 contain the best-preserved paintings',
      'The Padmapani (cave 1) and Vajrapani paintings are among the finest examples of Indian art'
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Ajanta_caves_entrance.jpg/1200px-Ajanta_caves_entrance.jpg',
    sourceName: 'UNESCO World Heritage Centre, Archaeological Survey of India',
    sourceUrl: 'https://whc.unesco.org/en/list/242',
    unescoListed: true,
    featured: true,
    status: 'approved',
    verified: true
  },
  {
    name: 'Ellora Caves',
    category: 'Historical Place',
    state: 'Maharashtra',
    location: 'Ellora, Aurangabad District, Maharashtra',
    description: 'The Ellora Caves are a UNESCO World Heritage Site comprising 100 cave monuments excavated from the volcanic basaltic cliffs of the Charanandri Hills. Dating from the 6th to 11th centuries CE, they represent one of the largest rock-cut monastery-temple complexes in the world and belong to three religions: Buddhism (Caves 1-12), Hinduism (Caves 13-29), and Jainism (Caves 30-34). This remarkable co-existence of religious monuments reflects the spirit of religious harmony in ancient India.',
    historicalPeriod: '6th–11th centuries CE, Rashtrakuta and Yadava Dynasties',
    culturalSignificance: 'Ellora represents the creative genius of ancient Indian civilization and the spirit of religious tolerance. The proximity of Buddhist, Hindu, and Jain monuments demonstrates India\'s tradition of peaceful religious co-existence. The Kailasa Temple (Cave 16) is the largest single monolithic rock excavation in the world.',
    architecturalSignificance: 'The Kailasa Temple (Cave 16), dedicated to Lord Shiva, was carved out of a single rock over 150 years during the reign of the Rashtrakuta king Krishna I. An estimated 400,000 tonnes of rock were removed to create this massive structure that replicates Mount Kailash.',
    importantFacts: [
      'UNESCO World Heritage Site since 1983',
      '34 caves spanning Buddhism, Hinduism, and Jainism',
      'The Kailasa Temple (Cave 16) is the largest monolithic rock excavation in the world',
      'Approximately 400,000 tonnes of rock were excavated to create the Kailasa Temple',
      'Construction of the caves spanned from 600 to 1000 CE',
      'The Buddhist caves represent the Vajrayana phase of Buddhism in India'
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Ellora_caves_01.jpg/1200px-Ellora_caves_01.jpg',
    sourceName: 'UNESCO World Heritage Centre, Archaeological Survey of India',
    sourceUrl: 'https://whc.unesco.org/en/list/243',
    unescoListed: true,
    featured: true,
    status: 'approved',
    verified: true
  },
  {
    name: 'Hampi',
    category: 'Historical Place',
    state: 'Karnataka',
    location: 'Hampi, Ballari District, Karnataka',
    description: 'Hampi, the capital of the Vijayanagara Empire (14th–16th centuries CE), is a UNESCO World Heritage Site spread over 4,187 hectares. At its peak, Vijayanagara was one of the largest cities in the world with a population of 500,000. The ruins of this magnificent city include the Virupaksha Temple, Vittala Temple (with its famous stone chariot and musical pillars), Royal Enclosure, and numerous other temples, markets, and pavilions.',
    historicalPeriod: '14th–16th centuries CE, Vijayanagara Empire',
    culturalSignificance: 'Vijayanagara was the last great Hindu kingdom of South India and a major center of Hindu culture, arts, and learning. The empire was a bulwark against the Deccan Sultanates and preserved Carnatic culture and Sanskrit learning. The city was sacked and destroyed in 1565 CE after the Battle of Talikota.',
    architecturalSignificance: 'The site demonstrates the Vijayanagara style of architecture, a unique South Indian style. The Vittala Temple\'s stone chariot and musical pillars (which produce musical notes when tapped) represent extraordinary engineering and artistic achievement. The Virupaksha Temple remains an active place of worship today.',
    importantFacts: [
      'UNESCO World Heritage Site since 1986',
      'Was one of the largest cities in the world in the 15th century with ~500,000 inhabitants',
      'The stone chariot at Vittala Temple is featured on the Indian 50-rupee note',
      'The musical pillars at Vittala Temple can produce distinct musical notes when struck',
      'Vijayanagara was sacked by the Deccan Sultans in 1565 CE after the Battle of Talikota',
      'Over 1600 monuments are spread across the 4,187-hectare site'
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Hampi_2007.jpg/1200px-Hampi_2007.jpg',
    sourceName: 'UNESCO World Heritage Centre, Archaeological Survey of India',
    sourceUrl: 'https://whc.unesco.org/en/list/241',
    unescoListed: true,
    featured: true,
    status: 'approved',
    verified: true
  },
  {
    name: 'Red Fort Complex',
    category: 'Monument',
    state: 'Delhi',
    location: 'Chandni Chowk, Old Delhi, Delhi',
    description: 'The Red Fort (Lal Qila) is a magnificent Mughal fortress complex built by Emperor Shah Jahan between 1638 and 1648 CE. It served as the main residence of the Mughal emperors for nearly 200 years until 1857. The fort takes its name from the massive red sandstone walls that enclose an area of approximately 255 acres. Its majestic Lahori Gate is where the Prime Minister of India delivers the Independence Day address to the nation every August 15.',
    historicalPeriod: '1638–1648 CE, Mughal Period, Emperor Shah Jahan',
    culturalSignificance: 'The Red Fort is the symbolic heart of India\'s capital and its independence. Every year on August 15 (Independence Day), the Prime Minister hoists the national flag and addresses the nation from its ramparts. It represents the pinnacle of Mughal architectural achievement and the synthesis of Hindu and Islamic artistic traditions.',
    architecturalSignificance: 'Built in the Indo-Islamic tradition, the fort represents an important turning point in Mughal architecture. The Diwan-i-Aam (Hall of Public Audience), Diwan-i-Khas (Hall of Private Audience), Rang Mahal, and Moti Masjid within the complex showcase the sophisticated court culture of the Mughals.',
    importantFacts: [
      'UNESCO World Heritage Site since 2007',
      'Built by Mughal Emperor Shah Jahan between 1638-1648 CE',
      'Site of India\'s Independence Day celebrations every August 15',
      'The famous Peacock Throne and Koh-i-Noor diamond were housed here',
      'The fort\'s walls range from 16 to 33 metres in height',
      'Named after its massive red sandstone walls'
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Red_fort_in_delhi_03-2016.jpg/1200px-Red_fort_in_delhi_03-2016.jpg',
    sourceName: 'UNESCO World Heritage Centre, Archaeological Survey of India',
    sourceUrl: 'https://whc.unesco.org/en/list/231',
    unescoListed: true,
    featured: true,
    status: 'approved',
    verified: true
  },
  {
    name: 'Qutb Minar and its Monuments',
    category: 'Monument',
    state: 'Delhi',
    location: 'Mehrauli, New Delhi, Delhi',
    description: 'The Qutb Minar is a UNESCO-listed complex in south Delhi containing the Qutb Minar minaret, the earliest extant mosque in India (Quwwat ul-Islam), the Iron Pillar of Delhi, and other medieval monuments. The 72.5-metre tall Qutb Minar, built in the early 13th century CE, is the tallest minaret in India and one of the finest examples of Indo-Islamic architecture. The Iron Pillar, dating to the 4th-5th century CE, is remarkable for its 1,600-year-old rust-free composition.',
    historicalPeriod: '12th–14th centuries CE, Delhi Sultanate (Slave Dynasty, Khalji Dynasty)',
    culturalSignificance: 'The complex marks the beginning of the Delhi Sultanate period and represents the fusion of Indian craftsmanship with Islamic design motifs. The Iron Pillar, an ancient marvel of metallurgy, demonstrates the advanced scientific knowledge of ancient Indian craftsmen. Local tradition holds that one who can wrap their arms around the pillar with their back to it will have their wish granted.',
    architecturalSignificance: 'The Qutb Minar was begun by Qutb ud-Din Aibak around 1193 CE and completed by Iltutmish. Its five storeys are elaborately decorated with bands of Koranic calligraphy and geometric patterns. The complex also includes the Alai Darwaza (1311 CE), a fine example of early Indo-Islamic architecture.',
    importantFacts: [
      'UNESCO World Heritage Site since 1993',
      'The 72.5-metre Qutb Minar is the tallest brick minaret in India',
      'The Iron Pillar of Delhi dates to the 4th-5th century CE and has not rusted in 1,600+ years',
      'Construction began around 1193 CE by Qutb ud-Din Aibak',
      'The Quwwat-ul-Islam mosque is the earliest extant mosque in India',
      'The complex contains materials from 27 demolished Hindu and Jain temples'
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Qutb_Minar_2011.jpg/800px-Qutb_Minar_2011.jpg',
    sourceName: 'UNESCO World Heritage Centre, Archaeological Survey of India',
    sourceUrl: 'https://whc.unesco.org/en/list/233',
    unescoListed: true,
    featured: false,
    status: 'approved',
    verified: true
  },
  {
    name: 'Rani-ki-Vav (The Queen\'s Stepwell)',
    category: 'Monument',
    state: 'Gujarat',
    location: 'Patan, Mehsana District, Gujarat',
    description: 'Rani-ki-Vav (Queen\'s Stepwell) in Patan, Gujarat, is one of the finest stepwells in India and a UNESCO World Heritage Site. Built in the 11th century CE by Queen Udayamati in memory of her husband King Bhimdev I of the Solanki dynasty, the stepwell was submerged in silt for centuries and rediscovered in the 1980s. It is designed as an inverted temple divided into seven levels of stairs with sculptural panels, featuring over 500 principal sculptures and more than a thousand minor ones.',
    historicalPeriod: '11th century CE (c. 1063 CE), Solanki Dynasty',
    culturalSignificance: 'The stepwell represents a typology unique to the Indian subcontinent — a utilitarian structure transformed into an architectural and sculptural masterpiece. It reflects the sophistication of ancient Indian hydraulic engineering and the tradition of stepwells (vavs) as community gathering places, especially for women.',
    architecturalSignificance: 'Built in the Maru-Gurjara architectural style, the stepwell is 64 metres long, 20 metres wide, and 27 metres deep. The 800+ sculptures include depictions of Vishnu in his ten incarnations (Dashavatar), apsaras, and yoginis. The stepwell is now featured on the Indian 100-rupee note.',
    importantFacts: [
      'UNESCO World Heritage Site since 2014',
      'Built by Queen Udayamati around 1063 CE in memory of King Bhimdev I',
      'Over 500 principal sculptures and 1,000 minor sculptures adorn the stepwell',
      'Was submerged in silt from a flood and rediscovered in the 1980s by ASI',
      'Features on the Indian Rs. 100 currency note',
      'Demonstrates advanced Maru-Gurjara architectural tradition'
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Rani_ki_vav_02.jpg/1200px-Rani_ki_vav_02.jpg',
    sourceName: 'UNESCO World Heritage Centre, Archaeological Survey of India',
    sourceUrl: 'https://whc.unesco.org/en/list/1426',
    unescoListed: true,
    featured: true,
    status: 'approved',
    verified: true
  },
  {
    name: 'Dholavira: A Harappan City',
    category: 'Historical Place',
    state: 'Gujarat',
    location: 'Khadir Island, Bhachau Taluka, Kutch District, Gujarat',
    description: 'Dholavira is an archaeological site that was one of the largest cities of the Indus Valley Civilization (also known as the Harappan Civilization), flourishing between 3000 BCE and 1500 BCE. Located on Khadir Island in the Rann of Kutch, the site covers approximately 100 hectares and reveals an exceptionally well-planned urban layout with a remarkable water conservation system. The famous Dholavira signboard, featuring 10 large Indus script signs, is one of the earliest public display systems in the ancient world.',
    historicalPeriod: '3000–1500 BCE, Indus Valley / Harappan Civilization',
    culturalSignificance: 'Dholavira provides exceptional insights into the sophistication of one of the world\'s earliest urban civilizations. Its sophisticated water management system — comprising 16 reservoirs — demonstrates advanced hydraulic engineering more than 4,500 years ago. The city plan, with its citadel, middle town, and lower town, reflects a highly organized social structure.',
    architecturalSignificance: 'The city is divided into a citadel, a middle town, and a lower town. Its elaborate water conservation system included check dams, reservoirs, drains, and an integrated network linking rainwater harvesting to daily use — a remarkable achievement for a Bronze Age civilization.',
    importantFacts: [
      'UNESCO World Heritage Site since 2021',
      'One of the five largest sites of the Indus Valley Civilization',
      'The site was occupied for 1,500 years (3000–1500 BCE)',
      'Has 16 reservoirs for water storage — an extraordinary hydraulic system',
      'The famous Dholavira inscription contains 10 large Indus script signs',
      'The Indus script remains undeciphered to this day'
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dholavira_site_%28Rann_of_Kutch%2C_Gujarat%29.jpg/1280px-Dholavira_site_%28Rann_of_Kutch%2C_Gujarat%29.jpg',
    sourceName: 'UNESCO World Heritage Centre, Archaeological Survey of India',
    sourceUrl: 'https://whc.unesco.org/en/list/1645',
    unescoListed: true,
    featured: false,
    status: 'approved',
    verified: true
  },
  {
    name: 'Mahabalipuram (Group of Monuments)',
    category: 'Temple',
    state: 'Tamil Nadu',
    location: 'Mahabalipuram (Mamallapuram), Chengalpattu District, Tamil Nadu',
    description: 'Mahabalipuram (ancient name: Mamallapuram) is a UNESCO World Heritage Site on the Coromandel Coast of Tamil Nadu. Built during the reign of the Pallava dynasty (7th–8th centuries CE), the monuments include cave temples, monolithic rathas (chariots), and the famous Shore Temple and Arjuna\'s Penance (the world\'s largest bas-relief). The site was a major port city and demonstrates the influence of early Dravidian architecture.',
    historicalPeriod: '7th–8th centuries CE, Pallava Dynasty',
    culturalSignificance: 'Mahabalipuram was a thriving port city and commercial hub that connected South India with Southeast Asia, influencing temple architecture across the region. It represents the birth of the Dravidian style of temple architecture that spread throughout South and Southeast Asia. The Arjuna\'s Penance relief panel is one of the largest and finest examples of Indian rock carving.',
    architecturalSignificance: 'The site contains diverse types of early Pallava architecture: rathas (monolithic temples carved in the shape of chariots), mandapas (cave temples), and the Shore Temple (a structural temple). The Shore Temple is among the earliest structural stone temples in South India.',
    importantFacts: [
      'UNESCO World Heritage Site since 1984',
      'Built by Pallava king Narasimhavarman I (630–668 CE) and successors',
      'Arjuna\'s Penance is one of the world\'s largest bas-relief carvings (29m × 13m)',
      'The five Pancha Rathas are carved from single boulders',
      'The Shore Temple is visible from the sea and is one of India\'s earliest structural stone temples',
      'The site was partially discovered after the 2004 Indian Ocean tsunami revealed submerged structures'
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Shore_temple_pano_2007.jpg/1280px-Shore_temple_pano_2007.jpg',
    sourceName: 'UNESCO World Heritage Centre, Archaeological Survey of India',
    sourceUrl: 'https://whc.unesco.org/en/list/249',
    unescoListed: true,
    featured: false,
    status: 'approved',
    verified: true
  },
  {
    name: 'Sanchi Stupa',
    category: 'Historical Place',
    state: 'Madhya Pradesh',
    location: 'Sanchi, Raisen District, Madhya Pradesh',
    description: 'Sanchi is a UNESCO World Heritage Site containing Buddhist monuments, including the Great Stupa (Stupa No. 1), built by Emperor Ashoka in the 3rd century BCE. The Great Stupa is the oldest stone structure in India and one of the earliest Buddhist structures in existence. The four elaborately carved gateways (toranas) of the Great Stupa are masterpieces of early Indian art, depicting events from the life of the Buddha and Jataka tales.',
    historicalPeriod: '3rd century BCE onwards, Maurya and subsequent dynasties',
    culturalSignificance: 'Sanchi represents the beginnings of Buddhist art and architecture in India. Emperor Ashoka (272–232 BCE), who converted to Buddhism after the Kalinga War, is credited with building the original stupa to enshrine relics of the Buddha. The site remained active until the 12th century CE and was later rediscovered in 1818.',
    architecturalSignificance: 'The Great Stupa is a hemispherical brick dome surmounted by a three-tiered umbrella structure. The four exquisitely carved gateways (north, south, east, west toranas) feature crowded narrative panels, celestial beings, and decorative motifs. Notably, the Buddha is not depicted in human form in these early carvings, but through symbols.',
    importantFacts: [
      'UNESCO World Heritage Site since 1989',
      'The Great Stupa was built by Emperor Ashoka in the 3rd century BCE',
      'The oldest stone structure in India still standing',
      'In early Buddhist art at Sanchi, the Buddha is depicted symbolically (footprints, wheel, throne) rather than in human form',
      'Rediscovered by British General Henry Taylor in 1818',
      'The site has 50+ monuments including 3 stupas, 4 monasteries, and various temples'
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Sanchi_2.jpg/1200px-Sanchi_2.jpg',
    sourceName: 'UNESCO World Heritage Centre, Archaeological Survey of India',
    sourceUrl: 'https://whc.unesco.org/en/list/524',
    unescoListed: true,
    featured: false,
    status: 'approved',
    verified: true
  },
  {
    name: 'Fatehpur Sikri',
    category: 'Monument',
    state: 'Uttar Pradesh',
    location: 'Fatehpur Sikri, Agra District, Uttar Pradesh',
    description: 'Fatehpur Sikri was built by Mughal Emperor Akbar between 1571 and 1585 CE as the new imperial capital. Located 37 km from Agra, the walled city represents the high point of Mughal architecture combining Hindu and Islamic design elements. The complex includes the Buland Darwaza (Gate of Victory), Jama Masjid, Diwan-i-Aam, Diwan-i-Khas, Panch Mahal, and the tomb of Sufi saint Salim Chishti. The city was abandoned after only 14 years due to water scarcity.',
    historicalPeriod: '1571–1585 CE, Mughal Period, Emperor Akbar',
    culturalSignificance: 'Fatehpur Sikri embodies Akbar\'s spirit of religious tolerance and cultural synthesis. The city was built to honor the Sufi saint Salim Chishti, whose blessing the childless Akbar sought. The architecture reflects Akbar\'s vision of blending Hindu (Rajput), Islamic (Mughal), and Jain artistic traditions into a harmonious whole.',
    architecturalSignificance: 'The Buland Darwaza (54 metres high) is the largest gateway in the world, built to commemorate Akbar\'s victory over Gujarat. The Panch Mahal is a five-storey palace built in the form of a Buddhist vihar. The Diwan-i-Khas features an extraordinary central pillar with 36 serpentine brackets supporting a balcony.',
    importantFacts: [
      'UNESCO World Heritage Site since 1986',
      'Built by Emperor Akbar between 1571-1585 CE as his new capital',
      'The Buland Darwaza (Gate of Victory) is 54 metres high — the largest gateway in the world',
      'The city was abandoned after 14-15 years, possibly due to inadequate water supply',
      'Built with local Sikri red sandstone',
      'The tomb of Sufi saint Salim Chishti is still an active pilgrimage site'
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Buland_Darwaza%2C_Fatehpur_Sikri.jpg/1200px-Buland_Darwaza%2C_Fatehpur_Sikri.jpg',
    sourceName: 'UNESCO World Heritage Centre, Archaeological Survey of India',
    sourceUrl: 'https://whc.unesco.org/en/list/255',
    unescoListed: true,
    featured: false,
    status: 'approved',
    verified: true
  },
  // ---- FESTIVALS ----
  {
    name: 'Durga Puja',
    category: 'Festival',
    state: 'West Bengal',
    location: 'Kolkata and across West Bengal',
    description: 'Durga Puja is the most important festival of West Bengal and the largest public festival in South Asia. It celebrates the victory of the Hindu goddess Durga over the buffalo demon Mahishasura. The festival lasts for ten days (Saptami to Dashami), with the main celebrations across five days. Thousands of elaborately decorated pandals (temporary structures) are built across Kolkata, each housing artistic clay idols of Goddess Durga with her four children — Lakshmi, Saraswati, Kartik, and Ganesha.',
    historicalPeriod: 'Origins in the 15th–16th centuries CE; major urban celebrations from 18th century CE',
    culturalSignificance: 'Durga Puja is recognized by UNESCO as an Intangible Cultural Heritage of Humanity since 2021. It is a celebration of community, artisanship, music, and cultural identity in Bengal. The festival unites people across religions, classes, and backgrounds. It drives a major cultural economy involving thousands of artisans, musicians, and performers.',
    architecturalSignificance: 'The pandals (temporary structures) that house the Durga idols are themselves architectural and artistic achievements, often replicating heritage structures or featuring innovative artistic installations. The clay idols of Durga, traditionally made in Kumartuli, North Kolkata, represent one of the finest traditions of clay idol-making in India.',
    importantFacts: [
      'UNESCO Intangible Cultural Heritage since 2021',
      'Over 2,500 major pandals in Kolkata alone during the festival',
      'The idol-making tradition of Kumartuli in North Kolkata has been ongoing for centuries',
      'The festival drives an estimated Rs. 25,000-30,000 crore economy in West Bengal',
      'Traditionally, the festival celebrates the homecoming of Goddess Durga to her parental home',
      'Dhunuchi naach (dance with incense burner) is a traditional dance performed during the festival'
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Durga_puja_idol_making_Kumartuli.jpg/1200px-Durga_puja_idol_making_Kumartuli.jpg',
    sourceName: 'UNESCO Intangible Cultural Heritage, Ministry of Culture India',
    sourceUrl: 'https://ich.unesco.org/en/RL/durga-puja-in-kolkata-01604',
    unescoListed: true,
    featured: true,
    status: 'approved',
    verified: true
  },
  {
    name: 'Kumbh Mela',
    category: 'Festival',
    state: 'Uttar Pradesh',
    location: 'Prayagraj (and rotates between Haridwar, Nashik, Ujjain)',
    description: 'Kumbh Mela is the world\'s largest religious gathering, held at the confluence (Sangam) of the Ganga, Yamuna, and the mythical Saraswati rivers at Prayagraj (formerly Allahabad). The festival is held in four locations on a 12-year rotation: Prayagraj, Haridwar, Nashik, and Ujjain. The Prayagraj Kumbh (Maha Kumbh, every 12 years) attracts over 120 million pilgrims. Bathing at the Sangam during Kumbh Mela is believed to cleanse sins and grant moksha (liberation from the cycle of birth and death).',
    historicalPeriod: 'Ancient origins; references found in texts from the 7th century CE onwards',
    culturalSignificance: 'Kumbh Mela is an intangible cultural heritage of humanity recognized by UNESCO in 2017. It is a profound manifestation of the Hindu pilgrimage tradition and demonstrates the living continuity of ancient Vedic and Hindu traditions. The festival brings together sadhus (holy men), pilgrims, scholars, traders, and people from all walks of life.',
    importantFacts: [
      'UNESCO Intangible Cultural Heritage since 2017',
      'The world\'s largest peaceful gathering of people',
      'The 2019 Kumbh Mela at Prayagraj attracted approximately 120-150 million pilgrims over 49 days',
      'Held in four cities on 12-year rotation: Prayagraj, Haridwar, Nashik, Ujjain',
      'The Shahi Snan (Royal Bath) on auspicious dates is the most important ritual',
      'Naga Sadhus (ash-smeared ascetics) lead the procession during Shahi Snan'
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Kumbh_Mela_2019_-_Ganga_Snan.jpg/1200px-Kumbh_Mela_2019_-_Ganga_Snan.jpg',
    sourceName: 'UNESCO Intangible Cultural Heritage, Ministry of Culture India',
    sourceUrl: 'https://ich.unesco.org/en/RL/kumbh-mela-01258',
    unescoListed: true,
    featured: false,
    status: 'approved',
    verified: true
  },
  // ---- ART FORMS ----
  {
    name: 'Bharatanatyam',
    category: 'Art Form',
    state: 'Tamil Nadu',
    location: 'Originated in Tamil Nadu; performed across India',
    description: 'Bharatanatyam is one of the oldest classical dance forms of India, originating from the devadasi tradition in Tamil Nadu temples. It is primarily an expression of devotion, particularly to Shiva. The form is characterized by bent-knee positions (aramandi), footwork, hand gestures (mudras), facial expressions (abhinaya), and elaborate eye movements. Bharatanatyam derives its name from Bharata Muni, the author of the Natya Shastra (the ancient Indian treatise on performing arts, c. 200 BCE–200 CE).',
    historicalPeriod: 'Ancient origins (references in Natya Shastra, c. 200 BCE–200 CE); devadasi tradition from 1st millennium CE',
    culturalSignificance: 'Bharatanatyam expresses the Shaiva, Vaishnava, and Shakta religious traditions and is one of India\'s eight classical dance forms recognized by the Sangeet Natak Akademi. The revival of Bharatanatyam from its devadasi roots to a concert stage art form was led by Rukmini Devi Arundale in the early 20th century.',
    importantFacts: [
      'One of eight classical dance forms recognized by India\'s Sangeet Natak Akademi',
      'Derives its name from Bharata Muni, author of the ancient Natya Shastra',
      'Traditionally performed by devadasis (temple dancers) in Tamil Nadu',
      'T. Balasaraswati and Rukmini Devi Arundale are credited with its modern revival',
      'A full Bharatanatyam performance (Margam) consists of seven items in a specific sequence',
      'Characterized by 64 hand gestures (mudras) and 108 karanas (body movements)'
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Rukmini_Devi_Arundale.jpg/800px-Rukmini_Devi_Arundale.jpg',
    sourceName: 'Sangeet Natak Akademi, Ministry of Culture India',
    sourceUrl: 'https://sangeetnatak.gov.in/programmes/classical-dance',
    unescoListed: false,
    featured: false,
    status: 'approved',
    verified: true
  },
  {
    name: 'Kathakali',
    category: 'Art Form',
    state: 'Kerala',
    location: 'Kerala; originated in northern Kerala (Malabar region)',
    description: 'Kathakali is a classical Hindu dance-drama performance art of Kerala, originating in the 17th century CE. It is renowned for its elaborate, colourful costumes and face painting, and the precise and codified gestures (mudras) that convey the entire spectrum of human emotions. Kathakali stories are drawn from the Ramayana, Mahabharata, and Puranas. A Kathakali performance typically lasts all night, beginning in the evening and concluding at dawn.',
    historicalPeriod: '17th century CE; derived from older forms like Krishnanattam and Ramanattam',
    culturalSignificance: 'Kathakali is one of India\'s eight classical dance forms and represents the highest artistic achievement of Kerala\'s theatrical tradition. The elaborate costumes and face makeup have developed over centuries and each character type (Pacha, Kathi, Kari, etc.) has a distinct visual language that the audience learns to read.',
    importantFacts: [
      'One of India\'s eight classical dance-drama traditions',
      'Performances traditionally last all night from dusk to dawn',
      'Face makeup takes 4-6 hours to apply using natural pigments',
      'The principal character types are Pacha (noble), Kathi (villain), and Minukku (feminine)',
      'Stories are drawn from Mahabharata, Ramayana, and Bhagavata Purana',
      'Recognized by UNESCO as Intangible Cultural Heritage of India'
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/KathakaliK.jpg/800px-KathakaliK.jpg',
    sourceName: 'Sangeet Natak Akademi, Ministry of Culture India, Kerala Tourism',
    sourceUrl: 'https://sangeetnatak.gov.in/programmes/classical-dance',
    unescoListed: false,
    featured: false,
    status: 'approved',
    verified: true
  },
  {
    name: 'Madhubani Painting',
    category: 'Art Form',
    state: 'Bihar',
    location: 'Mithila region, Madhubani District, Bihar',
    description: 'Madhubani painting (also called Mithila painting) is a traditional art form practised in the Mithila region of Bihar. Historically, women painted on walls of their homes for religious, social, and festive occasions. The paintings are characterized by vivid colours, intricate geometric patterns, and motifs drawn from nature (lotus, fish, birds, elephants) and Hindu mythology. In the 1960s, following a drought, UNICEF encouraged artisans to paint on paper and canvas, transforming Madhubani into a global art form.',
    historicalPeriod: 'Ancient origins; documented references from the time of Ramayana; formally recognized in the 1960s-70s',
    culturalSignificance: 'Madhubani painting is a living tradition practised by thousands of artists in the Mithila region. It was traditionally used to mark important occasions such as birth, marriage, and festivals like Holi and Diwali. The art has been recognized with a GI (Geographical Indication) tag and Padma Shri have been awarded to several master artists.',
    importantFacts: [
      'Has a Geographical Indication (GI) tag from the Government of India',
      'Traditionally painted by women on walls of homes during festivals and life events',
      'UNICEF intervention in 1966-67 helped transition it to paper and canvas art',
      'Bhitti Chitra (wall painting) is the traditional form',
      'Five styles: Bharni, Kachni, Tantric, Godna, and Kohbar',
      'Artists like Sita Devi and Ganga Devi received Padma Shri for their contributions'
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Madhubani_art.jpg/1200px-Madhubani_art.jpg',
    sourceName: 'Ministry of Textiles (GI Tag), Ministry of Culture India',
    sourceUrl: 'https://www.india.gov.in/spotlight/craft-clusters',
    unescoListed: false,
    featured: false,
    status: 'approved',
    verified: true
  },
  // ---- TRADITIONS ----
  {
    name: 'Yoga',
    category: 'Tradition',
    state: 'Uttar Pradesh',
    location: 'Rishikesh, Uttarakhand (modern capital); ancient origins in Varanasi, Uttar Pradesh',
    description: 'Yoga is an ancient physical, mental, and spiritual practice originating in India. The word \'yoga\' is derived from the Sanskrit word \'yuj\' meaning \'to yoke\' or \'to unite\'. The earliest references to yoga are found in the Rigveda (c. 1500–1200 BCE). The Yoga Sutras of Patanjali (c. 400 CE) systematized yoga into the eight-limbed path (Ashtanga). Today, yoga is practised by hundreds of millions worldwide and is recognized as an intangible cultural heritage by UNESCO.',
    historicalPeriod: 'Ancient origins (c. 3000 BCE Indus Valley seals); Vedic period (1500 BCE); Patanjali\'s Yoga Sutras c. 400 CE',
    culturalSignificance: 'The United Nations declared June 21 as the International Day of Yoga in 2015, following a proposal by Prime Minister Narendra Modi. Yoga is one of India\'s most significant contributions to world civilization, encompassing physical postures (asanas), breath control (pranayama), meditation (dhyana), and ethical philosophy (yamas and niyamas).',
    importantFacts: [
      'UNESCO Intangible Cultural Heritage since 2016',
      'June 21 is International Yoga Day, proposed by India and adopted by 177 UN nations',
      'The Yoga Sutras of Patanjali (c. 400 CE) contain 196 sutras systematizing yoga philosophy',
      'The Rigveda (c. 1500 BCE) contains the earliest references to yoga-related concepts',
      'Rishikesh is known as the World Capital of Yoga',
      'Approximately 300 million people practise yoga globally'
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Yoga_Bikaner.jpg/1200px-Yoga_Bikaner.jpg',
    sourceName: 'UNESCO Intangible Cultural Heritage, Ministry of AYUSH India',
    sourceUrl: 'https://ich.unesco.org/en/RL/yoga-01163',
    unescoListed: true,
    featured: false,
    status: 'approved',
    verified: true
  }
];

// ============ LEARNING MODULES ============
const modulesData = [
  {
    title: 'Introduction to Indian Heritage',
    description: 'A beginner\'s guide to understanding the rich tapestry of India\'s cultural and architectural heritage, from ancient civilizations to the Mughal era.',
    category: 'General',
    level: 'beginner',
    duration: 45,
    objectives: [
      'Understand the major periods of Indian history and their heritage contributions',
      'Learn the difference between UNESCO World Heritage Sites and other heritage categories',
      'Identify the major architectural styles of Indian temples and monuments',
      'Appreciate the diversity of Indian cultural traditions across states'
    ],
    lessons: [
      {
        title: 'What is Heritage?',
        content: `Heritage refers to the legacy of physical artifacts and intangible attributes inherited from past generations, maintained in the present, and bestowed for the benefit of future generations.

**Types of Heritage:**

1. **Natural Heritage** – Natural features (geological formations, flora/fauna), aesthetic and scientific value. Example: Sundarbans Mangrove Forest, Western Ghats.

2. **Cultural Heritage** (Tangible) – Monuments, buildings, historic places, and sites of cultural significance. Example: Taj Mahal, Red Fort, Konark Sun Temple.

3. **Intangible Cultural Heritage** – Traditions, oral expressions, performing arts, social practices, rituals, festive events, knowledge about nature. Example: Yoga, Kumbh Mela, Bharatanatyam.

**Why Heritage Matters:**
- It connects us to our past and gives us a sense of identity
- It provides economic benefits through tourism
- It preserves knowledge and wisdom of ancestors
- It fosters respect for other cultures and civilizations

India has 42 UNESCO World Heritage Sites (as of 2024) — 34 cultural, 7 natural, and 1 mixed.`,
        duration: 12,
        order: 0
      },
      {
        title: 'Major Periods of Indian History',
        content: `**1. Indus Valley Civilization (3300–1300 BCE)**
One of the world's earliest urban civilizations. Key sites: Mohenjo-daro (Pakistan), Harappa (Pakistan), Dholavira (India), Lothal (India). Known for advanced urban planning, sewage systems, and writing (yet undeciphered).

**2. Vedic Period (1500–500 BCE)**
Period when the Vedas (Rigveda, Samaveda, Yajurveda, Atharvaveda) were composed. Foundation of Hinduism, Sanskrit literature, and early Indian philosophy.

**3. Maurya Empire (322–185 BCE)**
Emperor Chandragupta Maurya unified most of the Indian subcontinent. His grandson Ashoka the Great converted to Buddhism after the Kalinga War and spread Buddhism across Asia. Key heritage: Sanchi Stupa, Ashoka Pillars.

**4. Gupta Empire (320–550 CE)**
Called the "Golden Age" of India. Advances in mathematics (concept of zero, decimal system by Aryabhata), astronomy, literature, and art. Classical Sanskrit literature flourished.

**5. Rajput Period (600–1200 CE)**
Rajput clans dominated northern India. Known for magnificent fort architecture and heroic military tradition. Key heritage: Khajuraho temples, Mewar forts.

**6. Delhi Sultanate (1206–1526 CE)**
Five successive dynasties (Slave, Khalji, Tughlaq, Sayyid, Lodi) ruled from Delhi. Indo-Islamic architecture began. Key heritage: Qutb Minar, Alai Darwaza.

**7. Mughal Empire (1526–1857 CE)**
Founded by Babur, reached its zenith under Akbar, Shah Jahan, and Aurangzeb. Peak of Indo-Islamic architecture. Key heritage: Taj Mahal, Red Fort, Fatehpur Sikri.

**8. Colonial Period (1757–1947 CE)**
British East India Company and then the British Crown ruled India. Colonial architecture emerged. Independence achieved on August 15, 1947.`,
        duration: 18,
        order: 1
      },
      {
        title: 'UNESCO World Heritage Sites in India',
        content: `India has 42 UNESCO World Heritage Sites, making it the sixth country globally by number of World Heritage Sites.

**What is UNESCO?**
The United Nations Educational, Scientific and Cultural Organization (UNESCO) identifies and protects sites of "Outstanding Universal Value" through its World Heritage Convention (1972).

**How Sites are Selected:**
Sites must meet at least one of 10 criteria relating to:
- Unique artistic or architectural achievement
- Outstanding example of a type of building or landscape
- Direct association with events of outstanding universal significance
- Exceptional natural beauty or aesthetic importance (for natural sites)

**India's UNESCO World Heritage Cultural Sites include:**

| Site | State | Year Inscribed |
|------|-------|----------------|
| Ajanta Caves | Maharashtra | 1983 |
| Ellora Caves | Maharashtra | 1983 |
| Agra Fort | Uttar Pradesh | 1983 |
| Taj Mahal | Uttar Pradesh | 1983 |
| Mahabalipuram | Tamil Nadu | 1984 |
| Konark Sun Temple | Odisha | 1984 |
| Kaziranga National Park | Assam | 1985 (Natural) |
| Hampi | Karnataka | 1986 |
| Khajuraho | Madhya Pradesh | 1986 |
| Fatehpur Sikri | Uttar Pradesh | 1986 |
| Red Fort Complex | Delhi | 2007 |
| Rani-ki-Vav | Gujarat | 2014 |
| Dholavira | Gujarat | 2021 |
| Hoysala temples | Karnataka | 2023 |`,
        duration: 15,
        order: 2
      }
    ],
    isPublished: true
  },
  {
    title: 'Temple Architecture of India',
    description: 'An exploration of the diverse styles of Hindu temple architecture across India, from the Nagara style of the North to the Dravidian style of the South.',
    category: 'Temple',
    level: 'intermediate',
    duration: 60,
    objectives: [
      'Distinguish between Nagara, Vesara, and Dravidian temple architectural styles',
      'Identify key features of a Hindu temple: shikhara, mandapa, garbhagriha, gopuram',
      'Understand the Vastu Shastra principles guiding temple construction',
      'Trace the evolution of temple architecture from Gupta period to medieval India'
    ],
    lessons: [
      {
        title: 'Three Styles of Hindu Temple Architecture',
        content: `Hindu temples evolved into three principal regional styles over centuries:

**1. Nagara Style (North India)**
- Found in northern and central India
- Characterized by a curvilinear shikhara (tower) rising over the sanctum
- The shikhara curves inward as it rises, ending in a flat disc (amalaka) topped by a pot-shaped finial (kalasha)
- Key examples: Konark Sun Temple (Odisha), Khajuraho temples (MP), Lingaraja Temple (Bhubaneswar)
- Sub-types: Latina (simple curvilinear), Valabhi (barrel-vaulted), Shekhara (clustered)

**2. Dravidian Style (South India)**
- Found in Tamil Nadu, Karnataka, Andhra Pradesh, Telangana, Kerala
- Characterized by a pyramidal tower (vimana) with horizontal tiers over the sanctum
- Massive entrance gateways (gopurams) are the most striking feature, often much taller than the main temple
- Key examples: Brihadeeswarar Temple (Thanjavur), Meenakshi Amman Temple (Madurai), Shore Temple (Mahabalipuram)

**3. Vesara Style (Deccan/Mixed)**
- A hybrid of Nagara and Dravidian elements
- Predominant in the Deccan region (Karnataka, Maharashtra)
- Key examples: Hoysala temples (Karnataka) — noted for their star-shaped platforms and intricate sculptures`,
        duration: 20,
        order: 0
      },
      {
        title: 'Key Elements of a Hindu Temple',
        content: `A Hindu temple is conceived as the dwelling of the deity — a sacred mountain or the cosmos itself. The main architectural elements are:

**Garbhagriha (Sanctum Sanctorum)**
- The innermost chamber housing the main deity
- Dark, small, and womb-like (garbha = womb, griha = house)
- Represents the cave within the sacred mountain

**Shikhara / Vimana (Tower/Spire)**
- The towering superstructure above the garbhagriha
- Represents the sacred mountain (Mount Meru/Kailash)
- In Nagara style: curvilinear (shikhara); in Dravidian: pyramidal (vimana)

**Mandapa (Hall/Porch)**
- The assembly hall in front of the garbhagriha where devotees gather
- Can be ardhamandapa (small), mandapa (main), and mahamandapa (great hall)
- Often intricately carved with mythological scenes

**Antechamber (Vestibule)**
- Connects the mandapa to the garbhagriha

**Pradakshinapatha (Circumambulation Path)**
- Devotees walk clockwise around the sanctum as an act of worship

**Gopuram (Gateway Tower)**
- Characteristic of South Indian (Dravidian) temples
- The huge ceremonial towers at the temple entrances
- Often the most visually impressive element, covered in stucco sculptures

**Vastu Shastra:**
Temple design follows Vastu Shastra, the ancient Indian science of architecture. Temples are oriented east-west so the rising sun illuminates the deity. The layout corresponds to the Vastu Purusha Mandala — a grid that maps cosmic energies to physical space.`,
        duration: 25,
        order: 1
      },
      {
        title: 'Famous Temples of India',
        content: `**Brihadeeswarar Temple (Thanjavur, Tamil Nadu)**
Built by Chola king Raja Raja I (985–1014 CE). The vimana (tower) rises 66 metres — one of the tallest in the world. A UNESCO World Heritage Site since 1987. The shadow of the vimana reportedly does not fall on the ground at noon.

**Meenakshi Amman Temple (Madurai, Tamil Nadu)**
One of India's largest and most visited temples. Dedicated to Goddess Meenakshi and Lord Sundareswarar. Has 14 gopurams (towers), with the tallest measuring 52 metres. Estimated to have 33,000 sculptures.

**Tirupati Balaji — Venkateswara Temple (Andhra Pradesh)**
The world's most visited religious site, receiving ~70,000-100,000 pilgrims daily. Located on Tirumala Hills, dedicated to Lord Venkateswara (form of Vishnu). Estimated annual revenue exceeds Rs. 4,000 crore.

**Somnath Temple (Gujarat)**
One of the 12 Jyotirlingas (the most sacred Shiva shrines). Was destroyed and rebuilt multiple times. The current temple was rebuilt in 1951 under the initiative of Sardar Vallabhbhai Patel.

**Kashi Vishwanath Temple (Varanasi, Uttar Pradesh)**
One of the 12 Jyotirlingas, located in Varanasi (Kashi), the holiest city of Hinduism. The temple was demolished multiple times and rebuilt. The current structure was built by Ahilya Bai Holkar of Indore in 1780 CE.

**Golden Temple — Harmandir Sahib (Amritsar, Punjab)**
The holiest Sikh gurdwara, built in Amritsar in 1604 CE. The upper floors are covered with 750 kg of pure gold donated by Maharaja Ranjit Singh. Langar (free community kitchen) serves 100,000+ meals daily.`,
        duration: 15,
        order: 2
      }
    ],
    isPublished: true
  },
  {
    title: 'Living Traditions of India',
    description: 'Explore the vibrant living traditions, festivals, performing arts, and craft traditions that continue to thrive across India today.',
    category: 'Tradition',
    level: 'beginner',
    duration: 40,
    objectives: [
      'Understand what constitutes intangible cultural heritage',
      'Learn about major UNESCO-recognized intangible cultural heritages of India',
      'Explore the role of festivals in preserving cultural traditions',
      'Appreciate the diversity of Indian classical and folk performing arts'
    ],
    lessons: [
      {
        title: 'Intangible Cultural Heritage of India',
        content: `**What is Intangible Cultural Heritage (ICH)?**

UNESCO defines ICH as "practices, representations, expressions, knowledge, skills — as well as the instruments, objects, artefacts, and cultural spaces associated therewith — that communities, groups, and, in some cases, individuals recognize as part of their cultural heritage."

ICH is "living" heritage — it is continuously recreated by communities and passed down through generations.

**India's UNESCO ICH Elements (partial list):**

| ICH Element | Year Recognized |
|-------------|----------------|
| Koodiyattam (Sanskrit theatre, Kerala) | 2008 |
| Vedic Chanting | 2008 |
| Ramlila (traditional performance of Ramayana) | 2008 |
| Ramman (Uttarakhand ritual) | 2009 |
| Mudiyettu (Kerala ritual theatre) | 2010 |
| Kalbelia (Rajasthan folk songs and dances) | 2010 |
| Chhau dance | 2010 |
| Buddhist Chanting (Ladakh) | 2012 |
| Sankirtana (Manipur ritual) | 2013 |
| Yoga | 2016 |
| Nawrouz (Persian New Year) | 2016 |
| Kumbh Mela | 2017 |
| Durga Puja | 2021 |
| Garba of Gujarat | 2023 |

**Eight Classical Dance Forms of India** (recognized by Sangeet Natak Akademi):
1. Bharatanatyam (Tamil Nadu)
2. Kathak (North India)
3. Kathakali (Kerala)
4. Kuchipudi (Andhra Pradesh)
5. Manipuri (Manipur)
6. Mohiniyattam (Kerala)
7. Odissi (Odisha)
8. Sattriya (Assam)`,
        duration: 15,
        order: 0
      },
      {
        title: 'Major Festivals of India',
        content: `India\'s diversity is best experienced through its festivals. Here are some of the most significant:

**Diwali — Festival of Lights**
- Date: Amavasya (new moon) of Kartik month (October-November)
- Celebrated by Hindus, Jains, and Sikhs
- Commemorates Lord Rama\'s return to Ayodhya; also celebrates Goddess Lakshmi
- Characterized by lighting of diyas (lamps), fireworks, exchange of sweets, worship of Lakshmi-Ganesha

**Holi — Festival of Colors**
- Date: Full moon of Phalguna (February-March)
- Celebrates the victory of good over evil (Holika Dahan story)
- Associated with Krishna and Radha\'s playful tradition in Mathura-Vrindavan
- Most vibrant in Uttar Pradesh, Rajasthan, and West Bengal (as Dol Jatra)

**Eid-ul-Fitr and Eid-ul-Adha**
- Eid-ul-Fitr marks the end of Ramadan (Islamic month of fasting)
- Eid-ul-Adha commemorates Ibrahim\'s willingness to sacrifice his son
- Celebrated with namaz, feasting, charity, and community gatherings

**Christmas**
- Celebrated on December 25 by India\'s Christian communities (approximately 28 million)
- Goa, Kerala, and Meghalaya have particularly vibrant Christmas celebrations

**Onam (Kerala)**
- Harvest festival of Kerala celebrating the return of mythical King Mahabali
- Celebrated with the famous Pookalam (flower carpet), Vallam Kali (snake boat race), and Onam Sadya (traditional feast)
- Declared a UNESCO Intangible Cultural Heritage of Humanity in 2020

**Navratri and Garba (Gujarat)**
- Nine-night festival dedicated to Goddess Durga in her nine forms
- The Garba dance of Gujarat during Navratri was inscribed in UNESCO\'s ICH list in 2023
- Celebrated with fasting, Dandiya Raas, and Garba dance`,
        duration: 15,
        order: 1
      },
      {
        title: 'Traditional Crafts of India',
        content: `India\'s traditional crafts represent centuries of accumulated skill and artistic tradition. Each region has its distinctive craft traditions:

**Textile Crafts:**
- **Banarasi Silk** (Varanasi, UP) — GI Tagged; silk sarees woven with gold/silver brocade
- **Kanchipuram Silk** (Tamil Nadu) — GI Tagged; known for rich colors and heavy silk
- **Pashmina** (Kashmir) — Ultra-fine cashmere wool shawls
- **Patola** (Patan, Gujarat) — GI Tagged; double ikat-woven silk sarees
- **Phulkari** (Punjab) — Floral embroidery on cloth for festive occasions
- **Chikankari** (Lucknow) — Delicate hand-embroidery on fine fabric

**Painting Traditions:**
- **Madhubani/Mithila** (Bihar) — Folk paintings on paper/walls
- **Warli** (Maharashtra/Gujarat tribal) — Geometric tribal art
- **Pattachitra** (Odisha/Bengal) — Narrative scroll paintings
- **Tanjore Painting** (Tamil Nadu) — Rich with gold foil and precious stones
- **Miniature Painting** (Rajasthan/Mughal tradition)

**Craft Traditions:**
- **Dhokra** (Chhattisgarh/West Bengal) — Ancient lost-wax metal casting technique
- **Blue Pottery** (Jaipur, Rajasthan) — GI Tagged; Turco-Persian technique with Indian motifs
- **Channapatna Toys** (Karnataka) — GI Tagged; lacquer-coated wooden toys
- **Bidriware** (Bidar, Karnataka) — GI Tagged; black alloy inlaid with silver

Many crafts carry GI (Geographical Indication) tags from the Government of India, protecting them from imitation and supporting the artisan communities.`,
        duration: 10,
        order: 2
      }
    ],
    isPublished: true
  }
];

// ============ QUIZ DATA ============
const quizzesData = [
  {
    title: 'Indian Heritage: Basics Quiz',
    description: 'Test your knowledge of Indian heritage, monuments, and UNESCO World Heritage Sites.',
    category: 'General',
    passingScore: 60,
    questions: [
      {
        question: 'In which year was Konark Sun Temple inscribed as a UNESCO World Heritage Site?',
        options: ['1983', '1984', '1986', '1992'],
        correctAnswer: 1,
        explanation: 'The Konark Sun Temple was inscribed as a UNESCO World Heritage Site in 1984. It was built by King Narasimhadeva I of the Eastern Ganga dynasty around 1250 CE.'
      },
      {
        question: 'The Qutb Minar in Delhi was begun by which ruler?',
        options: ['Akbar', 'Iltutmish', 'Qutb ud-Din Aibak', 'Muhammad bin Tughluq'],
        correctAnswer: 2,
        explanation: 'The Qutb Minar was begun around 1193 CE by Qutb ud-Din Aibak, the founder of the Delhi Sultanate (Slave Dynasty). It was completed by his successor Iltutmish.'
      },
      {
        question: 'Which ancient civilization site in Gujarat, inscribed as UNESCO WHS in 2021, is part of the Indus Valley Civilization?',
        options: ['Lothal', 'Dholavira', 'Rajkot', 'Vadnagar'],
        correctAnswer: 1,
        explanation: 'Dholavira, located on Khadir Island in the Rann of Kutch, Gujarat, was inscribed as a UNESCO World Heritage Site in 2021. It is one of the largest cities of the Indus Valley Civilization (3000-1500 BCE).'
      },
      {
        question: 'How many UNESCO World Heritage Sites does India have (as of 2024)?',
        options: ['32', '38', '40', '42'],
        correctAnswer: 3,
        explanation: 'India has 42 UNESCO World Heritage Sites as of 2024, making it the sixth country globally by number of World Heritage Sites. These include 34 cultural, 7 natural, and 1 mixed site.'
      },
      {
        question: 'The Ajanta Caves were rediscovered in 1819 by which British officer?',
        options: ['Captain James Tod', 'John Smith', 'Alexander Cunningham', 'Henry Taylor'],
        correctAnswer: 1,
        explanation: 'The Ajanta Caves were rediscovered in 1819 by British Army officer John Smith, who was on a tiger hunt. The caves had been abandoned since approximately the 7th century CE.'
      },
      {
        question: 'Which festival of India was recognized as UNESCO Intangible Cultural Heritage in 2021?',
        options: ['Onam', 'Kumbh Mela', 'Durga Puja', 'Navratri'],
        correctAnswer: 2,
        explanation: 'Durga Puja in Kolkata was inscribed in UNESCO\'s Representative List of Intangible Cultural Heritage of Humanity in 2021. Kumbh Mela was inscribed in 2017.'
      },
      {
        question: 'The stone chariot at which South Indian temple complex is featured on the Indian 50-rupee note?',
        options: ['Meenakshi Temple', 'Vittala Temple, Hampi', 'Brihadeeswarar Temple', 'Shore Temple'],
        correctAnswer: 1,
        explanation: 'The stone chariot at the Vittala Temple in Hampi (Karnataka) is featured on the Indian 50-rupee note. Hampi was the capital of the Vijayanagara Empire (14th-16th centuries CE).'
      },
      {
        question: 'The Rani-ki-Vav stepwell in Gujarat was built by whom and in whose memory?',
        options: [
          'Queen Udayamati in memory of King Bhimdev I',
          'Queen Padmavati in memory of King Ratan Singh',
          'Queen Ahilyabai in memory of King Malharrao',
          'Queen Nur Jahan in memory of Emperor Jahangir'
        ],
        correctAnswer: 0,
        explanation: 'Rani-ki-Vav was built by Queen Udayamati around 1063 CE in memory of her husband King Bhimdev I of the Solanki dynasty. It is a UNESCO World Heritage Site since 2014 and features on the Rs. 100 note.'
      },
      {
        question: 'Which classical dance form of India originates from the devadasi tradition in Tamil Nadu?',
        options: ['Kathakali', 'Odissi', 'Bharatanatyam', 'Manipuri'],
        correctAnswer: 2,
        explanation: 'Bharatanatyam originated from the devadasi tradition in Tamil Nadu\'s temples, particularly in the Thanjavur region. It is named after Bharata Muni, the author of the Natya Shastra. Rukmini Devi Arundale revived it as a concert stage art form.'
      },
      {
        question: 'The Ellora Caves, a UNESCO WHS, represent the coexistence of which three religious traditions?',
        options: [
          'Hinduism, Buddhism, Jainism',
          'Hinduism, Buddhism, Islam',
          'Buddhism, Jainism, Islam',
          'Hinduism, Jainism, Sikhism'
        ],
        correctAnswer: 0,
        explanation: 'The Ellora Caves (100 monuments total) represent three religious traditions: Buddhist caves (1-12), Hindu caves (13-29), and Jain caves (30-34). This remarkable co-existence demonstrates ancient India\'s spirit of religious tolerance.'
      }
    ]
  },
  {
    title: 'Mughal Architecture Quiz',
    description: 'Test your knowledge of the magnificent architecture of the Mughal Empire in India.',
    category: 'Monument',
    passingScore: 60,
    questions: [
      {
        question: 'Fatehpur Sikri was built by which Mughal Emperor and in which period?',
        options: ['Babur (1526-1530)', 'Humayun (1530-1555)', 'Akbar (1571-1585)', 'Shah Jahan (1632-1648)'],
        correctAnswer: 2,
        explanation: 'Fatehpur Sikri was built by Emperor Akbar between 1571 and 1585 CE as his new imperial capital, located 37 km from Agra. It was abandoned after approximately 14 years, possibly due to water scarcity.'
      },
      {
        question: 'The Buland Darwaza at Fatehpur Sikri is considered the largest gateway in the world. How tall is it?',
        options: ['34 metres', '44 metres', '54 metres', '64 metres'],
        correctAnswer: 2,
        explanation: 'The Buland Darwaza (Gate of Victory) at Fatehpur Sikri is 54 metres (176 feet) high. It was built by Akbar to commemorate his conquest of Gujarat in 1573 CE.'
      },
      {
        question: 'The Red Fort in Delhi was built by which Mughal Emperor and between which years?',
        options: ['Akbar (1565-1575)', 'Jahangir (1605-1620)', 'Shah Jahan (1638-1648)', 'Aurangzeb (1658-1680)'],
        correctAnswer: 2,
        explanation: 'The Red Fort (Lal Qila) was built by Emperor Shah Jahan between 1638 and 1648 CE. It served as the main residence of the Mughal emperors for nearly 200 years until 1857.'
      },
      {
        question: 'What architectural style is demonstrated by the Red Fort and Fatehpur Sikri?',
        options: ['Nagara Style', 'Dravidian Style', 'Indo-Islamic Style', 'Colonial Style'],
        correctAnswer: 2,
        explanation: 'The Red Fort and Fatehpur Sikri are built in the Indo-Islamic (or Mughal) architectural style, which synthesizes elements from Central Asian Islamic architecture with indigenous Indian (particularly Hindu and Jain) traditions.'
      },
      {
        question: 'The Taj Mahal was built by Emperor Shah Jahan as a mausoleum for whom?',
        options: ['His mother Nur Jahan', 'His wife Mumtaz Mahal', 'His daughter Jahanara Begum', 'Himself'],
        correctAnswer: 1,
        explanation: 'The Taj Mahal was built by Emperor Shah Jahan as a mausoleum for his beloved wife Mumtaz Mahal, who died in 1631 CE during childbirth. Construction began in 1632 and was completed in 1648.'
      }
    ]
  }
];

// ============ STATES & UNION TERRITORIES (36) ============
const statesData = [
  { name: 'Andhra Pradesh', capital: 'Amaravati', region: 'South', description: 'Known for its rich history, classical dance forms like Kuchipudi, ancient Buddhist heritage sites, and the famous Tirupati Balaji temple.', temples: 'Tirupati Balaji, Srikalahasti, Kanaka Durga', icon: '🎭', isUT: false },
  { name: 'Arunachal Pradesh', capital: 'Itanagar', region: 'Northeast', description: 'The land of the dawn-lit mountains, home to diverse tribal cultures, Buddhist monasteries, and pristine natural landscapes.', temples: 'Tawang Monastery, Malinithan, Parasuram Kund', icon: '🌄', isUT: false },
  { name: 'Assam', capital: 'Dispur', region: 'Northeast', description: 'Famous for its tea gardens, Kaziranga National Park, Kamakhya Temple, and the classical dance form Sattriya.', temples: 'Kamakhya, Umananda, Navagraha, Basistha', icon: '🦏', isUT: false },
  { name: 'Bihar', capital: 'Patna', region: 'East', description: 'The cradle of Buddhism and Jainism, home to Bodh Gaya, Nalanda University ruins, and the Mahabodhi Temple Complex.', temples: 'Vishnupad, Mahabodhi, Mundeshwari, Patan Devi', icon: '🪷', isUT: false },
  { name: 'Chhattisgarh', capital: 'Raipur', region: 'Central', description: 'Rich in tribal culture, waterfalls, ancient temples, and Bastar art. Known for Chitrakote Falls and Bhoramdeo Temple.', temples: 'Bhoramdeo, Rajim Rajiv Lochan, Sirpur Laxman', icon: '🏺', isUT: false },
  { name: 'Goa', capital: 'Panaji', region: 'West', description: 'Home to UNESCO-listed Churches and Convents of Old Goa, Portuguese colonial heritage, and vibrant coastal culture.', temples: 'Mangeshi, Shantadurga, Mahalasa Narayani', icon: '⛪', isUT: false },
  { name: 'Gujarat', capital: 'Gandhinagar', region: 'West', description: 'Land of the UNESCO-listed Rani ki Vav stepwell, Dholavira of the Indus Valley Civilization, and the vibrant Navratri festival.', temples: 'Somnath, Dwarkadhish, Ambaji, Akshardham', icon: '🦁', isUT: false },
  { name: 'Haryana', capital: 'Chandigarh', region: 'North', description: 'Site of the historic Kurukshetra battlefield, mentioned in the Mahabharata. Rich in Haryanvi folk traditions and crafts.', temples: 'Brahma Sarovar, Mata Mansa Devi, Jyotisar', icon: '🏹', isUT: false },
  { name: 'Himachal Pradesh', capital: 'Shimla', region: 'North', description: 'Himalayan state with magnificent Buddhist monasteries, colonial hill stations, and ancient temples in the Kullu-Manali valley.', temples: 'Jwalamukhi, Hidimba Devi, Baijnath, Chamunda', icon: '🏔️', isUT: false },
  { name: 'Jharkhand', capital: 'Ranchi', region: 'East', description: 'Land of forests with tribal heritage, ancient rock art at Hazaribagh, and Deoghar Shiva temple, one of the 12 Jyotirlingas.', temples: 'Baidyanath Jyotirlinga, Basukinath, Rajrappa', icon: '🌲', isUT: false },
  { name: 'Karnataka', capital: 'Bengaluru', region: 'South', description: 'Home to the UNESCO-listed Hampi ruins, Hoysala temples, Mysuru palace, and vibrant Carnatic music and Yakshagana tradition.', temples: 'Virupaksha Hampi, Udupi Krishna, Chamundeshwari', icon: '👑', isUT: false },
  { name: 'Kerala', capital: 'Thiruvananthapuram', region: 'South', description: 'God\'s Own Country — famous for Kathakali dance, backwaters, ancient Guruvayur temple, and Mattancherry\'s Jewish heritage.', temples: 'Padmanabhaswamy, Guruvayur, Sabarimala Ayyappa', icon: '🌴', isUT: false },
  { name: 'Madhya Pradesh', capital: 'Bhopal', region: 'Central', description: 'The heart of India with UNESCO sites Khajuraho, Sanchi Stupa, Bhimbetka rock shelters, and diverse tribal heritage.', temples: 'Mahakaleshwar Ujjain, Omkareshwar, Khajuraho', icon: '🏛️', isUT: false },
  { name: 'Maharashtra', capital: 'Mumbai', region: 'West', description: 'Home to UNESCO-listed Ajanta and Ellora Caves, Elephanta Caves, and the Maratha empire\'s magnificent fort heritage.', temples: 'Trimbakeshwar, Shirdi Sai Baba, Pandharpur Vitthal', icon: '🚩', isUT: false },
  { name: 'Manipur', capital: 'Imphal', region: 'Northeast', description: 'Birthplace of Polo, known for Meitei culture, the classical Manipuri dance form, and the sacred Loktak Lake.', temples: 'Shri Govindaji, Mahabali Temple, Sanamahi', icon: '🌸', isUT: false },
  { name: 'Meghalaya', capital: 'Shillong', region: 'Northeast', description: 'The abode of clouds, known for living root bridges, Khasi tribal culture, and the wettest place on Earth, Mawsynram.', temples: 'Nartiang Durga, Mahadev Khola, Balpakram', icon: '🌿', isUT: false },
  { name: 'Mizoram', capital: 'Aizawl', region: 'Northeast', description: 'A harmonious land of Mizo tribal culture, bamboo crafts, and stunning scenic landscapes in the northeastern hills.', temples: 'Solomon\'s Temple, Shiv Mandir Aizawl', icon: '🌾', isUT: false },
  { name: 'Nagaland', capital: 'Kohima', region: 'Northeast', description: 'Famous for Hornbill Festival, Naga tribal heritage, warrior traditions, and the historic Battle of Kohima site.', temples: 'Dimapur Kalibari, Kohima Jain Temple', icon: '🪶', isUT: false },
  { name: 'Odisha', capital: 'Bhubaneswar', region: 'East', description: 'Temple of Temples — home to the UNESCO-listed Konark Sun Temple, Puri Jagannath Temple, and the classical Odissi dance.', temples: 'Jagannath Puri, Lingaraj, Konark Sun Temple', icon: '🛕', isUT: false },
  { name: 'Punjab', capital: 'Chandigarh', region: 'North', description: 'Land of five rivers and the Golden Temple in Amritsar — one of India\'s most revered Sikh shrines, drawing millions yearly.', temples: 'Golden Temple Amritsar, Durgiana Mandir', icon: '🌾', isUT: false },
  { name: 'Rajasthan', capital: 'Jaipur', region: 'North', description: 'The land of royals with UNESCO-listed hill forts, vibrant folk music and dance, Jaipur\'s Pink City, and Thar desert heritage.', temples: 'Brahma Temple Pushkar, Karni Mata, Eklingji', icon: '🏰', isUT: false },
  { name: 'Sikkim', capital: 'Gangtok', region: 'Northeast', description: 'A Himalayan jewel with ancient Buddhist monasteries, Rumtek Monastery, and Kangchenjunga, India\'s highest peak.', temples: 'Rumtek Monastery, Kirateshwar Muktidham', icon: '🏔️', isUT: false },
  { name: 'Tamil Nadu', capital: 'Chennai', region: 'South', description: 'Home to UNESCO-listed Mahabalipuram monuments, Brihadeeswarar Temple, classical Bharatanatyam dance, and Carnatic music.', temples: 'Meenakshi Amman, Brihadeeswara, Ramanathaswamy', icon: '🛕', isUT: false },
  { name: 'Telangana', capital: 'Hyderabad', region: 'South', description: 'Known for Charminar, Golconda Fort, Warangal\'s Kakatiya temple ruins, and its pearl and Bidri craft heritage.', temples: 'Ramappa, Yadagirigutta, Thousand Pillar', icon: '💎', isUT: false },
  { name: 'Tripura', capital: 'Agartala', region: 'Northeast', description: 'Rich in Bengali and tribal culture with the 14th-century Ujjayanta Palace, Neermahal palace, and Tripura Sundari temple.', temples: 'Tripura Sundari, Chaturdasha Devata, Unakoti', icon: '👑', isUT: false },
  { name: 'Uttar Pradesh', capital: 'Lucknow', region: 'North', description: 'Home to UNESCO-listed Taj Mahal, Agra Fort, Fatehpur Sikri, Varanasi ghats, and the Ayodhya Ram Janmabhoomi.', temples: 'Kashi Vishwanath, Ayodhya Ram Mandir, Mathura', icon: '🕌', isUT: false },
  { name: 'Uttarakhand', capital: 'Dehradun', region: 'North', description: 'Devbhumi — land of gods with Char Dham pilgrimage sites, Haridwar and Rishikesh on the sacred Ganga, and Himalayan culture.', temples: 'Kedarnath, Badrinath, Gangotri, Yamunotri', icon: '🏔️', isUT: false },
  { name: 'West Bengal', capital: 'Kolkata', region: 'East', description: 'Cultural capital with Durga Puja UNESCO recognition, Rabindranath Tagore\'s heritage, Sundarbans, and Bishnupur temples.', temples: 'Dakshineswar Kali, Kalighat, Tarapith', icon: '🐅', isUT: false },
  { name: 'Delhi', capital: 'New Delhi', region: 'North', description: 'Capital territory with UNESCO-listed Red Fort, Qutub Minar complex, Humayun\'s Tomb, and millennia of layered history.', temples: 'Akshardham, Lotus Temple, Birla Mandir, Kalkaji', icon: '🏛️', isUT: true },
  { name: 'Jammu and Kashmir', capital: 'Srinagar', region: 'North', description: 'Paradise on Earth — home to the Amarnath cave shrine, Vaishno Devi temple, Kashmir Valley, and ancient Martand Sun Temple.', temples: 'Mata Vaishno Devi, Amarnath Cave, Shankaracharya', icon: '❄️', isUT: true },
  { name: 'Ladakh', capital: 'Leh', region: 'North', description: 'The land of high passes with ancient Tibetan Buddhist monasteries, Hemis Monastery, and Pangong Tso lake.', temples: 'Hemis Gompa, Thiksey Monastery, Diskit', icon: '🏔️', isUT: true },
  { name: 'Puducherry', capital: 'Puducherry', region: 'South', description: 'French colonial heritage meets Tamil culture in this coastal UT, home to Sri Aurobindo Ashram and Auroville.', temples: 'Manakula Vinayagar, Varadaraja Perumal', icon: '🌸', isUT: true },
  { name: 'Andaman and Nicobar Islands', capital: 'Port Blair', region: 'Islands', description: 'Historic Cellular Jail, pristine beaches, Andamanese tribal culture, and rich marine biodiversity in the Bay of Bengal.', temples: 'Sri Vetrimalai Murugan, Coastal Shrines', icon: '🏝️', isUT: true },
  { name: 'Lakshadweep', capital: 'Kavaratti', region: 'Islands', description: 'Coral island territory with unique Islamic heritage, traditional boat-building crafts, and vibrant Lakshadweep folk dances.', temples: 'Ujra Shrines, Marine Heritage Shrines', icon: '🌊', isUT: true },
  { name: 'Chandigarh', capital: 'Chandigarh', region: 'North', description: 'Le Corbusier\'s planned city featuring the iconic Rock Garden, Sukhna Lake, and its unique modernist architectural heritage.', temples: 'ISCKON Chandigarh, Chandi Devi Mandir', icon: '✋', isUT: true },
  { name: 'Dadra and Nagar Haveli and Daman and Diu', capital: 'Daman', region: 'West', description: 'Portuguese colonial heritage, tribal Warli art, ancient temples, and coastal traditions blend in these western union territories.', temples: 'Somnath Mahadev, Bindrabin Temple', icon: '🏰', isUT: true }
];

// ============ SACRED TEMPLES DATA ============
const templesData = [
  {
    name: 'Somnath Temple',
    deity: 'Lord Shiva',
    state: 'Gujarat',
    city: 'Prabhas Patan, Veraval',
    district: 'Gir Somnath',
    location: 'Saurashtra Coast, Gujarat',
    description: 'The first among the twelve Aadi Jyotirlinga shrines of Lord Shiva, located on the western coast of Gujarat. Known as the Shrine Eternal, it has been reconstructed several times.',
    history: 'Ancient historical shrine mentioned in Rigveda, reconstructed in the Chalukya style of temple architecture by Sardar Vallabhbhai Patel after independence.',
    significance: 'First of the 12 sacred Jyotirlingas, revered pilgrimage destination where three sacred rivers meet the Arabian Sea.',
    architecture: 'Chalukya / Kailash Mahameru Prasad style with a 155-foot spire and Brahmadhvaj.',
    timings: '6:00 AM – 9:30 PM',
    bestTimeToVisit: 'October to March',
    image: '',
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Dwarkadhish Temple',
    deity: 'Lord Krishna (Dwarkadhish)',
    state: 'Gujarat',
    city: 'Dwarka',
    district: 'Devbhumi Dwarka',
    location: 'Dwarka, Gujarat',
    description: 'Also known as the Jagat Mandir, dedicated to Lord Krishna who ruled his kingdom from Dwarka. A key destination of the sacred Char Dham pilgrimage.',
    history: 'Believed to have been originally built over 2,500 years ago by Lord Krishna\'s great-grandson Vajranabha.',
    significance: 'One of the four sacred Char Dham pilgrimage sites and Sapta Puri holy cities.',
    architecture: 'Chalukya architecture, 5-storeyed sandstone shrine supported by 72 carved pillars.',
    timings: '6:30 AM – 1:00 PM, 5:00 PM – 9:30 PM',
    bestTimeToVisit: 'September to March',
    image: '',
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Kashi Vishwanath Temple',
    deity: 'Lord Shiva (Vishveshwara)',
    state: 'Uttar Pradesh',
    city: 'Varanasi',
    district: 'Varanasi',
    location: 'Vishwanath Gali, Varanasi',
    description: 'One of the most famous Hindu temples dedicated to Lord Shiva, located on the sacred western bank of the Ganga river in Varanasi.',
    history: 'One of the 12 Jyotirlingas, deeply intertwined with the eternal spiritual history of Kashi, revitalized with the grand Kashi Vishwanath Dham corridor.',
    significance: 'Spiritual epicenter of Hinduism; a dip in Ganga and darshan of Vishwanath is believed to grant Moksha.',
    architecture: 'Nagara architecture with gold-plated Shikharas donated by Maharaja Ranjit Singh.',
    timings: '3:00 AM – 11:00 PM',
    bestTimeToVisit: 'November to February',
    image: '',
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Shri Ram Janmabhoomi Mandir',
    deity: 'Lord Rama (Balak Ram)',
    state: 'Uttar Pradesh',
    city: 'Ayodhya',
    district: 'Ayodhya',
    location: 'Ramkot, Ayodhya',
    description: 'The monumental Hindu temple built at the sacred site of Ram Janmabhoomi, the revered birthplace of Lord Rama in Ayodhya.',
    history: 'Consecrated with grand spiritual rites in January 2024, built using traditional stone masonry without structural steel.',
    significance: 'Revered birthplace of Maryada Purushottam Shri Ram, epic center of Ramayana tradition.',
    architecture: 'Classical Nagara Gurjara-Chalukya style carved out of pink sandstone from Bansi Paharpur, Rajasthan.',
    timings: '6:30 AM – 9:30 PM',
    bestTimeToVisit: 'October to March',
    image: '',
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Tirupati Venkateswara Temple',
    deity: 'Lord Venkateswara (Balaji)',
    state: 'Andhra Pradesh',
    city: 'Tirumala, Tirupati',
    district: 'Tirupati',
    location: 'Venkatadri Hill, Seshachalam Range',
    description: 'World-renowned Vaishnavite shrine located atop the sacred Tirumala hills, one of the most visited and venerated pilgrimage centers on earth.',
    history: 'Endowed by Pallavas, Cholas, Pandyas, and grandly developed by Krishnadevaraya of Vijayanagara Empire.',
    significance: 'Known as Kaliyuga Vaikuntha; Lord Srinivasa manifests here to redeem mankind.',
    architecture: 'Dravidian architecture featuring the Ananda Nilayam gilded vimana.',
    timings: 'Open 24 hours daily',
    bestTimeToVisit: 'September to February',
    image: '',
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Meenakshi Amman Temple',
    deity: 'Goddess Meenakshi & Lord Sundareswarar',
    state: 'Tamil Nadu',
    city: 'Madurai',
    district: 'Madurai',
    location: 'Heart of Madurai city on the banks of Vaigai River',
    description: 'A historic Hindu temple with 14 magnificent multicolored gopurams (gateway towers) soaring above Madurai, celebrating the divine union of Meenakshi and Shiva.',
    history: 'Historic temple with millennia of Sangam-era roots, grandly rebuilt by the Nayak rulers between the 16th and 17th centuries.',
    significance: 'Major Shakti Peeth and masterpiece of southern temple art with the Hall of Thousand Pillars.',
    architecture: 'High Dravidian style with carved granite gopurams depicting thousands of mythological figures.',
    timings: '5:00 AM – 12:30 PM, 4:00 PM – 10:00 PM',
    bestTimeToVisit: 'October to March',
    image: '',
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Brihadeeswarar Temple',
    deity: 'Lord Shiva',
    state: 'Tamil Nadu',
    city: 'Thanjavur',
    district: 'Thanjavur',
    location: 'Thanjavur, Tamil Nadu',
    description: 'UNESCO World Heritage Site built by Raja Raja Chola I in 1010 CE. Features one of the tallest granite temple spires in the world and an 80-tonne monolithic Kumbam.',
    history: 'Completed in 1010 CE, representing the pinnacle of Chola imperial architectural and bronze casting power.',
    significance: 'UNESCO Great Living Chola Temple, architectural engineering wonder of ancient India.',
    architecture: 'Pure Dravidian monumental granite architecture with 216-ft Vimana.',
    timings: '6:00 AM – 12:30 PM, 4:00 PM – 8:30 PM',
    bestTimeToVisit: 'November to February',
    image: '',
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Shree Jagannath Temple',
    deity: 'Lord Jagannath, Balabhadra, Subhadra',
    state: 'Odisha',
    city: 'Puri',
    district: 'Puri',
    location: 'Grand Road, Puri Coast',
    description: 'Famed sacred shrine on the eastern coast of Odisha, one of the four cardinal Char Dham pilgrimage destinations, world-famous for its annual Ratha Yatra.',
    history: 'Constructed by King Anantavarman Chodaganga Deva in the 12th century CE.',
    significance: 'One of the Char Dham sacred sites, renowned for the Mahaprasad cooked in earthen pots and annual chariot festival.',
    architecture: 'Kalinga architecture with towering Rekha Deula spire and Aruna Stambha.',
    timings: '5:00 AM – 11:00 PM',
    bestTimeToVisit: 'October to March',
    image: '',
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Mahakaleshwar Jyotirlinga',
    deity: 'Lord Shiva (Mahakal)',
    state: 'Madhya Pradesh',
    city: 'Ujjain',
    district: 'Ujjain',
    location: 'Shipra River banks, Ujjain',
    description: 'One of the 12 sacred Jyotirlingas, unique for being the only south-facing (Dakshinmurti) Jyotirlinga, famous worldwide for its dawn Bhasma Aarti.',
    history: 'Ancient sacred center of Avanti / Ujjayini, expanded by Scindia dynasty and revitalized with Shri Mahakal Lok corridor.',
    significance: 'Lord Shiva as Lord of Time and Death; sacred site of the Simhastha Kumbh Mela.',
    architecture: 'Bhumija, Chalukya, and Maratha architectural styles with ornate pillared halls.',
    timings: '4:00 AM – 11:00 PM',
    bestTimeToVisit: 'October to March',
    image: '',
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Kedarnath Temple',
    deity: 'Lord Shiva',
    state: 'Uttarakhand',
    city: 'Kedarnath, Rudraprayag',
    district: 'Rudraprayag',
    location: 'Garhwal Himalayas near Mandakini River, 3583m altitude',
    description: 'The highest among the 12 Jyotirlingas, situated near the Chorabari glacier in the majestic snow-clad Garhwal Himalayas. Key shrine of Chota Char Dham and Panch Kedar.',
    history: 'According to tradition, originally founded by the Pandavas and revived in the 8th century CE by Adi Shankaracharya.',
    significance: 'Northernmost Jyotirlinga, profound pilgrimage destination of salvation and spiritual endurance.',
    architecture: 'Himalayan stone masonry made of grey granite blocks held together by iron clamps.',
    timings: '4:00 AM – 9:00 PM',
    bestTimeToVisit: 'May to October',
    image: '',
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Badrinath Temple',
    deity: 'Lord Vishnu (Badrinarayan)',
    state: 'Uttarakhand',
    city: 'Badrinath, Chamoli',
    district: 'Chamoli',
    location: 'Between Nar and Narayana mountain ranges, Alaknanda River',
    description: 'Premier Char Dham shrine dedicated to Lord Vishnu in meditative posture, nestled between Himalayan peaks along the Alaknanda river.',
    history: 'Re-established as a major pilgrimage center by Adi Shankaracharya in the 9th century CE.',
    significance: 'One of the four cardinal Char Dham and Chota Char Dham pilgrimage shrines.',
    architecture: 'Traditional Himalayan wooden and stone architecture with a colorful arched facade and Tapt Kund thermal springs.',
    timings: '4:30 AM – 9:00 PM',
    bestTimeToVisit: 'May to October',
    image: '',
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Sri Harmandir Sahib (Golden Temple)',
    deity: 'Waheguru (Sri Guru Granth Sahib)',
    state: 'Punjab',
    city: 'Amritsar',
    district: 'Amritsar',
    location: 'Center of Amritsar city',
    description: 'The preeminent spiritual site of Sikhism, surrounded by the sacred Amrit Sarovar lake and crowned with pure gold foil, embodying universal brotherhood.',
    history: 'Designed by Guru Arjan Dev in 1588, gold leafing added by Maharaja Ranjit Singh in 1830.',
    significance: 'Spiritual center of Sikhism; runs the world\'s largest community free kitchen (Langar) feeding tens of thousands daily.',
    architecture: 'Indo-Islamic and Sikh architectural synthesis with marble inlays and gold cupolas.',
    timings: 'Open 24 hours daily',
    bestTimeToVisit: 'October to March',
    image: '',
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Vaishno Devi Temple',
    deity: 'Mata Vaishno Devi',
    state: 'Jammu and Kashmir',
    city: 'Katra',
    district: 'Reasi',
    location: 'Trikuta Mountains, Katra',
    description: 'Revered holy cave sanctuary located at an altitude of 5,200 ft in the Trikuta hills, drawing millions of pilgrims on a 13-km sacred mountain trek.',
    history: 'Sacred Pindies formed naturally over millions of years, revered in ancient folklore and Mahabharata.',
    significance: 'One of the holiest Shakti shrines in India; manifestation of three divine mother energies.',
    architecture: 'Natural holy cave shrine with modern marble halls and ropeway infrastructure.',
    timings: 'Open 24 hours daily',
    bestTimeToVisit: 'March to November',
    image: '',
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Maa Kamakhya Temple',
    deity: 'Goddess Kamakhya',
    state: 'Assam',
    city: 'Guwahati',
    district: 'Kamrup Metropolitan',
    location: 'Nilachal Hill, Guwahati',
    description: 'Ancient and powerful Shakti Peeth atop the Nilachal hill in Guwahati, celebrating the creative power of womanhood and mother earth during the Ambubachi Mela.',
    history: 'Earliest structures date to the 8th century Mlechha dynasty, rebuilt by Koch King Naranarayana in 1565 CE.',
    significance: 'Foremost of the 51 Shakti Peethas representing the Yoni of Goddess Sati; center of Tantric traditions.',
    architecture: 'Unique Nilachal architectural style combining a cruciform base with a hemispherical beehive dome.',
    timings: '5:30 AM – 5:30 PM',
    bestTimeToVisit: 'October to March',
    image: '',
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Virupaksha Temple',
    deity: 'Lord Shiva (Virupaksha)',
    state: 'Karnataka',
    city: 'Hampi',
    district: 'Vijayanagara',
    location: 'Tungabhadra River banks, Hampi UNESCO site',
    description: 'One of India\'s oldest continuously functioning temples, part of the UNESCO World Heritage site of Hampi. Famous for its 50-meter eastern gopuram and pinhole camera effect.',
    history: '7th-century foundations expanded under the Vijayanagara Empire by Krishnadevaraya in 1510 CE.',
    significance: 'Unbroken living worship site since the 7th century amid the epic ruins of Vijayanagara.',
    architecture: 'Vijayanagara Dravidian architecture featuring pillared Ranga Mandapa and monolithic Nandi.',
    timings: '6:00 AM – 9:00 PM',
    bestTimeToVisit: 'October to February',
    image: '',
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Sree Padmanabhaswamy Temple',
    deity: 'Lord Padmanabha',
    state: 'Kerala',
    city: 'Thiruvananthapuram',
    district: 'Thiruvananthapuram',
    location: 'Fort area, Thiruvananthapuram',
    description: 'Ancient temple renowned for Lord Vishnu reclining upon the cosmic serpent Anantha, built in a harmonious blend of Kerala and Dravidian architectural traditions.',
    history: 'Mentioned in Sangam literature and Divya Prabandham, renovated by Maharaja Marthanda Varma in the 18th century.',
    significance: 'One of the 108 Divya Desams; royal family of Travancore rules as Padmanabhadasa.',
    architecture: 'Blend of indigenous Kerala timber craftsmanship and Tamil Dravidian stone Gopuram style.',
    timings: '3:30 AM – 8:30 PM',
    bestTimeToVisit: 'October to March',
    image: '',
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Trimbakeshwar Shiva Temple',
    deity: 'Lord Shiva (Trimbakeshwar)',
    state: 'Maharashtra',
    city: 'Trimbak, Nashik',
    district: 'Nashik',
    location: 'Brahmagiri Mountain foothills near Godavari river origin',
    description: 'Ancient Jyotirlinga shrine near Nashik where the three faces of Brahma, Vishnu, and Rudra are embodied within a single sacred lingam, at the origin of the sacred Godavari river.',
    history: 'Built with black basalt by Peshwa Balaji Baji Rao in the 18th century.',
    significance: 'One of the 12 Jyotirlingas; origin of the holy Godavari river and site of the Nashik Kumbh Mela.',
    architecture: 'Hemadpanthi black basalt stone architecture with intricate carvings.',
    timings: '5:30 AM – 9:00 PM',
    bestTimeToVisit: 'October to March',
    image: '',
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Swaminarayan Akshardham Temple',
    deity: 'Bhagwan Swaminarayan',
    state: 'Delhi',
    city: 'New Delhi',
    district: 'East Delhi',
    location: 'Yamuna River Bank, NH 24, New Delhi',
    description: 'A spiritual-cultural campus displaying millennia of traditional Indian and Hindu culture, spirituality, and architecture, carved entirely from pink Rajasthani sandstone and Italian Carrara marble.',
    history: 'Consecrated in 2005 by Pramukh Swami Maharaj, built according to ancient Vastu Shastra and Pancharatra Shastra.',
    significance: 'Modern monument to ancient Sanatana Dharma heritage, featuring 234 carved pillars and 20,000 murtis.',
    architecture: 'Ancient Nagara temple architecture built completely without structural steel or iron.',
    timings: '9:30 AM – 8:00 PM',
    bestTimeToVisit: 'October to March',
    image: '',
    isFeatured: true,
    isActive: true
  }
];

// ============ SEED FUNCTION ============
const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('\n🌱 Starting DivyaBharat Database Seed...\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Heritage.deleteMany({});
    await Category.deleteMany({});
    await Module.deleteMany({});
    await Quiz.deleteMany({});
    await State.deleteMany({});
    await Temple.deleteMany({});
    console.log('✅ Database cleared\n');

    // Seed Admin
    console.log('👤 Creating admin user...');
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@divyabharat.in';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@DivyaBharat2024';

    await User.create({
      name: 'DivyaBharat Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
      phone: '+91 9876543210',
      location: 'New Delhi, India',
      isActive: true
    });
    console.log(`✅ Admin created: ${adminEmail}\n`);

    // Seed a demo teacher
    console.log('👩‍🏫 Creating demo teacher...');
    await User.create({
      name: 'Dr. Priya Sharma',
      email: 'teacher@divyabharat.in',
      password: 'Teacher@2024',
      role: 'teacher',
      phone: '+91 9876543211',
      location: 'Bengaluru, Karnataka',
      isActive: true
    });
    console.log('✅ Demo teacher created: teacher@divyabharat.in\n');

    // Seed a demo student
    console.log('🎓 Creating demo student...');
    await User.create({
      name: 'Arjun Kumar',
      email: 'student@divyabharat.in',
      password: 'Student@2024',
      role: 'student',
      phone: '+91 9876543212',
      location: 'Mumbai, Maharashtra',
      isActive: true
    });
    console.log('✅ Demo student created: student@divyabharat.in\n');

    // Seed Categories
    console.log('📂 Seeding categories...');
    await Category.insertMany(categories);
    console.log(`✅ ${categories.length} categories seeded\n`);

    // Seed Heritage
    console.log('🏛️  Seeding heritage records...');
    const createdHeritage = await Heritage.insertMany(heritageData);
    console.log(`✅ ${createdHeritage.length} heritage records seeded\n`);

    // Seed States & Union Territories
    console.log('🗺️  Seeding Indian States & Union Territories...');
    const createdStates = await State.insertMany(statesData);
    console.log(`✅ ${createdStates.length} states & union territories seeded\n`);

    // Seed Temples
    console.log('🛕 Seeding sacred temples...');
    const createdTemples = await Temple.insertMany(templesData);
    console.log(`✅ ${createdTemples.length} temples seeded\n`);

    // Seed Modules
    console.log('📚 Seeding learning modules...');
    const createdModules = await Module.insertMany(modulesData);
    console.log(`✅ ${createdModules.length} modules seeded\n`);

    // Seed Quizzes and link to modules
    console.log('📝 Seeding quizzes...');
    quizzesData[0].module = createdModules[0]._id;
    quizzesData[1].module = createdModules[1]._id;
    const createdQuizzes = await Quiz.insertMany(quizzesData);

    // Update modules with quiz references
    await Module.findByIdAndUpdate(createdModules[0]._id, { quiz: createdQuizzes[0]._id });
    await Module.findByIdAndUpdate(createdModules[1]._id, { quiz: createdQuizzes[1]._id });
    console.log(`✅ ${createdQuizzes.length} quizzes seeded\n`);

    console.log('═══════════════════════════════════════════════════');
    console.log('🎉 DivyaBharat Database Seed Complete!');
    console.log('═══════════════════════════════════════════════════');
    console.log('\n📋 Test Accounts:');
    console.log(`   Admin    : ${adminEmail} / ${adminPassword}`);
    console.log('   Teacher  : teacher@divyabharat.in / Teacher@2024');
    console.log('   Student  : student@divyabharat.in / Student@2024');
    console.log('\n📊 Seeded Data:');
    console.log(`   Heritage Records : ${createdHeritage.length}`);
    console.log(`   States & UTs     : ${createdStates.length}`);
    console.log(`   Temples          : ${createdTemples.length}`);
    console.log(`   Categories       : ${categories.length}`);
    console.log(`   Learning Modules : ${createdModules.length}`);
    console.log(`   Quizzes          : ${createdQuizzes.length}`);
    console.log(`   Quiz Questions   : ${quizzesData.reduce((acc, q) => acc + q.questions.length, 0)}`);
    console.log('═══════════════════════════════════════════════════\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();
