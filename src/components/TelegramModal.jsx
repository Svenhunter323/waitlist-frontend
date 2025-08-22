import React from 'react';
import { X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TelegramModal = ({ onClose, onJoinTelegram }) => {
  const handleJoinTelegram = () => {
    // Open Telegram channel
    window.open('https://t.me/zoggycasino', '_blank');
    onJoinTelegram();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full text-center relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="mb-6">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Join Our Telegram</h2>
            <p className="text-gray-600">
              You must subscribe to our Telegram channel to open the chest and start earning rewards!
            </p>
          </div>

          <button
            onClick={handleJoinTelegram}
            className="btn-primary w-full text-lg flex items-center justify-center space-x-2"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Join Telegram</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TelegramModal;