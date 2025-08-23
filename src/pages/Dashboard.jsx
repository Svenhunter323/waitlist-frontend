import React from 'react'
import Header from '../components/Header'
import UserStats from '../components/UserStats'
import DailyChest from '../components/DailyChest'
import ReferralSection from '../components/ReferralSection'
import FakeWinsFeed from '../components/FakeWinsFeed'
import Footer from '../components/Footer'

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
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