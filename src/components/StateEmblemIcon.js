// src/components/StateEmblemIcon.js
// Dedicated Premium Cultural & Architectural Emblem Icons for all 28 Indian States & 8 Union Territories
// Follows an identical premium design system:
// - Same dimensions (120x108 viewBox)
// - Same two-tone palette (Antique Gold & Terracotta with Sacred Saffron accents)
// - Same stroke weight, sacred halo aura backdrop, radiance accent dots, and ground plinth
// - Distinct, authentic cultural/heritage/architectural silhouette for each region

import React from 'react';

// Shared Frame & Gradient Definitions ensuring 100% aesthetic uniformity
function SharedFrame({ children, idPrefix = 'db' }) {
  const goldId = `${idPrefix}-gold`;
  const terraId = `${idPrefix}-terra`;
  const flagId = `${idPrefix}-flag`;
  const auraId = `${idPrefix}-aura`;
  const glowId = `${idPrefix}-glow`;
  const filterId = `${idPrefix}-filter`;

  return (
    <svg
      viewBox="0 0 120 108"
      className="temple-emblem-svg"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Antique Gold Gradient */}
        <linearGradient id={goldId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fde08b" />
          <stop offset="50%" stopColor="#d48834" />
          <stop offset="100%" stopColor="#f9d976" />
        </linearGradient>

        {/* Royal Terracotta Gradient */}
        <linearGradient id={terraId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c05324" />
          <stop offset="45%" stopColor="#8a2a0a" />
          <stop offset="100%" stopColor="#5a1804" />
        </linearGradient>

        {/* Sacred Saffron Flag Gradient */}
        <linearGradient id={flagId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f39c12" />
          <stop offset="100%" stopColor="#d35400" />
        </linearGradient>

        {/* Spiritual Aura Radial Gradient */}
        <radialGradient id={auraId} cx="50%" cy="52%" r="48%">
          <stop offset="0%" stopColor="#f6be95" stopOpacity="0.45" />
          <stop offset="50%" stopColor="#f3a675" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#f09560" stopOpacity="0" />
        </radialGradient>

        {/* Inner Sanctum Radial Glow */}
        <radialGradient id={glowId} cx="50%" cy="65%" r="40%">
          <stop offset="0%" stopColor="#ffeaa7" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#e67e22" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#3d1406" stopOpacity="0" />
        </radialGradient>

        {/* Soft Diya Glow Filter */}
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="glow" />
          <feComposite in="SourceGraphic" in2="glow" operator="over" />
        </filter>
      </defs>

      {/* ── Sacred Aura Halo Backdrop (Identical on every card) ── */}
      <circle cx="60" cy="54" r="44" fill={`url(#${auraId})`} />
      <circle
        cx="60"
        cy="54"
        r="45"
        fill="none"
        stroke="rgba(214, 120, 60, 0.22)"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      <circle
        cx="60"
        cy="54"
        r="48.5"
        fill="none"
        stroke="rgba(214, 120, 60, 0.12)"
        strokeWidth="0.75"
      />

      {/* Radiance Accent Dots (Identical across all 36 icons) */}
      <circle cx="60" cy="5.5" r="1.5" fill="#e67e22" opacity="0.6" />
      <circle cx="94.5" cy="19.5" r="1.3" fill="#e67e22" opacity="0.45" />
      <circle cx="108.5" cy="54" r="1.5" fill="#e67e22" opacity="0.45" />
      <circle cx="94.5" cy="88.5" r="1.3" fill="#e67e22" opacity="0.4" />
      <circle cx="25.5" cy="88.5" r="1.3" fill="#e67e22" opacity="0.4" />
      <circle cx="11.5" cy="54" r="1.5" fill="#e67e22" opacity="0.45" />
      <circle cx="25.5" cy="19.5" r="1.3" fill="#e67e22" opacity="0.45" />

      {/* Ground Foundation Plinth (Same baseline across all cards) */}
      <line x1="24" y1="87" x2="96" y2="87" stroke={`url(#${goldId})`} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="28" y1="90" x2="92" y2="90" stroke="rgba(192, 83, 36, 0.4)" strokeWidth="1" strokeLinecap="round" />

      {/* Distinct Regional Vector Artwork */}
      {typeof children === 'function' ? children({ goldId, terraId, flagId, glowId, filterId }) : children}
    </svg>
  );
}

// ══════════════════════════════════════════════════════════════════
// 28 INDIAN STATES — AUTHENTIC REGIONAL CULTURAL & ARCHITECTURAL MOTIFS
// ══════════════════════════════════════════════════════════════════

// 1. Andhra Pradesh — Tirupati Venkateswara Temple Gopuram & Ananda Nilayam Vimana
function AndhraPradeshIcon() {
  return (
    <SharedFrame idPrefix="ap">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Kalash Pinnacle */}
          <polygon points="60,11 62,14 58,14" fill={`url(#${goldId})`} />
          <ellipse cx="60" cy="16" rx="4" ry="2" fill={`url(#${goldId})`} />
          {/* Tier 1 (Apex) */}
          <path d="M54 18 L66 18 L68 28 L52 28 Z" fill={`url(#${terraId})`} />
          <rect x="50" y="27" width="20" height="2" rx="0.5" fill={`url(#${goldId})`} />
          {/* Tier 2 */}
          <path d="M48 29 L72 29 L75 42 L45 42 Z" fill={`url(#${terraId})`} />
          <circle cx="60" cy="35" r="2.5" fill={`url(#${goldId})`} />
          <rect x="43" y="41" width="34" height="2" rx="0.5" fill={`url(#${goldId})`} />
          {/* Tier 3 */}
          <path d="M41 43 L79 43 L83 58 L37 58 Z" fill={`url(#${terraId})`} />
          <path d="M57 48 C57 45 63 45 63 48 L63 54 L57 54 Z" fill={`url(#${goldId})`} />
          <rect x="35" y="57" width="50" height="2.5" rx="0.5" fill={`url(#${goldId})`} />
          {/* Base Gopuram Pillars & Sanctum */}
          <rect x="34" y="60" width="52" height="27" fill={`url(#${terraId})`} />
          <path d="M50 87 L50 69 C50 63 70 63 70 69 L70 87" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="1.5" />
          <line x1="42" y1="60" x2="42" y2="87" stroke={`url(#${goldId})`} strokeWidth="1.2" />
          <line x1="78" y1="60" x2="78" y2="87" stroke={`url(#${goldId})`} strokeWidth="1.2" />
          {/* Sacred Tirupati Namam in Sanctum */}
          <path d="M57 74 L57 82 M63 74 L63 82 M60 76 L60 84" stroke={`url(#${goldId})`} strokeWidth="1.2" strokeLinecap="round" />
        </g>
      )}
    </SharedFrame>
  );
}

// 2. Arunachal Pradesh — Tawang Himalayan Buddhist Monastery & Snow Peaks
function ArunachalPradeshIcon() {
  return (
    <SharedFrame idPrefix="arp">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Mountain Silhouette Background */}
          <polygon points="18,87 40,48 58,74" fill="rgba(214, 120, 60, 0.25)" />
          <polygon points="46,87 75,40 102,87" fill="rgba(214, 120, 60, 0.2)" />
          {/* Snow caps */}
          <polygon points="40,48 45,56 35,56" fill={`url(#${goldId})`} opacity="0.8" />
          <polygon points="75,40 82,51 68,51" fill={`url(#${goldId})`} opacity="0.8" />
          {/* Golden Pagoda Spire */}
          <polygon points="60,14 62,18 58,18" fill={`url(#${goldId})`} />
          <circle cx="60" cy="20" r="3" fill={`url(#${goldId})`} />
          {/* Tier 1 Roof with flared eaves */}
          <path d="M48 24 C52 22 68 22 72 24 L76 29 L44 29 Z" fill={`url(#${goldId})`} />
          <rect x="50" y="29" width="20" height="9" fill={`url(#${terraId})`} />
          {/* Tier 2 Roof */}
          <path d="M40 38 C47 35 73 35 80 38 L84 44 L36 44 Z" fill={`url(#${goldId})`} />
          <rect x="42" y="44" width="36" height="12" fill={`url(#${terraId})`} />
          <rect x="54" y="46" width="12" height="7" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          {/* Main Monastery Body */}
          <path d="M34 56 C44 52 76 52 86 56 L90 62 L30 62 Z" fill={`url(#${goldId})`} />
          <rect x="33" y="62" width="54" height="25" fill={`url(#${terraId})`} />
          {/* Traditional Monastery Windows */}
          <rect x="40" y="66" width="7" height="9" rx="1" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          <rect x="52" y="66" width="7" height="9" rx="1" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          <rect x="64" y="66" width="7" height="9" rx="1" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          <rect x="73" y="66" width="7" height="9" rx="1" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          {/* Prayer Flags Line */}
          <line x1="28" y1="36" x2="40" y2="44" stroke={`url(#${flagId})`} strokeWidth="1" strokeDasharray="2 2" />
        </g>
      )}
    </SharedFrame>
  );
}

// 3. Assam — Traditional Assamese Jaapi & Kaziranga Heritage
function AssamIcon() {
  return (
    <SharedFrame idPrefix="as">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Conical Jaapi Sun-Hat Apex Jewel */}
          <polygon points="60,14 62.5,19 57.5,19" fill={`url(#${goldId})`} />
          <ellipse cx="60" cy="21" rx="4" ry="2" fill={`url(#${terraId})`} />
          {/* Jaapi Conical Body with Woven Rings */}
          <polygon points="60,20 88,58 32,58" fill={`url(#${goldId})`} />
          <path d="M32 58 Q60 66 88 58" fill={`url(#${terraId})`} />
          {/* Decorative Jaapi Concentric Bands */}
          <path d="M42 44 Q60 50 78 44" stroke={`url(#${terraId})`} strokeWidth="1.5" fill="none" />
          <path d="M48 34 Q60 38 72 34" stroke={`url(#${terraId})`} strokeWidth="1.2" fill="none" />
          {/* Central 8-Pointed Floral Medallion */}
          <circle cx="60" cy="46" r="6" fill={`url(#${terraId})`} />
          <circle cx="60" cy="46" r="3.5" fill={`url(#${goldId})`} />
          <polygon points="60,37 62,42 60,40 58,42" fill={`url(#${flagId})`} />
          <polygon points="60,55 62,50 60,52 58,50" fill={`url(#${flagId})`} />
          {/* Traditional Jaapi Rim with Red Petals */}
          <ellipse cx="60" cy="62" rx="34" ry="9" fill={`url(#${goldId})`} stroke={`url(#${terraId})`} strokeWidth="1.5" />
          <ellipse cx="60" cy="62" rx="26" ry="6" fill={`url(#${terraId})`} />
          {/* Brahmaputra Sacred River Waves below */}
          <path d="M26 76 Q42 70 60 76 T94 76" stroke={`url(#${goldId})`} strokeWidth="1.5" fill="none" />
          <path d="M30 82 Q46 76 60 82 T90 82" stroke={`url(#${goldId})`} strokeWidth="1.2" fill="none" opacity="0.7" />
        </g>
      )}
    </SharedFrame>
  );
}

