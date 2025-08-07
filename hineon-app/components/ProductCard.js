'use client';

import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase'; // Import db từ file cấu hình
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";

function ProductCard({ product }) {
  const [likes, setLikes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Sử dụng useEffect để lấy dữ liệu lượt thích từ Firestore khi component được tải
  useEffect(() => {
    if (!db || !product?.id) {
      console.error("Firestore chưa được khởi tạo hoặc product.id không tồn tại.");
      setIsLoading(false);
      return;
    }

    const fetchLikes = async () => {
      const productRef = doc(db, 'products', product.id);
      try {
        const docSnap = await getDoc(productRef);
        if (docSnap.exists()) {
          setLikes(docSnap.data().likes || 0);
        } else {
          // Nếu sản phẩm chưa có trong DB, tạo mới với 0 lượt thích
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

  // Hàm xử lý khi người dùng nhấn nút Thích
  const handleLike = async () => {
    if (!db) return;
    const productRef = doc(db, 'products', product.id);
    try {
      // Tăng giá trị 'likes' lên 1 một cách an toàn
      await updateDoc(productRef, {
        likes: increment(1)
      });
      setLikes(prevLikes => prevLikes + 1);
    } catch (e) {
      console.error("Lỗi khi cập nhật lượt thích:", e);
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
      <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleLike}
            disabled={isLoading || !db}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:bg-gray-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.562 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            Thích
          </button>
          {isLoading ? (
            <div className="text-gray-500">Đang tải...</div>
          ) : (
            <div className="text-lg font-bold text-gray-700">
              {likes} ❤️
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;