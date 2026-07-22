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
    <section id="gallery" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center max-w-xl mx-auto mb-12">
        <p className="text-rose-500 tracking-widest uppercase text-xs font-semibold mb-2">Our Moments</p>
        <h2 className="font-serif text-3xl sm:text-4xl text-neutral-800">Photo Gallery</h2>
        <div className="w-12 h-0.5 bg-rose-300 mx-auto mt-4"></div>
      </div>

      {/* Main Carousel Display */}
      <div className="relative max-w-5xl mx-auto group">
        {/* Main Featured Slide */}
        <div className="relative h-[380px] sm:h-[550px] rounded-2xl overflow-hidden glass-card shadow-2xl transition-all">
          <img
            src={galleryImages[currentIndex].url}
            alt={galleryImages[currentIndex].title}
            className="w-full h-full object-cover object-center transition-all duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6 sm:p-10">
            <div className="text-white flex justify-between items-end w-full">
              <div>
                <p className="text-rose-200 text-xs uppercase tracking-widest font-semibold mb-1">Mark & Glenda</p>
                <h3 className="font-serif text-2xl sm:text-3xl font-light">Memory {currentIndex + 1} of {galleryImages.length}</h3>
              </div>
              <button
                onClick={() => openLightbox(currentIndex)}
                className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-all flex items-center gap-2 text-xs font-medium"
              >
                <Maximize2 size={16} /> Enlarge
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={showPrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 backdrop-blur-md text-neutral-800 hover:bg-white shadow-lg transition-all hover:scale-110"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={showNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 backdrop-blur-md text-neutral-800 hover:bg-white shadow-lg transition-all hover:scale-110"
          aria-label="Next Slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Play/Pause Control */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute right-4 top-4 p-2.5 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition-all"
          title={isPlaying ? "Pause Auto-play" : "Start Auto-play"}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
      </div>

      {/* Thumbnail Strip (Moving right to left) */}
      <div className="mt-8 overflow-x-auto pb-4 pt-2 no-scrollbar">
        <div className="flex gap-4 justify-center min-w-max px-4">
          {galleryImages.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => {
                setCurrentIndex(idx);
                setIsPlaying(false);
              }}
              className={`relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300 ${
                currentIndex === idx 
                  ? 'ring-4 ring-rose-400 scale-105 shadow-lg' 
                  : 'opacity-60 hover:opacity-100 hover:scale-95'
              }`}
            >
              <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Continuous Marquee Ticker (Moving Right to Left) */}
      <div className="mt-12 overflow-hidden relative w-full py-4 border-y border-rose-200/40">
        <div className="flex gap-6 animate-marquee whitespace-nowrap min-w-max">
          {[...galleryImages, ...galleryImages].map((img, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx % galleryImages.length)}
              className="w-48 h-32 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer hover:scale-105 transition-all shadow-sm"
            >
              <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4" onClick={closeLightbox}>
          <button onClick={closeLightbox} className="absolute top-6 right-6 text-white/80 hover:text-white p-2">
            <X size={28} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); showPrevLightbox(); }} className="absolute left-4 text-white/80 hover:text-white p-3 bg-white/10 rounded-full hover:bg-white/20">
            <ChevronLeft size={32} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); showNextLightbox(); }} className="absolute right-4 text-white/80 hover:text-white p-3 bg-white/10 rounded-full hover:bg-white/20">
            <ChevronRight size={32} />
          </button>
          <img
            src={galleryImages[selectedIndex].url}
            alt="Enlarged view"
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
