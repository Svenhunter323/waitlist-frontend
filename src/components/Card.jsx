import React from 'react'
import { motion } from 'framer-motion'

const Card = ({ children, className = '', hover = true, ...props }) => {
  const baseClasses = 'card'
  const classes = `${baseClasses} ${className}`
  
  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        className={classes}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export default Card