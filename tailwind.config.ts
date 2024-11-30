import type { Config } from "tailwindcss";
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: '#282828', // dark grey
        secondary: '#009A44', // light green
        default: '#2c5234', // dark green
        Info: '#2c5234', // dark green 
        main: '#171817', // black
        grey: '#97999B' // grey
      },
      fontFamily: {
        'open-sans': ['Open Sans', 'sans-serif'],
        'open-sans-medium': ['Open Sans', 'sans-serif'],
        'open-sans-semibold': ['Open Sans', 'sans-serif'],
        'open-sans-extrabold': ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;

