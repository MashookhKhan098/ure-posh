import { Suspense } from 'react';
import AdminLoading from './loading';
import AdminFooterHider from '../components/AdminFooterHider';
import './globals.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Debug logging for admin layout
  console.log('Admin Layout: Rendering admin page - NO FOOTER');

  return (
    <div className="min-h-screen bg-gray-50 admin-page" data-admin-page="true">
      {/* Admin layout - explicitly NO navbar, NO footer */}
      <AdminFooterHider />
      <Suspense fallback={<AdminLoading />}>
        {children}
      </Suspense>
    </div>
  );
}