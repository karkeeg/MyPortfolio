/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0a0a0c',
          secondary: '#131417',
          surface: '#161d2b',
          darker: '#111827',
          footer: '#1f2937',
        },
        primary: {
          DEFAULT: '#ffffff',
          dim: '#a1a1aa',
          muted: '#8b8b94',
        },
        accent: {
          DEFAULT: '#a855f7',
          light: '#c084fc',
          lighter: '#d8b4fe',
          dark: '#9333ea',
          glow: 'rgba(168, 85, 247, 0.4)',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        tight: ['"Inter Tight"', '"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(168, 85, 247, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(168, 85, 247, 0.5)' },
        }
      }
    },
  },
  darkMode: "class",
  plugins: [],
};
