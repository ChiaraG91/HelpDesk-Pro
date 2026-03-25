import { Link } from 'react-router-dom'

const NotFoundPage = () => (
  <div className="min-h-screen bg-[#0b1622] flex items-center justify-center px-4">
    <div className="text-center">
      <p className="text-8xl font-bold text-[#2d4060] select-none">404</p>
      <h1 className="text-2xl font-bold text-white mt-4">Pagina non trovata</h1>
      <p className="text-slate-400 text-sm mt-2">La pagina che stai cercando non esiste o è stata spostata.</p>
      <Link to="/dashboard"
        className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-[#7ccad5] text-[#0b1622] text-sm font-semibold rounded-lg hover:bg-[#5ab5c2] transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Torna alla Dashboard
      </Link>
    </div>
  </div>
)

export default NotFoundPage
