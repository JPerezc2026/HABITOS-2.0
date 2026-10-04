import React from 'react';
import { ViewType } from '../types';
import { NucleoStorage } from '../lib/storage';
import {
  Wallet,
  TrendingDown,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  ShieldAlert,
  Flame,
  Dices,
  Receipt,
  BrainCircuit,
  Zap,
} from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (view: ViewType) => void;
  isGuardMode: boolean;
  onOpenQuickAction: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  isGuardMode,
  onOpenQuickAction,
}) => {
  const financials = NucleoStorage.calculateFinancials();
  const transactions = NucleoStorage.getTransactions().slice(0, 5);
  const telemetry = NucleoStorage.getTelemetry()[0];
  const debts = NucleoStorage.getDebts();

  // Primary avalanche target (debt with highest CAT)
  const topDebt = [...debts].sort((a, b) => b.interestRate - a.interestRate)[0];

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Guard Mode Banner if Enabled */}
      {isGuardMode && (
        <div className="p-3.5 rounded bg-[#f1b84b]/10 border border-[#f1b84b]/40 flex items-center justify-between shadow-[0_0_20px_rgba(241,184,75,0.15)]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded bg-[#f1b84b]/20 text-[#f1b84b]">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="font-mono text-xs font-bold text-[#f1b84b] uppercase tracking-wider">
                PROTOCOLO DE GUARDIA ACTIVADO // MODO SUPERVIVENCIA
              </div>
              <div className="text-xs text-[#d8e3f6]/80 mt-0.5">
                Metas diarias reconfiguradas a mínimos viables. Carga ENARM reducida de 25 a 5 preguntas. Presupuesto táctico protegido.
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigate('telemetria')}
            className="hidden sm:inline-flex px-3 py-1.5 rounded bg-[#f1b84b] text-[#020711] font-mono text-xs font-bold hover:bg-[#ffdea9] transition-all"
          >
            BIO-CHECK GUARDIA
          </button>
        </div>
      )}

      {/* Hero Financial Telemetry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Dinero Libre (Luminous Cyan) */}
        <div className="hud-panel p-4 relative overflow-hidden group hover:border-[#36d7d0] transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#36d7d0]/5 rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[11px] font-bold tracking-wider text-[#8ba3c7] uppercase">
              DINERO LIBRE // LIQUIDEZ DISPONIBLE
            </span>
            <span className="w-2 h-2 rounded-full bg-[#36d7d0] shadow-[0_0_8px_#36d7d0]" />
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1.5 flex items-baseline">
            <span className="text-sm text-[#36d7d0] mr-1">$</span>
            {financials.freeMoney.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
            <span className="text-xs text-[#526f8c] font-normal ml-1.5">MXN</span>
          </div>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#65d9a5] flex items-center gap-1 font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5" />
              DESPUÉS DE COMPROMISOS
            </span>
            <button
              onClick={() => onNavigate('finanzas-cuentas')}
              className="text-[#36d7d0] hover:underline"
            >
              Ver cuentas &rarr;
            </button>
          </div>
        </div>

        {/* Metric 2: Liquidez Total (Precision Emerald) */}
        <div className="hud-panel p-4 relative overflow-hidden group hover:border-[#65d9a5] transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#65d9a5]/5 rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[11px] font-bold tracking-wider text-[#8ba3c7] uppercase">
              LIQUIDEZ TOTAL // BALANCES
            </span>
            <span className="w-2 h-2 rounded-full bg-[#65d9a5] shadow-[0_0_8px_#65d9a5]" />
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1.5 flex items-baseline">
            <span className="text-sm text-[#65d9a5] mr-1">$</span>
            {financials.totalLiquidity.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
            <span className="text-xs text-[#526f8c] font-normal ml-1.5">MXN</span>
          </div>
          <div className="flex items-center justify-between text-xs font-mono text-[#8ba3c7]">
            <span>5 CUENTAS REGISTRADAS</span>
            <span className="text-[#65d9a5] font-semibold">13.5% RENDIMIENTO</span>
          </div>
        </div>

        {/* Metric 3: Deuda Total & Objetivo Avalancha (Soft Ruby Red) */}
        <div className="hud-panel p-4 relative overflow-hidden group hover:border-[#ef7085] transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#ef7085]/5 rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[11px] font-bold tracking-wider text-[#8ba3c7] uppercase">
              PASIVOS // APALANCAMIENTO
            </span>
            <span className="w-2 h-2 rounded-full bg-[#ef7085] shadow-[0_0_8px_#ef7085]" />
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1.5 flex items-baseline">
            <span className="text-sm text-[#ef7085] mr-1">$</span>
            {financials.totalDebt.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
            <span className="text-xs text-[#526f8c] font-normal ml-1.5">MXN</span>
          </div>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#ef7085] truncate font-semibold">
              OBJETIVO 1: {topDebt ? topDebt.name.split(' ')[0] : 'NINGUNO'} ({topDebt ? `${topDebt.interestRate}% CAT` : ''})
            </span>
            <button
              onClick={() => onNavigate('finanzas-avalancha')}
              className="text-[#ef7085] hover:underline shrink-0 ml-1"
            >
              Avalancha &rarr;
            </button>
          </div>
        </div>

        {/* Metric 4: Burn Rate & Runway (Warm Gold) */}
        <div className="hud-panel p-4 relative overflow-hidden group hover:border-[#f1b84b] transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#f1b84b]/5 rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[11px] font-bold tracking-wider text-[#8ba3c7] uppercase">
              BURN RATE & HORIZONTE RUNWAY
            </span>
            <span className="w-2 h-2 rounded-full bg-[#f1b84b] shadow-[0_0_8px_#f1b84b]" />
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1.5 flex items-baseline">
            {financials.runwayDays}
            <span className="text-sm font-normal text-[#f1b84b] ml-1.5">DÍAS RUNWAY</span>
          </div>
          <div className="w-full bg-[#020711] h-1.5 rounded-full overflow-hidden border border-[#163a5d] mb-1.5">
            <div
              className="bg-[#f1b84b] h-full rounded-full transition-all"
              style={{ width: `${Math.min(100, (financials.runwayDays / 365) * 100)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono text-[#8ba3c7]">
            <span>BURN: ${financials.monthlyBurn.toLocaleString('es-MX')}/mes</span>
            <span className="text-[#f1b84b] font-semibold">&gt; 6 MESES OK</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Cockpit Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Cash Velocity & Quick Telemetry */}
        <div className="lg:col-span-2 space-y-6">
          {/* Cash Velocity Visual Horizon Module */}
          <div className="hud-panel p-4">
            <div className="flex items-center justify-between mb-4 border-b border-[#163a5d] pb-2">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#36d7d0]" />
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  VELOCIDAD DE CAPITAL // FLUJO SEMANAL DE EFECTIVO
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#8ba3c7]">
                OCTUBRE 2026 // ÚLTIMOS 7 DÍAS
              </span>
            </div>

            {/* Tactical Sparkline & Horizon Bars */}
            <div className="grid grid-cols-7 gap-2 h-36 items-end pt-4 pb-2 px-1">
              {[
                { day: 'LUN', flow: 1400, outflow: 850, net: '+550' },
                { day: 'MAR', flow: 400, outflow: 1200, net: '-800' },
                { day: 'MIÉ', flow: 800, outflow: 350, net: '+450' },
                { day: 'JUE', flow: 2200, outflow: 185, net: '+2015' },
                { day: 'VIE', flow: 16500, outflow: 4200, net: '+12300' },
                { day: 'SÁB', flow: 600, outflow: 980, net: '-380' },
                { day: 'DOM', flow: 0, outflow: 320, net: '-320' },
              ].map((bar, i) => (
                <div key={bar.day} className="flex flex-col items-center h-full justify-end group">
                  <div className="w-full max-w-[28px] bg-[#081628] rounded-t flex flex-col justify-end overflow-hidden border border-[#163a5d] group-hover:border-[#36d7d0] transition-colors h-28 relative">
                    <div
                      className={`w-full transition-all ${
                        bar.net.startsWith('+') ? 'bg-gradient-to-t from-[#65d9a5]/80 to-[#36d7d0]' : 'bg-[#ef7085]/70'
                      }`}
                      style={{
                        height: `${Math.max(15, Math.min(100, Math.abs(parseInt(bar.net)) / 150))}%`,
                      }}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-[#8ba3c7] mt-1.5">{bar.day}</span>
                  <span
                    className={`font-mono text-[9px] ${
                      bar.net.startsWith('+') ? 'text-[#65d9a5]' : 'text-[#ef7085]'
                    }`}
                  >
                    {bar.net}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-[#8ba3c7] border-t border-[#163a5d] pt-2 mt-2">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#65d9a5]" /> Superávit Táctico
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#ef7085]" /> Déficit Operativo
                </span>
              </div>
              <button
                onClick={() => onNavigate('finanzas-gastos')}
                className="text-[#36d7d0] hover:underline"
              >
                Auditar libro mayor &rarr;
              </button>
            </div>
          </div>

          {/* Recent Ledger Striped Transactions */}
          <div className="hud-panel p-4">
            <div className="flex items-center justify-between mb-3 border-b border-[#163a5d] pb-2">
              <div className="flex items-center space-x-2">
                <Receipt className="w-4 h-4 text-[#36d7d0]" />
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  REGISTRO RECIENTE // LIBRO MAYOR TÁCTICO
                </span>
              </div>
              <button
                onClick={onOpenQuickAction}
                className="text-xs font-mono text-[#36d7d0] hover:underline font-semibold"
              >
                + Registrar Gasto
              </button>
            </div>

            <div className="space-y-1.5">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-2.5 rounded bg-[#081628]/60 hover:bg-[#081628] border border-[#163a5d]/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-1.5 rounded ${
                        tx.type === 'ingreso' ? 'bg-[#65d9a5]/10 text-[#65d9a5]' : 'bg-[#ef7085]/10 text-[#ef7085]'
                      }`}
                    >
                      {tx.type === 'ingreso' ? (
                        <ArrowDownRight className="w-4 h-4" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-white">{tx.concept}</div>
                      <div className="font-mono text-[10px] text-[#8ba3c7] flex items-center gap-2">
                        <span>{tx.category}</span>
                        <span>•</span>
                        <span>{new Date(tx.date).toLocaleDateString('es-MX')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-sm text-right">
                    <span className={tx.type === 'ingreso' ? 'text-[#65d9a5]' : 'text-[#ef7085]'}>
                      {tx.type === 'ingreso' ? '+' : '-'}${tx.amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Bio-Matriz State & ENARM Console Card */}
        <div className="space-y-6">
          {/* Bio-Matriz Today's Telemetry Card */}
          <div className="hud-panel p-4">
            <div className="flex items-center justify-between mb-3 border-b border-[#163a5d] pb-2">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-[#36d7d0]" />
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  TELEMETRÍA BIO-MÉDICA // HOY
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#65d9a5] bg-[#65d9a5]/10 px-1.5 py-0.5 rounded border border-[#65d9a5]/30">
                CHECK-IN VIVO
              </span>
            </div>

            {telemetry ? (
              <div className="space-y-3 font-mono">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded bg-[#081628] border border-[#163a5d]">
                    <span className="text-[#8ba3c7] block text-[10px]">SUEÑO REGISTRADO</span>
                    <span className="text-base font-bold text-white">
                      {telemetry.sleepHours}h
                    </span>
                    <span className="text-[10px] text-[#65d9a5] block">
                      {telemetry.sleepHours >= 7 ? 'ÓPTIMO' : 'DÉFICIT'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-[#081628] border border-[#163a5d]">
                    <span className="text-[#8ba3c7] block text-[10px]">METILFENIDATO</span>
                    <span className="text-base font-bold text-[#f1b84b]">
                      {telemetry.methylphenidateMg} mg
                    </span>
                    <span className="text-[10px] text-[#8ba3c7] block">
                      {telemetry.intakeTime || '07:30'} h
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-[#081628] border border-[#163a5d] space-y-2">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#8ba3c7]">NIVEL DE ENERGÍA</span>
                      <span className="text-[#36d7d0] font-bold">{telemetry.energyLevel}/10</span>
                    </div>
                    <div className="w-full bg-[#020711] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#36d7d0] h-full rounded-full"
                        style={{ width: `${telemetry.energyLevel * 10}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#8ba3c7]">CONCENTRACIÓN TÁCTICA</span>
                      <span className="text-[#65d9a5] font-bold">{telemetry.focusLevel}/10</span>
                    </div>
                    <div className="w-full bg-[#020711] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#65d9a5] h-full rounded-full"
                        style={{ width: `${telemetry.focusLevel * 10}%` }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('telemetria')}
                  className="w-full py-2 rounded bg-[#081628] hover:bg-[#0e2238] border border-[#163a5d] text-[#36d7d0] text-xs font-bold transition-all text-center"
                >
                  MODIFICAR TELEMETRÍA &rarr;
                </button>
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-[#8ba3c7]">
                No hay check-in de telemetría hoy.
                <button
                  onClick={() => onNavigate('telemetria')}
                  className="block mx-auto mt-2 px-3 py-1 rounded bg-[#36d7d0] text-[#020711] font-bold"
                >
                  Registrar ahora
                </button>
              </div>
            )}
          </div>

          {/* Tactical ENARM Roulette Quick Launch Card */}
          <div className="hud-panel p-4 bg-gradient-to-b from-[#05101d] to-[#081628] border border-[#f1b84b]/30">
            <div className="flex items-center justify-between mb-3 border-b border-[#163a5d] pb-2">
              <div className="flex items-center space-x-2">
                <Dices className="w-4 h-4 text-[#f1b84b]" />
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  CONSOLA ENARM // RULETA TÁCTICA
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#f1b84b] bg-[#f1b84b]/10 px-1.5 py-0.5 rounded border border-[#f1b84b]/40 font-bold">
                ENARM 2026
              </span>
            </div>

            <p className="text-xs text-[#d8e3f6] mb-3">
              Selección ponderada por peso oficial de especialidades médicas (Medicina Interna 32%, Pediatría 24%, Cirugía 22%, Gineco 22%).
            </p>

            <div className="p-3 rounded bg-[#040f1c] border border-[#163a5d] mb-3 text-xs font-mono">
              <div className="flex items-center justify-between text-[#8ba3c7] mb-1">
                <span>CASO SUGERIDO:</span>
                <span className="text-[#36d7d0] font-bold">IMSS-238-09</span>
              </div>
              <div className="text-white font-medium line-clamp-2">
                Cetoacidosis diabética: reposición hidroelectrolítica de potasio antes de infusión insulínica.
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onNavigate('enarm-ruleta')}
                className="flex-1 py-2 px-3 rounded bg-[#f1b84b] text-[#020711] font-mono text-xs font-bold hover:bg-[#ffdea9] transition-all flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(241,184,75,0.25)]"
              >
                <Dices className="w-3.5 h-3.5" />
                GIRAR RULETA
              </button>
              <button
                onClick={() => onNavigate('ia-gemini')}
                className="py-2 px-3 rounded bg-[#081628] text-[#60a5fa] hover:text-white border border-[#163a5d] hover:border-[#60a5fa] font-mono text-xs font-semibold transition-all flex items-center justify-center gap-1"
                title="Consultar Copiloto RAG con GPC"
              >
                <BrainCircuit className="w-3.5 h-3.5" />
                RAG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
