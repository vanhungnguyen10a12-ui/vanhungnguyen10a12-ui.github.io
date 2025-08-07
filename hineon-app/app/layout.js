import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'HINEON - Giải Pháp Chiếu Sáng Chuyên Nghiệp',
  description: 'Cung cấp các sản phẩm LED và giải pháp chiếu sáng chất lượng cao.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={inter.className}>{children}</body>
    </html>
  );
}