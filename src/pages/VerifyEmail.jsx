import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { authApi } from '../api/endpoints'
import { Mail, CheckCircle, RefreshCw, ArrowLeft, Clock } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'

const VerifyEmail = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { login } = useAuth()
  const [status, setStatus] = useState('pending') // pending, verified, error
  const [email, setEmail] = useState('')
  const [isResending, setIsResending] = useState(false)
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    const token = searchParams.get('token')
    const emailParam = searchParams.get('email')
    
    if (emailParam) {
      setEmail(emailParam)
    }
    
    if (token) {
      verifyEmailToken(token)
    }
  }, [searchParams])

  useEffect(() => {
    let timer
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  const verifyEmailToken = async (token) => {
    try {
      // In a real app, this would verify the token with the backend
      // For now, simulate success after a delay
      setTimeout(() => {
        setStatus('verified')
        // Simulate login after verification
        const mockUser = {
          email: email || 'user@example.com',
          emailVerified: true,
          telegramVerified: false,
          totalCredits: 0,
          claimCode: 'ZOGGY-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
          referralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
          referredUsers: 0,
          nextChestAt: null,
          lastChestOpenAt: null
        }
        login(token, mockUser)
        
        setTimeout(() => {
          navigate('/dashboard')
        }, 2000)
      }, 1000)
    } catch (error) {
      setStatus('error')
    }
  }

  const handleResendVerification = async () => {
    if (!email || countdown > 0) return

    try {
      setIsResending(true)
      await authApi.resendVerification(email)
      setCountdown(60) // 60 second cooldown
    } catch (error) {
      console.error('Failed to resend verification:', error)
    } finally {
      setIsResending(false)
    }
  }

  const handleBackToLanding = () => {
    navigate('/')
  }

  if (status === 'verified') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 flex items-center justify-center px-6">
        <Card className="max-w-md mx-auto text-center bg-success-600 bg-opacity-10 border-success-600 border-opacity-20">
          <div className="w-20 h-20 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-success-400 mb-4">Email Verified!</h2>
          <p className="text-success-300 text-lg mb-6">
            Welcome to Zoggy! Your email has been successfully verified.
          </p>
          <p className="text-success-400 mb-8">
            Redirecting you to your dashboard...
          </p>
          <div className="w-8 h-8 border-4 border-success-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 flex items-center justify-center px-6">
      <div className="max-w-md mx-auto">
        <button
          onClick={handleBackToLanding}
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-gray-300 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing</span>
        </button>

        <Card className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-brand to-gold rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Mail className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">Check Your Email</h2>
          
          {email && (
            <>
              <p className="text-gray-300 text-lg mb-2">
                We've sent a verification link to:
              </p>
              <p className="text-brand font-semibold text-lg mb-6">
                {email}
              </p>
            </>
          )}
          
          <div className="bg-blue-600 bg-opacity-10 rounded-lg p-6 mb-6 border border-blue-600 border-opacity-20">
            <h3 className="text-blue-400 font-semibold mb-3">Next Steps:</h3>
            <ol className="text-blue-300 text-left space-y-2">
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
            <p className="text-gray-400 text-sm">
              Didn't receive the email? Check your spam folder or request a new one.
            </p>
            
            <Button
              variant="secondary"
              onClick={handleResendVerification}
              disabled={isResending || countdown > 0 || !email}
              loading={isResending}
              className="w-full"
            >
              {countdown > 0 ? (
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Resend in {countdown}s</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <RefreshCw className="w-4 h-4" />
                  <span>Resend Verification Email</span>
                </div>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default VerifyEmail