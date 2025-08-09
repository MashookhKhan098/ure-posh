'use client';

import { useEffect } from 'react';

export default function AdminFooterHider() {
  useEffect(() => {
    // Hide any footer elements that might be rendered
    const hideFooters = () => {
      const footers = document.querySelectorAll('footer, .footer');
      footers.forEach(footer => {
        if (footer instanceof HTMLElement) {
          footer.style.display = 'none';
          footer.style.visibility = 'hidden';
          footer.style.opacity = '0';
          footer.style.height = '0';
          footer.style.overflow = 'hidden';
        }
      });
    };

    // Run immediately
    hideFooters();

    // Also run after a short delay to catch any dynamically rendered footers
    const timer = setTimeout(hideFooters, 100);

    return () => clearTimeout(timer);
  }, []);

  return null; // This component doesn't render anything
} 