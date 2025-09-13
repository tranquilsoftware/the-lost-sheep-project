// markdown/components/ReadMeter.tsx
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { bgColors } from '../../../styles/colors';

interface ReadMeterProps {
  scrollContainerRef?: React.RefObject<HTMLElement>;
  className?: string;
  height?: number;
  color?: string;
}

/**
 * ReadMeter component, good looking progress bar that shows how far you have read on a page
 * @param param0 
 * @returns 
 */
const ReadMeter: React.FC<ReadMeterProps> = ({
  scrollContainerRef,
  className = '',
  height = 8,
  color = bgColors.brighterinfo,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (!isVisible) {
    return null;
  }

  return (
    // Make it vertically aniamted down
    <motion.div 
      className={`fixed top-0 left-0 right-0 z-50 ${className}`} 
      style={{ height: `${height}px` }}
      initial={{ y: -height, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        duration: 2
      }}
    >
      <motion.div
        className={`h-full ${color} origin-left`}
        style={{ scaleX }}
      />
    </motion.div>
  );
};

export default ReadMeter;