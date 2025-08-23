export const generateUserId = () => {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36)
}

export const generateReferralCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export const generateClaimCode = () => {
  const prefix = 'ZOGGY'
  const suffix = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `${prefix}-${suffix}`
}

export const createUser = (email, referralCode = null) => {
  const position = Math.floor(Math.random() * 1000) + 12847
  
  return {
    id: generateUserId(),
    email,
    position,
    referralCode: generateReferralCode(),
    referredUsers: 0,
    credits: 0,
    totalEarned: 0,
    claimCode: generateClaimCode(),
    lastChestOpen: null,
    hasJoinedTelegram: false,
    joinedAt: new Date().toISOString(),
    referredBy: referralCode
  }
}

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export const canOpenChest = (lastChestOpen) => {
  if (!lastChestOpen) return true
  
  const now = new Date()
  const lastOpen = new Date(lastChestOpen)
  const timeDiff = now.getTime() - lastOpen.getTime()
  const hoursDiff = timeDiff / (1000 * 3600)
  
  return hoursDiff >= 24
}

export const getNextChestTime = (lastChestOpen) => {
  if (!lastChestOpen) return '00:00:00'
  
  const now = new Date()
  const lastOpen = new Date(lastChestOpen)
  const nextOpen = new Date(lastOpen.getTime() + 24 * 60 * 60 * 1000)
  
  if (now >= nextOpen) return '00:00:00'
  
  const timeDiff = nextOpen.getTime() - now.getTime()
  const hours = Math.floor(timeDiff / (1000 * 60 * 60))
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    return false
  }
}

export const generateReferralLink = (referralCode) => {
  return `${window.location.origin}?ref=${referralCode}`
}