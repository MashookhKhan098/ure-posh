'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface NewsletterSubscriptionProps {
  className?: string;
  placeholder?: string;
  buttonText?: string;
  showIcon?: boolean;
}

export default function NewsletterSubscription({
  className = '',
  placeholder = 'Enter your email address',
  buttonText = 'Subscribe',
  showIcon = true
}: NewsletterSubscriptionProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'exists'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      console.log('📧 Subscribing email:', email);
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log('📥 Subscription response:', data);

      if (response.ok) {
        if (data.alreadySubscribed) {
          setStatus('exists');
          setMessage('You are already subscribed to our newsletter!');
        } else {
          setStatus('success');
          setMessage('Successfully subscribed! Check your email for confirmation.');
          setEmail(''); // Clear the input
        }
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'exists':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return showIcon ? <Mail className="h-4 w-4" /> : null;
    }
  };

  const getButtonVariant = () => {
    switch (status) {
      case 'success':
        return 'default';
      case 'exists':
        return 'secondary';
      case 'error':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const isDisabled = status === 'loading' || status === 'success';

  return (
    <div className={`w-full max-w-md ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            disabled={isDisabled}
            className="flex-1"
            required
          />
          <Button
            type="submit"
            variant={getButtonVariant()}
            disabled={isDisabled}
            className="sm:px-6"
          >
            {getStatusIcon()}
            <span className="ml-2">
              {status === 'loading' ? 'Subscribing...' : buttonText}
            </span>
          </Button>
        </div>
        
        {/* Status Message */}
        {message && (
          <div className={`text-sm p-3 rounded-md ${
            status === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : status === 'exists'
              ? 'bg-blue-50 text-blue-700 border border-blue-200'
              : status === 'error'
              ? 'bg-red-50 text-red-700 border border-red-200'
              : ''
          }`}>
            <div className="flex items-start gap-2">
              {getStatusIcon()}
              <span className="flex-1">{message}</span>
            </div>
          </div>
        )}
      </form>

      {/* Privacy Notice */}
      <p className="text-xs text-gray-500 mt-3 leading-relaxed">
        By subscribing, you agree to receive our newsletter with updates about new blog posts, posters, and company news. 
        You can unsubscribe at any time. We respect your privacy and will never share your email address.
      </p>
    </div>
  );
}
