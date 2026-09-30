import React from 'react';
import { useDualDev } from '../context/DualDevContext';
import { tracks } from '../data/tracks';
import { LanguageIcon } from './LanguageIcon';
import { 
  Code2, 
  BookOpen, 
  Flame, 
  Zap, 
  Trophy, 
  Info, 
  Terminal, 
  Compass, 
  Sun,
  Moon
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    userXp, 
    userLevel, 
    streak, 
    currentTrackId, 
    setCurrentTrackId,
    theme,
    toggleTheme,
  } = useDualDev();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/80 dark:border-sky-500/20 bg-white/75 dark:bg-[#071f38]/80 backdrop-blur-xl shadow-[0_4px_20px_-2px_rgba(2,132,199,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-colors duration-200">
      {/* Specular top rim shine */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white dark:via-sky-400/40 to-transparent opacity-80" />
      
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        
        {/* Logo & Platform Brand */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setActiveTab('inicio')}
            className="group flex items-center gap-2.5 text-left focus:outline-none"
          >
            {/* Aero Aqua Gem Icon */}
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-b from-sky-400 via-sky-500 to-blue-600 text-white shadow-[0_4px_12px_rgba(2,132,199,0.35)] border border-sky-300/80 group-hover:scale-105 transition-all overflow-hidden">
              {/* Gloss shine reflection */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/70 to-transparent rounded-t-xl pointer-events-none" />
              <Code2 className="h-5 w-5 font-bold stroke-[2.5] relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-extrabold tracking-tight text-slate-800 dark:text-white text-base">
                <span>Dual</span>
                <span className="bg-gradient-to-r from-sky-600 to-cyan-500 dark:from-sky-400 dark:to-cyan-300 bg-clip-text text-transparent">
                  Dev
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-sky-700 dark:text-sky-300 px-1.5 py-0.5 rounded-full bg-sky-100/80 dark:bg-sky-950/80 border border-sky-300/60 dark:border-sky-800/80 shadow-xs">
                  Academia
                </span>
              </div>
            </div>
          </button>

          {/* Main Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('inicio')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'inicio'
                  ? 'aero-btn-primary shadow-xs'
                  : 'text-slate-600 dark:text-sky-200/80 hover:text-sky-700 dark:hover:text-white hover:bg-sky-100/60 dark:hover:bg-sky-900/40'
              }`}
            >
              <Compass className="h-3.5 w-3.5" />
              Início
            </button>

            <button
              onClick={() => setActiveTab('academia')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'academia'
                  ? 'aero-btn-primary shadow-xs'
                  : 'text-slate-600 dark:text-sky-200/80 hover:text-sky-700 dark:hover:text-white hover:bg-sky-100/60 dark:hover:bg-sky-900/40'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              Academia
            </button>

            <button
              onClick={() => setActiveTab('playground')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'playground'
                  ? 'aero-btn-primary shadow-xs'
                  : 'text-slate-600 dark:text-sky-200/80 hover:text-sky-700 dark:hover:text-white hover:bg-sky-100/60 dark:hover:bg-sky-900/40'
              }`}
            >
              <Terminal className="h-3.5 w-3.5" />
              Playground
            </button>

            <button
              onClick={() => setActiveTab('conquistas')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'conquistas'
                  ? 'aero-btn-primary shadow-xs'
                  : 'text-slate-600 dark:text-sky-200/80 hover:text-sky-700 dark:hover:text-white hover:bg-sky-100/60 dark:hover:bg-sky-900/40'
              }`}
            >
              <Trophy className="h-3.5 w-3.5" />
              Conquistas
            </button>

            <button
              onClick={() => setActiveTab('sobre')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'sobre'
                  ? 'aero-btn-primary shadow-xs'
                  : 'text-slate-600 dark:text-sky-200/80 hover:text-sky-700 dark:hover:text-white hover:bg-sky-100/60 dark:hover:bg-sky-900/40'
              }`}
            >
              <Info className="h-3.5 w-3.5" />
              Sobre
            </button>
          </nav>
        </div>

        {/* Controls, Theme Switcher & Stats */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Quick Track Switcher Dropdown */}
          <div className="relative flex items-center">
            <div className="absolute left-2.5 pointer-events-none">
              <LanguageIcon trackId={currentTrackId} className="w-3.5 h-3.5" />
            </div>
            <select
              value={currentTrackId}
              onChange={(e) => setCurrentTrackId(e.target.value as any)}
              className="appearance-none bg-sky-50/80 dark:bg-sky-950/70 border border-sky-200/80 dark:border-sky-800/60 hover:border-sky-400 text-slate-800 dark:text-sky-100 text-xs font-medium py-1.5 pl-8 pr-6 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-400/50 shadow-xs transition-all"
            >
              {tracks.map((t) => (
                <option key={t.id} value={t.id} className="dark:bg-slate-900">
                  {t.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-sky-500 text-[10px]">
              ▼
            </div>
          </div>

          {/* Theme Toggle (Dark / Light) */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
            aria-label="Alternar tema"
            className="flex items-center justify-center h-8 w-8 rounded-full border border-sky-200/80 dark:border-sky-700/60 bg-sky-50/80 dark:bg-sky-950/80 text-slate-700 dark:text-sky-200 hover:border-sky-400 hover:bg-white dark:hover:bg-sky-900/60 shadow-xs transition-all"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-300 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="h-4 w-4 text-sky-700 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Streak Counter */}
          <div 
            title={`${streak} dias consecutivos de prática`}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-b from-amber-50 to-orange-100/70 dark:from-amber-950/40 dark:to-orange-950/30 border border-amber-300/60 dark:border-amber-700/50 text-amber-800 dark:text-amber-300 text-xs font-semibold shadow-xs"
          >
            <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            <span className="font-mono">{streak}d</span>
          </div>

          {/* XP & Level Badge */}
          <div 
            title={`Nível ${userLevel} • ${userXp} Pontos de Experiência`}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-b from-sky-50 to-cyan-100/70 dark:from-sky-950/50 dark:to-cyan-950/40 border border-sky-300/60 dark:border-sky-700/50 text-sky-800 dark:text-sky-300 text-xs font-semibold shadow-xs"
          >
            <Zap className="h-3.5 w-3.5 fill-sky-500 text-sky-500" />
            <span className="font-mono">{userXp} XP</span>
            <span className="text-sky-300 dark:text-sky-700">|</span>
            <span className="font-mono">Nv. {userLevel}</span>
          </div>

        </div>

      </div>

      {/* Mobile subnavigation bar */}
      <div className="md:hidden flex items-center justify-around border-t border-sky-200/50 dark:border-sky-900/40 bg-white/90 dark:bg-[#071f38] px-2 py-1.5 transition-colors">
        <button
          onClick={() => setActiveTab('inicio')}
          className={`flex flex-col items-center py-1 text-[11px] ${
            activeTab === 'inicio' ? 'text-sky-600 dark:text-sky-400 font-bold' : 'text-slate-500 dark:text-sky-300/60'
          }`}
        >
          <Compass className="h-4 w-4 mb-0.5" />
          Início
        </button>
        <button
          onClick={() => setActiveTab('academia')}
          className={`flex flex-col items-center py-1 text-[11px] ${
            activeTab === 'academia' ? 'text-sky-600 dark:text-sky-400 font-bold' : 'text-slate-500 dark:text-sky-300/60'
          }`}
        >
          <BookOpen className="h-4 w-4 mb-0.5" />
          Academia
        </button>
        <button
          onClick={() => setActiveTab('playground')}
          className={`flex flex-col items-center py-1 text-[11px] ${
            activeTab === 'playground' ? 'text-sky-600 dark:text-sky-400 font-bold' : 'text-slate-500 dark:text-sky-300/60'
          }`}
        >
          <Terminal className="h-4 w-4 mb-0.5" />
          Playground
        </button>
        <button
          onClick={() => setActiveTab('conquistas')}
          className={`flex flex-col items-center py-1 text-[11px] ${
            activeTab === 'conquistas' ? 'text-sky-600 dark:text-sky-400 font-bold' : 'text-slate-500 dark:text-sky-300/60'
          }`}
        >
          <Trophy className="h-4 w-4 mb-0.5" />
          Conquistas
        </button>
        <button
          onClick={() => setActiveTab('sobre')}
          className={`flex flex-col items-center py-1 text-[11px] ${
            activeTab === 'sobre' ? 'text-sky-600 dark:text-sky-400 font-bold' : 'text-slate-500 dark:text-sky-300/60'
          }`}
        >
          <Info className="h-4 w-4 mb-0.5" />
          Sobre
        </button>
      </div>
    </header>
  );
};
