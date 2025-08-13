# Poster System - Complete Documentation

## Overview

The Poster System is a comprehensive e-commerce solution for selling digital posters with integrated payment gateways. It includes a full database schema, admin management interface, customer-facing store, and payment processing capabilities.

## Features

### 🎨 Customer Features
- **Browse Posters**: View all available posters with filtering and search
- **Categories**: Filter by poster categories (Motivational, Business, Technology, etc.)
- **Search**: Search posters by title, description, or tags
- **Sorting**: Sort by price, popularity, or newest first
- **Featured Posters**: Highlighted posters section
- **Purchase Flow**: Complete checkout with customer details collection
- **Multiple Payment Methods**: Razorpay, Stripe, and PayPal integration
- **Download Management**: Secure download links with expiration

### 🔧 Admin Features
- **Poster Management**: Create, edit, and delete posters
- **Category Management**: Manage poster categories
- **Order Tracking**: View and manage customer orders
- **Payment Monitoring**: Track payment transactions
- **Analytics**: View download counts and view statistics

### 💳 Payment Integration
- **Razorpay**: Indian payment gateway
- **Stripe**: International payment processing
- **PayPal**: Global payment solution
- **Order Management**: Complete order lifecycle tracking
- **Transaction History**: Detailed payment transaction logs

## Database Schema

### Core Tables

#### 1. `posters`
```sql
- id (UUID, Primary Key)
- title (TEXT, Required)
- description (TEXT)
- image_url (TEXT, Required)
- category (TEXT)
- tags (TEXT[])
- price (DECIMAL(10,2), Required)
- currency (TEXT, Default: 'INR')
- status (TEXT, Default: 'active')
- featured (BOOLEAN, Default: false)
- download_count (INTEGER, Default: 0)
- view_count (INTEGER, Default: 0)
- created_by (UUID, References admin)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### 2. `poster_orders`
```sql
- id (UUID, Primary Key)
- poster_id (UUID, References posters)
- customer_name (TEXT, Required)
- customer_email (TEXT, Required)
- customer_phone (TEXT)
- payment_method (TEXT, Required)
- payment_status (TEXT, Default: 'pending')
- payment_id (TEXT)
- amount (DECIMAL(10,2), Required)
- currency (TEXT, Default: 'INR')
- order_status (TEXT, Default: 'pending')
- download_url (TEXT)
- download_expires_at (TIMESTAMP)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### 3. `poster_categories`
```sql
- id (UUID, Primary Key)
- name (TEXT, Unique, Required)
- description (TEXT)
- icon (TEXT)
- color (TEXT)
- created_at (TIMESTAMP)
```

#### 4. `payment_transactions`
```sql
- id (UUID, Primary Key)
- order_id (UUID, References poster_orders)
- payment_gateway (TEXT, Required)
- transaction_id (TEXT)
- amount (DECIMAL(10,2), Required)
- currency (TEXT, Default: 'INR')
- status (TEXT, Required)
- gateway_response (JSONB)
- created_at (TIMESTAMP)
```

## Setup Instructions

### 1. Database Setup

Run the SQL commands from `database_tables.sql` in your Supabase SQL editor:

```sql
-- Run all the CREATE TABLE statements
-- Insert sample data
```

### 2. Environment Variables

Add these to your `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Payment Gateway Keys (Optional for demo)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
```

### 3. Populate Sample Data

Run the setup script to populate sample posters:

```bash
node scripts/setup-posters.js
```

### 4. Start the Application

```bash
npm run dev
```

## API Endpoints

### Posters API

#### GET `/api/posters`
- Query parameters: `category`, `featured`, `limit`, `offset`
- Returns: List of posters

#### POST `/api/posters`
- Body: Poster creation data
- Returns: Created poster

#### GET `/api/posters/[id]`
- Returns: Individual poster details
- Increments view count

#### PUT `/api/posters/[id]`
- Body: Updated poster data
- Returns: Updated poster

#### DELETE `/api/posters/[id]`
- Returns: Success message

#### GET `/api/posters/[id]/download`
- Query parameters: `order` (order ID)
- Returns: Download information

### Payments API

#### POST `/api/payments`
- Body: `{ orderId, paymentMethod, customerDetails }`
- Returns: Payment result

## File Structure

```
app/
├── posters/
│   └── page.tsx                 # Main poster store page
├── admin/
│   └── posters/
│       └── page.tsx             # Admin poster management
├── api/
│   ├── posters/
│   │   ├── route.ts             # Posters CRUD API
│   │   └── [id]/
│   │       ├── route.ts         # Individual poster API
│   │       └── download/
│   │           └── route.ts     # Download API
│   └── payments/
│       └── route.ts             # Payment processing API
└── components/
    └── CheckoutForm.tsx         # Customer checkout form

lib/
├── supabase.ts                  # Supabase client
└── payment-gateways.ts          # Payment gateway utilities

scripts/
└── setup-posters.js             # Sample data population
```

## Usage Guide

### For Customers

1. **Browse Posters**: Visit `/posters` to see all available posters
2. **Filter & Search**: Use category filters and search functionality
3. **Purchase**: Click "Buy Now" on any poster
4. **Checkout**: Fill in customer details and select payment method
5. **Download**: After successful payment, download your poster

### For Admins

1. **Access Admin Panel**: Visit `/admin/posters`
2. **Manage Posters**: Create, edit, or delete posters
3. **Monitor Orders**: Track customer orders and payments
4. **Analytics**: View download and view statistics

## Payment Gateway Integration

### Current Implementation
- **Mock Payment Processing**: Simulated payment success/failure
- **Multiple Gateways**: Support for Razorpay, Stripe, and PayPal
- **Order Tracking**: Complete order lifecycle management

### Production Setup
To enable real payment processing:

1. **Razorpay**:
   ```javascript
   // Install: npm install razorpay
   // Configure with your Razorpay keys
   ```

2. **Stripe**:
   ```javascript
   // Install: npm install stripe
   // Configure with your Stripe keys
   ```

3. **PayPal**:
   ```javascript
   // Install: npm install @paypal/checkout-server-sdk
   // Configure with your PayPal keys
   ```

## Security Features

- **Download Protection**: Secure download URLs with expiration
- **Payment Verification**: Order validation before download
- **Customer Data**: Secure storage of customer information
- **Admin Authentication**: Protected admin routes

## Customization

### Adding New Categories
1. Insert into `poster_categories` table
2. Update the category list in the frontend

### Adding New Payment Methods
1. Extend `PaymentGatewayFactory` in `lib/payment-gateways.ts`
2. Add payment method to checkout form
3. Update payment processing logic

### Styling
- Uses Tailwind CSS for styling
- Customizable through component props
- Responsive design for all devices

## Troubleshooting

### Common Issues

1. **Database Connection**:
   - Verify Supabase credentials
   - Check network connectivity

2. **Payment Processing**:
   - Verify payment gateway keys
   - Check order creation in database

3. **Image Loading**:
   - Ensure image URLs are accessible
   - Check CORS settings for external images

### Support

For issues or questions:
1. Check the console for error messages
2. Verify database schema matches
3. Ensure all environment variables are set

## Future Enhancements

- [ ] Real payment gateway integration
- [ ] Bulk poster upload
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] Mobile app integration
- [ ] Multi-language support
- [ ] Advanced search filters
- [ ] Wishlist functionality
- [ ] Customer reviews and ratings
- [ ] Subscription model for poster access
