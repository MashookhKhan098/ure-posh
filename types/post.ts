export interface Post {
  id: string
  title: string
  content: string
  author: string
  category: string
  status: string
  createdAt: string
  updatedAt: string
  featuredImage?: string
  tags: string[]
  slug: string
}

// Helper type for API response
export interface PostResponse {
  id: string
  title: string
  content: string
  author: string
  category: string
  status: string
  createdAt: string
  updatedAt: string
  featuredImage?: string
  tags: string[]
  slug: string
}
