import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Pause, Play } from 'lucide-react';

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
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % galleryImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

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

  // Helper to get 3 visible indices for 3-card carousel display
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
    <section id="gallery" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto relative overflow-hidden bg-[#FAF7F2]">
      <div className="text-center max-w-xl mx-auto mb-8 relative z-10">
        <p className="text-rose-500 tracking-[0.2em] uppercase text-xs font-semibold mb-2">Our Moments</p>
        <h2 className="font-serif text-3xl sm:text-4xl text-neutral-800 tracking-tight">Photo Gallery</h2>
        <div className="w-12 h-0.5 bg-rose-300 mx-auto mt-4"></div>
      </div>

      {/* 3-Card Carousel Container */}
      <div className="relative max-w-5xl mx-auto py-6">
        {/* Previous Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-full bg-white/90 backdrop-blur-md text-neutral-800 shadow-xl hover:bg-white transition-all hover:scale-110 border border-neutral-200"
          aria-label="Previous Photo"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Next Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-full bg-white/90 backdrop-blur-md text-neutral-800 shadow-xl hover:bg-white transition-all hover:scale-110 border border-neutral-200"
          aria-label="Next Photo"
        >
          <ChevronRight size={24} />
        </button>

        {/* Play/Pause Toggle */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-rose-100/80 text-rose-700 hover:bg-rose-200 transition-all shadow-sm"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            <span>{isPlaying ? 'Pause Carousel' : 'Auto Play Carousel'}</span>
          </button>
        </div>

        {/* 3-Card Carousel Track */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 min-h-[380px] sm:min-h-[460px]">
          {getVisibleCards().map(({ index, position }) => {
            const img = galleryImages[index];
            const isCenter = position === 'center';

            return (
              <div
                key={`${img.id}-${position}`}
                onClick={() => isCenter ? openLightbox(index) : setActiveSlide(index)}
                className={`gallery-card-item glass-card shadow-xl transition-all duration-500 ease-out cursor-pointer ${
                  isCenter
                    ? 'z-20 scale-105 ring-4 ring-rose-300 shadow-2xl'
                    : 'hidden sm:block opacity-60 scale-90 hover:opacity-90'
                }`}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="gallery-card-img"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-85 transition-opacity flex items-end p-4 pointer-events-none">
                  <div className="text-white flex justify-between items-end w-full">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-rose-200 font-semibold block mb-0.5">Mark & Glenda</span>
                      <h3 className="font-serif text-base font-light">Photo {index + 1} of {galleryImages.length}</h3>
                    </div>
                    {isCenter && (
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                        <Maximize2 size={14} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {galleryImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveSlide(idx);
                setIsPlaying(false);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeSlide === idx ? 'w-8 bg-rose-400' : 'w-2.5 bg-rose-200 hover:bg-rose-300'
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
