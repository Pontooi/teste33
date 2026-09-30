import React from 'react';
import { useDualDev } from '../context/DualDevContext';
import { tracks } from '../data/tracks';
import { getLessonsByTrack } from '../data/lessons';
import { LanguageIcon } from '../components/LanguageIcon';
import { TrackId } from '../types';
import { 
  Play, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Code2,
  Cpu,
  Layers,
  Database,
  Check,
  Zap,
  Droplet
} from 'lucide-react';

const TRACK_HERO_CONTENT: Record<TrackId, {
  highlight: string;
  headline: string;
  description: string;
}> = {
  java: {
    highlight: 'Java',
    headline: 'e a programação orientada a objetos na prática.',
    description: 'Execute seu código diretamente no navegador. Aprenda a anatomia da classe Java, o método main, métodos com parâmetros tipados e manipulação de arrays e strings com feedback imediato no console.',
  },
  python: {
    highlight: 'Python',
    headline: 'e a sintaxe limpa de inteligência artificial e scripts.',
    description: 'Escreva código limpo, conciso e elegante. Domine a função print, controle de fluxo com if/elif/else, listas dinâmicas, laços for in, funções reutilizáveis e contadores com range().',
  },
  javascript: {
    highlight: 'JavaScript',
    headline: 'e o ecossistema moderno da Web interativa.',
    description: 'Aprenda a linguagem que move a web moderna: variáveis com escopo seguro (let/const), template literals, arrow functions, programação funcional com map/filter e desestruturação de objetos.',
  },
  html: {
    highlight: 'HTML5',
    headline: 'e a estruturação semântica e acessível da Web.',
    description: 'A base de qualquer aplicação online: crie páginas estruturadas com cabeçalhos semânticos, menus de navegação, formulários interativos, tabelas de dados e mídias acessíveis.',
  },
  css: {
    highlight: 'CSS3',
    headline: 'e o design responsivo de interfaces modernas.',
    description: 'Transforme código em designs marcantes: domine o Box Model, alinhamentos com Flexbox, layouts bidimensionais com CSS Grid, tipografia, microinterações e transições fluidas.',
  },
};

const ICONS_BY_CATEGORY: Record<string, React.FC<any>> = {
  Fundamentos: Cpu,
  'Estrutura Básica': Cpu,
  'Estruturação Web': Layers,
  'Estruturas de Dados': Database,
  'Controle de Fluxo': Layers,
  Funções: Layers,
  Modularização: Layers,
  Layout: Layers,
  'Estilos e Design': Database,
};

