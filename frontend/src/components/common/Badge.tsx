import type { TicketStatus, TicketPriority } from '@/types'

interface StatusBadgeProps { status: TicketStatus }
interface PriorityBadgeProps { priority: TicketPriority }

const statusConfig: Record<TicketStatus, { label: string; classes: string; dot: string }> = {
  open:        { label: 'Aperto',         classes: 'bg-blue-500/12 text-blue-400 border border-blue-500/20',    dot: 'bg-blue-400' },
  in_progress: { label: 'In Lavorazione', classes: 'bg-amber-500/12 text-amber-400 border border-amber-500/20', dot: 'bg-amber-400 animate-pulse' },
  resolved:    { label: 'Risolto',        classes: 'bg-emerald-500/12 text-emerald-400 border border-emerald-500/20', dot: 'bg-emerald-400' },
  closed:      { label: 'Chiuso',         classes: 'bg-slate-700/40 text-slate-500 border border-slate-600/20', dot: 'bg-slate-500' },
}

const priorityConfig: Record<TicketPriority, { label: string; classes: string; dot: string }> = {
  low:      { label: 'Bassa',   classes: 'bg-slate-700/40 text-slate-500 border border-slate-600/20',   dot: 'bg-slate-400' },
  medium:   { label: 'Media',   classes: 'bg-sky-500/12 text-sky-400 border border-sky-500/20',          dot: 'bg-sky-400' },
  high:     { label: 'Alta',    classes: 'bg-orange-500/12 text-orange-400 border border-orange-500/20', dot: 'bg-orange-400' },
  critical: { label: 'Critica', classes: 'bg-red-500/12 text-red-400 border border-red-500/20',          dot: 'bg-red-400 animate-pulse' },
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const c = statusConfig[status]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${c.classes}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
      {c.label}
    </span>
  )
}

export const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
  const c = priorityConfig[priority]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${c.classes}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
      {c.label}
    </span>
  )
}
