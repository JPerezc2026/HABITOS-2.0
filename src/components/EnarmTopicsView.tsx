import React, { useState } from 'react';
import { NucleoStorage } from '../lib/storage';
import { ENARMTopic } from '../types';
import { BookOpen, CheckCircle, Clock, AlertTriangle, Search, Filter, Sparkles } from 'lucide-react';

export const EnarmTopicsView: React.FC = () => {
  const [topics, setTopics] = useState<ENARMTopic[]>(NucleoStorage.getTopics());
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'dominado' | 'repaso' | 'critico'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const specialties = [
    { id: 'all', name: 'Todas las Especialidades' },
    { id: 'med_int', name: 'Medicina Interna' },
    { id: 'cirugia', name: 'Cirugía General' },
    { id: 'pediatria', name: 'Pediatría' },
    { id: 'gineco', name: 'Ginecología y Obs' },
  ];

  const handleToggleStatus = (id: string) => {
    const updated = topics.map((t) => {
      if (t.id === id) {
        let nextStatus: ENARMTopic['status'] = 'dominado';
        if (t.status === 'dominado') nextStatus = 'repaso';
        else if (t.status === 'repaso') nextStatus = 'critico';
        else if (t.status === 'critico') nextStatus = 'dominado';
        return {
          ...t,
          status: nextStatus,
          lastReviewed: new Date().toISOString().split('T')[0],
        };
      }
      return t;
    });
    setTopics(updated);
    NucleoStorage.saveTopics(updated);
  };

  const filtered = topics.filter((t) => {
    const matchSpec = selectedSpecialty === 'all' || t.specialtyId === selectedSpecialty;
    const matchStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchSearch =
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.gpcRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.specialtyName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSpec && matchStatus && matchSearch;
  });

  const masteredCount = topics.filter((t) => t.status === 'dominado').length;
  const reviewCount = topics.filter((t) => t.status === 'repaso').length;
  const criticalCount = topics.filter((t) => t.status === 'critico').length;

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#163a5d] gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-[#36d7d0]" />
            <h1 className="font-mono text-lg font-bold text-white tracking-wider">
              MAPA DE TEMAS // REPETICIÓN ESPACIADA ENARM
            </h1>
          </div>
          <p className="text-xs text-[#8ba3c7] mt-0.5">
            Cartografía clínica de alta frecuencia CENETEC y algoritmo de curvas de olvido.
          </p>
        </div>

        {/* Progress Counters */}
        <div className="flex gap-2 font-mono text-xs">
          <div className="px-2.5 py-1 rounded bg-[#65d9a5]/10 border border-[#65d9a5]/30 text-[#65d9a5]">
            DOMINADOS: {masteredCount}
          </div>
          <div className="px-2.5 py-1 rounded bg-[#f1b84b]/10 border border-[#f1b84b]/30 text-[#f1b84b]">
            EN REPASO: {reviewCount}
          </div>
          <div className="px-2.5 py-1 rounded bg-[#ef7085]/10 border border-[#ef7085]/30 text-[#ef7085]">
            CRÍTICOS: {criticalCount}
          </div>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#526f8c] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar tema o GPC (ej. Cetoacidosis, IMSS-238)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#081628] border border-[#163a5d] rounded pl-9 pr-3 py-1.5 text-xs text-white font-mono placeholder-[#526f8c] focus:border-[#36d7d0] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2 font-mono text-xs w-full sm:w-auto">
          {/* Specialty Dropdown */}
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="bg-[#081628] border border-[#163a5d] rounded px-3 py-1.5 text-white focus:border-[#36d7d0] focus:outline-none"
          >
            {specialties.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          {/* Status buttons */}
          {(['all', 'dominado', 'repaso', 'critico'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 rounded border transition-all ${
                statusFilter === st
                  ? 'bg-[#081628] text-[#36d7d0] border-[#36d7d0] font-bold'
                  : 'bg-[#040f1c] text-[#8ba3c7] border-[#163a5d]'
              }`}
            >
              {st === 'all' ? 'TODOS' : st.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Topics Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((topic) => {
          let statusColor = 'border-[#65d9a5] text-[#65d9a5] bg-[#65d9a5]/10';
          let statusText = 'DOMINADO';
          let StatusIcon = CheckCircle;

          if (topic.status === 'repaso') {
            statusColor = 'border-[#f1b84b] text-[#f1b84b] bg-[#f1b84b]/10';
            statusText = 'REPASO AGENDADO';
            StatusIcon = Clock;
          } else if (topic.status === 'critico') {
            statusColor = 'border-[#ef7085] text-[#ef7085] bg-[#ef7085]/10';
            statusText = 'ALERTA / PRIORITARIO';
            StatusIcon = AlertTriangle;
          }

          return (
            <div
              key={topic.id}
              className="hud-panel p-4 hover:border-[#36d7d0] transition-all space-y-3 relative group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[10px] text-[#8ba3c7] uppercase block">
                    {topic.specialtyName}
                  </span>
                  <h3 className="font-semibold text-sm text-white group-hover:text-[#36d7d0] transition-colors mt-0.5">
                    {topic.title}
                  </h3>
                </div>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#040f1c] border border-[#163a5d] text-[#8ba3c7]">
                  {topic.gpcRef}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#526f8c] text-[11px]">
                  Revisado: {topic.lastReviewed}
                </span>
                <span className="text-[#36d7d0] text-[11px]">
                  Próximo: {topic.nextReview}
                </span>
              </div>

              {/* Status Action Switcher */}
              <div className="pt-2 border-t border-[#163a5d] flex items-center justify-between">
                <button
                  onClick={() => handleToggleStatus(topic.id)}
                  className={`px-2 py-1 rounded border text-[11px] font-mono font-bold flex items-center gap-1.5 transition-all ${statusColor}`}
                  title="Click para cambiar estado"
                >
                  <StatusIcon className="w-3 h-3" />
                  {statusText}
                </button>

                <span className="font-mono text-[10px] text-[#526f8c] group-hover:text-[#8ba3c7]">
                  Click para alternar
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
