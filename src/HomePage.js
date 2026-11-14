// src/HomePage.js — DivyaBharat Divine Portal & Spiritual Heritage Hub
// Soft Pastel Divine Theme representing India's sacred beauty, peace, and eternal culture

import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StateEmblemIcon from './components/StateEmblemIcon';
import api from './services/api';

import {
  FaSearch,
  FaArrowRight,
  FaLandmark,
  FaPray,
  FaBook,
  FaQuestionCircle,
  FaCompass,
  FaMapMarkerAlt,
} from 'react-icons/fa';

import homebg from './assets/homebg.png';
import templeArt from './assets/temple.png';
import heritageArt from './assets/heritage.png';

import { HERITAGE_LOCATIONS } from './data/heritageLocations';
import { STATE_CULTURAL_THEMES } from './data/stateCulturalThemes';

// 6 Living Pillars of Bharat Civilization
const LIVING_PILLARS = [
  {
    icon: '🛕',
    title: 'Sacred Temple Architecture',
    subtitle: 'Nagara, Dravidian & Vesara',
    desc: 'Proportioned according to sacred Vastu and Shilpa Shastras, each sanctum is conceived as a living cosmic mandala linking heaven and earth.',
    link: '/temples',
    accent: '#fbe5d8',
  },
  {
    icon: '🎊',
    title: 'Eternal Festivals',
    subtitle: 'Kumbh, Diwali & Navratri',
    desc: 'Rhythms of seasonal gratitude, celestial alignments, and joyous celebrations that bring millions together in spiritual fraternity.',
    link: '/heritage?category=Festival',
    accent: '#f4dde0',
  },
  {
    icon: '🪔',
    title: 'Vedic Rituals & Seva',
    subtitle: 'Aarti, Dhyana & Yajna',
    desc: 'Timeless spiritual disciplines that purify consciousness through sacred fire ceremonies, daily prayers, and selfless community seva.',
    link: '/heritage?category=Tradition',
    accent: '#fff3e8',
  },
  {
    icon: '🎭',
    title: 'Classical Performing Arts',
    subtitle: 'Natya Shastra & Ragas',
    desc: 'Bharatanatyam, Kathakali, Odissi, and Vedic chant traditions transmitting divine knowledge through mudras, melody, and rhythm.',
    link: '/heritage?category=Art%20Form',
    accent: '#eae3f2',
  },
  {
    icon: '📜',
    title: 'Sovereign Dynasties',
    subtitle: 'Mauryas, Cholas & Marathas',
    desc: 'Millennia of heroic rulers, philosopher-kings, and builders who defended and elevated Bharat’s spiritual and architectural legacy.',
    link: '/heritage?category=Historical%20Place',
    accent: '#e5ebdd',
  },
  {
    icon: '🧘',
    title: 'Yoga & Inner Wisdom',
    subtitle: 'Upanishads & Gita',
    desc: 'The eternal science of self-realization, inner tranquility, and mindful living gifted by the Rishis to all humanity.',
    link: '/learning',
    accent: '#f5e9dc',
  },
];

const REGIONS = ['All', 'North', 'South', 'East', 'West', 'Northeast', 'Central', 'Islands'];

