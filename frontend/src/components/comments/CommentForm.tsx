import { useState, FormEvent } from 'react'
import { Textarea, Button } from '@/components/common'

interface CommentFormProps {
  onSubmit: (content: string, isInternal: boolean) => Promise<void>
  loading?: boolean
}

const CommentForm = ({ onSubmit, loading = false }: CommentFormProps) => {
  const [content, setContent] = useState('')
  const [isInternal, setIsInternal] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!content.trim()) {
      setError('Il commento non può essere vuoto')
      return
    }
    setError('')
    await onSubmit(content.trim(), isInternal)
    setContent('')
    setIsInternal(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Textarea
        label="Aggiungi commento"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Scrivi un commento..."
        rows={3}
        error={error}
      />
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isInternal}
            onChange={(e) => setIsInternal(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600">Nota interna</span>
        </label>
        <Button type="submit" size="sm" loading={loading} disabled={!content.trim()}>
          Invia
        </Button>
      </div>
    </form>
  )
}

export default CommentForm
