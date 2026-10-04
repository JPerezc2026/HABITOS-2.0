import React, { useState } from 'react';
import { NucleoStorage } from '../lib/storage';
import { Transaction } from '../types';
import { Receipt, Plus, Search, Filter, Trash2, ArrowUpRight, ArrowDownRight, Tag } from 'lucide-react';

export const ExpensesView: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(NucleoStorage.getTransactions());
  const accounts = NucleoStorage.getAccounts();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'gasto' | 'ingreso'>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Tx Form
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'gasto' | 'ingreso'>('gasto');
  const [category, setCategory] = useState('Alimentación Guardia');
  const [concept, setConcept] = useState('');
  const [accountId, setAccountId] = useState(accounts[0]?.id || '');

  const categories = [
    'Alimentación Guardia',
    'Transporte',
    'Material ENARM',
    'Farmacia / Salud',
    'Honorarios / Residencia',
    'Servicios Hospital',
    'Vivienda / Renta',
    'Suscripciones Médicas',
    'Otros Gastos',
  ];

  // Budget calculations
  const weeklyBudget = 4500;
  const currentWeekSpent = transactions
    .filter((t) => t.type === 'gasto')
    .reduce((sum, t) => sum + t.amount, 0);

  const budgetProgress = Math.min(100, Math.round((currentWeekSpent / weeklyBudget) * 100));

  const handleAddTx = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !concept) return;

    const newTx = NucleoStorage.addTransaction({
      amount: parseFloat(amount),
      type,
      category,
      concept,
      date: new Date().toISOString(),
      accountId,
    });

    setTransactions([newTx, ...transactions]);
    setShowAddModal(false);
    setAmount('');
    setConcept('');
  };

  const handleDeleteTx = (id: string) => {
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
    NucleoStorage.saveTransactions(updated);
  };

  const filtered = transactions.filter((t) => {
    const matchesSearch =
      t.concept.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#163a5d] gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <Receipt className="w-5 h-5 text-[#36d7d0]" />
            <h1 className="font-mono text-lg font-bold text-white tracking-wider">
              INGRESOS & GASTOS // LIBRO MAYOR TÁCTICO
            </h1>
          </div>
          <p className="text-xs text-[#8ba3c7] mt-0.5">
            Registro estricto de flujo de caja, categorización de gastos hospitalarios y presupuesto semanal.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-3.5 py-1.5 rounded bg-[#36d7d0] text-[#020711] hover:bg-[#5ef4ec] text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(54,215,208,0.3)] self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          REGISTRAR MOVIMIENTO
        </button>
      </div>

      {/* Budget Meter Card */}
      <div className="hud-panel p-4 space-y-2">
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="text-[#8ba3c7] font-semibold uppercase">PRESUPUESTO SEMANAL CONTROLADO</span>
          <span className="text-white font-bold">
            ${currentWeekSpent.toLocaleString('es-MX')} / ${weeklyBudget.toLocaleString('es-MX')} MXN ({budgetProgress}%)
          </span>
        </div>
        <div className="w-full bg-[#020711] h-2 rounded-full overflow-hidden border border-[#163a5d]">
          <div
            className={`h-full rounded-full transition-all ${
              budgetProgress > 90 ? 'bg-[#ef7085]' : budgetProgress > 70 ? 'bg-[#f1b84b]' : 'bg-[#65d9a5]'
            }`}
            style={{ width: `${budgetProgress}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] font-mono text-[#526f8c]">
          <span>LÍMITE VIABLE SEMANAL</span>
          <span className={budgetProgress > 90 ? 'text-[#ef7085]' : 'text-[#65d9a5]'}>
            {budgetProgress > 90 ? 'ALERTA: Presupuesto al límite' : 'DENTRO DE PARÁMETROS'}
          </span>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#526f8c] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por concepto o categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#081628] border border-[#163a5d] rounded pl-9 pr-3 py-1.5 text-xs text-white font-mono placeholder-[#526f8c] focus:border-[#36d7d0] focus:outline-none"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto font-mono text-xs">
          {(['all', 'gasto', 'ingreso'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilterType(mode)}
              className={`px-3 py-1.5 rounded border transition-all ${
                filterType === mode
                  ? 'bg-[#081628] text-[#36d7d0] border-[#36d7d0] font-bold'
                  : 'bg-[#040f1c] text-[#8ba3c7] border-[#163a5d] hover:border-[#8ba3c7]'
              }`}
            >
              {mode === 'all' ? 'TODOS' : mode === 'gasto' ? 'GASTOS' : 'INGRESOS'}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions Ledger Table */}
      <div className="hud-panel overflow-hidden border border-[#163a5d]">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[#081628] text-[#8ba3c7] border-b border-[#163a5d]">
              <tr>
                <th className="py-2.5 px-4 font-semibold">TIPO</th>
                <th className="py-2.5 px-4 font-semibold">CONCEPTO</th>
                <th className="py-2.5 px-4 font-semibold">CATEGORÍA</th>
                <th className="py-2.5 px-4 font-semibold">FECHA</th>
                <th className="py-2.5 px-4 font-semibold text-right">MONTO (MXN)</th>
                <th className="py-2.5 px-4 font-semibold text-center">ACCIÓN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#163a5d]/40">
              {filtered.map((tx, idx) => (
                <tr
                  key={tx.id}
                  className={`hover:bg-[#081628]/60 transition-colors ${
                    idx % 2 === 0 ? 'bg-[#05101d]' : 'bg-[#071526]'
                  }`}
                >
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        tx.type === 'ingreso'
                          ? 'bg-[#65d9a5]/10 text-[#65d9a5] border border-[#65d9a5]/30'
                          : 'bg-[#ef7085]/10 text-[#ef7085] border border-[#ef7085]/30'
                      }`}
                    >
                      {tx.type === 'ingreso' ? (
                        <>
                          <ArrowDownRight className="w-3 h-3" />
                          INGRESO
                        </>
                      ) : (
                        <>
                          <ArrowUpRight className="w-3 h-3" />
                          GASTO
                        </>
                      )}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-white">{tx.concept}</td>
                  <td className="py-3 px-4 text-[#8ba3c7]">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3 text-[#526f8c]" />
                      {tx.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#8ba3c7]">
                    {new Date(tx.date).toLocaleDateString('es-MX')}
                  </td>
                  <td className="py-3 px-4 text-right font-bold">
                    <span className={tx.type === 'ingreso' ? 'text-[#65d9a5]' : 'text-[#ef7085]'}>
                      {tx.type === 'ingreso' ? '+' : '-'}${tx.amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDeleteTx(tx.id)}
                      className="text-[#526f8c] hover:text-[#ef7085] p-1 transition-colors"
                      title="Eliminar movimiento"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Registrar Movimiento */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md hud-panel p-5 space-y-4 border border-[#36d7d0]/60 shadow-[0_0_30px_rgba(54,215,208,0.2)]">
            <div className="flex items-center justify-between border-b border-[#163a5d] pb-2 font-mono">
              <span className="font-bold text-sm text-white uppercase">REGISTRAR NUEVO MOVIMIENTO</span>
              <button onClick={() => setShowAddModal(false)} className="text-[#8ba3c7] hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddTx} className="space-y-3 font-mono text-xs">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setType('gasto')}
                  className={`py-2 rounded font-bold border transition-all ${
                    type === 'gasto'
                      ? 'bg-[#ef7085]/20 text-[#ef7085] border-[#ef7085]'
                      : 'bg-[#040f1c] text-[#8ba3c7] border-[#163a5d]'
                  }`}
                >
                  GASTO (-)
                </button>
                <button
                  type="button"
                  onClick={() => setType('ingreso')}
                  className={`py-2 rounded font-bold border transition-all ${
                    type === 'ingreso'
                      ? 'bg-[#65d9a5]/20 text-[#65d9a5] border-[#65d9a5]'
                      : 'bg-[#040f1c] text-[#8ba3c7] border-[#163a5d]'
                  }`}
                >
                  INGRESO (+)
                </button>
              </div>

              <div>
                <label className="text-[#8ba3c7] block mb-1">MONTO (MXN):</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="Ej. 185.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-[#040f1c] border border-[#163a5d] rounded p-2 text-white font-mono text-sm font-bold focus:border-[#36d7d0] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#8ba3c7] block mb-1">CONCEPTO / DESCRIPCIÓN:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Comida guardia + café o Libros ENARM"
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                  className="w-full bg-[#040f1c] border border-[#163a5d] rounded p-2 text-white focus:border-[#36d7d0] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#8ba3c7] block mb-1">CATEGORÍA:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#040f1c] border border-[#163a5d] rounded p-2 text-white focus:border-[#36d7d0] focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[#8ba3c7] block mb-1">CUENTA AFECTADA:</label>
                  <select
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                    className="w-full bg-[#040f1c] border border-[#163a5d] rounded p-2 text-white focus:border-[#36d7d0] focus:outline-none"
                  >
                    {accounts.map((a) => (
                      <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                  </select>
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
                  className="flex-1 py-2 rounded bg-[#36d7d0] text-[#020711] font-bold hover:bg-[#5ef4ec]"
                >
                  REGISTRAR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
