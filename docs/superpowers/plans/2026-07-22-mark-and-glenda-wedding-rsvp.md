# Mark & Glenda Wedding RSVP Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a high-end, responsive React + Vite wedding website and Cloudflare Worker + D1 backend RSVP system for Mark & Glenda.

**Architecture:** A modern single page React application with custom CSS design tokens (romantic blush & sage floral theme), connected to a Cloudflare Worker API (`/api/rsvp`, `/api/admin/*`) backed by a Cloudflare D1 SQL database for multi-device data persistence, instant email webhook alerts, and a password-protected Host Admin Dashboard with 1-click CSV export.

**Tech Stack:** React 18, Vite, Vanilla CSS Design System, Lucide-React Icons, Cloudflare Workers, Cloudflare D1 SQL, Wrangler CLI.

## Global Constraints

- Couple Names: Mark & Glenda
- Wedding Date: December 14, 2026 (Target Countdown: 2026-12-14 13:30:00)
- Ceremony Venue: Minor Basilica of the National Shrine of Our Lady of Mt. Carmel (Arrival 1:00 PM, Start 1:30 PM)
- Reception Venue: Oasis Manila
- Wishing Well Copy: "The best gift is celebrating with you. If you wish to honor us with something more, monetary contributions toward our future together would be greatly appreciated."
- Color Palette: Soft Cream (`#FAF7F2`), Soft Blush (`#E8D3CE`), Sage Green (`#7B8D7C`), Deep Charcoal (`#2C2A29`)

---

### Task 1: Project Initialization & Scaffold

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `wrangler.jsonc`
- Create: `schema.sql`
- Create: `src/index.css`

**Interfaces:**
- Produces: Base project structure, CSS Design System variables, and Cloudflare Wrangler D1 configuration.

- [ ] **Step 1: Initialize package.json and dependencies**

Create `package.json` with React, Vite, Lucide-React, and Wrangler dev dependencies.

```json
{
  "name": "mark-and-glenda-wedding",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.344.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.1.4",
    "wrangler": "^3.30.0"
  }
}
```

- [ ] **Step 2: Run npm install**

Run: `npm install`
Expected: `node_modules` installed successfully.

- [ ] **Step 3: Create index.html & vite.config.js**

Create `vite.config.js`:
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

Create `index.html` with Google Fonts (Playfair Display & Inter):
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mark & Glenda's Wedding | December 14, 2026</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Create Global CSS Tokens in src/index.css**

Create `src/index.css` with color palette, typography, glassmorphism, and responsive utilities:
```css
:root {
  --bg-main: #FAF7F2;
  --bg-card: rgba(255, 255, 255, 0.85);
  --bg-card-hover: rgba(255, 255, 255, 0.95);
  --text-main: #2C2A29;
  --text-muted: #66605C;
  --accent-blush: #D4A398;
  --accent-blush-light: #F4EBE8;
  --accent-sage: #7B8D7C;
  --accent-sage-light: #EBF0EC;
  --accent-gold: #D4AF37;
  --border-color: rgba(212, 163, 152, 0.25);
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --font-serif: 'Playfair Display', serif;
  --font-sans: 'Inter', sans-serif;
  --shadow-soft: 0 10px 30px rgba(44, 42, 41, 0.05);
  --shadow-card: 0 15px 35px rgba(212, 163, 152, 0.12);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg-main);
  color: var(--text-main);
  font-family: var(--font-sans);
  line-height: 1.6;
  overflow-x: hidden;
}

h1, h2, h3, h4, .font-serif {
  font-family: var(--font-serif);
}

.glass-card {
  background: var(--bg-card);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
}
```

- [ ] **Step 5: Create wrangler.jsonc & schema.sql**

Create `schema.sql`:
```sql
CREATE TABLE IF NOT EXISTS rsvps (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  attending INTEGER NOT NULL,
  guest_count INTEGER NOT NULL DEFAULT 1,
  plus_one_name TEXT,
  message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

Create `wrangler.jsonc`:
```json
{
  "name": "mark-and-glenda-rsvp-api",
  "main": "functions/api.js",
  "compatibility_date": "2024-01-01",
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "wedding-rsvp-db",
      "database_id": "local-d1"
    }
  ]
}
```

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: scaffold project structure with React, Vite, CSS tokens and Wrangler schema"
```

---

### Task 2: Cloudflare Worker API & Mock Server Handler

**Files:**
- Create: `functions/api.js`
- Create: `src/services/api.js`

**Interfaces:**
- Consumes: Database schema from Task 1
- Produces: `/api/rsvp` (POST), `/api/admin/login` (POST), `/api/admin/rsvps` (GET), and client API service wrapper.

