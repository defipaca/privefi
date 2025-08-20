import React from 'react';
import { Plane, Download, Shield, Clock, TrendingUp, CheckCircle2, ExternalLink } from 'lucide-react';

export const JetSeriesVault: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-zinc-900 to-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Simulated Deals – Now Accepting Interest
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Current opportunities featuring premium aircraft financing with institutional-grade collateral
          </p>
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl max-w-4xl mx-auto">
            <p className="text-yellow-400 font-medium">
              <strong>Disclaimer:</strong> The deals shown below are simulated for demonstration purposes only and do not represent actual investment opportunities.
            </p>
          </div>
        </div>

        {/* Deal 1 - Bombardier Global 6000 */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-700 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 ease-in-out">
            <div className="relative h-80">
              <img 
                src="6000.jpeg" 
                alt="Bombardier Global 6000"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-6 right-6">
                <span className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 backdrop-blur-sm">
                  Simulated Deal
                </span>
              </div>
              <div className="absolute bottom-6 left-6">
                <div className="bg-purple-500/20 backdrop-blur-sm rounded-full p-4 border border-purple-500/30 mb-4">
                  <Plane className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Bombardier Global 6000</h3>
                <p className="text-purple-200">First-Lien Senior Loan</p>
              </div>
            </div>

            <div className="p-10">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
                <div className="text-center bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
                  <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                  <p className="text-sm text-slate-400 mb-2">APY</p>
                  <p className="text-3xl font-bold text-white">10%</p>
                </div>
                <div className="text-center bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
                  <Clock className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <p className="text-sm text-slate-400 mb-2">Monthly Yield</p>
                  <p className="text-3xl font-bold text-white">2.43%</p>
                </div>
                <div className="text-center bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
                  <Shield className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <p className="text-sm text-slate-400 mb-2">Net LTV</p>
                  <p className="text-3xl font-bold text-white">52%</p>
                </div>
                <div className="text-center bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
                  <CheckCircle2 className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                  <p className="text-sm text-slate-400 mb-2">Term</p>
                  <p className="text-3xl font-bold text-white">36M</p>
                </div>
                <div className="text-center bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
                  <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                  <p className="text-sm text-slate-400 mb-2">IRR</p>
                  <p className="text-3xl font-bold text-purple-400">11.69%</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">Deal Structure</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">PrivéFi Allocation</span>
                      <span className="font-semibold text-white">USD 5M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Final Payment</span>
                      <span className="font-semibold text-white">USD 2M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Collateral Cover</span>
                      <span className="font-semibold text-green-400">3.99x</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Payment Terms</span>
                      <span className="font-semibold text-white">Pay investors in arrears</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">Collateral Package</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Aircraft Value</span>
                      <span className="font-semibold text-white">USD 27.87M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Real Estate</span>
                      <span className="font-semibold text-white">USD 5M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Cash Deposit</span>
                      <span className="font-semibold text-white">USD 900K</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button 
                  disabled
                  className="flex-1 bg-zinc-700 text-slate-400 py-4 px-6 rounded-xl font-semibold cursor-not-allowed"
                >
                  Deposit (Coming Soon)
                </button>
                <button 
                  onClick={() => window.open('https://drive.google.com/file/d/1LFdhezLfEjOggXBMorEPs2fYk4u1ap0a/view', '_blank', 'noopener,noreferrer')}
                  className="flex items-center space-x-2 border border-purple-600 text-purple-400 py-4 px-6 rounded-xl font-semibold hover:bg-purple-600/10 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 ease-in-out"
                >
                  <span>🔎 View Deal Details</span>
                  <ExternalLink className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Deal 2 - Gulfstream G550 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Vault Image */}
          <div className="relative">
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 ease-in-out">
              <img 
                src="g550.jpeg" 
                alt="Gulfstream G550"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="bg-purple-500/20 backdrop-blur-sm rounded-full p-4 border border-purple-500/30 mb-4">
                  <Plane className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Gulfstream G550</h3>
                <p className="text-purple-200">1st-lien collateral position</p>
              </div>
            </div>
          </div>

          {/* Vault Details */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-8 border border-zinc-700 shadow-xl hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 ease-in-out">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
                  <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                  <p className="text-sm text-slate-400 mb-2">APY</p>
                  <p className="text-3xl font-bold text-white">8.5%</p>
                </div>
                <div className="text-center bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
                  <Clock className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <p className="text-sm text-slate-400 mb-2">Monthly Yield</p>
                  <p className="text-3xl font-bold text-white">1.95%</p>
                </div>
                <div className="text-center bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
                  <Shield className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <p className="text-sm text-slate-400 mb-2">Net LTV</p>
                  <p className="text-3xl font-bold text-white">71%</p>
                </div>
                <div className="text-center bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
                  <CheckCircle2 className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                  <p className="text-sm text-slate-400 mb-2">Term</p>
                  <p className="text-3xl font-bold text-white">60M</p>
                </div>
                <div className="text-center bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
                  <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                  <p className="text-sm text-slate-400 mb-2">IRR</p>
                  <p className="text-3xl font-bold text-purple-400">10.41%</p>
                </div>
                <div className="text-center bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
                  <Shield className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <p className="text-sm text-slate-400 mb-2">Collateral Cover</p>
                  <p className="text-3xl font-bold text-white">6.0x</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Collateral Asset</span>
                  <span className="font-semibold text-white">Gulfstream G550</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">PrivéFi Allocation</span>
                  <span className="font-semibold text-white">USD 6M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Final Payment</span>
                  <span className="font-semibold text-white">USD 0.97M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Aircraft Value</span>
                  <span className="font-semibold text-white">USD 25.63M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Cash Deposit</span>
                  <span className="font-semibold text-white">USD 1.2M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Lien Position</span>
                  <span className="font-semibold text-green-400">1st-lien</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Guarantees</span>
                  <span className="font-semibold text-green-400">Full Guarantees Provided</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Payment Terms</span>
                  <span className="font-semibold text-white">Pay investors in arrears</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <button 
                  disabled
                  className="flex-1 bg-zinc-700 text-slate-400 py-4 px-6 rounded-xl font-semibold cursor-not-allowed"
                >
                  Deposit (Coming Soon)
                </button>
                <a 
                  href="mailto:hello@privefi.xyz"
                  className="flex items-center space-x-2 border border-purple-600 text-purple-400 py-4 px-6 rounded-xl font-semibold hover:bg-purple-600/10 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 ease-in-out"
                >
                  <ExternalLink className="h-5 w-5" />
                  <span>Contact Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};