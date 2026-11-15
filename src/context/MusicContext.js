// src/context/MusicContext.js — DivyaBharat Sacred ॐ (Om) Chanting Background Music
// Soft, peaceful, continuous meditation audio with gentle temple bells

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';

const MusicContext = createContext();

export function MusicProvider({ children }) {
  const { user, updateUserPreferences } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(() => {
    try {
      const savedVol = localStorage.getItem('db_music_volume');
      return savedVol !== null ? parseFloat(savedVol) : 0.45;
    } catch (e) {
      return 0.45;
    }
  });

  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);

  // Initialize singleton audio element with peaceful Om chanting
  useEffect(() => {
    const audio = new Audio((process.env.PUBLIC_URL || '') + '/audio/om-chant.wav');
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0; // Starts at 0 for smooth fade-in
    audioRef.current = audio;

    // Check if user had music playing previously and browser allows resume
    const savedPlay = localStorage.getItem('db_music');
    if (savedPlay === 'true') {
      // Respect browser autoplay policies: only play if allowed
      audio.play().then(() => {
        setIsPlaying(true);
        fadeTo(volume, 1200);
      }).catch(() => {
        // Browser blocked autoplay without user gesture; keep paused until user clicks
        setIsPlaying(false);
      });
    }

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Smooth audio fade transition helper
  const fadeTo = (targetVol, durationMs = 800, callback) => {
    if (!audioRef.current) return;
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    const startVol = audioRef.current.volume;
    const diff = targetVol - startVol;
    const steps = 25;
    const stepTime = durationMs / steps;
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      if (!audioRef.current) {
        clearInterval(fadeIntervalRef.current);
        return;
      }
      const progress = currentStep / steps;
      // Smooth cosine easing
      const factor = 0.5 * (1 - Math.cos(Math.PI * progress));
      const nextVol = Math.max(0, Math.min(1, startVol + diff * factor));
      audioRef.current.volume = nextVol;

      if (currentStep >= steps) {
        clearInterval(fadeIntervalRef.current);
        audioRef.current.volume = targetVol;
        if (callback) callback();
      }
    }, stepTime);
  };

  // Play Sacred Om Chanting
  const playMusic = () => {
    if (!audioRef.current) return;

    audioRef.current.play().then(() => {
      setIsPlaying(true);
      try { localStorage.setItem('db_music', 'true'); } catch (e) {}
      fadeTo(volume, 1000);
    }).catch((err) => {
      console.warn('Audio play request notice:', err.message);
    });
  };

  // Pause Sacred Om Chanting with smooth fade-out
  const pauseMusic = () => {
    if (!audioRef.current) return;

    setIsPlaying(false);
    try { localStorage.setItem('db_music', 'false'); } catch (e) {}

    fadeTo(0, 600, () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    });
  };

  // Toggle between Play and Pause
  const toggleMusic = () => {
    const nextState = !isPlaying;
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
    if (updateUserPreferences && user) {
      updateUserPreferences({ soundEnabled: nextState });
    }
  };

  // Set Volume
  const setVolume = (newVol) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolumeState(clamped);
    try { localStorage.setItem('db_music_volume', clamped.toString()); } catch (e) {}

    if (audioRef.current && isPlaying) {
      audioRef.current.volume = clamped;
    }
  };

  return (
    <MusicContext.Provider value={{
      isPlaying,
      toggleMusic,
      playMusic,
      pauseMusic,
      volume,
      setVolume
    }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    return {
      isPlaying: false,
      toggleMusic: () => {},
      playMusic: () => {},
      pauseMusic: () => {},
      volume: 0.45,
      setVolume: () => {}
    };
  }
  return context;
}

export default MusicContext;
