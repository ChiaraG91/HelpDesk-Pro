import type { Comment } from '@/types'

interface CommentListProps {
  comments: Comment[]
  loading?: boolean
}

const CommentList = ({ comments, loading }: CommentListProps) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-3 animate-pulse">
            <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />
            <div className="flex-1">
              <div className="h-3 bg-gray-200 rounded w-24 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-full mb-1" />
              <div className="h-3 bg-gray-100 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (comments.length === 0) {
    return (
      <p className="text-sm text-gray-400 text-center py-6">Nessun commento ancora.</p>
    )
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold shrink-0">
            {comment.author.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-gray-800">{comment.author.name}</span>
              {comment.isInternal && (
                <span className="text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded">
                  Interno
                </span>
              )}
              <span className="text-xs text-gray-400">
                {new Date(comment.createdAt).toLocaleString('it-IT')}
              </span>
            </div>
            <p className="text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2">
              {comment.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CommentList
