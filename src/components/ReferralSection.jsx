import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Copy, Share2, Users, Gift } from 'lucide-react'
import { formatCurrency } from '../utils/rewards'
import CopyField from './CopyField'
import Card from './Card'
import Button from './Button'

const ReferralSection = () => {
  const { user } = useAuth()

  if (!user || !user.emailVerified) return null

  const referralLink = `${window.location.origin}?ref=${user.referralCode}`

  const handleShareTwitter = () => {
    const tweetText = `🚀 Join me on @Zoggy and start earning daily rewards! Use my referral link to get started: ${referralLink}`
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
    window.open(twitterUrl, '_blank')
  }

  return (
    <section className="py-20 px-6 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Invite Friends & Earn More
          </h2>
          <p className="text-xl text-gray-300">
            Get $100 credits for every friend who joins using your referral link
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Referral Stats */}
          <Card className="bg-gradient-to-br from-purple-600 bg-opacity-10 to-purple-800 bg-opacity-10 border-purple-600 border-opacity-20">
            <h3 className="text-2xl font-bold text-white mb-6">Your Referral Stats</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-purple-400" />
                  <span className="font-semibold text-gray-300">Friends Referred</span>
                </div>
                <span className="text-2xl font-bold text-purple-400">{user.referredUsers || 0}</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Gift className="w-6 h-6 text-success-400" />
                  <span className="font-semibold text-gray-300">Referral Earnings</span>
                </div>
                <span className="text-2xl font-bold text-success-400">
                  {formatCurrency((user.referredUsers || 0) * 100)}
                </span>
              </div>
            </div>
          </Card>

          {/* Referral Link & Claim Code */}
          <Card>
            <h3 className="text-2xl font-bold text-white mb-6">Your Links & Code</h3>
            
            <div className="space-y-6">
              <CopyField
                label="Claim Code"
                value={user.claimCode}
              />
              
              <CopyField
                label="Referral Link"
                value={referralLink}
              />
              
              <Button
                variant="primary"
                onClick={handleShareTwitter}
                className="w-full flex items-center justify-center space-x-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Share on Twitter</span>
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto bg-success-600 bg-opacity-10 border-success-600 border-opacity-20">
            <h3 className="text-xl font-bold text-success-400 mb-3">How Referrals Work</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="w-12 h-12 bg-success-600 rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold">
                  1
                </div>
                <p className="text-success-300 font-semibold">Share your link</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-success-600 rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold">
                  2
                </div>
                <p className="text-success-300 font-semibold">Friend joins waitlist</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-success-600 rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold">
                  3
                </div>
                <p className="text-success-300 font-semibold">You both get $100</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default ReferralSection