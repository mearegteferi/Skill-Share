/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "300px",
      md: "741px",
      lg: "1041px",
    },
    extend: {
      fontFamily: {
        inter : ["Inter"],
        roboto: ["Roboto"]
      },
      colors: {
        'raising-black': '#222831',
        'gold': '#ffbe33',
      },
    },
  },
  plugins: [],
}

