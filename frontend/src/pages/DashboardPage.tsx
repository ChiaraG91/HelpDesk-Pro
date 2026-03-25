import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { StatusBadge, PriorityBadge } from '@/components/common'
import { formatRelative } from '@/utils/formatDate'
import { useAuthContext } from '@/context/AuthContext'
import { useTickets } from '@/context/TicketContext'

const StatCard = ({ label, value, color, icon }: { label: string; value: number; color: string; icon: React.ReactNode }) => (
  <div className="bg-[#111f30] border border-[#2d4060] rounded-xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-xl sm:text-2xl font-bold text-white">{value}</p>
      <p className="text-xs sm:text-sm text-slate-400">{label}</p>
    </div>
  </div>
)

const DashboardPage = () => {
  const { user } = useAuthContext()
  const { tickets } = useTickets()
  const navigate = useNavigate()

  const stats = useMemo(() => ({
    open: tickets.filter((t) => t.status === 'open').length,
    in_progress: tickets.filter((t) => t.status === 'in_progress').length,
    resolved: tickets.filter((t) => t.status === 'resolved').length,
    closed: tickets.filter((t) => t.status === 'closed').length,
    total: tickets.length,
  }), [tickets])

  const recent = useMemo(() =>
    [...tickets].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5),
    [tickets]
  )

  const chartData = [
    { label: 'Aperti', value: stats.open, color: 'bg-blue-400', pct: stats.total ? Math.round((stats.open / stats.total) * 100) : 0 },
    { label: 'In lavorazione', value: stats.in_progress, color: 'bg-yellow-400', pct: stats.total ? Math.round((stats.in_progress / stats.total) * 100) : 0 },
    { label: 'Risolti', value: stats.resolved, color: 'bg-emerald-400', pct: stats.total ? Math.round((stats.resolved / stats.total) * 100) : 0 },
    { label: 'Chiusi', value: stats.closed, color: 'bg-slate-500', pct: stats.total ? Math.round((stats.closed / stats.total) * 100) : 0 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Benvenuto, {user?.name}. Ecco una panoramica del sistema.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard label="Ticket Aperti" value={stats.open} color="bg-blue-500/15 text-blue-400"
          icon={<svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" /></svg>} />
        <StatCard label="In Lavorazione" value={stats.in_progress} color="bg-yellow-500/15 text-yellow-400"
          icon={<svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
        <StatCard label="Risolti" value={stats.resolved} color="bg-emerald-500/15 text-emerald-400"
          icon={<svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
        <StatCard label="Totale" value={stats.total} color="bg-[#7ccad5]/15 text-[#7ccad5]"
          icon={<svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#111f30] border border-[#2d4060] rounded-xl">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#2d4060]">
            <h2 className="text-base font-semibold text-white">Ticket Recenti</h2>
            <button onClick={() => navigate('/tickets')} className="text-xs text-[#7ccad5] hover:underline">Vedi tutti</button>
          </div>
          <div className="divide-y divide-[#1a2e42]">
            {recent.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => navigate(`/tickets/${ticket.id}`)}
                className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3.5 hover:bg-[#1a2e42] cursor-pointer transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-200 truncate">{ticket.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{ticket.category} · {formatRelative(ticket.createdAt)}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden sm:block"><PriorityBadge priority={ticket.priority} /></span>
                  <StatusBadge status={ticket.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#111f30] border border-[#2d4060] rounded-xl">
          <div className="px-4 sm:px-6 py-4 border-b border-[#2d4060]">
            <h2 className="text-base font-semibold text-white">Distribuzione Stati</h2>
          </div>
          <div className="px-4 sm:px-6 py-4 space-y-4">
            {chartData.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-400">{item.label}</span>
                  <span className="text-slate-300 font-medium">{item.value} ({item.pct}%)</span>
                </div>
                <div className="h-2 bg-[#1a2e42] rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${item.color} transition-all duration-500`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
