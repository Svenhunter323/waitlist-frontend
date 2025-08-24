import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'
import Header from '../components/Header'
import DailyChest from '../components/DailyChest'
import ReferralSection from '../components/ReferralSection'

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  if (!user?.emailVerified) {
    return <Navigate to="/verify-email" replace />
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-950">
        <DailyChest />
        <ReferralSection />
      </div>
    </>
  )
}

export default Dashboard