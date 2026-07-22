# Design Specification: Mark & Glenda's Wedding RSVP Website

**Date:** 2026-07-22  
**Status:** Approved  
**Topic:** Wedding RSVP Website & Host Admin Portal  

---

## 1. Overview & Goals

The objective of this project is to build a modern, high-end, responsive wedding website and interactive RSVP system for **Mark & Glenda**. The website provides guests with event details, countdown, venue location, story timeline, photo gallery, Q&A, and a streamlined RSVP submission experience. Submitted RSVPs are persisted securely using Cloudflare Workers & D1 SQL database, with instant email notification dispatch to the couple and a password-protected Host Admin Dashboard with CSV export capability.

---

## 2. Visual Design & Aesthetic System

* **Theme**: Modern Romantic & Botanical Floral
* **Color Palette**:
  * Primary Background: Warm Off-White / Soft Cream (`#FAF7F2`)
  * Romantic Accent: Soft Blush Rose (`#E8D3CE` & `#D4A398`)
  * Botanical Accent: Soft Sage Green (`#7B8D7C` & `#A3B19B`)
  * Text & Headings: Deep Warm Charcoal (`#2C2A29`)
  * Cards & Modals: Glassmorphism Translucent White (`rgba(255, 255, 255, 0.85)`)
* **Typography**:
  * Headings / Names: *Playfair Display* / *Cormorant Garamond* (Serif Editorial)
  * Body / UI Controls: *Inter* / *Plus Jakarta Sans* (Clean Modern Sans-Serif)
* **Animations**:
  * Micro-animations for floral leaf accents and button hovers
  * Smooth fade-in scroll reveals
  * Live dynamic countdown clock (Days, Hours, Minutes, Seconds)

---

## 3. Core Features & Page Architecture

1. **Glassmorphic Navigation Bar**:
   * Brand initials (`M & G`)
   * Navigation links (*Our Story, Details, Gallery, FAQ*)
   * Prominent `RSVP` Action Button

2. **Hero Section**:
   * Header: "Mark & Glenda are getting married!"
   * Date & Venue display
   * Live countdown timer
   * Primary call-to-action button ("RSVP Now")

3. **Our Story Timeline**:
   * Interactive vertical milestone card sequence (*How We Met, First Date, The Proposal, The Wedding Day*)

4. **Event Details & Schedule**:
   * Ceremony & Reception schedule cards
   * Address, Google Maps link, dress code, parking/transportation details

5. **Streamlined RSVP Form**:
   * Guest Full Name
   * Email / Phone
   * Attendance Status (*Joyfully Accepts* / *Regretfully Declines*)
   * Guest Count & +1 Name (if attending)
   * Warm Wishes / Personal Note for Mark & Glenda

6. **Photo Gallery**:
   * Masonry image grid with click-to-enlarge lightbox modal

7. **Wishing Well & FAQ Accordion**:
   * Gift registry / wishing well note
   * Expandable Q&A section for guest inquiries

8. **Host Admin Dashboard (Password Protected)**:
   * Accessible via footer link (`/admin` or admin toggle)
   * Overview metrics (Total RSVPs, Attending count, Declined count, Total Guests count)
   * Searchable & filterable guest table
   * 1-click **Export to CSV** function

---

## 4. Technical Architecture & Data Flow

* **Frontend**: React + Vite single page application with CSS Design Tokens
* **Backend API**: Cloudflare Workers API (`/api/rsvp`, `/api/admin/login`, `/api/admin/rsvps`)
* **Database**: Cloudflare D1 SQL Database (`rsvps` table)
* **Email Notifications**: Immediate webhook notification dispatch upon new RSVP submission
* **Host Authentication**: Password-protected session handling for Mark & Glenda's admin dashboard

### D1 Database Schema (`rsvps` table)
```sql
CREATE TABLE IF NOT EXISTS rsvps (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  attending INTEGER NOT NULL, -- 1 for Attending, 0 for Declined
  guest_count INTEGER NOT NULL DEFAULT 1,
  plus_one_name TEXT,
  message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 5. Deployment & Configuration

* **Frontend Hosting**: Cloudflare Pages / Static deployment
* **API & Database**: Cloudflare Worker + D1 Database binding via `wrangler.jsonc` / `wrangler.toml`

---
