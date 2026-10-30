/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        portfolio: {
          main: '#101311',
          secondary: '#191F1B',
          elevated: '#222923',
          text: {
            primary: '#E6E4D9',
            secondary: '#A5AAA0',
            muted: '#777F75',
          },
          accent: {
            DEFAULT: '#C58B61',
            hover: '#D9A47D',
          },
          border: 'rgba(230, 228, 217, 0.10)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Geist', 'Satoshi', 'sans-serif'],
      }
    },
  },
  darkMode: "class",
  plugins: [],
};
