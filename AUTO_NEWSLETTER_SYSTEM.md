# Automatic Newsletter System Documentation

## 🎯 Overview

The automatic newsletter system sends email notifications to all subscribed users whenever new content is approved by admin. This includes both blog posts/articles and posters.

## 🔄 How It Works

### 1. **Post Approval Workflow**
```
Writer submits article → Admin reviews → Admin approves → System sends newsletter automatically
```

### 2. **Poster Creation Workflow**  
```
Admin/User creates poster → Poster is active → System sends newsletter automatically
```

## 📧 Email Triggers

### **Articles/Posts**
- **Trigger**: When admin calls `POST /api/posts/[id]/approve`
- **Action**: Article status changed to `verified: true`, `published_at` set
- **Newsletter**: Automatically sent to all active subscribers
- **Email Type**: "📝 New Blog Post: [Title]"

### **Posters**
- **Trigger**: When new poster created via `POST /api/posters`
- **Action**: Poster created with `status: 'active'`
- **Newsletter**: Automatically sent to all active subscribers  
- **Email Type**: "🎨 New Poster: [Title]"

## 🗃️ Database Tables

### **newsletter_subscribers**
```sql
- id (UUID)
- email (VARCHAR)
- is_active (BOOLEAN) -- Only active subscribers get emails
- unsubscribe_token (VARCHAR)
- subscribed_at (TIMESTAMP)
- created_at, updated_at (TIMESTAMP)
```

### **newsletter_notifications**
```sql
- id (UUID)
- post_id (UUID) -- Links to articles or posters
- post_type (VARCHAR) -- 'posts' or 'posters'
- post_title (VARCHAR)
- sent_to_count (INTEGER) -- Number of emails sent
- sent_at (TIMESTAMP)
```

## 🔧 API Endpoints

### **Subscribe to Newsletter**
```http
POST /api/newsletter
Content-Type: application/json

{
  "email": "user@example.com"
}
```

### **Send Newsletter Notification**
```http
POST /api/newsletter/notify
Content-Type: application/json

{
  "postId": "uuid",
  "postType": "posts", // or "posters"
  "postTitle": "Article Title",
  "postSlug": "article-slug",
  "postContent": "Article excerpt...",
  "postImage": "https://example.com/image.jpg"
}
```

### **Approve Post (Triggers Newsletter)**
```http
POST /api/posts/[id]/approve
```

### **Create Poster (Triggers Newsletter)**
```http  
POST /api/posters
Content-Type: application/json

{
  "title": "Poster Title",
  "image_url": "https://example.com/poster.jpg",
  "price": 29.99,
  "description": "Poster description..."
}
```

## 📧 Email Templates

### **Newsletter Email Features**
- **Responsive HTML design** with professional styling
- **Post preview** with image and excerpt
- **Call-to-action button** to read full post
- **Unsubscribe link** in footer (GDPR compliant)
- **Different styling** for posts vs posters
- **Email client compatibility** (Gmail, Outlook, etc.)

### **Welcome Email**
- Sent when user first subscribes
- Contains subscription confirmation
- Lists what type of content they'll receive
- Includes unsubscribe link

## 🛠️ Implementation Files

### **Core Files**
- `/app/api/newsletter/route.ts` - Subscription management
- `/app/api/newsletter/notify/route.ts` - Email sending logic
- `/app/api/posts/[id]/approve/route.ts` - Post approval + newsletter
- `/app/api/posters/route.ts` - Poster creation + newsletter
- `/lib/newsletter-notifications.ts` - Utility functions

### **Frontend Components**
- `/components/NewsletterSubscription.tsx` - Subscription form
- `/app/posts/page.tsx` - Newsletter signup on posts page
- `/app/news/page.tsx` - Newsletter signup on news page

### **Database Scripts**
- `/scripts/11-create-newsletter-subscribers.sql` - Table setup

## 🧪 Testing

### **Test Newsletter System**
```bash
node test-newsletter-db.js        # Test database connectivity
node test-auto-newsletter.js      # Test automatic notifications
```

### **Manual Testing**
1. Subscribe to newsletter via frontend form
2. Create/approve a post via admin panel
3. Check email for notification
4. Verify database logs in `newsletter_notifications`

## ⚙️ Configuration

### **Environment Variables Required**
```env
# Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# Email (Production)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# App URL
NEXT_PUBLIC_APP_URL=https://yoursite.com
```

## 🔒 Security & Privacy

### **GDPR Compliance**
- ✅ Clear unsubscribe process
- ✅ Privacy notice on subscription
- ✅ No email sharing policy
- ✅ User consent required

### **Email Security**
- ✅ SMTP authentication required
- ✅ Rate limiting on subscription
- ✅ Email validation
- ✅ Duplicate prevention

## 📊 Analytics & Monitoring

### **Tracking Metrics**
- Number of active subscribers
- Email open rates (if using email service)
- Unsubscribe rates
- Newsletter performance per post

### **Logs & Debugging**
- All newsletter sends are logged to console
- Failed emails are tracked
- Database logs in `newsletter_notifications`
- Test email previews available

## 🚀 Deployment Notes

### **Production Setup**
1. Configure SMTP credentials for real email sending
2. Set proper `NEXT_PUBLIC_APP_URL` for links
3. Test email delivery with real email addresses
4. Monitor bounce rates and deliverability

### **Email Service Recommendations**
- **Gmail/Google Workspace**: Simple SMTP setup
- **SendGrid**: Professional email service
- **Amazon SES**: Cost-effective for high volume
- **Mailgun**: Developer-friendly API

## 🔄 Future Enhancements

### **Potential Improvements**
- [ ] Email templates customization
- [ ] Scheduled newsletter sends
- [ ] Subscriber segmentation by category
- [ ] Email analytics dashboard
- [ ] A/B testing for subject lines
- [ ] Rich text email editor
- [ ] Social media integration
- [ ] RSS feed integration

---

*Last updated: August 24, 2025*
