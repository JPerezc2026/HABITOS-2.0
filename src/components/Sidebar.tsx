import React from 'react';
import { ViewType } from '../types';
import {
  LayoutDashboard,
  Activity,
  Landmark,
  Receipt,
  TrendingDown,
  Dices,
  BookOpen,
  BrainCircuit,
  Radio,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface SidebarProps {
  currentView: ViewType;
  onSelectView: (view: ViewType) => void;
  userXp: number;
  isGuardMode: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  userXp,
  isGuardMode,
}) => {
  // Bio-matriz Level calculation (e.g. lvl 28, 75% XP)
  const currentLvl = 28 + Math.floor(userXp / 1000);
  const xpInCurrentLvl = userXp % 1000;
  const xpPercent = Math.min(100, Math.round((xpInCurrentLvl / 1000) * 100));

  const navGroups = [
    {
      title: 'TELEMETRÍA & COCKPIT',
      items: [
        { id: 'dashboard' as ViewType, label: 'Dashboard SYS', icon: LayoutDashboard },
        { id: 'telemetria' as ViewType, label: 'Telemetría Diaria', icon: Activity },
      ],
    },
    {
      title: 'NÚCLEO FINANCIERO',
      items: [
        { id: 'finanzas-cuentas' as ViewType, label: 'Cuentas & Liquidez', icon: Landmark },
        { id: 'finanzas-gastos' as ViewType, label: 'Ingresos & Gastos', icon: Receipt },
        { id: 'finanzas-avalancha' as ViewType, label: 'Deudas & Avalancha', icon: TrendingDown },
      ],
    },
    {
      title: 'MATRIZ TÁCTICA ENARM',
      items: [
        { id: 'enarm-ruleta' as ViewType, label: 'Consola & Ruleta', icon: Dices },
        { id: 'enarm-temas' as ViewType, label: 'Mapa de Temas', icon: BookOpen },
      ],
    },
    {
      title: 'IA & CONEXIONES',
      items: [
        { id: 'ia-gemini' as ViewType, label: 'Segundo Cerebro RAG', icon: BrainCircuit },
        { id: 'hub-apis' as ViewType, label: 'Hub APIs & Enlaces', icon: Radio },
      ],
    },
  ];

  return (
    <aside className="w-64 h-full bg-[#05101d] border-r border-[#163a5d] flex flex-col justify-between shrink-0 select-none z-20">
      {/* Top Brand & Bio-Matriz Header */}
      <div className="p-4 border-b border-[#163a5d]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#36d7d0] shadow-[0_0_8px_#36d7d0] animate-pulse" />
            <span className="font-mono text-sm font-bold tracking-wider text-white">
              NÚCLEO OS <span className="text-[#36d7d0]">// HUD</span>
            </span>
          </div>
          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#0a1c30] text-[#8ba3c7] border border-[#163a5d]">
            v4.10
          </span>
        </div>

        {/* Bio-Matriz XP HUD Card */}
        <div className="p-2.5 rounded bg-[#081628] border border-[#163a5d]/70">
          <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
            <span className="text-[#8ba3c7] flex items-center gap-1 font-semibold">
              <Zap className="w-3 h-3 text-[#f1b84b]" />
              BIO-MATRIZ LVL {currentLvl}
            </span>
            <span className="text-[#36d7d0] font-bold">{xpPercent}% XP</span>
          </div>
          <div className="w-full bg-[#020711] h-1.5 rounded-full overflow-hidden border border-[#163a5d]/50">
            <div
              className="bg-gradient-to-r from-[#36d7d0] to-[#65d9a5] h-full transition-all duration-500 rounded-full"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-1 text-[9px] font-mono text-[#526f8c]">
            <span>SCORE: {userXp} XP</span>
            <span>PROX LVL: 1000 XP</span>
          </div>
        </div>
      </div>

      {/* Navigation Group Items */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        {navGroups.map((group) => (
          <div key={group.title}>
            <div className="px-2 mb-1.5 font-mono text-[10px] font-bold tracking-wider text-[#526f8c] uppercase">
              {group.title}
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectView(item.id)}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded text-xs font-medium transition-all text-left group ${
                      isActive
                        ? 'bg-[#081628] text-[#36d7d0] border border-[#1e4973] shadow-[0_0_12px_rgba(54,215,208,0.15)] font-semibold'
                        : 'text-[#8ba3c7] hover:text-white hover:bg-[#0a1c30] border border-transparent'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive
                          ? 'text-[#36d7d0]'
                          : 'text-[#526f8c] group-hover:text-[#8ba3c7]'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                    {isActive && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#36d7d0] shadow-[0_0_6px_#36d7d0]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Guard Mode Alert Badge if active */}
      {isGuardMode && (
        <div className="mx-3 mb-2 p-2 bg-[#f1b84b]/10 border border-[#f1b84b]/40 rounded text-[11px] font-mono text-[#f1b84b] flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#f1b84b] animate-ping" />
          <span>MODO GUARDIA ACTIVO: Metas adaptadas a supervivencia</span>
        </div>
      )}

      {/* Sidebar Footer */}
      <div className="p-3 border-t border-[#163a5d] bg-[#030b14] flex items-center justify-between text-[10px] font-mono text-[#526f8c]">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#65d9a5]" />
          <span className="text-[#8ba3c7]">KERNEL SECURE</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#65d9a5]" />
          <span className="text-[#65d9a5]">SYNC OK</span>
        </div>
      </div>
    </aside>
  );
};
