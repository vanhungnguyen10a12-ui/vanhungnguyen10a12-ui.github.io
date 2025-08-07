
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const backdropVariants = { visible: { opacity: 1 }, hidden: { opacity: 0 } };
const modalVariants = { hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } } };

function ProductModal({ product, onClose }) {
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" variants={backdropVariants} initial="hidden" animate="visible" exit="hidden" onClick={onClose}>
      <motion.div className="relative mx-4 w-full max-w-3xl rounded-xl bg-brand-dark-light shadow-2xl shadow-hineon-blue/10" variants={modalVariants} onClick={(e) => e.stopPropagation()}>
        <div className="grid md:grid-cols-2">
          <div className="relative h-80 md:h-auto">
            <Image src={product.imageUrl} alt={product.name} fill className="rounded-t-xl md:rounded-l-xl md:rounded-tr-none object-cover" />
          </div>
          <div className="flex flex-col p-8">
            <h2 className="text-3xl font-bold text-white">{product.name}</h2>
            <p className="mt-3 text-base text-neutral-400">{product.description}</p>
            <div className="mt-6 flex-1 border-t border-brand-dark-lighter pt-6">
              <p className="text-3xl font-extrabold text-hineon-blue-light">
                {product.price ? `${product.price.toLocaleString('vi-VN')} ₫` : 'Giá liên hệ'}
              </p>
            </div>
            <button className="mt-6 w-full rounded-lg bg-hineon-blue py-3.5 font-semibold text-white transition-all hover:scale-105 hover:bg-hineon-blue-light hover:text-brand-dark">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 rounded-full bg-brand-dark/50 p-1.5 text-neutral-400 transition-colors hover:bg-brand-dark-lighter hover:text-white">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </motion.div>
    </motion.div>
  );
}

export default ProductModal;
