#!/usr/bin/env tsx

import { VaultEngine } from '@privefi/vault-engine'
import { MockChain } from '@privefi/mockchain'
import { FaucetEngine } from '@privefi/faucet'
import { StorageService } from '@privefi/services'
import { TransparencyEngine } from '@privefi/transparency'

async function adminSeed() {
  console.log('🌱 Starting admin seed process...')
  
  // Initialize services
  const vaultEngine = new VaultEngine()
  const mockChain = new MockChain()
  const faucet = new FaucetEngine()
  const storage = new StorageService()
  const transparency = new TransparencyEngine()

  try {
    // 1. Create Jet Credit Vault v1
    console.log('📦 Creating Jet Credit Vault v1...')
    const vaultResult = vaultEngine.createVault({
      id: 'jet-credit-v1',
      name: 'Jet Credit Vault v1',
      targetAPY: 0.085, // 8.5%
      reservePct: 0.05,  // 5%
      mgmtFeePct: 0.01,  // 1%
      perfFeePct: 0.10   // 10%
    })

    if (!vaultResult.success) {
      throw new Error(`Failed to create vault: ${vaultResult.error?.message}`)
    }

    console.log('✅ Vault created successfully')

    // 2. Seed documents with hashes
    console.log('📄 Seeding documents...')
    const documents = [
      {
        name: 'aircraft_lease_agreement.pdf',
        content: 'Mock aircraft lease agreement content',
        hash: transparency.hashDocument('Mock aircraft lease agreement content')
      },
      {
        name: 'insurance_policy.pdf', 
        content: 'Mock insurance policy content',
        hash: transparency.hashDocument('Mock insurance policy content')
      },
      {
        name: 'borrower_credit_report.pdf',
        content: 'Mock credit report content',
        hash: transparency.hashDocument('Mock credit report content')
      }
    ]

    const docHashes: { [key: string]: string } = {}
    for (const doc of documents) {
      docHashes[doc.name] = doc.hash
      console.log(`  📋 ${doc.name}: ${doc.hash.substring(0, 16)}...`)
    }

    // Add to hash chain
    const reportHash = transparency.addToHashChain({
      type: 'document_upload',
      documents: docHashes,
      timestamp: new Date().toISOString()
    })

    console.log(`🔗 Added to hash chain: ${reportHash.substring(0, 16)}...`)

    // 3. Seed faucet liquidity
    console.log('💧 Seeding faucet liquidity...')
    const testAddresses = [
      '0x1234567890123456789012345678901234567890',
      '0x2345678901234567890123456789012345678901',
      '0x3456789012345678901234567890123456789012'
    ]

    for (const address of testAddresses) {
      const mintResult = await faucet.mint(address, 500)
      if (mintResult.success) {
        console.log(`  💰 Minted 500 TestUSD to ${address.substring(0, 8)}...`)
      }
    }

    // 4. Create some initial investments
    console.log('💼 Creating initial investments...')
    mockChain.beginBlock()
    const transactions = []

    for (let i = 0; i < testAddresses.length; i++) {
      const address = testAddresses[i]
      const amount = 300 + (i * 100) // 300, 400, 500
      
      const investResult = vaultEngine.invest('jet-credit-v1', address, amount)
      if (investResult.success) {
        transactions.push(investResult.data!.transaction)
        console.log(`  📈 ${address.substring(0, 8)}... invested ${amount} TestUSD`)
      }
    }

    const block = mockChain.commitBlock(transactions)
    console.log(`⛓️  Block #${block.height} committed with ${transactions.length} transactions`)

    // 5. Save initial state
    console.log('💾 Saving initial state...')
    storage.save('vault_jet-credit-v1', vaultResult.data)
    storage.save('documents', docHashes)
    storage.save('faucet_balances', faucet.getAllBalances())
    storage.save('positions', vaultEngine.getPositions('jet-credit-v1'))

    console.log('🎉 Admin seed completed successfully!')
    console.log('\n📊 Summary:')
    console.log(`  • Vault created: ${vaultResult.data!.name}`)
    console.log(`  • Documents seeded: ${documents.length}`)
    console.log(`  • Test addresses funded: ${testAddresses.length}`)
    console.log(`  • Initial investments: ${transactions.length}`)
    console.log(`  • Blockchain height: ${mockChain.getHeight()}`)

  } catch (error) {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  adminSeed()
}

export default adminSeed