'use client';

import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";

function ProductCard({ product }) {
  const [likes, setLikes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!db || !product?.id) {
      setIsLoading(false);
      return;
    }
    const productRef = doc(db, 'products', product.id);
    const fetchLikes = async () => {
      try {
        const docSnap = await getDoc(productRef);
        if (docSnap.exists()) {
          setLikes(docSnap.data().likes || 0);
        } else {
          await setDoc(productRef, { likes: 0, name: product.name });
          setLikes(0);
        }
      } catch (e) { console.error("Lỗi khi lấy dữ liệu:", e); }
      setIsLoading(false);
    };
    fetchLikes();
  }, [product.id, product.name]);

  const handleLike = async (e) => {
    e.preventDefault(); 
    if (!db) return;
    const productRef = doc(db, 'products', product.id);
    try {
      await updateDoc(productRef, { likes: increment(1) });
      setLikes(prevLikes => prevLikes + 1);
    } catch (e) { console.error("Lỗi khi cập nhật lượt thích:", e); }
  };

  return (
    <a href="#" className="group relative flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="relative overflow-hidden bg-neutral-100">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/800x600/e2e8f0/334155?text=Image+Error'; }}
        />
      </div>

      {product.tag && (
        <div className="absolute top-3 left-3 rounded-full bg-hineon-blue px-3 py-1 text-xs font-bold text-white">
            {product.tag}
        </div>
      )}

      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-base font-semibold text-neutral-900">
          {product.name}
        </h3>
        <p className="flex-1 text-sm text-gray-500">{product.description}</p>
        
        <div className="flex items-end justify-between pt-2">
          <p className="text-lg font-bold text-hineon-blue">
            {product.price ? `${product.price.toLocaleString('vi-VN')} ₫` : 'Liên hệ'}
          </p>
          
          <button
            onClick={handleLike}
            disabled={isLoading}
            className="flex items-center gap-1.5 rounded-full border border-gray-300 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:border-red-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
          >
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span>{likes}</span>
          </button>
        </div>
      </div>
    </a>
  );
}

// DÒNG BỊ THIẾU ĐÃ ĐƯỢC THÊM LẠI Ở ĐÂY
export default ProductCard;