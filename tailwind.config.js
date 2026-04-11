/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        accent: "#8A9A86",
        canvas: "#FFFFFF",
        ink: "#111111",
        muted: "#888888",
        surface: "#F7F7F7"
      }
    }
  },
  plugins: []
};