// 4. Bihar — Sacred Bodhi Tree & Mahabodhi Temple Pyramid Spire
function BiharIcon() {
  return (
    <SharedFrame idPrefix="br">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Sacred Bodhi Tree Canopy Leaves */}
          <path d="M60 16 C50 14 44 24 48 30 C38 32 36 44 44 48 C36 54 44 64 52 60 C56 70 64 70 68 60 C76 64 84 54 76 48 C84 44 82 32 72 30 C76 24 70 14 60 16 Z" fill="rgba(214, 120, 60, 0.2)" />
          {/* Mahabodhi Stepped Pyramid Shikhara */}
          <polygon points="60,16 61.5,19 58.5,19" fill={`url(#${goldId})`} />
          <path d="M56 20 L64 20 L66 32 L54 32 Z" fill={`url(#${terraId})`} />
          <rect x="52" y="31" width="16" height="2" fill={`url(#${goldId})`} />
          <path d="M52 33 L68 33 L71 47 L49 47 Z" fill={`url(#${terraId})`} />
          {/* Carved Gavaksha Arches on Shikhara */}
          <circle cx="60" cy="40" r="2.5" fill={`url(#${goldId})`} />
          <rect x="47" y="46" width="26" height="2.5" fill={`url(#${goldId})`} />
          <path d="M47 48.5 L73 48.5 L76 65 L44 65 Z" fill={`url(#${terraId})`} />
          <circle cx="60" cy="56" r="3.5" fill={`url(#${goldId})`} />
          {/* Sanctum Torana Arch & Bodhi Peepal Leaf Centerpiece */}
          <rect x="41" y="65" width="38" height="22" fill={`url(#${terraId})`} />
          <path d="M48 87 L48 70 C48 64 72 64 72 70 L72 87" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="1.5" />
          {/* Revered Bodhi Leaf Silhouette in Garbhagriha */}
          <path d="M60 70 C56 74 54 78 57 82 C60 84 60 86 60 86 C60 86 60 84 63 82 C66 78 64 74 60 70 Z" fill={`url(#${goldId})`} />
        </g>
      )}
    </SharedFrame>
  );
}

// 5. Chhattisgarh — Bastar Dhokra Bell-Metal Sun & Tribal Heritage
function ChhattisgarhIcon() {
  return (
    <SharedFrame idPrefix="cg">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Sacred Bastar Sun Face Center */}
          <circle cx="60" cy="44" r="16" fill={`url(#${terraId})`} stroke={`url(#${goldId})`} strokeWidth="2" />
          <circle cx="60" cy="44" r="12" fill="#381306" />
          {/* Sun Eyes & Mystic Brow */}
          <ellipse cx="56" cy="42" rx="1.8" ry="1.2" fill={`url(#${goldId})`} />
          <ellipse cx="64" cy="42" rx="1.8" ry="1.2" fill={`url(#${goldId})`} />
          <path d="M57 48 Q60 51 63 48" stroke={`url(#${goldId})`} strokeWidth="1.2" fill="none" />
          <circle cx="60" cy="38" r="1.5" fill={`url(#${goldId})`} />
          {/* 12 Radiant Dhokra Twisted Sun Rays */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 60 + 17 * Math.cos(rad);
            const y1 = 44 + 17 * Math.sin(rad);
            const x2 = 60 + 26 * Math.cos(rad);
            const y2 = 44 + 26 * Math.sin(rad);
            return (
              <g key={i}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={`url(#${goldId})`} strokeWidth="1.8" strokeLinecap="round" />
                <circle cx={x2} cy={y2} r="1.2" fill={`url(#${terraId})`} />
              </g>
            );
          })}
          {/* Chitrakote Horseshoe Waterfall Basin below */}
          <path d="M34 76 Q60 84 86 76" stroke={`url(#${goldId})`} strokeWidth="2" fill="none" />
          <path d="M38 82 Q60 88 82 82" stroke={`url(#${goldId})`} strokeWidth="1.2" fill="none" opacity="0.7" />
          <line x1="48" y1="76" x2="48" y2="86" stroke={`url(#${terraId})`} strokeWidth="1" strokeDasharray="1.5 1.5" />
          <line x1="60" y1="78" x2="60" y2="87" stroke={`url(#${terraId})`} strokeWidth="1" strokeDasharray="1.5 1.5" />
          <line x1="72" y1="76" x2="72" y2="86" stroke={`url(#${terraId})`} strokeWidth="1" strokeDasharray="1.5 1.5" />
        </g>
      )}
    </SharedFrame>
  );
}

// 6. Goa — Basilica of Bom Jesus Portuguese Baroque Heritage Church & Coastal Palms
function GoaIcon() {
  return (
    <SharedFrame idPrefix="ga">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Baroque Curvilinear Pediment with Cross */}
          <line x1="60" y1="12" x2="60" y2="18" stroke={`url(#${goldId})`} strokeWidth="1.5" />
          <line x1="57" y1="14" x2="63" y2="14" stroke={`url(#${goldId})`} strokeWidth="1.5" />
          <path d="M48 24 Q60 18 72 24 L72 30 L48 30 Z" fill={`url(#${goldId})`} />
          {/* Top Storey with Arched Belfry */}
          <rect x="46" y="30" width="28" height="16" fill={`url(#${terraId})`} />
          <path d="M57 41 A3 3 0 0 1 63 41 V44 H57 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          <rect x="42" y="46" width="36" height="2.5" fill={`url(#${goldId})`} />
          {/* Middle Storey with Rose Window & Classical Columns */}
          <rect x="40" y="48.5" width="40" height="20" fill={`url(#${terraId})`} />
          <circle cx="60" cy="58" r="5.5" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="1.2" />
          <circle cx="60" cy="58" r="2.5" fill={`url(#${goldId})`} />
          <line x1="44" y1="48.5" x2="44" y2="68.5" stroke={`url(#${goldId})`} strokeWidth="1.2" />
          <line x1="76" y1="48.5" x2="76" y2="68.5" stroke={`url(#${goldId})`} strokeWidth="1.2" />
          <rect x="36" y="68.5" width="48" height="2.5" fill={`url(#${goldId})`} />
          {/* Ground Storey with Triple Arched Portals */}
          <rect x="36" y="71" width="48" height="16" fill={`url(#${terraId})`} />
          <path d="M56 87 V77 A4 4 0 0 1 64 77 V87 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="1.2" />
          <path d="M42 87 V80 A2.5 2.5 0 0 1 47 80 V87 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          <path d="M73 87 V80 A2.5 2.5 0 0 1 78 80 V87 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          {/* Coastal Palm Frond Silhouette */}
          <path d="M22 87 Q26 62 34 52 M34 52 Q26 50 20 54 M34 52 Q28 46 22 47 M34 52 Q34 44 32 40 M34 52 Q38 46 40 43" stroke={`url(#${goldId})`} strokeWidth="1" fill="none" opacity="0.6" />
        </g>
      )}
    </SharedFrame>
  );
}

// 7. Gujarat — Rani ki Vav Subterranean Stepwell & Modhera Sun Torana Arch
function GujaratIcon() {
  return (
    <SharedFrame idPrefix="gj">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Modhera Sun Torana Crown Arch */}
          <path d="M44 26 Q60 16 76 26" stroke={`url(#${goldId})`} strokeWidth="2.5" fill="none" />
          <path d="M48 29 Q60 21 72 29" stroke={`url(#${terraId})`} strokeWidth="1.5" fill="none" />
          <polygon points="60,14 62.5,18 57.5,18" fill={`url(#${goldId})`} />
          <circle cx="60" cy="24" r="2.5" fill={`url(#${goldId})`} />
          {/* Stepwell Tier 1 — Top Pavilion */}
          <rect x="42" y="32" width="36" height="3" fill={`url(#${goldId})`} />
          <rect x="44" y="35" width="32" height="10" fill={`url(#${terraId})`} />
          <line x1="50" y1="35" x2="50" y2="45" stroke={`url(#${goldId})`} strokeWidth="1" />
          <line x1="60" y1="35" x2="60" y2="45" stroke={`url(#${goldId})`} strokeWidth="1" />
          <line x1="70" y1="35" x2="70" y2="45" stroke={`url(#${goldId})`} strokeWidth="1" />
          {/* Stepwell Tier 2 — Mid Stepped Pavilion */}
          <rect x="36" y="45" width="48" height="3" fill={`url(#${goldId})`} />
          <rect x="38" y="48" width="44" height="14" fill={`url(#${terraId})`} />
          {/* Inverted Step Symmetry */}
          <polygon points="40,62 46,62 46,54 40,54" fill="#381306" />
          <polygon points="74,62 80,62 80,54 74,54" fill="#381306" />
          <line x1="54" y1="48" x2="54" y2="62" stroke={`url(#${goldId})`} strokeWidth="1.2" />
          <line x1="66" y1="48" x2="66" y2="62" stroke={`url(#${goldId})`} strokeWidth="1.2" />
          {/* Stepwell Tier 3 — Deepest Sanctum Stepped Reservoir */}
          <rect x="30" y="62" width="60" height="3" fill={`url(#${goldId})`} />
          <rect x="32" y="65" width="56" height="22" fill={`url(#${terraId})`} />
          {/* Descending Inverted Steps to the Sacred Well */}
          <polygon points="36,87 44,87 44,79 50,79 50,72 70,72 70,79 76,79 76,87 84,87" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="1" />
          {/* Subterranean Water Reflection Glow */}
          <ellipse cx="60" cy="80" rx="8" ry="3" fill={`url(#${goldId})`} opacity="0.7" />
        </g>
      )}
    </SharedFrame>
  );
}

// 8. Haryana — Kurukshetra Dharma Chakra & Vedic Jyotisar Chariot Wheel
function HaryanaIcon() {
  return (
    <SharedFrame idPrefix="hr">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Sacred Shankha & Triumphal Crest at Top */}
          <polygon points="60,12 62.5,16 57.5,16" fill={`url(#${goldId})`} />
          <path d="M52 18 Q60 14 68 18 L68 22 L52 22 Z" fill={`url(#${terraId})`} />
          {/* Grand 16-Spoke Vedic Dharma Chakra Wheel */}
          <circle cx="60" cy="52" r="28" stroke={`url(#${goldId})`} strokeWidth="3" fill={`url(#${terraId})`} />
          <circle cx="60" cy="52" r="23" stroke={`url(#${goldId})`} strokeWidth="1" fill="#381306" />
          {/* Hub of the Chariot Wheel */}
          <circle cx="60" cy="52" r="8" fill={`url(#${goldId})`} stroke={`url(#${terraId})`} strokeWidth="1.5" />
          <circle cx="60" cy="52" r="4" fill="#381306" />
          <circle cx="60" cy="52" r="1.8" fill={`url(#${goldId})`} />
          {/* 16 Radiating Sacred Spokes */}
          {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 60 + 8 * Math.cos(rad);
            const y1 = 52 + 8 * Math.sin(rad);
            const x2 = 60 + 23 * Math.cos(rad);
            const y2 = 52 + 23 * Math.sin(rad);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={`url(#${goldId})`} strokeWidth={i % 2 === 0 ? "1.5" : "0.9"} />;
          })}
          {/* Vedic Pedestal Base with Lotus Motif */}
          <path d="M42 84 Q60 81 78 84 L82 87 L38 87 Z" fill={`url(#${goldId})`} />
        </g>
      )}
    </SharedFrame>
  );
}

