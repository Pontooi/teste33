import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Target, 
  CheckCircle, 
  Zap, 
  Clock, 
  ArrowRight, 
  ArrowLeft 
} from 'lucide-react';
import { Lesson } from '../types';

interface TheoryPanelProps {
  lesson: Lesson;
  isCompleted: boolean;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  onLoadSolution: () => void;
}

export const TheoryPanel: React.FC<TheoryPanelProps> = ({
  lesson,
  isCompleted,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  onLoadSolution,
}) => {
  const [showHints, setShowHints] = useState(false);

  return (
    <div className="aero-card flex flex-col h-full overflow-hidden transition-colors">
      
      {/* Theory Header with Specular Top Gloss */}
      <div className="relative border-b border-sky-100 dark:border-sky-900/60 bg-gradient-to-b from-white/90 via-sky-50/50 to-white/70 dark:from-[#092542]/80 dark:via-[#071c33]/70 dark:to-[#051629]/80 px-5 py-3.5 transition-colors overflow-hidden">
        {/* Top gloss line */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 dark:from-sky-300/10 to-transparent pointer-events-none" />

        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold tracking-wider text-sky-800 dark:text-sky-300 px-2.5 py-0.5 rounded-full bg-sky-100/90 dark:bg-sky-950/80 border border-sky-300/80 dark:border-sky-800/80 shadow-xs">
              {lesson.category}
            </span>
            <span className="text-xs text-slate-500 dark:text-sky-300/70">
              {lesson.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-1 text-sky-600 dark:text-sky-400 font-bold">
              <Zap className="h-3.5 w-3.5 fill-sky-500" />
              <span>+{lesson.xp} XP</span>
            </div>
            <div className="flex items-center gap-1 text-slate-500 dark:text-sky-300/60">
              <Clock className="h-3.5 w-3.5" />
              <span>~{lesson.estimatedMinutes} min</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
            {lesson.title}
            {isCompleted && (
              <span className="flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-300 font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300/70 dark:border-emerald-700/60 shadow-xs">
                <CheckCircle className="h-3 w-3" />
                Concluído
              </span>
            )}
          </h1>
        </div>
      </div>

      {/* Scrollable Theory Body */}
      <div className="flex-1 overflow-y-auto p-5 text-slate-700 dark:text-sky-100 text-sm leading-relaxed space-y-5">
        
        {/* Render formatted markdown content */}
        <div className="max-w-none text-sm space-y-4">
          {lesson.theory.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-base font-bold text-slate-800 dark:text-white tracking-tight pt-2 border-b border-sky-100 dark:border-sky-900/60 pb-1.5 flex items-center gap-2">
                  <span className="w-1.5 h-4 rounded-full bg-gradient-to-b from-sky-400 to-cyan-500 inline-block" />
                  <span>{paragraph.replace('### ', '')}</span>
                </h3>
              );
            }
            if (paragraph.startsWith('#### ')) {
              return (
                <h4 key={idx} className="text-sm font-semibold text-sky-700 dark:text-sky-300 pt-2">
                  {paragraph.replace('#### ', '')}
                </h4>
              );
            }
            if (paragraph.startsWith('```')) {
              const cleaned = paragraph.replace(/```[a-z]*\n?/g, '');
              return (
                <div key={idx} className="rounded-xl bg-[#061628] border border-sky-400/25 p-3.5 font-mono text-xs overflow-x-auto text-sky-100 shadow-md">
                  <pre>{cleaned}</pre>
                </div>
              );
            }
            return (
              <p key={idx} className="text-slate-700 dark:text-sky-200/90 whitespace-pre-line leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Challenge Box (Aero Aqua Water Droplet Style) */}
        <div className="rounded-2xl border border-sky-300/80 dark:border-sky-700/60 bg-gradient-to-r from-sky-50/90 via-cyan-50/70 to-emerald-50/40 dark:from-sky-950/50 dark:via-cyan-950/40 dark:to-emerald-950/30 p-4 space-y-2 shadow-xs">
          <div className="flex items-center gap-2 text-sky-800 dark:text-sky-300 font-bold text-xs uppercase tracking-wider">
            <Target className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            <span>Objetivo do Exercício</span>
          </div>
          <p className="text-slate-800 dark:text-sky-100 text-sm leading-relaxed font-medium">
            {lesson.instructions}
          </p>
        </div>

        {/* Hints Accordion */}
        {lesson.hints && lesson.hints.length > 0 && (
          <div className="rounded-2xl border border-sky-200/80 dark:border-sky-800/60 bg-white/70 dark:bg-[#071d33]/60 overflow-hidden shadow-xs transition-colors">
            <button
              onClick={() => setShowHints(!showHints)}
              className="w-full flex items-center justify-between p-3.5 text-xs font-semibold text-slate-700 dark:text-sky-200 hover:text-sky-700 dark:hover:text-white hover:bg-sky-50 dark:hover:bg-sky-900/40 transition-colors"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                <span>Precisa de uma dica? ({lesson.hints.length} disponíveis)</span>
              </div>
              {showHints ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {showHints && (
              <div className="p-3.5 pt-0 border-t border-sky-100 dark:border-sky-800/50 space-y-2 text-xs text-slate-700 dark:text-sky-200">
                <ul className="list-disc list-inside space-y-1.5 pl-1">
                  {lesson.hints.map((hint, i) => (
                    <li key={i} className="leading-relaxed">
                      {hint}
                    </li>
                  ))}
                </ul>

                <div className="pt-2">
                  <button
                    onClick={onLoadSolution}
                    className="text-[11px] font-mono text-sky-600 dark:text-sky-400 hover:underline transition-colors font-semibold"
                  >
                    Ver código da solução sugerida
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between border-t border-sky-100 dark:border-sky-900/60 bg-white/80 dark:bg-[#071f38]/80 px-5 py-3 transition-colors">
        <button
          onClick={onPrev}
          disabled={!hasPrev}
          className="aero-btn-glass flex items-center gap-1.5 px-4 py-1.5 text-xs disabled:opacity-30 disabled:pointer-events-none"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Anterior
        </button>

        <button
          onClick={onNext}
          disabled={!hasNext}
          className="aero-btn-primary flex items-center gap-1.5 px-5 py-1.5 text-xs disabled:opacity-30 disabled:pointer-events-none"
        >
          <span>Próxima Lição</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

    </div>
  );
};
