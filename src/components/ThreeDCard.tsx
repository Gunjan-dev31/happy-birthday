import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useWindowSize } from 'react-use';

interface Props {
  children: React.ReactNode;
}

const ThreeDCard: React.FC<Props> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const isMobile = width < 768; // Disable tilt on mobile

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]); // Reduced tilt for subtlety
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY: isMobile ? 0 : rotateY,
        rotateX: isMobile ? 0 : rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full max-w-md md:max-w-2xl mx-auto"
    >
      <div
        style={{
          transform: isMobile ? "none" : "translateZ(50px)",
          transformStyle: "preserve-3d",
        }}
        className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 md:p-8 shadow-2xl shadow-purple-500/20"
      >
        {children}
      </div>
    </motion.div>
  );
};

export default ThreeDCard;
