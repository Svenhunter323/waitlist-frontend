import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { adminApi } from '../api/endpoints'
import { Navigate } from 'react-router-dom'
import { 
  Users, 
  Download,
  Eye,
  EyeOff,
  ArrowLeft,
  LogOut,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'

const AdminDashboard = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const [users, setUsers] = useState([])
  const [referrals, setReferrals] = useState([])
  const [loading, setLoading] = useState(true)
  const [showEmails, setShowEmails] = useState(false)

  useEffect(() => {
    if (isAuthenticated && user?.role === 'admin') {
      fetchData()
    }
  }, [isAuthenticated, user])

  const fetchData = async () => {
    try {
      const [usersData, referralsData] = await Promise.all([
        adminApi.getUsers(),
        adminApi.getReferrals()
      ])
      setUsers(usersData)
      setReferrals(referralsData)
    } catch (error) {
      console.error('Failed to fetch admin data:', error)
      // Fallback to mock data
      setUsers([
        { id: 1, email: 'user***@gmail.com', claimCode: 'ZOGGY-ABC123', credits: 150.50, verified: true },
        { id: 2, email: 'crypto***@yahoo.com', claimCode: 'ZOGGY-DEF456', credits: 75.25, verified: true },
        { id: 3, email: 'winner***@outlook.com', claimCode: 'ZOGGY-GHI789', credits: 200.00, verified: false },
      ])
      setReferrals([
        { id: 1, referrer: 'user***@gmail.com', referee: 'friend***@gmail.com', status: 'completed', date: '2024-01-15' },
        { id: 2, referrer: 'crypto***@yahoo.com', referee: 'buddy***@yahoo.com', status: 'pending', date: '2024-01-14' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleExportCSV = async () => {
    try {
      const blob = await adminApi.exportClaimCodes()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `zoggy-claim-codes-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export failed:', error)
    }
  }

  const maskEmail = (email) => {
    if (showEmails) return email
    const [local, domain] = email.split('@')
    return `${local.substring(0, 3)}***@${domain}`
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-success-400" />
      case 'pending':
        return <Clock className="w-4 h-4 text-warning-400" />
      default:
        return <XCircle className="w-4 h-4 text-error-400" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success-600 bg-opacity-20 text-success-400 border-success-600 border-opacity-30'
      case 'pending':
        return 'bg-warning-600 bg-opacity-20 text-warning-400 border-warning-600 border-opacity-30'
      default:
        return 'bg-error-600 bg-opacity-20 text-error-400 border-error-600 border-opacity-30'
    }
  }

  // Check if user is admin
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <header className="bg-gray-900 shadow-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="secondary"
                onClick={() => window.history.back()}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-6">
              <div className="hidden sm:block text-right">
                <p className="text-sm text-gray-400">Logged in as</p>
                <p className="font-semibold text-white">{user.email}</p>
              </div>
              <Button
                variant="secondary"
                onClick={logout}
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Export Section */}
        <Card className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Export Data</h3>
              <p className="text-gray-400">Download user data for analysis</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="secondary"
                onClick={() => setShowEmails(!showEmails)}
                className="flex items-center space-x-2"
              >
                {showEmails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{showEmails ? 'Hide' : 'Show'} Emails</span>
              </Button>
              <Button
                variant="primary"
                onClick={handleExportCSV}
                className="flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Users Table */}
          <Card>
            <div className="flex items-center space-x-2 mb-6">
              <Users className="w-6 h-6 text-brand" />
              <h3 className="text-xl font-bold text-white">Users ({users.length})</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 text-gray-400 font-medium">Email</th>
                    <th className="text-left py-3 text-gray-400 font-medium">Claim Code</th>
                    <th className="text-right py-3 text-gray-400 font-medium">Credits</th>
                    <th className="text-center py-3 text-gray-400 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-800">
                      <td className="py-3 text-white font-mono text-sm">
                        {maskEmail(user.email)}
                      </td>
                      <td className="py-3 text-gray-300 font-mono text-sm">
                        {user.claimCode}
                      </td>
                      <td className="py-3 text-right text-gold font-semibold">
                        ${user.credits.toFixed(2)}
                      </td>
                      <td className="py-3 text-center">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                          user.verified 
                            ? 'bg-success-600 bg-opacity-20 text-success-400 border-success-600 border-opacity-30'
                            : 'bg-warning-600 bg-opacity-20 text-warning-400 border-warning-600 border-opacity-30'
                        }`}>
                          {user.verified ? 'Verified' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Referrals Table */}
          <Card>
            <h3 className="text-xl font-bold text-white mb-6">Referrals ({referrals.length})</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 text-gray-400 font-medium">Referrer</th>
                    <th className="text-left py-3 text-gray-400 font-medium">Referee</th>
                    <th className="text-center py-3 text-gray-400 font-medium">Status</th>
                    <th className="text-right py-3 text-gray-400 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {referrals.map((referral) => (
                    <tr key={referral.id} className="border-b border-gray-800">
                      <td className="py-3 text-white font-mono text-sm">
                        {maskEmail(referral.referrer)}
                      </td>
                      <td className="py-3 text-gray-300 font-mono text-sm">
                        {maskEmail(referral.referee)}
                      </td>
                      <td className="py-3 text-center">
                        <div className="flex items-center justify-center space-x-1">
                          {getStatusIcon(referral.status)}
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(referral.status)}`}>
                            {referral.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 text-right text-gray-400 text-sm">
                        {referral.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard