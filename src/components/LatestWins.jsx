import React, { useState, useEffect } from 'react'
import { Trophy, DollarSign } from 'lucide-react'
import { formatCurrency } from '../utils/rewards'
import { fakeWinsGenerator } from '../utils/fakeWins'
import { motion, AnimatePresence } from 'framer-motion'
import Card from './Card'

const LatestWins = () => {
  const [wins, setWins] = useState([])

  useEffect(() => {
    // Generate initial wins
    const initialWins = Array.from({ length: 24 }, () => fakeWinsGenerator.generateWin())
    setWins(initialWins)

    // Set up dynamic win generation
    const scheduleNextWin = () => {
      const delay = fakeWinsGenerator.getNextDelay()
      setTimeout(() => {
        const newWin = fakeWinsGenerator.generateWin()
        setWins(prevWins => [newWin, ...prevWins.slice(0, 23)]) // Keep only 24 wins
        scheduleNextWin()
      }, delay)
    }

    scheduleNextWin()
  }, [])

  const getWinStyle = (amount) => {
    if (amount >= 10000) {
      return 'ring-2 ring-gold border-gold bg-gradient-to-r from-gold bg-opacity-10 to-yellow-600 bg-opacity-10'
    } else if (amount >= 2000) {
      return 'ring-2 ring-purple-400 border-purple-400 bg-purple-600 bg-opacity-10'
    } else if (amount >= 100) {
      return 'ring-1 ring-success-400 border-success-400 bg-success-600 bg-opacity-10'
    }
    return 'border-gray-700'
  }

  const getAmountColor = (amount) => {
    if (amount >= 10000) return 'text-gold'
    if (amount >= 2000) return 'text-purple-400'
    if (amount >= 100) return 'text-success-400'
    return 'text-gray-300'
  }

  return (
    <section className="py-20 px-6 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Latest Chest Wins</h2>
          <p className="text-xl text-gray-300">See what others are winning right now!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {wins.map((win, index) => (
              <motion.div
                key={win.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  getWinStyle(win.amount)
                } ${index === 0 ? 'animate-pulse' : ''}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-brand to-gold rounded-full flex items-center justify-center">
                      <Trophy className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-white text-sm truncate">
                      {win.username}
                    </span>
                  </div>
                  {win.amount >= 10000 && (
                    <span className="text-xs bg-gold text-gray-900 px-2 py-1 rounded-full font-bold">
                      MEGA
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">opened chest</span>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4 text-success-400" />
                    <span className={`font-bold ${getAmountColor(win.amount)}`}>
                      {formatCurrency(win.amount)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-400">
            Updates in real-time • <span className="font-bold text-success-400">{wins.length}</span> recent wins
          </p>
        </div>
      </div>
    </section>
  )
}

export default LatestWins