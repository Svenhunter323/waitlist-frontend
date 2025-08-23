import React, { useState } from 'react'
import { useAppContext } from '../contexts/AppContext'
import { useApi } from '../hooks/useApi'
import { adminApi } from '../api/endpoints'
import AdminLogin from '../components/AdminLogin'
import { mockAdminStats } from '../utils/mockData'
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Gift, 
  MessageCircle, 
  Percent,
  ArrowLeft,
  Eye,
  EyeOff,
  Download,
  LogOut
} from 'lucide-react'

const AdminDashboard = () => {
  const { dispatch } = useAppContext()
  const { loading, execute } = useApi()
  const [adminUser, setAdminUser] = useState(null)
  const [showCredentials, setShowCredentials] = useState(false)
  const [stats, setStats] = useState(mockAdminStats)

  // Check if admin is logged in
  React.useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (token) {
      // In a real app, verify token with API
      setAdminUser({ email: 'admin@zoggy.com', role: 'admin' })
      loadAdminStats()
    }
  }, [])

  const loadAdminStats = async () => {
    try {
      const result = await execute(() => adminApi.getStats())
      if (result.success) {
        setStats(result.stats)
      }
    } catch (error) {
      // Fallback to mock data
      console.log('Using mock admin stats')
    }
  }

  const handleLoginSuccess = (user) => {
    setAdminUser(user)
    loadAdminStats()
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    setAdminUser(null)
  }

  const handleExportUsers = async (format = 'csv') => {
    try {
      const blob = await execute(() => adminApi.exportUsers(format))
      
      // Create download link
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `zoggy-users-${new Date().toISOString().split('T')[0]}.${format}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export failed:', error)
    }
  }

  // Show login form if not authenticated
  if (!adminUser) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />
  }

  const handleBackToLanding = () => {
    dispatch({ type: 'SET_VIEW', payload: 'landing' })
  }

  const statsConfig = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50'
    },
    {
      title: 'Signups Today',
      value: stats.totalSignupsToday.toLocaleString(),
      icon: TrendingUp,
      color: 'text-success-600',
      bgColor: 'bg-success-50'
    },
    {
      title: 'Credits Distributed',
      value: stats.totalCreditsDistributed.toLocaleString(),
      icon: DollarSign,
      color: 'text-warning-600',
      bgColor: 'bg-warning-50'
    },
    {
      title: 'Chests Opened',
      value: stats.totalChestsOpened.toLocaleString(),
      icon: Gift,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Telegram Members',
      value: stats.telegramMembers.toLocaleString(),
      icon: MessageCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Conversion Rate',
      value: `${stats.conversionRate}%`,
      icon: Percent,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToLanding}
                className="btn-secondary flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Landing</span>
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-6">
              <div className="hidden sm:block text-right">
                <p className="text-sm text-gray-600">Logged in as</p>
                <p className="font-semibold text-gray-800">{adminUser.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="btn-secondary flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
              <img src="/logo.svg" alt="Zoggy" className="w-8 h-8" />
              <span className="hidden sm:inline text-xl font-bold text-gray-800">Zoggy Admin</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Login Credentials Info */}
        <div className="card mb-8 bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Demo Admin Access</h3>
              <p className="text-blue-700">This is a mockup dashboard with demo data</p>
            </div>
            <button
              onClick={() => setShowCredentials(!showCredentials)}
              className="btn-secondary flex items-center space-x-2"
            >
              {showCredentials ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showCredentials ? 'Hide' : 'Show'} Credentials</span>
            </button>
          </div>
          {showCredentials && (
            <div className="mt-4 p-4 bg-blue-100 rounded-lg">
              <p className="text-blue-800 font-mono">
                <strong>Username:</strong> admin@zoggy.com<br />
                <strong>Password:</strong> zoggy2024
              </p>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statsConfig.map((stat, index) => (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Export Section */}
        <div className="card mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Export Data</h3>
              <p className="text-gray-600">Download user data for analysis</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => handleExportUsers('csv')}
                disabled={loading}
                className="btn-secondary flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Referrers */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Top Referrers</h3>
            <div className="space-y-4">
              {stats.topReferrers.map((referrer, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{referrer.email}</p>
                      <p className="text-sm text-gray-600">{referrer.referrals} referrals</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-success-600">{referrer.credits} credits</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Signups */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Signups</h3>
            <div className="space-y-4">
              {stats.recentSignups.map((signup, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-800">{signup.email}</p>
                    <p className="text-sm text-gray-600">Position #{signup.position.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{signup.joinedAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard