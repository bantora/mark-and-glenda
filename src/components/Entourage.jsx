import React, { useState } from 'react';
import { Eye, Maximize2, X } from 'lucide-react';

export default function Entourage() {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <>
      <section id="entourage" className="entourage-section">
        {/* Section Header */}
        <div className="section-header">
          <p className="section-subtitle">The Wedding Party</p>
          <h2 className="section-title font-serif">Bridal Entourage</h2>
          <div className="section-divider"></div>

          <div className="entourage-invite-btn-wrapper">
            <button
              type="button"
              className="btn-view-invite btn-entourage-card-link"
              onClick={() =>
                setActiveImage({
                  src: '/photos/bridal-entourage.jpg',
                  title: 'Bridal Entourage Invitation Card'
                })
              }
              aria-label="View original Bridal Entourage invitation card"
            >
              <Eye size={16} />
              <span>View Original Card</span>
              <Maximize2 size={14} />
            </button>
          </div>
        </div>

        {/* Entourage Text Arrangement Board */}
        <div className="entourage-board-wrapper">
          <div className="entourage-board">
            <div className="entourage-board-content">
              {/* Main Card Title */}
              <h3 className="entourage-main-title">BRIDAL ENTOURAGE</h3>

              {/* Parents Section */}
              <div className="entourage-row entourage-two-col entourage-parents-row">
                <div className="entourage-col">
                  <h4 className="entourage-role-title">Parents of the Groom</h4>
                  <p className="entourage-person-name">POLDENCIO ROMANO</p>
                  <p className="entourage-person-name">LILIA ROMERO</p>
                </div>
                <div className="entourage-col">
                  <h4 className="entourage-role-title">Parents of the Bride</h4>
                  <p className="entourage-person-name">GREGORIO GENDRANO</p>
                  <p className="entourage-person-name">JOSEPHINE GENDRANO</p>
                </div>
              </div>

              {/* Principal Sponsors Section */}
              <div className="entourage-section-block">
                <h4 className="entourage-category-title">PRINCIPAL SPONSORS</h4>
                <div className="entourage-row entourage-two-col sponsors-grid">
                  <div className="entourage-col">
                    <p className="entourage-person-name">BETTY OLIVEROS GENDRANO</p>
                    <p className="entourage-person-name">HAYDEE SARMIENTO</p>
                    <p className="entourage-person-name">SALLY DIANCO</p>
                    <p className="entourage-person-name">GRACIELA GONZALES</p>
                    <p className="entourage-person-name">PIMENTEL, ANNALEEN</p>
                  </div>
                  <div className="entourage-col">
                    <p className="entourage-person-name">GOMERCINDO GENDRANO</p>
                    <p className="entourage-person-name">SINFOROSO SARMIENTO</p>
                    <p className="entourage-person-name">RENE DIANCO</p>
                    <p className="entourage-person-name">LELET QUIAMBAO</p>
                    <p className="entourage-person-name">PIMENTEL, NOEL</p>
                  </div>
                </div>
              </div>

              {/* Best Man & Maid of Honor Section */}
              <div className="entourage-row entourage-two-col entourage-honor-row">
                <div className="entourage-col">
                  <h4 className="entourage-role-title">Best Man</h4>
                  <p className="entourage-person-name">MARK LESTER MORALES</p>
                </div>
                <div className="entourage-col">
                  <h4 className="entourage-role-title">Maid of Honor</h4>
                  <p className="entourage-person-name">GEMMALYN ROMANO</p>
                </div>
              </div>

              {/* Secondary Sponsors Section */}
              <div className="entourage-section-block">
                <h4 className="entourage-category-title">SECONDARY SPONSORS</h4>

                <div className="entourage-secondary-staggered-grid">
                  {/* Top Row: Candle, Veil, Cord */}
                  <div className="entourage-secondary-item candle-item">
                    <h5 className="entourage-role-title">Candle</h5>
                    <p className="entourage-person-name">ISAGANI GALMAN</p>
                    <p className="entourage-person-name">ANNA MAE CHICOTE</p>
                  </div>

                  <div className="entourage-secondary-item veil-item">
                    <h5 className="entourage-role-title">Veil</h5>
                    <p className="entourage-person-name">RECHLARD GENER</p>
                    <p className="entourage-person-name">FELIZA PINEDA</p>
                  </div>

                  <div className="entourage-secondary-item cord-item">
                    <h5 className="entourage-role-title">Cord</h5>
                    <p className="entourage-person-name">SHA QUIAMBAO</p>
                    <p className="entourage-person-name">ROSALIN FRIAS</p>
                  </div>

                  {/* Bottom Row: Coin, Ring, Bible */}
                  <div className="entourage-secondary-item coin-item">
                    <h5 className="entourage-role-title">Coin</h5>
                    <p className="entourage-person-name">KIO ZAYNE SAGSAGAT</p>
                  </div>

                  <div className="entourage-secondary-item ring-item">
                    <h5 className="entourage-role-title">Ring</h5>
                    <p className="entourage-person-name">GAVIN GALMAN</p>
                  </div>

                  <div className="entourage-secondary-item bible-item">
                    <h5 className="entourage-role-title">Bible</h5>
                    <p className="entourage-person-name">LESTER GIDEON MORALES</p>
                  </div>
                </div>
              </div>

              {/* Groomsmen & Bridesmaids Section */}
              <div className="entourage-row entourage-two-col entourage-party-row">
                <div className="entourage-col">
                  <h4 className="entourage-role-title">Groomsmen</h4>
                  <p className="entourage-person-name">ISAGANI GALMAN</p>
                  <p className="entourage-person-name">RECHLARD GENER</p>
                  <p className="entourage-person-name">SHA QUIAMBAO</p>
                  <p className="entourage-person-name">RYAN JOSON</p>
                  <p className="entourage-person-name">RICO CAÑETE</p>
                </div>
                <div className="entourage-col">
                  <h4 className="entourage-role-title">Bridesmaids</h4>
                  <p className="entourage-person-name">ANNA MAE CHICOTE</p>
                  <p className="entourage-person-name">FELIZA PINEDA</p>
                  <p className="entourage-person-name">ROSALIN FRIAS</p>
                  <p className="entourage-person-name">KARISSA ANN MANALOTO</p>
                  <p className="entourage-person-name">MARLEEN RACHELLE FLORES</p>
                </div>
              </div>

              {/* Flower Girls & Banner Section */}
              <div className="entourage-row entourage-two-col entourage-attendants-row">
                <div className="entourage-col">
                  <h4 className="entourage-role-title">Flower Girls</h4>
                  <p className="entourage-person-name">MALLORY GRAZEN ROMANO</p>
                  <p className="entourage-person-name">MIKAYLA GIANNA ROMANO</p>
                </div>
                <div className="entourage-col">
                  <h4 className="entourage-role-title">Banner</h4>
                  <p className="entourage-person-name">ANELKA DE MESA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className="lightbox-modal-overlay" onClick={() => setActiveImage(null)}>
          <div className="lightbox-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close-btn"
              onClick={() => setActiveImage(null)}
              aria-label="Close Lightbox"
            >
              <X size={20} />
            </button>
            <img src={activeImage.src} alt={activeImage.title} className="lightbox-img" />
            <p className="lightbox-caption font-serif">{activeImage.title}</p>
          </div>
        </div>
      )}
    </>
  );
}
