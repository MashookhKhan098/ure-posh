# People Table Setup Guide

This document explains the Supabase table structure created for the people/team members page.

## Table Structure

The `people` table has been designed to store comprehensive information about team members, including:

### Basic Information
- `id` (UUID, Primary Key)
- `name` (Text, Required)
- `title` (Text, Required)
- `specialization` (Text, Required)
- `description` (Text, Required)
- `detailed_description` (Text, Optional)

### Professional Details
- `experience` (Text, Required) - e.g., "10+ years"
- `category` (Text, Required) - e.g., "legal", "finance", "psychology"
- `status` (Text, Default: "standard") - e.g., "standard", "premium"
- `verified` (Boolean, Default: false)
- `featured` (Boolean, Default: false)
- `availability` (Text, Default: "Available") - e.g., "Available", "Busy"

### Contact Information
- `email` (Text, Required)
- `phone` (Text, Optional)
- `location` (Text, Required)
- `website` (Text, Optional)
- `linkedin` (Text, Optional)

### Performance Metrics
- `rating` (Decimal, Default: 0.0)
- `review_count` (Integer, Default: 0)
- `projects` (Integer, Default: 0)
- `completion_rate` (Integer, Default: 0)
- `response_time` (Text, Optional) - e.g., "2 hours"

### Pricing
- `hourly_rate` (Text, Optional) - e.g., "₹5,000"
- `monthly_rate` (Text, Optional) - e.g., "₹1,50,000"
- `project_rate` (Text, Optional) - e.g., "₹25,000"

### Visual/UI Properties
- `icon_name` (Text, Optional) - e.g., "Scale", "Calculator", "GraduationCap"
- `color_gradient` (Text, Optional) - e.g., "from-pink-500 to-rose-600"
- `accent_color` (Text, Optional) - e.g., "pink"
- `image_url` (Text, Optional)
- `cover_image_url` (Text, Optional)

### JSONB Arrays (for complex data)
- `expertise` (JSONB) - Array of expertise areas
- `languages` (JSONB) - Array of spoken languages
- `education` (JSONB) - Array of education objects
- `certifications` (JSONB) - Array of certifications
- `skills` (JSONB) - Array of skill objects with levels
- `testimonials` (JSONB) - Array of testimonial objects
- `recent_projects` (JSONB) - Array of project objects
- `achievements` (JSONB) - Array of achievements

### Timestamps
- `created_at` (Timestamp with timezone)
- `updated_at` (Timestamp with timezone)

## Setup Instructions

### 1. Run the SQL Script

Execute the SQL script in your Supabase SQL editor:

```sql
-- Run the script: scripts/06-create-people-table.sql
```

This script will:
- Create the `people` table with all necessary columns
- Create indexes for better performance
- Enable Row Level Security (RLS)
- Set up RLS policies
- Create triggers for auto-updating timestamps
- Insert sample data
- Create a view for easier querying
- Create a search function

### 2. Sample Data

The script includes sample data for 6 team members:
- CS Anchal Chopra (Legal Expert)
- CA Shweta Gupta (Financial Advisor)
- Adv. Shringarika Tyagi (Legal Academic)
- CA Sarvagya Goyal (Audit Specialist)
- Adv. Pradeep Kumar (Litigation Expert)
- Dr. Meera Sharma (Organizational Psychologist)

### 3. API Endpoints

The following API endpoints have been created:

#### GET /api/people
Fetch all people with optional filters:
- `category` - Filter by category
- `status` - Filter by status
- `availability` - Filter by availability
- `search` - Search by name, title, or specialization
- `sortBy` - Sort by name, experience, rating, or projects
- `limit` - Number of results to return
- `offset` - Pagination offset

#### POST /api/people
Create a new person (requires authentication)

#### GET /api/people/[id]
Fetch a specific person by ID

#### PUT /api/people/[id]
Update a person (requires admin role)

#### DELETE /api/people/[id]
Delete a person (requires admin role)

### 4. Frontend Integration

The following files have been created/updated:

- `types/database.ts` - Added Person types and interfaces
- `lib/api/people.ts` - Utility functions for API calls
- `app/api/people/route.ts` - Main people API endpoint
- `app/api/people/[id]/route.ts` - Individual person API endpoint

### 5. Usage Examples

#### Fetch all people
```typescript
import { getPeople } from '@/lib/api/people'

const response = await getPeople()
console.log(response.data) // Array of people
```

#### Fetch people with filters
```typescript
const response = await getPeople({
  category: 'legal',
  search: 'POSH',
  sortBy: 'rating',
  limit: 10
})
```

#### Fetch specific person
```typescript
import { getPerson } from '@/lib/api/people'

const response = await getPerson('person-id')
console.log(response.data) // Single person object
```

## Database Features

### Indexes
- Category index for filtering
- Status index for filtering
- Rating index for sorting
- GIN indexes for JSONB columns

### Row Level Security
- Public read access to all people
- Authenticated users can create profiles
- Admin users can update/delete any profile

### Views
- `people_view` - Enhanced view with computed fields

### Functions
- `search_people()` - Advanced search function with multiple filters

## Data Structure Examples

### Education Object
```json
{
  "degree": "Company Secretary",
  "institution": "Institute of Company Secretaries of India",
  "year": "2012"
}
```

### Skill Object
```json
{
  "name": "Corporate Law",
  "level": 95
}
```

### Testimonial Object
```json
{
  "id": 1,
  "client": "TechCorp Solutions",
  "feedback": "Exceptional expertise in POSH implementation.",
  "rating": 5,
  "date": "2024-01-15",
  "projectType": "POSH Implementation"
}
```

### Project Object
```json
{
  "title": "POSH Policy Implementation",
  "client": "Tech Solutions Ltd",
  "duration": "3 months",
  "status": "Completed"
}
```

## Next Steps

1. **Run the SQL script** in your Supabase dashboard
2. **Test the API endpoints** to ensure they work correctly
3. **Update the frontend** to use the new API instead of hardcoded data
4. **Add more team members** through the API or database
5. **Customize the UI** to match your design requirements

## Troubleshooting

### Common Issues

1. **RLS Policy Errors**: Make sure you're authenticated when creating/updating records
2. **JSONB Parsing Errors**: Ensure JSON data is properly formatted
3. **Index Performance**: Monitor query performance and add indexes as needed

### Support

If you encounter any issues, check:
- Supabase logs for database errors
- Browser console for API errors
- Network tab for request/response issues
