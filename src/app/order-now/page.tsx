'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import Cookies from 'js-cookie';

type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string;
};

const OrderPage = () => {
  const reduxProducts = useSelector((state: RootState) => state.products.products);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedItems, setSelectedItems] = useState<{ product_id: number; quantity: number }[]>([]);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [form, setForm] = useState({
      user_email: user,
      contact_name: '',
      contact_phone: '',
      address: ''
    });

 useEffect(() => {
  if (typeof window !== "undefined") {
    const storedUser = Cookies.get('user'); 
    let userEmail = null;

    if (storedUser !== undefined) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed && typeof parsed === 'object' && parsed.user) {
          userEmail = parsed.user;
        } else {
          userEmail = storedUser;
        }
      } catch {
        userEmail = storedUser;
      }
    }

    setForm(prevForm => ({ ...prevForm, user_email: userEmail }));
    setUser(userEmail);
  }
}, []);


 

  useEffect(() => {
  if (reduxProducts.length > 0) {
    setProducts(
      reduxProducts.map(p => ({
        ...p,
        id: Number(p.id) 
      }))
    );
  } else {
    axios.get('/api/products')
      .then((res) => setProducts(res.data))
      .catch((e) => console.log(e));
  }
}, [reduxProducts]);


  const toggleProduct = (productId: number) => {
    const exists = selectedItems.find(item => item.product_id === productId);
    if (exists) {
      setSelectedItems(prev => prev.filter(item => item.product_id !== productId));
    } else {
      setSelectedItems(prev => [...prev, { product_id: productId, quantity: 1 }]);
    }
  };

  const setQuantity = (productId: number, qty: number) => {
    setSelectedItems(prev =>
      prev.map(item =>
        item.product_id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const invalidItems = selectedItems.some(item => item.quantity <= 0);

  if (selectedItems.length === 0) {
    alert("Please Select Items");
  } else if (invalidItems) {
    alert("Please make sure all quantities are greater than zero.");
  } else {
    setPlacingOrder(true)
    try {
      await axios.post('/api/order-now', {
        ...form,
        items: selectedItems
      });
      toast.success("Order Placed successfully!");
      setSelectedItems([]);
    } catch {
      toast.error('Failed to place order.');
    }
    finally{
      setPlacingOrder(false)
    }
  }
};


  return (
    <div className="flex gap-6 max-w-6xl mx-auto p-4">
      <div className="w-1/2 space-y-4">
        <form onSubmit={handleSubmit} className="w-1/2 space-y-4">
          <h2 className="text-2xl font-bold">Place Order</h2>
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded w-full"
            value={form.contact_name}
            onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            className="border p-2 rounded w-full"
            value={form.contact_phone}
            onChange={(e) => setForm({ ...form, contact_phone: e.target.value })}
            required
          />
          <textarea
            placeholder="Address"
            className="border p-2 rounded w-full"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            disabled={placingOrder}
          >
            {placingOrder ? 'Ordering...' : 'Place Order'}
          </button>
        </form>
      </div>

      <div className="w-1/2 h-[600px] overflow-y-auto border border-gray-200 p-4 rounded">
        <h3 className="text-xl font-semibold mb-4">Select Products</h3>
        <div className="grid grid-cols-3 gap-4">
          {products.length !== 0 ? products.map((p) => {
            const selected = selectedItems.find(item => item.product_id === p.id);
            return (
              <div key={p.id} className="bg-white border border-gray-300 rounded-xl p-3">
                <img src={p.image_url} className="w-full h-30 object-cover mb-2 rounded" />
                <h4 className="font-medium">{p.name}</h4>
                <p className="text-sm">₹{p.price}</p>
                <button
                  onClick={() => toggleProduct(p.id)}
                 className="cursor-pointer p-1 text-xs border border-[#318616] text-[#318616] bg-[#f7fff9] rounded-md flex items-center justify-center"
                >
                  {selected ? 'Remove' : 'Add'}
                </button>
                {selected && (
                  <input
                    type="number"
                    className="border p-1 w-full mt-1"
                    min={1}
                    value={selected.quantity}
                    onChange={(e) => setQuantity(p.id, parseInt(e.target.value))}
                  />
                )}
              </div>
            );
          }):
          <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
