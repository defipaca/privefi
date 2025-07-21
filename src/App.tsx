import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { JetSeriesVault } from './components/JetSeriesVault';
import { AIVaultScore } from './components/AIVaultScore';
import { VaultOverview } from './components/VaultOverview';
import { LPCallToAction } from './components/LPCallToAction';
import { VaultDetails } from './components/VaultDetails';
import { TransparencyDashboard } from './components/TransparencyDashboard';
import { UserDashboard } from './components/UserDashboard';
import { AIAssistant } from './components/AIAssistant';

export type Page = 'home' | 'vault-details' | 'transparency' | 'dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedVault, setSelectedVault] = useState<string>('jetlease-001');

  const handleVaultSelect = (vaultId: string) => {
    setSelectedVault(vaultId);
    setCurrentPage('vault-details');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero />
            <JetSeriesVault />
            <AIVaultScore />
            <VaultOverview onVaultSelect={handleVaultSelect} />
            <LPCallToAction />
          </>
        );
      case 'vault-details':
        return <VaultDetails vaultId={selectedVault} onBack={handleBackToHome} />;
      case 'transparency':
        return <TransparencyDashboard />;
      case 'dashboard':
        return <UserDashboard />;
      default:
        return (
          <>
            <Hero />
            <JetSeriesVault />
            <AIVaultScore />
            <VaultOverview onVaultSelect={handleVaultSelect} />
            <LPCallToAction />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderPage()}
      <AIAssistant />
    </div>
  );
}

export default App;