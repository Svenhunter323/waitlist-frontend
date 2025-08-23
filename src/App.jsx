import React from 'react'
import { useAppContext } from './contexts/AppContext'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  const { currentView } = useAppContext()

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />
      case 'admin':
        return <AdminDashboard />
      default:
        return <LandingPage />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {renderCurrentView()}
    </div>
  )
}

export default App