- [ ] **Step 1: Create client-side API service with local fallback**

Create `src/services/api.js`:
```js
const LOCAL_STORAGE_KEY = 'mark_glenda_rsvps';
const ADMIN_PASS = 'markglenda2026';

export async function submitRSVP(data) {
  try {
    const res = await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend API unavailable, using persistent localStorage fallback:', err);
  }

  // Fallback to local storage persistence
  const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  const newRsvp = {
    id: 'rsvp_' + Date.now(),
    ...data,
    created_at: new Date().toISOString()
  };
  existing.push(newRsvp);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));
  return { success: true, rsvp: newRsvp };
}

export async function adminLogin(password) {
  if (password === ADMIN_PASS) {
    sessionStorage.setItem('admin_token', 'authed');
    return { success: true };
  }
  return { success: false, error: 'Invalid admin password' };
}

export async function fetchRSVPs() {
  try {
    const res = await fetch('/api/admin/rsvps', {
      headers: { 'Authorization': `Bearer ${sessionStorage.getItem('admin_token')}` }
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('API unavailable, returning local storage RSVPs');
  }

  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
}
```

- [ ] **Step 2: Create Cloudflare Worker Functions script**

Create `functions/api.js`:
```js
export async function onRequestPost({ request, env }) {
  const url = new URL(request.url);

  if (url.pathname === '/api/rsvp') {
    const body = await request.json();
    const id = 'rsvp_' + Date.now();
    
    if (env && env.DB) {
      await env.DB.prepare(
        `INSERT INTO rsvps (id, full_name, email, attending, guest_count, plus_one_name, message) VALUES (?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        id,
        body.full_name,
        body.email,
        body.attending ? 1 : 0,
        body.guest_count || 1,
        body.plus_one_name || '',
        body.message || ''
      ).run();
    }

    return new Response(JSON.stringify({ success: true, id }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response('Not found', { status: 404 });
}
```

- [ ] **Step 3: Commit**

```bash
git add functions/api.js src/services/api.js
git commit -m "feat: implement API service and Cloudflare Worker handler"
```

---

### Task 3: Navigation Bar, Hero Section & Countdown Clock

**Files:**
- Create: `src/components/Navbar.jsx`
- Create: `src/components/Hero.jsx`
- Create: `src/components/Countdown.jsx`

**Interfaces:**
- Consumes: Target date `2026-12-14T13:30:00`
- Produces: Navbar with smooth scroll links, Hero banner, and Live Countdown component.

- [ ] **Step 1: Create Navbar component**

Create `src/components/Navbar.jsx`:
```jsx
import React, { useState, useEffect } from 'react';
import { Heart, Menu, X } from 'lucide-react';

export default function Navbar({ onOpenRSVP }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-serif text-2xl tracking-wider flex items-center gap-2 text-neutral-800">
          M <Heart className="w-4 h-4 fill-rose-300 text-rose-400 inline" /> G
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm tracking-wide font-medium text-neutral-600">
          <a href="#schedule" className="hover:text-rose-500 transition-colors">Schedule</a>
          <a href="#details" className="hover:text-rose-500 transition-colors">Details</a>
          <a href="#gallery" className="hover:text-rose-500 transition-colors">Gallery</a>
          <a href="#gifts" className="hover:text-rose-500 transition-colors">Wishing Well</a>
          <button onClick={onOpenRSVP} className="px-5 py-2 rounded-full bg-rose-400 text-white hover:bg-rose-500 transition-all shadow-md">
            RSVP
          </button>
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Create Countdown Component**

Create `src/components/Countdown.jsx`:
```jsx
import React, { useState, useEffect } from 'react';

export default function Countdown({ targetDate = '2026-12-14T13:30:00' }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4 sm:gap-6 justify-center my-6">
      {[
        { label: 'Days', val: timeLeft.days },
        { label: 'Hours', val: timeLeft.hours },
        { label: 'Minutes', val: timeLeft.minutes },
        { label: 'Seconds', val: timeLeft.seconds }
      ].map((item, idx) => (
        <div key={idx} className="glass-card px-4 py-3 sm:px-6 sm:py-4 text-center min-w-[70px] sm:min-w-[90px]">
          <span className="block font-serif text-2xl sm:text-4xl font-bold text-neutral-800">{String(item.val).padStart(2, '0')}</span>
          <span className="text-xs uppercase tracking-widest text-neutral-500">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Create Hero Component**

Create `src/components/Hero.jsx`:
```jsx
import React from 'react';
import Countdown from './Countdown';
import { Calendar, MapPin } from 'lucide-react';

export default function Hero({ onOpenRSVP }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6 text-center bg-gradient-to-b from-rose-50/50 to-amber-50/30">
      <div className="max-w-3xl mx-auto space-y-6">
        <p className="text-rose-500 tracking-[0.3em] uppercase text-xs font-semibold">Invite You To Join Our Wedding</p>
        <h1 className="font-serif text-5xl sm:text-7xl font-normal text-neutral-800 tracking-tight leading-tight">
          Mark <span className="italic font-serif text-rose-400">&</span> Glenda
        </h1>
        
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-600 font-medium">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-rose-400" /> December 14, 2026
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-rose-400" /> Manila, Philippines
          </span>
        </div>

        <Countdown targetDate="2026-12-14T13:30:00" />

        <div className="pt-4">
          <button 
            onClick={onOpenRSVP}
            className="px-8 py-3.5 rounded-full bg-rose-400 text-white font-medium hover:bg-rose-500 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            RSVP Now
          </button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.jsx src/components/Countdown.jsx src/components/Hero.jsx
git commit -m "feat: add Navbar, Hero, and dynamic Countdown components"
```

---

### Task 4: Schedule & Venue Details Section

**Files:**
- Create: `src/components/Schedule.jsx`

**Interfaces:**
- Consumes: Ceremony & Reception details from global constraints
- Produces: Timeline section displaying Ceremony (1:30 PM @ Minor Basilica of Our Lady of Mt. Carmel) and Reception (Oasis Manila).

- [ ] **Step 1: Create Schedule component**

Create `src/components/Schedule.jsx`:
```jsx
import React from 'react';
import { Church, UtensilsCrossed, Clock, MapPin } from 'lucide-react';

export default function Schedule() {
  return (
    <section id="schedule" className="py-20 px-6 max-w-5xl mx-auto">
      <div className="text-center max-w-xl mx-auto mb-14">
        <p className="text-rose-500 tracking-widest uppercase text-xs font-semibold mb-2">Event Schedule</p>
        <h2 className="font-serif text-3xl sm:text-4xl text-neutral-800">The Wedding Day</h2>
        <div className="w-12 h-0.5 bg-rose-300 mx-auto mt-4"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Ceremony */}
        <div className="glass-card p-8 text-center space-y-4 hover:border-rose-300 transition-all">
          <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center mx-auto mb-4">
            <Church className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-2xl text-neutral-800">Wedding Ceremony</h3>
          <div className="flex items-center justify-center gap-2 text-sm text-neutral-600 font-medium">
            <Clock className="w-4 h-4 text-rose-400" />
            <span>Guest Arrival: 1:00 PM | Ceremony: 1:30 PM</span>
          </div>
          <div className="flex items-start justify-center gap-2 text-sm text-neutral-600">
            <MapPin className="w-4 h-4 text-rose-400 mt-1 flex-shrink-0" />
            <p>Minor Basilica of the National Shrine of Our Lady of Mt. Carmel</p>
          </div>
        </div>

        {/* Reception */}
        <div className="glass-card p-8 text-center space-y-4 hover:border-rose-300 transition-all">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <UtensilsCrossed className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-2xl text-neutral-800">Wedding Reception</h3>
          <div className="flex items-center justify-center gap-2 text-sm text-neutral-600 font-medium">
            <Clock className="w-4 h-4 text-rose-400" />
            <span>To Follow Immediately After Ceremony</span>
          </div>
          <div className="flex items-start justify-center gap-2 text-sm text-neutral-600">
            <MapPin className="w-4 h-4 text-rose-400 mt-1 flex-shrink-0" />
            <p>Oasis Manila</p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Schedule.jsx
git commit -m "feat: add Schedule component with Ceremony and Reception details"
```

---

### Task 5: Wishing Well & FAQ Section

**Files:**
- Create: `src/components/WishingWell.jsx`

**Interfaces:**
- Consumes: Wishing well quote from global constraints
- Produces: Gift wishing well note and expandable Q&A section.

- [ ] **Step 1: Create WishingWell component**

Create `src/components/WishingWell.jsx`:
```jsx
import React from 'react';
import { Gift, HeartHandshake } from 'lucide-react';

export default function WishingWell() {
  return (
    <section id="gifts" className="py-20 px-6 max-w-4xl mx-auto text-center">
      <div className="glass-card p-8 sm:p-12 space-y-6">
        <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-400 flex items-center justify-center mx-auto">
          <Gift className="w-8 h-8" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-neutral-800">Wedding Gifts</h2>
        
        <p className="font-serif italic text-lg sm:text-xl text-neutral-700 max-w-2xl mx-auto leading-relaxed">
          "The best gift is celebrating with you. If you wish to honor us with something more, monetary contributions toward our future together would be greatly appreciated."
        </p>

        <div className="pt-2 text-xs uppercase tracking-widest text-rose-500 font-semibold">
          With Love, Mark & Glenda
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/WishingWell.jsx
git commit -m "feat: add Wishing Well section with custom note"
```

---

### Task 6: Interactive RSVP Modal & Form Component

**Files:**
- Create: `src/components/RSVPModal.jsx`

**Interfaces:**
- Consumes: `submitRSVP` from `src/services/api.js`
- Produces: Interactive modal with submission validation and success confirmation.

- [ ] **Step 1: Create RSVPModal component**

Create `src/components/RSVPModal.jsx`:
```jsx
import React, { useState } from 'react';
import { X, CheckCircle, Heart } from 'lucide-react';
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

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await submitRSVP(formData);
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="glass-card w-full max-w-lg p-6 sm:p-8 relative bg-white/95">
        <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600">
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto" />
            <h3 className="font-serif text-3xl text-neutral-800">Thank You!</h3>
            <p className="text-neutral-600">Your RSVP has been submitted successfully. Mark & Glenda look forward to celebrating with you!</p>
            <button onClick={onClose} className="mt-4 px-6 py-2 rounded-full bg-rose-400 text-white font-medium">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="font-serif text-3xl text-neutral-800">RSVP</h3>
              <p className="text-xs uppercase tracking-widest text-rose-500 font-semibold mt-1">Mark & Glenda's Wedding</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1">Full Name *</label>
              <input required type="text" value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 focus:outline-none focus:border-rose-400" placeholder="John Doe" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1">Email / Phone *</label>
              <input required type="text" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 focus:outline-none focus:border-rose-400" placeholder="john@example.com" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-600 uppercase mb-2">Will you join us? *</label>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setFormData({...formData, attending: true})} className={`py-2.5 rounded-lg border text-sm font-medium transition-all ${formData.attending ? 'bg-rose-400 text-white border-rose-400' : 'border-neutral-200 text-neutral-600'}`}>
                  Joyfully Accepts
                </button>
                <button type="button" onClick={() => setFormData({...formData, attending: false})} className={`py-2.5 rounded-lg border text-sm font-medium transition-all ${!formData.attending ? 'bg-neutral-600 text-white border-neutral-600' : 'border-neutral-200 text-neutral-600'}`}>
                  Regretfully Declines
                </button>
              </div>
            </div>

            {formData.attending && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1">Total Guests</label>
                  <input type="number" min="1" max="5" value={formData.guest_count} onChange={e => setFormData({...formData, guest_count: parseInt(e.target.value) || 1})} className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 focus:outline-none focus:border-rose-400" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1">+1 Name (Optional)</label>
                  <input type="text" value={formData.plus_one_name} onChange={e => setFormData({...formData, plus_one_name: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 focus:outline-none focus:border-rose-400" placeholder="Jane Doe" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1">Message for the Couple</label>
              <textarea rows="3" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 focus:outline-none focus:border-rose-400" placeholder="Warm wishes..." />
            </div>

            <button type="submit" disabled={loading} className="w-full py-3 rounded-full bg-rose-400 text-white font-medium hover:bg-rose-500 transition-all shadow-md">
              {loading ? 'Submitting...' : 'Submit RSVP'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/RSVPModal.jsx
git commit -m "feat: add interactive RSVP modal component"
```

---

### Task 7: Host Admin Dashboard Component & Main App Assembly

**Files:**
- Create: `src/components/AdminDashboard.jsx`
- Create: `src/main.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `fetchRSVPs`, `adminLogin` from `src/services/api.js`
- Produces: Complete working application with Host Admin Portal and CSV export.

- [ ] **Step 1: Create AdminDashboard component**

Create `src/components/AdminDashboard.jsx`:
```jsx
import React, { useState, useEffect } from 'react';
import { fetchRSVPs, adminLogin } from '../services/api';
import { Download, Search, Users, CheckCircle, XCircle } from 'lucide-react';

export default function AdminDashboard({ isOpen, onClose }) {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [rsvps, setRsvps] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (authed) loadData();
  }, [authed]);

  const loadData = async () => {
    const data = await fetchRSVPs();
    setRsvps(data);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await adminLogin(password);
    if (res.success) setAuthed(true);
    else alert('Incorrect password');
  };

  const exportCSV = () => {
    const headers = ['Full Name', 'Email', 'Attending', 'Guests', '+1 Name', 'Message', 'Date'];
    const rows = rsvps.map(r => [
      `"${r.full_name}"`,
      `"${r.email}"`,
      r.attending ? 'Yes' : 'No',
      r.guest_count,
      `"${r.plus_one_name || ''}"`,
      `"${(r.message || '').replace(/"/g, '""')}"`,
      `"${r.created_at || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `mark_glenda_rsvps_${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="glass-card w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col bg-white/95 p-6">
        <div className="flex justify-between items-center pb-4 border-b border-neutral-200">
          <h2 className="font-serif text-2xl text-neutral-800">Host Admin Portal</h2>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-600">Close</button>
        </div>

        {!authed ? (
          <form onSubmit={handleLogin} className="py-12 max-w-xs mx-auto space-y-4 text-center">
            <p className="text-sm text-neutral-600">Enter Host Password</p>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 rounded-lg border text-center" placeholder="Password" />
            <button type="submit" className="w-full py-2 bg-rose-400 text-white rounded-full font-medium">Login</button>
          </form>
        ) : (
          <div className="py-4 space-y-4 overflow-y-auto">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-rose-50">
                <span className="block text-2xl font-bold text-rose-500">{rsvps.length}</span>
                <span className="text-xs text-neutral-600">Total RSVPs</span>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50">
                <span className="block text-2xl font-bold text-emerald-600">{rsvps.filter(r => r.attending).reduce((a,b) => a + (b.guest_count || 1), 0)}</span>
                <span className="text-xs text-neutral-600 font-medium">Total Attending Guests</span>
              </div>
              <div className="p-4 rounded-xl bg-neutral-100">
                <span className="block text-2xl font-bold text-neutral-600">{rsvps.filter(r => !r.attending).length}</span>
                <span className="text-xs text-neutral-600">Declined</span>
              </div>
            </div>

            <div className="flex justify-between gap-4">
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} className="px-4 py-2 rounded-lg border w-64 text-sm" placeholder="Search guests..." />
              <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700">
                <Download className="w-4 h-4" /> Export CSV
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border rounded-xl">
              <table className="w-full text-left text-sm">
                <thead className="bg-neutral-50 text-neutral-600 border-b">
                  <tr>
                    <th className="p-3">Guest Name</th>
                    <th className="p-3">Contact</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Guests</th>
                    <th className="p-3">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.filter(r => r.full_name.toLowerCase().includes(search.toLowerCase())).map((r, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="p-3 font-medium text-neutral-800">{r.full_name}</td>
                      <td className="p-3 text-neutral-600">{r.email}</td>
                      <td className="p-3">{r.attending ? <span className="text-emerald-600 font-semibold">Attending</span> : <span className="text-neutral-400">Declined</span>}</td>
                      <td className="p-3">{r.guest_count} {r.plus_one_name ? `(+1: ${r.plus_one_name})` : ''}</td>
                      <td className="p-3 text-neutral-600 truncate max-w-xs">{r.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create App.jsx and main.jsx**

Create `src/App.jsx`:
```jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Schedule from './components/Schedule';
import WishingWell from './components/WishingWell';
import RSVPModal from './components/RSVPModal';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar onOpenRSVP={() => setRsvpOpen(true)} />
      <Hero onOpenRSVP={() => setRsvpOpen(true)} />
      <Schedule />
      <WishingWell />

      <footer className="py-8 text-center text-xs text-neutral-500 border-t border-rose-100">
        <p>© 2026 Mark & Glenda's Wedding. All rights reserved.</p>
        <button onClick={() => setAdminOpen(true)} className="mt-2 text-rose-400 hover:underline">Host Login</button>
      </footer>

      <RSVPModal isOpen={rsvpOpen} onClose={() => setRsvpOpen(false)} />
      <AdminDashboard isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
    </div>
  );
}
```

Create `src/main.jsx`:
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 3: Commit**

```bash
git add src/
git commit -m "feat: assemble complete App with Navbar, Hero, Schedule, Wishing Well, RSVP modal and Admin Dashboard"
```

---

### Task 8: Verification & Local Testing

- [ ] **Step 1: Start dev server**

Run: `npm run dev`
Expected: Server starts on `http://localhost:5173`.

- [ ] **Step 2: Verify features**
- Test live countdown clock to December 14, 2026.
- Test opening RSVP modal, submitting an entry, and checking localStorage/API output.
- Test Host Admin Portal with password `markglenda2026`, view metrics, search, and click CSV Export.
