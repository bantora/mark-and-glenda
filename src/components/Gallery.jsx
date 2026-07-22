import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  { id: 1, url: '/photos/XH1S0300.jpg', title: 'Mark & Glenda' },
  { id: 2, url: '/photos/XH1S0357.jpg', title: 'Mark & Glenda' },
  { id: 3, url: '/photos/XH1S0455.jpg', title: 'Mark & Glenda' },
  { id: 4, url: '/photos/XH1S0470.jpg', title: 'Mark & Glenda' },
  { id: 5, url: '/photos/XH1S0482.jpg', title: 'Mark & Glenda' },
  { id: 6, url: '/photos/XH1S0495.jpg', title: 'Mark & Glenda' },
  { id: 7, url: '/photos/XH1S0508.jpg', title: 'Mark & Glenda' }
];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % galleryImages.length);
  }, []);

  // Automatic Carousel Play loop every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const openLightbox = (index) => {
    setSelectedIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const showNextLightbox = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev + 1) % galleryImages.length);
  }, [selectedIndex]);

  const showPrevLightbox = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNextLightbox();
        if (e.key === 'ArrowLeft') showPrevLightbox();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedIndex, closeLightbox, showNextLightbox, showPrevLightbox]);

  // Helper to get 3 visible cards for centered horizontal carousel
  const getVisibleCards = () => {
    const total = galleryImages.length;
    const prev = (activeSlide - 1 + total) % total;
    const next = (activeSlide + 1) % total;
    return [
      { index: prev, position: 'left' },
      { index: activeSlide, position: 'center' },
      { index: next, position: 'right' }
    ];
  };

  return (
    <section id="gallery" className="py-16 px-4 sm:px-8 max-w-6xl mx-auto relative overflow-hidden bg-[#FAF7F2]">
      <div className="text-center max-w-xl mx-auto mb-8 relative z-10">
        <p className="text-rose-500 tracking-[0.2em] uppercase text-xs font-semibold mb-2">Our Moments</p>
        <h2 className="font-serif text-3xl sm:text-4xl text-neutral-800 tracking-tight">Photo Gallery</h2>
        <div className="w-12 h-0.5 bg-rose-300 mx-auto mt-4"></div>
      </div>

      {/* Pure Automatic Centered Row Carousel */}
      <div className="w-full max-w-4xl mx-auto py-2">
        {/* Horizontal Card Track */}
        <div className="gallery-carousel-track">
          {getVisibleCards().map(({ index, position }) => {
            const img = galleryImages[index];
            const isCenter = position === 'center';

            return (
              <div
                key={`${img.id}-${position}`}
                onClick={() => isCenter ? openLightbox(index) : setActiveSlide(index)}
                className={`gallery-card-item glass-card shadow-xl transition-all duration-700 ease-in-out ${
                  isCenter
                    ? 'z-20 scale-105 ring-4 ring-rose-300 shadow-2xl opacity-100'
                    : 'hidden sm:block opacity-60 scale-90 hover:opacity-90'
                }`}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="gallery-card-img"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 transition-opacity flex items-end p-4 pointer-events-none">
                  <div className="text-white w-full">
                    <span className="text-[10px] uppercase tracking-widest text-rose-200 font-semibold block mb-0.5">Mark & Glenda</span>
                    <h3 className="font-serif text-base font-light">Memory {index + 1} of {galleryImages.length}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Minimalist Pagination Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {galleryImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-2 rounded-full transition-all duration-500 ${
                activeSlide === idx ? 'w-6 bg-rose-400' : 'w-2 bg-rose-200 hover:bg-rose-300'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button onClick={closeLightbox} className="absolute top-4 right-4 text-white/80 hover:text-white p-2">
            <X size={28} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); showPrevLightbox(); }} className="absolute left-3 text-white/80 hover:text-white p-3 bg-white/10 rounded-full hover:bg-white/20">
            <ChevronLeft size={30} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); showNextLightbox(); }} className="absolute right-3 text-white/80 hover:text-white p-3 bg-white/10 rounded-full hover:bg-white/20">
            <ChevronRight size={30} />
          </button>
          
          <div className="relative max-h-[85vh] max-w-[90vw] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryImages[selectedIndex].url}
              alt="Full size view"
              style={{ maxWidth: '80vw', maxHeight: '80vh', objectFit: 'contain' }}
              className="rounded-xl shadow-2xl"
            />
            <div className="mt-3 text-center text-white">
              <p className="font-serif text-lg font-light">Mark & Glenda — Photo {selectedIndex + 1} of {galleryImages.length}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
