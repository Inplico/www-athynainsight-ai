import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#4f46e5',
          600: '#4338ca',
          700: '#3730a3',
          800: '#312e81',
          900: '#1e1b4b',
        },
        aitt: {
          blue: "#3B82F6", // Bright blue from the logo
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#ffffff',
            h1: {
              color: '#3B82F6',
            },
            h2: {
              color: '#3B82F6',
            },
            h3: {
              color: '#3B82F6',
            },
            strong: {
              color: '#ffffff',
            },
            a: {
              color: '#3B82F6',
              '&:hover': {
                color: '#60A5FA',
              },
            },
            ul: {
              color: '#ffffff',
              li: {
                color: '#ffffff',
              },
            },
            ol: {
              color: '#ffffff',
              li: {
                color: '#ffffff',
              },
            },
            li: {
              '&::marker': {
                color: '#3B82F6',
              },
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;

