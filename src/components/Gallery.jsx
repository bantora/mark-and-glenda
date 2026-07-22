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

  // Pure Automatic Carousel Play loop every 3.2 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 3200);
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
    <section id="gallery" className="py-20 px-4 sm:px-8 max-w-6xl mx-auto relative overflow-hidden bg-[#FAF7F2]">
      <div className="text-center max-w-xl mx-auto mb-10 relative z-10">
        <p className="text-rose-500 tracking-[0.2em] uppercase text-xs font-semibold mb-2">Our Moments</p>
        <h2 className="font-serif text-3xl sm:text-4xl text-neutral-800 tracking-tight">Photo Gallery</h2>
        <div className="w-12 h-0.5 bg-rose-300 mx-auto mt-4"></div>
      </div>

      {/* Pure Automatic Centered Printed Photograph Carousel */}
      <div className="w-full max-w-5xl mx-auto py-2">
        {/* Horizontal Card Track */}
        <div className="gallery-carousel-track">
          {getVisibleCards().map(({ index, position }) => {
            const img = galleryImages[index];
            const isCenter = position === 'center';

            return (
              <div
                key={`${img.id}-${position}`}
                className={`gallery-card-item ${
                  isCenter
                    ? 'z-20 scale-105 shadow-2xl ring-2 ring-rose-200 opacity-100'
                    : 'hidden sm:flex opacity-65 scale-90'
                }`}
              >
                {/* Uncropped Full Scale Image inside Photograph Frame */}
                <div className="w-full h-[330px] sm:h-[340px] flex items-center justify-center overflow-hidden bg-[#FAF7F2] rounded-md border border-neutral-100">
                  <img
                    src={img.url}
                    alt={img.title}
                    className="gallery-card-img"
                  />
                </div>
                {/* Physical Printed Photograph Bottom Margin & Label */}
                <div className="pt-2 text-center">
                  <p className="font-serif italic text-xs text-neutral-600 tracking-wider">
                    Mark & Glenda — Photo {index + 1}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Minimalist Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
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
