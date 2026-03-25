import { useNavigate } from 'react-router-dom'
import TicketCard from './TicketCard'
import type { Ticket, PaginatedResponse } from '@/types'

interface TicketListProps {
  data: PaginatedResponse<Ticket> | null
  loading: boolean
  error: string | null
}

const TicketList = ({ data, loading, error }: TicketListProps) => {
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-100 rounded w-full mb-1" />
            <div className="h-3 bg-gray-100 rounded w-2/3" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p className="font-medium">{error}</p>
      </div>
    )
  }

  if (!data || data.data.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p className="text-sm">Nessun ticket trovato</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {data.data.map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          onClick={(t) => navigate(`/tickets/${t.id}`)}
        />
      ))}
    </div>
  )
}

export default TicketList
