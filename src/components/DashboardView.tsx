import React from 'react';
import { 
  FileText, 
  AlertTriangle, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  UploadCloud, 
  Receipt, 
  Zap, 
  Calculator, 
  Bot, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  ChevronRight,
  Info
} from 'lucide-react';
import { GastoRegistro, Inconsistencia, DocumentoUpload, PerfilUsuario } from '../types';
import { ViewTab } from './Navbar';

interface DashboardViewProps {
  perfil: PerfilUsuario;
  gastos: GastoRegistro[];
  inconsistencias: Inconsistencia[];
  documentos: DocumentoUpload[];
  onNavigate: (tab: ViewTab) => void;
  onOpenRegras: () => void;
  onOpenOnboarding: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  perfil,
  gastos,
  inconsistencias,
  documentos,
  onNavigate,
  onOpenRegras,
  onOpenOnboarding,
}) => {
  // Calculations
  const totalDeducoesPotenciais = gastos
    .filter(g => g.status === 'confirmado' && g.categoria !== 'Outros')
    .reduce((acc, curr) => acc + curr.valor, 0);

  const totalInconsistenciasPendentes = inconsistencias.filter(i => !i.resolvido).length;
  const progressoDeclaracao = 68; // 68% complete

  // Highlighting 5-6 sample potential deduction items
  const deducoesDestaque = gastos.slice(0, 6);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner: Welcome & Progress */}
      <div className="p-6 rounded-2xl bg-[#1E3A2B] border border-[#2A4A37] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#D4873F]">
              Exercício 2026 · Ano-Calendário 2025
            </span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#F7F2E9]">
            Olá, {perfil.nome.split(' ')[0]} 👋
          </h1>
          <p className="text-xs text-[#A9BEB0] max-w-xl">
            Sua pasta fiscal está sendo monitorada pelo Motor de Regras da Receita Federal. Identificamos oportunidades de abatimento e pendências que exigem sua atenção.
          </p>
        </div>

        {/* Progress gauge card */}
        <div className="p-4 rounded-xl bg-[#172E22] border border-[#2A4A37] min-w-[260px] flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[#A9BEB0] font-medium">Prontidão da Declaração</span>
            <span className="font-mono font-bold text-[#22C55E]">{progressoDeclaracao}%</span>
          </div>
          <div className="w-full bg-[#1E3A2B] h-2.5 rounded-full overflow-hidden border border-[#2A4A37]">
            <div 
              className="h-full bg-[#22C55E] rounded-full transition-all duration-500"
              style={{ width: `${progressoDeclaracao}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-[#A9BEB0]">
            <span>4 de 6 etapas prontas</span>
            <button 
              onClick={() => onNavigate('checklist')}
              className="text-[#D4873F] hover:underline font-medium"
            >
              Ver Checklist →
            </button>
          </div>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Documentos Recebidos */}
        <div 
          onClick={() => onNavigate('upload')}
          className="p-5 rounded-2xl bg-[#1E3A2B] border border-[#2A4A37] hover:border-[#D4873F]/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#A9BEB0]">Documentos Recebidos</span>
            <div className="w-8 h-8 rounded-lg bg-[#172E22] border border-[#2A4A37] flex items-center justify-center text-[#A9BEB0] group-hover:text-[#D4873F]">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-serif font-bold text-[#F7F2E9] font-mono-val">
              {documentos.length}
            </span>
            <span className="text-xs text-[#A9BEB0] ml-1.5">arquivos lidos</span>
          </div>
          <div className="mt-2 text-[11px] text-[#22C55E] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Extração e indexação OK</span>
          </div>
        </div>

        {/* Pendências / Inconsistências */}
        <div 
          onClick={() => onNavigate('inconsistencias')}
          className="p-5 rounded-2xl bg-[#1E3A2B] border border-[#2A4A37] hover:border-[#EF4444]/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#A9BEB0]">Pendências Detectadas</span>
            <div className="w-8 h-8 rounded-lg bg-[#EF4444]/15 border border-[#EF4444]/30 flex items-center justify-center text-[#EF4444]">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-serif font-bold text-[#EF4444] font-mono-val">
              {totalInconsistenciasPendentes}
            </span>
            <span className="text-xs text-[#A9BEB0] ml-1.5">alertas ativos</span>
          </div>
          <div className="mt-2 text-[11px] text-[#A9BEB0] flex items-center gap-1">
            <span className="text-[#D4873F] font-semibold">1 com risco de malha fina</span>
          </div>
        </div>

        {/* Possíveis Deduções Encontradas */}
        <div 
          onClick={() => onNavigate('gastos')}
          className="p-5 rounded-2xl bg-[#1E3A2B] border border-[#2A4A37] hover:border-[#D4873F]/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#A9BEB0]">Possíveis Deduções</span>
            <div className="w-8 h-8 rounded-lg bg-[#D4873F]/15 border border-[#D4873F]/30 flex items-center justify-center text-[#D4873F]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-serif font-bold text-[#D4873F] font-mono-val">
              R$ {totalDeducoesPotenciais.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-[#A9BEB0] truncate">
            Em saúde, educação e previdência
          </div>
        </div>

        {/* Raio-X & Restituição Potencial */}
        <div 
          onClick={() => onNavigate('raiox')}
          className="p-5 rounded-2xl bg-gradient-to-br from-[#1E3A2B] to-[#254534] border border-[#D4873F]/40 hover:border-[#D4873F] transition-all cursor-pointer group shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#D4873F] font-bold uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              Raio-X IRPF
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#22C55E]/20 text-[#22C55E] font-semibold">
              Completo
            </span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-serif font-bold text-[#22C55E] font-mono-val">
              R$ 4.820,00
            </span>
          </div>
          <div className="mt-2 text-[11px] text-[#A9BEB0] flex items-center justify-between">
            <span>Restituição estimada</span>
            <span className="text-[#D4873F] group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </div>

      {/* ACTION BANNER: NEXT BEST ACTION */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#172E22] border-l-4 border-l-[#EF4444] border-t border-r border-b border-[#2A4A37] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-[#EF4444]/15 text-[#EF4444] shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#F7F2E9]">
              Ação Urgente: Informe de rendimentos do dependente Enzo ausente
            </h4>
            <p className="text-xs text-[#A9BEB0] mt-0.5">
              Enzo teve remuneração de estágio identificada no ano. Não incluir esses dados pode reter sua declaração na malha fina.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('inconsistencias')}
          className="px-4 py-2 rounded-xl bg-[#EF4444] hover:bg-[#DC2626] text-white text-xs font-bold transition-colors shrink-0 cursor-pointer"
        >
          Resolver Inconsistência
        </button>
      </div>

      {/* TWO COLUMN SECTION: DEDUÇÕES ENCONTRADAS + QUICK SHORTCUTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Possíveis Deduções Encontradas (5-6 registros mockados com rastreabilidade) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-serif font-bold text-[#F7F2E9] flex items-center gap-2">
                <Receipt className="w-4 h-4 text-[#D4873F]" />
                Possíveis Deduções Encontradas
              </h2>
              <p className="text-xs text-[#A9BEB0]">
                Registros classificados com regras determinísticas e rastreabilidade ao documento original.
              </p>
            </div>
            <button
              onClick={() => onNavigate('gastos')}
              className="text-xs text-[#D4873F] hover:underline font-semibold flex items-center gap-1"
            >
              Ver todas ({gastos.length}) →
            </button>
          </div>

          <div className="space-y-2.5">
            {deducoesDestaque.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-[#1E3A2B] border border-[#2A4A37] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#2A4A37]/80 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#F7F2E9]">
                      {item.estabelecimento}
                    </span>
                    <span className="text-[10px] text-[#A9BEB0] font-mono">
                      · {item.data}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-sm bg-[#172E22] border border-[#2A4A37] text-[#D4873F]">
                      {item.categoria}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#A9BEB0] leading-snug">
                    {item.justificativa}
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-[#2A4A37]/50 shrink-0">
                  <span className="text-sm font-mono font-bold text-[#F7F2E9]">
                    R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-[10px] text-[#22C55E] flex items-center gap-1 mt-0.5">
                    ✓ Elegível
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-[#172E22] rounded-xl border border-[#2A4A37] flex items-start gap-2.5 text-xs text-[#A9BEB0]">
            <Info className="w-4 h-4 text-[#D4873F] shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong>Regra de Conformidade:</strong> O Declarô nunca afirma categoricamente que uma despesa é dedutível sem a conferência dos requisitos fiscais previstos na Lei nº 9.250/1995.
            </p>
          </div>
        </div>

        {/* Right Column (1 span): Quick actions & assistant teaser */}
        <div className="space-y-5">
          {/* Quick Actions */}
          <div className="p-5 rounded-2xl bg-[#1E3A2B] border border-[#2A4A37] space-y-3">
            <h3 className="text-sm font-serif font-bold text-[#F7F2E9]">
              Ferramentas de Organização
            </h3>

            <div className="space-y-2">
              <button
                onClick={() => onNavigate('upload')}
                className="w-full p-3 rounded-xl bg-[#172E22] hover:bg-[#254534] border border-[#2A4A37] text-left flex items-center justify-between text-xs text-[#F7F2E9] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <UploadCloud className="w-4 h-4 text-[#D4873F]" />
                  <span>Subir novo informe ou recibo</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#A9BEB0]" />
              </button>

              <button
                onClick={() => onNavigate('simulador')}
                className="w-full p-3 rounded-xl bg-[#172E22] hover:bg-[#254534] border border-[#2A4A37] text-left flex items-center justify-between text-xs text-[#F7F2E9] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Calculator className="w-4 h-4 text-[#22C55E]" />
                  <span>Simular Completa vs Simplificada</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#A9BEB0]" />
              </button>

              <button
                onClick={() => onNavigate('raiox')}
                className="w-full p-3 rounded-xl bg-[#172E22] hover:bg-[#254534] border border-[#2A4A37] text-left flex items-center justify-between text-xs text-[#F7F2E9] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-[#D4873F]" />
                  <span>Acessar Raio-X da Declaração</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#A9BEB0]" />
              </button>

              <button
                onClick={onOpenOnboarding}
                className="w-full p-3 rounded-xl bg-[#172E22] hover:bg-[#254534] border border-[#2A4A37] text-left flex items-center justify-between text-xs text-[#F7F2E9] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#A9BEB0]" />
                  <span>Revisar Perfil e Dependentes</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#A9BEB0]" />
              </button>
            </div>
          </div>

          {/* Declarô Assistant Promo */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-[#1E3A2B] to-[#172E22] border border-[#2A4A37] space-y-3 relative overflow-hidden">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#D4873F]/20 border border-[#D4873F]/40 flex items-center justify-center text-[#D4873F]">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-bold text-[#F7F2E9]">
                  Assistente Declarô
                </h4>
                <p className="text-[10px] text-[#A9BEB0]">Tira-dúvidas fiscal 24h</p>
              </div>
            </div>

            <p className="text-xs text-[#A9BEB0] leading-relaxed">
              Dúvidas sobre o que deduzir de saúde, pós-graduação ou limite de previdência PGBL?
            </p>

            <button
              onClick={() => onNavigate('assistente')}
              className="w-full py-2.5 rounded-xl bg-[#D4873F] hover:bg-[#E5964E] text-[#172E22] text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Fazer Pergunta Fiscal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
