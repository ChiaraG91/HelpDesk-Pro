import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'

const LoginPage = lazy(() => import('@/pages/LoginPage'))
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const TicketsPage = lazy(() => import('@/pages/TicketsPage'))
const TicketDetailPage = lazy(() => import('@/pages/TicketDetailPage'))
const NewTicketPage = lazy(() => import('@/pages/NewTicketPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

const Loader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
  </div>
)

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
)

const router = createBrowserRouter([
  {
    path: '/login',
    element: withSuspense(LoginPage),
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: withSuspense(DashboardPage),
      },
      {
        path: 'tickets',
        element: withSuspense(TicketsPage),
      },
      {
        path: 'tickets/new',
        element: withSuspense(NewTicketPage),
      },
      {
        path: 'tickets/:id',
        element: withSuspense(TicketDetailPage),
      },
      {
        path: 'profile',
        element: withSuspense(ProfilePage),
      },
    ],
  },
  {
    path: '*',
    element: withSuspense(NotFoundPage),
  },
])

export default router
