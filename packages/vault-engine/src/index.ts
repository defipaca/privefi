import { Vault, Investor, Position, Distribution, Transaction, Result, Ok, Err } from '@privefi/core';

export class VaultEngine {
  private vaults: Map<string, Vault> = new Map();
  private investors: Map<string, Investor> = new Map();
  private positions: Map<string, Position> = new Map();
  private distributions: Map<string, Distribution> = new Map();

  // Vault Operations
  createVault(params: {
    id: string;
    name: string;
    targetAPY: number;
    reservePct: number;
    mgmtFeePct: number;
    perfFeePct: number;
  }): Result<Vault> {
    if (this.vaults.has(params.id)) {
      return Err(new Error(`Vault ${params.id} already exists`));
    }

    const vault: Vault = {
      ...params,
      totalShares: 0,
      totalAssets: 0,
      sharePrice: 1.0,
      createdAt: new Date(),
      lastAccrual: new Date()
    };

    this.vaults.set(params.id, vault);
    return Ok(vault);
  }

  getVault(id: string): Result<Vault> {
    const vault = this.vaults.get(id);
    if (!vault) {
      return Err(new Error(`Vault ${id} not found`));
    }
    return Ok(vault);
  }

  // Investor Operations
  createInvestor(address: string): Result<Investor> {
    const id = `investor_${address}`;
    if (this.investors.has(id)) {
      return Ok(this.investors.get(id)!);
    }

    const investor: Investor = {
      id,
      address,
      createdAt: new Date()
    };

    this.investors.set(id, investor);
    return Ok(investor);
  }

  // Investment Operations
  invest(vaultId: string, investorAddress: string, amount: number): Result<{ position: Position; transaction: Transaction }> {
    const vaultResult = this.getVault(vaultId);
    if (!vaultResult.success) return Err(vaultResult.error!);
    
    const vault = vaultResult.data!;
    const investorResult = this.createInvestor(investorAddress);
    if (!investorResult.success) return Err(investorResult.error!);
    
    const investor = investorResult.data!;

    // Calculate shares to issue
    const sharesToIssue = amount / vault.sharePrice;
    
    // Update vault
    vault.totalShares += sharesToIssue;
    vault.totalAssets += amount;

    // Create or update position
    const positionId = `${vaultId}_${investor.id}`;
    let position = this.positions.get(positionId);
    
    if (position) {
      position.shares += sharesToIssue;
      position.investedAmount += amount;
      position.updatedAt = new Date();
    } else {
      position = {
        id: positionId,
        vaultId,
        investorId: investor.id,
        shares: sharesToIssue,
        investedAmount: amount,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }
    
    this.positions.set(positionId, position);

    const transaction: Transaction = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'invest',
      vaultId,
      investorId: investor.id,
      amount,
      shares: sharesToIssue,
      timestamp: new Date()
    };

    return Ok({ position, transaction });
  }

  redeem(vaultId: string, investorAddress: string, shares: number): Result<{ position: Position; transaction: Transaction; amount: number }> {
    const vaultResult = this.getVault(vaultId);
    if (!vaultResult.success) return Err(vaultResult.error!);
    
    const vault = vaultResult.data!;
    const investorResult = this.createInvestor(investorAddress);
    if (!investorResult.success) return Err(investorResult.error!);
    
    const investor = investorResult.data!;
    const positionId = `${vaultId}_${investor.id}`;
    const position = this.positions.get(positionId);

    if (!position || position.shares < shares) {
      return Err(new Error('Insufficient shares'));
    }

    // Calculate redemption amount
    const amount = shares * vault.sharePrice;
    
    // Update position
    position.shares -= shares;
    position.updatedAt = new Date();
    
    // Update vault
    vault.totalShares -= shares;
    vault.totalAssets -= amount;

    const transaction: Transaction = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'redeem',
      vaultId,
      investorId: investor.id,
      amount,
      shares,
      timestamp: new Date()
    };

    return Ok({ position, transaction, amount });
  }

  // Accrual and Distribution
  accrueInterest(vaultId: string): Result<{ vault: Vault; transaction: Transaction }> {
    const vaultResult = this.getVault(vaultId);
    if (!vaultResult.success) return Err(vaultResult.error!);
    
    const vault = vaultResult.data!;
    const now = new Date();
    const timeDiff = now.getTime() - vault.lastAccrual.getTime();
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    
    // Calculate accrued interest
    const dailyRate = vault.targetAPY / 365;
    const accruedAmount = vault.totalAssets * dailyRate * daysDiff;
    
    // Update vault
    vault.totalAssets += accruedAmount;
    vault.sharePrice = vault.totalAssets / vault.totalShares;
    vault.lastAccrual = now;

    const transaction: Transaction = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'accrue',
      vaultId,
      amount: accruedAmount,
      timestamp: now
    };

    return Ok({ vault, transaction });
  }

  runDistribution(vaultId: string, borrowerPayment: number, height: number): Result<{ distribution: Distribution; transaction: Transaction; payouts: Array<{ investorId: string; amount: number; shares: number }> }> {
    const vaultResult = this.getVault(vaultId);
    if (!vaultResult.success) return Err(vaultResult.error!);
    
    const vault = vaultResult.data!;

    // Calculate fees and reserve
    const reserveAmount = borrowerPayment * vault.reservePct;
    const mgmtFeeAmount = borrowerPayment * vault.mgmtFeePct;
    const perfFeeAmount = borrowerPayment * vault.perfFeePct;
    const payoutAmount = borrowerPayment - reserveAmount - mgmtFeeAmount - perfFeeAmount;

    // Verify conservation
    const totalAllocated = reserveAmount + mgmtFeeAmount + perfFeeAmount + payoutAmount;
    if (Math.abs(totalAllocated - borrowerPayment) > 0.01) {
      return Err(new Error('Distribution conservation failed'));
    }

    // Calculate individual payouts
    const payouts: Array<{ investorId: string; amount: number; shares: number }> = [];
    for (const [, position] of this.positions) {
      if (position.vaultId === vaultId && position.shares > 0) {
        const shareRatio = position.shares / vault.totalShares;
        const payout = payoutAmount * shareRatio;
        payouts.push({
          investorId: position.investorId,
          amount: payout,
          shares: position.shares
        });
      }
    }

    const distribution: Distribution = {
      id: `dist_${vaultId}_${height}`,
      vaultId,
      height,
      totalAmount: borrowerPayment,
      reserveAmount,
      mgmtFeeAmount,
      perfFeeAmount,
      payoutAmount,
      merkleRoot: '', // Will be calculated by transparency package
      timestamp: new Date()
    };

    this.distributions.set(distribution.id, distribution);

    const transaction: Transaction = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'distribute',
      vaultId,
      amount: borrowerPayment,
      timestamp: new Date()
    };

    return Ok({ distribution, transaction, payouts });
  }

  // Getters
  getPositions(vaultId?: string): Position[] {
    const positions = Array.from(this.positions.values());
    return vaultId ? positions.filter(p => p.vaultId === vaultId) : positions;
  }

  getDistributions(vaultId?: string): Distribution[] {
    const distributions = Array.from(this.distributions.values());
    return vaultId ? distributions.filter(d => d.vaultId === vaultId) : distributions;
  }

  getAllVaults(): Vault[] {
    return Array.from(this.vaults.values());
  }
}

export default VaultEngine;