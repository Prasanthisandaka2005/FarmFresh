'use client';

import { useState, useEffect } from 'react';
import { auth } from '../../../utils/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import OrdersSection from './orders/OrdersSection';
import ProductsSection from './products/ProductsSection';

const AdminPage = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tab, setTab] = useState<'orders' | 'products'>('orders');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setUserEmail(user ? user.email : null);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!userEmail || userEmail !== 'adminprasanthi@gmail.com') {
    return (
      <div className="text-center mt-10 text-red-500 font-semibold text-lg">
        Unauthorized Access
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setTab('orders')}
          className={`px-4 py-2 border ${
            tab === 'orders' ? 'bg-blue-500 text-white' : 'bg-white text-black'
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setTab('products')}
          className={`px-4 py-2 border ${
            tab === 'products' ? 'bg-blue-500 text-white' : 'bg-white text-black'
          }`}
        >
          Products
        </button>
      </div>

      {tab === 'orders' ? <OrdersSection /> : <ProductsSection />}
    </div>
  );
};


export default AdminPage;