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
      people: {
        Row: {
          id: string
          name: string
          title: string
          specialization: string
          description: string
          detailed_description: string | null
          experience: string
          category: string
          status: string
          verified: boolean
          featured: boolean
          availability: string
          email: string
          phone: string | null
          location: string
          website: string | null
          linkedin: string | null
          rating: number
          review_count: number
          projects: number
          completion_rate: number
          response_time: string | null
          hourly_rate: string | null
          monthly_rate: string | null
          project_rate: string | null
          icon_name: string | null
          color_gradient: string | null
          accent_color: string | null
          image_url: string | null
          cover_image_url: string | null
          expertise: any
          languages: any
          education: any
          certifications: any
          skills: any
          testimonials: any
          recent_projects: any
          achievements: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          title: string
          specialization: string
          description: string
          detailed_description?: string | null
          experience: string
          category: string
          status?: string
          verified?: boolean
          featured?: boolean
          availability?: string
          email: string
          phone?: string | null
          location: string
          website?: string | null
          linkedin?: string | null
          rating?: number
          review_count?: number
          projects?: number
          completion_rate?: number
          response_time?: string | null
          hourly_rate?: string | null
          monthly_rate?: string | null
          project_rate?: string | null
          icon_name?: string | null
          color_gradient?: string | null
          accent_color?: string | null
          image_url?: string | null
          cover_image_url?: string | null
          expertise?: any
          languages?: any
          education?: any
          certifications?: any
          skills?: any
          testimonials?: any
          recent_projects?: any
          achievements?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          title?: string
          specialization?: string
          description?: string
          detailed_description?: string | null
          experience?: string
          category?: string
          status?: string
          verified?: boolean
          featured?: boolean
          availability?: string
          email?: string
          phone?: string | null
          location?: string
          website?: string | null
          linkedin?: string | null
          rating?: number
          review_count?: number
          projects?: number
          completion_rate?: number
          response_time?: string | null
          hourly_rate?: string | null
          monthly_rate?: string | null
          project_rate?: string | null
          icon_name?: string | null
          color_gradient?: string | null
          accent_color?: string | null
          image_url?: string | null
          cover_image_url?: string | null
          expertise?: any
          languages?: any
          education?: any
          certifications?: any
          skills?: any
          testimonials?: any
          recent_projects?: any
          achievements?: any
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

// People/Team Member types
export interface Person {
  id: string
  name: string
  title: string
  specialization: string
  description: string
  detailed_description: string | null
  experience: string
  category: string
  status: string
  verified: boolean
  featured: boolean
  availability: string
  email: string
  phone: string | null
  location: string
  website: string | null
  linkedin: string | null
  rating: number
  review_count: number
  projects: number
  completion_rate: number
  response_time: string | null
  hourly_rate: string | null
  monthly_rate: string | null
  project_rate: string | null
  icon_name: string | null
  color_gradient: string | null
  accent_color: string | null
  image_url: string | null
  cover_image_url: string | null
  expertise: string[]
  languages: string[]
  education: Education[]
  certifications: string[]
  skills: Skill[]
  testimonials: Testimonial[]
  recent_projects: Project[]
  achievements: string[]
  created_at: string
  updated_at: string
}

export interface Education {
  degree: string
  institution: string
  year: string
}

export interface Skill {
  name: string
  level: number
}

export interface Testimonial {
  id: number
  client: string
  feedback: string
  rating: number
  date: string
  projectType: string
}

export interface Project {
  title: string
  client: string
  duration: string
  status: string
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

export interface PeopleResponse {
  data: Person[]
  error: string | null
  count: number
}

export interface PersonResponse {
  data: Person | null
  error: string | null
}
