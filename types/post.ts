export interface Post {
  id: string
  title: string
  content: string
  excerpt?: string
  author: string
  category: string
  status: string
  createdAt: string
  updatedAt: string
  featuredImage?: string
  videoUrl?: string
  videoTitle?: string
  videoDescription?: string
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
  createdAt: string
  updatedAt: string
  featuredImage?: string
  videoUrl?: string
  videoTitle?: string
  videoDescription?: string
  tags: string[]
  slug: string
  views?: number
}
