// src/ProfilePage.js — Dedicated User / Profile Page for DivyaBharat
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import api from './services/api';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './ProfilePage.css';

import {
  FaUser,
  FaHeart,
  FaGlobe,
  FaPalette,
  FaCog,
  FaInfoCircle,
  FaSignInAlt,
  FaSignOutAlt,
  FaCheck,
  FaEdit,
  FaSave,
  FaTimes,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaCheckCircle,
} from 'react-icons/fa';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, updateUser, logout } = useAuth();

  // Local storage profile info (for guest explorers)
  const storedName = localStorage.getItem('db_user_name') || '';
  const storedAge = localStorage.getItem('db_user_age') || '';
  const storedContact = localStorage.getItem('db_user_contact') || '';

  // Dynamic user data resolution
  const displayName = user?.name || storedName || 'Heritage Explorer';
  const displayEmail = user?.email || (storedName ? `${storedName.toLowerCase().replace(/\s+/g, '')}@divyabharat.local` : 'explorer@divyabharat.local');
  const displayPhone = user?.phone || storedContact || '';
  const displayLocation = user?.location || 'Bharat';
  const displayRole = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : 'Explorer';
  const firstLetter = (displayName?.trim()?.charAt(0) || 'D').toUpperCase();

  // Profile Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: displayName,
    phone: displayPhone,
    location: user?.location || '',
  });
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  // Wishlist & Activity Stats
  const [savedCount, setSavedCount] = useState(0);
  const [progressStats, setProgressStats] = useState(null);
  const [quizStats, setQuizStats] = useState(null);

  // Preference States
  const [currentLang, setCurrentLang] = useState(localStorage.getItem('db_lang') || 'en');
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('db_theme') || 'light');
  const [audioAmbient, setAudioAmbient] = useState(localStorage.getItem('db_audio') === 'true');

  // Load wishlist count and user stats
  useEffect(() => {
    setEditForm({
      name: displayName,
      phone: displayPhone,
      location: user?.location || '',
    });

    const loadData = async () => {
      try {
        const [wishlistRes, progressRes, quizRes] = await Promise.allSettled([
          api.get('/users/wishlist'),
          api.get('/progress/my'),
          api.get('/quiz-results/my'),
        ]);

        if (wishlistRes.status === 'fulfilled' && wishlistRes.value.data?.success) {
          setSavedCount(wishlistRes.value.data.savedPlaces?.length || 0);
        }
        if (progressRes.status === 'fulfilled' && progressRes.value.data?.success) {
          setProgressStats(progressRes.value.data.stats);
        }
        if (quizRes.status === 'fulfilled' && quizRes.value.data?.success) {
          setQuizStats(quizRes.value.data.stats);
        }
      } catch (err) {
        // Fallback silently if unauthenticated or offline
      }
    };

    loadData();
  }, [user, displayName, displayPhone]);

  // Handle Profile Save
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveMsg('');

    try {
      if (user && updateUser) {
        const { data } = await api.put('/auth/profile', editForm);
        if (data?.success) {
          updateUser(data.user);
        }
      }

      // Always sync to localStorage
      if (editForm.name) localStorage.setItem('db_user_name', editForm.name.trim());
      if (editForm.phone) localStorage.setItem('db_user_contact', editForm.phone.trim());

      setSaveMsg('Profile updated successfully!');
      setTimeout(() => {
        setSaveMsg('');
        setIsEditing(false);
      }, 1600);
    } catch (err) {
      setSaveMsg('Unable to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Language Change
  const handleLangSelect = (langCode) => {
    setCurrentLang(langCode);
    localStorage.setItem('db_lang', langCode);
  };

  // Theme Change
  const handleThemeSelect = (themeMode) => {
    setCurrentTheme(themeMode);
    localStorage.setItem('db_theme', themeMode);
    document.body.dataset.theme = themeMode;
  };

  // Audio Ambience Change
  const handleAudioToggle = (checked) => {
    setAudioAmbient(checked);
    localStorage.setItem('db_audio', checked ? 'true' : 'false');
  };

  // Logout Handler
  const handleLogout = () => {
    if (logout) logout();
    localStorage.removeItem('db_user_name');
    localStorage.removeItem('db_user_age');
    localStorage.removeItem('db_user_contact');
    navigate('/');
  };

  return (
    <div className="db-user-page-container">
      {/* Common Header with Sound, Notification, Language & Profile */}
      <Navbar />

      {/* ═══════════════════════════════════════
          2. MAIN CONTENT WRAPPER
         ═══════════════════════════════════════ */}
      <main className="db-user-main">
        {/* ═══════════════════════════════════════
            TOP PROFILE SECTION
           ═══════════════════════════════════════ */}
        <section className="db-user-profile-hero" aria-label="User Profile Summary">
          <div className="db-user-avatar-circle">
            <span>{firstLetter}</span>
          </div>

          <div className="db-user-hero-info">
            <div className="db-user-hero-header">
              <h1 className="db-user-display-name">{displayName}</h1>
              <span className="db-user-role-badge">{displayRole}</span>
            </div>

            <div className="db-user-meta-chips">
              <span className="db-user-chip">
                <FaEnvelope className="chip-icon" />
                {displayEmail}
              </span>
              {displayPhone && (
                <span className="db-user-chip">
                  <FaPhone className="chip-icon" />
                  {displayPhone}
                </span>
              )}
              {storedAge && (
                <span className="db-user-chip">
                  <FaBirthdayCake className="chip-icon" />
                  {storedAge} yrs
                </span>
              )}
              {displayLocation && (
                <span className="db-user-chip">
                  <FaMapMarkerAlt className="chip-icon" />
                  {displayLocation}
                </span>
              )}
            </div>

            {/* LEARNING / ACTIVITY HIGHLIGHTS (If present) */}
            {(savedCount > 0 || progressStats?.completedModules > 0 || quizStats?.avgScore > 0) && (
              <div className="db-user-hero-stats">
                <div className="db-hero-stat">
                  <strong>{savedCount}</strong>
                  <small>Saved Sites</small>
                </div>
                {progressStats && (
                  <div className="db-hero-stat">
                    <strong>{progressStats.completedModules || 0}</strong>
                    <small>Completed Modules</small>
                  </div>
                )}
                {quizStats && (
                  <div className="db-hero-stat">
                    <strong>{quizStats.avgScore || 0}%</strong>
                    <small>Avg Quiz Score</small>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════
            DEDICATED USER OPTIONS (Exact Order)
           ═══════════════════════════════════════ */}
        <div className="db-user-options-list" role="list">
          {/* 1. MY PROFILE */}
          <div className="db-user-option-card" role="listitem">
            <div className="db-user-option-header">
              <div className="db-user-option-icon-box profile-icon">
                <FaUser />
              </div>
              <div className="db-user-option-texts">
                <h3 className="db-user-option-title">My Profile</h3>
                <p className="db-user-option-desc">Personal details, contact and explorer identity</p>
              </div>
              <button
                type="button"
                className="db-user-action-btn pill-toggle"
                onClick={() => setIsEditing(!isEditing)}
                aria-expanded={isEditing}
              >
                {isEditing ? (
                  <>
                    <FaTimes size={12} />
                    <span>Close</span>
                  </>
                ) : (
                  <>
                    <FaEdit size={12} />
                    <span>View / Edit</span>
                  </>
                )}
              </button>
            </div>

            {/* EXPANDABLE INLINE EDIT FORM */}
            {isEditing && (
              <div className="db-user-profile-edit-panel">
                <form onSubmit={handleSaveProfile} className="db-user-profile-form">
                  <div className="db-user-form-grid">
                    <div className="db-user-form-group">
                      <label htmlFor="edit-name">Full Name</label>
                      <input
                        id="edit-name"
                        type="text"
                        placeholder="Enter full name"
                        value={editForm.name}
                        onChange={(e) => setEditForm((p) => ({ ...p, name: e.target.value }))}
                        className="db-user-form-input"
                        required
                      />
                    </div>

                    <div className="db-user-form-group">
                      <label htmlFor="edit-phone">Phone / Contact</label>
                      <input
                        id="edit-phone"
                        type="tel"
                        placeholder="10-digit phone number"
                        value={editForm.phone}
                        onChange={(e) => setEditForm((p) => ({ ...p, phone: e.target.value }))}
                        className="db-user-form-input"
                      />
                    </div>

                    <div className="db-user-form-group full-width">
                      <label htmlFor="edit-location">Location / State</label>
                      <input
                        id="edit-location"
                        type="text"
                        placeholder="City, State (e.g. Varanasi, Uttar Pradesh)"
                        value={editForm.location}
                        onChange={(e) => setEditForm((p) => ({ ...p, location: e.target.value }))}
                        className="db-user-form-input"
                      />
                    </div>
                  </div>

                  {saveMsg && (
                    <div
                      className={`db-user-save-alert ${
                        saveMsg.includes('success') ? 'alert-success' : 'alert-error'
                      }`}
                    >
                      <FaCheckCircle size={14} />
                      <span>{saveMsg}</span>
                    </div>
                  )}

                  <div className="db-user-form-actions">
                    <button
                      type="button"
                      className="db-user-cancel-btn"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="db-user-save-btn" disabled={saving}>
                      <FaSave size={13} />
                      <span>{saving ? 'Saving...' : 'Save Profile'}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* 2. WISHLIST */}
          <div className="db-user-option-card clickable-card" role="listitem">
            <div className="db-user-option-header">
              <div className="db-user-option-icon-box wishlist-icon">
                <FaHeart />
              </div>
              <div className="db-user-option-texts">
                <h3 className="db-user-option-title">Wishlist</h3>
                <p className="db-user-option-desc">
                  View and manage your saved temples and heritage places
                </p>
              </div>
              <div className="db-user-action-group">
                <span className="db-user-count-badge">
                  {savedCount} Saved
                </span>
                <button
                  type="button"
                  className="db-user-action-btn primary"
                  onClick={() => navigate('/saved')}
                >
                  View Wishlist →
                </button>
              </div>
            </div>
          </div>

          {/* 3. TRANSLATE / LANGUAGE */}
          <div className="db-user-option-card" role="listitem">
            <div className="db-user-option-header wrap-on-mobile">
              <div className="db-user-option-icon-box language-icon">
                <FaGlobe />
              </div>
              <div className="db-user-option-texts">
                <h3 className="db-user-option-title">Translate / Language (भाषा)</h3>
                <p className="db-user-option-desc">Select your preferred application language</p>
              </div>
              <div className="db-user-choice-pills">
                <button
                  type="button"
                  className={`db-choice-pill ${currentLang === 'en' ? 'active' : ''}`}
                  onClick={() => handleLangSelect('en')}
                >
                  {currentLang === 'en' && <FaCheck className="pill-check" />}
                  <span>English</span>
                </button>

                <button
                  type="button"
                  className={`db-choice-pill ${currentLang === 'hi' ? 'active' : ''}`}
                  onClick={() => handleLangSelect('hi')}
                >
                  {currentLang === 'hi' && <FaCheck className="pill-check" />}
                  <span>हिंदी</span>
                </button>
              </div>
            </div>
          </div>

          {/* 4. THEME */}
          <div className="db-user-option-card" role="listitem">
            <div className="db-user-option-header wrap-on-mobile">
              <div className="db-user-option-icon-box theme-icon">
                <FaPalette />
              </div>
              <div className="db-user-option-texts">
                <h3 className="db-user-option-title">Theme & Appearance</h3>
                <p className="db-user-option-desc">
                  Select your visual palette (Light, Dark, or System)
                </p>
              </div>
              <div className="db-user-choice-pills">
                <button
                  type="button"
                  className={`db-choice-pill ${currentTheme === 'light' ? 'active' : ''}`}
                  onClick={() => handleThemeSelect('light')}
                  title="Royal Cream Pastel (Default)"
                >
                  {currentTheme === 'light' && <FaCheck className="pill-check" />}
                  <span>Light</span>
                </button>

                <button
                  type="button"
                  className={`db-choice-pill ${currentTheme === 'dark' ? 'active' : ''}`}
                  onClick={() => handleThemeSelect('dark')}
                  title="Midnight Sanctuary Theme"
                >
                  {currentTheme === 'dark' && <FaCheck className="pill-check" />}
                  <span>Dark</span>
                </button>

                <button
                  type="button"
                  className={`db-choice-pill ${currentTheme === 'system' ? 'active' : ''}`}
                  onClick={() => handleThemeSelect('system')}
                  title="Device System Preference"
                >
                  {currentTheme === 'system' && <FaCheck className="pill-check" />}
                  <span>System</span>
                </button>
              </div>
            </div>
          </div>

          {/* 5. SETTINGS */}
          <div className="db-user-option-card" role="listitem">
            <div className="db-user-option-header">
              <div className="db-user-option-icon-box settings-icon">
                <FaCog />
              </div>
              <div className="db-user-option-texts">
                <h3 className="db-user-option-title">Settings</h3>
                <p className="db-user-option-desc">
                  Temple ambient chimes & audio preferences
                </p>
              </div>
              <div className="db-user-setting-toggle">
                <span className="db-toggle-label">
                  {audioAmbient ? 'Chimes Enabled' : 'Chimes Muted'}
                </span>
                <label className="db-switch" title="Toggle Temple Ambient Chimes">
                  <input
                    type="checkbox"
                    checked={audioAmbient}
                    onChange={(e) => handleAudioToggle(e.target.checked)}
                  />
                  <span className="db-slider" />
                </label>
              </div>
            </div>
          </div>

          {/* 6. ABOUT US */}
          <div className="db-user-option-card clickable-card" role="listitem">
            <div className="db-user-option-header">
              <div className="db-user-option-icon-box about-icon">
                <FaInfoCircle />
              </div>
              <div className="db-user-option-texts">
                <h3 className="db-user-option-title">About Us</h3>
                <p className="db-user-option-desc">
                  Discover the heritage conservation vision and story of DivyaBharat
                </p>
              </div>
              <button
                type="button"
                className="db-user-action-btn secondary"
                onClick={() => navigate('/about')}
              >
                About DivyaBharat →
              </button>
            </div>
          </div>

          {/* ═══════════════════════════════════════
              SUBTLE ROYAL DIVIDER
             ═══════════════════════════════════════ */}
          <div className="db-user-options-divider" aria-hidden="true">
            <span className="divider-line" />
            <span className="divider-ornament">✦</span>
            <span className="divider-line" />
          </div>

          {/* 7. LOGIN */}
          <div className="db-user-option-card" role="listitem">
            <div className="db-user-option-header">
              <div className="db-user-option-icon-box login-icon">
                <FaSignInAlt />
              </div>
              <div className="db-user-option-texts">
                <h3 className="db-user-option-title">Login</h3>
                <p className="db-user-option-desc">
                  Sign in with another account or switch explorer profile
                </p>
              </div>
              <button
                type="button"
                className="db-user-action-btn outline-btn"
                onClick={() => navigate('/')}
              >
                Sign In →
              </button>
            </div>
          </div>

          {/* 8. LOGOUT */}
          <div className="db-user-option-card logout-card" role="listitem">
            <div className="db-user-option-header">
              <div className="db-user-option-icon-box logout-icon">
                <FaSignOutAlt />
              </div>
              <div className="db-user-option-texts">
                <h3 className="db-user-option-title">Logout</h3>
                <p className="db-user-option-desc">
                  Sign out of the application and end the current session
                </p>
              </div>
              <button
                type="button"
                className="db-user-action-btn danger-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
