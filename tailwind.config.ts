import type { Config } from "tailwindcss";
/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',
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
        poppins: ['Poppins', 'sans-serif'], // Add the Poppins font
      },
    },
  },
  plugins: [],
} satisfies Config;

