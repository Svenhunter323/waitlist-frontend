import React, { useState, useEffect } from 'react'
import { useApi } from '../hooks/useApi'
import { winsApi } from '../api/endpoints'
import { Trophy, DollarSign, Zap, Crown } from 'lucide-react'
import { formatCurrency } from '../utils/userUtils'
import { generateFakeWin } from '../utils/mockData'
import { motion } from 'framer-motion';


const FakeWinsFeed = () => {
  const [wins, setWins] = useState([])
  const { execute } = useApi()

  useEffect(() => {
    // Load initial wins from API
    const loadWins = async () => {
      try {
        const result = await execute(() => winsApi.getLastWins(8))
        if (result.success) {
          setWins(result.wins)
        }
      } catch (error) {
        // Fallback to mock data
        const initialWins = Array.from({ length: 8 }, generateFakeWin)
        setWins(initialWins)
      }
    }

    loadWins()

    // Add new wins periodically
    const interval = setInterval(() => {
      const newWin = generateFakeWin()
      setWins(prevWins => [newWin, ...prevWins.slice(0, 11)]) // Keep only 12 wins
    }, 2000 + Math.random() * 3000) // Random interval between 2-5 seconds

    return () => clearInterval(interval)
  }, [execute])

  const getWinIcon = (type, amount) => {
    if (type === 'jackpot' || amount > 1000) {
      return <Crown className="w-5 h-5 text-gold-500" />
    } else if (amount > 500) {
      return <Zap className="w-5 h-5 text-warning-500" />
    } else {
      return <Trophy className="w-5 h-5 text-success-600" />
    }
  }

  const getWinStyle = (type, amount) => {
    if (type === 'jackpot' || amount > 1000) {
      return 'ring-2 ring-gold-200 dark:ring-gold-600 bg-gradient-to-r from-gold-50 to-warning-50 dark:from-gold-900/20 dark:to-warning-900/20'
    } else if (amount > 500) {
      return 'ring-2 ring-warning-200 dark:ring-warning-600 bg-warning-50 dark:bg-warning-900/20'
    } else {
      return 'bg-white dark:bg-gray-800'
    }
  }

  return (
    <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">Live Wins</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">See what others are winning right now!</p>
        </div>

        <div className="card bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800">
          <div className="space-y-3 max-h-96 overflow-hidden">
            {wins.map((win, index) => (
              <motion.div
                key={win.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`flex items-center justify-between p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 transition-all duration-300 ${
                  getWinStyle(win.type, win.amount)
                } ${index === 0 ? 'animate-glow' : ''}`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center">
                    {getWinIcon(win.type, win.amount)}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800 dark:text-white">{win.username}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {win.type === 'jackpot' ? 'hit the jackpot!' : 'opened a chest'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-success-600" />
                  <span className={`text-xl font-bold ${
                    win.amount > 1000 ? 'text-gold-600' : 
                    win.amount > 500 ? 'text-warning-600' : 'text-success-600'
                  }`}>
                    {formatCurrency(win.amount)}
                  </span>
                  {win.type === 'jackpot' && (
                    <span className="text-xs bg-gold-500 text-white px-2 py-1 rounded-full font-bold">
                      JACKPOT
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          {wins.length === 0 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <Trophy className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Wins will appear here...</p>
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 dark:text-gray-300">
            <span className="font-bold text-success-600">{wins.length}</span> recent wins • 
            Updates every few seconds
          </p>
        </div>
      </div>
    </section>
  )
}

export default FakeWinsFeed