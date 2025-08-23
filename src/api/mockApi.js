import { generateFakeWin, mockAdminStats } from '../utils/mockData'
import { createUser, validateEmail } from '../utils/userUtils'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const mockApi = {
  // POST /api/waitlist
  async joinWaitlist(email, referralCode = null) {
    await delay(1000)
    
    if (!validateEmail(email)) {
      throw new Error('Invalid email address')
    }
    
    const user = createUser(email, referralCode)
    return {
      success: true,
      user,
      message: 'Successfully joined waitlist'
    }
  },

  // GET /api/dashboard
  async getDashboard(userId) {
    await delay(500)
    
    return {
      success: true,
      data: {
        totalUsers: 12847,
        chestsOpenedToday: 234,
        totalRewardsDistributed: 1247890
      }
    }
  },

  // GET /api/last-wins
  async getLastWins() {
    await delay(300)
    
    const wins = Array.from({ length: 10 }, generateFakeWin)
    return {
      success: true,
      wins
    }
  },

  // POST /api/open-chest
  async openChest(userId) {
    await delay(2000)
    
    const reward = Math.floor(Math.random() * 1000) + 10
    return {
      success: true,
      reward,
      message: `Congratulations! You won ${reward} credits!`
    }
  },

  // GET /api/telegram/deeplink
  async getTelegramDeeplink(userId) {
    await delay(200)
    
    return {
      success: true,
      deeplink: `https://t.me/zoggybot?start=${userId}`,
      channelLink: 'https://t.me/zoggycasino'
    }
  },

  // POST /api/admin/login
  async adminLogin(username, password) {
    await delay(800)
    
    if (username === 'admin@zoggy.com' && password === 'zoggy2024') {
      return {
        success: true,
        token: 'mock-admin-token',
        user: {
          id: 'admin',
          email: username,
          role: 'admin'
        }
      }
    }
    
    throw new Error('Invalid credentials')
  },

  // GET /api/admin/stats
  async getAdminStats() {
    await delay(600)
    
    return {
      success: true,
      stats: mockAdminStats
    }
  }
}