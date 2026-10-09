/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        cream: "#FBF6EA",
        creamDeep: "#F5EEDC",
        ink: "#221E1A",
        inkSoft: "#6B6459",
        line: "#E7DFCB",
        orange: "#F2994A",
        red: "#EB5757",
        green: "#3FA65A",
        greenDark: "#2F8747",
        greenPale: "#E4F4E7",
      },
      fontFamily: {
        head: ["Poppins", "Segoe UI", "sans-serif"],
        body: ["Inter", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(34,30,26,.04), 0 8px 24px rgba(34,30,26,.06)",
        pop: "0 12px 32px rgba(34,30,26,.14)",
      },
    },
  },
  plugins: [],
};
