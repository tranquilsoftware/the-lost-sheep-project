import { useEffect } from 'react';
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import { isMobile } from './mobileUtils';

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navigationType = useNavigationType();

  // Handle scroll restoration after navigation
  useEffect(() => {
    if (navigationType === 'POP') {
      // Don't scroll on back/forward navigation
      return;
    }

    // Handle hash-based scrolling after navigation
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (location.state?.shouldScrollToTop !== false) {
      window.scrollTo(0, 0);
    }
  }, [location, navigationType]);

  const handleNavigation = (href: string, scrollToTop: boolean = true) => {
    // console.log('[Navigation] Starting navigation to:', href, 'on path:', location.pathname);
    
    // If it's an external link
    if (href.startsWith('http')) {
      // console.log('[Navigation] External link detected, opening in new tab');
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }
    
    // If it's a hash link
    if (href.startsWith('#')) {
      const hash = href.substring(1);
      // console.log('[Navigation] Hash link detected, hash:', hash);
      
      const scrollToElement = () => {
        // console.log('[Scroll] Attempting to scroll to element with id:', hash);
        const element = document.getElementById(hash);
        if (element) {
          // console.log('[Scroll] Element found, scrolling into view');
          
          // For mobile, use a more direct approach that works better with same-page navigation
          if (isMobile()) { // Mobile breakpoint
            // console.log('[Scroll] Mobile device detected, using direct scroll method');
            const yOffset = -100; // 100px offset from top
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'auto' });
            // Force a reflow/repaint
            void element.offsetHeight;
            // Then try smooth scroll
            setTimeout(() => {
              window.scrollTo({ 
                top: y, 
                behavior: 'smooth' 
              });
            }, 10);
          } else {
            // For desktop, use standard smooth scrolling
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
          return true;
        }
        // console.log('[Scroll] Element not found');
        return false;
      };

      if (location.pathname !== '/') {
        // console.log('[Navigation] Not on home page, navigating to home first');
        // Navigate to home page first, then scroll to the element
        navigate({
          pathname: '/',
          search: '',
          hash: href
        }, {
          replace: true,
          state: { shouldScrollToTop: false }
        });
        
        // Try scrolling after a short delay to allow the page to load
        const scrollAfterNavigation = () => {
          // console.log('[Scroll] Attempting scroll after navigation');
          if (!scrollToElement()) {
            // console.log('[Scroll] First attempt failed, trying again in next frame');
            requestAnimationFrame(() => {
              if (!scrollToElement()) {
                console.warn(`[Navigation] Element with id '${hash}' not found after navigation`);
              } 
              // else {
              //   console.log('[Scroll] Successfully scrolled on second attempt');
              // }
            });
          } 
          // else {
          //   // console.log('[Scroll] Successfully scrolled on first attempt');
          // }
        };
        
        // console.log('[Navigation] Setting up scroll attempt after delay');
        const timeoutId = setTimeout(scrollAfterNavigation, 300); // Increased delay for mobile
        return () => {
          // console.log('[Navigation] Cleaning up navigation timeout');
          clearTimeout(timeoutId);
        };
      } else {
        // console.log('[Navigation] Already on home page, updating URL');
        // Already on home page, update URL and scroll
        window.history.replaceState({}, '', href);
        
        if (!scrollToElement()) {
          // console.log('[Scroll] First scroll attempt failed, setting up retry');
          const retry = setTimeout(() => {
            if (!scrollToElement()) {
              console.warn(`[Navigation] Element with id '${hash}' not found after retry`);
            } else {
              console.log('[Scroll] Successfully scrolled on retry');
            }
          }, 300); // Increased delay for mobile
          
          return () => {
            // console.log('[Navigation] Cleaning up retry timeout');
            clearTimeout(retry);
          };
        }
      }
      return;
    }
    
    // console.log('[Navigation] Regular internal link, navigating to:', href);
    // For all other internal links
    navigate(href, { 
      state: { shouldScrollToTop: scrollToTop } 
    });
  };

  return handleNavigation;
};
