import React from 'react';
import { cn } from '../../styles/colors';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../markdown/context/ThemeContext';

const ThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className={cn(
        'p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
        'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700',
        'transition-colors duration-200',
        className
      )}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
