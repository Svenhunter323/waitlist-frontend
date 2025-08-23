import React, { useState, useEffect } from 'react'
import { useAppContext } from '../contexts/AppContext'
import { useApi } from '../hooks/useApi'
import { waitlistApi } from '../api/endpoints'
import { Mail, CheckCircle, RefreshCw, ArrowLeft, Clock } from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'
import ThemeToggle from '../components/ThemeToggle'

const EmailVerification = () => {
  const { pendingVerification, dispatch, notifications } = useAppContext()
  const { loading: isResending, execute } = useApi()
  const [countdown, setCountdown] = useState(0)
  const [verificationStatus, setVerificationStatus] = useState('pending') // pending, verified, error

  useEffect(() => {
    // Check for verification token in URL
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    
    if (token) {
      verifyEmailToken(token)
    }
  }, [])

  useEffect(() => {
    // Countdown timer for resend button
    let timer
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  const verifyEmailToken = async (token) => {
    try {
      const result = await execute(() => waitlistApi.verifyEmail(token))
      
      if (result.success) {
        setVerificationStatus('verified')
        dispatch({ type: 'EMAIL_VERIFIED', payload: result.user })
        notifications.showSuccess('Email verified successfully! Welcome to Zoggy!')
        
        // Clear URL parameters
        window.history.replaceState({}, document.title, window.location.pathname)
      }
    } catch (error) {
      setVerificationStatus('error')
      notifications.showError('Invalid or expired verification link')
    }
  }

  const handleResendVerification = async () => {
    if (!pendingVerification?.email || countdown > 0) return

    try {
      await execute(() => waitlistApi.resendVerification(pendingVerification.email))
      notifications.showSuccess('Verification email sent! Please check your inbox.')
      setCountdown(60) // 60 second cooldown
    } catch (error) {
      notifications.showError('Failed to resend verification email. Please try again.')
    }
  }

  const handleBackToLanding = () => {
    dispatch({ type: 'SET_VIEW', payload: 'landing' })
  }

  if (!pendingVerification && verificationStatus !== 'verified') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="card max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-error-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Verification Pending</h2>
          <p className="text-gray-600 mb-6">
            You don't have any pending email verification.
          </p>
          <button
            onClick={handleBackToLanding}
            className="btn-primary flex items-center justify-center space-x-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Landing</span>
          </button>
        </div>
      </div>
    )
  }

  if (verificationStatus === 'verified') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-success-50 to-success-100 flex items-center justify-center px-6">
        <div className="card max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-success-800 mb-4">Email Verified!</h2>
          <p className="text-success-700 text-lg mb-6">
            Welcome to Zoggy! Your email has been successfully verified.
          </p>
          <p className="text-success-600 mb-8">
            Redirecting you to your dashboard...
          </p>
          <LoadingSpinner size="lg" color="success" className="mx-auto" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-purple-50 flex items-center justify-center px-6">
      {/* Theme Toggle for Email Verification */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      
      <div className="max-w-md mx-auto">
        <button
          onClick={handleBackToLanding}
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing</span>
        </button>

        <div className="card text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Mail className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Check Your Email</h2>
          
          <p className="text-gray-600 text-lg mb-2">
            We've sent a verification link to:
          </p>
          <p className="text-primary-600 font-semibold text-lg mb-6">
            {pendingVerification?.email}
          </p>
          
          <div className="bg-blue-50 rounded-lg p-6 mb-6 border border-blue-200">
            <h3 className="text-blue-800 font-semibold mb-3">Next Steps:</h3>
            <ol className="text-blue-700 text-left space-y-2">
              <li className="flex items-start space-x-2">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                <span>Check your email inbox (and spam folder)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                <span>Click the verification link in the email</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                <span>Start opening daily chests and earning rewards!</span>
              </li>
            </ol>
          </div>

          <div className="space-y-4">
            <p className="text-gray-500 text-sm">
              Didn't receive the email? Check your spam folder or request a new one.
            </p>
            
            <button
              onClick={handleResendVerification}
              disabled={isResending || countdown > 0}
              className="btn-secondary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Sending...</span>
                </>
              ) : countdown > 0 ? (
                <>
                  <Clock className="w-4 h-4" />
                  <span>Resend in {countdown}s</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  <span>Resend Verification Email</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm">
              <strong>Your Position:</strong> #{pendingVerification?.position?.toLocaleString() || 'TBD'}
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Your spot is reserved while you verify your email
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailVerification