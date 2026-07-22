import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Camera, Heart } from 'lucide-react';

const galleryImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    title: 'Golden Hour Romance',
    category: 'Pre-Wedding',
    caption: 'Hand in hand under the golden hour sky.'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    title: 'Eternal Vows',
    category: 'Ceremony',
    caption: 'Promising forever in front of our loved ones.'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    title: 'First Dance',
    category: 'Reception',
    caption: 'Lost in the rhythm of our love song.'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
    title: 'Warm Embraces',
    category: 'Portraits',
    caption: 'Capturing the quiet, cherished moments together.'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
    title: 'Forever & Always',
    category: 'Pre-Wedding',
    caption: 'Walking together into our next beautiful chapter.'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80',
    title: 'The Celebration',
    category: 'Reception',
    caption: 'Surrounded by joy, laughter, and endless love.'
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    title: 'Pure Happiness',
    category: 'Portraits',
    caption: 'Unfiltered joy on our special day.'
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80',
    title: 'Sunset Whispers',
    category: 'Pre-Wedding',
    caption: 'Watching the horizon as one.'
  }
];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Pre-Wedding', 'Ceremony', 'Reception', 'Portraits'];

  const filteredImages = activeFilter === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeFilter);

  const openLightbox = (index) => {
    setSelectedIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const showNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev + 1) % filteredImages.length);
  }, [selectedIndex, filteredImages.length]);

  const showPrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  }, [selectedIndex, filteredImages.length]);

  // Lock body scroll and set up keyboard listeners when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedIndex, closeLightbox, showNext, showPrev]);

  return (
    <section id="gallery" className="gallery-section">
      <div className="section-header">
        <p className="section-subtitle">Our Moments</p>
        <h2 className="section-title font-serif">Photo Gallery</h2>
        <div className="section-divider"></div>
      </div>

      {/* Category Filter Tabs */}
      <div className="gallery-filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`gallery-filter-btn ${activeFilter === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry / Responsive Image Grid */}
      <div className="gallery-masonry">
        {filteredImages.map((image, idx) => (
          <div
            key={image.id}
            className="gallery-item glass-card"
            onClick={() => openLightbox(idx)}
            role="button"
            tabIndex={0}
            aria-label={`View photo: ${image.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(idx);
              }
            }}
          >
            <div className="gallery-image-wrapper">
              <img
                src={image.url}
                alt={image.title}
                loading="lazy"
                className="gallery-image"
              />
              <div className="gallery-overlay">
                <div className="gallery-overlay-icon">
                  <Maximize2 size={24} />
                </div>
                <div className="gallery-overlay-content">
                  <span className="gallery-category-badge">{image.category}</span>
                  <h3 className="gallery-item-title font-serif">{image.title}</h3>
                  <p className="gallery-item-caption">{image.caption}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Lightbox Modal */}
      {selectedIndex !== null && filteredImages[selectedIndex] && (
        <div
          className="lightbox-backdrop"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Photo Lightbox"
        >
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="lightbox-close-btn"
              aria-label="Close Lightbox"
            >
              <X size={24} />
            </button>

            {/* Prev Button */}
            <button
              onClick={showPrev}
              className="lightbox-nav-btn lightbox-prev-btn"
              aria-label="Previous Image"
            >
              <ChevronLeft size={32} />
            </button>

            {/* Next Button */}
            <button
              onClick={showNext}
              className="lightbox-nav-btn lightbox-next-btn"
              aria-label="Next Image"
            >
              <ChevronRight size={32} />
            </button>

            {/* Image Preview */}
            <div className="lightbox-image-container">
              <img
                src={filteredImages[selectedIndex].url}
                alt={filteredImages[selectedIndex].title}
                className="lightbox-image"
              />
            </div>

            {/* Lightbox Footer Info */}
            <div className="lightbox-footer">
              <div className="lightbox-counter">
                <Camera size={16} />
                <span>
                  {selectedIndex + 1} / {filteredImages.length}
                </span>
              </div>
              <h3 className="lightbox-title font-serif">
                {filteredImages[selectedIndex].title}
              </h3>
              <p className="lightbox-caption">
                {filteredImages[selectedIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
