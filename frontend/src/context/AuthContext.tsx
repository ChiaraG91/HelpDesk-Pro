import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { User } from '@/types'

const MOCK_CREDENTIALS = { email: 'admin@helpdesk.it', password: 'admin123' }
const MOCK_USER: User = { id: 'u1', name: 'Marco Rossi', email: 'admin@helpdesk.it', role: 'admin', createdAt: '2024-01-10T08:00:00Z' }

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = sessionStorage.getItem('user')
    if (stored) setUser(JSON.parse(stored) as User)
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 800))
    if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
      sessionStorage.setItem('user', JSON.stringify(MOCK_USER))
      setUser(MOCK_USER)
      return true
    }
    return false
  }

  const logout = () => {
    sessionStorage.removeItem('user')
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
