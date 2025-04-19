'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from "firebase/auth";
import { auth } from "../../../utils/firebase";
import { useDispatch } from "react-redux";
import { clearUser } from "../../../store/userSlice";

const navItems = [
  { label: 'Products', href: '/dashboard' },
  { label: 'My Orders', href: '/my-orders' },
  { label: 'Order Now', href: '/order-now' },
]

const Navbar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth)
      dispatch(clearUser())
      localStorage.removeItem('user')
      router.push("/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  };

  return (
    <nav className="bg-green-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link href="/dashboard" className="text-xl font-bold">
        Fresh Farm
      </Link>
      <ul className="flex gap-6 items-center">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`hover:underline ${
                pathname === item.href ? 'font-bold underline' : ''
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 hover:scale-105 transition-transform cursor-pointer"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
