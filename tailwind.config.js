/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A5276',
          light: '#2E86C1',
          dark: '#0E2F44',
        },
        secondary: {
          DEFAULT: '#F39C12',
          light: '#F7DC6F',
          dark: '#D68910',
        },
        accent: {
          DEFAULT: '#2ECC71',
          light: '#58D68D',
          dark: '#1E8449',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
