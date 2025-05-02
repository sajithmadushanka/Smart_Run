/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        light: {
          background: "#F9FAFB",
          card: "#FFFFFF",
          primary: "#10B981", // emerald-500
          secondary: "#38BDF8", // sky-400
          text: "#111827", // gray-900
          muted: "#6B7280", // gray-500
        },
        dark: {
          background: "#0F172A", // slate-900
          card: "#1E293B", // slate-800
          primary: "#34D399", // emerald-400
          secondary: "#0EA5E9", // sky-500
          text: "#F8FAFC", // slate-100
          muted: "#94A3B8", // slate-400
        },
      },
      fontFamily: {
        sans: ["Urbanist", "Inter", "System"],
      },
    },
  },
  plugins: [],
}
