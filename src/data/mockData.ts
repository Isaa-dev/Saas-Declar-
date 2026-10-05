import { GastoRegistro, Inconsistencia, DocumentoUpload, ItemChecklist, PerfilUsuario, ChatMensagem } from '../types';

export const REGRAS_FISCAIS_VIGENTES = {
  anoCalendario: 2025,
  anoExercicio: 2026,
  limiteEducacaoIndividual: 3561.50,
  deducaoFixaDependente: 2275.08,
  limiteDescontoSimplificado: 16754.34,
  percentualDescontoSimplificado: 0.20,
  limitePgblRendaBruta: 0.12,
  baseLegal: 'Instrução Normativa RFB nº 1.500/2014 e Lei nº 9.250/1995 com atualizações'
};

export const MOCK_PERFIL_INICIAL: PerfilUsuario = {
  nome: 'Lucas Cavalcanti Silva',
  cpf: '348.***.***-72',
  email: 'lucas.cavalcanti@exemplo.com.br',
  telefone: '(11) 98452-1920',
  ocupacao: 'Engenheiro de Software Sênior (CLT)',
  planoAtual: 'gratis',
  onboardingCompleto: true,
  dependentes: [
    {
      id: 'dep-1',
      nome: 'Beatriz Cavalcanti Silva',
      parentesco: 'Filho(a)',
      cpf: '512.441.890-12',
      dataNascimento: '2016-04-14',
      rendimentoProprio: false
    },
    {
      id: 'dep-2',
      nome: 'Enzo Cavalcanti Silva',
      parentesco: 'Filho(a)',
      cpf: '488.219.008-55',
      dataNascimento: '2004-11-20',
      rendimentoProprio: true,
      valorRendimento: 8400.00
    }
  ]
};

export const MOCK_DOCUMENTOS_INICIAIS: DocumentoUpload[] = [
  {
    id: 'doc-1',
    nomeArquivo: 'Informe_Rendimentos_Empresa_2025.pdf',
    tipo: 'informe_rendimento',
    tamanhoKb: 245,
    dataEnvio: '2026-03-02 10:14',
    statusProcessamento: 'concluido',
    camposExtraidos: {
      emissor: 'Tech Solutions Brasil Ltda (Empregador)',
      cnpjCpf: '14.288.901/0001-44',
      anoExercicio: '2026 (Ano-calendário 2025)',
      valorPrincipal: 168400.00,
      categoriaSugerida: 'Outros',
      potencialDeducao: false
    }
  },
  {
    id: 'doc-2',
    nomeArquivo: 'Extrato_Anual_Bradesco_Saude_2025.pdf',
    tipo: 'recibo_medico',
    tamanhoKb: 412,
    dataEnvio: '2026-03-02 11:30',
    statusProcessamento: 'concluido',
    camposExtraidos: {
      emissor: 'Bradesco Saúde S.A.',
      cnpjCpf: '92.693.118/0001-60',
      anoExercicio: '2025',
      valorPrincipal: 8940.00,
      categoriaSugerida: 'Saúde',
      potencialDeducao: true
    }
  },
  {
    id: 'doc-3',
    nomeArquivo: 'Declaracao_Quitacao_Colegio_Santo_Agostinho.pdf',
    tipo: 'comprovante_educacao',
    tamanhoKb: 180,
    dataEnvio: '2026-03-03 09:45',
    statusProcessamento: 'concluido',
    camposExtraidos: {
      emissor: 'Sociedade Mineira de Educação - Colégio Sto. Agostinho',
      cnpjCpf: '17.221.455/0002-90',
      anoExercicio: '2025',
      valorPrincipal: 14200.00,
      categoriaSugerida: 'Educação',
      potencialDeducao: true
    }
  },
  {
    id: 'doc-4',
    nomeArquivo: 'Extrato_Aportes_PGBL_Brasilprev_2025.pdf',
    tipo: 'extrato_previdencia',
    tamanhoKb: 310,
    dataEnvio: '2026-03-03 14:20',
    statusProcessamento: 'concluido',
    camposExtraidos: {
      emissor: 'Brasilprev Seguros e Previdência S.A.',
      cnpjCpf: '27.665.207/0001-31',
      anoExercicio: '2025',
      valorPrincipal: 15000.00,
      categoriaSugerida: 'Previdência PGBL',
      potencialDeducao: true
    }
  },
  {
    id: 'doc-5',
    nomeArquivo: 'Recibo_Consulta_Ortopedia_Dr_Lucas.pdf',
    tipo: 'recibo_medico',
    tamanhoKb: 154,
    dataEnvio: '2026-03-04 16:05',
    statusProcessamento: 'concluido',
    camposExtraidos: {
      emissor: 'Dr. Lucas Arantes de Paula (CRM-SP 148.902)',
      cnpjCpf: '298.411.008-99',
      anoExercicio: '2025',
      valorPrincipal: 650.00,
      categoriaSugerida: 'Saúde',
      potencialDeducao: true
    }
  }
];

