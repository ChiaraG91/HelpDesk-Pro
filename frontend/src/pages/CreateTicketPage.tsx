import { useState, FormEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/context/ToastContext'
import { useTickets } from '@/context/TicketContext'
import type { TicketPriority } from '@/types'

const CATEGORIES = [
  { value: 'technical', label: 'Tecnico', desc: 'Problemi software, bug, accesso' },
  { value: 'billing', label: 'Fatturazione', desc: 'Fatture, pagamenti, abbonamenti' },
  { value: 'general', label: 'Generale', desc: 'Richieste informazioni, altro' },
  { value: 'other', label: 'Altro', desc: 'Qualsiasi altra richiesta' },
]

const PRIORITIES: { value: TicketPriority; label: string; color: string; dot: string }[] = [
  { value: 'low',      label: 'Bassa',   color: 'border-slate-600/30 bg-slate-700/20 text-slate-400',   dot: 'bg-slate-400' },
  { value: 'medium',   label: 'Media',   color: 'border-sky-500/30 bg-sky-500/8 text-sky-400',           dot: 'bg-sky-400' },
  { value: 'high',     label: 'Alta',    color: 'border-orange-500/30 bg-orange-500/8 text-orange-400',  dot: 'bg-orange-400' },
  { value: 'critical', label: 'Critica', color: 'border-red-500/30 bg-red-500/8 text-red-400',           dot: 'bg-red-400' },
]

const CreateTicketPage = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { addTicket } = useTickets()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium' as TicketPriority,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({})

  const update = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const e: typeof errors = {}
    if (!form.title.trim()) e.title = 'Il titolo è obbligatorio'
    if (!form.description.trim()) e.description = 'La descrizione è obbligatoria'
    if (!form.category) e.category = 'Seleziona una categoria'
    return e
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    try {
      // NON INVIO la categoria per evitare il ValidationError in Django, 
      // poichè queste Categorie fittizie non esistono sul suo DB
      const payloadToSend = {
          title: form.title,
          description: form.description,
          priority: form.priority
      }
      await addTicket(payloadToSend as any)
      toast.success('Ticket creato con successo!')
      navigate('/tickets')
    } catch (err) {
      toast.error('Errore durante la creazione del ticket')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const inputCls = (err?: string) =>
    `w-full bg-[#0b1622] border ${err ? 'border-red-500/40 focus:ring-red-500/20 focus:border-red-500/60' : 'border-[#2d4060] focus:ring-[#7ccad5]/25 focus:border-[#7ccad5]/50'} rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 transition-all`

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/tickets')}
          className="p-1.5 rounded-lg text-slate-600 hover:text-slate-300 hover:bg-[#1a2e42] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold text-white">Nuovo Ticket</h1>
          <p className="text-slate-500 text-sm">Apri una nuova richiesta di supporto</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Titolo */}
        <div className="bg-[#0f1e2f] border border-[#1e3348] rounded-2xl p-5">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2.5">
            Titolo <span className="text-red-400 normal-case font-normal tracking-normal">*</span>
          </label>
          <input
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            placeholder="Descrivi brevemente il problema..."
            className={inputCls(errors.title)}
          />
          {errors.title && (
            <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.title}
            </p>
          )}
        </div>

        {/* Descrizione */}
        <div className="bg-[#0f1e2f] border border-[#1e3348] rounded-2xl p-5">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2.5">
            Descrizione <span className="text-red-400 normal-case font-normal tracking-normal">*</span>
          </label>
          <textarea
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            rows={5}
            placeholder="Descrivi il problema in dettaglio: cosa stai cercando di fare, cosa succede, da quando..."
            className={`${inputCls(errors.description)} resize-none`}
          />
          {errors.description && (
            <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.description}
            </p>
          )}
        </div>

        {/* Categoria */}
        <div className="bg-[#0f1e2f] border border-[#1e3348] rounded-2xl p-5">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
            Categoria <span className="text-red-400 normal-case font-normal tracking-normal">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => update('category', cat.value)}
                className={`text-left px-3.5 py-3 rounded-xl border transition-all ${
                  form.category === cat.value
                    ? 'border-[#7ccad5]/50 bg-[#7ccad5]/8 text-[#7ccad5]'
                    : 'border-[#2d4060] hover:border-[#415a77] text-slate-400 hover:text-slate-300'
                }`}
              >
                <p className="text-xs font-semibold">{cat.label}</p>
                <p className="text-[10px] opacity-60 mt-0.5">{cat.desc}</p>
              </button>
            ))}
          </div>
          {errors.category && (
            <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.category}
            </p>
          )}
        </div>

        {/* Priorità */}
        <div className="bg-[#0f1e2f] border border-[#1e3348] rounded-2xl p-5">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Priorità</label>
          <div className="grid grid-cols-4 gap-2">
            {PRIORITIES.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => update('priority', p.value)}
                className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all ${
                  form.priority === p.value
                    ? p.color
                    : 'border-[#2d4060] text-slate-600 hover:border-[#415a77] hover:text-slate-400'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${form.priority === p.value ? p.dot : 'bg-current opacity-40'}`} />
                <span className="text-[11px] font-semibold">{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Azioni */}
        <div className="flex items-center justify-end gap-3 pt-1 pb-4">
          <button
            type="button"
            onClick={() => navigate('/tickets')}
            className="px-5 py-2.5 text-sm font-medium text-slate-500 bg-[#0f1e2f] border border-[#1e3348] rounded-xl hover:bg-[#1a2e42] hover:text-slate-300 transition-all"
          >
            Annulla
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#7ccad5] text-[#0b1622] text-sm font-bold rounded-xl hover:bg-[#5ab5c2] disabled:opacity-60 disabled:cursor-not-allowed transition-all active:scale-95 shadow-lg shadow-[#7ccad5]/15"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Creazione...
              </>
            ) : (
              <>
                Crea Ticket
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateTicketPage
