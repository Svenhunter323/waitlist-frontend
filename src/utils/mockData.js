export const mockUsernames = [
  'CryptoWolf', 'DiamondHands', 'MoonRider', 'GoldRush', 'LuckyStrike',
  'CoinMaster', 'WinnerTakesAll', 'FortuneSeeker', 'JackpotJoe', 'PrizeFighter',
  'MoneyMaker', 'BigWinner', 'CashKing', 'LootLegend', 'TreasureHunter',
  'RichRider', 'GoldDigger', 'CoinCollector', 'WealthWizard', 'ProfitPro',
  'ChestChaser', 'RewardRanger', 'BonusHunter', 'CreditCrusher', 'PayoutPro',
  'WinStreak', 'LuckyLion', 'GoldenGamer', 'PrizePlayer', 'VictoryVault'
]

export const generateFakeWin = () => {
  const username = mockUsernames[Math.floor(Math.random() * mockUsernames.length)]
  const amount = Math.floor(Math.random() * 2000) + 10 // $10-$2010
  const id = Date.now() + Math.random()
  
  return {
    id,
    username,
    amount,
    timestamp: new Date(),
    type: Math.random() > 0.7 ? 'jackpot' : 'regular'
  }
}

export const mockAdminStats = {
  totalUsers: 12847,
  totalSignupsToday: 234,
  totalCreditsDistributed: 1247890,
  totalChestsOpened: 8934,
  telegramMembers: 5672,
  conversionRate: 23.4,
  topReferrers: [
    { email: 'crypto***@gmail.com', referrals: 47, credits: 4700 },
    { email: 'diamond***@yahoo.com', referrals: 32, credits: 3200 },
    { email: 'moon***@outlook.com', referrals: 28, credits: 2800 },
    { email: 'gold***@proton.me', referrals: 19, credits: 1900 },
    { email: 'lucky***@gmail.com', referrals: 15, credits: 1500 }
  ],
  recentSignups: [
    { email: 'user***@gmail.com', position: 12847, joinedAt: '2 minutes ago' },
    { email: 'crypto***@yahoo.com', position: 12846, joinedAt: '5 minutes ago' },
    { email: 'winner***@outlook.com', position: 12845, joinedAt: '8 minutes ago' },
    { email: 'player***@proton.me', position: 12844, joinedAt: '12 minutes ago' },
    { email: 'gamer***@gmail.com', position: 12843, joinedAt: '15 minutes ago' }
  ]
}