import React, { useState, useEffect, useCallback } from 'react';

const galleryImages = [
  { id: 1, url: '/photos/XH1S0300.jpg', tilt: '-rotate-2 hover:rotate-0' },
  { id: 2, url: '/photos/XH1S0357.jpg', tilt: 'rotate-3 hover:rotate-0' },
  { id: 3, url: '/photos/XH1S0455.jpg', tilt: '-rotate-2 hover:rotate-0' },
  { id: 4, url: '/photos/XH1S0470.jpg', tilt: 'rotate-2 hover:rotate-0' },
  { id: 5, url: '/photos/XH1S0482.jpg', tilt: '-rotate-3 hover:rotate-0' },
  { id: 6, url: '/photos/XH1S0495.jpg', tilt: 'rotate-2 hover:rotate-0' },
  { id: 7, url: '/photos/XH1S0508.jpg', tilt: '-rotate-2 hover:rotate-0' }
];

export default function Gallery() {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % galleryImages.length);
  }, []);

  // Automatic slide rotation every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Get 3 visible card indices
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
      <div className="text-center max-w-xl mx-auto mb-10 relative z-10">
        <p className="text-rose-500 tracking-[0.2em] uppercase text-xs font-semibold mb-2">Our Moments</p>
        <h2 className="font-serif text-3xl sm:text-4xl text-neutral-800 tracking-tight">Photo Gallery</h2>
        <div className="w-12 h-0.5 bg-rose-300 mx-auto mt-4"></div>
      </div>

      {/* Centered Row Carousel (Strict CSS Constraints) */}
      <div className="w-full max-w-5xl mx-auto py-2">
        <div className="gallery-carousel-row">
          {getVisibleCards().map(({ index, position }) => {
            const img = galleryImages[index];
            const isCenter = position === 'center';

            return (
              <div
                key={`${img.id}-${position}`}
                className={`desk-photo-frame ${img.tilt} ${
                  isCenter ? 'is-active-card' : 'is-side-card'
                }`}
              >
                <div className="photo-inner-wrapper">
                  <img
                    src={img.url}
                    alt="Mark & Glenda"
                    className="desk-photo-img"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Minimalist Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {galleryImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-2 rounded-full transition-all duration-500 ${
                activeSlide === idx ? 'w-6 bg-rose-400' : 'w-2 bg-rose-200'
              }`}
              aria-label={`Go to photo ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
