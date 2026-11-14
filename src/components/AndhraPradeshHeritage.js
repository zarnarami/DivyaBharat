// src/components/AndhraPradeshHeritage.js
// Dedicated Andhra Pradesh Heritage Module — 20 Verified Historical Destinations, 4 Dynamic Heritage Highlights, 4 User-Friendly Filters & AP Themed Footer Ending
import React, { useState, useEffect, useMemo, useRef } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import './AndhraPradeshHeritage.css';
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

export default function AndhraPradeshHeritage({ stateData, culturalTheme }) {
  const { user } = useAuth();

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 4 Basic, User-Friendly Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPeriod, setSelectedPeriod] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'calendar'

  // Modal & Detail State (13-Section Dossier)
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

  const filterToolbarRef = useRef(null);

  // Fetch 20 AP Heritage Destinations from MongoDB
  useEffect(() => {
    let isMounted = true;
    const fetchApHeritage = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await api.get('/heritage?state=Andhra%20Pradesh&limit=50');
        if (isMounted) {
          if (data && data.success && Array.isArray(data.heritage)) {
            setDestinations(data.heritage);
          } else {
            setError('Could not retrieve Andhra Pradesh heritage records.');
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

    fetchApHeritage();

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

  // Dynamic MongoDB counts for accurate heritage highlights
  const totalCount = destinations.length;

  const fortsCount = useMemo(() => {
    return destinations.filter(
      (d) =>
        d.category === 'Forts & Palaces' ||
        d.name?.toLowerCase().includes('fort') ||
        d.name?.toLowerCase().includes('buruju')
    ).length;
  }, [destinations]);

  const cavesCount = useMemo(() => {
    return destinations.filter(
      (d) => d.category === 'Ancient Caves' || d.name?.toLowerCase().includes('cave')
    ).length;
  }, [destinations]);

  const buddhistCount = useMemo(() => {
    return destinations.filter(
      (d) =>
        d.category === 'Buddhist Heritage' ||
        d.name?.toLowerCase().includes('buddhist') ||
        d.name?.toLowerCase().includes('amaravati')
    ).length;
  }, [destinations]);

  const cavesAndBuddhistCount = cavesCount + buddhistCount;

  const templesCount = useMemo(() => {
    return destinations.filter(
      (d) => d.category === 'Ancient Temples' || d.name?.toLowerCase().includes('temple')
    ).length;
  }, [destinations]);

  const monumentsCount = useMemo(() => {
    return destinations.filter(
      (d) =>
        d.category === 'Historical Towns' ||
        d.category === 'Forts & Palaces' ||
        d.name?.toLowerCase().includes('kurnool') ||
        d.name?.toLowerCase().includes('fort')
    ).length;
  }, [destinations]);

  const archaeologicalCount = useMemo(() => {
    return destinations.filter(
      (d) =>
        d.category === 'Archaeological Sites' ||
        d.name?.toLowerCase().includes('lepakshi') ||
        d.name?.toLowerCase().includes('hemavathi')
    ).length;
  }, [destinations]);

  // Extract unique districts from actual MongoDB records
  const uniqueDistricts = useMemo(() => {
    const set = new Set();
    destinations.forEach((d) => {
      if (d.district) set.add(d.district.trim());
    });
    return Array.from(set).sort();
  }, [destinations]);

  // Extract unique historical periods actually present in MongoDB records
  const uniquePeriods = useMemo(() => {
    const set = new Set();
    destinations.forEach((d) => {
      if (d.historicalPeriod) set.add(d.historicalPeriod.trim());
    });
    return Array.from(set).sort();
  }, [destinations]);

  // Helper function to match category
  const matchesCategoryFilter = (item, cat) => {
    if (!cat || cat === 'All' || cat === 'All Categories') return true;
    const nameLower = (item.name || '').toLowerCase();
    const itemCat = item.category || '';

    if (cat === 'Forts') {
      return itemCat === 'Forts & Palaces' || nameLower.includes('fort') || nameLower.includes('buruju');
    }
    if (cat === 'Caves') {
      return itemCat === 'Ancient Caves' || nameLower.includes('cave');
    }
    if (cat === 'Buddhist Sites') {
      return itemCat === 'Buddhist Heritage' || nameLower.includes('buddhist') || nameLower.includes('amaravati');
    }
    if (cat === 'Caves & Buddhist Sites') {
      return (
        itemCat === 'Ancient Caves' ||
        itemCat === 'Buddhist Heritage' ||
        nameLower.includes('cave') ||
        nameLower.includes('buddhist') ||
        nameLower.includes('amaravati')
      );
    }
    if (cat === 'Temples & Religious Heritage') {
      return itemCat === 'Ancient Temples' || nameLower.includes('temple');
    }
    if (cat === 'Historical Monuments') {
      return (
        itemCat === 'Historical Towns' ||
        itemCat === 'Forts & Palaces' ||
        nameLower.includes('kurnool') ||
        nameLower.includes('fort')
      );
    }
    if (cat === 'Archaeological Sites') {
      return (
        itemCat === 'Archaeological Sites' ||
        nameLower.includes('lepakshi') ||
        nameLower.includes('hemavathi')
      );
    }
    return true;
  };

  // 4 Basic, User-Friendly Filters Working Together
  const filteredDestinations = useMemo(() => {
    return destinations.filter((item) => {
      // 1. Search Heritage by Name or Place
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const mName = item.name?.toLowerCase().includes(q);
        const mAlt =
          item.altName?.toLowerCase().includes(q) ||
          item.altNames?.some((a) => a.toLowerCase().includes(q));
        if (!mName && !mAlt) return false;
      }

      // 2. District Filter
      if (selectedDistrict !== 'All') {
        if (item.district?.toLowerCase() !== selectedDistrict.toLowerCase()) return false;
      }

      // 3. Heritage Category Filter
      if (!matchesCategoryFilter(item, selectedCategory)) {
        return false;
      }

      // 4. Historical Period Filter
      if (selectedPeriod !== 'All') {
        if (item.historicalPeriod !== selectedPeriod) return false;
      }

      return true;
    });
  }, [destinations, searchQuery, selectedDistrict, selectedCategory, selectedPeriod]);

  // Reset all 4 filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDistrict('All');
    setSelectedCategory('All');
    setSelectedPeriod('All');
  };

  // Card click handlers for the 4 top information cards
  const handleTopCardClick = (type) => {
    setViewMode('grid');
    if (type === 'all') {
      setSelectedCategory('All');
      setSelectedDistrict('All');
      setSelectedPeriod('All');
      setSearchQuery('');
    } else if (type === 'forts') {
      setSelectedCategory('Forts');
      setSelectedDistrict('All');
      setSelectedPeriod('All');
    } else if (type === 'caves-buddhist') {
      setSelectedCategory('Caves & Buddhist Sites');
      setSelectedDistrict('All');
      setSelectedPeriod('All');
    } else if (type === 'culture') {
      setViewMode('calendar');
    }

    if (filterToolbarRef.current) {
      filterToolbarRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Open Details Modal (13-Section Dossier)
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
      window.open(
        `https://www.google.com/maps?q=${item.coordinates.lat},${item.coordinates.lng}`,
        '_blank',
        'noopener,noreferrer'
      );
    } else {
      window.open(
        `https://www.google.com/maps/search/${encodeURIComponent(
          item.name + ' ' + (item.city || item.district) + ' Andhra Pradesh'
        )}`,
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  // Open GPS Directions
  const handleGetDirections = (item) => {
    if (item.coordinates?.lat && item.coordinates?.lng) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${item.coordinates.lat},${item.coordinates.lng}`,
        '_blank',
        'noopener,noreferrer'
      );
    } else {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
          item.name + ' ' + (item.city || item.district) + ' Andhra Pradesh'
        )}`,
        '_blank',
        'noopener,noreferrer'
      );
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
        setSelectedItem((prev) => ({
          ...prev,
          reviewCount: (prev.reviewCount || 0) + 1
        }));
      }
    } catch (err) {
      setReviewMsg(
        err.response?.data?.message || 'Failed to submit review. You may have already reviewed this site.'
      );
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
      <div className="aph-loading-wrap">
        <div className="aph-loading-spinner" />
        <p className="aph-loading-text">Loading 20 Andhra Pradesh Heritage Destinations from MongoDB...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="aph-error-banner">
        <FaInfoCircle size={20} color="#b45309" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="aph-root">
      {/* ─────────────────────────────────────────────────────────────
          1. FOUR NEW TOP HERITAGE INFORMATION CARDS (DYNAMIC FROM MONGODB)
          ───────────────────────────────────────────────────────────── */}
      <div className="aph-top-highlights-section">
        <div className="aph-highlights-header">
          <span className="aph-diya-badge">🪔 ANDHRA PRADESH HERITAGE HIGHLIGHTS 🪔</span>
          <h2 className="aph-highlights-heading">Timeless Heritage & Monuments of Andhra Pradesh</h2>
          <p className="aph-highlights-sub">
            Explore {totalCount} documented historical marvels spanning medieval citadels, subterranean limestone caves, Satavahana Buddhist complexes, and timeless living culture.
          </p>
        </div>

        <div className="aph-info-cards-grid">
          {/* Card 1: Historical Heritage */}
          <div
            className={`aph-premium-card ${selectedCategory === 'All' && viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => handleTopCardClick('all')}
            role="button"
            tabIndex={0}
          >
            <div className="aph-card-top-row">
              <div className="aph-card-icon-wrap">
                <span className="aph-card-icon">🏛️</span>
              </div>
              <span className="aph-card-count-badge">{totalCount}</span>
            </div>
            <h3 className="aph-card-title">Historical Heritage</h3>
            <p className="aph-card-desc">
              Ancient historical places, monumental citadels, stepwells, and protected archaeological treasures across Andhra Pradesh.
            </p>
            <div className="aph-card-action-hint">
              <span>View All {totalCount} Sites →</span>
            </div>
          </div>

          {/* Card 2: Ancient Forts & Architecture */}
          <div
            className={`aph-premium-card ${selectedCategory === 'Forts' ? 'active' : ''}`}
            onClick={() => handleTopCardClick('forts')}
            role="button"
            tabIndex={0}
          >
            <div className="aph-card-top-row">
              <div className="aph-card-icon-wrap">
                <span className="aph-card-icon">🏰</span>
              </div>
              <span className="aph-card-count-badge">{fortsCount}</span>
            </div>
            <h3 className="aph-card-title">Ancient Forts & Architecture</h3>
            <p className="aph-card-desc">
              Magnificent hilltop fortresses, medieval stone ramparts, royal citadels, and architectural bastions of historic dynasties.
            </p>
            <div className="aph-card-action-hint">
              <span>Explore {fortsCount} Fortresses →</span>
            </div>
          </div>

          {/* Card 3: Ancient Caves & Buddhist Sites */}
          <div
            className={`aph-premium-card ${selectedCategory === 'Caves & Buddhist Sites' ? 'active' : ''}`}
            onClick={() => handleTopCardClick('caves-buddhist')}
            role="button"
            tabIndex={0}
          >
            <div className="aph-card-top-row">
              <div className="aph-card-icon-wrap">
                <span className="aph-card-icon">🪨</span>
              </div>
              <span className="aph-card-count-badge">{cavesAndBuddhistCount}</span>
            </div>
            <h3 className="aph-card-title">Ancient Caves & Buddhist Sites</h3>
            <p className="aph-card-desc">
              Million-year-old subterranean caves, rock-cut shrines, ancient stupas, and major Buddhist monastic excavations.
            </p>
            <div className="aph-card-action-hint">
              <span>Discover {cavesAndBuddhistCount} Sanctuaries →</span>
            </div>
          </div>

          {/* Card 4: Culture & Traditions */}
          <div
            className={`aph-premium-card ${viewMode === 'calendar' ? 'active' : ''}`}
            onClick={() => handleTopCardClick('culture')}
            role="button"
            tabIndex={0}
          >
            <div className="aph-card-top-row">
              <div className="aph-card-icon-wrap">
                <span className="aph-card-icon">🎭</span>
              </div>
              <span className="aph-card-count-badge text-pill">Living Ethos</span>
            </div>
            <h3 className="aph-card-title">Culture & Traditions</h3>
            <p className="aph-card-desc">
              Kuchipudi classical dance, Kalamkari textile art, Sankranti harvest traditions, and sacred annual heritage festivals.
            </p>
            <div className="aph-card-action-hint">
              <span>View Cultural Calendar →</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. VIEW MODE TOGGLE STRIP (GRID vs CALENDAR)
          ───────────────────────────────────────────────────────────── */}
      <div className="aph-view-switch-strip" ref={filterToolbarRef}>
        <div className="aph-switch-label">
          <span className="aph-switch-diya">🪔</span>
          <span>Explore 20 Andhra Pradesh Heritage Marvels</span>
        </div>
        <div className="aph-view-toggle-btns">
          <button
            type="button"
            className={`aph-view-toggle ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <FaLandmark size={12} /> Heritage Grid ({filteredDestinations.length})
          </button>
          <button
            type="button"
            className={`aph-view-toggle ${viewMode === 'calendar' ? 'active' : ''}`}
            onClick={() => setViewMode('calendar')}
          >
            <FaCalendarAlt size={12} /> Festival & Event Calendar
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. SIMPLIFIED USER-FRIENDLY 4 FILTERS ONLY
          ───────────────────────────────────────────────────────────── */}
      <div className="aph-filter-card">
        <div className="aph-filter-card-header">
          <div className="aph-filter-card-title">
            <FaFilter size={13} color="#b45309" />
            <span>Search & Filter Andhra Pradesh Heritage</span>
          </div>
          <div className="aph-filter-results-badge">
            Showing <strong>{filteredDestinations.length}</strong> of <strong>{totalCount}</strong> Heritage Destinations
          </div>
        </div>

        <div className="aph-filters-grid">
          {/* 1. Search Heritage */}
          <div className="aph-filter-field">
            <label htmlFor="aph-search-input">1. Search Heritage</label>
            <div className="aph-search-input-box">
              <FaSearch className="aph-search-icon" size={13} />
              <input
                id="aph-search-input"
                type="text"
                placeholder="Search heritage by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="aph-clear-search-btn"
                  onClick={() => setSearchQuery('')}
                  title="Clear search text"
                >
                  <FaTimes size={11} />
                </button>
              )}
            </div>
          </div>

          {/* 2. District Filter */}
          <div className="aph-filter-field">
            <label htmlFor="aph-district-select">2. District</label>
            <select
              id="aph-district-select"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              <option value="All">All Districts ({uniqueDistricts.length})</option>
              {uniqueDistricts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Heritage Category Filter */}
          <div className="aph-filter-field">
            <label htmlFor="aph-category-select">3. Heritage Category</label>
            <select
              id="aph-category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories ({totalCount})</option>
              <option value="Forts">Forts ({fortsCount})</option>
              <option value="Caves">Caves ({cavesCount})</option>
              <option value="Buddhist Sites">Buddhist Sites ({buddhistCount})</option>
              <option value="Temples & Religious Heritage">Temples & Religious Heritage ({templesCount})</option>
              <option value="Historical Monuments">Historical Monuments ({monumentsCount})</option>
              <option value="Archaeological Sites">Archaeological Sites ({archaeologicalCount})</option>
            </select>
          </div>

          {/* 4. Historical Period Filter */}
          <div className="aph-filter-field">
            <label htmlFor="aph-period-select">4. Historical Period</label>
            <select
              id="aph-period-select"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="All">All Historical Periods ({uniquePeriods.length})</option>
              {uniquePeriods.map((per) => (
                <option key={per} value={per}>
                  {per}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear All Filters Button */}
        {(searchQuery ||
          selectedDistrict !== 'All' ||
          selectedCategory !== 'All' ||
          selectedPeriod !== 'All') && (
          <div className="aph-filter-footer-bar">
            <span className="aph-active-filter-indicator">
              Active filters applied • <strong>{filteredDestinations.length}</strong> matching
            </span>
            <button
              type="button"
              className="aph-clear-all-btn"
              onClick={handleResetFilters}
            >
              <FaTimes size={11} /> Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. VIEW MODE A: 20 HERITAGE CARDS GRID
          ───────────────────────────────────────────────────────────── */}
      {viewMode === 'grid' && (
        <>
          {filteredDestinations.length === 0 ? (
            <div className="aph-empty-results-box">
              <span className="aph-empty-icon">🏛️</span>
              <h3>No Heritage Destinations Found</h3>
              <p>
                No Andhra Pradesh heritage destinations match your current filter selections. Try adjusting your search term or clearing your filters.
              </p>
              <button
                type="button"
                className="aph-empty-reset-btn"
                onClick={handleResetFilters}
              >
                Clear All Filters & Show All {totalCount} Destinations
              </button>
            </div>
          ) : (
            <div className="aph-destinations-grid">
              {filteredDestinations.map((item, idx) => (
                <div key={item._id || idx} className="aph-card">
                  {/* Card Image */}
                  <div className="aph-card-img-wrap">
                    <img
                      src={
                        item.image ||
                        (item.images && item.images[0]) ||
                        'https://images.unsplash.com/photo-1590076212457-3a1315b497cb?auto=format&fit=crop&w=800&q=80'
                      }
                      alt={item.name}
                      className="aph-card-img"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          'https://images.unsplash.com/photo-1590076212457-3a1315b497cb?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="aph-card-gradient" />

                    <div className="aph-card-top-badges">
                      <span className="aph-card-cat-badge">{item.category}</span>
                      {item.featured && (
                        <span className="aph-card-featured-badge">
                          <FaCrown size={10} /> Featured
                        </span>
                      )}
                    </div>

                    <div className="aph-card-loc-pill">
                      <FaMapMarkerAlt size={10} /> {item.city ? `${item.city}, ` : ''}
                      {item.district}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="aph-card-body">
                    <h3 className="aph-card-title">{item.name}</h3>

                    {item.altName && (
                      <p className="aph-card-alt-name">
                        <em>{item.altName}</em>
                      </p>
                    )}

                    <div className="aph-card-history-meta">
                      <span className="aph-meta-tag">
                        <FaHistory size={10} color="#b45309" />{' '}
                        {item.establishmentPeriod || item.historicalPeriod}
                      </span>
                      <span className="aph-meta-tag">
                        <FaCrown size={10} color="#78350f" />{' '}
                        {item.dynasty?.split(',')[0]?.trim() || 'Ancient Andhra'}
                      </span>
                    </div>

                    <p className="aph-card-desc">{item.description}</p>

                    <div className="aph-card-stats-row">
                      <div className="aph-stat-rating">
                        <FaStar size={11} color="#f59e0b" />
                        <strong>{item.averageRating || 4.8}</strong>
                        <span className="aph-review-cnt">({item.reviewCount || 0} reviews)</span>
                      </div>
                      <div className="aph-stat-timing">
                        <FaClock size={11} color="#64748b" />
                        <span>
                          {item.visitorInformation?.openingTime || '09:00 AM'} –{' '}
                          {item.visitorInformation?.closingTime || '05:30 PM'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="aph-card-footer">
                    <button
                      type="button"
                      className="aph-view-details-btn"
                      onClick={() => handleOpenDetails(item)}
                    >
                      <FaLandmark size={12} /> View Full Heritage Dossier
                    </button>

                    <div className="aph-quick-actions">
                      <button
                        type="button"
                        className="aph-action-btn map"
                        title="View on Google Maps"
                        onClick={() => handleOpenGoogleMaps(item)}
                      >
                        <FaMapMarkerAlt size={12} />
                      </button>
                      <button
                        type="button"
                        className="aph-action-btn dir"
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

      {/* ─────────────────────────────────────────────────────────────
          5. VIEW MODE B: FESTIVAL & EVENT CALENDAR
          ───────────────────────────────────────────────────────────── */}
      {viewMode === 'calendar' && (
        <div className="aph-calendar-section">
          <div className="aph-calendar-header">
            <span className="aph-mini-tag">📅 Cultural Timeline</span>
            <h3>Andhra Pradesh Heritage Festivals & Annual Events</h3>
            <p>
              Annual historical celebrations, cultural carnivals, and sacred commemorations hosted at these {totalCount} destinations.
            </p>
          </div>

          <div className="aph-calendar-grid">
            {destinations.flatMap((d) =>
              (d.festivals || []).map((fest, fIdx) => (
                <div key={`${d._id}-${fIdx}`} className="aph-event-card">
                  <div className="aph-event-header">
                    <div className="aph-event-date-box">
                      <FaCalendarAlt size={16} color="#b45309" />
                      <span className="aph-event-month">{fest.month || 'Annual'}</span>
                    </div>
                    <div className="aph-event-site-info">
                      <span className="aph-event-site-name">{d.name}</span>
                      <span className="aph-event-loc">
                        <FaMapMarkerAlt size={10} /> {d.district}, AP
                      </span>
                    </div>
                  </div>

                  <h4 className="aph-event-title">{fest.name}</h4>
                  <p className="aph-event-desc">{fest.description}</p>

                  <div className="aph-event-footer">
                    <button
                      type="button"
                      className="aph-event-link-btn"
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

      {/* ─────────────────────────────────────────────────────────────
          6. ANDHRA PRADESH THEMED FOOTER ENDING
          ───────────────────────────────────────────────────────────── */}
      <div className="aph-heritage-footer-ending">
        <div className="aph-footer-ornament-top">
          <span className="aph-footer-ornament-line" />
          <span className="aph-footer-diya">🪔</span>
          <span className="aph-footer-motif">🏛️ • 🏰 • 🪨 • 🎭</span>
          <span className="aph-footer-diya">🪔</span>
          <span className="aph-footer-ornament-line" />
        </div>

        <div className="aph-footer-content-wrap">
          <span className="aph-footer-eyebrow">AMARAVATI • RAYALASEEMA • COASTAL ANDHRA</span>
          <h2 className="aph-footer-state-title">ANDHRA PRADESH</h2>
          <p className="aph-footer-desc">
            Explore the timeless heritage, ancient monuments, magnificent architecture and cultural traditions of Andhra Pradesh.
          </p>
          <div className="aph-footer-closing-badge">
            <span className="aph-footer-star">✦</span>
            <p className="aph-footer-closing-line">
              Discover the Past. Preserve the Heritage. Celebrate Andhra Pradesh.
            </p>
            <span className="aph-footer-star">✦</span>
          </div>
        </div>

        <div className="aph-footer-ornament-bottom">
          <span className="aph-footer-ornament-line" />
          <span className="aph-footer-lotus">🪷</span>
          <span className="aph-footer-ornament-line" />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          7. COMPLETE 13-SECTION HERITAGE DOSSIER MODAL
          ───────────────────────────────────────────────────────────── */}
      {selectedItem && (
        <div
          className="aph-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedItem(null);
          }}
        >
          <div className="aph-modal-container" role="dialog" aria-modal="true">
            {/* Modal Header */}
            <div className="aph-modal-header">
              <div className="aph-modal-header-main">
                <div className="aph-modal-badges">
                  <span className="aph-badge-cat">{selectedItem.category}</span>
                  <span className="aph-badge-state">Andhra Pradesh</span>
                  {selectedItem.district && (
                    <span className="aph-badge-dist">
                      <FaMapMarkerAlt size={10} /> {selectedItem.district} District
                    </span>
                  )}
                  {selectedItem.featured && (
                    <span className="aph-badge-feat">
                      <FaCrown size={10} /> Featured Heritage
                    </span>
                  )}
                </div>
                <h2 className="aph-modal-title">{selectedItem.name}</h2>
                {selectedItem.altName && (
                  <p className="aph-modal-alt">
                    <em>{selectedItem.altName}</em>
                  </p>
                )}
              </div>

              <button
                type="button"
                className="aph-modal-close"
                onClick={() => setSelectedItem(null)}
                aria-label="Close"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* Modal Quick Meta Ribbon */}
            <div className="aph-modal-ribbon">
              <div className="aph-ribbon-item">
                <span className="aph-ribbon-icon">👑</span>
                <div>
                  <span className="aph-ribbon-lbl">Dynasty / Rulers</span>
                  <strong>
                    {selectedItem.dynasty?.split(',')[0] ||
                      selectedItem.historicalRulers ||
                      'Ancient Andhra'}
                  </strong>
                </div>
              </div>
              <div className="aph-ribbon-item">
                <span className="aph-ribbon-icon">📜</span>
                <div>
                  <span className="aph-ribbon-lbl">Establishment Era</span>
                  <strong>
                    {selectedItem.establishmentPeriod || selectedItem.historicalPeriod}
                  </strong>
                </div>
              </div>
              <div className="aph-ribbon-item">
                <span className="aph-ribbon-icon">🕒</span>
                <div>
                  <span className="aph-ribbon-lbl">Visiting Hours</span>
                  <strong>
                    {selectedItem.visitorInformation?.openingTime || '09:00 AM'} –{' '}
                    {selectedItem.visitorInformation?.closingTime || '05:30 PM'}
                  </strong>
                </div>
              </div>
              <div className="aph-ribbon-item">
                <span className="aph-ribbon-icon">⭐</span>
                <div>
                  <span className="aph-ribbon-lbl">Visitor Rating</span>
                  <strong>
                    {selectedItem.averageRating || 4.8} ★ ({selectedItem.reviewCount || 0} reviews)
                  </strong>
                </div>
              </div>
            </div>

            {/* Modal 13-Section Navigation Bar */}
            <div className="aph-modal-tabs-bar">
              <button
                type="button"
                className={`aph-mtab ${activeModalTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('overview')}
              >
                1. Overview
              </button>
              <button
                type="button"
                className={`aph-mtab ${activeModalTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('history')}
              >
                2. History & Timeline
              </button>
              <button
                type="button"
                className={`aph-mtab ${activeModalTab === 'significance' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('significance')}
              >
                3. Significance
              </button>
              <button
                type="button"
                className={`aph-mtab ${activeModalTab === 'architecture' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('architecture')}
              >
                4. Architecture
              </button>
              <button
                type="button"
                className={`aph-mtab ${activeModalTab === 'deity' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('deity')}
              >
                5. Deity & Culture
              </button>
              <button
                type="button"
                className={`aph-mtab ${activeModalTab === 'rituals' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('rituals')}
              >
                6. Rituals & Events
              </button>
              <button
                type="button"
                className={`aph-mtab ${activeModalTab === 'guidelines' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('guidelines')}
              >
                7. Guidelines
              </button>
              <button
                type="button"
                className={`aph-mtab ${activeModalTab === 'timings' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('timings')}
              >
                8. Hours & Tickets
              </button>
              <button
                type="button"
                className={`aph-mtab ${activeModalTab === 'maps' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('maps')}
              >
                9. Google Maps
              </button>
              <button
                type="button"
                className={`aph-mtab ${activeModalTab === 'travel' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('travel')}
              >
                10. Travel & Stays
              </button>
              <button
                type="button"
                className={`aph-mtab ${activeModalTab === 'gallery' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('gallery')}
              >
                11. Gallery ({selectedItem.gallery?.length || selectedItem.images?.length || 1})
              </button>
              <button
                type="button"
                className={`aph-mtab ${activeModalTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('reviews')}
              >
                12. Reviews ({itemReviews.length})
              </button>
              <button
                type="button"
                className={`aph-mtab ${activeModalTab === 'related' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('related')}
              >
                13. Related Sites
              </button>
            </div>

            {/* Modal Body: 13 Comprehensive Dossier Panes */}
            <div className="aph-modal-body">
              {/* 1. OVERVIEW */}
              {activeModalTab === 'overview' && (
                <div className="aph-dossier-pane">
                  <div className="aph-pane-title-row">
                    <span className="aph-section-num">Section 1</span>
                    <h3>Destination Overview & Identification</h3>
                  </div>

                  <div className="aph-info-grid">
                    <div className="aph-info-box">
                      <span className="aph-lbl">Official Name</span>
                      <p className="aph-val highlight">{selectedItem.name}</p>
                    </div>

                    <div className="aph-info-box">
                      <span className="aph-lbl">Category</span>
                      <p className="aph-val">{selectedItem.category}</p>
                    </div>

                    <div className="aph-info-box full">
                      <span className="aph-lbl">Full Location & Address</span>
                      <p className="aph-val">
                        {selectedItem.address ||
                          `${selectedItem.city || ''}, ${selectedItem.district}, Andhra Pradesh`}
                      </p>
                    </div>

                    <div className="aph-info-box full">
                      <span className="aph-lbl">Short Comprehensive Summary</span>
                      <p className="aph-val prose">{selectedItem.description}</p>
                    </div>

                    <div className="aph-info-box">
                      <span className="aph-lbl">Archaeological Protection Status</span>
                      <p className="aph-val">
                        {selectedItem.sourceName ||
                          'Archaeological Survey of India / AP State Archaeology'}
                      </p>
                    </div>

                    <div className="aph-info-box">
                      <span className="aph-lbl">UNESCO Recognition</span>
                      <p className="aph-val">{selectedItem.unescoStatus || 'None'}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. HISTORY & TIMELINE */}
              {activeModalTab === 'history' && (
                <div className="aph-dossier-pane">
                  <div className="aph-pane-title-row">
                    <span className="aph-section-num">Section 2</span>
                    <h3>Historical Background, Origin & Chronological Timeline</h3>
                  </div>

                  <div className="aph-prose-card">
                    <h4>Origin & Establishment</h4>
                    <p className="aph-prose">
                      {selectedItem.historicalBackground || selectedItem.history}
                    </p>
                  </div>

                  {Array.isArray(selectedItem.timeline) && selectedItem.timeline.length > 0 && (
                    <div className="aph-timeline-card">
                      <h4>Historical Chronology</h4>
                      <div className="aph-timeline-list">
                        {selectedItem.timeline.map((step, tIdx) => (
                          <div key={tIdx} className="aph-tline-item">
                            <div className="aph-tline-dot">{tIdx + 1}</div>
                            <div className="aph-tline-content">
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
                <div className="aph-dossier-pane">
                  <div className="aph-pane-title-row">
                    <span className="aph-section-num">Section 3</span>
                    <h3>Cultural Importance, Dynasties & Historic Legends</h3>
                  </div>

                  <div className="aph-info-grid">
                    <div className="aph-info-box full">
                      <span className="aph-lbl">Cultural & Regional Importance</span>
                      <p className="aph-val prose">
                        {selectedItem.culturalImportance || selectedItem.culturalSignificance}
                      </p>
                    </div>

                    <div className="aph-info-box full">
                      <span className="aph-lbl">Associated Dynasties & Monarchs</span>
                      <p className="aph-val highlight">
                        {selectedItem.dynasty}{' '}
                        {selectedItem.historicalRulers
                          ? `(Rulers: ${selectedItem.historicalRulers})`
                          : ''}
                      </p>
                    </div>

                    <div className="aph-info-box full">
                      <span className="aph-lbl">Archaeological Highlights</span>
                      <p className="aph-val prose">
                        {selectedItem.archaeologicalImportance ||
                          'Protected archaeological monument featuring ancient stone relics and structures.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. ARCHITECTURE */}
              {activeModalTab === 'architecture' && (
                <div className="aph-dossier-pane">
                  <div className="aph-pane-title-row">
                    <span className="aph-section-num">Section 4</span>
                    <h3>Architectural Style, Masonry & Master Stonecraft</h3>
                  </div>

                  <div className="aph-prose-card">
                    <h4>Architectural Grandeur</h4>
                    <p className="aph-prose">
                      {selectedItem.architecture || selectedItem.architecturalStyle}
                    </p>
                  </div>

                  <div className="aph-info-grid">
                    <div className="aph-info-box">
                      <span className="aph-lbl">Architectural Style Category</span>
                      <p className="aph-val">
                        {selectedItem.architecturalStyle || 'Traditional Indian Architecture'}
                      </p>
                    </div>
                    <div className="aph-info-box">
                      <span className="aph-lbl">Preservation Entity</span>
                      <p className="aph-val">
                        Archaeological Survey of India / AP State Archaeology
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. DEITY / CULTURAL INFORMATION */}
              {activeModalTab === 'deity' && (
                <div className="aph-dossier-pane">
                  <div className="aph-pane-title-row">
                    <span className="aph-section-num">Section 5</span>
                    <h3>Religious / Cultural Significance & Mythological Context</h3>
                  </div>

                  {selectedItem.deityDetails?.hasReligiousSignificance ? (
                    <div className="aph-religious-card">
                      <div className="aph-rel-hero">
                        <span className="aph-rel-icon">🔱</span>
                        <div>
                          <span className="aph-rel-lbl">Principal Presiding Deity</span>
                          <h4>{selectedItem.deityDetails.mainDeity}</h4>
                        </div>
                      </div>

                      {Array.isArray(selectedItem.deityDetails.associatedDeities) &&
                        selectedItem.deityDetails.associatedDeities.length > 0 && (
                          <div className="aph-assoc-deities">
                            <span className="aph-lbl">Associated Deities</span>
                            <div className="aph-deity-pills">
                              {selectedItem.deityDetails.associatedDeities.map((d, dIdx) => (
                                <span key={dIdx} className="aph-dpill">
                                  {d}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                      <div className="aph-myth-box">
                        <span className="aph-lbl">Mythological Lore & Sthala Purana</span>
                        <p className="aph-prose">
                          {selectedItem.deityDetails.mythology ||
                            selectedItem.deityDetails.religiousSignificance}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="aph-secular-notice">
                      <FaLandmark size={24} color="#b45309" />
                      <h4>Secular Heritage / Archaeological Monument</h4>
                      <p>
                        This destination is a historic citadel, natural cave system, or ancient archaeological site. It is preserved for its supreme military, political, natural, and architectural heritage without active temple pooja traditions.
                      </p>
                      {selectedItem.culturalImportance && (
                        <div className="aph-secular-culture">
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
                <div className="aph-dossier-pane">
                  <div className="aph-pane-title-row">
                    <span className="aph-section-num">Section 6</span>
                    <h3>Rituals, Daily Schedules & Scheduled Activities</h3>
                  </div>

                  <div className="aph-info-grid">
                    <div className="aph-info-box full">
                      <span className="aph-lbl">Daily Schedule & Public Access</span>
                      <p className="aph-val">
                        {selectedItem.rituals?.daily?.[0] ||
                          selectedItem.visitorInformation?.timings ||
                          'Open daily for visitors from 09:00 AM to 05:30 PM.'}
                      </p>
                    </div>

                    {selectedItem.rituals?.specialCeremonies && (
                      <div className="aph-info-box full">
                        <span className="aph-lbl">Special Ceremonies & Cultural Gatherings</span>
                        <p className="aph-val">{selectedItem.rituals.specialCeremonies}</p>
                      </div>
                    )}

                    {Array.isArray(selectedItem.festivals) &&
                      selectedItem.festivals.length > 0 && (
                        <div className="aph-info-box full">
                          <span className="aph-lbl">Associated Annual Festivals</span>
                          <div className="aph-fest-chips">
                            {selectedItem.festivals.map((fest, fIdx) => (
                              <div key={fIdx} className="aph-fest-chip">
                                <strong>{fest.name}</strong> ({fest.month || 'Annual'}):{' '}
                                {fest.description}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              )}

              {/* 7. VISITOR GUIDELINES */}
              {activeModalTab === 'guidelines' && (
                <div className="aph-dossier-pane">
                  <div className="aph-pane-title-row">
                    <span className="aph-section-num">Section 7</span>
                    <h3>Visitor Guidelines, Protocol & Dress Code</h3>
                  </div>

                  <div className="aph-guidelines-grid">
                    <div className="aph-gl-card">
                      <div className="aph-gl-icon">
                        <FaTshirt size={14} color="#b45309" />
                      </div>
                      <div>
                        <strong>Recommended Dress Code:</strong>
                        <p>
                          {selectedItem.visitorInformation?.dressCode ||
                            'Comfortable walking clothing and sturdy sports shoes'}
                        </p>
                      </div>
                    </div>

                    <div className="aph-gl-card">
                      <div className="aph-gl-icon">
                        <FaCamera size={14} color="#b45309" />
                      </div>
                      <div>
                        <strong>Photography Rules:</strong>
                        <p>
                          {selectedItem.visitorInformation?.photography ||
                            'Permitted throughout monument complex and viewpoints'}
                        </p>
                      </div>
                    </div>

                    <div className="aph-gl-card">
                      <div className="aph-gl-icon">
                        <FaWheelchair size={14} color="#b45309" />
                      </div>
                      <div>
                        <strong>Accessibility Information:</strong>
                        <p>
                          {selectedItem.visitorInformation?.accessibility ||
                            'Paved pathways available at ground level; upper ramparts require stair climbing'}
                        </p>
                      </div>
                    </div>

                    <div className="aph-gl-card">
                      <div className="aph-gl-icon">
                        <FaInfoCircle size={14} color="#b45309" />
                      </div>
                      <div>
                        <strong>Restrictions & Preservation Rules:</strong>
                        <p>
                          {selectedItem.visitorInformation?.restrictions ||
                            'Do not litter; defacing historic stone ramparts is strictly prohibited under Ancient Monuments Act'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 8. HOURS & TICKETS */}
              {activeModalTab === 'timings' && (
                <div className="aph-dossier-pane">
                  <div className="aph-pane-title-row">
                    <span className="aph-section-num">Section 8</span>
                    <h3>Opening Hours, Entry Fees & Ticket Booking</h3>
                  </div>

                  <div className="aph-info-grid">
                    <div className="aph-info-box">
                      <span className="aph-lbl">Opening Time</span>
                      <p className="aph-val highlight">
                        {selectedItem.visitorInformation?.openingTime || '09:00 AM'}
                      </p>
                    </div>

                    <div className="aph-info-box">
                      <span className="aph-lbl">Closing Time</span>
                      <p className="aph-val highlight">
                        {selectedItem.visitorInformation?.closingTime || '05:30 PM'}
                      </p>
                    </div>

                    <div className="aph-info-box full">
                      <span className="aph-lbl">Entry Fees & Tariff</span>
                      <p className="aph-val highlight">
                        {selectedItem.visitorInformation?.entryFees ||
                          'Free / Nominal ASI Ticket'}
                      </p>
                    </div>

                    <div className="aph-info-box full">
                      <span className="aph-lbl">Ticket Booking Information</span>
                      <p className="aph-val">
                        {selectedItem.visitorInformation?.ticketBooking ||
                          'Available on-spot at entrance ticket counter and online via official portal.'}
                      </p>
                    </div>

                    <div className="aph-info-box">
                      <span className="aph-lbl">Best Time to Visit</span>
                      <p className="aph-val">
                        {selectedItem.visitorInformation?.bestTimeToVisit || 'October to March'}
                      </p>
                    </div>

                    <div className="aph-info-box">
                      <span className="aph-lbl">Estimated Visiting Duration</span>
                      <p className="aph-val">
                        {selectedItem.visitorInformation?.visitingDuration || '2 to 3 hours'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 9. GOOGLE MAPS */}
              {activeModalTab === 'maps' && (
                <div className="aph-dossier-pane">
                  <div className="aph-pane-title-row">
                    <span className="aph-section-num">Section 9</span>
                    <h3>Exact GPS Coordinates, Location & Google Maps</h3>
                  </div>

                  <div className="aph-info-grid">
                    <div className="aph-info-box full">
                      <span className="aph-lbl">Verified Postal Address</span>
                      <p className="aph-val highlight">{selectedItem.address}</p>
                    </div>

                    <div className="aph-info-box">
                      <span className="aph-lbl">Latitude Coordinates</span>
                      <p className="aph-val">
                        {selectedItem.coordinates?.lat
                          ? `${selectedItem.coordinates.lat}° N`
                          : 'Verified Pin'}
                      </p>
                    </div>

                    <div className="aph-info-box">
                      <span className="aph-lbl">Longitude Coordinates</span>
                      <p className="aph-val">
                        {selectedItem.coordinates?.lng
                          ? `${selectedItem.coordinates.lng}° E`
                          : 'Verified Pin'}
                      </p>
                    </div>
                  </div>

                  <div className="aph-map-btns-row">
                    <button
                      type="button"
                      className="aph-btn-maps-primary"
                      onClick={() => handleOpenGoogleMaps(selectedItem)}
                    >
                      <FaExternalLinkAlt size={13} /> View on Google Maps
                    </button>
                    <button
                      type="button"
                      className="aph-btn-maps-directions"
                      onClick={() => handleGetDirections(selectedItem)}
                    >
                      <FaDirections size={14} /> Get GPS Directions
                    </button>
                  </div>

                  {/* Embedded Google Map Iframe */}
                  <div className="aph-embedded-map">
                    <iframe
                      title={`${selectedItem.name} Google Map Location`}
                      src={`https://maps.google.com/maps?q=${
                        selectedItem.coordinates?.lat && selectedItem.coordinates?.lng
                          ? `${selectedItem.coordinates.lat},${selectedItem.coordinates.lng}`
                          : encodeURIComponent(
                              selectedItem.name +
                                ' ' +
                                (selectedItem.city || selectedItem.district) +
                                ' Andhra Pradesh'
                            )
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
                <div className="aph-dossier-pane">
                  <div className="aph-pane-title-row">
                    <span className="aph-section-num">Section 10</span>
                    <h3>Connectivity, Public Transport & Nearby Accommodations</h3>
                  </div>

                  {/* Transport Grid */}
                  <div className="aph-travel-grid">
                    <div className="aph-tcard">
                      <div className="aph-tcard-icon">
                        <FaTrain size={16} color="#b45309" />
                      </div>
                      <div>
                        <strong>Nearest Railway Station:</strong>
                        <p>
                          {selectedItem.transportInformation?.nearestRailway ||
                            selectedItem.howToReach?.byRail ||
                            'Railway station located nearby'}
                        </p>
                      </div>
                    </div>

                    <div className="aph-tcard">
                      <div className="aph-tcard-icon">
                        <FaPlane size={16} color="#b45309" />
                      </div>
                      <div>
                        <strong>Nearest Airport:</strong>
                        <p>
                          {selectedItem.transportInformation?.nearestAirport ||
                            selectedItem.howToReach?.byAir ||
                            'Major regional airport connects destination'}
                        </p>
                      </div>
                    </div>

                    <div className="aph-tcard">
                      <div className="aph-tcard-icon">
                        <FaBus size={16} color="#b45309" />
                      </div>
                      <div>
                        <strong>Bus Connectivity:</strong>
                        <p>
                          {selectedItem.transportInformation?.nearestBus ||
                            'APSRTC buses operate frequent services'}
                        </p>
                      </div>
                    </div>

                    <div className="aph-tcard">
                      <div className="aph-tcard-icon">
                        <FaCar size={16} color="#b45309" />
                      </div>
                      <div>
                        <strong>Road Connectivity & Cabs:</strong>
                        <p>
                          {selectedItem.transportInformation?.roadConnectivity ||
                            selectedItem.howToReach?.byRoad ||
                            'Accessible via state highways'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Hotels & Lodging */}
                  <div className="aph-lodging-box">
                    <h4>Nearby Hotels, Guest Houses & Resorts</h4>
                    <p>
                      <strong>Hotels & Resorts:</strong>{' '}
                      {selectedItem.nearbyFacilities?.hotels ||
                        'AP Tourism Haritha and private hotels available in vicinity'}
                    </p>
                    <p>
                      <strong>Guest Houses:</strong>{' '}
                      {selectedItem.nearbyFacilities?.guestHouses ||
                        'Government inspection bungalows and guest cottages'}
                    </p>
                    <p>
                      <strong>Restaurants & Dining:</strong>{' '}
                      {selectedItem.nearbyFacilities?.restaurants ||
                        'Traditional Andhra meals and South Indian eateries'}
                    </p>
                  </div>
                </div>
              )}

              {/* 11. PHOTO GALLERY */}
              {activeModalTab === 'gallery' && (
                <div className="aph-dossier-pane">
                  <div className="aph-pane-title-row">
                    <span className="aph-section-num">Section 11</span>
                    <h3>Authentic High-Resolution Heritage Photo Gallery</h3>
                  </div>

                  <p className="aph-gallery-sub">Click any photo to view in high-resolution lightbox.</p>

                  <div className="aph-gallery-grid">
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
                        className="aph-gal-card"
                        onClick={() => setEnlargedPhoto(pic)}
                      >
                        <div className="aph-gal-thumb-wrap">
                          <img
                            src={
                              pic.url ||
                              'https://images.unsplash.com/photo-1590076212457-3a1315b497cb?auto=format&fit=crop&w=800&q=80'
                            }
                            alt={pic.caption || selectedItem.name}
                            className="aph-gal-thumb"
                            loading="lazy"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                'https://images.unsplash.com/photo-1590076212457-3a1315b497cb?auto=format&fit=crop&w=800&q=80';
                            }}
                          />
                          <div className="aph-gal-overlay">
                            <FaEye size={16} />
                            <span>Enlarge</span>
                          </div>
                          {pic.category && <span className="aph-gal-badge">{pic.category}</span>}
                        </div>
                        <p className="aph-gal-caption">{pic.caption || `${selectedItem.name} View`}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 12. REVIEWS & RATINGS */}
              {activeModalTab === 'reviews' && (
                <div className="aph-dossier-pane">
                  <div className="aph-pane-title-row">
                    <span className="aph-section-num">Section 12</span>
                    <h3>Visitor Experiences, Ratings & Community Reviews</h3>
                  </div>

                  {/* Summary Rating Banner */}
                  <div className="aph-rating-summary-card">
                    <div className="aph-rating-score-box">
                      <span className="aph-big-score">{selectedItem.averageRating || 4.8}</span>
                      <div className="aph-stars-row">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar key={star} size={14} color="#f59e0b" />
                        ))}
                      </div>
                      <span className="aph-total-count">
                        Based on {selectedItem.reviewCount || itemReviews.length || 0} reviews
                      </span>
                    </div>

                    <div className="aph-rating-msg-box">
                      <h4>Share Your Heritage Experience</h4>
                      <p>
                        Visited {selectedItem.name}? Rate your trip, share tips for future travelers, and contribute to the community archive.
                      </p>
                    </div>
                  </div>

                  {/* Review Submission Form */}
                  <div className="aph-review-form-card">
                    <h4>Write a Visitor Review</h4>
                    <form onSubmit={handleAddReview} className="aph-form">
                      <div className="aph-form-stars-select">
                        <label>Your Rating:</label>
                        <div className="aph-star-picker">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <button
                              key={num}
                              type="button"
                              className={`aph-star-pick-btn ${num <= newRating ? 'active' : ''}`}
                              onClick={() => setNewRating(num)}
                            >
                              <FaStar size={18} />
                            </button>
                          ))}
                          <span className="aph-star-pick-lbl">{newRating} Stars</span>
                        </div>
                      </div>

                      <div className="aph-form-row">
                        <div className="aph-form-group">
                          <label htmlFor="aph-visit-date">Visit Month / Year (Optional)</label>
                          <input
                            id="aph-visit-date"
                            type="text"
                            placeholder="e.g. October 2026"
                            value={newVisitDate}
                            onChange={(e) => setNewVisitDate(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="aph-form-group">
                        <label htmlFor="aph-review-text">Your Experience & Tips *</label>
                        <textarea
                          id="aph-review-text"
                          rows={3}
                          required
                          placeholder="Share your experience: crowd levels, photography spots, road condition, best time of day..."
                          value={newReviewText}
                          onChange={(e) => setNewReviewText(e.target.value)}
                        />
                      </div>

                      {reviewMsg && <p className="aph-form-msg">{reviewMsg}</p>}

                      <button
                        type="submit"
                        className="aph-submit-review-btn"
                        disabled={reviewSubmitting}
                      >
                        <FaCommentDots size={13} /> {reviewSubmitting ? 'Posting Review...' : 'Post Visitor Review'}
                      </button>
                    </form>
                  </div>

                  {/* Existing Reviews List */}
                  <div className="aph-reviews-list-card">
                    <h4>Community Reviews ({itemReviews.length})</h4>
                    {reviewsLoading ? (
                      <p className="aph-reviews-loading">Loading visitor reviews...</p>
                    ) : itemReviews.length === 0 ? (
                      <p className="aph-no-reviews">
                        No visitor reviews submitted yet. Be the first to share your experience!
                      </p>
                    ) : (
                      <div className="aph-reviews-stack">
                        {itemReviews.map((rev) => (
                          <div key={rev._id} className="aph-single-review">
                            <div className="aph-rev-head">
                              <div className="aph-rev-user">
                                <span className="aph-rev-avatar">
                                  <FaUser size={12} color="#78350f" />
                                </span>
                                <div>
                                  <strong>{rev.userName || 'Devotee'}</strong>
                                  <span className="aph-rev-date">
                                    {rev.visitDate
                                      ? `Visited: ${rev.visitDate}`
                                      : new Date(rev.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>

                              <div className="aph-rev-stars">
                                {[1, 2, 3, 4, 5].map((s) => (
                                  <FaStar
                                    key={s}
                                    size={11}
                                    color={s <= rev.rating ? '#f59e0b' : '#cbd5e1'}
                                  />
                                ))}
                              </div>
                            </div>

                            <p className="aph-rev-text">{rev.reviewText}</p>

                            <div className="aph-rev-actions">
                              {reportedReviews[rev._id] ? (
                                <span className="aph-reported-tag">✓ Reported for moderation</span>
                              ) : (
                                <button
                                  type="button"
                                  className="aph-report-btn"
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
                <div className="aph-dossier-pane">
                  <div className="aph-pane-title-row">
                    <span className="aph-section-num">Section 13</span>
                    <h3>Related Andhra Pradesh Heritage Destinations</h3>
                  </div>

                  <p className="aph-related-sub">
                    Explore neighboring fortresses, caves, and historical sites in {selectedItem.district} and nearby districts.
                  </p>

                  <div className="aph-related-grid">
                    {destinations
                      .filter(
                        (d) =>
                          d._id !== selectedItem._id &&
                          (d.category === selectedItem.category || d.district === selectedItem.district)
                      )
                      .slice(0, 4)
                      .map((rel) => (
                        <div
                          key={rel._id}
                          className="aph-rel-card"
                          onClick={() => handleOpenDetails(rel)}
                        >
                          <img
                            src={
                              rel.image ||
                              'https://images.unsplash.com/photo-1590076212457-3a1315b497cb?auto=format&fit=crop&w=400&q=80'
                            }
                            alt={rel.name}
                            className="aph-rel-thumb"
                            loading="lazy"
                          />
                          <div className="aph-rel-body">
                            <h5>{rel.name}</h5>
                            <span className="aph-rel-loc">{rel.district}, AP</span>
                            <span className="aph-rel-cat">{rel.category}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Action Bar */}
            <div className="aph-modal-footer">
              <span className="aph-footer-loc">
                <FaMapMarkerAlt size={12} color="#b45309" /> {selectedItem.name} • {selectedItem.district}, Andhra Pradesh
              </span>

              <div className="aph-footer-actions">
                <button
                  type="button"
                  className="aph-btn-footer-dir"
                  onClick={() => handleGetDirections(selectedItem)}
                >
                  <FaDirections size={12} /> Directions
                </button>
                <button
                  type="button"
                  className="aph-btn-footer-close"
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
        <div className="aph-lightbox-backdrop" onClick={() => setEnlargedPhoto(null)}>
          <div className="aph-lightbox-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="aph-lightbox-close"
              onClick={() => setEnlargedPhoto(null)}
            >
              <FaTimes size={18} />
            </button>
            <img
              src={enlargedPhoto.url}
              alt={enlargedPhoto.caption}
              className="aph-lightbox-img"
            />
            {enlargedPhoto.caption && (
              <p className="aph-lightbox-caption">{enlargedPhoto.caption}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
