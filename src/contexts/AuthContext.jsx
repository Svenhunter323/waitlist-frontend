import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { authApi } from '../api/endpoints'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

const initialState = {
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
        isAuthenticated: !!action.payload
      }
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isLoading: false
      }
    case 'APPLY_REWARD':
      return {
        ...state,
        user: {
          ...state.user,
          totalCredits: state.user.totalCredits + action.payload.amount,
          nextChestAt: action.payload.nextChestAt,
          lastChestOpenAt: new Date().toISOString()
        }
      }
    case 'SET_TELEGRAM_VERIFIED':
      return {
        ...state,
        user: {
          ...state.user,
          telegramVerified: action.payload
        }
      }
    case 'LOGOUT':
      return {
        ...initialState,
        isLoading: false
      }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }
    default:
      return state
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      dispatch({ type: 'SET_TOKEN', payload: token })
      fetchUser(token)
    } else {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  const fetchUser = async (token) => {
    try {
      const user = await authApi.getMe(token)
      dispatch({ type: 'SET_USER', payload: user })
    } catch (error) {
      console.error('Failed to fetch user:', error)
      logout()
    }
  }

  const login = (token, user) => {
    localStorage.setItem('auth_token', token)
    dispatch({ type: 'SET_TOKEN', payload: token })
    dispatch({ type: 'SET_USER', payload: user })
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    dispatch({ type: 'LOGOUT' })
  }

  const value = {
    ...state,
    dispatch,
    login,
    logout,
    fetchUser: () => fetchUser(state.token)
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}