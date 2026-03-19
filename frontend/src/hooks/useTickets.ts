import { useState, useEffect, useCallback } from 'react'
import { ticketService } from '@/services'
import type { Ticket, PaginatedResponse, TicketFilters } from '@/types'

export const useTickets = (filters: TicketFilters = {}) => {
  const [tickets, setTickets] = useState<PaginatedResponse<Ticket> | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTickets = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await ticketService.getAll(filters)
      setTickets(data)
    } catch {
      setError('Errore nel caricamento dei ticket')
    } finally {
      setLoading(false)
    }
  }, [JSON.stringify(filters)])

  useEffect(() => {
    fetchTickets()
  }, [fetchTickets])

  return { tickets, loading, error, refetch: fetchTickets }
}

export const useTicket = (id: string) => {
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTicket = useCallback(async () => {
    if (!id) return
    setLoading(true)
    setError(null)
    try {
      const data = await ticketService.getById(id)
      setTicket(data)
    } catch {
      setError('Ticket non trovato')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchTicket()
  }, [fetchTicket])

  return { ticket, loading, error, refetch: fetchTicket }
}
