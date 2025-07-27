'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

export default function NavbarWrapper() {
  const pathname = usePathname()
  const isAdminPage = pathname.startsWith('/admin')
  const isWriterPage = pathname.startsWith('/writer')

  // Don't render navbar on admin or writer pages
  if (isAdminPage || isWriterPage) {
    return null
  }

  return <Navbar />
} 