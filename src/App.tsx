import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import UserDashboard from './components/UserDashboard';
import FakeWinsFeed from './components/FakeWinsFeed';
import Footer from './components/Footer';
import SuccessMessage from './components/SuccessMessage';
import { User, WaitlistStats } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { generateReferralCode, generateClaimCode, generateUserId } from './utils/helpers';

function App() {
  const [user, setUser] = useLocalStorage<User | null>('zoggy_user', null);
  const [waitlistStats, setWaitlistStats] = useLocalStorage<WaitlistStats>('zoggy_stats', { totalUsers: 9327 });
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasJoinedTelegram, setHasJoinedTelegram] = useLocalStorage<boolean>('zoggy_telegram', false);

  const handleSignup = (email: string, referralCode?: string) => {
    const newUser: User = {
      id: generateUserId(),
      email,
      position: waitlistStats.totalUsers + 1,
      referralCode: generateReferralCode(),
      referredUsers: 0,
      credits: 0,
      claimCode: generateClaimCode(),
    };

    // If referral code was used, increment the referrer's count
    if (referralCode) {
      // In a real app, this would be handled by the backend
      console.log(`User signed up with referral code: ${referralCode}`);
    }

    setUser(newUser);
    setWaitlistStats(prev => ({ totalUsers: prev.totalUsers + 1 }));
    setShowSuccess(true);

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleOpenChest = () => {
    if (!user) return;

    const prizeAmount = Math.floor(Math.random() * 100) + 1;
    const updatedUser: User = {
      ...user,
      credits: user.credits + prizeAmount,
      lastChestOpen: new Date(),
    };

    setUser(updatedUser);
  };

  const handleJoinTelegram = () => {
    setHasJoinedTelegram(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {!user ? (
        <>
          <HeroSection 
            totalUsers={waitlistStats.totalUsers}
            onSignup={handleSignup}
          />
          
          {showSuccess && (
            <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
              <SuccessMessage message="You're on the waitlist! Check your email for confirmation." />
            </div>
          )}
          
          <div className="py-12 px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Recent Winners
              </h2>
              <FakeWinsFeed />
            </div>
          </div>
        </>
      ) : (
        <UserDashboard
          user={user}
          totalUsers={waitlistStats.totalUsers}
          onOpenChest={handleOpenChest}
          hasJoinedTelegram={hasJoinedTelegram}
          onJoinTelegram={handleJoinTelegram}
        />
      )}
      
      <Footer />
    </div>
  );
}

export default App;