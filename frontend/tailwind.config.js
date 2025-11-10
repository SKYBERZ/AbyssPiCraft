/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        abyssBlue: "#0a1f44",
        abyssBlack: "#000000",
        neonCyan: "#00ffff",
        neonPurple: "#7d5fff"
      },
      fontFamily: {
        techno: ["Orbitron", "system-ui", "sans-serif"],
        mono: ["Roboto Mono", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      boxShadow: {
        neon: "0 0 10px #00ffff, 0 0 20px #00ffff66"
      }
    }
  },
  plugins: []
};
