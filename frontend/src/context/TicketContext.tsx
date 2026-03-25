import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { mockTickets, mockUsers } from '@/data/mockData'
import type { Ticket, TicketStatus, CreateTicketPayload } from '@/types'

interface TicketContextType {
  tickets: Ticket[]
  getTicketById: (id: string) => Ticket | undefined
  addTicket: (payload: CreateTicketPayload) => Ticket
  updateStatus: (id: string, status: TicketStatus) => void
}

const TicketContext = createContext<TicketContextType | null>(null)

export const TicketProvider = ({ children }: { children: ReactNode }) => {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets)

  const getTicketById = useCallback(
    (id: string) => tickets.find((t) => t.id === id),
    [tickets]
  )

  const addTicket = useCallback((payload: CreateTicketPayload): Ticket => {
    const now = new Date().toISOString()
    const newTicket: Ticket = {
      id: `t${Date.now()}`,
      title: payload.title,
      description: payload.description,
      status: 'open',
      priority: payload.priority,
      category: payload.category,
      createdBy: mockUsers[0],
      assignedTo: undefined,
      createdAt: now,
      updatedAt: now,
      comments: [],
    }
    setTickets((prev) => [newTicket, ...prev])
    return newTicket
  }, [])

  const updateStatus = useCallback((id: string, status: TicketStatus) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status, updatedAt: new Date().toISOString() } : t
      )
    )
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
