// src/pages/SavedPage.js
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeritageCard from '../components/HeritageCard';
import { PageLoader, EmptyState } from '../components/LoadingSpinner';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function SavedPage() {
  const [savedPlaces, setSavedPlaces] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const { data } = await api.get('/users/wishlist');
        if (data.success) {
          setSavedPlaces(data.savedPlaces);
          setSavedIds(data.savedPlaces.map(p => p._id));
        }
      } catch {}
      setLoading(false);
    };
    fetchWishlist();
  }, []);

  const handleSaveToggle = (id, saved) => {
    if (!saved) {
      setSavedPlaces(prev => prev.filter(p => p._id !== id));
      setSavedIds(prev => prev.filter(sid => sid !== id));
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fdf3ed', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, maxWidth: 1200, margin: '0 auto', width: '100%', padding: '100px 40px 60px' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, color: '#3c1f16', fontWeight: 700, marginBottom: 8 }}>
            ❤️ Saved Places
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#8a6050' }}>
            {savedPlaces.length} heritage site{savedPlaces.length !== 1 ? 's' : ''} saved
          </p>
        </div>

        {loading ? <PageLoader /> : savedPlaces.length === 0 ? (
          <EmptyState
            icon="❤️"
            title="No Saved Places Yet"
            message="Explore heritage and save your favorite sites to revisit them anytime."
          />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {savedPlaces.map(h => (
              <HeritageCard key={h._id} heritage={h} savedIds={savedIds} onSaveToggle={handleSaveToggle} />
            ))}
          </div>
        )}

        {savedPlaces.length === 0 && !loading && (
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Link to="/heritage" style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#e6ab82', fontWeight: 600 }}>
              Explore Heritage →
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
