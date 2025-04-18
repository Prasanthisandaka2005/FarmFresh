'use client'

import { usePathname } from 'next/navigation'
import Navbar from './dashboard/Navbar'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideNavbar = ['/', '/login', '/signup'].includes(pathname)

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  )
}
