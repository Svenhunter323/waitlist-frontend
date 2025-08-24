import React, { useState, useEffect } from 'react'
import { waitlistApi } from '../api/endpoints'
import { useAuth } from '../contexts/AuthContext'
import { Mail, Users, CheckCircle, Gift } from 'lucide-react'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [referralCode, setReferralCode] = useState('')
  const [emailError, setEmailError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  // Check for referral code in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const refCode = urlParams.get('ref')
    if (refCode) {
      localStorage.setItem('referralCode', refCode)
    }
  }, [])

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard')
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEmailError('')
    setApiError('')

    if (!email) {
      setEmailError('Email is required')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address')
      return
    }

    try {
      setIsLoading(true)
      const referralCode = localStorage.getItem('referralCode')
      
      const result = await waitlistApi.joinWaitlist(email, referralCode)
      
      if (result.token) {
        login(result.token, result.user)
        setEmail('')
        if (result.user.emailVerified) {
          navigate('/dashboard')
        } else {
          navigate(`/verify-email?token=${result.verificationToken}`)
        }
      } else {
        navigate(`/verify-email?email=${email}`)
      }
    } catch (error) {
      setApiError(error.message || 'Failed to join waitlist')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-gold to-gold-600 rounded-2xl shadow-2xl animate-float flex items-center justify-center">
                <Gift className="w-12 h-12 text-white drop-shadow-lg" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-success-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Open Your Daily Chest.<br />
            <span className="text-gradient">
              Win up to $10,000.
            </span>
          </h1>
          <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of users earning daily rewards. Get early access to our platform and start winning immediately.
          </p>
        </div>

        <div className="card max-w-md mx-auto mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">Join the Waitlist</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`input-field pl-10 ${emailError ? 'border-error-500 ring-error-500' : ''}`}
                  required
                />
              </div>
              {emailError && (
                <p className="text-error-400 text-sm mt-1 text-left">{emailError}</p>
              )}
              {apiError && (
                <p className="text-error-400 text-sm mt-1 text-left">{apiError}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="gold"
              size="lg"
              loading={isLoading}
              className="w-full"
            >
              Get Early Access
            </Button>
          </form>
          
          <p className="text-sm text-gray-400 mt-4">
            No spam, unsubscribe anytime. Start earning immediately after signup.
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`input-field pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-primary-500 focus:border-transparent ${emailError ? 'border-error-500 ring-error-500' : ''}`}
                    required
                  />
                </div>
                {emailError && (
                  <p className="text-error-500 text-sm mt-1 text-left">{emailError}</p>
                )}
                {apiError && (
                  <p className="text-error-500 text-sm mt-1 text-left">{apiError}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-success w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Joining Waitlist...</span>
                  </div>
                ) : (
                  'Get Early Access'
                )}
              </button>
            </form>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              No spam, unsubscribe anytime. Start earning immediately after signup.
            </p>
          </div>
        ) : (
          <div className="card max-w-md mx-auto mb-8 bg-gradient-to-br from-success-50 to-success-100 border-success-200">
            <div className="flex items-center justify-center space-x-2 text-success-700 mb-4">
              <CheckCircle className="w-6 h-6" />
              <span className="font-semibold text-lg">Welcome to Zoggy!</span>
            </div>
            <p className="text-success-600 text-lg mb-2">
              Position #{user.position.toLocaleString()}
            </p>
            <p className="text-success-600">
              You can now open daily chests and earn rewards!
            </p>
          </div>
        )}

        <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300">
          <Users className="w-5 h-5" />
          <span className="text-lg font-semibold">
            {totalUsers.toLocaleString()} people in line
          </span>
        </div>
      </div>
    </section>
  )
}

export default HeroSection