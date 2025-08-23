import React from 'react'
import { useAppContext } from '../contexts/AppContext'
import { Users, Trophy, DollarSign, Gift } from 'lucide-react'
import { formatCurrency } from '../utils/userUtils'

const UserStats = () => {
  const { user, totalUsers } = useAppContext()

  if (!user || !user.emailVerified) return null

  const stats = [
    {
      icon: Users,
      value: `#${user.position.toLocaleString()}`,
      label: 'Waitlist Position',
      color: 'text-primary-600',
      bgColor: 'bg-primary-50'
    },
    {
      icon: Trophy,
      value: user.referredUsers.toString(),
      label: 'Referrals',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: DollarSign,
      value: formatCurrency(user.credits),
      label: 'Total Credits',
      color: 'text-success-600',
      bgColor: 'bg-success-50'
    },
    {
      icon: Gift,
      value: formatCurrency(user.totalEarned || 0),
      label: 'Total Earned',
      color: 'text-warning-600',
      bgColor: 'bg-warning-50'
    }
  ]

  return (
    <section className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Dashboard</h2>
          <p className="text-gray-600">Welcome back! Here's your current status.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="card text-center">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</p>
              <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            You're among <span className="font-bold text-primary-600">{totalUsers.toLocaleString()}</span> early adopters
          </p>
        </div>
      </div>
    </section>
  )
}

export default UserStats