export const MOCK_GASTOS: GastoRegistro[] = [
  {
    id: 'gasto-1',
    data: '15/01/2025',
    estabelecimento: 'Bradesco Saúde S.A.',
    documentoOrigem: 'Extrato_Anual_Bradesco_Saude_2025.pdf',
    categoria: 'Saúde',
    valor: 8940.00,
    classificacao: 'Plano de Saúde Familiar',
    justificativa: 'Pode ser elegível para dedução integral na declaração completa, confira se não houve reembolso parcial pela empresa contratante (Doc: Extrato_Anual_Bradesco_Saude_2025.pdf).',
    status: 'confirmado',
    cnpjCpfEmissor: '92.693.118/0001-60',
    beneficiario: 'Titular e dependentes',
    baseLegal: 'Art. 8º da Lei nº 9.250/1995'
  },
  {
    id: 'gasto-2',
    data: '10/02/2025',
    estabelecimento: 'Colégio Santo Agostinho',
    documentoOrigem: 'Declaracao_Quitacao_Colegio_Santo_Agostinho.pdf',
    categoria: 'Educação',
    valor: 14200.00,
    classificacao: 'Ensino Fundamental (Beatriz)',
    justificativa: 'Pode ser elegível até o teto regulamentar de R$ 3.561,50 para este dependente na declaração completa; o excedente é não dedutível (Doc: Declaracao_Quitacao_Colegio_Santo_Agostinho.pdf).',
    status: 'confirmado',
    cnpjCpfEmissor: '17.221.455/0002-90',
    beneficiario: 'Beatriz Cavalcanti Silva (Filha)',
    baseLegal: 'Art. 8º, II, "b" da Lei nº 9.250/1995'
  },
  {
    id: 'gasto-3',
    data: '22/02/2025',
    estabelecimento: 'Brasilprev Seguros e Previdência',
    documentoOrigem: 'Extrato_Aportes_PGBL_Brasilprev_2025.pdf',
    categoria: 'Previdência PGBL',
    valor: 15000.00,
    classificacao: 'Aporte Previdência Complementar',
    justificativa: 'Pode ser elegível na declaração completa até o teto de 12% da renda bruta tributável do ano, desde que também contribua para o regime geral (Doc: Extrato_Aportes_PGBL_Brasilprev_2025.pdf).',
    status: 'confirmado',
    cnpjCpfEmissor: '27.665.207/0001-31',
    beneficiario: 'Lucas Cavalcanti Silva (Titular)',
    baseLegal: 'Art. 11 da Lei nº 9.532/1997'
  },
  {
    id: 'gasto-4',
    data: '18/03/2025',
    estabelecimento: 'Dr. Lucas Arantes de Paula (Ortopedista)',
    documentoOrigem: 'Recibo_Consulta_Ortopedia_Dr_Lucas.pdf',
    categoria: 'Saúde',
    valor: 650.00,
    classificacao: 'Consulta Médica Especializada',
    justificativa: 'Pode ser elegível integralmente, confira se o recibo contém CRM legível e comprovante de liquidação financeira (Doc: Recibo_Consulta_Ortopedia_Dr_Lucas.pdf).',
    status: 'confirmado',
    cnpjCpfEmissor: '298.411.008-99',
    beneficiario: 'Lucas Cavalcanti Silva (Titular)',
    baseLegal: 'RIR/2018, art. 73'
  },
  {
    id: 'gasto-5',
    data: '05/04/2025',
    estabelecimento: 'Laboratório Fleury Medicina Diagnóstica',
    documentoOrigem: 'NotaFiscal_Fleury_Exames_Abril2025.pdf',
    categoria: 'Saúde',
    valor: 1240.00,
    classificacao: 'Exames Laboratoriais e Genéticos',
    justificativa: 'Pode ser elegível, confira se a nota fiscal discrimina os exames realizados e se o beneficiário é o titular ou dependente direto (Doc: NotaFiscal_Fleury_Exames_Abril2025.pdf).',
    status: 'confirmado',
    cnpjCpfEmissor: '60.840.055/0001-31',
    beneficiario: 'Beatriz Cavalcanti Silva (Filha)',
    baseLegal: 'IN RFB nº 1.500/2014, art. 94'
  },
  {
    id: 'gasto-6',
    data: '14/05/2025',
    estabelecimento: 'Dra. Camila Toledo (Odontologia Integrada)',
    documentoOrigem: 'Recibo_Tratamento_Canal_DraCamila.pdf',
    categoria: 'Saúde',
    valor: 1800.00,
    classificacao: 'Tratamento Endodôntico (Canal)',
    justificativa: 'Pode ser elegível para dedução integral, confira os requisitos de identificação do CRO da profissional e laudo do procedimento (Doc: Recibo_Tratamento_Canal_DraCamila.pdf).',
    status: 'alerta',
    cnpjCpfEmissor: '331.890.114-02',
    beneficiario: 'Lucas Cavalcanti Silva (Titular)',
    baseLegal: 'Lei nº 9.250/1995, art. 8º'
  },
  {
    id: 'gasto-7',
    data: '02/06/2025',
    estabelecimento: 'Faculdade Paulista de Tecnologia (FIAP)',
    documentoOrigem: 'Comprovante_Semestral_FIAP_Enzo.pdf',
    categoria: 'Educação',
    valor: 9600.00,
    classificacao: 'Ensino Superior (Graduação Enzo)',
    justificativa: 'Pode ser elegível até o limite de R$ 3.561,50 para este dependente na declaração completa se o dependente constar legalmente na apuração (Doc: Comprovante_Semestral_FIAP_Enzo.pdf).',
    status: 'confirmado',
    cnpjCpfEmissor: '43.447.044/0001-88',
    beneficiario: 'Enzo Cavalcanti Silva (Filho)',
    baseLegal: 'Lei nº 9.250/1995, art. 8º, II'
  },
  {
    id: 'gasto-8',
    data: '20/06/2025',
    estabelecimento: 'Clínica de Fisioterapia Movimento & Vida',
    documentoOrigem: 'Recibo_Sessoes_Fisioterapia_Junho.pdf',
    categoria: 'Saúde',
    valor: 1450.00,
    classificacao: 'Sessões de Reabilitação Postural',
    justificativa: 'Pode ser elegível se acompanhada de pedido médico com CREFITO especificado no recibo (Doc: Recibo_Sessoes_Fisioterapia_Junho.pdf).',
    status: 'alerta',
    cnpjCpfEmissor: '52.119.800/0001-22',
    beneficiario: 'Lucas Cavalcanti Silva (Titular)',
    baseLegal: 'IN RFB nº 1.500/2014, art. 94'
  },
  {
    id: 'gasto-9',
    data: '11/08/2025',
    estabelecimento: 'Hospital Israelita Albert Einstein',
    documentoOrigem: 'NF_Hospital_Einstein_Atendimento_ProntoSocorro.pdf',
    categoria: 'Saúde',
    valor: 3200.00,
    classificacao: 'Internação e Procedimento Ambulatorial',
    justificativa: 'Pode ser elegível integralmente, confira o valor não coberto e não reembolsado pelo plano de saúde (Doc: NF_Hospital_Einstein_Atendimento_ProntoSocorro.pdf).',
    status: 'confirmado',
    cnpjCpfEmissor: '60.765.823/0001-30',
    beneficiario: 'Enzo Cavalcanti Silva (Filho)',
    baseLegal: 'RIR/2018, art. 73'
  },
  {
    id: 'gasto-10',
    data: '28/08/2025',
    estabelecimento: 'Instituto Ayrton Senna (Fundo da Criança e Adolescente)',
    documentoOrigem: 'Recibo_Doacao_Fumcad_2025.pdf',
    categoria: 'Doações Incentivadas',
    valor: 1500.00,
    classificacao: 'Doação ao Fundo dos Direitos da Criança',
    justificativa: 'Pode ser elegível diretamente do imposto devido até o teto global de 6% na declaração completa (Doc: Recibo_Doacao_Fumcad_2025.pdf).',
    status: 'confirmado',
    cnpjCpfEmissor: '73.492.301/0001-99',
    beneficiario: 'FUMCAD São Paulo',
    baseLegal: 'Estatuto da Criança e do Adolescente (ECA), art. 260'
  },
  {
    id: 'gasto-11',
    data: '15/09/2025',
    estabelecimento: 'Dra. Fernanda Lins (Psicóloga Clínica)',
    documentoOrigem: 'Recibo_Psicoterapia_Setembro2025.pdf',
    categoria: 'Saúde',
    valor: 900.00,
    classificacao: 'Sessões de Psicoterapia',
    justificativa: 'Pode ser elegível na declaração completa, confira se o recibo indica o número do CRP e CPF da profissional (Doc: Recibo_Psicoterapia_Setembro2025.pdf).',
    status: 'confirmado',
    cnpjCpfEmissor: '388.192.408-11',
    beneficiario: 'Beatriz Cavalcanti Silva (Filha)',
    baseLegal: 'IN RFB nº 1.500/2014, art. 94'
  },
  {
    id: 'gasto-12',
    data: '08/10/2025',
    estabelecimento: 'Cultura Inglesa Idiomas',
    documentoOrigem: 'Comprovante_Cultura_Inglesa_2025.pdf',
    categoria: 'Educação',
    valor: 2800.00,
    classificacao: 'Curso Livre de Idiomas',
    justificativa: 'Atenção: cursos de idiomas e atividades extracurriculares não atendem aos critérios de instrução formal previstos na legislação (Doc: Comprovante_Cultura_Inglesa_2025.pdf).',
    status: 'em_revisao',
    cnpjCpfEmissor: '61.455.901/0001-52',
    beneficiario: 'Beatriz Cavalcanti Silva (Filha)',
    baseLegal: 'Parecer Cosit nº 33/1996 e RIR/2018'
  },
  {
    id: 'gasto-13',
    data: '20/11/2025',
    estabelecimento: 'Clínica Oftalmológica Visão Plena',
    documentoOrigem: 'Recibo_Consulta_Oftalmo_Nov2025.pdf',
    categoria: 'Saúde',
    valor: 480.00,
    classificacao: 'Exame de Acuidade Visual e Fundo de Olho',
    justificativa: 'Pode ser elegível integralmente para o titular; observe que a aquisição de óculos ou lentes de contato não pode ser abatida (Doc: Recibo_Consulta_Oftalmo_Nov2025.pdf).',
    status: 'confirmado',
    cnpjCpfEmissor: '41.980.222/0001-70',
    beneficiario: 'Lucas Cavalcanti Silva (Titular)',
    baseLegal: 'Súmula CARF nº 120 e IN RFB nº 1.500/2014'
  },
  {
    id: 'gasto-14',
    data: '05/12/2025',
    estabelecimento: 'Farmácia Raia Drogasil S.A.',
    documentoOrigem: 'Cupom_Fiscal_Medicamentos_Uso_Continuo.pdf',
    categoria: 'Saúde',
    valor: 870.00,
    classificacao: 'Compra de Medicamentos em Farmácia',
    justificativa: 'Atenção: despesas com medicamentos comprados em drogarias não são elegíveis, salvo se integradas na conta de internação hospitalar (Doc: Cupom_Fiscal_Medicamentos_Uso_Continuo.pdf).',
    status: 'em_revisao',
    cnpjCpfEmissor: '61.585.865/0240-99',
    beneficiario: 'Lucas Cavalcanti Silva (Titular)',
    baseLegal: 'IN RFB nº 1.500/2014, art. 94, § 2º'
  },
  {
    id: 'gasto-15',
    data: '18/12/2025',
    estabelecimento: 'Receita Federal do Brasil (Dedução por Dependente)',
    documentoOrigem: 'Certidao_Nascimento_Dependentes.pdf',
    categoria: 'Dependentes',
    valor: 4550.16,
    classificacao: 'Dedução Legal Fixa (2 dependentes)',
    justificativa: 'Pode ser elegível no valor de R$ 2.275,08 por dependente legal na declaração completa, confira se todos os rendimentos próprios deles foram somados (Doc: Certidao_Nascimento_Dependentes.pdf).',
    status: 'confirmado',
    cnpjCpfEmissor: '00.394.460/0001-41',
    beneficiario: 'Beatriz e Enzo Cavalcanti Silva',
    baseLegal: 'Lei nº 9.250/1995, art. 8º, II, "c"'
  }
];

