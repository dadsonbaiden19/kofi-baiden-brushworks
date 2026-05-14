import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bone: "rgb(var(--color-bone) / <alpha-value>)",
        chalk: "rgb(var(--color-chalk) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        umber: "rgb(var(--color-umber) / <alpha-value>)",
        clay: "rgb(var(--color-clay) / <alpha-value>)",
        gallery: "rgb(var(--color-gallery) / <alpha-value>)",
        graphite: "rgb(var(--color-graphite) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
      },
      boxShadow: {
        artwork: "var(--shadow-artwork)",
        soft: "var(--shadow-soft)",
      },
      borderRadius: {
        soft: "18px",
        artwork: "22px",
      },
    },
  },
  plugins: [],
};

export default config;
