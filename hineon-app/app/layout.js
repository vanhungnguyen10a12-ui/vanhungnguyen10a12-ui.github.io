import './globals.css';
import { Inter } from 'next/font/google';

// Tối ưu hóa font chữ với next/font
const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'HINEON - Giải Pháp Chiếu Sáng Chuyên Nghiệp',
  description: 'Cung cấp các sản phẩm LED và giải pháp chiếu sáng chất lượng cao, hiện đại và tiết kiệm năng lượng.',
  icons: {
    icon: 'https://placehold.co/32x32/00529B/FFFFFF/png?text=H', // Favicon mẫu
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={inter.variable}>
      <body>
        <div className="flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}