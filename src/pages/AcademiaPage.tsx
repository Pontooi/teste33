import React, { useState, useEffect } from 'react';
import { useDualDev } from '../context/DualDevContext';
import { tracks } from '../data/tracks';
import { getLessonsByTrack } from '../data/lessons';
import { executeCode } from '../services/runners';
import { CodeEditor } from '../components/CodeEditor';
import { ConsoleOutput } from '../components/ConsoleOutput';
import { TheoryPanel } from '../components/TheoryPanel';
import { ExecutionResult, TestResult } from '../types';
import { LanguageIcon } from '../components/LanguageIcon';
import { 
  CheckCircle2, 
  Circle, 
  Menu, 
  X 
} from 'lucide-react';

export const AcademiaPage: React.FC = () => {
  const {
    currentTrackId,
    setCurrentTrackId,
    currentLessonId,
    setCurrentLessonId,
    currentLesson,
    completedLessonIds,
    codeDrafts,
    saveDraft,
    resetDraft,
    completeLesson,
    recordCodeExecution,
    nextLesson,
    prevLesson,
  } = useDualDev();

  const trackLessons = getLessonsByTrack(currentTrackId);
  const currentTrack = tracks.find((t) => t.id === currentTrackId) || tracks[0];

  const [editorCode, setEditorCode] = useState<string>('');
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [activeConsoleTab, setActiveConsoleTab] = useState<'output' | 'tests'>('output');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (currentLesson) {
      const savedCode = codeDrafts[currentLesson.id];
      setEditorCode(savedCode !== undefined ? savedCode : currentLesson.initialCode);
      setExecutionResult(null);
      setTestResults([]);
      setActiveConsoleTab('output');
    }
  }, [currentLesson?.id]);

  const handleCodeChange = (newCode: string) => {
    setEditorCode(newCode);
    if (currentLesson) {
      saveDraft(currentLesson.id, newCode);
    }
  };

  const handleRunCode = async () => {
    if (!currentLesson) return;
    setIsRunning(true);
    setActiveConsoleTab('output');

    try {
      const res = await executeCode(currentTrackId, editorCode);
      setExecutionResult(res);
      recordCodeExecution(currentTrackId);
    } catch (err: any) {
      setExecutionResult({
        stdout: '',
        stderr: err.message || 'Erro inesperado na execução.',
        executionTimeMs: 0,
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleTestChallenge = async () => {
    if (!currentLesson) return;
    setIsTesting(true);

    try {
      const execRes = await executeCode(currentTrackId, editorCode);
      setExecutionResult(execRes);
      recordCodeExecution(currentTrackId);

      const results: TestResult[] = currentLesson.testCases.map((tc) => {
        if (tc.validator) {
          const outcome = tc.validator(editorCode, execRes.stdout);
          return {
            testId: tc.id,
            description: tc.description,
            passed: outcome.passed,
            message: outcome.message,
          };
        }

        const passed = !execRes.stderr && execRes.stdout.trim().length > 0;
        return {
          testId: tc.id,
          description: tc.description,
          passed,
          message: passed ? 'Código executado com sucesso!' : 'Código falhou na execução.',
        };
      });

      setTestResults(results);
      setActiveConsoleTab('tests');

      const allPassed = results.length > 0 && results.every((r) => r.passed);
      if (allPassed) {
        completeLesson(currentLesson.id);
      }
    } catch (err: any) {
      setExecutionResult({
        stdout: '',
        stderr: err.message || 'Erro na avaliação do código.',
        executionTimeMs: 0,
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleResetCode = () => {
    if (!currentLesson) return;
    setEditorCode(currentLesson.initialCode);
    resetDraft(currentLesson.id);
    setExecutionResult(null);
    setTestResults([]);
  };

  const handleLoadSolution = () => {
    if (!currentLesson) return;
    setEditorCode(currentLesson.solutionCode);
    saveDraft(currentLesson.id, currentLesson.solutionCode);
  };

  const completedCount = trackLessons.filter((l) => completedLessonIds.includes(l.id)).length;
  const progressPercent = trackLessons.length > 0 ? Math.round((completedCount / trackLessons.length) * 100) : 0;

  const currentLessonIndex = trackLessons.findIndex((l) => l.id === currentLesson?.id);
  const hasNext = currentLessonIndex >= 0 && currentLessonIndex < trackLessons.length - 1;
  const hasPrev = currentLessonIndex > 0;
  const isCurrentCompleted = currentLesson ? completedLessonIds.includes(currentLesson.id) : false;

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] transition-colors">
      
      {/* Sub-bar for track selection and mobile drawer toggle */}
      <div className="border-b border-white/70 dark:border-sky-500/20 bg-white/60 dark:bg-[#071c32]/70 px-4 py-2 flex items-center justify-between backdrop-blur-xl transition-colors">
        
        {/* Track Pills (Frutiger Aero Glass Themed) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {tracks.map((t) => {
            const isSelected = t.id === currentTrackId;
            return (
              <button
                key={t.id}
                onClick={() => setCurrentTrackId(t.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'aero-btn-primary shadow-xs'
                    : 'aero-btn-glass text-slate-700 dark:text-sky-200'
                }`}
              >
                <LanguageIcon trackId={t.id} className="w-3.5 h-3.5" />
                <span>{t.name}</span>
                {isSelected && (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-black/20 text-white font-bold">
                    {progressPercent}%
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full aero-btn-glass text-xs font-semibold"
        >
          {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          <span>Lições</span>
        </button>

      </div>

      {/* Main Learning Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Lesson Index Sidebar */}
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-30 w-72 bg-white/85 lg:bg-white/70 dark:bg-[#061b30]/90 lg:dark:bg-[#061b30]/75 border-r border-white/80 dark:border-sky-500/20 flex flex-col transition-transform duration-200 ease-in-out backdrop-blur-xl shadow-lg lg:shadow-none
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            top-16 lg:top-0 h-[calc(100vh-4rem)]
          `}
        >
          {/* Track Summary Header */}
          <div className="p-4 border-b border-sky-100 dark:border-sky-900/60">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <LanguageIcon trackId={currentTrack.id} className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300 font-mono">
                  Trilha {currentTrack.name}
                </span>
              </div>
              <span className="text-xs text-slate-500 dark:text-sky-300/70 font-mono">
                {completedCount}/{trackLessons.length}
              </span>
            </div>
            {/* Progress bar */}
            <div className="h-2 w-full rounded-full bg-sky-100 dark:bg-sky-950/80 overflow-hidden p-0.5 border border-sky-200/60 dark:border-sky-800/50">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Lessons List */}
          <div className="flex-1 overflow-y-auto p-2.5 space-y-1">
            {trackLessons.map((lesson) => {
              const isSelected = lesson.id === currentLesson?.id;
              const isDone = completedLessonIds.includes(lesson.id);

              return (
                <button
                  key={lesson.id}
                  onClick={() => {
                    setCurrentLessonId(lesson.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-all ${
                    isSelected
                      ? 'bg-sky-100/90 dark:bg-sky-950/90 border border-sky-300 dark:border-sky-700/80 text-sky-900 dark:text-sky-100 font-bold shadow-xs'
                      : 'text-slate-600 dark:text-sky-200/80 hover:text-slate-900 dark:hover:text-white hover:bg-sky-50 dark:hover:bg-sky-900/40 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    {isDone ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    ) : (
                      <Circle className="h-4 w-4 text-sky-300 dark:text-sky-700 shrink-0" />
                    )}
                    <div className="truncate">
                      <div className="truncate font-medium">{lesson.title}</div>
                      <div className="text-[10px] text-slate-400 dark:text-sky-300/50 font-mono">{lesson.category}</div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400 shrink-0">
                    +{lesson.xp}XP
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bottom quick tip */}
          <div className="p-3 border-t border-sky-100 dark:border-sky-900/60 bg-sky-50/50 dark:bg-sky-950/40 text-[11px] text-slate-500 dark:text-sky-300/70">
            Dica: Conclua os desafios para subir de nível e liberar insígnias.
          </div>
        </aside>

        {/* Workspace Panels (Theory + IDE + Console) */}
        <div className="flex-1 flex flex-col xl:flex-row gap-3 p-3 lg:p-4 overflow-y-auto">
          
          {/* Left: Theory & Challenge instructions */}
          <div className="w-full xl:w-[42%] h-[550px] xl:h-auto min-h-[480px]">
            {currentLesson ? (
              <TheoryPanel
                lesson={currentLesson}
                isCompleted={isCurrentCompleted}
                onNext={nextLesson}
                onPrev={prevLesson}
                hasNext={hasNext}
                hasPrev={hasPrev}
                onLoadSolution={handleLoadSolution}
              />
            ) : (
              <div className="p-8 text-center text-slate-400 dark:text-purple-400/60">
                Selecione uma lição para iniciar.
              </div>
            )}
          </div>

          {/* Right: Code Editor & Console Output */}
          <div className="w-full xl:w-[58%] flex flex-col gap-3 min-h-[600px] xl:h-auto">
            {/* Top: Code Editor */}
            <div className="flex-1 min-h-[380px]">
              <CodeEditor
                code={editorCode}
                onChange={handleCodeChange}
                onRun={handleRunCode}
                onTest={handleTestChallenge}
                onReset={handleResetCode}
                trackId={currentTrackId}
                isRunning={isRunning}
                isTesting={isTesting}
              />
            </div>

            {/* Bottom: Console Terminal & Tests */}
            <div className="h-64 min-h-[220px]">
              <ConsoleOutput
                result={executionResult}
                testResults={testResults}
                onClear={() => {
                  setExecutionResult(null);
                  setTestResults([]);
                }}
                activeSubTab={activeConsoleTab}
                setActiveSubTab={setActiveConsoleTab}
              />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
