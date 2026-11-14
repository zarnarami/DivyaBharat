// src/pages/StatesPage.js — All States & UTs Heritage Directory
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { PageLoader, EmptyState } from '../components/LoadingSpinner';
import StateEmblemIcon from '../components/StateEmblemIcon';
import api from '../services/api';
import './StatesPage.css';
import { FaSearch, FaMapMarkerAlt, FaOm, FaLandmark } from 'react-icons/fa';

import { STATE_IMAGES } from '../data/stateImages';
import { STATE_CULTURAL_THEMES } from '../data/stateCulturalThemes';

// Warm gradient placeholders for states without images
const STATE_GRADIENTS = [
  'linear-gradient(135deg, #f5c6a0, #e8907a)',
  'linear-gradient(135deg, #d4b4e8, #9a70b8)',
  'linear-gradient(135deg, #a8d4b4, #60a080)',
  'linear-gradient(135deg, #f0c090, #d08040)',
  'linear-gradient(135deg, #b4c8e8, #6090b8)',
  'linear-gradient(135deg, #f0a8c0, #c06080)',
  'linear-gradient(135deg, #c8e8a8, #80b040)',
  'linear-gradient(135deg, #e8d0a0, #c09050)',
  'linear-gradient(135deg, #a0c8e8, #4080b0)',
  'linear-gradient(135deg, #e8b0a0, #c05040)',
];

const REGIONS = ['All', 'North', 'South', 'East', 'West', 'Northeast', 'Central', 'Islands'];

export default function StatesPage() {
  const navigate = useNavigate();
  const [states, setStates] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('All');

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const { data } = await api.get('/states');
        if (data.success) {
          setStates(data.states);
          setFiltered(data.states);
        }
      } catch (err) {
        console.error('Failed to load states:', err);
      }
      setLoading(false);
    };
    fetchStates();
  }, []);

  useEffect(() => {
    let result = states;
    if (search) {
      result = result.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (region !== 'All') {
      result = result.filter(s => s.region === region);
    }
    setFiltered(result);
  }, [search, region, states]);

  const getStateImage = (stateName, index) => {
    if (STATE_IMAGES[stateName]) return { type: 'img', src: STATE_IMAGES[stateName] };
    return { type: 'gradient', value: STATE_GRADIENTS[index % STATE_GRADIENTS.length] };
  };

  const stateEmojis = {
    'North': '🏔️', 'South': '🌴', 'East': '🌅', 'West': '🏜️',
    'Northeast': '🌿', 'Central': '🏛️', 'Islands': '🏝️'
  };

  return (
    <div className="db-states-page">
      <Navbar />

      {/* HERO */}
      <div className="db-states-hero">
        <div className="db-states-hero-inner">
          <p className="db-states-hero-sub">
            <FaOm className="db-om-icon" /> Regional Heritage Directory
          </p>
          <h1>States & Regions of Bharat</h1>
          <p className="db-states-hero-desc">
            Journey across 28 States and 8 Union Territories — each endowed with sacred sanctums, sovereign citadels, living traditions, and millennia of divine history.
          </p>

          {/* SEARCH */}
          <div className="db-states-search">
            <FaSearch className="db-states-search-icon" />
            <input
              type="text"
              placeholder="Search states by name, capital, or heritage..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch('')} className="db-states-clear">✕</button>
            )}
          </div>

          {/* REGION TABS */}
          <div className="db-states-region-tabs">
            {REGIONS.map(r => (
              <button
                key={r}
                className={`db-states-region-tab ${region === r ? 'active' : ''}`}
                onClick={() => setRegion(r)}
              >
                {stateEmojis[r] || '🇮🇳'} {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="db-states-main">
        {loading ? (
          <PageLoader />
        ) : filtered.length === 0 ? (
          <EmptyState icon="🗺️" title="No States Found" message="Try a different search term or reset filters." />
        ) : (
          <>
            <div className="db-states-header-row">
              <p className="db-states-count">
                Showing <strong>{filtered.length}</strong> of 36 States & Union Territories
              </p>
            </div>

            <div className="db-states-grid">
              {filtered.map((state, index) => {
                const imgInfo = getStateImage(state.name, index);
                const theme = STATE_CULTURAL_THEMES[state.name];

                return (
                  <div
                    key={state.name}
                    className="db-state-card"
                    onClick={() => navigate(`/states/${encodeURIComponent(state.name)}`)}
                  >
                    <div className="db-state-card-img-wrap">
                      {imgInfo.type === 'img' ? (
                        <img src={imgInfo.src} alt={state.name} className="db-state-card-img" />
                      ) : (
                        <div
                          className="db-state-card-img"
                          style={{ background: imgInfo.value, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '52px' }}
                        >
                          {stateEmojis[state.region] || '🏛️'}
                        </div>
                      )}
                      <div className="db-state-card-overlay" />

                      <div className="db-state-card-region">
                        {state.isUT ? 'Union Territory' : `${state.region} India`}
                      </div>

                      {/* State Cultural Emblem Medallion */}
                      <div className="db-state-card-emblem-badge">
                        <StateEmblemIcon stateName={state.name} />
                      </div>
                    </div>

                    <div className="db-state-card-body">
                      <h3>{state.name}</h3>

                      <p className="db-state-card-capital">
                        <FaMapMarkerAlt size={11} /> Capital: <strong>{state.capital}</strong>
                      </p>

                      {theme?.archStyle && (
                        <p className="db-state-card-arch">
                          <FaLandmark size={10} /> {theme.archStyle.split('&')[0].trim()}
                        </p>
                      )}

                      <p className="db-state-card-desc">{state.description}</p>

                      <button className="db-state-card-btn">Explore Sacred Heritage →</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
