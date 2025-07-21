import React, { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut } from 'lucide-react';

export const WalletConnectButton: React.FC = () => {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showConnectors, setShowConnectors] = useState(false);

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      // You could add a toast notification here
    }
  };

  const openEtherscan = () => {
    if (address && chain) {
      const baseUrl = chain.id === 1 ? 'https://etherscan.io' : 
                     chain.id === 11155111 ? 'https://sepolia.etherscan.io' :
                     'https://goerli.etherscan.io';
      window.open(`${baseUrl}/address/${address}`, '_blank');
    }
  };

  if (isConnected && address) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center space-x-3 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 transition-all duration-300 ease-in-out shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
        >
          <Wallet className="h-4 w-4" />
          <span>{formatAddress(address)}</span>
          <ChevronDown className="h-4 w-4" />
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-64 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl z-50">
            <div className="p-4 border-b border-zinc-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Connected to</span>
                <span className="text-sm text-purple-400 font-medium">
                  {chain?.name || 'Unknown Network'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-white font-mono text-sm">{formatAddress(address)}</span>
                <button
                  onClick={copyAddress}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  onClick={openEtherscan}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-2">
              <button
                onClick={() => {
                  disconnect();
                  setShowDropdown(false);
                }}
                className="w-full flex items-center space-x-2 px-3 py-2 text-red-400 hover:bg-zinc-700 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Disconnect</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowConnectors(!showConnectors)}
        disabled={isPending}
        className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 transition-all duration-300 ease-in-out shadow-xl shadow-purple-500/25 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Wallet className="h-4 w-4" />
        <span>{isPending ? 'Connecting...' : 'Connect Wallet'}</span>
      </button>

      {showConnectors && (
        <div className="absolute right-0 mt-2 w-56 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl z-50">
          <div className="p-2">
            <div className="px-3 py-2 text-sm text-slate-400 border-b border-zinc-700 mb-2">
              Choose Wallet
            </div>
            {connectors.map((connector) => (
              <button
                key={connector.uid}
                onClick={() => {
                  connect({ connector });
                  setShowConnectors(false);
                }}
                disabled={isPending}
                className="w-full flex items-center space-x-3 px-3 py-2 text-white hover:bg-zinc-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Wallet className="h-4 w-4" />
                <span>{connector.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};