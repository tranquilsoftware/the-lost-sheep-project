import { useState, useEffect, useCallback } from 'react';
import { MOBILE_WIDTH_THRESHOLD } from '../globals';

type ResizeHandler = () => void;
const resizeHandlers = new Set<ResizeHandler>();

// Single event listener for all resize handlers
if (typeof window !== 'undefined') {
  window.addEventListener('resize', () => {
    resizeHandlers.forEach(handler => {
      try {
        handler();
      } catch (e) {
        console.error('Error in resize handler:', e);
      }
    });
  }, { passive: true });
}

const isMobileCheck = () => {
  if (typeof window === 'undefined') return false;
  
  // Check for touch device and mobile OS
  const userAgent = navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(userAgent);
  const isAndroid = /android/.test(userAgent);
  const isMobileWidth = window.innerWidth < MOBILE_WIDTH_THRESHOLD;

  const isMobile = isIOS || isAndroid || isMobileWidth;
  
  return isMobile;
};


export const isMobile = isMobileCheck;

export const useIsMobile = () => {
  const [isMobileView, setIsMobileView] = useState(isMobileCheck());

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(isMobileCheck());
    };

    // Add to global resize handlers
    resizeHandlers.add(handleResize);
    
    // Clean up
    return () => {
      resizeHandlers.delete(handleResize);
    };
  }, []);

  return isMobileView;
};

export const useWindowResize = (callback: () => void, deps: React.DependencyList = []) => {
  const memoizedCallback = useCallback(callback, deps);

  useEffect(() => {
    // Initial call
    memoizedCallback();
    
    // Add to global resize handlers
    resizeHandlers.add(memoizedCallback);
    
    // Clean up
    return () => {
      resizeHandlers.delete(memoizedCallback);
    };
  }, [memoizedCallback]);
};
