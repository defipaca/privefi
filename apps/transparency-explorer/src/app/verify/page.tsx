'use client'

import { useState } from 'react'

export default function VerifyPage() {
  const [verificationMethod, setVerificationMethod] = useState<'statement' | 'merkle'>('statement')
  const [statementFile, setStatementFile] = useState<File | null>(null)
  const [merkleData, setMerkleData] = useState({
    root: '',
    leaf: '',
    proof: ''
  })
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean
    message: string
  } | null>(null)

  const handleStatementVerification = () => {
    if (!statementFile) {
      setVerificationResult({
        success: false,
        message: 'Please select a statement file'
      })
      return
    }

    // Mock verification
    setTimeout(() => {
      setVerificationResult({
        success: true,
        message: 'Statement verified successfully! All data matches blockchain records.'
      })
    }, 1000)
  }

  const handleMerkleVerification = () => {
    if (!merkleData.root || !merkleData.leaf || !merkleData.proof) {
      setVerificationResult({
        success: false,
        message: 'Please provide root, leaf, and proof data'
      })
      return
    }

    // Mock verification
    setTimeout(() => {
      setVerificationResult({
        success: true,
        message: 'Merkle proof verified successfully! ✅'
      })
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Verification Center</h1>
          <p className="text-slate-300">Verify statements and Merkle proofs</p>
        </div>

        {/* Method Selection */}
        <div className="mb-8">
          <div className="flex space-x-4">
            <button
              onClick={() => setVerificationMethod('statement')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                verificationMethod === 'statement'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Statement Verification
            </button>
            <button
              onClick={() => setVerificationMethod('merkle')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                verificationMethod === 'merkle'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Merkle Proof Verification
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Verification Form */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-6">
              {verificationMethod === 'statement' ? 'Upload Statement' : 'Enter Merkle Data'}
            </h2>

            {verificationMethod === 'statement' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Statement File (JSON)
                  </label>
                  <input
                    type="file"
                    accept=".json"
                    onChange={(e) => setStatementFile(e.target.files?.[0] || null)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                  />
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">What we verify:</h3>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Merkle root matches blockchain record</li>
                    <li>• Investor data integrity</li>
                    <li>• Payout calculations</li>
                    <li>• Distribution timestamp</li>
                  </ul>
                </div>

                <button
                  onClick={handleStatementVerification}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                >
                  Verify Statement
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Merkle Root
                  </label>
                  <input
                    type="text"
                    value={merkleData.root}
                    onChange={(e) => setMerkleData({...merkleData, root: e.target.value})}
                    placeholder="0xabc123..."
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Leaf Data (JSON)
                  </label>
                  <textarea
                    value={merkleData.leaf}
                    onChange={(e) => setMerkleData({...merkleData, leaf: e.target.value})}
                    placeholder='{"investor": "0x...", "shares": 100, "payout": 50, "height": 42}'
                    rows={3}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Proof Array (JSON)
                  </label>
                  <textarea
                    value={merkleData.proof}
                    onChange={(e) => setMerkleData({...merkleData, proof: e.target.value})}
                    placeholder='["0xdef456...", "0xghi789..."]'
                    rows={3}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white font-mono text-sm"
                  />
                </div>

                <button
                  onClick={handleMerkleVerification}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                >
                  Verify Merkle Proof
                </button>
              </div>
            )}
          </div>

          {/* Results & Examples */}
          <div className="space-y-6">
            {/* Verification Result */}
            {verificationResult && (
              <div className={`rounded-2xl p-6 border ${
                verificationResult.success
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-red-500/10 border-red-500/30'
              }`}>
                <div className="flex items-center space-x-3 mb-3">
                  {verificationResult.success ? (
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  <h3 className={`text-lg font-semibold ${
                    verificationResult.success ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {verificationResult.success ? 'Verification Successful' : 'Verification Failed'}
                  </h3>
                </div>
                <p className="text-slate-300">{verificationResult.message}</p>
              </div>
            )}

            {/* Example Data */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Example Data</h3>
              
              {verificationMethod === 'statement' ? (
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <p className="text-sm text-slate-300 mb-2">Sample statement.json:</p>
                  <pre className="text-xs text-slate-400 font-mono overflow-x-auto">
{`{
  "investor": "0x1234...5678",
  "vault": "jet-credit-v1",
  "height": 42,
  "shares": 300,
  "payout": 25.50,
  "merkleRoot": "0xabc123...",
  "timestamp": "2024-01-15T10:00:00Z"
}`}
                  </pre>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <p className="text-xs text-slate-400 mb-1">Root:</p>
                    <p className="text-xs text-slate-300 font-mono">0xabc123def456...</p>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <p className="text-xs text-slate-400 mb-1">Leaf:</p>
                    <p className="text-xs text-slate-300 font-mono">{"investor": "0x...", "shares": 300}</p>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <p className="text-xs text-slate-400 mb-1">Proof:</p>
                    <p className="text-xs text-slate-300 font-mono">["0xdef456...", "0xghi789..."]</p>
                  </div>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">How It Works</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-start space-x-3">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</span>
                  <p>Upload your statement or enter Merkle proof data</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</span>
                  <p>We verify against blockchain records</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</span>
                  <p>Get instant verification results</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}