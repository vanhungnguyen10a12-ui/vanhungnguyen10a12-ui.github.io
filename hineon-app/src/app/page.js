import ProductCard from '../../components/ProductCard';

// Dữ liệu sản phẩm mẫu.
const products = [
  {
    id: 'led-bulb-01', // ID phải là duy nhất và dạng chuỗi
    name: 'LED Bulb Thông Minh',
    description: 'Ánh sáng dịu nhẹ, tiết kiệm đến 80% điện năng.',
    imageUrl: 'https://i.postimg.cc/YCm4mQBj/z6862736383930-cbab8fb05140fbe373a5997345f53f90.jpg'
  },
  {
    id: 'led-strip-02',
    name: 'LED Dây Trang Trí',
    description: 'Linh hoạt, đa sắc màu, thổi bùng sức sống.',
    imageUrl: 'https://i.postimg.cc/YCm4mQBj/z6862736383930-cbab8fb05140fbe373a5997345f53f90.jpg'
  },
  {
    id: 'led-panel-03',
    name: 'LED Panel Âm Trần',
    description: 'Thiết kế tinh tế, giải pháp cho văn phòng.',
    imageUrl: 'https://i.postimg.cc/YCm4mQBj/z6862736383930-cbab8fb05140fbe373a5997345f53f90.jpg'
  }
];

export default function HomePage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-blue-800">HINEON</h1>
        </div>
      </header>
      <main className="container mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Sản Phẩm Của Chúng Tôi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}