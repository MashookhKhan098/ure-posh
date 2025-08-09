'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();
  const isWriterPage = pathname?.startsWith('/writer');
  const isAdminPage = pathname?.startsWith('/admin');

  // Don't render footer on admin or writer pages
  if (isWriterPage || isAdminPage) {
    return null;
  }

  return <Footer />;
} 