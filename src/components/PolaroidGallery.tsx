import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const images = [
  {
    id: 1,
    url: "src/components/images/p1.jpeg",
    caption: "Party Vibes! 🎉",
    backText: "Remember this night? We danced until our feet hurt! 💃",
    rotate: -6,
    zIndex: 1
  },
  {
    id: 2,
    url: "src/components/images/p2.jpeg",
    caption: "Sparkle & Shine ✨",
    backText: "You were glowing brighter than the fireworks! 🎆",
    rotate: 4,
    zIndex: 2
  },
  {
    id: 3,
    url: "src/components/images/p3.jpeg",
    caption: "Best Friends Forever 💖",
    backText: "Through thick and thin, always by your side. 👯‍♀️",
    rotate: -3,
    zIndex: 3
  },
  {
    id: 4,
    url: "src/components/images/p4.jpeg",
    caption: "Crazy Times 🤪",
    backText: "Let's promise to never stop being this crazy! 🤪",
    rotate: 5,
    zIndex: 4
  }
];

const PolaroidGallery = () => {
  const containerRef = useRef(null);
  const [flippedId, setFlippedId] = useState<number | null>(null);

  const handleFlip = (id: number) => {
    setFlippedId(flippedId === id ? null : id);
  };

  return (
    <div ref={containerRef} className="relative w-full h-[500px] md:h-[450px] flex items-center justify-center mt-12 perspective-1000 touch-none">
      {images.map((img, index) => (
        <motion.div
          key={img.id}
          drag
          dragConstraints={containerRef}
          whileHover={{ scale: 1.1, zIndex: 100 }}
          whileTap={{ scale: 1.05, zIndex: 100 }}
          initial={{ opacity: 0, y: 50, rotate: 0 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            rotate: flippedId === img.id ? 0 : img.rotate,
            rotateY: flippedId === img.id ? 180 : 0
          }}
          transition={{ duration: 0.6, type: "spring" }}
          onClick={() => handleFlip(img.id)}
          className="absolute w-40 h-52 md:w-52 md:h-64 cursor-grab active:cursor-grabbing preserve-3d"
          style={{
            zIndex: img.zIndex,
            transformStyle: 'preserve-3d',
            // Spread them out slightly initially so they are visible on mobile
            left: `calc(50% - ${img.id % 2 === 0 ? '20px' : '-20px'} - ${window.innerWidth < 768 ? '5rem' : '6.5rem'})`, 
            top: `calc(50% - ${img.id > 2 ? '20px' : '-20px'} - ${window.innerWidth < 768 ? '6.5rem' : '8rem'})`
          }}
        >
          {/* Front Side */}
          <div className="absolute inset-0 bg-white p-2 md:p-3 pb-8 md:pb-10 shadow-xl backface-hidden flex flex-col">
            <div className="w-full h-32 md:h-40 overflow-hidden bg-gray-100 mb-2 md:mb-3 flex-shrink-0">
              <img 
                src={img.url} 
                alt={img.caption} 
                className="w-full h-full object-cover pointer-events-none" 
              />
            </div>
            <p className="text-center font-handwriting text-gray-800 text-xs md:text-sm font-semibold mt-auto">
              {img.caption}
            </p>
          </div>

          {/* Back Side */}
          <div 
            className="absolute inset-0 bg-[#f8f8f8] p-4 md:p-6 shadow-xl backface-hidden flex items-center justify-center text-center border-2 border-dashed border-gray-300 transform rotate-y-180"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <p className="font-handwriting text-gray-600 text-sm md:text-lg leading-relaxed">
              "{img.backText}"
            </p>
          </div>
        </motion.div>
      ))}
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-0 md:-bottom-10 text-white/50 text-xs md:text-sm italic"
      >
        (Drag photos & Tap to flip them!)
      </motion.p>
    </div>
  );
};

export default PolaroidGallery;
