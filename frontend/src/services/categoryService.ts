import apiClient from './apiClient'
import type { PaginatedResponse } from '@/types'

export interface Category {
  id: number
  name: string
  description: string
  color: string
}

export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    const { data } = await apiClient.get<any>('/categories/')
    return data.results || data
  },
}
