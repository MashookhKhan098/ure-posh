'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertCircle, Mail, Home } from 'lucide-react';
import Link from 'next/link';

// Tell Next.js this page should be dynamically rendered
export const dynamic = 'force-dynamic';

function UnsubscribeContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'not-found'>('loading');
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();
  
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  useEffect(() => {
    if (!token && !email) {
      setStatus('not-found');
      setMessage('Invalid unsubscribe link. Please check your email for the correct link.');
      return;
    }

    handleUnsubscribe();
  }, [token, email]);

  const handleUnsubscribe = async () => {
    try {
      const params = new URLSearchParams();
      if (token) params.append('token', token);
      if (email) params.append('email', email);

      const response = await fetch(`/api/newsletter?${params.toString()}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('You have been successfully unsubscribed from our newsletter.');
      } else {
        setStatus('error');
        setMessage(result.error || 'Failed to unsubscribe. Please try again or contact support.');
      }
    } catch (error) {
      console.error('Unsubscribe error:', error);
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    }
  };

  const getIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-16 w-16 text-green-500" />;
      case 'error':
      case 'not-found':
        return <AlertCircle className="h-16 w-16 text-red-500" />;
      default:
        return <Mail className="h-16 w-16 text-blue-500 animate-pulse" />;
    }
  };

  const getTitle = () => {
    switch (status) {
      case 'success':
        return 'Successfully Unsubscribed';
      case 'error':
        return 'Unsubscribe Failed';
      case 'not-found':
        return 'Invalid Link';
      default:
        return 'Processing Unsubscribe...';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {getIcon()}
            </div>
            <CardTitle className="text-2xl">{getTitle()}</CardTitle>
            <CardDescription className="text-base">
              {status === 'loading' ? 'Please wait while we process your request...' : message}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="text-center space-y-4">
            {status === 'success' && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
                  <p className="text-green-800 text-sm">
                    <strong>What this means:</strong>
                  </p>
                  <ul className="text-green-700 text-sm mt-2 space-y-1">
                    <li>• You won't receive any more newsletter emails from us</li>
                    <li>• Your email has been removed from our mailing list</li>
                    <li>• You can resubscribe anytime on our website</li>
                  </ul>
                </div>
                
                <p className="text-gray-600 text-sm">
                  We're sorry to see you go! If you change your mind, you can always subscribe again on our website.
                </p>
              </div>
            )}

            {status === 'error' && (
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 text-sm">
                    If you continue to have issues, please contact us directly at{' '}
                    <a href="mailto:ureposh@gmail.com" className="underline">
                      ureposh@gmail.com
                    </a>{' '}
                    with your unsubscribe request.
                  </p>
                </div>
                
                <Button 
                  onClick={handleUnsubscribe} 
                  variant="outline"
                  className="w-full"
                >
                  Try Again
                </Button>
              </div>
            )}

            {status === 'not-found' && (
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800 text-sm">
                    This might happen if the link is expired or incorrect. Please check your email for the correct unsubscribe link, or contact us directly.
                  </p>
                </div>
              </div>
            )}

            <div className="pt-4 space-y-2">
              <Link href="/">
                <Button variant="default" className="w-full">
                  <Home className="h-4 w-4 mr-2" />
                  Return to Website
                </Button>
              </Link>
              
              {status !== 'loading' && (
                <Link href="/contact">
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>© 2025 Ureposh. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

// Wrapper component with Suspense boundary
export default function UnsubscribePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Mail className="h-16 w-16 text-blue-500 animate-pulse" />
              </div>
              <CardTitle className="text-2xl">Loading...</CardTitle>
              <CardDescription className="text-base">
                Please wait while we load the unsubscribe page...
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    }>
      <UnsubscribeContent />
    </Suspense>
  );
}
