import React, { useState, useEffect } from 'react';
import { ViewType } from './types';
import { NucleoStorage } from './lib/storage';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { TelemetryView } from './components/TelemetryView';
import { AccountsView } from './components/AccountsView';
import { ExpensesView } from './components/ExpensesView';
import { DebtAvalancheView } from './components/DebtAvalancheView';
import { EnarmRouletteView } from './components/EnarmRouletteView';
import { EnarmTopicsView } from './components/EnarmTopicsView';
import { GeminiRagView } from './components/GeminiRagView';
import { HubApisView } from './components/HubApisView';
import { CommandPaletteModal } from './components/CommandPaletteModal';
import { QuickActionModal } from './components/QuickActionModal';
import { ThreeBackground } from './components/ThreeBackground';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [isGuardMode, setIsGuardMode] = useState<boolean>(false);
  const [userXp, setUserXp] = useState<number>(3450);
  const [isPaletteOpen, setIsPaletteOpen] = useState<boolean>(false);
  const [isQuickActionOpen, setIsQuickActionOpen] = useState<boolean>(false);
  const [, setRefreshTrigger] = useState<number>(0);

  // Load initial settings
  useEffect(() => {
    setIsGuardMode(NucleoStorage.getGuardMode());
    setUserXp(NucleoStorage.getXp());
  }, []);

  const handleToggleGuardMode = () => {
    const next = !isGuardMode;
    setIsGuardMode(next);
    NucleoStorage.setGuardMode(next);
  };

  const handleAddXp = (amount: number) => {
    const next = userXp + amount;
    setUserXp(next);
    NucleoStorage.addXp(amount);
  };

  const handleRefreshData = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#020711] text-[#f8fafc] font-sans relative">
      {/* Tactical Canvas Ambient Grid */}
      <ThreeBackground />

      {/* Persistent Left Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        onSelectView={setCurrentView}
        userXp={userXp}
        isGuardMode={isGuardMode}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        {/* Top HUD Header */}
        <Header
          isGuardMode={isGuardMode}
          onToggleGuardMode={handleToggleGuardMode}
          onOpenPalette={() => setIsPaletteOpen(true)}
          onOpenQuickAction={() => setIsQuickActionOpen(true)}
        />

        {/* Dynamic Stage View Container */}
        <main className="flex-1 overflow-y-auto">
          {currentView === 'dashboard' && (
            <DashboardView
              onNavigate={setCurrentView}
              isGuardMode={isGuardMode}
              onOpenQuickAction={() => setIsQuickActionOpen(true)}
            />
          )}

          {currentView === 'telemetria' && (
            <TelemetryView
              isGuardMode={isGuardMode}
              onXpGained={handleAddXp}
            />
          )}

          {currentView === 'finanzas-cuentas' && <AccountsView />}

          {currentView === 'finanzas-gastos' && <ExpensesView />}

          {currentView === 'finanzas-avalancha' && <DebtAvalancheView />}

          {currentView === 'enarm-ruleta' && (
            <EnarmRouletteView onXpGained={handleAddXp} />
          )}

          {currentView === 'enarm-temas' && <EnarmTopicsView />}

          {currentView === 'ia-gemini' && <GeminiRagView />}

          {currentView === 'hub-apis' && <HubApisView />}
        </main>
      </div>

      {/* Command Palette Modal (⌘K) */}
      <CommandPaletteModal
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onNavigate={setCurrentView}
        onToggleGuardMode={handleToggleGuardMode}
        onQuickExpenseAdded={handleRefreshData}
      />

      {/* Quick Action Modal */}
      <QuickActionModal
        isOpen={isQuickActionOpen}
        onClose={() => setIsQuickActionOpen(false)}
        onSuccess={handleRefreshData}
      />
    </div>
  );
}
