import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import Button from './Button'

const CopyField = ({ value, label, className = '' }) => {
  const [copied, setCopied] = useState(false)
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }
  
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <div className="flex space-x-2">
        <input
          type="text"
          value={value}
          readOnly
          className="input-field flex-1 font-mono text-sm"
        />
        <Button
          variant="secondary"
          size="sm"
          onClick={handleCopy}
          className="px-3"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  )
}

export default CopyField