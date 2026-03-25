export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed'
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical'
export type UserRole = 'admin' | 'agent' | 'customer'

export interface User {
  id: string
  username: string
  name?: string
  email: string
  role: UserRole
  avatar?: string
  createdAt: string
}

export interface Ticket {
  id: string
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  category: string
  createdBy: User
  assignedTo?: User
  createdAt: string
  updatedAt: string
  comments?: Comment[]
}

export interface Comment {
  id: string
  content: string
  author: User
  createdAt: string
  isInternal: boolean
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface TicketFilters {
  status?: TicketStatus
  priority?: TicketPriority
  category?: string
  assignedTo?: string
  search?: string
  page?: number
  limit?: number
}

export interface CreateTicketPayload {
  title: string
  description: string
  priority: TicketPriority
  category: string
}

export interface UpdateTicketPayload {
  title?: string
  description?: string
  status?: TicketStatus
  priority?: TicketPriority
  assignedTo?: string
}
