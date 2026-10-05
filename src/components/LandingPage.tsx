import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  FileCheck2, 
  TrendingUp, 
  AlertTriangle, 
  Scale, 
  Zap, 
  Check, 
  Sparkles, 
  CheckCircle,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  Calculator,
  Lock,
  UploadCloud,
  Receipt,
  Users,
  Search,
  CheckCircle2,
  DollarSign,
  FileSpreadsheet,
  Award,
  ArrowUpRight
} from 'lucide-react';
import { Logo } from './Logo';
import { ViewTab } from './Navbar';

interface LandingPageProps {
  onGoToApp: (tab?: ViewTab) => void;
  onOpenAuth: () => void;
  onOpenRegras: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGoToApp, onOpenAuth, onOpenRegras }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [interactiveHeroTab, setInteractiveHeroTab] = useState<'resumo' | 'documentos' | 'inconsistencias'>('resumo');
  const [simRenda, setSimRenda] = useState(140000);
  const [simSaude, setSimSaude] = useState(12000);
  const [simEducacao, setSimEducacao] = useState(8500);

  // Quick live math for the landing mini-simulator
  const tetoEdu = 3561.50 * 2;
  const eduEfetiva = Math.min(simEducacao, tetoEdu);
  const deducoesLegais = simSaude + eduEfetiva + 4550.16; // 2 deps
  const descSimplificado = Math.min(simRenda * 0.20, 16754.34);
  const vantagemCompleta = Math.max(0, deducoesLegais - descSimplificado) * 0.275;

  const faqs = [
    {
      p: 'O Declarô substitui o programa oficial da Receita Federal?',
      r: 'Não. O Declarô é um assistente inteligente de organização, auditoria e conferência prévia. Ele reúne seus informes de bancos, recibos médicos e despesas, aplicando as regras fiscais oficiais para que você saiba exatamente o que preencher no Programa Gerador da Declaração (PGD) da Receita sem erros ou esquecimentos.'
    },
    {
      p: 'Como o Declarô evita que eu caia na malha fina?',
      r: 'Nosso Motor de Regras cruza seus comprovantes com as mesmas regras que a Receita Federal utiliza nos cruzamentos eletrônicos (DIRF, DMED e e-Financeira). Alertamos sobre recibos duplicados, limites excedidos em educação, despesas médicas sem CPF/CRM válido e rendimentos de dependentes não informados.'
    },
    {
      p: 'Por que o Declarô não "afirma" que uma despesa é dedutível?',
      r: 'Por rigor ético e conformidade legal. Nenhuma IA séria deve garantir dedutibilidade absoluta sem a avaliação dos comprovantes fiscais hábeis. O Declarô classifica como "pode ser elegível, confira os requisitos" e sempre vincula o documento de origem e a lei aplicável (Lei nº 9.250/1995).'
    },
    {
      p: 'Posso usar o Declarô gratuitamente?',
      r: 'Sim! Nosso plano Grátis permite enviar até 5 documentos, acessar o checklist de conferência e testar o simulador completo. Você só faz o upgrade para o Premium se desejar documentos ilimitados, o Raio-X completo e a detecção avançada de inconsistências.'
    },
    {
      p: 'Meus dados bancários e de saúde estão seguros?',
      r: 'Com certeza. Os dados e comprovantes são armazenados em ambiente isolado com criptografia em trânsito e em repouso. Nós não comercializamos dados nem compartilhamos seus arquivos com terceiros.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#172E22] text-[#F7F2E9]">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-28 border-b border-[#2A4A37]">
        {/* Ambient atmospheric glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#D97D36]/10 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Top Announcement Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E3A2B] border border-[#2A4A37] text-xs text-[#A9BEB0] mb-6 shadow-sm hover:border-[#D97D36]/50 transition-colors">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="text-[#F7F2E9] font-medium">IRPF 2026</span>
            <span className="text-[#A9BEB0]">·</span>
            <span>Motor Tributário da Receita Federal Atualizado</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#D97D36]" />
          </div>

          {/* Hero Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-extrabold text-[#F7F2E9] tracking-tight max-w-4xl mx-auto leading-[1.12]">
            Organize seu Imposto de Renda sem complicação, <span className="text-[#D97D36]">sem planilhas</span> e sem medo da malha fina.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#A9BEB0] max-w-2xl mx-auto leading-relaxed font-normal">
            Envie seus informes bancários, recibos médicos e notas fiscais. O Declarô cruza seus dados com as regras do Fisco, aponta inconsistências e calcula sua maior restituição.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onGoToApp('dashboard')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#D97D36] hover:bg-[#E5964E] text-[#172E22] font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Acessar Painel Demonstrativo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onGoToApp('simulador')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#1E3A2B] hover:bg-[#254534] border border-[#2A4A37] text-[#F7F2E9] font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-[#D97D36]" />
              <span>Simular Restituição IRPF</span>
            </button>
          </div>

          {/* Pill-Free Value Indicators */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-[#A9BEB0]">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#22C55E]" />
              Zero alucinações tributárias
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#22C55E]" />
              Rastreabilidade documento a documento
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#22C55E]" />
              Comparativo Completa vs Simplificada
            </span>
          </div>

          {/* INTERACTIVE MOCKUP HERO CARD */}
          <div className="mt-12 max-w-4xl mx-auto rounded-2xl bg-[#1E3A2B] border border-[#2A4A37] shadow-2xl overflow-hidden text-left">
            {/* Window bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-3.5 border-b border-[#2A4A37] bg-[#172E22]/90 gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                  <div className="w-3 h-3 rounded-full bg-[#EAB308]" />
                  <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
                </div>
                <div className="h-4 w-px bg-[#2A4A37] mx-1 hidden sm:block" />
                <span className="text-xs font-mono text-[#A9BEB0]">declaro.app/painel-fiscal</span>
              </div>

              {/* Mockup tabs */}
              <div className="flex items-center gap-1 bg-[#1E3A2B] p-1 rounded-lg border border-[#2A4A37] text-xs">
                <button
                  type="button"
                  onClick={() => setInteractiveHeroTab('resumo')}
                  className={`px-3 py-1 rounded-md transition-all font-medium ${
                    interactiveHeroTab === 'resumo'
                      ? 'bg-[#172E22] text-[#F7F2E9] shadow-xs'
                      : 'text-[#A9BEB0] hover:text-[#F7F2E9]'
                  }`}
                >
                  Visão Geral
                </button>
                <button
                  type="button"
                  onClick={() => setInteractiveHeroTab('documentos')}
                  className={`px-3 py-1 rounded-md transition-all font-medium ${
                    interactiveHeroTab === 'documentos'
                      ? 'bg-[#172E22] text-[#F7F2E9] shadow-xs'
                      : 'text-[#A9BEB0] hover:text-[#F7F2E9]'
                  }`}
                >
                  5 Documentos Lidos
                </button>
                <button
                  type="button"
                  onClick={() => setInteractiveHeroTab('inconsistencias')}
                  className={`px-3 py-1 rounded-md transition-all font-medium flex items-center gap-1 ${
                    interactiveHeroTab === 'inconsistencias'
                      ? 'bg-[#172E22] text-[#EF4444] shadow-xs font-bold'
                      : 'text-[#A9BEB0] hover:text-[#F7F2E9]'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
                  Pendências (4)
                </button>
              </div>
            </div>

            {/* Mockup Body Content */}
            <div className="p-5 sm:p-6 bg-[#1E3A2B]">
              {interactiveHeroTab === 'resumo' && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-[#172E22] border border-[#2A4A37]">
                      <span className="text-xs text-[#A9BEB0]">Transações Mapeadas</span>
                      <p className="text-2xl font-bold font-mono text-[#F7F2E9] mt-1">1.247</p>
                      <span className="text-[11px] text-[#22C55E] flex items-center gap-1 mt-1">
                        ✓ 100% comprovadas
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-[#172E22] border border-[#2A4A37]">
                      <span className="text-xs text-[#A9BEB0]">Possíveis Deduções</span>
                      <p className="text-2xl font-bold font-mono text-[#D97D36] mt-1">R$ 38.640</p>
                      <span className="text-[11px] text-[#A9BEB0] mt-1 block">
                        Saúde, Educação, PGBL
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-[#172E22] border border-[#2A4A37]">
                      <span className="text-xs text-[#A9BEB0]">Restituição Estimada</span>
                      <p className="text-2xl font-bold font-mono text-[#22C55E] mt-1">R$ 4.820,00</p>
                      <span className="text-[11px] text-[#D97D36] mt-1 block font-semibold">
                        Modelo Completo é + vantajoso
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#172E22] border border-[#2A4A37] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                      <span className="text-[#F7F2E9]">
                        <strong>Alerta Preventivo:</strong> Recibo de consulta odontológica identificado em duplicidade (R$ 1.800,00).
                      </span>
                    </div>
                    <button
                      onClick={() => onGoToApp('inconsistencias')}
                      className="text-[#D97D36] font-bold hover:underline shrink-0 ml-3"
                    >
                      Auditar →
                    </button>
                  </div>
                </div>
              )}

              {interactiveHeroTab === 'documentos' && (
                <div className="space-y-3 animate-in fade-in duration-200 text-xs">
                  <div className="p-3 rounded-xl bg-[#172E22] border border-[#2A4A37] flex items-center justify-between">
                    <div>
                      <strong className="text-[#F7F2E9] block">Informe_Rendimentos_TechSolutions.pdf</strong>
                      <span className="text-[#A9BEB0] text-[11px]">Rendimento Tributável: R$ 168.400,00 · CNPJ 14.288.901/0001-44</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-sm bg-[#22C55E]/20 text-[#22C55E] font-bold">
                      Processado
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#172E22] border border-[#2A4A37] flex items-center justify-between">
                    <div>
                      <strong className="text-[#F7F2E9] block">Extrato_Anual_Bradesco_Saude.pdf</strong>
                      <span className="text-[#A9BEB0] text-[11px]">Despesas Médicas: R$ 8.940,00 · Titular e Dependentes</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-sm bg-[#22C55E]/20 text-[#22C55E] font-bold">
                      Elegível
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#172E22] border border-[#2A4A37] flex items-center justify-between">
                    <div>
                      <strong className="text-[#F7F2E9] block">Declaracao_Colegio_Santo_Agostinho.pdf</strong>
                      <span className="text-[#A9BEB0] text-[11px]">Mensalidades: R$ 14.200,00 (limitado a R$ 3.561,50 por lei)</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-sm bg-[#D97D36]/20 text-[#D97D36] font-bold">
                      Teto Aplicado
                    </span>
                  </div>
                </div>
              )}

              {interactiveHeroTab === 'inconsistencias' && (
                <div className="space-y-3 animate-in fade-in duration-200 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#172E22] border-l-4 border-l-[#EF4444] border-t border-r border-b border-[#2A4A37]">
                    <div className="flex items-center justify-between">
                      <strong className="text-[#EF4444]">Rendimento de estágio do dependente ausente</strong>
                      <span className="text-[10px] text-[#A9BEB0]">Risco DIRF</span>
                    </div>
                    <p className="text-[11px] text-[#A9BEB0] mt-1">
                      O dependente Enzo recebeu R$ 8.400,00 no ano. Inclua nos rendimentos para não cair em malha fina.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#172E22] border-l-4 border-l-[#EAB308] border-t border-r border-b border-[#2A4A37]">
                    <div className="flex items-center justify-between">
                      <strong className="text-[#EAB308]">Recibo de fisioterapia sem CREFITO do profissional</strong>
                      <span className="text-[10px] text-[#A9BEB0]">Exigência RFB</span>
                    </div>
                    <p className="text-[11px] text-[#A9BEB0] mt-1">
                      Comprovante de R$ 1.450,00 necessita de número de conselho regional para respaldo da dedução.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom bar inside mockup */}
            <div className="px-5 py-3 border-t border-[#2A4A37] bg-[#172E22]/90 flex items-center justify-between text-xs">
              <span className="text-[#A9BEB0]">
                Status da Pasta Fiscal: <strong className="text-[#22C55E]">68% Pronta para o PGD</strong>
              </span>
              <button
                onClick={() => onGoToApp('dashboard')}
                className="px-3 py-1 rounded-lg bg-[#D97D36] text-[#172E22] font-bold hover:bg-[#E5964E] transition-colors"
              >
                Abrir Painel Completo →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AS 4 DORES RESOLVIDAS PELO DECLARÔ */}
      <section className="py-20 bg-[#172E22]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-wider text-[#D97D36]">
              Por que o Declarô?
            </span>
            <h2 className="text-3xl font-sans font-bold text-[#F7F2E9] mt-2">
              Os 4 maiores problemas do IRPF que nós resolvemos para você
            </h2>
            <p className="text-sm text-[#A9BEB0] mt-3">
              Não deixe para reunir papéis na última semana de abril. Tenha controle fiscal contínuo e sem estresse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#1E3A2B] border border-[#2A4A37] space-y-3 hover:border-[#D97D36]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#EF4444]/15 text-[#EF4444] flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#F7F2E9]">
                Risco de Malha Fina
              </h3>
              <p className="text-xs text-[#A9BEB0] leading-relaxed">
                Mais de 1,3 milhão de brasileiros caem na malha fina todo ano por simples erros de digitação, duplicidades ou omissão involuntária de fontes de renda.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#1E3A2B] border border-[#2A4A37] space-y-3 hover:border-[#D97D36]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#D97D36]/15 text-[#D97D36] flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#F7F2E9]">
                Bagunça de Recibos e PDFs
              </h3>
              <p className="text-xs text-[#A9BEB0] leading-relaxed">
                Informes de múltiplos bancos, recibos de consultas no WhatsApp, extrato do plano de saúde: nós lemos e indexamos tudo em uma pasta única.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#1E3A2B] border border-[#2A4A37] space-y-3 hover:border-[#D97D36]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#22C55E]/15 text-[#22C55E] flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#F7F2E9]">
                Perda de Restituição
              </h3>
              <p className="text-xs text-[#A9BEB0] leading-relaxed">
                Muitos contribuintes escolhem o modelo Simplificado por preguiça e deixam até R$ 5.000 de restituição na mesa por não somar deduções válidas.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#1E3A2B] border border-[#2A4A37] space-y-3 hover:border-[#D97D36]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/15 text-[#3B82F6] flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#F7F2E9]">
                Regras Fiscais Complexas
              </h3>
              <p className="text-xs text-[#A9BEB0] leading-relaxed">
                Tetos de educação, limites de PGBL a 12%, despesas de saúde sem teto: o Declarô aplica as fórmulas oficiais de forma automática e transparente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MINI SIMULADOR INTERATIVO DIRETO NA LANDING */}
      <section className="py-20 bg-[#1E3A2B] border-y border-[#2A4A37]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-[#D97D36]">
              Simulação Prévia Instantânea
            </span>
            <h2 className="text-3xl font-sans font-bold text-[#F7F2E9] mt-2">
              Descubra qual modelo vale mais a pena para você
            </h2>
            <p className="text-sm text-[#A9BEB0] mt-2">
              Ajuste sua estimativa anual e compare o desconto padrão de 20% com as deduções completas.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#172E22] border border-[#2A4A37] shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Controls */}
            <div className="space-y-5 text-xs">
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-[#A9BEB0] font-medium">Rendimento Tributável Anual</span>
                  <span className="font-mono font-bold text-[#F7F2E9]">R$ {simRenda.toLocaleString('pt-BR')}</span>
                </div>
                <input
                  type="range"
                  min="40000"
                  max="400000"
                  step="5000"
                  value={simRenda}
                  onChange={(e) => setSimRenda(Number(e.target.value))}
                  className="w-full accent-[#D97D36] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-[#A9BEB0] font-medium">Despesas Médicas e Plano de Saúde</span>
                  <span className="font-mono font-bold text-[#F7F2E9]">R$ {simSaude.toLocaleString('pt-BR')}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60000"
                  step="1000"
                  value={simSaude}
                  onChange={(e) => setSimSaude(Number(e.target.value))}
                  className="w-full accent-[#D97D36] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-[#A9BEB0] font-medium">Despesas com Instrução / Escolas</span>
                  <span className="font-mono font-bold text-[#F7F2E9]">R$ {simEducacao.toLocaleString('pt-BR')}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="1000"
                  value={simEducacao}
                  onChange={(e) => setSimEducacao(Number(e.target.value))}
                  className="w-full accent-[#D97D36] cursor-pointer"
                />
              </div>

              <div className="pt-2 text-[11px] text-[#A9BEB0] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                <span>Considerando 2 dependentes legais (R$ 4.550,16 dedutíveis).</span>
              </div>
            </div>

            {/* Results card */}
            <div className="p-6 rounded-2xl bg-[#1E3A2B] border border-[#2A4A37] flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#D97D36] font-bold">
                  Diagnóstico Automático
                </span>
                <h3 className="text-xl font-bold text-[#F7F2E9] mt-1">
                  {deducoesLegais > descSimplificado ? 'Modelo Completo é o Vencedor' : 'Modelo Simplificado é mais vantajoso'}
                </h3>
                <p className="text-xs text-[#A9BEB0] mt-1">
                  Suas deduções comprovadas somam <strong className="text-[#F7F2E9]">R$ {deducoesLegais.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong> contra o limite de R$ 16.754,34 do simplificado.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#172E22] border border-[#2A4A37] flex items-center justify-between">
                <span className="text-xs text-[#A9BEB0]">Economia estimada no imposto:</span>
                <span className="text-2xl font-mono font-bold text-[#22C55E]">
                  + R$ {vantagemCompleta.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
                </span>
              </div>

              <button
                onClick={() => onGoToApp('simulador')}
                className="w-full py-3 rounded-xl bg-[#D97D36] hover:bg-[#E5964E] text-[#172E22] font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Abrir Simulador Detalhado com Gráficos</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* RAIO-X TEASER */}
      <section className="py-20 bg-[#172E22]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-[#1E3A2B] via-[#1E3A2B] to-[#254534] border border-[#2A4A37] p-8 sm:p-12 relative overflow-hidden shadow-2xl">
            <div className="max-w-2xl relative z-10 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#D97D36] font-bold flex items-center gap-1.5">
                <Zap className="w-4 h-4 fill-[#D97D36]" />
                O Diferencial Exclusivo
              </span>
              <h2 className="text-3xl sm:text-4xl font-sans font-bold text-[#F7F2E9]">
                O &quot;Raio-X da Declaração&quot;
              </h2>
              <p className="text-sm text-[#A9BEB0] leading-relaxed">
                Um painel executivo com números consolidados de alto impacto que comprova quanto você vai economizar legalmente e quais riscos foram eliminados antes do envio à Receita Federal.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs">
                <div className="p-3 rounded-xl bg-[#172E22] border border-[#2A4A37]">
                  <span className="text-[10px] text-[#A9BEB0] uppercase block">Volume</span>
                  <span className="text-base font-bold text-[#F7F2E9]">1.247</span>
                  <span className="text-[10px] text-[#A9BEB0] block">transações</span>
                </div>
                <div className="p-3 rounded-xl bg-[#172E22] border border-[#2A4A37]">
                  <span className="text-[10px] text-[#A9BEB0] uppercase block">Ganhos</span>
                  <span className="text-base font-bold text-[#D97D36]">8</span>
                  <span className="text-[10px] text-[#A9BEB0] block">oportunidades</span>
                </div>
                <div className="p-3 rounded-xl bg-[#172E22] border border-[#2A4A37]">
                  <span className="text-[10px] text-[#A9BEB0] uppercase block">Restituição</span>
                  <span className="text-base font-bold text-[#22C55E]">R$ 4.820</span>
                  <span className="text-[10px] text-[#A9BEB0] block">estimada</span>
                </div>
                <div className="p-3 rounded-xl bg-[#172E22] border border-[#2A4A37]">
                  <span className="text-[10px] text-[#A9BEB0] uppercase block">Risco</span>
                  <span className="text-base font-bold text-[#22C55E]">Zero</span>
                  <span className="text-[10px] text-[#A9BEB0] block">crítico</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onGoToApp('raiox')}
                  className="px-6 py-3 rounded-xl bg-[#D97D36] hover:bg-[#E5964E] text-[#172E22] font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Explorar Raio-X Interativo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onOpenRegras}
                  className="px-4 py-3 rounded-xl bg-[#172E22] hover:bg-[#254534] border border-[#2A4A37] text-xs text-[#F7F2E9] transition-colors cursor-pointer"
                >
                  Entenda nossa Arquitetura Anti-Alucinação
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLANOS E PREÇOS */}
      <section className="py-20 bg-[#172E22]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-wider text-[#D97D36]">
              Planos & Preços
            </span>
            <h2 className="text-3xl font-sans font-bold text-[#F7F2E9] mt-2">
              Escolha a tranquilidade ideal para o seu IRPF
            </h2>
            <p className="text-sm text-[#A9BEB0] mt-3">
              Comece grátis para organizar seus primeiros comprovantes ou desbloqueie o assistente completo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Grátis */}
            <div className="p-7 rounded-2xl bg-[#1E3A2B] border border-[#2A4A37] flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#F7F2E9]">Grátis</h3>
                <p className="text-xs text-[#A9BEB0] mt-1">Para quem tem declaração simples e poucos comprovantes.</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-sans font-bold text-[#F7F2E9]">R$ 0</span>
                  <span className="text-xs text-[#A9BEB0]">/para sempre</span>
                </div>

                <ul className="mt-6 space-y-3 text-xs text-[#F7F2E9]/80">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#22C55E]" /> Até 5 documentos processados
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#22C55E]" /> Checklist básico de documentos
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#22C55E]" /> Simulador IRPF simplificado
                  </li>
                  <li className="flex items-center gap-2 text-[#A9BEB0]/50 line-through">
                    Detecção de inconsistências fiscais
                  </li>
                  <li className="flex items-center gap-2 text-[#A9BEB0]/50 line-through">
                    Assistente Declarô interativo
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onGoToApp('dashboard')}
                className="mt-8 w-full py-3 rounded-xl bg-[#172E22] hover:bg-[#254534] border border-[#2A4A37] text-[#F7F2E9] text-xs font-semibold transition-colors cursor-pointer"
              >
                Começar Grátis
              </button>
            </div>

            {/* Premium - Destaque */}
            <div className="p-7 rounded-2xl bg-[#1E3A2B] border-2 border-[#D97D36] flex flex-col justify-between relative shadow-xl">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#D97D36] text-[#172E22] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3 h-3 fill-[#172E22]" />
                Mais Escolhido
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#F7F2E9]">Premium</h3>
                <p className="text-xs text-[#A9BEB0] mt-1">O pacote completo para pessoa física maximizar a restituição.</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-sans font-bold text-[#D97D36]">R$ 29,90</span>
                  <span className="text-xs text-[#A9BEB0]">/mês ou R$ 199/ano</span>
                </div>

                <ul className="mt-6 space-y-3 text-xs text-[#F7F2E9]/90">
                  <li className="flex items-center gap-2 font-semibold">
                    <Check className="w-4 h-4 text-[#D97D36]" /> Documentos ilimitados
                  </li>
                  <li className="flex items-center gap-2 font-semibold">
                    <Check className="w-4 h-4 text-[#D97D36]" /> Assistente Declarô especializado 24/7
                  </li>
                  <li className="flex items-center gap-2 font-semibold">
                    <Check className="w-4 h-4 text-[#D97D36]" /> Detecção proativa de inconsistências
                  </li>
                  <li className="flex items-center gap-2 font-semibold">
                    <Check className="w-4 h-4 text-[#D97D36]" /> Raio-X da Declaração completo
                  </li>
                  <li className="flex items-center gap-2 font-semibold">
                    <Check className="w-4 h-4 text-[#D97D36]" /> Exportação de relatório em PDF
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onGoToApp('planos')}
                className="mt-8 w-full py-3 rounded-xl bg-[#D97D36] hover:bg-[#E5964E] text-[#172E22] text-xs font-bold uppercase tracking-wider transition-colors shadow-md cursor-pointer"
              >
                Experimentar Premium
              </button>
            </div>

            {/* Profissional */}
            <div className="p-7 rounded-2xl bg-[#1E3A2B] border border-[#2A4A37] flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#F7F2E9]">Profissional</h3>
                <p className="text-xs text-[#A9BEB0] mt-1">Para contadores e escritórios com múltiplos clientes.</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-sans font-bold text-[#F7F2E9]">R$ 89,90</span>
                  <span className="text-xs text-[#A9BEB0]">/mês</span>
                </div>

                <ul className="mt-6 space-y-3 text-xs text-[#F7F2E9]/80">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#22C55E]" /> Até 30 CPFs / clientes gerenciados
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#22C55E]" /> Exportação avançada pré-formatada para o PGD
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#22C55E]" /> Portal do cliente com upload individual
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#22C55E]" /> Suporte prioritário via WhatsApp
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onGoToApp('planos')}
                className="mt-8 w-full py-3 rounded-xl bg-[#172E22] hover:bg-[#254534] border border-[#2A4A37] text-[#F7F2E9] text-xs font-semibold transition-colors cursor-pointer"
              >
                Conhecer Solução para Contadores
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-[#172E22] border-t border-[#2A4A37]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-[#D97D36]">
              Tire suas Dúvidas
            </span>
            <h2 className="text-3xl font-sans font-bold text-[#F7F2E9] mt-2">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#1E3A2B] border border-[#2A4A37] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between text-sm font-semibold text-[#F7F2E9] hover:text-[#D97D36] transition-colors cursor-pointer"
                  >
                    <span>{faq.p}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#A9BEB0] transition-transform duration-200 shrink-0 ml-3 ${
                        isOpen ? 'rotate-180 text-[#D97D36]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-[#A9BEB0] leading-relaxed border-t border-[#2A4A37]/50 animate-in fade-in duration-200">
                      {faq.r}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-[#172E22] border-t border-[#2A4A37]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Logo size="sm" showSubtitle />

          <p className="text-xs text-[#A9BEB0] text-center sm:text-right">
            © 2026 Declarô. Todos os direitos reservados.
            <br />
            Ferramenta auxiliar de organização fiscal e auditoria documental prévia.
          </p>
        </div>
      </footer>
    </div>
  );
};
