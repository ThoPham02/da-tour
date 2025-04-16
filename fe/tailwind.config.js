/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        260: "260px",
        80: "80px",
        360: "360px",
      },
      height: {
        70: "70px",
        80: "80px",
      },
    },
  },
  plugins: [],
};
