import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { userReducer, initialUserState } from '../utils/userReducer'
import { loadUserFromStorage, saveUserToStorage } from '../utils/storage'
import { useNotifications } from '../hooks/useNotifications'
import NotificationToast from '../components/NotificationToast'

const AppContext = createContext()

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState)
  const notifications = useNotifications()

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUser = loadUserFromStorage()
    if (savedUser) {
      dispatch({ type: 'LOAD_USER', payload: savedUser })
    }
  }, [])

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (state.user) {
      saveUserToStorage(state.user)
    }
  }, [state.user])

  const value = {
    ...state,
    dispatch,
    notifications
  }

  return (
    <>
      <AppContext.Provider value={value}>
        {children}
      </AppContext.Provider>
      
      {/* Render notifications */}
      {notifications.notifications.map((notification) => (
        <NotificationToast
          key={notification.id}
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={() => notifications.removeNotification(notification.id)}
        />
      ))}
    </>
  )
}