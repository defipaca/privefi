import React from 'react';
import { ArrowRight, Users, Shield, TrendingUp, ExternalLink } from 'lucide-react';

export const LPCallToAction: React.FC = () => {
  const openCalendly = () => {
    window.open('https://calendly.com/privefi', '_blank', 'noopener,noreferrer');
  };

  const openDeck = () => {
    window.open('https://drive.google.com/file/d/1y68MCQAPN9DvYBNgJqUkJ2i4JoSe3pUm/view?usp=sharing', '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-24 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-purple-600/20 via-purple-700/20 to-purple-800/20 rounded-3xl p-12 border border-purple-500/30 backdrop-blur-sm hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 ease-in-out">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Become an Anchor LP
            </h2>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Are you a fund or family office looking for real-world yield? Join our early LPs and gain access to tokenized private credit with institutional-grade collateral and transparent on-chain execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 ease-in-out">
              <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Exclusive Access</h3>
              <p className="text-slate-300">Priority allocation to premium deal flow and early-stage vault opportunities</p>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 ease-in-out">
              <Shield className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Institutional Grade</h3>
              <p className="text-slate-300">1st-lien positions, comprehensive insurance, and rigorous due diligence</p>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 ease-in-out">
              <TrendingUp className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Stable Returns</h3>
              <p className="text-slate-300">Target 8-12% APY from real-world assets with predictable cash flows</p>
            </div>
          </div>

          <div className="text-center space-y-6">
            <div className="flex justify-center space-x-6">
            <button 
              onClick={openCalendly}
              className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white px-12 py-6 rounded-xl font-bold text-lg hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 transition-all duration-300 ease-in-out shadow-2xl shadow-purple-500/25 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40 flex items-center space-x-3"
            >
              <span>Schedule a Call</span>
              <ArrowRight className="h-6 w-6" />
            </button>
            <button 
              onClick={openDeck}
              className="border border-purple-500/50 text-purple-400 px-12 py-6 rounded-xl font-bold text-lg hover:bg-purple-500/10 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 ease-in-out flex items-center space-x-3"
            >
              <span>View Investor Deck</span>
              <ExternalLink className="h-6 w-6" />
            </button>
            </div>
            <p className="text-sm text-slate-400 mt-4">
              30-minute discovery call • No commitment required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};