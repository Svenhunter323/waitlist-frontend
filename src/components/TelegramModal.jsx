import React from 'react'
import { X, MessageCircle, ExternalLink, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const TelegramModal = ({ onClose, onJoinTelegram }) => {
  const handleJoinTelegram = () => {
    // Open Telegram channel
    window.open('https://t.me/zoggycasino', '_blank')
    
    // Simulate user joining (in real app, this would be verified via Telegram bot)
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
          className="bg-white rounded-2xl p-8 max-w-md w-full text-center relative shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Join Our Telegram</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              You must join our Telegram community to unlock chest opening and start earning rewards!
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 mb-6 border border-blue-200">
            <h3 className="text-blue-800 font-semibold mb-3 flex items-center justify-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>What you'll get:</span>
            </h3>
            <ul className="text-blue-700 space-y-2">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Daily chest access</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Exclusive rewards & bonuses</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Community updates & tips</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Early access to new features</span>
              </li>
            </ul>
          </div>

          <button
            onClick={handleJoinTelegram}
            className="btn-primary w-full text-lg flex items-center justify-center space-x-2 py-4"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Join Telegram Community</span>
            <ExternalLink className="w-4 h-4" />
          </button>

          <p className="text-xs text-gray-500 mt-4">
            After joining, return here to open your first chest!
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default TelegramModal