'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import Header from '../components/Header'; // Import Header mới

const products = [ { id: 'led-bulb-01', name: 'LED Bulb Aura+', description: 'Ánh sáng quang phổ, điều khiển qua app, tiết kiệm đến 80% điện năng.', imageUrl: 'https://i.postimg.cc/YCm4mQBj/z6862736383930-cbab8fb05140fbe373a5997345f53f90.jpg', price: 350000, tag: 'Smart' }, { id: 'led-strip-02', name: 'LED Dây NeonFlex', description: 'Uốn dẻo linh hoạt, 16 triệu màu, đồng bộ với âm nhạc.', imageUrl: 'https://i.postimg.cc/YCm4mQBj/z6862736383930-cbab8fb05140fbe373a5997345f53f90.jpg', price: 680000, tag: 'RGB' }, { id: 'led-panel-03', name: 'LED Panel SkyView', description: 'Mô phỏng ánh sáng tự nhiên, giảm mỏi mắt, cho văn phòng hiện đại.', imageUrl: 'https://i.postimg.cc/YCm4mQBj/z6862736383930-cbab8fb05140fbe373a5997345f53f90.jpg', price: 1290000, tag: 'Pro' } ];
const Footer = () => ( <footer className="w-full border-t border-brand-dark-light/50 bg-brand-dark"> <div className="container mx-auto px-4 py-8 sm:px-6"> <p className="text-center text-sm text-neutral-400">&copy; {new Date().getFullYear()} HINEON. Dẫn đầu công nghệ chiếu sáng.</p> </div> </footer> );

export default function ProductDetailPage({ params }) {
    const { user, openAuthModal } = useAuth(); // Lấy user và hàm mở modal
    const product = products.find(p => p.id === params.id);

    const handleAddToCart = () => {
        if (user) {
            // Logic thêm vào giỏ hàng thật sẽ ở đây
            alert(`Đã thêm ${product.name} vào giỏ hàng!`);
        } else {
            // Nếu chưa đăng nhập, mở modal
            openAuthModal();
        }
    };

    if (!product) { /* ... */ }

    return (
        <>
            <Header />
            <main className="flex-1 bg-brand-dark-light">
                <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-20">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <Link href="/#products" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-hineon-blue-light">
                            <ChevronLeft size={16} />
                            Quay lại danh sách sản phẩm
                        </Link>
                        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                            <motion.div className="relative h-96 w-full overflow-hidden rounded-xl lg:h-full" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
                                <Image src={product.imageUrl} alt={product.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                            </motion.div>
                            <motion.div className="flex flex-col" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.4 }}>
                                {product.tag && <span className="w-fit rounded-full bg-hineon-blue/20 px-3 py-1 text-sm font-semibold text-hineon-blue-light">{product.tag}</span>}
                                <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{product.name}</h1>
                                <p className="mt-4 text-lg text-neutral-400">{product.description}</p>
                                <div className="mt-8 flex-1 border-t border-brand-dark-lighter pt-8">
                                    <p className="text-4xl font-bold text-white">{product.price.toLocaleString('vi-VN')} ₫</p>
                                </div>
                                <button onClick={handleAddToCart} className="mt-8 w-full rounded-lg bg-hineon-blue py-4 text-base font-semibold text-white shadow-2xl shadow-hineon-blue/30 transition-all hover:scale-105 hover:bg-hineon-blue-light hover:text-brand-dark">
                                    Thêm vào giỏ hàng
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </>
    );
}