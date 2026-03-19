import type { TicketStatus, TicketPriority } from '@/types'

interface StatusBadgeProps {
  status: TicketStatus
}

interface PriorityBadgeProps {
  priority: TicketPriority
}

const statusConfig: Record<TicketStatus, { label: string; classes: string }> = {
  open: {
    label: 'Aperto',
    classes: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  },
  in_progress: {
    label: 'In lavorazione',
    classes: 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200',
  },
  resolved: {
    label: 'Risolto',
    classes: 'bg-green-50 text-green-700 ring-1 ring-green-200',
  },
  closed: {
    label: 'Chiuso',
    classes: 'bg-gray-100 text-gray-600 ring-1 ring-gray-200',
  },
}

const priorityConfig: Record<TicketPriority, { label: string; classes: string; dot: string }> = {
  low: {
    label: 'Bassa',
    classes: 'bg-gray-50 text-gray-600 ring-1 ring-gray-200',
    dot: 'bg-gray-400',
  },
  medium: {
    label: 'Media',
    classes: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
    dot: 'bg-blue-500',
  },
  high: {
    label: 'Alta',
    classes: 'bg-orange-50 text-orange-700 ring-1 ring-orange-200',
    dot: 'bg-orange-500',
  },
  critical: {
    label: 'Critica',
    classes: 'bg-red-50 text-red-700 ring-1 ring-red-200',
    dot: 'bg-red-500',
  },
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = statusConfig[status]
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.classes}`}
    >
      {config.label}
    </span>
  )
}

export const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
  const config = priorityConfig[priority]
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.classes}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`} />
      {config.label}
    </span>
  )
}
