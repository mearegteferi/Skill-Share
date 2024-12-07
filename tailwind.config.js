/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'raising-black': '#222831',
        'gold': '#ffbe33',
      },
    },
  },
  plugins: [],
}

