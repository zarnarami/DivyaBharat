// src/components/ArunachalPradeshTemples.js
// Dedicated Arunachal Pradesh Temple Heritage Module — 12 Sacred Sanctuaries, 5 Circuits, 7 Detailed Information Sections
import React, { useState, useEffect, useMemo, useRef } from 'react';
import api from '../services/api';
import './ArunachalPradeshTemples.css';
import {
  FaPray,
  FaLandmark,
  FaMapMarkerAlt,
  FaStar,
  FaSearch,
  FaTimes,
  FaDirections,
  FaClock,
  FaCalendarAlt,
  FaSun,
  FaMoon,
  FaCar,
  FaTrain,
  FaPlane,
  FaBus,
  FaTshirt,
  FaCamera,
  FaWheelchair,
  FaInfoCircle,
  FaEye,
  FaRoute
} from 'react-icons/fa';

// 5 Predefined Arunachal Pradesh Pilgrimage Circuits with Curated Metadata
const ARUNACHAL_PILGRIMAGE_CIRCUITS = [
  {
    id: 'subansiri-circuit',
    name: 'Subansiri Sacred Shiva Circuit',
    icon: '🔱',
    tag: 'Swayambhu Mahadev Yatra',
    color: '#047857',
    temples: [
      'Shri Siddheshwar Nath Temple',
      'Shivalinga at Kardo Hills',
      'Meghna Cave Temple'
    ],
    primaryTempleKey: 'Shri Siddheshwar Nath Temple',
    summary: 'Sacred Shaivite yatra across the pine valleys of Ziro to the monolithic 25-ft Swayambhu lingam, ending at the 3,000-ft high Meghna mountain cavern above the Subansiri River.',
    itinerary: '3–4 Days: Day 1: Arrive in Ziro valley, visit the towering natural monolithic Shivalinga at Kardo Hills. Day 2: Pratah Jalabhishek at Shri Siddheshwar Nath sanctum and parikrama of the pine groves. Day 3: Scenic mountain drive to Daporijo. Day 4: Ascent of 200 stone steps to Meghna Cave Temple for high-altitude river valley darshan.'
  },
  {
    id: 'siang-shakti-circuit',
    name: 'Siang Shakti & Ancient Tirtha Circuit',
    icon: '🌺',
    tag: 'Maha Shakti & Medieval Heritage',
    color: '#9333ea',
    temples: [
      'Malinithan Temple',
      'Akashiganga Temple',
      'Gomsi Temple Site',
      'Dangoria Baba Mandir'
    ],
    primaryTempleKey: 'Malinithan Temple',
    summary: 'Revere Goddess Malini (Durga) at the 14th-century granitic temple ruins of Likabali, take a sacred dip at the Akashiganga mountain cascade, and explore the ancient brick sanctum of Gomsi.',
    itinerary: '3 Days: Day 1: Explore the carved stone masterpieces of Malinithan and worship at the active Goddess Malini shrine. Day 2: Holy pilgrimage descent into the Akashiganga mountain stream ravine. Day 3: Travel towards Pasighat, explore the 14th-century Gomsi brick temple site and offer prayers at Dangoria Baba Mandir.'
  },
  {
    id: 'lohit-parashuram-circuit',
    name: 'Holy Lohit & Parashuram Circuit',
    icon: '🪓',
    tag: 'Maha Tirtha Snanam',
    color: '#b45309',
    temples: ['Parashuram Kund'],
    primaryTempleKey: 'Parashuram Kund',
    summary: 'Venerate the sacred waters of the Lohit River where Sage Parashuram washed away all matricidal sins, joined by over 100,000 sadhus and pilgrims during the holy Makar Sankranti snanam.',
    itinerary: '2 Days: Day 1: Journey via the Dhola-Sadiya bridge to Wakro through pristine Mishmi hills. Day 2: Dawn holy bath (Snanam) in the crystal turquoise waters of Parashuram Kund, followed by Tarpanam, temple archana, and cliffside Parashuram Mandir darshan.'
  },
  {
    id: 'kameng-circuit',
    name: 'Kameng Valley Himalayan Temple Circuit',
    icon: '🏔️',
    tag: 'Protector Mountain Shrines',
    color: '#1d4ed8',
    temples: [
      'Tenga Valley Shiva Mandir',
      'Hanuman Mandir – Hawa Camp',
      'Bhalukpong Shiva Mandir'
    ],
    primaryTempleKey: 'Tenga Valley Shiva Mandir',
    summary: 'Journey across the scenic Kameng river valley and windy mountain ridges, seeking the divine protection of Lord Shiva and Lord Hanuman along the sacred Himalayan gateway.',
    itinerary: '2 Days: Day 1: Snanam and Jalabhishek at the riverside Bhalukpong Shiva Mandir, followed by blessings at the windy Hawa Camp Hanuman Mandir. Day 2: Mountain drive through Tenga Valley with prayers at Tenga Valley Shiva Mandir beside the gentle river waters.'
  },
  {
    id: 'donyi-polo-circuit',
    name: 'Indigenous Donyi-Polo Spiritual Circuit',
    icon: '☀️',
    tag: 'Sanatana Nature Worship',
    color: '#ea580c',
    temples: ['Central Kargu Gamgi (Donyi Polo Spiritual Sanctum)'],
    primaryTempleKey: 'Central Kargu Gamgi (Donyi Polo Spiritual Sanctum)',
    summary: 'Witness the sacred indigenous nature-worship tradition of Arunachal Pradesh honoring Donyi (the divine Sun of truth) and Polo (the divine Moon of wisdom) in fine bamboo sanctums.',
    itinerary: '1 Day: Visit the Central Kargu Gamgi in Pasighat, attend the Sunday collective prayer service, listen to sacred oral Aabang chants, and discover the indigenous cosmic philosophy of cosmic balance and ecological reverence.'
  }
];

