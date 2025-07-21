import React from 'react';
import { Shield, TrendingUp, Eye, User, ExternalLink } from 'lucide-react';
import { Page } from '../App';
import { WalletConnectButton } from './WalletConnectButton';

interface NavigationProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'home', label: 'Vaults', icon: TrendingUp },
    { id: 'transparency', label: 'Transparency', icon: Eye },
    { id: 'dashboard', label: 'Dashboard', icon: User },
  ];

  return (
    <nav className="bg-slate-900/95 backdrop-blur-md border-b border-amber-500/20 sticky top-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => onPageChange('home')}
          >
            <Shield className="h-8 w-8 text-amber-500 group-hover:text-amber-400 transition-colors" />
            <div>
              <span className="text-xl font-serif font-bold text-white group-hover:text-amber-100 transition-colors">PrivéFi</span>
              <p className="text-xs text-slate-400 -mt-1">The Prestige Layer of Real-World Yield</p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex space-x-8">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onPageChange(id as Page)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out ${
                  currentPage === id
                    ? 'text-purple-400 bg-purple-500/20 shadow-lg shadow-purple-500/25'
                    : 'text-slate-300 hover:text-purple-400 hover:bg-slate-800/50 hover:shadow-lg hover:shadow-purple-500/10'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <a
              href="https://drive.google.com/file/d/1y68MCQAPN9DvYBNgJqUkJ2i4JoSe3pUm/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 border border-purple-500/50 text-purple-400 px-4 py-2 rounded-lg font-medium hover:bg-purple-500/10 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 ease-in-out"
            >
              <span>View Deck</span>
              <ExternalLink className="h-4 w-4" />
            </a>
            <WalletConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
};