import React from 'react';
import { Heart, Lock, Calendar, MapPin } from 'lucide-react';

export default function Footer({ onOpenRSVP, onOpenAdmin }) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="wedding-footer">
      <div className="footer-container">
        {/* Top Decorative Brand */}
        <div className="footer-brand">
          <h2 className="footer-title font-serif">Mark & Glenda</h2>
          <div className="footer-meta">
            <span className="meta-item">
              <Calendar size={14} className="meta-icon" />
              December 14, 2026
            </span>
            <span className="meta-dot">•</span>
            <span className="meta-item">
              <MapPin size={14} className="meta-icon" />
              Quezon City, Philippines
            </span>
          </div>
        </div>

        <div className="footer-divider"></div>

        {/* Quick Links Nav */}
        <div className="footer-nav">
          <a href="#schedule" onClick={(e) => handleNavClick(e, '#schedule')} className="footer-link">
            Schedule
          </a>
          <a href="#details" onClick={(e) => handleNavClick(e, '#details')} className="footer-link">
            Details
          </a>
          <a href="#gallery" onClick={(e) => handleNavClick(e, '#gallery')} className="footer-link">
            Gallery
          </a>
          <a href="#gifts" onClick={(e) => handleNavClick(e, '#gifts')} className="footer-link">
            Wishing Well
          </a>
          <a href="#faq" onClick={(e) => handleNavClick(e, '#faq')} className="footer-link">
            FAQ
          </a>
          <button type="button" onClick={onOpenRSVP} className="footer-rsvp-btn">
            RSVP
          </button>
        </div>

        {/* Bottom copyright & Discreet Host Login */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            <span>© {currentYear} Mark & Glenda.</span>
            <span className="copyright-love">
              Made with <Heart size={14} className="heart-inline" fill="currentColor" /> for our special day.
            </span>
          </p>

          {/* Discreet Host Login link */}
          <button
            type="button"
            className="discreet-host-login-btn"
            onClick={onOpenAdmin}
            aria-label="Host Admin Login"
          >
            <Lock size={12} className="lock-icon-subtle" />
            <span>Host Login</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
