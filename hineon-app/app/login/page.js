'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Nếu người dùng đã đăng nhập, tự động chuyển hướng họ đi
  useEffect(() => {
    if (user) {
      router.push(redirectUrl);
    }
  }, [user, router, redirectUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLoginView) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      // Sau khi thành công, useEffect ở trên sẽ xử lý việc chuyển hướng
    } catch (err) {
      setError("Email hoặc mật khẩu không chính xác. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-dark p-4">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <Link href="/" className="text-4xl font-extrabold tracking-tight text-white animate-glow">
            HINEON
          </Link>
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-white">
            {isLoginView ? 'Chào mừng trở lại' : 'Tạo tài khoản mới'}
          </h2>
        </div>

        <div className="mt-8 rounded-xl bg-brand-dark-light p-8 shadow-2xl shadow-hineon-blue/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-300">Email</label>
              <div className="mt-1">
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded-lg border-brand-dark-lighter bg-brand-dark p-3 text-white placeholder-neutral-500 focus:border-hineon-blue focus:ring-hineon-blue" />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-300">Mật khẩu</label>
              <div className="mt-1">
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full rounded-lg border-brand-dark-lighter bg-brand-dark p-3 text-white placeholder-neutral-500 focus:border-hineon-blue focus:ring-hineon-blue" />
              </div>
            </div>
            {error && <p className="text-center text-sm text-red-400">{error}</p>}
            <div>
              <button type="submit" disabled={loading} className="w-full rounded-lg bg-hineon-blue py-3 font-semibold text-white transition-all hover:scale-105 hover:bg-hineon-blue-light hover:text-brand-dark disabled:opacity-50">
                {loading ? 'Đang xử lý...' : (isLoginView ? 'Đăng Nhập' : 'Đăng Ký')}
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-neutral-400">
            {isLoginView ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
            <button onClick={() => { setIsLoginView(!isLoginView); setError(''); }} className="ml-2 font-semibold text-hineon-blue-light hover:underline">
              {isLoginView ? 'Đăng ký ngay' : 'Đăng nhập'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}