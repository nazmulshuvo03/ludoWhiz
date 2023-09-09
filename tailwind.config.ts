/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

export const BASE_FONT_SIZE = 16;

export const BOX_SIZE = 4;
export const BOX_PER_ROW = 10;
export const BOX_BORDER = 0.15;
export const AGENT_SIZE = BOX_SIZE / 2;

const config: Config = {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        base: `${BASE_FONT_SIZE}px`,
      },
      colors: {
        primary: "#00B894", // Cryptocurrency Green
        secondary: "#F2C94C", // Digital Gold
        accent: "#3498DB", // Smart Contract Blue
        background: "#2C3E50", // Midnight Black
        text: "#FFFFFF", // White Snow
        textAccent: "#D3D3D3", // Almost White
        button: "#E67E22", // Playful Orange
        highlight: "#9B59B6", // Puzzle Purple
        error: "#E74C3C", // Blockchain Red
        success: "#2ECC71", // Mint Green
        backgroundAccent: "#95A5A6", // Pixel Gray
      },
      height: {
        box: `${BOX_SIZE}rem`,
        board: `${BOX_SIZE * BOX_PER_ROW + BOX_BORDER * 2}rem`,
        agent: `${BOX_SIZE / 2}rem`,
        dice: `${BOX_SIZE + 2}rem`,
        history: `${BOX_SIZE * BOX_PER_ROW + BOX_BORDER * 2}rem`,
      },
      width: {
        box: `${BOX_SIZE}rem`,
        board: `${BOX_SIZE * BOX_PER_ROW + BOX_BORDER * 2}rem`,
        agent: `${BOX_SIZE / 2}rem`,
        dice: `${BOX_SIZE + 2}rem`,
        history: `${BOX_SIZE * 4}rem`,
      },
      borderWidth: {
        box: `${BOX_BORDER}rem`,
      },
    },
  },
  plugins: [],
};

export default config;
