// server/controllers/stateController.js
const State = require('../models/State');
const Heritage = require('../models/Heritage');
const Temple = require('../models/Temple');

// Default initial state list as a safe fallback
const INITIAL_STATES = [
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

// @desc    Get all states (from MongoDB, with graceful fallback)
// @route   GET /api/states
// @access  Public
exports.getStates = async (req, res) => {
  try {
    let states = await State.find({ isActive: true }).sort('name');
    if (!states || states.length === 0) {
      states = INITIAL_STATES;
    }
    res.json({
      success: true,
      count: states.length,
      states
    });
  } catch (error) {
    console.error('Get states error:', error);
    res.json({
      success: true,
      count: INITIAL_STATES.length,
      states: INITIAL_STATES
    });
  }
};

// @desc    Get single state with its heritage & temples
// @route   GET /api/states/:name
// @access  Public
exports.getStateByName = async (req, res) => {
  try {
    const stateName = decodeURIComponent(req.params.name);

    // Look in MongoDB first
    let stateInfo = await State.findOne({
      $or: [
        { name: { $regex: `^${stateName}$`, $options: 'i' } },
        { slug: stateName.toLowerCase() }
      ]
    });

    if (!stateInfo) {
      stateInfo = INITIAL_STATES.find(s =>
        s.name.toLowerCase() === stateName.toLowerCase()
      );
    }

    if (!stateInfo) {
      return res.status(404).json({ success: false, message: 'State not found' });
    }

    // Find all heritage sites associated with this state
    const heritage = await Heritage.find({
      state: { $regex: stateInfo.name, $options: 'i' },
      status: 'approved'
    }).sort('category');

    // Find all temples associated with this state
    const temples = await Temple.find({
      state: { $regex: stateInfo.name, $options: 'i' },
      isActive: true
    }).sort('name');

    const byCategory = {};
    heritage.forEach(item => {
      if (!byCategory[item.category]) byCategory[item.category] = [];
      byCategory[item.category].push(item);
    });

    res.json({
      success: true,
      state: stateInfo,
      heritage,
      temples,
      byCategory
    });
  } catch (error) {
    console.error('Get state by name error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Create / Add a State (Admin)
// @route   POST /api/states
// @access  Private (Admin)
exports.createState = async (req, res) => {
  try {
    const state = await State.create(req.body);
    res.status(201).json({ success: true, state });
  } catch (error) {
    console.error('Create state error:', error);
    res.status(400).json({ success: false, message: error.message || 'Error creating state' });
  }
};

// @desc    Update a State (Admin)
// @route   PUT /api/states/:id
// @access  Private (Admin)
exports.updateState = async (req, res) => {
  try {
    const state = await State.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!state) return res.status(404).json({ success: false, message: 'State not found' });
    res.json({ success: true, state });
  } catch (error) {
    console.error('Update state error:', error);
    res.status(400).json({ success: false, message: error.message || 'Error updating state' });
  }
};

// @desc    Delete / Deactivate a State (Admin)
// @route   DELETE /api/states/:id
// @access  Private (Admin)
exports.deleteState = async (req, res) => {
  try {
    const state = await State.findByIdAndDelete(req.params.id);
    if (!state) return res.status(404).json({ success: false, message: 'State not found' });
    res.json({ success: true, message: 'State removed successfully' });
  } catch (error) {
    console.error('Delete state error:', error);
    res.status(500).json({ success: false, message: 'Error deleting state' });
  }
};
