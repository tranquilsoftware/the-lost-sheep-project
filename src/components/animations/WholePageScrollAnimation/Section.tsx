import { motion, useScroll, useTransform } from "framer-motion";
import React, { HTMLAttributes, useEffect, useRef } from "react";

interface SectionProps extends HTMLAttributes<HTMLSelectElement> {
  video: string;
  setVideo: (_: string) => void;
  setBgOpacity: (_: number) => void;
}

const Section = ({ setBgOpacity, children, video, setVideo, ...props }: SectionProps) => {
  const contentRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start end", "start start"],
  });

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.8, 0.9, 1],
    [0, 0.1, 1, 1, 0, 0]
  );

  const bgOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0]
  );

  scrollYProgress.on("change", (val) => {
    if (val > 0 || val < 1) {
      setVideo(video);
    }
  });

  bgOpacity.on("change", (val) => {
    setBgOpacity(val);
  });

  // useEffect(() => {
  //   return bgOpacity.onChange((latest) => {
  //     setBgOpacity(latest);
  //   }); 
  // }, [bgOpacity, setBgOpacity]);

  // useEffect(() => {
  //   return scrollYProgress.onChange((v) => {
  //     if (v > 0 || v < 1) {
  //       setVideo(video);
  //     }
  //   });
  // }, [scrollYProgress, setVideo, video]);

  return (
    <section 
    ref={contentRef} 
    className="min-h-screen flex items-center justify-center relative z-10"
    {...props}
  >
    <motion.div 
      className="relative z-20 text-white text-4xl font-bold text-center p-8"
      style={{ opacity: contentOpacity }}
    >
      {children}
    </motion.div>
  </section>
  );
};

export default Section;
