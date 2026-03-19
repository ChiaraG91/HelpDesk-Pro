import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '@/services'
import type { LoginCredentials, User } from '@/types'

export const useAuth = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(authService.getCurrentUser)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setLoading(true)
      setError(null)
      try {
        const response = await authService.login(credentials)
        setUser(response.user)
        navigate('/dashboard')
      } catch {
        setError('Credenziali non valide')
      } finally {
        setLoading(false)
      }
    },
    [navigate]
  )

  const logout = useCallback(() => {
    authService.logout()
    setUser(null)
    navigate('/login')
  }, [navigate])

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: authService.isAuthenticated(),
  }
}
