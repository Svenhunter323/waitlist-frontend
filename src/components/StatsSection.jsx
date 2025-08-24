import React from 'react'
import { useState, useEffect } from 'react'
import { statsApi } from '../api/endpoints'
import { Users, Gift, DollarSign, TrendingUp } from 'lucide-react'
import Card from './Card'

const StatsSection = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalReferrals: 0,
    chestsOpened: 0,
    joinedToday: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await statsApi.getStats()
        setStats({
          totalUsers: data.totalUsers || 0,
          totalReferrals: data.totalReferrals || 0,
          chestsOpened: data.chestsOpened || 0,
          joinedToday: data.joinedToday || 0
        })
      } catch (error) {
        console.error('Failed to fetch stats:', error)
        // Fallback to mock data
        setStats({
          totalUsers: 12847,
          totalReferrals: 3421,
          chestsOpened: 8934,
          joinedToday: 234
        })
      }
    }
    
    fetchStats()
  }, [])

  const statsConfig = [
    {
      icon: Users,
      value: stats.totalUsers.toLocaleString(),
      label: 'Users Joined',
      color: 'text-brand',
      bgColor: 'bg-brand bg-opacity-10'
    },
    {
      icon: Gift,
      value: stats.chestsOpened.toLocaleString(),
      label: 'Chests Opened',
      color: 'text-purple-600',
      bgColor: 'bg-purple-600 bg-opacity-10'
    },
    {
      icon: DollarSign,
      value: stats.totalReferrals.toLocaleString(),
      label: 'Total Referrals',
      color: 'text-success-600',
      bgColor: 'bg-success-600 bg-opacity-10'
    },
    {
      icon: TrendingUp,
      value: stats.joinedToday.toLocaleString(),
      label: 'Joined Today',
      color: 'text-gold',
      bgColor: 'bg-gold bg-opacity-10'
    }
  ]

  return (
    <section className="py-20 px-6 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Join the Community
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Thousands of users are already earning daily rewards. Don't miss out on your chance to win big.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statsConfig.map((stat, index) => (
            <Card key={index} className="text-center">
              <div className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
              <p className="text-gray-300 font-medium">{stat.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection