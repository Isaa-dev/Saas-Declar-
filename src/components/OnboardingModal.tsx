import React, { useState } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Users, 
  Briefcase, 
  Building2, 
  TrendingUp, 
  Home, 
  HeartPulse, 
  GraduationCap, 
  Gift, 
  Check, 
  Sparkles 
} from 'lucide-react';
import { PerfilUsuario } from '../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: Partial<PerfilUsuario>) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  // Form states across the 8 stages
  const [dependentesCount, setDependentesCount] = useState(2);
  const [temConjuge, setTemConjuge] = useState(false);
  const [fontesRenda, setFontesRenda] = useState<string[]>(['CLT']);
  const [tipoTrabalho, setTipoTrabalho] = useState('Empregado com carteira assinada (CLT)');
  const [temInvestimentos, setTemInvestimentos] = useState<string[]>(['CDB / Renda Fixa', 'Ações B3']);
  const [temImoveis, setTemImoveis] = useState(true);
  const [temPlanoSaude, setTemPlanoSaude] = useState(true);
  const [temDespesasEducacao, setTemDespesasEducacao] = useState(true);
  const [temDoacoesPrevidencia, setTemDoacoesPrevidencia] = useState(true);

  if (!isOpen) return null;

  const steps = [
    {
      id: 'dependentes',
      titulo: 'Dependentes Fiscais',
      subtitulo: 'Filhos, enteados, cônjuge ou pais que você declara.',
      icon: Users,
    },
    {
      id: 'renda',
      titulo: 'Fontes de Renda',
      subtitulo: 'Selecione todas as origens dos seus recebimentos no ano.',
      icon: Briefcase,
    },
    {
      id: 'trabalho',
      titulo: 'Regime de Trabalho',
      subtitulo: 'Como você exerce sua principal atividade profissional?',
      icon: Building2,
    },
    {
      id: 'investimentos',
      titulo: 'Investimentos Financeiros',
      subtitulo: 'Onde seu patrimônio líquido esteve aplicado.',
      icon: TrendingUp,
    },
    {
      id: 'imoveis',
      titulo: 'Bens, Imóveis e Financiamentos',
      subtitulo: 'Veículos, imóveis quitados ou financiados pelo SFH.',
      icon: Home,
    },
    {
      id: 'saude',
      titulo: 'Plano de Saúde & Gastos Médicos',
      subtitulo: 'Consultas particulares, exames e coparticipações.',
      icon: HeartPulse,
    },
    {
      id: 'educacao',
      titulo: 'Educação & Instrução',
      subtitulo: 'Escola infantil, ensino fundamental/médio ou faculdade.',
      icon: GraduationCap,
    },
    {
      id: 'doacoes',
      titulo: 'Doações & Previdência Privada',
      subtitulo: 'Aportes em plano PGBL ou doações com incentivo fiscal.',
      icon: Gift,
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinalize();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinalize = () => {
    onComplete({
      onboardingCompleto: true,
      ocupacao: tipoTrabalho,
    });
    onClose();
  };

  const toggleArrayItem = (list: string[], item: string, setter: (val: string[]) => void) => {
    if (list.includes(item)) {
      setter(list.filter(x => x !== item));
    } else {
      setter([...list, item]);
    }
  };

  const StepIcon = steps[currentStep].icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#1E3A2B] border border-[#2A4A37] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header with step counter */}
        <div className="p-5 border-b border-[#2A4A37] bg-[#172E22] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4873F]/20 border border-[#D4873F]/40 flex items-center justify-center text-[#D4873F]">
              <StepIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#D4873F]">
                Etapa {currentStep + 1} de {steps.length}
              </span>
              <h2 className="text-base font-serif font-bold text-[#F7F2E9]">
                {steps[currentStep].titulo}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#A9BEB0] hover:text-[#F7F2E9] rounded-lg hover:bg-[#254534] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#172E22] h-1.5">
          <div
            className="h-full bg-[#D4873F] transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Step Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          <p className="text-xs text-[#A9BEB0]">
            {steps[currentStep].subtitulo}
          </p>

          {/* STEP 0: Dependentes */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#F7F2E9] mb-2">
                  Quantos dependentes você pretende incluir?
                </label>
                <div className="flex items-center gap-3">
                  {[0, 1, 2, 3, '4+'].map((num, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setDependentesCount(typeof num === 'number' ? num : 4)}
                      className={`flex-1 py-3 text-sm font-semibold rounded-xl border transition-all ${
                        (typeof num === 'number' ? dependentesCount === num : dependentesCount >= 4)
                          ? 'bg-[#D4873F] text-[#172E22] border-[#D4873F]'
                          : 'bg-[#172E22] text-[#F7F2E9] border-[#2A4A37] hover:border-[#D4873F]/50'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-[#172E22] rounded-xl border border-[#2A4A37] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-[#F7F2E9]">Possui cônjuge / companheiro(a)?</h4>
                  <p className="text-[11px] text-[#A9BEB0]">Pode declarar em conjunto ou separado.</p>
                </div>
                <input
                  type="checkbox"
                  checked={temConjuge}
                  onChange={(e) => setTemConjuge(e.target.checked)}
                  className="w-5 h-5 accent-[#D4873F] rounded cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* STEP 1: Fontes de Renda */}
          {currentStep === 1 && (
            <div className="space-y-2.5">
              {[
                { id: 'CLT', label: 'Salário de empresa privada ou pública (CLT / Servidor)' },
                { id: 'PJ', label: 'Empresa própria / Pró-labore ou Distribuição de Lucros (PJ)' },
                { id: 'Autonomo', label: 'Serviços prestados como profissional autônomo (Carnê-Leão)' },
                { id: 'Aluguel', label: 'Rendimentos de aluguéis de imóveis recebidos' },
                { id: 'Aposentadoria', label: 'Aposentadoria ou pensão pelo INSS / Previdência' },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleArrayItem(fontesRenda, item.id, setFontesRenda)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    fontesRenda.includes(item.id)
                      ? 'bg-[#254534] border-[#D4873F] text-[#F7F2E9]'
                      : 'bg-[#172E22] border-[#2A4A37] text-[#A9BEB0] hover:border-[#D4873F]/40'
                  }`}
                >
                  <span className="text-xs font-medium">{item.label}</span>
                  {fontesRenda.includes(item.id) && <Check className="w-4 h-4 text-[#D4873F]" />}
                </div>
              ))}
            </div>
          )}

          {/* STEP 2: Tipo de Trabalho */}
          {currentStep === 2 && (
            <div className="space-y-2.5">
              {[
                'Empregado com carteira assinada (CLT)',
                'Empresário individual / Sócio de empresa (PJ)',
                'Profissional liberal com Livro-Caixa (médico, advogado, arquiteto)',
                'Aposentado ou pensionista',
                'Múltiplos vínculos empregatícios no mesmo ano',
              ].map((regime) => (
                <div
                  key={regime}
                  onClick={() => setTipoTrabalho(regime)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    tipoTrabalho === regime
                      ? 'bg-[#254534] border-[#D4873F] text-[#F7F2E9]'
                      : 'bg-[#172E22] border-[#2A4A37] text-[#A9BEB0] hover:border-[#D4873F]/40'
                  }`}
                >
                  <span className="text-xs font-medium">{regime}</span>
                  {tipoTrabalho === regime && <Check className="w-4 h-4 text-[#D4873F]" />}
                </div>
              ))}
            </div>
          )}

          {/* STEP 3: Investimentos */}
          {currentStep === 3 && (
            <div className="space-y-2.5">
              {[
                'CDB / Renda Fixa / Tesouro Direto',
                'Ações B3 e Fundos Imobiliários (FIIs)',
                'Criptoativos e stablecoins (Bitcoin, Ethereum, USDT)',
                'Ativos no exterior (Offshores, Avenue, Nomad)',
                'Caderneta de Poupança tradicional',
              ].map((inv) => (
                <div
                  key={inv}
                  onClick={() => toggleArrayItem(temInvestimentos, inv, setTemInvestimentos)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    temInvestimentos.includes(inv)
                      ? 'bg-[#254534] border-[#D4873F] text-[#F7F2E9]'
                      : 'bg-[#172E22] border-[#2A4A37] text-[#A9BEB0] hover:border-[#D4873F]/40'
                  }`}
                >
                  <span className="text-xs font-medium">{inv}</span>
                  {temInvestimentos.includes(inv) && <Check className="w-4 h-4 text-[#D4873F]" />}
                </div>
              ))}
            </div>
          )}

          {/* STEP 4: Imóveis */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="p-4 bg-[#172E22] rounded-xl border border-[#2A4A37] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-[#F7F2E9]">Comprou, vendeu ou possui imóveis?</h4>
                  <p className="text-[11px] text-[#A9BEB0]">Casas, apartamentos, terrenos rurais ou urbanos.</p>
                </div>
                <input
                  type="checkbox"
                  checked={temImoveis}
                  onChange={(e) => setTemImoveis(e.target.checked)}
                  className="w-5 h-5 accent-[#D4873F] rounded cursor-pointer"
                />
              </div>

              <div className="p-4 bg-[#172E22] rounded-xl border border-[#2A4A37]">
                <h4 className="text-xs font-semibold text-[#F7F2E9] mb-1">Veículos automotores</h4>
                <p className="text-[11px] text-[#A9BEB0]">
                  Automóveis e motos adquiridos ou financiados devem constar pelo custo de aquisição histórico sem reavaliação de mercado pela tabela FIPE.
                </p>
              </div>
            </div>
          )}

          {/* STEP 5: Saúde */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="p-4 bg-[#172E22] rounded-xl border border-[#2A4A37] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-[#F7F2E9]">Possui plano de saúde contratado?</h4>
                  <p className="text-[11px] text-[#A9BEB0]">Individual ou empresarial com coparticipação.</p>
                </div>
                <input
                  type="checkbox"
                  checked={temPlanoSaude}
                  onChange={(e) => setTemPlanoSaude(e.target.checked)}
                  className="w-5 h-5 accent-[#D4873F] rounded cursor-pointer"
                />
              </div>

              <div className="p-3.5 bg-[#172E22] rounded-xl border border-[#2A4A37] text-xs text-[#A9BEB0]">
                💡 <strong className="text-[#F7F2E9]">Dica Fiscal:</strong> Guarde comprovantes de Pix ou transferência com a discriminação dos serviços e o CPF/CRM do profissional.
              </div>
            </div>
          )}

          {/* STEP 6: Educação */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <div className="p-4 bg-[#172E22] rounded-xl border border-[#2A4A37] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-[#F7F2E9]">Teve despesas com instrução formal?</h4>
                  <p className="text-[11px] text-[#A9BEB0]">Educação básica, superior, pós-graduação do titular ou dependentes.</p>
                </div>
                <input
                  type="checkbox"
                  checked={temDespesasEducacao}
                  onChange={(e) => setTemDespesasEducacao(e.target.checked)}
                  className="w-5 h-5 accent-[#D4873F] rounded cursor-pointer"
                />
              </div>

              <p className="text-[11px] text-[#A9BEB0] bg-[#172E22] p-3 rounded-xl border border-[#2A4A37]">
                ⚠️ Lembre-se: Cursos livres, idiomas, passagens e materiais escolares não podem ser abatidos.
              </p>
            </div>
          )}

          {/* STEP 7: Doações & Previdência */}
          {currentStep === 7 && (
            <div className="space-y-4">
              <div className="p-4 bg-[#172E22] rounded-xl border border-[#2A4A37] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-[#F7F2E9]">Contribuiu para Previdência PGBL?</h4>
                  <p className="text-[11px] text-[#A9BEB0]">Aportes até 12% da renda bruta podem ser elegíveis no modelo completo.</p>
                </div>
                <input
                  type="checkbox"
                  checked={temDoacoesPrevidencia}
                  onChange={(e) => setTemDoacoesPrevidencia(e.target.checked)}
                  className="w-5 h-5 accent-[#D4873F] rounded cursor-pointer"
                />
              </div>

              <div className="p-4 bg-[#172E22] rounded-xl border border-[#2A4A37]">
                <h4 className="text-xs font-semibold text-[#F7F2E9] mb-1">Doações aos Fundos dos Direitos</h4>
                <p className="text-[11px] text-[#A9BEB0]">
                  Fundos da Criança e do Adolescente (FCA/FUMCAD) e Idoso permitem abatimento direto do imposto devido.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#2A4A37] bg-[#172E22] flex items-center justify-between">
          {currentStep > 0 ? (
            <button
              onClick={handlePrev}
              className="px-4 py-2 rounded-xl text-xs font-medium text-[#A9BEB0] hover:text-[#F7F2E9] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>
          ) : (
            <button
              onClick={handleFinalize}
              className="text-[11px] text-[#A9BEB0] hover:text-[#D4873F] transition-colors cursor-pointer"
            >
              Pular onboarding (usar dados de exemplo)
            </button>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-[#D4873F] hover:bg-[#E5964E] text-[#172E22] font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <span>{currentStep === steps.length - 1 ? 'Concluir Perfil' : 'Avançar'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
