'use client';

import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import { motion } from 'framer-motion';
import { Zap, Smartphone, ShieldCheck } from 'lucide-react';
import { db } from '../lib/firebase'; // Import db
import { collection, getDocs } from 'firebase/firestore'; // Import firestore functions

// Xóa mảng dữ liệu ảo
// const products = [ ... ];

const Footer = () => ( <footer className="w-full border-t border-brand-dark-light/50 bg-brand-dark"> <div className="container mx-auto px-4 py-8 sm:px-6"> <p className="text-center text-sm text-neutral-400">&copy; {new Date().getFullYear()} HINEON. Dẫn đầu công nghệ chiếu sáng.</p> </div> </footer> );
const FeaturesSection = () => { const features = [ { icon: Zap, title: "Tiết Kiệm Năng Lượng", description: "Công nghệ LED tiên tiến giúp giảm đến 80% chi phí điện năng." }, { icon: Smartphone, title: "Điều Khiển Thông Minh", description: "Dễ dàng điều khiển độ sáng, màu sắc qua ứng dụng di động." }, { icon: ShieldCheck, title: "Bền Bỉ Vượt Trội", description: "Tuổi thọ lên đến 50,000 giờ, hoạt động ổn định và an toàn." } ]; return ( <section id="features" className="py-20 sm:py-24 bg-brand-dark-light"> <div className="container mx-auto px-4 sm:px-6"> <div className="mx-auto max-w-2xl text-center"> <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Công Nghệ Dẫn Lối</h2> <p className="mt-4 text-lg text-neutral-400">Trải nghiệm sự khác biệt với những tính năng ưu việt.</p> </div> <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3"> {features.map((feature, index) => ( <motion.div key={index} className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.2 }} viewport={{ once: true }}> <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-dark-lighter shadow-lg"> <feature.icon className="h-8 w-8 text-hineon-blue-light" /> </div> <h3 className="mt-6 text-xl font-semibold text-white">{feature.title}</h3> <p className="mt-2 text-base text-neutral-400">{feature.description}</p> </motion.div> ))} </div> </div> </section> ); };

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productList);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative flex h-[calc(100vh-80px)] min-h-[600px] items-center justify-center overflow-hidden text-center"> <div className="absolute inset-0 z-0 bg-brand-dark"></div> <motion.div className="relative z-10 px-4" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}> <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl animate-glow"> Thắp Sáng Tương Lai </h1> <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300"> Dẫn đầu công nghệ chiếu sáng LED. Hiện đại - Thông minh - Bền bỉ. </p> <div className="mt-10"> <a href="#products" className="rounded-full bg-hineon-blue px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-hineon-blue/30 transition-all hover:scale-105 hover:bg-hineon-blue-light hover:text-brand-dark"> Khám phá sản phẩm </a> </div> </motion.div> </section>
        <FeaturesSection />
        <section id="products" className="py-20 sm:py-24"> <div className="container mx-auto px-4 sm:px-6"> <div className="mx-auto max-w-2xl text-center"> <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Bộ Sưu Tập Đèn LED</h2> <p className="mt-4 text-lg text-neutral-400">Những thiết kế được chế tác để nâng tầm không gian sống của bạn.</p> </div> 
        {loading ? (
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (<div key={i} className="h-96 w-full animate-pulse rounded-xl bg-brand-dark-light"></div>))}
          </div>
        ) : (
          <motion.div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}> 
            {products.map((product) => ( <ProductCard key={product.id} product={product} /> ))} 
          </motion.div>
        )}
        </div> </section>
      </main>
      <Footer />
    </>
  );
}