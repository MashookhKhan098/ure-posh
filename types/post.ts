export interface Post {
  id: string
  title: string
  content: string
  excerpt?: string
  author: string
  category: string
  status: string
  created_at: string
  updated_at: string
  featured_image?: string
  video_url?: string
  video_title?: string
  video_description?: string
  tags: string
  slug: string
  views?: number
}

// Helper type for API response
export interface PostResponse {
  id: string
  title: string
  content: string
  excerpt?: string
  author: string
  category: string
  status: string
  created_at: string
  updated_at: string
  featured_image?: string
  video_url?: string
  video_title?: string
  video_description?: string
  tags: string[]
  slug: string
  views?: number
}
