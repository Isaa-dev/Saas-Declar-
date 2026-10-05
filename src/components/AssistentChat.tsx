import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  HelpCircle, 
  ShieldCheck, 
  FileText, 
  Scale, 
  CornerDownLeft,
  RotateCcw
} from 'lucide-react';
import { ChatMensagem } from '../types';
import { RESPOSTAS_ASSISTENTE_MAP } from '../data/mockData';

export const AssistentChat: React.FC = () => {
  const [mensagens, setMensagens] = useState<ChatMensagem[]>([
    {
      id: 'msg-1',
      remetente: 'declaro',
      texto: 'Olá! Sou o Assistente Declarô, seu copiloto para o IRPF 2026. Confrontei seus comprovantes com o Motor de Regras da Receita Federal. O que você gostaria de esclarecer hoje?',
      timestamp: 'Agora',
      sugestoesRelacionadas: [
        'O que falta na minha declaração?',
        'Quais despesas médicas podem ser elegíveis?',
        'Vale a pena declarar no modelo Completo ou Simplificado?',
        'Qual o limite de dedução com educação?',
      ]
    }
  ]);

  const [inputTexto, setInputTexto] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [mensagens, isTyping]);

  const enviarMensagem = (textoPergunta: string) => {
    if (!textoPergunta.trim()) return;

    const novaMensagemUsuario: ChatMensagem = {
      id: `usr-${Date.now()}`,
      remetente: 'usuario',
      texto: textoPergunta,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMensagens(prev => [...prev, novaMensagemUsuario]);
    setInputTexto('');
    setIsTyping(true);

    // Simulate response finding matching key
    setTimeout(() => {
      const qLower = textoPergunta.toLowerCase();
      let respostaEncontrada = null;

      if (qLower.includes('falta') || qLower.includes('pendente')) {
        respostaEncontrada = RESPOSTAS_ASSISTENTE_MAP['o que falta'];
      } else if (qLower.includes('médic') || qLower.includes('saúde') || qLower.includes('hospital') || qLower.includes('dentist')) {
        respostaEncontrada = RESPOSTAS_ASSISTENTE_MAP['despesas medicas'];
      } else if (qLower.includes('educa') || qLower.includes('escola') || qLower.includes('faculdade') || qLower.includes('curso')) {
        respostaEncontrada = RESPOSTAS_ASSISTENTE_MAP['limite educacao'];
      } else if (qLower.includes('completo') || qLower.includes('simplificado') || qLower.includes('modelo')) {
        respostaEncontrada = RESPOSTAS_ASSISTENTE_MAP['completo ou simplificado'];
      } else if (qLower.includes('dependente') || qLower.includes('filho') || qLower.includes('cônjuge')) {
        respostaEncontrada = RESPOSTAS_ASSISTENTE_MAP['dependentes'];
      } else if (qLower.includes('pgbl') || qLower.includes('previdência') || qLower.includes('vgbl')) {
        respostaEncontrada = RESPOSTAS_ASSISTENTE_MAP['previdencia pgbl'];
      } else {
        // Fallback intelligent simulated advice
        respostaEncontrada = {
          texto: `Compreendo sua dúvida sobre "${textoPergunta}". Pelo regulamento do IRPF (IN RFB nº 1.500/2014), qualquer lançamento deve ser respaldado por comprovante idôneo com CPF/CNPJ do prestador e identificação clara do beneficiário.\n\nRecomendamos conferir se esse gasto pode ser elegível nos moldes da declaração completa ou se a dedução simplificada (20%) continua sendo mais vantajosa para o seu perfil.`,
          referenciaLegal: 'Instrução Normativa RFB nº 1.500/2014 e RIR/2018.',
          sugestoes: ['O que falta na minha declaração?', 'Vale a pena declarar no modelo Completo ou Simplificado?']
        };
      }

      const respostaDeclaro: ChatMensagem = {
        id: `dec-${Date.now()}`,
        remetente: 'declaro',
        texto: respostaEncontrada.texto,
        referenciaLegal: respostaEncontrada.referenciaLegal,
        sugestoesRelacionadas: respostaEncontrada.sugestoes,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      };

      setMensagens(prev => [...prev, respostaDeclaro]);
      setIsTyping(false);
    }, 900);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      enviarMensagem(inputTexto);
    }
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#2A4A37] gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#D4873F]/20 border border-[#D4873F]/40 flex items-center justify-center text-[#D4873F]">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-serif font-bold text-[#F7F2E9]">
              Assistente Fiscal Declarô
            </h1>
            <p className="text-xs text-[#A9BEB0]">
              Tira-dúvidas inteligente fundamentado nas regras oficiais da Receita Federal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#1E3A2B] border border-[#2A4A37] text-[#22C55E] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            Motor Tributário Ativo
          </span>
        </div>
      </div>

      {/* CHAT MESSAGES WINDOW */}
      <div className="h-[460px] rounded-2xl bg-[#1E3A2B] border border-[#2A4A37] p-5 overflow-y-auto space-y-4 flex flex-col shadow-inner">
        {mensagens.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.remetente === 'usuario' ? 'items-end' : 'items-start'} max-w-[88%] ${
              msg.remetente === 'usuario' ? 'ml-auto' : 'mr-auto'
            }`}
          >
            <div
              className={`p-4 rounded-2xl text-xs leading-relaxed space-y-2.5 ${
                msg.remetente === 'usuario'
                  ? 'bg-[#D4873F] text-[#172E22] font-medium rounded-tr-xs'
                  : 'bg-[#172E22] border border-[#2A4A37] text-[#F7F2E9] rounded-tl-xs'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.texto}</div>

              {/* Legal Reference Badge */}
              {msg.referenciaLegal && (
                <div className="pt-2 border-t border-[#2A4A37] text-[10px] text-[#A9BEB0] flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-[#D4873F]" />
                  <span>Base Legal: {msg.referenciaLegal}</span>
                </div>
              )}
            </div>

            <div className="mt-1 text-[10px] text-[#A9BEB0] px-1 flex items-center gap-2">
              <span>{msg.remetente === 'usuario' ? 'Você' : 'Assistente Declarô'}</span>
              <span>·</span>
              <span>{msg.timestamp}</span>
            </div>

            {/* Suggested Related Chips */}
            {msg.sugestoesRelacionadas && msg.sugestoesRelacionadas.length > 0 && (
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {msg.sugestoesRelacionadas.map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => enviarMensagem(sug)}
                    className="px-2.5 py-1 rounded-lg bg-[#172E22] hover:bg-[#254534] border border-[#2A4A37] text-[11px] text-[#A9BEB0] hover:text-[#F7F2E9] transition-colors cursor-pointer text-left"
                  >
                    💬 {sug}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-[#172E22] border border-[#2A4A37] text-xs text-[#A9BEB0] w-fit">
            <Bot className="w-4 h-4 text-[#D4873F]" />
            <span>Consultando regulamento e comprovantes...</span>
            <div className="flex gap-1 ml-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4873F] animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4873F] animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4873F] animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT BOX & SEND BUTTON */}
      <div className="p-2.5 rounded-2xl bg-[#1E3A2B] border border-[#2A4A37] flex items-center gap-2">
        <input
          type="text"
          placeholder="Ex: O que falta na minha declaração? Posso deduzir consulta odontológica?"
          value={inputTexto}
          onChange={(e) => setInputTexto(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 px-4 py-2 bg-transparent text-xs text-[#F7F2E9] placeholder-[#A9BEB0]/60 focus:outline-hidden"
        />

        <button
          onClick={() => enviarMensagem(inputTexto)}
          disabled={!inputTexto.trim()}
          className="px-4 py-2.5 rounded-xl bg-[#D4873F] hover:bg-[#E5964E] text-[#172E22] font-semibold text-xs transition-colors flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <span>Enviar</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Disclaimer */}
      <p className="text-[11px] text-[#A9BEB0] text-center">
        O assistente aplica as regras fiscais vigentes da Receita Federal. Nenhuma resposta constitui consultoria jurídica individualizada sem a análise dos documentos físicos hábeis.
      </p>
    </div>
  );
};
