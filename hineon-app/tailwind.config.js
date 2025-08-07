/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'hineon-blue': {
          DEFAULT: '#00529B',
          'dark': '#003d74',
        },
        'hineon-gold': '#D4AF37',
        'neutral': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
    },
  },
  // QUAN TRỌNG: Thêm plugin này để sử dụng `aspect-ratio`
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};