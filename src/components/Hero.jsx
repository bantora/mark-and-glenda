import React from 'react';
import { Calendar, MapPin, Sparkles } from 'lucide-react';
import Countdown from './Countdown';

export default function Hero() {
  return (
    <section className="hero-section" id="hero">


      <div className="hero-background-decor">
        <div className="decor-blob blob-1"></div>
        <div className="decor-blob blob-2"></div>
      </div>

      <div className="hero-content">
        {/* Top Tagline Badge */}
        <div className="hero-badge">
          <Sparkles size={14} className="badge-icon" />
          <span>Invite You To Join Our Wedding</span>
          <Sparkles size={14} className="badge-icon" />
        </div>

        {/* Main Title */}
        <h1 className="hero-title font-serif">
          Mark <span className="ampersand">&</span> Glenda
        </h1>

        {/* Date & Location Pills */}
        <div className="hero-meta">
          <div className="meta-pill">
            <Calendar size={16} className="pill-icon" />
            <span>Monday, December 14, 2026</span>
          </div>
          <div className="meta-divider">•</div>
          <div className="meta-pill">
            <MapPin size={16} className="pill-icon" />
            <span>Quezon City, Philippines</span>
          </div>
        </div>

        {/* Featured Home Page Couple Portrait Window */}
        <div className="hero-portrait-container">
          <div className="hero-portrait-frame">
            <img
              src="/photos/XH1S0300.jpg"
              alt="Mark & Glenda Engagement Portrait"
              className="hero-portrait-img"
            />
          </div>
        </div>

        {/* Overlapping Countdown Timer Embed */}
        <div className="hero-countdown-wrapper">
          <Countdown />
        </div>
      </div>
    </section>
  );
}
