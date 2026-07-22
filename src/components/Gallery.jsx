import React from 'react';

const galleryImages = [
  { id: 1, url: '/photos/XH1S0300.jpg', tilt: '-rotate-3 hover:rotate-0' },
  { id: 2, url: '/photos/XH1S0357.jpg', tilt: 'rotate-4 hover:rotate-0' },
  { id: 3, url: '/photos/XH1S0455.jpg', tilt: '-rotate-2 hover:rotate-0' },
  { id: 4, url: '/photos/XH1S0470.jpg', tilt: 'rotate-3 hover:rotate-0' },
  { id: 5, url: '/photos/XH1S0482.jpg', tilt: '-rotate-4 hover:rotate-0' },
  { id: 6, url: '/photos/XH1S0495.jpg', tilt: 'rotate-2 hover:rotate-0' },
  { id: 7, url: '/photos/XH1S0508.jpg', tilt: '-rotate-3 hover:rotate-0' }
];

export default function Gallery() {
  // Duplicate array 3 times for a seamless, continuous infinite ticker loop
  const loopImages = [...galleryImages, ...galleryImages, ...galleryImages];

  return (
    <section id="gallery" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto relative overflow-hidden bg-[#FAF7F2]">
      {/* Background Section Header */}
      <div className="text-center max-w-xl mx-auto mb-12 relative z-10">
        <p className="text-rose-500 tracking-[0.25em] uppercase text-xs font-semibold mb-2">Our Moments</p>
        <h2 className="font-serif text-3xl sm:text-4xl text-neutral-800 tracking-tight">Photo Gallery</h2>
        <div className="w-12 h-0.5 bg-rose-300 mx-auto mt-4"></div>
      </div>

      {/* Slow Continuous Right-to-Left Ticker Track */}
      <div className="relative w-full overflow-hidden py-8">
        <div className="gallery-slow-marquee flex items-center gap-8 whitespace-nowrap min-w-max">
          {loopImages.map((img, idx) => (
            <div
              key={`${img.id}-${idx}`}
              className={`gallery-desk-photo ${img.tilt} transition-all duration-500 ease-out flex-shrink-0`}
            >
              {/* Printed Photograph Matting & Full Scale Image */}
              <div className="w-full h-full p-3 bg-white rounded-lg shadow-xl hover:shadow-2xl border border-neutral-200/80 flex items-center justify-center bg-white">
                <img
                  src={img.url}
                  alt="Mark & Glenda"
                  className="max-w-full max-h-full object-contain rounded-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
