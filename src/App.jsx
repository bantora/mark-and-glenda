import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Schedule from './components/Schedule';
import Gallery from './components/Gallery';
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
      {/* Fixed Header / Navigation */}
      <Navbar onOpenRSVP={handleOpenRSVP} />

      {/* Main Page Content */}
      <main className="main-content">
        <Hero onOpenRSVP={handleOpenRSVP} />
        <Schedule />
        <Gallery />
        <WishingWell />
        <FAQ />
      </main>

      {/* Footer with Discreet Host Login link */}
      <Footer
        onOpenRSVP={handleOpenRSVP}
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
