import React, { useState, useMemo } from 'react';
import { 
  Receipt, 
  Search, 
  Filter, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Plus, 
  ArrowUpDown, 
  Info,
  Scale,
  X
} from 'lucide-react';
import { GastoRegistro, CategoriaGasto, StatusGasto } from '../types';

interface GastosViewProps {
  gastos: GastoRegistro[];
  onAdicionarGasto: (novoGasto: GastoRegistro) => void;
  onOpenRegras: () => void;
}

export const GastosView: React.FC<GastosViewProps> = ({
  gastos,
  onAdicionarGasto,
  onOpenRegras,
}) => {
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('Todas');
  const [statusFiltro, setStatusFiltro] = useState<string>('Todos');
  const [busca, setBusca] = useState('');
  const [detalheGasto, setDetalheGasto] = useState<GastoRegistro | null>(null);
  const [modalNovoGasto, setModalNovoGasto] = useState(false);

  // New manual expense form state
  const [novoEstabelecimento, setNovoEstabelecimento] = useState('');
  const [novoValor, setNovoValor] = useState('');
  const [novaData, setNovaData] = useState('15/07/2025');
  const [novaCategoria, setNovaCategoria] = useState<CategoriaGasto>('Saúde');
  const [novoDocOrigem, setNovoDocOrigem] = useState('');

  const categoriasDisponiveis = [
    'Todas',
    'Saúde',
    'Educação',
    'Dependentes',
    'Previdência PGBL',
    'Doações Incentivadas',
    'Outros'
  ];

  const gastosFiltrados = useMemo(() => {
    return gastos.filter((item) => {
      const matchCat = categoriaFiltro === 'Todas' || item.categoria === categoriaFiltro;
      const matchStatus = statusFiltro === 'Todos' || item.status === statusFiltro;
      const matchBusca = 
        item.estabelecimento.toLowerCase().includes(busca.toLowerCase()) ||
        item.classificacao.toLowerCase().includes(busca.toLowerCase()) ||
        item.justificativa.toLowerCase().includes(busca.toLowerCase()) ||
        item.documentoOrigem.toLowerCase().includes(busca.toLowerCase());
      return matchCat && matchStatus && matchBusca;
    });
  }, [gastos, categoriaFiltro, statusFiltro, busca]);

  const totalFiltrado = gastosFiltrados.reduce((acc, curr) => acc + curr.valor, 0);

  const handleSalvarNovoGasto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoEstabelecimento || !novoValor) return;

    const valorNum = parseFloat(novoValor.replace(',', '.'));
    const docNome = novoDocOrigem || 'Recibo_Manual_Avulso.pdf';

    const novo: GastoRegistro = {
      id: `gasto-${Date.now()}`,
      data: novaData,
      estabelecimento: novoEstabelecimento,
      documentoOrigem: docNome,
      categoria: novaCategoria,
      valor: valorNum,
      classificacao: `Despesa com ${novaCategoria}`,
      justificativa: `Pode ser elegível, confira os requisitos legais da Receita Federal e a idoneidade fiscal do comprovante (Doc: ${docNome}).`,
      status: 'confirmado',
      beneficiario: 'Titular',
      baseLegal: 'Lei nº 9.250/1995',
    };

    onAdicionarGasto(novo);
    setModalNovoGasto(false);
    setNovoEstabelecimento('');
    setNovoValor('');
    setNovoDocOrigem('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#D4873F]">
            Mapeamento Fiscal Rastreável
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#F7F2E9]">
            Análise de Gastos & Comprovantes
          </h1>
          <p className="text-xs text-[#A9BEB0] mt-1">
            Cada lançamento possui referência expressa ao documento de origem e fundamentação nas normas da Receita Federal.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setModalNovoGasto(true)}
            className="px-4 py-2 rounded-xl bg-[#D4873F] hover:bg-[#E5964E] text-[#172E22] font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Lançar Gasto Manual</span>
          </button>
        </div>
      </div>

      {/* Mandatory Content Guideline Alert Callout */}
      <div className="p-4 rounded-xl bg-[#1E3A2B] border border-[#2A4A37] flex items-start gap-3">
        <Scale className="w-5 h-5 text-[#D4873F] shrink-0 mt-0.5" />
        <div className="text-xs text-[#A9BEB0] space-y-1">
          <p>
            <strong className="text-[#F7F2E9]">Critério Técnico Declarô:</strong> Nenhuma linha nesta tabela afirma de forma absoluta que um gasto <em>&quot;é dedutível&quot;</em>. 
            Todos os itens são avaliados como <span className="text-[#D4873F] font-semibold">&quot;pode ser elegível, confira os requisitos&quot;</span> com indicação do documento comprobatório original, protegendo você contra autuações.
          </p>
        </div>
      </div>

      {/* FILTERS & SEARCH BAR */}
      <div className="p-4 rounded-2xl bg-[#1E3A2B] border border-[#2A4A37] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {categoriasDisponiveis.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaFiltro(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                categoriaFiltro === cat
                  ? 'bg-[#D4873F] text-[#172E22] font-bold shadow-xs'
                  : 'bg-[#172E22] text-[#A9BEB0] hover:text-[#F7F2E9] border border-[#2A4A37]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-[#A9BEB0] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por médico, colégio, doc..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#172E22] border border-[#2A4A37] text-xs text-[#F7F2E9] focus:outline-hidden focus:border-[#D4873F]"
          />
        </div>
      </div>

      {/* TABLE SUMMARY BAR */}
      <div className="flex items-center justify-between px-2 text-xs text-[#A9BEB0]">
        <span>
          Mostrando <strong className="text-[#F7F2E9]">{gastosFiltrados.length}</strong> de {gastos.length} lançamentos
        </span>
        <span>
          Total da seleção:{' '}
          <strong className="text-[#D4873F] font-mono text-sm">
            R$ {totalFiltrado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </strong>
        </span>
      </div>

      {/* EXPENSES TABLE */}
      <div className="border border-[#2A4A37] rounded-2xl overflow-hidden bg-[#1E3A2B] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#2A4A37] bg-[#172E22] text-[#A9BEB0] uppercase font-mono text-[10px]">
                <th className="py-3 px-4">Data</th>
                <th className="py-3 px-4">Estabelecimento / Prestador</th>
                <th className="py-3 px-4">Categoria</th>
                <th className="py-3 px-4">Classificação</th>
                <th className="py-3 px-4 min-w-[280px]">Justificativa & Requisitos</th>
                <th className="py-3 px-4 text-right">Valor</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A4A37]">
              {gastosFiltrados.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => setDetalheGasto(item)}
                  className="hover:bg-[#254534]/50 transition-colors cursor-pointer group"
                >
                  {/* Data */}
                  <td className="py-3.5 px-4 font-mono text-[#A9BEB0] whitespace-nowrap">
                    {item.data}
                  </td>

                  {/* Estabelecimento */}
                  <td className="py-3.5 px-4 font-medium text-[#F7F2E9]">
                    <div className="font-semibold text-xs group-hover:text-[#D4873F] transition-colors">
                      {item.estabelecimento}
                    </div>
                    {item.cnpjCpfEmissor && (
                      <div className="text-[10px] font-mono text-[#A9BEB0]">
                        CPF/CNPJ: {item.cnpjCpfEmissor}
                      </div>
                    )}
                  </td>

                  {/* Categoria */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="text-[11px] font-medium text-[#A9BEB0]">
                      {item.categoria}
                    </span>
                  </td>

                  {/* Classificação */}
                  <td className="py-3.5 px-4 text-[#F7F2E9] whitespace-nowrap">
                    <span className="text-xs">{item.classificacao}</span>
                    {item.beneficiario && (
                      <span className="text-[10px] text-[#A9BEB0] block">
                        Beneficiário: {item.beneficiario}
                      </span>
                    )}
                  </td>

                  {/* Justificativa (com strict requirement) */}
                  <td className="py-3.5 px-4 text-[#A9BEB0] leading-relaxed">
                    <p className="line-clamp-2 text-[11px]">
                      {item.justificativa}
                    </p>
                    <span className="text-[10px] font-mono text-[#D4873F] block mt-0.5">
                      📄 {item.documentoOrigem}
                    </span>
                  </td>

                  {/* Valor */}
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-sm text-[#F7F2E9] whitespace-nowrap">
                    R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    {item.status === 'confirmado' && (
                      <span className="text-[10px] font-semibold text-[#22C55E] flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Confirmado
                      </span>
                    )}
                    {item.status === 'alerta' && (
                      <span className="text-[10px] font-semibold text-[#EF4444] flex items-center justify-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Alerta
                      </span>
                    )}
                    {item.status === 'em_revisao' && (
                      <span className="text-[10px] font-semibold text-[#EAB308] flex items-center justify-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        Em Revisão
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL MODAL / DRAWER FOR SELECTED EXPENSE */}
      {detalheGasto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#1E3A2B] border border-[#2A4A37] rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-[#2A4A37]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4873F]">
                  Ficha de Auditoria Fiscal
                </span>
                <h3 className="text-base font-serif font-bold text-[#F7F2E9]">
                  {detalheGasto.estabelecimento}
                </h3>
              </div>
              <button
                onClick={() => setDetalheGasto(null)}
                className="p-1.5 text-[#A9BEB0] hover:text-[#F7F2E9] rounded-lg hover:bg-[#172E22]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#172E22] border border-[#2A4A37]">
                <span className="text-[#A9BEB0] block text-[10px]">Data do Pagamento</span>
                <span className="font-mono font-medium text-[#F7F2E9]">{detalheGasto.data}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#172E22] border border-[#2A4A37]">
                <span className="text-[#A9BEB0] block text-[10px]">Valor Registrado</span>
                <span className="font-mono font-bold text-[#D4873F] text-sm">
                  R$ {detalheGasto.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#172E22] border border-[#2A4A37]">
                <span className="text-[#A9BEB0] block text-[10px]">Categoria & Classificação</span>
                <span className="font-medium text-[#F7F2E9]">{detalheGasto.categoria} · {detalheGasto.classificacao}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#172E22] border border-[#2A4A37]">
                <span className="text-[#A9BEB0] block text-[10px]">Beneficiário Declarado</span>
                <span className="font-medium text-[#F7F2E9]">{detalheGasto.beneficiario || 'Titular'}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#172E22] border border-[#2A4A37] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[#D4873F] font-semibold block">
                Parecer de Elegibilidade Fiscal
              </span>
              <p className="text-xs text-[#F7F2E9]/90 leading-relaxed">
                {detalheGasto.justificativa}
              </p>
              {detalheGasto.baseLegal && (
                <div className="text-[11px] text-[#A9BEB0] pt-2 border-t border-[#2A4A37]">
                  <strong>Fundamento Legal:</strong> {detalheGasto.baseLegal}
                </div>
              )}
            </div>

            <div className="p-3 bg-[#172E22] rounded-xl border border-[#2A4A37] flex items-center justify-between text-xs">
              <span className="text-[#A9BEB0]">Documento de Origem:</span>
              <span className="font-mono text-[#D4873F]">{detalheGasto.documentoOrigem}</span>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setDetalheGasto(null)}
                className="px-4 py-2 rounded-xl bg-[#D4873F] text-[#172E22] font-semibold text-xs hover:bg-[#E5964E] transition-colors"
              >
                Concluir Visualização
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEW MANUAL EXPENSE MODAL */}
      {modalNovoGasto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#1E3A2B] border border-[#2A4A37] rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#2A4A37] mb-4">
              <h3 className="text-base font-serif font-bold text-[#F7F2E9]">
                Lançar Despesa com Comprovante
              </h3>
              <button
                onClick={() => setModalNovoGasto(false)}
                className="p-1.5 text-[#A9BEB0] hover:text-[#F7F2E9]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSalvarNovoGasto} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#A9BEB0] mb-1">
                  Nome do Estabelecimento / Médico / Instituição
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Clínica Odontológica Dr. Silva"
                  value={novoEstabelecimento}
                  onChange={(e) => setNovoEstabelecimento(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#172E22] border border-[#2A4A37] text-xs text-[#F7F2E9] focus:outline-hidden focus:border-[#D4873F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#A9BEB0] mb-1">
                    Valor (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="0,00"
                    value={novoValor}
                    onChange={(e) => setNovoValor(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#172E22] border border-[#2A4A37] text-xs text-[#F7F2E9] font-mono focus:outline-hidden focus:border-[#D4873F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#A9BEB0] mb-1">
                    Data do Pagamento
                  </label>
                  <input
                    type="text"
                    required
                    value={novaData}
                    onChange={(e) => setNovaData(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#172E22] border border-[#2A4A37] text-xs text-[#F7F2E9] font-mono focus:outline-hidden focus:border-[#D4873F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#A9BEB0] mb-1">
                  Categoria
                </label>
                <select
                  value={novaCategoria}
                  onChange={(e) => setNovaCategoria(e.target.value as CategoriaGasto)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#172E22] border border-[#2A4A37] text-xs text-[#F7F2E9] focus:outline-hidden focus:border-[#D4873F]"
                >
                  <option value="Saúde">Saúde (consultas, exames, dentistas)</option>
                  <option value="Educação">Educação (escola, graduação, pós)</option>
                  <option value="Previdência PGBL">Previdência PGBL (plano complementar)</option>
                  <option value="Doações Incentivadas">Doações Incentivadas (FCA, idoso)</option>
                  <option value="Dependentes">Dependentes</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#A9BEB0] mb-1">
                  Nome do Documento / Comprovante Anexado
                </label>
                <input
                  type="text"
                  placeholder="Ex: Recibo_Consulta_Ortopedia.pdf"
                  value={novoDocOrigem}
                  onChange={(e) => setNovoDocOrigem(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#172E22] border border-[#2A4A37] text-xs text-[#F7F2E9] font-mono focus:outline-hidden focus:border-[#D4873F]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalNovoGasto(false)}
                  className="px-4 py-2 rounded-xl text-xs text-[#A9BEB0] hover:text-[#F7F2E9]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D4873F] hover:bg-[#E5964E] text-[#172E22] font-semibold text-xs transition-colors"
                >
                  Salvar Lançamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