export default function ArunachalPradeshTemples({ stateData, culturalTheme }) {
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

  // Fetch 12 AP Temples from MongoDB
  useEffect(() => {
    let isMounted = true;
    const fetchArunachalTemples = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await api.get('/temples?state=Arunachal%20Pradesh&limit=50');
        if (isMounted) {
          if (data && data.success && Array.isArray(data.temples)) {
            setTemples(data.temples);
          } else {
            setError('Could not retrieve Arunachal Pradesh temples from database.');
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

    fetchArunachalTemples();

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

  // Extract unique filter dropdown values dynamically
  const districts = useMemo(() => {
    const set = new Set();
    temples.forEach((t) => {
      if (t.district) set.add(t.district.trim());
    });
    return ['All', ...Array.from(set).sort()];
  }, [temples]);

  const deities = useMemo(() => {
    const set = new Set();
    temples.forEach((t) => {
      if (t.deity) {
        if (t.deity.toLowerCase().includes('shiva') || t.deity.toLowerCase().includes('siddheshwar')) {
          set.add('Lord Shiva / Mahadev');
        } else if (t.deity.toLowerCase().includes('durga') || t.deity.toLowerCase().includes('malini') || t.deity.toLowerCase().includes('sati')) {
          set.add('Mother Goddess / Shakti');
        } else if (t.deity.toLowerCase().includes('parashuram') || t.deity.toLowerCase().includes('vishnu')) {
          set.add('Lord Parashuram / Vishnu');
        } else if (t.deity.toLowerCase().includes('hanuman')) {
          set.add('Lord Hanuman');
        } else if (t.deity.toLowerCase().includes('donyi')) {
          set.add('Donyi-Polo (Cosmic Divine)');
        } else {
          set.add(t.deity.split('(')[0].trim());
        }
      }
    });
    return ['All', ...Array.from(set).sort()];
  }, [temples]);

  const categories = useMemo(() => {
    const set = new Set();
    temples.forEach((t) => {
      if (t.category) set.add(t.category.trim());
    });
    return ['All', ...Array.from(set).sort()];
  }, [temples]);

  const festivals = useMemo(() => {
    const set = new Set();
    temples.forEach((t) => {
      if (Array.isArray(t.festivalsList)) {
        t.festivalsList.forEach((f) => {
          if (f.name) set.add(f.name.split('(')[0].trim());
        });
      }
    });
    return ['All', ...Array.from(set).sort()];
  }, [temples]);

  // Filtered Temples
  const filteredTemples = useMemo(() => {
    return temples.filter((t) => {
      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = t.name?.toLowerCase().includes(q);
        const matchesAlt = Array.isArray(t.altNames) && t.altNames.some((a) => a.toLowerCase().includes(q));
        const matchesDeity = t.deity?.toLowerCase().includes(q);
        const matchesLoc = t.location?.toLowerCase().includes(q) || t.city?.toLowerCase().includes(q) || t.district?.toLowerCase().includes(q);
        const matchesDesc = t.description?.toLowerCase().includes(q);
        if (!matchesName && !matchesAlt && !matchesDeity && !matchesLoc && !matchesDesc) {
          return false;
        }
      }

      // District
      if (selectedDistrict !== 'All' && t.district !== selectedDistrict) {
        return false;
      }

      // Deity Category Filter
      if (selectedDeity !== 'All') {
        const deityLower = t.deity?.toLowerCase() || '';
        if (selectedDeity === 'Lord Shiva / Mahadev' && !deityLower.includes('shiva') && !deityLower.includes('siddheshwar') && !deityLower.includes('lakulisha')) return false;
        if (selectedDeity === 'Mother Goddess / Shakti' && !deityLower.includes('durga') && !deityLower.includes('malini') && !deityLower.includes('sati') && !deityLower.includes('shakti')) return false;
        if (selectedDeity === 'Lord Parashuram / Vishnu' && !deityLower.includes('parashuram') && !deityLower.includes('vishnu')) return false;
        if (selectedDeity === 'Lord Hanuman' && !deityLower.includes('hanuman')) return false;
        if (selectedDeity === 'Donyi-Polo (Cosmic Divine)' && !deityLower.includes('donyi')) return false;
      }

      // Category
      if (selectedCategory !== 'All' && t.category !== selectedCategory) {
        return false;
      }

      // Festival
      if (selectedFestival !== 'All') {
        const hasFest = Array.isArray(t.festivalsList) && t.festivalsList.some((f) => f.name?.toLowerCase().includes(selectedFestival.toLowerCase()));
        if (!hasFest) return false;
      }

      // Circuit Filter
      if (selectedCircuit !== 'All') {
        const targetCircuit = ARUNACHAL_PILGRIMAGE_CIRCUITS.find((c) => c.id === selectedCircuit);
        if (targetCircuit) {
          const inCircuit = targetCircuit.temples.some((ctName) => t.name.toLowerCase().includes(ctName.toLowerCase()) || ctName.toLowerCase().includes(t.name.toLowerCase()));
          if (!inCircuit) return false;
        }
      }

      // Featured Toggle
      if (featuredOnly && !t.isFeatured) {
        return false;
      }

      return true;
    });
  }, [
    temples,
    searchQuery,
    selectedDistrict,
    selectedDeity,
    selectedCategory,
    selectedFestival,
    selectedCircuit,
    featuredOnly
  ]);

  // Reset All Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDistrict('All');
    setSelectedDeity('All');
    setSelectedFestival('All');
    setSelectedCategory('All');
    setSelectedCircuit('All');
    setFeaturedOnly(false);
  };

  // Open Modal Handler
  const handleOpenTempleModal = (temple) => {
    setSelectedTemple(temple);
    setActiveModalSection('section-a');
  };

  // Circuit Click Handler
  const handleCircuitCardClick = (circuitId) => {
    if (selectedCircuit === circuitId) {
      setSelectedCircuit('All');
    } else {
      setSelectedCircuit(circuitId);
      if (templesGridRef.current) {
        templesGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="arunachal-temples-module">
      {/* 1. Header Banner & State Glory Ribbon */}
      <div className="ap-temples-header-banner">
        <div className="ap-banner-halo-pattern" />
        <div className="ap-banner-content">
          <div className="ap-banner-badge">
            <span className="ap-om-symbol">ॐ</span>
            <span>LAND OF THE DAWN-LIT PEAKS • HIMALAYAN SACRED SANCTUMS</span>
          </div>

          <h2 className="ap-banner-title">Sacred Temples & Pilgrimages of Arunachal Pradesh</h2>

          <p className="ap-banner-subtitle">
            From the prehistoric natural monolithic Shivalinga at Kardo Hills to the sacred cleansing waters of Parashuram Kund and the ancient 14th-century stonecraft of Malinithan, journey across Arunachal Pradesh's revered Hindu shrines and indigenous cosmic sanctums.
          </p>

          {/* Key Metrics Ribbon */}
          <div className="ap-metrics-ribbon">
            <div className="ap-metric-item">
              <span className="ap-metric-num">12</span>
              <span className="ap-metric-label">Sacred Pilgrimage Sites</span>
            </div>
            <div className="ap-metric-divider" />
            <div className="ap-metric-item">
              <span className="ap-metric-num">5</span>
              <span className="ap-metric-label">Pilgrimage Circuits</span>
            </div>
            <div className="ap-metric-divider" />
            <div className="ap-metric-item">
              <span className="ap-metric-num">100%</span>
              <span className="ap-metric-label">Verified Puranic Lore</span>
            </div>
            <div className="ap-metric-divider" />
            <div className="ap-metric-item">
              <span className="ap-metric-num">7</span>
              <span className="ap-metric-label">Mountain Districts</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Pilgrimage Circuits Showcase */}
      <section className="ap-circuits-section">
        <div className="ap-section-title-wrap">
          <div className="ap-section-tag">
            <FaRoute className="ap-tag-icon" /> YATRA CIRCUITS
          </div>
          <h3 className="ap-section-heading">5 Curated Himalayan Pilgrimage Circuits</h3>
          <p className="ap-section-desc">
            Explore carefully planned spiritual itineraries mapping sacred valleys, ancient stone excavations, riverside tirthas, and high-altitude mountain sanctuaries.
          </p>
        </div>

        <div className="ap-circuits-grid">
          {ARUNACHAL_PILGRIMAGE_CIRCUITS.map((circuit) => {
            const isSelected = selectedCircuit === circuit.id;
            return (
              <div
                key={circuit.id}
                className={`ap-circuit-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleCircuitCardClick(circuit.id)}
                style={{ '--circuit-color': circuit.color }}
              >
                <div className="ap-circuit-top">
                  <div className="ap-circuit-icon-box">{circuit.icon}</div>
                  <span className="ap-circuit-tag">{circuit.tag}</span>
                </div>

                <h4 className="ap-circuit-name">{circuit.name}</h4>
                <p className="ap-circuit-summary">{circuit.summary}</p>

                <div className="ap-circuit-shrines-preview">
                  <strong>Key Sanctums:</strong>
                  <ul>
                    {circuit.temples.map((templeName, idx) => (
                      <li key={idx}>• {templeName}</li>
                    ))}
                  </ul>
                </div>

                <div className="ap-circuit-itinerary-preview">
                  <span className="ap-itin-badge">
                    <FaClock size={11} /> Suggested Route:
                  </span>
                  <p>{circuit.itinerary}</p>
                </div>

                <button className="ap-circuit-btn">
                  {isSelected ? 'Showing Circuit Temples ✓' : 'Explore Circuit →'}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Search & Comprehensive Filter Toolbar */}
      <section className="ap-filter-toolbar-section" ref={templesGridRef}>
        <div className="ap-filter-card">
          {/* Row 1: Search Bar & Count */}
          <div className="ap-search-row">
            <div className="ap-search-input-box">
              <FaSearch className="ap-search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by temple name, deity, district, or pilgrimage lore..."
                aria-label="Search temples"
              />
              {searchQuery && (
                <button
                  className="ap-clear-search-btn"
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            <div className="ap-results-count-pill">
              Showing <strong>{filteredTemples.length}</strong> of {temples.length} Sacred Sanctums
            </div>
          </div>

          {/* Row 2: Select Filters */}
          <div className="ap-dropdowns-row">
            {/* District Filter */}
            <div className="ap-filter-group">
              <label>
                <FaMapMarkerAlt size={11} /> District:
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
              >
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d === 'All' ? 'All Districts (7)' : d}
                  </option>
                ))}
              </select>
            </div>

            {/* Presiding Deity Filter */}
            <div className="ap-filter-group">
              <label>
                <FaPray size={11} /> Presiding Deity:
              </label>
              <select
                value={selectedDeity}
                onChange={(e) => setSelectedDeity(e.target.value)}
              >
                {deities.map((deity) => (
                  <option key={deity} value={deity}>
                    {deity === 'All' ? 'All Divine Deities' : deity}
                  </option>
                ))}
              </select>
            </div>

            {/* Sanctum Category */}
            <div className="ap-filter-group">
              <label>
                <FaLandmark size={11} /> Sanctum Classification:
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? 'All Classifications' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Major Festival */}
            <div className="ap-filter-group">
              <label>
                <FaCalendarAlt size={11} /> Utsavam / Festival:
              </label>
              <select
                value={selectedFestival}
                onChange={(e) => setSelectedFestival(e.target.value)}
              >
                {festivals.map((fest) => (
                  <option key={fest} value={fest}>
                    {fest === 'All' ? 'All Festivals' : fest}
                  </option>
                ))}
              </select>
            </div>

            {/* Circuit Selector */}
            <div className="ap-filter-group">
              <label>
                <FaRoute size={11} /> Pilgrimage Circuit:
              </label>
              <select
                value={selectedCircuit}
                onChange={(e) => setSelectedCircuit(e.target.value)}
              >
                <option value="All">All Circuits</option>
                {ARUNACHAL_PILGRIMAGE_CIRCUITS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3: Active Filters & Toggles */}
          <div className="ap-active-toggles-row">
            <label className="ap-checkbox-pill">
              <input
                type="checkbox"
                checked={featuredOnly}
                onChange={(e) => setFeaturedOnly(e.target.checked)}
              />
              <FaStar className="ap-star-icon" /> Featured Shrines Only
            </label>

            {(searchQuery ||
              selectedDistrict !== 'All' ||
              selectedDeity !== 'All' ||
              selectedCategory !== 'All' ||
              selectedFestival !== 'All' ||
              selectedCircuit !== 'All' ||
              featuredOnly) && (
              <button className="ap-reset-btn" onClick={handleResetFilters}>
                <FaTimes size={11} /> Reset All Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 4. Temples Display Grid */}
      <section className="ap-temples-cards-section">
        {loading ? (
          <div className="ap-temples-loading">
            <div className="ap-loading-spinner" />
            <p>Retrieving authentic Arunachal Pradesh temple records from cultural database...</p>
          </div>
        ) : error ? (
          <div className="ap-temples-error">
            <span className="ap-error-icon">⚠️</span>
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="ap-retry-btn"
            >
              Retry Connection
            </button>
          </div>
        ) : filteredTemples.length === 0 ? (
          <div className="ap-temples-empty">
            <span className="ap-empty-om">🛕</span>
            <h4>No Temples Matched Your Search Criteria</h4>
            <p>Try clearing filters or searching for alternative names like Ziro, Malinithan, or Parashuram Kund.</p>
            <button className="ap-reset-btn primary" onClick={handleResetFilters}>
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="ap-temples-grid">
            {filteredTemples.map((temple) => (
              <div key={temple._id} className="ap-temple-card">
                {/* Image & Badges */}
                <div className="ap-temple-card-media">
                  <img
                    src={temple.image || (temple.images && temple.images[0]) || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80'}
                    alt={temple.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80';
                    }}
                  />
                  <div className="ap-card-badge-overlay">
                    <span className="ap-card-category-badge">{temple.category || 'Sacred Sanctum'}</span>
                    {temple.isFeatured && (
                      <span className="ap-card-featured-badge">
                        <FaStar size={10} /> Featured
                      </span>
                    )}
                  </div>
                  <div className="ap-card-gradient-shim" />
                </div>

                {/* Card Content */}
                <div className="ap-temple-card-body">
                  <div className="ap-card-location-meta">
                    <FaMapMarkerAlt className="ap-card-loc-icon" />
                    <span>
                      {temple.city ? `${temple.city}, ` : ''}{temple.district}
                    </span>
                  </div>

                  <h3 className="ap-card-title">{temple.name}</h3>

                  {Array.isArray(temple.altNames) && temple.altNames.length > 0 && (
                    <p className="ap-card-alt-names">
                      aka <em>{temple.altNames.slice(0, 2).join(' • ')}</em>
                    </p>
                  )}

                  {/* 3 Quick Attributes */}
                  <div className="ap-card-specs-grid">
                    <div className="ap-card-spec-item">
                      <span className="ap-spec-label">🔱 Deity:</span>
                      <span className="ap-spec-val" title={temple.deity}>
                        {temple.deity || 'Sanatana Deity'}
                      </span>
                    </div>

                    <div className="ap-card-spec-item">
                      <span className="ap-spec-label">🕒 Timings:</span>
                      <span className="ap-spec-val">{temple.timings || 'Daily Darshan'}</span>
                    </div>

                    <div className="ap-card-spec-item">
                      <span className="ap-spec-label">🎪 Prime Festival:</span>
                      <span className="ap-spec-val">
                        {temple.festivalsList && temple.festivalsList[0]
                          ? temple.festivalsList[0].name
                          : 'Maha Shivaratri'}
                      </span>
                    </div>
                  </div>

                  <p className="ap-card-desc">
                    {temple.significance || temple.description}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="ap-temple-card-footer">
                  <button
                    className="ap-explore-dossier-btn"
                    onClick={() => handleOpenTempleModal(temple)}
                  >
                    <FaEye size={13} /> View Complete Temple Details →
                  </button>
                  {temple.mapsUrl && (
                    <a
                      href={temple.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ap-quick-map-link"
                      title="Open Google Maps Location"
                    >
                      <FaDirections size={14} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5. Comprehensive 7-Section Modal Dossier */}
      {selectedTemple && (
        <div
          className="ap-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedTemple(null);
          }}
        >
          <div className="ap-modal-container" role="dialog" aria-modal="true">
            {/* Modal Header */}
            <div className="ap-modal-header">
              <div className="ap-modal-header-titles">
                <div className="ap-modal-badges-row">
                  <span className="ap-modal-category-pill">{selectedTemple.category}</span>
                  <span className="ap-modal-location-pill">
                    <FaMapMarkerAlt size={10} /> {selectedTemple.location || selectedTemple.city}, {selectedTemple.district}
                  </span>
                </div>
                <h2 className="ap-modal-main-title">{selectedTemple.name}</h2>
                {Array.isArray(selectedTemple.altNames) && selectedTemple.altNames.length > 0 && (
                  <p className="ap-modal-alt-subtitle">
                    Known as: {selectedTemple.altNames.join(' | ')}
                  </p>
                )}
              </div>

              <button
                className="ap-modal-close-btn"
                onClick={() => setSelectedTemple(null)}
                aria-label="Close modal"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* Modal Navigation Tabs (Sections A through G) */}
            <div className="ap-modal-nav-tabs">
              <button
                className={`ap-modal-nav-tab ${activeModalSection === 'section-a' ? 'active' : ''}`}
                onClick={() => setActiveModalSection('section-a')}
              >
                Overview & Deity
              </button>
              <button
                className={`ap-modal-nav-tab ${activeModalSection === 'section-b' ? 'active' : ''}`}
                onClick={() => setActiveModalSection('section-b')}
              >
                History & Architecture
              </button>
              <button
                className={`ap-modal-nav-tab ${activeModalSection === 'section-c' ? 'active' : ''}`}
                onClick={() => setActiveModalSection('section-c')}
              >
                Rituals & Poojas
              </button>
              <button
                className={`ap-modal-nav-tab ${activeModalSection === 'section-d' ? 'active' : ''}`}
                onClick={() => setActiveModalSection('section-d')}
              >
                Darshan Timings
              </button>
              <button
                className={`ap-modal-nav-tab ${activeModalSection === 'section-e' ? 'active' : ''}`}
                onClick={() => setActiveModalSection('section-e')}
              >
                Festivals & Calendar
              </button>
              <button
                className={`ap-modal-nav-tab ${activeModalSection === 'section-f' ? 'active' : ''}`}
                onClick={() => setActiveModalSection('section-f')}
              >
                Visitor Guidelines
              </button>
              <button
                className={`ap-modal-nav-tab ${activeModalSection === 'section-g' ? 'active' : ''}`}
                onClick={() => setActiveModalSection('section-g')}
              >
                Location & Travel
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="ap-modal-body">
              {/* SECTION A: Overview, Deity & Religious Info */}
              {activeModalSection === 'section-a' && (
                <div className="ap-modal-pane">
                  {/* Hero Image */}
                  <div className="ap-modal-hero-photo">
                    <img
                      src={selectedTemple.image || (selectedTemple.images && selectedTemple.images[0])}
                      alt={selectedTemple.name}
                      onClick={() => setEnlargedPhoto(selectedTemple.image || (selectedTemple.images && selectedTemple.images[0]))}
                    />
                    <span className="ap-zoom-hint">🔍 Click image to enlarge</span>
                  </div>

                  {/* Summary Callout */}
                  <div className="ap-info-callout">
                    <h4>🔱 Sacred Significance & Divine Presence</h4>
                    <p>{selectedTemple.significance}</p>
                  </div>

                  {/* Attributes Grid */}
                  <div className="ap-detail-attrs-grid">
                    <div className="ap-attr-box">
                      <span className="ap-attr-label">Presiding Deity</span>
                      <span className="ap-attr-val highlight">{selectedTemple.deity}</span>
                    </div>

                    <div className="ap-attr-box">
                      <span className="ap-attr-label">Associated Deities</span>
                      <span className="ap-attr-val">
                        {Array.isArray(selectedTemple.associatedDeities)
                          ? selectedTemple.associatedDeities.join(', ')
                          : 'Sanatana Shrines'}
                      </span>
                    </div>

                    <div className="ap-attr-box">
                      <span className="ap-attr-label">Sanctum Classification</span>
                      <span className="ap-attr-val">{selectedTemple.category}</span>
                    </div>

                    <div className="ap-attr-box">
                      <span className="ap-attr-label">Geographic Location</span>
                      <span className="ap-attr-val">
                        {selectedTemple.location}, {selectedTemple.city}, {selectedTemple.district}
                      </span>
                    </div>
                  </div>

                  {/* Puranic Mythology */}
                  {selectedTemple.mythology && (
                    <div className="ap-text-section">
                      <h4>📜 Puranic Mythology & Legends</h4>
                      <p>{selectedTemple.mythology}</p>
                    </div>
                  )}

                  {/* Photo Gallery Grid */}
                  {Array.isArray(selectedTemple.images) && selectedTemple.images.length > 0 && (
                    <div className="ap-gallery-section">
                      <h4>📸 Temple Gallery & Sacred Views</h4>
                      <div className="ap-modal-gallery-strip">
                        {selectedTemple.images.map((imgUrl, i) => (
                          <div
                            key={i}
                            className="ap-gallery-thumb"
                            onClick={() => setEnlargedPhoto(imgUrl)}
                          >
                            <img src={imgUrl} alt={`Temple view ${i + 1}`} loading="lazy" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SECTION B: History & Architecture */}
              {activeModalSection === 'section-b' && (
                <div className="ap-modal-pane">
                  <div className="ap-text-section">
                    <h4>🏛️ Historical Background & Excavations</h4>
                    <p>{selectedTemple.history}</p>
                  </div>

                  <div className="ap-text-section">
                    <h4>🛕 Architectural Marvel & Construction</h4>
                    <p>{selectedTemple.architecture}</p>
                  </div>
                </div>
              )}

              {/* SECTION C: Daily Rituals & Poojas */}
              {activeModalSection === 'section-c' && (
                <div className="ap-modal-pane">
                  <div className="ap-rituals-intro">
                    <h4>🪔 Daily Nitya Sevas & Sacred Worship</h4>
                    <p>
                      Sacred rituals conducted daily in accordance with ancient Himalayan and Vedic traditions.
                    </p>
                  </div>

                  {selectedTemple.rituals?.daily && Array.isArray(selectedTemple.rituals.daily) && (
                    <div className="ap-daily-timeline">
                      {selectedTemple.rituals.daily.map((ritual, idx) => (
                        <div key={idx} className="ap-timeline-item">
                          <div className="ap-timeline-dot" />
                          <div className="ap-timeline-content">
                            <span className="ap-timeline-step">Step {idx + 1}</span>
                            <p>{ritual}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="ap-pooja-cards-grid">
                    <div className="ap-pooja-card">
                      <div className="ap-pooja-header">
                        <FaSun className="ap-pooja-icon morning" />
                        <h5>Morning Puja & Sevas</h5>
                      </div>
                      <p>{selectedTemple.rituals?.morningPooja || 'Morning Jalabhishek and Mangal Aarti'}</p>
                    </div>

                    <div className="ap-pooja-card">
                      <div className="ap-pooja-header">
                        <FaMoon className="ap-pooja-icon evening" />
                        <h5>Evening Aarti & Sevas</h5>
                      </div>
                      <p>{selectedTemple.rituals?.eveningAarti || 'Evening Sandhya Deepa Aarti with traditional bells'}</p>
                    </div>

                    <div className="ap-pooja-card full-width">
                      <div className="ap-pooja-header">
                        <FaPray className="ap-pooja-icon special" />
                        <h5>Special Poojas & Periodic Sevas</h5>
                      </div>
                      <p>{selectedTemple.rituals?.specialPooja || 'Special Rudrabhishekam on Mondays and during Navaratri'}</p>
                    </div>
                  </div>

                  {selectedTemple.rituals?.prasadInfo && (
                    <div className="ap-prasad-box">
                      <span className="ap-prasad-icon">🪷</span>
                      <div>
                        <strong>Mahaprasadam Details:</strong>
                        <p>{selectedTemple.rituals.prasadInfo}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SECTION D: Darshan Schedule */}
              {activeModalSection === 'section-d' && (
                <div className="ap-modal-pane">
                  <div className="ap-timing-banner">
                    <FaClock size={20} />
                    <div>
                      <span className="ap-timing-label">Sanctum Daily Open Hours</span>
                      <span className="ap-timing-hours">{selectedTemple.timings}</span>
                    </div>
                  </div>

                  <div className="ap-darshan-slots-grid">
                    <div className="ap-slot-card">
                      <span className="ap-slot-title">Morning Darshan</span>
                      <span className="ap-slot-time">
                        {selectedTemple.darshan?.morningDarshan || '06:00 AM – 12:00 PM'}
                      </span>
                      <p className="ap-slot-desc">Ideal for snanam, abhishekam, and quiet meditation.</p>
                    </div>

                    <div className="ap-slot-card">
                      <span className="ap-slot-title">Afternoon Schedule</span>
                      <span className="ap-slot-time">
                        {selectedTemple.darshan?.afternoonBreak || 'Open continuously'}
                      </span>
                      <p className="ap-slot-desc">Open for visiting devotees and scenic valley exploration.</p>
                    </div>

                    <div className="ap-slot-card">
                      <span className="ap-slot-title">Evening Darshan</span>
                      <span className="ap-slot-time">
                        {selectedTemple.darshan?.eveningDarshan || '12:00 PM – 06:00 PM'}
                      </span>
                      <p className="ap-slot-desc">Experience the sunset deeparadhana and evening chanting.</p>
                    </div>
                  </div>

                  {selectedTemple.darshan?.specialDarshan && (
                    <div className="ap-info-callout" style={{ marginTop: '16px' }}>
                      <h4>🌟 Special Darshan Information</h4>
                      <p>{selectedTemple.darshan.specialDarshan}</p>
                    </div>
                  )}

                  <div className="ap-best-time-box">
                    <span className="ap-best-icon">☀️</span>
                    <div>
                      <strong>Recommended Season to Visit:</strong>
                      <p>{selectedTemple.bestTimeToVisit}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION E: Festivals & Hindu Calendar */}
              {activeModalSection === 'section-e' && (
                <div className="ap-modal-pane">
                  <h4>🎪 Major Annual Festivals & Religious Celebrations</h4>
                  <p className="ap-pane-intro">
                    Experience the spiritual fervor when ancient Himalayan shrines resonate with sacred chants, thousands of butter lamps, and devotional gatherings.
                  </p>

                  <div className="ap-festivals-list">
                    {Array.isArray(selectedTemple.festivalsList) && selectedTemple.festivalsList.length > 0 ? (
                      selectedTemple.festivalsList.map((festival, idx) => (
                        <div key={idx} className="ap-festival-card">
                          <div className="ap-fest-top">
                            <h5 className="ap-fest-name">{festival.name}</h5>
                            <span className="ap-fest-month">
                              <FaCalendarAlt size={11} /> {festival.month}
                            </span>
                          </div>

                          {festival.duration && (
                            <span className="ap-fest-duration">Duration: {festival.duration}</span>
                          )}

                          <p className="ap-fest-sig">
                            <strong>Significance:</strong> {festival.significance}
                          </p>

                          {festival.rituals && (
                            <p className="ap-fest-rituals">
                              <strong>Rituals:</strong> {festival.rituals}
                            </p>
                          )}
                        </div>
                      ))
                    ) : (
                      <p>Maha Shivaratri and local festivals celebrated annually.</p>
                    )}
                  </div>
                </div>
              )}

              {/* SECTION F: Visitor Guidelines & Facilities */}
              {activeModalSection === 'section-f' && (
                <div className="ap-modal-pane">
                  <h4>📋 Visitor Guidelines & Sanctum Etiquette</h4>

                  <div className="ap-guidelines-grid">
                    <div className="ap-guide-card">
                      <div className="ap-guide-head">
                        <FaTshirt className="ap-guide-icon" />
                        <h5>Dress Code</h5>
                      </div>
                      <p>{selectedTemple.guidelines?.dressCode || 'Traditional respectful attire recommended. Warm woolens advised in winter.'}</p>
                    </div>

                    <div className="ap-guide-card">
                      <div className="ap-guide-head">
                        <FaCamera className="ap-guide-icon" />
                        <h5>Photography Rules</h5>
                      </div>
                      <p>{selectedTemple.guidelines?.photography || 'Allowed in outer courtyards; restricted during sanctum ceremonies.'}</p>
                    </div>

                    <div className="ap-guide-card">
                      <div className="ap-guide-head">
                        <FaInfoCircle className="ap-guide-icon" />
                        <h5>Entry & Footwear</h5>
                      </div>
                      <p>{selectedTemple.guidelines?.footwear || 'Footwear must be deposited before entering the sacred perimeter.'}</p>
                    </div>

                    <div className="ap-guide-card">
                      <div className="ap-guide-head">
                        <FaWheelchair className="ap-guide-icon" />
                        <h5>Accessibility</h5>
                      </div>
                      <p>{selectedTemple.guidelines?.accessibility || 'Paved trails; mountain steps have railings for support.'}</p>
                    </div>
                  </div>

                  <h4 style={{ marginTop: '24px' }}>🏨 Pilgrim Facilities & Amenities</h4>
                  <div className="ap-facilities-strip">
                    <div className={`ap-fac-badge ${selectedTemple.facilities?.parking ? 'yes' : 'no'}`}>
                      {selectedTemple.facilities?.parking ? '✓ Parking Available' : '— Limited Parking'}
                    </div>
                    <div className={`ap-fac-badge ${selectedTemple.facilities?.drinkingWater ? 'yes' : 'no'}`}>
                      {selectedTemple.facilities?.drinkingWater ? '✓ Pure Drinking Water' : '— Carry Water'}
                    </div>
                    <div className={`ap-fac-badge ${selectedTemple.facilities?.restrooms ? 'yes' : 'no'}`}>
                      {selectedTemple.facilities?.restrooms ? '✓ Clean Restrooms' : '— Basic Restrooms'}
                    </div>
                    <div className={`ap-fac-badge ${selectedTemple.facilities?.accommodation ? 'yes' : 'no'}`}>
                      {selectedTemple.facilities?.accommodation ? '✓ Guest Houses Available' : '— Lodging in Town'}
                    </div>
                  </div>

                  <div className="ap-accommodation-notes">
                    <p>
                      <strong>Accommodation & Lodging:</strong>{' '}
                      {selectedTemple.facilities?.dharamshala || 'Homestays and government tourist lodges available in nearby towns.'}
                    </p>
                  </div>
                </div>
              )}

              {/* SECTION G: Location & Connectivity */}
              {activeModalSection === 'section-g' && (
                <div className="ap-modal-pane">
                  <div className="ap-address-block">
                    <h4>📍 Complete Sanctum Address</h4>
                    <p className="ap-full-address">{selectedTemple.address || selectedTemple.location}</p>
                    {selectedTemple.coordinates && (
                      <span className="ap-coords-tag">
                        Coordinates: {selectedTemple.coordinates.lat}° N, {selectedTemple.coordinates.lng}° E
                      </span>
                    )}
                  </div>

                  {/* Google Maps Actions */}
                  {selectedTemple.mapsUrl && (
                    <div className="ap-map-actions-row">
                      <a
                        href={selectedTemple.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ap-btn primary"
                      >
                        <FaDirections size={14} /> Open in Google Maps
                      </a>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${selectedTemple.coordinates?.lat},${selectedTemple.coordinates?.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ap-btn outline"
                      >
                        <FaRoute size={14} /> Get Driving Directions
                      </a>
                    </div>
                  )}

                  <h4>🚗 How to Reach & Transportation</h4>
                  <div className="ap-transport-cards-grid">
                    <div className="ap-trans-card">
                      <FaTrain className="ap-trans-icon rail" />
                      <div>
                        <strong>By Railway:</strong>
                        <p>{selectedTemple.nearbyTransport?.railway || 'Naharlagun (NHLN) or Silapathar Railway Stations.'}</p>
                      </div>
                    </div>

                    <div className="ap-trans-card">
                      <FaPlane className="ap-trans-icon air" />
                      <div>
                        <strong>By Air:</strong>
                        <p>{selectedTemple.nearbyTransport?.airport || 'Donyi Polo Airport, Itanagar (HGI) or Lilabari Airport (IXI).'}</p>
                      </div>
                    </div>

                    <div className="ap-trans-card">
                      <FaBus className="ap-trans-icon bus" />
                      <div>
                        <strong>By Bus / State Transport:</strong>
                        <p>{selectedTemple.nearbyTransport?.bus || 'APSTC state buses connect major foothill junctions.'}</p>
                      </div>
                    </div>

                    <div className="ap-trans-card">
                      <FaCar className="ap-trans-icon local" />
                      <div>
                        <strong>Local Mountain Transit:</strong>
                        <p>{selectedTemple.nearbyTransport?.local || 'Shared Tata Sumos, private cabs, and 4x4 vehicles available in towns.'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="ap-modal-footer">
              <span className="ap-modal-footer-note">
                DivyaBharat Divine Himalayan Archives • Official Arunachal Pradesh Pilgrimage Records
              </span>
              <button
                className="ap-modal-close-action"
                onClick={() => setSelectedTemple(null)}
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enlarged Photo Lightbox */}
      {enlargedPhoto && (
        <div
          className="ap-lightbox-overlay"
          onClick={() => setEnlargedPhoto(null)}
        >
          <div className="ap-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={enlargedPhoto} alt="Enlarged view" />
            <button
              className="ap-lightbox-close"
              onClick={() => setEnlargedPhoto(null)}
              aria-label="Close enlarged photo"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
