import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  darkMode: "selector",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            secondary: {
              DEFAULT: "#ea580c",
            },
            primary: {
              DEFAULT: "#71717a",
            },
            success: {
              DEFAULT: "#4b5563",
            },
          },
        },
        light: {
          colors: {
            secondary: {
              DEFAULT: "#ea580c",
            },
            primary: {
              DEFAULT: "#52525b",
            },
            success: {
              DEFAULT: "#d1d5db",
            },
          },
        },
      },
    }),
  ],
};
