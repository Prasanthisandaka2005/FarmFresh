'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

const OrderPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const user = useSelector((state: RootState) => state.user.user);
  const [selectedItems, setSelectedItems] = useState<{ product_id: number; quantity: number }[]>([]);
  const [form, setForm] = useState({
    user_email: user.user,
    contact_name: '',
    contact_phone: '',
    address: ''
  });

  useEffect(() => {
    axios.get('/api/products').then((res) => setProducts(res.data)).catch((e)=>console.log(e));
  }, []);

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
    if(selectedItems.length == 0){
       alert("Please Select Items")
    }
    else{
    try {
      const res = await axios.post('/api/order-now', {
        ...form,
        items: selectedItems
      });
      toast.success("Order Placed successfully!");
      setSelectedItems([]);
    } catch (err) {
      toast.error('Failed to place order.');
    }}
  };

  return (
    <div className="flex gap-6 max-w-6xl mx-auto p-4">
      {/* Left Side - Form */}
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
        >
          Submit Order
        </button>
      </form>
      </div>

      {/* Right Side - Scrollable Products */}
      <div className="w-1/2 h-[600px] overflow-y-auto border p-4 rounded">
        <h3 className="text-xl font-semibold mb-4">Select Products</h3>
        <div className="grid grid-cols-2 gap-4">
          {products.map((p) => {
            const selected = selectedItems.find(item => item.product_id === p.id);
            return (
              <div key={p.id} className="border p-3 rounded">
                <img src={p.image_url} className="w-full h-32 object-cover rounded mb-1" />
                <h4 className="font-medium">{p.name}</h4>
                <p className="text-sm">₹{p.price}</p>
                <button
                  onClick={() => toggleProduct(p.id)}
                  className="mt-1 text-sm text-blue-600 underline"
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
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
