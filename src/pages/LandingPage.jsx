import React from 'react'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import StatsSection from '../components/StatsSection'
import LatestWins from '../components/LatestWins'
import Leaderboard from '../components/Leaderboard'

const LandingPage = () => {
  return (
    <>
      <Header minimal />
      <HeroSection />
      <StatsSection />
      <LatestWins />
      <Leaderboard />
    </>
  )
}

export default LandingPage