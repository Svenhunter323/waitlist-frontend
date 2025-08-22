import React, { useState, useEffect } from 'react';
import { Gift, Clock } from 'lucide-react';
import { canOpenChest, getNextChestTime } from '../types';
import ChestModal from './ChestModal';
import TelegramModal from './TelegramModal';

const DailyChest = ({ user, onOpenChest }) => {
  const [showChestModal, setShowChestModal] = useState(false);
  const [showTelegramModal, setShowTelegramModal] = useState(false);
  const [countdown, setCountdown] = useState('');

  const canOpen = canOpenChest(user?.lastChestOpen);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getNextChestTime(user?.lastChestOpen));
    }, 1000);

    return () => clearInterval(timer);
  }, [user?.lastChestOpen]);

  const handleOpenChest = () => {
    if (!user?.hasJoinedTelegram) {
      setShowTelegramModal(true);
      return;
    }
    
    if (canOpen) {
      setShowChestModal(true);
    }
  };

  const handleChestOpened = () => {
    setShowChestModal(false);
    onOpenChest();
  };

  const handleJoinTelegram = () => {
    setShowTelegramModal(false);
    // In a real app, this would update the user's telegram status
    if (user) {
      user.hasJoinedTelegram = true;
    }
  };

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Daily Chest</h2>
        <p className="text-xl text-gray-600 mb-12">Open your daily chest to win amazing prizes!</p>
        
        <div className="card max-w-md mx-auto">
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <div className="w-full h-full bg-gradient-to-br from-gold-400 to-gold-500 rounded-lg shadow-lg animate-float flex items-center justify-center">
              <Gift className="w-16 h-16 text-white" />
            </div>
          </div>
          
          {canOpen ? (
            <button
              onClick={handleOpenChest}
              className="btn-success text-lg px-8 py-4"
            >
              Open Chest
            </button>
          ) : (
            <div className="text-center">
              <button
                disabled
                className="btn-primary opacity-50 cursor-not-allowed text-lg px-8 py-4 mb-4"
              >
                Chest Opened
              </button>
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>Next chest in {countdown}</span>
              </div>
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
  );
};

export default DailyChest;