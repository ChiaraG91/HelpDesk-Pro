import { useAuthContext } from '@/context/AuthContext'
import { useTickets } from '@/context/TicketContext'
import { useMemo } from 'react'

const ROLE_LABELS: Record<string, string> = {
  admin: 'Amministratore',
  agent: 'Operatore',
  customer: 'Cliente',
}

const ProfilePage = () => {
  const { user } = useAuthContext()
  const { tickets } = useTickets()

  const myStats = useMemo(() => ({
    assigned: tickets.filter((t) => t.assignedTo?.id === user?.id).length,
    resolved: tickets.filter((t) => t.assignedTo?.id === user?.id && t.status === 'resolved').length,
  }), [tickets, user])

  return (
    <div className="max-w-2xl mx-auto space-y-5 animate-fade-in">

      <div>
        <h1 className="text-xl font-bold text-white">Profilo</h1>
        <p className="text-slate-500 text-sm mt-0.5">Informazioni account e impostazioni</p>
      </div>

      {/* Avatar card */}
      <div className="bg-[#0f1e2f] border border-[#1e3348] rounded-2xl p-6">
        <div className="flex items-center gap-5">
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#e7c6ff]/20 to-[#e7c6ff]/5 border border-[#e7c6ff]/20 flex items-center justify-center text-[#e7c6ff] text-2xl font-bold uppercase">
              {(user?.name || user?.username || 'U').charAt(0)}
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[#0b1622]" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-white">{user?.name || user?.username}</h2>
            <p className="text-slate-500 text-sm">{user?.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#7ccad5]/12 text-[#7ccad5] border border-[#7ccad5]/25">
                {ROLE_LABELS[user?.role ?? ''] ?? user?.role}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Online
              </span>
            </div>
          </div>
        </div>

        {/* Mini statistiche */}
        <div className="grid grid-cols-2 gap-3 mt-5 pt-5 border-t border-[#1e3348]">
          <div className="bg-[#0b1622] rounded-xl p-3.5 text-center">
            <p className="text-xl font-bold text-white tabular-nums">{myStats.assigned}</p>
            <p className="text-xs text-slate-600 mt-0.5">Ticket assegnati</p>
          </div>
          <div className="bg-[#0b1622] rounded-xl p-3.5 text-center">
            <p className="text-xl font-bold text-emerald-400 tabular-nums">{myStats.resolved}</p>
            <p className="text-xs text-slate-600 mt-0.5">Risolti</p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-[#0f1e2f] border border-[#1e3348] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#1e3348]">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Informazioni Account</h3>
        </div>
        <div className="divide-y divide-[#131f2e]">
          {[
            { label: 'Nome completo', value: user?.name || user?.username, icon: '👤' },
            { label: 'Email', value: user?.email, icon: '✉' },
            { label: 'Ruolo', value: ROLE_LABELS[user?.role ?? ''] ?? user?.role, icon: '🔑' },
            { label: 'Membro dal', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' }) : '—', icon: '📅' },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="text-sm leading-none">{row.icon}</span>
                <span className="text-sm text-slate-500">{row.label}</span>
              </div>
              <span className="text-sm text-slate-300 font-medium">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Nota demo */}
      <div className="flex items-start gap-3 px-4 py-3 bg-[#7ccad5]/5 border border-[#7ccad5]/15 rounded-xl">
        <span className="text-[#7ccad5] text-sm mt-0.5">ℹ</span>
        <p className="text-xs text-slate-500 leading-relaxed">
          Questa è una demo con dati mock. Le modifiche al profilo non sono persistenti in questa versione.
        </p>
      </div>
    </div>
  )
}

export default ProfilePage
