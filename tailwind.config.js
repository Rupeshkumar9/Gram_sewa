/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        leaf: {
          50: '#eef8ef',
          100: '#d8eedb',
          500: '#2f8f56',
          600: '#247445',
          700: '#1f5c3a',
        },
        earth: {
          50: '#faf6ef',
          100: '#f0e3cf',
          500: '#b4773a',
          700: '#774b25',
        },
      },
      boxShadow: {
        soft: '0 16px 50px rgba(28, 53, 40, 0.12)',
      },
    },
  },
  plugins: [],
};
