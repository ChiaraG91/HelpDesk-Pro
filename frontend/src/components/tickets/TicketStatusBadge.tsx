import { StatusBadge, PriorityBadge } from '@/components/common'
import type { TicketStatus, TicketPriority } from '@/types'

interface TicketStatusBadgeProps {
  status: TicketStatus
  priority?: TicketPriority
}

const TicketStatusBadge = ({ status, priority }: TicketStatusBadgeProps) => {
  return (
    <div className="flex items-center gap-2">
      <StatusBadge status={status} />
      {priority && <PriorityBadge priority={priority} />}
    </div>
  )
}

export default TicketStatusBadge
