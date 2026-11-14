// src/App.js — Full DivyaBharat Router
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { MusicProvider } from './context/MusicContext';
import { NotificationProvider } from './context/NotificationContext';
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute';
import NativeAppBridge from './components/NativeAppBridge';
import WelcomeNotification from './components/WelcomeNotification';
import MobileBottomNav from './components/MobileBottomNav';

// Pages
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import ProfilePage from './ProfilePage';
import TemplePage from './TemplePage';
import { QuizListPage, QuizDetailPage } from './pages/QuizPage';
import { LearningListPage, ModuleDetailPage } from './pages/LearningPage';
import HeritagePage from './pages/HeritagePage';
import HeritageDetailPage from './pages/HeritageDetailPage';
import StatesPage from './pages/StatesPage';
import StatePage from './pages/StatePage';
import AdminPage from './pages/AdminPage';
import AboutPage from './pages/AboutPage';
import SavedPage from './pages/SavedPage';

import './index.css';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <MusicProvider>
          <NotificationProvider>
            <Router>
              <NativeAppBridge />
              <WelcomeNotification />
              <Routes>
                {/* PUBLIC */}
                <Route path="/" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/temples" element={<TemplePage />} />
                <Route path="/heritage" element={<HeritagePage />} />
                <Route path="/heritage/:id" element={<HeritageDetailPage />} />
                <Route path="/states" element={<StatesPage />} />
                <Route path="/states/:stateName" element={<StatePage />} />
                <Route path="/quiz" element={<QuizListPage />} />
                <Route path="/about" element={<AboutPage />} />

                {/* PROTECTED (login required) */}
                <Route path="/quiz/:id" element={
                  <ProtectedRoute><QuizDetailPage /></ProtectedRoute>
                } />
                <Route path="/learning" element={
                  <ProtectedRoute><LearningListPage /></ProtectedRoute>
                } />
                <Route path="/learning/:id" element={
                  <ProtectedRoute><ModuleDetailPage /></ProtectedRoute>
                } />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/saved" element={<SavedPage />} />
                <Route path="/settings" element={<ProfilePage defaultTab="settings" />} />

                {/* ADMIN */}
                <Route path="/admin" element={
                  <AdminRoute><AdminPage /></AdminRoute>
                } />

                {/* REDIRECT LEGACY ROUTES */}
                <Route path="/teacher" element={<Navigate to="/home" replace />} />

                {/* FALLBACK */}
                <Route path="*" element={<Navigate to="/home" replace />} />
              </Routes>
              <MobileBottomNav />
            </Router>
          </NotificationProvider>
        </MusicProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;