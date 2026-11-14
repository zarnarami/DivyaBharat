// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('db_token'));

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('db_token');
      if (storedToken) {
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          const { data } = await api.get('/auth/me');
          if (data.success) {
            setUser(data.user);
            setToken(storedToken);
          } else {
            localStorage.removeItem('db_token');
            setUser(null);
            setToken(null);
          }
        } catch (error) {
          localStorage.removeItem('db_token');
          setUser(null);
          setToken(null);
          delete api.defaults.headers.common['Authorization'];
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    if (data.success) {
      localStorage.setItem('db_token', data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setUser(data.user);
      setToken(data.token);
    }
    return data;
  };

  const register = async (userData) => {
    const { data } = await api.post('/auth/register', userData);
    if (data.success) {
      localStorage.setItem('db_token', data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setUser(data.user);
      setToken(data.token);
    }
    return data;
  };

  const forgotPassword = async (email) => {
    const { data } = await api.post('/auth/forgot-password', { email });
    return data;
  };

  const resetPassword = async (resetData) => {
    const { data } = await api.post('/auth/reset-password', resetData);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('db_token');
    delete api.defaults.headers.common['Authorization'];
    sessionStorage.removeItem('db_welcome_user_name');
    sessionStorage.removeItem('db_welcome_pending');
    sessionStorage.removeItem('db_welcome_shown');
    setUser(null);
    setToken(null);
  };

  const updateUser = (updatedUser) => {
    setUser(prev => ({ ...prev, ...updatedUser }));
  };

  const updateUserPreferences = async (newPrefs) => {
    setUser(prev => prev ? ({
      ...prev,
      preferences: { ...(prev.preferences || {}), ...newPrefs }
    }) : prev);

    if (localStorage.getItem('db_token')) {
      try {
        await api.put('/users/preferences', newPrefs);
      } catch (err) {
        console.warn('Failed to sync preferences to MongoDB:', err.message);
      }
    }
  };

  const isAdmin = user?.role === 'admin';
  const isTeacher = false; // Unified knowledge portal without teacher/student roles
  const isStudent = false;
  const isGuest = !user;

  return (
    <AuthContext.Provider value={{
      user, token, loading,
      login, register, logout, updateUser, updateUserPreferences,
      forgotPassword, resetPassword,
      isAdmin, isTeacher, isStudent, isGuest
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export default AuthContext;
