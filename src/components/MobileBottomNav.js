// src/components/MobileBottomNav.js — Native-Style Android Bottom Navigation Bar
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaHome, FaPray, FaLandmark, FaCompass, FaUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import './MobileBottomNav.css';

export default function MobileBottomNav() {
  const location = useLocation();
  const { user } = useAuth();
  const { t } = useLanguage();

  // Hide on login / registration landing page
  if (location.pathname === '/') {
    return null;
  }

  const handleTabClick = (path, e) => {
    if (location.pathname === path) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems = [
    {
      to: '/home',
      label: t('nav.home', 'Home'),
      icon: FaHome,
      badge: null,
    },
    {
      to: '/temples',
      label: t('nav.temples', 'Temples'),
      icon: FaPray,
      badge: null,
    },
    {
      to: '/heritage',
      label: t('nav.heritage', 'Heritage'),
      icon: FaLandmark,
      badge: null,
    },
    {
      to: '/states',
      label: t('nav.states', 'States'),
      icon: FaCompass,
      badge: null,
    },
    {
      to: '/profile',
      label: user ? (user.name?.split(' ')[0] || t('nav.profile', 'Profile')) : t('nav.login', 'Profile'),
      icon: FaUser,
      badge: user ? null : null,
    },
  ];

  return (
    <nav className="db-mobile-bottom-nav" aria-label="Mobile Navigation">
      <div className="db-mobile-bottom-inner">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to ||
            (item.to === '/states' && location.pathname.startsWith('/states/')) ||
            (item.to === '/heritage' && location.pathname.startsWith('/heritage/'));

          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={(e) => handleTabClick(item.to, e)}
              className={`db-mobile-tab ${isActive ? 'active' : ''}`}
            >
              <div className="db-mobile-tab-icon-wrap">
                <Icon className="db-mobile-tab-icon" />
                {item.badge && <span className="db-mobile-tab-badge">{item.badge}</span>}
              </div>
              <span className="db-mobile-tab-label">{item.label}</span>
              {isActive && <span className="db-mobile-tab-pill" />}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
