import React, { createContext, useContext, useState, useEffect } from 'react';
import { TrackId, Lesson, Mission, Achievement } from '../types';
import { allLessons, getLessonsByTrack } from '../data/lessons';
import { tracks } from '../data/tracks';
import { initialMissions } from '../data/missions';
import { initialAchievements } from '../data/achievements';

export type ThemeMode = 'dark' | 'light';

interface DualDevContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  activeTab: 'inicio' | 'academia' | 'playground' | 'conquistas' | 'sobre';
  setActiveTab: (tab: 'inicio' | 'academia' | 'playground' | 'conquistas' | 'sobre') => void;
  currentTrackId: TrackId;
  setCurrentTrackId: (id: TrackId) => void;
  currentLessonId: string;
  setCurrentLessonId: (id: string) => void;
  currentLesson: Lesson;
  userXp: number;
  userLevel: number;
  streak: number;
  completedLessonIds: string[];
  codeDrafts: Record<string, string>;
  saveDraft: (lessonId: string, code: string) => void;
  resetDraft: (lessonId: string) => void;
  completeLesson: (lessonId: string) => void;
  missions: Mission[];
  achievements: Achievement[];
  recordCodeExecution: (trackId: TrackId) => void;
  nextLesson: () => void;
  prevLesson: () => void;
}

const DualDevContext = createContext<DualDevContextType | undefined>(undefined);

function getSafeItem<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    return JSON.parse(saved) as T;
  } catch {
    return fallback;
  }
}

function getSafeNumber(key: string, fallback: number): number {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    const n = parseInt(saved, 10);
    return isNaN(n) ? fallback : n;
  } catch {
    return fallback;
  }
}

