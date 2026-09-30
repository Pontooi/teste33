import { Mission } from '../types';

export const initialMissions: Mission[] = [
  {
    id: 'm-run-java',
    title: 'Compilador Java Ativo',
    description: 'Execute qualquer código na trilha de Java.',
    xpReward: 30,
    progress: 0,
    target: 1,
    completed: false,
    type: 'java_exercise',
  },
  {
    id: 'm-class-main',
    title: 'Desvendando o Método Main',
    description: 'Complete a lição "Classe e main" no Java.',
    xpReward: 50,
    progress: 0,
    target: 1,
    completed: false,
    type: 'complete_lesson',
  },
  {
    id: 'm-arrays-strings',
    title: 'Mestre dos Arrays',
    description: 'Complete a lição "Arrays e Strings" no Java.',
    xpReward: 60,
    progress: 0,
    target: 1,
    completed: false,
    type: 'complete_lesson',
  },
  {
    id: 'm-code-runs',
    title: 'Praticante Dedicado',
    description: 'Execute código no console 5 vezes hoje.',
    xpReward: 40,
    progress: 0,
    target: 5,
    completed: false,
    type: 'run_code',
  },
];
