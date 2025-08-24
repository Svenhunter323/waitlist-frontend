import React from 'react'
import { useAppContext } from '../contexts/AppContext'
import { formatCurrency } from '../utils/userUtils'
import { Settings } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const Header = () => {
  const { user, dispatch } = useAppContext()

  const handleAdminAccess = () => {
    dispatch({ type: 'SET_VIEW', payload: 'admin' })
  }

  return (
    <header className="w-full py-4 px-6 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img 
            src="/logo.svg" 
            alt="Zoggy Logo" 
            className="w-10 h-10"
          />
          <span className="text-2xl font-bold text-gray-800 dark:text-white">Zoggy</span>
        </div>
        
        <div className="flex items-center space-x-6">
          {user && (
            <div className="hidden sm:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">Credits</p>
                <p className="font-bold text-success-600">{formatCurrency(user.credits)}</p>
              </div>
            </div>
          )}
          
          <div className="hidden md:flex items-center space-x-6">
            <a 
              href="https://t.me/zoggycasino" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            >
              Telegram
            </a>
            <a 
              href="mailto:help@zoggybet.com"
              className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            >
              Support
            </a>
          </div>

          <button
            onClick={handleAdminAccess}
            className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            title="Admin Dashboard"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* <ThemeToggle /> */}
        </div>
      </div>
    </header>
  )
}

export default Header