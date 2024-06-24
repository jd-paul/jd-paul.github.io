// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '120vh': '120vh',
        '60vh': '60vh',
      },
      colors: {
        custom: {
          dark_main: '#11151C',
          accent_main: '#FBEA07',
          accent_alt: '#D66853',
          dark_alt: '#212D40',
          dark_alt_light: '#364156',
        },
      },
      fontFamily: {
        'space-grotesk': ['"Space Grotesk"', 'sans-serif'],
        'work-sans': ['"Work Sans"', 'sans-serif'],
        'bitter': ['"Bitter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
