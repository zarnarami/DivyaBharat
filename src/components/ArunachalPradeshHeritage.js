// src/components/ArunachalPradeshHeritage.js
// Dedicated Arunachal Pradesh Heritage Module — 32 Verified Historical Destinations, 6 Categories, 13-Section Dossier & Reviews
import React, { useState, useEffect, useMemo, useRef } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import './ArunachalPradeshHeritage.css';
import {
  FaLandmark,
  FaMapMarkerAlt,
  FaStar,
  FaSearch,
  FaFilter,
  FaTimes,
  FaExternalLinkAlt,
  FaDirections,
  FaClock,
  FaCalendarAlt,
  FaCar,
  FaTrain,
  FaPlane,
  FaBus,
  FaTshirt,
  FaCamera,
  FaWheelchair,
  FaInfoCircle,
  FaEye,
  FaHistory,
  FaCrown,
  FaFlag,
  FaUser,
  FaCommentDots
} from 'react-icons/fa';

// 6 Core Arunachal Pradesh Heritage Categories
const AR_HERITAGE_CATEGORIES = [
  { id: 'all', name: 'All Destinations', icon: '🏛️', count: 32 },
  { id: 'monasteries', name: 'Monasteries & Buddhist Heritage', icon: '☸️', count: 10 },
  { id: 'archaeological', name: 'Archaeological Sites', icon: '🗿', count: 7 },
  { id: 'forts', name: 'Forts & Palaces', icon: '🏰', count: 6 },
  { id: 'tribal', name: 'Living Tribal & Cultural Heritage', icon: '🎋', count: 4 },
  { id: 'war', name: 'War Memorials', icon: '🎖️', count: 3 },
  { id: 'museums', name: 'State Museums & Archives', icon: '🏺', count: 2 }
];

// Historical Eras / Dynasties for Discovery Filter
const HISTORICAL_ERAS = [
  'All Eras',
  'Ancient Epics & Pre-Medieval Era (10th – 12th Century CE)',
  'Medieval Citadel & Kingdom Era (14th – 16th Century CE)',
  'Buddhist Monastic Era (17th – 19th Century CE)',
  'Modern & War Memorials (20th – 21st Century CE)',
  'Indigenous Tribal Traditions & Living Heritage'
];

