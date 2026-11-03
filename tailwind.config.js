/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0a0a0c', // KDEX inspired dark base
          secondary: '#131417',
        },
        primary: {
          DEFAULT: '#ffffff', // Clean white for text
          dim: '#a1a1aa', // Muted text
        },
        accent: {
          DEFAULT: '#3b82f6', // Subtle blue accent if needed
          glow: 'rgba(59, 130, 246, 0.5)', // Glow for NZT style borders
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'], // Jeremy inspired clean typography
        display: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 255, 255, 0.1)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)' },
        }
      }
    },
  },
  darkMode: "class",
  plugins: [],
};
