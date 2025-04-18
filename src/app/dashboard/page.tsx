'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = localStorage.getItem('user')
  const router = useRouter()
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  useEffect(() => {
    axios.get('/api/products')
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Available Products</h2>
      <div className="grid grid-cols-7 gap-4">
        {products.map((p) => (
          <div key={p.id} className="bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition duration-200 p-3 flex flex-col items-center justify-center">
            <img src={p.image_url} alt={p.name} className="w-30 h-30 object-cover mb-2 rounded" />
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p>Price: ₹{p.price} per kg</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
