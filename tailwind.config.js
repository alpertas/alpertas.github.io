/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#0066FF',
          600: '#0052cc',
          700: '#003d99',
          900: '#001a66',
        },
        secondary: {
          50: '#f3f1ff',
          100: '#ede9fe',
          500: '#6B46C1',
          600: '#5b21b6',
          700: '#4c1d95',
          900: '#2e1065',
        },
        accent: {
          50: '#ecfeff',
          100: '#cffafe',
          500: '#00B5D8',
          600: '#0891b2',
          700: '#0e7490',
          900: '#164e63',
        },
        dark: {
          bg: '#121212',
          surface: '#1e1e1e',
          border: '#333333',
        },
        // WCAG AA compliant color palette
        contrast: {
          'high-light': '#ffffff', // 21:1 contrast ratio
          'high-dark': '#000000', // 21:1 contrast ratio
          'medium-light': '#f8fafc', // 15.8:1 contrast ratio
          'medium-dark': '#1e293b', // 12.6:1 contrast ratio
          'text-light': '#374151', // 7.5:1 contrast ratio
          'text-dark': '#d1d5db', // 7.5:1 contrast ratio
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      // Enhanced spacing for better touch targets
      spacing: {
        18: '4.5rem',
        88: '22rem',
      },
    },
  },
  plugins: [],
};
