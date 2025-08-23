import apiClient from './apiClient'

export const waitlistApi = {
  // POST /api/waitlist
  async joinWaitlist(email, referralCode = null) {
    return await apiClient.post('/waitlist', {
      email,
      referralCode
    })
  },

  // POST /api/resend-verification
  async resendVerification(email) {
    return await apiClient.post('/resend-verification', {
      email
    })
  },

  // GET /api/verify-email
  async verifyEmail(token) {
    return await apiClient.get(`/verify-email?token=${token}`)
  },

  // GET /api/waitlist/stats
  async getWaitlistStats() {
    return await apiClient.get('/waitlist/stats')
  }
}

export const userApi = {
  // GET /api/dashboard
  async getDashboard(userId) {
    return await apiClient.get(`/dashboard/${userId}`)
  },

  // PUT /api/user/telegram
  async updateTelegramStatus(userId, telegramVerified = true) {
    return await apiClient.put(`/user/${userId}/telegram`, {
      telegramVerified
    })
  }
}

export const chestApi = {
  // POST /api/open-chest
  async openChest(userId) {
    return await apiClient.post('/open-chest', {
      userId
    })
  },

  // GET /api/chest/status
  async getChestStatus(userId) {
    return await apiClient.get(`/chest/status/${userId}`)
  }
}

export const winsApi = {
  // GET /api/last-wins
  async getLastWins(limit = 10) {
    return await apiClient.get(`/last-wins?limit=${limit}`)
  }
}

export const telegramApi = {
  // GET /api/telegram/deeplink
  async getTelegramDeeplink(userId) {
    return await apiClient.get(`/telegram/deeplink/${userId}`)
  },

  // POST /api/telegram/verify
  async verifyTelegramUser(userId, telegramData) {
    return await apiClient.post('/telegram/verify', {
      userId,
      telegramData
    })
  }
}

export const adminApi = {
  // POST /api/admin/login
  async login(username, password) {
    return await apiClient.post('/admin/login', {
      username,
      password
    })
  },

  // GET /api/admin/stats
  async getStats() {
    return await apiClient.get('/admin/stats')
  },

  // GET /api/admin/users
  async getUsers(page = 1, limit = 50) {
    return await apiClient.get(`/admin/users?page=${page}&limit=${limit}`)
  },

  // GET /api/admin/export
  async exportUsers(format = 'csv') {
    return await apiClient.get(`/admin/export?format=${format}`, {
      responseType: 'blob'
    })
  }
}