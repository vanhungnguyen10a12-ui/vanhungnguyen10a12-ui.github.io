import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });
export const metadata = { title: 'HINEON - Thắp Sáng Tương Lai', description: 'Dẫn đầu công nghệ chiếu sáng LED. Hiện đại - Thông minh - Bền bỉ.', icons: { icon: 'https://placehold.co/32x32/00BFFF/0D1117/png?text=H' } };

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            {children}
          </div>
          <AuthModal />
        </AuthProvider>
        {/* Thẻ div#modal-root không còn cần thiết nữa */}
      </body>
    </html>
  );
}