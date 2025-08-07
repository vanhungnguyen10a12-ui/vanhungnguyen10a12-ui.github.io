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
      } catch (e) {
        console.error("Lỗi khi lấy dữ liệu:", e);
      }
      setIsLoading(false);
    };
    fetchLikes();
  }, [product.id, product.name]);

  const handleLike = async () => {
    if (!db) return;
    const productRef = doc(db, 'products', product.id);
    try {
      await updateDoc(productRef, { likes: increment(1) });
      setLikes(prevLikes => prevLikes + 1);
    } catch (e) {
      console.error("Lỗi khi cập nhật lượt thích:", e);
    }
  };

  return (
    <div className="group overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
      <div className="relative overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-110"
          // Thêm fallback image
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/e2e8f0/334155?text=Image+Error'; }}
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-neutral-900">{product.name}</h3>
        <p className="mt-2 h-12 text-sm text-gray-600">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
           <p className="text-xl font-bold text-hineon-blue">
              {product.price ? `${product.price.toLocaleString('vi-VN')} ₫` : 'Liên hệ'}
           </p>
          <div className="flex items-center gap-3">
             {isLoading ? (
              <div className="h-8 w-16 animate-pulse rounded-full bg-gray-200"></div>
            ) : (
              <button
                onClick={handleLike}
                className="flex items-center gap-1 rounded-full border border-gray-300 px-3 py-1 text-sm text-gray-600 transition-colors hover:border-red-500 hover:bg-red-50 hover:text-red-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span>{likes}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;