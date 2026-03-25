import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { mockAiReplies, mockAiClassify, mockAiSummary } from '@/data/mockData'
import { PriorityBadge } from '@/components/common'
import { formatDateTime, formatRelative } from '@/utils/formatDate'
import { useToast } from '@/context/ToastContext'
import { useTickets } from '@/context/TicketContext'
import type { Ticket, Comment, TicketStatus } from '@/types'

const AiResultBox = ({ title, content, onClose }: { title: string; content: string; onClose: () => void }) => (
  <div className="mt-3 bg-[#1a2e42] border border-[#7ccad5]/25 rounded-xl p-4">
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs font-semibold text-[#7ccad5] uppercase tracking-wide">{title}</span>
      <button onClick={onClose} className="text-slate-500 hover:text-slate-300 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
    <p className="text-sm text-slate-300 whitespace-pre-line leading-relaxed">{content}</p>
  </div>
)

const TicketDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { getTicketById, updateStatus } = useTickets()

  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [isInternal, setIsInternal] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [aiLoading, setAiLoading] = useState<string | null>(null)
  const [aiResult, setAiResult] = useState<{ type: string; content: string } | null>(null)

  useEffect(() => {
    const found = id ? getTicketById(id) : undefined
    if (found) {
      setTicket(found)
      setComments(found.comments ?? [])
    }
  }, [id, getTicketById])

  const handleStatusChange = (newStatus: TicketStatus) => {
    if (!ticket) return
    setTicket({ ...ticket, status: newStatus })
    updateStatus(ticket.id, newStatus)
    toast.success(`Stato aggiornato: ${newStatus}`)
  }

  const handleAddComment = async () => {
    if (!newComment.trim()) return
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 600))
    const comment: Comment = {
      id: `c${Date.now()}`,
      content: newComment.trim(),
      author: { id: 'u1', name: 'Marco Rossi', email: 'admin@helpdesk.it', role: 'admin', createdAt: '' },
      createdAt: new Date().toISOString(),
      isInternal,
    }
    setComments((prev) => [...prev, comment])
    setNewComment('')
    setIsInternal(false)
    setSubmitting(false)
    toast.success('Commento aggiunto')
  }

  const runAi = async (type: 'reply' | 'classify' | 'summary') => {
    if (!ticket) return
    setAiLoading(type)
    setAiResult(null)
    await new Promise((r) => setTimeout(r, 1200))
    if (type === 'reply') {
      const text = mockAiReplies[ticket.category] ?? mockAiReplies['general']
      setAiResult({ type: 'Risposta Suggerita', content: text })
    } else if (type === 'classify') {
      const { category, priority } = mockAiClassify(ticket.title)
      setAiResult({ type: 'Classificazione AI', content: `Categoria suggerita: ${category}\nPriorità suggerita: ${priority}\nAffidabilità: 87%` })
    } else {
      setAiResult({ type: 'Riassunto', content: mockAiSummary(ticket) })
    }
    setAiLoading(null)
  }

  if (!ticket) return (
    <div className="flex items-center justify-center py-20 text-slate-500">
      <p>Ticket non trovato.</p>
    </div>
  )

  const statusOptions: TicketStatus[] = ['open', 'in_progress', 'resolved', 'closed']
  const statusLabels: Record<TicketStatus, string> = { open: 'Aperto', in_progress: 'In Lavorazione', resolved: 'Risolto', closed: 'Chiuso' }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/tickets')} className="text-slate-400 hover:text-slate-200 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h1 className="text-xl font-bold text-white flex-1 truncate">{ticket.title}</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#111f30] border border-[#2d4060] rounded-xl p-5">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">Descrizione</h2>
            <p className="text-slate-300 text-sm leading-relaxed">{ticket.description}</p>
          </div>

          <div className="bg-[#111f30] border border-[#2d4060] rounded-xl">
            <div className="px-5 py-4 border-b border-[#2d4060]">
              <h2 className="text-sm font-semibold text-white">Commenti ({comments.length})</h2>
            </div>
            <div className="p-5 space-y-4">
              {comments.length === 0 && <p className="text-sm text-slate-500 text-center py-4">Nessun commento ancora.</p>}
              {comments.map((c) => (
                <div key={c.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#e7c6ff]/15 border border-[#e7c6ff]/20 flex items-center justify-center text-[#e7c6ff] text-xs font-bold shrink-0">
                    {c.author.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-slate-200">{c.author.name}</span>
                      {c.isInternal && <span className="text-xs bg-yellow-500/15 text-yellow-400 px-1.5 py-0.5 rounded border border-yellow-500/20">Interno</span>}
                      <span className="text-xs text-slate-500">{formatRelative(c.createdAt)}</span>
                    </div>
                    <p className="text-sm text-slate-300 bg-[#1a2e42] rounded-lg px-3 py-2 leading-relaxed">{c.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 pb-5">
              <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} rows={3}
                placeholder="Scrivi un commento..."
                className="w-full bg-[#1a2e42] border border-[#2d4060] rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#7ccad5]/40 focus:border-[#7ccad5]/50 resize-none transition-colors" />
              <div className="flex items-center justify-between mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={isInternal} onChange={(e) => setIsInternal(e.target.checked)} className="rounded border-[#2d4060] bg-[#1a2e42] text-[#7ccad5]" />
                  <span className="text-xs text-slate-400">Nota interna</span>
                </label>
                <button onClick={handleAddComment} disabled={!newComment.trim() || submitting}
                  className="px-4 py-1.5 bg-[#7ccad5] text-[#0b1622] text-xs font-semibold rounded-lg hover:bg-[#5ab5c2] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  {submitting ? 'Invio...' : 'Invia'}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#111f30] border border-[#2d4060] rounded-xl p-5">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-2">
              <span className="text-[#7ccad5]">✦</span> Assistente AI
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                { type: 'reply' as const, label: 'Genera Risposta' },
                { type: 'classify' as const, label: 'Classifica Ticket' },
                { type: 'summary' as const, label: 'Genera Riassunto' },
              ].map((btn) => (
                <button key={btn.type} onClick={() => runAi(btn.type)} disabled={!!aiLoading}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#7ccad5]/10 border border-[#7ccad5]/25 text-[#7ccad5] text-xs font-medium rounded-lg hover:bg-[#7ccad5]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  {aiLoading === btn.type ? (
                    <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>
                  ) : (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  )}
                  {btn.label}
                </button>
              ))}
            </div>
            {aiResult && <AiResultBox title={aiResult.type} content={aiResult.content} onClose={() => setAiResult(null)} />}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-[#111f30] border border-[#2d4060] rounded-xl p-5 space-y-4">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Stato</p>
              <select value={ticket.status} onChange={(e) => handleStatusChange(e.target.value as TicketStatus)}
                className="w-full bg-[#1a2e42] border border-[#2d4060] rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#7ccad5]/40 focus:border-[#7ccad5]/50">
                {statusOptions.map((s) => <option key={s} value={s}>{statusLabels[s]}</option>)}
              </select>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Priorità</p>
              <PriorityBadge priority={ticket.priority} />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Categoria</p>
              <span className="text-sm text-slate-300 capitalize">{ticket.category}</span>
            </div>
          </div>

          <div className="bg-[#111f30] border border-[#2d4060] rounded-xl p-5 space-y-3">
            <p className="text-xs text-slate-500 uppercase tracking-wide">Persone</p>
            <div>
              <p className="text-xs text-slate-500 mb-1">Creato da</p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#e7c6ff]/15 flex items-center justify-center text-[#e7c6ff] text-xs font-bold">{ticket.createdBy.name.charAt(0)}</div>
                <span className="text-sm text-slate-300">{ticket.createdBy.name}</span>
              </div>
            </div>
            {ticket.assignedTo && (
              <div>
                <p className="text-xs text-slate-500 mb-1">Assegnato a</p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#7ccad5]/15 flex items-center justify-center text-[#7ccad5] text-xs font-bold">{ticket.assignedTo.name.charAt(0)}</div>
                  <span className="text-sm text-slate-300">{ticket.assignedTo.name}</span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-[#111f30] border border-[#2d4060] rounded-xl p-5 space-y-2">
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-3">Date</p>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Creato</span>
              <span className="text-slate-300">{formatDateTime(ticket.createdAt)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Aggiornato</span>
              <span className="text-slate-300">{formatDateTime(ticket.updatedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketDetailPage
