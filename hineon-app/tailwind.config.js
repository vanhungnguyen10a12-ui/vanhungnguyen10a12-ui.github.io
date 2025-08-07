/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Giữ lại phần màu sắc, nó an toàn và không gây lỗi.
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
  plugins: [],
};