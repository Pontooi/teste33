import React, { useState } from 'react';
import { useDualDev } from '../context/DualDevContext';
import { 
  Trophy, 
  Flame, 
  Zap, 
  CheckCircle2, 
  Lock, 
  Terminal, 
  Cpu, 
  Layers, 
  Database, 
  Sparkles 
} from 'lucide-react';

const ICON_MAP: Record<string, React.FC<any>> = {
  Terminal,
  Cpu,
  Layers,
  Database,
  Flame,
  Sparkles,
  Trophy,
};

export const ConquistasPage: React.FC = () => {
  const { achievements, userXp, userLevel, streak, completedLessonIds } = useDualDev();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const unlockedCount = achievements.filter((a) => a.unlockedAt).length;
  const currentLevelXpFloor = (userLevel - 1) * 150;
  const nextLevelXpCeil = userLevel * 150;
  const levelProgress = Math.min(100, Math.round(((userXp - currentLevelXpFloor) / 150) * 100));

  const filteredAchievements = achievements.filter((a) => {
    if (selectedCategory === 'all') return true;
    return a.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Overview Cards (Frutiger Aero Glass) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Level card */}
        <div className="aero-card p-5 space-y-3">
          <div className="flex items-center justify-between text-slate-500 dark:text-sky-300/70 text-xs font-semibold">
            <span>NÍVEL DO DEV</span>
            <span className="text-sky-600 dark:text-sky-300 font-bold font-mono">Nv. {userLevel}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-800 dark:text-white">{userXp}</span>
            <span className="text-xs text-slate-500 dark:text-sky-300/70 font-mono">XP Total</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-mono text-slate-500 dark:text-sky-300/70">
              <span>Próximo nível</span>
              <span>{nextLevelXpCeil - userXp} XP restantes</span>
            </div>
            <div className="h-2 w-full rounded-full bg-sky-100 dark:bg-sky-950/80 overflow-hidden p-0.5 border border-sky-200/60 dark:border-sky-800/50">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 transition-all duration-300"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Streak card */}
        <div className="aero-card p-5 space-y-3">
          <div className="flex items-center justify-between text-slate-500 dark:text-sky-300/70 text-xs font-semibold">
            <span>SEQUÊNCIA DE ESTUDO</span>
            <Flame className="h-4 w-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-800 dark:text-white">{streak}</span>
            <span className="text-xs text-slate-500 dark:text-sky-300/70 font-mono">dias seguidos</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-sky-300/70">
            Pratique diariamente para manter sua disciplina ativa e em ritmo constante!
          </p>
        </div>

        {/* Badges unlocked */}
        <div className="aero-card p-5 space-y-3">
          <div className="flex items-center justify-between text-slate-500 dark:text-sky-300/70 text-xs font-semibold">
            <span>INSÍGNIAS DESBLOQUEADAS</span>
            <Trophy className="h-4 w-4 text-sky-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-800 dark:text-white">
              {unlockedCount} / {achievements.length}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-sky-300/70">
            {completedLessonIds.length} lições completadas com êxito na plataforma.
          </p>
        </div>

      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-2 border-b border-sky-200/60 dark:border-sky-800/60 pb-3 overflow-x-auto no-scrollbar">
        {[
          { id: 'all', label: 'Todas as Insígnias' },
          { id: 'java', label: 'Especialista Java' },
          { id: 'progress', label: 'Progresso' },
          { id: 'streak', label: 'Constância' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'aero-btn-primary shadow-xs'
                : 'aero-btn-glass text-slate-700 dark:text-sky-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map((ach) => {
          const Icon = ICON_MAP[ach.icon] || Trophy;
          const isUnlocked = !!ach.unlockedAt;

          return (
            <div
              key={ach.id}
              className={`aero-card p-5 flex items-start gap-4 transition-all ${
                isUnlocked
                  ? 'hover:-translate-y-0.5'
                  : 'opacity-50 grayscale'
              }`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-xs ${
                  isUnlocked
                    ? 'bg-gradient-to-b from-sky-100 to-cyan-50 dark:from-sky-900/60 dark:to-cyan-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-700'
                    : 'bg-slate-100 dark:bg-slate-800/50 text-slate-400 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {isUnlocked ? <Icon className="h-6 w-6" /> : <Lock className="h-5 w-5" />}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white">{ach.title}</h3>
                  <span className="text-[10px] font-mono font-bold text-sky-700 dark:text-sky-300 px-2 py-0.5 rounded-full bg-sky-100/80 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800">
                    +{ach.xpReward} XP
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-sky-200/70 leading-relaxed">
                  {ach.description}
                </p>

                <div className="pt-1.5 text-[10px] font-mono text-slate-500 dark:text-sky-300/70">
                  {isUnlocked ? (
                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="h-3 w-3" />
                      Desbloqueada
                    </span>
                  ) : (
                    <span>Bloqueada</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
