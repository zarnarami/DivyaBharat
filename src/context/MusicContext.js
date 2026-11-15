// src/context/MusicContext.js — DivyaBharat Sacred ॐ (Om) Chanting Background Music
// Soft, peaceful, continuous meditation audio with gentle temple bells
// Seamless playback across all application pages without restarting on navigation

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';

const MusicContext = createContext();

// YouTube reference: https://www.youtube.com/watch?v=sG8NDw3Tv6c
const YOUTUBE_VIDEO_ID = 'sG8NDw3Tv6c';

export function MusicProvider({ children }) {
  const { user, updateUserPreferences } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isYouTubeFallback, setIsYouTubeFallback] = useState(false);

  // Comfortable, low background volume (30%) so it does not disturb reading or navigation
  const [volume, setVolumeState] = useState(() => {
    try {
      const savedVol = localStorage.getItem('db_music_volume');
      return savedVol !== null ? parseFloat(savedVol) : 0.30;
    } catch (e) {
      return 0.30;
    }
  });

  const audioRef = useRef(null);
  const ytPlayerRef = useRef(null);
  const isInteractingRef = useRef(false);

  // Initialize official YouTube Player as fallback if local audio cannot be loaded
  const initYouTubePlayer = () => {
    if (ytPlayerRef.current || typeof window === 'undefined') return;

    const setupPlayer = () => {
      let container = document.getElementById('db-youtube-audio-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'db-youtube-audio-container';
        container.style.position = 'fixed';
        container.style.bottom = '-9999px';
        container.style.left = '-9999px';
        container.style.width = '1px';
        container.style.height = '1px';
        container.style.opacity = '0';
        container.style.pointerEvents = 'none';
        container.setAttribute('aria-hidden', 'true');
        document.body.appendChild(container);
      }

      try {
        ytPlayerRef.current = new window.YT.Player('db-youtube-audio-container', {
          height: '1',
          width: '1',
          videoId: YOUTUBE_VIDEO_ID,
          playerVars: {
            autoplay: 0,
            controls: 0,
            loop: 1,
            playlist: YOUTUBE_VIDEO_ID,
            playsinline: 1
          },
          events: {
            onReady: (event) => {
              event.target.setVolume(Math.round(volume * 100));
              const saved = localStorage.getItem('db_music');
              if (saved === 'true') {
                event.target.playVideo();
                setIsPlaying(true);
              }
            },
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
              } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
                setIsPlaying(false);
              }
            }
          }
        });
        setIsYouTubeFallback(true);
      } catch (e) {
        console.warn('YouTube Player setup notice:', e);
      }
    };

    if (window.YT && window.YT.Player) {
      setupPlayer();
    } else {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      window.onYouTubeIframeAPIReady = setupPlayer;
      document.body.appendChild(tag);
    }
  };

  // Initialize singleton audio element with peaceful Om chanting
  useEffect(() => {
    const audioUrl = (process.env.PUBLIC_URL || '') + '/audio/om-chant.wav';
    const audio = new Audio(audioUrl);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = volume;
    audioRef.current = audio;

    // Error handler: If local WAV cannot be loaded, fallback gracefully to YouTube player
    audio.onerror = () => {
      console.warn('DivyaBharat: Local Om chant audio asset failed to load. Falling back to official YouTube player.');
      initYouTubePlayer();
    };

    // Check if user previously had music playing and respect browser autoplay policies
    const savedPlay = localStorage.getItem('db_music');
    if (savedPlay === 'true') {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay blocked by browser policy without prior user gesture:
        // Keep paused, wait for first user gesture anywhere on the page to restore preference
        setIsPlaying(false);

        const handleFirstInteraction = () => {
          if (isInteractingRef.current) return;
          isInteractingRef.current = true;

          const stillPreferred = localStorage.getItem('db_music');
          if (stillPreferred === 'true') {
            if (audioRef.current) {
              audioRef.current.volume = volume;
              audioRef.current.play().then(() => {
                setIsPlaying(true);
              }).catch(() => {});
            } else if (ytPlayerRef.current?.playVideo) {
              ytPlayerRef.current.playVideo();
              setIsPlaying(true);
            }
          }
          window.removeEventListener('click', handleFirstInteraction);
          window.removeEventListener('keydown', handleFirstInteraction);
          window.removeEventListener('touchstart', handleFirstInteraction);
        };

        window.addEventListener('click', handleFirstInteraction, { once: true });
        window.addEventListener('keydown', handleFirstInteraction, { once: true });
        window.addEventListener('touchstart', handleFirstInteraction, { once: true });
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
      if (ytPlayerRef.current?.destroy) {
        try { ytPlayerRef.current.destroy(); } catch (e) {}
        ytPlayerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Play Sacred Om Chanting
  const playMusic = () => {
    try { localStorage.setItem('db_music', 'true'); } catch (e) {}

    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Audio play request notice:', err.message);
        // If local audio playback fails, try fallback
        if (!ytPlayerRef.current) {
          initYouTubePlayer();
        } else if (ytPlayerRef.current.playVideo) {
          ytPlayerRef.current.playVideo();
          setIsPlaying(true);
        }
      });
    } else if (ytPlayerRef.current?.playVideo) {
      ytPlayerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  // Pause Sacred Om Chanting immediately
  const pauseMusic = () => {
    setIsPlaying(false);
    try { localStorage.setItem('db_music', 'false'); } catch (e) {}

    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (ytPlayerRef.current?.pauseVideo) {
      ytPlayerRef.current.pauseVideo();
    }
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

    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
    if (ytPlayerRef.current?.setVolume) {
      ytPlayerRef.current.setVolume(Math.round(clamped * 100));
    }
  };

  return (
    <MusicContext.Provider value={{
      isPlaying,
      toggleMusic,
      playMusic,
      pauseMusic,
      volume,
      setVolume,
      isYouTubeFallback
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
      volume: 0.30,
      setVolume: () => {},
      isYouTubeFallback: false
    };
  }
  return context;
}

export default MusicContext;
