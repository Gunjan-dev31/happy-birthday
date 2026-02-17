import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Props {
  text: string;
  delay?: number;
  className?: string;
}

const TypewriterText: React.FC<Props> = ({ text, delay = 0, className = "" }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50); // Typing speed

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay, duration: 0.5 }}
      className={className}
    >
      {displayedText}
      <span className="animate-pulse">|</span>
    </motion.div>
  );
};

export default TypewriterText;
