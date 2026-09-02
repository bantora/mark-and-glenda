# Bridal Entourage Section Design Specification

## Overview
Recreate the physical/digital wedding entourage card (`5e50e196-7c6b-4055-a34e-783cc756b838.jpg`) into a responsive, elegant React component on Mark & Glenda's wedding website, positioned right before the Event Schedule section.

## Goals & Requirements
1. **Accurate Content Re-creation**: Faithfully capture all names and roles from the source card.
2. **Visual Consistency**: Match the site's warm mocha, taupe, and champagne color scheme, serif/cursive typography hierarchy, and glass-card aesthetics.
3. **Responsive Layout**: Provide clean dual-column grid layouts on desktop and tablet, and responsive single-column layouts on mobile.
4. **Interactive Lightbox**: Allow users to click "View Original Card" to view the high-resolution scanned invitation in a lightbox overlay.
5. **Navbar Integration**: Add "Entourage" to the top navigation header (`#entourage`).

## Content Breakdown

### 1. Header
- Subtitle: `Honored Guests & Loved Ones`
- Title: `Bridal Entourage`
- Section Divider + Action: `View Original Card` button opening lightbox modal

### 2. Parents
- **Parents of the Groom**:
  - Poldencio Romano
  - Lilia Romero
- **Parents of the Bride**:
  - Gregorio Gendrano
  - Josephine Gendrano

### 3. Principal Sponsors
- **Left Column**:
  - Betty Oliveros Gendrano
  - Haydee Sarmiento
  - Sally Dianco
  - Graciela Gonzales
  - Annaleen Pimentel
- **Right Column**:
  - Gomercindo Gendrano
  - Sinforoso Sarmiento
  - Rene Dianco
  - Lelet Quiambao
  - Noel Pimentel

### 4. Honored Entourage
- **Best Man**: Mark Lester Morales
- **Maid of Honor**: Gemmalyn Romano

### 5. Secondary Sponsors
- **Candle**: Isagani Galman & Anna Mae Chicote
- **Veil**: Rechlard Gener & Feliza Pineda
- **Cord**: Sha Quiambao & Rosalin Frias
- **Coin**: Kio Zayne Sagsagat
- **Ring**: Gavin Galman
- **Bible**: Lester Gideon Morales

### 6. Wedding Party
- **Groomsmen**:
  - Isagani Galman
  - Rechlard Gener
  - Sha Quiambao
  - Ryan Joson
  - Rico Cañete
- **Bridesmaids**:
  - Anna Mae Chicote
  - Feliza Pineda
  - Rosalin Frias
  - Karissa Ann Manaloto
  - Marleen Rachelle Flores

### 7. Attendants
- **Flower Girls**:
  - Mallory Grazen Romano
  - Mikayla Gianna Romano
- **Banner**:
  - Anelka De Mesa

## File Changes & Architecture

1. **Asset Management**:
   - Copy `C:\Users\Ryan\Downloads\5e50e196-7c6b-4055-a34e-783cc756b838.jpg` to `public/photos/bridal-entourage.jpg`.
2. **New Component**:
   - `src/components/Entourage.jsx` containing the structured card layout and lightbox state.
3. **App Integration**:
   - `src/App.jsx`: Import `Entourage` and place `<Entourage />` above `<Schedule />`.
4. **Navbar Navigation**:
   - `src/components/Navbar.jsx`: Add `{ name: 'Entourage', href: '#entourage' }` at the beginning of `navLinks`.
5. **CSS Styles**:
   - `src/index.css`: Add styles for `.entourage-section`, `.entourage-card`, `.entourage-group`, `.entourage-role`, `.entourage-names`, and responsive adjustments.

## Verification
- Build and run Vite dev / build (`npm run build`).
- Verify smooth scrolling from the navbar to `#entourage`.
- Verify desktop and mobile rendering of all entourage names.
- Verify lightbox popup opens and closes as expected.
