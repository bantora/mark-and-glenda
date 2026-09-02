# Bridal Entourage Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recreate the wedding entourage card as an interactive, responsive React component and embed it before the Event Schedule section with Navbar integration.

**Architecture:** Create an `Entourage.jsx` component that displays the bridal party in grouped glassmorphism cards (Parents, Principal Sponsors, Honored Entourage, Secondary Sponsors, Groomsmen & Bridesmaids, Flower Girls & Banner) styled with mocha/taupe/champagne tones, responsive multi-column layouts, and a lightbox preview for the original card photo.

**Tech Stack:** React 18 / 19, Vite, Lucide React icons, Vanilla CSS with custom properties.

## Global Constraints
- Match the existing color palette (`--mocha-dark`, `--taupe-main`, `--champagne-gold`, etc.)
- Use cursive headers (`font-family: var(--font-cursive)`) with clean readable text for names
- Ensure zero build errors in `npm run build`

---

### Task 1: Asset Preparation

**Files:**
- Create: `public/photos/bridal-entourage.jpg` (copied from source download)

**Interfaces:**
- Produces: `/photos/bridal-entourage.jpg` accessible from web root.

- [ ] **Step 1: Copy the source image to public directory**

Copy `C:\Users\Ryan\Downloads\5e50e196-7c6b-4055-a34e-783cc756b838.jpg` to `C:\Users\Ryan\OneDrive\Desktop\projects\mark-and-glenda\public\photos\bridal-entourage.jpg`.

- [ ] **Step 2: Verify the asset file exists**

Verify `public/photos/bridal-entourage.jpg` is present.

---

### Task 2: Create Entourage Component

**Files:**
- Create: `src/components/Entourage.jsx`

**Interfaces:**
- Produces: `export default function Entourage()` with lightbox modal and responsive party hierarchy.

- [ ] **Step 1: Write `src/components/Entourage.jsx`**

Implement the full entourage layout with exact names, roles, decorative touches, and image zoom modal.

- [ ] **Step 2: Verify component exports correctly**

---

### Task 3: CSS Styles for Bridal Entourage

**Files:**
- Modify: `src/index.css`

**Interfaces:**
- Consumes: `.entourage-section`, `.entourage-card`, `.entourage-grid`, etc.
- Produces: Polished styling matching existing glass cards, smooth hover effects, mobile responsive styling.

- [ ] **Step 1: Add entourage styles to `src/index.css`**

Add CSS rules for the entourage container, card headers, role calligraphy, sponsor columns, and lightbox overlay.

---

### Task 4: Integrate into App and Navbar

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/Navbar.jsx`

**Interfaces:**
- Consumes: `Entourage` component
- Produces: Navigation link `#entourage` and rendered section immediately preceding `<Schedule />`.

- [ ] **Step 1: Update `src/components/Navbar.jsx`**

Add `{ name: 'Entourage', href: '#entourage' }` to `navLinks`.

- [ ] **Step 2: Update `src/App.jsx`**

Import `Entourage` and place `<Entourage />` between `<Hero />` and `<Schedule />`.

---

### Task 5: Build Verification

**Files:**
- Test / Build: `npm run build`

- [ ] **Step 1: Run Vite build**

Run `npm run build` via command runner to verify bundle creation without TypeScript/JSX/syntax errors.

- [ ] **Step 2: Verify all components work seamlessly**
