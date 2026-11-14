// src/TemplePage.js — DivyaBharat Divine Temple & Pilgrimage Explorer
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "./services/api";
import { useLanguage } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import StateEmblemIcon from "./components/StateEmblemIcon";
import { STATE_CULTURAL_THEMES } from "./data/stateCulturalThemes";
import "./TemplePage.css";

import logo from "./assets/logo.png";

import {
  FaBroadcastTower,
  FaHandHoldingHeart,
  FaOm,
  FaCalendarAlt,
  FaSearch,
  FaMicrophone,
  FaArrowLeft,
  FaArrowRight,
  FaPray,
  FaCompass,
} from "react-icons/fa";

const INDIAN_STATES = [
  { name: "Andhra Pradesh",    temples: "Tirupati Balaji, Srikalahasti, Kanaka Durga, Lepakshi", tradition: "dravidian" },
  { name: "Arunachal Pradesh", temples: "Tawang Monastery, Malinithan, Parasuram Kund", tradition: "himalayan" },
  { name: "Assam",             temples: "Kamakhya Shakti Peeth, Umananda, Navagraha, Basistha", tradition: "shakti" },
  { name: "Bihar",             temples: "Mahabodhi Temple, Vishnupad, Mundeshwari, Patan Devi", tradition: "nagara" },
  { name: "Chhattisgarh",      temples: "Bhoramdeo, Danteshwari, Rajim Rajiv Lochan, Sirpur Laxman", tradition: "nagara" },
  { name: "Goa",               temples: "Mangeshi, Shanta Durga, Mahalasa Narayani, Tambdi Surla", tradition: "nagara" },
  { name: "Gujarat",           temples: "Somnath Jyotirlinga, Dwarkadhish, Sun Temple Modhera, Ambaji", tradition: "jyotirlinga" },
  { name: "Haryana",           temples: "Brahma Sarovar Kurukshetra, Mata Mansa Devi, Jyotisar", tradition: "nagara" },
  { name: "Himachal Pradesh",  temples: "Jwalamukhi Shakti Peeth, Hidimba Devi, Baijnath, Chamunda", tradition: "himalayan" },
  { name: "Jharkhand",         temples: "Baidyanath Jyotirlinga, Basukinath, Rajrappa Chhinnamasta", tradition: "jyotirlinga" },
  { name: "Karnataka",         temples: "Virupaksha Hampi, Udupi Krishna, Belur Chennakeshava, Murudeshwar", tradition: "dravidian" },
  { name: "Kerala",            temples: "Padmanabhaswamy, Guruvayur, Sabarimala Ayyappa, Vadakkumnathan", tradition: "dravidian" },
  { name: "Madhya Pradesh",    temples: "Mahakaleshwar Jyotirlinga, Omkareshwar, Khajuraho Western Group", tradition: "jyotirlinga" },
  { name: "Maharashtra",       temples: "Trimbakeshwar, Bhimashankar, Ghrishneshwar, Pandharpur Vitthal", tradition: "jyotirlinga" },
  { name: "Manipur",           temples: "Shri Govindaji, Mahabali Temple, Sanamahi Kiyong", tradition: "nagara" },
  { name: "Meghalaya",         temples: "Nartiang Durga Shakti Peeth, Mahadev Khola, Balpakram", tradition: "shakti" },
  { name: "Mizoram",           temples: "Solomon's Temple, Shiv Mandir Aizawl, Chhingpuii", tradition: "himalayan" },
  { name: "Nagaland",          temples: "Dimapur Kalibari, Kohima Jain Temple, Dzukou Valley", tradition: "himalayan" },
  { name: "Odisha",            temples: "Jagannath Puri, Konark Sun Temple, Lingaraj, Biraja", tradition: "nagara" },
  { name: "Punjab",            temples: "Sri Harmandir Sahib (Golden Temple), Durgiana Mandir, Ram Tirath", tradition: "nagara" },
  { name: "Rajasthan",         temples: "Brahma Temple Pushkar, Shrinathji Nathdwara, Eklingji, Dilwara", tradition: "nagara" },
  { name: "Sikkim",            temples: "Rumtek Monastery, Pemayangtse, Kirateshwar Muktidham", tradition: "himalayan" },
  { name: "Tamil Nadu",        temples: "Meenakshi Amman, Brihadeeswarar, Ramanathaswamy Jyotirlinga, Srirangam", tradition: "dravidian" },
  { name: "Telangana",         temples: "Ramappa (UNESCO), Yadagirigutta, Thousand Pillar, Bhadrachalam", tradition: "dravidian" },
  { name: "Tripura",           temples: "Tripura Sundari Shakti Peeth, Unakoti Rock Sculptures, Kasba", tradition: "shakti" },
  { name: "Uttar Pradesh",     temples: "Kashi Vishwanath Jyotirlinga, Ayodhya Ram Mandir, Vrindavan, Mathura", tradition: "jyotirlinga" },
  { name: "Uttarakhand",       temples: "Kedarnath Jyotirlinga, Badrinath, Gangotri, Yamunotri, Jageshwar", tradition: "jyotirlinga" },
  { name: "West Bengal",       temples: "Dakshineswar Kali, Kalighat Shakti Peeth, Tarapith, Belur Math", tradition: "shakti" },
];

