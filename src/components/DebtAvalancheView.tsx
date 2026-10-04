import React, { useState } from 'react';
import { NucleoStorage } from '../lib/storage';
import { Debt } from '../types';
import { TrendingDown, Flame, DollarSign, Plus, CheckCircle, Calculator, AlertTriangle, ShieldCheck } from 'lucide-react';

export const DebtAvalancheView: React.FC = () => {
  const [debts, setDebts] = useState<Debt[]>(NucleoStorage.getDebts());
  const [extraPayment, setExtraPayment] = useState<number>(2500);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Debt Form
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [minPayment, setMinPayment] = useState('');
  const [dueDate, setDueDate] = useState('2026-10-25');
  const [creditLimit, setCreditLimit] = useState('');

  const avalancheData = NucleoStorage.calculateDebtAvalanche(extraPayment);

  const totalDebtBalance = debts.reduce((sum, d) => sum + d.balance, 0);
  const totalMinPayment = debts.reduce((sum, d) => sum + d.minPayment, 0);

  const handleAddDebt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !balance) return;

    const newDebt: Debt = {
      id: `debt_${Date.now()}`,
      name,
      balance: parseFloat(balance),
      interestRate: parseFloat(interestRate) || 35.0,
      minPayment: parseFloat(minPayment) || 500,
      dueDate,
      creditLimit: parseFloat(creditLimit) || parseFloat(balance) * 1.5,
    };

    const updated = [...debts, newDebt];
    setDebts(updated);
    NucleoStorage.saveDebts(updated);
    setShowAddModal(false);
    setName('');
    setBalance('');
    setInterestRate('');
    setMinPayment('');
  };

  const handleDeleteDebt = (id: string) => {
    const updated = debts.filter((d) => d.id !== id);
    setDebts(updated);
    NucleoStorage.saveDebts(updated);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#163a5d] gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <TrendingDown className="w-5 h-5 text-[#ef7085]" />
            <h1 className="font-mono text-lg font-bold text-white tracking-wider">
              MOTOR FINANCIERO // ESTRATEGIA AVALANCHA DE DEUDAS
            </h1>
          </div>
          <p className="text-xs text-[#8ba3c7] mt-0.5">
            Optimización matemática por CAT descendente para liquidar pasivos minimizando el interés total pagado.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-3.5 py-1.5 rounded bg-[#ef7085] text-[#020711] hover:bg-[#ff8f9f] text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(239,112,133,0.3)] self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          AÑADIR PASIVO
        </button>
      </div>

      {/* Avalanche Simulator Command Box */}
      <div className="hud-panel p-5 border border-[#ef7085]/40 space-y-4">
        <div className="flex items-center justify-between border-b border-[#163a5d] pb-2 font-mono text-xs">
          <span className="text-white font-bold flex items-center gap-2">
            <Calculator className="w-4 h-4 text-[#ef7085]" />
            SIMULADOR MATEMÁTICO: ABONO MENSUAL EXTRAORDINARIO
          </span>
          <span className="text-[#65d9a5] font-bold">
            +${extraPayment.toLocaleString('es-MX')} MXN / MES
          </span>
        </div>

        {/* Extra Payment Slider */}
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="12000"
            step="500"
            value={extraPayment}
            onChange={(e) => setExtraPayment(parseInt(e.target.value, 10))}
            className="w-full accent-[#ef7085] cursor-pointer"
          />
          <div className="flex justify-between text-[11px] font-mono text-[#526f8c]">
            <span>$0 (Solo pagos mínimos)</span>
            <span>$5,000 (Acelerado)</span>
            <span>$12,000 (Hiper-Avalancha)</span>
          </div>
        </div>

        {/* Results Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-3 rounded bg-[#081628] border border-[#163a5d] font-mono">
            <span className="text-[10px] text-[#8ba3c7] block">TIEMPO PARA LIBERTAD FINANCIERA</span>
            <span className="text-2xl font-bold text-white block mt-0.5">
              {avalancheData.avalancheMonths} MESES
            </span>
            <span className="text-[10px] text-[#65d9a5] block mt-1">
              Ahorras {avalancheData.monthsSaved} meses vs ritmo base
            </span>
          </div>

          <div className="p-3 rounded bg-[#081628] border border-[#163a5d] font-mono">
            <span className="text-[10px] text-[#8ba3c7] block">INTERESES AHORRADOS ESTIMADOS</span>
            <span className="text-2xl font-bold text-[#65d9a5] block mt-0.5">
              ${avalancheData.interestSaved.toLocaleString('es-MX')} MXN
            </span>
            <span className="text-[10px] text-[#65d9a5] block mt-1">
              Capital rescatado de bancos
            </span>
          </div>

          <div className="p-3 rounded bg-[#081628] border border-[#163a5d] font-mono">
            <span className="text-[10px] text-[#8ba3c7] block">VS MÉTODO BOLA DE NIEVE</span>
            <span className="text-2xl font-bold text-[#f1b84b] block mt-0.5">
              {avalancheData.avalancheInterest < avalancheData.snowballInterest ? 'AVALANCHA GANA' : 'PARIDAD'}
            </span>
            <span className="text-[10px] text-[#8ba3c7] block mt-1">
              Avalancha ahorra más dinero en tasas altas
            </span>
          </div>
        </div>
      </div>

      {/* Target Priority Ladder (Avalanche Ranking) */}
      <div className="hud-panel p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-[#163a5d] pb-2 font-mono text-xs">
          <span className="text-white font-bold flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#ef7085]" />
            ORDEN DE ELIMINACIÓN TÁCTICA // PRIORIDAD POR CAT
          </span>
          <span className="text-[#8ba3c7]">OBJETIVO 1 RECIBE TODO EL ABONO EXTRA</span>
        </div>

        <div className="space-y-3">
          {avalancheData.orderedDebts.map((debt, index) => {
            const isTopTarget = index === 0;
            return (
              <div
                key={debt.id}
                className={`p-4 rounded border transition-all ${
                  isTopTarget
                    ? 'bg-[#081628] border-[#ef7085] shadow-[0_0_15px_rgba(239,112,133,0.2)]'
                    : 'bg-[#05101d] border-[#163a5d]/70'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-3">
                    <span
                      className={`w-6 h-6 rounded flex items-center justify-center font-mono text-xs font-bold ${
                        isTopTarget ? 'bg-[#ef7085] text-[#020711]' : 'bg-[#163a5d] text-[#8ba3c7]'
                      }`}
                    >
                      #{index + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-white">{debt.name}</span>
                        {isTopTarget && (
                          <span className="px-2 py-0.5 rounded bg-[#ef7085]/20 text-[#ef7085] text-[10px] font-mono font-bold border border-[#ef7085]/40 animate-pulse">
                            FUEGO CONCENTRADO // PRIMER OBJETIVO
                          </span>
                        )}
                      </div>
                      <div className="font-mono text-xs text-[#8ba3c7] mt-0.5">
                        Vence: {debt.dueDate} • Pago mínimo: ${debt.minPayment.toLocaleString('es-MX')} MXN
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 font-mono self-end sm:self-auto">
                    <div className="text-right">
                      <span className="text-[10px] text-[#8ba3c7] block">COSTO CAT ANUAL</span>
                      <span className="text-sm font-bold text-[#ef7085]">{debt.interestRate}%</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-[#8ba3c7] block">SALDO PENDIENTE</span>
                      <span className="text-base font-bold text-white">
                        ${debt.balance.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    <button
                      onClick={() => handleDeleteDebt(debt.id)}
                      className="text-[#526f8c] hover:text-[#ef7085] text-xs font-mono ml-2"
                      title="Eliminar pasivo"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {isTopTarget && (
                  <div className="mt-3 pt-2.5 border-t border-[#163a5d] text-xs font-mono text-[#8ba3c7] flex justify-between items-center">
                    <span>
                      Pago total mensual asignado: <strong className="text-white">${(debt.minPayment + extraPayment).toLocaleString('es-MX')} MXN</strong>
                    </span>
                    <span className="text-[#65d9a5] font-semibold">
                      Al liquidar este pasivo, su flujo se transfiere íntegro al objetivo #{index + 2}.
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal: Registrar Deuda */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md hud-panel p-5 space-y-4 border border-[#ef7085]/60 shadow-[0_0_30px_rgba(239,112,133,0.2)]">
            <div className="flex items-center justify-between border-b border-[#163a5d] pb-2 font-mono">
              <span className="font-bold text-sm text-white uppercase">AÑADIR INSTRUMENTO DE DEUDA</span>
              <button onClick={() => setShowAddModal(false)} className="text-[#8ba3c7] hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddDebt} className="space-y-3 font-mono text-xs">
              <div>
                <label className="text-[#8ba3c7] block mb-1">NOMBRE DEL INSTRUMENTO / TARJETA:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Tarjeta Banorte Platinum"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#040f1c] border border-[#163a5d] rounded p-2 text-white focus:border-[#ef7085] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#8ba3c7] block mb-1">SALDO ACTUAL (MXN):</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="25000"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    className="w-full bg-[#040f1c] border border-[#163a5d] rounded p-2 text-white focus:border-[#ef7085] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#8ba3c7] block mb-1">TASA CAT ANUAL (%):</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    placeholder="68.4"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full bg-[#040f1c] border border-[#163a5d] rounded p-2 text-white focus:border-[#ef7085] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#8ba3c7] block mb-1">PAGO MÍNIMO (MXN):</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="1200"
                    value={minPayment}
                    onChange={(e) => setMinPayment(e.target.value)}
                    className="w-full bg-[#040f1c] border border-[#163a5d] rounded p-2 text-white focus:border-[#ef7085] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#8ba3c7] block mb-1">DÍA LÍMITE DE PAGO:</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-[#040f1c] border border-[#163a5d] rounded p-2 text-white focus:border-[#ef7085] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 rounded bg-[#081628] text-[#8ba3c7] hover:text-white border border-[#163a5d]"
                >
                  CANCELAR
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded bg-[#ef7085] text-[#020711] font-bold hover:bg-[#ff8f9f]"
                >
                  INTEGRAR AVALANCHA
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
