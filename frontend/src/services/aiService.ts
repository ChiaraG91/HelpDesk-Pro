import apiClient from './apiClient'

interface AiClassifyResponse {
  category: string
  priority: string
  confidence: number
}

interface AiSuggestResponse {
  generated_reply: string
}

interface AiDuplicateResponse {
  is_duplicate: boolean
  matching_ticket?: string
  confidence?: number
  message?: string
}

export const aiService = {
  classifyTicket: async (ticketId: string): Promise<AiClassifyResponse> => {
    const { data } = await apiClient.post<any>('/ai/classify/', { ticket_id: ticketId })
    return {
      category: data.categoria || data.category,
      priority: data.priorità || data.priority,
      confidence: data.confidence || data.affidabilità || 0
    }
  },

  suggestReply: async (ticketId: string): Promise<AiSuggestResponse> => {
    const { data } = await apiClient.post<AiSuggestResponse>(
      '/ai/reply/', { ticket_id: ticketId }
    )
    return data
  },

  checkDuplicate: async (ticketId: string): Promise<AiDuplicateResponse> => {
    const { data } = await apiClient.post<AiDuplicateResponse>(
      '/ai/check-duplicate/', { ticket_id: ticketId }
    )
    return data
  },
}
