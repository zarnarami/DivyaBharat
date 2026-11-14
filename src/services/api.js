// src/services/api.js — Central DivyaBharat API Service Layer
import axios from 'axios';

export const getApiBaseUrl = () => {
  if (process.env.REACT_APP_API_URL) return process.env.REACT_APP_API_URL;
  if (typeof window !== 'undefined' && window.DIVYABHARAT_API_URL) return window.DIVYABHARAT_API_URL;
  if (typeof window !== 'undefined' && localStorage.getItem('db_api_url')) return localStorage.getItem('db_api_url');
  return 'http://localhost:5000/api';
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json'
  }
});

// Update baseURL dynamically per request if configured
api.interceptors.request.use((config) => {
  config.baseURL = getApiBaseUrl();
  const token = localStorage.getItem('db_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 unauthenticated responses gracefully
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('db_token');
    }
    return Promise.reject(error);
  }
);

// ============ REUSABLE API FUNCTIONS ============

// Temples
export const getTemples = (params) => api.get('/temples', { params });
export const getTemple = (id) => api.get(`/temples/${id}`);
export const createTemple = (data) => api.post('/temples', data);
export const updateTemple = (id, data) => api.put(`/temples/${id}`, data);
export const deleteTemple = (id) => api.delete(`/temples/${id}`);

// Heritage
export const getHeritage = (params) => api.get('/heritage', { params });
export const getHeritageById = (id) => api.get(`/heritage/${id}`);
export const createHeritage = (data) => api.post('/heritage', data);
export const updateHeritage = (id, data) => api.put(`/heritage/${id}`, data);
export const deleteHeritage = (id) => api.delete(`/heritage/${id}`);

// States & Union Territories
export const getStates = () => api.get('/states');
export const getStateByName = (name) => api.get(`/states/${encodeURIComponent(name)}`);

// Authentication & Profile
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);
export const logout = () => api.post('/auth/logout');
export const getProfile = () => api.get('/auth/me');
export const updateProfile = (data) => api.put('/auth/profile', data);
export const changePassword = (data) => api.put('/auth/change-password', data);

// Favorites / Wishlist
export const getFavorites = () => api.get('/users/wishlist');
export const addFavorite = (heritageId) => api.post(`/users/wishlist/${heritageId}`);
export const removeFavorite = (heritageId) => api.delete(`/users/wishlist/${heritageId}`);

// Contact & Feedback
export const submitContact = (data) => api.post('/contact', data);
export const submitFeedback = (data) => api.post('/feedback', data);

// System Health
export const getHealth = () => api.get('/health');

// Attach methods directly to api object for flexibility
api.getTemples = getTemples;
api.getTemple = getTemple;
api.getHeritage = getHeritage;
api.getHeritageById = getHeritageById;
api.getStates = getStates;
api.getStateByName = getStateByName;
api.getProfile = getProfile;
api.getFavorites = getFavorites;
api.addFavorite = addFavorite;
api.removeFavorite = removeFavorite;
api.getHealth = getHealth;

export default api;
