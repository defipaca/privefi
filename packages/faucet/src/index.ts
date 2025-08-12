import { Result, Ok, Err } from '@privefi/core';

interface Balance {
  address: string;
  amount: number;
  lastMint: Date;
}

export class FaucetEngine {
  private balances: Map<string, Balance> = new Map();
  private dailyLimit: number;
  private mintToken: string;

  constructor(dailyLimit: number = 500, mintToken: string = 'TESTUSD') {
    this.dailyLimit = dailyLimit;
    this.mintToken = mintToken;
  }

  async mint(address: string, amount: number): Promise<Result<{ newBalance: number; receipt: any }>> {
    // Check daily limit
    const existing = this.balances.get(address);
    const now = new Date();
    
    if (existing) {
      const timeSinceLastMint = now.getTime() - existing.lastMint.getTime();
      const hoursSinceLastMint = timeSinceLastMint / (1000 * 60 * 60);
      
      if (hoursSinceLastMint < 24) {
        return Err(new Error('Daily limit reached. Try again tomorrow.'));
      }
    }

    if (amount > this.dailyLimit) {
      return Err(new Error(`Amount exceeds daily limit of ${this.dailyLimit}`));
    }

    // Update balance
    const currentBalance = existing?.amount || 0;
    const newBalance = currentBalance + amount;
    
    this.balances.set(address, {
      address,
      amount: newBalance,
      lastMint: now
    });

    // Generate mock receipt
    const receipt = {
      txId: `faucet_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      from: 'faucet',
      to: address,
      amount,
      token: this.mintToken,
      timestamp: now.toISOString()
    };

    return Ok({ newBalance, receipt });
  }

  getBalance(address: string): number {
    return this.balances.get(address)?.amount || 0;
  }

  getAllBalances(): Balance[] {
    return Array.from(this.balances.values());
  }

  // Client helper function
  static async getTestUSD(address: string, amount: number, faucetUrl: string = 'http://localhost:3001'): Promise<Result<any>> {
    try {
      const response = await fetch(`${faucetUrl}/api/mint`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ address, amount })
      });

      const data = await response.json();
      
      if (!response.ok) {
        return Err(new Error(data.error || 'Faucet request failed'));
      }

      return Ok(data);
    } catch (error) {
      return Err(error as Error);
    }
  }
}

export default FaucetEngine;