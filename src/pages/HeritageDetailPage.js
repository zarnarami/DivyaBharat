// src/pages/HeritageDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeritageCard from '../components/HeritageCard';
import { PageLoader } from '../components/LoadingSpinner';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import './HeritageDetailPage.css';
import {
  FaMapMarkerAlt, FaCalendarAlt, FaHeart, FaRegHeart,
  FaBook, FaQuestionCircle, FaExternalLinkAlt, FaArrowLeft,
  FaCheckCircle, FaDownload, FaShareAlt, FaCheck
} from 'react-icons/fa';

import { HERITAGE_LOCATIONS } from '../data/heritageLocations';

export default function HeritageDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [heritage, setHeritage] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [savedIds, setSavedIds] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // If id is a state/UT slug or name (e.g. /heritage/gujarat or /heritage/rajasthan), redirect to state page
    if (id) {
      const matchedState = HERITAGE_LOCATIONS.find(
        (loc) =>
          loc.slug.toLowerCase() === id.toLowerCase() ||
          loc.name.toLowerCase() === id.toLowerCase()
      );
      if (matchedState) {
        navigate(`/states/${encodeURIComponent(matchedState.name)}`, { replace: true });
        return;
      }
    }

    const fetchHeritage = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await api.get(`/heritage/${id}`);
        if (data.success) {
          setHeritage(data.heritage);
          setRelated(data.related || []);
        }
      } catch (err) {
        setError('Heritage not found or failed to load.');
      }
      setLoading(false);
    };
    fetchHeritage();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) return;
      try {
        const { data } = await api.get('/users/wishlist');
        if (data.success) {
          const ids = data.savedPlaces.map(p => p._id);
          setSavedIds(ids);
          setIsSaved(ids.includes(id));
        }
      } catch (err) {}
    };
    fetchWishlist();
  }, [user, id]);

  const handleSave = async () => {
    if (!user) { navigate('/'); return; }
    try {
      if (isSaved) {
        await api.delete(`/users/wishlist/${id}`);
        setIsSaved(false);
      } else {
        await api.post(`/users/wishlist/${id}`);
        setIsSaved(true);
      }
    } catch (err) { console.error('Wishlist error:', err); }
  };

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

  const handleDownloadPDF = () => {
    if (!heritage) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to open and print the Heritage Dossier.');
      return;
    }

    const factsHtml = heritage.importantFacts && heritage.importantFacts.length > 0
      ? heritage.importantFacts.map(f => `<li>${f}</li>`).join('')
      : '<li>Documented in the official cultural survey and archaeological archives of Bharat.</li>';

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>DivyaBharat Dossier - ${heritage.name}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap');
    @page { size: A4; margin: 15mm; }
    body {
      font-family: 'Inter', sans-serif;
      background: #fff;
      color: #2b1810;
      margin: 0;
      padding: 24px;
      line-height: 1.6;
    }
    .header {
      border-bottom: 2px solid #e6ab82;
      padding-bottom: 14px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .brand {
      font-family: 'Cormorant Garamond', serif;
      font-size: 28px;
      font-weight: 700;
      color: #8b2500;
      letter-spacing: 1px;
    }
    .tagline {
      font-size: 11px;
      color: #8a6050;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-top: 2px;
    }
    .badge {
      display: inline-block;
      background: #fde8da;
      color: #8b2500;
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      border: 1px solid #e6ab82;
    }
    .unesco-badge {
      background: #fef3c7;
      color: #92400e;
      border: 1px solid #f59e0b;
    }
    h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 34px;
      color: #3c1f16;
      margin: 0 0 10px 0;
      font-weight: 700;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      background: #fff8f4;
      border: 1px solid #f0d5c4;
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 20px;
    }
    .meta-item strong {
      display: block;
      font-size: 11px;
      text-transform: uppercase;
      color: #8a6050;
      letter-spacing: 0.5px;
    }
    .meta-item span {
      font-size: 13.5px;
      font-weight: 600;
      color: #3c1f16;
    }
    h2 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 20px;
      color: #8b2500;
      border-bottom: 1px solid #f0d5c4;
      padding-bottom: 5px;
      margin-top: 20px;
      margin-bottom: 8px;
    }
    p { font-size: 13px; margin: 0 0 10px 0; color: #3d271d; text-align: justify; }
    ul { margin: 6px 0 14px 20px; padding: 0; }
    li { font-size: 13px; margin-bottom: 5px; color: #3d271d; }
    .footer {
      margin-top: 30px;
      padding-top: 12px;
      border-top: 1px solid #e2c0b0;
      font-size: 11px;
      color: #8a6050;
      display: flex;
      justify-content: space-between;
    }
    .seal {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-weight: 600;
      color: #166534;
    }
    @media print {
      body { padding: 0; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand">DIVYABHARAT</div>
      <div class="tagline">Heritage Learning Hub of Bharat • Educational Dossier</div>
    </div>
    <div>
      <span class="badge">${heritage.category || 'Heritage Site'}</span>
      ${heritage.unescoListed ? '<span class="badge unesco-badge">⭐ UNESCO World Heritage</span>' : ''}
    </div>
  </div>

  <h1>${heritage.name}</h1>

  <div class="meta-grid">
    <div class="meta-item">
      <strong>Location & State</strong>
      <span>${heritage.location || heritage.state}, ${heritage.state}</span>
    </div>
    <div class="meta-item">
      <strong>Historical Period</strong>
      <span>${heritage.historicalPeriod || 'Ancient / Classical Bharat'}</span>
    </div>
    <div class="meta-item">
      <strong>Status</strong>
      <span>${heritage.unescoListed ? 'UNESCO World Heritage' : 'National Monument'}</span>
    </div>
  </div>

  <h2>Historical Overview</h2>
  <p>${heritage.description || 'Verified heritage information recorded in the DivyaBharat archive.'}</p>

  ${heritage.culturalSignificance ? `
    <h2>Cultural & Spiritual Significance</h2>
    <p>${heritage.culturalSignificance}</p>
  ` : ''}

  ${heritage.architecturalSignificance ? `
    <h2>Architectural Heritage & Marvels</h2>
    <p>${heritage.architecturalSignificance}</p>
  ` : ''}

  <h2>Key Documentation & Facts</h2>
  <ul>${factsHtml}</ul>

  <h2>Source & Attribution</h2>
  <p><strong>Primary Source:</strong> ${heritage.sourceName || 'Archaeological Survey of India (ASI)'}</p>
  ${heritage.sourceUrl ? `<p><strong>Official Reference:</strong> ${heritage.sourceUrl}</p>` : ''}

  <div class="footer">
    <div>
      <span class="seal">✓ DivyaBharat Verified Heritage Archive</span> • Preserving Bharatiya Sanskriti
    </div>
    <div>
      Date: ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
    </div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 350);
    };
  </script>
</body>
</html>`;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  };

  if (loading) return <><Navbar /><PageLoader /></>;
  if (error) return (
    <><Navbar />
      <div className="db-detail-error">
        <div className="db-detail-error-content">
          <p>⚠️ {error}</p>
          <button onClick={() => navigate('/heritage')}>← Back to Heritage</button>
        </div>
      </div>
    </>
  );

  const placeholderEmoji = {
    Temple: '🛕', Monument: '🏛️', Festival: '🎊',
    Tradition: '🪔', 'Art Form': '🎭', 'Historical Place': '🗺️',
    'Historical Event': '📜', 'Natural Heritage': '🌿'
  };

  return (
    <div className="db-detail-page">
      <Navbar />

      {/* HERO */}
      <div className="db-detail-hero">
        {heritage.image ? (
          <img src={heritage.image} alt={heritage.name} className="db-detail-hero-img"
            onError={(e) => { e.target.style.display='none'; }} />
        ) : (
          <div className="db-detail-hero-placeholder">
            <span>{placeholderEmoji[heritage.category] || '🏛️'}</span>
          </div>
        )}
        <div className="db-detail-hero-overlay" />
        <div className="db-detail-hero-content">
          <button className="db-detail-back-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft size={14} /> Back
          </button>
          <div className="db-detail-badges">
            <span className="db-detail-category-badge">{heritage.category}</span>
            {heritage.unescoListed && <span className="db-detail-unesco-badge">⭐ UNESCO World Heritage</span>}
          </div>
          <h1>{heritage.name}</h1>
          <div className="db-detail-meta">
            <span><FaMapMarkerAlt size={13} /> {heritage.location || heritage.state}</span>
            {heritage.historicalPeriod && (
              <span><FaCalendarAlt size={13} /> {heritage.historicalPeriod}</span>
            )}
          </div>
        </div>
      </div>

      <div className="db-detail-main">
        <div className="db-detail-layout">
          {/* LEFT CONTENT */}
          <div className="db-detail-left">
            {/* ACTIONS */}
            <div className="db-detail-actions">
              <button
                className={`db-detail-action-btn ${isSaved ? 'saved' : ''}`}
                onClick={handleSave}
              >
                {isSaved ? <FaHeart size={15} /> : <FaRegHeart size={15} />}
                {isSaved ? 'Saved' : 'Save Place'}
              </button>
              <button
                className="db-detail-action-btn"
                onClick={handleDownloadPDF}
                title="Download printable educational dossier (PDF)"
              >
                <FaDownload size={14} /> Download PDF
              </button>
              <button
                className="db-detail-action-btn"
                onClick={handleShare}
                title="Share link to this heritage site"
              >
                {copied ? <FaCheck size={14} color="#166534" /> : <FaShareAlt size={14} />}
                {copied ? 'Link Copied!' : 'Share'}
              </button>
              <Link to="/learning" className="db-detail-action-btn primary">
                <FaBook size={15} /> Start Learning
              </Link>
              <Link to="/quiz" className="db-detail-action-btn primary">
                <FaQuestionCircle size={15} /> Take Quiz
              </Link>
            </div>

            {/* DESCRIPTION */}
            <section className="db-detail-section">
              <h2>About</h2>
              <p>{heritage.description}</p>
            </section>

            {/* HISTORICAL PERIOD */}
            {heritage.historicalPeriod && (
              <section className="db-detail-section">
                <h2><FaCalendarAlt size={16} /> Historical Period</h2>
                <div className="db-detail-highlight-box">
                  <p>{heritage.historicalPeriod}</p>
                </div>
              </section>
            )}

            {/* CULTURAL SIGNIFICANCE */}
            {heritage.culturalSignificance && (
              <section className="db-detail-section">
                <h2>Cultural Significance</h2>
                <p>{heritage.culturalSignificance}</p>
              </section>
            )}

            {/* ARCHITECTURAL SIGNIFICANCE */}
            {heritage.architecturalSignificance && (
              <section className="db-detail-section">
                <h2>Architectural Significance</h2>
                <p>{heritage.architecturalSignificance}</p>
              </section>
            )}

            {/* IMPORTANT FACTS */}
            {heritage.importantFacts && heritage.importantFacts.length > 0 && (
              <section className="db-detail-section">
                <h2>Important Facts</h2>
                <ul className="db-detail-facts">
                  {heritage.importantFacts.map((fact, i) => (
                    <li key={i}>
                      <FaCheckCircle size={14} className="db-detail-fact-icon" />
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* SOURCE */}
            <section className="db-detail-section db-detail-source">
              <h2>Source & References</h2>
              <div className="db-detail-source-box">
                <p><strong>Source:</strong> {heritage.sourceName}</p>
                {heritage.sourceUrl && (
                  <a href={heritage.sourceUrl} target="_blank" rel="noopener noreferrer">
                    View Official Source <FaExternalLinkAlt size={11} />
                  </a>
                )}
                {heritage.verified && (
                  <span className="db-detail-verified">
                    <FaCheckCircle size={12} /> Verified Information
                  </span>
                )}
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="db-detail-sidebar">
            <div className="db-detail-info-card">
              <h3>Heritage Details</h3>
              <div className="db-detail-info-row">
                <span className="db-detail-info-label">Category</span>
                <span className="db-detail-info-value">{heritage.category}</span>
              </div>
              <div className="db-detail-info-row">
                <span className="db-detail-info-label">State</span>
                <span className="db-detail-info-value">{heritage.state}</span>
              </div>
              {heritage.location && (
                <div className="db-detail-info-row">
                  <span className="db-detail-info-label">Location</span>
                  <span className="db-detail-info-value">{heritage.location}</span>
                </div>
              )}
              {heritage.historicalPeriod && (
                <div className="db-detail-info-row">
                  <span className="db-detail-info-label">Period</span>
                  <span className="db-detail-info-value">{heritage.historicalPeriod}</span>
                </div>
              )}
              <div className="db-detail-info-row">
                <span className="db-detail-info-label">UNESCO Listed</span>
                <span className="db-detail-info-value">
                  {heritage.unescoListed ? '⭐ Yes' : 'No'}
                </span>
              </div>
              <div className="db-detail-info-row">
                <span className="db-detail-info-label">Status</span>
                <span className="db-detail-info-value db-detail-status-approved">✓ Verified</span>
              </div>
            </div>

            <div className="db-detail-explore-card">
              <h3>Explore More</h3>
              <Link to={`/states/${encodeURIComponent(heritage.state)}`} className="db-detail-explore-link">
                <FaMapMarkerAlt size={13} />
                More from {heritage.state}
              </Link>
              <Link to={`/heritage?category=${heritage.category}`} className="db-detail-explore-link">
                🏛️ More {heritage.category}s
              </Link>
              <Link to="/learning" className="db-detail-explore-link">
                📚 Start Learning Module
              </Link>
            </div>
          </aside>
        </div>

        {/* RELATED HERITAGE */}
        {related.length > 0 && (
          <section className="db-detail-related">
            <h2>Related Heritage</h2>
            <div className="db-detail-related-grid">
              {related.map(h => (
                <HeritageCard key={h._id} heritage={h} savedIds={savedIds}
                  onSaveToggle={(hid, saved) => setSavedIds(p => saved ? [...p, hid] : p.filter(i => i !== hid))} />
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
}
