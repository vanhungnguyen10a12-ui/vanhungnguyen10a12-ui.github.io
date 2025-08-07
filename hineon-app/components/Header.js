'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

export default function Header() {
    const { user, loading, signOut } = useAuth();

    return (
        <header className="sticky top-0 z-40 w-full border-b border-brand-dark-light/50 bg-brand-dark/80 backdrop-blur-lg">
            <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6">
                <Link href="/" className="text-3xl font-extrabold tracking-tight text-white animate-glow">HINEON</Link>
                <nav className="hidden items-center space-x-8 text-sm font-medium md:flex">
                    <Link href="/" className="text-neutral-300 transition-colors hover:text-hineon-blue-light">Trang chủ</Link>
                    <Link href="/#features" className="text-neutral-300 transition-colors hover:text-hineon-blue-light">Tính năng</Link>
                    <Link href="/#products" className="text-neutral-300 transition-colors hover:text-hineon-blue-light">Sản phẩm</Link>
                </nav>
                <div className="flex items-center gap-4">
                    {loading ? ( <div className="h-10 w-24 animate-pulse rounded-lg bg-brand-dark-light"></div> ) 
                    : user ? (
                        <div className="group relative">
                            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-dark-lighter">
                                <span className="font-bold text-hineon-blue-light">{user.email.charAt(0).toUpperCase()}</span>
                            </button>
                            <div className="absolute right-0 top-full mt-2 w-48 origin-top-right rounded-md bg-brand-dark-light shadow-lg opacity-0 transition-all duration-200 group-hover:opacity-100">
                                <div className="py-1">
                                    <button onClick={signOut} className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-neutral-300 hover:bg-brand-dark-lighter">
                                        <LogOut size={16} />
                                        <span>Đăng xuất</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link href="/login" className="hidden sm:inline-block rounded-lg bg-hineon-blue px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-hineon-blue/20 transition-all hover:scale-105 hover:bg-hineon-blue-light hover:text-brand-dark">
                            Đăng nhập
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}