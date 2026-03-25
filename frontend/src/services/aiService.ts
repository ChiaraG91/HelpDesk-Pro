import apiClient from './apiClient'

interface AiClassifyResponse {
  category: string
  priority: string
  confidence: number
}

interface AiSuggestResponse {
  suggestion: string
}

interface AiSummaryResponse {
  summary: string
}

export const aiService = {
  classifyTicket: async (ticketId: string): Promise<AiClassifyResponse> => {
    const { data } = await apiClient.post<AiClassifyResponse>(
      `/ai/classify/${ticketId}`
    )
    return data
  },

  suggestReply: async (ticketId: string): Promise<AiSuggestResponse> => {
    const { data } = await apiClient.post<AiSuggestResponse>(
      `/ai/suggest-reply/${ticketId}`
    )
    return data
  },

  summarizeTicket: async (ticketId: string): Promise<AiSummaryResponse> => {
    const { data } = await apiClient.post<AiSummaryResponse>(
      `/ai/summarize/${ticketId}`
    )
    return data
  },
}
