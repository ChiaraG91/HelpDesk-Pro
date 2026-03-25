import apiClient from './apiClient'
import type { Comment } from '@/types'

export const commentService = {
  getByTicket: async (ticketId: string): Promise<Comment[]> => {
    const { data } = await apiClient.get<any>(`/tickets/${ticketId}/comments/`)
    const raw = data.results || data
    return raw.map((c: any) => ({
      ...c,
      content: c.body || c.content,
      isInternal: c.is_internal || c.isInternal,
      createdAt: c.created_at || c.createdAt,
      author: typeof c.author === 'string' ? { username: c.author, name: c.author } : c.author,
    }))
  },

  create: async (
    ticketId: string,
    content: string,
    isInternal = false
  ): Promise<Comment> => {
    const { data } = await apiClient.post<any>(`/tickets/${ticketId}/comments/`, {
      body: content,
      is_internal: isInternal,
    })
    return {
      ...data,
      content: data.body || data.content,
      isInternal: data.is_internal || data.isInternal,
      createdAt: data.created_at || data.createdAt,
      author: typeof data.author === 'string' ? { username: data.author, name: data.author } : data.author,
    }
  },

  delete: async (ticketId: string, commentId: string): Promise<void> => {
    await apiClient.delete(`/tickets/${ticketId}/comments/${commentId}/`)
  },
}
