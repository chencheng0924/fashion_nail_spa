/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "main-red": "#942023",
        "hover-text": "#8B0000",
        "text-white": "#FCF8EB",
        "btn-bg": "#8B0000",
        "sec-btn-bg": "#D0665F",
        "bgc-white": "#FBF8EB"
      },
      screens: {
        'mobile': { 'max': '800px' },
        'tablet': { 'max': '1280px' },
        // 'laptop': { 'min': '950px', 'max': '1130px' },
        'desktop': { 'min': '1281px' },
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
