import React from 'react';
import { Brain, TrendingUp, Shield, BarChart3, CheckCircle2 } from 'lucide-react';

export const AIVaultScore: React.FC = () => {
  const scoreFactors = [
    { name: 'Asset Quality', score: 92, icon: Shield, color: 'text-green-400' },
    { name: 'Borrower Credit', score: 88, icon: TrendingUp, color: 'text-blue-400' },
    { name: 'Market Conditions', score: 85, icon: BarChart3, color: 'text-purple-400' },
    { name: 'Lease Terms', score: 84, icon: CheckCircle2, color: 'text-purple-400' }
  ];

  const overallScore = Math.round(scoreFactors.reduce((sum, factor) => sum + factor.score, 0) / scoreFactors.length);

  return (
    <section className="py-24 bg-gradient-to-b from-zinc-950 to-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            AI-Powered Vault Scoring
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Our proprietary AI system analyzes asset risk, borrower credit, LTV ratios, market data, and lease terms to provide institutional-grade risk assessment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Score Display */}
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-3xl p-12 border border-zinc-700 shadow-2xl hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 ease-in-out">
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <div className="w-48 h-48 rounded-full border-8 border-zinc-700 flex items-center justify-center mx-auto mb-6 relative overflow-hidden">
                  <div 
                    className="absolute inset-0 rounded-full border-8 border-purple-500"
                    style={{
                      background: `conic-gradient(#a020f0 0deg ${overallScore * 3.6}deg, transparent ${overallScore * 3.6}deg 360deg)`
                    }}
                  />
                  <div className="w-32 h-32 bg-zinc-800 rounded-full flex items-center justify-center z-10">
                    <div className="text-center">
                      <p className="text-5xl font-bold text-white">{overallScore}</p>
                      <p className="text-sm text-slate-400">/ 100</p>
                    </div>
                  </div>
                </div>
                <Brain className="h-12 w-12 text-purple-500 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Jet Series I Vault Score</h3>
              <p className="text-purple-400 font-semibold">Excellent Risk Profile</p>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-8">Risk Assessment Breakdown</h3>
            {scoreFactors.map((factor, index) => {
              const Icon = factor.icon;
              return (
                <div key={index} className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 ease-in-out">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Icon className={`h-6 w-6 ${factor.color}`} />
                      <span className="font-semibold text-white">{factor.name}</span>
                    </div>
                    <span className="text-xl font-bold text-white">{factor.score}/100</span>
                  </div>
                  <div className="w-full bg-zinc-700 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-500"
                      style={{ width: `${factor.score}%` }}
                    />
                  </div>
                </div>
              );
            })}
            
            <div className="mt-8 p-6 bg-purple-500/10 border border-purple-500/30 rounded-xl">
              <div className="flex items-start space-x-3">
                <Brain className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">AI Analysis Summary</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    This vault demonstrates exceptional risk characteristics with premium collateral, 
                    strong borrower creditworthiness, and favorable market conditions. The conservative 
                    LTV ratio provides substantial downside protection for LPs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};