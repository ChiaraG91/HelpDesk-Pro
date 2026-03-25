import { useNavigate } from 'react-router-dom'
import heroImg from '@/assets/hero.png'

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    title: 'Gestione Ticket',
    desc: 'Crea, assegna e monitora ogni richiesta di supporto in un unico posto. Filtra per stato, priorità e categoria.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Assistente AI',
    desc: 'Genera risposte automatiche, classifica i ticket e ottieni riassunti intelligenti grazie all\'integrazione AI.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: 'Commenti in Tempo Reale',
    desc: 'Collabora con il team tramite commenti interni ed esterni. Mantieni la comunicazione centralizzata.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Dashboard & Statistiche',
    desc: 'Monitora le performance del team con KPI in tempo reale. Visualizza distribuzione stati e ticket assegnati.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'Rotte Protette',
    desc: 'Autenticazione JWT integrata con rotte protette. Ogni operatore accede solo alle risorse autorizzate.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: 'Design Dark Professionale',
    desc: 'Interfaccia moderna con tema scuro, badge colorati e feedback visivi per una UX ottimale.',
  },
]

const stats = [
  { value: '15+', label: 'Ticket gestiti' },
  { value: '4', label: 'Operatori attivi' },
  { value: '99%', label: 'Uptime garantito' },
  { value: '< 2h', label: 'Tempo di risposta' },
]

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0b1622] text-slate-200">

      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0b1622]/80 backdrop-blur-md border-b border-[#2d4060]/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#7ccad5]/20 border border-[#7ccad5]/40 flex items-center justify-center">
              <svg className="w-4 h-4 text-[#7ccad5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <span className="text-base font-bold text-white">HelpDesk Pro</span>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-[#7ccad5] text-[#0b1622] text-sm font-semibold rounded-lg hover:bg-[#5ab5c2] transition-colors"
          >
            Accedi
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#7ccad5]/10 border border-[#7ccad5]/25 rounded-full text-[#7ccad5] text-xs font-medium">
                <span className="w-1.5 h-1.5 bg-[#7ccad5] rounded-full animate-pulse" />
                Piattaforma di supporto professionale
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                Gestisci il supporto{' '}
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #7ccad5, #e7c6ff)' }}>
                  in modo intelligente
                </span>
              </h1>

              <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
                HelpDesk Pro è la piattaforma completa per gestire ticket di supporto, collaborare con il team e offrire assistenza di qualità con il supporto dell'intelligenza artificiale.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center gap-2 px-6 py-3 bg-[#7ccad5] text-[#0b1622] font-semibold rounded-xl hover:bg-[#5ab5c2] transition-colors shadow-lg shadow-[#7ccad5]/20"
                >
                  Inizia ora
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="px-6 py-3 border border-[#2d4060] text-slate-300 font-semibold rounded-xl hover:bg-[#111f30] hover:border-[#415a77] transition-colors"
                >
                  Vedi demo
                </button>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-500">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Demo gratuita · Nessuna carta richiesta
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl opacity-20" style={{ background: 'radial-gradient(ellipse at center, #7ccad5 0%, transparent 70%)' }} />
              <div className="relative rounded-2xl overflow-hidden border border-[#2d4060] shadow-2xl shadow-black/50">
                <img
                  src={heroImg}
                  alt="Operatore al lavoro con HelpDesk Pro"
                  className="w-full h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0b1622 0%, transparent 50%)' }} />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-[#111f30]/90 backdrop-blur-sm border border-[#2d4060] rounded-xl px-4 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-200">Sistema operativo</p>
                      <p className="text-xs text-slate-500">Tutti i sistemi funzionanti</p>
                    </div>
                    <span className="ml-auto text-xs text-emerald-400 font-medium">Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 border-y border-[#2d4060]/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold text-white">{s.value}</p>
                <p className="text-sm text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Tutto quello che ti serve per il{' '}
              <span className="text-[#7ccad5]">supporto clienti</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Una piattaforma completa con tutti gli strumenti per gestire le richieste in modo efficiente e professionale.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="group bg-[#111f30] border border-[#2d4060] rounded-2xl p-6 hover:border-[#7ccad5]/40 hover:bg-[#111f30]/80 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#7ccad5]/10 border border-[#7ccad5]/20 flex items-center justify-center text-[#7ccad5] mb-4 group-hover:bg-[#7ccad5]/15 transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-[#2d4060] p-12 text-center"
            style={{ background: 'linear-gradient(135deg, #111f30 0%, #1a2e42 100%)' }}>
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #7ccad5, transparent 50%), radial-gradient(circle at 70% 50%, #e7c6ff, transparent 50%)' }} />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">Pronto a iniziare?</h2>
              <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                Accedi alla demo con le credenziali di prova e scopri tutte le funzionalità di HelpDesk Pro.
              </p>
              <button
                onClick={() => navigate('/login')}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#7ccad5] text-[#0b1622] font-bold rounded-xl hover:bg-[#5ab5c2] transition-colors shadow-lg shadow-[#7ccad5]/25 text-sm"
              >
                Accedi alla Demo
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <p className="text-xs text-slate-500 mt-4">
                Email: <span className="text-[#7ccad5]">admin@helpdesk.it</span> · Password: <span className="text-[#7ccad5]">admin123</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2d4060]/50 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#7ccad5]/20 border border-[#7ccad5]/30 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-[#7ccad5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-white">HelpDesk Pro</span>
          </div>
          <p className="text-xs text-slate-600">© 2026 HelpDesk Pro. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
