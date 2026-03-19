import { useParams } from 'react-router-dom'

const TicketDetailPage = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800">Ticket #{id}</h1>
      <p className="text-gray-500 mt-2">Dettaglio ticket</p>
    </div>
  )
}

export default TicketDetailPage
