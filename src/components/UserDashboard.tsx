import React, { useState } from 'react';
import { TrendingUp, Clock, Award, DollarSign, Calendar, ArrowUpRight, Download } from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'rewards'>('overview');

  const portfolioData = {
    totalInvested: 35000,
    currentValue: 37250,
    totalYield: 2250,
    nextPayout: '2024-02-15',
    nextPayoutAmount: 375
  };

  const activeVaults = [
    {
      id: 'jetlease-001',
      name: 'JetLease Vault #001',
      invested: 25000,
      currentValue: 26750,
      yield: 1750,
      nextPayout: 375,
      payoutDate: '2024-02-15',
      status: 'Active'
    },
    {
      id: 'luxury-auto-001',
      name: 'Luxury Auto Vault #001',
      invested: 10000,
      currentValue: 10500,
      yield: 500,
      nextPayout: 85,
      payoutDate: '2024-02-20',
      status: 'Active'
    }
  ];

  const transactionHistory = [
    {
      id: 1,
      type: 'Subscription',
      vault: 'JetLease Vault #001',
      amount: 25000,
      date: '2024-01-15',
      status: 'Completed'
    },
    {
      id: 2,
      type: 'Yield Payment',
      vault: 'JetLease Vault #001',
      amount: 375,
      date: '2024-01-15',
      status: 'Completed'
    },
    {
      id: 3,
      type: 'Subscription',
      vault: 'Luxury Auto Vault #001',
      amount: 10000,
      date: '2024-01-20',
      status: 'Completed'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-white mb-2">
            Portfolio Dashboard
          </h1>
          <p className="text-lg text-slate-300">
            Track your investments and earnings across all vaults
          </p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl shadow-lg p-6 border border-zinc-700 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-8 w-8 text-blue-500" />
              <ArrowUpRight className="h-4 w-4 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              ${portfolioData.totalInvested.toLocaleString()}
            </p>
            <p className="text-sm text-slate-400">Total Invested</p>
          </div>
          
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl shadow-lg p-6 border border-zinc-700 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <span className="text-sm font-medium text-green-400">+6.4%</span>
            </div>
            <p className="text-2xl font-bold text-white">
              ${portfolioData.currentValue.toLocaleString()}
            </p>
            <p className="text-sm text-slate-400">Current Value</p>
          </div>
          
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl shadow-lg p-6 border border-zinc-700 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between mb-2">
              <Award className="h-8 w-8 text-purple-500" />
              <span className="text-sm font-medium text-purple-400">YTD</span>
            </div>
            <p className="text-2xl font-bold text-white">
              ${portfolioData.totalYield.toLocaleString()}
            </p>
            <p className="text-sm text-slate-400">Total Yield</p>
          </div>
          
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl shadow-lg p-6 border border-zinc-700 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between mb-2">
              <Clock className="h-8 w-8 text-purple-500" />
              <span className="text-sm font-medium text-purple-400">5 days</span>
            </div>
            <p className="text-2xl font-bold text-white">
              ${portfolioData.nextPayoutAmount}
            </p>
            <p className="text-sm text-slate-400">Next Payout</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Vaults */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl shadow-lg p-6 border border-zinc-700 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 ease-in-out">
              <h2 className="text-xl font-semibold text-white mb-6">Active Vaults</h2>
              
              <div className="space-y-4">
                {activeVaults.map((vault) => (
                  <div key={vault.id} className="border border-zinc-700 rounded-lg p-4 bg-zinc-800/30 hover:border-purple-500/30 transition-all duration-300 ease-in-out">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-white">{vault.name}</h3>
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                        {vault.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-slate-400">Invested</p>
                        <p className="font-semibold text-white">${vault.invested.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Current Value</p>
                        <p className="font-semibold text-white">${vault.currentValue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Total Yield</p>
                        <p className="font-semibold text-green-400">${vault.yield.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Next Payout</p>
                        <p className="font-semibold text-purple-400">${vault.nextPayout}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-zinc-700">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Next payout: {vault.payoutDate}</span>
                        <button className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors duration-300 ease-in-out">
                          View Details →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Prestige Points */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 ease-in-out">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-zinc-900">Prestige Points</h3>
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600 mb-2">1,250</p>
                <p className="text-sm text-zinc-600 mb-4">Early Investor Badge</p>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-zinc-600">Next Milestone</p>
                  <div className="w-full bg-zinc-200 rounded-full h-2 mt-1">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <p className="text-xs text-zinc-600 mt-1">750 points to Gold status</p>
                </div>
              </div>
            </div>

            {/* Upcoming Payouts */}
            <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl shadow-lg p-6 border border-zinc-700 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 ease-in-out">
              <h3 className="text-lg font-semibold text-white mb-4">Upcoming Payouts</h3>
              <div className="space-y-3">
                {activeVaults.map((vault) => (
                  <div key={vault.id} className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-700/50 transition-colors duration-300 ease-in-out">
                    <div>
                      <p className="font-medium text-white text-sm">{vault.name}</p>
                      <p className="text-xs text-slate-400">{vault.payoutDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-400">${vault.nextPayout}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl shadow-lg p-6 border border-zinc-700 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 ease-in-out">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 transition-all duration-300 ease-in-out shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40">
                  Explore New Vaults
                </button>
                <button className="w-full border border-zinc-600 text-slate-300 py-3 px-4 rounded-lg font-medium hover:bg-zinc-800 hover:border-purple-500/30 transition-all duration-300 ease-in-out">
                  Download Statement
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="mt-8 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl shadow-lg p-6 border border-zinc-700 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 ease-in-out">
          <h2 className="text-xl font-semibold text-white mb-6">Recent Transactions</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Vault
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-zinc-800/30 divide-y divide-zinc-700">
                {transactionHistory.map((tx) => (
                  <tr key={tx.id} className="hover:bg-zinc-700/50 transition-colors duration-300 ease-in-out">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {tx.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {tx.vault}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      ${tx.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {tx.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};