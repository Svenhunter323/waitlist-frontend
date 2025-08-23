import React from 'react'
import { motion } from 'framer-motion'

const LoadingSpinner = ({ size = 'md', color = 'primary', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  const colorClasses = {
    primary: 'border-primary-600',
    success: 'border-success-600',
    warning: 'border-warning-600',
    white: 'border-white'
  }

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={`
        ${sizeClasses[size]} 
        border-2 
        ${colorClasses[color]} 
        border-t-transparent 
        rounded-full 
        ${className}
      `}
    />
  )
}

export const LoadingOverlay = ({ message = 'Loading...', children }) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-3" />
          <p className="text-gray-600 font-medium">{message}</p>
        </div>
      </div>
      <div className="opacity-50 pointer-events-none">
        {children}
      </div>
    </div>
  )
}

export const InlineLoader = ({ message, size = 'sm' }) => {
  return (
    <div className="flex items-center space-x-2">
      <LoadingSpinner size={size} />
      <span className="text-gray-600">{message}</span>
    </div>
  )
}

export default LoadingSpinner