export type CategoriaGasto = 
  | 'Saúde' 
  | 'Educação' 
  | 'Dependentes' 
  | 'Previdência PGBL' 
  | 'Doações Incentivadas' 
  | 'Livro-Caixa' 
  | 'Outros';

export type StatusGasto = 'analisado' | 'em_revisao' | 'alerta' | 'confirmado';

export interface GastoRegistro {
  id: string;
  data: string;
  estabelecimento: string;
  documentoOrigem: string;
  categoria: CategoriaGasto;
  valor: number;
  classificacao: string;
  justificativa: string; // "pode ser elegível, confira os requisitos..."
  status: StatusGasto;
  cnpjCpfEmissor?: string;
  beneficiario?: string;
  baseLegal?: string;
}

export type SeveridadeInconsistencia = 'atencao' | 'moderada' | 'alta';

export interface Inconsistencia {
  id: string;
  titulo: string;
  descricao: string;
  documentosEnvolvidos: string[];
  severidade: SeveridadeInconsistencia;
  impactoEstimado: string;
  resolvido: boolean;
  sugestaoAcao: string;
  categoria: 'duplicidade' | 'cpf' | 'comprovante' | 'declaracao';
}

export interface DocumentoUpload {
  id: string;
  nomeArquivo: string;
  tipo: 'informe_rendimento' | 'recibo_medico' | 'comprovante_educacao' | 'extrato_previdencia' | 'outro';
  tamanhoKb: number;
  dataEnvio: string;
  statusProcessamento: 'concluido' | 'processando' | 'com_alerta';
  camposExtraidos: {
    emissor: string;
    cnpjCpf: string;
    anoExercicio: string;
    valorPrincipal: number;
    categoriaSugerida: CategoriaGasto;
    potencialDeducao: boolean;
  };
}

export type StatusChecklist = 'concluido' | 'pendente' | 'faltando';

export interface ItemChecklist {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  status: StatusChecklist;
  documentoVinculado?: string;
  acaoRecomendada: string;
}

export interface Dependente {
  id: string;
  nome: string;
  parentesco: 'Filho(a)' | 'Cônjuge' | 'Pai/Mãe' | 'Enteado(a)' | 'Outro';
  cpf: string;
  dataNascimento: string;
  rendimentoProprio: boolean;
  valorRendimento?: number;
}

export interface PerfilUsuario {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  ocupacao: string;
  planoAtual: 'gratis' | 'premium' | 'profissional';
  dependentes: Dependente[];
  onboardingCompleto: boolean;
}

export interface SimuladorData {
  rendimentosTributaveis: number;
  despesasSaude: number;
  despesasEducacao: number;
  previdenciaPgbl: number;
  outrasDeducoes: number;
  numDependentes: number;
  impostoRetidoFonte: number;
}

export interface ChatMensagem {
  id: string;
  remetente: 'usuario' | 'declaro';
  texto: string;
  timestamp: string;
  referenciaLegal?: string;
  sugestoesRelacionadas?: string[];
}
