import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, PartyPopper, Cake as CakeIcon, Smile, Camera } from 'lucide-react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import InteractiveCake from './InteractiveCake';
import ThreeDCard from './ThreeDCard';
import TypewriterText from './TypewriterText';
import PolaroidGallery from './PolaroidGallery';
import GiftBox from './GiftBox';

const BirthdayLetter = () => {
  const [step, setStep] = useState<'intro' | 'gift' | 'cake' | 'message' | 'gallery'>('intro');
  const { width, height } = useWindowSize();

  const handleBlowout = () => {
    setStep('message');
  };

  return (
    <div className="w-full max-w-4xl mx-auto relative z-20 px-4 py-8 pb-32">
      {step === 'message' && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={1000}
            gravity={0.12}
            colors={['#FFD700', '#FF69B4', '#00FFFF', '#FF4500', '#FFFFFF']}
          />
        </div>
      )}

      <ThreeDCard>
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center relative z-10">
          
          <AnimatePresence mode="wait">
            {step === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6 md:space-y-8 w-full"
              >
                <div className="inline-block relative">
                   <div className="absolute inset-0 bg-pink-500 blur-2xl opacity-20 animate-pulse rounded-full"></div>
                   <div className="relative p-4 md:p-5 rounded-full bg-gradient-to-tr from-purple-500/80 to-pink-600/80 shadow-2xl mb-2 border border-white/20">
                     <CakeIcon className="w-10 h-10 md:w-14 md:h-14 text-white drop-shadow-md" />
                   </div>
                </div>
                
                <div className="space-y-2">
                    <h1 className="text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200 font-serif tracking-tight drop-shadow-lg leading-tight">
                    Happy Birthday!
                    </h1>
                    <h2 className="text-2xl md:text-5xl text-white font-light mt-2 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
                        Prathvi 
                        <motion.span 
                            animate={{ 
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0],
                                color: ["#F472B6", "#FBBF24", "#F472B6"]
                            }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                            className="font-bold text-pink-400 drop-shadow-[0_0_15px_rgba(255,105,180,0.8)] cursor-pointer"
                        >
                            "Fatakdi" 🧨
                        </motion.span>
                    </h2>
                </div>

                <div className="bg-white/5 rounded-xl p-4 md:p-6 backdrop-blur-sm border border-white/10 max-w-lg mx-auto shadow-inner">
                    <p className="text-base md:text-lg text-white/90 leading-relaxed font-light italic">
                    "A wish for the girl who lights up every room she enters..."
                    </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(236, 72, 153, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep('gift')}
                  className="mt-8 px-8 py-3 md:px-10 md:py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold text-base md:text-lg shadow-xl border border-white/20 flex items-center gap-3 mx-auto transition-all"
                >
                  <Gift className="w-5 h-5 md:w-6 md:h-6 animate-bounce" />
                  Open Your Gift
                </motion.button>
              </motion.div>
            )}

            {step === 'gift' && (
              <motion.div
                key="gift"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
                className="py-10 w-full flex flex-col items-center"
              >
                 <h3 className="text-2xl md:text-3xl text-white/90 font-light mb-8 font-serif">Something special for you...</h3>
                 <GiftBox onOpen={() => setStep('cake')} />
              </motion.div>
            )}

            {step === 'cake' && (
              <motion.div
                key="cake"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                className="py-10 w-full"
              >
                <h3 className="text-2xl md:text-3xl text-white/90 font-light mb-8 font-serif">Close your eyes & make a wish...</h3>
                <div className="bg-white/5 p-4 md:p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md inline-block">
                    <InteractiveCake onBlowout={handleBlowout} />
                </div>
              </motion.div>
            )}

            {step === 'message' && (
              <motion.div
                key="message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="space-y-6 md:space-y-8 w-full"
              >
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 blur-[100px] opacity-30 animate-pulse"></div>
                  <PartyPopper className="w-20 h-20 md:w-28 md:h-28 text-yellow-400 mx-auto animate-bounce drop-shadow-[0_0_30px_rgba(255,215,0,0.6)]" />
                </div>

                <div className="bg-white/80 backdrop-blur-xl border border-white/40 p-6 md:p-10 rounded-xl shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500 text-gray-800 relative overflow-hidden group">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-pink-300/50 rotate-2 backdrop-blur-sm"></div>
                  <Smile className="absolute top-4 right-4 w-6 h-6 md:w-8 md:h-8 text-pink-400 opacity-50" />

                  <div className="font-handwriting text-xl md:text-3xl leading-relaxed text-gray-700 font-medium text-left md:text-center">
                    <TypewriterText 
                        text="Happy Birthday Prathvi! 🎂 They say stars shine the brightest in the darkest nights, but you? You bring the sparkle everywhere you go! ✨ To my favorite 'Fatakdi' - may your day be as loud, colorful, and full of surprises as you are. Keep glowing, keep growing, and never stop being the amazing soul you are."
                        delay={0.5}
                    />
                  </div>
                  
                  <div className="mt-8 flex items-center justify-end gap-2 opacity-0 animate-fade-in" style={{ animationDelay: '8s', animationFillMode: 'forwards' }}>
                      <span className="font-handwriting text-lg md:text-xl text-pink-500">- Your Just Friend</span>
                      <Heart className="w-4 h-4 md:w-5 md:h-5 text-red-500 fill-current animate-pulse" />
                  </div>
                </div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3 }}
                  onClick={() => setStep('gallery')}
                  className="mt-8 px-6 py-3 md:px-8 md:py-3 bg-white/10 hover:bg-white/20 rounded-full text-white border border-white/30 flex items-center gap-2 mx-auto transition-all text-sm md:text-base"
                >
                  <Camera className="w-4 h-4 md:w-5 md:h-5" />
                  One Last Surprise...
                </motion.button>
              </motion.div>
            )}

            {step === 'gallery' && (
              <motion.div
                key="gallery"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="w-full"
              >
                <h3 className="text-2xl md:text-3xl text-white font-light mb-4 font-serif">Memory Lane 📸</h3>
                <p className="text-white/60 mb-8 text-sm md:text-base">Tap a photo to see the hidden message!</p>
                
                <PolaroidGallery />

                <motion.button
                  onClick={() => setStep('message')}
                  className="mt-12 text-white/50 hover:text-white text-sm underline"
                >
                  Read Letter Again
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </ThreeDCard>
    </div>
  );
};

export default BirthdayLetter;