const UNION_TERRITORIES = [
  { name: "Andaman and Nicobar Islands", temples: "Sri Vetrimalai Murugan, Coastal Shrines", tradition: "coastal" },
  { name: "Chandigarh", temples: "Chandi Devi Mandir, ISKCON Chandigarh, Mansa Foothills", tradition: "nagara" },
  { name: "Dadra and Nagar Haveli and Daman and Diu", temples: "Somnath Mahadev Daman, Gangeshwar Mahadev Diu", tradition: "coastal" },
  { name: "Delhi", temples: "Swaminarayan Akshardham, Kalkaji Temple, Birla Mandir, Lotus Temple", tradition: "nagara" },
  { name: "Jammu and Kashmir", temples: "Mata Vaishno Devi, Amarnath Holy Cave, Shankaracharya", tradition: "himalayan" },
  { name: "Ladakh", temples: "Thiksey Monastery, Hemis Gompa, Diskit Nubra, Alchi Choskor", tradition: "himalayan" },
  { name: "Lakshadweep", temples: "Ujra Coral Shrines, Mohiddin Mosque, Marine Heritage Shrines", tradition: "coastal" },
  { name: "Puducherry", temples: "Sri Manakula Vinayagar, Auroville Matrimandir, Varadaraja Perumal", tradition: "dravidian" },
];

const PILGRIMAGE_CATEGORIES = [
  { id: "all", label: "All Sacred Sanctums", icon: "🛕", desc: "All 28 States & 8 Union Territories" },
  { id: "jyotirlinga", label: "12 Jyotirlingas", icon: "🔱", desc: "Most Sacred Shiva Shrines" },
  { id: "shakti", label: "Shakti Peethas", icon: "🪷", desc: "Divine Mother Manifestations" },
  { id: "dravidian", label: "Dravidian Gopurams", icon: "👑", desc: "Soaring Pyramidal Vimanas" },
  { id: "nagara", label: "Nagara Shikharas", icon: "🏛️", desc: "Curvilinear Mountain Spire Temples" },
  { id: "himalayan", label: "Himalayan Shrines", icon: "🏔️", desc: "Devbhumi & High-Altitude Pilgrimages" },
];

function TempleEmblemIcon({ stateName }) {
  return (
    <div className="temple-card-emblem-wrap">
      <StateEmblemIcon stateName={stateName} />
    </div>
  );
}

