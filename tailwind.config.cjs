module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        glass: "rgba(255,255,255,0.04)",
      },
      keyframes: {
        flipFront: {
          "0%": { transform: "rotateX(0deg)" },
          "50%": { transform: "rotateX(-90deg)" },
          "100%": { transform: "rotateX(-180deg)" },
        },
      },
    },
  },
  plugins: [],
};
