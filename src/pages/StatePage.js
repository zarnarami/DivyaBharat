// src/pages/StatePage.js — DivyaBharat Divine State & Regional Heritage Explorer
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeritageCard from '../components/HeritageCard';
import { PageLoader, EmptyState } from '../components/LoadingSpinner';
import StateEmblemIcon from '../components/StateEmblemIcon';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaOm,
  FaLandmark,
  FaPray,
  FaShareAlt,
  FaCheck,
  FaCompass,
  FaStar,
} from 'react-icons/fa';

import { HERITAGE_LOCATIONS } from '../data/heritageLocations';
import { STATE_CULTURAL_THEMES } from '../data/stateCulturalThemes';
import { STATE_IMAGES } from '../data/stateImages';
import AndhraPradeshTemples from '../components/AndhraPradeshTemples';
import AndhraPradeshHeritage from '../components/AndhraPradeshHeritage';
import ArunachalPradeshTemples from '../components/ArunachalPradeshTemples';
import ArunachalPradeshHeritage from '../components/ArunachalPradeshHeritage';
import './StatePage.css';

const CATEGORY_TABS = ['All', 'Temple', 'Monument', 'Historical Place', 'Festival', 'Tradition', 'Art Form'];

export default function StatePage() {
  const { stateName } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [stateData, setStateData] = useState(null);
  const [heritage, setHeritage] = useState([]);
  const [byCategory, setByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeMainTab, setActiveMainTab] = useState(() => {
    try {
      const qTab = new URLSearchParams(window.location.search).get('tab');
      if (qTab) return qTab;
    } catch {}
    return 'temples';
  }); // 'temples' | 'monuments' | 'all' | 'culture'
  const [activeDbCategory, setActiveDbCategory] = useState('All');
  const [savedIds, setSavedIds] = useState([]);
  const [copied, setCopied] = useState(false);

  // Decode state name safely
  const decodedName = useMemo(() => {
    try {
      return decodeURIComponent(stateName || '').trim();
    } catch {
      return stateName || '';
    }
  }, [stateName]);

  // Match local metadata from HERITAGE_LOCATIONS
  const localMatch = useMemo(() => {
    if (!decodedName) return null;
    return HERITAGE_LOCATIONS.find(
      (l) =>
        l.name.toLowerCase() === decodedName.toLowerCase() ||
        l.slug.toLowerCase() === decodedName.toLowerCase()
    );
  }, [decodedName]);

  const canonicalName = localMatch?.name || decodedName;

  // Retrieve state cultural theme metadata
  const culturalTheme = useMemo(() => {
    if (!canonicalName) return null;
    if (STATE_CULTURAL_THEMES[canonicalName]) return STATE_CULTURAL_THEMES[canonicalName];
    // Case-insensitive fallback
    const key = Object.keys(STATE_CULTURAL_THEMES).find(
      (k) => k.toLowerCase() === canonicalName.toLowerCase()
    );
    return key ? STATE_CULTURAL_THEMES[key] : null;
  }, [canonicalName]);

  // Retrieve backdrop image
  const heroImage = STATE_IMAGES[canonicalName] || (localMatch?.image || null);

  useEffect(() => {
    let isMounted = true;

    const fallbackFromLocal = () => {
      if (localMatch) {
        setStateData({
          name: localMatch.name,
          capital: localMatch.capital,
          region: localMatch.region,
          description: localMatch.description,
          isUT: localMatch.type === 'Union Territory',
        });

        const fallbackItems = (localMatch.highlights || '')
          .split(',')
          .filter(Boolean)
          .map((hName, idx) => {
            const cleanName = hName.trim();
            const isTemple =
              cleanName.toLowerCase().includes('temple') ||
              cleanName.toLowerCase().includes('mandir') ||
              cleanName.toLowerCase().includes('shrine') ||
              cleanName.toLowerCase().includes('jyotirlinga') ||
              cleanName.toLowerCase().includes('stupa') ||
              idx === 0;

            return {
              _id: `site-${localMatch.slug}-${idx}`,
              name: cleanName,
              state: localMatch.name,
              category: isTemple ? 'Temple' : (idx % 2 === 0 ? 'Monument' : 'Historical Place'),
              description: `${cleanName} is a revered cultural and historical jewel of ${localMatch.name}, renowned for its sacred significance and architectural grandeur.`,
              image: idx === 0 && localMatch.image ? localMatch.image : null,
              unescoListed: localMatch.badge?.includes('UNESCO') || idx === 0,
            };
          });

        setHeritage(fallbackItems);
        const bc = {};
        fallbackItems.forEach((item) => {
          if (!bc[item.category]) bc[item.category] = [];
          bc[item.category].push(item);
        });
        setByCategory(bc);
        setError('');
      } else {
        setError(`State or Region "${decodedName}" not found in cultural archives.`);
      }
    };

    const fetchState = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await api.get(`/states/${encodeURIComponent(canonicalName)}`);
        if (data && data.success && data.state && isMounted) {
          setStateData(data.state);
          if (data.heritage && data.heritage.length > 0) {
            setHeritage(data.heritage);
            setByCategory(data.byCategory || {});
          } else {
            // Augment from local highlights
            fallbackFromLocal();
          }
        } else if (isMounted) {
          fallbackFromLocal();
        }
      } catch (err) {
        if (isMounted) fallbackFromLocal();
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchState();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      isMounted = false;
    };
  }, [canonicalName, localMatch, decodedName]);

  useEffect(() => {
    try {
      const qTab = new URLSearchParams(window.location.search).get('tab');
      if (qTab) {
        setActiveMainTab(qTab);
        return;
      }
    } catch {}
    if (canonicalName === 'Andhra Pradesh') {
      setActiveMainTab('monuments');
    }
  }, [canonicalName]);

  useEffect(() => {
    let isMounted = true;
    const fetchWishlist = async () => {
      if (!user) return;
      try {
        const { data } = await api.get('/users/wishlist');
        if (data.success && isMounted) {
          setSavedIds(data.savedPlaces.map((p) => p._id));
        }
      } catch {}
    };
    fetchWishlist();
    return () => {
      isMounted = false;
    };
  }, [user]);

  const handleShare = async () => {
    try {
      const shareUrl = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Share error:', err);
    }
  };

  // Build curated Temples list combining themes and database
  const curatedTemples = useMemo(() => {
    const list = [];
    if (culturalTheme?.keyPilgrimages) {
      culturalTheme.keyPilgrimages.forEach((pName, idx) => {
        list.push({
          id: `theme-temple-${idx}`,
          name: pName,
          deity: culturalTheme.deity || 'Sacred Presiding Deity',
          style: culturalTheme.archStyle?.split('&')[0]?.trim() || 'Classical Nagara / Dravidian',
          tradition: culturalTheme.spiritualTradition || 'Sanatana Pilgrimage Tradition',
          desc: `${pName} is one of the most venerated pilgrimage destinations in ${canonicalName}, drawing millions of devotees seeking spiritual elevation.`,
          isKey: true,
        });
      });
    }

    // Add any DB temples that might not be in keyPilgrimages
    const dbTemples = heritage.filter((h) => h.category === 'Temple');
    dbTemples.forEach((dbh) => {
      if (!list.some((item) => item.name.toLowerCase() === dbh.name.toLowerCase())) {
        list.push({
          id: dbh._id,
          name: dbh.name,
          deity: culturalTheme?.deity || 'Presiding Deity',
          style: culturalTheme?.archStyle || 'Historic Temple Architecture',
          tradition: 'Sanatana Pilgrimage Tradition',
          desc: dbh.description,
          image: dbh.image,
          isKey: false,
          dbId: dbh._id,
        });
      }
    });

    return list;
  }, [culturalTheme, canonicalName, heritage]);

  // Build curated Monuments list combining themes and database
  const curatedMonuments = useMemo(() => {
    const list = [];
    if (culturalTheme?.heritageLandmarks) {
      culturalTheme.heritageLandmarks.forEach((lName, idx) => {
        list.push({
          id: `theme-monument-${idx}`,
          name: lName,
          category: 'Historic Citadel & Monument',
          desc: `${lName} stands as a magnificent testament to the royal architectural heritage, dynasties, and sovereign craftsmanship of ${canonicalName}.`,
          isKey: true,
          unesco: lName.toLowerCase().includes('unesco'),
        });
      });
    }

    // Add any DB monuments
    const dbMonuments = heritage.filter(
      (h) => h.category === 'Monument' || h.category === 'Historical Place'
    );
    dbMonuments.forEach((dbm) => {
      if (!list.some((item) => item.name.toLowerCase() === dbm.name.toLowerCase())) {
        list.push({
          id: dbm._id,
          name: dbm.name,
          category: dbm.category,
          desc: dbm.description,
          image: dbm.image,
          isKey: false,
          unesco: dbm.unescoListed,
          dbId: dbm._id,
        });
      }
    });

    return list;
  }, [culturalTheme, canonicalName, heritage]);

  // Filtered DB heritage for the "All Records" tab
  const displayDbHeritage =
    activeDbCategory === 'All' ? heritage : byCategory[activeDbCategory] || [];

  const availableDbTabs = CATEGORY_TABS.filter(
    (t) => t === 'All' || (byCategory[t] && byCategory[t].length > 0)
  );

  if (loading) {
    return (
      <div className="db-statepage">
        <Navbar />
        <PageLoader />
        <Footer />
      </div>
    );
  }

  if (error || !stateData) {
    return (
      <div className="db-statepage">
        <Navbar />
        <div className="db-statepage-error-wrap">
          <div className="db-statepage-error-card">
            <span className="db-statepage-error-icon">🏛️</span>
            <h2>Sacred Archive Notice</h2>
            <p>{error || 'Unable to retrieve records for this region.'}</p>
            <div className="db-statepage-error-btns">
              <button onClick={() => navigate('/temples')} className="db-statepage-btn-primary">
                Explore Temples of Bharat
              </button>
              <button onClick={() => navigate('/heritage')} className="db-statepage-btn-outline">
                Explore Heritage Monuments
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="db-statepage">
      <Navbar />

      {/* TOP TORANA NAVIGATION BAR */}
      <div className="db-state-topbar">
        <div className="db-state-topbar-inner">
          <div className="db-state-topbar-left">
            <button className="db-state-nav-pill" onClick={() => navigate('/temples')}>
              <FaArrowLeft size={11} /> All Sacred Temples
            </button>
            <button className="db-state-nav-pill" onClick={() => navigate('/heritage')}>
              <FaLandmark size={11} /> Heritage Explorer
            </button>
            <button className="db-state-nav-pill" onClick={() => navigate('/states')}>
              <FaCompass size={11} /> All States
            </button>
          </div>

          <button
            className={`db-state-share-pill ${copied ? 'copied' : ''}`}
            onClick={handleShare}
            title="Share this sacred state dossier"
          >
            {copied ? (
              <>
                <FaCheck size={12} color="#15803d" /> Copied Dossier Link
              </>
            ) : (
              <>
                <FaShareAlt size={12} /> Share Sanctum
              </>
            )}
          </button>
        </div>
      </div>

      {/* SACRED STATE HERO SECTION */}
      <section className="db-state-hero-section">
        {/* Background Backdrop Imagery */}
        {heroImage && (
          <div
            className="db-state-hero-backdrop"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
        )}
        <div className="db-state-hero-overlay" />

        <div className="db-state-hero-container">
          {/* Sacred Sanskrit Shloka Ribbon */}
          {culturalTheme?.shloka && (
            <div className="db-state-shloka-banner">
              <span className="db-state-shloka-diya">🪔</span>
              <span className="db-state-shloka-text">॥ {culturalTheme.shloka} ॥</span>
              <span className="db-state-shloka-diya">🪔</span>
            </div>
          )}

          {/* Central Emblem & Identity Card */}
          <div className="db-state-hero-card">
            {/* Sacred Emblem Halo Pedestal */}
            <div className="db-state-emblem-pedestal">
              <div className="db-state-emblem-halo">
                <StateEmblemIcon stateName={canonicalName} />
              </div>
            </div>

            <div className="db-state-hero-text">
              <div className="db-state-badge-row">
                <span className="db-state-region-badge">
                  <FaOm className="db-om-icon" />{' '}
                  {stateData?.isUT ? 'Union Territory of Bharat' : 'State of Bharat'} •{' '}
                  {stateData?.region?.toUpperCase()} REGION
                </span>
                <span className="db-state-capital-badge">
                  <FaMapMarkerAlt size={11} /> Capital: <strong>{stateData?.capital}</strong>
                </span>
              </div>

              <h1 className="db-state-title">{canonicalName}</h1>

              {culturalTheme?.divineTitle && (
                <p className="db-state-subtitle">{culturalTheme.divineTitle}</p>
              )}

              <p className="db-state-description">
                {stateData?.description ||
                  `Explore the spiritual divinity, monumental citadels, sacred shrines, and timeless cultural heritage of ${canonicalName}.`}
              </p>

              {/* 4 Divine Metadata Attributes */}
              <div className="db-state-meta-grid">
                <div className="db-state-meta-card">
                  <span className="db-meta-icon">🏛️</span>
                  <div className="db-meta-info">
                    <span className="db-meta-label">Architectural Legacy</span>
                    <span className="db-meta-value">
                      {culturalTheme?.archStyle || 'Ancient Indian Architecture'}
                    </span>
                  </div>
                </div>

                <div className="db-state-meta-card">
                  <span className="db-meta-icon">🔱</span>
                  <div className="db-meta-info">
                    <span className="db-meta-label">Principal Deities</span>
                    <span className="db-meta-value">
                      {culturalTheme?.deity || 'Sanatana Sacred Deities'}
                    </span>
                  </div>
                </div>

                <div className="db-state-meta-card">
                  <span className="db-meta-icon">🪷</span>
                  <div className="db-meta-info">
                    <span className="db-meta-label">Spiritual Tradition</span>
                    <span className="db-meta-value">
                      {culturalTheme?.spiritualTradition || 'Sanatana Dharma & Bhakti'}
                    </span>
                  </div>
                </div>

                <div className="db-state-meta-card">
                  <span className="db-meta-icon">📜</span>
                  <div className="db-meta-info">
                    <span className="db-meta-label">Documented Sites</span>
                    <span className="db-meta-value">
                      {heritage.length} Sacred & Heritage Records
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DISCOVERY SECTION WITH MAIN TABS */}
      <section className="db-state-discovery-section">
        <div className="db-state-discovery-container">
          {/* Main Section Navigation Tabs */}
          {canonicalName === 'Andhra Pradesh' ? (
            <div className="db-ap-section-switcher">
              <button
                className={`db-ap-section-btn ${activeMainTab === 'monuments' ? 'active' : ''}`}
                onClick={() => setActiveMainTab('monuments')}
              >
                <span className="db-tab-icon">🏛️</span>
                <span className="db-tab-text">Heritage Destinations</span>
                <span className="db-tab-count">20</span>
              </button>
              <button
                className={`db-ap-section-btn ${activeMainTab === 'temples' ? 'active' : ''}`}
                onClick={() => setActiveMainTab('temples')}
              >
                <span className="db-tab-icon">🛕</span>
                <span className="db-tab-text">Sacred Temples</span>
                <span className="db-tab-count">15</span>
              </button>
            </div>
          ) : (
            <div className="db-state-main-tabs">
              <button
                className={`db-state-main-tab ${activeMainTab === 'temples' ? 'active' : ''}`}
                onClick={() => setActiveMainTab('temples')}
              >
                <span className="db-tab-icon">🛕</span>
                <span className="db-tab-text">Sacred Temples & Pilgrimages</span>
                <span className="db-tab-count">
                  {canonicalName === 'Arunachal Pradesh' ? 12 : curatedTemples.length}
                </span>
              </button>

              <button
                className={`db-state-main-tab ${activeMainTab === 'monuments' ? 'active' : ''}`}
                onClick={() => setActiveMainTab('monuments')}
              >
                <span className="db-tab-icon">🏛️</span>
                <span className="db-tab-text">
                  {canonicalName === 'Arunachal Pradesh' ? 'Heritage Destinations' : 'Forts & Royal Citadels'}
                </span>
                <span className="db-tab-count">
                  {canonicalName === 'Arunachal Pradesh' ? 32 : curatedMonuments.length}
                </span>
              </button>

              <button
                className={`db-state-main-tab ${activeMainTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveMainTab('all')}
              >
                <span className="db-tab-icon">📜</span>
                <span className="db-tab-text">Heritage Database Records</span>
                <span className="db-tab-count">
                  {canonicalName === 'Arunachal Pradesh' ? 32 : heritage.length}
                </span>
              </button>

              <button
                className={`db-state-main-tab ${activeMainTab === 'culture' ? 'active' : ''}`}
                onClick={() => setActiveMainTab('culture')}
              >
                <span className="db-tab-icon">🪔</span>
                <span className="db-tab-text">Living Culture & Soul</span>
              </button>
            </div>
          )}

          {/* TAB 1: SACRED TEMPLES & PILGRIMAGES */}
          {activeMainTab === 'temples' && (
            <div className="db-state-tab-pane">
              {canonicalName === 'Andhra Pradesh' ? (
                <AndhraPradeshTemples stateData={stateData} culturalTheme={culturalTheme} />
              ) : canonicalName === 'Arunachal Pradesh' ? (
                <ArunachalPradeshTemples stateData={stateData} culturalTheme={culturalTheme} />
              ) : (
                <>
                  <div className="db-pane-intro">
                    <div className="db-pane-intro-text">
                      <span className="db-pane-pill">🔱 Sacred Tirtha Yatra</span>
                      <h2>Venerated Pilgrimages & Sanctuaries of {canonicalName}</h2>
                      <p>
                        Step into the sanctums where ancient shlokas echo, timeless stone spires reach toward the heavens, and divine blessings flow continuously.
                      </p>
                    </div>
                  </div>

                  {curatedTemples.length === 0 ? (
                    <EmptyState
                      icon="🛕"
                      title="Sanctum Records Updating"
                      message={`Sacred temple records for ${canonicalName} are currently being compiled by the cultural archive.`}
                    />
                  ) : (
                    <div className="db-state-temples-grid">
                      {curatedTemples.map((temple) => (
                        <div key={temple.id} className="db-temple-card">
                          <div className="db-temple-card-top">
                            <div className="db-temple-icon-ring">
                              <FaOm className="db-temple-icon-inner" />
                            </div>
                            <div className="db-temple-header-meta">
                              <span className="db-temple-tag">Sacred Sanctum</span>
                              <span className="db-temple-state-name">{canonicalName}</span>
                            </div>
                          </div>

                          <div className="db-temple-card-body">
                            <h3 className="db-temple-name">{temple.name}</h3>

                            <div className="db-temple-specs">
                              <div className="db-spec-item">
                                <span className="db-spec-key">Presiding Deity:</span>
                                <span className="db-spec-val">{temple.deity}</span>
                              </div>
                              <div className="db-spec-item">
                                <span className="db-spec-key">Architecture:</span>
                                <span className="db-spec-val">{temple.style}</span>
                              </div>
                            </div>

                            <p className="db-temple-desc">{temple.desc}</p>
                          </div>

                          <div className="db-temple-card-footer">
                            {temple.dbId ? (
                              <Link to={`/heritage/${temple.dbId}`} className="db-temple-action-btn primary">
                                Explore Sanctum →
                              </Link>
                            ) : (
                              <button
                                onClick={() =>
                                  navigate(
                                    `/temples?search=${encodeURIComponent(
                                      temple.name.replace(/Temple|Mandir|Shrine/gi, '').trim()
                                    )}`
                                  )
                                }
                                className="db-temple-action-btn"
                              >
                                Explore in Temple Registry →
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* TAB 2: FORTS & ROYAL CITADELS / HERITAGE DESTINATIONS */}
          {activeMainTab === 'monuments' && (
            <div className="db-state-tab-pane">
              {canonicalName === 'Andhra Pradesh' ? (
                <AndhraPradeshHeritage stateData={stateData} culturalTheme={culturalTheme} />
              ) : canonicalName === 'Arunachal Pradesh' ? (
                <ArunachalPradeshHeritage stateData={stateData} culturalTheme={culturalTheme} />
              ) : (
                <>
                  <div className="db-pane-intro">
                    <div className="db-pane-intro-text">
                      <span className="db-pane-pill">🏛️ Royal Architecture</span>
                      <h2>Historical Monuments & Citadels of {canonicalName}</h2>
                      <p>
                        Witness millennia of sovereign valour, master stonecraft, intricate stepwells, and monumental fortresses that guarded the cultural spirit of India.
                      </p>
                    </div>
                  </div>

                  {curatedMonuments.length === 0 ? (
                    <EmptyState
                      icon="🏛️"
                      title="Heritage Records Updating"
                      message={`Monument and fortress records for ${canonicalName} are being cataloged.`}
                    />
                  ) : (
                    <div className="db-state-monuments-grid">
                      {curatedMonuments.map((monument) => (
                        <div key={monument.id} className="db-monument-card">
                          <div className="db-monument-card-top">
                            <div className="db-monument-icon-ring">
                              <FaLandmark className="db-monument-icon-inner" />
                            </div>
                            <div className="db-monument-header-meta">
                              {monument.unesco ? (
                                <span className="db-monument-unesco-pill">
                                  <FaStar size={10} /> UNESCO World Heritage
                                </span>
                              ) : (
                                <span className="db-monument-tag">{monument.category}</span>
                              )}
                            </div>
                          </div>

                          <div className="db-monument-card-body">
                            <h3 className="db-monument-name">{monument.name}</h3>
                            <p className="db-monument-desc">{monument.desc}</p>
                          </div>

                          <div className="db-monument-card-footer">
                            {monument.dbId ? (
                              <Link
                                to={`/heritage/${monument.dbId}`}
                                className="db-monument-action-btn primary"
                              >
                                View Historical Details →
                              </Link>
                            ) : (
                              <button
                                onClick={() =>
                                  navigate(
                                    `/heritage?search=${encodeURIComponent(monument.name)}`
                                  )
                                }
                                className="db-monument-action-btn"
                              >
                                Locate in Heritage Archive →
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* TAB 3: COMPLETE DATABASE RECORDS */}
          {activeMainTab === 'all' && (
            <div className="db-state-tab-pane">
              <div className="db-pane-intro">
                <div className="db-pane-intro-text">
                  <span className="db-pane-pill">📜 Database Archive</span>
                  <h2>Official Records for {canonicalName}</h2>
                  <p>
                    Full persistent collection of cataloged monuments, living traditions, art forms, and sacred shrines in our MongoDB database.
                  </p>
                </div>
              </div>

              {/* Sub-Category Filter Pills */}
              {availableDbTabs.length > 1 && (
                <div className="db-state-category-filters">
                  {availableDbTabs.map((tab) => (
                    <button
                      key={tab}
                      className={`db-state-cat-filter ${activeDbCategory === tab ? 'active' : ''}`}
                      onClick={() => setActiveDbCategory(tab)}
                    >
                      {tab}
                      {tab !== 'All' && byCategory[tab] && (
                        <span className="db-cat-count">{byCategory[tab].length}</span>
                      )}
                      {tab === 'All' && <span className="db-cat-count">{heritage.length}</span>}
                    </button>
                  ))}
                </div>
              )}

              {displayDbHeritage.length === 0 ? (
                <EmptyState
                  icon="🏛️"
                  title="No Records in Selected Category"
                  message={`No records cataloged yet under "${activeDbCategory}" for ${canonicalName}.`}
                />
              ) : (
                <div className="db-state-db-grid">
                  {displayDbHeritage.map((h) => (
                    <HeritageCard
                      key={h._id}
                      heritage={h}
                      savedIds={savedIds}
                      onSaveToggle={(hid, saved) =>
                        setSavedIds((p) => (saved ? [...p, hid] : p.filter((i) => i !== hid)))
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: LIVING CULTURE & SOUL */}
          {activeMainTab === 'culture' && (
            <div className="db-state-tab-pane">
              <div className="db-culture-showcase">
                <div className="db-culture-banner">
                  <span className="db-pane-pill">🪔 Eternal Traditions</span>
                  <h2>The Spiritual & Cultural Soul of {canonicalName}</h2>
                  <p className="db-culture-sub">
                    Every state in Bharat preserves an ancient thread of civilizational harmony, living art, classical music, and holy festivities.
                  </p>
                </div>

                <div className="db-culture-grid">
                  <div className="db-culture-card">
                    <div className="db-culture-card-icon">🏛️</div>
                    <h3>Sacred Architecture Tradition</h3>
                    <p>
                      <strong>{culturalTheme?.archStyle || 'Classical Sanatana Architectural Schools'}</strong>
                    </p>
                    <p className="db-culture-card-desc">
                      Rooted in the ancient Vastu Shastras and Shilpa Shastras, each sanctum is conceived as a living mandala connecting human devotion to cosmic consciousness.
                    </p>
                  </div>

                  <div className="db-culture-card">
                    <div className="db-culture-card-icon">🪷</div>
                    <h3>Spiritual Lineage & Bhakti</h3>
                    <p>
                      <strong>{culturalTheme?.spiritualTradition || 'Vedic Sanatana Dharma'}</strong>
                    </p>
                    <p className="db-culture-card-desc">
                      Preserved across epochs through saintly poets, rishis, pilgrimage circuits, and sacred riverside sangams that welcome pilgrims from all corners of Bharat.
                    </p>
                  </div>

                  <div className="db-culture-card">
                    <div className="db-culture-card-icon">🔱</div>
                    <h3>Presiding Deities & Shrines</h3>
                    <p>
                      <strong>{culturalTheme?.deity || 'Sacred Manifestations'}</strong>
                    </p>
                    <p className="db-culture-card-desc">
                      From towering temple gopurams to serene cave shrines and forest teerthams, devotion here is expressed through daily aarti, sacred seva, and spiritual offerings.
                    </p>
                  </div>

                  <div className="db-culture-card">
                    <div className="db-culture-card-icon">🗺️</div>
                    <h3>Regional Pilgrimage Circuits</h3>
                    <p>
                      <strong>{stateData?.region} Bharat Teertha Network</strong>
                    </p>
                    <p className="db-culture-card-desc">
                      Connected to the ancient Char Dham, 12 Jyotirlingas, 51 Shakti Peethas, and classical Buddhist circuits uniting Bharat under one spiritual heartbeat.
                    </p>
                  </div>
                </div>

                {/* Sanskrit Inscription Banner */}
                {culturalTheme?.shloka && (
                  <div className="db-culture-shloka-box">
                    <p className="db-culture-shloka-deva">॥ {culturalTheme.shloka} ॥</p>
                    <p className="db-culture-shloka-label">
                      Ancient Sanskrit invocation embodying the divine essence of {canonicalName}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER EXPLORATION CALLOUT (Hidden for AP Heritage which displays its dedicated AP-themed ending) */}
      {!(canonicalName === 'Andhra Pradesh' && activeMainTab === 'monuments') && (
        <section className="db-state-footer-callout">
          <div className="db-callout-inner">
            <div className="db-callout-text">
              <h3>Continue Your Spiritual Pilgrimage</h3>
              <p>
                Explore 28 States and 8 Union Territories in DivyaBharat — Rooted in Culture, United in Spirit.
              </p>
            </div>
            <div className="db-callout-actions">
              <button onClick={() => navigate('/temples')} className="db-callout-btn primary">
                <FaPray size={13} /> Explore All Temples
              </button>
              <button onClick={() => navigate('/heritage')} className="db-callout-btn secondary">
                <FaLandmark size={13} /> Royal Heritage
              </button>
              <button onClick={() => navigate('/states')} className="db-callout-btn tertiary">
                <FaCompass size={13} /> View All 36 Regions
              </button>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
