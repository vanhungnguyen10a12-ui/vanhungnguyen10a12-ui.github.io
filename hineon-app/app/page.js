import ProductCard from '../../components/ProductCard';

// Dữ liệu sản phẩm mẫu với hình ảnh đa dạng hơn
const products = [
  {
    id: 'led-bulb-01',
    name: 'LED Bulb Thông Minh',
    description: 'Ánh sáng dịu nhẹ, điều khiển qua app, tiết kiệm đến 80% điện năng.',
    imageUrl: 'https://images.unsplash.com/photo-1588821323333-df33b647206d?q=80&w=800&auto=format&fit=crop',
    price: 250000,
  },
  {
    id: 'led-strip-02',
    name: 'LED Dây 16 Triệu Màu',
    description: 'Linh hoạt, đa sắc màu, thổi bùng sức sống cho mọi không gian.',
    imageUrl: 'https://images.unsplash.com/photo-1597232247968-428a1a3e4b39?q=80&w=800&auto=format&fit=crop',
    price: 480000,
  },
  {
    id: 'led-panel-03',
    name: 'LED Panel Âm Trần',
    description: 'Thiết kế tinh tế, ánh sáng đều, giải pháp cho văn phòng hiện đại.',
    imageUrl: 'https://images.unsplash.com/photo-1629429408210-d8a435352516?q=80&w=800&auto=format&fit=crop',
    price: 790000,
  }
];

// Component Header
const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md">
    <div className="container mx-auto flex h-16 items-center justify-between px-6">
      <div className="text-2xl font-extrabold tracking-tight text-hineon-blue">
        HINEON
      </div>
      <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
        <a href="#" className="text-neutral-900 transition-colors hover:text-hineon-blue">Trang chủ</a>
        <a href="#" className="text-neutral-900 transition-colors hover:text-hineon-blue">Sản phẩm</a>
        <a href="#" className="text-neutral-900 transition-colors hover:text-hineon-blue">Liên hệ</a>
      </nav>
      <button className="rounded-md bg-hineon-blue px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-hineon-blue-dark">
        Tư vấn ngay
      </button>
    </div>
  </header>
);

// Component Footer
const Footer = () => (
   <footer className="w-full border-t border-neutral-200 bg-white">
    <div className="container mx-auto grid grid-cols-1 gap-8 px-6 py-12 md:grid-cols-4">
      <div>
        <h3 className="text-xl font-bold text-hineon-blue">HINEON</h3>
        <p className="mt-2 text-sm text-gray-600">Giải pháp chiếu sáng chuyên nghiệp.</p>
      </div>
      <div>
        <h4 className="font-semibold text-gray-800">Sản phẩm</h4>
        <ul className="mt-4 space-y-2 text-sm">
          <li><a href="#" className="text-gray-600 hover:text-hineon-blue">Đèn LED Bulb</a></li>
          <li><a href="#" className="text-gray-600 hover:text-hineon-blue">Đèn LED Dây</a></li>
          <li><a href="#" className="text-gray-600 hover:text-hineon-blue">Đèn LED Panel</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-gray-800">Công ty</h4>
        <ul className="mt-4 space-y-2 text-sm">
          <li><a href="#" className="text-gray-600 hover:text-hineon-blue">Về chúng tôi</a></li>
          <li><a href="#" className="text-gray-600 hover:text-hineon-blue">Tuyển dụng</a></li>
        </ul>
      </div>
       <div>
        <h4 className="font-semibold text-gray-800">Theo dõi chúng tôi</h4>
        {/* Social media icons would go here */}
      </div>
    </div>
    <div className="border-t border-neutral-200 py-6">
      <p className="text-center text-sm text-gray-500">&copy; 2024 HINEON. All Rights Reserved.</p>
    </div>
  </footer>
);


export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-6 py-16 text-center md:py-24">
            <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 md:text-6xl">
              Thắp Sáng Tương Lai Của Bạn
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Khám phá các sản phẩm chiếu sáng LED hàng đầu, kết hợp giữa công nghệ hiện đại và thiết kế tinh tế.
            </p>
        </section>
        
        <section id="products" className="bg-neutral-100 py-16 md:py-24">
           <div className="container mx-auto px-6">
             <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">Sản Phẩm Nổi Bật</h2>
                <p className="mx-auto mt-4 max-w-xl text-gray-600">Những giải pháp chiếu sáng được tin dùng và yêu thích nhất.</p>
             </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
           </div>
        </section>
      </main>
      <Footer />
    </>
  );
}