// src/components/NativeAppBridge.js — Native Android/Capacitor Bridge & Mobile State Manager
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import { App as CapacitorApp } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import './NativeAppBridge.css';

export default function NativeAppBridge() {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const lastBackPressTime = useRef(0);
  const toastTimeoutRef = useRef(null);

  const showToast = (msg, duration = 2500) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, duration);
  };

  // Online / Offline Connectivity Monitor
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      showToast('Online: Connected to DivyaBharat live network', 2000);
    };

    const handleOffline = () => {
      setIsOffline(true);
      showToast('Offline Mode: Viewing cached sacred heritage', 3000);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Native Android Platform Configurations
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    const configureNativeUI = async () => {
      try {
        await StatusBar.setStyle({ style: Style.Light });
        await StatusBar.setBackgroundColor({ color: '#FDF3ED' });
      } catch (err) {
        console.warn('StatusBar config error:', err);
      }

      try {
        await SplashScreen.hide();
      } catch (err) {
        console.warn('SplashScreen hide error:', err);
      }
    };

    configureNativeUI();

    let backListenerHandle = null;

    const setupBackListener = async () => {
      try {
        backListenerHandle = await CapacitorApp.addListener('backButton', () => {
          // Allow active overlay/drawer/menu to handle back press first
          const backEvt = new CustomEvent('db-back-press', { cancelable: true });
          const handled = !window.dispatchEvent(backEvt);
          if (handled) {
            return;
          }

          const currentPath = window.location.pathname;

          // If on home or login, require double press to exit
          if (currentPath === '/' || currentPath === '/home') {
            const now = Date.now();
            if (now - lastBackPressTime.current < 2000) {
              CapacitorApp.exitApp();
            } else {
              lastBackPressTime.current = now;
              showToast('Press back again to exit DivyaBharat', 2000);
            }
            return;
          }

          // If on state detail, return to states
          if (currentPath.startsWith('/states/')) {
            navigate('/states');
            return;
          }

          // If on heritage detail, return to heritage
          if (currentPath.startsWith('/heritage/')) {
            navigate('/heritage');
            return;
          }

          // If on secondary section, return to home
          if (['/temples', '/heritage', '/states', '/profile', '/learning', '/quiz', '/about', '/saved'].includes(currentPath)) {
            navigate('/home');
            return;
          }

          // Default: navigate back
          navigate(-1);
        });
      } catch (err) {
        console.warn('Back button listener error:', err);
      }
    };

    setupBackListener();

    return () => {
      if (backListenerHandle && typeof backListenerHandle.remove === 'function') {
        backListenerHandle.remove();
      }
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, [navigate]);

  return (
    <>
      {toastMessage && (
        <div className="db-native-toast" role="alert">
          <span>{toastMessage}</span>
        </div>
      )}
      {isOffline && (
        <div className="db-offline-banner" role="status">
          <span>📴 Offline Mode — Showing Cached Heritage Data</span>
        </div>
      )}
    </>
  );
}
