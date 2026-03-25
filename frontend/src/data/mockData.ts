import type { User, Ticket, Comment } from '@/types'

export const mockUsers: User[] = [
  { id: 'u1', name: 'Marco Rossi', email: 'marco.rossi@helpdesk.it', role: 'admin', createdAt: '2024-01-10T08:00:00Z' },
  { id: 'u2', name: 'Sara Bianchi', email: 'sara.bianchi@helpdesk.it', role: 'agent', createdAt: '2024-01-15T08:00:00Z' },
  { id: 'u3', name: 'Luca Ferrari', email: 'luca.ferrari@helpdesk.it', role: 'agent', createdAt: '2024-02-01T08:00:00Z' },
  { id: 'u4', name: 'Giulia Conti', email: 'giulia.conti@cliente.it', role: 'customer', createdAt: '2024-02-10T08:00:00Z' },
]

export const mockComments: Record<string, Comment[]> = {
  't1': [
    { id: 'c1', content: 'Ho verificato il problema, sembra legato alla sessione scaduta. Proviamo a forzare il logout e ri-accesso.', author: mockUsers[1], createdAt: '2024-03-10T10:30:00Z', isInternal: false },
    { id: 'c2', content: 'Note interne: possibile bug nel middleware JWT. Aprire issue su GitHub.', author: mockUsers[0], createdAt: '2024-03-10T11:00:00Z', isInternal: true },
    { id: 'c3', content: 'Ho provato come suggerito ma il problema persiste. Uso Chrome 122.', author: mockUsers[3], createdAt: '2024-03-10T14:00:00Z', isInternal: false },
  ],
  't3': [
    { id: 'c4', content: 'Fattura verificata nel sistema. Risulta emessa correttamente il 28/02. Invio copia via email.', author: mockUsers[1], createdAt: '2024-03-08T09:15:00Z', isInternal: false },
    { id: 'c5', content: 'Email inviata con allegato PDF. Ticket da chiudere se il cliente conferma la ricezione.', author: mockUsers[1], createdAt: '2024-03-08T09:20:00Z', isInternal: true },
  ],
  't7': [
    { id: 'c6', content: 'Prendo in carico. Verifico la configurazione del server di posta.', author: mockUsers[2], createdAt: '2024-03-12T16:00:00Z', isInternal: false },
  ],
}

