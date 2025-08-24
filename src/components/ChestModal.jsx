import React, { useState } from 'react'
import { generateChestReward, formatCurrency } from '../utils/rewards'
import { X, Gift, Share2, Trophy, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from './Button'

const ChestModal = ({ onClose, onChestOpened }) => {
  const [isOpening, setIsOpening] = useState(false)
  const [prize, setPrize] = useState(null)
  const [showPrize, setShowPrize] = useState(false)

  const openChest = async () => {
    setIsOpening(true)
    
    // Simulate chest opening animation delay
    setTimeout(() => {
      const prizeAmount = generateChestReward()
      setPrize(prizeAmount)
      setShowPrize(true)
      setIsOpening(false)
      onChestOpened(prizeAmount)
    }, 3000)
  }

  const shareOnTwitter = () => {
    if (prize) {
      const tweetText = `🎉 I just opened a chest on @Zoggy and unboxed ${formatCurrency(prize)}! 💰🔥 Join the waitlist and try your luck: ${window.location.origin}`
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
      window.open(twitterUrl, '_blank')
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          className="bg-gray-800 rounded-2xl p-8 max-w-md w-full text-center relative shadow-2xl border border-gray-700"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {!showPrize ? (
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Daily Chest</h2>
              
              <div className="mb-8">
                <motion.div
                  animate={isOpening ? { 
                    rotateY: [0, 180, 360, 540, 720],
                    scale: [1, 1.3, 1.1, 1.3, 1],
                    rotateZ: [0, 10, -10, 5, 0]
                  } : {}}
                  transition={{ duration: 3, ease: "easeInOut" }}
                  className="w-32 h-32 mx-auto bg-gradient-to-br from-gold to-gold-600 rounded-2xl shadow-2xl flex items-center justify-center chest-glow"
                >
                  <Gift className="w-16 h-16 text-white drop-shadow-lg" />
                </motion.div>
              </div>

              {!isOpening ? (
                <div className="space-y-4">
                  <p className="text-gray-300 mb-6">
                    Ready to discover what's inside your daily chest?
                  </p>
                  <Button
                    variant="gold"
                    size="lg"
                    onClick={openChest}
                    className="w-full"
                  >
                    🎁 Open Chest
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-lg text-gray-300 font-semibold">
                    Opening chest...
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Sparkles className="w-6 h-6 text-gold animate-spin" />
                    <div className="w-8 h-8 border-4 border-gold border-opacity-20 border-t-gold rounded-full animate-spin"></div>
                    <Sparkles className="w-6 h-6 text-gold animate-spin" />
                  </div>
                  <p className="text-sm text-gray-400">
                    Calculating your reward...
                  </p>
                </div>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="space-y-6"
            >
              <div className="text-6xl animate-bounce-slow">🎉</div>
              <div className="flex items-center justify-center space-x-2">
                <Trophy className="w-8 h-8 text-gold" />
                <h2 className="text-3xl font-bold text-success-400">Congratulations!</h2>
              </div>
              <div className="bg-gradient-to-r from-gold bg-opacity-10 to-gold bg-opacity-20 rounded-xl p-6 border-2 border-gold border-opacity-30">
                <p className="text-lg text-gray-300 mb-2">You unboxed</p>
                <p className="text-5xl font-bold text-gold mb-2">{formatCurrency(prize)}</p>
                <p className="text-sm text-gray-400">Added to your credits balance</p>
              </div>
              
              <div className="flex space-x-4">
                <Button
                  variant="secondary"
                  onClick={onClose}
                  className="flex-1"
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={shareOnTwitter}
                  className="flex-1 flex items-center justify-center space-x-2"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Flex on Twitter</span>
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default ChestModal