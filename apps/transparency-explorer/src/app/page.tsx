'use client'

import Link from 'next/link'

export default function TransparencyExplorer() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            PrivéFi Transparency Explorer
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Public read-only explorer for complete vault transparency
          </p>
          <div className="flex justify-center space-x-4 text-sm text-slate-400">
            <span className="bg-slate-800 px-3 py-1 rounded">Real-time verification</span>
            <span className="bg-slate-800 px-3 py-1 rounded">Merkle proofs</span>
            <span className="bg-slate-800 px-3 py-1 rounded">Document hashes</span>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Link href="/blocks" className="group">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7H5m14 14H5" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Blocks</h3>
                <p className="text-blue-100 text-sm">Browse blockchain history</p>
              </div>
            </div>
          </Link>

          <Link href="/vault-snapshot" className="group">
            <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-6 text-white hover:from-green-700 hover:to-green-900 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Vault Snapshot</h3>
                <p className="text-green-100 text-sm">View investor tree</p>
              </div>
            </div>
          </Link>

          <Link href="/verify" className="group">
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-6 text-white hover:from-purple-700 hover:to-purple-900 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Verify</h3>
                <p className="text-purple-100 text-sm">Validate statements</p>
              </div>
            </div>
          </Link>

          <Link href="/docs" className="group">
            <div className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-xl p-6 text-white hover:from-orange-700 hover:to-orange-900 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Documents</h3>
                <p className="text-orange-100 text-sm">Verify document hashes</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Live Stats */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Live Transparency Stats</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">42</div>
              <p className="text-slate-400">Total Blocks</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">156</div>
              <p className="text-slate-400">Transactions</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">8</div>
              <p className="text-slate-400">Distributions</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">23</div>
              <p className="text-slate-400">Documents</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
          <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div>
                  <p className="text-white font-medium">Block #42 mined</p>
                  <p className="text-slate-400 text-sm">3 transactions, distribution processed</p>
                </div>
              </div>
              <span className="text-slate-400 text-sm">2 min ago</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div>
                  <p className="text-white font-medium">New investment: 500 TestUSD</p>
                  <p className="text-slate-400 text-sm">Jet Credit Vault v1</p>
                </div>
              </div>
              <span className="text-slate-400 text-sm">5 min ago</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <div>
                  <p className="text-white font-medium">Document uploaded</p>
                  <p className="text-slate-400 text-sm">SHA-256: abc123...def456</p>
                </div>
              </div>
              <span className="text-slate-400 text-sm">12 min ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}