import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import MainLayout from '@/components/layout/MainLayout'

const HomePage = lazy(() => import('@/pages/HomePage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const TicketsPage = lazy(() => import('@/pages/TicketsPage'))
const TicketDetailPage = lazy(() => import('@/pages/TicketDetailPage'))
const CreateTicketPage = lazy(() => import('@/pages/CreateTicketPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

const Loader = () => (
  <div className="min-h-screen bg-[#0b1622] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[#7ccad5]/30 border-t-[#7ccad5] rounded-full animate-spin" />
  </div>
)

const AppRoutes = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {/* Pagine pubbliche */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Pagine protette */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/tickets/new" element={<CreateTicketPage />} />
          <Route path="/tickets/:id" element={<TicketDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
)

export default AppRoutes
