// Core types for PrivéFi system

export interface Result<T, E = Error> {
  success: boolean;
  data?: T;
  error?: E;
}

export function Ok<T>(data: T): Result<T> {
  return { success: true, data };
}

export function Err<E>(error: E): Result<never, E> {
  return { success: false, error };
}

export interface Vault {
  id: string;
  name: string;
  targetAPY: number;
  totalShares: number;
  totalAssets: number;
  sharePrice: number;
  reservePct: number;
  mgmtFeePct: number;
  perfFeePct: number;
  createdAt: Date;
  lastAccrual: Date;
}

export interface Investor {
  id: string;
  address: string;
  createdAt: Date;
}

export interface Position {
  id: string;
  vaultId: string;
  investorId: string;
  shares: number;
  investedAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Distribution {
  id: string;
  vaultId: string;
  height: number;
  totalAmount: number;
  reserveAmount: number;
  mgmtFeeAmount: number;
  perfFeeAmount: number;
  payoutAmount: number;
  merkleRoot: string;
  timestamp: Date;
}

export interface Transaction {
  id: string;
  type: 'invest' | 'redeem' | 'distribute' | 'accrue';
  vaultId: string;
  investorId?: string;
  amount: number;
  shares?: number;
  timestamp: Date;
  blockHeight?: number;
}

export interface Block {
  height: number;
  prevHash: string;
  timestamp: Date;
  txs: Transaction[];
  stateRoot: string;
  hash: string;
}

export interface Receipt {
  txId: string;
  blockHeight: number;
  blockHash: string;
  signature: string;
}

export interface MerkleLeaf {
  investor: string;
  shares: number;
  payout: number;
  height: number;
}

export interface MerkleProof {
  leaf: MerkleLeaf;
  proof: string[];
  root: string;
}