export const mockTickets: Ticket[] = [
  {
    id: 't1', title: 'Impossibile effettuare il login', description: 'Dopo l\'aggiornamento di ieri sera non riesco più ad accedere al portale. Il sistema mostra "Errore 401 - Token non valido" dopo aver inserito le credenziali corrette.', status: 'in_progress', priority: 'high', category: 'technical', createdBy: mockUsers[3], assignedTo: mockUsers[1], createdAt: '2024-03-10T09:00:00Z', updatedAt: '2024-03-10T11:00:00Z', comments: mockComments['t1'],
  },
  {
    id: 't2', title: 'Richiesta aggiunta nuovo utente amministratore', description: 'È necessario creare un account amministratore per il nuovo responsabile IT, dott. Alberto Mancini. Email: alberto.mancini@azienda.it', status: 'open', priority: 'medium', category: 'general', createdBy: mockUsers[3], assignedTo: mockUsers[0], createdAt: '2024-03-11T10:00:00Z', updatedAt: '2024-03-11T10:00:00Z', comments: [],
  },
  {
    id: 't3', title: 'Fattura di febbraio non ricevuta', description: 'Non ho ricevuto la fattura relativa al mese di febbraio. Tutti gli altri mesi sono regolari. Ho controllato anche nello spam ma non c\'è nulla.', status: 'resolved', priority: 'low', category: 'billing', createdBy: mockUsers[3], assignedTo: mockUsers[1], createdAt: '2024-03-08T08:30:00Z', updatedAt: '2024-03-08T09:30:00Z', comments: mockComments['t3'],
  },
  {
    id: 't4', title: 'Sistema CRM non sincronizzato con ERP', description: 'I dati dei clienti nel CRM non si aggiornano più con il gestionale ERP. L\'ultima sincronizzazione riuscita risale a 3 giorni fa. Questo sta causando disallineamenti nelle anagrafiche.', status: 'open', priority: 'critical', category: 'technical', createdBy: mockUsers[3], createdAt: '2024-03-13T07:45:00Z', updatedAt: '2024-03-13T07:45:00Z', comments: [],
  },
  {
    id: 't5', title: 'Dashboard lenta con molti dati', description: 'La dashboard principale impiega più di 30 secondi a caricare quando ci sono più di 1000 ticket nel sistema. Necessario ottimizzare le query.', status: 'in_progress', priority: 'medium', category: 'technical', createdBy: mockUsers[1], assignedTo: mockUsers[2], createdAt: '2024-03-09T14:00:00Z', updatedAt: '2024-03-12T10:00:00Z', comments: [],
  },
  {
    id: 't6', title: 'Richiesta upgrade piano abbonamento', description: 'Vorremmo passare dal piano Basic al piano Professional. Ci servono le opzioni disponibili e i relativi prezzi aggiornati.', status: 'open', priority: 'low', category: 'billing', createdBy: mockUsers[3], createdAt: '2024-03-12T11:30:00Z', updatedAt: '2024-03-12T11:30:00Z', comments: [],
  },
  {
    id: 't7', title: 'Email di notifica non inviate', description: 'Da questa mattina le notifiche via email per i nuovi ticket non vengono più inviate. Gli utenti non ricevono conferma delle loro richieste.', status: 'in_progress', priority: 'high', category: 'technical', createdBy: mockUsers[0], assignedTo: mockUsers[2], createdAt: '2024-03-13T12:00:00Z', updatedAt: '2024-03-13T16:00:00Z', comments: mockComments['t7'],
  },
  {
    id: 't8', title: 'Errore esportazione report CSV', description: 'Quando esporto il report mensile in formato CSV, il file risulta vuoto o corrotto. Il problema si verifica solo con i report che superano le 500 righe.', status: 'open', priority: 'medium', category: 'technical', createdBy: mockUsers[3], createdAt: '2024-03-11T15:00:00Z', updatedAt: '2024-03-11T15:00:00Z', comments: [],
  },
  {
    id: 't9', title: 'Formazione utilizzo nuovo modulo ticket', description: 'Il team commerciale ha bisogno di una sessione di formazione sul nuovo modulo di gestione ticket introdotto nell\'ultimo aggiornamento.', status: 'resolved', priority: 'low', category: 'general', createdBy: mockUsers[3], assignedTo: mockUsers[0], createdAt: '2024-03-05T09:00:00Z', updatedAt: '2024-03-07T17:00:00Z', comments: [],
  },
  {
    id: 't10', title: 'Permessi insufficienti per utente operatore', description: 'L\'utente mario.verdi@azienda.it non riesce ad accedere alla sezione "Report Avanzati" nonostante abbia il ruolo Operatore assegnato.', status: 'closed', priority: 'medium', category: 'technical', createdBy: mockUsers[1], assignedTo: mockUsers[0], createdAt: '2024-03-01T10:00:00Z', updatedAt: '2024-03-04T16:00:00Z', comments: [],
  },
  {
    id: 't11', title: 'Doppio addebito su carta di credito', description: 'Ho riscontrato un doppio addebito sul mio estratto conto per il mese di marzo. Importo addebitato due volte: €89.00 in data 01/03 e 02/03.', status: 'open', priority: 'critical', category: 'billing', createdBy: mockUsers[3], createdAt: '2024-03-13T08:00:00Z', updatedAt: '2024-03-13T08:00:00Z', comments: [],
  },
  {
    id: 't12', title: 'Integrazione con Slack non funzionante', description: 'Il webhook di notifica verso il canale Slack #support non invia più messaggi. Ho verificato che il token di integrazione è ancora valido.', status: 'in_progress', priority: 'medium', category: 'technical', createdBy: mockUsers[2], assignedTo: mockUsers[2], createdAt: '2024-03-12T09:00:00Z', updatedAt: '2024-03-13T10:00:00Z', comments: [],
  },
  {
    id: 't13', title: 'Richiesta cambio indirizzo di fatturazione', description: 'La nostra azienda ha cambiato sede. È necessario aggiornare l\'indirizzo di fatturazione a: Via Roma 15, 20100 Milano (MI).', status: 'resolved', priority: 'low', category: 'billing', createdBy: mockUsers[3], assignedTo: mockUsers[1], createdAt: '2024-03-06T14:00:00Z', updatedAt: '2024-03-07T09:00:00Z', comments: [],
  },
  {
    id: 't14', title: 'App mobile crash all\'avvio su iOS 17', description: 'L\'applicazione mobile va in crash immediatamente all\'avvio su dispositivi con iOS 17.4. Il problema è stato segnalato da 12 utenti nelle ultime 24 ore.', status: 'open', priority: 'critical', category: 'technical', createdBy: mockUsers[3], createdAt: '2024-03-13T06:30:00Z', updatedAt: '2024-03-13T06:30:00Z', comments: [],
  },
  {
    id: 't15', title: 'Domanda sulla politica di rimborso', description: 'Vorrei sapere quali sono le condizioni per richiedere un rimborso nel caso in cui decidessi di disdire l\'abbonamento prima della scadenza annuale.', status: 'closed', priority: 'low', category: 'general', createdBy: mockUsers[3], assignedTo: mockUsers[1], createdAt: '2024-02-28T11:00:00Z', updatedAt: '2024-03-01T10:00:00Z', comments: [],
  },
]

