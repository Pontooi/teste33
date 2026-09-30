import React from 'react';
import { 
  Terminal, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Clock, 
  AlertCircle
} from 'lucide-react';
import { ExecutionResult, TestResult } from '../types';

interface ConsoleOutputProps {
  result: ExecutionResult | null;
  testResults: TestResult[];
  onClear: () => void;
  activeSubTab: 'output' | 'tests';
  setActiveSubTab: (tab: 'output' | 'tests') => void;
}

export const ConsoleOutput: React.FC<ConsoleOutputProps> = ({
  result,
  testResults,
  onClear,
  activeSubTab,
  setActiveSubTab,
}) => {
  const hasTests = testResults.length > 0;
  const passedTestsCount = testResults.filter((t) => t.passed).length;
  const allTestsPassed = hasTests && passedTestsCount === testResults.length;

  return (
    <div className="aero-card flex flex-col h-full overflow-hidden transition-colors">
      
      {/* Console Tab Header with Specular Top Gloss */}
      <div className="relative flex items-center justify-between border-b border-sky-100 dark:border-sky-900/60 bg-gradient-to-b from-white/90 via-sky-50/50 to-white/70 dark:from-[#092542]/80 dark:via-[#071c33]/70 dark:to-[#051629]/80 px-4 py-2 transition-colors overflow-hidden">
        {/* Top gloss line */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 dark:from-sky-300/10 to-transparent pointer-events-none" />

        <div className="flex items-center gap-2">
          
          <button
            onClick={() => setActiveSubTab('output')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all ${
              activeSubTab === 'output'
                ? 'aero-btn-primary shadow-xs'
                : 'aero-btn-glass text-slate-700 dark:text-sky-200'
            }`}
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>Terminal</span>
          </button>

          {hasTests && (
            <button
              onClick={() => setActiveSubTab('tests')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all ${
                activeSubTab === 'tests'
                  ? 'aero-btn-primary shadow-xs'
                  : 'aero-btn-glass text-slate-700 dark:text-sky-200'
              }`}
            >
              {allTestsPassed ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <AlertCircle className="h-3.5 w-3.5 text-sky-500" />
              )}
              <span>Testes ({passedTestsCount}/{testResults.length})</span>
            </button>
          )}

        </div>

        {/* Clear and Status */}
        <div className="flex items-center gap-3">
          {result && (
            <div className="flex items-center gap-1 text-[11px] font-mono text-sky-600/80 dark:text-sky-400/70 font-semibold">
              <Clock className="h-3 w-3" />
              <span>{result.executionTimeMs}ms</span>
            </div>
          )}

          <button
            onClick={onClear}
            title="Limpar console"
            className="text-slate-500 hover:text-slate-800 dark:text-sky-300/70 dark:hover:text-white p-1 rounded-full hover:bg-sky-100/60 dark:hover:bg-sky-900/40 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Output Content (High Contrast Clean Oceanic Aero Terminal) */}
      <div className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-relaxed bg-[#030e1a] text-sky-100">
        {activeSubTab === 'output' && (
          <div>
            {!result ? (
              <div className="flex flex-col items-center justify-center h-48 text-sky-400/40 text-center">
                <Terminal className="h-8 w-8 mb-2 stroke-1 opacity-40 text-sky-400" />
                <p>Nenhuma saída gerada ainda.</p>
                <p className="text-[11px] text-sky-400/30 mt-1">
                  Clique em "Executar" para compilar e rodar o código.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {result.stdout && (
                  <pre className="text-emerald-400 whitespace-pre-wrap selection:bg-emerald-900/60">
                    {result.stdout}
                  </pre>
                )}

                {result.stderr && (
                  <div className="rounded-xl border border-rose-500/40 bg-rose-950/40 p-3 text-rose-200">
                    <div className="flex items-center gap-2 font-bold mb-1 text-rose-400">
                      <XCircle className="h-4 w-4" />
                      <span>Erro de Execução</span>
                    </div>
                    <pre className="whitespace-pre-wrap font-mono text-xs">
                      {result.stderr}
                    </pre>
                  </div>
                )}

                {!result.stdout && !result.stderr && (
                  <p className="text-sky-400/50 italic">
                    Programa finalizou com código 0 (sem saída de texto).
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {activeSubTab === 'tests' && (
          <div className="space-y-3">
            {allTestsPassed && (
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 shadow-md">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold text-emerald-200">Parabéns! Todos os testes foram aprovados!</div>
                  <div className="text-[11px] text-emerald-300/80">
                    Você dominou este conceito e garantiu seus pontos de experiência (XP).
                  </div>
                </div>
              </div>
            )}

            {testResults.map((t, idx) => (
              <div
                key={t.testId || idx}
                className={`p-3 rounded-xl border transition-all ${
                  t.passed
                    ? 'bg-[#051628] border-emerald-500/30 text-sky-100'
                    : 'bg-[#051628] border-rose-500/40 text-sky-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 font-semibold">
                    {t.passed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-rose-400 shrink-0" />
                    )}
                    <span>{t.description}</span>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                      t.passed
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    }`}
                  >
                    {t.passed ? 'PASSOU' : 'FALHOU'}
                  </span>
                </div>
                <p className="text-[11px] text-sky-300/70 pl-6">{t.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
