import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowUpRight, 
  Eye, 
  Trash2, 
  Sparkles, 
  ShieldCheck,
  Search,
  FileCheck
} from 'lucide-react';
import { DocumentoUpload, CategoriaGasto } from '../types';

interface UploadViewProps {
  documentos: DocumentoUpload[];
  onAdicionarDocumento: (novoDoc: DocumentoUpload) => void;
  onExcluirDocumento: (id: string) => void;
  onOpenRegras: () => void;
}

export const UploadView: React.FC<UploadViewProps> = ({
  documentos,
  onAdicionarDocumento,
  onExcluirDocumento,
  onOpenRegras
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingFileName, setProcessingFileName] = useState('');
  const [selectedDocPreview, setSelectedDocPreview] = useState<DocumentoUpload | null>(null);

  // Simulated extraction presets for user uploads
  const samplePresets: Array<{
    nome: string;
    tipo: DocumentoUpload['tipo'];
    tamanho: number;
    campos: DocumentoUpload['camposExtraidos'];
  }> = [
    {
      nome: 'Informe_Rendimentos_Banco_XP_2025.pdf',
      tipo: 'informe_rendimento',
      tamanho: 320,
      campos: {
        emissor: 'XP Investimentos CCTVM S.A.',
        cnpjCpf: '02.332.886/0001-04',
        anoExercicio: '2026 (Ano-calendário 2025)',
        valorPrincipal: 28450.00,
        categoriaSugerida: 'Outros',
        potencialDeducao: false,
      }
    },
    {
      nome: 'Recibo_Clinica_Dermatologia_Dra_Beatriz.pdf',
      tipo: 'recibo_medico',
      tamanho: 195,
      campos: {
        emissor: 'Dra. Beatriz Meneses (CRM-SP 189.442)',
        cnpjCpf: '312.890.412-00',
        anoExercicio: '2025',
        valorPrincipal: 850.00,
        categoriaSugerida: 'Saúde',
        potencialDeducao: true,
      }
    },
    {
      nome: 'Comprovante_PosGraduacao_FGV_Gestao.pdf',
      tipo: 'comprovante_educacao',
      tamanho: 240,
      campos: {
        emissor: 'Fundação Getulio Vargas (FGV)',
        cnpjCpf: '33.641.663/0001-44',
        anoExercicio: '2025',
        valorPrincipal: 18400.00,
        categoriaSugerida: 'Educação',
        potencialDeducao: true,
      }
    }
  ];

  const simulateExtraction = (fileName: string) => {
    setIsProcessing(true);
    setProcessingFileName(fileName);
    setProcessingProgress(15);

    // Pick preset or generate realistic extracted data
    const preset = samplePresets.find(p => p.nome.toLowerCase() === fileName.toLowerCase()) || samplePresets[0];

    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 95;
        }
        return prev + 25;
      });
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setProcessingProgress(100);

      const novoDocumento: DocumentoUpload = {
        id: `doc-${Date.now()}`,
        nomeArquivo: fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`,
        tipo: preset.tipo,
        tamanhoKb: preset.tamanho,
        dataEnvio: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        statusProcessamento: 'concluido',
        camposExtraidos: preset.campos,
      };

      onAdicionarDocumento(novoDocumento);
      setSelectedDocPreview(novoDocumento);
      setIsProcessing(false);
      setProcessingProgress(0);
      setProcessingFileName('');
    }, 2600); // 2.6 seconds simulated scan
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      simulateExtraction(file.name);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      simulateExtraction(file.name);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#D4873F]">
            Reconhecimento Documental
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#F7F2E9]">
            Upload & Extração de Documentos
          </h1>
          <p className="text-xs text-[#A9BEB0] mt-1">
            Envie informes bancários, recibos médicos e comprovantes educacionais. A extração é validada pelo Motor de Regras da Receita Federal.
          </p>
        </div>

        <button
          onClick={onOpenRegras}
          className="text-xs text-[#A9BEB0] hover:text-[#F7F2E9] border border-[#2A4A37] bg-[#1E3A2B] px-3 py-2 rounded-xl flex items-center gap-1.5 self-start transition-colors"
        >
          <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
          <span>Diretriz de Segurança & OCR</span>
        </button>
      </div>

      {/* UPLOAD DROPZONE */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
          isDragging 
            ? 'border-[#D4873F] bg-[#1E3A2B]/80' 
            : 'border-[#2A4A37] bg-[#1E3A2B]/40 hover:border-[#D4873F]/40'
        }`}
      >
        <input
          type="file"
          id="file-upload-input"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div className="max-w-md mx-auto flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-[#172E22] border border-[#2A4A37] flex items-center justify-center text-[#D4873F] mb-4 shadow-sm">
            <UploadCloud className="w-7 h-7" />
          </div>

          <h3 className="text-base font-serif font-bold text-[#F7F2E9]">
            Arraste seu documento aqui ou clique para selecionar
          </h3>
          <p className="text-xs text-[#A9BEB0] mt-1">
            Formatos suportados: PDF, PNG ou JPG (até 25 MB por arquivo).
          </p>

          <label
            htmlFor="file-upload-input"
            className="mt-5 px-6 py-2.5 rounded-xl bg-[#D4873F] hover:bg-[#E5964E] text-[#172E22] font-semibold text-xs transition-colors cursor-pointer shadow-sm"
          >
            Selecionar Arquivo no Computador
          </label>

          {/* Quick presets for rapid evaluation */}
          <div className="mt-6 pt-5 border-t border-[#2A4A37] w-full text-center">
            <span className="text-[11px] text-[#A9BEB0] block mb-2">
              Ou teste com um arquivo de exemplo pré-configurado:
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              {samplePresets.map((preset) => (
                <button
                  key={preset.nome}
                  type="button"
                  onClick={() => simulateExtraction(preset.nome)}
                  disabled={isProcessing}
                  className="px-2.5 py-1.5 rounded-lg bg-[#172E22] hover:bg-[#254534] border border-[#2A4A37] text-[11px] text-[#F7F2E9] flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <FileText className="w-3 h-3 text-[#D4873F]" />
                  <span>+ {preset.nome.split('_')[0]}...</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PROCESSING OVERLAY (2-3s loading) */}
        {isProcessing && (
          <div className="absolute inset-0 bg-[#172E22]/90 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center p-6 z-10 animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-full border-3 border-[#D4873F] border-t-transparent animate-spin mb-4" />
            <h4 className="text-base font-serif font-bold text-[#F7F2E9]">
              Processando e Extraindo Dados...
            </h4>
            <p className="text-xs font-mono text-[#D4873F] mt-1 max-w-sm truncate">
              {processingFileName}
            </p>

            <div className="w-64 bg-[#1E3A2B] h-2 rounded-full overflow-hidden mt-4 border border-[#2A4A37]">
              <div 
                className="h-full bg-[#D4873F] transition-all duration-300"
                style={{ width: `${processingProgress}%` }}
              />
            </div>

            <div className="mt-3 text-[11px] text-[#A9BEB0] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4873F]" />
              <span>Confrontando regras tributárias e localizando CNPJ/CPF...</span>
            </div>
          </div>
        )}
      </div>

      {/* EXTRACTED DOCUMENT DETAILS MODAL / DRAWER */}
      {selectedDocPreview && (
        <div className="p-6 rounded-2xl bg-[#1E3A2B] border border-[#D4873F]/40 shadow-xl space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#2A4A37]">
            <div className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-[#22C55E]" />
              <div>
                <h3 className="text-sm font-semibold text-[#F7F2E9]">
                  Dados Extraídos do Comprovante
                </h3>
                <span className="text-[11px] font-mono text-[#A9BEB0]">
                  {selectedDocPreview.nomeArquivo}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedDocPreview(null)}
              className="text-xs text-[#A9BEB0] hover:text-[#F7F2E9] px-2 py-1 rounded-md hover:bg-[#172E22]"
            >
              Fechar Detalhes ✕
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 rounded-xl bg-[#172E22] border border-[#2A4A37]">
              <span className="text-[10px] text-[#A9BEB0] uppercase block">Emissor Identificado</span>
              <span className="text-xs font-semibold text-[#F7F2E9] mt-0.5 block truncate">
                {selectedDocPreview.camposExtraidos.emissor}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#172E22] border border-[#2A4A37]">
              <span className="text-[10px] text-[#A9BEB0] uppercase block">CNPJ / CPF</span>
              <span className="text-xs font-mono font-medium text-[#F7F2E9] mt-0.5 block">
                {selectedDocPreview.camposExtraidos.cnpjCpf}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#172E22] border border-[#2A4A37]">
              <span className="text-[10px] text-[#A9BEB0] uppercase block">Valor Total Extraído</span>
              <span className="text-sm font-mono font-bold text-[#D4873F] mt-0.5 block">
                R$ {selectedDocPreview.camposExtraidos.valorPrincipal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#172E22] border border-[#2A4A37]">
              <span className="text-[10px] text-[#A9BEB0] uppercase block">Classificação Sugerida</span>
              <span className="text-xs font-semibold text-[#22C55E] mt-0.5 block">
                {selectedDocPreview.camposExtraidos.categoriaSugerida}
              </span>
            </div>
          </div>

          <div className="p-3 bg-[#172E22] rounded-xl border border-[#2A4A37] text-xs text-[#A9BEB0] flex items-center justify-between">
            <span>
              ℹ️ Este documento pode ser elegível para comprovação fiscal. O comprovante foi indexado e está disponível para a apuração.
            </span>
            <span className="text-[11px] font-mono text-[#22C55E] font-semibold shrink-0 ml-2">
              Status: Processado
            </span>
          </div>
        </div>
      )}

      {/* DOCUMENT LIST */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-serif font-bold text-[#F7F2E9]">
            Documentos Cadastrados no Declarô ({documentos.length})
          </h2>
          <span className="text-xs text-[#A9BEB0]">
            Todos os arquivos ficam armazenados de forma criptografada na sua conta.
          </span>
        </div>

        <div className="border border-[#2A4A37] rounded-2xl overflow-hidden bg-[#1E3A2B] divide-y divide-[#2A4A37]">
          {documentos.map((doc) => (
            <div
              key={doc.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#254534]/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#172E22] border border-[#2A4A37] flex items-center justify-center text-[#D4873F] shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#F7F2E9]">
                    {doc.nomeArquivo}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-[#A9BEB0] mt-0.5">
                    <span>{doc.camposExtraidos.emissor}</span>
                    <span>·</span>
                    <span className="font-mono">{doc.tamanhoKb} KB</span>
                    <span>·</span>
                    <span>Enviado em {doc.dataEnvio}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 justify-end">
                <button
                  onClick={() => setSelectedDocPreview(doc)}
                  className="px-3 py-1.5 rounded-lg bg-[#172E22] hover:bg-[#254534] border border-[#2A4A37] text-xs text-[#F7F2E9] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-[#D4873F]" />
                  <span>Ver Dados</span>
                </button>

                <button
                  onClick={() => onExcluirDocumento(doc.id)}
                  title="Remover documento"
                  className="p-1.5 rounded-lg text-[#A9BEB0] hover:text-[#EF4444] hover:bg-[#172E22] transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
