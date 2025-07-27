# Writer Portal Setup Guide

## Overview
The Writer Portal is now running on a separate port (5000) from the main application (4000). This provides a dedicated environment for writers to manage their content.

## Ports
- **Main Application**: `http://localhost:4000` (Next.js app)
- **Writer Portal**: `http://localhost:5000` (Express server)

## Starting the Services

### Option 1: Start Both Services
```bash
# Terminal 1 - Main application
npm run dev

# Terminal 2 - Writer portal
npm run writer
```

### Option 2: Use the Start Script
```bash
# Start writer portal with the helper script
node start-writer.js
```

## Writer Portal Features

### Login Page (`http://localhost:5000`)
- Clean, modern login interface
- Authenticates against the same admin database
- Stores JWT token for session management

### Dashboard (`http://localhost:5000/dashboard`)
- Overview of writer's articles
- Statistics (total articles, views, likes, comments)
- Quick actions to create new articles
- Recent articles list

### Integration with Main App
- Writer portal communicates with main app's API endpoints
- Uses same Supabase database
- Seamless authentication flow

## API Endpoints

### Writer Portal API (`http://localhost:5000/api/`)
- `GET /api/articles` - Fetch all articles for the writer

### Main App API (`http://localhost:4000/api/`)
- `POST /api/admin/login` - Authentication
- `GET /api/posts` - Fetch all posts
- `POST /api/posts` - Create new post

## Authentication Flow
1. Writer logs in at `http://localhost:5000`
2. Credentials sent to `http://localhost:4000/api/admin/login`
3. JWT token stored in localStorage
4. Dashboard loads with authenticated session
5. All API calls include Authorization header

## Environment Variables
Make sure these are set in your `.env` file:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=your_jwt_secret
```

## Troubleshooting

### Port Already in Use
If port 5000 is already in use, modify `writer-server.js`:
```javascript
const PORT = 5001; // or any available port
```

### CORS Issues
The writer portal makes cross-origin requests to the main app. If you encounter CORS issues, ensure your Next.js app allows requests from `http://localhost:5000`.

### Database Connection
Both services use the same Supabase database, so ensure your database is properly set up with the required tables (`posts`, `admin`).

## Development Workflow
1. Start main app: `npm run dev`
2. Start writer portal: `npm run writer`
3. Access main app at `http://localhost:4000`
4. Access writer portal at `http://localhost:5000`
5. Writers can log in and manage their content
6. Content created in writer portal appears in main app

## Security Notes
- Writer portal uses the same authentication as admin panel
- JWT tokens are stored in localStorage
- All API calls require valid authentication
- Service role key is used for database operations 