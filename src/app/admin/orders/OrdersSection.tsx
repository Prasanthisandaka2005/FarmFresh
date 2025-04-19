'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

type Order = {
  id: number;
  user_email: string;
  items: string;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
};

const OrdersSection = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(orders)

  useEffect(() => {
    axios.get('/api/admin/order')
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching orders", err);
        setLoading(false);
      });
  }, []);

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    const isConfirmed = window.confirm('Are you sure you want to change the order status?');
    if (!isConfirmed) return;

    try {
      await axios.put(`/api/admin/order/${orderId}`, { status: newStatus });
      
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));

      toast.success('Order status updated successfully!');
    } catch (err) {
      console.error("Error updating status", err);
      toast.error('Error updating order status!');
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading Orders...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Buyer Email</th>
            <th className="border p-2">Items</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Update</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order : Order) => (
            <tr key={order.id}>
              <td className="border p-2">{order.id}</td>
              <td className="border p-2">{order.user_email}</td>
              <td className="border p-2 whitespace-pre-wrap">{order.items}</td>
              <td className="border p-2">₹{order.total}</td>
              <td className="border p-2">{order.status}</td>
              <td className="border p-2">
                <select
                  defaultValue={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="border px-2 py-1 rounded"
                >
                  <option>Pending</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersSection;
