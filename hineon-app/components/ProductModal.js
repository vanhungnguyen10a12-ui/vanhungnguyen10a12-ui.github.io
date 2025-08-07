'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
};

const modalVariants = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: { y: "0", opacity: 1, transition: { delay: 0.2, type: 'spring', stiffness: 120 } }
};

function ProductModal({ product, onClose }) {
  // Ngăn cuộn trang nền khi modal đang mở
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose} // Đóng modal khi click vào nền
    >
      <motion.div
        className="relative mx-4 w-full max-w-2xl rounded-lg bg-white"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()} // Ngăn click bên trong modal đóng nó
      >
        <div className="grid md:grid-cols-2">
          <div className="relative h-64 md:h-full">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="rounded-l-lg object-cover"
            />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-hineon-blue">{product.name}</h2>
            <p className="mt-2 text-sm text-gray-500">{product.description}</p>
            <div className="mt-4 border-t pt-4">
              <p className="text-2xl font-extrabold text-neutral-900">
                {product.price ? `${product.price.toLocaleString('vi-VN')} ₫` : 'Giá liên hệ'}
              </p>
            </div>
            <button className="mt-6 w-full rounded-lg bg-hineon-blue py-3 font-semibold text-white transition-transform hover:scale-105">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
        <button onClick={onClose} className="absolute top-2 right-2 rounded-full bg-gray-200 p-1 text-gray-600 hover:bg-gray-300">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </motion.div>
    </motion.div>
  );
}

export default ProductModal;