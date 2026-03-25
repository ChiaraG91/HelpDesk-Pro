import { useState, useCallback } from 'react'
import { commentService } from '@/services'
import type { Comment } from '@/types'

export const useComments = (ticketId: string) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchComments = useCallback(async () => {
    if (!ticketId) return
    setLoading(true)
    setError(null)
    try {
      const data = await commentService.getByTicket(ticketId)
      setComments(data)
    } catch {
      setError('Errore nel caricamento dei commenti')
    } finally {
      setLoading(false)
    }
  }, [ticketId])

  const addComment = useCallback(
    async (content: string, isInternal = false) => {
      setSubmitting(true)
      try {
        const newComment = await commentService.create(ticketId, content, isInternal)
        setComments((prev) => [...prev, newComment])
      } catch {
        setError('Errore nell\'invio del commento')
      } finally {
        setSubmitting(false)
      }
    },
    [ticketId]
  )

  return { comments, loading, submitting, error, fetchComments, addComment }
}
