'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";

export default function Home() {
  const router = useRouter()
  const dispatch = useDispatch();

  useEffect(() => {
  const user = localStorage.getItem('user');
  if (user) {
    dispatch(setUser({ user }));
  }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Fresh Farm</h1>
      <p className="text-lg mb-6">
        Order bulk vegetables and fruits effortlessly. Browse, order, and track with our simple platform.
      </p>
      <button
        type="button"
        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
        onClick={() => router.push('/login')}
      >
        Get Started
      </button>
    </div>
  )
}