export const DualDevProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('dualdev_theme');
      return (saved === 'light' || saved === 'dark') ? saved : 'dark';
    } catch {
      return 'dark';
    }
  });

  const [activeTab, setActiveTab] = useState<'inicio' | 'academia' | 'playground' | 'conquistas' | 'sobre'>('academia');
  const [currentTrackId, setCurrentTrackId] = useState<TrackId>('java');
  const [currentLessonId, setCurrentLessonId] = useState<string>('java-class-main');

  const [userXp, setUserXp] = useState<number>(() => getSafeNumber('dualdev_xp', 120));
  const [streak, setStreak] = useState<number>(() => getSafeNumber('dualdev_streak', 3));
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => 
    getSafeItem<string[]>('dualdev_completed_lessons', ['java-intro'])
  );
  const [codeDrafts, setCodeDrafts] = useState<Record<string, string>>(() => 
    getSafeItem<Record<string, string>>('dualdev_drafts', {})
  );
  const [missions, setMissions] = useState<Mission[]>(() => 
    getSafeItem<Mission[]>('dualdev_missions', initialMissions)
  );
  const [achievements, setAchievements] = useState<Achievement[]>(() => 
    getSafeItem<Achievement[]>('dualdev_achievements', initialAchievements)
  );

  // Calculate current lesson
  const currentLessons = getLessonsByTrack(currentTrackId);
  const currentLesson =
    allLessons.find((l) => l.id === currentLessonId) ||
    currentLessons[0] ||
    allLessons[0];

  // User level
  const userLevel = Math.floor(userXp / 150) + 1;

  function setSafeItem(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch {
      // ignore
    }
  }

  // Persist state
  useEffect(() => {
    setSafeItem('dualdev_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    setSafeItem('dualdev_xp', String(userXp));
  }, [userXp]);

  useEffect(() => {
    setSafeItem('dualdev_streak', String(streak));
  }, [streak]);

  useEffect(() => {
    setSafeItem('dualdev_completed_lessons', JSON.stringify(completedLessonIds));
  }, [completedLessonIds]);

  useEffect(() => {
    setSafeItem('dualdev_drafts', JSON.stringify(codeDrafts));
  }, [codeDrafts]);

  useEffect(() => {
    setSafeItem('dualdev_missions', JSON.stringify(missions));
  }, [missions]);

  useEffect(() => {
    setSafeItem('dualdev_achievements', JSON.stringify(achievements));
  }, [achievements]);

  // Handle switching track: ensure currentLesson belongs to track
  const handleSetTrack = (trackId: TrackId) => {
    setCurrentTrackId(trackId);
    const trackLessons = getLessonsByTrack(trackId);
    if (trackLessons.length > 0) {
      // Find first incomplete or first lesson
      const nextIncomplete = trackLessons.find((l) => !completedLessonIds.includes(l.id));
      setCurrentLessonId(nextIncomplete ? nextIncomplete.id : trackLessons[0].id);
    }
  };

  const saveDraft = (lessonId: string, code: string) => {
    setCodeDrafts((prev) => ({ ...prev, [lessonId]: code }));
  };

  const resetDraft = (lessonId: string) => {
    const lesson = allLessons.find((l) => l.id === lessonId);
    if (lesson) {
      setCodeDrafts((prev) => {
        const next = { ...prev };
        delete next[lessonId];
        return next;
      });
    }
  };

  const completeLesson = (lessonId: string) => {
    const lesson = allLessons.find((l) => l.id === lessonId);
    if (!lesson) return;

    if (!completedLessonIds.includes(lessonId)) {
      setCompletedLessonIds((prev) => [...prev, lessonId]);
      setUserXp((prev) => prev + lesson.xp);

      // Check specific achievements
      if (lessonId === 'java-class-main') {
        unlockAchievement('ach-java-main');
      } else if (lessonId === 'java-methods-params') {
        unlockAchievement('ach-java-methods');
      } else if (lessonId === 'java-arrays-strings') {
        unlockAchievement('ach-java-arrays');
      }

      // Update missions
      updateMissionProgress('complete_lesson', 1);
    }
  };

  const unlockAchievement = (achId: string) => {
    setAchievements((prev) =>
      prev.map((ach) => {
        if (ach.id === achId && !ach.unlockedAt) {
          setUserXp((xp) => xp + ach.xpReward);
          return { ...ach, unlockedAt: new Date().toISOString() };
        }
        return ach;
      })
    );
  };

  const updateMissionProgress = (type: Mission['type'], delta: number) => {
    setMissions((prev) =>
      prev.map((m) => {
        if (m.type === type && !m.completed) {
          const newProgress = Math.min(m.target, m.progress + delta);
          const isDone = newProgress >= m.target;
          if (isDone && !m.completed) {
            setUserXp((xp) => xp + m.xpReward);
          }
          return { ...m, progress: newProgress, completed: isDone };
        }
        return m;
      })
    );
  };

  const recordCodeExecution = (trackId: TrackId) => {
    unlockAchievement('ach-first-step');
    updateMissionProgress('run_code', 1);
    if (trackId === 'java') {
      updateMissionProgress('java_exercise', 1);
    }
  };

  const nextLesson = () => {
    const list = getLessonsByTrack(currentTrackId);
    const currentIndex = list.findIndex((l) => l.id === currentLessonId);
    if (currentIndex >= 0 && currentIndex < list.length - 1) {
      setCurrentLessonId(list[currentIndex + 1].id);
    }
  };

  const prevLesson = () => {
    const list = getLessonsByTrack(currentTrackId);
    const currentIndex = list.findIndex((l) => l.id === currentLessonId);
    if (currentIndex > 0) {
      setCurrentLessonId(list[currentIndex - 1].id);
    }
  };

  return (
    <DualDevContext.Provider
      value={{
        theme,
        toggleTheme,
        activeTab,
        setActiveTab,
        currentTrackId,
        setCurrentTrackId: handleSetTrack,
        currentLessonId,
        setCurrentLessonId,
        currentLesson,
        userXp,
        userLevel,
        streak,
        completedLessonIds,
        codeDrafts,
        saveDraft,
        resetDraft,
        completeLesson,
        missions,
        achievements,
        recordCodeExecution,
        nextLesson,
        prevLesson,
      }}
    >
      {children}
    </DualDevContext.Provider>
  );
};

export function useDualDev() {
  const context = useContext(DualDevContext);
  if (!context) {
    throw new Error('useDualDev must be used within a DualDevProvider');
  }
  return context;
}
