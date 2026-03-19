import apiClient from './apiClient'
import type { AuthResponse, LoginCredentials, User } from '@/types'

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', credentials)
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    return data
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  getMe: async (): Promise<User> => {
    const { data } = await apiClient.get<User>('/auth/me')
    return data
  },

  getCurrentUser: (): User | null => {
    const user = localStorage.getItem('user')
    return user ? (JSON.parse(user) as User) : null
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token')
  },
}
