import React, { useState } from 'react';
import { NucleoStorage } from '../lib/storage';
import { Receipt, Activity, FileText, CheckCircle2 } from 'lucide-react';

interface QuickActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const QuickActionModal: React.FC<QuickActionModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [tab, setTab] = useState<'gasto' | 'bio'>('gasto');
  const accounts = NucleoStorage.getAccounts();

  // Gasto
  const [amount, setAmount] = useState('');
  const [concept, setConcept] = useState('');
  const [category, setCategory] = useState('Alimentación Guardia');
  const [accountId, setAccountId] = useState(accounts[0]?.id || 'acc_1');

  // Bio
  const [sleep, setSleep] = useState(7);
  const [energy, setEnergy] = useState(8);
  const [focus, setFocus] = useState(8);
  const [mg, setMg] = useState(20);

  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmitExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !concept) return;

    NucleoStorage.addTransaction({
      amount: parseFloat(amount),
      type: 'gasto',
      category,
      concept,
      date: new Date().toISOString(),
      accountId,
    });

    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onSuccess();
      onClose();
    }, 800);
  };

  const handleSubmitBio = (e: React.FormEvent) => {
    e.preventDefault();
    NucleoStorage.addOrUpdateTodayTelemetry({
      date: new Date().toISOString().split('T')[0],
      sleepHours: Number(sleep),
      energyLevel: Number(energy),
      focusLevel: Number(focus),
      methylphenidateMg: Number(mg),
      intakeTime: '07:30',
      isGuardDay: false,
      notes: 'Registro express desde HUD',
    });

    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onSuccess();
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md hud-panel p-5 space-y-4 border border-[#36d7d0]/60 shadow-[0_0_35px_rgba(54,215,208,0.25)]">
        <div className="flex items-center justify-between border-b border-[#163a5d] pb-2 font-mono">
          <span className="font-bold text-sm text-white uppercase tracking-wider">
            REGISTRO RÁPIDO // OPERACIÓN TÁCTICA
          </span>
          <button onClick={onClose} className="text-[#8ba3c7] hover:text-white">✕</button>
        </div>

        {/* Tab switch */}
        <div className="grid grid-cols-2 gap-2 font-mono text-xs">
          <button
            onClick={() => setTab('gasto')}
            className={`py-2 rounded font-bold border transition-all flex items-center justify-center gap-1.5 ${
              tab === 'gasto'
                ? 'bg-[#081628] text-[#36d7d0] border-[#36d7d0]'
                : 'bg-[#040f1c] text-[#8ba3c7] border-[#163a5d]'
            }`}
          >
            <Receipt className="w-3.5 h-3.5" />
            GASTO EXPRESS
          </button>
          <button
            onClick={() => setTab('bio')}
            className={`py-2 rounded font-bold border transition-all flex items-center justify-center gap-1.5 ${
              tab === 'bio'
                ? 'bg-[#081628] text-[#36d7d0] border-[#36d7d0]'
                : 'bg-[#040f1c] text-[#8ba3c7] border-[#163a5d]'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            BIO-CHECK FLASH
          </button>
        </div>

        {tab === 'gasto' ? (
          <form onSubmit={handleSubmitExpense} className="space-y-3 font-mono text-xs">
            <div>
              <label className="text-[#8ba3c7] block mb-1">MONTO (MXN):</label>
              <input
                type="number"
                step="0.01"
                required
                placeholder="150"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-[#040f1c] border border-[#163a5d] rounded p-2 text-white font-bold text-sm focus:border-[#36d7d0] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[#8ba3c7] block mb-1">CONCEPTO:</label>
              <input
                type="text"
                required
                placeholder="Ej. Café + refrigerio guardia"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                className="w-full bg-[#040f1c] border border-[#163a5d] rounded p-2 text-white focus:border-[#36d7d0] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[#8ba3c7] block mb-1">CATEGORÍA:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#040f1c] border border-[#163a5d] rounded p-2 text-white focus:border-[#36d7d0] focus:outline-none"
              >
                <option value="Alimentación Guardia">Alimentación Guardia</option>
                <option value="Transporte">Transporte / Uber</option>
                <option value="Farmacia / Salud">Farmacia / Salud</option>
                <option value="Material ENARM">Material ENARM</option>
                <option value="Otros Gastos">Otros Gastos</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded bg-[#36d7d0] text-[#020711] font-bold hover:bg-[#5ef4ec] transition-all shadow-[0_0_12px_rgba(54,215,208,0.3)] mt-2"
            >
              REGISTRAR GASTO
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmitBio} className="space-y-3 font-mono text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[#8ba3c7] block mb-1">SUEÑO: {sleep}h</label>
                <input
                  type="range"
                  min="2"
                  max="12"
                  step="0.5"
                  value={sleep}
                  onChange={(e) => setSleep(parseFloat(e.target.value))}
                  className="w-full accent-[#36d7d0]"
                />
              </div>

              <div>
                <label className="text-[#8ba3c7] block mb-1">ENERGÍA: {energy}/10</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={energy}
                  onChange={(e) => setEnergy(parseInt(e.target.value, 10))}
                  className="w-full accent-[#65d9a5]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[#8ba3c7] block mb-1">FOCO: {focus}/10</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={focus}
                  onChange={(e) => setFocus(parseInt(e.target.value, 10))}
                  className="w-full accent-[#f1b84b]"
                />
              </div>

              <div>
                <label className="text-[#8ba3c7] block mb-1">METILFENIDATO:</label>
                <select
                  value={mg}
                  onChange={(e) => setMg(parseInt(e.target.value, 10))}
                  className="w-full bg-[#040f1c] border border-[#163a5d] rounded p-2 text-white focus:border-[#36d7d0] focus:outline-none"
                >
                  <option value={0}>0 mg</option>
                  <option value={10}>10 mg</option>
                  <option value={20}>20 mg</option>
                  <option value={30}>30 mg</option>
                  <option value={40}>40 mg</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded bg-[#36d7d0] text-[#020711] font-bold hover:bg-[#5ef4ec] transition-all shadow-[0_0_12px_rgba(54,215,208,0.3)] mt-2"
            >
              SINCRONIZAR BIO-CHECK (+30 XP)
            </button>
          </form>
        )}

        {saved && (
          <div className="p-2 bg-[#65d9a5]/10 border border-[#65d9a5] text-[#65d9a5] text-center text-xs font-mono rounded flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Acción completada con éxito.
          </div>
        )}
      </div>
    </div>
  );
};
