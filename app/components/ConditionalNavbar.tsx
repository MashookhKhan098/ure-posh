'use client'

import { usePathname } from 'next/navigation'
import NavbarWrapper from './NavbarWrapper'

export default function ConditionalNavbar() {
  const pathname = usePathname()
  const isWriterPage = pathname.startsWith('/writer')

  if (isWriterPage) {
    return null
  }

  return <NavbarWrapper />
} 