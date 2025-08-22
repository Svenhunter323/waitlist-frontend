import React, { useState, useEffect } from 'react';
import { Copy, Share2, Trophy, Users, Gift, Clock } from 'lucide-react';
import { User } from '../types';
import { formatCurrency, canOpenChest, getNextChestTime } from '../utils/helpers';
import ChestModal from './ChestModal';
import TelegramModal from './TelegramModal';

interface UserDashboardProps {
  user: User;
  totalUsers: number;
  onOpenChest: () => void;
  hasJoinedTelegram: boolean;
  onJoinTelegram: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({
  user,
  totalUsers,
  onOpenChest,
  hasJoinedTelegram,
  onJoinTelegram,
}) => {
  const [showChestModal, setShowChestModal] = useState(false);
  const [showTelegramModal, setShowTelegramModal] = useState(false);
  const [countdown, setCountdown] = useState('');
  const [copiedReferral, setCopiedReferral] = useState(false);
  const [copiedClaim, setCopiedClaim] = useState(false);

  const referralLink = `https://zoggybet.com?ref=${user.referralCode}`;
  const canOpen = canOpenChest(user.lastChestOpen);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getNextChestTime(user.lastChestOpen));
    }, 1000);

    return () => clearInterval(timer);
  }, [user.lastChestOpen]);

  const handleOpenChest = () => {
    if (!hasJoinedTelegram) {
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

  const copyToClipboard = async (text: string, type: 'referral' | 'claim') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'referral') {
        setCopiedReferral(true);
        setTimeout(() => setCopiedReferral(false), 2000);
      } else {
        setCopiedClaim(true);
        setTimeout(() => setCopiedClaim(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const shareOnTwitter = () => {
    const tweetText = `I just opened a chest on @zoggy and unboxed $${Math.floor(Math.random() * 100 + 1)} 🎁🔥 Try your luck here: ${referralLink}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <div className="min-h-screen gradient-bg py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Your Dashboard</h2>
          <p className="text-xl text-gray-600">Track your progress and open daily chests!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="card text-center">
            <Trophy className="w-8 h-8 text-gold-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Waitlist Position</h3>
            <p className="text-3xl font-bold text-primary-600">#{user.position}</p>
          </div>

          <div className="card text-center">
            <Users className="w-8 h-8 text-primary-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total in Waitlist</h3>
            <p className="text-3xl font-bold text-gray-800">#{totalUsers.toLocaleString()}</p>
          </div>

          <div className="card text-center">
            <Share2 className="w-8 h-8 text-success-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Referred Users</h3>
            <p className="text-3xl font-bold text-success-600">{user.referredUsers}</p>
          </div>

          <div className="card text-center">
            <Gift className="w-8 h-8 text-gold-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Credits</h3>
            <p className="text-3xl font-bold text-gold-500">{formatCurrency(user.credits)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Daily Chest</h3>
            <div className="text-center">
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
          </div>

          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Referral & Codes</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Referral Link
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={referralLink}
                    readOnly
                    className="input-field rounded-r-none flex-1"
                  />
                  <button
                    onClick={() => copyToClipboard(referralLink, 'referral')}
                    className="px-4 py-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200 transition-colors"
                  >
                    <Copy className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                {copiedReferral && (
                  <p className="text-success-600 text-sm mt-1">Copied to clipboard!</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Claim Code
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={user.claimCode}
                    readOnly
                    className="input-field rounded-r-none flex-1"
                  />
                  <button
                    onClick={() => copyToClipboard(user.claimCode, 'claim')}
                    className="px-4 py-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200 transition-colors"
                  >
                    <Copy className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                {copiedClaim && (
                  <p className="text-success-600 text-sm mt-1">Copied to clipboard!</p>
                )}
              </div>

              <button
                onClick={shareOnTwitter}
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                <Share2 className="w-5 h-5" />
                <span>Share on Twitter</span>
              </button>
            </div>
          </div>
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
            onJoinTelegram={onJoinTelegram}
          />
        )}
      </div>
    </div>
  );
};

export default UserDashboard;