// 9. Himachal Pradesh — Hidimba Devi Multi-Tier Wooden Pagoda & Himalayan Pines
function HimachalPradeshIcon() {
  return (
    <SharedFrame idPrefix="hp">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Snow-capped Himalayan Peaks Backdrop */}
          <polygon points="16,87 38,44 56,70" fill="rgba(214, 120, 60, 0.22)" />
          <polygon points="50,87 80,36 104,87" fill="rgba(214, 120, 60, 0.2)" />
          <polygon points="38,44 43,52 33,52" fill={`url(#${goldId})`} opacity="0.8" />
          <polygon points="80,36 86,46 74,46" fill={`url(#${goldId})`} opacity="0.8" />
          {/* Brass Kalash Pinnacle */}
          <polygon points="60,13 62,16 58,16" fill={`url(#${goldId})`} />
          <circle cx="60" cy="18" r="2.5" fill={`url(#${goldId})`} />
          {/* Pagoda Tier 1 (Apex Cone Roof) */}
          <path d="M48 22 C53 20 67 20 72 22 L75 28 L45 28 Z" fill={`url(#${goldId})`} />
          <rect x="52" y="28" width="16" height="7" fill={`url(#${terraId})`} />
          {/* Pagoda Tier 2 (Mid Flared Eaves Roof) */}
          <path d="M40 35 C48 32 72 32 80 35 L84 43 L36 43 Z" fill={`url(#${goldId})`} />
          <rect x="44" y="43" width="32" height="10" fill={`url(#${terraId})`} />
          {/* Pagoda Tier 3 (Broad Timber Sloping Roof) */}
          <path d="M30 53 C42 49 78 49 90 53 L94 62 L26 62 Z" fill={`url(#${goldId})`} />
          {/* Solid Cedar Timber Sanctuary Body */}
          <rect x="32" y="62" width="56" height="25" fill={`url(#${terraId})`} />
          <path d="M52 87 V71 A8 8 0 0 1 68 71 V87 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="1.5" />
          {/* Carved Wooden Doorway Detail */}
          <line x1="60" y1="71" x2="60" y2="87" stroke={`url(#${goldId})`} strokeWidth="1" />
          <circle cx="56" cy="79" r="1.2" fill={`url(#${goldId})`} />
          <circle cx="64" cy="79" r="1.2" fill={`url(#${goldId})`} />
        </g>
      )}
    </SharedFrame>
  );
}

// 10. Jharkhand — Baidyanath Jyotirlinga Temple & Sacred Panchshula Trident
function JharkhandIcon() {
  return (
    <SharedFrame idPrefix="jh">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Sacred Panchshula (5-Pronged Brass Trident) Finial */}
          <line x1="60" y1="8" x2="60" y2="18" stroke={`url(#${goldId})`} strokeWidth="1.5" />
          <line x1="54" y1="11" x2="66" y2="11" stroke={`url(#${goldId})`} strokeWidth="1.2" />
          <path d="M54 11 L54 7 M66 11 L66 7 M57 11 L57 8 M63 11 L63 8 M60 11 L60 6" stroke={`url(#${goldId})`} strokeWidth="1.2" strokeLinecap="round" />
          {/* Red/Saffron Sacred Flag */}
          <path d="M60 14 C66 12 72 16 77 14 C73 18 67 17 60 20 Z" fill={`url(#${flagId})`} />
          {/* Kalash & Amalaka Disc */}
          <ellipse cx="60" cy="22" rx="6" ry="2" fill={`url(#${goldId})`} />
          {/* Pyramid Shikhara Tier 1 */}
          <path d="M55 24 L65 24 L67 36 L53 36 Z" fill={`url(#${terraId})`} />
          <rect x="50" y="35" width="20" height="2" fill={`url(#${goldId})`} />
          {/* Pyramid Shikhara Tier 2 */}
          <path d="M50 37 L70 37 L74 54 L46 54 Z" fill={`url(#${terraId})`} />
          <circle cx="60" cy="45" r="2.5" fill={`url(#${goldId})`} />
          <rect x="42" y="53" width="36" height="2.5" fill={`url(#${goldId})`} />
          {/* Mandapa & Sanctum Chamber */}
          <rect x="38" y="55.5" width="44" height="31.5" fill={`url(#${terraId})`} />
          <path d="M48 87 V69 A12 12 0 0 1 72 69 V87 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="1.5" />
          {/* Revered Shivalinga Silhouette in Sanctum */}
          <path d="M56 83 C56 77 64 77 64 83 Z" fill={`url(#${goldId})`} />
          <ellipse cx="60" cy="83" rx="7" ry="2" fill={`url(#${goldId})`} />
        </g>
      )}
    </SharedFrame>
  );
}

// 11. Karnataka — Stone Chariot (Kallina Ratha) of Hampi
function KarnatakaIcon() {
  return (
    <SharedFrame idPrefix="ka">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Dravidian Vimana Crown of the Chariot */}
          <polygon points="60,16 62,20 58,20" fill={`url(#${goldId})`} />
          <path d="M52 21 L68 21 L71 31 L49 31 Z" fill={`url(#${terraId})`} />
          <rect x="47" y="30" width="26" height="2" fill={`url(#${goldId})`} />
          {/* Upper Pavilion with Sloping Cornice */}
          <path d="M43 32 L77 32 L81 42 L39 42 Z" fill={`url(#${terraId})`} />
          <rect x="37" y="42" width="46" height="3" fill={`url(#${goldId})`} />
          {/* Main Chariot Sanctum with 4 Carved Pillars */}
          <rect x="38" y="45" width="44" height="22" fill={`url(#${terraId})`} />
          <line x1="42" y1="45" x2="42" y2="67" stroke={`url(#${goldId})`} strokeWidth="1.5" />
          <line x1="54" y1="45" x2="54" y2="67" stroke={`url(#${goldId})`} strokeWidth="1.2" />
          <line x1="66" y1="45" x2="66" y2="67" stroke={`url(#${goldId})`} strokeWidth="1.2" />
          <line x1="78" y1="45" x2="78" y2="67" stroke={`url(#${goldId})`} strokeWidth="1.5" />
          {/* Chariot Bed Platform */}
          <rect x="32" y="67" width="56" height="4" rx="1" fill={`url(#${goldId})`} />
          {/* Pair of Famous Carved Stone Wheels */}
          <circle cx="44" cy="77" r="10" fill={`url(#${terraId})`} stroke={`url(#${goldId})`} strokeWidth="2" />
          <circle cx="44" cy="77" r="4" fill={`url(#${goldId})`} />
          <circle cx="44" cy="77" r="1.5" fill="#381306" />
          <circle cx="76" cy="77" r="10" fill={`url(#${terraId})`} stroke={`url(#${goldId})`} strokeWidth="2" />
          <circle cx="76" cy="77" r="4" fill={`url(#${goldId})`} />
          <circle cx="76" cy="77" r="1.5" fill="#381306" />
          {/* Stone Elephant Trunk Silhouette at front */}
          <path d="M88 69 Q94 72 92 78 Q90 82 86 82" stroke={`url(#${goldId})`} strokeWidth="1.5" fill="none" />
        </g>
      )}
    </SharedFrame>
  );
}

// 12. Kerala — Traditional Kettuvallam Houseboat & Kathakali Kireedam Crown
function KeralaIcon() {
  return (
    <SharedFrame idPrefix="kl">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Kathakali Kireedam Circular Halo Crown above */}
          <circle cx="60" cy="24" r="13" stroke={`url(#${goldId})`} strokeWidth="1.8" fill="rgba(214, 120, 60, 0.2)" />
          <polygon points="60,11 63,16 57,16" fill={`url(#${goldId})`} />
          <circle cx="60" cy="24" r="6" fill={`url(#${terraId})`} />
          <ellipse cx="60" cy="24" rx="2" ry="4" fill={`url(#${goldId})`} />
          {/* Kettuvallam Thatched Bamboo Arched Roof */}
          <path d="M38 48 C44 38 76 38 82 48 L80 62 L40 62 Z" fill={`url(#${terraId})`} stroke={`url(#${goldId})`} strokeWidth="1.5" />
          <path d="M44 48 C48 42 72 42 76 48" stroke={`url(#${goldId})`} strokeWidth="1" fill="none" />
          <path d="M46 54 C50 48 70 48 74 54" stroke={`url(#${goldId})`} strokeWidth="1" fill="none" />
          {/* Houseboat Windows */}
          <rect x="48" y="52" width="6" height="7" rx="1" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          <rect x="66" y="52" width="6" height="7" rx="1" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          {/* Graceful Swept Wooden Hull of the Boat */}
          <path d="M18 62 C34 76 86 76 102 62 C96 74 24 74 18 62 Z" fill={`url(#${goldId})`} />
          <path d="M18 62 L14 56 M102 62 L106 56" stroke={`url(#${goldId})`} strokeWidth="2" strokeLinecap="round" />
          {/* Kerala Backwaters Wave Ripples */}
          <path d="M22 78 Q42 72 60 78 T98 78" stroke={`url(#${goldId})`} strokeWidth="1.5" fill="none" />
          <path d="M26 84 Q44 80 60 84 T94 84" stroke={`url(#${goldId})`} strokeWidth="1" fill="none" opacity="0.6" />
        </g>
      )}
    </SharedFrame>
  );
}

// 13. Madhya Pradesh — Khajuraho Kandariya Mahadeva Shikhara & Sanchi Torana
function MadhyaPradeshIcon() {
  return (
    <SharedFrame idPrefix="mp">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Kalash & Ribbed Amalaka Disc at Apex */}
          <polygon points="60,11 61.5,14 58.5,14" fill={`url(#${goldId})`} />
          <ellipse cx="60" cy="16" rx="5" ry="1.8" fill={`url(#${goldId})`} />
          {/* Central Soaring Curvilinear Shikhara with Fluting */}
          <path d="M57 18 C56 26 53 38 49 52 L71 52 C67 38 64 26 63 18 Z" fill={`url(#${terraId})`} />
          <line x1="60" y1="18" x2="60" y2="52" stroke={`url(#${goldId})`} strokeWidth="1" />
          {/* Left Clustered Spire (Urushringa) */}
          <path d="M42 34 C42 40 45 48 48 54 L38 54 C40 46 41 38 42 34 Z" fill={`url(#${terraId})`} />
          <polygon points="42,32 43.5,34 40.5,34" fill={`url(#${goldId})`} />
          {/* Right Clustered Spire (Urushringa) */}
          <path d="M78 34 C78 40 75 48 72 54 L82 54 C80 46 79 38 78 34 Z" fill={`url(#${terraId})`} />
          <polygon points="78,32 79.5,34 76.5,34" fill={`url(#${goldId})`} />
          {/* Jagati Platform Molding Bands */}
          <rect x="32" y="52" width="56" height="3" fill={`url(#${goldId})`} />
          {/* Mandapa Hall & Pillared Sanctum */}
          <rect x="34" y="55" width="52" height="32" fill={`url(#${terraId})`} />
          <path d="M50 87 V68 A10 10 0 0 1 70 68 V87 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="1.5" />
          {/* Sculptured Terraces on Plinth */}
          <line x1="34" y1="64" x2="86" y2="64" stroke={`url(#${goldId})`} strokeWidth="1" />
          <line x1="34" y1="74" x2="86" y2="74" stroke={`url(#${goldId})`} strokeWidth="1" />
        </g>
      )}
    </SharedFrame>
  );
}

