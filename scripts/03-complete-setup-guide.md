# Complete Database Setup Guide

## Overview
This guide provides step-by-step instructions for setting up the complete database system with separate scripts for base functionality and poster system.

## Scripts Overview

### 1. `01-base-database-setup.sql`
- **Purpose**: Sets up core database tables and sample data
- **Tables**: `admin`, `writer_profiles`, `posts`
- **Sample Data**: Admin user, writer user, sample post

### 2. `02-poster-system-setup.sql`
- **Purpose**: Adds complete poster e-commerce system
- **Tables**: `poster_categories`, `posters`, `poster_orders`, `payment_transactions`
- **Sample Data**: 8 categories, 10 posters with high-quality images

## Setup Instructions

### Step 1: Base Database Setup
1. Go to your **Supabase SQL Editor**
2. Copy the entire content of `scripts/01-base-database-setup.sql`
3. Paste and run the script
4. Verify success message appears

### Step 2: Poster System Setup
1. In the same **Supabase SQL Editor**
2. Copy the entire content of `scripts/02-poster-system-setup.sql`
3. Paste and run the script
4. Verify success message appears

## What Gets Created

### Base System
- ✅ **Admin Table**: User authentication and management
- ✅ **Writer Profiles**: Content creator management
- ✅ **Posts Table**: Blog/content management
- ✅ **Sample Admin**: `admin` / `admin123`
- ✅ **Sample Writer**: `writer1` / `writer123`
- ✅ **Sample Post**: "Welcome to Ureposh"

### Poster System
- ✅ **8 Categories**: Motivational, Business, Educational, Artistic, Technology, Health, Sports, Nature
- ✅ **10 Posters**: High-quality images from Unsplash with realistic pricing
- ✅ **Order Management**: Complete e-commerce order tracking
- ✅ **Payment System**: Transaction recording and payment gateway integration
- ✅ **Download System**: Secure poster download functionality

## Login Credentials

### Admin Panel
- **URL**: `/admin`
- **Username**: `admin`
- **Password**: `admin123`
- **Email**: `admin@ureposh.com`

### Writer Panel
- **URL**: `/writer`
- **Username**: `writer1`
- **Password**: `writer123`
- **Email**: `writer@ureposh.com`

## Features Available

### After Base Setup
- ✅ Admin authentication
- ✅ Writer management
- ✅ Content management (posts)
- ✅ Basic user roles

### After Poster Setup
- ✅ Complete poster catalog
- ✅ E-commerce functionality
- ✅ Payment processing
- ✅ Order management
- ✅ Download system
- ✅ Category filtering
- ✅ Search functionality

## Troubleshooting

### If you get "relation already exists" errors:
- The scripts use `IF NOT EXISTS` clauses
- Safe to run multiple times
- No data will be duplicated

### If you get "column already exists" errors:
- The scripts check for existing columns
- Safe to run multiple times
- Existing data is preserved

### If you need to reset everything:
1. Drop all tables manually in Supabase
2. Run scripts in order again

## Next Steps

After running both scripts:

1. **Test Admin Login**: Go to `/admin` and login
2. **Test Poster Page**: Go to `/posters` to see the catalog
3. **Test Payment Flow**: Try purchasing a poster
4. **Customize Content**: Add your own posters and categories

## Support

If you encounter any issues:
1. Check the success messages in the SQL editor
2. Verify all tables were created
3. Check the login credentials
4. Ensure your environment variables are set correctly

---

**Note**: These scripts are designed to be safe and can be run multiple times without causing conflicts or data loss.
