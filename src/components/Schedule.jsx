import React from 'react';
import { Church, UtensilsCrossed, Clock, MapPin, ExternalLink, Shirt, Car } from 'lucide-react';

export default function Schedule() {
  const ceremonyMapsUrl = "https://maps.google.com/?q=Minor+Basilica+of+the+National+Shrine+of+Our+Lady+of+Mt.+Carmel+Quezon+City";
  const receptionMapsUrl = "https://maps.google.com/?q=Oasis+Manila+Aurora+Blvd+Quezon+City";

  return (
    <>
      {/* Schedule Section */}
      <section id="schedule" className="schedule-section">
        <div className="section-header">
          <p className="section-subtitle">When & Where</p>
          <h2 className="section-title font-serif">Event Schedule</h2>
          <div className="section-divider"></div>
        </div>

        <div className="schedule-grid">
          {/* Ceremony Card */}
          <div className="glass-card schedule-card">
            <div className="card-icon-wrapper ceremony-icon">
              <Church size={32} />
            </div>
            <h3 className="card-title font-serif">Wedding Ceremony</h3>
            
            <div className="card-time-badge">
              <Clock size={16} />
              <span>Guest Arrival 1:00 PM | Ceremony 1:30 PM</span>
            </div>

            <div className="card-location">
              <MapPin size={18} style={{ flexShrink: 0, marginTop: '3px' }} />
              <span>Minor Basilica of the National Shrine of Our Lady of Mt. Carmel</span>
            </div>

            <a
              href={ceremonyMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-map-link"
              aria-label="Google Maps directions for Ceremony"
            >
              <span>Google Maps</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Reception Card */}
          <div className="glass-card schedule-card">
            <div className="card-icon-wrapper reception-icon">
              <UtensilsCrossed size={32} />
            </div>
            <h3 className="card-title font-serif">Wedding Reception</h3>

            <div className="card-time-badge">
              <Clock size={16} />
              <span>To Follow Immediately</span>
            </div>

            <div className="card-location">
              <MapPin size={18} style={{ flexShrink: 0, marginTop: '3px' }} />
              <span>Oasis Manila</span>
            </div>

            <a
              href={receptionMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-map-link"
              aria-label="Google Maps directions for Reception"
            >
              <span>Google Maps</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Venue & Event Details Section */}
      <section id="details" className="details-section">
        <div className="section-header">
          <p className="section-subtitle">Important Info</p>
          <h2 className="section-title font-serif">Guest Details</h2>
          <div className="section-divider"></div>
        </div>

        <div className="details-grid">
          {/* Dress Code Card */}
          <div className="glass-card details-card">
            <div className="card-icon-wrapper ceremony-icon">
              <Shirt size={30} />
            </div>
            <h3 className="card-title font-serif">Dress Code Guidance</h3>
            
            <div className="card-time-badge">
              <span>Formal / Black Tie Optional</span>
            </div>

            <p className="details-content">
              We request our guests to dress in formal attire matching our soft romantic blush and sage palette. Gentlemen are encouraged to wear formal suits or Barong Tagalog, and ladies in floor-length gowns or elegant cocktail dresses.
            </p>

            <div className="details-tag-list">
              <span className="details-tag">Barong Tagalog</span>
              <span className="details-tag">Formal Suits</span>
              <span className="details-tag">Cocktail & Gowns</span>
            </div>
          </div>

          {/* Parking & Transportation Card */}
          <div className="glass-card details-card">
            <div className="card-icon-wrapper reception-icon">
              <Car size={30} />
            </div>
            <h3 className="card-title font-serif">Parking & Transport</h3>

            <div className="card-time-badge">
              <span>Venue Parking & Travel Info</span>
            </div>

            <p className="details-content">
              Dedicated guest parking is available at both Mt. Carmel Shrine and Oasis Manila. For guests traveling between locations, Oasis Manila is conveniently located approximately 10 minutes from the ceremony venue.
            </p>

            <div className="details-tag-list">
              <span className="details-tag">Free Guest Parking</span>
              <span className="details-tag">10 Min Travel Time</span>
              <span className="details-tag">Ride-Share Friendly</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