export default function ArunachalPradeshHeritage({ stateData, culturalTheme }) {
  const { user } = useAuth();

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedEra, setSelectedEra] = useState('All Eras');
  const [popularOnly, setPopularOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'calendar'

  // Modal & Detail State
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeModalTab, setActiveModalTab] = useState('overview');
  const [enlargedPhoto, setEnlargedPhoto] = useState(null);

  // Reviews State
  const [itemReviews, setItemReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  const [newVisitDate, setNewVisitDate] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewMsg, setReviewMsg] = useState('');
  const [reportedReviews, setReportedReviews] = useState({});

  const cardsGridRef = useRef(null);

  // Fetch 32 Arunachal Pradesh Heritage Destinations from MongoDB
  useEffect(() => {
    let isMounted = true;
    const fetchArHeritage = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await api.get('/heritage?state=Arunachal%20Pradesh&limit=60');
        if (isMounted) {
          if (data && data.success && Array.isArray(data.heritage)) {
            setDestinations(data.heritage);
          } else {
            setError('Could not retrieve Arunachal Pradesh heritage records.');
          }
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to connect to database for heritage records.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchArHeritage();

    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch Reviews when modal opens
  useEffect(() => {
    if (!selectedItem?._id) return;
    let isMounted = true;
    const fetchReviews = async () => {
      setReviewsLoading(true);
      try {
        const { data } = await api.get(`/heritage/${selectedItem._id}/reviews`);
        if (isMounted && data && data.success) {
          setItemReviews(data.reviews || []);
        }
      } catch (err) {
        if (isMounted) setItemReviews([]);
      } finally {
        if (isMounted) setReviewsLoading(false);
      }
    };

    fetchReviews();
    return () => {
      isMounted = false;
    };
  }, [selectedItem]);

  // Lock body scroll when modal or lightbox is active
  useEffect(() => {
    if (selectedItem || enlargedPhoto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedItem, enlargedPhoto]);

  // Handle ESC key to dismiss modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (enlargedPhoto) setEnlargedPhoto(null);
        else if (selectedItem) setSelectedItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, enlargedPhoto]);

  // Extract unique districts
  const uniqueDistricts = useMemo(() => {
    const set = new Set();
    destinations.forEach((d) => {
      if (d.district) set.add(d.district);
    });
    return Array.from(set).sort();
  }, [destinations]);

  // Filtered Destinations
  const filteredDestinations = useMemo(() => {
    return destinations.filter((item) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const mName = item.name?.toLowerCase().includes(q);
        const mAlt = item.altName?.toLowerCase().includes(q) || item.altNames?.some((a) => a.toLowerCase().includes(q));
        const mCity = item.city?.toLowerCase().includes(q);
        const mDistrict = item.district?.toLowerCase().includes(q);
        const mDynasty = item.dynasty?.toLowerCase().includes(q);
        const mDesc = item.description?.toLowerCase().includes(q);
        if (!mName && !mAlt && !mCity && !mDistrict && !mDynasty && !mDesc) return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && selectedCategory !== 'All Destinations') {
        if (item.category?.toLowerCase() !== selectedCategory.toLowerCase()) return false;
      }

      // District filter
      if (selectedDistrict !== 'All') {
        if (item.district?.toLowerCase() !== selectedDistrict.toLowerCase()) return false;
      }

      // Era / Dynasty filter
      if (selectedEra !== 'All Eras') {
        const dyn = (item.dynasty || '').toLowerCase();
        const per = (item.historicalPeriod || '').toLowerCase();
        const cat = (item.category || '').toLowerCase();
        if (selectedEra.includes('Ancient Epics') && !dyn.includes('chutia') && !dyn.includes('jitari') && !per.includes('epic') && !per.includes('pre-medieval') && !per.includes('10th') && !per.includes('12th')) return false;
        if (selectedEra.includes('Medieval Citadel') && !dyn.includes('chutia') && !dyn.includes('medieval') && !per.includes('14th') && !per.includes('15th') && !per.includes('16th')) return false;
        if (selectedEra.includes('Buddhist Monastic') && !cat.includes('monaster') && !dyn.includes('gelug') && !dyn.includes('nyingma') && !dyn.includes('tai khamti') && !per.includes('17th')) return false;
        if (selectedEra.includes('Modern & War') && !cat.includes('war') && !per.includes('20th') && !per.includes('1962')) return false;
        if (selectedEra.includes('Indigenous Tribal') && !cat.includes('tribal') && !per.includes('indigenous') && !per.includes('living')) return false;
      }

      // Popular filter
      if (popularOnly && !item.isPopular && (item.popularity || 0) < 85) {
        return false;
      }

      // Featured filter
      if (featuredOnly && !item.featured) {
        return false;
      }

      return true;
    });
  }, [destinations, searchQuery, selectedCategory, selectedDistrict, selectedEra, popularOnly, featuredOnly]);

  // Featured destinations for highlights banner
  const featuredHighlights = useMemo(() => {
    return destinations.filter((d) => d.featured || d.isPopular).slice(0, 6);
  }, [destinations]);

  // Handle Category select from top ribbon
  const handleCategoryPillClick = (catName) => {
    if (catName === 'All Destinations') {
      setSelectedCategory('All');
    } else {
      setSelectedCategory(catName);
    }
    if (cardsGridRef.current) {
      cardsGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDistrict('All');
    setSelectedEra('All Eras');
    setPopularOnly(false);
    setFeaturedOnly(false);
  };

  // Open Details Modal
  const handleOpenDetails = (item) => {
    setSelectedItem(item);
    setActiveModalTab('overview');
    setReviewMsg('');
    setNewReviewText('');
    setNewRating(5);
  };

  // Open Google Maps
  const handleOpenGoogleMaps = (item) => {
    if (item.googleMapsUrl || item.mapsUrl) {
      window.open(item.googleMapsUrl || item.mapsUrl, '_blank', 'noopener,noreferrer');
    } else if (item.coordinates?.lat && item.coordinates?.lng) {
      window.open(`https://www.google.com/maps?q=${item.coordinates.lat},${item.coordinates.lng}`, '_blank', 'noopener,noreferrer');
    } else {
      window.open(`https://www.google.com/maps/search/${encodeURIComponent(item.name + ' ' + (item.city || item.district) + ' Arunachal Pradesh')}`, '_blank', 'noopener,noreferrer');
    }
  };

  // Open GPS Directions
  const handleGetDirections = (item) => {
    if (item.coordinates?.lat && item.coordinates?.lng) {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${item.coordinates.lat},${item.coordinates.lng}`, '_blank', 'noopener,noreferrer');
    } else {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(item.name + ' ' + (item.city || item.district) + ' Arunachal Pradesh')}`, '_blank', 'noopener,noreferrer');
    }
  };

  // Submit Review Handler
  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!user) {
      setReviewMsg('Please login to your DivyaBharat account to share your visitor review.');
      return;
    }
    if (!newReviewText.trim()) {
      setReviewMsg('Please write a brief description of your visitor experience.');
      return;
    }

    setReviewSubmitting(true);
    setReviewMsg('');

    try {
      const { data } = await api.post(`/heritage/${selectedItem._id}/reviews`, {
        rating: newRating,
        reviewText: newReviewText.trim(),
        visitDate: newVisitDate || 'Recent Visit'
      });

      if (data && data.success) {
        setItemReviews((prev) => [data.review, ...prev]);
        setReviewMsg('✓ Thank you! Your visitor review has been posted successfully.');
        setNewReviewText('');
        // Update local item review stats
        setSelectedItem((prev) => ({
          ...prev,
          reviewCount: (prev.reviewCount || 0) + 1
        }));
      }
    } catch (err) {
      setReviewMsg(err.response?.data?.message || 'Failed to submit review. You may have already reviewed this site.');
    } finally {
      setReviewSubmitting(false);
    }
  };

  // Report Review Handler
  const handleReportReview = async (reviewId) => {
    try {
      await api.post(`/heritage/reviews/${reviewId}/report`, {
        reason: 'Reported by visitor as inappropriate or spam'
      });
      setReportedReviews((prev) => ({ ...prev, [reviewId]: true }));
    } catch (err) {
      console.error('Report review error:', err);
    }
  };

  if (loading) {
    return (
      <div className="arh-loading-wrap">
        <div className="arh-loading-spinner" />
        <p className="arh-loading-text">Loading 32 Arunachal Pradesh Heritage Destinations from MongoDB...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="arh-error-banner">
        <FaInfoCircle size={20} color="#c2410c" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="arh-root">
      {/* SECTION 1: HEADER & STATS BANNER */}
      <div className="arh-header-banner">
        <div className="arh-eyebrow">
          <span className="arh-diya">🏔️</span>
          <span>ARUNACHAL PRADESH HISTORICAL MONUMENTS & BUDDHIST MONASTERIES</span>
          <span className="arh-diya">🏔️</span>
        </div>
        <h2 className="arh-title">32 Documented Heritage Marvels of Arunachal Pradesh</h2>
        <p className="arh-subtitle">
          From Asia's second-largest Tawang Monastery and ancient medieval citadels of Ita Fort & Bhismaknagar to thousand-year-old Buddhist stupas, valorous 1962 war memorials, and UNESCO tentative living tribal landscapes.
        </p>

        <div className="arh-stats-row">
          <div className="arh-stat-card">
            <span className="arh-stat-val">{destinations.length}</span>
            <span className="arh-stat-label">Heritage Sites</span>
          </div>
          <div className="arh-stat-card">
            <span className="arh-stat-val">6</span>
            <span className="arh-stat-label">Curated Categories</span>
          </div>
          <div className="arh-stat-card">
            <span className="arh-stat-val">100%</span>
            <span className="arh-stat-label">GPS Coordinates & Maps</span>
          </div>
          <div className="arh-stat-card">
            <span className="arh-stat-val">13</span>
            <span className="arh-stat-label">Detailed Info Sections</span>
          </div>
        </div>
      </div>

      {/* SECTION 2: 6 HERITAGE CATEGORIES SELECTOR */}
      <div className="arh-categories-container">
        <div className="arh-section-title-bar">
          <div>
            <span className="arh-mini-tag">🏛️ Category Exploration</span>
            <h3>Explore Arunachal Heritage by Category</h3>
          </div>
          <div className="arh-view-toggle-btns">
            <button
              className={`arh-view-toggle ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <FaLandmark size={12} /> Heritage Grid
            </button>
            <button
              className={`arh-view-toggle ${viewMode === 'calendar' ? 'active' : ''}`}
              onClick={() => setViewMode('calendar')}
            >
              <FaCalendarAlt size={12} /> Festival & Event Calendar
            </button>
          </div>
        </div>

        <div className="arh-categories-grid">
          {AR_HERITAGE_CATEGORIES.map((cat) => {
            const isSelected =
              (cat.name === 'All Destinations' && (selectedCategory === 'All' || selectedCategory === 'All Destinations')) ||
              selectedCategory === cat.name;

            return (
              <button
                key={cat.id}
                type="button"
                className={`arh-cat-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleCategoryPillClick(cat.name)}
              >
                <span className="arh-cat-icon">{cat.icon}</span>
                <span className="arh-cat-name">{cat.name}</span>
                <span className="arh-cat-count">{cat.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: POPULAR & FEATURED HERITAGE HIGHLIGHTS */}
      {featuredHighlights.length > 0 && selectedCategory === 'All' && !searchQuery && (
        <div className="arh-featured-section">
          <div className="arh-featured-heading">
            <span className="arh-mini-tag">⭐ Himalayan Highlights</span>
            <h3>Popular & Featured Destinations</h3>
            <p>Handpicked heritage marvels of legendary architectural, spiritual, and historical renown.</p>
          </div>

          <div className="arh-featured-carousel">
            {featuredHighlights.map((item) => (
              <div
                key={item._id}
                className="arh-featured-card"
                onClick={() => handleOpenDetails(item)}
              >
                <div className="arh-feat-img-wrap">
                  <img
                    src={item.image || (item.images && item.images[0]) || 'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?auto=format&fit=crop&w=800&q=80'}
                    alt={item.name}
                    className="arh-feat-img"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="arh-feat-badge-row">
                    <span className="arh-feat-tag">{item.category}</span>
                    <span className="arh-rating-pill">
                      <FaStar size={10} color="#f59e0b" /> {item.averageRating || 4.8}
                    </span>
                  </div>
                </div>

                <div className="arh-feat-body">
                  <h4>{item.name}</h4>
                  <p className="arh-feat-loc">
                    <FaMapMarkerAlt size={10} color="#ea580c" /> {item.district}, AR
                  </p>
                  <p className="arh-feat-dynasty">
                    <FaCrown size={10} color="#7c2d12" /> {item.dynasty || item.historicalPeriod}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: SEARCH & FILTER TOOLBAR */}
      <div className="arh-filter-toolbar" ref={cardsGridRef}>
        <div className="arh-toolbar-header">
          <div className="arh-toolbar-title">
            <FaFilter size={14} color="#ea580c" />
            <span>Search & Filter Arunachal Pradesh Heritage</span>
          </div>
          <div className="arh-results-pill">
            Showing <strong>{filteredDestinations.length}</strong> of <strong>{destinations.length}</strong> Heritage Sites
          </div>
        </div>

        <div className="arh-toolbar-grid">
          {/* Search Box */}
          <div className="arh-field-group arh-search-field">
            <label htmlFor="arh-search">Search by Name or Place</label>
            <div className="arh-input-wrap">
              <FaSearch className="arh-input-icon" size={13} />
              <input
                id="arh-search"
                type="text"
                value={searchQuery}
                placeholder="e.g. Tawang, Ita Fort, Bhismaknagar, Apatani, Gorsam..."
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="arh-clear-btn"
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                >
                  <FaTimes size={11} />
                </button>
              )}
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="arh-field-group">
            <label htmlFor="arh-cat-select">Category</label>
            <select
              id="arh-cat-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories ({destinations.length})</option>
              {AR_HERITAGE_CATEGORIES.filter((c) => c.name !== 'All Destinations').map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name} ({c.count})
                </option>
              ))}
            </select>
          </div>

          {/* District Dropdown */}
          <div className="arh-field-group">
            <label htmlFor="arh-dist-select">District</label>
            <select
              id="arh-dist-select"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              <option value="All">All Districts</option>
              {uniqueDistricts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Historical Era Dropdown */}
          <div className="arh-field-group">
            <label htmlFor="arh-era-select">Historical Dynasty / Era</label>
            <select
              id="arh-era-select"
              value={selectedEra}
              onChange={(e) => setSelectedEra(e.target.value)}
            >
              {HISTORICAL_ERAS.map((era) => (
                <option key={era} value={era}>
                  {era}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Toggles & Reset */}
        <div className="arh-toolbar-footer">
          <div className="arh-toggles-row">
            <label className="arh-toggle-box">
              <input
                type="checkbox"
                checked={popularOnly}
                onChange={(e) => setPopularOnly(e.target.checked)}
              />
              <span>
                <FaStar size={11} color="#f59e0b" /> Popular Sites Only
              </span>
            </label>

            <label className="arh-toggle-box">
              <input
                type="checkbox"
                checked={featuredOnly}
                onChange={(e) => setFeaturedOnly(e.target.checked)}
              />
              <span>
                <FaCrown size={11} color="#ea580c" /> Featured Heritage Only
              </span>
            </label>
          </div>

          {(searchQuery ||
            selectedCategory !== 'All' ||
            selectedDistrict !== 'All' ||
            selectedEra !== 'All Eras' ||
            popularOnly ||
            featuredOnly) && (
            <button type="button" className="arh-reset-btn" onClick={handleResetFilters}>
              <FaTimes size={12} /> Reset All Filters
            </button>
          )}
        </div>
      </div>

      {/* VIEW MODE A: 32 HERITAGE CARDS GRID */}
      {viewMode === 'grid' && (
        <>
          {filteredDestinations.length === 0 ? (
            <div className="arh-empty-view">
              <span className="arh-empty-icon">🏛️</span>
              <h3>No Heritage Destinations Found</h3>
              <p>No historical destinations match your current filter selections.</p>
              <button type="button" className="arh-reset-empty-btn" onClick={handleResetFilters}>
                View All 32 Arunachal Pradesh Heritage Sites
              </button>
            </div>
          ) : (
            <div className="arh-destinations-grid">
              {filteredDestinations.map((item, idx) => (
                <div key={item._id || idx} className="arh-card">
                  {/* Card Image */}
                  <div className="arh-card-img-wrap">
                    <img
                      src={item.image || (item.images && item.images[0]) || 'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?auto=format&fit=crop&w=800&q=80'}
                      alt={item.name}
                      className="arh-card-img"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="arh-card-gradient" />

                    <div className="arh-card-top-badges">
                      <span className="arh-card-cat-badge">{item.category}</span>
                      {item.featured && (
                        <span className="arh-card-featured-badge">
                          <FaCrown size={10} /> Featured
                        </span>
                      )}
                    </div>

                    <div className="arh-card-loc-pill">
                      <FaMapMarkerAlt size={10} /> {item.city ? `${item.city}, ` : ''}{item.district}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="arh-card-body">
                    <h3 className="arh-card-title">{item.name}</h3>

                    {item.altName && (
                      <p className="arh-card-alt-name">
                        <em>{item.altName}</em>
                      </p>
                    )}

                    <div className="arh-card-history-meta">
                      <span className="arh-meta-tag">
                        <FaHistory size={10} color="#ea580c" /> {item.establishmentPeriod || item.historicalPeriod}
                      </span>
                      <span className="arh-meta-tag">
                        <FaCrown size={10} color="#7c2d12" /> {item.dynasty?.split(',')[0]?.trim() || 'Eastern Himalayas'}
                      </span>
                    </div>

                    <p className="arh-card-desc">{item.description}</p>

                    <div className="arh-card-stats-row">
                      <div className="arh-stat-rating">
                        <FaStar size={11} color="#f59e0b" />
                        <strong>{item.averageRating || 4.8}</strong>
                        <span className="arh-review-cnt">({item.reviewCount || 0} reviews)</span>
                      </div>
                      <div className="arh-stat-timing">
                        <FaClock size={11} color="#64748b" />
                        <span>{item.visitorInformation?.openingTime || '08:00 AM'} – {item.visitorInformation?.closingTime || '05:00 PM'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="arh-card-footer">
                    <button
                      type="button"
                      className="arh-view-details-btn"
                      onClick={() => handleOpenDetails(item)}
                    >
                      <FaLandmark size={12} /> View Full Heritage Dossier
                    </button>

                    <div className="arh-quick-actions">
                      <button
                        type="button"
                        className="arh-action-btn map"
                        title="View on Google Maps"
                        onClick={() => handleOpenGoogleMaps(item)}
                      >
                        <FaMapMarkerAlt size={12} />
                      </button>
                      <button
                        type="button"
                        className="arh-action-btn dir"
                        title="Get GPS Directions"
                        onClick={() => handleGetDirections(item)}
                      >
                        <FaDirections size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* VIEW MODE B: FESTIVAL & EVENT CALENDAR */}
      {viewMode === 'calendar' && (
        <div className="arh-calendar-section">
          <div className="arh-calendar-header">
            <span className="arh-mini-tag">📅 Cultural Timeline</span>
            <h3>Arunachal Pradesh Heritage Festivals & Annual Events</h3>
            <p>Annual historical celebrations, sacred cham mask dances, and tribal harvest ceremonies hosted at these 32 destinations.</p>
          </div>

          <div className="arh-calendar-grid">
            {destinations.flatMap((d) =>
              (d.festivals || []).map((fest, fIdx) => (
                <div key={`${d._id}-${fIdx}`} className="arh-event-card">
                  <div className="arh-event-header">
                    <div className="arh-event-date-box">
                      <FaCalendarAlt size={16} color="#ea580c" />
                      <span className="arh-event-month">{fest.month || 'Annual'}</span>
                    </div>
                    <div className="arh-event-site-info">
                      <span className="arh-event-site-name">{d.name}</span>
                      <span className="arh-event-loc">
                        <FaMapMarkerAlt size={10} /> {d.district}, AR
                      </span>
                    </div>
                  </div>

                  <h4 className="arh-event-title">{fest.name}</h4>
                  <p className="arh-event-desc">{fest.description}</p>

                  <div className="arh-event-footer">
                    <button
                      type="button"
                      className="arh-event-link-btn"
                      onClick={() => handleOpenDetails(d)}
                    >
                      Explore {d.name} Dossier →
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* SECTION 5: COMPLETE HERITAGE INFORMATION MODAL (ALL 13 SECTIONS) */}
      {selectedItem && (
        <div
          className="arh-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedItem(null);
          }}
        >
          <div className="arh-modal-container" role="dialog" aria-modal="true">
            {/* Modal Header */}
            <div className="arh-modal-header">
              <div className="arh-modal-header-main">
                <div className="arh-modal-badges">
                  <span className="arh-badge-cat">{selectedItem.category}</span>
                  <span className="arh-badge-state">Arunachal Pradesh</span>
                  {selectedItem.district && (
                    <span className="arh-badge-dist">
                      <FaMapMarkerAlt size={10} /> {selectedItem.district} District
                    </span>
                  )}
                  {selectedItem.featured && (
                    <span className="arh-badge-feat">
                      <FaCrown size={10} /> Featured Heritage
                    </span>
                  )}
                </div>
                <h2 className="arh-modal-title">{selectedItem.name}</h2>
                {selectedItem.altName && (
                  <p className="arh-modal-alt">
                    <em>{selectedItem.altName}</em>
                  </p>
                )}
              </div>

              <button
                type="button"
                className="arh-modal-close"
                onClick={() => setSelectedItem(null)}
                aria-label="Close"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* Modal Quick Meta Ribbon */}
            <div className="arh-modal-ribbon">
              <div className="arh-ribbon-item">
                <span className="arh-ribbon-icon">👑</span>
                <div>
                  <span className="arh-ribbon-lbl">Dynasty / Rulers</span>
                  <strong>{selectedItem.dynasty?.split(',')[0] || selectedItem.historicalRulers || 'Eastern Himalayas'}</strong>
                </div>
              </div>
              <div className="arh-ribbon-item">
                <span className="arh-ribbon-icon">📜</span>
                <div>
                  <span className="arh-ribbon-lbl">Establishment Era</span>
                  <strong>{selectedItem.establishmentPeriod || selectedItem.historicalPeriod}</strong>
                </div>
              </div>
              <div className="arh-ribbon-item">
                <span className="arh-ribbon-icon">🕒</span>
                <div>
                  <span className="arh-ribbon-lbl">Visiting Hours</span>
                  <strong>{selectedItem.visitorInformation?.openingTime || '08:00 AM'} – {selectedItem.visitorInformation?.closingTime || '05:00 PM'}</strong>
                </div>
              </div>
              <div className="arh-ribbon-item">
                <span className="arh-ribbon-icon">⭐</span>
                <div>
                  <span className="arh-ribbon-lbl">Visitor Rating</span>
                  <strong>{selectedItem.averageRating || 4.8} ★ ({selectedItem.reviewCount || 0} reviews)</strong>
                </div>
              </div>
            </div>

            {/* Modal 13-Section Navigation Bar */}
            <div className="arh-modal-tabs-bar">
              <button
                type="button"
                className={`arh-mtab ${activeModalTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('overview')}
              >
                1. Overview
              </button>
              <button
                type="button"
                className={`arh-mtab ${activeModalTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('history')}
              >
                2. History & Timeline
              </button>
              <button
                type="button"
                className={`arh-mtab ${activeModalTab === 'significance' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('significance')}
              >
                3. Significance
              </button>
              <button
                type="button"
                className={`arh-mtab ${activeModalTab === 'architecture' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('architecture')}
              >
                4. Architecture
              </button>
              <button
                type="button"
                className={`arh-mtab ${activeModalTab === 'deity' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('deity')}
              >
                5. Sacred & Culture
              </button>
              <button
                type="button"
                className={`arh-mtab ${activeModalTab === 'rituals' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('rituals')}
              >
                6. Rituals & Events
              </button>
              <button
                type="button"
                className={`arh-mtab ${activeModalTab === 'guidelines' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('guidelines')}
              >
                7. Guidelines & ILP
              </button>
              <button
                type="button"
                className={`arh-mtab ${activeModalTab === 'timings' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('timings')}
              >
                8. Hours & Entry
              </button>
              <button
                type="button"
                className={`arh-mtab ${activeModalTab === 'maps' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('maps')}
              >
                9. Google Maps
              </button>
              <button
                type="button"
                className={`arh-mtab ${activeModalTab === 'travel' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('travel')}
              >
                10. Travel & Stays
              </button>
              <button
                type="button"
                className={`arh-mtab ${activeModalTab === 'gallery' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('gallery')}
              >
                11. Gallery ({selectedItem.gallery?.length || selectedItem.images?.length || 1})
              </button>
              <button
                type="button"
                className={`arh-mtab ${activeModalTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('reviews')}
              >
                12. Reviews ({itemReviews.length})
              </button>
              <button
                type="button"
                className={`arh-mtab ${activeModalTab === 'related' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('related')}
              >
                13. Related Sites
              </button>
            </div>

            {/* Modal Body: 13 Comprehensive Dossier Panes */}
            <div className="arh-modal-body">
              {/* 1. OVERVIEW */}
              {activeModalTab === 'overview' && (
                <div className="arh-dossier-pane">
                  <div className="arh-pane-title-row">
                    <span className="arh-section-num">Section 1</span>
                    <h3>Destination Overview & Identification</h3>
                  </div>

                  <div className="arh-info-grid">
                    <div className="arh-info-box">
                      <span className="arh-lbl">Official Name</span>
                      <p className="arh-val highlight">{selectedItem.name}</p>
                    </div>

                    <div className="arh-info-box">
                      <span className="arh-lbl">Category</span>
                      <p className="arh-val">{selectedItem.category}</p>
                    </div>

                    <div className="arh-info-box full">
                      <span className="arh-lbl">Full Location & Address</span>
                      <p className="arh-val">{selectedItem.address || `${selectedItem.city || ''}, ${selectedItem.district}, Arunachal Pradesh`}</p>
                    </div>

                    <div className="arh-info-box full">
                      <span className="arh-lbl">Comprehensive Summary</span>
                      <p className="arh-val prose">{selectedItem.description}</p>
                    </div>

                    <div className="arh-info-box">
                      <span className="arh-lbl">State / National Protection Status</span>
                      <p className="arh-val">{selectedItem.unescoStatus || 'Archaeological Survey of India / Directorate of Research, Govt. of Arunachal Pradesh'}</p>
                    </div>

                    <div className="arh-info-box">
                      <span className="arh-lbl">Permit Required (ILP / PAP)</span>
                      <p className="arh-val">Inner Line Permit (ILP) for Indian Citizens; PAP for Foreign Tourists</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. HISTORY & TIMELINE */}
              {activeModalTab === 'history' && (
                <div className="arh-dossier-pane">
                  <div className="arh-pane-title-row">
                    <span className="arh-section-num">Section 2</span>
                    <h3>Historical Background, Origin & Chronological Timeline</h3>
                  </div>

                  <div className="arh-prose-card">
                    <h4>Origin & Establishment</h4>
                    <p className="arh-prose">{selectedItem.historicalBackground || selectedItem.history}</p>
                  </div>

                  {Array.isArray(selectedItem.timeline) && selectedItem.timeline.length > 0 && (
                    <div className="arh-timeline-card">
                      <h4>Historical Chronology</h4>
                      <div className="arh-timeline-list">
                        {selectedItem.timeline.map((step, tIdx) => (
                          <div key={tIdx} className="arh-tline-item">
                            <div className="arh-tline-dot">{tIdx + 1}</div>
                            <div className="arh-tline-content">
                              <strong>{step.period}</strong>
                              <p>{step.event}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 3. HISTORICAL SIGNIFICANCE */}
              {activeModalTab === 'significance' && (
                <div className="arh-dossier-pane">
                  <div className="arh-pane-title-row">
                    <span className="arh-section-num">Section 3</span>
                    <h3>Cultural Importance, Dynasties & Historic Legends</h3>
                  </div>

                  <div className="arh-info-grid">
                    <div className="arh-info-box full">
                      <span className="arh-lbl">Cultural & Regional Importance</span>
                      <p className="arh-val prose">{selectedItem.culturalImportance || selectedItem.culturalSignificance}</p>
                    </div>

                    <div className="arh-info-box full">
                      <span className="arh-lbl">Associated Dynasties, Tribes & Rulers</span>
                      <p className="arh-val highlight">
                        {selectedItem.dynasty} {selectedItem.historicalRulers ? `(Rulers: ${selectedItem.historicalRulers})` : ''}
                      </p>
                    </div>

                    <div className="arh-info-box full">
                      <span className="arh-lbl">Archaeological & Historical Highlights</span>
                      <p className="arh-val prose">{selectedItem.archaeologicalImportance || 'Protected monument featuring ancient Himalayan architecture, Buddhist relics, and heritage artifacts.'}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. ARCHITECTURE */}
              {activeModalTab === 'architecture' && (
                <div className="arh-dossier-pane">
                  <div className="arh-pane-title-row">
                    <span className="arh-section-num">Section 4</span>
                    <h3>Architectural Style, Masonry & Traditional Engineering</h3>
                  </div>

                  <div className="arh-prose-card">
                    <h4>Architectural Grandeur</h4>
                    <p className="arh-prose">{selectedItem.architecture || selectedItem.architecturalStyle}</p>
                  </div>

                  <div className="arh-info-grid">
                    <div className="arh-info-box">
                      <span className="arh-lbl">Architectural Style Category</span>
                      <p className="arh-val">{selectedItem.architecturalStyle || 'Traditional Eastern Himalayan Architecture'}</p>
                    </div>
                    <div className="arh-info-box">
                      <span className="arh-lbl">Preservation Entity</span>
                      <p className="arh-val">Archaeological Survey of India / State Research Department</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. SACRED TRADITIONS & CULTURE */}
              {activeModalTab === 'deity' && (
                <div className="arh-dossier-pane">
                  <div className="arh-pane-title-row">
                    <span className="arh-section-num">Section 5</span>
                    <h3>Spiritual Traditions, Lineage & Indigenous Culture</h3>
                  </div>

                  {selectedItem.deityDetails?.hasReligiousSignificance ? (
                    <div className="arh-religious-card">
                      <div className="arh-rel-hero">
                        <span className="arh-rel-icon">☸️</span>
                        <div>
                          <span className="arh-rel-lbl">Principal Presiding Figure / Deity</span>
                          <h4>{selectedItem.deityDetails.mainDeity}</h4>
                        </div>
                      </div>

                      {Array.isArray(selectedItem.deityDetails.associatedDeities) && selectedItem.deityDetails.associatedDeities.length > 0 && (
                        <div className="arh-assoc-deities">
                          <span className="arh-lbl">Associated Deities / Bodhisattvas / Spiritual Masters</span>
                          <div className="arh-deity-pills">
                            {selectedItem.deityDetails.associatedDeities.map((d, dIdx) => (
                              <span key={dIdx} className="arh-dpill">{d}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="arh-myth-box">
                        <span className="arh-lbl">Spiritual Lore & Sacred History</span>
                        <p className="arh-prose">{selectedItem.deityDetails.mythology || selectedItem.deityDetails.religiousSignificance}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="arh-secular-notice">
                      <FaLandmark size={24} color="#ea580c" />
                      <h4>Historical Citadel / Living Tribal Heritage / Memorial</h4>
                      <p>
                        This destination represents historic forts, ancient archaeological excavations, tribal living heritage, or national war memorials preserved for supreme architectural, civilizational, and heroic significance.
                      </p>
                      {selectedItem.culturalImportance && (
                        <div className="arh-secular-culture">
                          <strong>Cultural Heritage Context:</strong>
                          <p>{selectedItem.culturalImportance}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* 6. RITUALS & EVENTS */}
              {activeModalTab === 'rituals' && (
                <div className="arh-dossier-pane">
                  <div className="arh-pane-title-row">
                    <span className="arh-section-num">Section 6</span>
                    <h3>Rituals, Daily Schedules & Scheduled Ceremonies</h3>
                  </div>

                  <div className="arh-info-grid">
                    <div className="arh-info-box full">
                      <span className="arh-lbl">Daily Schedule & Public Access</span>
                      <p className="arh-val">{selectedItem.rituals?.daily?.[0] || selectedItem.visitorInformation?.timings || 'Open daily for visitors from 08:00 AM to 05:00 PM.'}</p>
                    </div>

                    {selectedItem.rituals?.specialCeremonies && (
                      <div className="arh-info-box full">
                        <span className="arh-lbl">Special Ceremonies & Sacred Observances</span>
                        <p className="arh-val">{selectedItem.rituals.specialCeremonies}</p>
                      </div>
                    )}

                    {Array.isArray(selectedItem.festivals) && selectedItem.festivals.length > 0 && (
                      <div className="arh-info-box full">
                        <span className="arh-lbl">Associated Annual Festivals & Cultural Celebrations</span>
                        <div className="arh-fest-chips">
                          {selectedItem.festivals.map((fest, fIdx) => (
                            <div key={fIdx} className="arh-fest-chip">
                              <strong>{fest.name}</strong> ({fest.month || 'Annual'}): {fest.description}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 7. VISITOR GUIDELINES & ILP */}
              {activeModalTab === 'guidelines' && (
                <div className="arh-dossier-pane">
                  <div className="arh-pane-title-row">
                    <span className="arh-section-num">Section 7</span>
                    <h3>Visitor Guidelines, ILP Regulations & High-Altitude Protocol</h3>
                  </div>

                  <div className="arh-guidelines-grid">
                    <div className="arh-gl-card">
                      <div className="arh-gl-icon"><FaTshirt size={14} color="#ea580c" /></div>
                      <div>
                        <strong>Recommended Dress Code:</strong>
                        <p>{selectedItem.visitorInformation?.dressCode || 'Warm layered woolens and sturdy trekking/walking shoes'}</p>
                      </div>
                    </div>

                    <div className="arh-gl-card">
                      <div className="arh-gl-icon"><FaCamera size={14} color="#ea580c" /></div>
                      <div>
                        <strong>Photography Rules:</strong>
                        <p>{selectedItem.visitorInformation?.photography || 'Permitted throughout complexes and gardens; avoid photography inside inner sanctums where prohibited'}</p>
                      </div>
                    </div>

                    <div className="arh-gl-card">
                      <div className="arh-gl-icon"><FaWheelchair size={14} color="#ea580c" /></div>
                      <div>
                        <strong>Accessibility Information:</strong>
                        <p>{selectedItem.visitorInformation?.accessibility || 'Paved pathways at lower courtyards; high-altitude hill steps present at elevated viewpoints'}</p>
                      </div>
                    </div>

                    <div className="arh-gl-card">
                      <div className="arh-gl-icon"><FaInfoCircle size={14} color="#ea580c" /></div>
                      <div>
                        <strong>Inner Line Permit (ILP) & Eco Protocol:</strong>
                        <p>Mandatory ILP for all Indian tourists obtained online (arunachalilp.com). Zero tolerance for single-use plastics and defacing ancient heritage relics.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 8. HOURS & ENTRY FEES */}
              {activeModalTab === 'timings' && (
                <div className="arh-dossier-pane">
                  <div className="arh-pane-title-row">
                    <span className="arh-section-num">Section 8</span>
                    <h3>Opening Hours, Entry Fees & Best Seasons</h3>
                  </div>

                  <div className="arh-info-grid">
                    <div className="arh-info-box">
                      <span className="arh-lbl">Opening Time</span>
                      <p className="arh-val highlight">{selectedItem.visitorInformation?.openingTime || '08:00 AM'}</p>
                    </div>

                    <div className="arh-info-box">
                      <span className="arh-lbl">Closing Time</span>
                      <p className="arh-val highlight">{selectedItem.visitorInformation?.closingTime || '05:00 PM'}</p>
                    </div>

                    <div className="arh-info-box full">
                      <span className="arh-lbl">Entry Fees & Tariff</span>
                      <p className="arh-val highlight">{selectedItem.visitorInformation?.entryFees || 'Free / Nominal Entry Ticket'}</p>
                    </div>

                    <div className="arh-info-box full">
                      <span className="arh-lbl">Ticket Booking Information</span>
                      <p className="arh-val">{selectedItem.visitorInformation?.ticketBooking || 'Available on-spot at entrance counter and online via official portal.'}</p>
                    </div>

                    <div className="arh-info-box">
                      <span className="arh-lbl">Best Time to Visit</span>
                      <p className="arh-val">{selectedItem.visitorInformation?.bestTimeToVisit || 'October to April (Pleasant clear skies, avoids heavy monsoons)'}</p>
                    </div>

                    <div className="arh-info-box">
                      <span className="arh-lbl">Estimated Visiting Duration</span>
                      <p className="arh-val">{selectedItem.visitorInformation?.visitingDuration || '2 to 3 hours'}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 9. GOOGLE MAPS & GPS */}
              {activeModalTab === 'maps' && (
                <div className="arh-dossier-pane">
                  <div className="arh-pane-title-row">
                    <span className="arh-section-num">Section 9</span>
                    <h3>Exact GPS Coordinates, Location & Google Maps</h3>
                  </div>

                  <div className="arh-info-grid">
                    <div className="arh-info-box full">
                      <span className="arh-lbl">Verified Postal Address</span>
                      <p className="arh-val highlight">{selectedItem.address}</p>
                    </div>

                    <div className="arh-info-box">
                      <span className="arh-lbl">Latitude Coordinates</span>
                      <p className="arh-val">{selectedItem.coordinates?.lat ? `${selectedItem.coordinates.lat}° N` : 'Verified Pin'}</p>
                    </div>

                    <div className="arh-info-box">
                      <span className="arh-lbl">Longitude Coordinates</span>
                      <p className="arh-val">{selectedItem.coordinates?.lng ? `${selectedItem.coordinates.lng}° E` : 'Verified Pin'}</p>
                    </div>
                  </div>

                  <div className="arh-map-btns-row">
                    <button
                      type="button"
                      className="arh-btn-maps-primary"
                      onClick={() => handleOpenGoogleMaps(selectedItem)}
                    >
                      <FaExternalLinkAlt size={13} /> View on Google Maps
                    </button>
                    <button
                      type="button"
                      className="arh-btn-maps-directions"
                      onClick={() => handleGetDirections(selectedItem)}
                    >
                      <FaDirections size={14} /> Get GPS Directions
                    </button>
                  </div>

                  {/* Embedded Google Map Iframe */}
                  <div className="arh-embedded-map">
                    <iframe
                      title={`${selectedItem.name} Google Map Location`}
                      src={`https://maps.google.com/maps?q=${
                        selectedItem.coordinates?.lat && selectedItem.coordinates?.lng
                          ? `${selectedItem.coordinates.lat},${selectedItem.coordinates.lng}`
                          : encodeURIComponent(selectedItem.name + ' ' + (selectedItem.city || selectedItem.district) + ' Arunachal Pradesh')
                      }&hl=en&z=15&output=embed`}
                      width="100%"
                      height="360"
                      style={{ border: 0, borderRadius: '12px' }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              )}

              {/* 10. TRAVEL & ACCOMMODATION */}
              {activeModalTab === 'travel' && (
                <div className="arh-dossier-pane">
                  <div className="arh-pane-title-row">
                    <span className="arh-section-num">Section 10</span>
                    <h3>Connectivity, Mountain Roads & Nearby Accommodations</h3>
                  </div>

                  {/* Transport Grid */}
                  <div className="arh-travel-grid">
                    <div className="arh-tcard">
                      <div className="arh-tcard-icon"><FaTrain size={16} color="#ea580c" /></div>
                      <div>
                        <strong>Nearest Railway Station:</strong>
                        <p>{selectedItem.transportInformation?.nearestRailway || selectedItem.howToReach?.byRail || 'Naharlagun / Bhalukpong / Murkongselek Railway Station'}</p>
                      </div>
                    </div>

                    <div className="arh-tcard">
                      <div className="arh-tcard-icon"><FaPlane size={16} color="#ea580c" /></div>
                      <div>
                        <strong>Nearest Airport / Heliport:</strong>
                        <p>{selectedItem.transportInformation?.nearestAirport || selectedItem.howToReach?.byAir || 'Donyi Polo Airport Itanagar / Tezpur Airport / Guwahati Airport'}</p>
                      </div>
                    </div>

                    <div className="arh-tcard">
                      <div className="arh-tcard-icon"><FaBus size={16} color="#ea580c" /></div>
                      <div>
                        <strong>Bus & Shared Tata Sumo Services:</strong>
                        <p>{selectedItem.transportInformation?.nearestBus || 'APST State Transport buses and shared Tata Sumo taxis connect all district headquarters'}</p>
                      </div>
                    </div>

                    <div className="arh-tcard">
                      <div className="arh-tcard-icon"><FaCar size={16} color="#ea580c" /></div>
                      <div>
                        <strong>Road Highway Connectivity:</strong>
                        <p>{selectedItem.transportInformation?.roadConnectivity || selectedItem.howToReach?.byRoad || 'Trans-Arunachal Highway (NH-13) and Bhalukpong–Bomdila–Tawang Highway'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Hotels & Lodging */}
                  <div className="arh-lodging-box">
                    <h4>Nearby Hotels, Homestays & Tourism Lodges</h4>
                    <p><strong>Hotels & Resorts:</strong> {selectedItem.nearbyFacilities?.hotels || 'District tourism lodges, boutique hotels, and mountain resorts available in vicinity.'}</p>
                    <p><strong>Traditional Homestays:</strong> {selectedItem.nearbyFacilities?.guestHouses || 'Warm indigenous Monpa, Apatani, Adi, and Nyishi homestays offering organic local meals.'}</p>
                    <p><strong>Dining & Cuisine:</strong> {selectedItem.nearbyFacilities?.restaurants || 'Traditional Tibetan noodle bars, steamed momos, Thukpa, and authentic tribal cuisine.'}</p>
                  </div>
                </div>
              )}

              {/* 11. PHOTO GALLERY */}
              {activeModalTab === 'gallery' && (
                <div className="arh-dossier-pane">
                  <div className="arh-pane-title-row">
                    <span className="arh-section-num">Section 11</span>
                    <h3>Authentic High-Resolution Heritage Photo Gallery</h3>
                  </div>

                  <p className="arh-gallery-sub">Click any photo to view in high-resolution lightbox.</p>

                  <div className="arh-gallery-grid">
                    {(Array.isArray(selectedItem.gallery) && selectedItem.gallery.length > 0
                      ? selectedItem.gallery
                      : (selectedItem.images || [selectedItem.image]).map((imgUrl, i) => ({
                          url: imgUrl,
                          caption: `${selectedItem.name} Architectural View ${i + 1}`,
                          category: 'Monument'
                        }))
                    ).map((pic, gIdx) => (
                      <div
                        key={gIdx}
                        className="arh-gal-card"
                        onClick={() => setEnlargedPhoto(pic)}
                      >
                        <div className="arh-gal-thumb-wrap">
                          <img
                            src={pic.url || 'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?auto=format&fit=crop&w=800&q=80'}
                            alt={pic.caption || selectedItem.name}
                            className="arh-gal-thumb"
                            loading="lazy"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?auto=format&fit=crop&w=800&q=80';
                            }}
                          />
                          <div className="arh-gal-overlay">
                            <FaEye size={16} />
                            <span>Enlarge</span>
                          </div>
                          {pic.category && <span className="arh-gal-badge">{pic.category}</span>}
                        </div>
                        <p className="arh-gal-caption">{pic.caption || `${selectedItem.name} View`}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 12. REVIEWS & RATINGS */}
              {activeModalTab === 'reviews' && (
                <div className="arh-dossier-pane">
                  <div className="arh-pane-title-row">
                    <span className="arh-section-num">Section 12</span>
                    <h3>Visitor Experiences, Ratings & Community Reviews</h3>
                  </div>

                  {/* Summary Rating Banner */}
                  <div className="arh-rating-summary-card">
                    <div className="arh-rating-score-box">
                      <span className="arh-big-score">{selectedItem.averageRating || 4.8}</span>
                      <div className="arh-stars-row">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar key={star} size={14} color="#f59e0b" />
                        ))}
                      </div>
                      <span className="arh-total-count">Based on {selectedItem.reviewCount || itemReviews.length || 0} reviews</span>
                    </div>

                    <div className="arh-rating-msg-box">
                      <h4>Share Your Himalayan Experience</h4>
                      <p>Visited {selectedItem.name}? Rate your trip, share tips for future travelers, and contribute to the community archive.</p>
                    </div>
                  </div>

                  {/* Review Submission Form */}
                  <div className="arh-review-form-card">
                    <h4>Write a Visitor Review</h4>
                    <form onSubmit={handleAddReview} className="arh-form">
                      <div className="arh-form-stars-select">
                        <label>Your Rating:</label>
                        <div className="arh-star-picker">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <button
                              key={num}
                              type="button"
                              className={`arh-star-pick-btn ${num <= newRating ? 'active' : ''}`}
                              onClick={() => setNewRating(num)}
                            >
                              <FaStar size={18} />
                            </button>
                          ))}
                          <span className="arh-star-pick-lbl">{newRating} Stars</span>
                        </div>
                      </div>

                      <div className="arh-form-row">
                        <div className="arh-form-group">
                          <label htmlFor="arh-visit-date">Visit Month / Year (Optional)</label>
                          <input
                            id="arh-visit-date"
                            type="text"
                            placeholder="e.g. October 2026"
                            value={newVisitDate}
                            onChange={(e) => setNewVisitDate(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="arh-form-group">
                        <label htmlFor="arh-review-text">Your Experience & Tips *</label>
                        <textarea
                          id="arh-review-text"
                          rows={3}
                          required
                          placeholder="Share your experience: road condition, weather, ILP checks, photography spots, best time of day..."
                          value={newReviewText}
                          onChange={(e) => setNewReviewText(e.target.value)}
                        />
                      </div>

                      {reviewMsg && <p className="arh-form-msg">{reviewMsg}</p>}

                      <button
                        type="submit"
                        className="arh-submit-review-btn"
                        disabled={reviewSubmitting}
                      >
                        <FaCommentDots size={13} /> {reviewSubmitting ? 'Posting Review...' : 'Post Visitor Review'}
                      </button>
                    </form>
                  </div>

                  {/* Existing Reviews List */}
                  <div className="arh-reviews-list-card">
                    <h4>Community Reviews ({itemReviews.length})</h4>
                    {reviewsLoading ? (
                      <p className="arh-reviews-loading">Loading visitor reviews...</p>
                    ) : itemReviews.length === 0 ? (
                      <p className="arh-no-reviews">No visitor reviews submitted yet. Be the first to share your experience!</p>
                    ) : (
                      <div className="arh-reviews-stack">
                        {itemReviews.map((rev) => (
                          <div key={rev._id} className="arh-single-review">
                            <div className="arh-rev-head">
                              <div className="arh-rev-user">
                                <span className="arh-rev-avatar">
                                  <FaUser size={12} color="#7c2d12" />
                                </span>
                                <div>
                                  <strong>{rev.userName || 'Pilgrim'}</strong>
                                  <span className="arh-rev-date">
                                    {rev.visitDate ? `Visited: ${rev.visitDate}` : new Date(rev.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>

                              <div className="arh-rev-stars">
                                {[1, 2, 3, 4, 5].map((s) => (
                                  <FaStar
                                    key={s}
                                    size={11}
                                    color={s <= rev.rating ? '#f59e0b' : '#cbd5e1'}
                                  />
                                ))}
                              </div>
                            </div>

                            <p className="arh-rev-text">{rev.reviewText}</p>

                            <div className="arh-rev-actions">
                              {reportedReviews[rev._id] ? (
                                <span className="arh-reported-tag">✓ Reported for moderation</span>
                              ) : (
                                <button
                                  type="button"
                                  className="arh-report-btn"
                                  onClick={() => handleReportReview(rev._id)}
                                  title="Report review if spam or offensive"
                                >
                                  <FaFlag size={10} /> Report
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 13. RELATED HERITAGE SITES */}
              {activeModalTab === 'related' && (
                <div className="arh-dossier-pane">
                  <div className="arh-pane-title-row">
                    <span className="arh-section-num">Section 13</span>
                    <h3>Related Arunachal Pradesh Heritage Destinations</h3>
                  </div>

                  <p className="arh-related-sub">
                    Explore neighboring monasteries, fortresses, and living tribal heritage in {selectedItem.district} and nearby districts.
                  </p>

                  <div className="arh-related-grid">
                    {destinations
                      .filter((d) => d._id !== selectedItem._id && (d.category === selectedItem.category || d.district === selectedItem.district))
                      .slice(0, 4)
                      .map((rel) => (
                        <div
                          key={rel._id}
                          className="arh-rel-card"
                          onClick={() => handleOpenDetails(rel)}
                        >
                          <img
                            src={rel.image || 'https://images.unsplash.com/photo-1590076212450-42d4a7dbf2be?auto=format&fit=crop&w=400&q=80'}
                            alt={rel.name}
                            className="arh-rel-thumb"
                            loading="lazy"
                          />
                          <div className="arh-rel-body">
                            <h5>{rel.name}</h5>
                            <span className="arh-rel-loc">{rel.district}, AR</span>
                            <span className="arh-rel-cat">{rel.category}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Action Bar */}
            <div className="arh-modal-footer">
              <span className="arh-footer-loc">
                <FaMapMarkerAlt size={12} color="#ea580c" /> {selectedItem.name} • {selectedItem.district}, Arunachal Pradesh
              </span>

              <div className="arh-footer-actions">
                <button
                  type="button"
                  className="arh-btn-footer-dir"
                  onClick={() => handleGetDirections(selectedItem)}
                >
                  <FaDirections size={12} /> Directions
                </button>
                <button
                  type="button"
                  className="arh-btn-footer-close"
                  onClick={() => setSelectedItem(null)}
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {enlargedPhoto && (
        <div className="arh-lightbox-backdrop" onClick={() => setEnlargedPhoto(null)}>
          <div className="arh-lightbox-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="arh-lightbox-close"
              onClick={() => setEnlargedPhoto(null)}
            >
              <FaTimes size={18} />
            </button>
            <img
              src={enlargedPhoto.url}
              alt={enlargedPhoto.caption}
              className="arh-lightbox-img"
            />
            {enlargedPhoto.caption && <p className="arh-lightbox-caption">{enlargedPhoto.caption}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
