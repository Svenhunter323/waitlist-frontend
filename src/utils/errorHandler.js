export class ApiError extends Error {
  constructor(message, status, code) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const message = error.response.data?.message || 'Server error occurred'
    return new ApiError(message, error.response.status, error.response.data?.code)
  } else if (error.request) {
    // Request was made but no response received
    return new ApiError('Network error - please check your connection', 0, 'NETWORK_ERROR')
  } else {
    // Something else happened
    return new ApiError(error.message || 'An unexpected error occurred', 0, 'UNKNOWN_ERROR')
  }
}

export const isNetworkError = (error) => {
  return error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')
}

export const isAuthError = (error) => {
  return error.status === 401 || error.code === 'UNAUTHORIZED'
}

export const getErrorMessage = (error) => {
  if (typeof error === 'string') return error
  if (error instanceof ApiError) return error.message
  if (error.message) return error.message
  return 'An unexpected error occurred'
}