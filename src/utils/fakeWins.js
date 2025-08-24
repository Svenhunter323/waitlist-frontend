const CRYPTO_NAMES = [
  'CryptoKing', 'DiamondHands', 'MoonWalker', 'BitcoinBull', 'EthereumElite',
  'SatoshiSon', 'BlockchainBoss', 'CoinMaster', 'TokenTitan', 'DeFiDegen',
  'NFTNinja', 'MetaverseMogul', 'Web3Warrior', 'CryptoChamp', 'DigitalDuke',
  'HashHero', 'MiningMaster', 'StakingStud', 'YieldYogi', 'LiquidityLord',
  'GasGuru', 'SmartContractSage', 'DecentralizedDon', 'ConsensusKing', 'NodeNinja'
]

const GAMING_NAMES = [
  'GameMaster', 'PixelPro', 'LootLegend', 'QuestKing', 'BossBeater',
  'AchievementAce', 'SkillShot', 'ComboKing', 'PowerPlayer', 'EliteGamer',
  'RaidLeader', 'DungeonDiver', 'PvPPro', 'SpeedRunner', 'HighScorer',
  'GuildMaster', 'LevelMax', 'XPHunter', 'ItemFarmer', 'CriticalHit',
  'RespawnKing', 'FragMaster', 'HeadshotHero', 'KillStreaker', 'VictoryVault'
]

const NEUTRAL_NAMES = [
  'LuckyStrike', 'FortuneSeeker', 'WinnerTakesAll', 'JackpotJoe', 'PrizeFighter',
  'MoneyMaker', 'BigWinner', 'CashKing', 'TreasureHunter', 'RichRider',
  'GoldDigger', 'CoinCollector', 'WealthWizard', 'ProfitPro', 'ChestChaser',
  'RewardRanger', 'BonusHunter', 'CreditCrusher', 'PayoutPro', 'WinStreak',
  'LuckyLion', 'GoldenGamer', 'PrizePlayer', 'VictoryVault', 'CashCow'
]

const ALL_NAMES = [...CRYPTO_NAMES, ...GAMING_NAMES, ...NEUTRAL_NAMES]

class FakeWinsGenerator {
  constructor() {
    this.usedNames = new Set()
    this.lastBigWin = 0
    this.lastMediumWin = 0
    this.bigWinPending = false
    this.microBurstActive = false
    this.lullActive = false
    this.nextMicroBurst = Date.now() + this.randomBetween(6, 10) * 60 * 1000
    this.nextLull = Date.now() + this.randomBetween(10, 15) * 60 * 1000
  }

  randomBetween(min, max) {
    return Math.random() * (max - min) + min
  }

  getRandomName() {
    // Clear used names if we've used too many (90 min cycle simulation)
    if (this.usedNames.size > ALL_NAMES.length * 0.8) {
      this.usedNames.clear()
    }

    let availableNames = ALL_NAMES.filter(name => !this.usedNames.has(name))
    if (availableNames.length === 0) {
      availableNames = ALL_NAMES
      this.usedNames.clear()
    }

    const name = availableNames[Math.floor(Math.random() * availableNames.length)]
    this.usedNames.add(name)
    return name
  }

  generateReward() {
    const now = Date.now()
    const timeSinceLastBig = now - this.lastBigWin
    const timeSinceLastMedium = now - this.lastMediumWin

    // Big win constraints
    const canBigWin = timeSinceLastBig > 3 * 60 * 60 * 1000 // 3 hours
    const canMediumWin = timeSinceLastMedium > 60 * 60 * 1000 // 1 hour

    // After big win, emit small wins
    if (this.bigWinPending) {
      this.bigWinPending = false
      return this.randomBetween(0.1, 1.0)
    }

    const rand = Math.random()

    // Big wins (>$10k) - very rare
    if (canBigWin && rand < 0.001) {
      const amount = this.randomBetween(10000, 50000)
      this.lastBigWin = now
      this.bigWinPending = true
      return amount
    }

    // Medium wins ($2k-$10k)
    if (canMediumWin && rand < 0.005) {
      const amount = this.randomBetween(2000, 9999)
      this.lastMediumWin = now
      return amount
    }

    // Regular distribution
    if (rand < 0.4) return this.randomBetween(0.1, 1.0)
    if (rand < 0.7) return this.randomBetween(1.0, 10.0)
    if (rand < 0.85) return this.randomBetween(10.0, 50.0)
    if (rand < 0.95) return this.randomBetween(50.0, 200.0)
    return this.randomBetween(200.0, 1999.0)
  }

  getNextDelay() {
    const now = Date.now()

    // Check for lull period
    if (now > this.nextLull && !this.lullActive) {
      this.lullActive = true
      setTimeout(() => {
        this.lullActive = false
        this.nextLull = now + this.randomBetween(10, 15) * 60 * 1000
      }, this.randomBetween(4, 5) * 60 * 1000)
      return this.randomBetween(4, 5) * 60 * 1000
    }

    // Check for micro-burst
    if (now > this.nextMicroBurst && !this.microBurstActive) {
      this.microBurstActive = true
      this.nextMicroBurst = now + this.randomBetween(6, 10) * 60 * 1000
      setTimeout(() => {
        this.microBurstActive = false
      }, 30000) // 30 second burst
      return this.randomBetween(2, 6) * 1000
    }

    // During micro-burst
    if (this.microBurstActive) {
      return this.randomBetween(2, 6) * 1000
    }

    // During lull
    if (this.lullActive) {
      return this.randomBetween(4, 5) * 60 * 1000
    }

    // Normal cadence
    return this.randomBetween(60, 120) * 1000
  }

  generateWin() {
    return {
      id: Date.now() + Math.random(),
      username: this.getRandomName(),
      amount: this.generateReward(),
      timestamp: new Date(),
      type: 'chest'
    }
  }
}

export const fakeWinsGenerator = new FakeWinsGenerator()