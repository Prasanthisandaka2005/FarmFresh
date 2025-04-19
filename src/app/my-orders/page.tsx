"use client"

import axios from "axios";
import { useEffect, useState } from "react"
import Link from "next/link";

interface Order {
  id: number;
  contact_name: string;
  contact_phone: string;
  status: string;
  address: string;
}

const MyOrders = () => {
    const [myorders, setMyorders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser);
  }, []);

    useEffect(() => {
        if(!user) return;
        setLoading(true);
        axios.get('/api/my-orders', {
            headers: {
                'user-email': user, 
            },
        }).then((res) => {
                setMyorders(res.data);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
            });
    }, [user]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Orders</h1>
            {myorders.length === 0 ? (
                <p>No orders yet.</p>
            ) : (
                <div className="grid gap-4 grid-cols-4">
                    {myorders.map((order: Order) => (
                        <Link
                            key={order.id}
                            href={`/orders/${order.id}`}
                            className="block border p-4 rounded shadow-sm hover:shadow-lg transition duration-200"
                        >
                            <p><strong>Order ID:</strong> {order.id}</p>
                            <p><strong>Name:</strong> {order.contact_name}</p>
                            <p><strong>Phn No:</strong> {order.contact_phone}</p>
                            <p><strong>Status:</strong> {order.status}</p>
                            <p><strong>Address:</strong> {order.address}</p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
