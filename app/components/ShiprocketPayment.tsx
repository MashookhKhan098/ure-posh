'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Check, X, CreditCard, Wallet, Lock, Truck } from 'lucide-react';

interface ShiprocketPaymentProps {
  poster: any;
  onPayment: (paymentResult: any) => void;
  onCancel: () => void;
  loading: boolean;
}

export function ShiprocketPayment({ poster, onPayment, onCancel, loading }: ShiprocketPaymentProps) {
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Create order with Shiprocket
      const orderData = {
        order_id: `ORDER_${Date.now()}`,
        pickup_location: 'Primary',
        customer_pickup_location: 'Primary',
        order_date: new Date().toISOString(),
        channel_id: 'WEB',
        comment: 'Poster purchase from Ureposh',
        billing_customer_name: customerDetails.name,
        billing_last_name: '',
        billing_address: customerDetails.address,
        billing_address_2: '',
        billing_city: customerDetails.city,
        billing_pincode: customerDetails.pincode,
        billing_state: customerDetails.state,
        billing_country: 'India',
        billing_email: customerDetails.email,
        billing_phone: customerDetails.phone,
        shipping_is_billing: true,
        order_items: [
          {
            name: poster.name,
            sku: `POSTER_${poster.id}`,
            units: 1,
            selling_price: poster.price,
            discount: 0,
            tax: 0,
            hsn: 4911
          }
        ],
        payment_method: paymentMethod === 'cod' ? 'COD' : 'Prepaid',
        shipping_charges: 0,
        giftwrap_charges: 0,
        transaction_charges: 0,
        total_discount: 0,
        sub_total: poster.price,
        length: 30,
        breadth: 20,
        height: 1,
        weight: 0.1
      };

      // Call Shiprocket API to create order
      const response = await fetch('/api/shiprocket/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const result = await response.json();
        setOrderId(result.order_id);
        setShowSuccess(true);
        
        // Call the onPayment callback with success result
        onPayment({
          success: true,
          orderId: result.order_id,
          trackingUrl: result.tracking_url,
          customerDetails,
          poster
        });
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error) {
      console.error('Payment error:', error);
      onPayment({
        success: false,
        error: 'Payment failed. Please try again.',
        customerDetails,
        poster
      });
    }
  };

  if (showSuccess) {
    return (
      <Dialog open={showSuccess} onOpenChange={() => {}}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-green-600">Order Placed Successfully! 🎉</DialogTitle>
            <DialogDescription className="text-center">
              Your poster order has been placed and will be delivered soon.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <Check className="w-12 h-12 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-green-700">
                Order ID: <span className="font-mono">{orderId}</span>
              </p>
            </div>
            
            <div className="space-y-3">
              <Button
                onClick={() => setShowSuccess(false)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Purchase</h2>
        <p className="text-gray-600">Fill in your details to complete the order</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="w-5 h-5" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <img
              src={poster.image}
              alt={poster.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{poster.name}</h3>
              <p className="text-sm text-gray-600">{poster.description}</p>
              <p className="text-lg font-bold text-green-600 mt-2">₹{poster.price}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={customerDetails.name}
              onChange={(e) => setCustomerDetails(prev => ({ ...prev, name: e.target.value }))}
              required
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={customerDetails.email}
              onChange={(e) => setCustomerDetails(prev => ({ ...prev, email: e.target.value }))}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              value={customerDetails.phone}
              onChange={(e) => setCustomerDetails(prev => ({ ...prev, phone: e.target.value }))}
              required
              placeholder="Enter your phone number"
            />
          </div>
          
          <div>
            <Label htmlFor="pincode">Pincode *</Label>
            <Input
              id="pincode"
              value={customerDetails.pincode}
              onChange={(e) => setCustomerDetails(prev => ({ ...prev, pincode: e.target.value }))}
              required
              placeholder="Enter pincode"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="address">Address *</Label>
          <Input
            id="address"
            value={customerDetails.address}
            onChange={(e) => setCustomerDetails(prev => ({ ...prev, address: e.target.value }))}
            required
            placeholder="Enter your complete address"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              value={customerDetails.city}
              onChange={(e) => setCustomerDetails(prev => ({ ...prev, city: e.target.value }))}
              required
              placeholder="Enter city"
            />
          </div>
          
          <div>
            <Label htmlFor="state">State *</Label>
            <Input
              id="state"
              value={customerDetails.state}
              onChange={(e) => setCustomerDetails(prev => ({ ...prev, state: e.target.value }))}
              required
              placeholder="Enter state"
            />
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Payment Method
          </h3>
          
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={(e) => setPaymentMethod(e.target.value as 'cod' | 'online')}
                className="w-4 h-4 text-blue-600"
              />
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                <span>Cash on Delivery (COD)</span>
              </div>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="online"
                checked={paymentMethod === 'online'}
                onChange={(e) => setPaymentMethod(e.target.value as 'cod' | 'online')}
                className="w-4 h-4 text-blue-600"
              />
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                <span>Online Payment</span>
              </div>
            </label>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
            disabled={loading}
          >
            Cancel
          </Button>
          
          <Button
            type="submit"
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            disabled={loading}
          >
            {loading ? 'Processing...' : `Place Order - ₹${poster.price}`}
          </Button>
        </div>
      </form>
    </div>
  );
}
