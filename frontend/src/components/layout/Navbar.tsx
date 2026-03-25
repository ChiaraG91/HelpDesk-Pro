import { useLocation } from 'react-router-dom'
import { useAuthContext } from '@/context/AuthContext'

interface NavbarProps {
  onMenuToggle: () => void
  sidebarOpen: boolean
}

const routeTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/tickets': 'Ticket',
  '/tickets/new': 'Nuovo Ticket',
  '/profile': 'Profilo',
}

const Navbar = ({ onMenuToggle, sidebarOpen }: NavbarProps) => {
  const { user } = useAuthContext()
  const { pathname } = useLocation()

  const title = Object.entries(routeTitles).find(([path]) => pathname === path || pathname.startsWith(path + '/'))?.[1]
    ?? (pathname.match(/^\/tickets\/(.+)$/) ? 'Dettaglio Ticket' : 'HelpDesk Pro')

  return (
    <header className="h-14 bg-[#0d1c2e]/95 backdrop-blur-sm border-b border-[#1e3348] flex items-center justify-between px-4 sm:px-6 shrink-0 z-10">
      <div className="flex items-center gap-3">
        {/* Hamburger mobile */}
        <button
          onClick={onMenuToggle}
          className="p-1.5 rounded-lg text-slate-500 hover:bg-[#1a2e42] hover:text-slate-300 transition-colors md:hidden"
          aria-label="Toggle menu"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span className={`block h-0.5 bg-current rounded-full transition-all duration-200 ${sidebarOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block h-0.5 bg-current rounded-full transition-all duration-200 ${sidebarOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-current rounded-full transition-all duration-200 ${sidebarOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </div>
        </button>

        {/* Titolo pagina */}
        <h1 className="text-sm font-semibold text-white hidden sm:block">{title}</h1>
        <h1 className="text-sm font-semibold text-white sm:hidden">HelpDesk Pro</h1>
      </div>

      <div className="flex items-center gap-1.5">
        {/* Notifiche */}
        <button className="relative p-2 rounded-lg text-slate-500 hover:bg-[#1a2e42] hover:text-slate-300 transition-colors">
          <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#7ccad5] rounded-full ring-2 ring-[#0d1c2e]" />
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-[#1e3348] mx-1" />

        {/* Avatar utente */}
        {user && (
          <div className="flex items-center gap-2.5 pl-1">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#e7c6ff]/30 to-[#e7c6ff]/10 border border-[#e7c6ff]/25 flex items-center justify-center text-[#e7c6ff] text-xs font-bold select-none">
              {user.name.charAt(0)}
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-semibold text-slate-300 leading-none">{user.name}</p>
              <p className="text-[10px] text-slate-600 mt-0.5 capitalize">{user.role}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