// 14. Maharashtra — Kailasa Temple of Ellora Monolithic Rock-Cut Marvel & Fort Gateway
function MaharashtraIcon() {
  return (
    <SharedFrame idPrefix="mh">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Monolithic Cliff Cut Contour lines */}
          <path d="M22 22 L36 34 L36 87 M98 22 L84 34 L84 87" stroke="rgba(214, 120, 60, 0.3)" strokeWidth="1.5" />
          {/* Rock-hewn Vimana Shikhara */}
          <polygon points="60,18 62,22 58,22" fill={`url(#${goldId})`} />
          <ellipse cx="60" cy="24" rx="4.5" ry="1.8" fill={`url(#${goldId})`} />
          <path d="M53 26 L67 26 L70 38 L50 38 Z" fill={`url(#${terraId})`} />
          <rect x="47" y="37" width="26" height="2" fill={`url(#${goldId})`} />
          {/* Monolithic Multi-Tier Pavilion */}
          <path d="M46 39 L74 39 L77 54 L43 54 Z" fill={`url(#${terraId})`} />
          <circle cx="60" cy="46" r="2.5" fill={`url(#${goldId})`} />
          <rect x="40" y="53" width="40" height="2.5" fill={`url(#${goldId})`} />
          {/* Freestanding Monolithic Victory Pillar (Dhvajastambha) */}
          <rect x="33" y="44" width="3.5" height="43" fill={`url(#${goldId})`} />
          <circle cx="34.75" cy="42" r="2" fill={`url(#${goldId})`} />
          {/* Main Sanctum Hall */}
          <rect x="41" y="55.5" width="38" height="31.5" fill={`url(#${terraId})`} />
          <path d="M51 87 V70 A9 9 0 0 1 69 70 V87 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="1.5" />
          {/* Elephants Base Foundation Silhouette */}
          <rect x="30" y="82" width="60" height="5" fill={`url(#${goldId})`} />
        </g>
      )}
    </SharedFrame>
  );
}

// 15. Manipur — Kangla Sha Winged Dragon & Classical Manipuri Headdress
function ManipurIcon() {
  return (
    <SharedFrame idPrefix="mn">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Manipuri Dance Tiered Cylindrical Crown with Crescent */}
          <ellipse cx="60" cy="18" rx="8" ry="3" fill={`url(#${goldId})`} />
          <path d="M54 18 L55 30 L65 30 L66 18 Z" fill={`url(#${terraId})`} stroke={`url(#${goldId})`} strokeWidth="1" />
          <path d="M52 14 Q60 8 68 14" stroke={`url(#${goldId})`} strokeWidth="1.8" fill="none" />
          {/* Kangla Sha — Mythical Heraldic Lion-Dragon of Manipur */}
          {/* Head & Horns */}
          <path d="M52 38 Q60 30 68 38 L65 46 L55 46 Z" fill={`url(#${goldId})`} />
          <line x1="56" y1="33" x2="52" y2="28" stroke={`url(#${goldId})`} strokeWidth="1.5" />
          <line x1="64" y1="33" x2="68" y2="28" stroke={`url(#${goldId})`} strokeWidth="1.5" />
          {/* Lion Body & Royal Wings */}
          <path d="M46 54 C34 46 36 34 44 42 C40 50 48 52 52 56 Z" fill={`url(#${goldId})`} />
          <path d="M74 54 C86 46 84 34 76 42 C80 50 72 52 68 56 Z" fill={`url(#${goldId})`} />
          {/* Central Body & Throne Pedestal */}
          <path d="M50 46 L70 46 L74 68 L46 68 Z" fill={`url(#${terraId})`} stroke={`url(#${goldId})`} strokeWidth="1.5" />
          <circle cx="60" cy="56" r="3.5" fill={`url(#${goldId})`} />
          {/* Loktak Lake Floating Phumdi Island Waves */}
          <path d="M30 76 Q60 70 90 76" stroke={`url(#${goldId})`} strokeWidth="2" fill="none" />
          <ellipse cx="44" cy="79" rx="10" ry="2.5" fill={`url(#${terraId})`} />
          <ellipse cx="76" cy="80" rx="12" ry="3" fill={`url(#${terraId})`} />
        </g>
      )}
    </SharedFrame>
  );
}

// 16. Meghalaya — Double-Decker Living Root Bridge (Jingkieng Jri)
function MeghalayaIcon() {
  return (
    <SharedFrame idPrefix="ml">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Misty Khasi Hills in background */}
          <path d="M18 42 Q38 34 56 40 T96 36 L102 87 L18 87 Z" fill="rgba(214, 120, 60, 0.2)" />
          {/* Giant Ancient Ficus Tree Trunks on Both Banks */}
          <path d="M18 24 Q30 44 32 87 L22 87 Q24 48 18 24 Z" fill={`url(#${terraId})`} />
          <path d="M102 24 Q90 44 88 87 L98 87 Q96 48 102 24 Z" fill={`url(#${terraId})`} />
          {/* Upper Living Root Bridge (Level 2) */}
          <path d="M30 42 C44 46 76 46 90 42" stroke={`url(#${goldId})`} strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M30 46 C44 50 76 50 90 46" stroke={`url(#${terraId})`} strokeWidth="2" fill="none" />
          {/* Hanging Tendril Root Fibers connecting upper & lower */}
          <line x1="42" y1="46" x2="44" y2="64" stroke={`url(#${goldId})`} strokeWidth="1" />
          <line x1="52" y1="47" x2="51" y2="65" stroke={`url(#${goldId})`} strokeWidth="1" />
          <line x1="68" y1="47" x2="69" y2="65" stroke={`url(#${goldId})`} strokeWidth="1" />
          <line x1="78" y1="46" x2="77" y2="64" stroke={`url(#${goldId})`} strokeWidth="1" />
          {/* Lower Living Root Bridge (Level 1) */}
          <path d="M28 64 C44 68 76 68 92 64" stroke={`url(#${goldId})`} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M28 68 C44 72 76 72 92 68" stroke={`url(#${terraId})`} strokeWidth="2" fill="none" />
          {/* Forest River Rapids below */}
          <path d="M34 80 Q60 76 86 80" stroke={`url(#${goldId})`} strokeWidth="1.5" fill="none" />
          <circle cx="48" cy="83" r="2.5" fill={`url(#${terraId})`} />
          <circle cx="72" cy="82" r="3" fill={`url(#${terraId})`} />
        </g>
      )}
    </SharedFrame>
  );
}

// 17. Mizoram — Mizo Cheraw Bamboo Lattice & Chawngbuk Thatched Pavilion
function MizoramIcon() {
  return (
    <SharedFrame idPrefix="mz">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Phawngpui Blue Mountain Peak Silhouette */}
          <polygon points="20,87 60,32 100,87" fill="rgba(214, 120, 60, 0.22)" />
          <polygon points="60,32 66,42 54,42" fill={`url(#${goldId})`} opacity="0.8" />
          {/* Traditional Thatched Chawngbuk High Gable Roof */}
          <path d="M36 44 L60 22 L84 44 L80 49 L60 30 L40 49 Z" fill={`url(#${goldId})`} />
          <rect x="42" y="47" width="36" height="18" fill={`url(#${terraId})`} />
          <line x1="60" y1="47" x2="60" y2="65" stroke={`url(#${goldId})`} strokeWidth="1.2" />
          {/* Interlocking Crossed Bamboo Lattice (Cheraw Dance Motif) */}
          <g stroke={`url(#${goldId})`} strokeWidth="1.8" strokeLinecap="round">
            <line x1="30" y1="70" x2="90" y2="70" />
            <line x1="30" y1="80" x2="90" y2="80" />
            <line x1="42" y1="64" x2="42" y2="86" />
            <line x1="54" y1="64" x2="54" y2="86" />
            <line x1="66" y1="64" x2="66" y2="86" />
            <line x1="78" y1="64" x2="78" y2="86" />
          </g>
          {/* Bamboo Joint Nodes */}
          {[42, 54, 66, 78].map((x, i) => (
            <circle key={i} cx={x} cy="70" r="1.5" fill={`url(#${terraId})`} />
          ))}
        </g>
      )}
    </SharedFrame>
  );
}

// 18. Nagaland — Naga Hornbill Bird Crest & Morung Warrior House Horns
function NagalandIcon() {
  return (
    <SharedFrame idPrefix="nl">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Great Indian Hornbill Ceremonial Beak & Plume */}
          <path d="M60 12 C68 12 76 18 78 26 C72 24 64 24 58 28 Z" fill={`url(#${goldId})`} />
          <path d="M58 28 C64 24 72 24 78 26 C82 34 76 42 66 42 L60 36 Z" fill={`url(#${terraId})`} />
          {/* Traditional Naga Morung Crossed Horned Gable (Kika) */}
          <line x1="36" y1="44" x2="72" y2="16" stroke={`url(#${goldId})`} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="84" y1="44" x2="48" y2="16" stroke={`url(#${goldId})`} strokeWidth="2.5" strokeLinecap="round" />
          {/* Thatched Steep High Roof of the Morung */}
          <polygon points="60,24 88,58 32,58" fill={`url(#${terraId})`} stroke={`url(#${goldId})`} strokeWidth="1.5" />
          {/* Geometric Diamond Carvings on Entrance */}
          <rect x="36" y="58" width="48" height="29" fill={`url(#${terraId})`} />
          <polygon points="60,62 68,70 60,78 52,70" fill={`url(#${goldId})`} />
          <polygon points="60,67 64,70 60,73 56,70" fill="#381306" />
          {/* Wooden Guardian Pillars */}
          <line x1="42" y1="58" x2="42" y2="87" stroke={`url(#${goldId})`} strokeWidth="1.5" />
          <line x1="78" y1="58" x2="78" y2="87" stroke={`url(#${goldId})`} strokeWidth="1.5" />
        </g>
      )}
    </SharedFrame>
  );
}

// 19. Odisha — Konark Sun Temple 16-Spoked Wheel & Jagannath Rekha Deula
function OdishaIcon() {
  return (
    <SharedFrame idPrefix="od">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Curvilinear Shikhara of Jagannath Temple at apex */}
          <polygon points="60,11 61.5,14 58.5,14" fill={`url(#${goldId})`} />
          <ellipse cx="60" cy="16" rx="5" ry="1.8" fill={`url(#${goldId})`} />
          {/* Sacred Neelachakra & Flag */}
          <path d="M60 14 C65 12 70 16 75 13 C72 17 66 16 60 19 Z" fill={`url(#${flagId})`} />
          {/* Monumental Konark Sun Chariot Wheel */}
          <circle cx="60" cy="52" r="28" stroke={`url(#${goldId})`} strokeWidth="3" fill={`url(#${terraId})`} />
          <circle cx="60" cy="52" r="23" stroke={`url(#${goldId})`} strokeWidth="1.2" fill="#381306" />
          {/* Ornate Medallion Hub */}
          <circle cx="60" cy="52" r="8" fill={`url(#${goldId})`} stroke={`url(#${terraId})`} strokeWidth="1.5" />
          <circle cx="60" cy="52" r="3.5" fill="#381306" />
          <circle cx="60" cy="52" r="1.5" fill={`url(#${goldId})`} />
          {/* 16 Carved Spoke Axles with Beadwork Medallions */}
          {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 60 + 8 * Math.cos(rad);
            const y1 = 52 + 8 * Math.sin(rad);
            const x2 = 60 + 23 * Math.cos(rad);
            const y2 = 52 + 23 * Math.sin(rad);
            const xm = 60 + 15 * Math.cos(rad);
            const ym = 52 + 15 * Math.sin(rad);
            return (
              <g key={i}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={`url(#${goldId})`} strokeWidth={i % 2 === 0 ? "1.6" : "0.9"} />
                {i % 2 === 0 && <circle cx={xm} cy={ym} r="1.2" fill={`url(#${goldId})`} />}
              </g>
            );
          })}
          {/* High Carved Stone Chariot Pedestal */}
          <rect x="36" y="82" width="48" height="5" rx="1" fill={`url(#${goldId})`} />
        </g>
      )}
    </SharedFrame>
  );
}

// 20. Punjab — Sri Harmandir Sahib (Golden Temple) & Amrit Sarovar Pool
function PunjabIcon() {
  return (
    <SharedFrame idPrefix="pb">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Sacred Golden Kalash & Chhatri Spire */}
          <polygon points="60,14 62,18 58,18" fill={`url(#${goldId})`} />
          <circle cx="60" cy="20" r="2.5" fill={`url(#${goldId})`} />
          {/* Central Fluted Golden Dome */}
          <path d="M48 30 C48 18 72 18 72 30 Z" fill={`url(#${goldId})`} />
          <line x1="60" y1="18" x2="60" y2="30" stroke={`url(#${terraId})`} strokeWidth="0.8" />
          <line x1="54" y1="21" x2="54" y2="30" stroke={`url(#${terraId})`} strokeWidth="0.6" />
          <line x1="66" y1="21" x2="66" y2="30" stroke={`url(#${terraId})`} strokeWidth="0.6" />
          {/* Upper Parapet & Four Corner Chhatris */}
          <rect x="42" y="30" width="36" height="3" fill={`url(#${goldId})`} />
          <path d="M38 27 C38 22 44 22 44 27 Z" fill={`url(#${goldId})`} />
          <path d="M76 27 C76 22 82 22 82 27 Z" fill={`url(#${goldId})`} />
          {/* Upper Golden Storey */}
          <rect x="40" y="33" width="40" height="15" fill={`url(#${goldId})`} />
          {/* Arched Jharokha Openings */}
          <path d="M46 44 V39 A3 3 0 0 1 52 39 V44 Z" fill="#381306" />
          <path d="M57 44 V38 A3 3 0 0 1 63 38 V44 Z" fill="#381306" />
          <path d="M68 44 V39 A3 3 0 0 1 74 39 V44 Z" fill="#381306" />
          <rect x="36" y="48" width="48" height="3" fill={`url(#${goldId})`} />
          {/* Marble Lower Storey with Four Open Doors */}
          <rect x="36" y="51" width="48" height="21" fill={`url(#${terraId})`} />
          <path d="M53 72 V60 A7 7 0 0 1 67 60 V72 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="1.2" />
          <line x1="42" y1="51" x2="42" y2="72" stroke={`url(#${goldId})`} strokeWidth="1" />
          <line x1="78" y1="51" x2="78" y2="72" stroke={`url(#${goldId})`} strokeWidth="1" />
          {/* Sacred Amrit Sarovar Reflection Water Lines */}
          <path d="M26 77 Q60 74 94 77" stroke={`url(#${goldId})`} strokeWidth="1.8" fill="none" />
          <path d="M32 82 Q60 80 88 82" stroke={`url(#${goldId})`} strokeWidth="1.2" fill="none" opacity="0.7" />
        </g>
      )}
    </SharedFrame>
  );
}

// 21. Rajasthan — Hawa Mahal Arched Jharokha Balconies & Fort Chhatris
function RajasthanIcon() {
  return (
    <SharedFrame idPrefix="rj">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Royal Rajput Fluted Chhatri Dome at Apex */}
          <polygon points="60,12 62,16 58,16" fill={`url(#${goldId})`} />
          <path d="M52 24 C52 16 68 16 68 24 Z" fill={`url(#${goldId})`} />
          <rect x="50" y="24" width="20" height="2" fill={`url(#${terraId})`} />
          {/* Top Tier Jharokha (Level 1) */}
          <path d="M46 26 Q60 21 74 26 L76 36 L44 36 Z" fill={`url(#${terraId})`} stroke={`url(#${goldId})`} strokeWidth="1" />
          <path d="M56 36 V30 A4 4 0 0 1 64 30 V36 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          <rect x="42" y="36" width="36" height="2" fill={`url(#${goldId})`} />
          {/* Mid Tier Jharokhas (Level 2 — Triple Balconies) */}
          <rect x="36" y="38" width="48" height="18" fill={`url(#${terraId})`} />
          <path d="M40 52 V44 A3 3 0 0 1 46 44 V52 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          <path d="M56 52 V42 A4 4 0 0 1 64 42 V52 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="1" />
          <path d="M74 52 V44 A3 3 0 0 1 80 44 V52 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          <rect x="32" y="56" width="56" height="2.5" fill={`url(#${goldId})`} />
          {/* Base Tier — Royal Fort Ramparts & Five Grand Arches */}
          <rect x="30" y="58.5" width="60" height="28.5" fill={`url(#${terraId})`} />
          <path d="M52 87 V70 A8 8 0 0 1 68 70 V87 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="1.5" />
          <path d="M36 87 V76 A4 4 0 0 1 44 76 V87 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          <path d="M76 87 V76 A4 4 0 0 1 84 76 V87 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          {/* Rajputana Fort Crenellations (Kanguras) */}
          <polygon points="32,58 34,56 36,58" fill={`url(#${goldId})`} />
          <polygon points="84,58 86,56 88,58" fill={`url(#${goldId})`} />
        </g>
      )}
    </SharedFrame>
  );
}

// 22. Sikkim — Rumtek Monastery Dharmachakra & Mt. Kanchenjunga
function SikkimIcon() {
  return (
    <SharedFrame idPrefix="sk">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Mt. Kanchenjunga Triple Snow Peaks */}
          <polygon points="18,87 40,42 60,68" fill="rgba(214, 120, 60, 0.22)" />
          <polygon points="46,87 74,32 102,87" fill="rgba(214, 120, 60, 0.25)" />
          <polygon points="40,42 45,50 35,50" fill={`url(#${goldId})`} opacity="0.8" />
          <polygon points="74,32 81,44 67,44" fill={`url(#${goldId})`} opacity="0.8" />
          {/* Golden Wheel of Dharma (Dharmachakra) */}
          <circle cx="60" cy="40" r="16" stroke={`url(#${goldId})`} strokeWidth="2.5" fill={`url(#${terraId})`} />
          <circle cx="60" cy="40" r="12" stroke={`url(#${goldId})`} strokeWidth="0.8" fill="#381306" />
          <circle cx="60" cy="40" r="4.5" fill={`url(#${goldId})`} />
          {/* 8 Noble Spokes of the Dharmachakra */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 60 + 4.5 * Math.cos(rad);
            const y1 = 40 + 4.5 * Math.sin(rad);
            const x2 = 60 + 12 * Math.cos(rad);
            const y2 = 40 + 12 * Math.sin(rad);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={`url(#${goldId})`} strokeWidth="1.2" />;
          })}
          {/* Two Reverent Kneeling Deer (Mrigadava) flanking the wheel */}
          {/* Left Deer */}
          <path d="M38 56 Q36 46 44 48 Q46 54 42 60 L32 60 Z" fill={`url(#${goldId})`} />
          <line x1="42" y1="46" x2="40" y2="42" stroke={`url(#${goldId})`} strokeWidth="1.2" />
          {/* Right Deer */}
          <path d="M82 56 Q84 46 76 48 Q74 54 78 60 L88 60 Z" fill={`url(#${goldId})`} />
          <line x1="78" y1="46" x2="80" y2="42" stroke={`url(#${goldId})`} strokeWidth="1.2" />
          {/* Monastery Lotus Pedestal Platform */}
          <rect x="30" y="66" width="60" height="21" fill={`url(#${terraId})`} />
          <path d="M48 87 V72 A12 12 0 0 1 72 72 V87 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="1.5" />
        </g>
      )}
    </SharedFrame>
  );
}

// 23. Tamil Nadu — Towering Dravidian Gopuram (Madurai / Brihadeeswara)
function TamilNaduIcon() {
  return (
    <SharedFrame idPrefix="tn">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Row of 5 Golden Kalash Finials crowning the Gopuram */}
          {[-12, -6, 0, 6, 12].map((off, i) => (
            <polygon key={i} points={`${60 + off},9 ${61.5 + off},12 ${58.5 + off},12`} fill={`url(#${goldId})`} />
          ))}
          {/* Barrel-Vaulted Shala Crown Roof */}
          <path d="M44 14 Q60 10 76 14 L78 20 L42 20 Z" fill={`url(#${goldId})`} />
          {/* Gopuram Tier 1 */}
          <path d="M45 20 L75 20 L78 30 L42 30 Z" fill={`url(#${terraId})`} />
          <circle cx="60" cy="25" r="2" fill={`url(#${goldId})`} />
          <rect x="40" y="29" width="40" height="2" fill={`url(#${goldId})`} />
          {/* Gopuram Tier 2 */}
          <path d="M40 31 L80 31 L84 44 L36 44 Z" fill={`url(#${terraId})`} />
          <circle cx="60" cy="37" r="2.5" fill={`url(#${goldId})`} />
          <rect x="34" y="43" width="52" height="2" fill={`url(#${goldId})`} />
          {/* Gopuram Tier 3 */}
          <path d="M35 45 L85 45 L90 60 L30 60 Z" fill={`url(#${terraId})`} />
          <circle cx="60" cy="52" r="3" fill={`url(#${goldId})`} />
          <rect x="28" y="59" width="64" height="2.5" fill={`url(#${goldId})`} />
          {/* Base Gateway Entrance with Towering Dravidian Doorway */}
          <rect x="28" y="61.5" width="64" height="25.5" fill={`url(#${terraId})`} />
          <path d="M48 87 V66 A12 12 0 0 1 72 66 V87 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="1.8" />
          {/* Carved Fluted Pillar Lines */}
          <line x1="38" y1="61.5" x2="38" y2="87" stroke={`url(#${goldId})`} strokeWidth="1.2" />
          <line x1="82" y1="61.5" x2="82" y2="87" stroke={`url(#${goldId})`} strokeWidth="1.2" />
        </g>
      )}
    </SharedFrame>
  );
}

