import React, { useState, useEffect } from 'react'
import { Trophy, Crown, Medal, Award } from 'lucide-react'
import { formatCurrency } from '../utils/rewards'
import { leaderboardApi } from '../api/endpoints'
import Card from './Card'

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)

  // Fixed prize tiers
  const prizeTiers = [
    { position: 1, prize: 10000, icon: Crown, color: 'text-gold' },
    { position: 2, prize: 5000, icon: Trophy, color: 'text-gray-300' },
    { position: 3, prize: 2500, icon: Medal, color: 'text-amber-600' },
    { position: 4, prize: 1000, icon: Award, color: 'text-blue-400' },
    { position: 5, prize: 500, icon: Award, color: 'text-green-400' },
    { position: 6, prize: 250, icon: Award, color: 'text-purple-400' },
    { position: 7, prize: 100, icon: Award, color: 'text-pink-400' },
    { position: 8, prize: 50, icon: Award, color: 'text-indigo-400' },
    { position: 9, prize: 25, icon: Award, color: 'text-red-400' },
    { position: 10, prize: 10, icon: Award, color: 'text-orange-400' }
  ]

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await leaderboardApi.getTop10()
        setLeaderboard(data)
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error)
        // Fallback to mock data
        setLeaderboard([
          { position: 1, username: 'CryptoKing***', referrals: 247 },
          { position: 2, username: 'DiamondHands***', referrals: 189 },
          { position: 3, username: 'MoonWalker***', referrals: 156 },
          { position: 4, username: 'BitcoinBull***', referrals: 134 },
          { position: 5, username: 'EthereumElite***', referrals: 98 },
          { position: 6, username: 'SatoshiSon***', referrals: 87 },
          { position: 7, username: 'BlockchainBoss***', referrals: 76 },
          { position: 8, username: 'CoinMaster***', referrals: 65 },
          { position: 9, username: 'TokenTitan***', referrals: 54 },
          { position: 10, username: 'DeFiDegen***', referrals: 43 }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  const getRankIcon = (position) => {
    const tier = prizeTiers.find(t => t.position === position)
    if (!tier) return Award
    return tier.icon
  }

  const getRankColor = (position) => {
    const tier = prizeTiers.find(t => t.position === position)
    if (!tier) return 'text-gray-400'
    return tier.color
  }

  const getPrize = (position) => {
    const tier = prizeTiers.find(t => t.position === position)
    return tier ? tier.prize : 0
  }

  if (loading) {
    return (
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Referral Leaderboard</h2>
            <p className="text-xl text-gray-300">Top referrers win big prizes!</p>
          </div>
          <Card className="animate-pulse">
            <div className="space-y-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="h-16 bg-gray-700 rounded"></div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-6 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Referral Leaderboard</h2>
          <p className="text-xl text-gray-300">Top referrers win big prizes!</p>
        </div>

        <Card className="overflow-hidden">
          <div className="space-y-2">
            {leaderboard.map((entry, index) => {
              const IconComponent = getRankIcon(entry.position)
              const rankColor = getRankColor(entry.position)
              const prize = getPrize(entry.position)
              
              return (
                <div
                  key={entry.position}
                  className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
                    entry.position <= 3 
                      ? 'bg-gradient-to-r from-gray-700 to-gray-600 border border-gray-500' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      entry.position === 1 ? 'bg-gold bg-opacity-20' :
                      entry.position === 2 ? 'bg-gray-400 bg-opacity-20' :
                      entry.position === 3 ? 'bg-amber-600 bg-opacity-20' :
                      'bg-gray-600'
                    }`}>
                      <IconComponent className={`w-5 h-5 ${rankColor}`} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white">#{entry.position}</span>
                        <span className="text-gray-300">{entry.username}</span>
                      </div>
                      <p className="text-sm text-gray-400">{entry.referrals} referrals</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className={`text-xl font-bold ${rankColor}`}>
                      {formatCurrency(prize)}
                    </p>
                    <p className="text-xs text-gray-400">prize</p>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        <div className="mt-8 text-center">
          <Card className="bg-brand bg-opacity-10 border-brand">
            <h3 className="text-lg font-bold text-white mb-2">Eligibility Rules</h3>
            <div className="text-sm text-gray-300 space-y-1">
              <p>• Must have verified email and joined Telegram</p>
              <p>• Referrals must complete email verification</p>
              <p>• Prizes distributed at campaign end</p>
              <p>• Updated every 24 hours</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Leaderboard