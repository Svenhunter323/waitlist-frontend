import React, { useState, useEffect } from 'react';
import { X, Gift, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '../utils/helpers';

interface ChestModalProps {
  onClose: () => void;
  onChestOpened: () => void;
}

const ChestModal: React.FC<ChestModalProps> = ({ onClose, onChestOpened }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [prize, setPrize] = useState<number | null>(null);
  const [showPrize, setShowPrize] = useState(false);

  const openChest = () => {
    setIsOpening(true);
    
    // Simulate chest opening animation
    setTimeout(() => {
      const prizeAmount = Math.floor(Math.random() * 100) + 1; // $1-$100
      setPrize(prizeAmount);
      setShowPrize(true);
      setIsOpening(false);
    }, 2000);
  };

  const handleClose = () => {
    if (prize) {
      onChestOpened();
    }
    onClose();
  };

  const shareOnTwitter = () => {
    if (prize) {
      const tweetText = `I just opened a chest on @zoggy and unboxed ${formatCurrency(prize)} 🎁🔥 Try your luck here: https://zoggybet.com`;
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
      window.open(twitterUrl, '_blank');
    }
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
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>

          {!showPrize ? (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Daily Chest</h2>
              
              <div className="mb-8">
                <motion.div
                  animate={isOpening ? { 
                    rotateY: [0, 180, 360],
                    scale: [1, 1.2, 1]
                  } : {}}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="w-32 h-32 mx-auto bg-gradient-to-br from-gold-400 to-gold-500 rounded-lg shadow-lg flex items-center justify-center"
                >
                  <Gift className="w-16 h-16 text-white" />
                </motion.div>
              </div>

              {!isOpening ? (
                <button
                  onClick={openChest}
                  className="btn-success text-lg px-8 py-4"
                >
                  Open Chest
                </button>
              ) : (
                <div className="text-lg text-gray-600">
                  Opening chest...
                </div>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="space-y-6"
            >
              <div className="text-6xl">🎉</div>
              <h2 className="text-3xl font-bold text-success-600">Congratulations!</h2>
              <p className="text-xl text-gray-700">
                You unboxed <span className="font-bold text-gold-500">{formatCurrency(prize!)}</span>
              </p>
              
              <div className="flex space-x-4">
                <button
                  onClick={handleClose}
                  className="btn-primary flex-1"
                >
                  Close
                </button>
                <button
                  onClick={shareOnTwitter}
                  className="btn-success flex-1 flex items-center justify-center space-x-2"
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
  );
};

export default ChestModal;