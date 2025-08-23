// Analytics and tracking utilities
export const trackEvent = (eventName, properties = {}) => {
  // In production, this would integrate with analytics services like:
  // - Google Analytics
  // - Mixpanel
  // - Amplitude
  // - PostHog
  
  if (import.meta.env.DEV) {
    console.log('📊 Analytics Event:', eventName, properties)
  }
  
  // Example implementation for Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, properties)
  }
}

export const trackUserSignup = (user, referralCode = null) => {
  trackEvent('user_signup', {
    user_id: user.id,
    email: user.email,
    position: user.position,
    has_referral: !!referralCode,
    referral_code: referralCode
  })
}

export const trackChestOpen = (user, reward) => {
  trackEvent('chest_opened', {
    user_id: user.id,
    reward_amount: reward,
    user_credits: user.credits,
    chest_number: user.chestsOpened || 1
  })
}

export const trackReferralShare = (user, platform) => {
  trackEvent('referral_shared', {
    user_id: user.id,
    platform,
    referral_code: user.referralCode,
    total_referrals: user.referredUsers
  })
}

export const trackTelegramJoin = (user) => {
  trackEvent('telegram_joined', {
    user_id: user.id,
    user_position: user.position
  })
}

export const trackPageView = (page, user = null) => {
  trackEvent('page_view', {
    page,
    user_id: user?.id,
    timestamp: new Date().toISOString()
  })
}