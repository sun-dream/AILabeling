/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#165DFF',
        amber: '#FF6B35',
        deepRed: '#C92A2A',
        techBlue: '#228BE6',
        mintGreen: '#E3F2FD',
        warmGray: '#F5F5F5',
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

