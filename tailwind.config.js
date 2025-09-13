/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  darkMode: 'class',
  
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'card-gradient': 'linear-gradient(to bottom right, var(--tw-gradient-stops))'
      },

       
        // Refined blue and white color system
      colors: {
        // Primary backgrounds
        background: {
          DEFAULT: "#ffffff",           // Pure white for light mode
          dark: "#0f172a",             // Deep slate for dark mode
          light: "#f8fafc",            // Very light gray-blue
          secondary: "#f1f5f9",        // Light blue-gray
          accent: "#eff6ff"            // Very light blue tint
        },
        
        // Blue primary palette
        primary: {
          DEFAULT: "#2563eb",          // Strong blue
          50: "#eff6ff",
          100: "#dbeafe", 
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",              // Main blue
          600: "#2563eb",              // Primary blue
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
          foreground: "#ffffff"
        },
        
        // Accent colors (complementary blues)
        accent: {
          DEFAULT: "#0ea5e9",          // Sky blue
          light: "#7dd3fc",
          dark: "#0284c7",
          cyan: "#06b6d4",             // Cyan accent
          foreground: "#ffffff"
        },
        
        // Border system
        border: {
          DEFAULT: "#e2e8f0",          // Light border
          secondary: "#cbd5e1",        // Medium border
          dark: "#334155",             // Dark mode border
          light: "#f1f5f9"             // Very light border
        },
        
        // Content/text colors
        content: {
          DEFAULT: "#0f172a",          // Dark slate text
          primary: "#1e293b",          // Primary text
          secondary: "gray-400",        // Secondary text
          muted: "#94a3b8",            // Muted text
          inverse: "#ffffff"           // White text for dark backgrounds
        },
        
        // Semantic colors
        success: {
          DEFAULT: "#10b981",
          light: "#d1fae5",
          dark: "#059669"
        },
        warning: {
          DEFAULT: "#f59e0b",
          light: "#fef3c7",
          dark: "#d97706"
        },
        error: {
          DEFAULT: "#ef4444",
          light: "#fee2e2",
          dark: "#dc2626"
        },

        text: {
          DEFAULT: "white",
          primary: "cyan-300",
          secondary: "cyan-200",  // Soft blue gray
          description: "gray-400"
        },

        // // New base colors
        // background: {
        //   DEFAULT: "#132554",    // Brighter blue (previously hero color)
        //   dark: "#040B14",       // Darker blue (previously base)
        //   light: "#132554",      // Lighter blue
        //   secondary: "#111113"
        // },
        // primary: {
        //   DEFAULT: "#2563eb",    // Brighter blue
        //   light: "#60a5fa",      // Light blue
        //   dark: "#1d4ed8",       // Darker blue
        //   foreground: "#FFFFFF"
        // },
        // accent: {
        //   DEFAULT: "#3b82f6",    // New accent blue
        //   light: "#93c5fd",      // Light accent
        //   dark: "#2563eb",       // Dark accent
        //   foreground: "#FFFFFF"
        // },
        // border: {
        //   DEFAULT: "rgba(255, 255, 255, 0.1)",
        //   secondary: "rgba(255, 255, 255, 0.05)"
        // },
        // content: {
        //   DEFAULT: "#FFFFFF",
        //   secondary: "#bed4e9",  // Soft blue gray
        //   muted: "#8f5774"       // Muted pink
        // },
        // text: {
        //   DEFAULT: "white",
        //   primary: "cyan-300",
        //   secondary: "cyan-200",  // Soft blue gray
        //   description: "gray-400"
        // },

      }
    }
  },
  plugins: [
    plugin(function({ addBase }) {
      addBase({
        ':root': {
          '--primary': '#0855b1',
          '--secondary': '#036264',
          '--accent': '#4fa5d8',

          // '--background': '#0A0A0B', // og tranquilsoftware.com
          '--background': '#132554',  // Updated to new base color

        }
      })
    })
  ]
}

