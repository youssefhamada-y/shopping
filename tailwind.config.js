/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
screens: {
  'sm': '600px',
  'md': '728px',
  'lg': '984px',
  'xl': '1200px',
  '2xl': '1536px',
}
    },
    extend: {},
  },
  plugins: [],
}

