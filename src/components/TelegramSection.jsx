import React from 'react'
import { MessageCircle, Users, Bell, Shield } from 'lucide-react'

const TelegramSection = () => {
  const handleJoinTelegram = () => {
    window.open('https://t.me/zoggycasino', '_blank')
  }

  const features = [
    {
      icon: Bell,
      title: 'Instant Notifications',
      description: 'Get notified when new features launch'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with other winners and share tips'
    },
    {
      icon: Shield,
      title: 'Exclusive Access',
      description: 'Members-only contests and bonus rewards'
    }
  ]

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <MessageCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Join Our Community
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Connect with thousands of winners in our Telegram community. Get exclusive updates, tips, and bonus opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="card text-center hover:scale-105 transition-transform duration-300 dark:bg-gray-800 dark:border-gray-700">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="card max-w-md mx-auto bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
          <div className="mb-6">
            <p className="text-blue-800 dark:text-blue-300 font-semibold mb-2">5,672 members and growing!</p>
            <p className="text-blue-700 dark:text-blue-400 text-sm">
              Join now to unlock chest opening and start earning daily rewards
            </p>
          </div>
          
          <button
            onClick={handleJoinTelegram}
            className="btn-primary w-full text-lg py-4 flex items-center justify-center space-x-2"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Join Telegram Community</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default TelegramSection