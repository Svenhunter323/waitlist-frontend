import React from 'react'

const Header = () => {
  return (
    <header className="w-full py-4 px-6 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img 
            src="/logo.svg" 
            alt="Zoggy Logo" 
            className="w-10 h-10"
          />
          <span className="text-2xl font-bold text-gray-800">Zoggy</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <a 
            href="https://t.me/zoggycasino" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
          >
            Telegram
          </a>
          <a 
            href="mailto:help@zoggybet.com"
            className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
          >
            Support
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header