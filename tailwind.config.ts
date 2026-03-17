// tailwind.config.ts
// Add these keyframes and animation entries to your existing Tailwind config.
// Merge with your current tailwind.config.ts — do NOT replace the whole file.

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
    "./engine/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        // Loading screen marquee scrolls text left
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        // Pac-Man-style obstacle track scrolls left
        loaderGame: {
          "0%": { transform: "translateX(0px)" },
          "100%": { transform: "translateX(-300px)" },
        },
        // Ball bouncing animation
        ball25: {
          "0%":   { transform: "translateY(70px)" },
          "15%":  { transform: "translateY(10px)" },
          "30%":  { transform: "translateY(70px)" },
          "45%":  { transform: "translateY(10px)" },
          "67%":  { transform: "translateY(70px)" },
          "80%":  { transform: "translateY(10px)" },
          "90%":  { transform: "translateY(70px)" },
          "100%": { transform: "translateY(70px)" },
        },
        // Loading cursor blink
        blink: {
          "0%":   { opacity: "0" },
          "25%":  { opacity: "1" },
          "75%":  { opacity: "1" },
          "100%": { opacity: "0" },
        },
        // One-shot fade out when load completes
        blinkDone: {
          to: { opacity: "0" },
        },
      },
      animation: {
        "marquee":    "marquee 10s linear infinite",
        "loaderGame": "loaderGame 7s linear infinite",
        "ball25":     "ball25 7s infinite",
        "blink":      "blink 1s linear infinite",
        "blinkDone":  "blinkDone 0.3s forwards",
      },
    },
  },
  plugins: [],
};

export default config;
