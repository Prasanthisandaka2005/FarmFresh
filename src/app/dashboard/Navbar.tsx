'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from "firebase/auth";
import { auth } from "../../../utils/firebase";
import { useDispatch } from "react-redux";
import { clearUser } from "../../../store/userSlice";
import { useRouter } from "next/navigation";

const navItems = [
  { label: 'My Orders', href: '/my-orders' },
  { label: 'Order Now', href: '/order-now' },
  { label: 'Products', href: '/dashboard' },
]

const Navbar = () => {
  const pathname = usePathname()
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(clearUser());
      localStorage.removeItem('user')
      router.push("/login");
    });
  };

  return (
    <nav className="bg-green-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Fresh Farm</h1>
      <ul className="flex gap-6">
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
        <button onClick={handleLogout} className="w-20 pt-1 pb-1 bg-blue-500 text-white  rounded-md hover:bg-blue-600 cursor-pointer">Logout</button>
      </ul>
    </nav>
  )
}

export default Navbar
