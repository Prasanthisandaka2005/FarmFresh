'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../../../store/productsSlice';
import { RootState } from '../../../store';
import Loader from '../Loader/Loader';

const Products = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const dispatch = useDispatch();

  const products = useSelector((state: RootState) => state.products.products);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchProducts = async () => {
      if (products.length > 0) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get('/api/products');
        dispatch(setProducts(res.data));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [router, dispatch, products.length]);

  if (loading) {
    return (
      <Loader/>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Available Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition duration-200 p-3 flex flex-col items-center justify-center"
          >
            <img
              src={p.image_url}
              alt={p.name}
              className="w-30 h-30 object-cover mb-2 rounded"
            />
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p>Price: ₹{p.price} per kg</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
