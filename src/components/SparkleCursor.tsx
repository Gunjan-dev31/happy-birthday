import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const SparkleCursor = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const createSparkle = (x: number, y: number) => {
      // Limit sparkle creation rate
      if (Math.random() > 0.4) return;

      const colors = ['#FFD700', '#FF69B4', '#00FFFF', '#FFFFFF'];
      const newSparkle: Sparkle = {
        id: Date.now() + Math.random(),
        x,
        y,
        size: Math.random() * 8 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setSparkles((prev) => [...prev.slice(-20), newSparkle]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
      }, 800);
    };

    const handleMouseMove = (e: MouseEvent) => createSparkle(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        createSparkle(touch.clientX, touch.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            initial={{ opacity: 1, scale: 0, x: sparkle.x, y: sparkle.y }}
            animate={{ 
              opacity: 0, 
              scale: 1.5, 
              x: sparkle.x + (Math.random() - 0.5) * 50, 
              y: sparkle.y + (Math.random() - 0.5) * 50 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'absolute',
              width: sparkle.size,
              height: sparkle.size,
              backgroundColor: sparkle.color,
              borderRadius: '50%',
              boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SparkleCursor;
