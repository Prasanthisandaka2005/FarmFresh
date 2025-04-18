"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Item = {
  product_id: number;
  name: string;
  quantity: number;
};

type OrderDetails = {
  order_id: number;
  status: string;
  delivery_address: string;
  buyer_contact: string;
  email: string;
  items: Item[];
};

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await fetch(`/api/orders/${id}`);
      const data = await res.json();
      setOrder(data);
    };
    fetchOrder();
  }, [id]);

  if (!order) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-2">Order #{order.order_id}</h1>
      <p>Status: {order.status}</p>
      <p>Email: {order.email}</p>
      <p>Contact: {order.buyer_contact}</p>
      <p>Address: {order.delivery_address}</p>
      <h2 className="text-lg font-semibold mt-4">Items:</h2>
      <ul className="list-disc pl-5">
        {order.items.map((item) => (
          <li key={item.product_id}>
            {item.name} — Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
