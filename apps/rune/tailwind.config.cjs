/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      white: "#ffffff",
      black: "#000000",
      pink: "#EDB6E7",
      magenta: "#F22393",
      purple: "#2a1c38",
      "magenta-hover": "#d11f80",
      "card-bg": "#21142D80",
      "card-bg-hover": "#21142D",
      "off-white": "#FFFFFFCC",
    },
    boxShadow: {
      "profile-picture": "0px 7px 4px 0px rgba(0, 0, 0, 0.25)",
    },
    animation: {
      "spin-fast": "spin .35s linear infinite",
      "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      "pulse-med": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      star: "pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    },
  },
  plugins: [],
};