// 24. Telangana — Iconic Charminar Monument & Qutb Shahi Arches
function TelanganaIcon() {
  return (
    <SharedFrame idPrefix="tg">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* 4 Fluted Minaret Domes at corners */}
          <polygon points="26,16 27.5,19 24.5,19" fill={`url(#${goldId})`} />
          <path d="M23 23 C23 18 29 18 29 23 Z" fill={`url(#${goldId})`} />
          <polygon points="94,16 95.5,19 92.5,19" fill={`url(#${goldId})`} />
          <path d="M91 23 C91 18 97 18 97 23 Z" fill={`url(#${goldId})`} />
          {/* Corner Minaret Towers */}
          <rect x="23" y="23" width="6" height="64" fill={`url(#${goldId})`} />
          <rect x="91" y="23" width="6" height="64" fill={`url(#${goldId})`} />
          {/* Minaret Balconies */}
          <rect x="21" y="42" width="10" height="2.5" fill={`url(#${terraId})`} />
          <rect x="89" y="42" width="10" height="2.5" fill={`url(#${terraId})`} />
          <rect x="21" y="60" width="10" height="2.5" fill={`url(#${terraId})`} />
          <rect x="89" y="60" width="10" height="2.5" fill={`url(#${terraId})`} />
          {/* Central Mosque Structure & Crown Balustrade */}
          <rect x="29" y="32" width="62" height="10" fill={`url(#${terraId})`} />
          <path d="M48 32 C48 26 72 26 72 32 Z" fill={`url(#${goldId})`} />
          <rect x="29" y="42" width="62" height="4" fill={`url(#${goldId})`} />
          {/* Main Monument Body with Four Grand Pointed Arches */}
          <rect x="29" y="46" width="62" height="41" fill={`url(#${terraId})`} />
          {/* Grand Central Qutb Shahi Pointed Arch */}
          <path d="M44 87 V66 C44 54 60 50 60 50 C60 50 76 54 76 66 V87 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="1.8" />
          {/* Upper Double-Deck Arched Windows */}
          <circle cx="60" cy="40" r="2.5" fill={`url(#${goldId})`} />
          <circle cx="45" cy="40" r="1.8" fill={`url(#${goldId})`} />
          <circle cx="75" cy="40" r="1.8" fill={`url(#${goldId})`} />
        </g>
      )}
    </SharedFrame>
  );
}

// 25. Tripura — Ujjayanta Palace & Neermahal Water Palace Pavilion
function TripuraIcon() {
  return (
    <SharedFrame idPrefix="tr">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Central Bulbous Palace Dome */}
          <polygon points="60,14 62,18 58,18" fill={`url(#${goldId})`} />
          <path d="M48 28 C48 18 72 18 72 28 Z" fill={`url(#${goldId})`} />
          <line x1="60" y1="18" x2="60" y2="28" stroke={`url(#${terraId})`} strokeWidth="0.8" />
          {/* Flanking Side Miniature Domes */}
          <path d="M34 32 C34 26 42 26 42 32 Z" fill={`url(#${goldId})`} />
          <path d="M78 32 C78 26 86 26 86 32 Z" fill={`url(#${goldId})`} />
          {/* Upper Palace Balustrade */}
          <rect x="30" y="32" width="60" height="4" fill={`url(#${terraId})`} stroke={`url(#${goldId})`} strokeWidth="1" />
          {/* Upper Floor Arched Colonnade */}
          <rect x="32" y="36" width="56" height="18" fill={`url(#${terraId})`} />
          <path d="M42 50 V42 A3 3 0 0 1 48 42 V50 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          <path d="M56 50 V40 A4 4 0 0 1 64 40 V50 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="1" />
          <path d="M72 50 V42 A3 3 0 0 1 78 42 V50 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          <rect x="28" y="54" width="64" height="3" fill={`url(#${goldId})`} />
          {/* Lower Water Palace Arched Arcade */}
          <rect x="28" y="57" width="64" height="22" fill={`url(#${terraId})`} />
          <path d="M50 79 V65 A10 10 0 0 1 70 65 V79 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="1.5" />
          <path d="M34 79 V68 A5 5 0 0 1 44 68 V79 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          <path d="M76 79 V68 A5 5 0 0 1 86 68 V79 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          {/* Rudrasagar Lake Water Ripple Lines */}
          <path d="M24 83 Q60 80 96 83" stroke={`url(#${goldId})`} strokeWidth="1.5" fill="none" />
          <path d="M28 87 Q60 84 92 87" stroke={`url(#${goldId})`} strokeWidth="1" fill="none" opacity="0.6" />
        </g>
      )}
    </SharedFrame>
  );
}

// 26. Uttar Pradesh — Taj Mahal Dome & Kashi Vishwanath Ganga Ghat Arches
function UttarPradeshIcon() {
  return (
    <SharedFrame idPrefix="up">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Corner Minarets */}
          <polygon points="26,20 27.5,23 24.5,23" fill={`url(#${goldId})`} />
          <rect x="24" y="23" width="4" height="64" fill={`url(#${goldId})`} />
          <polygon points="94,20 95.5,23 92.5,23" fill={`url(#${goldId})`} />
          <rect x="92" y="23" width="4" height="64" fill={`url(#${goldId})`} />
          {/* Central Lotus Finial */}
          <polygon points="60,11 61.5,15 58.5,15" fill={`url(#${goldId})`} />
          {/* Grand Central Onion Dome of the Taj Mahal */}
          <path d="M46 32 C42 22 54 16 60 16 C66 16 78 22 74 32 Z" fill={`url(#${goldId})`} />
          {/* Twin Side Chhatris */}
          <path d="M38 30 C38 24 44 24 44 30 Z" fill={`url(#${goldId})`} />
          <path d="M76 30 C76 24 82 24 82 30 Z" fill={`url(#${goldId})`} />
          <rect x="34" y="32" width="52" height="3" fill={`url(#${terraId})`} />
          {/* Monument Facade Body */}
          <rect x="34" y="35" width="52" height="42" fill={`url(#${terraId})`} />
          {/* Grand Central Iwan Archway */}
          <path d="M46 77 V50 C46 42 60 38 60 38 C60 38 74 42 74 50 V77 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="1.8" />
          {/* Side Arched Niches */}
          <path d="M36 54 V46 A3 3 0 0 1 42 46 V54 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          <path d="M36 72 V64 A3 3 0 0 1 42 64 V72 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          <path d="M78 54 V46 A3 3 0 0 1 84 46 V54 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          <path d="M78 72 V64 A3 3 0 0 1 84 64 V72 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          {/* Kashi Ganga Ghat Steps */}
          <rect x="28" y="77" width="64" height="3" fill={`url(#${goldId})`} />
          <path d="M26 83 Q60 80 94 83" stroke={`url(#${goldId})`} strokeWidth="1.2" fill="none" opacity="0.7" />
        </g>
      )}
    </SharedFrame>
  );
}

// 27. Uttarakhand — Sacred Kedarnath Himalayan Stone Shrine & Trishul
function UttarakhandIcon() {
  return (
    <SharedFrame idPrefix="uk">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* High Kedarnath Snow Peaks Backdrop */}
          <polygon points="16,87 42,32 64,66" fill="rgba(214, 120, 60, 0.22)" />
          <polygon points="50,87 78,26 104,87" fill="rgba(214, 120, 60, 0.25)" />
          <polygon points="42,32 48,42 36,42" fill={`url(#${goldId})`} opacity="0.8" />
          <polygon points="78,26 85,38 71,38" fill={`url(#${goldId})`} opacity="0.8" />
          {/* Sacred Trishul (Trident) at Side */}
          <line x1="88" y1="28" x2="88" y2="87" stroke={`url(#${goldId})`} strokeWidth="1.5" />
          <path d="M84 32 C84 36 92 36 92 32 M88 24 L88 36" stroke={`url(#${goldId})`} strokeWidth="1.5" strokeLinecap="round" />
          {/* Brass Kalash Pinnacle */}
          <polygon points="60,18 62,22 58,22" fill={`url(#${goldId})`} />
          <circle cx="60" cy="24" r="2.5" fill={`url(#${goldId})`} />
          {/* Heavy Stone Shikhara */}
          <path d="M52 26 L68 26 L71 42 L49 42 Z" fill={`url(#${terraId})`} />
          <line x1="60" y1="26" x2="60" y2="42" stroke={`url(#${goldId})`} strokeWidth="1" />
          <rect x="46" y="41" width="28" height="2" fill={`url(#${goldId})`} />
          {/* Gabled Stone Mandapa Roof */}
          <polygon points="60,43 82,56 38,56" fill={`url(#${goldId})`} />
          {/* Massive Ashlar Stone Wall Blocks */}
          <rect x="40" y="56" width="40" height="31" fill={`url(#${terraId})`} />
          <path d="M52 87 V71 A8 8 0 0 1 68 71 V87 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="1.5" />
          {/* Ancient Stone Carving Horizontal Band */}
          <line x1="40" y1="64" x2="80" y2="64" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          <line x1="40" y1="72" x2="80" y2="72" stroke={`url(#${goldId})`} strokeWidth="0.8" />
        </g>
      )}
    </SharedFrame>
  );
}

// 28. West Bengal — Bishnupur Terracotta Chala Temple & Howrah Bridge Cantilever
function WestBengalIcon() {
  return (
    <SharedFrame idPrefix="wb">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Traditional Bengali Curved Jor-Bangla / Chala Roof Finial */}
          <polygon points="60,16 62,20 58,20" fill={`url(#${goldId})`} />
          <ellipse cx="60" cy="22" rx="4" ry="1.8" fill={`url(#${goldId})`} />
          {/* Distinctive Curved Parapet (Chala arch) */}
          <path d="M38 34 C50 24 70 24 82 34 L80 40 C68 32 52 32 40 40 Z" fill={`url(#${goldId})`} />
          {/* Upper Terracotta Temple Storey */}
          <rect x="44" y="38" width="32" height="14" fill={`url(#${terraId})`} />
          <circle cx="60" cy="45" r="3" fill={`url(#${goldId})`} />
          {/* Lower Curved Cornice Band */}
          <path d="M32 52 C48 42 72 42 88 52 L86 56 C70 48 50 48 34 56 Z" fill={`url(#${goldId})`} />
          {/* Triple-Arched Terracotta Sanctum Facade */}
          <rect x="34" y="56" width="52" height="31" fill={`url(#${terraId})`} />
          {/* 3 Arched Entrances */}
          <path d="M54 87 V72 A6 6 0 0 1 66 72 V87 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="1.5" />
          <path d="M38 87 V76 A4 4 0 0 1 46 76 V87 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="1" />
          <path d="M74 87 V76 A4 4 0 0 1 82 76 V87 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="1" />
          {/* Terracotta Relief Panel Dots */}
          <circle cx="50" cy="64" r="1.2" fill={`url(#${goldId})`} />
          <circle cx="60" cy="64" r="1.2" fill={`url(#${goldId})`} />
          <circle cx="70" cy="64" r="1.2" fill={`url(#${goldId})`} />
        </g>
      )}
    </SharedFrame>
  );
}

// ══════════════════════════════════════════════════════════════════
// 8 UNION TERRITORIES — DISTINCT HISTORICAL & GEOGRAPHICAL SIGNATURES
// ══════════════════════════════════════════════════════════════════

// 29. Andaman and Nicobar Islands — Cellular Jail Central Watchtower & Ocean Palms
function AndamanNicobarIcon() {
  return (
    <SharedFrame idPrefix="an">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Cellular Jail Octagonal Watchtower Apex Lantern */}
          <polygon points="60,14 62,18 58,18" fill={`url(#${goldId})`} />
          <rect x="56" y="18" width="8" height="6" fill={`url(#${goldId})`} />
          {/* Watchtower Dome & Gallery Balcony */}
          <path d="M52 24 C52 18 68 18 68 24 Z" fill={`url(#${terraId})`} />
          <rect x="48" y="24" width="24" height="3" fill={`url(#${goldId})`} />
          {/* Historic Octagonal Brick Watchtower Body */}
          <path d="M52 27 L68 27 L71 62 L49 62 Z" fill={`url(#${terraId})`} />
          <line x1="60" y1="27" x2="60" y2="62" stroke={`url(#${goldId})`} strokeWidth="1" />
          <rect x="57" y="36" width="6" height="8" rx="1" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          <rect x="57" y="48" width="6" height="8" rx="1" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          {/* Radial Prison Wing Corridors spreading left & right */}
          <path d="M26 62 L49 62 L48 70 L26 70 Z" fill={`url(#${terraId})`} stroke={`url(#${goldId})`} strokeWidth="1" />
          <path d="M71 62 L94 62 L94 70 L72 70 Z" fill={`url(#${terraId})`} stroke={`url(#${goldId})`} strokeWidth="1" />
          {/* Tropical Island Palm Frond & Ocean Waves */}
          <path d="M22 87 Q26 66 36 54 M36 54 Q28 50 20 54 M36 54 Q32 46 26 44 M36 54 Q40 46 42 42" stroke={`url(#${goldId})`} strokeWidth="1.2" fill="none" opacity="0.7" />
          <path d="M26 80 Q60 76 94 80" stroke={`url(#${goldId})`} strokeWidth="1.8" fill="none" />
          <path d="M30 85 Q60 82 90 85" stroke={`url(#${goldId})`} strokeWidth="1.2" fill="none" opacity="0.6" />
        </g>
      )}
    </SharedFrame>
  );
}

