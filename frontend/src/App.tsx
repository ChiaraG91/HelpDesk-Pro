import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { ToastProvider } from '@/context/ToastContext'
import { TicketProvider } from '@/context/TicketContext'
import ToastContainer from '@/components/common/Toast'
import AppRoutes from '@/routes/AppRoutes'

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <TicketProvider>
        <ToastProvider>
          <AppRoutes />
          <ToastContainer />
        </ToastProvider>
      </TicketProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default App
