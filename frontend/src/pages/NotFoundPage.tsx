import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-300">404</h1>
        <p className="text-xl text-gray-600 mt-4">Pagina non trovata</p>
        <Link to="/" className="mt-6 inline-block text-blue-600 hover:underline">
          Torna alla home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
