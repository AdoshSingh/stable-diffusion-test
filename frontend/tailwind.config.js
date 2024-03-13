/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        "text-gradient": "linear-gradient(to right, #e73c9f, #a032c6, #4125f8)",
      },
      colors: {
        'primary-bg': '#0f0b29',
        'secondary-bg': '#261046',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

