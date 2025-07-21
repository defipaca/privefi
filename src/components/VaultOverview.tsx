import React from 'react';
import { Plane, Anchor, Leaf, TrendingUp, Shield, Clock, ArrowRight } from 'lucide-react';

interface VaultOverviewProps {
  onVaultSelect: (vaultId: string) => void;
}

const vaults = [
  {
    id: 'jetlease-001',
    name: 'Jet Series I',
    yield: '8.5%',
    status: 'Anchor LPs Only',
    collateral: 'Gulfstream G450 (1st-lien)',
    icon: Plane,
    image: 'https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg',
    totalValue: '$2.5M',
    duration: '5 years',
    riskScore: 'A-',
    featured: true
  },
  {
    id: 'yacht-vault-001',
    name: 'Yacht Series I',
    yield: '10-15%',
    status: 'Pipeline',
    collateral: 'Luxury yacht portfolio (50ft+)',
    icon: Anchor,
    image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg',
    totalValue: '$4.2M',
    duration: '3-5 years',
    riskScore: 'B+',
    featured: false
  },
  {
    id: 'esg-credit-001',
    name: 'ESG Infrastructure I',
    yield: '6-9%',
    status: 'Development',
    collateral: 'Sustainable infrastructure projects',
    icon: Leaf,
    image: 'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg',
    totalValue: '$3.8M',
    duration: '7-10 years',
    riskScore: 'A+',
    featured: false
  }
];

export const VaultOverview: React.FC<VaultOverviewProps> = ({ onVaultSelect }) => {
  return (
    <section className="py-24 bg-gradient-to-b from-zinc-900 to-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Vault Pipeline & Roadmap
          </h2>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Our expanding portfolio of tokenized private credit opportunities across luxury assets and sustainable infrastructure, each with institutional-grade collateral and transparent risk assessment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {vaults.map((vault) => {
            const Icon = vault.icon;
            return (
              <div
                key={vault.id}
                className={`group bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-3xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 overflow-hidden border ${
                  vault.featured 
                    ? 'border-purple-500/50 ring-2 ring-purple-500/20' 
                    : 'border-zinc-700 hover:border-purple-500/50'
                } transform hover:scale-105`}
              >
                {vault.featured && (
                  <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white text-center py-2 px-4 text-sm font-semibold">
                    🚀 FLAGSHIP VAULT
                  </div>
                )}
                
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={vault.image} 
                    alt={vault.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-6 left-6">
                    <div className="bg-purple-500/20 backdrop-blur-sm rounded-full p-3 border border-purple-500/30">
                      <Icon className="h-7 w-7 text-purple-400" />
                    </div>
                  </div>
                  <div className="absolute top-6 right-6">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border ${
                      vault.riskScore.startsWith('A') ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                    }`}>
                      {vault.riskScore}
                    </span>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{vault.name}</h3>
                    <div className="flex items-center space-x-2 text-purple-400">
                      <TrendingUp className="h-5 w-5" />
                      <span className="font-bold text-lg">{vault.yield}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-3 h-3 rounded-full ${
                      vault.status === 'Anchor LPs Only' ? 'bg-purple-400' :
                      vault.status === 'Pipeline' ? 'bg-blue-400' : 'bg-slate-400'
                    }`} />
                    <span className="text-sm font-medium text-slate-300">{vault.status}</span>
                  </div>
                  
                  <p className="text-slate-400 mb-6 leading-relaxed text-sm">{vault.collateral}</p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-8 text-center">
                    <div className="bg-zinc-800/50 rounded-xl p-3 border border-zinc-700">
                      <p className="text-xs text-slate-500 mb-1">Value</p>
                      <p className="font-bold text-white text-sm">{vault.totalValue}</p>
                    </div>
                    <div className="bg-zinc-800/50 rounded-xl p-3 border border-zinc-700">
                      <p className="text-xs text-slate-500 mb-1">Duration</p>
                      <p className="font-bold text-white text-sm">{vault.duration}</p>
                    </div>
                    <div className="bg-zinc-800/50 rounded-xl p-3 border border-zinc-700">
                      <p className="text-xs text-slate-500 mb-1">Risk</p>
                      <p className="font-bold text-white text-sm">{vault.riskScore}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onVaultSelect(vault.id)}
                    className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ease-in-out shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2 ${
                      vault.featured
                        ? 'bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 hover:shadow-2xl hover:shadow-purple-500/40'
                        : 'border border-zinc-600 text-slate-300 hover:border-purple-500 hover:text-purple-400 hover:bg-purple-500/10 hover:shadow-lg hover:shadow-purple-500/25'
                    }`}
                  >
                    <span>{vault.featured ? 'View Details' : 'Learn More'}</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pipeline Note */}
        <div className="mt-16 text-center">
          <div className="bg-zinc-800/50 rounded-2xl p-8 border border-zinc-700 max-w-4xl mx-auto hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 ease-in-out">
            <h3 className="text-xl font-bold text-white mb-4">Expanding Asset Classes</h3>
            <p className="text-slate-300 leading-relaxed">
              Our roadmap includes luxury real estate, fine art, collectibles, and other alternative assets. 
              Each vault maintains our institutional standards: 1st-lien positions, comprehensive insurance, 
              and transparent on-chain execution.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};