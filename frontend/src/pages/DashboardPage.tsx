import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { StatusBadge, PriorityBadge } from '@/components/common'
import { formatRelative } from '@/utils/formatDate'
import { useAuthContext } from '@/context/AuthContext'
import { useTickets } from '@/context/TicketContext'
import type { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: number
  sub?: string
  accentColor: string
  bgColor: string
  icon: ReactNode
}

const StatCard = ({ label, value, sub, accentColor, bgColor, icon }: StatCardProps) => (
  <div className={`relative bg-[#0f1e2f] border border-[#1e3348] rounded-2xl p-5 overflow-hidden group hover:border-[#2d4060] transition-all duration-200`}>
    <div className={`absolute top-0 left-0 right-0 h-0.5 ${accentColor} opacity-70`} />
    <div className="flex items-start justify-between mb-4">
      <div className={`w-10 h-10 rounded-xl ${bgColor} flex items-center justify-center`}>
        {icon}
      </div>
      {sub && <span className="text-[10px] font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">{sub}</span>}
    </div>
    <p className="text-2xl font-bold text-white tabular-nums">{value}</p>
    <p className="text-xs text-slate-500 mt-1 font-medium">{label}</p>
  </div>
)

const DashboardPage = () => {
  const { user } = useAuthContext()
  const { tickets } = useTickets()
  const navigate = useNavigate()

  const stats = useMemo(() => ({
    open: tickets.filter((t) => t.status === 'open').length,
    in_progress: tickets.filter((t) => t.status === 'in_progress').length,
    resolved: tickets.filter((t) => t.status === 'resolved' || t.status === 'closed').length,
    closed: tickets.filter((t) => t.status === 'closed').length,
    total: tickets.length,
  }), [tickets])

  const recent = useMemo(() =>
    [...tickets].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 6),
    [tickets]
  )

  const chartData = [
    { label: 'Aperti', value: stats.open, bar: 'bg-blue-400', dot: 'bg-blue-400' },
    { label: 'In lavorazione', value: stats.in_progress, bar: 'bg-amber-400', dot: 'bg-amber-400' },
    { label: 'Risolti', value: stats.resolved, bar: 'bg-emerald-400', dot: 'bg-emerald-400' },
    { label: 'Chiusi', value: stats.closed, bar: 'bg-slate-500', dot: 'bg-slate-500' },
  ]

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Buongiorno, {user?.name ? user.name.split(' ')[0] : user?.username} 👋</h1>
          <p className="text-slate-500 text-sm mt-0.5">Ecco una panoramica del sistema di supporto</p>
        </div>
        <button
          onClick={() => navigate('/tickets/new')}
          className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#7ccad5] text-[#0b1622] text-sm font-semibold rounded-xl hover:bg-[#5ab5c2] active:scale-95 transition-all shadow-lg shadow-[#7ccad5]/15"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nuovo Ticket
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 stagger">
        <StatCard
          label="Ticket Aperti"
          value={stats.open}
          accentColor="bg-blue-400"
          bgColor="bg-blue-500/10"
          icon={<svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" /></svg>}
        />
        <StatCard
          label="In Lavorazione"
          value={stats.in_progress}
          accentColor="bg-amber-400"
          bgColor="bg-amber-500/10"
          icon={<svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard
          label="Risolti"
          value={stats.resolved}
          sub="Completati"
          accentColor="bg-emerald-400"
          bgColor="bg-emerald-500/10"
          icon={<svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard
          label="Totale Ticket"
          value={stats.total}
          accentColor="bg-[#7ccad5]"
          bgColor="bg-[#7ccad5]/10"
          icon={<svg className="w-5 h-5 text-[#7ccad5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>}
        />
      </div>

      {/* Content grid */}
      <div className="grid lg:grid-cols-3 gap-5">

        {/* Ticket Recenti */}
        <div className="lg:col-span-2 bg-[#0f1e2f] border border-[#1e3348] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e3348]">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-sm font-semibold text-white">Attività Recenti</h2>
            </div>
            <button
              onClick={() => navigate('/tickets')}
              className="text-xs text-[#7ccad5] hover:text-[#5ab5c2] font-medium transition-colors flex items-center gap-1"
            >
              Vedi tutti
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="divide-y divide-[#131f2e]">
            {recent.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => navigate(`/tickets/${ticket.id}`)}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#1a2e42]/40 cursor-pointer transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#1a2e42] border border-[#2d4060] flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-200 truncate group-hover:text-white transition-colors">{ticket.title}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{ticket.category} · {formatRelative(ticket.createdAt)}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden sm:block"><PriorityBadge priority={ticket.priority} /></span>
                  <StatusBadge status={ticket.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Distribuzione */}
        <div className="bg-[#0f1e2f] border border-[#1e3348] rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-[#1e3348]">
            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h2 className="text-sm font-semibold text-white">Distribuzione Stati</h2>
          </div>

          <div className="px-5 py-5 space-y-5">
            {chartData.map((item) => {
              const pct = stats.total ? Math.round((item.value / stats.total) * 100) : 0
              return (
                <div key={item.label}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${item.dot} shrink-0`} />
                      <span className="text-xs text-slate-400 font-medium">{item.label}</span>
                    </div>
                    <span className="text-xs text-slate-300 font-semibold tabular-nums">{item.value}</span>
                  </div>
                  <div className="h-1.5 bg-[#1a2e42] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.bar} transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}

            <div className="pt-2 border-t border-[#1e3348]">
              <p className="text-xs text-slate-600 text-center">
                {stats.total} ticket totali nel sistema
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
