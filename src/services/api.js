const LOCAL_STORAGE_KEY = 'mark_glenda_rsvps';
const ADMIN_PASS = 'markglenda2026';

export async function submitRSVP(data) {
  try {
    const res = await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Backend API unavailable, using persistent localStorage fallback:', err);
  }

  // Fallback to local storage persistence
  const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  const newRsvp = {
    id: 'rsvp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    ...data,
    created_at: new Date().toISOString()
  };
  existing.push(newRsvp);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));
  return { success: true, id: newRsvp.id, rsvp: newRsvp };
}

export async function adminLogin(password) {
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.token) {
        sessionStorage.setItem('admin_token', data.token);
        return { success: true, token: data.token };
      }
    }
  } catch (err) {
    console.warn('Backend API unavailable, using local admin check:', err);
  }

  if (password === ADMIN_PASS) {
    sessionStorage.setItem('admin_token', 'authed');
    return { success: true, token: 'authed' };
  }
  return { success: false, error: 'Invalid admin password' };
}

export async function fetchRSVPs() {
  try {
    const token = sessionStorage.getItem('admin_token');
    const res = await fetch('/api/admin/rsvps', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('API unavailable, returning local storage RSVPs:', err);
  }

  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
}
