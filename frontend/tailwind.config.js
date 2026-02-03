/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#FFFFFF", // primary (amber)
          light: "#FCD34D",
          dark: "#D97706",
        },

        heading: "#111827",   // headings - dark blue
        body: "#6B7280",      // normal text  
        muted: "#9CA3AF",     // secondary text - grey + blue
        wooden:"#C2A68C",
        primary:"#008BFF",
         
        surface: "#FFFFFF",
        section: "#F9FAFB",
        dark: "#0F172A",

        glass: "rgba(255, 255, 255, 0.7)",
        glassDark: "rgba(15, 23, 42, 0.6)",
        borderGlass: "rgba(255, 255, 255, 0.3)",

        success: "#16A34A",
        warning: "#F59E0B",
        error: "#DC2626",
        info: "#2563EB",
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
