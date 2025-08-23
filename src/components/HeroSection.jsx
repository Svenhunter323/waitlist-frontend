import React, { useState, useEffect } from 'react'
import { useAppContext } from '../contexts/AppContext'
import { useApi } from '../hooks/useApi'
import { waitlistApi } from '../api/endpoints'
import { Mail, Users, CheckCircle, Gift } from 'lucide-react'
import { validateEmail, createUser } from '../utils/userUtils'
import ThemeToggle from './ThemeToggle'

const HeroSection = () => {
  const { user, totalUsers, dispatch } = useAppContext()
  const [email, setEmail] = useState('')
  const [referralCode, setReferralCode] = useState('')
  const [emailError, setEmailError] = useState('')
  const { loading: isLoading, error: apiError, execute, clearError } = useApi()

  // Check for referral code in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const refCode = urlParams.get('ref')
    if (refCode) {
      localStorage.setItem('referralCode', refCode)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEmailError('')
    clearError()

    if (!email) {
      setEmailError('Email is required')
      return
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address')
      return
    }

    try {
      const referralCode = localStorage.getItem('referralCode')
      
      const result = await execute(() => waitlistApi.joinWaitlist(email, referralCode))
      
      if (result.success) {
        dispatch({ type: 'SIGNUP_USER', payload: result.user })
        setEmail('')
        if (!result.user.emailVerified) {
          notifications.showSuccess('Please check your email to verify your account!')
        }
      }
    } catch (error) {
      setEmailError(error.message)
    }
  }

  return (
    <section className="min-h-screen gradient-bg flex items-center justify-center px-6 py-12">
      {/* Theme Toggle for Landing Page */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl shadow-2xl animate-float flex items-center justify-center">
                <Gift className="w-12 h-12 text-white drop-shadow-lg" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-success-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            Open Your Daily Chest &<br />
            <span className="text-gradient">
              Win Real Rewards
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 mb-8 font-semibold">
            Win up to <span className="text-gold-500 font-bold">$10,000</span> every day
          </p>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Join thousands of users earning daily rewards. Get early access to our platform and start winning immediately.
          </p>
        </div>

        {!user ? (
          <div className="card max-w-md mx-auto mb-8 bg-gradient-to-br from-white to-gray-50">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Join the Waitlist</h3>
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
            
            <p className="text-sm text-gray-500 mt-4">
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

        <div className="flex items-center justify-center space-x-2 text-gray-600">
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