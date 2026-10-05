import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Filter, 
  FileText, 
  ArrowRight,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { ItemChecklist, StatusChecklist } from '../types';

interface ChecklistViewProps {
  itens: ItemChecklist[];
  onToggleStatus: (id: string) => void;
  onNavigateToUpload: () => void;
}

export const ChecklistView: React.FC<ChecklistViewProps> = ({
  itens,
  onToggleStatus,
  onNavigateToUpload
}) => {
  const [filtro, setFiltro] = useState<'todos' | 'concluido' | 'pendente' | 'faltando'>('todos');

  const itensFiltrados = itens.filter(item => {
    if (filtro === 'todos') return true;
    return item.status === filtro;
  });

  const totalConcluidos = itens.filter(i => i.status === 'concluido').length;
  const totalPendentes = itens.filter(i => i.status === 'pendente').length;
  const totalFaltando = itens.filter(i => i.status === 'faltando').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#D4873F]">
            Controle de Documentação Obrigatória
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#F7F2E9]">
            Checklist Dinâmico do IRPF
          </h1>
          <p className="text-xs text-[#A9BEB0] mt-1">
            Acompanhe cada comprovante e informe necessário para não deixar nada de fora.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateToUpload}
            className="px-4 py-2 rounded-xl bg-[#D4873F] hover:bg-[#E5964E] text-[#172E22] font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Anexar Novo Documento</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* FILTER TABS & SUMMARY COUNTERS */}
      <div className="flex flex-wrap items-center gap-2 pb-1">
        <button
          onClick={() => setFiltro('todos')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
            filtro === 'todos'
              ? 'bg-[#D4873F] text-[#172E22] font-bold'
              : 'bg-[#1E3A2B] text-[#A9BEB0] hover:text-[#F7F2E9] border border-[#2A4A37]'
          }`}
        >
          Todos ({itens.length})
        </button>

        <button
          onClick={() => setFiltro('concluido')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
            filtro === 'concluido'
              ? 'bg-[#22C55E] text-[#172E22] font-bold'
              : 'bg-[#1E3A2B] text-[#A9BEB0] hover:text-[#F7F2E9] border border-[#2A4A37]'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
          <span>Concluídos ({totalConcluidos})</span>
        </button>

        <button
          onClick={() => setFiltro('pendente')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
            filtro === 'pendente'
              ? 'bg-[#EAB308] text-[#172E22] font-bold'
              : 'bg-[#1E3A2B] text-[#A9BEB0] hover:text-[#F7F2E9] border border-[#2A4A37]'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-[#EAB308]" />
          <span>Pendentes ({totalPendentes})</span>
        </button>

        <button
          onClick={() => setFiltro('faltando')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
            filtro === 'faltando'
              ? 'bg-[#EF4444] text-white font-bold'
              : 'bg-[#1E3A2B] text-[#A9BEB0] hover:text-[#F7F2E9] border border-[#2A4A37]'
          }`}
        >
          <XCircle className="w-3.5 h-3.5 text-[#EF4444]" />
          <span>Faltando ({totalFaltando})</span>
        </button>
      </div>

      {/* CHECKLIST ITEMS LIST */}
      <div className="border border-[#2A4A37] rounded-2xl overflow-hidden bg-[#1E3A2B] divide-y divide-[#2A4A37]">
        {itensFiltrados.map((item) => (
          <div
            key={item.id}
            className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#254534]/40 transition-colors"
          >
            <div className="flex items-start gap-3.5 flex-1">
              {/* Status Icon */}
              <div className="mt-0.5 shrink-0">
                {item.status === 'concluido' && (
                  <div className="w-7 h-7 rounded-lg bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
                {item.status === 'pendente' && (
                  <div className="w-7 h-7 rounded-lg bg-[#EAB308]/20 text-[#EAB308] flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                )}
                {item.status === 'faltando' && (
                  <div className="w-7 h-7 rounded-lg bg-[#EF4444]/20 text-[#EF4444] flex items-center justify-center">
                    <XCircle className="w-4 h-4" />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xs sm:text-sm font-semibold text-[#F7F2E9]">
                    {item.titulo}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-sm bg-[#172E22] border border-[#2A4A37] text-[#A9BEB0]">
                    {item.categoria}
                  </span>
                </div>

                <p className="text-xs text-[#A9BEB0]">
                  {item.descricao}
                </p>

                {item.documentoVinculado && (
                  <div className="text-[11px] font-mono text-[#D4873F] flex items-center gap-1 pt-1">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Vinculado: {item.documentoVinculado}</span>
                  </div>
                )}

                <div className="text-[11px] text-[#A9BEB0] pt-0.5">
                  <strong className="text-[#F7F2E9]/90">Ação recomendada:</strong> {item.acaoRecomendada}
                </div>
              </div>
            </div>

            {/* Quick Action Button to Toggle Status */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#2A4A37]">
              <button
                onClick={() => onToggleStatus(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  item.status === 'concluido'
                    ? 'bg-[#172E22] hover:bg-[#254534] text-[#A9BEB0] border border-[#2A4A37]'
                    : 'bg-[#D4873F] hover:bg-[#E5964E] text-[#172E22]'
                }`}
              >
                {item.status === 'concluido' ? 'Alterar para Pendente' : 'Marcar como Concluído'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
