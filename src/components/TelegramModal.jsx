import React from 'react'
import { telegramApi } from '../api/endpoints'
import { X, MessageCircle, ExternalLink, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from './Button'

const TelegramModal = ({ onClose, onJoinTelegram }) => {

  const handleJoinTelegram = async () => {
    try {
      // Get Telegram deeplink from API
      const result = await telegramApi.getDeeplink()
      
      if (result.deeplink) {
        // Open Telegram with deeplink
        window.open(result.deeplink, '_blank')
        
        // Also open the channel link
        setTimeout(() => {
          window.open(process.env.REACT_APP_TG_CHANNEL_HANDLE ? `https://t.me/${process.env.REACT_APP_TG_CHANNEL_HANDLE.replace('@', '')}` : 'https://t.me/zoggycasino', '_blank')
        }, 1000)
      }
    } catch (error) {
      // Fallback to direct channel link
      window.open(process.env.REACT_APP_TG_CHANNEL_HANDLE ? `https://t.me/${process.env.REACT_APP_TG_CHANNEL_HANDLE.replace('@', '')}` : 'https://t.me/zoggycasino', '_blank')
    }
    
    // Simulate user joining verification
    setTimeout(() => {
      onJoinTelegram()
    }, 2000)
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

          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Join Our Telegram</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              You must join our Telegram community to unlock chest opening and start earning rewards!
            </p>
          </div>

          <div className="bg-blue-600 bg-opacity-10 rounded-xl p-6 mb-6 border border-blue-600 border-opacity-20">
            <h3 className="text-blue-400 font-semibold mb-3 flex items-center justify-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>What you'll get:</span>
            </h3>
            <ul className="text-blue-300 space-y-2">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Daily chest access</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Exclusive rewards & bonuses</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Community updates & tips</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Early access to new features</span>
              </li>
            </ul>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleJoinTelegram}
            className="w-full flex items-center justify-center space-x-2"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Join Telegram Community</span>
            <ExternalLink className="w-4 h-4" />
          </Button>

          <p className="text-xs text-gray-400 mt-4">
            After joining, return here to open your first chest!
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default TelegramModal