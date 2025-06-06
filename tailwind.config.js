/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // enable dark mode using class strategy
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
