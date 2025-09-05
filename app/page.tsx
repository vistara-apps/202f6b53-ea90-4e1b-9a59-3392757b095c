'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { Navigation } from '@/components/Navigation';
import { Dashboard } from '@/components/Dashboard';
import { LearnView } from '@/components/LearnView';
import { HistoryView } from '@/components/HistoryView';
import { ProfileView } from '@/components/ProfileView';

export default function Home() {
  const [currentView, setCurrentView] = useState('dashboard');
  const { setFrameReady } = useMiniKit();

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'learn':
        return <LearnView />;
      case 'history':
        return <HistoryView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gradient">
            FlashTrade Sim
          </h1>
          <p className="text-sm text-gray-400">
            Master Flash Trading Risk-Free
          </p>
        </div>

        {/* Navigation */}
        <Navigation 
          currentView={currentView} 
          onViewChange={setCurrentView} 
        />

        {/* Main Content */}
        <div className="pb-6">
          {renderCurrentView()}
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 pb-4">
          <p>Practice trading • Build confidence • Master strategies</p>
        </div>
      </div>
    </main>
  );
}
