// Text colors
export const textColors = {
  primary: 'text-gray-700 dark:text-gray-300',
  secondary: 'text-gray-600 dark:text-gray-400',
  // accent: 'text-accent dark:text-accent-dark',
  accent: 'text-blue-700 dark:text-blue-400',
  muted: 'text-gray-500 dark:text-gray-400',
  light: 'text-gray-100 dark:text-white',
  dark: 'text-gray-900 dark:text-white',
  error: 'text-red-600 dark:text-red-400',
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  info: 'text-blue-600 dark:text-blue-400',
  a: 'text-indigo-600 dark:text-indigo-400 hover:underline',
};

// Background colors
export const bgColors = {
  primary: 'bg-white dark:bg-gray-900',
  secondary: 'bg-gray-50 dark:bg-gray-800',
  accent: 'bg-accent dark:bg-accent-dark',
  muted: 'bg-gray-100 dark:bg-gray-700',
  light: 'bg-gray-50 dark:bg-gray-800',
  dark: 'bg-gray-900 dark:bg-gray-800',
  error: 'bg-red-50 dark:bg-red-900/20',
  success: 'bg-green-50 dark:bg-green-900/20',
  warning: 'bg-yellow-50 dark:bg-yellow-900/20',
  info: 'bg-blue-50 dark:bg-blue-900/20',
  brighterinfo: 'bg-blue-600 dark:bg-blue-700',
};

// Border colors
export const borderColors = {
  default: 'border-gray-200 dark:border-gray-700',
  accent: 'border-accent dark:border-accent-dark',
  error: 'border-red-200 dark:border-red-800',
  success: 'border-green-200 dark:border-green-800',
  warning: 'border-yellow-200 dark:border-yellow-800',
  info: 'border-blue-200 dark:border-blue-800',
  horizontalline: 'border-gray-300 dark:border-gray-700'
};

// Button colors
export const buttonColors = {
  primary: 'bg-accent hover:bg-accent/90 text-white',
  secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white',
  outline: 'border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700',
  ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800',
  link: 'text-accent hover:underline',
};

// Utility function to combine classes
export const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};
