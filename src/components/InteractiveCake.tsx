import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

interface Props {
  onBlowout: () => void;
}

const InteractiveCake: React.FC<Props> = ({ onBlowout }) => {
  const [candles, setCandles] = useState([true, true, true]); // 3 candles
  const [blownOut, setBlownOut] = useState(false);

  const handleBlow = (index: number) => {
    const newCandles = [...candles];
    newCandles[index] = false;
    setCandles(newCandles);

    if (newCandles.every((c) => !c)) {
      setBlownOut(true);
      setTimeout(onBlowout, 500);
    }
  };

  return (
    <div className="relative w-64 h-48 mx-auto mt-10 select-none">
      {/* Cake Base */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-r from-pink-300 to-purple-300 rounded-lg shadow-lg flex items-end justify-center">
        <div className="w-full h-4 bg-purple-400/30 absolute bottom-4"></div>
      </div>
      
      {/* Cake Top Layer */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-48 h-16 bg-gradient-to-r from-pink-200 to-purple-200 rounded-lg shadow-md flex items-end justify-center">
         <div className="w-full h-3 bg-purple-400/20 absolute bottom-3"></div>
      </div>

      {/* Frosting Drips */}
      <div className="absolute bottom-[9.5rem] left-1/2 -translate-x-1/2 w-52 flex justify-between px-2">
         {[...Array(7)].map((_, i) => (
             <div key={i} className="w-4 h-6 bg-pink-100 rounded-full -mt-2"></div>
         ))}
      </div>

      {/* Candles */}
      <div className="absolute bottom-40 left-1/2 -translate-x-1/2 flex gap-8">
        {candles.map((isLit, i) => (
          <div key={i} className="relative flex flex-col items-center">
            {/* Flame */}
            <motion.div
              animate={isLit ? {
                scale: [1, 1.2, 1],
                rotate: [-2, 2, -2],
                filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
              } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, repeat: Infinity }}
              onClick={() => handleBlow(i)}
              className="cursor-pointer absolute -top-8 z-10"
            >
              <div className="relative">
                <Flame className="w-8 h-8 text-orange-400 fill-yellow-300 drop-shadow-[0_0_10px_rgba(255,165,0,0.8)]" />
                <div className="absolute inset-0 bg-yellow-500 blur-md opacity-50 rounded-full animate-pulse"></div>
              </div>
            </motion.div>
            
            {/* Candle Stick */}
            <div className="w-4 h-12 bg-gradient-to-b from-blue-200 to-blue-400 rounded-sm border border-black/10 shadow-sm"></div>
          </div>
        ))}
      </div>
      
      {!blownOut && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute -bottom-12 w-full text-center text-sm text-white/60 font-light italic"
        >
          Tap the flames to make a wish! ✨
        </motion.p>
      )}
    </div>
  );
};

export default InteractiveCake;
