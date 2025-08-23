// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000
}

// Application Constants
export const APP_CONFIG = {
  NAME: 'Zoggy',
  TAGLINE: 'Open Your Daily Chest & Win Real Rewards',
  MAX_REWARD: 10000,
  MIN_REWARD: 10,
  CHEST_COOLDOWN_HOURS: 24,
  REFERRAL_BONUS: 100
}

// Social Links
export const SOCIAL_LINKS = {
  TELEGRAM: 'https://t.me/zoggycasino',
  TWITTER: 'https://twitter.com/zoggybet',
  SUPPORT_EMAIL: 'help@zoggybet.com',
  WEBSITE: 'https://zoggybet.com'
}

// Storage Keys
export const STORAGE_KEYS = {
  USER_DATA: 'zoggy_user_data',
  AUTH_TOKEN: 'auth_token',
  ADMIN_TOKEN: 'admin_token',
  REFERRAL_CODE: 'referralCode'
}

// Error Messages
export const ERROR_MESSAGES = {
  INVALID_EMAIL: 'Please enter a valid email address',
  EMAIL_REQUIRED: 'Email is required',
  NETWORK_ERROR: 'Network error - please check your connection',
  CHEST_COOLDOWN: 'You can only open one chest per day',
  TELEGRAM_REQUIRED: 'You must join our Telegram community first',
  UNAUTHORIZED: 'Invalid credentials',
  SERVER_ERROR: 'Server error - please try again later'
}

// Success Messages
export const SUCCESS_MESSAGES = {
  WAITLIST_JOINED: 'Successfully joined the waitlist!',
  CHEST_OPENED: 'Congratulations! You opened your daily chest!',
  TELEGRAM_JOINED: 'Welcome to our Telegram community!',
  LINK_COPIED: 'Referral link copied to clipboard!'
}

// Animation Durations (in milliseconds)
export const ANIMATION_DURATIONS = {
  CHEST_OPENING: 3000,
  NOTIFICATION: 2000,
  HOVER_TRANSITION: 200,
  PAGE_TRANSITION: 300
}