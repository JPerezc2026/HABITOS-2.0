import React, { useState } from 'react';
import { NucleoStorage } from '../lib/storage';
import { Account } from '../types';
import { Landmark, Plus, ArrowRightLeft, ShieldCheck, TrendingUp, Wallet, Check, AlertCircle } from 'lucide-react';

export const AccountsView: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>(NucleoStorage.getAccounts());
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);

  // New Account state
  const [newName, setNewName] = useState('');
  const [newInstitution, setNewInstitution] = useState('');
  const [newType, setNewType] = useState<Account['type']>('banco');
  const [newBalance, setNewBalance] = useState('');
  const [newApy, setNewApy] = useState('');

  // Transfer state
  const [fromAccount, setFromAccount] = useState(accounts[0]?.id || '');
  const [toAccount, setToAccount] = useState(accounts[1]?.id || '');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferSuccess, setTransferSuccess] = useState(false);

  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);
  const liquidCash = accounts.filter(a => a.type === 'banco' || a.type === 'efectivo').reduce((sum, a) => sum + a.balance, 0);
  const invested = accounts.filter(a => a.type === 'inversion').reduce((sum, a) => sum + a.balance, 0);
  const emergency = accounts.filter(a => a.type === 'emergencia').reduce((sum, a) => sum + a.balance, 0);

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newBalance) return;
    const newAcc: Account = {
      id: `acc_${Date.now()}`,
      name: newName,
      institution: newInstitution || 'Institución Financiera',
      type: newType,
      balance: parseFloat(newBalance) || 0,
      currency: 'MXN',
      apy: newApy ? parseFloat(newApy) : undefined,
      lastUpdated: new Date().toISOString(),
    };
    const updated = [...accounts, newAcc];
    setAccounts(updated);
    NucleoStorage.saveAccounts(updated);
    setShowAddModal(false);
    setNewName('');
    setNewBalance('');
    setNewApy('');
  };

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(transferAmount);
    if (!amount || amount <= 0 || fromAccount === toAccount) return;

    const updated = accounts.map(acc => {
      if (acc.id === fromAccount) {
        return { ...acc, balance: acc.balance - amount, lastUpdated: new Date().toISOString() };
      }
      if (acc.id === toAccount) {
        return { ...acc, balance: acc.balance + amount, lastUpdated: new Date().toISOString() };
      }
      return acc;
    });

    setAccounts(updated);
    NucleoStorage.saveAccounts(updated);
    setTransferSuccess(true);
    setTimeout(() => {
      setTransferSuccess(false);
      setShowTransferModal(false);
      setTransferAmount('');
    }, 1500);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#163a5d] gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <Landmark className="w-5 h-5 text-[#36d7d0]" />
            <h1 className="font-mono text-lg font-bold text-white tracking-wider">
              CUENTAS & LIQUIDEZ // ARQUITECTURA DE CAPITAL
            </h1>
          </div>
          <p className="text-xs text-[#8ba3c7] mt-0.5">
            Bóveda centralizada de activos líquidos, fondos de rendimiento diario e instrumentos de blindaje.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowTransferModal(true)}
            className="px-3 py-1.5 rounded bg-[#081628] hover:bg-[#0e2238] border border-[#163a5d] hover:border-[#36d7d0] text-xs font-mono font-semibold text-white transition-all flex items-center gap-1.5"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-[#36d7d0]" />
            TRANSFERIR
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3 py-1.5 rounded bg-[#36d7d0] text-[#020711] hover:bg-[#5ef4ec] text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(54,215,208,0.3)]"
          >
            <Plus className="w-3.5 h-3.5" />
            NUEVA CUENTA
          </button>
        </div>
      </div>

      {/* Summary Matrix Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono">
        <div className="hud-panel p-4 border-[#36d7d0]/40">
          <span className="text-[10px] text-[#8ba3c7] font-bold block uppercase">LIQUIDEZ TOTAL</span>
          <span className="text-2xl font-bold text-white block mt-1">
            ${totalBalance.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[10px] text-[#36d7d0] mt-1 block">100% DE ACTIVOS</span>
        </div>

        <div className="hud-panel p-4 border-[#65d9a5]/40">
          <span className="text-[10px] text-[#8ba3c7] font-bold block uppercase">EFECTIVO INMEDIATO</span>
          <span className="text-2xl font-bold text-[#65d9a5] block mt-1">
            ${liquidCash.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[10px] text-[#8ba3c7] mt-1 block">DISPONIBILIDAD INMEDIATA</span>
        </div>

        <div className="hud-panel p-4 border-[#f1b84b]/40">
          <span className="text-[10px] text-[#8ba3c7] font-bold block uppercase">RENDIMIENTO ACTIVO</span>
          <span className="text-2xl font-bold text-[#f1b84b] block mt-1">
            ${invested.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[10px] text-[#8ba3c7] mt-1 block">TASAS 11% - 13.5% APY</span>
        </div>

        <div className="hud-panel p-4 border-[#60a5fa]/40">
          <span className="text-[10px] text-[#8ba3c7] font-bold block uppercase">BLINDAJE EMERGENCIAS</span>
          <span className="text-2xl font-bold text-[#60a5fa] block mt-1">
            ${emergency.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[10px] text-[#60a5fa] mt-1 block">RESERVA PROTEGIDA</span>
        </div>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            className="hud-panel p-4 hover:border-[#36d7d0] transition-all relative overflow-hidden group space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-[10px] font-bold tracking-wider text-[#8ba3c7] uppercase">
                  {acc.institution}
                </span>
                <h3 className="font-semibold text-sm text-white group-hover:text-[#36d7d0] transition-colors">
                  {acc.name}
                </h3>
              </div>
              <span
                className={`font-mono text-[10px] px-2 py-0.5 rounded border uppercase font-bold ${
                  acc.type === 'inversion'
                    ? 'bg-[#f1b84b]/10 text-[#f1b84b] border-[#f1b84b]/40'
                    : acc.type === 'emergencia'
                    ? 'bg-[#60a5fa]/10 text-[#60a5fa] border-[#60a5fa]/40'
                    : 'bg-[#65d9a5]/10 text-[#65d9a5] border-[#65d9a5]/40'
                }`}
              >
                {acc.type}
              </span>
            </div>

            <div className="font-mono text-2xl font-bold text-white pt-1">
              ${acc.balance.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
              <span className="text-xs text-[#526f8c] font-normal ml-1">MXN</span>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-[#8ba3c7] border-t border-[#163a5d] pt-2">
              <span>{acc.apy ? `Rendimiento: ${acc.apy}% APY` : 'Saldo corriente'}</span>
              <span className="text-[10px] text-[#526f8c]">
                Sync: {new Date(acc.lastUpdated).toLocaleDateString('es-MX')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Agregar Cuenta */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md hud-panel p-5 space-y-4 border border-[#36d7d0]/60 shadow-[0_0_30px_rgba(54,215,208,0.2)]">
            <div className="flex items-center justify-between border-b border-[#163a5d] pb-2 font-mono">
              <span className="font-bold text-sm text-white uppercase">VINCULAR NUEVA CUENTA // BÓVEDA</span>
              <button onClick={() => setShowAddModal(false)} className="text-[#8ba3c7] hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddAccount} className="space-y-3 font-mono text-xs">
              <div>
                <label className="text-[#8ba3c7] block mb-1">NOMBRE DE LA CUENTA:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Nu Cajita Emergencia"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-[#040f1c] border border-[#163a5d] rounded p-2 text-white focus:border-[#36d7d0] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#8ba3c7] block mb-1">INSTITUCIÓN / BANCO:</label>
                <input
                  type="text"
                  placeholder="Ej. BBVA, Nu, Hey Banco, GBM, Cetes"
                  value={newInstitution}
                  onChange={(e) => setNewInstitution(e.target.value)}
                  className="w-full bg-[#040f1c] border border-[#163a5d] rounded p-2 text-white focus:border-[#36d7d0] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#8ba3c7] block mb-1">TIPO DE INSTRUMENTO:</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full bg-[#040f1c] border border-[#163a5d] rounded p-2 text-white focus:border-[#36d7d0] focus:outline-none"
                  >
                    <option value="banco">Banco / Nómina</option>
                    <option value="inversion">Inversión / Rendimiento</option>
                    <option value="efectivo">Efectivo Táctico</option>
                    <option value="emergencia">Blindaje Emergencias</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#8ba3c7] block mb-1">SALDO INICIAL (MXN):</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="10000"
                    value={newBalance}
                    onChange={(e) => setNewBalance(e.target.value)}
                    className="w-full bg-[#040f1c] border border-[#163a5d] rounded p-2 text-white focus:border-[#36d7d0] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#8ba3c7] block mb-1">RENDIMIENTO ANUAL (APY % OPCIONAL):</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="Ej. 13.5"
                  value={newApy}
                  onChange={(e) => setNewApy(e.target.value)}
                  className="w-full bg-[#040f1c] border border-[#163a5d] rounded p-2 text-white focus:border-[#36d7d0] focus:outline-none"
                />
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
                  GUARDAR CUENTA
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Transferir entre Cuentas */}
      {showTransferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md hud-panel p-5 space-y-4 border border-[#36d7d0]/60 shadow-[0_0_30px_rgba(54,215,208,0.2)]">
            <div className="flex items-center justify-between border-b border-[#163a5d] pb-2 font-mono">
              <span className="font-bold text-sm text-white uppercase">TRANSFERENCIA INTERNA // FONDOS</span>
              <button onClick={() => setShowTransferModal(false)} className="text-[#8ba3c7] hover:text-white">✕</button>
            </div>

            <form onSubmit={handleTransfer} className="space-y-3 font-mono text-xs">
              <div>
                <label className="text-[#8ba3c7] block mb-1">DESDE CUENTA (ORIGEN):</label>
                <select
                  value={fromAccount}
                  onChange={(e) => setFromAccount(e.target.value)}
                  className="w-full bg-[#040f1c] border border-[#163a5d] rounded p-2 text-white focus:border-[#36d7d0] focus:outline-none"
                >
                  {accounts.map(a => (
                    <option key={a.id} value={a.id}>
                      {a.name} (${a.balance.toLocaleString('es-MX')} MXN)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[#8ba3c7] block mb-1">HACIA CUENTA (DESTINO):</label>
                <select
                  value={toAccount}
                  onChange={(e) => setToAccount(e.target.value)}
                  className="w-full bg-[#040f1c] border border-[#163a5d] rounded p-2 text-white focus:border-[#36d7d0] focus:outline-none"
                >
                  {accounts.map(a => (
                    <option key={a.id} value={a.id}>
                      {a.name} (${a.balance.toLocaleString('es-MX')} MXN)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[#8ba3c7] block mb-1">MONTO A TRANSFERIR (MXN):</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="5000"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  className="w-full bg-[#040f1c] border border-[#163a5d] rounded p-2 text-white focus:border-[#36d7d0] focus:outline-none"
                />
              </div>

              {transferSuccess && (
                <div className="p-2 bg-[#65d9a5]/10 border border-[#65d9a5] text-[#65d9a5] rounded text-center">
                  Transferencia completada y saldos sincronizados.
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowTransferModal(false)}
                  className="flex-1 py-2 rounded bg-[#081628] text-[#8ba3c7] hover:text-white border border-[#163a5d]"
                >
                  CANCELAR
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded bg-[#36d7d0] text-[#020711] font-bold hover:bg-[#5ef4ec]"
                >
                  EJECUTAR TRANSFERENCIA
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
