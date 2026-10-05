import React, { useState } from 'react';
import { 
  User, 
  Users, 
  Save, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ShieldCheck, 
  Bell, 
  FileText,
  AlertTriangle
} from 'lucide-react';
import { PerfilUsuario, Dependente } from '../types';

interface PerfilViewProps {
  perfil: PerfilUsuario;
  onSalvarPerfil: (perfilAtualizado: PerfilUsuario) => void;
}

export const PerfilView: React.FC<PerfilViewProps> = ({ perfil, onSalvarPerfil }) => {
  const [nome, setNome] = useState(perfil.nome);
  const [cpf, setCpf] = useState(perfil.cpf);
  const [email, setEmail] = useState(perfil.email);
  const [telefone, setTelefone] = useState(perfil.telefone);
  const [ocupacao, setOcupacao] = useState(perfil.ocupacao);
  const [dependentes, setDependentes] = useState<Dependente[]>(perfil.dependentes);
  const [salvoComSucesso, setSalvoComSucesso] = useState(false);

  // New dependent modal/drawer
  const [modalNovoDependente, setModalNovoDependente] = useState(false);
  const [novoDepNome, setNovoDepNome] = useState('');
  const [novoDepParentesco, setNovoDepParentesco] = useState<Dependente['parentesco']>('Filho(a)');
  const [novoDepCpf, setNovoDepCpf] = useState('');
  const [novoDepNasc, setNovoDepNasc] = useState('2018-05-10');
  const [novoDepRendimento, setNovoDepRendimento] = useState(false);
  const [novoDepValorRend, setNovoDepValorRend] = useState('');

  const handleSalvarTudo = (e: React.FormEvent) => {
    e.preventDefault();
    const atualizado: PerfilUsuario = {
      ...perfil,
      nome,
      cpf,
      email,
      telefone,
      ocupacao,
      dependentes,
    };
    onSalvarPerfil(atualizado);
    setSalvoComSucesso(true);
    setTimeout(() => setSalvoComSucesso(false), 2500);
  };

  const handleRemoverDependente = (id: string) => {
    setDependentes(dependentes.filter(d => d.id !== id));
  };

  const handleAdicionarDependente = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoDepNome || !novoDepCpf) return;

    const novo: Dependente = {
      id: `dep-${Date.now()}`,
      nome: novoDepNome,
      parentesco: novoDepParentesco,
      cpf: novoDepCpf,
      dataNascimento: novoDepNasc,
      rendimentoProprio: novoDepRendimento,
      valorRendimento: novoDepRendimento ? parseFloat(novoDepValorRend || '0') : undefined,
    };

    setDependentes([...dependentes, novo]);
    setModalNovoDependente(false);
    setNovoDepNome('');
    setNovoDepCpf('');
    setNovoDepRendimento(false);
    setNovoDepValorRend('');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#2A4A37] gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#D4873F]">
            Cadastro do Contribuinte
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#F7F2E9]">
            Perfil & Configurações Fiscais
          </h1>
          <p className="text-xs text-[#A9BEB0] mt-1">
            Atualize seus dados pessoais e a relação de dependentes que impactam no cálculo do IRPF.
          </p>
        </div>

        {salvoComSucesso && (
          <div className="px-3.5 py-1.5 rounded-xl bg-[#22C55E]/20 text-[#22C55E] text-xs font-semibold flex items-center gap-1.5 border border-[#22C55E]/40 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Dados salvos com sucesso!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSalvarTudo} className="space-y-6">
        {/* DADOS PESSOAIS */}
        <div className="p-6 rounded-2xl bg-[#1E3A2B] border border-[#2A4A37] space-y-4">
          <h3 className="text-sm font-serif font-bold text-[#F7F2E9] flex items-center gap-2">
            <User className="w-4 h-4 text-[#D4873F]" />
            Dados Cadastrais do Titular
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#A9BEB0] mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#172E22] border border-[#2A4A37] text-xs text-[#F7F2E9] focus:outline-hidden focus:border-[#D4873F]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#A9BEB0] mb-1">
                CPF Oficial
              </label>
              <input
                type="text"
                required
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#172E22] border border-[#2A4A37] text-xs font-mono text-[#F7F2E9] focus:outline-hidden focus:border-[#D4873F]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#A9BEB0] mb-1">
                E-mail para Notificações Fiscais
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#172E22] border border-[#2A4A37] text-xs text-[#F7F2E9] focus:outline-hidden focus:border-[#D4873F]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#A9BEB0] mb-1">
                Telefone / WhatsApp (2FA)
              </label>
              <input
                type="text"
                required
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#172E22] border border-[#2A4A37] text-xs text-[#F7F2E9] font-mono focus:outline-hidden focus:border-[#D4873F]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[#A9BEB0] mb-1">
                Ocupação Principal / Regime
              </label>
              <input
                type="text"
                value={ocupacao}
                onChange={(e) => setOcupacao(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#172E22] border border-[#2A4A37] text-xs text-[#F7F2E9] focus:outline-hidden focus:border-[#D4873F]"
              />
            </div>
          </div>
        </div>

        {/* DEPENDENTES FISCAIS */}
        <div className="p-6 rounded-2xl bg-[#1E3A2B] border border-[#2A4A37] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-serif font-bold text-[#F7F2E9] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#D4873F]" />
                Dependentes Cadastrados ({dependentes.length})
              </h3>
              <p className="text-xs text-[#A9BEB0]">
                Cada dependente garante dedução legal de R$ 2.275,08 no modelo completo, além de permitir o abatimento de suas despesas com saúde e educação.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setModalNovoDependente(true)}
              className="px-3 py-1.5 rounded-lg bg-[#172E22] hover:bg-[#254534] border border-[#2A4A37] text-xs text-[#F7F2E9] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#D4873F]" />
              <span>Adicionar</span>
            </button>
          </div>

          <div className="divide-y divide-[#2A4A37] border border-[#2A4A37] rounded-xl overflow-hidden bg-[#172E22]">
            {dependentes.map((dep) => (
              <div
                key={dep.id}
                className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 font-medium text-[#F7F2E9]">
                    <span>{dep.nome}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-[#1E3A2B] text-[#D4873F]">
                      {dep.parentesco}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-[#A9BEB0] font-mono mt-0.5">
                    <span>CPF: {dep.cpf}</span>
                    <span>·</span>
                    <span>Nasc: {dep.dataNascimento}</span>
                    {dep.rendimentoProprio && (
                      <>
                        <span>·</span>
                        <span className="text-[#EAB308]">
                          Possui Rendimento Próprio (R$ {dep.valorRendimento?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoverDependente(dep.id)}
                  className="text-[#A9BEB0] hover:text-[#EF4444] transition-colors p-1 self-end sm:self-auto cursor-pointer"
                  title="Remover dependente"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SAVE BUTTON */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#D4873F] hover:bg-[#E5964E] text-[#172E22] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Alterações do Perfil</span>
          </button>
        </div>
      </form>

      {/* MODAL ADICIONAR DEPENDENTE */}
      {modalNovoDependente && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#1E3A2B] border border-[#2A4A37] rounded-2xl shadow-2xl p-6 space-y-4">
            <h3 className="text-base font-serif font-bold text-[#F7F2E9]">
              Cadastrar Novo Dependente Fiscal
            </h3>

            <form onSubmit={handleAdicionarDependente} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#A9BEB0] mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Mariana Cavalcanti Silva"
                  value={novoDepNome}
                  onChange={(e) => setNovoDepNome(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#172E22] border border-[#2A4A37] text-xs text-[#F7F2E9] focus:outline-hidden focus:border-[#D4873F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#A9BEB0] mb-1">
                    Parentesco
                  </label>
                  <select
                    value={novoDepParentesco}
                    onChange={(e) => setNovoDepParentesco(e.target.value as Dependente['parentesco'])}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#172E22] border border-[#2A4A37] text-xs text-[#F7F2E9] focus:outline-hidden focus:border-[#D4873F]"
                  >
                    <option value="Filho(a)">Filho(a)</option>
                    <option value="Cônjuge">Cônjuge / Companheiro(a)</option>
                    <option value="Pai/Mãe">Pai / Mãe</option>
                    <option value="Enteado(a)">Enteado(a)</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#A9BEB0] mb-1">
                    Data de Nascimento
                  </label>
                  <input
                    type="date"
                    required
                    value={novoDepNasc}
                    onChange={(e) => setNovoDepNasc(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#172E22] border border-[#2A4A37] text-xs text-[#F7F2E9] focus:outline-hidden focus:border-[#D4873F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#A9BEB0] mb-1">
                  CPF Obrigatório
                </label>
                <input
                  type="text"
                  required
                  placeholder="000.000.000-00"
                  value={novoDepCpf}
                  onChange={(e) => setNovoDepCpf(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#172E22] border border-[#2A4A37] text-xs font-mono text-[#F7F2E9] focus:outline-hidden focus:border-[#D4873F]"
                />
              </div>

              <div className="p-3 bg-[#172E22] rounded-xl border border-[#2A4A37] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#F7F2E9] font-medium">Possui rendimento próprio?</span>
                  <input
                    type="checkbox"
                    checked={novoDepRendimento}
                    onChange={(e) => setNovoDepRendimento(e.target.checked)}
                    className="w-4 h-4 accent-[#D4873F]"
                  />
                </div>

                {novoDepRendimento && (
                  <input
                    type="number"
                    placeholder="Valor total recebido no ano (R$)"
                    value={novoDepValorRend}
                    onChange={(e) => setNovoDepValorRend(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#1E3A2B] border border-[#2A4A37] text-xs font-mono text-[#F7F2E9]"
                  />
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalNovoDependente(false)}
                  className="px-4 py-2 rounded-xl text-xs text-[#A9BEB0]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D4873F] text-[#172E22] font-semibold text-xs"
                >
                  Adicionar Dependente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
