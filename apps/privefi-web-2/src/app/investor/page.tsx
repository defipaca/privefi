'use client'

import { useState, useEffect } from 'react'
import { FaucetEngine } from '@privefi/faucet'

export default function InvestorPortal() {
  const [address, setAddress] = useState('0x1234567890123456789012345678901234567890')
  const [balance, setBalance] = useState(0)
  const [faucetAmount, setFaucetAmount] = useState(500)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const faucet = new FaucetEngine()

  useEffect(() => {
    // Load initial balance
    setBalance(faucet.getBalance(address))
  }, [address])

  const handleFaucet = async () => {
    setIsLoading(true)
    setMessage('')
    
    try {
      const result = await faucet.mint(address, faucetAmount)
      
      if (result.success) {
        setBalance(result.data!.newBalance)
        setMessage(`Successfully minted ${faucetAmount} TestUSD!`)
      } else {
        setMessage(`Error: ${result.error?.message}`)
      }
    } catch (error) {
      setMessage(`Error: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Investor Portal</h1>
          <p className="text-slate-300">Manage your PrivéFi investments</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Faucet Section */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
            <h2 className="text-xl font-bold mb-4">TestUSD Faucet</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Your Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60"
                placeholder="0x..."
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Amount</label>
              <input
                type="number"
                value={faucetAmount}
                onChange={(e) => setFaucetAmount(Number(e.target.value))}
                max={500}
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white"
              />
            </div>

            <button
              onClick={handleFaucet}
              disabled={isLoading}
              className="w-full bg-white text-blue-600 py-2 px-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Minting...' : 'Get TestUSD'}
            </button>

            {message && (
              <div className={`mt-4 p-3 rounded-lg text-sm ${
                message.includes('Error') 
                  ? 'bg-red-500/20 border border-red-500/30' 
                  : 'bg-green-500/20 border border-green-500/30'
              }`}>
                {message}
              </div>
            )}
          </div>

          {/* Balance Card */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-4">Account Balance</h2>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">
                {balance.toLocaleString()} TestUSD
              </div>
              <p className="text-slate-400">Available for investment</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">
                Invest in Vault
              </button>
              <button className="w-full bg-slate-600 hover:bg-slate-700 text-white py-2 px-4 rounded-lg transition-colors">
                View Portfolio
              </button>
              <button className="w-full bg-slate-600 hover:bg-slate-700 text-white py-2 px-4 rounded-lg transition-colors">
                Download Statement
              </button>
            </div>
          </div>
        </div>

        {/* Investment Section */}
        <div className="mt-8">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-6">Available Vaults</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Jet Credit Vault */}
              <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-white">Jet Credit Vault v1</h3>
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-sm">Active</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-slate-400">Target APY</p>
                    <p className="text-white font-semibold">8.5%</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Min Investment</p>
                    <p className="text-white font-semibold">100 TestUSD</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Your Shares</p>
                    <p className="text-white font-semibold">0</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Share Price</p>
                    <p className="text-white font-semibold">$1.00</p>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Investment Amount (TestUSD)
                  </label>
                  <input
                    type="number"
                    placeholder="300"
                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white"
                  />
                </div>

                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors">
                  Invest Now
                </button>
              </div>

              {/* Coming Soon Vault */}
              <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600 opacity-60">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-white">Yacht Credit Vault v1</h3>
                  <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-sm">Coming Soon</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-slate-400">Target APY</p>
                    <p className="text-white font-semibold">12.0%</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Min Investment</p>
                    <p className="text-white font-semibold">500 TestUSD</p>
                  </div>
                </div>

                <button disabled className="w-full bg-slate-600 text-slate-400 py-2 px-4 rounded-lg font-semibold cursor-not-allowed">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}