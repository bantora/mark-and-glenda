import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Schedule from './components/Schedule';
import WishingWell from './components/WishingWell';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import RSVPModal from './components/RSVPModal';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleOpenRSVP = () => setIsRSVPOpen(true);
  const handleCloseRSVP = () => setIsRSVPOpen(false);

  const handleOpenAdmin = () => setIsAdminOpen(true);
  const handleCloseAdmin = () => setIsAdminOpen(false);

  return (
    <div className="wedding-app">
      {/* Site-Wide Fixed Background Image */}
      <div className="site-global-bg-wrapper">
        <img
          src="/photos/XH1S0470.jpg"
          alt="Mark & Glenda Wedding Background"
          className="site-global-bg-img"
        />
        <div className="site-global-bg-overlay"></div>
      </div>

      {/* Fixed Header / Navigation */}
      <Navbar onOpenRSVP={handleOpenRSVP} />

      {/* Main Page Content */}
      <main className="main-content">
        <Hero />
        <Schedule />
        <WishingWell />
        <FAQ onOpenRSVP={handleOpenRSVP} />
      </main>

      {/* Footer with Discreet Host Login link */}
      <Footer
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Modals & Overlays */}
      <RSVPModal
        isOpen={isRSVPOpen}
        onClose={handleCloseRSVP}
      />

      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={handleCloseAdmin}
      />
    </div>
  );
}
