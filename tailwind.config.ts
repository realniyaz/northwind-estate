import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#1C3D2F",
          dark: "#142D22",
          light: "#26533F",
        },
        navy: {
          DEFAULT: "#0F172A",
          dark: "#090D16",
          light: "#1E293B",
        },
        ivory: {
          DEFAULT: "#FBF9F5",
          dark: "#F0EBE1",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#E5C567",
          dark: "#AA8C2C",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;