import { useAuthContext } from '@/context/AuthContext'

const ProfilePage = () => {
  const { user } = useAuthContext()

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Profilo</h1>
        <p className="text-slate-400 text-sm mt-1">Informazioni account e impostazioni</p>
      </div>

      <div className="bg-[#111f30] border border-[#2d4060] rounded-xl p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-[#e7c6ff]/15 border border-[#e7c6ff]/25 flex items-center justify-center text-[#e7c6ff] text-2xl font-bold shrink-0">
          {user?.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">{user?.name}</h2>
          <p className="text-slate-400 text-sm">{user?.email}</p>
          <span className="inline-flex items-center mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#7ccad5]/15 text-[#7ccad5] border border-[#7ccad5]/25 capitalize">
            {user?.role}
          </span>
        </div>
      </div>

      <div className="bg-[#111f30] border border-[#2d4060] rounded-xl divide-y divide-[#1a2e42]">
        {[
          { label: 'Nome completo', value: user?.name },
          { label: 'Email', value: user?.email },
          { label: 'Ruolo', value: user?.role },
          { label: 'Membro dal', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('it-IT') : '—' },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between px-6 py-4">
            <span className="text-sm text-slate-500">{row.label}</span>
            <span className="text-sm text-slate-200 capitalize">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfilePage
