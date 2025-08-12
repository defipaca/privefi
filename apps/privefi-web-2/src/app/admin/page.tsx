'use client'

import { useState } from 'react'

export default function AdminPortal() {
  const [borrowerPayment, setBorrowerPayment] = useState(1000)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleBorrowerPayment = () => {
    setIsProcessing(true)
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
      alert('Borrower payment processed and distribution completed!')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-slate-300">Manage vaults and process distributions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vault Configuration */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-6">Vault Configuration</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Target APY (%)</label>
                <input
                  type="number"
                  defaultValue={8.5}
                  step={0.1}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Management Fee (%)</label>
                <input
                  type="number"
                  defaultValue={1.0}
                  step={0.1}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Performance Fee (%)</label>
                <input
                  type="number"
                  defaultValue={10.0}
                  step={0.1}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Reserve (%)</label>
                <input
                  type="number"
                  defaultValue={5.0}
                  step={0.1}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                />
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors">
                Update Configuration
              </button>
            </div>
          </div>

          {/* Document Management */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-6">Document Management</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Upload Deal Document</label>
                <input
                  type="file"
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                />
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Recent Documents</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">aircraft_lease_agreement.pdf</span>
                    <span className="text-green-400 font-mono text-xs">sha256: abc123...</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">insurance_policy.pdf</span>
                    <span className="text-green-400 font-mono text-xs">sha256: def456...</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors">
                Upload & Hash Document
              </button>
            </div>
          </div>

          {/* Distribution Processing */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-6">Distribution Processing</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Borrower Payment Amount (TestUSD)
                </label>
                <input
                  type="number"
                  value={borrowerPayment}
                  onChange={(e) => setBorrowerPayment(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                />
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Distribution Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Total Payment:</span>
                    <span className="text-white font-semibold">{borrowerPayment} TestUSD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Reserve (5%):</span>
                    <span className="text-white">{(borrowerPayment * 0.05).toFixed(2)} TestUSD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Mgmt Fee (1%):</span>
                    <span className="text-white">{(borrowerPayment * 0.01).toFixed(2)} TestUSD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Perf Fee (10%):</span>
                    <span className="text-white">{(borrowerPayment * 0.10).toFixed(2)} TestUSD</span>
                  </div>
                  <div className="border-t border-slate-600 pt-2 flex justify-between">
                    <span className="text-slate-300">LP Payout:</span>
                    <span className="text-green-400 font-semibold">{(borrowerPayment * 0.84).toFixed(2)} TestUSD</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleBorrowerPayment}
                disabled={isProcessing}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'Process Payment & Distribute'}
              </button>
            </div>
          </div>

          {/* Report Publishing */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-6">Report Publishing</h2>
            
            <div className="space-y-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Latest Report</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Block Height:</span>
                    <span className="text-white">42</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Merkle Root:</span>
                    <span className="text-green-400 font-mono text-xs">0xabc123...</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Investors:</span>
                    <span className="text-white">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Total Payout:</span>
                    <span className="text-white">840 TestUSD</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors">
                Generate Report Pack (ZIP)
              </button>
              
              <button className="w-full bg-slate-600 hover:bg-slate-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors">
                Download Previous Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}