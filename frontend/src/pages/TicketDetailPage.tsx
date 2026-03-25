import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { mockAiReplies, mockAiClassify, mockAiSummary } from '@/data/mockData'
import { StatusBadge, PriorityBadge } from '@/components/common'
import { formatDateTime, formatRelative } from '@/utils/formatDate'
import { useToast } from '@/context/ToastContext'
import { useTickets } from '@/context/TicketContext'
import { useAuthContext } from '@/context/AuthContext'
import { commentService } from '@/services/commentService'
import { aiService } from '@/services/aiService'
import type { Ticket, Comment, TicketStatus, User } from '@/types'

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
    {children}
  </h2>
)

const AiResultBox = ({ title, content, onClose }: { title: string; content: string; onClose: () => void }) => (
  <div className="mt-3 bg-[#0b1622] border border-[#7ccad5]/20 rounded-xl p-4 animate-scale-in">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#7ccad5] animate-pulse" />
        <span className="text-xs font-semibold text-[#7ccad5] tracking-wide">{title}</span>
      </div>
      <button onClick={onClose} className="text-slate-600 hover:text-slate-400 transition-colors p-0.5 rounded hover:bg-[#1a2e42]">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <p className="text-sm text-slate-300 whitespace-pre-line leading-relaxed">{content}</p>
  </div>
)

const TicketDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { user } = useAuthContext()
  const { getTicketById, updateStatus } = useTickets()

  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [isInternal, setIsInternal] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [aiLoading, setAiLoading] = useState<string | null>(null)
  const [aiResult, setAiResult] = useState<{ type: string; content: string } | null>(null)
  const [operators, setOperators] = useState<User[]>([])

  const isOperator = user?.role?.toLowerCase() === 'operator'
  const isAdmin = user?.role?.toLowerCase() === 'admin'
  const canAssign = isOperator || isAdmin

  useEffect(() => {
    if (isAdmin) {
      import('@/services/userService').then(({ userService }) => {
        userService.getAll()
          .then(res => setOperators((res as any).results || res.data || res))
          .catch(err => console.error("Errore recupero operatori:", err))
      })
    } else if (isOperator && user) {
      setOperators([user])
    }
  }, [isAdmin, isOperator, user])

  useEffect(() => {
    const found = id ? getTicketById(id) : undefined
    if (found) {
      setTicket(found)
      // Recupera i commenti reali dal database
      commentService.getByTicket(found.id)
        .then(data => setComments(data))
        .catch(err => console.error("Errore recupero commenti:", err))
    }
  }, [id, getTicketById])

  const handleStatusChange = (newStatus: TicketStatus) => {
    if (!ticket) return
    setTicket({ ...ticket, status: newStatus })
    updateStatus(ticket.id, newStatus)
    toast.success('Stato aggiornato')
  }

  const handleAssign = async (userId: string) => {
    if (!ticket) return
    try {
      await import('@/services/ticketService').then(({ ticketService }) => ticketService.assign(ticket.id, userId || null))
      const op = operators.find(o => String(o.id) === userId)
      setTicket({ ...ticket, assignedTo: op || undefined })
      toast.success('Ticket assegnato con successo!')
    } catch {
      toast.error("Errore nell'assegnazione")
    }
  }

  const handleAddComment = async () => {
    if (!newComment.trim() || !ticket) return
    setSubmitting(true)
    try {
      const savedComment = await commentService.create(ticket.id, newComment.trim(), isInternal)
      setComments((prev) => [...prev, savedComment])
      setNewComment('')
      setIsInternal(false)
      toast.success('Commento aggiunto')
    } catch (e) {
      toast.error('Errore durante il salvataggio del commento')
      console.error(e)
    } finally {
      setSubmitting(false)
    }
  }

  const runAi = async (type: 'reply' | 'classify' | 'duplicate') => {
    if (!ticket) return
    setAiLoading(type)
    setAiResult(null)
    try {
      if (type === 'reply') {
        const res = await aiService.suggestReply(ticket.id)
        setAiResult({ type: 'Risposta Suggerita', content: res.generated_reply })
      } else if (type === 'classify') {
        const res = await aiService.classifyTicket(ticket.id)
        setAiResult({ type: 'Classificazione AI', content: `Categoria: ${res.category}\nPriorità: ${res.priority}\nAffidabilità: ${res.confidence}%` })
      } else {
        const res = await aiService.checkDuplicate(ticket.id)
        setAiResult({ type: 'Controllo Duplicati', content: res.is_duplicate ? `Possibile duplicato:\n${res.matching_ticket || res.message}\n(Affidabilità: ${res.confidence}%)` : (res.message || 'Nessun duplicato rilevato.') })
      }
    } catch (e) {
      toast.error("Errore durante l'elaborazione AI")
      console.error(e)
    } finally {
      setAiLoading(null)
    }
  }

  if (!ticket) return (
    <div className="flex flex-col items-center justify-center py-24 text-slate-600 gap-3">
      <svg className="w-12 h-12 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
      </svg>
      <p className="text-sm">Ticket non trovato</p>
    </div>
  )

  const statusLabels: Record<TicketStatus, string> = { open: 'Aperto', in_progress: 'In Lavorazione', resolved: 'Risolto', closed: 'Chiuso' }

  const getAvailableStatuses = (current: TicketStatus): TicketStatus[] => {
    switch (current) {
      case 'open': return ['open', 'in_progress', 'closed'];
      case 'in_progress': return ['in_progress', 'resolved', 'closed'];
      case 'resolved': return ['resolved', 'closed', 'open'];
      case 'closed': return ['closed', 'open'];
      default: return [current];
    }
  }

  const availableStatuses = getAvailableStatuses(ticket.status)

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-start gap-3 mb-6">
        <button
          onClick={() => navigate('/tickets')}
          className="mt-0.5 p-1.5 rounded-lg text-slate-600 hover:text-slate-300 hover:bg-[#1a2e42] transition-colors shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-slate-600 font-mono">#{ticket.id}</span>
            <StatusBadge status={ticket.status} />
          </div>
          <h1 className="text-xl font-bold text-white leading-snug">{ticket.title}</h1>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">

        {/* Colonna principale */}
        <div className="lg:col-span-2 space-y-4">

          {/* Descrizione */}
          <div className="bg-[#0f1e2f] border border-[#1e3348] rounded-2xl p-5">
            <SectionTitle>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h8" />
              </svg>
              Descrizione
            </SectionTitle>
            <p className="text-slate-300 text-sm leading-relaxed">{ticket.description}</p>
          </div>

          {/* Commenti */}
          <div className="bg-[#0f1e2f] border border-[#1e3348] rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-[#1e3348]">
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h2 className="text-sm font-semibold text-white">Commenti</h2>
              <span className="ml-auto text-xs text-slate-600 font-medium">{comments.length}</span>
            </div>

            <div className="p-5 space-y-4">
              {comments.length === 0 && (
                <div className="text-center py-6 text-slate-600 text-sm">Nessun commento ancora.</div>
              )}
              {comments.map((c) => (
                <div key={c.id} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#e7c6ff]/12 border border-[#e7c6ff]/15 flex items-center justify-center text-[#e7c6ff] text-xs font-bold shrink-0 mt-0.5 uppercase">
                    {(c.author.name || c.author.username || 'U').charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="text-xs font-semibold text-slate-300">{c.author.name || c.author.username}</span>
                      {c.isInternal && (
                        <span className="text-[10px] bg-amber-500/12 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/20 font-medium">Interno</span>
                      )}
                      <span className="text-[10px] text-slate-600 ml-auto">{formatRelative(c.createdAt)}</span>
                    </div>
                    <div className={`rounded-xl px-3 py-2.5 ${c.isInternal ? 'bg-amber-500/5 border border-amber-500/10' : 'bg-[#1a2e42]'}`}>
                      <p className="text-sm text-slate-300 leading-relaxed">{c.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form commento */}
            <div className="px-5 pb-5 border-t border-[#1e3348] pt-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
                placeholder="Scrivi un commento..."
                className="w-full bg-[#0b1622] border border-[#2d4060] rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#7ccad5]/25 focus:border-[#7ccad5]/50 resize-none transition-all"
              />
              <div className="flex items-center justify-between mt-2.5">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div
                    onClick={() => setIsInternal((v) => !v)}
                    className={`w-8 h-4.5 rounded-full transition-colors relative cursor-pointer ${isInternal ? 'bg-amber-500' : 'bg-[#1a2e42] border border-[#2d4060]'}`}
                  >
                    <span className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white shadow transition-all ${isInternal ? 'left-4' : 'left-0.5'}`} />
                  </div>
                  <span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors select-none">Nota interna</span>
                </label>
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim() || submitting}
                  className="flex items-center gap-2 px-4 py-1.5 bg-[#7ccad5] text-[#0b1622] text-xs font-bold rounded-lg hover:bg-[#5ab5c2] disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                  {submitting ? (
                    <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  )}
                  {submitting ? 'Invio...' : 'Invia'}
                </button>
              </div>
            </div>
          </div>

          {/* AI */}
          {user?.role?.toLowerCase() !== 'client' && (
            <div className="bg-[#0f1e2f] border border-[#1e3348] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 rounded-md bg-[#7ccad5]/15 flex items-center justify-center">
                  <span className="text-[#7ccad5] text-xs leading-none">✦</span>
                </div>
                <h2 className="text-sm font-semibold text-white">Assistente AI</h2>
                <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-full font-medium ml-auto">Attivo</span>
              </div>
  
              <div className="flex flex-wrap gap-2">
                {[
                  { type: 'reply' as const, label: 'Genera Risposta', icon: '✉' },
                  { type: 'classify' as const, label: 'Classifica', icon: '🏷' },
                  { type: 'duplicate' as const, label: 'Cerca Duplicati', icon: '🔍' },
                ].map((btn) => (
                  <button
                    key={btn.type}
                    onClick={() => runAi(btn.type)}
                    disabled={!!aiLoading}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#7ccad5]/8 border border-[#7ccad5]/20 text-[#7ccad5] text-xs font-medium rounded-lg hover:bg-[#7ccad5]/15 hover:border-[#7ccad5]/35 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    {aiLoading === btn.type ? (
                      <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                    ) : (
                      <span className="text-xs">{btn.icon}</span>
                    )}
                    {btn.label}
                  </button>
                ))}
              </div>
  
              {aiResult && (
                <AiResultBox title={aiResult.type} content={aiResult.content} onClose={() => setAiResult(null)} />
              )}
            </div>
          )}
        </div>

        {/* Sidebar destra */}
        <div className="space-y-4">

          {/* Stato & Priorità */}
          <div className="bg-[#0f1e2f] border border-[#1e3348] rounded-2xl p-5 space-y-5">
            <div>
              <SectionTitle>Stato Ticket</SectionTitle>
              {user?.role?.toLowerCase() === 'client' ? (
                <div className="mt-1">
                  <StatusBadge status={ticket.status} />
                </div>
              ) : (
                <select
                  value={ticket.status}
                  onChange={(e) => handleStatusChange(e.target.value as TicketStatus)}
                  className="w-full bg-[#0b1622] border border-[#2d4060] rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#7ccad5]/25 focus:border-[#7ccad5]/50 transition-all"
                >
                  {availableStatuses.map((s) => <option key={s} value={s}>{statusLabels[s]}</option>)}
                </select>
              )}
            </div>

            <div>
              <SectionTitle>Priorità</SectionTitle>
              <PriorityBadge priority={ticket.priority} />
            </div>

            <div>
              <SectionTitle>Categoria</SectionTitle>
              <span className="text-sm text-slate-300 capitalize">{ticket.category}</span>
            </div>
          </div>

          {/* Persone */}
          <div className="bg-[#0f1e2f] border border-[#1e3348] rounded-2xl p-5 space-y-4">
            <SectionTitle>Persone</SectionTitle>

            <div>
              <p className="text-[10px] text-slate-600 uppercase tracking-wider mb-2">Creato da</p>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#e7c6ff]/12 border border-[#e7c6ff]/15 flex items-center justify-center text-[#e7c6ff] text-xs font-bold uppercase">
                  {(ticket.createdBy.name || ticket.createdBy.username || 'U').charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-300">{ticket.createdBy.name || ticket.createdBy.username}</p>
                  <p className="text-[10px] text-slate-600 capitalize">{ticket.createdBy.role}</p>
                </div>
              </div>
            </div>

            {canAssign ? (
              <div>
                <p className="text-[10px] text-slate-600 uppercase tracking-wider mb-2">Assegnato a</p>
                <select
                  value={ticket.assignedTo?.id || ''}
                  onChange={(e) => handleAssign(e.target.value)}
                  className="w-full bg-[#0b1622] border border-[#2d4060] rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#7ccad5]/25 focus:border-[#7ccad5]/50 transition-all"
                >
                  <option value="">Nessuno</option>
                  {operators.map((op) => (
                    <option key={op.id} value={op.id}>
                      {op.name || op.username}
                    </option>
                  ))}
                </select>
              </div>
            ) : ticket.assignedTo ? (
              <div>
                <p className="text-[10px] text-slate-600 uppercase tracking-wider mb-2">Assegnato a</p>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#7ccad5]/12 border border-[#7ccad5]/15 flex items-center justify-center text-[#7ccad5] text-xs font-bold uppercase">
                    {(ticket.assignedTo.name || ticket.assignedTo.username || 'U').charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-300">{ticket.assignedTo.name || ticket.assignedTo.username}</p>
                    <p className="text-[10px] text-slate-600 capitalize">{ticket.assignedTo.role}</p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Date */}
          <div className="bg-[#0f1e2f] border border-[#1e3348] rounded-2xl p-5 space-y-3">
            <SectionTitle>Date</SectionTitle>
            <div className="space-y-2.5">
              <div className="flex justify-between">
                <span className="text-xs text-slate-600">Creato</span>
                <span className="text-xs text-slate-400">{formatDateTime(ticket.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-slate-600">Aggiornato</span>
                <span className="text-xs text-slate-400">{formatDateTime(ticket.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketDetailPage
