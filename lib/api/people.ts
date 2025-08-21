import { PeopleResponse, PersonResponse, Person } from '@/types/database'

// Use relative API path by default so it works across hosts/ports and deployments
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

export interface PeopleFilters {
  category?: string
  status?: string
  availability?: string
  search?: string
  sortBy?: 'name' | 'experience' | 'rating' | 'projects'
  limit?: number
  offset?: number
}

export async function getPeople(filters: PeopleFilters = {}): Promise<PeopleResponse> {
  try {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString())
      }
    })

    const response = await fetch(`${API_BASE_URL}/people?${params.toString()}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching people:', error)
    return {
      data: [],
      error: error instanceof Error ? error.message : 'Failed to fetch people',
      count: 0
    }
  }
}

export async function getPerson(id: string): Promise<PersonResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/people/${id}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching person:', error)
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Failed to fetch person'
    }
  }
}

export async function createPerson(personData: Omit<Person, 'id' | 'created_at' | 'updated_at'>): Promise<PersonResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/people`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(personData),
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error creating person:', error)
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Failed to create person'
    }
  }
}

export async function updatePerson(id: string, personData: Partial<Person>): Promise<PersonResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/people/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(personData),
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error updating person:', error)
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Failed to update person'
    }
  }
}

export async function deletePerson(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/people/${id}`, {
      method: 'DELETE',
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error deleting person:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete person'
    }
  }
}

// Helper function to get icon component by name
export function getIconByName(iconName: string) {
  // This would need to be implemented based on your icon library
  // For now, returning a default icon
  return 'User' // Default icon
}

// Helper function to get flag emoji for languages
export function getFlagEmoji(lang: string) {
  switch (lang.toLowerCase()) {
    case "english": return "🇬🇧";
    case "hindi": return "🇮🇳";
    case "punjabi": return "🇮🇳";
    case "marathi": return "🇮🇳";
    case "sanskrit": return "🇮🇳";
    case "kannada": return "🇮🇳";
    case "tamil": return "🇮🇳";
    default: return "🌐";
  }
}
