# Writer Authentication Setup Guide

This guide explains the new writer authentication system that has been implemented.

## Features

### 🔐 Enhanced Security
- **JWT Token Authentication**: Secure token-based authentication with expiration
- **HTTP-Only Cookies**: Additional security layer with secure cookies
- **Session Management**: Database-backed session tracking
- **Password Hashing**: Bcrypt password hashing for security
- **Middleware Protection**: Automatic route protection

### 🛡️ Security Features
- Token expiration (24 hours)
- Secure cookie settings
- IP address and user agent tracking
- Session invalidation on logout
- Automatic token verification

## Environment Variables

Add these to your `.env.local` file:

```env
# JWT Secret (generate a strong secret for production)
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Supabase Configuration (if using separate writer database)
NEXT_PUBLIC_WRITER_SUPABASE_URL=your_writer_supabase_url
NEXT_PUBLIC_WRITER_SUPABASE_ANON_KEY=your_writer_supabase_anon_key
WRITER_SUPABASE_SERVICE_ROLE_KEY=your_writer_supabase_service_role_key
```

## Database Schema

The system expects these tables in your Supabase database:

### writer_profiles
```sql
CREATE TABLE writer_profiles (
  writer_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  bio TEXT,
  avatar_url TEXT,
  specialization VARCHAR(100),
  experience_level VARCHAR(50),
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  login_count INTEGER DEFAULT 0,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### writer_sessions
```sql
CREATE TABLE writer_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  writer_id UUID REFERENCES writer_profiles(writer_id) ON DELETE CASCADE,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## API Endpoints

### Authentication
- `POST /api/writer/auth` - Login
- `DELETE /api/writer/auth` - Logout
- `GET /api/writer/auth/verify` - Verify token

### Protected Routes
- `GET /api/writer/dashboard` - Writer dashboard data
- All routes under `/api/writer/*` (except auth)

## Usage

### Client-Side Authentication Hook

```typescript
import { useWriterAuth } from '@/hooks/useWriterAuth';

function MyComponent() {
  const { user, isLoading, isAuthenticated, login, logout } = useWriterAuth();

  const handleLogin = async () => {
    const result = await login(username, password);
    if (result.success) {
      // Login successful
    } else {
      // Handle error
      console.error(result.error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <LoginForm />;
  
  return <Dashboard user={user} />;
}
```

### Server-Side Authentication

```typescript
import { verifyWriterAuth } from '@/utils/auth/writer';

export async function GET(req: NextRequest) {
  const authData = verifyWriterAuth(req);
  if (!authData) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // authData contains: writer_id, username, email, role
  const writerId = authData.writer_id;
  
  // Your protected logic here
}
```

## Middleware Protection

The middleware automatically protects:
- `/writer/*` routes (redirects to login if not authenticated)
- `/api/writer/*` routes (returns 401 if not authenticated)

## Default Credentials

For testing, you can use:
- **Username**: Any writer username from the database
- **Password**: `ureposh2024`

## Security Best Practices

1. **Change JWT Secret**: Use a strong, unique JWT secret in production
2. **HTTPS Only**: Ensure HTTPS in production for secure cookies
3. **Regular Token Rotation**: Consider implementing token refresh
4. **Rate Limiting**: Add rate limiting to auth endpoints
5. **Audit Logging**: Log authentication events for security monitoring

## Troubleshooting

### Common Issues

1. **"Authentication required" error**
   - Check if JWT_SECRET is set
   - Verify token is not expired
   - Check if user is active in database

2. **Login not working**
   - Verify password hash in database
   - Check if writer profile is active
   - Ensure database connection is working

3. **Middleware not working**
   - Check if middleware.ts is in root directory
   - Verify matcher configuration
   - Check Next.js version compatibility

### Debug Commands

```bash
# Check environment variables
node -e "console.log(process.env.JWT_SECRET)"

# Test database connection
node -e "require('./utils/supabase/writer').createWriterAdminClient()"

# Clear all auth data
localStorage.removeItem('writerToken')
localStorage.removeItem('writerUser')
```

## Migration from Old System

If you're upgrading from the old authentication system:

1. Update your database schema
2. Set the JWT_SECRET environment variable
3. Update any custom authentication logic
4. Test the new login flow
5. Remove old authentication code

The new system is backward compatible with existing writer data, but provides much better security and user experience. 