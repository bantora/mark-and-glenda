import React, { useState, useEffect, useCallback } from 'react';

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
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % galleryImages.length);
  }, []);

  // Pure Automatic Carousel Play loop every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

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

      {/* Pure Automatic Centered Row Carousel (No Click / No Lightbox) */}
      <div className="w-full max-w-4xl mx-auto py-2">
        {/* Horizontal Card Track */}
        <div className="gallery-carousel-track">
          {getVisibleCards().map(({ index, position }) => {
            const img = galleryImages[index];
            const isCenter = position === 'center';

            return (
              <div
                key={`${img.id}-${position}`}
                className={`gallery-card-item glass-card shadow-xl transition-all duration-700 ease-in-out ${
                  isCenter
                    ? 'z-20 scale-105 ring-4 ring-rose-300 shadow-2xl opacity-100'
                    : 'hidden sm:block opacity-60 scale-90'
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
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-500 ${
                activeSlide === idx ? 'w-6 bg-rose-400' : 'w-2 bg-rose-200'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
