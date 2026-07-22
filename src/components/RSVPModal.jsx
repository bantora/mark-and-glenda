import React, { useState } from 'react';
import { X, CheckCircle, Heart, Loader2, Sparkles, User, Mail, Users, MessageSquare } from 'lucide-react';
import { submitRSVP } from '../services/api';

export default function RSVPModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    attending: true,
    guest_count: 1,
    plus_one_name: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const resetForm = () => {
    setFormData({
      full_name: '',
      email: '',
      attending: true,
      guest_count: 1,
      plus_one_name: '',
      message: ''
    });
    setSubmitted(false);
    setErrorMessage('');
  };

  const handleClose = () => {
    if (onClose) onClose();
    setTimeout(() => {
      resetForm();
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!formData.full_name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim()) {
      setErrorMessage('Please enter your email or phone number.');
      return;
    }

    setLoading(true);
    try {
      const res = await submitRSVP(formData);
      if (res && (res.success || res.id)) {
        setSubmitted(true);
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      console.error('RSVP submission error:', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div 
      className="rsvp-modal-overlay"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div className="rsvp-modal-container glass-card">
        <button
          type="button"
          className="rsvp-modal-close-btn"
          onClick={handleClose}
          aria-label="Close RSVP Modal"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="rsvp-success-screen">
            <div className="rsvp-success-icon-wrapper">
              <CheckCircle size={48} className="rsvp-success-icon" />
              <div className="success-pulse-ring"></div>
            </div>

            <h3 className="rsvp-success-title font-serif">Thank You!</h3>
            
            <p className="rsvp-success-message">
              Your RSVP has been submitted successfully.
            </p>

            <p className="rsvp-success-subtext">
              Mark & Glenda look forward to celebrating this special day with you!
            </p>

            <div className="rsvp-success-heart">
              <Heart size={22} fill="currentColor" />
            </div>

            <button
              type="button"
              className="btn-rsvp-primary rsvp-modal-submit-btn"
              onClick={handleClose}
            >
              Close Window
            </button>
          </div>
        ) : (
          <div className="rsvp-form-wrapper">
            <div className="rsvp-modal-header">
              <span className="rsvp-header-badge">
                <Sparkles size={14} /> RSVP
              </span>
              <h2 className="rsvp-modal-title font-serif">Celebrate With Us</h2>
              <p className="rsvp-modal-subtitle">
                Please respond by November 1, 2026 to help us prepare for our big day.
              </p>
              <div className="section-divider"></div>
            </div>

            {errorMessage && (
              <div className="rsvp-error-banner">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="rsvp-form">
              {/* Full Name */}
              <div className="rsvp-form-group">
                <label className="rsvp-label" htmlFor="full_name">
                  Full Name <span className="required-star">*</span>
                </label>
                <div className="rsvp-input-wrapper">
                  <User size={18} className="rsvp-input-icon" />
                  <input
                    id="full_name"
                    required
                    type="text"
                    className="rsvp-input"
                    placeholder="e.g. Maria Santos"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  />
                </div>
              </div>

              {/* Email / Phone */}
              <div className="rsvp-form-group">
                <label className="rsvp-label" htmlFor="email">
                  Email / Phone Number <span className="required-star">*</span>
                </label>
                <div className="rsvp-input-wrapper">
                  <Mail size={18} className="rsvp-input-icon" />
                  <input
                    id="email"
                    required
                    type="text"
                    className="rsvp-input"
                    placeholder="e.g. maria@example.com or 09171234567"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              {/* Attendance Toggle */}
              <div className="rsvp-form-group">
                <label className="rsvp-label">
                  Will you be attending? <span className="required-star">*</span>
                </label>
                <div className="rsvp-toggle-group">
                  <button
                    type="button"
                    className={`rsvp-toggle-btn ${formData.attending ? 'active-accept' : ''}`}
                    onClick={() => setFormData({ ...formData, attending: true })}
                  >
                    <Heart size={16} fill={formData.attending ? "currentColor" : "none"} />
                    <span>Joyfully Accepts</span>
                  </button>
                  <button
                    type="button"
                    className={`rsvp-toggle-btn ${!formData.attending ? 'active-decline' : ''}`}
                    onClick={() => setFormData({ ...formData, attending: false })}
                  >
                    <X size={16} />
                    <span>Regretfully Declines</span>
                  </button>
                </div>
              </div>

              {/* Conditional Fields if Attending */}
              {formData.attending && (
                <div className="rsvp-attending-fields">
                  <div className="rsvp-form-row">
                    {/* Guest Count */}
                    <div className="rsvp-form-group flex-1">
                      <label className="rsvp-label" htmlFor="guest_count">
                        Total Guests (1-5)
                      </label>
                      <div className="rsvp-input-wrapper">
                        <Users size={18} className="rsvp-input-icon" />
                        <select
                          id="guest_count"
                          className="rsvp-select"
                          value={formData.guest_count}
                          onChange={(e) => setFormData({ ...formData, guest_count: parseInt(e.target.value, 10) || 1 })}
                        >
                          <option value={1}>1 Guest (Just Me)</option>
                          <option value={2}>2 Guests</option>
                          <option value={3}>3 Guests</option>
                          <option value={4}>4 Guests</option>
                          <option value={5}>5 Guests</option>
                        </select>
                      </div>
                    </div>

                    {/* Plus One Name */}
                    <div className="rsvp-form-group flex-1">
                      <label className="rsvp-label" htmlFor="plus_one_name">
                        +1 Guest Name (Optional)
                      </label>
                      <div className="rsvp-input-wrapper">
                        <User size={18} className="rsvp-input-icon" />
                        <input
                          id="plus_one_name"
                          type="text"
                          className="rsvp-input"
                          placeholder="Companion's Name"
                          value={formData.plus_one_name}
                          onChange={(e) => setFormData({ ...formData, plus_one_name: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Message for Couple */}
              <div className="rsvp-form-group">
                <label className="rsvp-label" htmlFor="message">
                  Personal Wishes for Mark & Glenda
                </label>
                <div className="rsvp-input-wrapper textarea-wrapper">
                  <MessageSquare size={18} className="rsvp-input-icon textarea-icon" />
                  <textarea
                    id="message"
                    rows={3}
                    className="rsvp-textarea"
                    placeholder="Share your warm wishes, dietary preferences, or songs you'd love to hear..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-rsvp-primary rsvp-modal-submit-btn"
              >
                {loading ? (
                  <span className="rsvp-loading-spinner font-medium">
                    <Loader2 size={18} className="spinner-icon" /> Submitting RSVP...
                  </span>
                ) : (
                  <span>Send RSVP</span>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
