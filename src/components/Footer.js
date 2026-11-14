// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import footerTemple from '../assets/footer-temple.png';
import logo from '../assets/logo.png';
import { FaHeart } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="db-footer-main">
      <div className="db-footer-temple-art">
        <img src={footerTemple} alt="Temple artwork" />
      </div>

      <div className="db-footer-content">
        <div className="db-footer-brand">
          <img src={logo} alt="DivyaBharat" className="db-footer-logo" />
          <h2>DivyaBharat</h2>
          <p className="db-footer-tagline">Rooted in Culture, United in Spirit</p>
          <p className="db-footer-desc">
            A digital Heritage Learning Hub dedicated to preserving and promoting India's rich cultural and historical legacy for present and future generations.
          </p>
        </div>

        <div className="db-footer-links-grid">
          <div className="db-footer-col">
            <h4>Explore</h4>
            <ul>
              <li><Link to="/heritage">Heritage Explorer</Link></li>
              <li><Link to="/states">States of India</Link></li>
              <li><Link to="/learning">Learning Modules</Link></li>
              <li><Link to="/quiz">Take a Quiz</Link></li>
            </ul>
          </div>
          <div className="db-footer-col">
            <h4>Platform</h4>
            <ul>
              <li><Link to="/about">About DivyaBharat</Link></li>
              <li><Link to="/profile">My Profile</Link></li>
              <li><Link to="/saved">Saved Places</Link></li>
              <li><Link to="/settings">Settings</Link></li>
            </ul>
          </div>
          <div className="db-footer-col">
            <h4>Heritage</h4>
            <ul>
              <li><Link to="/heritage?category=Temple">Temples</Link></li>
              <li><Link to="/heritage?category=Monument">Monuments</Link></li>
              <li><Link to="/heritage?category=Festival">Festivals</Link></li>
              <li><Link to="/heritage?category=Art Form">Art Forms</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="db-footer-bottom">
        <div className="db-footer-divider"></div>
        <div className="db-footer-bottom-content">
          <p>
            © 2024 DivyaBharat Heritage Learning Hub.
            All heritage information sourced from UNESCO, ASI, and Ministry of Culture, Government of India.
          </p>
          <p>
            Made with <FaHeart style={{ color: '#e6ab82', verticalAlign: 'middle', margin: '0 4px' }} /> for Bharat's heritage • Created by Zarna Rami
          </p>
        </div>
      </div>
    </footer>
  );
}
