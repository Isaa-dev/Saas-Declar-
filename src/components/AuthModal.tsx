import React, { useState } from 'react';
import { X, Shield, Lock, Mail, Smartphone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Logo } from './Logo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string, nome?: string) => void;
  initialMode?: 'login' | 'cadastro';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialMode = 'login'
}) => {
  const [mode, setMode] = useState<'login' | 'cadastro'>(initialMode);
  const [step, setStep] = useState<'credentials' | '2fa'>('credentials');
  
  // Form states
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('lucas.cavalcanti@exemplo.com.br');
  const [senha, setSenha] = useState('********');
  const [cpf, setCpf] = useState('348.519.208-72');
  const [codigo2fa, setCodigo2fa] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const handleSubmitCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Advance to simulated 2FA step
    setStep('2fa');
  };

  const handle2faDigitChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const updated = [...codigo2fa];
    updated[index] = val;
    setCodigo2fa(updated);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`2fa-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify2fa = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onSuccess(email, mode === 'cadastro' ? (nome || 'Novo Usuário') : 'Lucas Cavalcanti Silva');
      onClose();
    }, 900);
  };

  const handleQuickBypass2fa = () => {
    setCodigo2fa(['7', '4', '1', '9', '2', '0']);
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onSuccess(email, mode === 'cadastro' ? (nome || 'Novo Usuário') : 'Lucas Cavalcanti Silva');
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#1E3A2B] border border-[#2A4A37] rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#2A4A37] bg-[#172E22]">
          <Logo size="sm" />
          <button
            onClick={onClose}
            className="p-1.5 text-[#A9BEB0] hover:text-[#F7F2E9] rounded-lg hover:bg-[#254534] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {step === 'credentials' ? (
            <div>
              {/* Tab Selector */}
              <div className="flex p-1 mb-6 bg-[#172E22] border border-[#2A4A37] rounded-xl">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    mode === 'login'
                      ? 'bg-[#1E3A2B] text-[#F7F2E9] shadow-xs'
                      : 'text-[#A9BEB0] hover:text-[#F7F2E9]'
                  }`}
                >
                  Entrar
                </button>
                <button
                  type="button"
                  onClick={() => setMode('cadastro')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    mode === 'cadastro'
                      ? 'bg-[#1E3A2B] text-[#F7F2E9] shadow-xs'
                      : 'text-[#A9BEB0] hover:text-[#F7F2E9]'
                  }`}
                >
                  Criar conta
                </button>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-serif font-bold text-[#F7F2E9]">
                  {mode === 'login' ? 'Acesse seu painel fiscal' : 'Comece a organizar seu IRPF'}
                </h3>
                <p className="text-xs text-[#A9BEB0]">
                  {mode === 'login' 
                    ? 'Seus dados protegidos e organizados para a declaração.' 
                    : 'Conta gratuita com até 5 documentos e checklist completo.'}
                </p>
              </div>

              <form onSubmit={handleSubmitCredentials} className="space-y-4">
                {mode === 'cadastro' && (
                  <div>
                    <label className="block text-xs font-medium text-[#A9BEB0] mb-1">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Lucas Cavalcanti Silva"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#172E22] border border-[#2A4A37] text-sm text-[#F7F2E9] focus:outline-hidden focus:border-[#D4873F]"
                    />
                  </div>
                )}

                {mode === 'cadastro' && (
                  <div>
                    <label className="block text-xs font-medium text-[#A9BEB0] mb-1">
                      CPF (para confrontação de informes)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="000.000.000-00"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#172E22] border border-[#2A4A37] text-sm text-[#F7F2E9] font-mono focus:outline-hidden focus:border-[#D4873F]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-[#A9BEB0] mb-1 flex items-center justify-between">
                    <span>E-mail cadastrado</span>
                    <span className="text-[10px] text-[#D4873F]">Demo pré-preenchido</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#A9BEB0] absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#172E22] border border-[#2A4A37] text-sm text-[#F7F2E9] focus:outline-hidden focus:border-[#D4873F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#A9BEB0] mb-1 flex items-center justify-between">
                    <span>Senha</span>
                    {mode === 'login' && (
                      <span className="text-[11px] text-[#D4873F] hover:underline cursor-pointer">
                        Esqueceu?
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#A9BEB0] absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#172E22] border border-[#2A4A37] text-sm text-[#F7F2E9] focus:outline-hidden focus:border-[#D4873F]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 rounded-xl bg-[#D4873F] hover:bg-[#E5964E] text-[#172E22] font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <span>Continuar para verificação</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-4 pt-4 border-t border-[#2A4A37] text-center">
                <p className="text-[11px] text-[#A9BEB0]">
                  Ambiente de demonstração comercial. Nenhum dado sensível real é transmitido externamente.
                </p>
              </div>
            </div>
          ) : (
            /* 2FA Step */
            <div>
              <div className="text-center mb-6">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-[#D4873F]/20 border border-[#D4873F]/40 flex items-center justify-center text-[#D4873F] mb-3">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-serif font-bold text-[#F7F2E9]">
                  Autenticação em Dois Fatores (2FA)
                </h3>
                <p className="text-xs text-[#A9BEB0] mt-1">
                  Simulação de segurança: enviamos um código de 6 dígitos via WhatsApp/SMS para o número terminado em <strong>**20</strong>.
                </p>
              </div>

              <form onSubmit={handleVerify2fa} className="space-y-6">
                <div className="flex justify-center gap-2">
                  {codigo2fa.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`2fa-input-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handle2faDigitChange(idx, e.target.value)}
                      className="w-11 h-12 text-center text-lg font-mono font-bold rounded-xl bg-[#172E22] border border-[#2A4A37] text-[#F7F2E9] focus:outline-hidden focus:border-[#D4873F]"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-[#A9BEB0]">
                  <span>Não recebeu o SMS?</span>
                  <button 
                    type="button" 
                    onClick={handleQuickBypass2fa}
                    className="text-[#D4873F] hover:underline font-medium"
                  >
                    Preencher automático (Demo)
                  </button>
                </div>

                <div className="space-y-2">
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="w-full py-3 rounded-xl bg-[#D4873F] hover:bg-[#E5964E] text-[#172E22] font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isVerifying ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-[#172E22] border-t-transparent rounded-full animate-spin"></div>
                        Validando token...
                      </span>
                    ) : (
                      <>
                        <Shield className="w-4 h-4" />
                        <span>Confirmar e Acessar Declarô</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep('credentials')}
                    className="w-full py-2 text-xs text-[#A9BEB0] hover:text-[#F7F2E9] transition-colors"
                  >
                    Voltar para dados de acesso
                  </button>
                </div>
              </form>

              <div className="mt-4 p-3 bg-[#172E22] rounded-xl border border-[#2A4A37] flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                <p className="text-[11px] text-[#A9BEB0]">
                  A 2FA é simulada para validação de produto e fluxo de usuário, em conformidade com as diretrizes do MVP.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
