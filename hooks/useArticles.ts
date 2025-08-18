import { useState, useEffect } from 'react'
import { Article, Category } from '@/types/database'

interface UseArticlesOptions {
  category?: string
  limit?: number
  featured?: boolean
  breaking?: boolean
  hot?: boolean
  sortBy?: 'published_at' | 'views' | 'created_at'
  sortOrder?: 'asc' | 'desc'
}

export function useArticles(options: UseArticlesOptions = {}) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true)
        setError(null)

        const params = new URLSearchParams()
        if (options.category) params.append('category', options.category)
        if (options.limit) params.append('limit', options.limit.toString())
        if (options.featured !== undefined) params.append('featured', options.featured.toString())
        if (options.breaking !== undefined) params.append('breaking', options.breaking.toString())
        if (options.hot !== undefined) params.append('hot', options.hot.toString())
        if (options.sortBy) params.append('sortBy', options.sortBy)
        if (options.sortOrder) params.append('sortOrder', options.sortOrder)

        const response = await fetch(`/api/articles?${params.toString()}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch articles')
        }

        setArticles(data.data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch articles')
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [options.category, options.limit, options.featured, options.breaking, options.hot, options.sortBy, options.sortOrder])

  return { articles, loading, error }
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('/api/categories')
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch categories')
        }

        setCategories(data.data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch categories')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, loading, error }
}

export function useArticle(slug: string) {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchArticle() {
      if (!slug) return

      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/articles/${slug}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch article')
        }

        setArticle(data.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch article')
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [slug])

  return { article, loading, error }
}
