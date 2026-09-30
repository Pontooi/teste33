export type TrackId = 'java' | 'python' | 'javascript' | 'html' | 'css';

export type Difficulty = 'Iniciante' | 'Intermediário' | 'Avançado';

export interface TestCase {
  id: string;
  description: string;
  expectedOutputSnippet?: string;
  validator?: (code: string, output: string) => { passed: boolean; message: string };
}

export interface Lesson {
  id: string;
  title: string;
  trackId: TrackId;
  category: string;
  description: string;
  difficulty: Difficulty;
  xp: number;
  estimatedMinutes: number;
  theory: string;
  initialCode: string;
  solutionCode: string;
  instructions: string;
  hints: string[];
  testCases: TestCase[];
}

export interface Track {
  id: TrackId;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  badgeColor: string;
  accentColor: string;
  totalLessons: number;
  totalXp: number;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  progress: number;
  target: number;
  completed: boolean;
  type: 'run_code' | 'complete_lesson' | 'java_exercise' | 'streak';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  unlockedAt?: string;
  category: 'progress' | 'mastery' | 'streak' | 'java';
}

export interface ExecutionResult {
  stdout: string;
  stderr?: string;
  error?: string;
  executionTimeMs: number;
  returnValue?: any;
}

export interface TestResult {
  testId: string;
  description: string;
  passed: boolean;
  message: string;
}
