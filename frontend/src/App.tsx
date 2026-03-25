import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { ToastProvider } from '@/context/ToastContext'
import ToastContainer from '@/components/common/Toast'
import AppRoutes from '@/routes/AppRoutes'

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <ToastProvider>
        <AppRoutes />
        <ToastContainer />
      </ToastProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default App
