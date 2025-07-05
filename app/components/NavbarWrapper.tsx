'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from './Navbar'

export default function NavbarWrapper() {
  const pathname = usePathname()
  const isAdminPage = pathname.startsWith('/admin')

  // Don't render navbar on admin pages
  if (isAdminPage) {
    return null
  }

  return <Navbar />
} 