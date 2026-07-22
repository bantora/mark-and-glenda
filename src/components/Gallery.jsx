import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  const scrollContainerRef = useRef(null);

  // Auto-scroll loop moving right-to-left continuously
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }
    }, 3200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const scrollLeftNav = () => {
    setIsPlaying(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRightNav = () => {
    setIsPlaying(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

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
    <section id="gallery" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto relative overflow-hidden bg-[#FAF7F2]">
      <div className="text-center max-w-xl mx-auto mb-10 relative z-10">
        <p className="text-rose-500 tracking-[0.2em] uppercase text-xs font-semibold mb-2">Our Moments</p>
        <h2 className="font-serif text-3xl sm:text-4xl text-neutral-800 tracking-tight">Photo Gallery</h2>
        <div className="w-12 h-0.5 bg-rose-300 mx-auto mt-4"></div>
      </div>

      {/* Editorial Vertical Card Carousel Container */}
      <div className="relative max-w-6xl mx-auto group">
        {/* Navigation Arrow Left */}
        <button
          onClick={scrollLeftNav}
          className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 backdrop-blur-md text-neutral-800 shadow-xl hover:bg-white transition-all hover:scale-110 border border-neutral-100"
          aria-label="Scroll Left"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Navigation Arrow Right */}
        <button
          onClick={scrollRightNav}
          className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 backdrop-blur-md text-neutral-800 shadow-xl hover:bg-white transition-all hover:scale-110 border border-neutral-100"
          aria-label="Scroll Right"
        >
          <ChevronRight size={22} />
        </button>

        {/* Auto-play toggle button */}
        <div className="flex justify-end mb-4 pr-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-100/70 text-rose-700 hover:bg-rose-200/80 transition-all"
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            <span>{isPlaying ? 'Pause Motion' : 'Play Motion'}</span>
          </button>
        </div>

        {/* Horizontal Carousel Track (Fixed Strict Portrait Cards) */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto py-6 px-3 no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {galleryImages.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => openLightbox(idx)}
              className="gallery-card-item glass-card shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03]"
            >
              <img
                src={img.url}
                alt={img.title}
                className="gallery-card-img"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-80 hover:opacity-95 transition-opacity flex items-end p-4 pointer-events-none">
                <div className="text-white flex justify-between items-end w-full">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-rose-200 font-semibold block mb-0.5">Mark & Glenda</span>
                    <h3 className="font-serif text-base font-light">Memory {img.id}</h3>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <Maximize2 size={13} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal (Full Photo Preview) */}
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
