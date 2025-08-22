import React from 'react'
import { X, MessageCircle, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const TelegramModal = ({ onClose, onJoinTelegram }) => {
  const handleJoinTelegram = () => {
    // Open Telegram channel
    window.open('https://t.me/zoggycasino', '_blank')
    onJoinTelegram()
    onClose()
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
              You must subscribe to our Telegram channel to open the chest and start earning rewards!
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
            <p className="text-blue-800 font-semibold mb-2">What you'll get:</p>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Daily chest access</li>
              <li>• Exclusive rewards</li>
              <li>• Community updates</li>
              <li>• Early access features</li>
            </ul>
          </div>

          <button
            onClick={handleJoinTelegram}
            className="btn-primary w-full text-lg flex items-center justify-center space-x-2"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Join Telegram</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default TelegramModal