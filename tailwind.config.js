/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#070e1f",
          light: "#0d1b3e",
          mid: "#0a1530",
        },
        gold: {
          DEFAULT: "#D4AF37",
          dark: "#A08820",
          light: "#E8C84A",
          muted: "#D4AF3722",
        },
      },
      fontFamily: {
        heading: ["Oswald", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
