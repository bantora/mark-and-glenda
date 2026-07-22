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
  const [currentIndex, setCurrentIndex] = useState(0);

  const showNextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  }, []);

  const showPrevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(showNextSlide, 3500);
    return () => clearInterval(interval);
  }, [isPlaying, showNextSlide]);

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

  return (
    <section id="gallery" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden">
      <div className="text-center max-w-xl mx-auto mb-8">
        <p className="text-rose-500 tracking-widest uppercase text-xs font-semibold mb-2">Our Moments</p>
        <h2 className="font-serif text-3xl sm:text-4xl text-neutral-800">Photo Gallery</h2>
        <div className="w-12 h-0.5 bg-rose-300 mx-auto mt-4"></div>
      </div>

      {/* Compact Featured Photo Display */}
      <div className="relative max-w-3xl mx-auto group">
        <div className="relative h-[280px] sm:h-[420px] rounded-2xl overflow-hidden glass-card shadow-xl bg-neutral-900 flex items-center justify-center">
          <img
            src={galleryImages[currentIndex].url}
            alt={galleryImages[currentIndex].title}
            className="w-full h-full object-contain transition-all duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4 sm:p-6 pointer-events-none">
            <div className="text-white flex justify-between items-end w-full pointer-events-auto">
              <div>
                <p className="text-rose-300 text-[11px] uppercase tracking-widest font-semibold">Mark & Glenda</p>
                <p className="font-serif text-lg sm:text-xl font-light">Photo {currentIndex + 1} of {galleryImages.length}</p>
              </div>
              <button
                onClick={() => openLightbox(currentIndex)}
                className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-all flex items-center gap-1.5 text-xs font-medium"
              >
                <Maximize2 size={14} /> Full View
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={showPrevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 backdrop-blur-md text-neutral-800 hover:bg-white shadow-md transition-all hover:scale-105"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={showNextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 backdrop-blur-md text-neutral-800 hover:bg-white shadow-md transition-all hover:scale-105"
          aria-label="Next Slide"
        >
          <ChevronRight size={20} />
        </button>

        {/* Play/Pause Control */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute right-3 top-3 p-2 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70 transition-all"
          title={isPlaying ? "Pause Auto-play" : "Start Auto-play"}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </button>
      </div>

      {/* Compact Thumbnail Navigation Strip */}
      <div className="mt-6 overflow-x-auto pb-2 pt-1 no-scrollbar">
        <div className="flex gap-3 justify-center min-w-max px-2">
          {galleryImages.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => {
                setCurrentIndex(idx);
                setIsPlaying(false);
              }}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300 ${
                currentIndex === idx 
                  ? 'ring-3 ring-rose-400 scale-105 shadow-md' 
                  : 'opacity-50 hover:opacity-100'
              }`}
            >
              <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Smooth Continuous Marquee Ticker (Moving Right to Left) */}
      <div className="mt-10 overflow-hidden relative w-full py-3 border-y border-rose-200/40">
        <div className="flex gap-4 animate-marquee whitespace-nowrap min-w-max">
          {[...galleryImages, ...galleryImages].map((img, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx % galleryImages.length)}
              className="w-36 h-24 sm:w-44 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer hover:scale-105 transition-all shadow-sm border border-white/60 bg-neutral-900"
            >
              <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4" onClick={closeLightbox}>
          <button onClick={closeLightbox} className="absolute top-4 right-4 text-white/80 hover:text-white p-2">
            <X size={24} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); showPrevLightbox(); }} className="absolute left-3 text-white/80 hover:text-white p-2.5 bg-white/10 rounded-full hover:bg-white/20">
            <ChevronLeft size={28} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); showNextLightbox(); }} className="absolute right-3 text-white/80 hover:text-white p-2.5 bg-white/10 rounded-full hover:bg-white/20">
            <ChevronRight size={28} />
          </button>
          <img
            src={galleryImages[selectedIndex].url}
            alt="Enlarged view"
            className="max-h-[80vh] max-w-[85vw] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
