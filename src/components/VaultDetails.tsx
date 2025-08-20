import React, { useState } from 'react';
import { ArrowLeft, Shield, TrendingUp, Clock, Users, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { useAccount } from 'wagmi';
import { CreditScoring } from './CreditScoring';

interface VaultDetailsProps {
  vaultId: string;
  onBack: () => void;
}

const vaultData = {
  'jetlease-001': {
    name: 'Jet Series I (G550)',
    yield: '8.5%',
    status: 'Anchor LPs Only',
    collateral: 'Gulfstream G550 (1st-lien)',
    image: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    minimum: '$100,000',
    lockup: '60M',
    totalValue: '$2.5M',
    available: '$750K',
    investors: 8,
    riskScore: 'A-',
    description: 'Our flagship vault featuring premium aircraft financing with institutional-grade collateral. The Gulfstream G550 provides predictable returns through established aviation leasing markets in Asia-Pacific.',
    features: [
      '1st-lien position on aircraft asset',
      'Comprehensive hull & liability insurance',
      'Monthly yield distributions via smart contract',
      'Full on-chain transparency and reporting',
      'Professional aircraft management included',
      'Full guarantees provided'
    ]
  },
  'yacht-vault-001': {
    name: 'Yacht Series I',
    yield: '10-15%',
    status: 'Pipeline',
    collateral: 'Luxury yacht portfolio (50ft+)',
    image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    minimum: '$50,000',
    lockup: '3-5 years',
    totalValue: '$4.2M',
    available: '$1.8M',
    investors: 0,
    riskScore: 'B+',
    description: 'Exclusive financing for luxury yachts with verified ownership and comprehensive marine insurance. All vessels are professionally managed and maintained in premium marinas.',
    features: [
      'Premium yacht portfolio (50ft+)',
      'Full marine insurance coverage',
      'Professional yacht management',
      'Quarterly performance reviews',
      'Mediterranean & Caribbean focus'
    ]
  },
  'esg-credit-001': {
    name: 'ESG Infrastructure I',
    yield: '6-9%',
    status: 'Development',
    collateral: 'Sustainable infrastructure projects',
    image: 'https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    minimum: '$25,000',
    lockup: '7-10 years',
    totalValue: '$3.8M',
    available: '$0',
    investors: 0,
    riskScore: 'A+',
    description: 'Investment in verified sustainable infrastructure projects with positive environmental impact. All projects meet strict ESG criteria and generate measurable carbon credits.',
    features: [
      'ESG-compliant investments only',
      'Carbon credit generation potential',
      'Impact measurement reporting',
      'Regulatory compliance assurance',
      'Government-backed initiatives'
    ]
  }
};

export const VaultDetails: React.FC<VaultDetailsProps> = ({ vaultId, onBack }) => {
  const { isConnected } = useAccount();
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionAmount, setSubscriptionAmount] = useState('100000');
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const vault = vaultData[vaultId as keyof typeof vaultData];
  
  if (!vault) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Vault Not Found</h2>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-lg hover:from-amber-700 hover:to-amber-800 transition-all"
          >
            Back to Vaults
          </button>
        </div>
      </div>
    );
  }

  const handleSubscribe = () => {
    setShowConfirmation(true);
  };

  const handleConfirmSubscription = () => {
    setIsSubscribing(true);
    // Simulate subscription process
    setTimeout(() => {
      setIsSubscribing(false);
      setShowConfirmation(false);
      alert('Subscription successful! Vault tokens have been minted to your wallet.');
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Anchor LPs Only': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Pipeline': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Development': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      default: return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
  };

  const isAvailable = vault.status === 'Anchor LPs Only';

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-slate-400 hover:text-purple-400 mb-8 transition-colors duration-300 ease-in-out group"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Vaults</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-700 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 ease-in-out">
              <div className="relative h-80">
                <img 
                  src={vault.image} 
                  alt={vault.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <h1 className="text-4xl font-serif font-bold text-white mb-3">{vault.name}</h1>
                  <div className="flex items-center space-x-6 text-white">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-6 w-6 text-purple-400" />
                      <span className="font-bold text-2xl">{vault.yield} APY</span>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border ${getStatusColor(vault.status)}`}>
                      {vault.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                  <div className="text-center bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
                    <p className="text-sm text-slate-400 mb-2">Minimum</p>
                    <p className="text-2xl font-bold text-white">{vault.minimum}</p>
                  </div>
                  <div className="text-center bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
                    <p className="text-sm text-slate-400 mb-2">Duration</p>
                    <p className="text-2xl font-bold text-white">{vault.lockup}</p>
                  </div>
                  <div className="text-center bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
                    <p className="text-sm text-slate-400 mb-2">Available</p>
                    <p className="text-2xl font-bold text-white">{vault.available}</p>
                  </div>
                  <div className="text-center bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
                    <p className="text-sm text-slate-400 mb-2">Risk Score</p>
                    <p className="text-2xl font-bold text-green-400">{vault.riskScore}</p>
                  </div>
                </div>

                <div className="mb-10">
                  <h3 className="text-2xl font-semibold text-white mb-6">Investment Overview</h3>
                  <p className="text-slate-300 mb-8 text-lg leading-relaxed">{vault.description}</p>
                  
                  <h4 className="text-xl font-semibold text-white mb-4">Key Features</h4>
                  <ul className="space-y-3">
                    {vault.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <CheckCircle2 className="h-6 w-6 text-green-400 flex-shrink-0" />
                        <span className="text-slate-300 text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Subscription Form */}
                {isAvailable ? (
                  <div className="bg-zinc-800/50 rounded-2xl p-8 border border-zinc-700">
                    <h3 className="text-2xl font-semibold text-white mb-6">Subscribe to Vault</h3>
                    
                    {!isConnected && (
                      <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                        <p className="text-purple-400 text-sm">
                          Please connect your wallet to subscribe to this vault.
                        </p>
                      </div>
                    )}
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-slate-300 mb-3">
                        Investment Amount (USDC)
                      </label>
                      <input
                        type="number"
                        value={subscriptionAmount}
                        onChange={(e) => setSubscriptionAmount(e.target.value)}
                        className="w-full px-6 py-4 bg-zinc-700 border border-zinc-600 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg transition-all duration-300 ease-in-out"
                        placeholder="100000"
                        min={vault.minimum.replace(/[$,]/g, '')}
                      />
                    </div>

                    <div className="mb-8">
                      <div className="flex items-center space-x-2 text-sm text-slate-400">
                        <AlertCircle className="h-4 w-4" />
                        <span>Expected annual yield: ~{vault.yield} based on current market conditions</span>
                      </div>
                    </div>

                    <button
                      onClick={handleSubscribe}
                      disabled={!isConnected}
                      className="w-full bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white py-4 px-8 rounded-xl font-semibold hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 transition-all duration-300 ease-in-out shadow-xl shadow-purple-500/25 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {!isConnected ? 'Connect Wallet to Subscribe' : 'Subscribe to Vault'}
                    </button>
                  </div>
                ) : (
                  <div className="bg-zinc-800/50 rounded-2xl p-8 border border-zinc-700 text-center">
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      {vault.status === 'Pipeline' ? 'Coming Soon' : 'In Development'}
                    </h3>
                    <p className="text-slate-300 mb-6">
                      {vault.status === 'Pipeline' 
                        ? 'This vault is currently in our pipeline. Join our waitlist to be notified when it becomes available.'
                        : 'This vault is currently in development. We\'ll announce when it\'s ready for investment.'
                      }
                    </p>
                    <button className="bg-zinc-700 text-slate-300 py-4 px-8 rounded-xl font-semibold cursor-not-allowed">
                      {vault.status === 'Pipeline' ? 'Join Waitlist' : 'Notify Me'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Credit Scoring */}
            <CreditScoring vaultId={vaultId} />
            
            {/* Vault Stats */}
            <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl shadow-2xl p-8 border border-zinc-700 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 ease-in-out">
              <h3 className="text-xl font-semibold text-white mb-6">Vault Statistics</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Current LPs</span>
                  <span className="font-semibold text-white text-lg">{vault.investors}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total Value</span>
                  <span className="font-semibold text-white text-lg">{vault.totalValue}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Originator</span>
                  <span className="font-semibold text-white text-lg">PrivéFi</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Collateral Type</span>
                  <span className="font-semibold text-white text-lg">1st-lien</span>
                </div>
                <div className="pt-4 border-t border-zinc-700">
                  <button className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors duration-300 ease-in-out">
                    <ExternalLink className="h-4 w-4" />
                    <span>View on Etherscan</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-10 max-w-md w-full mx-4 border border-zinc-700 shadow-2xl">
            <h3 className="text-2xl font-semibold text-white mb-6">Confirm Subscription</h3>
            <p className="text-slate-300 mb-8 leading-relaxed">
              You are subscribing to {vault.name} with ${parseInt(subscriptionAmount).toLocaleString()} USDC. 
              Expected yield: ~{vault.yield}.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 border border-zinc-600 text-slate-300 py-3 px-4 rounded-lg hover:bg-zinc-800 transition-colors duration-300 ease-in-out"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSubscription}
                disabled={isSubscribing}
                className="flex-1 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 transition-all duration-300 ease-in-out disabled:opacity-50"
              >
                {isSubscribing ? 'Processing...' : 'Confirm & Subscribe'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};