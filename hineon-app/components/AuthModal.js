'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

const backdropVariants = { visible: { opacity: 1 }, hidden: { opacity: 0 } };
const modalVariants = { hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } } };

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLoginView) { await signInWithEmailAndPassword(auth, email, password); } 
      else { await createUserWithEmailAndPassword(auth, email, password); }
      closeAuthModal();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isAuthModalOpen && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" variants={backdropVariants} initial="hidden" animate="visible" exit="hidden" onClick={closeAuthModal}>
          <motion.div className="relative mx-4 w-full max-w-md rounded-xl bg-brand-dark-light shadow-2xl shadow-hineon-blue/10" variants={modalVariants} onClick={(e) => e.stopPropagation()}>
            <div className="p-8">
              <h2 className="text-center text-3xl font-bold text-white">{isLoginView ? 'Đăng Nhập' : 'Đăng Ký'}</h2>
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="w-full rounded-lg border-brand-dark-lighter bg-brand-dark p-3 text-white placeholder-neutral-500 focus:border-hineon-blue focus:ring-hineon-blue" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu" required className="w-full rounded-lg border-brand-dark-lighter bg-brand-dark p-3 text-white placeholder-neutral-500 focus:border-hineon-blue focus:ring-hineon-blue" />
                {error && <p className="text-center text-sm text-red-500">{error}</p>}
                <button type="submit" disabled={loading} className="w-full rounded-lg bg-hineon-blue py-3.5 font-semibold text-white transition-all hover:scale-105 hover:bg-hineon-blue-light hover:text-brand-dark disabled:opacity-50">
                  {loading ? 'Đang xử lý...' : (isLoginView ? 'Đăng Nhập' : 'Đăng Ký')}
                </button>
              </form>
              <p className="mt-6 text-center text-sm text-neutral-400">
                {isLoginView ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
                <button onClick={() => { setIsLoginView(!isLoginView); setError(''); }} className="ml-2 font-semibold text-hineon-blue-light hover:underline">
                  {isLoginView ? 'Đăng ký ngay' : 'Đăng nhập'}
                </button>
              </p>
            </div>
            <button onClick={closeAuthModal} className="absolute top-4 right-4 rounded-full bg-brand-dark/50 p-1.5 text-neutral-400 transition-colors hover:bg-brand-dark-lighter hover:text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (isMounted) {
    // Sửa đích đến của Portal thành document.body
    return createPortal(modalContent, document.body);
  }

  return null;
}