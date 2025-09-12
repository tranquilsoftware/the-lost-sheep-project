import { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LinkedImageModal } from './LinkedImageModal';

export interface ImageGalleryThumbnail {
  src: string;
  alt: string;
  caption?: string;
}

export interface ThumbnailOptions {
  /** Width of each thumbnail in pixels */
  width?: number;
  /** Height of each thumbnail in pixels */
  height?: number;
  /** Border radius of thumbnails in pixels */
  borderRadius?: number;
  /** Gap between thumbnails in pixels */
  gap?: number;
}

export interface ImageGalleryProps {
  /** Array of images to display in the gallery */
  images: ImageGalleryThumbnail[];
  /** Optional title for the gallery */
  title?: string;
  /** Whether the gallery should take full width of its container */
  fullWidth?: boolean;
  /** Options for customizing thumbnail appearance */
  thumbnailOptions?: ThumbnailOptions;
  /** Whether to center the thumbnails in the container */
  centerThumbnails?: boolean;
}

/**
 * 
 * @param images parse in array of images (src, alt) with src, alt, and caption properties
 * @param title optional title for the gallery
 * @param fullWidth optional boolean to make the gallery full width
 * @returns 
 */
export const ImageGallery = ({
  images,
  title,
  fullWidth = false,
  thumbnailOptions = {},
  centerThumbnails = false
}: ImageGalleryProps) => {
  // Default thumbnail options with overrides from props
  const thumbOptions = {
    width: 96, // 24 * 4 = 96px (6rem)
    height: 96, // 24 * 4 = 96px (6rem)
    borderRadius: 8, // 0.5rem
    gap: 16, // 1rem
    ...thumbnailOptions,
  };
  // DEBUG: Set to true to add a 5-second delay to loading states
  const DEBUG_DELAY_LOADING = false;
  
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);
  const [loadingStates, setLoadingStates] = useState<boolean[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Initialize loading states
  useEffect(() => {
    setLoadedImages(Array(images.length).fill(false));
    setLoadingStates(Array(images.length).fill(true));
  }, [images]);

  // Explicit useEffect to handle cached images and pre-loaded images
  useEffect(() => {
    if (images.length === 0) return;

    // Check if images are already cached/loaded
    const checkImageCache = async () => {
      const cacheChecks = images.map((image, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          
          img.onload = () => {
            // Image is cached or loaded immediately
            setLoadedImages(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
            setLoadingStates(prev => {
              const newState = [...prev];
              newState[index] = false;
              return newState;
            });
            resolve();
          };

          img.onerror = () => {
            // Image failed to load, remove loading state
            setLoadingStates(prev => {
              const newState = [...prev];
              newState[index] = false;
              return newState;
            });
            resolve();
          };

          img.src = image.src;
          
          // If the image is cached, onload will fire immediately
          // If not cached, we'll let the normal loading handlers take over
          setTimeout(() => {
            // If not resolved after a short delay, let normal handlers take over
            resolve();
          }, 100);
        });
      });

      await Promise.all(cacheChecks);
    };

    checkImageCache();
  }, [images]);

  // Handle image load with debug delay
  const handleImageLoad = useCallback((index: number) => {
    const updateStates = () => {
      setLoadedImages(prev => {
        const newState = [...prev];
        newState[index] = true;
        return newState;
      });
      setLoadingStates(prev => {
        const newState = [...prev];
        newState[index] = false;
        return newState;
      });
    };

    if (DEBUG_DELAY_LOADING) {
      // DEBUG: Add 5-second delay for testing
      setTimeout(updateStates, 5000);
    } else {
      updateStates();
    }
  }, [DEBUG_DELAY_LOADING]);
  
  // Handle image load start - only set loading if not already loaded
  const handleLoadStart = useCallback((index: number) => {
    setLoadedImages(prev => {
      // Only set loading state if the image is not already loaded
      if (!prev[index]) {
        setLoadingStates(loadingPrev => {
          const newState = [...loadingPrev];
          newState[index] = true;
          return newState;
        });
      }
      return prev;
    });
  }, []);
  
  // Handle image error
  const handleImageError = useCallback((index: number) => {
    setLoadingStates(prev => {
      const newState = [...prev];
      newState[index] = false;
      return newState;
    });
  }, []);

  // Handle modal open with proper cleanup on unmount
  const openModal = useCallback((index: number) => {
    // Ensure the index is within bounds
    const safeIndex = Math.max(0, Math.min(index, images.length - 1));
    setSelectedImageIndex(safeIndex);
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Cleanup function to re-enable scroll if component unmounts with modal open
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [images.length]);

  // Handle modal close with cleanup
  const closeModal = useCallback(() => {
    setSelectedImageIndex(null);
    // Re-enable body scroll when modal is closed
    document.body.style.overflow = 'auto';
  }, []);
  
  // Clean up body scroll on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Check if scrolling is possible in each direction
  const updateScrollState = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    
    // Check if we can scroll left (not at the start)
    setScrollState({
      canScrollLeft: scrollLeft > 10, // Using 10px threshold for better touch/click handling
      canScrollRight: scrollLeft + clientWidth < scrollWidth - 10 // Check if we can scroll right (not at the end)
    });
  };

  // State to track scrollability
  const [scrollState, setScrollState] = useState({ canScrollLeft: false, canScrollRight: false });

  // Update scroll state on scroll and resize
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    // Initial check
    updateScrollState();
    
    // Add resize observer to handle container size changes
    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(container);
    
    // Add scroll event listener
    container.addEventListener('scroll', updateScrollState, { passive: true });
    
    // Cleanup
    return () => {
      container.removeEventListener('scroll', updateScrollState);
      resizeObserver.disconnect();
    };
  }, [images]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = direction === 'left' ? -200 : 200;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  if (images.length === 0) return null;

  return (
    <div className={`mt-6 ${fullWidth ? 'w-full' : ''}`}>
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>}
      
      <div className="relative">
        {/* Left Navigation Button */}
        {images.length > 3 && scrollState.canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-1 rounded-full bg-white shadow-md text-blue-600 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Thumbnails Container */}
        <div
          ref={scrollContainerRef}
          className={`${centerThumbnails ? 'flex justify-center' : 'flex'} overflow-x-auto py-2 px-1 scrollbar-hide`}
          style={{
            scrollSnapType: 'x mandatory',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            gap: `${thumbOptions.gap}px`,
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openModal(index)}
              style={{
                scrollSnapAlign: 'start',
                width: `${thumbOptions.width}px`,
                height: `${thumbOptions.height}px`,
                borderRadius: `${thumbOptions.borderRadius}px`
              }}
            >
              <div className="relative w-full h-full">
                <img
                  src={image.src}
                  alt={image.alt}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${loadedImages[index] ? 'opacity-100' : 'opacity-0'}`}
                  loading="lazy"
                  onLoadStart={() => handleLoadStart(index)}
                  onLoad={() => handleImageLoad(index)}
                  onError={() => handleImageError(index)}
                />
                {loadingStates[index] && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse">
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Navigation Button */}
        {images.length > 3 && scrollState.canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-1 rounded-full bg-white shadow-md text-blue-600 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Linked Image Modal */}
      {selectedImageIndex !== null && (
        <LinkedImageModal
          images={images}
          initialIndex={selectedImageIndex}
          onClose={closeModal}
        />
      )}

      {/* Hide scrollbar styles */}
      <style>
        {
          `
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            @keyframes pulse {
              0%, 100% { opacity: 0; }
              50% { opacity: 0.5; }
            }
            .animate-pulse {
              animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
          `
        }
      </style>
    </div>
  );
};
