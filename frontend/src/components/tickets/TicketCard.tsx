import { StatusBadge, PriorityBadge } from '@/components/common'
import type { Ticket } from '@/types'

interface TicketCardProps {
  ticket: Ticket
  onClick?: (ticket: Ticket) => void
}

const TicketCard = ({ ticket, onClick }: TicketCardProps) => {
  return (
    <div
      onClick={() => onClick?.(ticket)}
      className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400 mb-1">#{ticket.id}</p>
          <h3 className="text-sm font-semibold text-gray-900 truncate">{ticket.title}</h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{ticket.description}</p>
        </div>
        <StatusBadge status={ticket.status} />
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <PriorityBadge priority={ticket.priority} />
          <span className="text-xs text-gray-400">{ticket.category}</span>
        </div>
        <span className="text-xs text-gray-400">
          {new Date(ticket.createdAt).toLocaleDateString('it-IT')}
        </span>
      </div>
    </div>
  )
}

export default TicketCard