export const HomePage: React.FC = () => {
  const { 
    setActiveTab, 
    currentTrackId,
    setCurrentTrackId, 
    setCurrentLessonId, 
    completedLessonIds, 
    missions
  } = useDualDev();

  const currentTrack = tracks.find((t) => t.id === currentTrackId) || tracks[0];
  const activeTrackLessons = getLessonsByTrack(currentTrackId);
  const heroInfo = TRACK_HERO_CONTENT[currentTrackId] || TRACK_HERO_CONTENT.java;

  const handleSelectTrack = (trackId: TrackId) => {
    setCurrentTrackId(trackId);
    const trackLessons = getLessonsByTrack(trackId);
    if (trackLessons.length > 0) {
      setCurrentLessonId(trackLessons[0].id);
    }
  };

  const handleEnterAcademia = (lessonId?: string) => {
    if (lessonId) {
      setCurrentLessonId(lessonId);
    } else if (activeTrackLessons.length > 0) {
      setCurrentLessonId(activeTrackLessons[0].id);
    }
    setActiveTab('academia');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      
      {/* Hero Welcome Banner (Frutiger Aero Glass Vista) */}
      <div className="relative overflow-hidden rounded-3xl border border-white/80 dark:border-sky-500/25 bg-gradient-to-br from-white/90 via-sky-50/70 to-cyan-50/50 dark:from-[#08223d]/90 dark:via-[#061c33]/85 dark:to-[#031322] p-6 sm:p-10 shadow-[0_12px_40px_rgba(2,132,199,0.09)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all">
        {/* Specular gloss top reflection */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 dark:from-sky-300/10 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100/90 dark:bg-sky-950/80 border border-sky-300/80 dark:border-sky-800/80 text-sky-800 dark:text-sky-200 text-xs font-semibold shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-sky-500 animate-pulse" />
            <span>DualDev Academy • Trilha {currentTrack.name} Ativa</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-800 dark:text-white tracking-tight leading-tight">
            Domine{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-cyan-500 to-teal-500 dark:from-sky-300 dark:via-cyan-300 dark:to-teal-300">
              {heroInfo.highlight}
            </span>{' '}
            {heroInfo.headline}
          </h1>

          <p className="text-slate-600 dark:text-sky-200/80 text-sm sm:text-base leading-relaxed">
            {heroInfo.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => handleEnterAcademia()}
              className="aero-btn-primary flex items-center gap-2 px-6 py-2.5 text-sm shadow-md"
            >
              <Play className="h-4 w-4 fill-white" />
              <span>Acessar Academia {currentTrack.name}</span>
            </button>

            <button
              onClick={() => setActiveTab('playground')}
              className="aero-btn-glass flex items-center gap-2 px-5 py-2.5 text-sm"
            >
              <Code2 className="h-4 w-4 text-sky-600 dark:text-sky-400" />
              <span>Playground Livre</span>
            </button>
          </div>
        </div>

        {/* Decorative Aero bubbles & light rays */}
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-gradient-to-br from-sky-300/25 to-cyan-300/20 dark:from-cyan-500/15 dark:to-blue-600/10 blur-3xl pointer-events-none" />
        <div className="absolute right-24 bottom-4 w-28 h-28 rounded-full bg-gradient-to-tr from-teal-300/20 to-sky-200/20 dark:from-teal-500/10 dark:to-sky-400/10 blur-2xl pointer-events-none" />
      </div>

      {/* Featured Spotlight: Top Modules of the Current Active Track */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
              <span className="text-sky-500">⚡</span>
              <span>Destaques da Trilha {currentTrack.name}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-sky-300/70 mt-0.5">
              {activeTrackLessons.length} exercícios práticos com execução no navegador e testes em tempo real:
            </p>
          </div>

          <button
            onClick={() => handleEnterAcademia()}
            className="flex items-center gap-1 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 transition-colors"
          >
            <span>Ver todas as {activeTrackLessons.length} lições</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activeTrackLessons.slice(0, 3).map((item) => {
            const Icon = ICONS_BY_CATEGORY[item.category] || Cpu;
            const isCompleted = completedLessonIds.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={() => handleEnterAcademia(item.id)}
                className="aero-card group relative cursor-pointer p-5 transition-all hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-b from-sky-100 to-cyan-50 dark:from-sky-900/50 dark:to-cyan-950/50 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 group-hover:scale-110 transition-transform shadow-xs">
                    <Icon className="h-5 w-5" />
                  </div>

                  {isCompleted ? (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300/70 dark:border-emerald-700/60 px-2.5 py-0.5 rounded-full shadow-xs">
                      <CheckCircle2 className="h-3 w-3" />
                      Concluído
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono font-semibold text-sky-700 dark:text-sky-300 bg-sky-100/70 dark:bg-sky-950/60 px-2 py-0.5 rounded-full border border-sky-300/70 dark:border-sky-800/60">
                      +{item.xp} XP
                    </span>
                  )}
                </div>

                <div className="text-[11px] font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1">
                  {currentTrack.name} • {item.category}
                </div>
                <h3 className="text-base font-bold text-slate-800 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-sky-200/70 leading-relaxed mb-4 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center gap-1 text-xs font-semibold text-sky-600 dark:text-sky-400">
                  <span>Praticar exercício</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid: Tracks + Daily Missions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* All Available Tracks (2 columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">
              Trilhas de Aprendizagem
            </h2>
            <span className="text-xs text-slate-500 dark:text-sky-300/70 font-medium">
              Clique em uma trilha para ativá-la
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tracks.map((t) => {
              const isSelected = t.id === currentTrackId;

              return (
                <div
                  key={t.id}
                  onClick={() => handleSelectTrack(t.id)}
                  className={`aero-card cursor-pointer p-4 transition-all relative ${
                    isSelected
                      ? 'border-sky-400 dark:border-sky-400 bg-sky-50/80 dark:bg-sky-950/60 ring-2 ring-sky-400/30'
                      : ''
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-xs">
                      <Check className="h-3 w-3" />
                      <span>Ativa</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <LanguageIcon trackId={t.id} className="w-5 h-5" />
                      <span className="text-base font-bold text-slate-800 dark:text-white">{t.name}</span>
                    </div>
                    {!isSelected && (
                      <span className="text-[11px] text-slate-500 dark:text-sky-300/70 font-mono">
                        {t.totalLessons} lições
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-sky-200/70 leading-relaxed mb-3">
                    {t.tagline}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-sky-300/70 pt-2 border-t border-sky-100 dark:border-sky-900/60">
                    <span className="font-mono text-sky-700 dark:text-sky-300 font-semibold">{t.totalXp} XP • {t.totalLessons} aulas</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectTrack(t.id);
                        setActiveTab('academia');
                      }}
                      className="text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>Entrar</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Daily Missions Sidebar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">
              Missões Diárias
            </h2>
            <span className="text-xs text-slate-500 dark:text-sky-300/70 font-medium">Reinicia à 00:00</span>
          </div>

          <div className="space-y-3">
            {missions.map((m) => {
              const progressPct = Math.round((m.progress / m.target) * 100);

              return (
                <div
                  key={m.id}
                  className="aero-card p-4 space-y-2.5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-xs text-slate-800 dark:text-sky-100">
                      {m.title}
                    </div>
                    <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 flex items-center gap-0.5">
                      <Zap className="h-3 w-3 fill-sky-500 text-sky-500" />
                      +{m.xpReward} XP
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-sky-200/70 leading-normal">
                    {m.description}
                  </p>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 dark:text-sky-300/70">
                      <span>Progresso</span>
                      <span>
                        {m.progress}/{m.target}
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-sky-100 dark:bg-sky-950/80 overflow-hidden p-0.5 border border-sky-200/60 dark:border-sky-800/50">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          m.completed 
                            ? 'bg-gradient-to-r from-emerald-400 to-teal-500' 
                            : 'bg-gradient-to-r from-sky-400 to-cyan-500'
                        }`}
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
