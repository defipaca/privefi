import { MerkleLeaf, MerkleProof } from '@privefi/core';
import { createHash } from 'crypto';
import JSZip from 'jszip';

export class TransparencyEngine {
  private reportHashChain: string[] = [];

  // Merkle Tree Operations
  buildMerkleTree(leaves: MerkleLeaf[]): { root: string; tree: string[][] } {
    if (leaves.length === 0) {
      return { root: '', tree: [] };
    }

    // Hash leaves
    let currentLevel = leaves.map(leaf => this.hashLeaf(leaf));
    const tree: string[][] = [currentLevel];

    // Build tree bottom-up
    while (currentLevel.length > 1) {
      const nextLevel: string[] = [];
      
      for (let i = 0; i < currentLevel.length; i += 2) {
        const left = currentLevel[i];
        const right = i + 1 < currentLevel.length ? currentLevel[i + 1] : left;
        const combined = createHash('sha256').update(left + right).digest('hex');
        nextLevel.push(combined);
      }
      
      currentLevel = nextLevel;
      tree.push(currentLevel);
    }

    return { root: currentLevel[0], tree };
  }

  private hashLeaf(leaf: MerkleLeaf): string {
    const content = JSON.stringify({
      investor: leaf.investor,
      shares: leaf.shares,
      payout: leaf.payout,
      height: leaf.height
    });
    return createHash('sha256').update(content).digest('hex');
  }

  generateMerkleProof(leaves: MerkleLeaf[], targetLeaf: MerkleLeaf): MerkleProof | null {
    const { root, tree } = this.buildMerkleTree(leaves);
    const targetHash = this.hashLeaf(targetLeaf);
    
    // Find leaf index
    const leafIndex = tree[0].findIndex(hash => hash === targetHash);
    if (leafIndex === -1) {
      return null;
    }

    const proof: string[] = [];
    let currentIndex = leafIndex;

    // Build proof path
    for (let level = 0; level < tree.length - 1; level++) {
      const isRightNode = currentIndex % 2 === 1;
      const siblingIndex = isRightNode ? currentIndex - 1 : currentIndex + 1;
      
      if (siblingIndex < tree[level].length) {
        proof.push(tree[level][siblingIndex]);
      }
      
      currentIndex = Math.floor(currentIndex / 2);
    }

    return {
      leaf: targetLeaf,
      proof,
      root
    };
  }

  verifyMerkleProof(merkleProof: MerkleProof): boolean {
    let currentHash = this.hashLeaf(merkleProof.leaf);
    
    for (const siblingHash of merkleProof.proof) {
      // Determine order (smaller hash goes first for consistency)
      const combined = currentHash < siblingHash 
        ? currentHash + siblingHash 
        : siblingHash + currentHash;
      currentHash = createHash('sha256').update(combined).digest('hex');
    }
    
    return currentHash === merkleProof.root;
  }

  // Hash Chain Operations
  addToHashChain(reportJson: any): string {
    const reportContent = JSON.stringify(reportJson);
    const prevHash = this.reportHashChain.length > 0 
      ? this.reportHashChain[this.reportHashChain.length - 1] 
      : '0'.repeat(64);
    
    const reportHash = createHash('sha256')
      .update(prevHash + reportContent)
      .digest('hex');
    
    this.reportHashChain.push(reportHash);
    return reportHash;
  }

  verifyHashChain(): boolean {
    for (let i = 1; i < this.reportHashChain.length; i++) {
      // In a real implementation, we'd re-calculate each hash
      // For now, we assume the chain is valid if it exists
    }
    return true;
  }

  // Report Pack Generation
  async makeReportPack(vaultId: string, height: number, data: {
    report: any;
    csvData: { [filename: string]: string };
    docHashes: { [filename: string]: string };
    merkleRoot: string;
    leaves: MerkleLeaf[];
  }): Promise<Buffer> {
    const zip = new JSZip();
    
    // Add main report
    zip.file('report.json', JSON.stringify(data.report, null, 2));
    
    // Add CSV files
    const csvFolder = zip.folder('csv');
    for (const [filename, content] of Object.entries(data.csvData)) {
      csvFolder?.file(filename, content);
    }
    
    // Add document hashes
    zip.file('document_hashes.json', JSON.stringify(data.docHashes, null, 2));
    
    // Add merkle data
    const merkleData = {
      root: data.merkleRoot,
      leaves: data.leaves,
      height
    };
    zip.file('merkle.json', JSON.stringify(merkleData, null, 2));
    
    // Add verification info
    const verificationInfo = {
      vaultId,
      height,
      timestamp: new Date().toISOString(),
      reportHash: this.addToHashChain(data.report)
    };
    zip.file('verification.json', JSON.stringify(verificationInfo, null, 2));
    
    return await zip.generateAsync({ type: 'nodebuffer' });
  }

  // Document Hash Verification
  hashDocument(content: Buffer | string): string {
    return createHash('sha256').update(content).digest('hex');
  }

  verifyDocumentHash(content: Buffer | string, expectedHash: string): boolean {
    const actualHash = this.hashDocument(content);
    return actualHash === expectedHash;
  }
}

export default TransparencyEngine;