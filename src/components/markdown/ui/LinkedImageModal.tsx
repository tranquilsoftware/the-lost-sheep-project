import { useEffect, useRef, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, PanInfo, useAnimation } from 'framer-motion';

interface LinkedImageModalProps {
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  initialIndex: number;
  onClose: () => void;
}

export const LinkedImageModal = ({ images, initialIndex, onClose }: LinkedImageModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isDragging, setIsDragging] = useState(false);
  const controls = useAnimation();
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Track if this is the initial render
  const isInitialMount = useRef(true);

  // Navigate between images
  const navigate = useCallback((direction: number) => {
    setCurrentIndex(prevIndex => {
      const newIndex = (prevIndex + direction + images.length) % images.length; 
      
      // Animate the transition
      controls.start({
        x: direction > 0 ? 50 : -50,
        opacity: 0,
        transition: { duration: 0.1 }
      }).then(() => {
        controls.start({
          x: 0,
          opacity: 1,
          transition: { duration: 0.2 }
        });
      });
      
      return newIndex;
    });
  }, [images.length, controls]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      navigate(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      navigate(1);
    }
  }, [onClose, navigate]);

  // Set initial animation state
  useEffect(() => {
    controls.set({ opacity: 0, x: 0 });
    const timer = setTimeout(() => {
      controls.start({
        opacity: 1,
        x: 0,
        transition: { duration: 0.2 }
      });
    }, 10);
    
    return () => clearTimeout(timer);
  }, [currentIndex, controls]);

  // Set up keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
  
  // Set initial index on mount
  useEffect(() => {
    if (isInitialMount.current) {
      setCurrentIndex(initialIndex);
    }
  }, [initialIndex]);
  
  // Mark initial mount as complete after first render
  useEffect(() => {
    isInitialMount.current = false;
  }, []);

  // Close modal when clicking outside the image
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle swipe gestures
  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isDragging) return;
    
    const SWIPE_THRESHOLD = 50;
    const SWIPE_VELOCITY = 800;
    
    const { offset, velocity } = info;
    const shouldSwipe = Math.abs(offset.x) > SWIPE_THRESHOLD || Math.abs(velocity.x) > SWIPE_VELOCITY;
    
    if (shouldSwipe) {
      const direction = offset.x > 0 ? -1 : 1;
      navigate(direction);
    }
    
    setIsDragging(false);
  };

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 transition-colors z-10"
        aria-label="Close modal"
      >
        <X className="w-8 h-8" />
      </button>
      
      {/* Current Image with Swipe Support */}
      <div className="relative w-full max-w-4xl max-h-[90vh]">
        <motion.div
          key={currentIndex}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          initial={{ opacity: 0 }}
          animate={controls}
          className="w-full h-full flex flex-col items-center justify-center"
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="flex-[0_auto] flex items-center justify-center w-full">
            <img
              src={images[currentIndex]?.src || ''}
              alt={images[currentIndex]?.alt || 'Image'}
              className="max-h-[70vh] w-full object-contain"
              draggable={false}
            />
          </div>
          
          {/* Image Caption */}
          {images[currentIndex]?.caption && (
            <div className="w-full text-center text-white text-sm opacity-80 mt-4 px-4">
              {images[currentIndex].caption}
            </div>
          )}
        </motion.div>
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(-1);
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-12 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(1);
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
