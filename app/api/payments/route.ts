import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, paymentMethod, customerDetails } = body;

    // Get order details
    const { data: order, error: orderError } = await supabase
      .from('poster_orders')
      .select(`
        *,
        posters (
          id,
          title,
          price,
          currency
        )
      `)
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (order.payment_status === 'completed') {
      return NextResponse.json({ error: 'Payment already completed' }, { status: 400 });
    }

    // Process payment based on method
    let paymentResult;
    switch (paymentMethod) {
      case 'razorpay':
        paymentResult = await processRazorpayPayment(order, customerDetails);
        break;
      case 'stripe':
        paymentResult = await processStripePayment(order, customerDetails);
        break;
      case 'paypal':
        paymentResult = await processPayPalPayment(order, customerDetails);
        break;
      default:
        return NextResponse.json({ error: 'Unsupported payment method' }, { status: 400 });
    }

    if (paymentResult.success) {
      // Update order status
      await supabase
        .from('poster_orders')
        .update({
          payment_status: 'completed',
          order_status: 'completed',
          payment_id: paymentResult.transactionId,
          customer_name: customerDetails.name,
          customer_email: customerDetails.email,
          customer_phone: customerDetails.phone,
          download_url: `/api/posters/${order.poster_id}/download?order=${orderId}`,
          download_expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
        })
        .eq('id', orderId);

      // Record transaction
      await supabase
        .from('payment_transactions')
        .insert({
          order_id: orderId,
          payment_gateway: paymentMethod,
          transaction_id: paymentResult.transactionId,
          amount: order.amount,
          currency: order.currency,
          status: 'completed',
          gateway_response: paymentResult.gatewayResponse
        });

      // Increment poster download count
      await supabase
        .from('posters')
        .update({ download_count: order.posters.download_count + 1 })
        .eq('id', order.poster_id);

      return NextResponse.json({
        success: true,
        transactionId: paymentResult.transactionId,
        downloadUrl: `/api/posters/${order.poster_id}/download?order=${orderId}`
      });
    } else {
      // Record failed transaction
      await supabase
        .from('payment_transactions')
        .insert({
          order_id: orderId,
          payment_gateway: paymentMethod,
          transaction_id: paymentResult.transactionId || null,
          amount: order.amount,
          currency: order.currency,
          status: 'failed',
          gateway_response: paymentResult.gatewayResponse
        });

      return NextResponse.json({ error: paymentResult.error }, { status: 400 });
    }
  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json({ error: 'Payment processing failed' }, { status: 500 });
  }
}

async function processRazorpayPayment(order: any, customerDetails: any) {
  // This is a mock implementation
  // In real implementation, you would:
  // 1. Initialize Razorpay with your keys
  // 2. Create payment order
  // 3. Handle webhook verification
  
  return new Promise<{ success: boolean; transactionId?: string; error?: string; gatewayResponse?: any }>((resolve) => {
    setTimeout(() => {
      // Simulate 90% success rate
      if (Math.random() > 0.1) {
        resolve({
          success: true,
          transactionId: `rzp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          gatewayResponse: {
            method: 'razorpay',
            amount: order.amount,
            currency: order.currency
          }
        });
      } else {
        resolve({
          success: false,
          error: 'Payment failed',
          gatewayResponse: { error: 'Payment declined' }
        });
      }
    }, 2000);
  });
}

async function processStripePayment(order: any, customerDetails: any) {
  // This is a mock implementation
  // In real implementation, you would:
  // 1. Initialize Stripe with your keys
  // 2. Create payment intent
  // 3. Handle webhook verification
  
  return new Promise<{ success: boolean; transactionId?: string; error?: string; gatewayResponse?: any }>((resolve) => {
    setTimeout(() => {
      // Simulate 95% success rate
      if (Math.random() > 0.05) {
        resolve({
          success: true,
          transactionId: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          gatewayResponse: {
            method: 'stripe',
            amount: order.amount,
            currency: order.currency
          }
        });
      } else {
        resolve({
          success: false,
          error: 'Payment failed',
          gatewayResponse: { error: 'Insufficient funds' }
        });
      }
    }, 1500);
  });
}

async function processPayPalPayment(order: any, customerDetails: any) {
  // This is a mock implementation
  // In real implementation, you would:
  // 1. Initialize PayPal with your keys
  // 2. Create payment order
  // 3. Handle webhook verification
  
  return new Promise<{ success: boolean; transactionId?: string; error?: string; gatewayResponse?: any }>((resolve) => {
    setTimeout(() => {
      // Simulate 85% success rate
      if (Math.random() > 0.15) {
        resolve({
          success: true,
          transactionId: `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          gatewayResponse: {
            method: 'paypal',
            amount: order.amount,
            currency: order.currency
          }
        });
      } else {
        resolve({
          success: false,
          error: 'Payment failed',
          gatewayResponse: { error: 'Payment cancelled' }
        });
      }
    }, 2500);
  });
}
