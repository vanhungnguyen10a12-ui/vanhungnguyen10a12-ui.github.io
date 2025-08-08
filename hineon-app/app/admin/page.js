'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import { db } from '../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';

function AdminDashboard() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [tag, setTag] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            await addDoc(collection(db, "products"), {
                name,
                description,
                price: Number(price), // Chuyển giá thành dạng số
                imageUrl,
                tag,
                likes: 0 // Khởi tạo lượt thích là 0
            });
            setMessage('Thêm sản phẩm thành công!');
            // Xóa trống form
            setName('');
            setDescription('');
            setPrice('');
            setImageUrl('');
            setTag('');
        } catch (error) {
            console.error("Lỗi khi thêm sản phẩm: ", error);
            setMessage('Có lỗi xảy ra, vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">Trang Quản Trị - Thêm Sản Phẩm</h1>
            <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-xl bg-brand-dark-light">
                {/* Các trường nhập liệu cho sản phẩm */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-300">Tên sản phẩm</label>
                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 w-full rounded-lg border-brand-dark-lighter bg-brand-dark p-3 text-white" />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-neutral-300">Mô tả</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={3} className="mt-1 w-full rounded-lg border-brand-dark-lighter bg-brand-dark p-3 text-white"></textarea>
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-neutral-300">Giá (chỉ nhập số)</label>
                    <input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="mt-1 w-full rounded-lg border-brand-dark-lighter bg-brand-dark p-3 text-white" />
                </div>
                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-neutral-300">URL Hình ảnh</label>
                    <input id="imageUrl" type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required className="mt-1 w-full rounded-lg border-brand-dark-lighter bg-brand-dark p-3 text-white" />
                </div>
                <div>
                    <label htmlFor="tag" className="block text-sm font-medium text-neutral-300">Tag (ví dụ: Smart, RGB, Pro)</label>
                    <input id="tag" type="text" value={tag} onChange={(e) => setTag(e.target.value)} className="mt-1 w-full rounded-lg border-brand-dark-lighter bg-brand-dark p-3 text-white" />
                </div>
                {message && <p className={`text-center text-sm ${message.includes('thành công') ? 'text-green-400' : 'text-red-400'}`}>{message}</p>}
                <div>
                    <button type="submit" disabled={loading} className="w-full rounded-lg bg-hineon-blue py-3 font-semibold text-white transition-all hover:scale-105 disabled:opacity-50">
                        {loading ? 'Đang xử lý...' : 'Thêm Sản Phẩm'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default function AdminPage() {
    const { user, loading, isAdmin } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Nếu chưa loading xong và chưa có user, không làm gì cả
        if (loading) return;
        // Nếu có user nhưng không phải admin, đá về trang chủ
        if (user && !isAdmin) {
            router.push('/');
        }
        // Nếu không có user, đá về trang đăng nhập
        if (!user) {
            router.push('/login?redirect=/admin');
        }
    }, [user, loading, isAdmin, router]);

    // Hiển thị màn hình chờ trong lúc kiểm tra quyền
    if (loading || !user || !isAdmin) {
        return (
             <div className="flex min-h-screen flex-col items-center justify-center bg-brand-dark">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-transparent border-hineon-blue"></div>
                <p className="mt-4 text-white">Đang kiểm tra quyền truy cập...</p>
            </div>
        );
    }

    // Nếu là admin, hiển thị trang quản trị
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-12 sm:px-6">
                <AdminDashboard />
            </main>
        </div>
    );
}
