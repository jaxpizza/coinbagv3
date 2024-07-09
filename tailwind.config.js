module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          100: '#B2F5EA',
          200: '#81E6D9',
          300: '#4FD1C5',
          400: '#38B2AC',
          500: '#319795',
        },
        gray: {
          700: '#2D3748',
          800: '#1A202C',
          900: '#171923',
        }
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
