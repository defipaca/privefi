import React, { useState } from 'react';
import { ExternalLink, Download, Eye, Shield, TrendingUp, AlertCircle } from 'lucide-react';

export const TransparencyDashboard: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const assetData = [
    {
      id: 'N123AB',
      tailNumber: 'N123AB',
      type: 'Boeing 737-800',
      lessee: 'SkyWest Airlines',
      leaseStart: '2023-01-15',
      leaseEnd: '2035-01-15',
      monthlyPayment: '$125,000',
      paymentStatus: 'Current',
      ltv: '65%',
      insuranceStatus: 'Active',
      blockchainTx: '0xabc123...'
    },
    {
      id: 'N456CD',
      tailNumber: 'N456CD',
      type: 'Airbus A320',
      lessee: 'Republic Airways',
      leaseStart: '2023-03-01',
      leaseEnd: '2036-03-01',
      monthlyPayment: '$110,000',
      paymentStatus: 'Current',
      ltv: '62%',
      insuranceStatus: 'Active',
      blockchainTx: '0xdef456...'
    },
    {
      id: 'N789EF',
      tailNumber: 'N789EF',
      type: 'Boeing 737-MAX',
      lessee: 'United Airlines',
      leaseStart: '2023-05-10',
      leaseEnd: '2038-05-10',
      monthlyPayment: '$145,000',
      paymentStatus: 'Current',
      ltv: '58%',
      insuranceStatus: 'Active',
      blockchainTx: '0xghi789...'
    }
  ];

  const reports = [
    {
      id: 'audit-2024-q1',
      title: 'Q1 2024 Audit Report',
      date: '2024-03-31',
      type: 'Audit',
      status: 'Verified'
    },
    {
      id: 'valuation-2024-q1',
      title: 'Q1 2024 Asset Valuation',
      date: '2024-03-31',
      type: 'Valuation',
      status: 'Verified'
    },
    {
      id: 'performance-2024-q1',
      title: 'Q1 2024 Performance Report',
      date: '2024-03-31',
      type: 'Performance',
      status: 'Verified'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-white mb-2">
            Transparency Dashboard
          </h1>
          <p className="text-lg text-slate-300">
            Complete on-chain visibility into asset performance and vault operations
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl shadow-lg p-6 border border-zinc-700 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <span className="text-sm font-medium text-green-400">Current</span>
            </div>
            <p className="text-2xl font-bold text-white">100%</p>
            <p className="text-sm text-slate-400">Payment Status</p>
          </div>
          
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl shadow-lg p-6 border border-zinc-700 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between mb-2">
              <Shield className="h-8 w-8 text-blue-500" />
              <span className="text-sm font-medium text-blue-400">Active</span>
            </div>
            <p className="text-2xl font-bold text-white">$2.5M</p>
            <p className="text-sm text-slate-400">Insured Value</p>
          </div>
          
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl shadow-lg p-6 border border-zinc-700 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between mb-2">
              <Eye className="h-8 w-8 text-purple-500" />
              <span className="text-sm font-medium text-purple-400">Verified</span>
            </div>
            <p className="text-2xl font-bold text-white">3</p>
            <p className="text-sm text-slate-400">Assets Tracked</p>
          </div>
          
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl shadow-lg p-6 border border-zinc-700 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="h-8 w-8 text-purple-500" />
              <span className="text-sm font-medium text-purple-400">Low Risk</span>
            </div>
            <p className="text-2xl font-bold text-white">62%</p>
            <p className="text-sm text-slate-400">Avg LTV</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Asset Data Table */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl shadow-lg overflow-hidden border border-zinc-700 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 ease-in-out">
              <div className="p-6 border-b border-zinc-700">
                <h2 className="text-xl font-semibold text-white">On-Chain Asset Data</h2>
                <p className="text-sm text-slate-400 mt-1">Real-time asset performance and lease status</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-zinc-800/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                        Asset ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                        Lessee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                        Payment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                        LTV
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                        Blockchain
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-zinc-800/30 divide-y divide-zinc-700">
                    {assetData.map((asset) => (
                      <tr key={asset.id} className="hover:bg-zinc-700/50 transition-colors duration-300 ease-in-out">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-white">{asset.tailNumber}</div>
                            <div className="text-sm text-slate-400">{asset.type}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{asset.lessee}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{asset.monthlyPayment}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{asset.ltv}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {asset.paymentStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-purple-400 hover:text-purple-300 flex items-center space-x-1 transition-colors duration-300 ease-in-out">
                            <ExternalLink className="h-4 w-4" />
                            <span className="text-sm">View TX</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Reports & Documents */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl shadow-lg p-6 border border-zinc-700 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 ease-in-out">
              <h3 className="text-lg font-semibold text-white mb-4">Audited Reports</h3>
              <div className="space-y-3">
                {reports.map((report) => (
                  <div key={report.id} className="border border-zinc-700 rounded-lg p-4 bg-zinc-800/30 hover:border-purple-500/30 transition-all duration-300 ease-in-out">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-white">{report.title}</h4>
                      <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded">
                        {report.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mb-3">{report.date}</p>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setSelectedReport(report.id)}
                        className="flex items-center space-x-1 text-purple-400 hover:text-purple-300 text-xs transition-colors duration-300 ease-in-out"
                      >
                        <Eye className="h-3 w-3" />
                        <span>Preview</span>
                      </button>
                      <button className="flex items-center space-x-1 text-slate-400 hover:text-slate-300 text-xs transition-colors duration-300 ease-in-out">
                        <Download className="h-3 w-3" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl shadow-lg p-6 border border-zinc-700 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 ease-in-out">
              <h3 className="text-lg font-semibold text-white mb-4">Smart Contract</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Verified Originator</span>
                  <span className="text-sm font-medium text-white">Lendicate</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Contract Address</span>
                  <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-300 ease-in-out">
                    0x742d35Cc6638C0532
                  </button>
                </div>
                <div className="pt-3 border-t border-zinc-700">
                  <button className="w-full bg-zinc-700/50 hover:bg-zinc-600/50 text-slate-300 py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-300 ease-in-out flex items-center justify-center space-x-2">
                    <ExternalLink className="h-4 w-4" />
                    <span>View on Etherscan</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Preview Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto border border-zinc-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Report Preview</h3>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-slate-400 hover:text-slate-300"
              >
                ×
              </button>
            </div>
            
            <div className="bg-zinc-800/50 rounded-lg p-6 mb-6">
              <h4 className="font-semibold text-white mb-2">Q1 2024 Audit Summary</h4>
              <p className="text-sm text-slate-400 mb-4">
                Independent third-party audit of vault assets and performance metrics.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Assets Audited:</span>
                  <span className="font-medium text-white">3 Aircraft</span>
                </div>
                <div className="flex justify-between">
                  <span>Asset Value Verified:</span>
                  <span className="font-medium text-white">$2.5M</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Performance:</span>
                  <span className="font-medium text-green-400">100% On-time</span>
                </div>
                <div className="flex justify-between">
                  <span>Risk Assessment:</span>
                  <span className="font-medium text-green-400">Low Risk</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button className="flex-1 border border-zinc-600 text-slate-300 py-2 px-4 rounded-lg hover:bg-zinc-800 transition-colors duration-300 ease-in-out">
                Download Full Report
              </button>
              <button
                onClick={() => setSelectedReport(null)}
                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 ease-in-out"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};