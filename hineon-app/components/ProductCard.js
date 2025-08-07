'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Sử dụng Next/Image để tối ưu ảnh
import { db } from '../lib/firebase';
import { doc, onSnapshot, updateDoc, increment, setDoc } from "firebase/firestore"; // Import onSnapshot
import { motion } from 'framer-motion';

// Định nghĩa variant cho animation của từng card
const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

function ProductCard({ product, onCardClick }) {
  const [likes, setLikes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiking, setIsLiking] = useState(false);

  // SỬ DỤNG ONSNAPSHOT ĐỂ LẮNG NGHE THAY ĐỔI THEO THỜI GIAN THỰC
  useEffect(() => {
    if (!product?.id) {
      setIsLoading(false);
      return;
    }
    const productRef = doc(db, 'products', product.id);
    
    // onSnapshot sẽ tự động chạy lại mỗi khi dữ liệu trên server thay đổi
    const unsubscribe = onSnapshot(productRef, async (docSnap) => {
      if (docSnap.exists()) {
        setLikes(docSnap.data().likes || 0);
      } else {
        // Nếu sản phẩm chưa có trong DB, tạo mới với 0 lượt thích
        await setDoc(productRef, { likes: 0, name: product.name });
        setLikes(0);
      }
      setIsLoading(false);
    }, (error) => {
      console.error("Lỗi khi lắng nghe dữ liệu:", error);
      setIsLoading(false);
    });

    // Hàm dọn dẹp: Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, [product.id, product.name]);

  // HÀM LIKE VỚI OPTIMISTIC UI
  const handleLike = async (e) => {
    e.stopPropagation(); // Ngăn sự kiện click lan ra thẻ cha (không mở modal)
    if (isLiking) return;

    setIsLiking(true);
    
    // 1. Cập nhật UI ngay lập tức (Optimistic)
    setLikes(prevLikes => prevLikes + 1);

    // 2. Gửi yêu cầu lên server
    const productRef = doc(db, 'products', product.id);
    try {
      await updateDoc(productRef, { likes: increment(1) });
    } catch (e) {
      // 3. Nếu lỗi, hoàn tác lại thay đổi trên UI
      setLikes(prevLikes => prevLikes - 1);
      console.error("Lỗi khi cập nhật lượt thích:", e);
      // Ở đây có thể thêm thông báo lỗi cho người dùng
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
      onClick={onCardClick}
    >
      <div className="relative h-56 w-full overflow-hidden bg-neutral-100">
        <Image // SỬ DỤNG NEXT/IMAGE
          src={product.imageUrl} 
          alt={product.name} 
          fill // Thuộc tính fill để ảnh tự lấp đầy thẻ cha
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/800x600/e2e8f0/334155?text=Image+Error'; }}
        />
      </div>

      {product.tag && ( <div className="absolute top-3 left-3 z-10 rounded-full bg-hineon-blue px-3 py-1 text-xs font-bold text-white"> {product.tag} </div> )}

      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-base font-semibold text-neutral-900">{product.name}</h3>
        <p className="flex-1 text-sm text-gray-500">{product.description}</p>
        <div className="flex items-end justify-between pt-2">
          <p className="text-lg font-bold text-hineon-blue">{product.price ? `${product.price.toLocaleString('vi-VN')} ₫` : 'Liên hệ'}</p>
          <motion.button
            onClick={handleLike}
            disabled={isLoading || isLiking}
            className="flex items-center gap-1.5 rounded-full border border-gray-300 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:border-red-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
            whileTap={{ scale: 0.9 }} // Hiệu ứng khi nhấn
          >
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
            <span>{likes}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;