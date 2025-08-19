import { createClient } from '../../utils/supabase/server'
import { cookies } from 'next/headers'
import { Article, Category, ArticlesResponse, ArticleResponse } from '../../types/database'

// Get all articles with optional filtering
export async function getArticles(options?: {
  category?: string
  limit?: number
  offset?: number
  featured?: boolean
  breaking?: boolean
  hot?: boolean
  sortBy?: 'published_at' | 'views' | 'created_at'
  sortOrder?: 'asc' | 'desc'
}): Promise<ArticlesResponse> {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    let query = supabase
      .from('articles')
      .select('*')

    // Always filter to show only verified articles for public access
    query = query.eq('verified', true)

    // Apply filters
    if (options?.featured !== undefined) {
      query = query.eq('is_featured', options.featured)
    }
    if (options?.breaking !== undefined) {
      query = query.eq('is_breaking', options.breaking)
    }
    if (options?.hot !== undefined) {
      query = query.eq('is_hot', options.hot)
    }

    // Apply sorting
    const sortBy = options?.sortBy || 'published_at'
    const sortOrder = options?.sortOrder || 'desc'
    query = query.order(sortBy, { ascending: sortOrder === 'asc' })

    // Apply pagination
    if (options?.limit) {
      query = query.limit(options.limit)
    }
    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
    }

    const { data: articles, error, count } = await query

    if (error) {
      console.error('Error fetching articles:', error)
      return { data: [], error: error.message, count: 0 }
    }

    // If category filter is applied, we need to fetch categories separately
    if (options?.category && articles) {
      const { data: categories } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', options.category)
      
      // Filter articles by category_id
      const filteredArticles = articles.filter(article => 
        categories?.some(cat => cat.id === article.category_id)
      )
      
      // Add category data to articles
      const articlesWithCategories = filteredArticles.map(article => {
        const category = categories?.find(cat => cat.id === article.category_id)
        return {
          ...article,
          categories: category || null
        }
      })
      
      return { data: articlesWithCategories, error: null, count: filteredArticles.length }
    }

    // Fetch all categories to add to articles
    const { data: categories } = await supabase
      .from('categories')
      .select('*')

    // Add category data to articles
    const articlesWithCategories = articles?.map(article => {
      const category = categories?.find(cat => cat.id === article.category_id)
      return {
        ...article,
        categories: category || null
      }
    }) || []

    return { data: articlesWithCategories, error: null, count: count || 0 }
  } catch (error) {
    console.error('Error in getArticles:', error)
    return { data: [], error: 'Failed to fetch articles', count: 0 }
  }
}

// Get a single article by slug
export async function getArticleBySlug(slug: string): Promise<ArticleResponse> {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: article, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('verified', true)
      .single()

    if (error) {
      console.error('Error fetching article:', error)
      return { data: null, error: error.message }
    }

    // Fetch category data separately
    if (article?.category_id) {
      const { data: category } = await supabase
        .from('categories')
        .select('*')
        .eq('id', article.category_id)
        .single()
      
      article.categories = category || null
    }

    return { data: article, error: null }
  } catch (error) {
    console.error('Error in getArticleBySlug:', error)
    return { data: null, error: 'Failed to fetch article' }
  }
}

// Create a new article
export async function createArticle(articleData: {
  title: string
  slug: string
  excerpt: string
  content: string
  image_url?: string
  author: string
  is_breaking?: boolean
  is_hot?: boolean
  is_featured?: boolean
  category_id?: string
}): Promise<ArticleResponse> {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: article, error } = await supabase
      .from('articles')
      .insert([{ 
        ...articleData, 
        verified: false, 
        views: 0, 
        published_at: null 
      }])
      .select('*')
      .single()

    if (error) {
      console.error('Error creating article:', error)
      return { data: null, error: error.message }
    }

    // Fetch category data separately
    if (article?.category_id) {
      const { data: category } = await supabase
        .from('categories')
        .select('*')
        .eq('id', article.category_id)
        .single()
      
      article.categories = category || null
    }

    return { data: article, error: null }
  } catch (error) {
    console.error('Error in createArticle:', error)
    return { data: null, error: 'Failed to create article' }
  }
}

// Update an article
export async function updateArticle(
  id: string,
  updates: Partial<{
    title: string
    slug: string
    excerpt: string
    content: string
    image_url: string
    author: string
    is_breaking: boolean
    is_hot: boolean
    is_featured: boolean
    category_id: string
  }>
): Promise<ArticleResponse> {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: article, error } = await supabase
      .from('articles')
      .update(updates)
      .eq('id', id)
      .select('*')
      .single()

    if (error) {
      console.error('Error updating article:', error)
      return { data: null, error: error.message }
    }

    // Fetch category data separately
    if (article?.category_id) {
      const { data: category } = await supabase
        .from('categories')
        .select('*')
        .eq('id', article.category_id)
        .single()
      
      article.categories = category || null
    }

    return { data: article, error: null }
  } catch (error) {
    console.error('Error in updateArticle:', error)
    return { data: null, error: 'Failed to update article' }
  }
}

// Delete an article
export async function deleteArticle(id: string): Promise<{ error: string | null }> {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting article:', error)
      return { error: error.message }
    }

    return { error: null }
  } catch (error) {
    console.error('Error in deleteArticle:', error)
    return { error: 'Failed to delete article' }
  }
}

// Increment article views
export async function incrementArticleViews(id: string): Promise<{ error: string | null }> {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase
      .from('articles')
      .update({ views: supabase.rpc('increment', { row_id: id, x: 1 }) })
      .eq('id', id)

    if (error) {
      console.error('Error incrementing article views:', error)
      return { error: error.message }
    }

    return { error: null }
  } catch (error) {
    console.error('Error in incrementArticleViews:', error)
    return { error: 'Failed to increment article views' }
  }
}

// Get breaking news
export async function getBreakingNews(limit: number = 3): Promise<ArticlesResponse> {
  return getArticles({ breaking: true, limit, sortBy: 'published_at', sortOrder: 'desc' })
}

// Get hot topics
export async function getHotTopics(limit: number = 5): Promise<ArticlesResponse> {
  return getArticles({ hot: true, limit, sortBy: 'views', sortOrder: 'desc' })
}

// Get featured articles
export async function getFeaturedArticles(limit: number = 6): Promise<ArticlesResponse> {
  return getArticles({ featured: true, limit, sortBy: 'published_at', sortOrder: 'desc' })
}

// Get most popular articles
export async function getMostPopularArticles(limit: number = 6): Promise<ArticlesResponse> {
  return getArticles({ limit, sortBy: 'views', sortOrder: 'desc' })
}

// Get latest articles
export async function getLatestArticles(limit: number = 12): Promise<ArticlesResponse> {
  return getArticles({ limit, sortBy: 'published_at', sortOrder: 'desc' })
}