export const MOCK_INCONSISTENCIAS: Inconsistencia[] = [
  {
    id: 'inc-1',
    titulo: 'Possível duplicidade de recibo odontológico',
    descricao: 'Encontramos dois lançamentos com valor idêntico (R$ 1.800,00) emitidos pela Dra. Camila Toledo em datas muito próximas (14/05 e 18/05).',
    documentosEnvolvidos: ['Recibo_Tratamento_Canal_DraCamila.pdf', 'NF_Servico_Odonto_029.pdf'],
    severidade: 'alta',
    impactoEstimado: 'Risco de retenção em malha fina por dedução em duplicidade de R$ 1.800,00.',
    resolvido: false,
    sugestaoAcao: 'Confirme se tratam-se de parcelas distintas ou se a nota fiscal e o recibo referem-se ao mesmo procedimento.',
    categoria: 'duplicidade'
  },
  {
    id: 'inc-2',
    titulo: 'Rendimento de dependente não informado na declaração conjunta',
    descricao: 'O dependente Enzo Cavalcanti Silva teve remuneração de estágio identificada no valor de R$ 8.400,00 que não consta somada aos rendimentos.',
    documentosEnvolvidos: ['Informe_Rendimentos_Estagio_CIEE.pdf', 'Cadastro_Dependentes.pdf'],
    severidade: 'alta',
    impactoEstimado: 'Divergência direta com a base de dados da Receita Federal (cruzamento com a DIRF da fonte pagadora).',
    resolvido: false,
    sugestaoAcao: 'Inclua o informe de estágio do Enzo nos rendimentos tributáveis ou avalie declarar o dependente em separado.',
    categoria: 'declaracao'
  },
  {
    id: 'inc-3',
    titulo: 'Comprovante de fisioterapia sem registro do conselho de classe',
    descricao: 'O recibo de R$ 1.450,00 da Clínica Movimento & Vida não possui a discriminação do CPF do profissional e seu registro no CREFITO.',
    documentosEnvolvidos: ['Recibo_Sessoes_Fisioterapia_Junho.pdf'],
    severidade: 'moderada',
    impactoEstimado: 'Possível glosa da despesa médica em eventual fiscalização.',
    resolvido: false,
    sugestaoAcao: 'Solicite à clínica um recibo atualizado ou nota fiscal com a indicação do profissional responsável e registro CREFITO.',
    categoria: 'comprovante'
  },
  {
    id: 'inc-4',
    titulo: 'Gasto com curso de idiomas classificado em Educação',
    descricao: 'Identificamos o valor de R$ 2.800,00 da Cultura Inglesa registrado. A legislação tributária veda o abatimento de cursos de idiomas e extracurriculares.',
    documentosEnvolvidos: ['Comprovante_Cultura_Inglesa_2025.pdf'],
    severidade: 'atencao',
    impactoEstimado: 'Indisponibilidade legal para dedução na base de cálculo.',
    resolvido: false,
    sugestaoAcao: 'Mantenha o gasto arquivado para controle financeiro, mas desmarque-o da apuração dedutível.',
    categoria: 'comprovante'
  }
];

