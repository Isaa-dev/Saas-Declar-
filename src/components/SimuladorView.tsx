import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  HelpCircle, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  Scale, 
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { REGRAS_FISCAIS_VIGENTES } from '../data/mockData';

export const SimuladorView: React.FC = () => {
  // Simulator inputs (pre-filled with realistic sample profile data)
  const [rendimentos, setRendimentos] = useState<number>(168400);
  const [despesasSaude, setDespesasSaude] = useState<number>(15030);
  const [despesasEducacao, setDespesasEducacao] = useState<number>(23800);
  const [previdenciaPgbl, setPrevidenciaPgbl] = useState<number>(15000);
  const [numDependentes, setNumDependentes] = useState<number>(2);
  const [irrfPago, setIrrfPago] = useState<number>(26500);

  // Calculations based on deterministic official IRPF rules
  const calculo = useMemo(() => {
    // 1. SIMPLIFICADO:
    // Desconto de 20% limitado ao teto legal de R$ 16.754,34
    const descontoSimplificadoBruto = rendimentos * REGRAS_FISCAIS_VIGENTES.percentualDescontoSimplificado;
    const descontoSimplificado = Math.min(descontoSimplificadoBruto, REGRAS_FISCAIS_VIGENTES.limiteDescontoSimplificado);
    const baseCalculoSimplificado = Math.max(0, rendimentos - descontoSimplificado);

    // 2. COMPLETO:
    // Saúde: dedução integral
    const saudeDeducao = despesasSaude;

    // Educação: teto individual por dependente + titular (numDependentes + 1)
    const tetoEducacaoTotal = (numDependentes + 1) * REGRAS_FISCAIS_VIGENTES.limiteEducacaoIndividual;
    const educacaoDeducaoEfetiva = Math.min(despesasEducacao, tetoEducacaoTotal);

    // Dependentes: R$ 2.275,08 por pessoa
    const dependentesDeducao = numDependentes * REGRAS_FISCAIS_VIGENTES.deducaoFixaDependente;

    // PGBL: até 12% da renda bruta
    const limitePgblValor = rendimentos * REGRAS_FISCAIS_VIGENTES.limitePgblRendaBruta;
    const pgblDeducaoEfetiva = Math.min(previdenciaPgbl, limitePgblValor);

    const totalDeducoesCompleto = saudeDeducao + educacaoDeducaoEfetiva + dependentesDeducao + pgblDeducaoEfetiva;
    const baseCalculoCompleto = Math.max(0, rendimentos - totalDeducoesCompleto);

    // Progressive tax table simplified function (27.5% bracket with parcel to deduce)
    const calcularImpostoDevido = (base: number) => {
      if (base <= 27110.40) return 0;
      if (base <= 33919.80) return (base * 0.075) - 2033.28;
      if (base <= 45012.60) return (base * 0.15) - 4577.27;
      if (base <= 55976.16) return (base * 0.225) - 7953.21;
      return (base * 0.275) - 10752.02;
    };

    const impostoDevidoSimplificado = Math.max(0, calcularImpostoDevido(baseCalculoSimplificado));
    const impostoDevidoCompleto = Math.max(0, calcularImpostoDevido(baseCalculoCompleto));

    // Restituição = IRRF Pago - Imposto Devido (se positivo)
    const saldoSimplificado = irrfPago - impostoDevidoSimplificado;
    const saldoCompleto = irrfPago - impostoDevidoCompleto;

    const melhorModelo = saldoCompleto >= saldoSimplificado ? 'completo' : 'simplificado';
    const diferencaVantagem = Math.abs(saldoCompleto - saldoSimplificado);

    return {
      descontoSimplificado,
      baseCalculoSimplificado,
      impostoDevidoSimplificado,
      saldoSimplificado,
      saudeDeducao,
      educacaoDeducaoEfetiva,
      dependentesDeducao,
      pgblDeducaoEfetiva,
      totalDeducoesCompleto,
      baseCalculoCompleto,
      impostoDevidoCompleto,
      saldoCompleto,
      melhorModelo,
      diferencaVantagem,
    };
  }, [rendimentos, despesasSaude, despesasEducacao, previdenciaPgbl, numDependentes, irrfPago]);

  const handleResetValores = () => {
    setRendimentos(168400);
    setDespesasSaude(15030);
    setDespesasEducacao(23800);
    setPrevidenciaPgbl(15000);
    setNumDependentes(2);
    setIrrfPago(26500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#D4873F]">
            Simulação Comparativa Oficial
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#F7F2E9]">
            Simulador de Imposto & Restituição
          </h1>
          <p className="text-xs text-[#A9BEB0] mt-1">
            Compare o Modelo Simplificado (desconto de 20%) contra o Modelo Completo (deduções legais comprovadas).
          </p>
        </div>

        <button
          onClick={handleResetValores}
          className="text-xs text-[#A9BEB0] hover:text-[#F7F2E9] border border-[#2A4A37] bg-[#1E3A2B] px-3 py-1.5 rounded-xl flex items-center gap-1.5 self-start transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restaurar Valores Padrão</span>
        </button>
      </div>

      {/* Mandatory Disclaimer Alert */}
      <div className="p-4 rounded-xl bg-[#1E3A2B] border border-[#2A4A37] flex items-start gap-3">
        <Scale className="w-5 h-5 text-[#D4873F] shrink-0 mt-0.5" />
        <div className="text-xs text-[#A9BEB0] leading-relaxed">
          <strong className="text-[#F7F2E9]">Aviso Legal Obrigatório:</strong> Esta ferramenta é uma simulação analítica baseada nas alíquotas da tabela progressiva e limites vigentes do IRPF. O valor final definitivo e os lotes de pagamento são apurados e homologados exclusivamente pelo <em>Programa Gerador da Declaração (PGD)</em> da Receita Federal do Brasil.
        </div>
      </div>

      {/* WINNER RECOMMENDATION BANNER */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#1E3A2B] to-[#254534] border-2 border-[#D4873F] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D4873F]" />
            <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#D4873F]">
              Opção Mais Vantajosa para seu Perfil
            </span>
          </div>
          <h2 className="text-xl font-serif font-bold text-[#F7F2E9]">
            {calculo.melhorModelo === 'completo' ? 'Declaração por Deduções Legais (Completa)' : 'Declaração por Desconto Simplificado'}
          </h2>
          <p className="text-xs text-[#A9BEB0]">
            Suas deduções comprovadas somam <strong className="text-[#F7F2E9]">R$ {calculo.totalDeducoesCompleto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>, superando o teto do desconto simplificado (R$ 16.754,34).
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#172E22] border border-[#2A4A37] text-left md:text-right shrink-0">
          <span className="text-[11px] text-[#A9BEB0] block">Vantagem Financeira Adicional</span>
          <span className="text-xl font-mono font-bold text-[#22C55E]">
            + R$ {calculo.diferencaVantagem.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[10px] text-[#A9BEB0] block mt-0.5">a mais na sua restituição</span>
        </div>
      </div>

      {/* TWO COLUMNS: INPUTS VS RESULTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* INPUTS COLUMN (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#1E3A2B] border border-[#2A4A37] space-y-4">
          <h3 className="text-sm font-serif font-bold text-[#F7F2E9] pb-2 border-b border-[#2A4A37]">
            Parâmetros da Sua Declaração
          </h3>

          <div>
            <label className="block text-xs font-medium text-[#A9BEB0] mb-1">
              Rendimentos Tributáveis Anuais (R$)
            </label>
            <input
              type="number"
              value={rendimentos}
              onChange={(e) => setRendimentos(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#172E22] border border-[#2A4A37] text-xs font-mono font-bold text-[#F7F2E9] focus:outline-hidden focus:border-[#D4873F]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#A9BEB0] mb-1 flex items-center justify-between">
              <span>Gastos com Saúde (Sem Teto Legal)</span>
              <span className="text-[10px] text-[#22C55E]">100% elegível</span>
            </label>
            <input
              type="number"
              value={despesasSaude}
              onChange={(e) => setDespesasSaude(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#172E22] border border-[#2A4A37] text-xs font-mono text-[#F7F2E9] focus:outline-hidden focus:border-[#D4873F]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#A9BEB0] mb-1 flex items-center justify-between">
              <span>Gastos com Instrução / Educação</span>
              <span className="text-[10px] text-[#D4873F]">Teto R$ 3.561,50 / dependente</span>
            </label>
            <input
              type="number"
              value={despesasEducacao}
              onChange={(e) => setDespesasEducacao(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#172E22] border border-[#2A4A37] text-xs font-mono text-[#F7F2E9] focus:outline-hidden focus:border-[#D4873F]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#A9BEB0] mb-1 flex items-center justify-between">
              <span>Previdência Complementar PGBL</span>
              <span className="text-[10px] text-[#A9BEB0]">Limite 12% da renda</span>
            </label>
            <input
              type="number"
              value={previdenciaPgbl}
              onChange={(e) => setPrevidenciaPgbl(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#172E22] border border-[#2A4A37] text-xs font-mono text-[#F7F2E9] focus:outline-hidden focus:border-[#D4873F]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#A9BEB0] mb-1">
                Número de Dependentes
              </label>
              <input
                type="number"
                min={0}
                max={10}
                value={numDependentes}
                onChange={(e) => setNumDependentes(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#172E22] border border-[#2A4A37] text-xs font-mono text-[#F7F2E9] focus:outline-hidden focus:border-[#D4873F]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#A9BEB0] mb-1">
                IR Retido na Fonte (IRRF)
              </label>
              <input
                type="number"
                value={irrfPago}
                onChange={(e) => setIrrfPago(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#172E22] border border-[#2A4A37] text-xs font-mono text-[#F7F2E9] focus:outline-hidden focus:border-[#D4873F]"
              />
            </div>
          </div>
        </div>

        {/* COMPARATIVE RESULTS COLUMN (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          {/* CARD SIMPLIFICADO */}
          <div className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
            calculo.melhorModelo === 'simplificado'
              ? 'bg-[#1E3A2B] border-[#D4873F]'
              : 'bg-[#1E3A2B]/60 border-[#2A4A37]'
          }`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#2A4A37]">
                <div>
                  <h4 className="text-base font-serif font-bold text-[#F7F2E9]">
                    Modelo Simplificado
                  </h4>
                  <span className="text-[11px] text-[#A9BEB0]">Desconto padrão fixo de 20%</span>
                </div>
                {calculo.melhorModelo === 'simplificado' && (
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#D4873F] text-[#172E22] font-bold">
                    Recomendado
                  </span>
                )}
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#A9BEB0]">
                  <span>Desconto padrão aplicado:</span>
                  <span className="font-mono text-[#F7F2E9]">
                    R$ {calculo.descontoSimplificado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between text-[#A9BEB0]">
                  <span>Base tributável apurada:</span>
                  <span className="font-mono text-[#F7F2E9]">
                    R$ {calculo.baseCalculoSimplificado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between text-[#A9BEB0]">
                  <span>Imposto devido calculado:</span>
                  <span className="font-mono text-[#F7F2E9]">
                    R$ {calculo.impostoDevidoSimplificado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#2A4A37]">
              <span className="text-[11px] text-[#A9BEB0] block">
                {calculo.saldoSimplificado >= 0 ? 'Restituição Estimada' : 'Imposto a Pagar'}
              </span>
              <span className={`text-2xl font-serif font-bold font-mono-val ${
                calculo.saldoSimplificado >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'
              }`}>
                R$ {Math.abs(calculo.saldoSimplificado).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* CARD COMPLETO */}
          <div className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
            calculo.melhorModelo === 'completo'
              ? 'bg-[#1E3A2B] border-[#22C55E] shadow-md'
              : 'bg-[#1E3A2B]/60 border-[#2A4A37]'
          }`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#2A4A37]">
                <div>
                  <h4 className="text-base font-serif font-bold text-[#F7F2E9]">
                    Modelo Completo
                  </h4>
                  <span className="text-[11px] text-[#A9BEB0]">Deduções Legais Comprovadas</span>
                </div>
                {calculo.melhorModelo === 'completo' && (
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#22C55E] text-[#172E22] font-bold">
                    Mais Vantajoso
                  </span>
                )}
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#A9BEB0]">
                  <span>Total deduções válidas:</span>
                  <span className="font-mono text-[#F7F2E9]">
                    R$ {calculo.totalDeducoesCompleto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between text-[#A9BEB0]">
                  <span>Base tributável apurada:</span>
                  <span className="font-mono text-[#F7F2E9]">
                    R$ {calculo.baseCalculoCompleto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between text-[#A9BEB0]">
                  <span>Imposto devido calculado:</span>
                  <span className="font-mono text-[#F7F2E9]">
                    R$ {calculo.impostoDevidoCompleto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#2A4A37]">
              <span className="text-[11px] text-[#A9BEB0] block">
                {calculo.saldoCompleto >= 0 ? 'Restituição Estimada' : 'Imposto a Pagar'}
              </span>
              <span className={`text-2xl font-serif font-bold font-mono-val ${
                calculo.saldoCompleto >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'
              }`}>
                R$ {Math.abs(calculo.saldoCompleto).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
