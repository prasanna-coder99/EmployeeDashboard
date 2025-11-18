/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // enables dark mode via a 'dark' class
  theme: {
    extend: {
      colors: {
        // ===== GREY SCALE =====
        gray: {
          10: '#EFF3F6',
          20: '#E0E0E0',
          30: '#C6C6C6',
          40: '#A8A8A8',
          50: '#8D8D8D',
          60: '#6F6F6F',
          70: '#525252',
          80: '#393939',
          90: '#262626',
          100: '#0A1E06',
        },

        // ===== TEXT =====
        text: {
          heading: '#0A1E06',
          body: '#4A4A4A',
          disabled: '#B9B9B9',
          'heading-dark': '#FFFFFF',
          'body-dark': '#FFFFFF',
          'disabled-dark': '#7A7A7A',
        },

        // ===== BRAND COLORS =====
        primary: {
          100: '#DDD8F8',
          300: '#9586EA',
          500: '#4C33DB',
          700: '#000EA9',
        },
        secondary: {
          100: '#E3FCE5',
          300: '#ACF6B1',
          500: '#78F080',
          700: '#15C121',
        },

        // ===== BACKGROUNDS =====
        background: {
          dashboard: '#ECEDF8',
          card: '#FFFFFF',
          menu: '#FFFFFF',
          'dashboard-dark': '#1B1B1B',
          'card-dark': '#2D2D2D',
          'menu-dark': '#2D2D2D',
        },

        // ===== BASE COLORS =====
        base: {
          white: '#FFFFFF',
          black: '#000000',
        },

        // ===== ACTIONS =====
        danger: {
          100: '#FFD8DB',
          300: '#FF8F8F',
          500: '#FF4141',
          600: '#FF0000',
        },
        success: {
          100: '#85FFCA',
          300: '#5AF5A5',
          500: '#00D97E',
          600: '#009F5E',
        },
      },
    },
  },
  plugins: [],
};
