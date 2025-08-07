/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'hineon-blue': {
          light: '#7DF9FF',
          DEFAULT: '#00BFFF',
          dark: '#00529B',
        },
        'brand-dark': {
          DEFAULT: '#0D1117',
          light: '#161B22',
          lighter: '#21262d'
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'glow': 'glow 4s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%, 100%': { textShadow: '0 0 5px #00BFFF, 0 0 10px #00BFFF, 0 0 20px #00BFFF' },
          '50%': { textShadow: '0 0 10px #00BFFF, 0 0 20px #00BFFF, 0 0 40px #00BFFF' },
        }
      },
    },
  },
  plugins: [],
};