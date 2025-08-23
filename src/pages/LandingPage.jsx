import React from 'react'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import StatsSection from '../components/StatsSection'
import FakeWinsFeed from '../components/FakeWinsFeed'
import TelegramSection from '../components/TelegramSection'
import Footer from '../components/Footer'

const LandingPage = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <StatsSection />
      <FakeWinsFeed />
      <TelegramSection />
      <Footer />
    </>
  )
}

export default LandingPage