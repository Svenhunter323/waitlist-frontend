import React, { useState } from 'react'
import { X, Gift, Share2, Trophy } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { formatCurrency } from '../utils/userUtils'

const ChestModal = ({ onClose, onChestOpened }) => {
  const [isOpening, setIsOpening] = useState(false)
  const [prize, setPrize] = useState(null)
  const [showPrize, setShowPrize] = useState(false)

  const openChest = () => {
    setIsOpening(true)
    
    // Simulate chest opening animation
    setTimeout(() => {
      const prizeAmount = Math.floor(Math.random() * 1000) + 1 // $1-$1000
      setPrize(prizeAmount)
      setShowPrize(true)
      setIsOpening(false)
    }, 2500)
  }

  const handleClose = () => {
    if (prize) {
      onChestOpened()
    }
    onClose()
  }

  const shareOnTwitter = () => {
    if (prize) {
      const tweetText = `🎉 I just opened a chest on @Zoggy and unboxed ${formatCurrency(prize)}! 💰🔥 Join the waitlist and try your luck: https://zoggybet.com`
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
      window.open(twitterUrl, '_blank')
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full text-center relative shadow-2xl"
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {!showPrize ? (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Daily Chest</h2>
              
              <div className="mb-8">
                <motion.div
                  animate={isOpening ? { 
                    rotateY: [0, 180, 360, 540, 720],
                    scale: [1, 1.3, 1.1, 1.3, 1],
                    rotateZ: [0, 10, -10, 5, 0]
                  } : {}}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                  className="w-32 h-32 mx-auto bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl shadow-2xl flex items-center justify-center"
                >
                  <Gift className="w-16 h-16 text-white drop-shadow-lg" />
                </motion.div>
              </div>

              {!isOpening ? (
                <button
                  onClick={openChest}
                  className="btn-success text-lg px-8 py-4"
                >
                  Open Case
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="text-lg text-gray-600 font-semibold">
                    Opening chest...
                  </div>
                  <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto"></div>
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
                <Trophy className="w-8 h-8 text-gold-500" />
                <h2 className="text-3xl font-bold text-success-600">Congratulations!</h2>
              </div>
              <div className="bg-gradient-to-r from-gold-50 to-gold-100 rounded-xl p-6 border-2 border-gold-200">
                <p className="text-lg text-gray-700 mb-2">You unboxed</p>
                <p className="text-4xl font-bold text-gold-600">{formatCurrency(prize)}</p>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={handleClose}
                  className="btn-secondary flex-1"
                >
                  Close
                </button>
                <button
                  onClick={shareOnTwitter}
                  className="btn-primary flex-1 flex items-center justify-center space-x-2"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Flex</span>
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default ChestModal