// src/pages/HeritagePage.js — DivyaBharat Royal Heritage Places Explorer
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/Navbar';
import api from '../services/api';
import StateEmblemIcon from '../components/StateEmblemIcon';
import { STATE_CULTURAL_THEMES } from '../data/stateCulturalThemes';
import './HeritagePage.css';

import logo from '../assets/logo.png';
import heritageBg from '../assets/heritage.png';
import {
  HERITAGE_LOCATIONS,
  HERITAGE_CATEGORIES,
  LOCATION_FILTERS,
  HERITAGE_GRADIENTS,
} from '../data/heritageLocations';

import {
  FaSearch,
  FaMicrophone,
  FaArrowLeft,
  FaArrowRight,
  FaBars,
  FaTimes,
  FaLandmark,
  FaChessRook,
  FaUniversity,
  FaTheaterMasks,
  FaMapMarkedAlt,
  FaMap,
  FaCity,
  FaHistory,
  FaCompass,
} from 'react-icons/fa';

// Map string icon names to React Icon components
const ICON_COMPONENTS = {
  FaMapMarkedAlt,
  FaLandmark,
  FaChessRook,
  FaUniversity,
  FaHistory,
  FaTheaterMasks,
  FaCompass,
  FaMap,
  FaCity,
};

export default function HeritagePage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Search & Filters state
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all-locations');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [dbStateIcons, setDbStateIcons] = useState({});
  const searchInputRef = useRef(null);

  // Sync state & UT icons from MongoDB database
  useEffect(() => {
    let isMounted = true;
    const fetchStates = async () => {
      try {
        const { data } = await api.get('/states');
        if (data && data.success && Array.isArray(data.states) && data.states.length > 0) {
          const map = {};
          data.states.forEach((s) => {
            if (s.name && s.icon) {
              map[s.name.toLowerCase().trim()] = s.icon;
            }
          });
          if (isMounted) {
            setDbStateIcons(map);
          }
        }
      } catch (err) {
        // Fallback to static HERITAGE_LOCATIONS
      }
    };
    fetchStates();
    return () => { isMounted = false; };
  }, []);

  // Close mobile drawer on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900 && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isDrawerOpen]);

  // Handle escape key to close drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen]);

  // Voice search using Web Speech API if supported
  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setSearch(transcript);
        }
      };

      recognition.start();
    } catch (err) {
      setIsListening(false);
    }
  };

  // Filter logic across search, category, and location
  const { statesList, utsList } = useMemo(() => {
    const query = search.trim().toLowerCase();

    const enriched = HERITAGE_LOCATIONS.map((item) => {
      const dbIcon = dbStateIcons[item.name.toLowerCase().trim()];
      return dbIcon ? { ...item, icon: dbIcon } : item;
    });

    const filtered = enriched.filter((item) => {
      // 1. Location filter (States vs Union Territories)
      if (locationFilter === 'states' && item.type !== 'State') return false;
      if (locationFilter === 'uts' && item.type !== 'Union Territory') return false;

      // 2. Category filter
      if (activeCategory !== 'all') {
        if (!item.categories.includes(activeCategory)) return false;
      }

      // 3. Search query match
      if (query) {
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesHighlights = item.highlights.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesBadge = item.badge.toLowerCase().includes(query);
        const matchesRegion = item.region.toLowerCase().includes(query);
        const theme = STATE_CULTURAL_THEMES[item.name];
        const matchesArch = theme?.archStyle?.toLowerCase().includes(query);
        const matchesDivine = theme?.divineTitle?.toLowerCase().includes(query);

        return (
          matchesName ||
          matchesHighlights ||
          matchesDesc ||
          matchesBadge ||
          matchesRegion ||
          matchesArch ||
          matchesDivine
        );
      }

      return true;
    });

    return {
      statesList: filtered.filter((i) => i.type === 'State'),
      utsList: filtered.filter((i) => i.type === 'Union Territory'),
    };
  }, [search, activeCategory, locationFilter, dbStateIcons]);

  const totalVisible = statesList.length + utsList.length;

  const handleCategoryClick = (catId) => {
    setActiveCategory(catId);
    if (isDrawerOpen) setIsDrawerOpen(false);
  };

  const handleLocationClick = (locId) => {
    setLocationFilter(locId);
    if (isDrawerOpen) setIsDrawerOpen(false);
  };

  const handleResetFilters = () => {
    setSearch('');
    setActiveCategory('all');
    setLocationFilter('all-locations');
  };

  const handleCardClick = (item) => {
    navigate(`/states/${encodeURIComponent(item.name)}`);
  };

  return (
    <div className="heritage-page royal-heritage-theme">
      {/* Common Application Header with Sound, Notification, Language & Profile */}
      <Navbar />

      {/* BACKGROUND OVERLAY */}
      <div
        className="heritage-page-bg-overlay"
        style={{ backgroundImage: `url(${heritageBg})` }}
        aria-hidden="true"
      />
      <div className="heritage-sacred-rays-overlay" aria-hidden="true" />

      {/* MOBILE DRAWER BACKDROP */}
      {isDrawerOpen && (
        <div
          className="heritage-drawer-backdrop"
          onClick={() => setIsDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* LEFT SIDE DRAWER / SIDEBAR (Royal Museum Navigation) */}
      <aside
        className={`heritage-page-sidebar ${isDrawerOpen ? 'drawer-open' : ''}`}
        aria-label="Heritage Navigation"
      >
        {/* SIDEBAR HEADER WITH LOGO */}
        <div className="heritage-sidebar-header">
          <div
            className="heritage-page-logo-section"
            onClick={() => navigate('/home')}
            role="button"
            tabIndex={0}
            title="Go to Home"
          >
            <img src={logo} alt="DivyaBharat Logo" />
            <div className="heritage-page-logo-text">
              <h2>DivyaBharat</h2>
              <p>Rooted in Culture</p>
            </div>
          </div>
          {/* Mobile Close Button */}
          <button
            className="heritage-drawer-close-btn"
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close Navigation Menu"
          >
            <FaTimes />
          </button>
        </div>

        {/* BACK TO HOME ACTION */}
        <div className="heritage-sidebar-home-action">
          <button
            className="heritage-nav-btn back-home-btn"
            onClick={() => navigate('/home')}
            aria-label="Back to Home"
          >
            <FaArrowLeft className="heritage-nav-icon" aria-hidden="true" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* SIDEBAR NAVIGATION GROUPS */}
        <nav className="heritage-sidebar-nav" aria-label="Heritage categories">
          {/* GROUP 1: EXPLORE HERITAGE */}
          <div className="heritage-sidebar-group">
            <h3 className="heritage-group-title">Explore Heritage</h3>
            <ul className="heritage-group-list">
              {HERITAGE_CATEGORIES.map((cat) => {
                const IconComponent = ICON_COMPONENTS[cat.icon] || FaLandmark;
                const isActive = activeCategory === cat.id;
                return (
                  <li key={cat.id}>
                    <button
                      className={`heritage-nav-btn ${isActive ? 'active' : ''}`}
                      onClick={() => handleCategoryClick(cat.id)}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <IconComponent
                        className="heritage-nav-icon"
                        aria-hidden="true"
                      />
                      <span>{cat.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* GROUP 2: EXPLORE BY LOCATION */}
          <div className="heritage-sidebar-group">
            <h3 className="heritage-group-title">Explore by Location</h3>
            <ul className="heritage-group-list">
              {LOCATION_FILTERS.map((loc) => {
                const IconComponent = ICON_COMPONENTS[loc.icon] || FaMap;
                const isActive = locationFilter === loc.id;
                return (
                  <li key={loc.id}>
                    <button
                      className={`heritage-nav-btn ${isActive ? 'active' : ''}`}
                      onClick={() => handleLocationClick(loc.id)}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <IconComponent
                        className="heritage-nav-icon"
                        aria-hidden="true"
                      />
                      <span>{loc.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* ROYAL DECORATIVE SIDEBAR FOOTER */}
        <div className="heritage-sidebar-footer">
          <div className="heritage-sidebar-quote">
            <span className="heritage-quote-icon">🏛️</span>
            <p>"Dharmo Rakshati Rakshitah — Preserving India's timeless civilization for all generations."</p>
          </div>
        </div>
      </aside>

      {/* MAIN HERITAGE CONTENT AREA */}
      <main className="heritage-page-main-content">
        {/* TOP SEARCH BAR */}
        <div className="heritage-page-search-box" role="search">
          <button
            className="heritage-drawer-toggle-btn"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            aria-label="Filter Heritage Categories"
            title="Filter Categories & Regions"
            type="button"
          >
            <FaBars />
          </button>
          <FaSearch className="heritage-page-search-icon" aria-hidden="true" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder={t('heritage.searchPlaceholder', 'Search States, UNESCO Sites, Forts, Stepwells, Monuments...')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search States, UTs, Heritage Places"
          />
          {search && (
            <button
              className="heritage-search-clear-btn"
              onClick={() => setSearch('')}
              aria-label="Clear search input"
              type="button"
            >
              <FaTimes />
            </button>
          )}
          <button
            className={`heritage-mic-btn ${isListening ? 'listening' : ''}`}
            onClick={handleVoiceSearch}
            aria-label="Search by voice"
            title="Search by voice"
            type="button"
          >
            <FaMicrophone />
          </button>
        </div>

        {/* ROYAL CULTURAL MUSEUM HERO SECTION */}
        <header className="heritage-royal-hero-banner" aria-label="Heritage of Bharat Museum Header">
          <div className="heritage-hero-ornamental-arch" aria-hidden="true">
            <span className="heritage-arch-star">✦</span>
            <span className="heritage-arch-tagline">National Repository of Indian Art, Architecture & Living History</span>
            <span className="heritage-arch-star">✦</span>
          </div>

          <h1 className="heritage-main-title">
            Heritage Places of Bharat
          </h1>

          <p className="heritage-main-subtitle">
            A grand digital museum celebrating 5,000 years of India's royal fortresses, UNESCO world heritage monuments, carved stepwells, rock-cut caves, and immortal architectural wonders across 28 States and 8 Union Territories.
          </p>

          {/* ACTIVE FILTER / STATS BAR */}
          <div className="heritage-stats-bar">
            <div className="heritage-stat-pill">
              <span className="heritage-stat-pill-icon">🏛️</span>
              <span><strong>36</strong> Regional Hubs</span>
            </div>
            <div className="heritage-stat-pill">
              <span className="heritage-stat-pill-icon">⭐</span>
              <span><strong>42+</strong> UNESCO Inscriptions</span>
            </div>
            <div className="heritage-stat-pill">
              <span className="heritage-stat-pill-icon">🏰</span>
              <span><strong>500+</strong> Forts & Citadels</span>
            </div>
            <div className="heritage-stat-pill">
              <span className="heritage-stat-pill-icon">📜</span>
              <span><strong>5,000</strong> Years of Heritage</span>
            </div>

            {activeCategory !== 'all' && (
              <span className="heritage-active-filter-badge">
                Category: <strong>{HERITAGE_CATEGORIES.find((c) => c.id === activeCategory)?.label}</strong>
                <button onClick={() => setActiveCategory('all')} aria-label="Remove category filter">✕</button>
              </span>
            )}
            {locationFilter !== 'all-locations' && (
              <span className="heritage-active-filter-badge">
                Location: <strong>{LOCATION_FILTERS.find((l) => l.id === locationFilter)?.label}</strong>
                <button onClick={() => setLocationFilter('all-locations')} aria-label="Remove location filter">✕</button>
              </span>
            )}
            {search && (
              <span className="heritage-active-filter-badge">
                Query: "<strong>{search}</strong>"
                <button onClick={() => setSearch('')} aria-label="Clear search query">✕</button>
              </span>
            )}
          </div>
        </header>

        {/* NO RESULTS VIEW */}
        {totalVisible === 0 && (
          <div className="heritage-empty-state">
            <span className="heritage-empty-icon" role="img" aria-hidden="true">
              🏛️
            </span>
            <h3>No Heritage Destinations Found</h3>
            <p>
              We couldn't find any states or union territories matching "{search || 'selected filters'}".
            </p>
            <button
              className="heritage-empty-reset-btn"
              onClick={handleResetFilters}
            >
              Reset All Filters & View All
            </button>
          </div>
        )}

        {/* ==========================================
            SECTION 1: 28 STATES OF BHARAT
           ========================================== */}
        {statesList.length > 0 && (
          <section
            className="heritage-section-container"
            aria-labelledby="section-states-heading"
          >
            <div className="heritage-section-title-wrap">
              <div className="heritage-section-title-left">
                <span className="heritage-section-icon" aria-hidden="true">
                  🏰
                </span>
                <h2 id="section-states-heading">Heritage of Indian States</h2>
              </div>
              <span className="heritage-section-count-badge">
                {statesList.length} State{statesList.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="heritage-card-grid">
              {statesList.map((state) => {
                const theme = STATE_CULTURAL_THEMES[state.name] || {};
                const sitesList = (state.highlights || "").split(",").map(s => s.trim()).slice(0, 3);

                return (
                  <article
                    key={state.name}
                    className="heritage-state-card royal-card"
                    onClick={() => handleCardClick(state)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Explore heritage of ${state.name}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCardClick(state);
                    }}
                  >
                    <div className="heritage-card-top-accent" />

                    <div
                      className="heritage-card-media"
                      style={{
                        background: HERITAGE_GRADIENTS[state.gradientIndex % HERITAGE_GRADIENTS.length]
                      }}
                    >
                      <div className="heritage-card-emblem-container">
                        <StateEmblemIcon stateName={state.name} />
                      </div>

                      <div className="heritage-card-badge-overlay">
                        <span className="heritage-type-tag">State</span>
                        {state.badge && (
                          <span className="heritage-feature-tag">
                            {state.badge}
                          </span>
                        )}
                      </div>

                      {theme.archStyle && (
                        <div className="heritage-card-arch-banner" title={theme.archStyle}>
                          🏛️ {theme.archStyle.split("&")[0].trim()}
                        </div>
                      )}
                    </div>

                    <div className="heritage-card-body">
                      <div className="heritage-card-title-row">
                        <h3 className="heritage-card-name">{state.name}</h3>
                        <span
                          className="heritage-card-symbol"
                          title={state.name}
                          aria-hidden="true"
                        >
                          {state.icon}
                        </span>
                      </div>

                      {theme.divineTitle && (
                        <p className="heritage-card-cultural-motto">
                          {theme.divineTitle}
                        </p>
                      )}

                      <p className="heritage-card-description">
                        {state.description}
                      </p>

                      <div className="heritage-card-highlights">
                        <span className="heritage-highlights-label">
                          Iconic Heritage Landmarks:
                        </span>
                        <div className="heritage-sites-pills-row">
                          {sitesList.map((site, sIdx) => (
                            <span className="heritage-site-pill" key={sIdx}>
                              {site}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="heritage-card-action">
                        <span className="heritage-action-text">
                          Explore Cultural Heritage
                        </span>
                        <span
                          className="heritage-action-arrow"
                          aria-hidden="true"
                        >
                          <FaArrowRight />
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* ==========================================
            SECTION 2: 8 UNION TERRITORIES
           ========================================== */}
        {utsList.length > 0 && (
          <section
            className="heritage-section-container"
            aria-labelledby="section-uts-heading"
          >
            <div className="heritage-section-title-wrap">
              <div className="heritage-section-title-left">
                <span className="heritage-section-icon" aria-hidden="true">
                  🏛️
                </span>
                <h2 id="section-uts-heading">Union Territories of Bharat</h2>
              </div>
              <span className="heritage-section-count-badge ut-badge">
                {utsList.length} Territor{utsList.length !== 1 ? 'ies' : 'y'}
              </span>
            </div>

            <div className="heritage-card-grid">
              {utsList.map((ut) => {
                const theme = STATE_CULTURAL_THEMES[ut.name] || {};
                const sitesList = (ut.highlights || "").split(",").map(s => s.trim()).slice(0, 3);

                return (
                  <article
                    key={ut.name}
                    className="heritage-state-card royal-card ut-card"
                    onClick={() => handleCardClick(ut)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Explore heritage of ${ut.name}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCardClick(ut);
                    }}
                  >
                    <div className="heritage-card-top-accent ut" />

                    <div
                      className="heritage-card-media"
                      style={{
                        background: HERITAGE_GRADIENTS[(ut.gradientIndex || 0) % HERITAGE_GRADIENTS.length]
                      }}
                    >
                      <div className="heritage-card-emblem-container">
                        <StateEmblemIcon stateName={ut.name} />
                      </div>

                      <div className="heritage-card-badge-overlay">
                        <span className="heritage-type-tag ut-tag">UT</span>
                        {ut.badge && (
                          <span className="heritage-feature-tag">
                            {ut.badge}
                          </span>
                        )}
                      </div>

                      {theme.archStyle && (
                        <div className="heritage-card-arch-banner" title={theme.archStyle}>
                          🏛️ {theme.archStyle.split("&")[0].trim()}
                        </div>
                      )}
                    </div>

                    <div className="heritage-card-body">
                      <div className="heritage-card-title-row">
                        <h3 className="heritage-card-name">{ut.name}</h3>
                        <span
                          className="heritage-card-symbol"
                          title={ut.name}
                          aria-hidden="true"
                        >
                          {ut.icon}
                        </span>
                      </div>

                      {theme.divineTitle && (
                        <p className="heritage-card-cultural-motto">
                          {theme.divineTitle}
                        </p>
                      )}

                      <p className="heritage-card-description">
                        {ut.description}
                      </p>

                      <div className="heritage-card-highlights">
                        <span className="heritage-highlights-label">
                          Iconic Heritage Landmarks:
                        </span>
                        <div className="heritage-sites-pills-row">
                          {sitesList.map((site, sIdx) => (
                            <span className="heritage-site-pill" key={sIdx}>
                              {site}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="heritage-card-action">
                        <span className="heritage-action-text">
                          Explore Cultural Heritage
                        </span>
                        <span
                          className="heritage-action-arrow"
                          aria-hidden="true"
                        >
                          <FaArrowRight />
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* ═══ EPOCHS OF BHARAT'S HERITAGE (CULTURAL MUSEUM SHOWCASE) ═══ */}
        <section className="heritage-epochs-showcase" aria-label="Historic Epochs of Bharat">
          <div className="heritage-epochs-divider" aria-hidden="true">
            <span className="heritage-epochs-line" />
            <span className="heritage-epochs-title">✦ Five Millennia of Architectural & Cultural Genius ✦</span>
            <span className="heritage-epochs-line" />
          </div>

          <div className="heritage-epochs-grid">
            <div className="heritage-epoch-card">
              <span className="heritage-epoch-badge">c. 2600 BCE – 300 CE</span>
              <h4>Harappan & Ancient Buddhist Era</h4>
              <p>Urban brick citadels of Dholavira, Ashokan polished pillars, and rock-cut Buddhist stupas at Sanchi & Amaravati.</p>
            </div>
            <div className="heritage-epoch-card">
              <span className="heritage-epoch-badge">c. 300 – 1200 CE</span>
              <h4>Classical Golden Age of Architecture</h4>
              <p>Masterpieces of Ajanta & Ellora caves, Western Khajuraho carvings, Great Living Chola Temples, and Kalinga Konark chariot.</p>
            </div>
            <div className="heritage-epoch-card">
              <span className="heritage-epoch-badge">c. 1200 – 1750 CE</span>
              <h4>Medieval Fortresses & Inverted Stepwells</h4>
              <p>Mighty UNESCO Rajput hill forts, Hampi Vijayanagara stone chariots, Solanki Rani ki Vav stepwell, and Maratha mountain citadels.</p>
            </div>
            <div className="heritage-epoch-card">
              <span className="heritage-epoch-badge">c. 1750 – Present</span>
              <h4>Living Intangible Cultural Traditions</h4>
              <p>Durga Puja, Kumbh Mela, classical dances (Bharatanatyam, Kathakali, Odissi, Kathak), handloom weaves, and living arts.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