// 30. Chandigarh — Le Corbusier's Open Hand Monument & Capitol Complex
function ChandigarhIcon() {
  return (
    <SharedFrame idPrefix="ch">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Shivalik Foothills line in background */}
          <path d="M20 52 Q40 44 60 48 T100 46 L100 87 L20 87 Z" fill="rgba(214, 120, 60, 0.2)" />
          {/* Le Corbusier's Open Hand Monument Silhouette */}
          {/* The soaring symbolic hand open to receive and give peace */}
          <path
            d="M58 14 C62 14 66 18 64 24 C68 22 72 24 74 30 C78 28 82 32 80 38 C80 44 74 48 68 50 L68 58 L54 58 L54 48 C48 46 42 40 44 32 C46 26 50 26 54 28 C52 20 54 14 58 14 Z"
            fill={`url(#${goldId})`}
            stroke={`url(#${terraId})`}
            strokeWidth="1.5"
          />
          {/* Rotating Bearing Column Base */}
          <rect x="57" y="58" width="6" height="14" fill={`url(#${terraId})`} stroke={`url(#${goldId})`} strokeWidth="1" />
          <circle cx="60" cy="58" r="4" fill={`url(#${goldId})`} />
          {/* Trench of Contemplation Modernist Pedestal */}
          <rect x="44" y="72" width="32" height="4" fill={`url(#${goldId})`} />
          <polygon points="40,87 80,87 76,76 44,76" fill={`url(#${terraId})`} stroke={`url(#${goldId})`} strokeWidth="1.2" />
          <line x1="60" y1="76" x2="60" y2="87" stroke={`url(#${goldId})`} strokeWidth="1" />
        </g>
      )}
    </SharedFrame>
  );
}

// 31. Dadra & Nagar Haveli and Daman & Diu — Moti Daman Portuguese Fort & Lighthouse
function DadraDamanIcon() {
  return (
    <SharedFrame idPrefix="dd">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Coastal Lighthouse Lantern & Beacon Beam */}
          <polygon points="60,14 62,17 58,17" fill={`url(#${goldId})`} />
          <path d="M54 22 C54 17 66 17 66 22 Z" fill={`url(#${terraId})`} />
          <circle cx="60" cy="25" r="3" fill={`url(#${goldId})`} />
          {/* Radiating Light Beams */}
          <line x1="52" y1="23" x2="36" y2="19" stroke={`url(#${goldId})`} strokeWidth="1.2" strokeDasharray="2 2" />
          <line x1="68" y1="23" x2="84" y2="19" stroke={`url(#${goldId})`} strokeWidth="1.2" strokeDasharray="2 2" />
          {/* Lighthouse Tapering Tower */}
          <rect x="52" y="27" width="16" height="3" fill={`url(#${goldId})`} />
          <path d="M53 30 L67 30 L70 66 L50 66 Z" fill={`url(#${goldId})`} stroke={`url(#${terraId})`} strokeWidth="1.2" />
          {/* Alternating Red/White Navigation Bands */}
          <rect x="52" y="38" width="16" height="6" fill={`url(#${terraId})`} />
          <rect x="51" y="52" width="18" height="6" fill={`url(#${terraId})`} />
          {/* Portuguese Sea Fort Bastion Ramparts */}
          <rect x="28" y="66" width="64" height="15" fill={`url(#${terraId})`} />
          {/* Cannon Embrasure Openings */}
          <rect x="36" y="69" width="6" height="6" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          <rect x="78" y="69" width="6" height="6" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          {/* Arabian Sea Coastal Swell */}
          <path d="M24 84 Q60 80 96 84" stroke={`url(#${goldId})`} strokeWidth="1.5" fill="none" />
        </g>
      )}
    </SharedFrame>
  );
}

// 32. Delhi — India Gate Triumphal Arch & Red Fort Chhatris
function DelhiIcon() {
  return (
    <SharedFrame idPrefix="dl">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Imperial Cornice Attic Tier */}
          <rect x="42" y="20" width="36" height="4" fill={`url(#${goldId})`} />
          <rect x="46" y="16" width="28" height="4" fill={`url(#${terraId})`} />
          <circle cx="60" cy="18" r="2" fill={`url(#${goldId})`} />
          {/* Upper Stepped Entablature */}
          <rect x="38" y="24" width="44" height="6" fill={`url(#${terraId})`} />
          <line x1="38" y1="27" x2="82" y2="27" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          <rect x="36" y="30" width="48" height="3" fill={`url(#${goldId})`} />
          {/* Monumental Pylons (Left & Right) */}
          <rect x="36" y="33" width="48" height="54" fill={`url(#${terraId})`} />
          {/* Soaring Grand Triumphal Archway (India Gate Arch) */}
          <path d="M48 87 V52 C48 40 72 40 72 52 V87 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="2" />
          {/* Transverse Side Arches */}
          <path d="M38 72 V62 A3 3 0 0 1 44 62 V72 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          <path d="M76 72 V62 A3 3 0 0 1 82 62 V72 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          {/* Amar Jawan Jyoti Eternal Flame Pedestal */}
          <ellipse cx="60" cy="83" rx="5" ry="1.5" fill={`url(#${goldId})`} />
          <path d="M60 74 C58 77 58 80 60 82 C62 80 62 77 60 74 Z" fill="#fff5b8" />
        </g>
      )}
    </SharedFrame>
  );
}

// 33. Jammu and Kashmir — Traditional Kashmiri Shikara & Chinar Leaf
function JammuKashmirIcon() {
  return (
    <SharedFrame idPrefix="jk">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Snow-Covered Pir Panjal Mountain Peaks */}
          <polygon points="16,87 40,36 60,64" fill="rgba(214, 120, 60, 0.22)" />
          <polygon points="48,87 76,28 104,87" fill="rgba(214, 120, 60, 0.25)" />
          <polygon points="40,36 46,46 34,46" fill={`url(#${goldId})`} opacity="0.8" />
          <polygon points="76,28 83,40 69,40" fill={`url(#${goldId})`} opacity="0.8" />
          {/* Iconic Five-Pointed Kashmiri Chinar Leaf */}
          <path
            d="M60 26 C57 20 63 20 60 26 M60 26 C54 28 50 24 53 32 C46 32 46 38 52 40 C48 46 54 48 57 44 C56 50 64 50 63 44 C66 48 72 46 68 40 C74 38 74 32 67 32 C70 24 66 28 60 26 Z"
            fill={`url(#${goldId})`}
            stroke={`url(#${terraId})`}
            strokeWidth="1"
          />
          <line x1="60" y1="32" x2="60" y2="48" stroke={`url(#${terraId})`} strokeWidth="1" />
          {/* Traditional Kashmiri Shikara Boat on Dal Lake */}
          {/* Arched Draped Canopy Roof */}
          <path d="M38 56 Q60 50 82 56 L80 66 L40 66 Z" fill={`url(#${terraId})`} stroke={`url(#${goldId})`} strokeWidth="1.2" />
          <path d="M46 56 V66 M54 55 V66 M66 55 V66 M74 56 V66" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          {/* Pointed Prow of the Wooden Shikara */}
          <path d="M18 68 C34 76 86 76 102 68 L98 72 C80 80 40 80 22 72 Z" fill={`url(#${goldId})`} />
          <path d="M18 68 L14 62" stroke={`url(#${goldId})`} strokeWidth="2" strokeLinecap="round" />
          {/* Dal Lake Water Ripples */}
          <path d="M26 82 Q60 78 94 82" stroke={`url(#${goldId})`} strokeWidth="1.5" fill="none" />
          <path d="M32 86 Q60 84 88 86" stroke={`url(#${goldId})`} strokeWidth="1" fill="none" opacity="0.6" />
        </g>
      )}
    </SharedFrame>
  );
}

// 34. Ladakh — Thiksey Gompa Tiered Monastery & Buddhist Chorten Stupa
function LadakhIcon() {
  return (
    <SharedFrame idPrefix="la">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* High Altitude Ladakh Ridge Profile */}
          <polygon points="16,87 48,34 78,64" fill="rgba(214, 120, 60, 0.22)" />
          <polygon points="56,87 84,28 104,87" fill="rgba(214, 120, 60, 0.25)" />
          {/* Sacred Buddhist Chorten (Stupa) on Left */}
          <polygon points="34,26 35.5,29 32.5,29" fill={`url(#${goldId})`} />
          <circle cx="34" cy="31" r="2" fill={`url(#${goldId})`} />
          {/* 13 Rings of Enlightenment */}
          <path d="M31 34 L37 34 L38 42 L30 42 Z" fill={`url(#${goldId})`} />
          {/* Bumpa (Rounded Vase) */}
          <ellipse cx="34" cy="46" rx="6" ry="4.5" fill={`url(#${terraId})`} stroke={`url(#${goldId})`} strokeWidth="1" />
          <rect x="26" y="50" width="16" height="5" fill={`url(#${goldId})`} />
          <rect x="24" y="55" width="20" height="32" fill={`url(#${terraId})`} />
          {/* Thiksey Monastery Multi-Tiered Whitewashed Red & Gold Gompa on Right */}
          <rect x="52" y="36" width="34" height="9" fill={`url(#${goldId})`} />
          <rect x="56" y="38" width="6" height="5" fill="#381306" />
          <rect x="66" y="38" width="6" height="5" fill="#381306" />
          <rect x="76" y="38" width="6" height="5" fill="#381306" />
          {/* Tier 2 */}
          <rect x="48" y="47" width="42" height="11" fill={`url(#${terraId})`} />
          <rect x="54" y="49" width="6" height="6" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          <rect x="66" y="49" width="6" height="6" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          <rect x="78" y="49" width="6" height="6" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="0.8" />
          {/* Tier 3 — Base Gompa Blocks */}
          <rect x="46" y="60" width="48" height="27" fill={`url(#${terraId})`} />
          <line x1="46" y1="72" x2="94" y2="72" stroke={`url(#${goldId})`} strokeWidth="1" />
        </g>
      )}
    </SharedFrame>
  );
}

