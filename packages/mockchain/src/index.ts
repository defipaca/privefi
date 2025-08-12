import { Block, Transaction, Receipt } from '@privefi/core';
import { createHash } from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

export class MockChain {
  private blocks: Block[] = [];
  private currentBlock: Partial<Block> | null = null;
  private dataDir: string;
  private keypair: { publicKey: string; privateKey: string };

  constructor(dataDir: string = './data/blocks') {
    this.dataDir = dataDir;
    this.keypair = this.generateKeypair();
    this.ensureDataDir();
    this.loadBlocks();
  }

  private generateKeypair() {
    // Simple mock keypair for receipts
    return {
      publicKey: 'mock_public_key',
      privateKey: 'mock_private_key'
    };
  }

  private ensureDataDir() {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
  }

  private loadBlocks() {
    try {
      const files = fs.readdirSync(this.dataDir)
        .filter(f => f.endsWith('.json'))
        .sort((a, b) => parseInt(a) - parseInt(b));
      
      for (const file of files) {
        const blockData = JSON.parse(fs.readFileSync(path.join(this.dataDir, file), 'utf8'));
        this.blocks.push({
          ...blockData,
          timestamp: new Date(blockData.timestamp)
        });
      }
    } catch (error) {
      console.log('No existing blocks found, starting fresh');
    }
  }

  private saveBlock(block: Block) {
    const filename = `${block.height.toString().padStart(6, '0')}.json`;
    fs.writeFileSync(
      path.join(this.dataDir, filename),
      JSON.stringify({
        ...block,
        timestamp: block.timestamp.toISOString()
      }, null, 2)
    );
  }

  private calculateHash(block: Omit<Block, 'hash'>): string {
    const content = JSON.stringify({
      height: block.height,
      prevHash: block.prevHash,
      timestamp: block.timestamp.toISOString(),
      txs: block.txs,
      stateRoot: block.stateRoot
    });
    return createHash('sha256').update(content).digest('hex');
  }

  private calculateStateRoot(txs: Transaction[]): string {
    // Simple state root calculation based on transactions
    const content = JSON.stringify(txs.map(tx => ({
      id: tx.id,
      type: tx.type,
      amount: tx.amount
    })));
    return createHash('sha256').update(content).digest('hex');
  }

  beginBlock(): void {
    const height = this.blocks.length;
    const prevHash = height === 0 ? '0'.repeat(64) : this.blocks[height - 1].hash;
    
    this.currentBlock = {
      height,
      prevHash,
      timestamp: new Date(),
      txs: []
    };
  }

  commitBlock(txs: Transaction[]): Block {
    if (!this.currentBlock) {
      throw new Error('No block in progress. Call beginBlock() first.');
    }

    const stateRoot = this.calculateStateRoot(txs);
    const blockData = {
      ...this.currentBlock,
      txs,
      stateRoot
    } as Omit<Block, 'hash'>;

    const hash = this.calculateHash(blockData);
    const block: Block = { ...blockData, hash };

    this.blocks.push(block);
    this.saveBlock(block);
    this.currentBlock = null;

    return block;
  }

  getBlock(height: number): Block | null {
    return this.blocks[height] || null;
  }

  getHead(): Block | null {
    return this.blocks[this.blocks.length - 1] || null;
  }

  getHeight(): number {
    return this.blocks.length;
  }

  createReceipt(txId: string): Receipt {
    const head = this.getHead();
    if (!head) {
      throw new Error('No blocks available for receipt');
    }

    // Mock signature
    const signature = createHash('sha256')
      .update(`${txId}${head.height}${head.hash}${this.keypair.privateKey}`)
      .digest('hex');

    return {
      txId,
      blockHeight: head.height,
      blockHash: head.hash,
      signature
    };
  }

  verifyReceipt(receipt: Receipt): boolean {
    const block = this.getBlock(receipt.blockHeight);
    if (!block || block.hash !== receipt.blockHash) {
      return false;
    }

    const expectedSignature = createHash('sha256')
      .update(`${receipt.txId}${receipt.blockHeight}${receipt.blockHash}${this.keypair.privateKey}`)
      .digest('hex');

    return receipt.signature === expectedSignature;
  }
}

export default MockChain;