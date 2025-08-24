import React, { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

const Countdown = ({ targetDate, onComplete, className = '' }) => {
  const [timeLeft, setTimeLeft] = useState('')
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const target = new Date(targetDate).getTime()
      const difference = target - now
      
      if (difference <= 0) {
        setTimeLeft('00:00:00')
        onComplete?.()
        return
      }
      
      const hours = Math.floor(difference / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)
      
      setTimeLeft(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      )
    }
    
    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    
    return () => clearInterval(timer)
  }, [targetDate, onComplete])
  
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Clock className="w-4 h-4 text-gray-400" />
      <span className="font-mono text-lg font-bold text-white">
        {timeLeft}
      </span>
    </div>
  )
}

export default Countdown