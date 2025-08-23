import React, { useState } from 'react'
import { useAppContext } from '../contexts/AppContext'
import { useApi } from '../hooks/useApi'
import { adminApi } from '../api/endpoints'
import { Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import LoadingSpinner from './LoadingSpinner'

const AdminLogin = ({ onLoginSuccess }) => {
  const { dispatch } = useAppContext()
  const { loading, error, execute, clearError } = useApi()
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showDemoCredentials, setShowDemoCredentials] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    clearError()

    try {
      const result = await execute(() => adminApi.login(credentials.username, credentials.password))
      
      if (result.success) {
        localStorage.setItem('admin_token', result.token)
        onLoginSuccess(result.user)
      }
    } catch (err) {
      // Error is handled by useApi hook
    }
  }

  const handleInputChange = (field, value) => {
    setCredentials(prev => ({ ...prev, [field]: value }))
    clearError()
  }

  const fillDemoCredentials = () => {
    setCredentials({
      username: 'admin@zoggy.com',
      password: 'zoggy2024'
    })
  }

  const handleBackToLanding = () => {
    dispatch({ type: 'SET_VIEW', payload: 'landing' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <button
            onClick={handleBackToLanding}
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Landing</span>
          </button>
          
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-gray-400">Enter your credentials to access the admin dashboard</p>
        </div>

        {showDemoCredentials && (
          <div className="card mb-6 bg-blue-900 border-blue-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-100">Demo Credentials</h3>
              <button
                onClick={() => setShowDemoCredentials(false)}
                className="text-blue-300 hover:text-blue-100"
              >
                <EyeOff className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-blue-200 font-mono text-sm">
              <p><strong>Username:</strong> admin@zoggy.com</p>
              <p><strong>Password:</strong> zoggy2024</p>
            </div>
            <button
              onClick={fillDemoCredentials}
              className="btn-primary w-full mt-4"
            >
              Use Demo Credentials
            </button>
          </div>
        )}

        <div className="card bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username / Email
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="input-field pl-10"
                  placeholder="Enter your username or email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="input-field pl-10 pr-10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-error-50 border border-error-200 rounded-lg">
                <p className="text-error-700 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !credentials.username || !credentials.password}
              className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <LoadingSpinner size="sm" color="white" />
                  <span>Signing In...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin