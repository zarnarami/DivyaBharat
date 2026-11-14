// src/components/WelcomeNotification.js — Live Personalized Welcome Notification
// Displays "Welcome, [User Name], to DivyaBharat! 🙏" immediately after successful login
// Automatically disappears after a few seconds. Does not repeat on navigation.

import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './WelcomeNotification.css';

export default function WelcomeNotification() {
  const [visible, setVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [exiting, setExiting] = useState(false);
  const location = useLocation();
  const timerRef = useRef(null);

  const triggerWelcome = (name) => {
    if (!name || !name.trim()) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    setUserName(name.trim());
    setVisible(true);
    setExiting(false);

    // Auto disappear after 4.2 seconds
    timerRef.current = setTimeout(() => {
      setExiting(true);
      setTimeout(() => {
        setVisible(false);
        setExiting(false);
      }, 350); // Animation duration
    }, 4200);
  };

  useEffect(() => {
    // 1. Check for pending welcome notification in sessionStorage from fresh login
    const isPending = sessionStorage.getItem('db_welcome_pending') === 'true';
    const pendingName = sessionStorage.getItem('db_welcome_user_name');

    if (isPending && pendingName) {
      // Consume the flag immediately so navigating between pages never repeats it
      sessionStorage.removeItem('db_welcome_pending');
      sessionStorage.setItem('db_welcome_shown', 'true');
      triggerWelcome(pendingName);
    }

    // 2. Listen to custom live login event (for instantaneous in-app triggers)
    const handleLoginEvent = (event) => {
      const name = event.detail?.name || sessionStorage.getItem('db_welcome_user_name');
      if (name) {
        sessionStorage.removeItem('db_welcome_pending');
        sessionStorage.setItem('db_welcome_shown', 'true');
        triggerWelcome(name);
      }
    };

    window.addEventListener('db-login-welcome', handleLoginEvent);

    return () => {
      window.removeEventListener('db-login-welcome', handleLoginEvent);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [location.pathname]);

  const handleDismiss = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      setExiting(false);
    }, 350);
  };

  if (!visible || !userName) {
    return null;
  }

  return (
    <aside
      className={`db-welcome-notification ${exiting ? 'exiting' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Welcome notification"
    >
      <div className="db-welcome-card">
        <span className="db-welcome-icon" aria-hidden="true">🪔</span>
        <div className="db-welcome-content">
          <span className="db-welcome-msg">
            Welcome, <strong className="db-welcome-name">{userName}</strong>, to DivyaBharat! 🙏
          </span>
        </div>
        <button
          type="button"
          className="db-welcome-dismiss"
          onClick={handleDismiss}
          aria-label="Dismiss notification"
          title="Dismiss"
        >
          ✕
        </button>
      </div>
    </aside>
  );
}
