import React from 'react'
import { useAppContext } from './contexts/AppContext'
import ErrorBoundary from './components/ErrorBoundary'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import EmailVerification from './pages/EmailVerification'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  const { currentView } = useAppContext()

  console.log(currentView);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />
      case 'email-verification':
        return <EmailVerification />
      case 'admin':
        return <AdminDashboard />
      default:
        return <LandingPage />
    }
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        {renderCurrentView()}
      </div>
    </ErrorBoundary>
  )
}

export default App