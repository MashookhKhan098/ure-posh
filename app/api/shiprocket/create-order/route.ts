import { NextRequest, NextResponse } from 'next/server';

// Shiprocket API configuration
const SHIPROCKET_API_URL = 'https://apiv2.shiprocket.in/v1/external';
const SHIPROCKET_EMAIL = process.env.SHIPROCKET_EMAIL;
const SHIPROCKET_PASSWORD = process.env.SHIPROCKET_PASSWORD;

// Function to get Shiprocket authentication token
async function getShiprocketToken() {
  try {
    const response = await fetch(`${SHIPROCKET_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: SHIPROCKET_EMAIL,
        password: SHIPROCKET_PASSWORD,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to authenticate with Shiprocket');
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error('Shiprocket authentication error:', error);
    throw error;
  }
}

// Function to create order in Shiprocket
async function createShiprocketOrder(token: string, orderData: any) {
  try {
    const response = await fetch(`${SHIPROCKET_API_URL}/orders/create/adhoc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create order');
    }

    return await response.json();
  } catch (error) {
    console.error('Shiprocket order creation error:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if required environment variables are set
    if (!SHIPROCKET_EMAIL || !SHIPROCKET_PASSWORD) {
      return NextResponse.json(
        { error: 'Shiprocket credentials not configured' },
        { status: 500 }
      );
    }

    const orderData = await request.json();

    // Validate required fields
    const requiredFields = [
      'billing_customer_name',
      'billing_email',
      'billing_phone',
      'billing_address',
      'billing_city',
      'billing_state',
      'billing_pincode',
      'order_items'
    ];

    for (const field of requiredFields) {
      if (!orderData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Get authentication token
    const token = await getShiprocketToken();

    // Create order in Shiprocket
    const result = await createShiprocketOrder(token, orderData);

    // Return success response
    return NextResponse.json({
      success: true,
      order_id: result.order_id,
      tracking_url: result.tracking_url || null,
      message: 'Order created successfully',
      shiprocket_response: result
    });

  } catch (error) {
    console.error('Create order error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to create order',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
