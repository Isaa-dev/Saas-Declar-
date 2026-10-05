/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, ViewTab } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { DashboardView } from './components/DashboardView';
import { UploadView } from './components/UploadView';
import { GastosView } from './components/GastosView';
import { InconsistenciasView } from './components/InconsistenciasView';
import { RaioXView } from './components/RaioXView';
import { SimuladorView } from './components/SimuladorView';
import { ChecklistView } from './components/ChecklistView';
import { AssistentChat } from './components/AssistentChat';
import { PlanosView } from './components/PlanosView';
import { PerfilView } from './components/PerfilView';
import { AuthModal } from './components/AuthModal';
import { OnboardingModal } from './components/OnboardingModal';
import { RegrasEngineModal } from './components/RegrasEngineModal';
import { 
  MOCK_PERFIL_INICIAL, 
  MOCK_GASTOS, 
  MOCK_INCONSISTENCIAS, 
  MOCK_DOCUMENTOS_INICIAIS, 
  MOCK_CHECKLIST 
} from './data/mockData';
import { 
  PerfilUsuario, 
  GastoRegistro, 
  Inconsistencia, 
  DocumentoUpload, 
  ItemChecklist 
} from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ViewTab>('landing');
  const [perfil, setPerfil] = useState<PerfilUsuario>(MOCK_PERFIL_INICIAL);
  const [gastos, setGastos] = useState<GastoRegistro[]>(MOCK_GASTOS);
  const [inconsistencias, setInconsistencias] = useState<Inconsistencia[]>(MOCK_INCONSISTENCIAS);
  const [documentos, setDocumentos] = useState<DocumentoUpload[]>(MOCK_DOCUMENTOS_INICIAIS);
  const [checklist, setChecklist] = useState<ItemChecklist[]>(MOCK_CHECKLIST);

  // Modals state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'cadastro'>('login');
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [regrasModalOpen, setRegrasModalOpen] = useState(false);

  // Handlers
  const handleAdicionarDocumento = (novoDoc: DocumentoUpload) => {
    setDocumentos([novoDoc, ...documentos]);
    // Also add to expenses if marked as potential deduction
    if (novoDoc.camposExtraidos.potencialDeducao) {
      const novoGasto: GastoRegistro = {
        id: `gasto-auto-${Date.now()}`,
        data: '05/03/2025',
        estabelecimento: novoDoc.camposExtraidos.emissor,
        documentoOrigem: novoDoc.nomeArquivo,
        categoria: novoDoc.camposExtraidos.categoriaSugerida,
        valor: novoDoc.camposExtraidos.valorPrincipal,
        classificacao: `Extração de ${novoDoc.nomeArquivo}`,
        justificativa: `Pode ser elegível, confira os requisitos fiscais e se o comprovante possui CPF/CNPJ idôneo (Doc: ${novoDoc.nomeArquivo}).`,
        status: 'confirmado',
        cnpjCpfEmissor: novoDoc.camposExtraidos.cnpjCpf,
        beneficiario: 'Titular / Dependente',
      };
      setGastos([novoGasto, ...gastos]);
    }
  };

  const handleExcluirDocumento = (id: string) => {
    setDocumentos(documentos.filter(d => d.id !== id));
  };

  const handleAdicionarGasto = (novoGasto: GastoRegistro) => {
    setGastos([novoGasto, ...gastos]);
  };

  const handleToggleInconsistencia = (id: string) => {
    setInconsistencias(inconsistencias.map(inc => {
      if (inc.id === id) {
        return { ...inc, resolvido: !inc.resolvido };
      }
      return inc;
    }));
  };

  const handleToggleChecklistStatus = (id: string) => {
    setChecklist(checklist.map(item => {
      if (item.id === id) {
        const nextStatus = item.status === 'concluido' ? 'pendente' : 'concluido';
        return { ...item, status: nextStatus };
      }
      return item;
    }));
  };

  const handleAtualizarPlano = (novoPlano: 'gratis' | 'premium' | 'profissional') => {
    setPerfil({ ...perfil, planoAtual: novoPlano });
  };

  const handleSalvarPerfil = (perfilAtualizado: PerfilUsuario) => {
    setPerfil(perfilAtualizado);
  };

  const handleAuthSuccess = (email: string, nome?: string) => {
    if (nome) {
      setPerfil(prev => ({ ...prev, email, nome }));
    } else {
      setPerfil(prev => ({ ...prev, email }));
    }
    setCurrentTab('dashboard');
  };

  const numInconsistenciasPendentes = inconsistencias.filter(i => !i.resolvido).length;

  return (
    <div className="min-h-screen bg-[#172E22] text-[#F7F2E9] flex flex-col font-sans selection:bg-[#D4873F]/30 selection:text-[#F7F2E9]">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        perfil={perfil}
        numInconsistenciasPendentes={numInconsistenciasPendentes}
        onOpenAuth={() => {
          setAuthMode('login');
          setAuthModalOpen(true);
        }}
        onOpenRegras={() => setRegrasModalOpen(true)}
        onOpenUpgrade={() => setCurrentTab('planos')}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'landing' ? (
          <LandingPage
            onGoToApp={(tab) => setCurrentTab(tab || 'dashboard')}
            onOpenAuth={() => {
              setAuthMode('cadastro');
              setAuthModalOpen(true);
            }}
            onOpenRegras={() => setRegrasModalOpen(true)}
          />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {currentTab === 'dashboard' && (
              <DashboardView
                perfil={perfil}
                gastos={gastos}
                inconsistencias={inconsistencias}
                documentos={documentos}
                onNavigate={setCurrentTab}
                onOpenRegras={() => setRegrasModalOpen(true)}
                onOpenOnboarding={() => setOnboardingOpen(true)}
              />
            )}

            {currentTab === 'upload' && (
              <UploadView
                documentos={documentos}
                onAdicionarDocumento={handleAdicionarDocumento}
                onExcluirDocumento={handleExcluirDocumento}
                onOpenRegras={() => setRegrasModalOpen(true)}
              />
            )}

            {currentTab === 'gastos' && (
              <GastosView
                gastos={gastos}
                onAdicionarGasto={handleAdicionarGasto}
                onOpenRegras={() => setRegrasModalOpen(true)}
              />
            )}

            {currentTab === 'inconsistencias' && (
              <InconsistenciasView
                inconsistencias={inconsistencias}
                onToggleResolver={handleToggleInconsistencia}
                onOpenRegras={() => setRegrasModalOpen(true)}
              />
            )}

            {currentTab === 'raiox' && (
              <RaioXView
                gastos={gastos}
                onOpenRegras={() => setRegrasModalOpen(true)}
              />
            )}

            {currentTab === 'simulador' && (
              <SimuladorView />
            )}

            {currentTab === 'checklist' && (
              <ChecklistView
                itens={checklist}
                onToggleStatus={handleToggleChecklistStatus}
                onNavigateToUpload={() => setCurrentTab('upload')}
              />
            )}

            {currentTab === 'assistente' && (
              <AssistentChat />
            )}

            {currentTab === 'planos' && (
              <PlanosView
                perfil={perfil}
                onAtualizarPlano={handleAtualizarPlano}
              />
            )}

            {currentTab === 'perfil' && (
              <PerfilView
                perfil={perfil}
                onSalvarPerfil={handleSalvarPerfil}
              />
            )}
          </div>
        )}
      </main>

      {/* Global Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        initialMode={authMode}
      />

      <OnboardingModal
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        onComplete={(dados) => {
          setPerfil(prev => ({ ...prev, ...dados }));
        }}
      />

      <RegrasEngineModal
        isOpen={regrasModalOpen}
        onClose={() => setRegrasModalOpen(false)}
      />
    </div>
  );
}