// 35. Lakshadweep — Coral Atoll Lagoon, Twin Coconut Palms & Outrigger Boat
function LakshadweepIcon() {
  return (
    <SharedFrame idPrefix="ld">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Tropical Sun in Atoll Sky */}
          <circle cx="60" cy="24" r="10" fill={`url(#${goldId})`} />
          {/* Twin Curving Coconut Palm Trees */}
          {/* Left Palm */}
          <path d="M30 87 Q42 54 48 34" stroke={`url(#${terraId})`} strokeWidth="3" fill="none" />
          <path d="M48 34 Q34 30 24 38 M48 34 Q38 24 28 26 M48 34 Q48 22 42 16 M48 34 Q56 22 62 20 M48 34 Q58 32 64 36" stroke={`url(#${goldId})`} strokeWidth="1.8" fill="none" />
          {/* Right Palm */}
          <path d="M90 87 Q78 54 72 34" stroke={`url(#${terraId})`} strokeWidth="3" fill="none" />
          <path d="M72 34 Q86 30 96 38 M72 34 Q82 24 92 26 M72 34 Q72 22 78 16 M72 34 Q64 22 58 20 M72 34 Q62 32 56 36" stroke={`url(#${goldId})`} strokeWidth="1.8" fill="none" />
          {/* Traditional Lakshadweep Outrigger Sailing Boat (Odum) */}
          <polygon points="60,42 60,66 74,66" fill={`url(#${goldId})`} />
          <line x1="60" y1="40" x2="60" y2="68" stroke={`url(#${terraId})`} strokeWidth="1.8" />
          <path d="M48 68 C54 72 74 72 80 68 Z" fill={`url(#${terraId})`} stroke={`url(#${goldId})`} strokeWidth="1" />
          {/* Coral Lagoon Turquoise Ocean Waves */}
          <path d="M22 78 Q42 74 60 78 T98 78" stroke={`url(#${goldId})`} strokeWidth="1.8" fill="none" />
          <path d="M26 84 Q44 80 60 84 T94 84" stroke={`url(#${goldId})`} strokeWidth="1.2" fill="none" opacity="0.6" />
        </g>
      )}
    </SharedFrame>
  );
}

// 36. Puducherry — French Colonial Quarter Arched Louvers & Promenade Lighthouse
function PuducherryIcon() {
  return (
    <SharedFrame idPrefix="py">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Historic Promenade Beach Vintage Lighthouse on Left */}
          <polygon points="34,14 36,18 32,18" fill={`url(#${goldId})`} />
          <path d="M30 24 C30 18 38 18 38 24 Z" fill={`url(#${terraId})`} />
          <circle cx="34" cy="27" r="2.5" fill={`url(#${goldId})`} />
          <rect x="29" y="30" width="10" height="3" fill={`url(#${goldId})`} />
          <path d="M30 33 L38 33 L40 68 L28 68 Z" fill={`url(#${goldId})`} stroke={`url(#${terraId})`} strokeWidth="1" />
          <rect x="29" y="44" width="10" height="5" fill={`url(#${terraId})`} />
          {/* French Colonial Quarter Classical Pediment & Facade on Right */}
          <polygon points="68,22 88,22 78,14" fill={`url(#${goldId})`} />
          <rect x="52" y="22" width="44" height="4" fill={`url(#${terraId})`} />
          <rect x="54" y="26" width="40" height="20" fill={`url(#${terraId})`} />
          {/* Arched French Louvered Windows */}
          <path d="M60 42 V33 A4 4 0 0 1 68 33 V42 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="1" />
          <path d="M76 42 V33 A4 4 0 0 1 84 33 V42 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="1" />
          <rect x="50" y="46" width="48" height="3" fill={`url(#${goldId})`} />
          {/* Ground Floor Arched Portals */}
          <rect x="50" y="49" width="48" height="38" fill={`url(#${terraId})`} />
          <path d="M64 87 V66 A10 10 0 0 1 84 66 V87 Z" fill="#381306" stroke={`url(#${goldId})`} strokeWidth="1.5" />
          {/* Sacred Lotus / Matrimandir Floral Motif */}
          <ellipse cx="74" cy="58" rx="4" ry="2" fill={`url(#${goldId})`} />
        </g>
      )}
    </SharedFrame>
  );
}

// ══════════════════════════════════════════════════════════════════
// DEFAULT SACRED MANDIR EMBLEM (Fallback for any generic view)
// ══════════════════════════════════════════════════════════════════
export function DefaultTempleIcon() {
  return (
    <SharedFrame idPrefix="def">
      {({ goldId, terraId, flagId }) => (
        <g>
          {/* Sacred Dhwaja Flag */}
          <line x1="60" y1="6" x2="60" y2="15" stroke="#b65022" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M60 7 C67 5.5 73 9.5 78 7.5 C74 12 67 11 60 13.5 Z" fill={`url(#${flagId})`} />
          {/* Kalash Pinnacle */}
          <polygon points="60,11 61.5,13.5 60,14.5 58.5,13.5" fill={`url(#${goldId})`} />
          <path d="M57.5 15.5 C57.5 14 62.5 14 62.5 15.5 C63.5 17.5 61.5 19 60 19 C58.5 19 56.5 17.5 57.5 15.5 Z" fill={`url(#${goldId})`} />
          {/* Amalaka Disc */}
          <ellipse cx="60" cy="20" rx="6.5" ry="1.8" fill={`url(#${terraId})`} />
          <ellipse cx="60" cy="19.5" rx="5" ry="1.2" fill={`url(#${goldId})`} />
          {/* Tier 1 Shikhara */}
          <polygon points="57,21 63,21 64.5,29 55.5,29" fill={`url(#${terraId})`} />
          <rect x="54" y="28.5" width="12" height="2" rx="0.5" fill={`url(#${goldId})`} />
          {/* Tier 2 Shikhara */}
          <polygon points="55,30.5 65,30.5 68,41 52,41" fill={`url(#${terraId})`} />
          <path d="M58 35 C58 33 62 33 62 35 L62 38 L58 38 Z" fill={`url(#${goldId})`} />
          <rect x="50" y="40.5" width="20" height="2.5" rx="0.5" fill={`url(#${goldId})`} />
          {/* Tier 3 Shikhara */}
          <polygon points="51.5,43 68.5,43 72.5,55 47.5,55" fill={`url(#${terraId})`} />
          <path d="M57.5 46.5 C57.5 44.5 62.5 44.5 62.5 46.5 L62.5 51 L57.5 51 Z" fill={`url(#${goldId})`} />
          {/* Cornice Overhang */}
          <path d="M33 55 L87 55 L89 58.5 L31 58.5 Z" fill={`url(#${terraId})`} />
          <rect x="30" y="58" width="60" height="1.5" fill={`url(#${goldId})`} />
          {/* Sanctum Chamber */}
          <rect x="51" y="62" width="18" height="25" fill="#381306" />
          <path d="M51.5 87 L51.5 71 C51.5 63 68.5 63 68.5 71 L68.5 87" stroke={`url(#${goldId})`} strokeWidth="1.5" fill="none" />
          {/* Diya Flame */}
          <ellipse cx="60" cy="83.5" rx="4" ry="1.5" fill={`url(#${goldId})`} />
          <path d="M60 74 C58 77 58 80 60 82 C62 80 62 77 60 74 Z" fill="#fff5b8" />
          {/* Outer & Inner Pillars */}
          <rect x="37" y="62" width="4" height="25" fill={`url(#${terraId})`} />
          <rect x="79" y="62" width="4" height="25" fill={`url(#${terraId})`} />
        </g>
      )}
    </SharedFrame>
  );
}

// ══════════════════════════════════════════════════════════════════
// MAPPER DICTIONARY FOR ALL 28 STATES & 8 UTs (WITH NORMALIZATION)
// ══════════════════════════════════════════════════════════════════
const EMBLEM_MAP = {
  // 28 States
  'andhra pradesh': AndhraPradeshIcon,
  'arunachal pradesh': ArunachalPradeshIcon,
  'assam': AssamIcon,
  'bihar': BiharIcon,
  'chhattisgarh': ChhattisgarhIcon,
  'goa': GoaIcon,
  'gujarat': GujaratIcon,
  'haryana': HaryanaIcon,
  'himachal pradesh': HimachalPradeshIcon,
  'jharkhand': JharkhandIcon,
  'karnataka': KarnatakaIcon,
  'kerala': KeralaIcon,
  'madhya pradesh': MadhyaPradeshIcon,
  'maharashtra': MaharashtraIcon,
  'manipur': ManipurIcon,
  'meghalaya': MeghalayaIcon,
  'mizoram': MizoramIcon,
  'nagaland': NagalandIcon,
  'odisha': OdishaIcon,
  'orissa': OdishaIcon,
  'punjab': PunjabIcon,
  'rajasthan': RajasthanIcon,
  'sikkim': SikkimIcon,
  'tamil nadu': TamilNaduIcon,
  'telangana': TelanganaIcon,
  'tripura': TripuraIcon,
  'uttar pradesh': UttarPradeshIcon,
  'uttarakhand': UttarakhandIcon,
  'uttaranchal': UttarakhandIcon,
  'west bengal': WestBengalIcon,

  // 8 Union Territories
  'andaman and nicobar islands': AndamanNicobarIcon,
  'andaman & nicobar islands': AndamanNicobarIcon,
  'andaman and nicobar': AndamanNicobarIcon,
  'andaman & nicobar': AndamanNicobarIcon,
  'chandigarh': ChandigarhIcon,
  'dadra and nagar haveli and daman and diu': DadraDamanIcon,
  'dadra & nagar haveli and daman & diu': DadraDamanIcon,
  'dadra and nagar haveli': DadraDamanIcon,
  'daman and diu': DadraDamanIcon,
  'delhi': DelhiIcon,
  'nct of delhi': DelhiIcon,
  'national capital territory of delhi': DelhiIcon,
  'jammu and kashmir': JammuKashmirIcon,
  'jammu & kashmir': JammuKashmirIcon,
  'ladakh': LadakhIcon,
  'lakshadweep': LakshadweepIcon,
  'puducherry': PuducherryIcon,
  'pondicherry': PuducherryIcon,
};

/**
 * StateEmblemIcon component
 * @param {string} stateName - The name of the Indian State or Union Territory
 * @returns React SVG Component representing the distinct regional cultural icon
 */
export default function StateEmblemIcon({ stateName }) {
  if (!stateName) return <DefaultTempleIcon />;

  const key = String(stateName).trim().toLowerCase();
  const IconComponent = EMBLEM_MAP[key] || DefaultTempleIcon;

  return <IconComponent />;
}

// Export individual icons for standalone usage if needed
export {
  AndhraPradeshIcon,
  ArunachalPradeshIcon,
  AssamIcon,
  BiharIcon,
  ChhattisgarhIcon,
  GoaIcon,
  GujaratIcon,
  HaryanaIcon,
  HimachalPradeshIcon,
  JharkhandIcon,
  KarnatakaIcon,
  KeralaIcon,
  MadhyaPradeshIcon,
  MaharashtraIcon,
  ManipurIcon,
  MeghalayaIcon,
  MizoramIcon,
  NagalandIcon,
  OdishaIcon,
  PunjabIcon,
  RajasthanIcon,
  SikkimIcon,
  TamilNaduIcon,
  TelanganaIcon,
  TripuraIcon,
  UttarPradeshIcon,
  UttarakhandIcon,
  WestBengalIcon,
  AndamanNicobarIcon,
  ChandigarhIcon,
  DadraDamanIcon,
  DelhiIcon,
  JammuKashmirIcon,
  LadakhIcon,
  LakshadweepIcon,
  PuducherryIcon,
};
