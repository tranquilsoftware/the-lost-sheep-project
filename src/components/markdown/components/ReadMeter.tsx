// markdown/components/ReadMeter.tsx
import React from 'react';
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
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef || undefined,
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${className}`} style={{ height: `${height}px` }}>
      <motion.div
        className={`h-full ${color} origin-left`}
        style={{ scaleX }}
      />
    </div>
  );
};

export default ReadMeter;