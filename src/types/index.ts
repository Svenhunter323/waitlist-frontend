export interface User {
  id: string;
  email: string;
  position: number;
  referralCode: string;
  referredUsers: number;
  credits: number;
  claimCode: string;
  lastChestOpen?: Date;
}

export interface WaitlistStats {
  totalUsers: number;
}

export interface Prize {
  amount: number;
  type: 'cash' | 'credits';
}

export interface FakeWin {
  id: string;
  username: string;
  prize: string;
  timestamp: Date;
}