// src/LoginPage.js — DivyaBharat Divine Login & Authentication Portal
// Soft Pastel Divine Theme representing India's sacred beauty, peace, and spirituality
// Unified Knowledge Platform for Indian Temples, Heritage, Monuments, Culture & Traditions

import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import api from './services/api';

// Assets
import homebg from './assets/homebg.png';
import logo from './assets/logo.png';

// React Icons
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserAlt,
  FaPhone,
  FaShieldAlt,
  FaCheckCircle,
  FaInfoCircle,
  FaArrowLeft,
  FaKey,
} from 'react-icons/fa';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  // Mode: 'login' | 'register' | 'forgot'
  const [authMode, setAuthMode] = useState('login');

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Forgot Password / OTP State
  const [forgotStep, setForgotStep] = useState(1); // 1: Enter Email, 2: Enter OTP & New Password
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [showForgotNewPassword, setShowForgotNewPassword] = useState(false);
  const [devOtpHint, setDevOtpHint] = useState('');

  // UI Feedback
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Restore Remembered Email on load
  useEffect(() => {
    document.body.classList.add('login-active');
    try {
      const savedEmail = localStorage.getItem('db_remember_email');
      if (savedEmail) {
        setLoginEmail(savedEmail);
        setRememberMe(true);
      }
    } catch (e) {}

    return () => {
      document.body.classList.remove('login-active');
    };
  }, []);

  // 1. Divine Email Login (Primary Authentication)
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!loginEmail.trim() || !loginPassword) {
      setError('Please enter both your registered email address and DivyaBharat password.');
      return;
    }

    setLoading(true);
    try {
      const data = await login(loginEmail.trim(), loginPassword);

      // Handle Remember Me preference
      if (rememberMe) {
        localStorage.setItem('db_remember_email', loginEmail.trim());
      } else {
        localStorage.removeItem('db_remember_email');
      }

      if (data?.user?.name) {
        localStorage.setItem('db_user_name', data.user.name);
        sessionStorage.setItem('db_welcome_user_name', data.user.name);
        sessionStorage.setItem('db_welcome_pending', 'true');
        window.dispatchEvent(
          new CustomEvent('db-login-welcome', { detail: { name: data.user.name } })
        );
      }
      localStorage.removeItem('db_is_guest');

      // Redirect directly to the HOME PAGE after login
      navigate('/home');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Invalid email or password. Please verify your DivyaBharat application credentials.'
      );
    }
    setLoading(false);
  };

  // 2. Divine New User Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!regName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!regEmail.trim() || !emailRegex.test(regEmail.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!regPassword || regPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setError('Passwords do not match. Please verify your password confirmation.');
      return;
    }

    setLoading(true);
    try {
      const data = await register({
        name: regName.trim(),
        email: regEmail.trim().toLowerCase(),
        password: regPassword,
        confirmPassword: regConfirmPassword,
        phone: regPhone.trim(),
      });

      if (data?.user?.name) {
        localStorage.setItem('db_user_name', data.user.name);
        sessionStorage.setItem('db_welcome_user_name', data.user.name);
        sessionStorage.setItem('db_welcome_pending', 'true');
        window.dispatchEvent(
          new CustomEvent('db-login-welcome', { detail: { name: data.user.name } })
        );
      }
      localStorage.removeItem('db_is_guest');

      // Redirect directly to the HOME PAGE after registration
      navigate('/home');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Registration failed. An account with this email may already exist.'
      );
    }
    setLoading(false);
  };

  // 3. Guest Access & Skip (Without Creating Fake DB Records)
  const handleGuestAccess = () => {
    localStorage.setItem('db_is_guest', 'true');
    localStorage.setItem('db_user_name', 'Guest Explorer');
    // Navigate straight to HOME PAGE
    navigate('/home');
  };

  // 4. Quick Admin Demo Credential Autofill
  const fillAdminDemo = () => {
    setAuthMode('login');
    setLoginEmail('admin@divyabharat.in');
    setLoginPassword('Admin@DivyaBharat2024');
    setError('');
    setSuccessMsg('Admin demo credentials populated. Click Login to access.');
  };

  // 5. Forgot Password: Step 1 - Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setDevOtpHint('');

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!forgotEmail.trim() || !emailRegex.test(forgotEmail.trim())) {
      setError('Please enter a valid registered email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/forgot-password', {
        email: forgotEmail.trim().toLowerCase()
      });

      if (res.data?.devOtp) {
        setDevOtpHint(res.data.devOtp);
      }

      setSuccessMsg(res.data?.message || 'Verification code sent to your email.');
      setForgotStep(2);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to send verification code. Please check your email and try again.'
      );
    }
    setLoading(false);
  };

  // 6. Forgot Password: Step 2 - Reset Password with OTP
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!forgotOtp.trim()) {
      setError('Please enter the 6-digit verification code.');
      return;
    }

    if (!forgotNewPassword || forgotNewPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    if (forgotNewPassword !== forgotConfirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/reset-password', {
        email: forgotEmail.trim().toLowerCase(),
        otp: forgotOtp.trim(),
        newPassword: forgotNewPassword,
        confirmPassword: forgotConfirmPassword
      });

      setSuccessMsg(res.data?.message || 'Password reset successful! Please log in with your new password.');
      setLoginEmail(forgotEmail.trim().toLowerCase());
      setLoginPassword('');
      setForgotOtp('');
      setForgotNewPassword('');
      setForgotConfirmPassword('');
      setForgotStep(1);

      // Return to login mode after brief delay
      setTimeout(() => {
        setAuthMode('login');
      }, 1200);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Invalid or expired verification code. Please try again.'
      );
    }
    setLoading(false);
  };

  return (
    <div
      className="divine-login-page"
      style={{ backgroundImage: `url(${homebg})` }}
    >
      {/* Soft Ivory & Pastel Peach Sacred Atmosphere Overlay */}
      <div className="divine-login-overlay" aria-hidden="true" />

      {/* Main Divine Login Card Container */}
      <div className="divine-login-card-wrapper">
        <main className="divine-login-card" role="main">
          {/* ══════════════════════════════════════════════════
              DIVINE HEADER: OM SYMBOL + DIVYABHARAT LOGO
             ══════════════════════════════════════════════════ */}
          <header className="divine-header-block">
            {/* Sacred Om Symbol with Golden Divine Glow */}
            <div className="divine-om-emblem" aria-label="Sacred Om Symbol">
              <span className="divine-om-glyph">ॐ</span>
            </div>

            {/* Official DivyaBharat Website Logo */}
            <div className="divine-logo-container">
              <img
                src={logo}
                alt="DivyaBharat Official Logo"
                className="divine-official-logo"
              />
            </div>

            {/* Sacred Lotus Motif & Ornamental Divider */}
            <div className="divine-lotus-divider" aria-hidden="true">
              <span className="divine-sparkle">✦</span>
              <span className="divine-line" />
              <span className="divine-lotus-icon">🪷</span>
              <span className="divine-line" />
              <span className="divine-sparkle">✦</span>
            </div>

            {/* Headings */}
            <h1 className="divine-login-title">
              {authMode === 'register'
                ? 'Create Sacred Account'
                : authMode === 'forgot'
                ? 'Password Recovery'
                : 'Welcome Back'}
            </h1>
            <p className="divine-login-subtitle">
              {authMode === 'register'
                ? 'Register to explore India\'s sacred temples & timeless heritage'
                : authMode === 'forgot'
                ? 'Reset your DivyaBharat application password'
                : 'Login to continue your sacred journey through Bharat'}
            </p>
          </header>

          {/* Feedback Alerts */}
          {error && (
            <div className="divine-alert-error" role="alert">
              <span className="divine-alert-icon">✦</span>
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="divine-alert-success" role="alert">
              <FaCheckCircle className="divine-alert-icon" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ══════════════════════════════════════════════════
              MODE 1: UNIFIED EMAIL LOGIN (PRIMARY)
             ══════════════════════════════════════════════════ */}
          {authMode === 'login' && (
            <form onSubmit={handleEmailLogin} className="divine-form" noValidate>
              {/* Email Address Input */}
              <div className="divine-field-group">
                <label htmlFor="login-email" className="divine-field-label">
                  Email Address
                </label>
                <div className="divine-input-wrap">
                  <FaEnvelope className="divine-input-icon" aria-hidden="true" />
                  <input
                    id="login-email"
                    type="email"
                    className="divine-input"
                    placeholder="Enter your registered email address..."
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* DivyaBharat Application Password Input */}
              <div className="divine-field-group">
                <label htmlFor="login-password" className="divine-field-label">
                  DivyaBharat Application Password
                </label>
                <div className="divine-input-wrap">
                  <FaLock className="divine-input-icon" aria-hidden="true" />
                  <input
                    id="login-password"
                    type={showLoginPassword ? 'text' : 'password'}
                    className="divine-input"
                    placeholder="Enter your DivyaBharat password..."
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="divine-pwd-toggle"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                  >
                    {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Password Privacy Security Note */}
              <div className="divine-security-note">
                <FaInfoCircle className="divine-security-note-icon" />
                <span>
                  Please enter your DivyaBharat password. Never enter your personal Gmail or email account password.
                </span>
              </div>

              {/* Remember Me & Forgot Password Row */}
              <div className="divine-options-row">
                <label className="divine-checkbox-label">
                  <input
                    type="checkbox"
                    className="divine-checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="divine-checkbox-custom" />
                  <span className="divine-checkbox-text">Remember Me</span>
                </label>

                <button
                  type="button"
                  className="divine-forgot-link"
                  onClick={() => {
                    setForgotEmail(loginEmail || '');
                    setForgotStep(1);
                    setError('');
                    setSuccessMsg('');
                    setAuthMode('forgot');
                  }}
                >
                  Forgot Password?
                </button>
              </div>

              {/* Divine Login Button */}
              <button
                type="submit"
                className="divine-submit-btn"
                disabled={loading || !loginEmail || !loginPassword}
              >
                {loading ? (
                  <span className="divine-btn-loading">Authenticating...</span>
                ) : (
                  <span>Login to DivyaBharat →</span>
                )}
              </button>

              {/* Don't have an account? Register */}
              <div className="divine-footer-links">
                <span className="divine-switch-prompt">Don't have an account?</span>
                <button
                  type="button"
                  className="divine-switch-action"
                  onClick={() => {
                    setAuthMode('register');
                    setError('');
                    setSuccessMsg('');
                  }}
                >
                  Register
                </button>
              </div>

              {/* Quick Admin Demo Login */}
              <div className="divine-demo-block">
                <div className="divine-demo-header">
                  <span className="divine-demo-spark">✦</span>
                  <span className="divine-demo-title">Administrator Access</span>
                  <span className="divine-demo-spark">✦</span>
                </div>
                <div className="divine-demo-pills">
                  <button
                    type="button"
                    className="divine-demo-pill"
                    onClick={fillAdminDemo}
                    title="Fill Admin Demo Credentials"
                  >
                    <FaShieldAlt className="divine-pill-icon" /> Admin Portal Login
                  </button>
                </div>
              </div>

              {/* Guest Access Button */}
              <div className="divine-quick-guest-wrap">
                <button
                  type="button"
                  className="divine-quick-guest-btn"
                  onClick={handleGuestAccess}
                >
                  Continue as Guest Explorer (Instant Access)
                </button>
              </div>
            </form>
          )}

          {/* ══════════════════════════════════════════════════
              MODE 2: UNIFIED REGISTRATION
             ══════════════════════════════════════════════════ */}
          {authMode === 'register' && (
            <form onSubmit={handleRegister} className="divine-form" noValidate>
              {/* Full Name */}
              <div className="divine-field-group">
                <label className="divine-field-label">Full Name *</label>
                <div className="divine-input-wrap">
                  <FaUserAlt className="divine-input-icon" />
                  <input
                    type="text"
                    className="divine-input"
                    placeholder="Enter your full name"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="divine-field-group">
                <label className="divine-field-label">Email Address *</label>
                <div className="divine-input-wrap">
                  <FaEnvelope className="divine-input-icon" />
                  <input
                    type="email"
                    className="divine-input"
                    placeholder="Enter your email address"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="divine-field-group">
                <label className="divine-field-label">Application Password (min 6 characters) *</label>
                <div className="divine-input-wrap">
                  <FaLock className="divine-input-icon" />
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    className="divine-input"
                    placeholder="Create your DivyaBharat password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="divine-pwd-toggle"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    aria-label={showRegPassword ? 'Hide password' : 'Show password'}
                  >
                    {showRegPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="divine-field-group">
                <label className="divine-field-label">Confirm Password *</label>
                <div className="divine-input-wrap">
                  <FaLock className="divine-input-icon" />
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    className="divine-input"
                    placeholder="Confirm your password"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Phone / WhatsApp (Optional) */}
              <div className="divine-field-group">
                <label className="divine-field-label">Phone / WhatsApp (Optional)</label>
                <div className="divine-input-wrap">
                  <FaPhone className="divine-input-icon" />
                  <input
                    type="tel"
                    className="divine-input"
                    placeholder="10-digit mobile number"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                  />
                </div>
              </div>

              {/* Password Privacy Notice */}
              <div className="divine-security-note">
                <FaInfoCircle className="divine-security-note-icon" />
                <span>
                  Create a unique application password. Never use your email provider's account password.
                </span>
              </div>

              <button
                type="submit"
                className="divine-submit-btn"
                disabled={loading || !regName || !regEmail || !regPassword || !regConfirmPassword}
              >
                {loading ? 'Creating Sacred Account...' : 'Register Sacred Account →'}
              </button>

              <div className="divine-footer-links">
                <span className="divine-switch-prompt">Already have an account?</span>
                <button
                  type="button"
                  className="divine-switch-action"
                  onClick={() => {
                    setAuthMode('login');
                    setError('');
                    setSuccessMsg('');
                  }}
                >
                  Login
                </button>
              </div>

              {/* Guest Access from Register View */}
              <div className="divine-quick-guest-wrap">
                <button
                  type="button"
                  className="divine-quick-guest-btn"
                  onClick={handleGuestAccess}
                >
                  Continue as Guest Explorer
                </button>
              </div>
            </form>
          )}

          {/* ══════════════════════════════════════════════════
              MODE 3: FORGOT PASSWORD & OTP RESET FLOW
             ══════════════════════════════════════════════════ */}
          {authMode === 'forgot' && (
            <div className="divine-form">
              {forgotStep === 1 ? (
                <form onSubmit={handleSendOtp}>
                  <div className="divine-field-group">
                    <label className="divine-field-label">Registered Email Address</label>
                    <div className="divine-input-wrap">
                      <FaEnvelope className="divine-input-icon" />
                      <input
                        type="email"
                        className="divine-input"
                        placeholder="Enter your registered email..."
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <p style={{ fontSize: '12px', color: '#806455', margin: '8px 0 16px 0', lineHeight: 1.4 }}>
                    We will send a 6-digit verification code to your email to securely reset your application password.
                  </p>

                  <button
                    type="submit"
                    className="divine-submit-btn"
                    disabled={loading || !forgotEmail}
                  >
                    {loading ? 'Sending Code...' : 'Send Verification Code (OTP) →'}
                  </button>

                  <div className="divine-footer-links" style={{ marginTop: '16px' }}>
                    <button
                      type="button"
                      className="divine-switch-action"
                      onClick={() => {
                        setAuthMode('login');
                        setError('');
                        setSuccessMsg('');
                      }}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                    >
                      <FaArrowLeft size={11} /> Return to Login
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleResetPassword}>
                  {devOtpHint && (
                    <div style={{ background: '#FFF3CD', border: '1px solid #FFEBAA', padding: '10px 12px', borderRadius: '8px', fontSize: '12px', color: '#856404', marginBottom: '14px' }}>
                      🔑 <strong>Dev Verification Code:</strong> <code>{devOtpHint}</code>
                    </div>
                  )}

                  {/* 6-digit OTP Field */}
                  <div className="divine-field-group">
                    <label className="divine-field-label">6-Digit Verification Code (OTP) *</label>
                    <div className="divine-input-wrap">
                      <FaKey className="divine-input-icon" />
                      <input
                        type="text"
                        className="divine-input"
                        placeholder="Enter 6-digit code..."
                        value={forgotOtp}
                        onChange={(e) => setForgotOtp(e.target.value.trim())}
                        maxLength="6"
                        required
                      />
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="divine-field-group">
                    <label className="divine-field-label">New Application Password *</label>
                    <div className="divine-input-wrap">
                      <FaLock className="divine-input-icon" />
                      <input
                        type={showForgotNewPassword ? 'text' : 'password'}
                        className="divine-input"
                        placeholder="Enter new password (min 6 chars)"
                        value={forgotNewPassword}
                        onChange={(e) => setForgotNewPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="divine-pwd-toggle"
                        onClick={() => setShowForgotNewPassword(!showForgotNewPassword)}
                      >
                        {showForgotNewPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div className="divine-field-group">
                    <label className="divine-field-label">Confirm New Password *</label>
                    <div className="divine-input-wrap">
                      <FaLock className="divine-input-icon" />
                      <input
                        type={showForgotNewPassword ? 'text' : 'password'}
                        className="divine-input"
                        placeholder="Confirm new password"
                        value={forgotConfirmPassword}
                        onChange={(e) => setForgotConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="divine-submit-btn"
                    disabled={loading || !forgotOtp || !forgotNewPassword || !forgotConfirmPassword}
                  >
                    {loading ? 'Resetting Password...' : 'Reset Password & Login →'}
                  </button>

                  <div className="divine-footer-links" style={{ justifyContent: 'space-between', marginTop: '16px' }}>
                    <button
                      type="button"
                      className="divine-switch-action"
                      onClick={() => setForgotStep(1)}
                      style={{ fontSize: '12px' }}
                    >
                      ← Re-enter Email
                    </button>
                    <button
                      type="button"
                      className="divine-switch-action"
                      onClick={() => {
                        setAuthMode('login');
                        setError('');
                        setSuccessMsg('');
                      }}
                      style={{ fontSize: '12px' }}
                    >
                      Return to Login
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Quick Skip to Home */}
          <div className="divine-skip-row">
            <button
              type="button"
              className="divine-skip-link"
              onClick={handleGuestAccess}
            >
              Skip to Home →
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
