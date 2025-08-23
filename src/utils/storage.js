const STORAGE_KEY = 'zoggy_user_data'

export const saveUserToStorage = (user) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  } catch (error) {
    console.error('Failed to save user data:', error)
  }
}

export const loadUserFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Failed to load user data:', error)
    return null
  }
}

export const clearUserFromStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear user data:', error)
  }
}