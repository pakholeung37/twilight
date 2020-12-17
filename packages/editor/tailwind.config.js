module.exports = {
  // only purge in production, should make dev compile quicker
  purge: process.env.NODE_ENV === "production" ? ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"] : [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
