import React, { useState, useEffect, useRef } from 'react';
import { ViewType } from '../types';
import { Terminal, Plus, Dices, Stethoscope, BrainCircuit, TrendingDown, Activity, Landmark, ArrowRight, CornerDownLeft } from 'lucide-react';
import { NucleoStorage } from '../lib/storage';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewType) => void;
  onToggleGuardMode: () => void;
  onQuickExpenseAdded?: () => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onToggleGuardMode,
  onQuickExpenseAdded,
}) => {
  const [query, setQuery] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setFeedback(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // Handled by parent toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCommandExecution = (cmdStr?: string) => {
    const input = (cmdStr || query).trim();
    if (!input) return;

    // 1. +gasto [monto] [concepto]
    if (input.startsWith('+gasto')) {
      const parts = input.split(' ');
      const amount = parseFloat(parts[1]);
      const concept = parts.slice(2).join(' ') || 'Gasto express guardia';

      if (!isNaN(amount) && amount > 0) {
        const accounts = NucleoStorage.getAccounts();
        NucleoStorage.addTransaction({
          amount,
          type: 'gasto',
          category: 'Alimentación Guardia',
          concept,
          date: new Date().toISOString(),
          accountId: accounts[0]?.id || 'acc_1',
        });
        setFeedback(`Gasto de $${amount} (${concept}) registrado con éxito.`);
        if (onQuickExpenseAdded) onQuickExpenseAdded();
        setTimeout(() => {
          onClose();
          onNavigate('finanzas-gastos');
        }, 800);
        return;
      }
    }

    // 2. ruleta
    if (input.toLowerCase().includes('ruleta') || input.toLowerCase() === 'enarm') {
      onClose();
      onNavigate('enarm-ruleta');
      return;
    }

    // 3. guardia
    if (input.toLowerCase().includes('guardia')) {
      onToggleGuardMode();
      setFeedback('Modo Guardia alternado.');
      setTimeout(() => onClose(), 600);
      return;
    }

    // 4. gemini: [pregunta]
    if (input.startsWith('gemini:')) {
      onClose();
      onNavigate('ia-gemini');
      return;
    }

    // 5. avalancha
    if (input.toLowerCase().includes('avalancha') || input.toLowerCase().includes('deuda')) {
      onClose();
      onNavigate('finanzas-avalancha');
      return;
    }

    // 6. telemetria
    if (input.toLowerCase().includes('telemetria') || input.toLowerCase().includes('sueño')) {
      onClose();
      onNavigate('telemetria');
      return;
    }

    // 7. cuentas
    if (input.toLowerCase().includes('cuenta') || input.toLowerCase().includes('liquidez')) {
      onClose();
      onNavigate('finanzas-cuentas');
      return;
    }

    // Fallback default: search in dashboard
    onClose();
    onNavigate('dashboard');
  };

  const commandList = [
    {
      title: '+gasto 120 comida',
      desc: 'Registra un gasto express directamente en el libro mayor',
      action: '+gasto 120 comida de guardia',
      icon: Plus,
      color: 'text-[#ef7085]',
    },
    {
      title: 'ruleta',
      desc: 'Abre la consola táctica ENARM y gira por especialidades',
      action: 'ruleta',
      icon: Dices,
      color: 'text-[#f1b84b]',
    },
    {
      title: 'guardia',
      desc: 'Activa o desactiva el Modo Guardia hospitalario (metas viables)',
      action: 'guardia',
      icon: Stethoscope,
      color: 'text-[#f1b84b]',
    },
    {
      title: 'gemini: choque séptico',
      desc: 'Consulta directa al Segundo Cerebro RAG con GPC CENETEC',
      action: 'gemini: choque séptico',
      icon: BrainCircuit,
      color: 'text-[#60a5fa]',
    },
    {
      title: 'avalancha',
      desc: 'Abre el simulador matemático de deudas y abono extra',
      action: 'avalancha',
      icon: TrendingDown,
      color: 'text-[#ef7085]',
    },
    {
      title: 'telemetria',
      desc: 'Abre el check-in diario de sueño, energía y metilfenidato',
      action: 'telemetria',
      icon: Activity,
      color: 'text-[#36d7d0]',
    },
    {
      title: 'cuentas',
      desc: 'Monitorea liquidez total, Nu Cajitas y balances',
      action: 'cuentas',
      icon: Landmark,
      color: 'text-[#65d9a5]',
    },
  ];

  const filteredCommands = commandList.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl hud-panel border border-[#36d7d0]/60 shadow-[0_0_40px_rgba(54,215,208,0.25)] overflow-hidden">
        {/* Input Bar */}
        <div className="flex items-center px-4 py-3 bg-[#081628] border-b border-[#163a5d]">
          <Terminal className="w-4 h-4 text-[#36d7d0] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCommandExecution();
            }}
            placeholder="Escribe un comando táctico (ej. +gasto 120 comida, ruleta, guardia, gemini: caso)..."
            className="w-full bg-transparent text-sm text-white font-mono placeholder-[#526f8c] focus:outline-none"
          />
          <div className="flex items-center gap-1.5 ml-2 shrink-0">
            <kbd className="px-1.5 py-0.5 rounded bg-[#040f1c] border border-[#163a5d] text-[10px] font-mono text-[#8ba3c7]">
              ESC
            </kbd>
          </div>
        </div>

        {/* Feedback message if any */}
        {feedback && (
          <div className="px-4 py-2 bg-[#65d9a5]/10 border-b border-[#65d9a5]/30 text-[#65d9a5] font-mono text-xs flex items-center justify-between">
            <span>{feedback}</span>
            <CornerDownLeft className="w-3.5 h-3.5" />
          </div>
        )}

        {/* Results List */}
        <div className="max-h-72 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.title}
                  onClick={() => handleCommandExecution(cmd.action)}
                  className="w-full p-2.5 rounded hover:bg-[#081628] transition-colors flex items-center justify-between text-left group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-1.5 rounded bg-[#040f1c] border border-[#163a5d] group-hover:border-[#36d7d0] transition-colors">
                      <Icon className={`w-4 h-4 ${cmd.color}`} />
                    </div>
                    <div>
                      <div className="font-mono text-xs font-bold text-white group-hover:text-[#36d7d0] transition-colors">
                        {cmd.title}
                      </div>
                      <div className="text-[11px] text-[#8ba3c7]">{cmd.desc}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#526f8c] group-hover:text-[#36d7d0] opacity-0 group-hover:opacity-100 transition-all shrink-0" />
                </button>
              );
            })
          ) : (
            <div className="p-4 text-center text-xs font-mono text-[#8ba3c7]">
              Presiona <kbd className="text-white">ENTER</kbd> para ejecutar como búsqueda o comando personalizado.
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2 bg-[#040f1c] border-t border-[#163a5d] flex items-center justify-between text-[10px] font-mono text-[#526f8c]">
          <span>NÚCLEO OS // PARSER TÁCTICO</span>
          <span>ENTER para ejecutar</span>
        </div>
      </div>
    </div>
  );
};
