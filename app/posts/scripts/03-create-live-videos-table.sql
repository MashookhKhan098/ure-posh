-- Create live_videos table for streaming video content
CREATE TABLE IF NOT EXISTS live_videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  stream_url TEXT NOT NULL,
  is_live BOOLEAN DEFAULT true,
  viewer_count INTEGER DEFAULT 0,
  category_id UUID REFERENCES categories(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_live_videos_is_live ON live_videos(is_live);
CREATE INDEX IF NOT EXISTS idx_live_videos_category ON live_videos(category_id);
CREATE INDEX IF NOT EXISTS idx_live_videos_created_at ON live_videos(created_at DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE live_videos ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access to live videos" ON live_videos
  FOR SELECT USING (true);
