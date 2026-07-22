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
          scrollContainerRef.current.scrollBy({ left: 280, behavior: 'smooth' });
        }
      }
    }, 3200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const scrollLeftNav = () => {
    setIsPlaying(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRightNav = () => {
    setIsPlaying(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
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
      {/* Background Decorative Botanical Flourish Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100/40 via-transparent to-transparent pointer-events-none"></div>

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
          className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 backdrop-blur-md text-neutral-800 shadow-xl hover:bg-white transition-all hover:scale-110 border border-neutral-100"
          aria-label="Scroll Left"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Navigation Arrow Right */}
        <button
          onClick={scrollRightNav}
          className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 backdrop-blur-md text-neutral-800 shadow-xl hover:bg-white transition-all hover:scale-110 border border-neutral-100"
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

        {/* Horizontal Carousel Track (Tall Vertical Portrait Cards) */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto py-6 px-3 no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {galleryImages.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => openLightbox(idx)}
              className="relative flex-shrink-0 w-[240px] sm:w-[300px] h-[360px] sm:h-[450px] rounded-2xl overflow-hidden glass-card shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.03] cursor-pointer group/card border border-rose-100/60"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-80 group-hover/card:opacity-90 transition-opacity flex items-end p-5">
                <div className="text-white flex justify-between items-end w-full">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-rose-200 font-semibold block mb-0.5">Mark & Glenda</span>
                    <h3 className="font-serif text-lg font-light">Memory {img.id}</h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover/card:bg-white group-hover/card:text-neutral-800 transition-all">
                    <Maximize2 size={14} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Bottom Ticker Strip */}
      <div className="mt-12 overflow-hidden relative w-full py-3 border-y border-rose-200/40">
        <div className="flex gap-4 animate-marquee whitespace-nowrap min-w-max">
          {[...galleryImages, ...galleryImages].map((img, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx % galleryImages.length)}
              className="w-36 h-28 sm:w-44 sm:h-32 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer hover:scale-105 transition-all shadow-sm border border-white/80 bg-neutral-900"
            >
              <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Full Picture Lightbox Modal */}
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
              className="max-h-[80vh] max-w-[85vw] object-contain rounded-xl shadow-2xl"
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
