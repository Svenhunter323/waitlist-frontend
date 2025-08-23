import React, { useState, useEffect } from 'react'
import { useAppContext } from '../contexts/AppContext'
import { Gift, Clock, Star } from 'lucide-react'
import { canOpenChest, getNextChestTime } from '../utils/userUtils'
import ChestModal from './ChestModal'
import TelegramModal from './TelegramModal'

const DailyChest = () => {
  const { user, dispatch } = useAppContext()
  const [showChestModal, setShowChestModal] = useState(false)
  const [showTelegramModal, setShowTelegramModal] = useState(false)
  const [countdown, setCountdown] = useState('')

  const canOpen = canOpenChest(user?.lastChestOpen)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getNextChestTime(user?.lastChestOpen))
    }, 1000)

    return () => clearInterval(timer)
  }, [user?.lastChestOpen])

  const handleOpenChest = () => {
    if (!user?.hasJoinedTelegram) {
      setShowTelegramModal(true)
      return
    }
    
    if (canOpen) {
      setShowChestModal(true)
    }
  }

  const handleChestOpened = (reward) => {
    setShowChestModal(false)
    dispatch({ type: 'OPEN_CHEST' })
  }

  const handleJoinTelegram = () => {
    setShowTelegramModal(false)
    dispatch({ 
      type: 'UPDATE_USER', 
      payload: { hasJoinedTelegram: true } 
    })
  }

  if (!user || !user.emailVerified) return null

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gold-50 to-warning-50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Star className="w-8 h-8 text-gold-500" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">Daily Chest</h2>
            <Star className="w-8 h-8 text-gold-500" />
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300">Open your daily chest to win amazing prizes!</p>
        </div>
        
        <div className="card max-w-md mx-auto bg-gradient-to-br from-white to-gold-50 dark:from-gray-800 dark:to-gray-700 border-gold-200 dark:border-gray-600">
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <div className={`w-full h-full bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl shadow-2xl flex items-center justify-center transform transition-all duration-300 ${
              canOpen ? 'animate-float hover:scale-110 chest-glow cursor-pointer' : 'opacity-60'
            }`}>
              <Gift className="w-16 h-16 text-white drop-shadow-lg" />
            </div>
            {!canOpen && (
              <div className="absolute inset-0 bg-gray-900 bg-opacity-50 rounded-2xl flex items-center justify-center">
                <Clock className="w-8 h-8 text-white" />
              </div>
            )}
          </div>
          
          {canOpen ? (
            <div className="space-y-4">
              <button
                onClick={handleOpenChest}
                className="btn-warning text-lg px-8 py-4 w-full font-bold text-white shadow-xl"
              >
                🎁 Open Daily Chest
              </button>
              <p className="text-sm text-gray-600">
                {user.hasJoinedTelegram ? 'Click to open your chest!' : 'Join Telegram first to unlock'}
              </p>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <button
                disabled
                className="btn-secondary opacity-50 cursor-not-allowed text-lg px-8 py-4 w-full"
              >
                Chest Already Opened
              </button>
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span className="font-mono text-lg font-bold">Next chest in {countdown}</span>
              </div>
              <p className="text-sm text-gray-500">
                Come back tomorrow for another chance to win!
              </p>
            </div>
          )}
        </div>

        {showChestModal && (
          <ChestModal
            onClose={() => setShowChestModal(false)}
            onChestOpened={handleChestOpened}
          />
        )}

        {showTelegramModal && (
          <TelegramModal
            onClose={() => setShowTelegramModal(false)}
            onJoinTelegram={handleJoinTelegram}
          />
        )}
      </div>
    </section>
  )
}

export default DailyChest