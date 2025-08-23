import { ERROR_MESSAGES } from './constants'

export const validateEmail = (email) => {
  if (!email) {
    return { isValid: false, error: ERROR_MESSAGES.EMAIL_REQUIRED }
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { isValid: false, error: ERROR_MESSAGES.INVALID_EMAIL }
  }
  
  return { isValid: true, error: null }
}

export const validatePassword = (password, minLength = 8) => {
  if (!password) {
    return { isValid: false, error: 'Password is required' }
  }
  
  if (password.length < minLength) {
    return { isValid: false, error: `Password must be at least ${minLength} characters` }
  }
  
  return { isValid: true, error: null }
}

export const validateReferralCode = (code) => {
  if (!code) {
    return { isValid: true, error: null } // Referral code is optional
  }
  
  const codeRegex = /^[A-Z0-9]{6}$/
  if (!codeRegex.test(code)) {
    return { isValid: false, error: 'Invalid referral code format' }
  }
  
  return { isValid: true, error: null }
}

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 255) // Limit length
}

export const validateForm = (fields, validators) => {
  const errors = {}
  let isValid = true
  
  Object.keys(validators).forEach(field => {
    const validator = validators[field]
    const value = fields[field]
    
    if (typeof validator === 'function') {
      const result = validator(value)
      if (!result.isValid) {
        errors[field] = result.error
        isValid = false
      }
    }
  })
  
  return { isValid, errors }
}