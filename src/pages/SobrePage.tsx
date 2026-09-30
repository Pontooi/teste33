import React, { useState } from 'react';
import { 
  Code2, 
  Cpu, 
  CheckCircle2, 
  Keyboard,
  Zap,
  Sparkles,
  Layers,
  Copy,
  Check
} from 'lucide-react';
import { TrackId } from '../types';
import { getSnippetsByTrack } from '../data/snippets';
import { LanguageIcon } from '../components/LanguageIcon';
import { tracks } from '../data/tracks';

export const SobrePage: React.FC = () => {
  const [selectedSnippetTrack, setSelectedSnippetTrack] = useState<TrackId>('java');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const currentSnippets = getSnippetsByTrack(selectedSnippetTrack);

  const handleCopySnippet = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      
      {/* Intro Header */}
      <div className="text-center space-y-3">
        <div className="relative inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-b from-sky-400 via-sky-500 to-blue-600 text-white shadow-[0_8px_20px_rgba(2,132,199,0.35)] border border-sky-300/80 mb-2 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/70 to-transparent pointer-events-none" />
          <Code2 className="h-7 w-7 relative z-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
          Sobre o DualDev & Atalhos
        </h1>
        <p className="text-slate-600 dark:text-sky-200/80 text-sm max-w-xl mx-auto">
          Uma plataforma de ensino interativo voltada para estudantes e desenvolvedores que buscam dominar lógica de programação, sintaxe moderna e arquitetura de software na prática.
        </p>
      </div>

      {/* VS Code Snippets & Autocomplete Section */}
      <div className="aero-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-100 dark:border-sky-800/60 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sky-800 dark:text-sky-300 font-bold text-base">
              <Zap className="h-5 w-5 text-sky-500" />
              <span>Snippets Inteligentes e Autocompletar (Estilo VS Code)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-sky-300/70 leading-relaxed max-w-2xl">
              Assim como nas extensões do Visual Studio Code, basta digitar as iniciais do comando (ex: <code className="text-sky-700 dark:text-sky-300 font-mono font-bold bg-sky-100 dark:bg-sky-950 px-1.5 py-0.5 rounded">sout</code> ou <code className="text-sky-700 dark:text-sky-300 font-mono font-bold bg-sky-100 dark:bg-sky-950 px-1.5 py-0.5 rounded">main</code>) no editor e pressionar <kbd className="font-mono font-bold px-1.5 py-0.5 rounded-md bg-sky-200/80 dark:bg-sky-900 text-sky-800 dark:text-sky-200 border border-sky-300 dark:border-sky-700">Tab</kbd> ou <kbd className="font-mono font-bold px-1.5 py-0.5 rounded-md bg-sky-200/80 dark:bg-sky-900 text-sky-800 dark:text-sky-200 border border-sky-300 dark:border-sky-700">Enter</kbd> para completar o bloco de código instantaneamente.
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-100/90 dark:bg-sky-950/80 border border-sky-300/80 dark:border-sky-800/80 text-sky-800 dark:text-sky-300 text-xs font-semibold self-start sm:self-auto shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-sky-500" />
            <span>IntelliSense Ativo</span>
          </div>
        </div>

        {/* Track selector tabs for snippets */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-sky-100 dark:border-sky-800/60 no-scrollbar">
          <span className="text-xs font-mono text-slate-500 dark:text-sky-400/70 pr-2">Linguagem:</span>
          {tracks.map((t) => {
            const isSelected = t.id === selectedSnippetTrack;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedSnippetTrack(t.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'aero-btn-primary shadow-xs'
                    : 'aero-btn-glass text-slate-700 dark:text-sky-200'
                }`}
              >
                <LanguageIcon trackId={t.id} className="w-3.5 h-3.5" />
                <span>{t.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-black/20 text-white' : 'bg-sky-200/80 dark:bg-sky-900/60 text-sky-800 dark:text-sky-200'}`}>
                  {getSnippetsByTrack(t.id).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Snippets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {currentSnippets.map((snippet) => {
            const isCopied = copiedId === snippet.id;

            return (
              <div
                key={snippet.id}
                className="group relative rounded-2xl border border-sky-100 dark:border-sky-900/60 bg-white/70 dark:bg-sky-950/40 hover:border-sky-300 dark:hover:border-sky-600 p-4 transition-all shadow-xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-mono font-bold text-xs shadow-xs">
                      {snippet.prefix}
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-sky-300/70 font-medium">
                      + Tab
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopySnippet(snippet.id, snippet.body)}
                    title="Copiar código gerado"
                    className="flex items-center gap-1 text-[11px] font-mono text-slate-500 dark:text-sky-400 hover:text-sky-700 dark:hover:text-white"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100" />
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">Copiar</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-xs font-semibold text-slate-800 dark:text-white mb-2">
                  {snippet.description}
                </div>

                <div className="rounded-xl bg-[#061628] border border-sky-400/20 p-2.5 overflow-x-auto">
                  <pre className="font-mono text-[11px] text-sky-200 leading-relaxed">
                    {snippet.body}
                  </pre>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Keyboard Shortcuts Summary */}
      <div className="aero-card p-6 space-y-4">
        <div className="flex items-center gap-2 text-slate-800 dark:text-white font-bold text-sm">
          <Keyboard className="h-5 w-5 text-sky-500" />
          <span>Atalhos de Teclado no Editor</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-sky-50/60 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/60 font-mono">
            <span className="text-slate-600 dark:text-sky-300/70">Executar Código</span>
            <kbd className="px-2 py-1 rounded-md bg-white dark:bg-[#071d33] text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/80 text-[11px] font-bold shadow-xs">
              Ctrl + Enter
            </kbd>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-sky-50/60 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/60 font-mono">
            <span className="text-slate-600 dark:text-sky-300/70">Autocompletar Snippet</span>
            <kbd className="px-2 py-1 rounded-md bg-white dark:bg-[#071d33] text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/80 text-[11px] font-bold shadow-xs">
              Tab / Enter
            </kbd>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-sky-50/60 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/60 font-mono">
            <span className="text-slate-600 dark:text-sky-300/70">Abrir Sugestões</span>
            <kbd className="px-2 py-1 rounded-md bg-white dark:bg-[#071d33] text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/80 text-[11px] font-bold shadow-xs">
              Ctrl + Espaço
            </kbd>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-sky-50/60 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/60 font-mono">
            <span className="text-slate-600 dark:text-sky-300/70">Navegar Sugestões</span>
            <kbd className="px-2 py-1 rounded-md bg-white dark:bg-[#071d33] text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/80 text-[11px] font-bold shadow-xs">
              Seta Cima / Baixo
            </kbd>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-sky-50/60 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/60 font-mono">
            <span className="text-slate-600 dark:text-sky-300/70">Fechar Menu Popover</span>
            <kbd className="px-2 py-1 rounded-md bg-white dark:bg-[#071d33] text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/80 text-[11px] font-bold shadow-xs">
              Esc
            </kbd>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-sky-50/60 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/60 font-mono">
            <span className="text-slate-600 dark:text-sky-300/70">Indentar 4 Espaços</span>
            <kbd className="px-2 py-1 rounded-md bg-white dark:bg-[#071d33] text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/80 text-[11px] font-bold shadow-xs">
              Tab (sem sugestão)
            </kbd>
          </div>
        </div>
      </div>

      {/* Highlights & Execution Architecture */}
      <div className="aero-card p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-800 dark:text-sky-300 font-bold text-sm">
          <Cpu className="h-5 w-5 text-sky-500" />
          <span>Motor de Execução Multi-Linguagem no Navegador</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-sky-200/80 leading-relaxed">
          O DualDev conta com interpretadores modernos integrados que analisam e executam o código diretamente no navegador com feedback instantâneo:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-sky-100 dark:border-sky-900/60 bg-sky-50/50 dark:bg-sky-950/40 p-4 space-y-2">
            <div className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Simulador Java Completo</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-sky-300/70 leading-relaxed">
              Mapeamento de <code className="text-sky-700 dark:text-sky-300 font-mono">public class</code>, método principal <code className="text-sky-700 dark:text-sky-300 font-mono">main</code>, métodos estáticos com parâmetros, arrays e captura de <code className="text-sky-700 dark:text-sky-300 font-mono">System.out.println</code>.
            </p>
          </div>

          <div className="rounded-2xl border border-sky-100 dark:border-sky-900/60 bg-sky-50/50 dark:bg-sky-950/40 p-4 space-y-2">
            <div className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Python Transpiler & Built-ins</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-sky-300/70 leading-relaxed">
              Suporte a loops <code className="text-sky-700 dark:text-sky-300 font-mono">for in</code>, <code className="text-sky-700 dark:text-sky-300 font-mono">range()</code>, funções <code className="text-sky-700 dark:text-sky-300 font-mono">def/return</code>, listas e utilitários <code className="text-sky-700 dark:text-sky-300 font-mono">len, max, min, sum</code>.
            </p>
          </div>

          <div className="rounded-2xl border border-sky-100 dark:border-sky-900/60 bg-sky-50/50 dark:bg-sky-950/40 p-4 space-y-2">
            <div className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>JavaScript ES6+ Seguro</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-sky-300/70 leading-relaxed">
              Console isolado, suporte a arrow functions, métodos funcionais de array (<code className="text-sky-700 dark:text-sky-300 font-mono">map, filter</code>) e desestruturação de objetos com medição de latência em milissegundos.
            </p>
          </div>

          <div className="rounded-2xl border border-sky-100 dark:border-sky-900/60 bg-sky-50/50 dark:bg-sky-950/40 p-4 space-y-2">
            <div className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>HTML5 & CSS3 Semânticos</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-sky-300/70 leading-relaxed">
              Validação de tags estruturais, formulários acessíveis, Flexbox e Grid com analisador de integridade de código em tempo real.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
