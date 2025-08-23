import React from 'react'
import { useAppContext } from '../contexts/AppContext'
import Header from '../components/Header'
import UserStats from '../components/UserStats'
import DailyChest from '../components/DailyChest'
import ReferralSection from '../components/ReferralSection'
import FakeWinsFeed from '../components/FakeWinsFeed'
import Footer from '../components/Footer'
import EmailVerification from './EmailVerification'

const Dashboard = () => {
  const { user } = useAppContext()

  // If user exists but email is not verified, show verification page
  if (user && !user.emailVerified) {
    return <EmailVerification />
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <UserStats />
        <DailyChest />
        <ReferralSection />
        <FakeWinsFeed />
      </div>
      <Footer />
    </>
  )
}

export default Dashboard