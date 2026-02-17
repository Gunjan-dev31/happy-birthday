import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const StarField = () => {
  // Generate random stars with colors for "Fatakdi" vibe
  const stars = useMemo(() => {
    const colors = ["#FFFFFF", "#FFD700", "#FF69B4", "#E0FFFF"];
    return [...Array(200)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
      opacity: Math.random() * 0.5 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[radial-gradient(ellipse_at_bottom,_#1B2735_0%,_#090A0F_100%)]">
      {/* Moon with more glow */}
      <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-yellow-100/20 blur-xl animate-pulse"></div>
      <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-gradient-to-br from-yellow-100 to-transparent opacity-80 shadow-[0_0_80px_rgba(255,255,200,0.4)]"></div>

      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            backgroundColor: star.color,
            boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
          }}
          animate={{
            opacity: [star.opacity, 1, star.opacity],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.delay,
          }}
        />
      ))}
      
      {/* Shooting Stars */}
      <motion.div
        className="absolute h-[2px] w-[150px] bg-gradient-to-r from-transparent via-pink-300 to-transparent"
        style={{ top: '20%', left: '-10%' }}
        animate={{
          x: ['0vw', '120vw'],
          y: ['0vh', '40vh'],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatDelay: 5,
          ease: "easeIn",
        }}
      />
       <motion.div
        className="absolute h-[2px] w-[100px] bg-gradient-to-r from-transparent via-blue-300 to-transparent"
        style={{ top: '40%', left: '-10%' }}
        animate={{
          x: ['0vw', '120vw'],
          y: ['10vh', '60vh'],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatDelay: 8,
          ease: "easeIn",
          delay: 2
        }}
      />
    </div>
  );
};

export default StarField;
