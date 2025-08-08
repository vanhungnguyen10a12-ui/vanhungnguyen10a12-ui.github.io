'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Header from './Header'; // Sửa đường dẫn

const Footer = () => ( <footer className="w-full border-t border-brand-dark-light/50 bg-brand-dark"> <div className="container mx-auto px-4 py-8 sm:px-6"> <p className="text-center text-sm text-neutral-400">&copy; {new Date().getFullYear()} HINEON. Dẫn đầu công nghệ chiếu sáng.</p> </div> </footer> );

export default function ProductDetailClient({ product }) {
    const { user } = useAuth();
    const router = useRouter();

    const handleAddToCart = () => {
        if (!product) return;
        if (user) {
            alert(`Đã thêm ${product.name} vào giỏ hàng!`);
        } else {
            router.push(`/login?redirect=/products/${product.id}`);
        }
    };

    if (!product) {
        return (
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-white">Sản phẩm không tồn tại</h1>
                        <Link href="/" className="mt-4 inline-block text-hineon-blue-light hover:underline">
                            Quay về trang chủ
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const { name = "Sản phẩm không tên", description = "Không có mô tả.", imageUrl = "https://placehold.co/1200x800/161B22/7DF9FF?text=HINEON", price = 0, tag } = product;

    return (
        <div className="flex min-h-screen flex-col">
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
                                <Image src={imageUrl} alt={name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                            </motion.div>
                            <motion.div className="flex flex-col" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.4 }}>
                                {tag && <span className="w-fit rounded-full bg-hineon-blue/20 px-3 py-1 text-sm font-semibold text-hineon-blue-light">{tag}</span>}
                                <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{name}</h1>
                                <p className="mt-4 text-lg text-neutral-400">{description}</p>
                                <div className="mt-8 flex-1 border-t border-brand-dark-lighter pt-8">
                                    <p className="text-4xl font-bold text-white">{price.toLocaleString('vi-VN')} ₫</p>
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
        </div>
    );
}