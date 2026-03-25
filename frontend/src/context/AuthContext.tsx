import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { User } from '@/types'
import { authService } from '@/services/authService'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = authService.getCurrentUser()
    if (stored) setUser(stored)
    setLoading(false)
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      await authService.login({ username, password })
      const userData = await authService.getMe()
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      return true
    } catch (e) {
      console.error("Login failed: ", e)
      return false
    }
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = (): AuthContextType => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext deve essere usato dentro <AuthProvider>')
  return ctx
}

export default AuthContext
