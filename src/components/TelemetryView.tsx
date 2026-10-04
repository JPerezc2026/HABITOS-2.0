import React, { useState } from 'react';
import { NucleoStorage } from '../lib/storage';
import { TelemetryEntry } from '../types';
import { Activity, Moon, BatteryMedium, Target, Pill, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

interface TelemetryViewProps {
  isGuardMode: boolean;
  onXpGained: (amount: number) => void;
}

export const TelemetryView: React.FC<TelemetryViewProps> = ({ isGuardMode, onXpGained }) => {
  const telemetryHistory = NucleoStorage.getTelemetry();
  const todayEntry = telemetryHistory[0] || {
    id: 'tel_today',
    date: new Date().toISOString().split('T')[0],
    sleepHours: 7.0,
    energyLevel: 8,
    focusLevel: 8,
    methylphenidateMg: 20,
    intakeTime: '07:30',
    isGuardDay: isGuardMode,
    notes: '',
  };

  const [sleep, setSleep] = useState<number>(todayEntry.sleepHours);
  const [energy, setEnergy] = useState<number>(todayEntry.energyLevel);
  const [focus, setFocus] = useState<number>(todayEntry.focusLevel);
  const [mg, setMg] = useState<number>(todayEntry.methylphenidateMg);
  const [time, setTime] = useState<string>(todayEntry.intakeTime || '07:30');
  const [isGuard, setIsGuard] = useState<boolean>(todayEntry.isGuardDay || isGuardMode);
  const [notes, setNotes] = useState<string>(todayEntry.notes || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: Omit<TelemetryEntry, 'id'> = {
      date: new Date().toISOString().split('T')[0],
      sleepHours: Number(sleep),
      energyLevel: Number(energy),
      focusLevel: Number(focus),
      methylphenidateMg: Number(mg),
      intakeTime: time,
      isGuardDay: isGuard,
      notes,
    };

    NucleoStorage.addOrUpdateTodayTelemetry(entry);
    onXpGained(30);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#163a5d] gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-[#36d7d0]" />
            <h1 className="font-mono text-lg font-bold text-white tracking-wider">
              TELEMETRÍA BIO-MÉDICA // BIO-MATRIZ OPERATIVA
            </h1>
          </div>
          <p className="text-xs text-[#8ba3c7] mt-0.5">
            Monitoreo diario de fatiga, sueño, enfoque cognitivo y farmacología para optimización en guardias y estudio ENARM.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#081628] border border-[#163a5d] text-[#36d7d0]">
            ESTADO: {sleep < 6 ? 'DÉFICIT COGNITIVO' : 'ÓPTIMO'}
          </span>
        </div>
      </div>

      {/* Main 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Check-in Interactive Controls (7 cols) */}
        <div className="lg:col-span-7 hud-panel p-5 space-y-5">
          <div className="flex items-center justify-between border-b border-[#163a5d] pb-2">
            <span className="font-mono text-xs font-bold text-white tracking-wider uppercase">
              REGISTRO TÁCTICO // CHECK-IN DIARIO
            </span>
            <span className="font-mono text-[11px] text-[#36d7d0]">
              FECHA: {new Date().toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' })}
            </span>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            {/* Control 1: Horas de Sueño */}
            <div className="p-3 rounded bg-[#081628] border border-[#163a5d] space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-semibold text-white flex items-center gap-2">
                  <Moon className="w-4 h-4 text-[#36d7d0]" />
                  HORAS DE SUEÑO EFECTIVO
                </label>
                <span className="font-mono text-base font-bold text-[#36d7d0]">
                  {sleep.toFixed(1)} hrs
                </span>
              </div>
              <input
                type="range"
                min="2.0"
                max="12.0"
                step="0.5"
                value={sleep}
                onChange={(e) => setSleep(parseFloat(e.target.value))}
                className="w-full accent-[#36d7d0] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#526f8c]">
                <span>2h (Guardia crítica)</span>
                <span>7h - 8h (Objetivo reparador)</span>
                <span>12h (Recuperación)</span>
              </div>
            </div>

            {/* Control 2: Nivel de Energía */}
            <div className="p-3 rounded bg-[#081628] border border-[#163a5d] space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-semibold text-white flex items-center gap-2">
                  <BatteryMedium className="w-4 h-4 text-[#65d9a5]" />
                  NIVEL DE ENERGÍA FÍSICA (1-10)
                </label>
                <span className="font-mono text-base font-bold text-[#65d9a5]">{energy} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={energy}
                onChange={(e) => setEnergy(parseInt(e.target.value, 10))}
                className="w-full accent-[#65d9a5] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#526f8c]">
                <span>1 (Agotamiento extremo)</span>
                <span>5 (Neutro/Guardia)</span>
                <span>10 (Peak Performance)</span>
              </div>
            </div>

            {/* Control 3: Concentración Táctica */}
            <div className="p-3 rounded bg-[#081628] border border-[#163a5d] space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-semibold text-white flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#f1b84b]" />
                  CONCENTRACIÓN & FOCO COGNITIVO (1-10)
                </label>
                <span className="font-mono text-base font-bold text-[#f1b84b]">{focus} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={focus}
                onChange={(e) => setFocus(parseInt(e.target.value, 10))}
                className="w-full accent-[#f1b84b] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#526f8c]">
                <span>1 (Brain fog / disperso)</span>
                <span>5 (Operativo básico)</span>
                <span>10 (Estado de Flujo)</span>
              </div>
            </div>

            {/* Control 4: Farmacología / Metilfenidato */}
            <div className="p-3 rounded bg-[#081628] border border-[#163a5d] space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-semibold text-white flex items-center gap-2">
                  <Pill className="w-4 h-4 text-[#60a5fa]" />
                  DOSIS DE METILFENIDATO (MG)
                </label>
                <span className="font-mono text-xs font-bold text-[#60a5fa]">{mg} mg</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[0, 10, 20, 30, 40].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setMg(val)}
                    className={`py-1.5 rounded font-mono text-xs font-semibold border transition-all ${
                      mg === val
                        ? 'bg-[#60a5fa] text-[#020711] border-[#60a5fa] font-bold shadow-[0_0_8px_rgba(96,165,250,0.4)]'
                        : 'bg-[#040f1c] text-[#8ba3c7] border-[#163a5d] hover:border-[#60a5fa]'
                    }`}
                  >
                    {val === 0 ? '0 mg (Off)' : `${val} mg`}
                  </button>
                ))}
              </div>

              {mg > 0 && (
                <div className="flex items-center justify-between pt-1 text-xs font-mono">
                  <span className="text-[#8ba3c7]">HORA DE TOMA / ADMINISTRACIÓN:</span>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="bg-[#040f1c] border border-[#163a5d] rounded px-2 py-0.5 text-white font-mono text-xs focus:border-[#36d7d0] focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* Control 5: Guardia Check & Notas */}
            <div className="p-3 rounded bg-[#081628] border border-[#163a5d] space-y-2">
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isGuard}
                  onChange={(e) => setIsGuard(e.target.checked)}
                  className="rounded border-[#163a5d] bg-[#040f1c] text-[#f1b84b] focus:ring-0 accent-[#f1b84b] w-4 h-4"
                />
                <span className="text-xs font-mono font-semibold text-white">
                  Jornada de Guardia Hospitalaria / Post-guardia (Modo Supervivencia)
                </span>
              </label>

              <div>
                <label className="text-[11px] font-mono text-[#8ba3c7] block mb-1">
                  NOTAS CLÍNICAS / BITÁCORA DEL DÍA:
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ej. Noche activa en urgencias, 2 intubaciones, fatiga moderada pero buen enfoque en simulación..."
                  className="w-full bg-[#040f1c] border border-[#163a5d] rounded p-2 text-xs text-white font-mono placeholder-[#526f8c] focus:border-[#36d7d0] focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2.5 rounded bg-[#36d7d0] hover:bg-[#5ef4ec] text-[#020711] font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(54,215,208,0.3)] flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              CONFIRMAR REGISTRO TELEMETRÍA (+30 XP)
            </button>

            {savedSuccess && (
              <div className="p-2.5 rounded bg-[#65d9a5]/15 border border-[#65d9a5] text-[#65d9a5] text-xs font-mono flex items-center gap-2 justify-center animate-fade-in">
                <CheckCircle2 className="w-4 h-4" />
                Telemetría sincronizada con éxito en Bio-Matriz (+30 XP).
              </div>
            )}
          </form>
        </div>

        {/* Right Column: 7-Day History & Clinical Insights (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Insights Box */}
          <div className="hud-panel p-4 border border-[#36d7d0]/30 space-y-3">
            <div className="flex items-center space-x-2 border-b border-[#163a5d] pb-2">
              <Sparkles className="w-4 h-4 text-[#36d7d0]" />
              <span className="font-mono text-xs font-bold text-white tracking-wider uppercase">
                BIO-INSIGHTS // CORRELACIONES CLÍNICAS
              </span>
            </div>
            <div className="space-y-2.5 text-xs text-[#d8e3f6]">
              <div className="p-2.5 rounded bg-[#081628] border border-[#163a5d] space-y-1">
                <span className="text-[#36d7d0] font-mono font-bold block text-[11px]">
                  CORRELACIÓN SUEÑO - ENARM
                </span>
                <p className="text-[#8ba3c7]">
                  Tus simulacros promedian <strong className="text-white">84% de aciertos</strong> cuando registras &ge; 7 horas de descanso vs <strong className="text-[#ef7085]">58%</strong> en días post-guardia de &lt; 5 horas.
                </p>
              </div>

              <div className="p-2.5 rounded bg-[#081628] border border-[#163a5d] space-y-1">
                <span className="text-[#f1b84b] font-mono font-bold block text-[11px]">
                  VENTANA TERAPÉUTICA ÓPTIMA
                </span>
                <p className="text-[#8ba3c7]">
                  La mayor productividad en bancos de preguntas ocurre entre las <strong className="text-white">08:30 y 12:30 hrs</strong> (1 a 5 horas posteriores a la toma de 20 mg).
                </p>
              </div>
            </div>
          </div>

          {/* 7-Day History Table */}
          <div className="hud-panel p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#163a5d] pb-2">
              <span className="font-mono text-xs font-bold text-white tracking-wider uppercase">
                HISTORIAL ÚLTIMOS DÍAS
              </span>
              <span className="font-mono text-[10px] text-[#8ba3c7]">ÚLTIMAS ENTRADAS</span>
            </div>

            <div className="space-y-1.5 max-h-[340px] overflow-y-auto">
              {telemetryHistory.map((item) => (
                <div
                  key={item.id}
                  className="p-2.5 rounded bg-[#081628]/70 border border-[#163a5d]/50 text-xs font-mono space-y-1"
                >
                  <div className="flex justify-between items-center text-white">
                    <span className="font-bold flex items-center gap-1.5">
                      {item.isGuardDay && (
                        <span className="px-1.5 py-0.2 rounded bg-[#f1b84b]/20 text-[#f1b84b] text-[9px] border border-[#f1b84b]/30">
                          GUARDIA
                        </span>
                      )}
                      {new Date(item.date).toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </span>
                    <span className="text-[#36d7d0]">{item.sleepHours}h sueño</span>
                  </div>

                  <div className="flex justify-between text-[11px] text-[#8ba3c7]">
                    <span>Energía: <strong className="text-white">{item.energyLevel}/10</strong></span>
                    <span>Foco: <strong className="text-white">{item.focusLevel}/10</strong></span>
                    <span>MF: <strong className="text-[#60a5fa]">{item.methylphenidateMg}mg</strong></span>
                  </div>

                  {item.notes && (
                    <div className="text-[10px] text-[#526f8c] italic truncate pt-0.5">
                      "{item.notes}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
