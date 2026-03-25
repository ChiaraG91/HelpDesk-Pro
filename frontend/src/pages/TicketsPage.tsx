import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockTickets } from '@/data/mockData'
import { StatusBadge, PriorityBadge } from '@/components/common'
import { formatDate } from '@/utils/formatDate'
import type { TicketStatus, TicketPriority } from '@/types'

const TicketsPage = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<TicketStatus | ''>('')
  const [filterPriority, setFilterPriority] = useState<TicketPriority | ''>('')
  const [filterCategory, setFilterCategory] = useState('')

  const filtered = useMemo(() => {
    return mockTickets.filter((t) => {
      if (filterStatus && t.status !== filterStatus) return false
      if (filterPriority && t.priority !== filterPriority) return false
      if (filterCategory && t.category !== filterCategory) return false
      if (search && !t.title.toLowerCase().includes(search.toLowerCase()) && !t.description.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [search, filterStatus, filterPriority, filterCategory])

  const selectCls = "bg-[#1a2e42] border border-[#2d4060] rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7ccad5]/40 focus:border-[#7ccad5]/50 transition-colors"

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Ticket</h1>
          <p className="text-slate-400 text-sm mt-1">{filtered.length} risultati trovati</p>
        </div>
        <button onClick={() => navigate('/tickets/new')}
          className="flex items-center gap-2 px-4 py-2 bg-[#7ccad5] text-[#0b1622] text-sm font-semibold rounded-lg hover:bg-[#5ab5c2] transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Nuovo
        </button>
      </div>

      <div className="bg-[#111f30] border border-[#2d4060] rounded-xl p-4">
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-48 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cerca ticket..."
              className="w-full bg-[#1a2e42] border border-[#2d4060] rounded-lg pl-9 pr-3 py-2 text-sm text-slate-300 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#7ccad5]/40 focus:border-[#7ccad5]/50 transition-colors" />
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as TicketStatus | '')} className={selectCls}>
            <option value="">Tutti gli stati</option>
            <option value="open">Aperto</option>
            <option value="in_progress">In lavorazione</option>
            <option value="resolved">Risolto</option>
            <option value="closed">Chiuso</option>
          </select>
          <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value as TicketPriority | '')} className={selectCls}>
            <option value="">Tutte le priorità</option>
            <option value="low">Bassa</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
            <option value="critical">Critica</option>
          </select>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className={selectCls}>
            <option value="">Tutte le categorie</option>
            <option value="technical">Tecnico</option>
            <option value="billing">Fatturazione</option>
            <option value="general">Generale</option>
          </select>
          {(filterStatus || filterPriority || filterCategory || search) && (
            <button onClick={() => { setSearch(''); setFilterStatus(''); setFilterPriority(''); setFilterCategory('') }}
              className="text-xs text-slate-400 hover:text-[#7ccad5] transition-colors self-center">
              Azzera
            </button>
          )}
        </div>
      </div>

      <div className="bg-[#111f30] border border-[#2d4060] rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            <p className="text-sm">Nessun ticket corrisponde ai filtri</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2d4060]">
                  {['ID', 'Titolo', 'Stato', 'Priorità', 'Categoria', 'Assegnato a', 'Data'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a2e42]">
                {filtered.map((ticket) => (
                  <tr key={ticket.id} onClick={() => navigate(`/tickets/${ticket.id}`)}
                    className="hover:bg-[#1a2e42] cursor-pointer transition-colors">
                    <td className="px-4 py-3 text-slate-500 font-mono text-xs">#{ticket.id}</td>
                    <td className="px-4 py-3 max-w-xs">
                      <p className="text-slate-200 font-medium truncate">{ticket.title}</p>
                      <p className="text-slate-500 text-xs truncate mt-0.5">{ticket.description.slice(0, 60)}...</p>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={ticket.status} /></td>
                    <td className="px-4 py-3"><PriorityBadge priority={ticket.priority} /></td>
                    <td className="px-4 py-3 text-slate-400 capitalize">{ticket.category}</td>
                    <td className="px-4 py-3 text-slate-400">{ticket.assignedTo?.name ?? <span className="text-slate-600">—</span>}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{formatDate(ticket.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default TicketsPage
