import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  UploadCloud, 
  Receipt, 
  AlertTriangle, 
  Zap, 
  Calculator, 
  CheckSquare, 
  Bot, 
  CreditCard, 
  User, 
  Scale, 
  Menu, 
  X, 
  LogIn,
  Crown,
  Home,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { Logo } from './Logo';
import { PerfilUsuario } from '../types';

export type ViewTab = 
  | 'landing' 
  | 'dashboard' 
  | 'upload' 
  | 'gastos' 
  | 'inconsistencias' 
  | 'raiox' 
  | 'simulador' 
  | 'checklist' 
  | 'assistente' 
  | 'planos' 
  | 'perfil';

interface NavbarProps {
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  perfil: PerfilUsuario;
  numInconsistenciasPendentes: number;
  onOpenAuth: () => void;
  onOpenRegras: () => void;
  onOpenUpgrade: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  perfil,
  numInconsistenciasPendentes,
  onOpenAuth,
  onOpenRegras,
  onOpenUpgrade
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // App SaaS nav links
  const appNavLinks: { id: ViewTab; label: string; icon: React.ComponentType<{ className?: string }>; highlight?: boolean; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'upload', label: 'Upload', icon: UploadCloud },
    { id: 'gastos', label: 'Gastos', icon: Receipt },
    { id: 'inconsistencias', label: 'Inconsistências', icon: AlertTriangle, badge: numInconsistenciasPendentes },
    { id: 'raiox', label: 'Raio-X', icon: Zap, highlight: true },
    { id: 'simulador', label: 'Simulador', icon: Calculator },
    { id: 'checklist', label: 'Checklist', icon: CheckSquare },
    { id: 'assistente', label: 'Assistente', icon: Bot },
  ];

  const handleNavClick = (tab: ViewTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  const isLanding = currentTab === 'landing';

  return (
    <header className="sticky top-0 z-40 w-full bg-[#172E22]/95 backdrop-blur-md border-b border-[#2A4A37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo - click takes to landing */}
          <div 
            onClick={() => onSelectTab('landing')} 
            className="cursor-pointer group flex items-center"
          >
            <Logo size="md" showSubtitle />
          </div>

          {/* Desktop Nav Items */}
          {isLanding ? (
            /* Public Landing Page Nav */
            <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-[#A9BEB0]">
              <button
                onClick={() => onSelectTab('landing')}
                className="text-[#F7F2E9] hover:text-[#D97D36] transition-colors cursor-pointer"
              >
                Início
              </button>
              <button
                onClick={() => onSelectTab('simulador')}
                className="hover:text-[#F7F2E9] transition-colors cursor-pointer"
              >
                Simulador IRPF
              </button>
              <button
                onClick={() => onSelectTab('raiox')}
                className="hover:text-[#F7F2E9] transition-colors cursor-pointer flex items-center gap-1 text-[#D97D36]"
              >
                <Zap className="w-3.5 h-3.5 fill-[#D97D36]" />
                <span>Raio-X da Declaração</span>
              </button>
              <button
                onClick={() => onSelectTab('planos')}
                className="hover:text-[#F7F2E9] transition-colors cursor-pointer"
              >
                Planos & Preços
              </button>
              <button
                onClick={onOpenRegras}
                className="hover:text-[#F7F2E9] transition-colors cursor-pointer flex items-center gap-1"
              >
                <Scale className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>Regras da Receita</span>
              </button>
            </nav>
          ) : (
            /* Logged-in App SaaS Nav */
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
              {appNavLinks.map((link) => {
                const Icon = link.icon;
                const isActive = currentTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`relative px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      link.highlight
                        ? isActive
                          ? 'bg-[#D97D36] text-[#172E22] font-bold shadow-sm'
                          : 'text-[#D97D36] bg-[#D97D36]/10 hover:bg-[#D97D36]/20'
                        : isActive
                        ? 'bg-[#1E3A2B] text-[#F7F2E9] border border-[#2A4A37]'
                        : 'text-[#A9BEB0] hover:text-[#F7F2E9] hover:bg-[#1E3A2B]/60'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{link.label}</span>
                    {typeof link.badge === 'number' && link.badge > 0 && (
                      <span className="w-4 h-4 rounded-full bg-[#EF4444] text-[10px] text-white flex items-center justify-center font-bold">
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          )}

          {/* Right Action Icons & Controls */}
          <div className="hidden sm:flex items-center gap-2 xl:gap-3">
            {isLanding ? (
              <>
                <button
                  onClick={onOpenAuth}
                  className="px-3.5 py-2 text-xs font-semibold text-[#F7F2E9] hover:text-[#D97D36] transition-colors cursor-pointer"
                >
                  Entrar
                </button>
                <button
                  onClick={() => onSelectTab('dashboard')}
                  className="px-4 py-2 rounded-xl bg-[#D97D36] hover:bg-[#E5964E] text-[#172E22] text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Acessar Painel</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <>
                {/* Back to public site button */}
                <button
                  onClick={() => onSelectTab('landing')}
                  title="Ver Site Institucional"
                  className="px-2.5 py-1.5 rounded-lg text-xs text-[#A9BEB0] hover:text-[#F7F2E9] hover:bg-[#1E3A2B] border border-[#2A4A37] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span className="hidden xl:inline">Site</span>
                </button>

                {/* Plan Badge or Upgrade CTA */}
                {perfil.planoAtual === 'gratis' ? (
                  <button
                    onClick={onOpenUpgrade}
                    className="px-3 py-1.5 rounded-lg bg-[#D97D36]/15 border border-[#D97D36]/40 hover:bg-[#D97D36]/25 text-[#D97D36] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Crown className="w-3.5 h-3.5" />
                    <span>Assinar Premium</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onSelectTab('planos')}
                    className="px-2.5 py-1.5 rounded-lg bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E] text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Crown className="w-3.5 h-3.5" />
                    <span className="capitalize">{perfil.planoAtual}</span>
                  </button>
                )}

                {/* User Profile avatar */}
                <button
                  onClick={() => onSelectTab('perfil')}
                  className={`p-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2 ${
                    currentTab === 'perfil'
                      ? 'border-[#D97D36] bg-[#1E3A2B]'
                      : 'border-[#2A4A37] hover:border-[#D97D36]/50 bg-[#172E22]'
                  }`}
                  title="Meu Perfil"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#1E3A2B] text-[#D97D36] font-bold text-xs flex items-center justify-center border border-[#2A4A37]">
                    {perfil.nome ? perfil.nome[0] : 'L'}
                  </div>
                  <span className="text-xs font-medium text-[#F7F2E9] max-w-[90px] truncate hidden md:inline">
                    {perfil.nome ? perfil.nome.split(' ')[0] : 'Lucas'}
                  </span>
                </button>
              </>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => onSelectTab('dashboard')}
              className="px-2.5 py-1 rounded-md bg-[#D97D36] text-[#172E22] text-xs font-bold"
            >
              Painel
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#A9BEB0] hover:text-[#F7F2E9] hover:bg-[#1E3A2B]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#2A4A37] bg-[#172E22] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleNavClick('landing')}
              className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                currentTab === 'landing'
                  ? 'bg-[#1E3A2B] text-[#D97D36] border border-[#D97D36]'
                  : 'bg-[#1E3A2B]/40 text-[#A9BEB0] border border-[#2A4A37]'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Início (Site)</span>
            </button>

            {appNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between ${
                    isActive
                      ? 'bg-[#1E3A2B] text-[#D97D36] border border-[#D97D36]'
                      : 'bg-[#1E3A2B]/40 text-[#A9BEB0] border border-[#2A4A37]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </div>
                  {typeof link.badge === 'number' && link.badge > 0 && (
                    <span className="w-4 h-4 rounded-full bg-[#EF4444] text-[10px] text-white flex items-center justify-center font-bold">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#2A4A37] flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('planos')}
              className="w-full py-2.5 px-3 rounded-xl bg-[#1E3A2B] border border-[#2A4A37] text-xs text-[#F7F2E9] flex items-center justify-between font-medium"
            >
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#D97D36]" />
                <span>Planos & Assinatura</span>
              </div>
              <span className="text-[11px] text-[#D97D36] uppercase font-bold">Ver</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegras();
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-[#172E22] border border-[#2A4A37] text-xs text-[#A9BEB0] flex items-center gap-2"
            >
              <Scale className="w-4 h-4 text-[#D97D36]" />
              <span>Entenda o Motor de Regras Tributárias</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
