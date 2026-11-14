// src/context/LanguageContext.js — Multi-language State Management
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';
import { useAuth } from './AuthContext';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const { user, updateUserPreferences } = useAuth();
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('db_lang') || 'en';
  });

  // Sync preference from user account if logged in
  useEffect(() => {
    const prefLang = user?.preferences?.language;
    if (prefLang && (prefLang === 'en' || prefLang === 'hi')) {
      setLanguageState(prev => (prev !== prefLang ? prefLang : prev));
      try { localStorage.setItem('db_lang', prefLang); } catch (e) {}
    }
  }, [user?.preferences?.language]);

  const setLanguage = (lang) => {
    setLanguageState(lang);
    try { localStorage.setItem('db_lang', lang); } catch (e) {}
    if (updateUserPreferences && user) {
      updateUserPreferences({ language: lang });
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem('db_lang');
      if (stored && (stored === 'en' || stored === 'hi')) {
        setLanguageState(stored);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const t = (key, fallback = '') => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    if (translations['en'] && translations['en'][key] !== undefined) {
      return translations['en'][key];
    }
    return fallback || key;
  };

  const isHindi = language === 'hi';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isHindi }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: 'en',
      setLanguage: () => {},
      t: (k, fb) => fb || k,
      isHindi: false
    };
  }
  return context;
}

export default LanguageContext;
