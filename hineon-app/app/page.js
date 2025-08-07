import ProductCard from '../../components/ProductCard';

const products = [
  {
    id: 'led-bulb-01',
    name: 'LED Bulb Thông Minh',
    description: 'Ánh sáng dịu nhẹ, điều khiển qua app, tiết kiệm đến 80% điện năng.',
    imageUrl: 'https://i.postimg.cc/YCm4mQBj/z6862736383930-cbab8fb05140fbe373a5997345f53f90.jpg',
    price: 250000,
    tag: 'Bán chạy',
  },
  {
    id: 'led-strip-02',
    name: 'LED Dây 16 Triệu Màu',
    description: 'Linh hoạt, đa sắc màu, thổi bùng sức sống cho mọi không gian.',
    imageUrl: 'https://i.postimg.cc/YCm4mQBj/z6862736383930-cbab8fb05140fbe373a5997345f53f90.jpg',
    price: 480000,
    tag: 'Mới',
  },
  {
    id: 'led-panel-03',
    name: 'LED Panel Âm Trần',
    description: 'Thiết kế tinh tế, ánh sáng đều, giải pháp cho văn phòng hiện đại.',
    imageUrl: 'https://i.postimg.cc/YCm4mQBj/z6862736383930-cbab8fb05140fbe373a5997345f53f90.jpg',
    price: 790000,
  }
];

const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b border-neutral-200/80 bg-white/80 backdrop-blur-md">
    <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
      <a href="#" className="text-2xl font-extrabold tracking-tight text-hineon-blue">
        HINEON
      </a>
      <nav className="hidden items-center space-x-8 text-sm font-medium md:flex">
        <a href="#" className="text-neutral-800 transition-colors hover:text-hineon-blue">Trang chủ</a>
        <a href="#products" className="text-neutral-800 transition-colors hover:text-hineon-blue">Sản phẩm</a>
        <a href="#" className="text-neutral-800 transition-colors hover:text-hineon-blue">Liên hệ</a>
      </nav>
      <a href="#" className="hidden sm:inline-block rounded-lg bg-hineon-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-105 hover:bg-hineon-blue-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hineon-blue">
        Nhận tư vấn
      </a>
    </div>
  </header>
);

const Footer = () => (
   <footer className="w-full border-t border-neutral-200 bg-neutral-50">
    <div className="container mx-auto grid grid-cols-2 gap-8 px-4 py-16 sm:px-6 md:grid-cols-4">
      <div className="col-span-2 md:col-span-1">
        <h3 className="text-xl font-bold text-hineon-blue">HINEON</h3>
        <p className="mt-2 text-sm text-gray-600">Thắp sáng tương lai của bạn.</p>
      </div>
      <div>
        <h4 className="font-semibold text-gray-900">Sản phẩm</h4>
        <ul className="mt-4 space-y-3 text-sm">
          <li><a href="#" className="text-gray-600 hover:text-hineon-blue">Đèn LED Bulb</a></li>
          <li><a href="#" className="text-gray-600 hover:text-hineon-blue">Đèn LED Dây</a></li>
          <li><a href="#" className="text-gray-600 hover:text-hineon-blue">Đèn LED Panel</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-gray-900">Công ty</h4>
        <ul className="mt-4 space-y-3 text-sm">
          <li><a href="#" className="text-gray-600 hover:text-hineon-blue">Về chúng tôi</a></li>
          <li><a href="#" className="text-gray-600 hover:text-hineon-blue">Dự án</a></li>
          <li><a href="#" className="text-gray-600 hover:text-hineon-blue">Tuyển dụng</a></li>
        </ul>
      </div>
       <div className="col-span-2 md:col-span-1">
        <h4 className="font-semibold text-gray-900">Đăng ký nhận tin</h4>
        <p className="mt-2 text-sm text-gray-600">Nhận thông tin về sản phẩm mới và các chương trình khuyến mãi.</p>
        <div className="mt-4 flex">
            <input type="email" placeholder="Email của bạn" className="w-full rounded-l-md border-gray-300 px-3 py-2 text-sm shadow-sm" />
            <button className="rounded-r-md bg-hineon-blue px-4 text-sm font-semibold text-white hover:bg-hineon-blue-dark">Đăng ký</button>
        </div>
      </div>
    </div>
    <div className="border-t border-neutral-200 py-8">
      <p className="text-center text-sm text-gray-500">&copy; {new Date().getFullYear()} HINEON. All Rights Reserved.</p>
    </div>
  </footer>
);

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative bg-neutral-100">
            <div className="container mx-auto grid items-center gap-8 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-32">
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
                      <span className="block">Giải Pháp Chiếu Sáng</span>
                      <span className="block text-hineon-blue">Đẳng Cấp & Tinh Tế</span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-lg text-lg text-gray-600 lg:mx-0">
                      Khám phá các sản phẩm chiếu sáng LED hàng đầu, kết hợp giữa công nghệ hiện đại và thiết kế sang trọng.
                    </p>
                    <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                        <a href="#products" className="w-full sm:w-auto rounded-lg bg-hineon-blue px-6 py-3 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-hineon-blue-dark">
                            Xem sản phẩm
                        </a>
                         <a href="#" className="w-full sm:w-auto rounded-lg border border-neutral-300 bg-white px-6 py-3 text-base font-semibold text-neutral-800 shadow-lg transition-transform hover:scale-105">
                            Liên hệ
                        </a>
                    </div>
                </div>
                <div className="hidden lg:block">
                    <img src="https://images.unsplash.com/photo-1617362337269-e33a2b5a6d51?q=80&w=800&auto=format&fit=crop" alt="Modern lighting" className="rounded-2xl shadow-2xl" />
                </div>
            </div>
        </section>
        
        <section id="products" className="py-20 sm:py-24">
           <div className="container mx-auto px-4 sm:px-6">
             <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">Sản Phẩm Nổi Bật</h2>
                <p className="mt-4 text-lg text-gray-600">Những giải pháp chiếu sáng được tin dùng và yêu thích nhất.</p>
             </div>
            <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
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