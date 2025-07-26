// File: app/expertise/[slug]/page.tsx

import React from 'react';
import Link from 'next/link';

// This function receives the slug from the URL as a parameter
export default function ExpertiseTopicPage({ params }: { params: { slug: string } }) {
  
  // This line converts the URL slug back into a readable title
  // e.g., "posh-compliance-initiation" becomes "Posh Compliance Initiation"
  const title = params.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="min-h-screen bg-white">
      {/* A simple header for the new page */}
      <header className="bg-slate-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="mt-2 text-slate-300">Detailed information about our expertise.</p>
        </div>
      </header>
      
      {/* Main content area */}
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 p-8 rounded-lg shadow-inner">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">About {title}</h2>
            <p className="text-slate-600 leading-relaxed">
              This is a placeholder page for the "{title}" topic. 
              Here you can add detailed content, case studies, and information specific to this service or sector.
            </p>
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/" className="inline-block px-8 py-3 bg-slate-800 text-white font-medium rounded-md hover:bg-slate-700 transition">
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}