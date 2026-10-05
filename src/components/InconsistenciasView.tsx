import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  HelpCircle, 
  ShieldAlert, 
  ArrowRight, 
  RotateCcw,
  ExternalLink,
  Info
} from 'lucide-react';
import { Inconsistencia } from '../types';

interface InconsistenciasViewProps {
  inconsistencias: Inconsistencia[];
  onToggleResolver: (id: string) => void;
  onOpenRegras: () => void;
}

export const InconsistenciasView: React.FC<InconsistenciasViewProps> = ({
  inconsistencias,
  onToggleResolver,
  onOpenRegras
}) => {
  const [filtro, setFiltro] = useState<'todas' | 'pendentes' | 'resolvidas'>('todas');
  const [itemDetalhado, setItemDetalhado] = useState<Inconsistencia | null>(null);

  const listaFiltrada = inconsistencias.filter((item) => {
    if (filtro === 'pendentes') return !item.resolvido;
    if (filtro === 'resolvidas') return item.resolvido;
    return true;
  });

  const totalPendentes = inconsistencias.filter(i => !i.resolvido).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title & Advisory Tone Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#D4873F]">
            Prevenção de Malha Fina
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#F7F2E9]">
            Painel de Inconsistências
          </h1>
          <p className="text-xs text-[#A9BEB0] mt-1">
            Encontramos possíveis divergências ou requisitos pendentes. Confira cada item antes de transmitir sua declaração oficial.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-[#1E3A2B] border border-[#2A4A37] text-xs font-mono text-[#A9BEB0]">
            Pendentes: <strong className="text-[#EF4444]">{totalPendentes}</strong>
          </div>
        </div>
      </div>

      {/* Advisory Tone Box */}
      <div className="p-4 rounded-xl bg-[#1E3A2B] border border-[#2A4A37] flex items-start gap-3">
        <Info className="w-5 h-5 text-[#D4873F] shrink-0 mt-0.5" />
        <div className="text-xs text-[#A9BEB0] space-y-1">
          <p className="text-[#F7F2E9] font-medium">
            Tom orientativo e neutro do Declarô:
          </p>
          <p>
            &quot;Encontramos uma possível inconsistência, confira antes de continuar.&quot; O objetivo deste painel é alertar preventivamente sobre cruzamentos de dados que a Receita Federal realiza automaticamente via DIRF, DMED e e-Financeira.
          </p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFiltro('todas')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            filtro === 'todas'
              ? 'bg-[#D4873F] text-[#172E22] font-bold'
              : 'bg-[#1E3A2B] text-[#A9BEB0] hover:text-[#F7F2E9] border border-[#2A4A37]'
          }`}
        >
          Todas ({inconsistencias.length})
        </button>
        <button
          onClick={() => setFiltro('pendentes')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            filtro === 'pendentes'
              ? 'bg-[#D4873F] text-[#172E22] font-bold'
              : 'bg-[#1E3A2B] text-[#A9BEB0] hover:text-[#F7F2E9] border border-[#2A4A37]'
          }`}
        >
          Pendentes ({totalPendentes})
        </button>
        <button
          onClick={() => setFiltro('resolvidas')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            filtro === 'resolvidas'
              ? 'bg-[#D4873F] text-[#172E22] font-bold'
              : 'bg-[#1E3A2B] text-[#A9BEB0] hover:text-[#F7F2E9] border border-[#2A4A37]'
          }`}
        >
          Resolvidas ({inconsistencias.length - totalPendentes})
        </button>
      </div>

      {/* INCONSISTENCY CARDS */}
      <div className="space-y-4">
        {listaFiltrada.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-2xl border transition-all ${
              item.resolvido
                ? 'bg-[#1E3A2B]/40 border-[#2A4A37] opacity-80'
                : item.severidade === 'alta'
                ? 'bg-[#1E3A2B] border-[#EF4444]/60 shadow-xs'
                : 'bg-[#1E3A2B] border-[#2A4A37]'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {item.resolvido ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#22C55E]/20 text-[#22C55E] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Resolvido
                    </span>
                  ) : item.severidade === 'alta' ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#EF4444]/20 text-[#EF4444] font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Prioridade Alta
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#EAB308]/20 text-[#EAB308] font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Atenção
                    </span>
                  )}

                  <span className="text-xs font-mono text-[#A9BEB0]">
                    Categoria: {item.categoria}
                  </span>
                </div>

                <h3 className="text-base font-serif font-bold text-[#F7F2E9]">
                  {item.titulo}
                </h3>

                <p className="text-xs text-[#A9BEB0] leading-relaxed">
                  {item.descricao}
                </p>

                {/* Impact callout */}
                <div className="p-3 rounded-xl bg-[#172E22] border border-[#2A4A37] text-xs">
                  <span className="text-[#D4873F] font-semibold block mb-0.5">
                    Impacto Estimado na Declaração:
                  </span>
                  <span className="text-[#F7F2E9]/90">
                    {item.impactoEstimado}
                  </span>
                </div>

                {/* Involved documents */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-[#A9BEB0]">
                  <span>Documentos vinculados:</span>
                  {item.documentosEnvolvidos.map((doc, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-[#172E22] border border-[#2A4A37] font-mono text-[#F7F2E9]"
                    >
                      📄 {doc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action column */}
              <div className="flex flex-col sm:flex-row md:flex-col items-stretch md:items-end gap-2 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-[#2A4A37]">
                <button
                  onClick={() => onToggleResolver(item.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    item.resolvido
                      ? 'bg-[#172E22] text-[#A9BEB0] hover:text-[#F7F2E9] border border-[#2A4A37]'
                      : 'bg-[#D4873F] hover:bg-[#E5964E] text-[#172E22] shadow-sm'
                  }`}
                >
                  {item.resolvido ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reabrir Pendência</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Marcar como Resolvido</span>
                    </>
                  )}
                </button>

                <div className="text-[11px] text-[#A9BEB0] text-center md:text-right max-w-[180px] italic">
                  {item.sugestaoAcao}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
