import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });

export const metadata = {
  title: 'HINEON - Giải Pháp Chiếu Sáng Chuyên Nghiệp',
  description: 'Cung cấp các sản phẩm LED và giải pháp chiếu sáng chất lượng cao, hiện đại và tiết kiệm năng lượng.',
  icons: {
    icon: 'https://placehold.co/32x32/00529B/FFFFFF/png?text=H',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}