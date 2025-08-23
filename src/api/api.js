import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API helper methods
export const waitlistSignup = (email, ref) => api.post('/waitlist', { email, ref });
export const getDashboardData = (token) => api.get('/dashboard', { headers: { Authorization: `Bearer ${token}` } });
export const getLastWins = () => api.get('/last-wins');
export const openChest = (token) => api.post('/open-chest', {}, { headers: { Authorization: `Bearer ${token}` } });
export const getTelegramLink = (token) => api.get('/telegram/deeplink', { headers: { Authorization: `Bearer ${token}` } });
