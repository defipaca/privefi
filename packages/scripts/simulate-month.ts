#!/usr/bin/env tsx

import { VaultEngine } from '@privefi/vault-engine'
import { MockChain } from '@privefi/mockchain'
import { TransparencyEngine } from '@privefi/transparency'
import { StorageService } from '@privefi/services'
import { MerkleLeaf } from '@privefi/core'

async function simulateMonth() {
  console.log('📅 Starting month simulation...')
  
  // Initialize services
  const vaultEngine = new VaultEngine()
  const mockChain = new MockChain()
  const transparency = new TransparencyEngine()
  const storage = new StorageService()

  try {
    // Load existing vault or create one
    let vault = storage.load('vault_jet-credit-v1')
    if (!vault) {
      console.log('⚠️  No existing vault found, creating one...')
      const vaultResult = vaultEngine.createVault({
        id: 'jet-credit-v1',
        name: 'Jet Credit Vault v1',
        targetAPY: 0.085,
        reservePct: 0.05,
        mgmtFeePct: 0.01,
        perfFeePct: 0.10
      })
      
      if (!vaultResult.success) {
        throw new Error(`Failed to create vault: ${vaultResult.error?.message}`)
      }
      vault = vaultResult.data
    }

    console.log(`📦 Working with vault: ${vault.name}`)

    // 1. Fast-forward accrual (simulate 30 days)
    console.log('⏰ Accruing interest for 30 days...')
    
    // Simulate daily accrual
    for (let day = 1; day <= 30; day++) {
      const accrualResult = vaultEngine.accrueInterest('jet-credit-v1')
      if (accrualResult.success) {
        if (day % 10 === 0) {
          console.log(`  📈 Day ${day}: Accrued ${accrualResult.data!.transaction.amount.toFixed(2)} TestUSD`)
        }
      }
    }

    // 2. Simulate borrower payment
    const borrowerPayment = 1000 // $1000 monthly payment
    console.log(`💰 Processing borrower payment: ${borrowerPayment} TestUSD`)

    // 3. Run distribution
    const currentHeight = mockChain.getHeight()
    const distributionResult = vaultEngine.runDistribution('jet-credit-v1', borrowerPayment, currentHeight)
    
    if (!distributionResult.success) {
      throw new Error(`Distribution failed: ${distributionResult.error?.message}`)
    }

    const { distribution, transaction, payouts } = distributionResult.data!

    console.log('📊 Distribution breakdown:')
    console.log(`  • Total payment: ${distribution.totalAmount} TestUSD`)
    console.log(`  • Reserve (5%): ${distribution.reserveAmount.toFixed(2)} TestUSD`)
    console.log(`  • Mgmt fee (1%): ${distribution.mgmtFeeAmount.toFixed(2)} TestUSD`)
    console.log(`  • Perf fee (10%): ${distribution.perfFeeAmount.toFixed(2)} TestUSD`)
    console.log(`  • LP payout: ${distribution.payoutAmount.toFixed(2)} TestUSD`)

    // 4. Create Merkle tree for distribution
    console.log('🌳 Building Merkle tree...')
    const merkleLeaves: MerkleLeaf[] = payouts.map(payout => ({
      investor: payout.investorId,
      shares: payout.shares,
      payout: payout.amount,
      height: currentHeight
    }))

    const { root } = transparency.buildMerkleTree(merkleLeaves)
    distribution.merkleRoot = root

    console.log(`🔐 Merkle root: ${root.substring(0, 16)}...`)

    // 5. Generate proofs for each investor
    console.log('🔍 Generating Merkle proofs...')
    const proofs = merkleLeaves.map(leaf => {
      const proof = transparency.generateMerkleProof(merkleLeaves, leaf)
      if (proof) {
        console.log(`  ✅ Proof for ${leaf.investor.substring(0, 8)}...: ${proof.proof.length} hashes`)
      }
      return proof
    })

    // 6. Commit to blockchain
    console.log('⛓️  Committing to blockchain...')
    mockChain.beginBlock()
    const block = mockChain.commitBlock([transaction])
    
    console.log(`📦 Block #${block.height} committed`)
    console.log(`🔗 Block hash: ${block.hash.substring(0, 16)}...`)

    // 7. Save state
    console.log('💾 Saving updated state...')
    storage.save('vault_jet-credit-v1', vault)
    storage.save(`distribution_${currentHeight}`, distribution)
    storage.save(`merkle_leaves_${currentHeight}`, merkleLeaves)
    storage.save(`merkle_proofs_${currentHeight}`, proofs.filter(p => p !== null))

    // 8. Generate CSV export
    console.log('📄 Generating CSV export...')
    const csvData = payouts.map(payout => ({
      investor: payout.investorId,
      shares: payout.shares,
      payout: payout.amount.toFixed(2),
      height: currentHeight,
      timestamp: new Date().toISOString()
    }))

    // Save CSV data for report pack
    storage.save(`csv_distribution_${currentHeight}`, csvData)

    console.log('🎉 Month simulation completed successfully!')
    console.log('\n📊 Final Summary:')
    console.log(`  • Borrower payment: ${borrowerPayment} TestUSD`)
    console.log(`  • Investors paid: ${payouts.length}`)
    console.log(`  • Total LP payout: ${distribution.payoutAmount.toFixed(2)} TestUSD`)
    console.log(`  • Merkle root: ${root.substring(0, 16)}...`)
    console.log(`  • Block height: ${block.height}`)
    console.log(`  • Proofs generated: ${proofs.filter(p => p !== null).length}`)

    console.log('\n🚀 Ready for demo! Run:')
    console.log('  • pnpm demo:privefi (start both apps)')
    console.log('  • Visit investor portal: http://localhost:3000')
    console.log('  • Visit transparency explorer: http://localhost:3002')

  } catch (error) {
    console.error('❌ Simulation failed:', error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  simulateMonth()
}

export default simulateMonth