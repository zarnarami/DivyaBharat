// src/components/AndhraPradeshTemples.js
// Dedicated Andhra Pradesh Temple Heritage Module — 15 Sacred Sanctuaries, 6 Circuits, 7 Detailed Information Sections
import React, { useState, useEffect, useMemo, useRef } from 'react';
import api from '../services/api';
import './AndhraPradeshTemples.css';
import {
  FaPray,
  FaLandmark,
  FaMapMarkerAlt,
  FaCompass,
  FaStar,
  FaSearch,
  FaFilter,
  FaTimes,
  FaExternalLinkAlt,
  FaDirections,
  FaClock,
  FaCalendarAlt,
  FaSun,
  FaMoon,
  FaCar,
  FaTrain,
  FaPlane,
  FaBus,
  FaBed,
  FaTshirt,
  FaCamera,
  FaWheelchair,
  FaInfoCircle,
  FaEye,
  FaRoute,
  FaCheckCircle
} from 'react-icons/fa';

// 6 Predefined Andhra Pradesh Pilgrimage Circuits with Curated Metadata
const AP_PILGRIMAGE_CIRCUITS = [
  {
    id: 'tirupati-circuit',
    name: 'Tirupati Spiritual Circuit',
    icon: '🛕',
    tag: 'Vaishnava Divya Yatra',
    color: '#b45309',
    temples: [
      'Sri Venkateswara Swamy Temple (Tirumala)',
      'Sri Govindaraja Swamy Temple',
      'Sri Padmavathi Ammavari Temple'
    ],
    primaryTempleKey: 'Sri Venkateswara Swamy Temple',
    summary: 'Venerate Lord Venkateswara atop the holy Seshachalam hills, followed by Govindaraja Swamy in Tirupati and Goddess Padmavathi at Tiruchanur.',
    itinerary: '2–3 Days: Day 1: Alipiri Footpath or Ghat Road ascent to Tirumala hilltop sanctum & Suprabhata Darshan. Day 2: Sri Govindaraja Swamy Temple and Kapila Teertham in Tirupati. Day 3: Goddess Padmavathi Ammavari Temple at Tiruchanur.'
  },
  {
    id: 'jyotirlinga-circuit',
    name: 'Jyotirlinga Circuit',
    icon: '🔱',
    tag: 'Maha Shiva & Shakti Sangam',
    color: '#047857',
    temples: ['Sri Bhramaramba Mallikarjuna Swamy Temple (Srisailam)'],
    primaryTempleKey: 'Sri Bhramaramba Mallikarjuna Swamy Temple',
    summary: 'A rare celestial confluence of one of the 12 sacred Jyotirlingas and one of the 18 Ashtadasa Maha Shakti Peethas nestled in the Nallamala forest.',
    itinerary: '2 Days: Day 1: Scenic journey through Nallamala Tiger Reserve, holy bath at Krishna River (Patalaganga), Sparsha Darshan and Abhishekam to Mallikarjuna Lingam. Day 2: Darshan of Goddess Bhramaramba Devi, Sakshi Ganapathi, and Shikhareswaram.'
  },
  {
    id: 'narasimha-circuit',
    name: 'Narasimha Circuit',
    icon: '🦁',
    tag: 'Nava Narasimha Teertham',
    color: '#c2410c',
    temples: [
      'Sri Ahobilam Narasimha Swamy Temple',
      'Sri Varaha Lakshmi Narasimha Swamy Temple (Simhachalam)',
      'Sri Panakala Lakshmi Narasimha Swamy Temple (Mangalagiri)'
    ],
    primaryTempleKey: 'Sri Ahobilam Narasimha Swamy Temple',
    summary: 'Sacred journey across the legendary Nava Narasimha forest shrines of Ahobilam, the hill redoubt of Simhachalam, and the ancient hill sanctum of Mangalagiri.',
    itinerary: '3–4 Days: Day 1–2: Trekking to Upper & Lower Ahobilam visiting the Nine Narasimha sanctums and Ugra Stambham. Day 3: Panaka Pooja and darshan of Swayambhu Narasimha at Mangalagiri. Day 4: Chandanotsavam darshan at Simhachalam hill shrine.'
  },
  {
    id: 'shiva-circuit',
    name: 'Shiva Temple Circuit',
    icon: '🕉️',
    tag: 'Pancharama & Vayu Linga Kshetra',
    color: '#1d4ed8',
    temples: [
      'Sri Bhramaramba Mallikarjuna Swamy Temple',
      'Sri Kalahasteeswara Temple',
      'Sri Mahanandiswara Swamy Temple',
      'Draksharamam Bhimeswara Temple',
      'Lepakshi Veerabhadra Temple',
      'Yaganti Temple'
    ],
    primaryTempleKey: 'Sri Kalahasteeswara Temple',
    summary: 'Comprehensive Shaivite pilgrimage honoring the Vayu Linga of Srikalahasti, 14-ft Draksharamam Pancharama, growing Nandi of Yaganti, crystal Pushkarini of Mahanandi, and Vijayanagara marvel of Lepakshi.',
    itinerary: '5–6 Days: Day 1: Rahu-Ketu Kshetra at Srikalahasti. Day 2: Srisailam Jyotirlinga. Day 3: Crystal water Pushkarini at Mahanandi & Pushkarini caves at Yaganti. Day 4: Draksharamam Bhimeswara Pancharama. Day 5: Monolithic Nandi & Hanging Pillar at Lepakshi.'
  },
  {
    id: 'ganesha-circuit',
    name: 'Ganesha Circuit',
    icon: '🐘',
    tag: 'Swayambhu Vighnaharta Kshetra',
    color: '#e11d48',
    temples: ['Sri Varasiddhi Vinayaka Temple (Kanipakam)'],
    primaryTempleKey: 'Sri Varasiddhi Vinayaka Temple',
    summary: 'Venerate the sacred self-manifested Vinayaka growing perennially inside a natural well of holy spring water.',
    itinerary: '1 Day: Holy Snanam at Bahuda River, special Abhishekam to Swayambhu Varasiddhi Vinayaka inside the natural water sanctum, followed by evening Brahmotsavam golden chariot seva.'
  },
  {
    id: 'devi-shakti-circuit',
    name: 'Devi Shakti Circuit',
    icon: '🌺',
    tag: 'Ashtadasa Maha Shakti Peetha',
    color: '#9333ea',
    temples: [
      'Sri Kanaka Durga Temple (Vijayawada)',
      'Sri Bhramaramba Devi Temple (Srisailam)'
    ],
    primaryTempleKey: 'Sri Kanaka Durga Temple',
    summary: 'Pay homage to Goddess Bhramaramba (the sacred Griva Shakti Peetha) and Goddess Kanaka Durga presiding atop the holy Indrakeeladri cliff beside the Krishna River.',
    itinerary: '2–3 Days: Day 1: Indrakeeladri Ghat ascent & Kumkumarchana to Goddess Kanaka Durga at Vijayawada. Day 2: Scenic ghat drive to Srisailam for Bhramaramba Devi Maha Shakti Peetham special evening Kumkuma Seva.'
  }
];

