/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
       // Bạn có thể mở rộng theme ở đây, ví dụ thêm màu sắc thương hiệu
       colors: {
        'hineon-blue': '#00529B',
        'hineon-gold': '#D4AF37',
      },
    },
  },
  plugins: [],
};
