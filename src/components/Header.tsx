import React, { useState, useEffect } from 'react';
import { Terminal, Plus, Stethoscope, Clock, Wifi } from 'lucide-react';

interface HeaderProps {
  isGuardMode: boolean;
  onToggleGuardMode: () => void;
  onOpenPalette: () => void;
  onOpenQuickAction: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isGuardMode,
  onToggleGuardMode,
  onOpenPalette,
  onOpenQuickAction,
}) => {
  const [timeUtc, setTimeUtc] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeUtc(now.toTimeString().split(' ')[0] + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-14 bg-[#05101d] border-b border-[#163a5d] px-4 flex items-center justify-between shrink-0 z-10">
      {/* System Monitor Left Block */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 px-2.5 py-1 rounded bg-[#081628] border border-[#163a5d]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#36d7d0] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#36d7d0]"></span>
          </span>
          <span className="font-mono text-xs font-semibold tracking-wider text-white">
            VIGILANTE OPERATIVO
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded bg-[#081628]/70 border border-[#163a5d]/60 font-mono text-[11px] text-[#65d9a5]">
          <Wifi className="w-3 h-3 text-[#65d9a5]" />
          <span>14ms PING</span>
        </div>

        <div className="hidden md:flex items-center gap-1.5 px-2 py-1 rounded bg-[#081628]/70 border border-[#163a5d]/60 font-mono text-[11px] text-[#8ba3c7]">
          <Clock className="w-3 h-3 text-[#36d7d0]" />
          <span>{timeUtc || 'SISTEMA INICIANDO'}</span>
        </div>
      </div>

      {/* Header Actions Right Block */}
      <div className="flex items-center space-x-2.5">
        {/* Modo Guardia Toggle Switch */}
        <button
          onClick={onToggleGuardMode}
          title="Modo Guardia: ajusta metas y compromisos diarios a mínimos viables de supervivencia"
          className={`flex items-center space-x-2 px-2.5 py-1.5 rounded border transition-all text-xs font-mono font-semibold ${
            isGuardMode
              ? 'bg-[#f1b84b]/15 text-[#f1b84b] border-[#f1b84b] shadow-[0_0_12px_rgba(241,184,75,0.25)]'
              : 'bg-[#081628] text-[#8ba3c7] border-[#163a5d] hover:text-white hover:border-[#36d7d0]'
          }`}
        >
          <Stethoscope className={`w-3.5 h-3.5 ${isGuardMode ? 'text-[#f1b84b]' : 'text-[#8ba3c7]'}`} />
          <span className="hidden sm:inline">MODO GUARDIA</span>
          <span
            className={`w-6 h-3.5 flex items-center rounded-full p-0.5 transition-colors ${
              isGuardMode ? 'bg-[#f1b84b]' : 'bg-[#193859]'
            }`}
          >
            <span
              className={`bg-[#020711] w-2.5 h-2.5 rounded-full shadow-md transform transition-transform ${
                isGuardMode ? 'translate-x-2.5' : 'translate-x-0'
              }`}
            />
          </span>
        </button>

        {/* Command Palette Button */}
        <button
          onClick={onOpenPalette}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#081628] text-white hover:text-[#36d7d0] border border-[#163a5d] hover:border-[#36d7d0] transition-all text-xs font-mono font-semibold shadow-sm"
        >
          <Terminal className="w-3.5 h-3.5 text-[#36d7d0]" />
          <span>⌘K // COMANDOS</span>
        </button>

        {/* Fast Action Register Button */}
        <button
          onClick={onOpenQuickAction}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#36d7d0] text-[#020711] hover:bg-[#5ef4ec] transition-all text-xs font-mono font-bold shadow-[0_0_14px_rgba(54,215,208,0.35)] active:scale-95"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span className="hidden xs:inline">REGISTRO RÁPIDO</span>
          <span className="xs:hidden">REGISTRO</span>
        </button>
      </div>
    </header>
  );
};