export default function HomePage() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [dbStates, setDbStates] = useState([]);
  const [dbSettings, setDbSettings] = useState(null);

  // Fetch live database content for synchronization
  useEffect(() => {
    let isMounted = true;

    const fetchHomeData = async () => {
      try {
        const [statesRes, settingsRes] = await Promise.allSettled([
          api.get('/states'),
          api.get('/settings'),
        ]);

        if (isMounted) {
          if (statesRes.status === 'fulfilled' && statesRes.value?.data?.states) {
            setDbStates(statesRes.value.data.states);
          }
          if (settingsRes.status === 'fulfilled' && settingsRes.value?.data?.settings) {
            setDbSettings(settingsRes.value.data.settings);
          }
        }
      } catch (err) {
        // Safe graceful fallback to curated data
      }
    };

    fetchHomeData();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/temples?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/temples');
    }
  };

  // States list filtered by region
  const filteredStates = useMemo(() => {
    const baseList = (dbStates && dbStates.length > 0) ? dbStates : HERITAGE_LOCATIONS;
    if (selectedRegion === 'All') return baseList.slice(0, 8);
    return baseList.filter(
      (s) => (s.region || '').toLowerCase() === selectedRegion.toLowerCase()
    ).slice(0, 8);
  }, [dbStates, selectedRegion]);

  return (
    <div className="home-divine-root">
      {/* Common Application Header with Sound, Notification, Language & Profile */}
      <Navbar />

      {/* ═════════════════════════════════════════════════════════════
          2. STUNNING HERO SECTION (Indian Temple Sunrise Backdrop)
          ═════════════════════════════════════════════════════════════ */}
      <section
        className="home-hero-section"
        style={{
          backgroundImage: `url(${homebg})`,
        }}
        aria-label="Welcome Hero Banner"
      >
        <div className="home-hero-overlay" />

        <div className="home-hero-container">
          <div className="home-hero-content">
            {/* Sacred Sanskrit Invocation Ribbon */}
            <div className="home-hero-shloka-ribbon">
              <span className="home-shloka-sparkle">✦</span>
              <span className="home-shloka-diya">🪔</span>
              <span className="home-shloka-text">
                ॥ एकं सद् विप्रा बहुधा वदन्ति • सत्यमेव जयते ॥
              </span>
              <span className="home-shloka-diya">🪔</span>
              <span className="home-shloka-sparkle">✦</span>
            </div>

            {/* Main Heading (Exact as requested) */}
            <h1 className="home-hero-heading">
              {dbSettings?.heroHeading ? (
                dbSettings.heroHeading.includes('Experience Bharat') ? (
                  <>
                    {dbSettings.heroHeading.split('Experience Bharat')[0]}
                    <br />
                    <span className="home-hero-heading-highlight">Experience Bharat.</span>
                  </>
                ) : (
                  dbSettings.heroHeading
                )
              ) : (
                <>
                  Discover the Divine. <br />
                  <span className="home-hero-heading-highlight">Experience Bharat.</span>
                </>
              )}
            </h1>

            {/* Subtitle (Exact as requested) */}
            <p className="home-hero-subtitle">
              {dbSettings?.heroSubtitle || "Explore India's sacred temples, timeless heritage, ancient traditions and spiritual wonders."}
            </p>

            {/* Integrated Search Box */}
            <form className="home-hero-search-box" role="search" onSubmit={handleSearchSubmit}>
              <FaSearch className="home-hero-search-icon" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search Sacred Temples, Jyotirlingas, Royal Forts, Heritage Places..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search temples, forts and heritage places"
              />
              <button type="submit" className="home-hero-search-btn">
                Search Sanctums
              </button>
            </form>

            {/* Quick Trending Pilgrimage Tags */}
            <div className="home-hero-trending">
              <span className="home-trending-label">Revered Pilgrimages:</span>
              <button onClick={() => navigate('/states/Gujarat')} className="home-tag-pill">
                Somnath
              </button>
              <button onClick={() => navigate('/states/Uttarakhand')} className="home-tag-pill">
                Kedarnath
              </button>
              <button onClick={() => navigate('/states/Tamil%20Nadu')} className="home-tag-pill">
                Meenakshi Amman
              </button>
              <button onClick={() => navigate('/states/Odisha')} className="home-tag-pill">
                Konark Sun Temple
              </button>
              <button onClick={() => navigate('/states/Karnataka')} className="home-tag-pill">
                Hampi Vijayanagara
              </button>
            </div>

            {/* Primary & Secondary Call to Actions */}
            <div className="home-hero-actions">
              <button
                className="home-hero-btn primary"
                onClick={() => navigate('/temples')}
              >
                <FaPray size={15} /> Explore Temples
              </button>
              <button
                className="home-hero-btn secondary"
                onClick={() => navigate('/heritage')}
              >
                <FaLandmark size={15} /> Discover Heritage
              </button>
            </div>
          </div>
        </div>

        {/* 4 Sacred Metrics Pill Banner */}
        <div className="home-metrics-bar">
          <div className="home-metrics-inner">
            <div className="home-metric-item">
              <span className="home-metric-icon">🔱</span>
              <div className="home-metric-text">
                <strong>12 Sacred Jyotirlingas</strong>
                <span>Eternal Shiva Shrines</span>
              </div>
            </div>
            <div className="home-metric-divider" />
            <div className="home-metric-item">
              <span className="home-metric-icon">🪷</span>
              <div className="home-metric-text">
                <strong>51 Shakti Peethas</strong>
                <span>Divine Mother Sanctuaries</span>
              </div>
            </div>
            <div className="home-metric-divider" />
            <div className="home-metric-item">
              <span className="home-metric-icon">⭐</span>
              <div className="home-metric-text">
                <strong>42 UNESCO Monuments</strong>
                <span>World Heritage Inscribed</span>
              </div>
            </div>
            <div className="home-metric-divider" />
            <div className="home-metric-item">
              <span className="home-metric-icon">🗺️</span>
              <div className="home-metric-text">
                <strong>36 States & UTs</strong>
                <span>One Spiritual Heartbeat</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          3. APPLICATION DASHBOARD WIDGETS: TEMPLE & HERITAGE
             Properly sized, prominent, clickable application cards
             (Direct 6 temple and 6 heritage previews removed)
          ═════════════════════════════════════════════════════════════ */}
      <section className="home-section home-portals-section" aria-label="Application Portals">
        <div className="home-section-container">
          <div className="home-section-header">
            <span className="home-section-badge">🪷 दिव्य प्रवेशद्वार • Application Gateways</span>
            <h2 className="home-section-title">Explore Sacred Bharat</h2>
            <p className="home-section-desc">
              Choose an application portal to explore India's sacred temple sanctums or majestic royal citadels and monumental heritage.
            </p>
          </div>

          <div className="home-portals-grid">
            {/* ── WIDGET 1: TEMPLE WIDGET ── */}
            <div
              className="home-portal-widget temple-widget"
              onClick={() => navigate('/temples')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') navigate('/temples'); }}
              aria-label="Open Temple Section"
            >
              <div className="home-widget-art-watermark" aria-hidden="true">
                <img src={templeArt} alt="" />
              </div>

              <div className="home-widget-top">
                <div className="home-widget-icon-medallion temple">
                  <span className="home-widget-emoji">🛕</span>
                </div>
                <span className="home-widget-tag">✦ Sacred Sanctums & Pilgrimages ✦</span>
              </div>

              <div className="home-widget-content">
                <h3 className="home-widget-title">Temples of Bharat</h3>
                <p className="home-widget-subtitle">
                  Ancient Mandirs, 12 Jyotirlingas, 51 Shakti Peethas & Sacred Architecture
                </p>
                <p className="home-widget-desc">
                  Explore sacred living temples across all 28 States and 8 Union Territories with verified darshan timings, sacred rituals, deity traditions, and regional pilgrimage routes.
                </p>

                <div className="home-widget-highlights">
                  <span className="home-widget-highlight-pill">12 Sacred Jyotirlingas</span>
                  <span className="home-widget-highlight-pill">51 Shakti Peethas</span>
                  <span className="home-widget-highlight-pill">Char Dham</span>
                  <span className="home-widget-highlight-pill">Dravidian & Nagara</span>
                </div>
              </div>

              <div className="home-widget-footer">
                <div className="home-widget-btn temple">
                  <span>Enter Temple Section</span>
                  <FaArrowRight className="home-widget-arrow" />
                </div>
              </div>
            </div>

            {/* ── WIDGET 2: HERITAGE WIDGET ── */}
            <div
              className="home-portal-widget heritage-widget"
              onClick={() => navigate('/heritage')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') navigate('/heritage'); }}
              aria-label="Open Heritage Section"
            >
              <div className="home-widget-art-watermark" aria-hidden="true">
                <img src={heritageArt} alt="" />
              </div>

              <div className="home-widget-top">
                <div className="home-widget-icon-medallion heritage">
                  <span className="home-widget-emoji">🏛️</span>
                </div>
                <span className="home-widget-tag">✦ Monumental Splendour & Citadels ✦</span>
              </div>

              <div className="home-widget-content">
                <h3 className="home-widget-title">Heritage of Bharat</h3>
                <p className="home-widget-subtitle">
                  UNESCO World Heritage, Imperial Forts, Stepwells & Living Traditions
                </p>
                <p className="home-widget-desc">
                  Discover monumental hill fortresses, rock-cut cave monuments, subterranean stepwells, and ancient university ruins across all 28 States and 8 Union Territories.
                </p>

                <div className="home-widget-highlights">
                  <span className="home-widget-highlight-pill">UNESCO World Heritage</span>
                  <span className="home-widget-highlight-pill">Imperial Hill Forts</span>
                  <span className="home-widget-highlight-pill">Subterranean Stepwells</span>
                  <span className="home-widget-highlight-pill">28 States & 8 UTs</span>
                </div>
              </div>

              <div className="home-widget-footer">
                <div className="home-widget-btn heritage">
                  <span>Enter Heritage Section</span>
                  <FaArrowRight className="home-widget-arrow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          5. SECTION C: EXPLORE STATES AND UNION TERRITORIES
          ═════════════════════════════════════════════════════════════ */}
      <section className="home-section home-states-section" aria-label="Explore States and UTs">
        <div className="home-section-container">
          <div className="home-section-header">
            <span className="home-section-badge">🗺️ भारत दर्शनम् • 28 States & 8 Territories</span>
            <h2 className="home-section-title">Explore Bharat by State & Region</h2>
            <p className="home-section-desc">
              Every State and Union Territory has a distinct cultural emblem, authentic architectural tradition, and revered teertha network.
            </p>
          </div>

          {/* Region Filter Strip */}
          <div className="home-region-tabs">
            {REGIONS.map((r) => (
              <button
                key={r}
                className={`home-region-tab ${selectedRegion === r ? 'active' : ''}`}
                onClick={() => setSelectedRegion(r)}
              >
                {r === 'All' ? '🇮🇳 All Regions' : r}
              </button>
            ))}
          </div>

          {/* States Cards Grid */}
          <div className="home-states-grid">
            {filteredStates.map((st) => {
              const theme = STATE_CULTURAL_THEMES[st.name];

              return (
                <div
                  key={st.name}
                  className="home-state-card"
                  onClick={() => navigate(`/states/${encodeURIComponent(st.name)}`)}
                >
                  <div className="home-state-card-top">
                    <div className="home-state-emblem-wrap">
                      <StateEmblemIcon stateName={st.name} />
                    </div>
                    <div className="home-state-info">
                      <span className="home-state-region-tag">{st.region} Bharat</span>
                      <h3 className="home-state-name">{st.name}</h3>
                      <p className="home-state-capital">
                        <FaMapMarkerAlt size={11} /> Capital: <strong>{st.capital}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="home-state-card-body">
                    {theme?.archStyle && (
                      <p className="home-state-arch">
                        <strong>Architecture:</strong> {theme.archStyle.split('&')[0]}
                      </p>
                    )}
                    <p className="home-state-desc">
                      {st.description?.slice(0, 110)}...
                    </p>
                  </div>

                  <div className="home-state-card-footer">
                    <span className="home-state-link">Explore Sacred Sanctums →</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="home-section-cta">
            <button className="home-cta-large-btn" onClick={() => navigate('/states')}>
              <FaCompass size={14} /> View All 36 States & Union Territories →
            </button>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          6. SECTION D: SPIRITUAL & CULTURAL HIGHLIGHTS (6 Pillars)
          ═════════════════════════════════════════════════════════════ */}
      <section className="home-section home-pillars-section" aria-label="Spiritual & Cultural Highlights">
        <div className="home-section-container">
          <div className="home-section-header">
            <span className="home-section-badge">🪔 सनातन संस्कृति • Living Pillars</span>
            <h2 className="home-section-title">Living Pillars of Indian Civilization</h2>
            <p className="home-section-desc">
              Immense spiritual depth, metaphysical wisdom, and vibrant traditions woven continuously across five millennia of living civilizational memory.
            </p>
          </div>

          <div className="home-pillars-grid">
            {LIVING_PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                className="home-pillar-card"
                onClick={() => navigate(pillar.link)}
                style={{ backgroundColor: '#ffffff' }}
              >
                <div className="home-pillar-icon-box" style={{ background: pillar.accent }}>
                  <span className="home-pillar-emoji">{pillar.icon}</span>
                </div>
                <div className="home-pillar-body">
                  <span className="home-pillar-sub">{pillar.subtitle}</span>
                  <h3 className="home-pillar-title">{pillar.title}</h3>
                  <p className="home-pillar-desc">{pillar.desc}</p>
                  <span className="home-pillar-link">Immerse Deeper →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          7. SECTION E: INTERACTIVE CURRICULUM & QUIZ CHALLENGE
          ═════════════════════════════════════════════════════════════ */}
      <section className="home-section home-learning-section" aria-label="Learning & Quizzes">
        <div className="home-section-container">
          <div className="home-learning-dual-banner">
            {/* Learning Curriculum Card */}
            <div className="home-learning-card learning">
              <div className="home-learning-card-top">
                <span className="home-learning-pill">📚 Structured Heritage Education</span>
                <div className="home-learning-icon-circle">📖</div>
              </div>
              <h3>Explore Heritage Curriculum</h3>
              <p>
                Engage with structured, lesson-based modules covering ancient temple architecture, classical shastras, and royal citadels. Complete quizzes and download verified study dossiers.
              </p>
              <button
                className="home-learning-btn primary"
                onClick={() => navigate('/learning')}
              >
                <FaBook size={13} /> Start Heritage Lessons
              </button>
            </div>

            {/* Quiz Challenge Card */}
            <div className="home-learning-card quiz">
              <div className="home-learning-card-top">
                <span className="home-learning-pill quiz">🎯 Knowledge Challenge</span>
                <div className="home-learning-icon-circle quiz">🏆</div>
              </div>
              <h3>Interactive Pilgrimage Quizzes</h3>
              <p>
                Test your knowledge of the 12 Jyotirlingas, 51 Shakti Peethas, Chola stonecraft, and Harappan heritage. Challenge peers and earn your DivyaBharat Cultural Scholar Badge!
              </p>
              <button
                className="home-learning-btn secondary"
                onClick={() => navigate('/quiz')}
              >
                <FaQuestionCircle size={13} /> Take Heritage Quiz
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          8. SACRED INVOCATION BANNER & FOOTER
          ═════════════════════════════════════════════════════════════ */}
      <section className="home-invocation-banner">
        <div className="home-invocation-inner">
          <div className="home-invocation-flower">🪷</div>
          <p className="home-invocation-sanskrit">
            ॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः । सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत् ॥
          </p>
          <p className="home-invocation-trans">
            "May all beings everywhere be happy and peaceful. May all be free from illness. May all see what is auspicious. May no one suffer."
          </p>
          <div className="home-invocation-btns">
            <button className="home-invoc-btn primary" onClick={() => navigate('/temples')}>
              <FaPray size={13} /> Begin Temple Pilgrimage
            </button>
            <button className="home-invoc-btn secondary" onClick={() => navigate('/heritage')}>
              <FaLandmark size={13} /> Explore Royal Heritage
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
