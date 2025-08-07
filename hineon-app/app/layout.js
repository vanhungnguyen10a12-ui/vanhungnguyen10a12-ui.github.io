
export const metadata = {
  title: 'HINEON - Giải Pháp Chiếu Sáng',
  description: 'Trang web được tạo bởi Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}