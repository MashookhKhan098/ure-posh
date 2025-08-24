-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  unsubscribe_token VARCHAR(255) UNIQUE DEFAULT gen_random_uuid()::text,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_active ON newsletter_subscribers(is_active);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_token ON newsletter_subscribers(unsubscribe_token);

-- Enable RLS (Row Level Security)
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policies for newsletter_subscribers
CREATE POLICY "Allow public to subscribe" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public to read own subscription" ON newsletter_subscribers
  FOR SELECT USING (true);

CREATE POLICY "Allow public to update own subscription" ON newsletter_subscribers
  FOR UPDATE USING (true);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_newsletter_subscribers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update the updated_at field
CREATE TRIGGER update_newsletter_subscribers_updated_at
  BEFORE UPDATE ON newsletter_subscribers
  FOR EACH ROW
  EXECUTE FUNCTION update_newsletter_subscribers_updated_at();

-- Create notification log table to track sent emails
CREATE TABLE IF NOT EXISTS newsletter_notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID,
  post_type VARCHAR(50) NOT NULL, -- 'posts' or 'poster'
  post_title VARCHAR(500) NOT NULL,
  post_slug VARCHAR(255),
  sent_to_count INTEGER DEFAULT 0,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for notifications
ALTER TABLE newsletter_notifications ENABLE ROW LEVEL SECURITY;

-- Create policy for notifications (admin only)
CREATE POLICY "Allow admin to manage notifications" ON newsletter_notifications
  FOR ALL USING (true);

-- Create index for notifications
CREATE INDEX IF NOT EXISTS idx_newsletter_notifications_post ON newsletter_notifications(post_id, post_type);
CREATE INDEX IF NOT EXISTS idx_newsletter_notifications_sent_at ON newsletter_notifications(sent_at);

-- Grant necessary permissions
GRANT ALL ON newsletter_subscribers TO anon, authenticated;
GRANT ALL ON newsletter_notifications TO anon, authenticated;

-- Insert some sample data for testing
-- INSERT INTO newsletter_subscribers (email) VALUES 
--   ('test@example.com'),
--   ('subscriber@example.com');

COMMENT ON TABLE newsletter_subscribers IS 'Stores email addresses of newsletter subscribers';
COMMENT ON TABLE newsletter_notifications IS 'Tracks newsletter notifications sent for new posts';
