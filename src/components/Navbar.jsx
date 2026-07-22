import React, { useState, useEffect } from 'react';
import { Heart, Menu, X } from 'lucide-react';

export default function Navbar({ onOpenRSVP }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Schedule', href: '#schedule' },
    { name: 'Details', href: '#details' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Gifts', href: '#gifts' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo / Brand */}
        <a href="#" className="navbar-brand" aria-label="Mark and Glenda Home">
          <span className="brand-letter">M</span>
          <Heart className="brand-heart-icon" size={18} fill="currentColor" />
          <span className="brand-letter">G</span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="navbar-desktop-nav" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="nav-link"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="navbar-cta-wrapper">
          <button
            type="button"
            className="btn-rsvp-primary"
            onClick={onOpenRSVP}
          >
            RSVP
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer glass-card">
          <nav className="mobile-nav-links">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="mobile-nav-link"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}
            <button
              type="button"
              className="btn-rsvp-primary mobile-rsvp-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenRSVP) onOpenRSVP();
              }}
            >
              RSVP
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
