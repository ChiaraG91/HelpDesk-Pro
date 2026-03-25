import { Link } from 'react-router-dom'

const NotFoundPage = () => (
  <div className="min-h-screen bg-[#0b1622] flex items-center justify-center px-4">
    <div className="text-center animate-fade-in">
      <div
        className="text-[120px] font-black leading-none select-none mb-4"
        style={{ background: 'linear-gradient(135deg, #1e3348, #2d4060)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
      >
        404
      </div>
      <div className="w-16 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#7ccad5]/40 to-transparent mb-6" />
      <h1 className="text-xl font-bold text-white mb-2">Pagina non trovata</h1>
      <p className="text-slate-500 text-sm max-w-xs mx-auto leading-relaxed mb-8">
        La pagina che stai cercando non esiste o è stata spostata.
      </p>
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7ccad5] text-[#0b1622] text-sm font-bold rounded-xl hover:bg-[#5ab5c2] active:scale-95 transition-all shadow-lg shadow-[#7ccad5]/15"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Torna alla Dashboard
      </Link>
    </div>
  </div>
)

export default NotFoundPage
