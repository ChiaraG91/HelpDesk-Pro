import apiClient from './apiClient'
import type { Comment } from '@/types'

export const commentService = {
  getByTicket: async (ticketId: string): Promise<Comment[]> => {
    const { data } = await apiClient.get<Comment[]>(`/tickets/${ticketId}/comments`)
    return data
  },

  create: async (
    ticketId: string,
    content: string,
    isInternal = false
  ): Promise<Comment> => {
    const { data } = await apiClient.post<Comment>(`/tickets/${ticketId}/comments`, {
      content,
      isInternal,
    })
    return data
  },

  delete: async (ticketId: string, commentId: string): Promise<void> => {
    await apiClient.delete(`/tickets/${ticketId}/comments/${commentId}`)
  },
}
