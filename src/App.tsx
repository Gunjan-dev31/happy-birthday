import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart } from 'lucide-react';
import StarField from './components/StarField';
import MusicPlayer, { MusicPlayerHandle } from './components/MusicPlayer';
import BirthdayLetter from './components/BirthdayLetter';
import SparkleCursor from './components/SparkleCursor';
import FloatingBalloons from './components/FloatingBalloons';
import FireworkButton from './components/FireworkButton';

// Floating Heart Component
const FloatingHeart = ({ id, x, y }: { id: number; x: number; y: number }) => (
  <motion.div
    initial={{ opacity: 1, y: 0, scale: 0 }}
    animate={{ opacity: 0, y: -150, scale: 2, rotate: Math.random() * 360 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 2.5, ease: "easeOut" }}
    style={{ left: x, top: y }}
    className="fixed pointer-events-none text-pink-500 z-50 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]"
  >
    <Heart className="w-8 h-8 fill-current" />
  </motion.div>
);

function App() {
  const [entered, setEntered] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const musicPlayerRef = useRef<MusicPlayerHandle>(null);

  // Handle click to spawn hearts
  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (!entered) return;
    
    let clientX, clientY;
    if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        clientX = (e as React.MouseEvent).clientX;
        clientY = (e as React.MouseEvent).clientY;
    }

    const newHeart = { id: Date.now(), x: clientX, y: clientY };
    setHearts(prev => [...prev, newHeart]);
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 2500);
  };

  const handleEnter = () => {
    setEntered(true);
    // Trigger audio immediately on user interaction for iOS support
    if (musicPlayerRef.current) {
        musicPlayerRef.current.play();
    }
  };

  return (
    <div 
      onClick={entered ? (e) => handleClick(e) : undefined}
      className={`min-h-screen bg-[#050511] text-white font-sans relative selection:bg-purple-500 selection:text-white ${entered ? 'overflow-y-auto overflow-x-hidden' : 'overflow-hidden'}`}
    >
      <SparkleCursor />
      <StarField />
      
      {/* Background Elements - Fixed */}
      <div className="fixed inset-0 pointer-events-none z-0">
         {entered && <FloatingBalloons />}
         <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] animate-pulse" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] animate-pulse" />
      </div>

      {entered && <FireworkButton />}
      <MusicPlayer ref={musicPlayerRef} />

      {/* Floating Hearts Container */}
      {hearts.map(heart => (
        <FloatingHeart key={heart.id} {...heart} />
      ))}

      <AnimatePresence mode="wait">
        {!entered ? (
          <motion.div 
            key="entrance"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 2, filter: "blur(20px)" }}
            transition={{ duration: 1 }}
            className="h-screen flex flex-col items-center justify-center relative z-10 px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-center space-y-8 md:space-y-12"
            >
              <div className="relative">
                 <div className="absolute inset-0 bg-purple-500/30 blur-[50px] rounded-full"></div>
                 <h1 className="relative text-4xl md:text-7xl font-light text-white tracking-wide drop-shadow-2xl">
                    For <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">Prathvi</span>
                 </h1>
              </div>
              
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEnter();
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="group relative px-8 py-4 md:px-12 md:py-6 bg-transparent overflow-hidden rounded-full cursor-pointer mx-auto block touch-manipulation"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-80 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-40 group-hover:opacity-60 transition-opacity duration-300 rounded-full border border-white/30" />
                
                <span className="relative flex items-center justify-center gap-3 text-xl md:text-2xl font-medium tracking-widest uppercase text-white">
                  <Gift className="w-6 h-6 animate-bounce" />
                  Tap to Begin
                </span>
                
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-500 opacity-30 blur-lg group-hover:opacity-50 transition-opacity duration-500 rounded-full"></div>
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="min-h-screen py-10 px-4 flex items-center justify-center relative z-10"
          >
            <BirthdayLetter />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