export default function TemplePage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [statesList, setStatesList] = useState(INDIAN_STATES);
  const [utsList, setUtsList] = useState(UNION_TERRITORIES);

  useEffect(() => {
    let isMounted = true;
    const fetchLocations = async () => {
      try {
        const { data } = await api.get('/states');
        if (data && data.success && Array.isArray(data.states) && data.states.length > 0) {
          const dbStates = data.states.filter(s => !s.isUT);
          const dbUTs = data.states.filter(s => s.isUT);
          if (isMounted) {
            if (dbStates.length > 0) {
              setStatesList(prev => prev.map(s => {
                const found = dbStates.find(d => d.name.toLowerCase() === s.name.toLowerCase());
                return found ? { ...s, ...found, tradition: s.tradition } : s;
              }));
            }
            if (dbUTs.length > 0) {
              setUtsList(prev => prev.map(u => {
                const found = dbUTs.find(d => d.name.toLowerCase() === u.name.toLowerCase());
                return found ? { ...u, ...found, tradition: u.tradition } : u;
              }));
            }
          }
        }
      } catch (err) {
        // Safe fallback
      }
    };
    fetchLocations();
    return () => { isMounted = false; };
  }, []);

  const query = search.trim().toLowerCase();

  const filteredStates = useMemo(() => {
    return statesList.filter((s) => {
      const matchesSearch =
        !query ||
        s.name.toLowerCase().includes(query) ||
        (s.temples && s.temples.toLowerCase().includes(query)) ||
        (STATE_CULTURAL_THEMES[s.name]?.divineTitle?.toLowerCase().includes(query));

      const matchesCat =
        selectedCategory === "all" ||
        s.tradition === selectedCategory ||
        (selectedCategory === "jyotirlinga" && ["Gujarat", "Maharashtra", "Madhya Pradesh", "Uttar Pradesh", "Uttarakhand", "Jharkhand", "Tamil Nadu", "Andhra Pradesh"].includes(s.name)) ||
        (selectedCategory === "shakti" && ["Assam", "West Bengal", "Himachal Pradesh", "Tripura", "Gujarat", "Jammu and Kashmir", "Odisha", "Meghalaya"].includes(s.name));

      return matchesSearch && matchesCat;
    });
  }, [statesList, query, selectedCategory]);

  const filteredUTs = useMemo(() => {
    return utsList.filter((u) => {
      const matchesSearch =
        !query ||
        u.name.toLowerCase().includes(query) ||
        (u.temples && u.temples.toLowerCase().includes(query)) ||
        (STATE_CULTURAL_THEMES[u.name]?.divineTitle?.toLowerCase().includes(query));

      const matchesCat =
        selectedCategory === "all" ||
        u.tradition === selectedCategory ||
        (selectedCategory === "himalayan" && ["Jammu and Kashmir", "Ladakh"].includes(u.name)) ||
        (selectedCategory === "dravidian" && ["Puducherry"].includes(u.name));

      return matchesSearch && matchesCat;
    });
  }, [utsList, query, selectedCategory]);

  const totalResults = filteredStates.length + filteredUTs.length;

  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = "en-IN";
        recognition.onresult = (e) => {
          if (e.results[0][0].transcript) {
            setSearch(e.results[0][0].transcript);
          }
        };
        recognition.start();
      } catch (err) {}
    }
  };

  return (
    <div className="temple-page divine-temple-theme">
      {/* Common Header with Sound, Notification, Language & Profile */}
      <Navbar />

      {/* DIVINE ATMOSPHERIC BACKDROP */}
      <div className="temple-page-bg-overlay" aria-hidden="true" />
      <div className="temple-sacred-rays-overlay" aria-hidden="true" />

      {/* BACKDROP OVERLAY WHEN DRAWER IS OPEN */}
      {sidebarOpen && (
        <div
          className="temple-drawer-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        />
      )}

      {/* COLLAPSIBLE SIDEBAR / DRAWER */}
      <aside
        className={`temple-page-sidebar ${sidebarOpen ? "open" : ""}`}
        aria-label="Temple features"
      >
        <div className="temple-sidebar-header-row">
          <div
            className="temple-page-logo-section"
            onClick={() => {
              setSidebarOpen(false);
              navigate("/home");
            }}
            role="button"
            tabIndex={0}
          >
            <img src={logo} alt="DivyaBharat logo" />
            <div className="temple-page-logo-text">
              <h2>DivyaBharat</h2>
              <p>Rooted in Culture</p>
            </div>
          </div>

          <button
            type="button"
            className="temple-drawer-close-btn"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
            title="Close Menu"
          >
            ✕
          </button>
        </div>

        <ul className="temple-page-sidebar-menu">
          <li
            onClick={() => {
              setSidebarOpen(false);
              navigate("/home");
            }}
            className="temple-sidebar-item back-home"
          >
            <FaArrowLeft aria-hidden="true" />
            <span>Back to Home</span>
          </li>
          <li className="temple-sidebar-item" onClick={() => { setSidebarOpen(false); navigate("/heritage"); }}>
            <FaCompass aria-hidden="true" />
            <span>Heritage Places</span>
          </li>
          <li className="temple-sidebar-item" onClick={() => setSidebarOpen(false)}>
            <FaBroadcastTower aria-hidden="true" />
            <span>Live Aarti & Darshan</span>
          </li>
          <li className="temple-sidebar-item" onClick={() => setSidebarOpen(false)}>
            <FaHandHoldingHeart aria-hidden="true" />
            <span>Seva & Donation</span>
          </li>
          <li className="temple-sidebar-item" onClick={() => setSidebarOpen(false)}>
            <FaOm aria-hidden="true" />
            <span>Pooja Booking</span>
          </li>
          <li className="temple-sidebar-item" onClick={() => setSidebarOpen(false)}>
            <FaCalendarAlt aria-hidden="true" />
            <span>Sacred Hindu Calendar</span>
          </li>
        </ul>

        {/* SIDEBAR SPIRITUAL BLESSING */}
        <div className="temple-sidebar-footer-card">
          <span className="temple-sidebar-diya">🪔</span>
          <p className="temple-sidebar-shloka">
            "सत्यं ज्ञानमनन्तं ब्रह्म"
          </p>
          <span className="temple-sidebar-motto">May your pilgrimage bring eternal peace & divinity.</span>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="temple-page-main-content">
        {/* TOP BAR: HAMBURGER TOGGLE + SEARCH BOX */}
        <div className="temple-top-bar">
          <button
            type="button"
            className="temple-hamburger-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? "Close menu" : "Open menu"}
            aria-expanded={sidebarOpen}
            title="Toggle Menu"
          >
            <span className="temple-hamburger-lines" aria-hidden="true">
              ☰
            </span>
          </button>

          <div className="temple-page-search-box" role="search">
            <FaSearch className="temple-page-search-icon" aria-hidden="true" />
            <input
              type="text"
              placeholder={t('temple.searchPlaceholder', 'Search Temple, State, Deity, Jyotirlinga, Shakti Peeth...')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search temples or states"
            />
            {search && (
              <button
                type="button"
                className="temple-search-clear"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
            <button
              type="button"
              className="temple-search-mic-btn"
              onClick={handleVoiceSearch}
              aria-label="Voice search"
              title="Search by voice"
            >
              <FaMicrophone />
            </button>
          </div>
        </div>

        {/* ═══ DIVINE SPIRITUAL HERO SECTION ═══ */}
        <section className="temple-divine-hero-banner" aria-label="Sacred Sanctuary Header">
          <div className="temple-hero-torana-arch" aria-hidden="true">
            <span className="temple-torana-leaf">🌸</span>
            <span className="temple-torana-shloka">ॐ असतो मा सद्गमय तमसो मा ज्योतिर्गमय मृत्योर्मा अमृतं गमय</span>
            <span className="temple-torana-leaf">🌸</span>
          </div>

          <div className="temple-hero-tag">
            <span className="temple-hero-tag-gem">✦</span>
            <span>Sacred Mandirs & Eternal Pilgrimages of Bharat</span>
            <span className="temple-hero-tag-gem">✦</span>
          </div>

          <h1 className="temple-hero-title">
            Divine Sanctuaries of India
          </h1>

          <p className="temple-hero-subtitle">
            Embark on a sacred journey through India's ancient mandirs, venerated Jyotirlingas, revered Shakti Peethas, and soaring Dravidian & Nagara architectural marvels across 28 States and 8 Union Territories.
          </p>

          {/* DIVINE COUNTERS */}
          <div className="temple-hero-stat-row">
            <div className="temple-stat-pill">
              <span className="temple-stat-pill-icon">🛕</span>
              <span className="temple-stat-pill-text"><strong>28</strong> States</span>
            </div>
            <div className="temple-stat-pill">
              <span className="temple-stat-pill-icon">🏛️</span>
              <span className="temple-stat-pill-text"><strong>8</strong> Territories</span>
            </div>
            <div className="temple-stat-pill">
              <span className="temple-stat-pill-icon">🔱</span>
              <span className="temple-stat-pill-text"><strong>12</strong> Jyotirlingas</span>
            </div>
            <div className="temple-stat-pill">
              <span className="temple-stat-pill-icon">🪷</span>
              <span className="temple-stat-pill-text"><strong>51</strong> Shakti Peethas</span>
            </div>
          </div>
        </section>

        {/* ═══ PILGRIMAGE CATEGORY PILLS FILTER ═══ */}
        <section className="temple-pilgrimage-filter-strip" aria-label="Pilgrimage category filters">
          <div className="temple-filter-scroll-wrapper">
            {PILGRIMAGE_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  className={`temple-filter-chip ${isActive ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  aria-pressed={isActive}
                >
                  <span className="temple-chip-icon">{cat.icon}</span>
                  <span className="temple-chip-label">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ═══ INDIAN STATES SECTION (28) ═══ */}
        {filteredStates.length > 0 && (
          <section className="temple-state-group" aria-label="Indian States">
            <div className="temple-group-title-row">
              <div className="temple-group-left">
                <span className="temple-group-om-icon">ॐ</span>
                <h2>{t('temple.statesHeading', 'Sacred States of Bharat')}</h2>
                <span className="temple-count-badge">{filteredStates.length} States</span>
              </div>
              <p className="temple-group-subtitle">
                Explore revered sanctums, sacred rivers, and millennia-old temple architecture across India's 28 states.
              </p>
            </div>

            <div className="temple-page-card-grid">
              {filteredStates.map((state) => {
                const theme = STATE_CULTURAL_THEMES[state.name] || {};
                const templesArr = (state.temples || "").split(",").map(t => t.trim()).slice(0, 3);

                return (
                  <article
                    className="temple-page-state-card divine-card"
                    key={state.name}
                    onClick={() => navigate(`/states/${encodeURIComponent(state.name)}`)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Explore sacred temples in ${state.name}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") navigate(`/states/${encodeURIComponent(state.name)}`);
                    }}
                  >
                    <div className="temple-card-top-accent-line" />

                    <div className="temple-card-media">
                      <TempleEmblemIcon stateName={state.name} />
                      <span className="temple-card-type-badge">State</span>
                      {theme.archStyle && (
                        <span className="temple-card-arch-tag" title={theme.archStyle}>
                          🏛️ {theme.archStyle.split("&")[0].trim()}
                        </span>
                      )}
                    </div>

                    <div className="temple-page-card-content">
                      <div className="temple-card-header-line">
                        <h3>{state.name}</h3>
                        <span className="temple-card-divine-star">✦</span>
                      </div>

                      {theme.divineTitle && (
                        <p className="temple-card-divine-subtitle">
                          {theme.divineTitle}
                        </p>
                      )}

                      <div className="temple-card-sanctums-wrap">
                        <span className="temple-sanctums-lead">Revered Sanctums:</span>
                        <div className="temple-pills-row">
                          {templesArr.map((temple, idx) => (
                            <span className="temple-mini-pill" key={idx}>
                              {temple}
                            </span>
                          ))}
                        </div>
                      </div>

                      {theme.shloka && (
                        <p className="temple-card-sacred-verse" title={theme.shloka}>
                          "{theme.shloka.split("।")[0].trim()}"
                        </p>
                      )}

                      <div className="temple-card-action">
                        <span className="temple-card-link">
                          <FaPray className="temple-action-pray-icon" />
                          <span>Explore Sanctums</span>
                        </span>
                        <span className="temple-action-arrow" aria-hidden="true">
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

        {/* ═══ UNION TERRITORIES SECTION (8) ═══ */}
        {filteredUTs.length > 0 && (
          <section className="temple-state-group" aria-label="Union Territories">
            <div className="temple-group-title-row">
              <div className="temple-group-left">
                <span className="temple-group-om-icon">ॐ</span>
                <h2>{t('temple.utsHeading', 'Union Territories')}</h2>
                <span className="temple-count-badge ut-badge">{filteredUTs.length} Territories</span>
              </div>
              <p className="temple-group-subtitle">
                Discover divine mountain gompas, coastal mandirs, and historic spiritual sanctums across the Union Territories.
              </p>
            </div>

            <div className="temple-page-card-grid">
              {filteredUTs.map((ut) => {
                const theme = STATE_CULTURAL_THEMES[ut.name] || {};
                const templesArr = (ut.temples || "").split(",").map(t => t.trim()).slice(0, 3);

                return (
                  <article
                    className="temple-page-state-card divine-card ut-card"
                    key={ut.name}
                    onClick={() => navigate(`/states/${encodeURIComponent(ut.name)}`)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Explore temples in ${ut.name}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") navigate(`/states/${encodeURIComponent(ut.name)}`);
                    }}
                  >
                    <div className="temple-card-top-accent-line ut" />

                    <div className="temple-card-media">
                      <TempleEmblemIcon stateName={ut.name} />
                      <span className="temple-card-type-badge ut">UT</span>
                      {theme.archStyle && (
                        <span className="temple-card-arch-tag" title={theme.archStyle}>
                          🏛️ {theme.archStyle.split("&")[0].trim()}
                        </span>
                      )}
                    </div>

                    <div className="temple-page-card-content">
                      <div className="temple-card-header-line">
                        <h3>{ut.name}</h3>
                        <span className="temple-card-divine-star">✦</span>
                      </div>

                      {theme.divineTitle && (
                        <p className="temple-card-divine-subtitle">
                          {theme.divineTitle}
                        </p>
                      )}

                      <div className="temple-card-sanctums-wrap">
                        <span className="temple-sanctums-lead">Revered Sanctums:</span>
                        <div className="temple-pills-row">
                          {templesArr.map((temple, idx) => (
                            <span className="temple-mini-pill" key={idx}>
                              {temple}
                            </span>
                          ))}
                        </div>
                      </div>

                      {theme.shloka && (
                        <p className="temple-card-sacred-verse" title={theme.shloka}>
                          "{theme.shloka.split("।")[0].trim()}"
                        </p>
                      )}

                      <div className="temple-card-action">
                        <span className="temple-card-link">
                          <FaPray className="temple-action-pray-icon" />
                          <span>Explore Sanctums</span>
                        </span>
                        <span className="temple-action-arrow" aria-hidden="true">
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

        {/* ═══ ARCHITECTURAL TRADITIONS OF BHARAT ═══ */}
        <section className="temple-page-architectural-traditions" aria-label="Temple Architecture of Bharat">
          <div className="temple-concluding-divider" aria-hidden="true">
            <span className="temple-concluding-line" />
            <span className="temple-header-tag">✦ Sacred Shilpa Shastra Architectural Styles ✦</span>
            <span className="temple-concluding-line" />
          </div>

          <div className="temple-arch-cards-row">
            <div className="temple-arch-card">
              <span className="temple-arch-icon">🏛️</span>
              <h4>Nagara Architecture</h4>
              <p>Characteristic curvilinear beehive spires (Shikharas), Amalaka crown disc, and Kalash finials common across North, Central, and Western India.</p>
            </div>
            <div className="temple-arch-card">
              <span className="temple-arch-icon">🛕</span>
              <h4>Dravidian Architecture</h4>
              <p>Pyramidal stepped tower Vimanas, massive monumental gateway Gopurams, pillared Mandapas, and sacred Temple Sarovar water tanks of South India.</p>
            </div>
            <div className="temple-arch-card">
              <span className="temple-arch-icon">👑</span>
              <h4>Vesara & Hoysala Style</h4>
              <p>A composite hybrid architectural tradition with star-shaped plinths, intricate soapstone friezes, and tiered sanctums in Karnataka.</p>
            </div>
            <div className="temple-arch-card">
              <span className="temple-arch-icon">🏔️</span>
              <h4>Himalayan Kath-Kuni Style</h4>
              <p>Interlocking deodar timber and stone sanctums with sloping pagoda roofs designed to withstand snow and seismic vibrations in Devbhumi.</p>
            </div>
          </div>
        </section>

        {/* EMPTY RESULTS */}
        {totalResults === 0 && (
          <div className="temple-empty-state">
            <span className="temple-empty-icon">🛕</span>
            <h3>No temple locations found</h3>
            <p>We couldn't find any state or temple matching "{search}".</p>
            <button
              className="temple-empty-reset"
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
              }}
            >
              Reset Filters & View All
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
