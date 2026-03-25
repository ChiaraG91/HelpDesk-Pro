import type { TicketStatus, TicketPriority } from '@/types'

export const statusLabel: Record<TicketStatus, string> = {
  open: 'Aperto',
  in_progress: 'In lavorazione',
  resolved: 'Risolto',
  closed: 'Chiuso',
}

export const priorityLabel: Record<TicketPriority, string> = {
  low: 'Bassa',
  medium: 'Media',
  high: 'Alta',
  critical: 'Critica',
}

export const priorityOrder: Record<TicketPriority, number> = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4,
}

export const isTicketOpen = (status: TicketStatus): boolean =>
  status === 'open' || status === 'in_progress'

export const isTicketClosed = (status: TicketStatus): boolean =>
  status === 'resolved' || status === 'closed'

export const getNextStatus = (current: TicketStatus): TicketStatus => {
  const flow: Record<TicketStatus, TicketStatus> = {
    open: 'in_progress',
    in_progress: 'resolved',
    resolved: 'closed',
    closed: 'closed',
  }
  return flow[current]
}
