'use client';

import React, { createContext, useContext, useEffect, useState } of 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

// QUAN TRỌNG: Thay đổi email này thành email admin của bạn
const ADMIN_EMAIL = "admin@hineon.com";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      // Kiểm tra xem email của người dùng có phải là email admin không
      setIsAdmin(user ? user.email === ADMIN_EMAIL : false);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    setIsAdmin(false);
  };

  const value = { user, loading, isAdmin, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};