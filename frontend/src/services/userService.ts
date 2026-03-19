import apiClient from './apiClient'
import type { User, PaginatedResponse } from '@/types'

export const userService = {
  getAll: async (): Promise<PaginatedResponse<User>> => {
    const { data } = await apiClient.get<PaginatedResponse<User>>('/users')
    return data
  },

  getById: async (id: string): Promise<User> => {
    const { data } = await apiClient.get<User>(`/users/${id}`)
    return data
  },

  updateProfile: async (id: string, payload: Partial<User>): Promise<User> => {
    const { data } = await apiClient.patch<User>(`/users/${id}`, payload)
    return data
  },
}
