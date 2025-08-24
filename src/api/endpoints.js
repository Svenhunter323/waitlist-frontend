import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      window.location.href = '/'
    }
    return Promise.reject(error.response?.data || error.message)
  }
)

export const waitlistApi = {
  async joinWaitlist(email, referralCode = null) {
    return await api.post('/waitlist', { email, referralCode })
  }
}

export const authApi = {
  async getMe(token) {
    return await api.get('/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
  },

  async resendVerification(email) {
    return await api.post('/auth/resend', { email })
  }
}

export const telegramApi = {
  async getDeeplink() {
    return await api.get('/telegram/deeplink')
  },

  async getVerifyStatus() {
    return await api.get('/telegram/verify-status')
  }
}

export const chestApi = {
  async openChest() {
    return await api.post('/chest/open')
  }
}

export const winsApi = {
  async getLatestWins(limit = 24) {
    return await api.get(`/wins/latest?limit=${limit}`)
  }
}

export const leaderboardApi = {
  async getTop10() {
    return await api.get('/leaderboard/top10')
  }
}

export const statsApi = {
  async getStats() {
    return await api.get('/stats')
  }
}

export const adminApi = {
  async getUsers() {
    return await api.get('/admin/users')
  },

  async getReferrals() {
    return await api.get('/admin/referrals')
  },

  async exportClaimCodes() {
    const response = await axios.get(`${API_BASE_URL}/admin/exports/claim-codes.csv`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
      },
      responseType: 'blob'
    })
    return response.data
  }
}