export const mockAiReplies: Record<string, string> = {
  technical: `Gentile utente,\n\nGrazie per averci contattato. Ho analizzato il problema segnalato e sono lieto di fornirle assistenza.\n\nIn base alle informazioni ricevute, ti suggerisco di:\n1. Cancellare la cache del browser e i cookie di sessione\n2. Verificare che non ci siano estensioni che bloccano le richieste\n3. Provare con una finestra di navigazione in incognito\n\nSe il problema persiste, non esiti a ricontattarci con eventuali messaggi di errore visibili.\n\nCordiali saluti,\nTeam HelpDesk Pro`,
  billing: `Gentile cliente,\n\nGrazie per averci contattato riguardo alla sua richiesta di fatturazione.\n\nAbbiamo verificato il suo account e provvederemo a risolvere la problematica nel più breve tempo possibile. Riceverà una conferma via email entro 24 ore lavorative.\n\nPer qualsiasi altra informazione, il nostro team è a sua disposizione.\n\nDistinti saluti,\nUfficio Amministrazione HelpDesk Pro`,
  general: `Gentile utente,\n\nGrazie per averci contattato.\n\nAbbiamo preso in carico la sua richiesta e un nostro operatore la esaminerà nelle prossime ore. La contatteremo via email non appena avremo aggiornamenti.\n\nSiamo a sua disposizione per ulteriori chiarimenti.\n\nCordiali saluti,\nTeam HelpDesk Pro`,
}

export const mockAiClassify = (title: string): { category: string; priority: string } => {
  const t = title.toLowerCase()
  if (t.includes('fattura') || t.includes('pagamento') || t.includes('addebito') || t.includes('rimborso')) return { category: 'billing', priority: 'high' }
  if (t.includes('crash') || t.includes('errore') || t.includes('non funzion') || t.includes('lento')) return { category: 'technical', priority: 'high' }
  if (t.includes('formazione') || t.includes('richiesta') || t.includes('domanda')) return { category: 'general', priority: 'low' }
  return { category: 'technical', priority: 'medium' }
}

export const mockAiSummary = (ticket: Ticket): string => {
  return `Il ticket "${ticket.title}" è stato aperto da ${ticket.createdBy.name} il ${new Date(ticket.createdAt).toLocaleDateString('it-IT')}. Stato attuale: ${ticket.status}. Priorità: ${ticket.priority}. Categoria: ${ticket.category}. ${ticket.comments && ticket.comments.length > 0 ? `Sono presenti ${ticket.comments.length} commenti. Ultimo aggiornamento: ${new Date(ticket.updatedAt).toLocaleDateString('it-IT')}.` : 'Nessun commento ancora.'}`
}
