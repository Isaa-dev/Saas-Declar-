import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  Crown, 
  QrCode, 
  CreditCard, 
  Copy, 
  CheckCircle2, 
  X, 
  ShieldCheck, 
  Zap,
  ArrowRight
} from 'lucide-react';
import { PerfilUsuario } from '../types';

interface PlanosViewProps {
  perfil: PerfilUsuario;
  onAtualizarPlano: (novoPlano: 'gratis' | 'premium' | 'profissional') => void;
}

export const PlanosView: React.FC<PlanosViewProps> = ({ perfil, onAtualizarPlano }) => {
  const [faturamentoAnual, setFaturamentoAnual] = useState(false);
  const [modalCheckout, setModalCheckout] = useState(false);
  const [planoSelecionado, setPlanoSelecionado] = useState<'premium' | 'profissional'>('premium');
  const [metodoPagamento, setMetodoPagamento] = useState<'pix' | 'cartao'>('pix');
  const [copiadoPix, setCopiadoPix] = useState(false);
  const [processandoPagamento, setProcessandoPagamento] = useState(false);
  const [sucessoPagamento, setSucessoPagamento] = useState(false);

  const handleAbrirCheckout = (plano: 'premium' | 'profissional') => {
    setPlanoSelecionado(plano);
    setSucessoPagamento(false);
    setModalCheckout(true);
  };

  const handleCopiarPix = () => {
    navigator.clipboard?.writeText('00020126580014br.gov.bcb.pix0136declaro-app-pagamento-simulado-mvp');
    setCopiadoPix(true);
    setTimeout(() => setCopiadoPix(false), 2500);
  };

  const handleConfirmarPagamentoSimulado = () => {
    setProcessandoPagamento(true);
    setTimeout(() => {
      setProcessandoPagamento(false);
      setSucessoPagamento(true);
      onAtualizarPlano(planoSelecionado);
      setTimeout(() => {
        setModalCheckout(false);
      }, 1800);
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-mono uppercase tracking-wider text-[#D4873F]">
          Planos & Assinaturas Declarô
        </span>
        <h1 className="text-3xl font-serif font-bold text-[#F7F2E9]">
          Escolha o nível de suporte ideal para seu IRPF
        </h1>
        <p className="text-xs sm:text-sm text-[#A9BEB0]">
          Evite a malha fina com nossa inteligência fiscal orientada por regras determinísticas da Receita Federal.
        </p>

        {/* Toggle Mensal / Anual */}
        <div className="inline-flex items-center gap-3 p-1.5 rounded-xl bg-[#1E3A2B] border border-[#2A4A37] text-xs mt-3">
          <button
            onClick={() => setFaturamentoAnual(false)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              !faturamentoAnual ? 'bg-[#172E22] text-[#F7F2E9] shadow-xs' : 'text-[#A9BEB0]'
            }`}
          >
            Faturamento Mensal
          </button>
          <button
            onClick={() => setFaturamentoAnual(true)}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
              faturamentoAnual ? 'bg-[#172E22] text-[#D4873F] font-bold shadow-xs' : 'text-[#A9BEB0]'
            }`}
          >
            <span>Anual</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-[#22C55E]/20 text-[#22C55E] font-bold">
              30% OFF
            </span>
          </button>
        </div>
      </div>

      {/* PRICING CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
        {/* GRÁTIS */}
        <div className="p-6 rounded-2xl bg-[#1E3A2B] border border-[#2A4A37] flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-serif font-bold text-[#F7F2E9]">Grátis</h3>
              <p className="text-xs text-[#A9BEB0] mt-1">Para quem tem poucos comprovantes e declaração direta.</p>
            </div>

            <div className="flex items-baseline gap-1 py-2">
              <span className="text-3xl font-serif font-bold text-[#F7F2E9]">R$ 0</span>
              <span className="text-xs text-[#A9BEB0]">/vitalício</span>
            </div>

            <ul className="space-y-3 text-xs text-[#F7F2E9]/80 border-t border-[#2A4A37] pt-4">
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
              <li className="flex items-center gap-2 text-[#A9BEB0]/50 line-through">
                Raio-X Executivo Completo
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-[#2A4A37]">
            {perfil.planoAtual === 'gratis' ? (
              <div className="w-full py-2.5 rounded-xl bg-[#172E22] text-[#A9BEB0] text-center text-xs font-semibold border border-[#2A4A37]">
                Seu Plano Atual
              </div>
            ) : (
              <button
                onClick={() => onAtualizarPlano('gratis')}
                className="w-full py-2.5 rounded-xl bg-[#172E22] hover:bg-[#254534] text-[#A9BEB0] text-xs font-medium border border-[#2A4A37] transition-colors"
              >
                Voltar para Grátis
              </button>
            )}
          </div>
        </div>

        {/* PREMIUM (MAIS ESCOLHIDO) */}
        <div className="p-6 rounded-2xl bg-[#1E3A2B] border-2 border-[#D4873F] flex flex-col justify-between relative shadow-xl">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#D4873F] text-[#172E22] text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3 fill-[#172E22]" />
            Mais Escolhido
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-serif font-bold text-[#F7F2E9]">Premium</h3>
              <p className="text-xs text-[#A9BEB0] mt-1">O pacote completo para pessoa física maximizar a restituição.</p>
            </div>

            <div className="flex items-baseline gap-1 py-2">
              <span className="text-4xl font-serif font-bold text-[#D4873F]">
                {faturamentoAnual ? 'R$ 19,90' : 'R$ 29,90'}
              </span>
              <span className="text-xs text-[#A9BEB0]">
                {faturamentoAnual ? '/mês (R$ 238,80/ano)' : '/mês'}
              </span>
            </div>

            <ul className="space-y-3 text-xs text-[#F7F2E9]/90 border-t border-[#2A4A37] pt-4">
              <li className="flex items-center gap-2 font-semibold">
                <Check className="w-4 h-4 text-[#D4873F]" /> Documentos ilimitados
              </li>
              <li className="flex items-center gap-2 font-semibold">
                <Check className="w-4 h-4 text-[#D4873F]" /> Assistente Declarô especializado 24/7
              </li>
              <li className="flex items-center gap-2 font-semibold">
                <Check className="w-4 h-4 text-[#D4873F]" /> Detecção proativa de inconsistências
              </li>
              <li className="flex items-center gap-2 font-semibold">
                <Check className="w-4 h-4 text-[#D4873F]" /> Raio-X da Declaração completo
              </li>
              <li className="flex items-center gap-2 font-semibold">
                <Check className="w-4 h-4 text-[#D4873F]" /> Exportação de relatório em PDF
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-[#2A4A37]">
            {perfil.planoAtual === 'premium' ? (
              <div className="w-full py-3 rounded-xl bg-[#22C55E]/20 text-[#22C55E] text-center text-xs font-bold border border-[#22C55E]/40 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Plano Ativo
              </div>
            ) : (
              <button
                onClick={() => handleAbrirCheckout('premium')}
                className="w-full py-3 rounded-xl bg-[#D4873F] hover:bg-[#E5964E] text-[#172E22] text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Assinar Premium</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* PROFISSIONAL (CONTADORES) */}
        <div className="p-6 rounded-2xl bg-[#1E3A2B] border border-[#2A4A37] flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-serif font-bold text-[#F7F2E9]">Profissional</h3>
              <p className="text-xs text-[#A9BEB0] mt-1">Para contadores e escritórios com múltiplos declarantes.</p>
            </div>

            <div className="flex items-baseline gap-1 py-2">
              <span className="text-4xl font-serif font-bold text-[#F7F2E9]">
                {faturamentoAnual ? 'R$ 69,90' : 'R$ 89,90'}
              </span>
              <span className="text-xs text-[#A9BEB0]">/mês</span>
            </div>

            <ul className="space-y-3 text-xs text-[#F7F2E9]/80 border-t border-[#2A4A37] pt-4">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#22C55E]" /> Até 30 clientes / CPFs gerenciados
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#22C55E]" /> Portal do cliente com upload individual
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#22C55E]" /> Exportação pré-formatada para o PGD
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#22C55E]" /> Log de auditoria para escritório contábil
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#22C55E]" /> Suporte prioritário via WhatsApp
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-[#2A4A37]">
            {perfil.planoAtual === 'profissional' ? (
              <div className="w-full py-3 rounded-xl bg-[#22C55E]/20 text-[#22C55E] text-center text-xs font-bold border border-[#22C55E]/40 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Plano Ativo
              </div>
            ) : (
              <button
                onClick={() => handleAbrirCheckout('profissional')}
                className="w-full py-2.5 rounded-xl bg-[#172E22] hover:bg-[#254534] text-[#F7F2E9] text-xs font-semibold border border-[#2A4A37] transition-colors cursor-pointer"
              >
                Assinar Profissional
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SIMULATED CHECKOUT MODAL */}
      {modalCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#1E3A2B] border border-[#2A4A37] rounded-2xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#2A4A37]">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-[#D4873F]" />
                <h3 className="text-base font-serif font-bold text-[#F7F2E9]">
                  Checkout Simulado: Plano {planoSelecionado === 'premium' ? 'Premium' : 'Profissional'}
                </h3>
              </div>
              <button
                onClick={() => setModalCheckout(false)}
                className="p-1 text-[#A9BEB0] hover:text-[#F7F2E9]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {sucessoPagamento ? (
              <div className="py-8 text-center space-y-3 animate-in zoom-in-95 duration-200">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-serif font-bold text-[#F7F2E9]">
                  Plano Ativado com Sucesso!
                </h4>
                <p className="text-xs text-[#A9BEB0]">
                  Você agora possui acesso irrestrito aos recursos do plano {planoSelecionado}.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Method selector */}
                <div className="flex p-1 bg-[#172E22] border border-[#2A4A37] rounded-xl text-xs">
                  <button
                    type="button"
                    onClick={() => setMetodoPagamento('pix')}
                    className={`flex-1 py-2 font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      metodoPagamento === 'pix'
                        ? 'bg-[#1E3A2B] text-[#D4873F]'
                        : 'text-[#A9BEB0]'
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Pix Instantâneo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMetodoPagamento('cartao')}
                    className={`flex-1 py-2 font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      metodoPagamento === 'cartao'
                        ? 'bg-[#1E3A2B] text-[#D4873F]'
                        : 'text-[#A9BEB0]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Cartão de Crédito</span>
                  </button>
                </div>

                {metodoPagamento === 'pix' ? (
                  <div className="p-4 bg-[#172E22] rounded-xl border border-[#2A4A37] flex flex-col items-center text-center space-y-3">
                    {/* Simulated QR Code graphic */}
                    <div className="w-36 h-36 bg-white p-2 rounded-xl flex items-center justify-center shadow-md">
                      <div className="w-full h-full border-4 border-black grid grid-cols-6 gap-1 p-1">
                        <div className="bg-black col-span-2 row-span-2"></div>
                        <div className="bg-black col-span-2"></div>
                        <div className="bg-black col-span-2 row-span-2"></div>
                        <div className="bg-black col-span-2"></div>
                        <div className="bg-black col-span-2"></div>
                        <div className="bg-black col-span-2 row-span-2"></div>
                        <div className="bg-black col-span-2"></div>
                        <div className="bg-black col-span-2 row-span-2"></div>
                      </div>
                    </div>

                    <button
                      onClick={handleCopiarPix}
                      className="px-3 py-1.5 rounded-lg bg-[#1E3A2B] hover:bg-[#254534] border border-[#2A4A37] text-xs text-[#F7F2E9] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5 text-[#D4873F]" />
                      <span>{copiadoPix ? 'Código Pix Copiado!' : 'Copiar Chave Pix'}</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-4 bg-[#172E22] rounded-xl border border-[#2A4A37] space-y-3 text-xs">
                    <div>
                      <span className="text-[#A9BEB0] block text-[10px]">Número do Cartão (Simulado)</span>
                      <input
                        type="text"
                        disabled
                        value="•••• •••• •••• 4242"
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-[#1E3A2B] border border-[#2A4A37] text-[#F7F2E9] font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[#A9BEB0] block text-[10px]">Validade</span>
                        <input
                          type="text"
                          disabled
                          value="12/28"
                          className="w-full mt-1 px-3 py-2 rounded-lg bg-[#1E3A2B] border border-[#2A4A37] text-[#F7F2E9] font-mono"
                        />
                      </div>
                      <div>
                        <span className="text-[#A9BEB0] block text-[10px]">CVV</span>
                        <input
                          type="text"
                          disabled
                          value="•••"
                          className="w-full mt-1 px-3 py-2 rounded-lg bg-[#1E3A2B] border border-[#2A4A37] text-[#F7F2E9] font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-3 bg-[#172E22] rounded-xl border border-[#2A4A37] text-[11px] text-[#A9BEB0]">
                  💡 <strong>Ambiente de Demonstração:</strong> Nenhum débito bancário real será efetuado. Ao clicar no botão abaixo, a liberação do plano será simulada instantaneamente.
                </div>

                <button
                  type="button"
                  onClick={handleConfirmarPagamentoSimulado}
                  disabled={processandoPagamento}
                  className="w-full py-3 rounded-xl bg-[#D4873F] hover:bg-[#E5964E] text-[#172E22] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  {processandoPagamento ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#172E22] border-t-transparent rounded-full animate-spin" />
                      <span>Confirmando Recebimento...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirmar Pagamento Simulado</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
