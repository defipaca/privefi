import React from 'react';
import { TrendingUp, Shield, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface CreditScoringProps {
  vaultId: string;
}

const scoringData = {
  'jetlease-001': {
    overallScore: 'A-',
    factors: [
      { name: 'Asset Risk', score: 95, color: 'green', detail: 'Aircraft <5Y, fully insured' },
      { name: 'Lessee Credit', score: 88, color: 'green', detail: 'AA- rated lessees' },
      { name: 'Lease Terms', score: 85, color: 'green', detail: '12-year avg lease term' },
      { name: 'Cashflow', score: 82, color: 'yellow', detail: 'Monthly verified receipts' }
    ]
  },
  'yacht-vault-001': {
    overallScore: 'B+',
    factors: [
      { name: 'Asset Quality', score: 88, color: 'green', detail: 'Premium yachts 50ft+' },
      { name: 'Market Demand', score: 82, color: 'green', detail: 'Strong luxury market' },
      { name: 'Insurance Coverage', score: 90, color: 'green', detail: 'Full marine insurance' },
      { name: 'Liquidity Risk', score: 75, color: 'yellow', detail: 'Specialized market' }
    ]
  },
  'esg-credit-001': {
    overallScore: 'A+',
    factors: [
      { name: 'ESG Compliance', score: 99, color: 'green', detail: 'Certified sustainable projects' },
      { name: 'Credit Quality', score: 94, color: 'green', detail: 'Government-backed initiatives' },
      { name: 'Impact Metrics', score: 91, color: 'green', detail: 'Measurable environmental benefit' },
      { name: 'Regulatory Risk', score: 88, color: 'green', detail: 'Stable policy environment' }
    ]
  }
};

export const CreditScoring: React.FC<CreditScoringProps> = ({ vaultId }) => {
  const data = scoringData[vaultId as keyof typeof scoringData];
  
  if (!data) return null;

  const getColorClass = (color: string) => {
    switch (color) {
      case 'green': return 'bg-green-500';
      case 'yellow': return 'bg-yellow-500';
      case 'red': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl shadow-2xl p-8 border border-zinc-700 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 ease-in-out">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-semibold text-white">AI Credit Analysis</h3>
        <div className="flex items-center space-x-3">
          <Shield className="h-6 w-6 text-green-400" />
          <span className="text-3xl font-bold text-green-400">{data.overallScore}</span>
        </div>
      </div>

      <div className="space-y-6">
        {data.factors.map((factor, index) => (
          <div key={index} className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-300">{factor.name}</span>
              <span className="text-sm font-bold text-white">{factor.score}/100</span>
            </div>
            <div className="w-full bg-zinc-700 rounded-full h-3">
              <div 
                className={`h-3 rounded-full ${getColorClass(factor.color)}`}
                style={{ width: `${factor.score}%` }}
              />
            </div>
            <p className="text-xs text-slate-400">{factor.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-zinc-700">
        <div className="flex items-center space-x-2 text-green-400 mb-3">
          <CheckCircle2 className="h-5 w-5" />
          <span className="text-sm font-medium">Risk Assessment Complete</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          This vault meets our institutional-grade standards with excellent collateral quality and risk management.
        </p>
      </div>
    </div>
  );
};