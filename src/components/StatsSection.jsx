import React from 'react'
import { useAppContext } from '../contexts/AppContext'
import { Users, Gift, DollarSign, TrendingUp } from 'lucide-react'

const StatsSection = () => {
  const { totalUsers } = useAppContext()

  const stats = [
    {
      icon: Users,
      value: totalUsers.toLocaleString(),
      label: 'Users Joined',
      color: 'text-primary-600',
      bgColor: 'bg-primary-50'
    },
    {
      icon: Gift,
      value: '8,934',
      label: 'Chests Opened',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: DollarSign,
      value: '$1.2M',
      label: 'Total Rewards',
      color: 'text-success-600',
      bgColor: 'bg-success-50'
    },
    {
      icon: TrendingUp,
      value: '234',
      label: 'Joined Today',
      color: 'text-warning-600',
      bgColor: 'bg-warning-50'
    }
  ]

  return (
    <section className="py-20 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Join the Community
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Thousands of users are already earning daily rewards. Don't miss out on your chance to win big.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="card text-center hover:scale-105 transition-transform duration-300 dark:bg-gray-800 dark:border-gray-700">
              <div className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{stat.value}</p>
              <p className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection