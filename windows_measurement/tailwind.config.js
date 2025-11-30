/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    // 🚨 Ensure this line is exactly correct: it scans ALL files 
    // ending in .js, .ts, .jsx, or .tsx anywhere under the src directory.
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}