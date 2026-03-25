import { Select } from '@/components/common'
import type { TicketFilters as Filters } from '@/types'

interface TicketFiltersProps {
  filters: Filters
  onChange: (filters: Filters) => void
}

const TicketFilters = ({ filters, onChange }: TicketFiltersProps) => {
  const update = (key: keyof Filters, value: string) => {
    onChange({ ...filters, [key]: value || undefined, page: 1 })
  }

  return (
    <div className="flex flex-wrap gap-3 items-end">
      <div className="w-40">
        <Select
          label="Stato"
          value={filters.status ?? ''}
          onChange={(e) => update('status', e.target.value)}
        >
          <option value="">Tutti</option>
          <option value="open">Aperto</option>
          <option value="in_progress">In lavorazione</option>
          <option value="resolved">Risolto</option>
          <option value="closed">Chiuso</option>
        </Select>
      </div>
      <div className="w-40">
        <Select
          label="Priorità"
          value={filters.priority ?? ''}
          onChange={(e) => update('priority', e.target.value)}
        >
          <option value="">Tutte</option>
          <option value="low">Bassa</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
          <option value="critical">Critica</option>
        </Select>
      </div>
      <div className="w-48">
        <Select
          label="Categoria"
          value={filters.category ?? ''}
          onChange={(e) => update('category', e.target.value)}
        >
          <option value="">Tutte</option>
          <option value="technical">Tecnico</option>
          <option value="billing">Fatturazione</option>
          <option value="general">Generale</option>
          <option value="other">Altro</option>
        </Select>
      </div>
      {(filters.status || filters.priority || filters.category) && (
        <button
          onClick={() => onChange({ page: 1, limit: filters.limit })}
          className="text-xs text-blue-600 hover:underline self-end pb-2"
        >
          Azzera filtri
        </button>
      )}
    </div>
  )
}

export default TicketFilters
