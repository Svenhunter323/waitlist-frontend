import React, { useState } from 'react'
import { useAppContext } from '../contexts/AppContext'
import { SUCCESS_MESSAGES } from '../utils/constants'
import { Copy, Share2, Users, Gift, CheckCircle } from 'lucide-react'
import { generateReferralLink, copyToClipboard } from '../utils/userUtils'

const ReferralSection = () => {
  const { user, notifications } = useAppContext()
  const [copied, setCopied] = useState(false)

  if (!user || !user.emailVerified) return null

  const referralLink = generateReferralLink(user.referralCode)

  const handleCopyLink = async () => {
    const success = await copyToClipboard(referralLink)
    if (success) {
      setCopied(true)
      notifications.showSuccess(SUCCESS_MESSAGES.LINK_COPIED)
      setTimeout(() => setCopied(false), 2000)
    } else {
      notifications.showError('Failed to copy link to clipboard')
    }
  }

  const handleShareTwitter = () => {
    const tweetText = `🚀 Join me on @Zoggy and start earning daily rewards! Use my referral link to get started: ${referralLink}`
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
    window.open(twitterUrl, '_blank')
  }

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Invite Friends & Earn More
          </h2>
          <p className="text-xl text-gray-600">
            Get $100 credits for every friend who joins using your referral link
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Referral Stats */}
          <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Referral Stats</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-purple-600" />
                  <span className="font-semibold text-gray-700">Friends Referred</span>
                </div>
                <span className="text-2xl font-bold text-purple-600">{user.referredUsers}</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                <div className="flex items-center space-x-3">
                  <Gift className="w-6 h-6 text-success-600" />
                  <span className="font-semibold text-gray-700">Referral Earnings</span>
                </div>
                <span className="text-2xl font-bold text-success-600">
                  ${(user.referredUsers * 100).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Referral Link */}
          <div className="card">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Referral Link</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-sm text-gray-600 mb-2">Your unique referral code:</p>
                <p className="text-2xl font-bold text-primary-600 font-mono">{user.referralCode}</p>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="input-field pr-12 font-mono text-sm"
                />
                <button
                  onClick={handleCopyLink}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {copied ? (
                    <CheckCircle className="w-5 h-5 text-success-600" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleCopyLink}
                  className="btn-secondary flex-1 flex items-center justify-center space-x-2"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>
                <button
                  onClick={handleShareTwitter}
                  className="btn-primary flex-1 flex items-center justify-center space-x-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="card max-w-2xl mx-auto bg-gradient-to-r from-success-50 to-emerald-50 border-success-200">
            <h3 className="text-xl font-bold text-success-800 mb-3">How Referrals Work</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="w-12 h-12 bg-success-600 rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold">
                  1
                </div>
                <p className="text-success-700 font-semibold">Share your link</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-success-600 rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold">
                  2
                </div>
                <p className="text-success-700 font-semibold">Friend joins waitlist</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-success-600 rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold">
                  3
                </div>
                <p className="text-success-700 font-semibold">You both get $100</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReferralSection