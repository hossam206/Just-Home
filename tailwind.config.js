/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1440px",
    },
    fontFamily: {
      pro: ["var(--font-Inter)", "sans-serif"],
    },
    extend: {
      container: {
        center: true,
        padding: "10px",
      },
      colors: {
        primary: "#1F4B43",
        secondary: "#E7C873",
        tertiary: "#1A1A1A",
        gray: {
          10: "#f9fafb",
          20: "#f3f4f6",
          30: "#e5e7eb",
          40: "#d1d5db",
          50: "#9ca3af",
          60: "#6b7280",
          70: "#4b5563",
          80: "#374151",
          90: "#1f2937",
          100: "#111827",
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".flexRow": {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        },
        ".flexCol": {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        },
        ".Transition": {
          transition: "all 0.3s ease-in-out",
        },
      });
    },
  ],
};
