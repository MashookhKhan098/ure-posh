# People Table Setup Guide

## Quick Setup Instructions

### 1. Create the People Table in Supabase

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to the SQL Editor (left sidebar)
4. Copy and paste the entire content from `scripts/06-create-people-table.sql`
5. Click "Run" to execute the SQL

### 2. Insert Sample Data

After creating the table, run this SQL in the same editor:

```sql
-- Copy the content from scripts/07-insert-sample-people-data.sql
-- This will insert 10 sample people records
```

### 3. Verify the Setup

Run this query to verify the data was inserted:

```sql
SELECT 
  name, 
  title, 
  category, 
  rating, 
  verified, 
  featured
FROM people 
ORDER BY created_at DESC;
```

## Alternative: Use the Node.js Scripts

If you prefer to use the Node.js scripts:

1. **Create the table:**
   ```bash
   node scripts/create-people-table.js
   ```

2. **Insert sample data:**
   ```bash
   node scripts/run-people-data.js
   ```

## Current Status

- ✅ People table schema created
- ✅ API endpoints created (`/api/people` and `/api/people/[id]`)
- ✅ Frontend component updated to use database
- ✅ Sample data ready
- ⏳ **Pending:** Table creation in Supabase
- ⏳ **Pending:** Data insertion

## Troubleshooting

### If you see "ERR_CONNECTION_REFUSED"

This means the Next.js development server isn't running. Start it with:

```bash
npm run dev
```

### If you see "Could not find the table 'public.people'"

The table hasn't been created in Supabase yet. Follow step 1 above.

### Environment Variables

Make sure your `.env.local` file has:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Next Steps

1. Create the table in Supabase
2. Insert the sample data
3. The people page should automatically load data from the database
4. Test the filtering, searching, and sorting functionality

## API Endpoints

Once set up, these endpoints will be available:

- `GET /api/people` - Get all people with filtering
- `GET /api/people/[id]` - Get a specific person
- `POST /api/people` - Create a new person
- `PUT /api/people/[id]` - Update a person
- `DELETE /api/people/[id]` - Delete a person

## Sample Data Included

The sample data includes 10 people with:
- Legal experts (CS Anchal Chopra, Adv. Shringarika Tyagi, etc.)
- Financial advisors (CA Shweta Gupta, CA Sarvagya Goyal, etc.)
- Psychologists (Dr. Meera Sharma, Dr. Anjali Patel, etc.)

Each person has complete profiles with:
- Contact information
- Skills and expertise
- Education and certifications
- Testimonials
- Recent projects
- Achievements
