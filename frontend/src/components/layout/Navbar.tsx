import { useAuthContext } from '@/context/AuthContext'

interface NavbarProps {
  onMenuToggle: () => void
  sidebarOpen: boolean
}

const Navbar = ({ onMenuToggle, sidebarOpen }: NavbarProps) => {
  const { user } = useAuthContext()

  return (
    <header className="h-16 bg-[#111f30] border-b border-[#2d4060] flex items-center justify-between px-4 md:px-6 shrink-0 z-10">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-lg text-slate-400 hover:bg-[#1a2e42] hover:text-slate-200 transition-colors md:hidden"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
        <span className="text-sm font-semibold text-white md:hidden">HelpDesk Pro</span>
      </div>

      <div className="flex items-center gap-2">
        <button className="relative p-2 rounded-lg text-slate-400 hover:bg-[#1a2e42] hover:text-slate-200 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#7ccad5] rounded-full" />
        </button>

        {user && (
          <div className="flex items-center gap-2 ml-1 pl-3 border-l border-[#2d4060]">
            <div className="w-8 h-8 rounded-full bg-[#e7c6ff]/20 border border-[#e7c6ff]/30 flex items-center justify-center text-[#e7c6ff] text-sm font-bold select-none">
              {user.name.charAt(0)}
            </div>
            <span className="hidden sm:block text-sm font-medium text-slate-300">{user.name}</span>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