export const MOCK_CHECKLIST: ItemChecklist[] = [
  {
    id: 'chk-1',
    titulo: 'Informe de Rendimentos da Fonte Pagadora Principal (CLT)',
    descricao: 'Documento fornecido pelo RH com total de salários, INSS e IR retido na fonte.',
    categoria: 'Rendimentos',
    status: 'concluido',
    documentoVinculado: 'Informe_Rendimentos_Empresa_2025.pdf',
    acaoRecomendada: 'Conferido com sucesso.'
  },
  {
    id: 'chk-2',
    titulo: 'Informe de Rendimentos Financeiros dos Bancos e Corretoras',
    descricao: 'Extratos de saldos em conta corrente, aplicações em CDB, Poupança e Fundos.',
    categoria: 'Investimentos',
    status: 'concluido',
    documentoVinculado: 'Informe_Bancario_Itau_2025.pdf',
    acaoRecomendada: 'Conferido com sucesso.'
  },
  {
    id: 'chk-3',
    titulo: 'Demonstrativo Anual de Gastos com Plano de Saúde',
    descricao: 'Relatório discriminando a parte paga pelo titular e por cada dependente.',
    categoria: 'Saúde',
    status: 'concluido',
    documentoVinculado: 'Extrato_Anual_Bradesco_Saude_2025.pdf',
    acaoRecomendada: 'Conferido com sucesso.'
  },
  {
    id: 'chk-4',
    titulo: 'Declaração de Quitação Anual de Mensalidades Escolares',
    descricao: 'Comprovante emitido pelo Colégio Santo Agostinho relativo ao ano-calendário.',
    categoria: 'Educação',
    status: 'concluido',
    documentoVinculado: 'Declaracao_Quitacao_Colegio_Santo_Agostinho.pdf',
    acaoRecomendada: 'Conferido com sucesso.'
  },
  {
    id: 'chk-5',
    titulo: 'Informe de Aportes em Previdência Privada (PGBL)',
    descricao: 'Comprovante do plano de previdência complementar tipo PGBL para dedução até 12%.',
    categoria: 'Previdência',
    status: 'concluido',
    documentoVinculado: 'Extrato_Aportes_PGBL_Brasilprev_2025.pdf',
    acaoRecomendada: 'Conferido com sucesso.'
  },
  {
    id: 'chk-6',
    titulo: 'Informe de Rendimentos de Estágio do Dependente Enzo',
    descricao: 'Necessário para confrontar com os dados enviados pelo agente de integração ou empresa contratante.',
    categoria: 'Dependentes',
    status: 'pendente',
    acaoRecomendada: 'Solicitar informe de rendimentos do estágio para evitar divergência na DIRF.'
  },
  {
    id: 'chk-7',
    titulo: 'Comprovante atualizado com CREFITO das sessões de fisioterapia',
    descricao: 'Recibo retificado com CPF e registro profissional emitido pela Clínica Movimento & Vida.',
    categoria: 'Saúde',
    status: 'pendente',
    acaoRecomendada: 'Anexar comprovante retificado para respaldar dedução médica.'
  },
  {
    id: 'chk-8',
    titulo: 'Comprovante de Pagamento de IPVA e Financiamento de Veículo',
    descricao: 'Apenas para atualização de saldo de dívida e valor de aquisição na ficha de Bens e Direitos.',
    categoria: 'Bens e Dívidas',
    status: 'faltando',
    acaoRecomendada: 'Localizar carnê de financiamento do veículo ou extrato da financeira.'
  },
  {
    id: 'chk-9',
    titulo: 'Chave Pix cadastrada para Restituição (deve ser o próprio CPF)',
    descricao: 'A Receita Federal prioriza lotes de restituição para quem opta por Pix com chave tipo CPF.',
    categoria: 'Restituição',
    status: 'concluido',
    acaoRecomendada: 'Chave Pix CPF configurada.'
  }
];

