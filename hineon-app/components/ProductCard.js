'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link
import { db } from '../lib/firebase';
import { doc, onSnapshot, updateDoc, increment, setDoc } from "firebase/firestore";
import { motion } from 'framer-motion';

const cardVariants = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } } };

function ProductCard({ product }) {
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    if (!product?.id) return;
    const productRef = doc(db, 'products', product.id);
    const unsubscribe = onSnapshot(productRef, async (docSnap) => {
      if (docSnap.exists()) { setLikes(docSnap.data().likes || 0); } 
      else { await setDoc(productRef, { likes: 0, name: product.name }); }
    });
    return () => unsubscribe();
  }, [product.id, product.name]);

  const handleLike = async (e) => {
    e.stopPropagation(); e.preventDefault();
    setLikes(prev => prev + 1);
    const productRef = doc(db, 'products', product.id);
    try { await updateDoc(productRef, { likes: increment(1) }); } 
    catch (e) { setLikes(prev => prev - 1); console.error("Lỗi khi thích:", e); }
  };

  return (
    <motion.div variants={cardVariants}>
      <Link href={`/products/${product.id}`} className="group relative block overflow-hidden rounded-xl bg-brand-dark-light transition-all duration-300">
        <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-hineon-blue to-hineon-blue-light opacity-0 transition-opacity duration-300 group-hover:opacity-75"></div>
        <div className="relative flex flex-col rounded-lg bg-brand-dark-light p-1">
          <div className="relative h-60 w-full overflow-hidden rounded-lg">
            <Image src={product.imageUrl} alt={product.name} fill sizes="33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          {product.tag && ( <div className="absolute top-4 left-4 z-10 rounded-full bg-brand-dark/50 px-3 py-1 text-xs font-bold text-hineon-blue-light backdrop-blur-sm">{product.tag}</div> )}
          <div className="flex flex-1 flex-col p-4">
            <h3 className="text-lg font-bold text-white">{product.name}</h3>
            <p className="mt-2 flex-1 text-sm text-neutral-400">{product.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xl font-extrabold text-white">{product.price.toLocaleString('vi-VN')} ₫</p>
              <motion.button onClick={handleLike} className="flex items-center gap-1.5 rounded-full bg-brand-dark-lighter px-3 py-1.5 text-sm text-hineon-blue-light transition-colors hover:bg-hineon-blue hover:text-white" whileTap={{ scale: 0.95 }}>
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9-22.045 22.045 0 01-2.582-1.9A20.759 20.759 0 012.99 11.3l.005-.003.019-.01.033-.018a7.054 7.054 0 011.25-1.01A7.054 7.054 0 018.38 8.02a7.054 7.054 0 014.288 1.258 7.054 7.054 0 011.25 1.01l.033.018.019.01.005.003a20.759 20.759 0 011.162.682 22.045 22.045 0 012.582 1.9 22.045 22.045 0 012.582 1.9 20.759 20.759 0 01.341.34l.005.003.019.01.033.018a7.054 7.054 0 01-4.288 1.258 7.054 7.054 0 01-4.288-1.258 7.054 7.054 0 01-1.25-1.01l-.033-.018-.019-.01z"/></svg>
                <span>{likes}</span>
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default ProductCard;