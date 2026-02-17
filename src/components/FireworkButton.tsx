import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { Zap } from 'lucide-react';

const FireworkButton = () => {
  const [isExploding, setIsExploding] = useState(false);
  const { width, height } = useWindowSize();

  const handleExplode = () => {
    setIsExploding(true);
    setTimeout(() => setIsExploding(false), 3000);
  };

  return (
    <>
      {isExploding && (
        <div className="fixed inset-0 pointer-events-none z-[100]">
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={500}
            gravity={0.3}
            initialVelocityY={20}
            colors={['#FFD700', '#FF4500', '#FF69B4', '#00FFFF']}
          />
        </div>
      )}
      
      <motion.button
        onClick={handleExplode}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-4 left-4 z-50 bg-gradient-to-r from-orange-500 to-red-600 p-3 rounded-full shadow-lg border border-orange-300/50 group"
      >
        <Zap className="w-6 h-6 text-white fill-yellow-300" />
        <span className="absolute left-full ml-2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Fatakdi Mode! 🧨
        </span>
      </motion.button>
    </>
  );
};

export default FireworkButton;
