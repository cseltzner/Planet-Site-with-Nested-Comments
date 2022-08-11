/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["League Spartan", "sans-serif"],
    },
    extend: {
      colors: {
        "secondary-orange": "#F16F25",
        "primary-purple": "#26136E",
        "white-op-50": "rgba(255, 255, 255, 0.5)",
      },
    },
  },
  plugins: [],
};