export default function AndhraPradeshTemples({ stateData, culturalTheme }) {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedDeity, setSelectedDeity] = useState('All');
  const [selectedFestival, setSelectedFestival] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCircuit, setSelectedCircuit] = useState('All');
  const [featuredOnly, setFeaturedOnly] = useState(false);

  // Modal State
  const [selectedTemple, setSelectedTemple] = useState(null);
  const [activeModalSection, setActiveModalSection] = useState('section-a');
  const [enlargedPhoto, setEnlargedPhoto] = useState(null);

  const templesGridRef = useRef(null);

  // Fetch 15 AP Temples from MongoDB
  useEffect(() => {
    let isMounted = true;
    const fetchApTemples = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await api.get('/temples?state=Andhra%20Pradesh&limit=50');
        if (isMounted) {
          if (data && data.success && Array.isArray(data.temples)) {
            setTemples(data.temples);
          } else {
            setError('Could not retrieve Andhra Pradesh temples from database.');
          }
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to connect to database for temple records.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchApTemples();

    return () => {
      isMounted = false;
    };
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedTemple || enlargedPhoto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedTemple, enlargedPhoto]);

  // Handle ESC key for modal closing
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (enlargedPhoto) {
          setEnlargedPhoto(null);
        } else if (selectedTemple) {
          setSelectedTemple(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedTemple, enlargedPhoto]);

  // Extract unique filter options from loaded temples
  const filterOptions = useMemo(() => {
    const districts = new Set();
    const deities = new Set();
    const festivals = new Set();
    const categories = new Set();

    temples.forEach((t) => {
      if (t.district) districts.add(t.district);
      if (t.category) categories.add(t.category);
      if (t.deity) {
        // Group deities cleanly
        if (t.deity.toLowerCase().includes('venkateswara') || t.deity.toLowerCase().includes('balaji')) {
          deities.add('Lord Venkateswara / Vishnu');
        } else if (t.deity.toLowerCase().includes('narasimha')) {
          deities.add('Lord Narasimha');
        } else if (t.deity.toLowerCase().includes('shiva') || t.deity.toLowerCase().includes('mallikarjuna') || t.deity.toLowerCase().includes('kalahasteeswara') || t.deity.toLowerCase().includes('veerabhadra') || t.deity.toLowerCase().includes('bhimeswara') || t.deity.toLowerCase().includes('mahanandiswara')) {
          deities.add('Lord Shiva / Rudra');
        } else if (t.deity.toLowerCase().includes('durga') || t.deity.toLowerCase().includes('bhramaramba') || t.deity.toLowerCase().includes('shakti') || t.deity.toLowerCase().includes('devi')) {
          deities.add('Goddess Durga / Shakti');
        } else if (t.deity.toLowerCase().includes('vinayaka') || t.deity.toLowerCase().includes('ganesha')) {
          deities.add('Lord Ganesha');
        } else if (t.deity.toLowerCase().includes('surya') || t.deity.toLowerCase().includes('sun')) {
          deities.add('Lord Surya (Sun God)');
        } else {
          deities.add('Lord Satyanarayana Swamy');
        }
      }
      if (Array.isArray(t.festivalsList)) {
        t.festivalsList.forEach((f) => {
          if (f.name) festivals.add(f.name);
        });
      }
    });

    return {
      districts: Array.from(districts).sort(),
      deities: Array.from(deities).sort(),
      festivals: Array.from(festivals).sort(),
      categories: Array.from(categories).sort()
    };
  }, [temples]);

  // Filtered Temples List
  const filteredTemples = useMemo(() => {
    return temples.filter((t) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = t.name?.toLowerCase().includes(q);
        const matchesAlt = Array.isArray(t.altNames) && t.altNames.some((a) => a.toLowerCase().includes(q));
        const matchesCity = t.city?.toLowerCase().includes(q);
        const matchesDistrict = t.district?.toLowerCase().includes(q);
        const matchesDeity = t.deity?.toLowerCase().includes(q);
        const matchesDesc = t.description?.toLowerCase().includes(q);
        if (!matchesName && !matchesAlt && !matchesCity && !matchesDistrict && !matchesDeity && !matchesDesc) {
          return false;
        }
      }

      // District filter
      if (selectedDistrict !== 'All' && t.district !== selectedDistrict) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && t.category !== selectedCategory) {
        return false;
      }

      // Deity filter
      if (selectedDeity !== 'All') {
        const dLow = (t.deity || '').toLowerCase();
        if (selectedDeity === 'Lord Venkateswara / Vishnu' && !dLow.includes('venkateswara') && !dLow.includes('balaji') && !dLow.includes('vishnu') && !dLow.includes('tirumala')) return false;
        if (selectedDeity === 'Lord Narasimha' && !dLow.includes('narasimha')) return false;
        if (selectedDeity === 'Lord Shiva / Rudra' && !dLow.includes('shiva') && !dLow.includes('mallikarjuna') && !dLow.includes('kalahasteeswara') && !dLow.includes('veerabhadra') && !dLow.includes('bhimeswara') && !dLow.includes('mahanandiswara')) return false;
        if (selectedDeity === 'Goddess Durga / Shakti' && !dLow.includes('durga') && !dLow.includes('bhramaramba') && !dLow.includes('shakti') && !dLow.includes('devi')) return false;
        if (selectedDeity === 'Lord Ganesha' && !dLow.includes('vinayaka') && !dLow.includes('ganesha')) return false;
        if (selectedDeity === 'Lord Surya (Sun God)' && !dLow.includes('surya') && !dLow.includes('sun')) return false;
        if (selectedDeity === 'Lord Satyanarayana Swamy' && !dLow.includes('satyanarayana')) return false;
      }

      // Festival filter
      if (selectedFestival !== 'All') {
        const hasFest = Array.isArray(t.festivalsList) && t.festivalsList.some((f) => f.name === selectedFestival);
        if (!hasFest) return false;
      }

      // Circuit filter
      if (selectedCircuit !== 'All') {
        const inCircuits = Array.isArray(t.pilgrimageCircuits) && t.pilgrimageCircuits.includes(selectedCircuit);
        if (!inCircuits) return false;
      }

      // Featured filter
      if (featuredOnly && !t.isFeatured) {
        return false;
      }

      return true;
    });
  }, [temples, searchQuery, selectedDistrict, selectedDeity, selectedFestival, selectedCategory, selectedCircuit, featuredOnly]);

  // Handle Circuit Card Click
  const handleCircuitSelect = (circuitName) => {
    if (selectedCircuit === circuitName) {
      setSelectedCircuit('All');
    } else {
      setSelectedCircuit(circuitName);
      if (templesGridRef.current) {
        templesGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDistrict('All');
    setSelectedDeity('All');
    setSelectedFestival('All');
    setSelectedCategory('All');
    setSelectedCircuit('All');
    setFeaturedOnly(false);
  };

  // Open modal with temple
  const handleOpenDetails = (temple) => {
    setSelectedTemple(temple);
    setActiveModalSection('section-a');
  };

  // Open external Google Maps
  const handleOpenGoogleMaps = (temple) => {
    if (temple.mapsUrl) {
      window.open(temple.mapsUrl, '_blank', 'noopener,noreferrer');
    } else if (temple.coordinates?.lat && temple.coordinates?.lng) {
      window.open(`https://www.google.com/maps?q=${temple.coordinates.lat},${temple.coordinates.lng}`, '_blank', 'noopener,noreferrer');
    } else {
      window.open(`https://www.google.com/maps/search/${encodeURIComponent(temple.name + ' ' + (temple.city || temple.district) + ' Andhra Pradesh')}`, '_blank', 'noopener,noreferrer');
    }
  };

  // Open Google Maps Directions
  const handleGetDirections = (temple) => {
    if (temple.coordinates?.lat && temple.coordinates?.lng) {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${temple.coordinates.lat},${temple.coordinates.lng}`, '_blank', 'noopener,noreferrer');
    } else {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(temple.name + ' ' + (temple.city || temple.district) + ' Andhra Pradesh')}`, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <div className="ap-loading-wrap">
        <div className="ap-loading-spinner" />
        <p className="ap-loading-text">Loading Sacred Andhra Pradesh Temples from MongoDB Archive...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ap-error-banner">
        <FaInfoCircle size={20} color="#b45309" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="ap-heritage-root">
      {/* SECTION 1: HEADER & DIVINE OVERVIEW BANNER */}
      <div className="ap-section-header-banner">
        <div className="ap-header-eyebrow">
          <span className="ap-diya-badge">🪔</span>
          <span>SRI ANDHRA PRADESH SACRED DEVASTHANAM ARCHIVE</span>
          <span className="ap-diya-badge">🪔</span>
        </div>
        <h2 className="ap-header-title">15 Revered Temples of Andhra Pradesh</h2>
        <p className="ap-header-subtitle">
          From the celestial heights of Kaliyuga Vaikuntham at Tirumala to the sacred Nallamala forest Jyotirlinga of Srisailam, explore the divine shrines, eternal rituals, and majestic Dravidian stonecraft permanently preserved in DivyaBharat.
        </p>

        <div className="ap-stats-ribbon">
          <div className="ap-stat-pill">
            <span className="ap-stat-num">{temples.length}</span>
            <span className="ap-stat-lbl">Permanent Temples</span>
          </div>
          <div className="ap-stat-pill">
            <span className="ap-stat-num">6</span>
            <span className="ap-stat-lbl">Pilgrimage Circuits</span>
          </div>
          <div className="ap-stat-pill">
            <span className="ap-stat-num">100%</span>
            <span className="ap-stat-lbl">Verified Coordinates & Maps</span>
          </div>
          <div className="ap-stat-pill">
            <span className="ap-stat-num">7</span>
            <span className="ap-stat-lbl">Detailed Info Sections</span>
          </div>
        </div>
      </div>

      {/* SECTION 2: 6 PREDEFINED PILGRIMAGE CIRCUITS */}
      <div className="ap-circuits-section">
        <div className="ap-circuit-title-row">
          <div className="ap-circuit-heading">
            <span className="ap-sub-pill">
              <FaRoute size={12} /> Sacred Teertha Yatra
            </span>
            <h3>Andhra Pradesh Pilgrimage Circuits</h3>
            <p>Select any circuit to explore its sacred route, suggested itinerary, and filter the temples below.</p>
          </div>
          {selectedCircuit !== 'All' && (
            <button className="ap-circuit-clear-btn" onClick={() => setSelectedCircuit('All')}>
              <FaTimes size={11} /> Clear Circuit Filter ({selectedCircuit})
            </button>
          )}
        </div>

        <div className="ap-circuits-grid">
          {AP_PILGRIMAGE_CIRCUITS.map((circuit) => {
            const isSelected = selectedCircuit === circuit.name;
            return (
              <div
                key={circuit.id}
                className={`ap-circuit-card ${isSelected ? 'selected' : ''}`}
                style={{ '--circuit-color': circuit.color }}
              >
                <div className="ap-circuit-top">
                  <div className="ap-circuit-icon-box">{circuit.icon}</div>
                  <div className="ap-circuit-tag-badge">{circuit.tag}</div>
                </div>

                <h4 className="ap-circuit-name">{circuit.name}</h4>
                <p className="ap-circuit-summary">{circuit.summary}</p>

                <div className="ap-circuit-temple-list">
                  <span className="ap-circuit-temple-hdr">Sanctuaries:</span>
                  <ul>
                    {circuit.temples.map((tn, idx) => (
                      <li key={idx}>• {tn}</li>
                    ))}
                  </ul>
                </div>

                <div className="ap-circuit-itinerary-box">
                  <strong>🧭 Suggested Route:</strong> {circuit.itinerary}
                </div>

                <button
                  type="button"
                  className={`ap-circuit-action-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => handleCircuitSelect(circuit.name)}
                >
                  {isSelected ? (
                    <>
                      <FaCheckCircle size={12} /> Viewing Circuit Temples
                    </>
                  ) : (
                    <>
                      <FaCompass size={12} /> Explore {circuit.name} →
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: SEARCH & DISCOVERY BAR */}
      <div className="ap-discovery-filter-section" ref={templesGridRef}>
        <div className="ap-filter-bar-header">
          <div className="ap-filter-title">
            <FaFilter size={14} color="#b45309" />
            <span>Search & Filter Andhra Pradesh Temples</span>
          </div>
          <div className="ap-filter-count-badge">
            Showing <strong>{filteredTemples.length}</strong> of <strong>{temples.length}</strong> Sacred Sanctuaries
          </div>
        </div>

        <div className="ap-filter-controls-grid">
          {/* Search Box */}
          <div className="ap-filter-group ap-search-group">
            <label htmlFor="ap-search-input">Search by Name or Location</label>
            <div className="ap-search-input-wrap">
              <FaSearch className="ap-search-icon" size={13} />
              <input
                id="ap-search-input"
                type="text"
                value={searchQuery}
                placeholder="e.g. Venkateswara, Srisailam, Lepakshi, Ahobilam..."
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="ap-search-clear"
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                >
                  <FaTimes size={11} />
                </button>
              )}
            </div>
          </div>

          {/* District Filter */}
          <div className="ap-filter-group">
            <label htmlFor="ap-district-select">City / District</label>
            <select
              id="ap-district-select"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              <option value="All">All Districts ({temples.length})</option>
              {filterOptions.districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Deity Filter */}
          <div className="ap-filter-group">
            <label htmlFor="ap-deity-select">Presiding Deity</label>
            <select
              id="ap-deity-select"
              value={selectedDeity}
              onChange={(e) => setSelectedDeity(e.target.value)}
            >
              <option value="All">All Deities</option>
              {filterOptions.deities.map((deity) => (
                <option key={deity} value={deity}>
                  {deity}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="ap-filter-group">
            <label htmlFor="ap-cat-select">Temple Category</label>
            <select
              id="ap-cat-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {filterOptions.categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Circuit Filter */}
          <div className="ap-filter-group">
            <label htmlFor="ap-circuit-select">Pilgrimage Circuit</label>
            <select
              id="ap-circuit-select"
              value={selectedCircuit}
              onChange={(e) => setSelectedCircuit(e.target.value)}
            >
              <option value="All">All Circuits</option>
              {AP_PILGRIMAGE_CIRCUITS.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Festival Filter */}
          <div className="ap-filter-group">
            <label htmlFor="ap-fest-select">Sacred Festival</label>
            <select
              id="ap-fest-select"
              value={selectedFestival}
              onChange={(e) => setSelectedFestival(e.target.value)}
            >
              <option value="All">All Festivals</option>
              {filterOptions.festivals.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Action Bar */}
        <div className="ap-filter-actions-bar">
          <label className="ap-featured-toggle">
            <input
              type="checkbox"
              checked={featuredOnly}
              onChange={(e) => setFeaturedOnly(e.target.checked)}
            />
            <span className="ap-featured-box">
              <FaStar size={11} color="#f59e0b" /> Show Featured Temples Only
            </span>
          </label>

          {(searchQuery ||
            selectedDistrict !== 'All' ||
            selectedDeity !== 'All' ||
            selectedCategory !== 'All' ||
            selectedCircuit !== 'All' ||
            selectedFestival !== 'All' ||
            featuredOnly) && (
            <button type="button" className="ap-reset-filters-btn" onClick={handleResetFilters}>
              <FaTimes size={12} /> Reset All Filters
            </button>
          )}
        </div>
      </div>

      {/* SECTION 4: 15 TEMPLE CARDS GRID */}
      {filteredTemples.length === 0 ? (
        <div className="ap-empty-temples">
          <span className="ap-empty-icon">🛕</span>
          <h3>No Temples Found</h3>
          <p>No sacred Andhra Pradesh temples match your current search and filter selections.</p>
          <button type="button" className="ap-reset-filters-btn-empty" onClick={handleResetFilters}>
            Show All 15 Andhra Pradesh Temples
          </button>
        </div>
      ) : (
        <div className="ap-temples-card-grid">
          {filteredTemples.map((temple, idx) => (
            <div key={temple._id || idx} className="ap-temple-card">
              {/* Card Image Banner */}
              <div className="ap-card-img-wrap">
                <img
                  src={temple.image || (temple.images && temple.images[0]) || 'https://images.unsplash.com/photo-1590076212457-3a1315b497cb?auto=format&fit=crop&w=800&q=80'}
                  alt={temple.name}
                  className="ap-card-img"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1590076212457-3a1315b497cb?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="ap-card-img-gradient" />

                <div className="ap-card-top-badges">
                  <span className="ap-card-cat-badge">{temple.category || 'Ancient Temple'}</span>
                  {temple.isFeatured && (
                    <span className="ap-card-featured-badge">
                      <FaStar size={10} /> Featured
                    </span>
                  )}
                </div>

                <div className="ap-card-loc-pill">
                  <FaMapMarkerAlt size={10} /> {temple.city ? `${temple.city}, ` : ''}{temple.district}
                </div>
              </div>

              {/* Card Body */}
              <div className="ap-card-body">
                <h3 className="ap-card-title">{temple.name}</h3>

                {Array.isArray(temple.altNames) && temple.altNames.length > 0 && (
                  <p className="ap-card-alt-names">
                    <em>Also known as:</em> {temple.altNames.slice(0, 2).join(' • ')}
                  </p>
                )}

                <div className="ap-card-deity-row">
                  <span className="ap-deity-icon">🔱</span>
                  <div className="ap-deity-info">
                    <span className="ap-deity-lbl">Presiding Deity</span>
                    <strong className="ap-deity-val">{temple.deity}</strong>
                  </div>
                </div>

                <p className="ap-card-desc">
                  {temple.description || temple.significance || temple.history}
                </p>

                {/* Quick Info Tags */}
                <div className="ap-card-spec-tags">
                  <div className="ap-spec-pill" title="Darshan Timings">
                    <FaClock size={11} color="#b45309" />
                    <span>{temple.timings || '06:00 AM – 08:00 PM'}</span>
                  </div>
                  <div className="ap-spec-pill" title="Architectural Style">
                    <FaLandmark size={11} color="#b45309" />
                    <span>{temple.architecture?.split('featuring')[0]?.trim() || 'Dravidian Architecture'}</span>
                  </div>
                </div>

                {/* Pilgrimage Circuits Tags */}
                {Array.isArray(temple.pilgrimageCircuits) && temple.pilgrimageCircuits.length > 0 && (
                  <div className="ap-card-circuits-row">
                    {temple.pilgrimageCircuits.map((c, cIdx) => (
                      <span key={cIdx} className="ap-circuit-pill">
                        <FaRoute size={9} /> {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Action Footer */}
              <div className="ap-card-footer">
                <button
                  type="button"
                  className="ap-view-details-btn"
                  onClick={() => handleOpenDetails(temple)}
                >
                  <FaPray size={13} /> View Complete Temple Dossier
                </button>

                <div className="ap-card-quick-actions">
                  <button
                    type="button"
                    className="ap-quick-map-btn"
                    title="View on Google Maps"
                    onClick={() => handleOpenGoogleMaps(temple)}
                  >
                    <FaMapMarkerAlt size={12} />
                  </button>
                  <button
                    type="button"
                    className="ap-quick-dir-btn"
                    title="Get GPS Directions"
                    onClick={() => handleGetDirections(temple)}
                  >
                    <FaDirections size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SECTION 5: COMPLETE TEMPLE INFORMATION MODAL (ALL 7 SECTIONS) */}
      {selectedTemple && (
        <div
          className="ap-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedTemple(null);
          }}
        >
          <div className="ap-modal-container" role="dialog" aria-modal="true">
            {/* Modal Top Ribbon Header */}
            <div className="ap-modal-header">
              <div className="ap-modal-header-text">
                <div className="ap-modal-eyebrow">
                  <span className="ap-modal-badge">{selectedTemple.category || 'Sacred Temple'}</span>
                  <span className="ap-modal-state-badge">Andhra Pradesh</span>
                  {selectedTemple.district && (
                    <span className="ap-modal-loc-badge">
                      <FaMapMarkerAlt size={10} /> {selectedTemple.city ? `${selectedTemple.city}, ` : ''}{selectedTemple.district}
                    </span>
                  )}
                </div>
                <h2 className="ap-modal-title">{selectedTemple.name}</h2>
                {Array.isArray(selectedTemple.altNames) && selectedTemple.altNames.length > 0 && (
                  <p className="ap-modal-alt-names">
                    <em>Alternative Names:</em> {selectedTemple.altNames.join(' • ')}
                  </p>
                )}
              </div>

              <button
                type="button"
                className="ap-modal-close-btn"
                onClick={() => setSelectedTemple(null)}
                aria-label="Close modal"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* Modal Quick Meta Bar */}
            <div className="ap-modal-quick-meta">
              <div className="ap-meta-chip">
                <span className="ap-chip-icon">🔱</span>
                <div>
                  <span className="ap-chip-lbl">Main Deity</span>
                  <strong>{selectedTemple.deity}</strong>
                </div>
              </div>
              <div className="ap-meta-chip">
                <span className="ap-chip-icon">🏛️</span>
                <div>
                  <span className="ap-chip-lbl">Architecture</span>
                  <strong>{selectedTemple.architecture?.split('featuring')[0]?.trim() || 'Dravidian Style'}</strong>
                </div>
              </div>
              <div className="ap-meta-chip">
                <span className="ap-chip-icon">🕒</span>
                <div>
                  <span className="ap-chip-lbl">Daily Darshan</span>
                  <strong>{selectedTemple.timings || '06:00 AM – 08:00 PM'}</strong>
                </div>
              </div>
              <div className="ap-meta-chip">
                <span className="ap-chip-icon">🗺️</span>
                <div>
                  <span className="ap-chip-lbl">GPS Coordinates</span>
                  <strong>
                    {selectedTemple.coordinates?.lat ? `${selectedTemple.coordinates.lat}° N, ${selectedTemple.coordinates.lng}° E` : 'Verified Pin'}
                  </strong>
                </div>
              </div>
            </div>

            {/* Modal Navigation Tabs (Sections A through G) */}
            <div className="ap-modal-nav-tabs">
              <button
                type="button"
                className={`ap-nav-tab ${activeModalSection === 'section-a' ? 'active' : ''}`}
                onClick={() => setActiveModalSection('section-a')}
              >
                <span>A. Temple Info</span>
              </button>
              <button
                type="button"
                className={`ap-nav-tab ${activeModalSection === 'section-b' ? 'active' : ''}`}
                onClick={() => setActiveModalSection('section-b')}
              >
                <span>B. Deity & Lore</span>
              </button>
              <button
                type="button"
                className={`ap-nav-tab ${activeModalSection === 'section-c' ? 'active' : ''}`}
                onClick={() => setActiveModalSection('section-c')}
              >
                <span>C. Daily Rituals</span>
              </button>
              <button
                type="button"
                className={`ap-nav-tab ${activeModalSection === 'section-d' ? 'active' : ''}`}
                onClick={() => setActiveModalSection('section-d')}
              >
                <span>D. Pilgrimage Info</span>
              </button>
              <button
                type="button"
                className={`ap-nav-tab ${activeModalSection === 'section-e' ? 'active' : ''}`}
                onClick={() => setActiveModalSection('section-e')}
              >
                <span>E. Facilities & Travel</span>
              </button>
              <button
                type="button"
                className={`ap-nav-tab ${activeModalSection === 'section-f' ? 'active' : ''}`}
                onClick={() => setActiveModalSection('section-f')}
              >
                <span>F. Gallery ({selectedTemple.gallery?.length || selectedTemple.images?.length || 1})</span>
              </button>
              <button
                type="button"
                className={`ap-nav-tab ${activeModalSection === 'section-g' ? 'active' : ''}`}
                onClick={() => setActiveModalSection('section-g')}
              >
                <span>G. Maps & GPS</span>
              </button>
            </div>

            {/* Modal Body with All 7 Sections */}
            <div className="ap-modal-content-area">
              {/* SECTION A: TEMPLE INFORMATION */}
              {activeModalSection === 'section-a' && (
                <div className="ap-modal-pane">
                  <div className="ap-pane-header">
                    <span className="ap-pane-badge">Section A</span>
                    <h3>Temple Information & Historical Heritage</h3>
                  </div>

                  <div className="ap-info-grid">
                    <div className="ap-info-card">
                      <span className="ap-info-label">Official Name</span>
                      <p className="ap-info-val highlight">{selectedTemple.name}</p>
                    </div>

                    <div className="ap-info-card">
                      <span className="ap-info-label">Category & Classification</span>
                      <p className="ap-info-val">{selectedTemple.category || 'Ancient Hindu Temple'}</p>
                    </div>

                    <div className="ap-info-card full-width">
                      <span className="ap-info-label">Full Location & Sanctum Address</span>
                      <p className="ap-info-val">
                        {selectedTemple.address || selectedTemple.location || `${selectedTemple.city || ''}, ${selectedTemple.district}, Andhra Pradesh - ${selectedTemple.pincode || '517504'}`}
                      </p>
                    </div>

                    <div className="ap-info-card full-width">
                      <span className="ap-info-label">Architectural Style & Grandeur</span>
                      <p className="ap-info-val">{selectedTemple.architecture}</p>
                    </div>

                    <div className="ap-info-card full-width">
                      <span className="ap-info-label">Detailed Historical Background</span>
                      <p className="ap-info-val prose">{selectedTemple.history}</p>
                    </div>

                    <div className="ap-info-card full-width">
                      <span className="ap-info-label">Spiritual Significance & Glory</span>
                      <p className="ap-info-val prose">{selectedTemple.significance}</p>
                    </div>

                    {selectedTemple.constructionPeriod && (
                      <div className="ap-info-card">
                        <span className="ap-info-label">Construction Period</span>
                        <p className="ap-info-val">{selectedTemple.constructionPeriod}</p>
                      </div>
                    )}

                    {Array.isArray(selectedTemple.pilgrimageCircuits) && selectedTemple.pilgrimageCircuits.length > 0 && (
                      <div className="ap-info-card">
                        <span className="ap-info-label">Associated Pilgrimage Circuits</span>
                        <div className="ap-pill-tags-wrap">
                          {selectedTemple.pilgrimageCircuits.map((circ, cIdx) => (
                            <span key={cIdx} className="ap-pill-circuit">
                              <FaRoute size={10} /> {circ}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SECTION B: DEITY INFORMATION */}
              {activeModalSection === 'section-b' && (
                <div className="ap-modal-pane">
                  <div className="ap-pane-header">
                    <span className="ap-pane-badge">Section B</span>
                    <h3>Deity Information, Sacred Mythology & Divine Manifestation</h3>
                  </div>

                  <div className="ap-deity-hero-card">
                    <div className="ap-deity-hero-icon">🔱</div>
                    <div className="ap-deity-hero-content">
                      <span className="ap-deity-hero-label">Principal Presiding Deity</span>
                      <h4 className="ap-deity-hero-name">{selectedTemple.deity}</h4>
                    </div>
                  </div>

                  {Array.isArray(selectedTemple.associatedDeities) && selectedTemple.associatedDeities.length > 0 && (
                    <div className="ap-assoc-deities-card">
                      <span className="ap-info-label">Associated Deities in Sanctum Complex</span>
                      <div className="ap-pill-tags-wrap">
                        {selectedTemple.associatedDeities.map((ad, idx) => (
                          <span key={idx} className="ap-deity-pill">
                            <FaPray size={10} color="#b45309" /> {ad}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="ap-mythology-card">
                    <div className="ap-card-sub-header">
                      <span className="ap-sub-icon">📜</span>
                      <h4>Sacred Puranic Lore & Sthala Puranam</h4>
                    </div>
                    <p className="ap-prose-text">{selectedTemple.mythology || selectedTemple.significance}</p>
                  </div>
                </div>
              )}

              {/* SECTION C: RITUALS & DAILY POOJA SCHEDULE */}
              {activeModalSection === 'section-c' && (
                <div className="ap-modal-pane">
                  <div className="ap-pane-header">
                    <span className="ap-pane-badge">Section C</span>
                    <h3>Rituals, Daily Pooja Timings & Anna Prasadam</h3>
                  </div>

                  {/* Daily Pooja Timeline */}
                  {Array.isArray(selectedTemple.rituals?.daily) && selectedTemple.rituals.daily.length > 0 && (
                    <div className="ap-daily-rituals-card">
                      <div className="ap-card-sub-header">
                        <span className="ap-sub-icon">🪔</span>
                        <h4>Complete Daily Pooja Schedule</h4>
                      </div>
                      <div className="ap-rituals-timeline">
                        {selectedTemple.rituals.daily.map((ritual, idx) => (
                          <div key={idx} className="ap-ritual-item">
                            <div className="ap-ritual-marker">
                              <span className="ap-ritual-num">{idx + 1}</span>
                            </div>
                            <div className="ap-ritual-text">
                              <p>{ritual}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="ap-rituals-meta-grid">
                    <div className="ap-info-card">
                      <div className="ap-card-sub-header">
                        <FaSun size={14} color="#f59e0b" />
                        <span className="ap-info-label">Morning Pooja & Timings</span>
                      </div>
                      <p className="ap-info-val">{selectedTemple.rituals?.morningPooja || 'Morning Suprabhata Seva & Abhishekam'}</p>
                    </div>

                    <div className="ap-info-card">
                      <div className="ap-card-sub-header">
                        <FaMoon size={14} color="#6366f1" />
                        <span className="ap-info-label">Evening Aarti & Darshan</span>
                      </div>
                      <p className="ap-info-val">{selectedTemple.rituals?.eveningAarti || 'Evening Sandhya Aarti & Sayana Seva'}</p>
                    </div>
                  </div>

                  {/* Prasad Information */}
                  {selectedTemple.rituals?.prasadInfo && (
                    <div className="ap-prasad-gold-card">
                      <div className="ap-prasad-header">
                        <span className="ap-prasad-icon">🍲</span>
                        <div>
                          <span className="ap-prasad-badge">Sacred Maha Prasadam</span>
                          <h4>Prasad & Free Annaprasadam Facilities</h4>
                        </div>
                      </div>
                      <p className="ap-prasad-desc">{selectedTemple.rituals.prasadInfo}</p>
                    </div>
                  )}

                  {/* Special Sevas */}
                  {selectedTemple.rituals?.specialPooja && (
                    <div className="ap-special-sevas-card">
                      <div className="ap-card-sub-header">
                        <FaPray size={14} color="#b45309" />
                        <span className="ap-info-label">Special Poojas, Sevas & Abhishekam</span>
                      </div>
                      <p className="ap-info-val prose">{selectedTemple.rituals.specialPooja}</p>
                    </div>
                  )}
                </div>
              )}

              {/* SECTION D: PILGRIMAGE & VISITOR INFORMATION */}
              {activeModalSection === 'section-d' && (
                <div className="ap-modal-pane">
                  <div className="ap-pane-header">
                    <span className="ap-pane-badge">Section D</span>
                    <h3>Pilgrimage Guidelines, Darshan Timings & Dress Code</h3>
                  </div>

                  <div className="ap-darshan-overview-grid">
                    <div className="ap-info-card">
                      <span className="ap-info-label">Overall Darshan Hours</span>
                      <p className="ap-info-val highlight">{selectedTemple.timings || '06:00 AM – 08:00 PM'}</p>
                    </div>

                    <div className="ap-info-card">
                      <span className="ap-info-label">Best Time to Visit</span>
                      <p className="ap-info-val">{selectedTemple.bestTimeToVisit || 'October to March'}</p>
                    </div>

                    <div className="ap-info-card">
                      <span className="ap-info-label">Morning Darshan Slot</span>
                      <p className="ap-info-val">{selectedTemple.darshan?.morningDarshan || '06:00 AM – 12:00 PM'}</p>
                    </div>

                    <div className="ap-info-card">
                      <span className="ap-info-label">Evening Darshan Slot</span>
                      <p className="ap-info-val">{selectedTemple.darshan?.eveningDarshan || '04:00 PM – 08:30 PM'}</p>
                    </div>

                    {selectedTemple.darshan?.afternoonBreak && (
                      <div className="ap-info-card full-width">
                        <span className="ap-info-label">Afternoon Break / Seva Cleaning Hours</span>
                        <p className="ap-info-val">{selectedTemple.darshan.afternoonBreak}</p>
                      </div>
                    )}

                    {selectedTemple.darshan?.specialDarshan && (
                      <div className="ap-info-card full-width">
                        <span className="ap-info-label">Special Entry & Ticket Darshan</span>
                        <p className="ap-info-val">{selectedTemple.darshan.specialDarshan}</p>
                      </div>
                    )}
                  </div>

                  {/* Devotee Guidelines Box */}
                  <div className="ap-guidelines-box">
                    <div className="ap-card-sub-header">
                      <FaInfoCircle size={15} color="#b45309" />
                      <h4>Devotee Guidelines & Temple Protocol</h4>
                    </div>

                    <div className="ap-guideline-rows">
                      <div className="ap-guideline-item">
                        <div className="ap-gl-icon"><FaTshirt size={14} color="#b45309" /></div>
                        <div className="ap-gl-info">
                          <strong>Dress Code:</strong> {selectedTemple.guidelines?.dressCode || 'Traditional attire (Dhoti/Kurta for men, Saree/Churidar for women)'}
                        </div>
                      </div>

                      <div className="ap-guideline-item">
                        <div className="ap-gl-icon"><FaCamera size={14} color="#b45309" /></div>
                        <div className="ap-gl-info">
                          <strong>Photography Guidelines:</strong> {selectedTemple.guidelines?.photography || 'Allowed in outer temple complex; strictly forbidden inside sanctum sanctorum'}
                        </div>
                      </div>

                      <div className="ap-guideline-item">
                        <div className="ap-gl-icon"><FaPray size={14} color="#b45309" /></div>
                        <div className="ap-gl-info">
                          <strong>Footwear Protocol:</strong> {selectedTemple.guidelines?.footwear || 'Must be deposited at dedicated footwear counter before entering holy premises'}
                        </div>
                      </div>

                      <div className="ap-guideline-item">
                        <div className="ap-gl-icon"><FaWheelchair size={14} color="#b45309" /></div>
                        <div className="ap-gl-info">
                          <strong>Accessibility & Amenities:</strong> {selectedTemple.guidelines?.accessibility || 'Wheelchairs, battery-operated cars, and special ramps available for elderly devotees'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Major Festivals Table */}
                  {Array.isArray(selectedTemple.festivalsList) && selectedTemple.festivalsList.length > 0 && (
                    <div className="ap-festivals-table-card">
                      <div className="ap-card-sub-header">
                        <FaCalendarAlt size={14} color="#b45309" />
                        <h4>Annual Festivals & Holy Celebrations</h4>
                      </div>
                      <div className="ap-table-responsive">
                        <table className="ap-fest-table">
                          <thead>
                            <tr>
                              <th>Festival Name</th>
                              <th>Sacred Month</th>
                              <th>Duration</th>
                              <th>Significance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedTemple.festivalsList.map((fest, fIdx) => (
                              <tr key={fIdx}>
                                <td><strong>{fest.name}</strong></td>
                                <td>{fest.month || 'Auspicious Lunar Month'}</td>
                                <td>{fest.duration || 'Annual'}</td>
                                <td>{fest.significance}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SECTION E: NEARBY FACILITIES & TRANSPORT */}
              {activeModalSection === 'section-e' && (
                <div className="ap-modal-pane">
                  <div className="ap-pane-header">
                    <span className="ap-pane-badge">Section E</span>
                    <h3>Nearby Accommodation, Devotee Facilities & Transport Options</h3>
                  </div>

                  <div className="ap-facilities-amenities-row">
                    <div className="ap-facility-amenity-chip">
                      <span className="ap-amenity-icon">🚗</span>
                      <span>Dedicated Parking: <strong>{selectedTemple.facilities?.parking ? 'Available' : 'Nearby'}</strong></span>
                    </div>
                    <div className="ap-facility-amenity-chip">
                      <span className="ap-amenity-icon">💧</span>
                      <span>Purified Drinking Water: <strong>Available</strong></span>
                    </div>
                    <div className="ap-facility-amenity-chip">
                      <span className="ap-amenity-icon">🚻</span>
                      <span>Clean Restrooms: <strong>Available</strong></span>
                    </div>
                    <div className="ap-facility-amenity-chip">
                      <span className="ap-amenity-icon">🏨</span>
                      <span>Pilgrim Rest Rooms: <strong>Available</strong></span>
                    </div>
                  </div>

                  <div className="ap-lodging-grid">
                    <div className="ap-lodging-card">
                      <div className="ap-card-sub-header">
                        <FaBed size={15} color="#b45309" />
                        <h4>Dharamshala & Temple Accommodations</h4>
                      </div>
                      <p className="ap-info-val prose">{selectedTemple.facilities?.dharamshala || 'Devasthanam Choultries, guest houses, and cottages available near the temple complex.'}</p>
                    </div>

                    <div className="ap-lodging-card">
                      <div className="ap-card-sub-header">
                        <FaLandmark size={15} color="#b45309" />
                        <h4>Nearby Hotels & Private Lodging</h4>
                      </div>
                      <p className="ap-info-val prose">{selectedTemple.facilities?.nearbyHotels || 'Budget guest houses and luxury star hotels widely available in the immediate city vicinity.'}</p>
                    </div>
                  </div>

                  {/* Detailed Transport Grid */}
                  <div className="ap-transport-grid">
                    <div className="ap-transport-card">
                      <div className="ap-trans-icon-box"><FaTrain size={18} color="#b45309" /></div>
                      <div className="ap-trans-content">
                        <span className="ap-trans-title">Nearest Railway Station</span>
                        <p className="ap-trans-desc">{selectedTemple.nearbyTransport?.railway || 'Major Railway Junction located nearby with frequent express trains.'}</p>
                      </div>
                    </div>

                    <div className="ap-transport-card">
                      <div className="ap-trans-icon-box"><FaPlane size={18} color="#b45309" /></div>
                      <div className="ap-trans-content">
                        <span className="ap-trans-title">Nearest Airport</span>
                        <p className="ap-trans-desc">{selectedTemple.nearbyTransport?.airport || 'Airport connected with major domestic and international hubs.'}</p>
                      </div>
                    </div>

                    <div className="ap-transport-card">
                      <div className="ap-trans-icon-box"><FaBus size={18} color="#b45309" /></div>
                      <div className="ap-trans-content">
                        <span className="ap-trans-title">Bus Stand & APSRTC Services</span>
                        <p className="ap-trans-desc">{selectedTemple.nearbyTransport?.bus || 'APSRTC buses operate round-the-clock connecting to all major towns.'}</p>
                      </div>
                    </div>

                    <div className="ap-transport-card">
                      <div className="ap-trans-icon-box"><FaCar size={18} color="#b45309" /></div>
                      <div className="ap-trans-content">
                        <span className="ap-trans-title">Local Transport & Cabs</span>
                        <p className="ap-trans-desc">{selectedTemple.nearbyTransport?.local || 'Auto-rickshaws, app cabs, and local tourist taxis available 24/7.'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION F: TEMPLE GALLERY */}
              {activeModalSection === 'section-f' && (
                <div className="ap-modal-pane">
                  <div className="ap-pane-header">
                    <span className="ap-pane-badge">Section F</span>
                    <h3>High-Resolution Temple Photo Gallery</h3>
                  </div>

                  <p className="ap-gallery-sub">Click any photo to enlarge and inspect architectural details, gopurams, and sanctum views.</p>

                  <div className="ap-gallery-grid">
                    {(Array.isArray(selectedTemple.gallery) && selectedTemple.gallery.length > 0
                      ? selectedTemple.gallery
                      : (selectedTemple.images || [selectedTemple.image]).map((imgUrl, i) => ({
                          url: imgUrl,
                          caption: `${selectedTemple.name} Architectural View`,
                          category: 'Sanctum'
                        }))
                    ).map((item, gIdx) => (
                      <div
                        key={gIdx}
                        className="ap-gallery-card"
                        onClick={() => setEnlargedPhoto(item)}
                      >
                        <div className="ap-gal-img-wrap">
                          <img
                            src={item.url || 'https://images.unsplash.com/photo-1590076212457-3a1315b497cb?auto=format&fit=crop&w=800&q=80'}
                            alt={item.caption || selectedTemple.name}
                            className="ap-gal-thumb"
                            loading="lazy"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://images.unsplash.com/photo-1590076212457-3a1315b497cb?auto=format&fit=crop&w=800&q=80';
                            }}
                          />
                          <div className="ap-gal-zoom-overlay">
                            <FaEye size={18} color="#fff" />
                            <span>Enlarge Photo</span>
                          </div>
                          {item.category && <span className="ap-gal-cat-badge">{item.category}</span>}
                        </div>
                        <p className="ap-gal-caption">{item.caption || `${selectedTemple.name} View ${gIdx + 1}`}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION G: GOOGLE MAPS & LOCATION */}
              {activeModalSection === 'section-g' && (
                <div className="ap-modal-pane">
                  <div className="ap-pane-header">
                    <span className="ap-pane-badge">Section G</span>
                    <h3>Google Maps, Exact GPS Coordinates & Directions</h3>
                  </div>

                  <div className="ap-maps-meta-grid">
                    <div className="ap-info-card full-width">
                      <span className="ap-info-label">Sanctum Physical Address</span>
                      <p className="ap-info-val highlight">
                        {selectedTemple.address || selectedTemple.location || `${selectedTemple.city || ''}, ${selectedTemple.district}, Andhra Pradesh`}
                      </p>
                    </div>

                    <div className="ap-info-card">
                      <span className="ap-info-label">Exact Latitude Coordinates</span>
                      <p className="ap-info-val">{selectedTemple.coordinates?.lat ? `${selectedTemple.coordinates.lat}° N` : 'Verified Pin'}</p>
                    </div>

                    <div className="ap-info-card">
                      <span className="ap-info-label">Exact Longitude Coordinates</span>
                      <p className="ap-info-val">{selectedTemple.coordinates?.lng ? `${selectedTemple.coordinates.lng}° E` : 'Verified Pin'}</p>
                    </div>
                  </div>

                  {/* Interactive Buttons */}
                  <div className="ap-map-actions-row">
                    <button
                      type="button"
                      className="ap-map-btn-primary"
                      onClick={() => handleOpenGoogleMaps(selectedTemple)}
                    >
                      <FaExternalLinkAlt size={13} /> View on Google Maps
                    </button>

                    <button
                      type="button"
                      className="ap-map-btn-directions"
                      onClick={() => handleGetDirections(selectedTemple)}
                    >
                      <FaDirections size={14} /> Get GPS Directions
                    </button>
                  </div>

                  {/* Embedded Google Map Iframe */}
                  <div className="ap-embedded-map-wrap">
                    <iframe
                      title={`${selectedTemple.name} Google Map Location`}
                      src={`https://maps.google.com/maps?q=${
                        selectedTemple.coordinates?.lat && selectedTemple.coordinates?.lng
                          ? `${selectedTemple.coordinates.lat},${selectedTemple.coordinates.lng}`
                          : encodeURIComponent(selectedTemple.name + ' ' + (selectedTemple.city || selectedTemple.district) + ' Andhra Pradesh')
                      }&hl=en&z=15&output=embed`}
                      width="100%"
                      height="380"
                      style={{ border: 0, borderRadius: '12px' }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Sticky Bar */}
            <div className="ap-modal-footer">
              <div className="ap-modal-footer-nav">
                <span className="ap-footer-loc-text">
                  <FaMapMarkerAlt size={12} color="#b45309" /> {selectedTemple.name} • {selectedTemple.district}, Andhra Pradesh
                </span>
              </div>

              <div className="ap-modal-footer-btns">
                <button
                  type="button"
                  className="ap-footer-dir-btn"
                  onClick={() => handleGetDirections(selectedTemple)}
                >
                  <FaDirections size={13} /> Get Directions
                </button>
                <button
                  type="button"
                  className="ap-footer-close-btn"
                  onClick={() => setSelectedTemple(null)}
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox / Enlarged Photo Modal */}
      {enlargedPhoto && (
        <div className="ap-lightbox-backdrop" onClick={() => setEnlargedPhoto(null)}>
          <div className="ap-lightbox-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="ap-lightbox-close"
              onClick={() => setEnlargedPhoto(null)}
            >
              <FaTimes size={18} />
            </button>
            <img
              src={enlargedPhoto.url}
              alt={enlargedPhoto.caption}
              className="ap-lightbox-img"
            />
            {enlargedPhoto.caption && <p className="ap-lightbox-caption">{enlargedPhoto.caption}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
