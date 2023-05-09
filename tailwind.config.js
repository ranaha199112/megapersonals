/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arial: ["arial", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      container: {
        center: true,
        screens: {
          lg: "420px",
          xl: "420px",
          "2xl": "420px",
        },
      },
      colors: {
        "custom-blue": "#0000ee",
        "custom-blue2": "#046aaf",
        "custom-blue3": "#0492ff",
        "custom-gray": "#fbfef9",
        "custom-gray2": "#b7a690",
        "custom-gray3": "#333333",
        "custom-gray4": "#555555",
        "custom-orange": "#feb161",
        "custom-red": "#ff0000",
      },
      boxShadow: {
        // around: "0 0 15px 0 rgba(0, 0, 0, .1)",
        "around-sm": "0 0 5px 0 rgba(0, 0, 0, .1)",
        "around-blue": "0 0 10px 2px rgba(15, 10, 220, .1)",
      },
    },
  },
  plugins: [],
};
