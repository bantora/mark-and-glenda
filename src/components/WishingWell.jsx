import React from 'react';
import { Gift, Heart } from 'lucide-react';

export default function WishingWell() {
  return (
    <section id="gifts" className="wishing-well-section">
      <div className="section-header">
        <p className="section-subtitle">Gift Registry</p>
        <h2 className="section-title font-serif">Wishing Well</h2>
        <div className="section-divider"></div>
      </div>

      <div className="wishing-well-container">
        <div className="glass-card wishing-well-card">
          <div className="wishing-well-icon-wrapper">
            <Gift size={36} className="wishing-well-icon" />
          </div>

          <p className="wishing-well-quote font-serif">
            "The best gift is celebrating with you. If you wish to honor us with something more, monetary contributions toward our future together would be greatly appreciated."
          </p>

          <div className="wishing-well-signature">
            <Heart size={16} className="signature-heart-icon" />
            <span>With Love, Mark & Glenda</span>
          </div>
        </div>
      </div>
    </section>
  );
}
