export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          color: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          color?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          color?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      articles: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string
          content: string
          image_url: string | null
          author: string
          is_breaking: boolean
          is_hot: boolean
          is_featured: boolean
          verified: boolean
          views: number
          published_at: string
          category_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt: string
          content: string
          image_url?: string | null
          author: string
          is_breaking?: boolean
          is_hot?: boolean
          is_featured?: boolean
          verified?: boolean
          views?: number
          published_at?: string
          category_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string
          content?: string
          image_url?: string | null
          author?: string
          is_breaking?: boolean
          is_hot?: boolean
          is_featured?: boolean
          verified?: boolean
          views?: number
          published_at?: string
          category_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      article_stats: {
        Row: {
          id: string
          article_id: string
          views: number
          shares: number
          bookmarks: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          article_id: string
          views?: number
          shares?: number
          bookmarks?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          article_id?: string
          views?: number
          shares?: number
          bookmarks?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Extended types for the frontend
export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image_url: string | null
  author: string
  is_breaking: boolean
  is_hot: boolean
  is_featured: boolean
  verified: boolean
  views: number
  published_at: string
  category_id: string | null
  created_at: string
  updated_at: string
  categories?: Category
}

export interface Category {
  id: string
  name: string
  slug: string
  color: string
  description: string | null
  created_at: string
  updated_at: string
}

export interface ArticleStats {
  id: string
  article_id: string
  views: number
  shares: number
  bookmarks: number
  created_at: string
  updated_at: string
}

// Types for API responses
export interface ArticlesResponse {
  data: Article[]
  error: string | null
  count: number
}

export interface CategoriesResponse {
  data: Category[]
  error: string | null
}

export interface ArticleResponse {
  data: Article | null
  error: string | null
}
