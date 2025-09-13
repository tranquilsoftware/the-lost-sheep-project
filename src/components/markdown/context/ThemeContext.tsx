import React, { createContext, useContext, useEffect, useCallback, useState, ReactNode } from 'react';
import { DARK_MODE_PREFERENCE_KEY } from '../../../globals';

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = DARK_MODE_PREFERENCE_KEY || 'theme-preference';

// Add smooth transition class to prevent flash of unstyled content
const disableTransitions = (): (() => void) => {
  const css = document.createElement('style');
  css.type = 'text/css';
  css.appendChild(
    document.createTextNode(
      `* {
        -webkit-transition: none !important;
        -moz-transition: none !important;
        -o-transition: none !important;
        -ms-transition: none !important;
        transition: none !important;
      }`
    )
  );
  document.head.appendChild(css);

  // Force a reflow, flushing the CSS changes
  window.getComputedStyle(document.body).opacity;

  // Remove the style element
  return () => {
    document.head.removeChild(css);
  };
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Check for saved preference
    if (typeof window !== 'undefined') {
      const savedPreference = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedPreference) {
        return savedPreference === 'dark';
      }
      
      // Check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return true;
      }
    }
    return false;
  });

  const toggleDarkMode = useCallback((): void => {
    const newDarkMode = !darkMode;
    
    // Disable transitions temporarily to prevent flash of unstyled content
    const enableTransitions = disableTransitions();
    
    // Update state and apply class
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem(THEME_STORAGE_KEY, newDarkMode ? 'dark' : 'light');
    
    // Re-enable transitions after a short delay
    setTimeout(enableTransitions, 10);
  }, [darkMode]);

  useEffect(() => {
    // Apply dark mode class on initial load
    const enableTransitions = disableTransitions();
    
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Re-enable transitions after initial load
    const timer = setTimeout(() => {
      enableTransitions();
    }, 0);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't explicitly set a preference
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        const enableTransitions = disableTransitions();
        setDarkMode(e.matches);
        setTimeout(enableTransitions, 10);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      clearTimeout(timer);
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [darkMode]);

  const contextValue = React.useMemo(
    () => ({
      darkMode,
      toggleDarkMode,
    }),
    [darkMode, toggleDarkMode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
