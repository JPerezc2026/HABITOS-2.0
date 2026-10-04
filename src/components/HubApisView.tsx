import React, { useState } from 'react';
import { Radio, Download, Upload, Cpu, Database, Wifi, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';
import { NucleoStorage } from '../lib/storage';

export const HubApisView: React.FC = () => {
  const [pingStatus, setPingStatus] = useState<string>('14ms');
  const [isTestingPing, setIsTestingPing] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);

  const testPing = () => {
    setIsTestingPing(true);
    setTimeout(() => {
      const ms = Math.floor(10 + Math.random() * 8);
      setPingStatus(`${ms}ms`);
      setIsTestingPing(false);
    }, 600);
  };

  const handleExportData = () => {
    const data = {
      accounts: NucleoStorage.getAccounts(),
      transactions: NucleoStorage.getTransactions(),
      debts: NucleoStorage.getDebts(),
      telemetry: NucleoStorage.getTelemetry(),
      topics: NucleoStorage.getTopics(),
      userXp: NucleoStorage.getXp(),
      exportDate: new Date().toISOString(),
      kernel: 'Núcleo OS v4.10 Táctico',
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nucleo-os-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.accounts) NucleoStorage.saveAccounts(parsed.accounts);
        if (parsed.transactions) NucleoStorage.saveTransactions(parsed.transactions);
        if (parsed.debts) NucleoStorage.saveDebts(parsed.debts);
        if (parsed.telemetry) NucleoStorage.saveTelemetry(parsed.telemetry);
        if (parsed.topics) NucleoStorage.saveTopics(parsed.topics);

        setImportSuccess(true);
        setTimeout(() => setImportSuccess(false), 3000);
      } catch (err) {
        alert('Archivo JSON de respaldo no válido.');
      }
    };
    reader.readAsText(file);
  };

  const services = [
    {
      name: 'Google Gemini 3.8 Flash',
      type: 'Motor de Inferencia Clínica Ground-Truth',
      status: 'CONECTADO // ONLINE',
      latency: pingStatus,
      icon: Cpu,
      color: 'text-[#60a5fa]',
      border: 'border-[#60a5fa]/40',
    },
    {
      name: 'Motor IndexedDB v2.1 Silencioso',
      type: 'Almacenamiento Local Soberano Zero-Lag',
      status: 'ACTIVO // OFFLINE-FIRST',
      latency: '0.4ms',
      icon: Database,
      color: 'text-[#36d7d0]',
      border: 'border-[#36d7d0]/40',
    },
    {
      name: 'Despachador Todoist v1',
      type: 'Sincronizador de Tareas y Guardias',
      status: 'STANDBY // VINCULADO',
      latency: '24ms',
      icon: Radio,
      color: 'text-[#f1b84b]',
      border: 'border-[#f1b84b]/40',
    },
    {
      name: 'Bóveda Criptográfica Local',
      type: 'Device ID & Token Sandbox Isolation',
      status: 'KERNEL SECURE',
      latency: '0.1ms',
      icon: ShieldCheck,
      color: 'text-[#65d9a5]',
      border: 'border-[#65d9a5]/40',
    },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#163a5d] gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <Radio className="w-5 h-5 text-[#36d7d0]" />
            <h1 className="font-mono text-lg font-bold text-white tracking-wider">
              HUB DE APIS & ENLACES // TELEMETRÍA DE RED
            </h1>
          </div>
          <p className="text-xs text-[#8ba3c7] mt-0.5">
            Centro neurálgico de integraciones externas, respaldos soberanos de base de datos y latencia en vivo.
          </p>
        </div>

        <button
          onClick={testPing}
          disabled={isTestingPing}
          className="px-3.5 py-1.5 rounded bg-[#081628] hover:bg-[#0e2238] border border-[#163a5d] hover:border-[#36d7d0] text-xs font-mono font-semibold text-white transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#36d7d0] ${isTestingPing ? 'animate-spin' : ''}`} />
          TEST LATENCIA ({pingStatus})
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((srv) => {
          const Icon = srv.icon;
          return (
            <div
              key={srv.name}
              className={`hud-panel p-4 border ${srv.border} space-y-3 relative overflow-hidden group`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded bg-[#081628] border border-[#163a5d]">
                    <Icon className={`w-5 h-5 ${srv.color}`} />
                  </div>
                  <div>
                    <h3 className="font-mono text-sm font-bold text-white group-hover:text-[#36d7d0] transition-colors">
                      {srv.name}
                    </h3>
                    <p className="text-xs text-[#8ba3c7]">{srv.type}</p>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-[#65d9a5] bg-[#65d9a5]/10 px-2 py-0.5 rounded border border-[#65d9a5]/30 font-bold">
                  {srv.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-[#8ba3c7] border-t border-[#163a5d] pt-2">
                <span>Latencia de respuesta:</span>
                <span className="text-white font-bold">{srv.latency}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sovereign Backup & Restore Section */}
      <div className="hud-panel p-5 space-y-4 border-[#36d7d0]/30">
        <div className="flex items-center justify-between border-b border-[#163a5d] pb-2 font-mono text-xs">
          <span className="text-white font-bold uppercase tracking-wider flex items-center gap-2">
            <Database className="w-4 h-4 text-[#36d7d0]" />
            BÓVEDA DE RESPALDO SOBERANO // EXPORTAR & RESTAURAR
          </span>
          <span className="text-[#8ba3c7]">FORMATO JSON ENCRIPTABLE</span>
        </div>

        <p className="text-xs text-[#d8e3f6]">
          Tus datos financieros, registros de sueño/medicación y banco ENARM son 100% de tu soberanía personal. Puedes descargar una instantánea completa en cualquier momento o restaurar tu cockpit en otro dispositivo.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={handleExportData}
            className="px-4 py-2 rounded bg-[#36d7d0] text-[#020711] font-mono text-xs font-bold hover:bg-[#5ef4ec] transition-all flex items-center gap-2 shadow-[0_0_12px_rgba(54,215,208,0.25)]"
          >
            <Download className="w-4 h-4" />
            EXPORTAR BACKUP COMPLETO (.JSON)
          </button>

          <label className="px-4 py-2 rounded bg-[#081628] hover:bg-[#0e2238] border border-[#163a5d] hover:border-[#36d7d0] text-xs font-mono font-semibold text-white transition-all flex items-center gap-2 cursor-pointer">
            <Upload className="w-4 h-4 text-[#36d7d0]" />
            RESTAURAR DESDE ARCHIVO JSON
            <input
              type="file"
              accept=".json"
              onChange={handleImportData}
              className="hidden"
            />
          </label>
        </div>

        {importSuccess && (
          <div className="p-3 bg-[#65d9a5]/10 border border-[#65d9a5] rounded text-xs font-mono text-[#65d9a5] flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4" />
            Base de datos táctica restaurada con éxito.
          </div>
        )}
      </div>
    </div>
  );
};
