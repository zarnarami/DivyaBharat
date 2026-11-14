// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        height: '100vh', background: '#fdf3ed',
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '24px', color: '#6b2d1b'
      }}>
        <div className="db-spinner-wrap">
          <div className="db-spinner"></div>
          <p>Loading DivyaBharat...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export function AdminRoute({ children }) {
  const { user, loading, isAdmin } = useAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/" replace />;

  if (!isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
