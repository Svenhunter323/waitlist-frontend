import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { userReducer, initialUserState } from '../utils/userReducer'
import { loadUserFromStorage, saveUserToStorage } from '../utils/storage'

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
    dispatch
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}