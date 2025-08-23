export const initialUserState = {
  user: null,
  totalUsers: 12847,
  currentView: 'landing',
  pendingVerification: null,
  isLoading: false,
  error: null
}

export const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false }
    
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    
    case 'SIGNUP_USER':
      return {
        ...state,
        user: action.payload.emailVerified ? action.payload : null,
        pendingVerification: action.payload.emailVerified ? null : action.payload,
        totalUsers: state.totalUsers + 1,
        currentView: action.payload.emailVerified ? 'dashboard' : 'email-verification',
        isLoading: false,
        error: null
      }
    
    case 'EMAIL_VERIFIED':
      return {
        ...state,
        user: action.payload,
        pendingVerification: null,
        currentView: 'dashboard',
        isLoading: false,
        error: null
      }
    
    case 'SET_PENDING_VERIFICATION':
      return {
        ...state,
        pendingVerification: action.payload,
        currentView: 'email-verification'
      }
    
    case 'LOAD_USER':
      return {
        ...state,
        user: action.payload,
        currentView: action.payload ? 'dashboard' : 'landing'
      }
    
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      }
    
    case 'OPEN_CHEST':
      const reward = Math.floor(Math.random() * 1000) + 10
      return {
        ...state,
        user: {
          ...state.user,
          credits: state.user.credits + reward,
          lastChestOpen: new Date().toISOString(),
          totalEarned: (state.user.totalEarned || 0) + reward
        }
      }
    
    case 'SET_VIEW':
      return { ...state, currentView: action.payload }
    
    case 'INCREMENT_TOTAL_USERS':
      return { ...state, totalUsers: state.totalUsers + 1 }
    
    default:
      return state
  }
}