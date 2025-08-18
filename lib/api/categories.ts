import { createClient } from '../../utils/supabase/server'
import { cookies } from 'next/headers'
import { Category, CategoriesResponse } from '../../types/database'

// Get all categories
export async function getCategories(): Promise<CategoriesResponse> {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching categories:', error)
      return { data: [], error: error.message }
    }

    return { data: data || [], error: null }
  } catch (error) {
    console.error('Error in getCategories:', error)
    return { data: [], error: 'Failed to fetch categories' }
  }
}

// Get a single category by slug
export async function getCategoryBySlug(slug: string): Promise<{ data: Category | null; error: string | null }> {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      console.error('Error fetching category:', error)
      return { data: null, error: error.message }
    }

    return { data, error: null }
  } catch (error) {
    console.error('Error in getCategoryBySlug:', error)
    return { data: null, error: 'Failed to fetch category' }
  }
}

// Create a new category
export async function createCategory(categoryData: {
  name: string
  slug: string
  color?: string
  description?: string
}): Promise<{ data: Category | null; error: string | null }> {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from('categories')
      .insert([categoryData])
      .select()
      .single()

    if (error) {
      console.error('Error creating category:', error)
      return { data: null, error: error.message }
    }

    return { data, error: null }
  } catch (error) {
    console.error('Error in createCategory:', error)
    return { data: null, error: 'Failed to create category' }
  }
}

// Update a category
export async function updateCategory(
  id: string,
  updates: Partial<{
    name: string
    slug: string
    color: string
    description: string
  }>
): Promise<{ data: Category | null; error: string | null }> {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating category:', error)
      return { data: null, error: error.message }
    }

    return { data, error: null }
  } catch (error) {
    console.error('Error in updateCategory:', error)
    return { data: null, error: 'Failed to update category' }
  }
}

// Delete a category
export async function deleteCategory(id: string): Promise<{ error: string | null }> {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting category:', error)
      return { error: error.message }
    }

    return { error: null }
  } catch (error) {
    console.error('Error in deleteCategory:', error)
    return { error: 'Failed to delete category' }
  }
}
