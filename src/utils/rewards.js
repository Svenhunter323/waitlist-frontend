export const generateChestReward = (isFirstChest = false) => {
  const rand = Math.random()
  
  if (isFirstChest) {
    // First chest: 70% → $0.10, 30% → $0.20
    return rand < 0.7 ? 0.10 : 0.20
  }
  
  // Other chests: 20% → $0, 60% → $0.10, 5% → $0.20, 5% → $0.50, 5% → $1.00
  if (rand < 0.2) return 0
  if (rand < 0.8) return 0.10
  if (rand < 0.85) return 0.20
  if (rand < 0.9) return 0.50
  if (rand < 0.95) return 1.00
  return 1.00
}

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}