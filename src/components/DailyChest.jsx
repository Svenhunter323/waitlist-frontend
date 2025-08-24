import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { chestApi } from '../api/endpoints'
import { Gift, Clock, Star } from 'lucide-react'
import { generateChestReward } from '../utils/rewards'
import Button from './Button'
import Card from './Card'
import ChestModal from './ChestModal'
import TelegramModal from './TelegramModal'
import Countdown from './Countdown'

const DailyChest = () => {
  const { user, dispatch } = useAuth()
  const [showChestModal, setShowChestModal] = useState(false)
  const [showTelegramModal, setShowTelegramModal] = useState(false)
  const [canOpen, setCanOpen] = useState(false)

  useEffect(() => {
    if (user?.nextChestAt) {
      const now = new Date()
      const nextChest = new Date(user.nextChestAt)
      setCanOpen(now >= nextChest)
    } else {
      setCanOpen(true) // First chest
    }
  }, [user?.nextChestAt])

  const handleOpenChest = () => {
    if (!user?.telegramVerified) {
      setShowTelegramModal(true)
      return
    }
    
    if (canOpen) {
      setShowChestModal(true)
    }
  }

  const handleChestOpened = async (reward) => {
    setShowChestModal(false)
    
    try {
      const result = await chestApi.openChest()
      dispatch({ 
        type: 'APPLY_REWARD', 
        payload: { 
          amount: result.amount || reward,
          nextChestAt: result.nextChestAt || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        }
      })
    } catch (error) {
      // Fallback to frontend logic
      const fallbackReward = generateChestReward(!user?.lastChestOpenAt)
      dispatch({ type: 'APPLY_REWARD', payload: { amount: fallbackReward, nextChestAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() } })
    }
  }

  const handleJoinTelegram = () => {
    setShowTelegramModal(false)
    dispatch({ type: 'SET_TELEGRAM_VERIFIED', payload: true })
  }

  if (!user || !user.emailVerified) return null

  return (
    <section className="py-20 px-6 bg-gray-950">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Star className="w-8 h-8 text-gold" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">Daily Chest</h2>
            <Star className="w-8 h-8 text-gold" />
          </div>
          <p className="text-xl text-gray-300">Open your daily chest to win amazing prizes!</p>
        </div>
        
        <Card className="max-w-md mx-auto bg-gradient-to-br from-gray-800 to-gray-700 border-gold border-opacity-20">
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <div className={`w-full h-full bg-gradient-to-br from-gold to-gold-600 rounded-2xl shadow-2xl flex items-center justify-center transform transition-all duration-300 ${
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
              <Button
                variant="gold"
                size="lg"
                onClick={handleOpenChest}
                className="w-full"
              >
                🎁 Open Daily Chest
              </Button>
              <p className="text-sm text-gray-600">
                {user.telegramVerified ? 'Click to open your chest!' : 'Join Telegram first to unlock'}
              </p>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <Button
                variant="secondary"
                size="lg"
                disabled
                className="w-full opacity-50"
              >
                Chest Already Opened
              </Button>
              <div className="flex items-center justify-center space-x-2 text-gray-300">
                <span className="text-sm">Next chest in</span>
                <Countdown 
                  targetDate={user.nextChestAt}
                  onComplete={() => setCanOpen(true)}
                />
              </div>
              <p className="text-sm text-gray-400">
                Come back tomorrow for another chance to win!
              </p>
            </div>
          )}
        </Card>

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