/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00B894", // Cryptocurrency Green
        secondary: "#F2C94C", // Digital Gold
        accent: "#3498DB", // Smart Contract Blue
        background: "#2C3E50", // Midnight Black
        text: "#FFFFFF", // White Snow
        button: "#E67E22", // Playful Orange
        highlight: "#9B59B6", // Puzzle Purple
        error: "#E74C3C", // Blockchain Red
        success: "#2ECC71", // Mint Green
        backgroundAccent: "#95A5A6", // Pixel Gray
      },
    },
  },
  plugins: [],
};

export default config;
