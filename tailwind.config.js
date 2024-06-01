/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rale: ['"Raleway"', "sans-serif"],
        ubuntu: ['"Ubuntu"', "sans-serif"],
      },
    },
  },
  plugins: [require('daisyui'),],
}

