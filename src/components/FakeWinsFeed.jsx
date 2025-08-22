import React, { useState, useEffect } from 'react'
import { Trophy, DollarSign } from 'lucide-react'
import { formatCurrency } from '../utils/userUtils'

const FakeWinsFeed = () => {
  const [wins, setWins] = useState([])

  const usernames = [
    'CryptoWolf', 'DiamondHands', 'MoonRider', 'GoldRush', 'LuckyStrike',
    'CoinMaster', 'WinnerTakesAll', 'FortuneSeeker', 'JackpotJoe', 'PrizeFighter',
    'MoneyMaker', 'BigWinner', 'CashKing', 'LootLegend', 'TreasureHunter',
    'RichRider', 'GoldDigger', 'CoinCollector', 'WealthWizard', 'ProfitPro'
  ]

  const generateWin = () => {
    const username = usernames[Math.floor(Math.random() * usernames.length)]
    const amount = Math.floor(Math.random() * 500) + 10 // $10-$510
    const id = Date.now() + Math.random()
    
    return {
      id,
      username,
      amount,
      timestamp: new Date()
    }
  }

  useEffect(() => {
    // Initialize with some wins
    const initialWins = Array.from({ length: 5 }, generateWin)
    setWins(initialWins)

    // Add new wins periodically
    const interval = setInterval(() => {
      const newWin = generateWin()
      setWins(prevWins => [newWin, ...prevWins.slice(0, 9)]) // Keep only 10 wins
    }, 3000 + Math.random() * 4000) // Random interval between 3-7 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Recent Wins</h2>
          <p className="text-xl text-gray-600">See what others are winning right now!</p>
        </div>

        <div className="card bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="space-y-4 max-h-96 overflow-hidden">
            {wins.map((win, index) => (
              <div
                key={win.id}
                className={`flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 animate-slide-up ${
                  index === 0 ? 'ring-2 ring-success-200 bg-success-50' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{win.username}</p>
                    <p className="text-sm text-gray-500">just unboxed</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-success-600" />
                  <span className="text-xl font-bold text-success-600">
                    {formatCurrency(win.amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {wins.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Wins will appear here...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default FakeWinsFeed