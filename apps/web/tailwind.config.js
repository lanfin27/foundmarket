/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans KR', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#00B98E',
          hover: '#00A57E',
        },
        secondary: {
          DEFAULT: '#7C3AED',
          hover: '#6B21EA',
        }
      }
    },
  },
  plugins: [],
}