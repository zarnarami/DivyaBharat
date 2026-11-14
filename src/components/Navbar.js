// src/components/Navbar.js — DivyaBharat Common Application Header
// Left: DivyaBharat Logo | Temples | Heritage
// Right: Sound 🔊 | Notification 🔔 | User Login / Profile 👤
// Consistent across ALL pages: Home, Temples, Heritage, States, About Us, Wishlist, etc.

import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useMusic } from '../context/MusicContext';
import { useNotifications } from '../context/NotificationContext';
import './Navbar.css';
import logo from '../assets/logo.png';
import {
  FaUser,
  FaHeart,
  FaBook,
  FaQuestionCircle,
  FaCog,
  FaSignOutAlt,
  FaUserShield,
  FaBell,
  FaVolumeUp,
  FaVolumeMute,
  FaGlobe,
} from 'react-icons/fa';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { isPlaying, toggleMusic } = useMusic();
  const { notifications, unreadCount, markAsRead, markAllRead } = useNotifications();

  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  const handleToggleLanguage = () => {
    const nextLang = language === 'en' ? 'hi' : 'en';
    setLanguage(nextLang);
  };

  const firstName = user?.name?.split(' ')[0] || '';
  const initial = user?.name?.charAt(0)?.toUpperCase() || '';

  return (
    <header className={`db-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="db-navbar-inner">
        {/* ══════════════════════════════════════════════
            LEFT SIDE: LOGO + 2 NAVIGATION OPTIONS
            1. Temples
            2. Heritage
            (Logo unchanged and acts as direct link to Home)
           ══════════════════════════════════════════════ */}
        <div className="db-nav-left">
          {/* DivyaBharat Official Brand Logo */}
          <Link to="/home" className="db-nav-logo" title="DivyaBharat Home">
            <img src={logo} alt="DivyaBharat Logo" />
            <div className="db-nav-logo-text">
              <h2>DivyaBharat</h2>
              <p>{t('home.tagline', 'Rooted in Culture, United in Spirit')}</p>
            </div>
          </Link>

          {/* Display ONLY these two navigation options: Temples & Heritage */}
          <nav className="db-nav-links" aria-label="Main Navigation">
            <NavLink
              to="/temples"
              className={({ isActive }) => `db-nav-link ${isActive ? 'active' : ''}`}
            >
              {t('nav.temples', 'Temples')}
            </NavLink>
            <NavLink
              to="/heritage"
              className={({ isActive }) => `db-nav-link ${isActive ? 'active' : ''}`}
            >
              {t('nav.heritage', 'Heritage')}
            </NavLink>
          </nav>
        </div>

        {/* ══════════════════════════════════════════════
            RIGHT CORNER: 3 REQUIRED OPTIONS
            1. 🔊 Sound
            2. 🔔 Notification
            3. 👤 User Login / Profile
           ══════════════════════════════════════════════ */}
        <div className="db-nav-right">
          {/* OPTION 1: 🔊 SOUND ICON */}
          <button
            type="button"
            className={`db-nav-action-btn db-nav-sound-btn ${isPlaying ? 'active' : ''}`}
            onClick={toggleMusic}
            title={
              isPlaying
                ? t('audio.mute', 'Mute Application Sound')
                : t('audio.peaceful', 'Enable Background Sound (Om Chant)')
            }
            aria-label="Toggle Application Sound"
          >
            {isPlaying ? (
              <FaVolumeUp className="db-nav-icon sound-on" />
            ) : (
              <FaVolumeMute className="db-nav-icon sound-off" />
            )}
          </button>

          {/* OPTION 2: 🔔 NOTIFICATION ICON */}
          <div className="db-nav-notif-wrap" ref={notifRef}>
            <button
              type="button"
              className={`db-nav-action-btn db-nav-notif-btn ${notifOpen ? 'open' : ''}`}
              onClick={() => setNotifOpen(!notifOpen)}
              title={t('notif.title', 'Notifications')}
              aria-label="Application Notifications"
              aria-expanded={notifOpen}
            >
              <FaBell className="db-nav-icon" />
              {unreadCount > 0 && (
                <span className="db-nav-notif-badge">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Drawer */}
            {notifOpen && (
              <div className="db-notif-dropdown">
                <div className="db-notif-header">
                  <h4>{t('notif.title', 'Notifications')}</h4>
                  {unreadCount > 0 && (
                    <button type="button" onClick={markAllRead}>
                      {t('notif.markAllRead', 'Mark all read')}
                    </button>
                  )}
                </div>

                <div className="db-notif-list">
                  {notifications.length === 0 ? (
                    <div className="db-notif-empty">
                      {t('notif.noNotifications', 'No notifications yet')}
                    </div>
                  ) : (
                    notifications.map((item) => (
                      <Link
                        key={item._id}
                        to={item.link || '#'}
                        className={`db-notif-item ${!item.isRead ? 'unread' : ''}`}
                        onClick={() => {
                          if (!item.isRead) markAsRead(item._id);
                          setNotifOpen(false);
                        }}
                      >
                        <div className="db-notif-icon">
                          {item.icon === 'temple'
                            ? '🛕'
                            : item.icon === 'heritage'
                            ? '🏛️'
                            : item.icon === 'festival'
                            ? '🪔'
                            : '🔔'}
                        </div>
                        <div className="db-notif-content">
                          <h5>
                            {language === 'hi' && item.titleHi ? item.titleHi : item.title}
                          </h5>
                          <p>
                            {language === 'hi' && item.messageHi ? item.messageHi : item.message}
                          </p>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* OPTION 3: 👤 USER LOGIN / PROFILE ICON */}
          {user ? (
            <div className="db-nav-profile-wrap" ref={dropdownRef}>
              <button
                type="button"
                className="db-nav-action-btn db-nav-avatar-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                title={`User Profile: ${firstName}`}
                aria-label="User Account Menu"
                aria-expanded={dropdownOpen}
              >
                <div className="db-nav-avatar">
                  {initial || <FaUser size={13} />}
                </div>
              </button>

              {dropdownOpen && (
                <div className="db-nav-dropdown">
                  <div className="db-nav-dropdown-user">
                    <p>Signed in as</p>
                    <h4>{firstName}</h4>
                    <span className={`db-nav-dropdown-role ${user.role}`}>
                      {user.role === 'admin' ? 'Administrator' : 'Explorer'}
                    </span>
                  </div>
                  <Link to="/profile" onClick={() => setDropdownOpen(false)}>
                    <FaUser size={13} /> {t('profile.title', 'My Profile')}
                  </Link>
                  <Link to="/saved" onClick={() => setDropdownOpen(false)}>
                    <FaHeart size={13} /> {t('profile.savedPlaces', 'Saved Places')}
                  </Link>
                  <Link to="/learning" onClick={() => setDropdownOpen(false)}>
                    <FaBook size={13} /> My Learning
                  </Link>
                  <Link to="/quiz" onClick={() => setDropdownOpen(false)}>
                    <FaQuestionCircle size={13} /> Quiz Results
                  </Link>
                  <Link to="/settings" onClick={() => setDropdownOpen(false)}>
                    <FaCog size={13} /> Settings
                  </Link>
                  <button
                    type="button"
                    onClick={handleToggleLanguage}
                    className="db-nav-dropdown-lang-btn"
                  >
                    <FaGlobe size={13} /> {language === 'en' ? 'भाषा: हिन्दी (HI)' : 'Language: English (EN)'}
                  </button>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setDropdownOpen(false)}>
                      <FaUserShield size={13} /> {t('nav.admin', 'Admin Dashboard')}
                    </Link>
                  )}
                  <button type="button" onClick={handleLogout} className="logout-btn">
                    <FaSignOutAlt size={13} /> {t('nav.logout', 'Logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/"
              className="db-nav-action-btn db-nav-login-btn"
              title={t('nav.login', 'Login to DivyaBharat')}
              aria-label="User Login"
            >
              <FaUser className="db-nav-icon login-user-icon" />
              <span className="db-nav-login-text">{t('nav.login', 'Login')}</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
