// src/components/LoadingSpinner.js
import React from 'react';

export default function LoadingSpinner({ text = 'Loading...' }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 20px',
      gap: '16px'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        border: '3px solid rgba(230, 171, 130, 0.2)',
        borderTop: '3px solid #e6ab82',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '18px',
        color: '#8a6050',
        margin: 0
      }}>{text}</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export function PageLoader() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      gap: '20px',
      background: 'transparent'
    }}>
      <div style={{
        fontSize: '48px',
        animation: 'pulse 1.5s ease-in-out infinite'
      }}>🛕</div>
      <div style={{
        width: '60px',
        height: '60px',
        border: '4px solid rgba(230, 171, 130, 0.2)',
        borderTop: '4px solid #e6ab82',
        borderRadius: '50%',
        animation: 'spin 0.9s linear infinite'
      }} />
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '22px',
        color: '#7a4a30',
        margin: 0,
        fontStyle: 'italic'
      }}>Discovering Heritage...</p>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.15); } }
      `}</style>
    </div>
  );
}

export function EmptyState({ icon = '🏛️', title = 'Nothing found', message = 'Try different search terms or filters.' }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 20px',
      gap: '14px',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '64px', opacity: 0.6 }}>{icon}</div>
      <h3 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '26px',
        color: '#5a3020',
        margin: 0
      }}>{title}</h3>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '14px',
        color: '#9a6a50',
        margin: 0,
        maxWidth: '340px',
        lineHeight: 1.6
      }}>{message}</p>
    </div>
  );
}
