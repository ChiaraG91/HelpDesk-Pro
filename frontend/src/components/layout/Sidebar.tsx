import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/context/AuthContext'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const navItems = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    to: '/tickets',
    label: 'Ticket',
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    to: '/tickets/new',
    label: 'Nuovo Ticket',
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    to: '/profile',
    label: 'Profilo',
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
]

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const { user, logout } = useAuthContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 md:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full w-60 z-30 flex flex-col
        bg-[#0d1c2e] border-r border-[#1e3348]
        transition-transform duration-300 ease-in-out
        md:static md:translate-x-0 md:z-auto
        ${open ? 'translate-x-0' : '-translate-x-full'}
      `}>

        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-5 shrink-0 border-b border-[#1e3348]">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7ccad5]/30 to-[#7ccad5]/10 border border-[#7ccad5]/30 flex items-center justify-center shadow-inner">
            <svg className="w-4 h-4 text-[#7ccad5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-white tracking-tight">HelpDesk Pro</p>
            <p className="text-[10px] text-slate-600 font-medium tracking-wider uppercase">Support Center</p>
          </div>
        </div>

        {/* Nav label */}
        <div className="px-5 pt-5 pb-2">
          <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest">Navigazione</p>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-3 pb-3 space-y-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              end={item.to === '/dashboard'}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-[#7ccad5]/12 text-[#7ccad5]'
                    : 'text-slate-500 hover:bg-[#1a2e42]/60 hover:text-slate-300'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`shrink-0 transition-colors ${isActive ? 'text-[#7ccad5]' : 'text-slate-600 group-hover:text-slate-400'}`}>
                    {item.icon}
                  </span>
                  {item.label}
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#7ccad5] shrink-0" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Divider + User */}
        <div className="border-t border-[#1e3348] p-3 shrink-0 space-y-1">
          {user && (
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#e7c6ff]/30 to-[#e7c6ff]/10 border border-[#e7c6ff]/25 flex items-center justify-center text-[#e7c6ff] text-xs font-bold shrink-0 uppercase">
                {(user.name || user.username || 'U').charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-300 truncate">{user.name || user.username}</p>
                <p className="text-[10px] text-slate-600 truncate capitalize">{user.role}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-red-500/8 hover:text-red-400 transition-all duration-150 group"
          >
            <svg className="w-[18px] h-[18px] shrink-0 transition-colors group-hover:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
