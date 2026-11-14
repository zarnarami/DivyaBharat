// src/pages/AboutPage.js — DivyaBharat Divine About Us Experience
// Soft Pastel Divine Theme celebrating India's sacred beauty, peace, and eternal heritage

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './AboutPage.css';
import api from '../services/api';

// Assets
import logo from '../assets/logo.png';
import homebg from '../assets/homebg.png';
import templeArt from '../assets/temple.png';

// React Icons
import {
  FaPray,
  FaLandmark,
  FaCompass,
  FaBookOpen,
  FaOm,
  FaHandsHelping,
  FaUsers,
  FaMapMarkedAlt,
  FaArrowRight,
} from 'react-icons/fa';

export default function AboutPage() {
  const navigate = useNavigate();

  // Dynamic MongoDB settings and stats
  const [dbSettings, setDbSettings] = useState(null);
  const [stateCount, setStateCount] = useState(36);
  const [templeCount, setTempleCount] = useState(18);
  const [heritageCount, setHeritageCount] = useState(18);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Fetch live backend settings & counts if available
    let isMounted = true;
    const fetchPortalStats = async () => {
      try {
        const [settingsRes, statesRes, templesRes, heritageRes] = await Promise.allSettled([
          api.get('/settings'),
          api.get('/states'),
          api.get('/temples'),
          api.get('/heritage'),
        ]);

        if (isMounted) {
          if (settingsRes.status === 'fulfilled' && settingsRes.value?.data?.settings) {
            setDbSettings(settingsRes.value.data.settings);
          }
          if (statesRes.status === 'fulfilled' && statesRes.value?.data?.states) {
            setStateCount(statesRes.value.data.states.length || 36);
          }
          if (templesRes.status === 'fulfilled' && templesRes.value?.data?.total !== undefined) {
            setTempleCount(templesRes.value.data.total || 18);
          }
          if (heritageRes.status === 'fulfilled' && heritageRes.value?.data?.total !== undefined) {
            setHeritageCount(heritageRes.value.data.total || 18);
          }
        }
      } catch (e) {
        // Safe graceful fallback to default verified values
      }
    };

    fetchPortalStats();

    return () => {
      isMounted = false;
    };
  }, []);

  // 6 Core Mission Pillars
  const MISSION_PILLARS = [
    {
      id: 'mission-awareness',
      icon: <FaPray />,
      title: "Temple & Heritage Awareness",
      desc: "Promote awareness of India's ancient temples, timeless stone architecture, sacred sanctums, and living spiritual heritage across the globe.",
      accent: "#FBE5D8",
    },
    {
      id: 'mission-pilgrimage',
      icon: <FaCompass />,
      title: "Reliable Pilgrimage Guidance",
      desc: "Provide accurate, verified information about sacred pilgrimage destinations, routes, darshan timings, and meaningful spiritual travel advice.",
      accent: "#EAE3F2",
    },
    {
      id: 'mission-traditions',
      icon: <FaOm />,
      title: "Preserve Living Traditions",
      desc: "Preserve, document, and celebrate timeless Indian traditions, Vedic rituals, daily pujas, and joyous seasonal festivals for generations to come.",
      accent: "#FFF3E8",
    },
    {
      id: 'mission-knowledge',
      icon: <FaBookOpen />,
      title: "Universal Cultural Knowledge",
      desc: "Make cultural, architectural, and historical knowledge accessible, transparent, and engaging for pilgrims, students, and explorers everywhere.",
      accent: "#E5EBDD",
    },
    {
      id: 'mission-learning',
      icon: <FaUsers />,
      title: "Inspire Heritage Learning",
      desc: "Encourage interactive heritage learning, self-paced modules, and enlightening quizzes to nurture cultural pride among youth and students.",
      accent: "#F4DDE0",
    },
    {
      id: 'mission-diversity',
      icon: <FaHandsHelping />,
      title: "Connect Diverse Identities",
      desc: "Connect people across regions through the rich tapestry of India's regional arts, linguistic traditions, and spiritual unity in diversity.",
      accent: "#F5E9DC",
    },
  ];

  // 5 Pillars of "Why DivyaBharat?"
  const WHY_DIVYABHARAT = [
    {
      num: '01',
      title: 'Temple Discovery',
      badge: 'Sacred Sanctums',
      desc: 'Explore sacred temples across India — from ancient Himalayan shrines and oceanfront Jyotirlingas to towering Dravidian gopurams.',
      action: '/temples',
      btnText: 'Explore Temples →',
      icon: <FaPray />,
      color: '#FBE5D8',
    },
    {
      num: '02',
      title: 'Heritage Exploration',
      badge: 'Living History',
      desc: 'Discover UNESCO World Heritage monuments, royal hill citadels, subterranean stepwells, and ancient international monastic universities.',
      action: '/heritage',
      btnText: 'Discover Heritage →',
      icon: <FaLandmark />,
      color: '#F4DDE0',
    },
    {
      num: '03',
      title: 'State-wise Discovery',
      badge: '36 States & UTs',
      desc: 'Explore the distinct spiritual, cultural, and architectural identity of every Indian State and Union Territory from Kashmir to Kanyakumari.',
      action: '/states',
      btnText: 'Explore States →',
      icon: <FaMapMarkedAlt />,
      color: '#E5EBDD',
    },
    {
      num: '04',
      title: 'Cultural Learning',
      badge: 'Wisdom & Traditions',
      desc: 'Understand living Vedic traditions, seasonal festive calendars, temple architecture shastras, and profound civilizational values.',
      action: '/learning',
      btnText: 'Start Learning →',
      icon: <FaBookOpen />,
      color: '#EAE3F2',
    },
    {
      num: '05',
      title: 'Pilgrimage Information',
      badge: 'Sacred Travel',
      desc: 'Discover essential pilgrimage travel guidance, holy parikrama routes, seasonal weather insights, and reverent travel etiquette.',
      action: '/temples',
      btnText: 'Plan Pilgrimage →',
      icon: <FaCompass />,
      color: '#F5E9DC',
    },
  ];

  // 4 Dimensions of Unity in Diversity
  const UNITY_DIMENSIONS = [
    {
      title: 'Sacred Architecture',
      subtitle: 'Nagara, Dravidian & Vesara',
      desc: 'Cosmic mandalas manifested in stone, from the soaring spires of the North to the majestic sculptured gopurams of the South.',
      icon: '🛕',
      accent: '#FBE5D8',
    },
    {
      title: 'Regional Traditions',
      subtitle: 'Vedic Rites & Daily Seva',
      desc: 'Daily arti, temple seva, sacred oblations, and living community rituals transmitted unbroken through thousands of years.',
      icon: '🪔',
      accent: '#FFF3E8',
    },
    {
      title: 'Sacred Festivals',
      subtitle: 'Kumbh, Diwali & Navratri',
      desc: 'Joyous cosmic alignments and festive gatherings that celebrate the victory of light, knowledge, and righteous dharma.',
      icon: '🎊',
      accent: '#F4DDE0',
    },
    {
      title: 'Classical Performing Arts',
      subtitle: 'Natya, Ragas & Mudras',
      desc: 'Classical dance and sacred music traditions expressing transcendent divine devotion through rhythm, melody, and narrative.',
      icon: '🎭',
      accent: '#EAE3F2',
    },
  ];

  return (
    <div className="about-page-container">
      <Navbar />

      {/* ═════════════════════════════════════════════════════════════
          1. STUNNING HERO SECTION (Sacred Temple Sunrise Backdrop)
          ═════════════════════════════════════════════════════════════ */}
      <section
        className="about-hero-section"
        style={{ backgroundImage: `url(${homebg})` }}
        aria-label="About DivyaBharat Banner"
      >
        <div className="about-hero-overlay" aria-hidden="true" />

        <div className="about-hero-content">
          {/* Sacred Invocation Ribbon */}
          <div className="about-shloka-ribbon">
            <span className="about-shloka-spark">✦</span>
            <span className="about-shloka-diya">🪔</span>
            <span className="about-shloka-text">
              ॥ सत्यं शिवं सुन्दरम् • वसुधैव कुटुम्बकम् ॥
            </span>
            <span className="about-shloka-diya">🪔</span>
            <span className="about-shloka-spark">✦</span>
          </div>

          {/* Main Heading (Exact as requested) */}
          <h1 className="about-hero-heading">About DivyaBharat</h1>

          {/* Subtitle Pill (Exact as requested) */}
          <div className="about-hero-tagline-wrap">
            <p className="about-hero-tagline">
              {dbSettings?.tagline || 'Rooted in Culture, United in Spirit.'}
            </p>
          </div>

          {/* Supporting Text (Exact as requested) */}
          <p className="about-hero-supporting">
            Discover the spiritual beauty, timeless traditions, magnificent temples, and extraordinary heritage of India.
          </p>

          {/* Quick Action Navigation */}
          <div className="about-hero-actions">
            <button
              className="about-btn-primary"
              onClick={() => navigate('/temples')}
            >
              Explore Sacred Temples <FaArrowRight />
            </button>
            <button
              className="about-btn-secondary"
              onClick={() => navigate('/heritage')}
            >
              Discover Cultural Heritage
            </button>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          2. OUR STORY SECTION (Illuminated Narrative & Art)
          ═════════════════════════════════════════════════════════════ */}
      <section className="about-story-section" aria-label="Our Story">
        <div className="about-story-container">
          <div className="about-section-header">
            <div className="about-lotus-divider" aria-hidden="true">
              <span className="about-sparkle">✦</span>
              <span className="about-divider-line" />
              <span className="about-lotus-icon">🪷</span>
              <span className="about-divider-line" />
              <span className="about-sparkle">✦</span>
            </div>
            <h2 className="about-section-title">Our Story</h2>
            <p className="about-section-subtitle">
              A sacred digital chronicle dedicated to the eternal soul of Bharat
            </p>
          </div>

          <div className="about-story-grid">
            {/* Story Visual Card */}
            <div className="about-story-visual-wrap">
              <div className="about-story-art-card">
                <div className="about-art-emblem">
                  <img src={logo} alt="DivyaBharat" className="about-art-logo" />
                </div>
                <div className="about-art-illustration">
                  <img src={templeArt} alt="Temple Sanctum Art" className="about-temple-img" />
                </div>
                <div className="about-art-caption">
                  <span className="about-caption-badge">5000+ Years of Heritage</span>
                  <h4>Living Civilizational Continuity</h4>
                  <p>Preserving sacred memory from the Vedic era to the modern age.</p>
                </div>
              </div>
            </div>

            {/* Story Text Content (Exact as requested) */}
            <div className="about-story-text-wrap">
              <div className="about-story-paragraph-card">
                <p className="about-story-paragraph lead">
                  DivyaBharat is a digital journey dedicated to discovering and celebrating India's spiritual, cultural, and historical richness.
                </p>
                <p className="about-story-paragraph">
                  From ancient temples and sacred pilgrimage destinations to magnificent monuments, traditional festivals, and timeless cultural practices, DivyaBharat brings India's extraordinary heritage together in one place.
                </p>
                <p className="about-story-paragraph closing">
                  Our aim is to make India's divine and cultural legacy accessible to everyone.
                </p>
              </div>

              {/* Three Value Pillars */}
              <div className="about-story-features">
                <div className="about-story-feat-item">
                  <div className="about-feat-icon">🛕</div>
                  <div>
                    <h5>Sacred Sanctums</h5>
                    <p>Millennia of sacred architecture proportioned by Shilpa & Vastu Shastras.</p>
                  </div>
                </div>
                <div className="about-story-feat-item">
                  <div className="about-feat-icon">🏰</div>
                  <div>
                    <h5>Monumental Citadels</h5>
                    <p>Fortresses, rock-cut wonders, stepwells, and ancient learning universities.</p>
                  </div>
                </div>
                <div className="about-story-feat-item">
                  <div className="about-feat-icon">🌸</div>
                  <div>
                    <h5>Living Traditions</h5>
                    <p>Daily pujas, sacred chants, festival alignments, and eternal community seva.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          3. OUR VISION SECTION (Full-Width Sacred Card)
          ═════════════════════════════════════════════════════════════ */}
      <section className="about-vision-section" aria-label="Our Vision">
        <div className="about-vision-container">
          <div className="about-vision-card">
            <div className="about-vision-emblem" aria-hidden="true">
              <span className="about-vision-om">ॐ</span>
            </div>
            <div className="about-lotus-divider compact" aria-hidden="true">
              <span className="about-sparkle">✦</span>
              <span className="about-divider-line" />
              <span className="about-lotus-icon">🪷</span>
              <span className="about-divider-line" />
              <span className="about-sparkle">✦</span>
            </div>
            <h2 className="about-vision-heading">Our Vision</h2>
            {/* Vision Text (Exact as requested) */}
            <p className="about-vision-body">
              "To create a meaningful digital platform that connects people with India's spiritual roots, cultural identity, and historical treasures while inspiring future generations to appreciate and preserve our heritage."
            </p>
            <div className="about-vision-footer-motto">
              <span>✦</span> Preserving Sacred Memory • Inspiring Devotion • Uniting Hearts <span>✦</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          4. OUR MISSION SECTION (6 Distinct Cards with Icons)
          ═════════════════════════════════════════════════════════════ */}
      <section className="about-mission-section" aria-label="Our Mission">
        <div className="about-mission-container">
          <div className="about-section-header">
            <div className="about-lotus-divider" aria-hidden="true">
              <span className="about-sparkle">✦</span>
              <span className="about-divider-line" />
              <span className="about-lotus-icon">🪷</span>
              <span className="about-divider-line" />
              <span className="about-sparkle">✦</span>
            </div>
            <h2 className="about-section-title">Our Mission</h2>
            <p className="about-section-subtitle">
              Six foundational commitments guiding every facet of the DivyaBharat initiative
            </p>
          </div>

          <div className="about-mission-grid">
            {MISSION_PILLARS.map((m, idx) => (
              <div
                key={m.id}
                className="about-mission-card"
                style={{ '--card-accent': m.accent }}
              >
                <div className="about-mission-top">
                  <div className="about-mission-icon-box" style={{ background: m.accent }}>
                    {m.icon}
                  </div>
                  <span className="about-mission-number">0{idx + 1}</span>
                </div>
                <h3 className="about-mission-card-title">{m.title}</h3>
                <p className="about-mission-card-desc">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          5. WHY DIVYABHARAT? SECTION (5 Core Pillars)
          ═════════════════════════════════════════════════════════════ */}
      <section className="about-why-section" aria-label="Why DivyaBharat">
        <div className="about-why-container">
          <div className="about-section-header">
            <div className="about-lotus-divider" aria-hidden="true">
              <span className="about-sparkle">✦</span>
              <span className="about-divider-line" />
              <span className="about-lotus-icon">🪷</span>
              <span className="about-divider-line" />
              <span className="about-sparkle">✦</span>
            </div>
            <h2 className="about-section-title">Why DivyaBharat?</h2>
            <p className="about-section-subtitle">
              A comprehensive digital sanctuary crafted for pilgrims, tourists, students, and culture seekers
            </p>
          </div>

          <div className="about-why-grid">
            {WHY_DIVYABHARAT.map((w) => (
              <div
                key={w.num}
                className="about-why-card"
                onClick={() => navigate(w.action)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') navigate(w.action); }}
              >
                <div className="about-why-card-header">
                  <span className="about-why-num">{w.num}</span>
                  <div className="about-why-icon-bubble" style={{ background: w.color }}>
                    {w.icon}
                  </div>
                </div>
                <span className="about-why-badge">{w.badge}</span>
                <h3 className="about-why-card-title">{w.title}</h3>
                <p className="about-why-card-desc">{w.desc}</p>
                <div className="about-why-card-action">
                  <span>{w.btnText}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          6. INDIA'S UNITY IN DIVERSITY (One Nation • Many Cultures)
          ═════════════════════════════════════════════════════════════ */}
      <section className="about-unity-section" aria-label="India's Unity in Diversity">
        <div className="about-unity-container">
          <div className="about-section-header">
            <div className="about-lotus-divider" aria-hidden="true">
              <span className="about-sparkle">✦</span>
              <span className="about-divider-line" />
              <span className="about-lotus-icon">🪷</span>
              <span className="about-divider-line" />
              <span className="about-sparkle">✦</span>
            </div>
            <h2 className="about-section-title">India's Unity in Diversity</h2>
            <div className="about-motto-pill">
              <span>✦</span> One Nation. Many Cultures. Infinite Stories. <span>✦</span>
            </div>
            <p className="about-section-subtitle">
              Spanning across 28 States and 8 Union Territories — united by eternal dharmic values and civilizational harmony
            </p>
          </div>

          {/* 4 Cultural Pillars */}
          <div className="about-unity-grid">
            {UNITY_DIMENSIONS.map((u, i) => (
              <div key={i} className="about-unity-card">
                <div className="about-unity-icon">{u.icon}</div>
                <h3 className="about-unity-card-title">{u.title}</h3>
                <span className="about-unity-card-sub">{u.subtitle}</span>
                <p className="about-unity-card-desc">{u.desc}</p>
              </div>
            ))}
          </div>

          {/* Dynamic National Stats Strip */}
          <div className="about-stats-strip">
            <div className="about-stat-box" onClick={() => navigate('/states')} role="button" tabIndex={0}>
              <span className="about-stat-number">{stateCount}</span>
              <span className="about-stat-label">States & UTs Documented</span>
              <span className="about-stat-sub">Across all 4 geographical zones of Bharat</span>
            </div>
            <div className="about-stat-divider" />
            <div className="about-stat-box" onClick={() => navigate('/temples')} role="button" tabIndex={0}>
              <span className="about-stat-number">{templeCount}+</span>
              <span className="about-stat-label">Sacred Temples & Shrines</span>
              <span className="about-stat-sub">12 Jyotirlingas, 4 Dhams & Devi Mandirs</span>
            </div>
            <div className="about-stat-divider" />
            <div className="about-stat-box" onClick={() => navigate('/heritage')} role="button" tabIndex={0}>
              <span className="about-stat-number">{heritageCount}+</span>
              <span className="about-stat-label">Monumental Citadels & Heritage Sites</span>
              <span className="about-stat-sub">UNESCO Monuments, Stepwells & Forts</span>
            </div>
            <div className="about-stat-divider" />
            <div className="about-stat-box" onClick={() => navigate('/learning')} role="button" tabIndex={0}>
              <span className="about-stat-number">5000+</span>
              <span className="about-stat-label">Years of Living Continuity</span>
              <span className="about-stat-sub">Timeless Dharmic & Civilizational Legacy</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          7. BEAUTIFUL CLOSING SECTION (Call to Action)
          ═════════════════════════════════════════════════════════════ */}
      <section
        className="about-closing-cta-section"
        style={{ backgroundImage: `url(${homebg})` }}
        aria-label="Experience Bharat"
      >
        <div className="about-closing-overlay" aria-hidden="true" />

        <div className="about-closing-card">
          <div className="about-closing-om" aria-hidden="true">ॐ</div>
          <div className="about-lotus-divider compact" aria-hidden="true">
            <span className="about-sparkle">✦</span>
            <span className="about-divider-line" />
            <span className="about-lotus-icon">🪷</span>
            <span className="about-divider-line" />
            <span className="about-sparkle">✦</span>
          </div>

          {/* Main Closing Heading (Exact as requested) */}
          <h2 className="about-closing-heading">
            Discover the Divine. <br />
            <span className="about-closing-heading-highlight">Experience Bharat.</span>
          </h2>

          {/* Supporting Text (Exact as requested) */}
          <p className="about-closing-supporting">
            Every temple tells a story. Every tradition carries a legacy. Every corner of Bharat holds a timeless discovery.
          </p>

          {/* Elegant Explore Button (Exact as requested) */}
          <div className="about-closing-actions">
            <button
              className="about-btn-cta"
              onClick={() => navigate('/home')}
            >
              Explore DivyaBharat →
            </button>
            <button
              className="about-btn-cta-secondary"
              onClick={() => navigate('/temples')}
            >
              Sacred Temples
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
