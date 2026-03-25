import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/context/AuthContext'

const LoginPage = () => {
  const { login } = useAuthContext()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email || !password) { setError('Compila tutti i campi'); return }
    setLoading(true)
    setError('')
    const ok = await login(email, password)
    if (ok) {
      navigate('/dashboard')
    } else {
      setError('Credenziali non valide. Usa admin@helpdesk.it / admin123')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0b1622] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#7ccad5]/15 border border-[#7ccad5]/30 mb-4">
            <svg className="w-7 h-7 text-[#7ccad5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">HelpDesk Pro</h1>
          <p className="text-slate-400 text-sm mt-1">Accedi al pannello di gestione</p>
        </div>

        <div className="bg-[#111f30] border border-[#2d4060] rounded-2xl p-8">
          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@helpdesk.it"
                className="w-full bg-[#1a2e42] border border-[#2d4060] rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#7ccad5]/50 focus:border-[#7ccad5]/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#1a2e42] border border-[#2d4060] rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#7ccad5]/50 focus:border-[#7ccad5]/50 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 px-4 rounded-xl bg-[#7ccad5] text-[#0b1622] font-semibold text-sm hover:bg-[#5ab5c2] disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Accesso in corso...
                </>
              ) : 'Accedi'}
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 mt-6">
            Demo: <span className="text-[#7ccad5]">admin@helpdesk.it</span> / <span className="text-[#7ccad5]">admin123</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
