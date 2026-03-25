export const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export const formatDateTime = (dateStr: string): string => {
  return new Date(dateStr).toLocaleString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const formatRelative = (dateStr: string): string => {
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'adesso'
  if (minutes < 60) return `${minutes} min fa`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} ore fa`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} giorni fa`
  return formatDate(dateStr)
}
