import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { formatCurrency } from '../utils/rewards'
import { useLocation } from 'react-router-dom'
import Countdown from './Countdown'

const Header = ({ minimal = false }) => {
  const { user, isAuthenticated } = useAuth()
  const location = useLocation()
  const isLanding = location.pathname === '/'

  return (
    <header className="w-full py-4 px-6 bg-gray-900 shadow-sm border-b border-gray-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img 
            src="/logo.svg" 
            alt="Zoggy Logo" 
            className="w-10 h-10"
          />
          <span className="text-2xl font-bold text-white">Zoggy</span>
        </div>
        
        {!minimal && !isLanding && isAuthenticated && user && (
          <div className="flex items-center space-x-6">
            <div className="hidden sm:flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm text-gray-400">Balance</p>
                <p className="font-bold text-gold">{formatCurrency(user.totalCredits)}</p>
              </div>
              {user.nextChestAt && new Date(user.nextChestAt) > new Date() && (
                <div className="text-right">
                  <p className="text-sm text-gray-400">Next chest</p>
                  <Countdown 
                    targetDate={user.nextChestAt}
                    className="justify-end"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header