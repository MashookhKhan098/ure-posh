# Field Allotted Migration Guide

## Overview
This migration replaces the single `field_allotted` text field with 10 specific boolean checkboxes for content area permissions. This allows writers to be assigned to specific content areas and provides better control over what content they can create.

## What Changed

### Before
- Single `field_allotted` text field
- `expertise` text field
- Limited control over content permissions

### After
- 10 specific boolean checkboxes for content areas
- Removed `expertise` field
- Better granular control over writer permissions

## New Field Allotted Options

1. **Company Updates** - `company_updates`
2. **Compliance & Legal Insights (Blog Section)** - `compliance_legal_insights`
3. **News & Media Coverage** - `news_media_coverage`
4. **Newsletter Archive** - `newsletter_archive`
5. **Thought Leadership** - `thought_leadership`
6. **Workplace Stories** - `workplace_stories`
7. **Events & Webinars** - `events_webinars`
8. **International Regulatory & Policy Watch** - `international_regulatory_policy_watch`
9. **United Kingdom Workplace** - `united_kingdom_workplace`
10. **US Workplace** - `us_workplace`

## Database Changes

### New Columns Added
```sql
ALTER TABLE writer ADD COLUMN company_updates boolean DEFAULT false;
ALTER TABLE writer ADD COLUMN compliance_legal_insights boolean DEFAULT false;
ALTER TABLE writer ADD COLUMN news_media_coverage boolean DEFAULT false;
ALTER TABLE writer ADD COLUMN newsletter_archive boolean DEFAULT false;
ALTER TABLE writer ADD COLUMN thought_leadership boolean DEFAULT false;
ALTER TABLE writer ADD COLUMN workplace_stories boolean DEFAULT false;
ALTER TABLE writer ADD COLUMN events_webinars boolean DEFAULT false;
ALTER TABLE writer ADD COLUMN international_regulatory_policy_watch boolean DEFAULT false;
ALTER TABLE writer ADD COLUMN united_kingdom_workplace boolean DEFAULT false;
ALTER TABLE writer ADD COLUMN us_workplace boolean DEFAULT false;
```

### Columns Removed
```sql
ALTER TABLE writer DROP COLUMN field_allotted;
ALTER TABLE writer DROP COLUMN expertise;
```

## How to Run the Migration

### Option 1: Run the Migration Script
```bash
node run-field-allotted-migration.js
```

### Option 2: Manual SQL Execution
1. Connect to your Supabase database
2. Run the SQL commands from `scripts/11-add-writer-field-allotted-checkboxes.sql`

## Testing the Migration

After running the migration, test the new structure:

```bash
node test-field-allotted.js
```

## Frontend Changes

### Admin Writer Creation Form
- Updated to use checkboxes instead of text inputs
- Removed expertise field
- Added validation to ensure at least one field is selected

### API Routes Updated
- `/api/admin/writers` - POST method now handles boolean fields
- `/api/writer/auth/login` - Returns structured field_allotted object
- `/api/writer/auth/check` - Returns structured field_allotted object

### Hooks Updated
- `useWriterAuth` - Updated Writer interface to handle new structure

## Usage Examples

### Creating a Writer with Field Allotted
```javascript
const newWriter = {
  name: "John Doe",
  username: "johndoe",
  password: "securepassword",
  bio: "Experienced writer",
  phone: "1234567890",
  company_updates: true,
  compliance_legal_insights: true,
  news_media_coverage: false,
  // ... other fields
};
```

### Checking Writer Permissions
```javascript
const { writer } = useWriterAuth();

if (writer?.field_allotted?.company_updates) {
  // Writer can create company updates
}

if (writer?.field_allotted?.compliance_legal_insights) {
  // Writer can create compliance content
}
```

## Benefits

1. **Better Control**: Admins can precisely control what content areas writers can access
2. **Scalability**: Easy to add new content areas in the future
3. **Validation**: Ensures writers have at least one content area assigned
4. **User Experience**: Clear visual representation of permissions
5. **Backend Integration**: Boolean fields are easier to query and filter

## Rollback Plan

If you need to rollback the migration:

```sql
-- Drop new columns
ALTER TABLE writer DROP COLUMN company_updates;
ALTER TABLE writer DROP COLUMN compliance_legal_insights;
-- ... repeat for all new columns

-- Restore old columns
ALTER TABLE writer ADD COLUMN field_allotted text;
ALTER TABLE writer ADD COLUMN expertise text;
```

## Next Steps

1. ✅ Run the migration script
2. ✅ Test the new structure
3. ✅ Update your writer creation forms
4. ✅ Test creating new writers
5. ✅ Verify existing writers still work
6. ✅ Update any other forms that reference the old fields

## Support

If you encounter any issues during the migration, check:
1. Database connection and permissions
2. Environment variables are set correctly
3. Supabase service role key has admin privileges
4. No existing data conflicts

## Files Modified

- `scripts/11-add-writer-field-allotted-checkboxes.sql` - Database migration
- `app/admin/writers/new/page.tsx` - Admin writer creation form
- `app/api/admin/writers/route.ts` - Writers API
- `app/api/writer/auth/login/route.ts` - Writer login API
- `app/api/writer/auth/check/route.ts` - Writer auth check API
- `hooks/useWriterAuth.tsx` - Writer authentication hook
- `run-field-allotted-migration.js` - Migration runner script
- `test-field-allotted.js` - Test script
