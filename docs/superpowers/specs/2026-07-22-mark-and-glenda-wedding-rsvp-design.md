# Design Specification: Mark & Glenda's Wedding RSVP Website

**Date:** 2026-07-22  
**Status:** Approved with Real Event Data  
**Topic:** Wedding RSVP Website & Host Admin Portal  

---

## 1. Overview & Goals

The objective of this project is to build a modern, high-end, responsive wedding website and interactive RSVP system for **Mark & Glenda**. The website provides guests with event details, countdown, venue locations, schedule, photo gallery, Q&A, wishing well note, and a streamlined RSVP submission experience. Submitted RSVPs are persisted securely using Cloudflare Workers & D1 SQL database, with instant email notification dispatch to the couple and a password-protected Host Admin Dashboard with CSV export capability.

---

## 2. Event Details & Copy

* **Couple**: Mark & Glenda
* **Tagline**: "Invite you to join"
* **Wedding Date**: December 14, 2026 (12.14.26)
* **Ceremony Venue**: Minor Basilica of the National Shrine of Our Lady of Mt. Carmel
  * **Ceremony Time**: 1:30 PM (Guest arrival: 1:00 PM)
* **Reception Venue**: Oasis Manila
* **Wishing Well Note**:
  > "The best gift is celebrating with you. If you wish to honor us with something more, monetary contributions toward our future together would be greatly appreciated."

---

## 3. Visual Design & Aesthetic System

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
  * Live dynamic countdown clock counting down to Dec 14, 2026, 1:30 PM

---

## 4. Core Features & Page Architecture

1. **Glassmorphic Navigation Bar**:
   * Brand initials (`M & G`)
   * Navigation links (*Schedule, Gallery, Details, Gifts, FAQ*)
   * Prominent `RSVP` Action Button

2. **Hero Section**:
   * Header: "Mark & Glenda"
   * Subtitle: "Invite you to join our wedding celebration"
   * Date & Venue display: December 14, 2026
   * Live countdown timer to Dec 14, 2026
   * Primary call-to-action button ("RSVP Now")

3. **Event Schedule Section**:
   * **Ceremony**: 1:30 PM (Arrival at 1:00 PM) @ Minor Basilica of the National Shrine of Our Lady of Mt. Carmel
   * **Reception**: Oasis Manila

4. **Streamlined RSVP Form**:
   * Guest Full Name
   * Email / Phone
   * Attendance Status (*Joyfully Accepts* / *Regretfully Declines*)
   * Guest Count & +1 Name (if attending)
   * Warm Wishes / Personal Note for Mark & Glenda

5. **Photo Gallery**:
   * Elegant photo grid with click-to-enlarge lightbox modal

6. **Wishing Well Section**:
   * Beautifully formatted monetary contribution note as requested

7. **Host Admin Dashboard (Password Protected)**:
   * Accessible via footer link (`/admin` or admin toggle)
   * Overview metrics (Total RSVPs, Attending count, Declined count, Total Guests count)
   * Searchable & filterable guest table
   * 1-click **Export to CSV** function

---

## 5. Technical Architecture & Data Flow

* **Frontend**: React + Vite single page application with CSS Design Tokens
* **Backend API**: Cloudflare Workers API (`/api/rsvp`, `/api/admin/login`, `/api/admin/rsvps`)
* **Database**: Cloudflare D1 SQL Database (`rsvps` table)
* **Email Notifications**: Immediate webhook notification dispatch upon new RSVP submission
* **Host Authentication**: Password-protected session handling for Mark & Glenda's admin dashboard

---
