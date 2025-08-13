'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { DialogHeader } from '@/components/ui/dialog';
import { CreditCard, Wallet, Loader2, CheckCircle } from 'lucide-react';

interface CheckoutFormProps {
  poster: any;
  onPayment: (paymentMethod: string, customerDetails: any) => void;
  onCancel: () => void;
  loading: boolean;
}

const paymentMethods = [
  {
    id: 'razorpay',
    name: 'Razorpay',
    icon: CreditCard,
    description: 'Pay with credit/debit card or UPI',
    color: 'bg-blue-600 hover:bg-blue-700'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    icon: CreditCard,
    description: 'Secure payment with Stripe',
    color: 'bg-purple-600 hover:bg-purple-700'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: CreditCard,
    description: 'Pay with PayPal account',
    color: 'bg-blue-500 hover:bg-blue-600'
  }
];

export function CheckoutForm({ poster, onPayment, onCancel, loading }: CheckoutFormProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      alert('Please select a payment method');
      return;
    }
    onPayment(selectedPaymentMethod, customerDetails);
  };

  const handleInputChange = (field: string, value: string) => {
    setCustomerDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center mb-2">
            Complete Your Purchase
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Fill in your details and choose a payment method to get your poster
          </CardDescription>
        </CardHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          {/* Poster Summary */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <img
                  src={poster.image_url}
                  alt={poster.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{poster.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{poster.description}</p>
                  <Badge variant="outline" className="mt-1">{poster.category}</Badge>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Poster Price:</span>
                  <span>₹{poster.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processing Fee:</span>
                  <span>₹0</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-green-600">₹{poster.price}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Checkout Form */}
          <div className="space-y-6">
            {/* Customer Details */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
                <CardDescription>
                  Please provide your details for the order
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={customerDetails.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerDetails.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={customerDetails.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={customerDetails.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter your address"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={customerDetails.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={customerDetails.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      placeholder="State"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={customerDetails.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      placeholder="ZIP Code"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>
                  Choose your preferred payment method
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <div
                        key={method.id}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          selectedPaymentMethod === method.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedPaymentMethod(method.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${method.color} text-white`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{method.name}</h3>
                            <p className="text-sm text-gray-600">{method.description}</p>
                          </div>
                          {selectedPaymentMethod === method.id && (
                            <CheckCircle className="w-5 h-5 text-blue-500" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={onCancel}
                className="flex-1"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={loading || !selectedPaymentMethod || !customerDetails.name || !customerDetails.email}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Wallet className="w-4 h-4 mr-2" />
                    Pay ₹{poster.price}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
