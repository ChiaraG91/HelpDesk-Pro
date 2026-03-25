import type { TicketStatus, TicketPriority } from '@/types'

interface StatusBadgeProps { status: TicketStatus }
interface PriorityBadgeProps { priority: TicketPriority }

const statusConfig: Record<TicketStatus, { label: string; classes: string }> = {
  open: { label: 'Aperto', classes: 'bg-blue-500/15 text-blue-400 border border-blue-500/25' },
  in_progress: { label: 'In Lavorazione', classes: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/25' },
  resolved: { label: 'Risolto', classes: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25' },
  closed: { label: 'Chiuso', classes: 'bg-slate-700/50 text-slate-400 border border-slate-600/30' },
}

const priorityConfig: Record<TicketPriority, { label: string; classes: string; dot: string }> = {
  low: { label: 'Bassa', classes: 'bg-slate-700/50 text-slate-400 border border-slate-600/30', dot: 'bg-slate-400' },
  medium: { label: 'Media', classes: 'bg-blue-500/15 text-blue-400 border border-blue-500/25', dot: 'bg-blue-400' },
  high: { label: 'Alta', classes: 'bg-orange-500/15 text-orange-400 border border-orange-500/25', dot: 'bg-orange-400' },
  critical: { label: 'Critica', classes: 'bg-red-500/15 text-red-400 border border-red-500/25', dot: 'bg-red-400' },
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const c = statusConfig[status]
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${c.classes}`}>{c.label}</span>
}

export const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
  const c = priorityConfig[priority]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${c.classes}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
      {c.label}
    </span>
  )
}
