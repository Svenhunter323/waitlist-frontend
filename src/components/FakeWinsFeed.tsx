import React, { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FakeWin } from '../types';
import { formatCurrency } from '../utils/helpers';

const FakeWinsFeed: React.FC = () => {
  const [wins, setWins] = useState<FakeWin[]>([]);

  const usernames = [
    'CryptoWolf', 'LuckyGamer', 'DiamondHands', 'MoonWalker', 'ChestHunter',
    'GoldRush', 'WinStreak', 'FortuneSeeker', 'PrizeCollector', 'JackpotKing',
    'TreasureFinder', 'LootMaster', 'CoinFlip', 'BigWinner', 'ChampionPlayer'
  ];

  const generateFakeWin = (): FakeWin => {
    const username = usernames[Math.floor(Math.random() * usernames.length)];
    const amount = Math.floor(Math.random() * 500) + 10; // $10-$500
    
    return {
      id: Math.random().toString(36).substring(7),
      username,
      prize: formatCurrency(amount),
      timestamp: new Date(),
    };
  };

  useEffect(() => {
    // Generate initial wins
    const initialWins = Array.from({ length: 3 }, generateFakeWin);
    setWins(initialWins);

    // Add new wins every 3-8 seconds
    const interval = setInterval(() => {
      const newWin = generateFakeWin();
      setWins(prev => [newWin, ...prev.slice(0, 4)]); // Keep only 5 most recent
    }, Math.random() * 5000 + 3000); // 3-8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <div className="flex items-center space-x-2 mb-4">
        <Trophy className="w-6 h-6 text-gold-500" />
        <h3 className="text-xl font-bold text-gray-800">Recent Wins</h3>
      </div>
      
      <div className="space-y-3 max-h-64 overflow-hidden">
        <AnimatePresence>
          {wins.map((win) => (
            <motion.div
              key={win.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-r from-success-50 to-gold-50 rounded-lg p-3 border border-success-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">{win.username}</p>
                  <p className="text-sm text-gray-600">just unboxed</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-success-600 text-lg">{win.prize}</p>
                  <p className="text-xs text-gray-500">
                    {win.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FakeWinsFeed;