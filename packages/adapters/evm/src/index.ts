import { Result, Ok, Receipt } from '@privefi/core';

export interface EVMAdapter {
  issueShares(investor: string, amount: number): Promise<Result<Receipt>>;
  burnShares(investor: string, amount: number): Promise<Result<Receipt>>;
  recordDistribution(distributionId: string, payouts: Array<{ investor: string; amount: number }>): Promise<Result<Receipt>>;
}

export class MockEVMAdapter implements EVMAdapter {
  async issueShares(investor: string, amount: number): Promise<Result<Receipt>> {
    // Mock implementation - returns deterministic receipt
    const receipt: Receipt = {
      txId: `evm_issue_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      blockHeight: Math.floor(Math.random() * 1000000),
      blockHash: `0x${Math.random().toString(16).substr(2, 16)}`,
      signature: `mock_evm_signature_${investor}_${amount}`
    };

    return Ok(receipt);
  }

  async burnShares(investor: string, amount: number): Promise<Result<Receipt>> {
    // Mock implementation - returns deterministic receipt
    const receipt: Receipt = {
      txId: `evm_burn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      blockHeight: Math.floor(Math.random() * 1000000),
      blockHash: `0x${Math.random().toString(16).substr(2, 16)}`,
      signature: `mock_evm_burn_${investor}_${amount}`
    };

    return Ok(receipt);
  }

  async recordDistribution(distributionId: string, payouts: Array<{ investor: string; amount: number }>): Promise<Result<Receipt>> {
    // Mock implementation - returns deterministic receipt
    const receipt: Receipt = {
      txId: `evm_dist_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      blockHeight: Math.floor(Math.random() * 1000000),
      blockHash: `0x${Math.random().toString(16).substr(2, 16)}`,
      signature: `mock_evm_distribution_${distributionId}`
    };

    return Ok(receipt);
  }
}

export default MockEVMAdapter;