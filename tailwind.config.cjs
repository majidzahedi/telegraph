/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", "sans serif"],
      },
      animation: {
        ripple: "ripple 1s",
      },
      keyframes: {
        ripple: {
          "0%": {
            opacity: "100",
            transform: "scale(0)",
          },
          "100%": {
            opacity: "0",
            transform: "scale(10)",
          },
        },
      },
    },
  },
  daisyui: {
    logs: false,
  },
  plugins: [
    require("daisyui"),
    // require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
  ],
};
