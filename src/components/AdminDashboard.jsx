import React, { useState, useEffect, useCallback } from 'react';
import { X, Lock, Download, Search, Users, CheckCircle2, XCircle, RefreshCw, LogOut, ShieldCheck, Mail, MessageSquare, Calendar } from 'lucide-react';
import { adminLogin, fetchRSVPs } from '../services/api';

export default function AdminDashboard({ isOpen, onClose }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Check if token already exists on mount or when modal opens
  useEffect(() => {
    if (isOpen) {
      const token = sessionStorage.getItem('admin_token');
      if (token) {
        setIsAuthenticated(true);
        loadRSVPs();
      }
    }
  }, [isOpen]);

  const loadRSVPs = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchRSVPs();
      if (Array.isArray(data)) {
        setRsvps(data);
      } else {
        setRsvps([]);
      }
    } catch (err) {
      console.error('Error fetching RSVPs:', err);
      setRsvps([]);
    } finally {
      setLoading(false);
    }
  }, []);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    if (!password) {
      setAuthError('Please enter the host passphrase');
      return;
    }

    setLoginLoading(true);
    try {
      const res = await adminLogin(password);
      if (res && res.success) {
        setIsAuthenticated(true);
        setPassword('');
        loadRSVPs();
      } else {
        setAuthError(res?.error || 'Invalid host passphrase');
      }
    } catch (err) {
      setAuthError('Authentication failed. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setRsvps([]);
    setPassword('');
    setAuthError('');
  };

  // Metrics Calculations
  const totalRSVPs = rsvps.length;
  const totalAttendingGuests = rsvps.reduce((sum, item) => {
    if (item.attending) {
      return sum + (parseInt(item.guest_count, 10) || 1);
    }
    return sum;
  }, 0);
  const totalDeclined = rsvps.filter((item) => !item.attending).length;

  // Filtered RSVPs by guest name
  const filteredRSVPs = rsvps.filter((item) => {
    const nameMatch = (item.full_name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const emailMatch = (item.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || emailMatch;
  });

  // CSV Export Handler
  const handleExportCSV = () => {
    const headers = [
      'Guest Name',
      'Contact',
      'Status',
      'Guests Count',
      '+1 Name',
      'Message',
      'Submission Date'
    ];

    const rows = filteredRSVPs.map((r) => [
      r.full_name || '',
      r.email || '',
      r.attending ? 'Attending' : 'Declined',
      r.attending ? (r.guest_count || 1) : 0,
      r.plus_one_name || '',
      r.message || '',
      r.created_at ? new Date(r.created_at).toLocaleString() : ''
    ]);

    const csvContent = [
      headers.map((h) => `"${h.replace(/"/g, '""')}"`).join(','),
      ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const dateStr = new Date().toISOString().split('T')[0];
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `mark_glenda_rsvps_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div
      className="admin-modal-overlay"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div className="admin-modal-container glass-card">
        {/* Header Bar */}
        <div className="admin-modal-header">
          <div className="admin-header-title">
            <ShieldCheck size={24} className="admin-header-icon" />
            <h2 className="font-serif">Host Admin Dashboard</h2>
          </div>
          <div className="admin-header-actions">
            {isAuthenticated && (
              <button
                type="button"
                className="btn-admin-logout"
                onClick={handleLogout}
                title="Log Out"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            )}
            <button
              type="button"
              className="admin-modal-close-btn"
              onClick={onClose}
              aria-label="Close Dashboard"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Authentication View */}
        {!isAuthenticated ? (
          <div className="admin-login-wrapper">
            <div className="admin-login-card glass-card">
              <div className="admin-lock-icon-wrapper">
                <Lock size={32} />
              </div>
              <h3 className="font-serif admin-login-title">Host Authentication</h3>
              <p className="admin-login-subtitle">
                Please enter the host passphrase to access guest RSVPs and metrics.
              </p>

              {authError && (
                <div className="admin-error-banner">
                  {authError}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="admin-login-form">
                <div className="admin-input-group">
                  <input
                    type="password"
                    className="admin-input"
                    placeholder="Enter Passphrase (markglenda2026)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="btn-rsvp-primary admin-login-btn"
                >
                  {loginLoading ? 'Authenticating...' : 'Access Dashboard'}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Main Dashboard View */
          <div className="admin-dashboard-content">
            {/* Metrics Overview Cards */}
            <div className="admin-metrics-grid">
              <div className="glass-card metric-card">
                <div className="metric-icon-wrapper metric-icon-total">
                  <Users size={22} />
                </div>
                <div className="metric-info">
                  <span className="metric-label">Total RSVPs</span>
                  <span className="metric-value font-serif">{totalRSVPs}</span>
                </div>
              </div>

              <div className="glass-card metric-card">
                <div className="metric-icon-wrapper metric-icon-attending">
                  <CheckCircle2 size={22} />
                </div>
                <div className="metric-info">
                  <span className="metric-label">Attending Guests</span>
                  <span className="metric-value font-serif">{totalAttendingGuests}</span>
                </div>
              </div>

              <div className="glass-card metric-card">
                <div className="metric-icon-wrapper metric-icon-declined">
                  <XCircle size={22} />
                </div>
                <div className="metric-info">
                  <span className="metric-label">Declined Count</span>
                  <span className="metric-value font-serif">{totalDeclined}</span>
                </div>
              </div>
            </div>

            {/* Controls Bar: Search & Export */}
            <div className="admin-controls-bar">
              <div className="admin-search-wrapper">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  className="admin-search-input"
                  placeholder="Search guests by name or contact..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="admin-action-buttons">
                <button
                  type="button"
                  className="btn-admin-secondary"
                  onClick={loadRSVPs}
                  disabled={loading}
                  title="Refresh RSVP Data"
                >
                  <RefreshCw size={16} className={loading ? 'spinner-icon' : ''} />
                  <span>Refresh</span>
                </button>

                <button
                  type="button"
                  className="btn-rsvp-primary btn-export-csv"
                  onClick={handleExportCSV}
                  disabled={filteredRSVPs.length === 0}
                >
                  <Download size={16} />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* RSVPs Table Container */}
            <div className="admin-table-container glass-card">
              {loading ? (
                <div className="admin-state-container">
                  <RefreshCw size={28} className="spinner-icon" />
                  <p>Loading guest responses...</p>
                </div>
              ) : filteredRSVPs.length === 0 ? (
                <div className="admin-state-container">
                  <Users size={32} className="empty-state-icon" />
                  <p className="empty-state-title">No RSVP records found</p>
                  <p className="empty-state-sub">
                    {searchTerm ? 'Try adjusting your search criteria.' : 'Responses will appear here when guests submit their RSVP.'}
                  </p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="admin-rsvp-table">
                    <thead>
                      <tr>
                        <th>Guest Name</th>
                        <th>Contact</th>
                        <th>Status</th>
                        <th>Guests Count</th>
                        <th>+1 Name</th>
                        <th>Message</th>
                        <th>Submission Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRSVPs.map((rsvp, idx) => (
                        <tr key={rsvp.id || idx}>
                          <td className="font-medium guest-name-cell">
                            {rsvp.full_name}
                          </td>
                          <td className="contact-cell">
                            <span className="contact-inline">
                              <Mail size={14} className="cell-icon" />
                              {rsvp.email}
                            </span>
                          </td>
                          <td>
                            {rsvp.attending ? (
                              <span className="status-badge status-attending">
                                <CheckCircle2 size={13} /> Attending
                              </span>
                            ) : (
                              <span className="status-badge status-declined">
                                <XCircle size={13} /> Declined
                              </span>
                            )}
                          </td>
                          <td className="text-center font-medium">
                            {rsvp.attending ? (rsvp.guest_count || 1) : 0}
                          </td>
                          <td className="plus-one-cell">
                            {rsvp.plus_one_name ? rsvp.plus_one_name : <span className="muted-dash">—</span>}
                          </td>
                          <td className="message-cell" title={rsvp.message}>
                            {rsvp.message ? (
                              <span className="message-inline">
                                <MessageSquare size={13} className="cell-icon" />
                                {rsvp.message}
                              </span>
                            ) : (
                              <span className="muted-dash">—</span>
                            )}
                          </td>
                          <td className="date-cell">
                            <span className="date-inline">
                              <Calendar size={13} className="cell-icon" />
                              {rsvp.created_at
                                ? new Date(rsvp.created_at).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })
                                : 'N/A'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
