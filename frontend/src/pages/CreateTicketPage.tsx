import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/context/ToastContext'
import type { TicketPriority } from '@/types'

const CreateTicketPage = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', category: '', priority: 'medium' as TicketPriority })
  const [errors, setErrors] = useState<Partial<typeof form>>({})

  const update = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const e: Partial<typeof form> = {}
    if (!form.title.trim()) e.title = 'Il titolo è obbligatorio'
    if (!form.description.trim()) e.description = 'La descrizione è obbligatoria'
    if (!form.category) e.category = 'Seleziona una categoria'
    return e
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) { setErrors(e2); return }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    toast.success('Ticket creato con successo!')
    navigate('/tickets')
  }

  const inputCls = (err?: string) => `w-full bg-[#1a2e42] border ${err ? 'border-red-500/50' : 'border-[#2d4060]'} rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 ${err ? 'focus:ring-red-500/30' : 'focus:ring-[#7ccad5]/40 focus:border-[#7ccad5]/50'} transition-colors`

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/tickets')} className="text-slate-400 hover:text-slate-200 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">Nuovo Ticket</h1>
          <p className="text-slate-400 text-sm">Apri una nuova richiesta di supporto</p>
        </div>
      </div>

      <div className="bg-[#111f30] border border-[#2d4060] rounded-2xl p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Titolo <span className="text-red-400">*</span></label>
            <input value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="Descrivi brevemente il problema" className={inputCls(errors.title)} />
            {errors.title && <p className="text-xs text-red-400 mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Descrizione <span className="text-red-400">*</span></label>
            <textarea value={form.description} onChange={(e) => update('description', e.target.value)} rows={5}
              placeholder="Descrivi il problema in dettaglio..." className={`${inputCls(errors.description)} resize-none`} />
            {errors.description && <p className="text-xs text-red-400 mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Categoria <span className="text-red-400">*</span></label>
              <select value={form.category} onChange={(e) => update('category', e.target.value)} className={inputCls(errors.category)}>
                <option value="">Seleziona...</option>
                <option value="technical">Tecnico</option>
                <option value="billing">Fatturazione</option>
                <option value="general">Generale</option>
                <option value="other">Altro</option>
              </select>
              {errors.category && <p className="text-xs text-red-400 mt-1">{errors.category}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Priorità</label>
              <select value={form.priority} onChange={(e) => update('priority', e.target.value)} className={inputCls()}>
                <option value="low">Bassa</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
                <option value="critical">Critica</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => navigate('/tickets')}
              className="px-4 py-2 text-sm font-medium text-slate-400 bg-[#1a2e42] border border-[#2d4060] rounded-lg hover:bg-[#243447] hover:text-slate-200 transition-colors">
              Annulla
            </button>
            <button type="submit" disabled={loading}
              className="flex items-center gap-2 px-5 py-2 bg-[#7ccad5] text-[#0b1622] text-sm font-semibold rounded-lg hover:bg-[#5ab5c2] disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
              {loading ? (
                <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>Creazione...</>
              ) : 'Crea Ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateTicketPage
