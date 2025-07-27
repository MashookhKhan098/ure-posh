import { Suspense } from 'react';
import AdminLoading from './loading';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<AdminLoading />}>
        {children}
      </Suspense>
    </div>
  );
} 