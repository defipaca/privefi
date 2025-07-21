import React from 'react';
import { ArrowRight, Shield, TrendingUp, Lock, ExternalLink } from 'lucide-react';

export const Hero: React.FC = () => {
  const openCalendly = () => {
    window.open('https://calendly.com/privefi', '_blank', 'noopener,noreferrer');
  };

  const openDeck = () => {
    window.open('https://drive.google.com/file/d/1y68MCQAPN9DvYBNgJqUkJ2i4JoSe3pUm/view?usp=sharing', '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg')] bg-cover bg-center opacity-10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 bg-gradient-to-r from-white via-purple-100 to-purple-200 bg-clip-text text-transparent leading-tight">
            The Prestige Layer<br />
            of Real-World Yield
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Bridging traditional private credit and DeFi — starting with Asia's luxury asset financing markets
          </p>
          
          <div className="flex justify-center space-x-6 mb-20">
            <button 
              onClick={openCalendly}
              className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white px-12 py-6 rounded-xl font-bold text-lg hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 transition-all duration-300 ease-in-out shadow-2xl shadow-purple-500/25 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40 flex items-center space-x-3"
            >
              <span>Book LP Call</span>
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
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-center space-x-4 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 ease-in-out">
              <Shield className="h-10 w-10 text-purple-500 flex-shrink-0" />
              <div className="text-left">
                <p className="font-bold text-white text-lg">Institutional Grade</p>
                <p className="text-slate-400">1st-lien collateral positions</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 ease-in-out">
              <TrendingUp className="h-10 w-10 text-purple-500 flex-shrink-0" />
              <div className="text-left">
                <p className="font-bold text-white text-lg">Target 8.5% APY</p>
                <p className="text-slate-400">Stable real-world returns</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 ease-in-out">
              <Lock className="h-10 w-10 text-purple-500 flex-shrink-0" />
              <div className="text-left">
                <p className="font-bold text-white text-lg">On-Chain Verified</p>
                <p className="text-slate-400">Full transparency & automation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};