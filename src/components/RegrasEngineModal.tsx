import React from 'react';
import { X, ShieldCheck, Cpu, Scale, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { REGRAS_FISCAIS_VIGENTES } from '../data/mockData';

interface RegrasEngineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegrasEngineModal: React.FC<RegrasEngineModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#1E3A2B] border border-[#2A4A37] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2A4A37] bg-[#172E22]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4873F]/20 border border-[#D4873F]/40 flex items-center justify-center text-[#D4873F]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-[#F7F2E9]">
                Motor de Regras & Arquitetura Declarô
              </h2>
              <p className="text-xs text-[#A9BEB0]">
                Princípio de separação estrita: IA Interpretativa vs Motor Tributário Determinístico
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#A9BEB0] hover:text-[#F7F2E9] rounded-lg hover:bg-[#254534] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#F7F2E9]/90">
          {/* Two-layer explanation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#172E22] border border-[#2A4A37]">
              <div className="flex items-center gap-2 text-[#D4873F] font-semibold mb-2">
                <Cpu className="w-4 h-4" />
                <span>1. IA & Visão Computacional</span>
              </div>
              <p className="text-xs text-[#A9BEB0] leading-relaxed">
                Interpreta o texto de recibos, notas fiscais e informes de rendimento. Extrai CNPJs, datas, especialidades e valores sem emitir juízo definitivo de dedutibilidade.
              </p>
              <div className="mt-3 text-[11px] text-[#A9BEB0] bg-[#1E3A2B] p-2 rounded-lg border border-[#2A4A37]">
                <span className="text-[#D4873F] font-medium">Papel:</span> Leitura, transcrição e mapeamento de evidências.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#172E22] border border-[#2A4A37]">
              <div className="flex items-center gap-2 text-[#22C55E] font-semibold mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>2. Motor de Regras Fiscal</span>
              </div>
              <p className="text-xs text-[#A9BEB0] leading-relaxed">
                Base de conhecimento determinística codificada com as normas vigentes da Receita Federal. Aplica tetos, prazos e condições legais sem margem para alucinações.
              </p>
              <div className="mt-3 text-[11px] text-[#A9BEB0] bg-[#1E3A2B] p-2 rounded-lg border border-[#2A4A37]">
                <span className="text-[#22C55E] font-medium">Papel:</span> Validação matemática e conformidade legal.
              </div>
            </div>
          </div>

          {/* Strict Content Guidelines */}
          <div className="p-4 rounded-xl bg-[#D4873F]/10 border border-[#D4873F]/30 space-y-2">
            <div className="flex items-center gap-2 text-[#D4873F] font-semibold text-xs uppercase tracking-wider">
              <AlertCircle className="w-4 h-4" />
              <span>Diretriz de Conteúdo Anti-Alucinação</span>
            </div>
            <p className="text-xs text-[#F7F2E9]/90 leading-relaxed">
              Em nenhum momento o Declarô afirma categoricamente que uma despesa <em>&quot;é dedutível&quot;</em>. Toda classificação adota a fórmula preventiva: 
              <strong className="text-[#D4873F]"> &quot;Pode ser elegível, confira os requisitos&quot;</strong>, sempre vinculada ao nome exato do documento original comprobatório.
            </p>
          </div>

          {/* Current Tax Rules in Force */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm text-[#F7F2E9] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#A9BEB0]" />
                Parâmetros Fiscais Vigentes ({REGRAS_FISCAIS_VIGENTES.anoExercicio})
              </h3>
              <span className="text-[11px] text-[#A9BEB0]">
                Ano-calendário {REGRAS_FISCAIS_VIGENTES.anoCalendario}
              </span>
            </div>

            <div className="divide-y divide-[#2A4A37] border border-[#2A4A37] rounded-xl overflow-hidden bg-[#172E22]">
              <div className="p-3 flex justify-between items-center text-xs">
                <span className="text-[#A9BEB0]">Dedução anual por dependente:</span>
                <span className="font-mono text-[#F7F2E9] font-medium">
                  R$ {REGRAS_FISCAIS_VIGENTES.deducaoFixaDependente.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="p-3 flex justify-between items-center text-xs">
                <span className="text-[#A9BEB0]">Teto individual anual de instrução/educação:</span>
                <span className="font-mono text-[#F7F2E9] font-medium">
                  R$ {REGRAS_FISCAIS_VIGENTES.limiteEducacaoIndividual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="p-3 flex justify-between items-center text-xs">
                <span className="text-[#A9BEB0]">Teto do Desconto Simplificado (20%):</span>
                <span className="font-mono text-[#F7F2E9] font-medium">
                  R$ {REGRAS_FISCAIS_VIGENTES.limiteDescontoSimplificado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="p-3 flex justify-between items-center text-xs">
                <span className="text-[#A9BEB0]">Limite de dedução em Previdência PGBL:</span>
                <span className="font-mono text-[#F7F2E9] font-medium">
                  12% da renda bruta tributável
                </span>
              </div>
              <div className="p-3 flex justify-between items-center text-xs">
                <span className="text-[#A9BEB0]">Despesas com saúde (médicos, hospitais, exames):</span>
                <span className="text-[#22C55E] font-medium">
                  Sem limite legal (exige comprovante hábil idôneo)
                </span>
              </div>
            </div>

            <p className="text-[11px] text-[#A9BEB0] italic">
              Fonte regulatória: {REGRAS_FISCAIS_VIGENTES.baseLegal}.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#2A4A37] bg-[#172E22] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#D4873F] text-[#172E22] font-semibold text-xs hover:bg-[#E5964E] transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
