/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["League Spartan", "sans-serif"],
    },
    extend: {
      colors: {
        "secondary-orange": "#DF631D",
        "primary-purple": "#26136E",
      },
    },
  },
  plugins: [],
};
