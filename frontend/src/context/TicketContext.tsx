import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import { ticketService } from '@/services/ticketService'
import { useAuthContext } from './AuthContext'
import type { Ticket, TicketStatus, CreateTicketPayload } from '@/types'

interface TicketContextType {
  tickets: Ticket[]
  getTicketById: (id: string) => Ticket | undefined
  addTicket: (payload: CreateTicketPayload) => Promise<Ticket>
  updateStatus: (id: string, status: TicketStatus) => void
}

const TicketContext = createContext<TicketContextType | null>(null)

export const TicketProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuthContext()
  const [tickets, setTickets] = useState<Ticket[]>([])

  const mapTicket = (t: any): Ticket => ({
    ...t,
    status: (t.status || 'open').toLowerCase(),
    priority: (t.priority || 'medium').toLowerCase(),
    createdAt: t.created_at || t.createdAt || new Date().toISOString(),
    updatedAt: t.updated_at || t.updatedAt || new Date().toISOString(),
    createdBy: typeof t.created_by === 'string' ? { username: t.created_by, name: t.created_by } : t.createdBy || t.created_by || { username: 'Sconosciuto', name: 'Sconosciuto' },
    assignedTo: typeof t.assigned_to === 'string' ? { username: t.assigned_to, name: t.assigned_to } : t.assignedTo || t.assigned_to || null
  })

  const fetchAllTickets = useCallback(async () => {
    try {
      const data = await ticketService.getAll()
      const raw = (data as any).results || data
      const mapped = raw?.map(mapTicket) || []
      setTickets(mapped)
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllTickets()
    } else {
      setTickets([])
    }
  }, [fetchAllTickets, isAuthenticated])

  const getTicketById = useCallback(
    (id: string) => tickets.find((t) => String(t.id) === String(id)),
    [tickets]
  )

  const addTicket = useCallback(async (payload: CreateTicketPayload): Promise<Ticket> => {
    const newTicket = await ticketService.create(payload)
    const normalizedTicket = mapTicket(newTicket)
    setTickets((prev) => [normalizedTicket, ...prev])
    return normalizedTicket
  }, [])

  const updateStatus = useCallback((id: string, status: TicketStatus) => {
    ticketService.update(id, { status }).then(() => {
      setTickets((prev) =>
        prev.map((t) =>
          String(t.id) === String(id) ? { ...t, status: status.toLowerCase() as TicketStatus, updatedAt: new Date().toISOString() } : t
        )
      )
    })
  }, [])

  return (
    <TicketContext.Provider value={{ tickets, getTicketById, addTicket, updateStatus }}>
      {children}
    </TicketContext.Provider>
  )
}

export const useTickets = (): TicketContextType => {
  const ctx = useContext(TicketContext)
  if (!ctx) throw new Error('useTickets deve essere usato dentro <TicketProvider>')
  return ctx
}

export default TicketContext
