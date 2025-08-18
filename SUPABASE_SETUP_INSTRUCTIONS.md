# Supabase Setup Instructions for News System

## 🚀 Quick Setup

### 1. Database Setup

1. **Run the SQL Schema**
   - Copy the contents of `database-schema.sql`
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Paste and execute the SQL script

2. **Verify Tables Created**
   - Check that the following tables exist:
     - `categories`
     - `articles`
     - `article_stats`

### 2. Environment Variables

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Row Level Security (RLS)

The schema includes RLS policies that:
- Allow public read access to articles and categories
- Require authentication for create/update/delete operations
- Track article views automatically

## 📝 Features

### For Writers (Admin Panel)
- **Create Articles**: Full article creation with rich text editor
- **Edit Articles**: Update existing articles
- **Delete Articles**: Remove articles from the system
- **Category Management**: Assign articles to categories
- **Article Flags**: Mark articles as breaking, hot, or featured
- **View Statistics**: See article views and engagement

### For Readers
- **Browse Articles**: View all articles with filtering
- **Category Filtering**: Filter by category (Politics, Technology, etc.)
- **Breaking News**: Real-time breaking news alerts
- **Hot Topics**: Trending articles
- **Featured Stories**: Editor's picks
- **Most Popular**: Articles sorted by views

## 🔧 API Endpoints

### Articles
- `GET /api/articles` - Get all articles with filtering
- `POST /api/articles` - Create new article
- `GET /api/articles/[slug]` - Get article by slug
- `PUT /api/articles/[slug]` - Update article
- `DELETE /api/articles/[slug]` - Delete article

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category

## 🎨 Customization

### Adding New Categories
1. Go to Supabase Dashboard
2. Navigate to Table Editor
3. Select `categories` table
4. Add new category with:
   - `name`: Display name
   - `slug`: URL-friendly name
   - `color`: Hex color code
   - `description`: Optional description

### Styling
- All pink theme colors can be customized in the components
- Category colors are stored in the database
- Responsive design works on all devices

## 🔒 Security

- RLS policies ensure data security
- Only authenticated users can create/edit/delete
- Public read access for articles and categories
- Automatic view tracking

## 📊 Analytics

The system tracks:
- Article views
- Popular articles
- Category performance
- Breaking news engagement

## 🚀 Deployment

1. Set up Supabase project
2. Run database schema
3. Configure environment variables
4. Deploy your Next.js app
5. Access admin panel at `/admin`

## 🛠️ Troubleshooting

### Common Issues

1. **"Missing Supabase environment variables"**
   - Check your `.env.local` file
   - Ensure variables are correctly named

2. **"Permission denied"**
   - Verify RLS policies are enabled
   - Check user authentication status

3. **"Table not found"**
   - Run the database schema again
   - Check table names match exactly

### Support

For issues with:
- **Database**: Check Supabase documentation
- **Frontend**: Check Next.js and React documentation
- **Styling**: Check Tailwind CSS documentation

## 📈 Next Steps

1. **Add Authentication**: Implement user login for writers
2. **Image Upload**: Add image upload functionality
3. **Rich Text Editor**: Implement WYSIWYG editor
4. **Email Notifications**: Add newsletter functionality
5. **Analytics Dashboard**: Create detailed analytics view
6. **SEO Optimization**: Add meta tags and structured data
7. **Social Sharing**: Add social media sharing buttons
8. **Comments System**: Add article comments
9. **Search Functionality**: Implement article search
10. **Mobile App**: Create React Native mobile app

## 🎯 Best Practices

1. **Content Management**
   - Use descriptive slugs
   - Write compelling excerpts
   - Add relevant images
   - Tag articles appropriately

2. **Performance**
   - Optimize images
   - Use proper indexing
   - Implement caching
   - Monitor database performance

3. **SEO**
   - Use descriptive titles
   - Add meta descriptions
   - Implement structured data
   - Optimize for keywords

4. **User Experience**
   - Keep navigation simple
   - Use consistent styling
   - Ensure fast loading
   - Make it mobile-friendly
