import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import DailyChest from './components/DailyChest'
import FakeWinsFeed from './components/FakeWinsFeed'
import Footer from './components/Footer'
import { useLocalStorage } from './hooks/useLocalStorage'
import { createUser } from './utils/userUtils'

function App() {
  const [user, setUser] = useLocalStorage('zoggy_user', null)
  const [totalUsers, setTotalUsers] = useState(9327)

  const handleSignup = (email, referralCode = null) => {
    const newUser = createUser(email, referralCode)
    setUser(newUser)
    setTotalUsers(prev => prev + 1)
  }

  const handleOpenChest = () => {
    if (user) {
      const updatedUser = {
        ...user,
        lastChestOpen: new Date().toISOString(),
        credits: user.credits + Math.floor(Math.random() * 100) + 1
      }
      setUser(updatedUser)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {!user ? (
        <HeroSection 
          totalUsers={totalUsers} 
          onSignup={handleSignup} 
        />
      ) : (
        <>
          <HeroSection 
            totalUsers={totalUsers} 
            onSignup={handleSignup}
            user={user}
          />
          <DailyChest 
            user={user} 
            onOpenChest={handleOpenChest} 
          />
        </>
      )}
      
      <FakeWinsFeed />
      <Footer />
    </div>
  )
}

export default App