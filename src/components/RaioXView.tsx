import React, { useState } from 'react';
import { 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  FileCheck, 
  Download, 
  Share2, 
  Sparkles, 
  CheckCircle2, 
  Scale, 
  AlertTriangle,
  Receipt,
  Printer
} from 'lucide-react';
import { GastoRegistro } from '../types';

interface RaioXViewProps {
  gastos: GastoRegistro[];
  onOpenRegras: () => void;
}

export const RaioXView: React.FC<RaioXViewProps> = ({ gastos, onOpenRegras }) => {
  const [downloadingReport, setDownloadingReport] = useState(false);
  const [reportDownloaded, setReportDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloadingReport(true);
    setTimeout(() => {
      setDownloadingReport(false);
      setReportDownloaded(true);
      setTimeout(() => setReportDownloaded(false), 3000);
    }, 1500);
  };

  const oportunidades = [
    {
      titulo: 'Aporte em PGBL maximizado até 12% da renda bruta',
      economia: 'R$ 4.125,00',
      fundamento: 'Lei nº 9.532/1997, art. 11',
      docOrigem: 'Extrato_Aportes_PGBL_Brasilprev_2025.pdf',
      status: 'Aproveitado no Modelo Completo'
    },
    {
      titulo: 'Despesas com plano de saúde familiar integralmente elegíveis',
      economia: 'R$ 2.458,50',
      fundamento: 'Lei nº 9.250/1995, art. 8º',
      docOrigem: 'Extrato_Anual_Bradesco_Saude_2025.pdf',
      status: 'Sem limite legal estabelecido'
    },
    {
      titulo: 'Dedução do limite individual de instrução (Colégio Santo Agostinho)',
      economia: 'R$ 979,41',
      fundamento: 'Lei nº 9.250/1995, art. 8º, II',
      docOrigem: 'Declaracao_Quitacao_Colegio_Santo_Agostinho.pdf',
      status: 'Atingiu teto anual de R$ 3.561,50'
    },
    {
      titulo: 'Dedução fixa de 2 dependentes cadastrados',
      economia: 'R$ 1.251,29',
      fundamento: 'Lei nº 9.250/1995, art. 8º, II, "c"',
      docOrigem: 'Certidao_Nascimento_Dependentes.pdf',
      status: 'R$ 2.275,08 por dependente'
    },
    {
      titulo: 'Doação ao FUMCAD dedutível direto do imposto devido',
      economia: 'R$ 1.500,00',
      fundamento: 'Estatuto da Criança e do Adolescente, art. 260',
      docOrigem: 'Recibo_Doacao_Fumcad_2025.pdf',
      status: 'Abatimento direto até o limite de 6%'
    },
    {
      titulo: 'Consultas e exames laboratoriais Fleury e Einstein',
      economia: 'R$ 1.221,00',
      fundamento: 'IN RFB nº 1.500/2014, art. 94',
      docOrigem: 'NotaFiscal_Fleury_Exames_Abril2025.pdf',
      status: 'Laudos e notas fiscais identificadas'
    },
    {
      titulo: 'Restituição acelerada via chave Pix CPF prioritária',
      economia: 'Recebimento nos 1ºs lotes',
      fundamento: 'Critério de desempate RFB',
      docOrigem: 'Cadastro Pix Oficial',
      status: 'Configurado com sucesso'
    },
    {
      titulo: 'Opção do Modelo Completo superando o desconto padrão de 20%',
      economia: 'R$ 3.840,00 a mais',
      fundamento: 'Simulação comparativa oficial Declarô',
      docOrigem: 'Painel_Simulador_IRPF.pdf',
      status: 'Deduções superiores a R$ 16.754,34'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* HEADER WITH PRINT / EXPORT BUTTON */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#2A4A37] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-md bg-[#D4873F]/20 text-[#D4873F] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 border border-[#D4873F]/40">
              <Zap className="w-3.5 h-3.5 fill-[#D4873F]" />
              Diagnóstico Estratégico Declarô
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#F7F2E9]">
            Raio-X da Declaração
          </h1>
          <p className="text-xs text-[#A9BEB0] mt-1">
            O resumo executivo consolidado com cruzamento de dados, oportunidades fiscais e rastreabilidade total.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownload}
            disabled={downloadingReport}
            className="px-5 py-2.5 rounded-xl bg-[#D4873F] hover:bg-[#E5964E] text-[#172E22] font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
          >
            {downloadingReport ? (
              <>
                <div className="w-4 h-4 border-2 border-[#172E22] border-t-transparent rounded-full animate-spin" />
                <span>Gerando Relatório...</span>
              </>
            ) : reportDownloaded ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#172E22]" />
                <span>Relatório Gerado!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Exportar Relatório PDF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* BIG HERO NUMBERS (O ELEMENTO VISUAL MAIS MARCANTE) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* BIG NUMBER 1: Transações Analisadas */}
        <div className="p-6 rounded-2xl bg-[#1E3A2B] border border-[#2A4A37] flex flex-col justify-between relative overflow-hidden group hover:border-[#D4873F]/60 transition-all">
          <div className="text-xs font-mono uppercase tracking-wider text-[#A9BEB0]">
            Volume de Dados
          </div>
          <div className="my-4">
            <span className="text-4xl sm:text-5xl font-serif font-bold text-[#F7F2E9] tracking-tight font-mono-val">
              1.247
            </span>
          </div>
          <div>
            <span className="text-xs font-semibold text-[#F7F2E9] block">
              Transações analisadas
            </span>
            <span className="text-[11px] text-[#A9BEB0]">
              Contas bancárias, faturas e recibos
            </span>
          </div>
        </div>

        {/* BIG NUMBER 2: Oportunidades Encontradas */}
        <div className="p-6 rounded-2xl bg-[#1E3A2B] border border-[#2A4A37] flex flex-col justify-between relative overflow-hidden group hover:border-[#D4873F]/60 transition-all">
          <div className="text-xs font-mono uppercase tracking-wider text-[#D4873F] font-bold">
            Eficiência Tributária
          </div>
          <div className="my-4">
            <span className="text-4xl sm:text-5xl font-serif font-bold text-[#D4873F] tracking-tight font-mono-val">
              8
            </span>
          </div>
          <div>
            <span className="text-xs font-semibold text-[#F7F2E9] block">
              Oportunidades encontradas
            </span>
            <span className="text-[11px] text-[#A9BEB0]">
              Elegíveis conforme a Lei 9.250/95
            </span>
          </div>
        </div>

        {/* BIG NUMBER 3: Restituição Potencial Estimada */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1E3A2B] to-[#254534] border-2 border-[#22C55E]/60 flex flex-col justify-between relative overflow-hidden shadow-md">
          <div className="text-xs font-mono uppercase tracking-wider text-[#22C55E] font-bold">
            Restituição Potencial
          </div>
          <div className="my-4">
            <span className="text-4xl sm:text-5xl font-serif font-bold text-[#22C55E] tracking-tight font-mono-val">
              R$ 4.820
            </span>
          </div>
          <div>
            <span className="text-xs font-semibold text-[#F7F2E9] block">
              Saldo a receber estimado
            </span>
            <span className="text-[11px] text-[#A9BEB0]">
              Via Modelo Completo de declaração
            </span>
          </div>
        </div>

        {/* BIG NUMBER 4: Risco de Malha Fina */}
        <div className="p-6 rounded-2xl bg-[#1E3A2B] border border-[#2A4A37] flex flex-col justify-between relative overflow-hidden group hover:border-[#22C55E]/60 transition-all">
          <div className="text-xs font-mono uppercase tracking-wider text-[#22C55E] font-bold">
            Conformidade & Risco
          </div>
          <div className="my-4">
            <span className="text-4xl sm:text-5xl font-serif font-bold text-[#22C55E] tracking-tight">
              Mínimo
            </span>
          </div>
          <div>
            <span className="text-xs font-semibold text-[#F7F2E9] block">
              Risco pós-correções
            </span>
            <span className="text-[11px] text-[#A9BEB0]">
              Documentos 100% justificados
            </span>
          </div>
        </div>
      </div>

      {/* COMPOSIÇÃO VISUAL DAS DEDUÇÕES ELEGÍVEIS */}
      <div className="p-6 rounded-2xl bg-[#1E3A2B] border border-[#2A4A37] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-serif font-bold text-[#F7F2E9]">
              Composição das Deduções Elegíveis Catalogadas
            </h3>
            <p className="text-xs text-[#A9BEB0]">
              Total de R$ 38.640,00 distribuído pelas rubricas fiscais aceitas pela Receita Federal.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-[#D4873F]">
            100% Documentado
          </span>
        </div>

        {/* Multi-segment stacked bar */}
        <div className="w-full h-4 rounded-full bg-[#172E22] overflow-hidden flex border border-[#2A4A37]">
          <div className="h-full bg-[#22C55E] transition-all" style={{ width: '38%' }} title="Saúde: 38%" />
          <div className="h-full bg-[#D4873F] transition-all" style={{ width: '38%' }} title="Previdência PGBL: 38%" />
          <div className="h-full bg-[#3B82F6] transition-all" style={{ width: '12%' }} title="Dependentes: 12%" />
          <div className="h-full bg-[#A855F7] transition-all" style={{ width: '8%' }} title="Educação: 8%" />
          <div className="h-full bg-[#EAB308] transition-all" style={{ width: '4%' }} title="Doações: 4%" />
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-[#22C55E]" />
            <div>
              <span className="text-[#A9BEB0] block text-[10px]">Saúde (Sem teto)</span>
              <strong className="text-[#F7F2E9] font-mono">R$ 15.030</strong>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-[#D4873F]" />
            <div>
              <span className="text-[#A9BEB0] block text-[10px]">Previdência PGBL</span>
              <strong className="text-[#F7F2E9] font-mono">R$ 15.000</strong>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-[#3B82F6]" />
            <div>
              <span className="text-[#A9BEB0] block text-[10px]">2 Dependentes</span>
              <strong className="text-[#F7F2E9] font-mono">R$ 4.550</strong>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-[#A855F7]" />
            <div>
              <span className="text-[#A9BEB0] block text-[10px]">Educação (Teto)</span>
              <strong className="text-[#F7F2E9] font-mono">R$ 3.561</strong>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-[#EAB308]" />
            <div>
              <span className="text-[#A9BEB0] block text-[10px]">Doações FUMCAD</span>
              <strong className="text-[#F7F2E9] font-mono">R$ 1.500</strong>
            </div>
          </div>
        </div>
      </div>

      {/* AS 8 OPORTUNIDADES ENCONTRADAS (DETALHADAS) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-serif font-bold text-[#F7F2E9] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D4873F]" />
              As 8 Oportunidades Fiscais Identificadas
            </h3>
            <p className="text-xs text-[#A9BEB0]">
              Economia apurada individualmente com fundamento legal e comprovante vinculado.
            </p>
          </div>
        </div>

        <div className="border border-[#2A4A37] rounded-2xl overflow-hidden bg-[#1E3A2B] divide-y divide-[#2A4A37]">
          {oportunidades.map((op, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#254534]/40 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#D4873F]/20 text-[#D4873F] font-bold text-[11px] flex items-center justify-center font-mono">
                    {idx + 1}
                  </span>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#F7F2E9]">
                    {op.titulo}
                  </h4>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#A9BEB0] pl-7">
                  <span className="font-mono text-[#D4873F]">📄 {op.docOrigem}</span>
                  <span>·</span>
                  <span>{op.fundamento}</span>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center pl-7 sm:pl-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-[#2A4A37]/50 shrink-0">
                <span className="text-sm font-mono font-bold text-[#22C55E]">
                  {op.economia}
                </span>
                <span className="text-[10px] text-[#A9BEB0]">
                  {op.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
