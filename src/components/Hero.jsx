import React from 'react';
import { Calendar, MapPin, Sparkles } from 'lucide-react';
import Countdown from './Countdown';

export default function Hero({ onOpenRSVP }) {
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
            <span>December 14, 2026</span>
          </div>
          <div className="meta-divider">•</div>
          <div className="meta-pill">
            <MapPin size={16} className="pill-icon" />
            <span>Quezon City, Philippines</span>
          </div>
        </div>

        {/* Countdown Timer Embed */}
        <div className="hero-countdown-wrapper">
          <Countdown />
        </div>

        {/* Action Button */}
        <div className="hero-cta-wrapper">
          <button
            type="button"
            className="btn-hero-primary"
            onClick={onOpenRSVP}
          >
            RSVP Now
          </button>
        </div>
      </div>
    </section>
  );
}