export const RESPOSTAS_ASSISTENTE_MAP: Record<string, { texto: string; referenciaLegal: string; sugestoes: string[] }> = {
  'o que falta': {
    texto: 'Na sua declaração faltam 2 itens essenciais para finalização segura:\n\n1. O informe de rendimentos do estágio do dependente Enzo (R$ 8.400,00), sem o qual a declaração conjunta corre sério risco de malha fina;\n2. A retificação do recibo de fisioterapia de R$ 1.450,00 com o número de inscrição no CREFITO do profissional.\n\nAlém disso, o gasto de R$ 2.800,00 da Cultura Inglesa precisa ser reclassificado como não dedutível.',
    referenciaLegal: 'Instrução Normativa RFB nº 1.500/2014 e regras da Declaração de Ajuste Anual.',
    sugestoes: ['Como declarar rendimentos de dependentes?', 'Vale a pena tirar o dependente?', 'Como regularizar o recibo de fisioterapia?']
  },
  'despesas medicas': {
    texto: 'De acordo com as regras da Receita Federal, despesas com saúde não possuem limite máximo de valor, mas exigem rígida comprovação documental.\n\nPodem ser elegíveis:\n• Consultas médicas, odontológicas, fonoaudiológicas e sessões de fisioterapia e psicologia com recibo discriminando CPF/CNPJ e CRM/CRO/CRP/CREFITO;\n• Mensalidades integrais de planos de saúde do titular e dependentes;\n• Exames laboratoriais e radiológicos com nota fiscal nominal.\n\nNÃO são elegíveis: medicamentos adquiridos em farmácias (exceto integrados na conta hospitalar), lentes de contato e cirurgias estéticas sem finalidade reparadora.',
    referenciaLegal: 'Art. 8º da Lei nº 9.250/1995 e Art. 73 do RIR/2018.',
    sugestoes: ['Medicamentos de farmácia podem ser deduzidos?', 'O que deve constar no recibo médico?', 'Como funciona o reembolso do plano?']
  },
  'limite educacao': {
    texto: 'O limite individual anual para dedução de despesas com educação é de R$ 3.561,50 por pessoa (titular ou cada dependente legalmente habilitado).\n\nPodem ser elegíveis:\n• Educação infantil (creches e pré-escolas);\n• Ensino fundamental e médio;\n• Educação superior (graduação e pós-graduação);\n• Educação profissional (técnico e tecnólogo).\n\nNÃO podem ser elegíveis: cursos de idiomas (como inglês/espanhol), cursinhos pré-vestibulares, aulas particulares ou materiais escolares.',
    referenciaLegal: 'Art. 8º, inciso II, alínea "b" da Lei nº 9.250/1995.',
    sugestoes: ['Escola de idiomas pode abater?', 'Pós-graduação e MBA entram?', 'O valor pago além de R$ 3.561,50 se perde?']
  },
  'completo ou simplificado': {
    texto: 'Com base nas despesas já catalogadas no seu perfil (R$ 8.940 em saúde + R$ 7.123 em educação considerada + R$ 15.000 em PGBL + R$ 4.550 de 2 dependentes = R$ 35.613 em deduções legais):\n\nO Modelo Completo é amplamente mais vantajoso para você! No modelo Simplificado, o desconto padrão de 20% é limitado ao teto legal de R$ 16.754,34. Como suas despesas elegíveis superam com folga esse teto, o modelo Completo reduz mais a sua base de cálculo e maximiza a sua restituição.',
    referenciaLegal: 'Art. 10 da Lei nº 9.250/1995.',
    sugestoes: ['Ver comparativo no Simulador', 'O que é o desconto de 20%?', 'Posso mudar de modelo depois de enviar?']
  },
  'dependentes': {
    texto: 'A inclusão de dependentes gera uma dedução fixa anual de R$ 2.275,08 por pessoa na declaração completa, além de permitir o abatimento de suas despesas médicas e educacionais.\n\nEntretanto, é OBRIGATÓRIO informar todos os rendimentos tributáveis recebidos pelo dependente durante o ano (salários, estágios, pensões alimentícias). Se o dependente recebeu mais do que as despesas que ele gerou, pode ser mais vantajoso que ele declare em separado.',
    referenciaLegal: 'Art. 35 da Lei nº 9.250/1995.',
    sugestoes: ['Até que idade filho universitário é dependente?', 'Como declarar estágio de filho?', 'Cônjuge pode ser dependente?']
  },
  'previdencia pgbl': {
    texto: 'O plano de previdência complementar na modalidade PGBL (Plano Gerador de Benefício Livre) pode ser elegível para dedução na declaração completa até o limite de 12% dos seus rendimentos tributáveis brutos.\n\nPara ter direito a essa dedução, o titular deve obrigatoriamente contribuir também para o regime geral de previdência social (INSS) ou regime próprio de servidor público. Planos na modalidade VGBL não são dedutíveis da base de cálculo, devendo ser informados apenas na ficha de Bens e Direitos.',
    referenciaLegal: 'Art. 11 da Lei nº 9.532/1997.',
    sugestoes: ['Qual a diferença de PGBL e VGBL?', 'O que acontece se eu passar dos 12%?', 'Como declarar resgate de PGBL?']
  }
};
