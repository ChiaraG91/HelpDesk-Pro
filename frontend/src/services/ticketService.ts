import apiClient from './apiClient'
import type {
  Ticket,
  Comment,
  PaginatedResponse,
  TicketFilters,
  CreateTicketPayload,
  UpdateTicketPayload,
} from '@/types'

export const ticketService = {
  getAll: async (filters: TicketFilters = {}): Promise<PaginatedResponse<Ticket>> => {
    const { data } = await apiClient.get<PaginatedResponse<Ticket>>('/tickets/', {
      params: filters,
    })
    return data
  },

  getById: async (id: string): Promise<Ticket> => {
    const { data } = await apiClient.get<Ticket>(`/tickets/${id}/`)
    return data
  },

  create: async (payload: CreateTicketPayload): Promise<Ticket> => {
    const formattedPayload = {
      ...payload,
      priority: payload.priority ? payload.priority.toUpperCase() : undefined,
    }
    const { data } = await apiClient.post<Ticket>('/tickets/', formattedPayload)
    return data
  },

  update: async (id: string, payload: UpdateTicketPayload): Promise<Ticket> => {
    const formattedPayload = {
      ...payload,
      status: payload.status ? payload.status.toUpperCase() : undefined,
      priority: payload.priority ? payload.priority.toUpperCase() : undefined,
    }
    const { data } = await apiClient.patch<Ticket>(`/tickets/${id}/`, formattedPayload)
    return data
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/tickets/${id}/`)
  },

  addComment: async (
    ticketId: string,
    content: string,
    isInternal = false
  ): Promise<Comment> => {
    const { data } = await apiClient.post<Comment>(`/tickets/${ticketId}/comments/`, {
      content,
      isInternal,
    })
    return data
  },

  assign: async (id: string, userId?: string | null): Promise<void> => {
    await apiClient.post(`/tickets/${id}/assign/`, { user_id: userId || null })
  },
}
