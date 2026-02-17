import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';

interface Props {
  onOpen: () => void;
}

const GiftBox: React.FC<Props> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(onOpen, 1500); // Wait for animation before triggering next step
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-64 w-full cursor-pointer group" onClick={handleClick}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative"
      >
        {/* Glow behind box */}
        <div className="absolute inset-0 bg-pink-500 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>

        {/* Lid */}
        <motion.div
          animate={isOpen ? { y: -100, rotate: -10, opacity: 0 } : { y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-20 w-40 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg border-b-4 border-black/10 flex items-center justify-center"
        >
            <div className="w-full h-2 bg-yellow-400/80 absolute top-1/2 -translate-y-1/2"></div>
            <div className="w-12 h-12 bg-yellow-400/80 absolute -top-8 rounded-full flex items-center justify-center shadow-md">
                <div className="w-4 h-4 bg-yellow-200 rounded-full"></div>
            </div>
        </motion.div>

        {/* Box Body */}
        <motion.div
          animate={isOpen ? { scale: 1.1, opacity: 0, filter: "blur(10px)" } : {}}
          whileHover={!isOpen ? { rotate: [0, -2, 2, -2, 2, 0] } : {}}
          transition={isOpen ? { duration: 0.5, delay: 0.2 } : { duration: 0.3 }}
          className="relative z-10 w-36 h-36 bg-gradient-to-b from-purple-500 to-pink-500 rounded-b-lg shadow-2xl mx-auto -mt-1 flex items-center justify-center overflow-hidden"
        >
            <div className="w-8 h-full bg-yellow-400/80"></div>
            
            {!isOpen && (
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute bottom-2 text-white/70 text-xs font-bold tracking-widest uppercase"
                >
                    Tap Me
                </motion.p>
            )}
        </motion.div>

        {/* Light Burst on Open */}
        {isOpen && (
            <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 20, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full z-0 pointer-events-none"
            />
        )}
      </motion.div>
      
      {!isOpen && (
        <p className="mt-8 text-white/60 font-light animate-pulse">
            A surprise awaits inside...
        </p>
      )}
    </div>
  );
};

export default GiftBox;
