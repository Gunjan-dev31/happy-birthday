import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingBalloons = () => {
  const [balloons, setBalloons] = useState<number[]>([]);

  useEffect(() => {
    // Create balloons
    const balloonCount = 15;
    const newBalloons = Array.from({ length: balloonCount }, (_, i) => i);
    setBalloons(newBalloons);
  }, []);

  const colors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
    'bg-purple-500', 'bg-pink-500', 'bg-orange-500'
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {balloons.map((i) => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomLeft = Math.floor(Math.random() * 100);
        const randomDelay = Math.random() * 5;
        const randomDuration = Math.random() * 10 + 10; // 10-20s duration

        return (
          <motion.div
            key={i}
            className="absolute -bottom-20"
            style={{ left: `${randomLeft}%` }}
            animate={{
              y: '-120vh',
              x: [0, Math.random() * 50 - 25, 0], // Gentle sway
            }}
            transition={{
              duration: randomDuration,
              delay: randomDelay,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* Balloon Shape */}
            <div className={`w-12 h-16 ${randomColor} rounded-[50%] rounded-b-[50%] relative opacity-60 shadow-lg`}>
              {/* Shine */}
              <div className="absolute top-3 left-3 w-3 h-6 bg-white/30 rounded-full transform -rotate-45"></div>
              {/* String */}
              <div className="absolute -bottom-8 left-1/2 w-[1px] h-8 bg-white/50 origin-top animate-wave"></div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingBalloons;
