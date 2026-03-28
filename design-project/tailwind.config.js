/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Nohemi', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
      },
      colors: {
        clarity: '#F45B5B',
        learn: '#5492A0',
        mentor: '#6C64A8',
        achieve: '#A68A61', // approximated from design screenshots
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
