// src/components/HeritageCard.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './HeritageCard.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export default function HeritageCard({ heritage, savedIds = [], onSaveToggle }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isSaved = savedIds.includes(heritage._id);

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { navigate('/'); return; }
    try {
      if (isSaved) {
        await api.delete(`/users/wishlist/${heritage._id}`);
      } else {
        await api.post(`/users/wishlist/${heritage._id}`);
      }
      if (onSaveToggle) onSaveToggle(heritage._id, !isSaved);
    } catch (error) {
      console.error('Wishlist error:', error);
    }
  };

  const placeholderBg = {
    Temple: 'linear-gradient(135deg, #f5c6a0, #e8a070)',
    Monument: 'linear-gradient(135deg, #d4b896, #b89060)',
    Festival: 'linear-gradient(135deg, #f0c080, #d89040)',
    Tradition: 'linear-gradient(135deg, #c8a8d8, #9870b0)',
    'Art Form': 'linear-gradient(135deg, #f0a8c0, #d07090)',
    'Historical Place': 'linear-gradient(135deg, #a8c8d8, #6090a8)',
    'Historical Event': 'linear-gradient(135deg, #c8d4a8, #90a870)',
    'Natural Heritage': 'linear-gradient(135deg, #a8d8a8, #60a860)',
  };

  const categoryKey = heritage.category?.split(' ')[0] || 'Monument';

  return (
    <div className="db-heritage-card">
      <div className="db-heritage-card-img-wrap">
        {heritage.image ? (
          <img
            src={heritage.image}
            alt={heritage.name}
            className="db-heritage-card-img"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
        ) : null}
        <div
          className="db-heritage-card-img"
          style={{
            background: placeholderBg[heritage.category] || placeholderBg.Monument,
            display: heritage.image ? 'none' : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px'
          }}
        >
          {heritage.category === 'Temple' ? '🛕' :
           heritage.category === 'Monument' ? '🏛️' :
           heritage.category === 'Festival' ? '🎊' :
           heritage.category === 'Tradition' ? '🪔' :
           heritage.category === 'Art Form' ? '🎭' : '🗺️'}
        </div>

        <span className={`db-heritage-card-badge ${categoryKey}`}>
          {heritage.category}
        </span>
        {heritage.unescoListed && (
          <span className="db-heritage-card-unesco">⭐ UNESCO</span>
        )}
      </div>

      <div className="db-heritage-card-body">
        <p className="db-heritage-card-state">📍 {heritage.state}</p>
        <h3>{heritage.name}</h3>
        <p className="db-heritage-card-desc">{heritage.description}</p>

        <div className="db-heritage-card-actions">
          <Link
            to={`/heritage/${heritage._id}`}
            className="db-heritage-card-btn primary"
          >
            View Details
          </Link>
          {user && (
            <button
              onClick={handleSave}
              className={`db-heritage-card-btn secondary ${isSaved ? 'saved' : ''}`}
            >
              {isSaved ? <FaHeart size={13} /> : <FaRegHeart size={13} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
