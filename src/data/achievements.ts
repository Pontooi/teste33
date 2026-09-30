import { Achievement } from '../types';

export const initialAchievements: Achievement[] = [
  {
    id: 'ach-first-step',
    title: 'Primeiro Compilado',
    description: 'Executou seu primeiro código com sucesso no DualDev.',
    icon: 'Terminal',
    xpReward: 50,
    category: 'progress',
  },
  {
    id: 'ach-java-main',
    title: 'Iniciador da JVM',
    description: 'Completou com sucesso a lição "Classe e main".',
    icon: 'Cpu',
    xpReward: 100,
    category: 'java',
  },
  {
    id: 'ach-java-methods',
    title: 'Arquiteto de Funções',
    description: 'Compreendeu passagem de parâmetros e retornos em Java.',
    icon: 'Layers',
    xpReward: 100,
    category: 'java',
  },
  {
    id: 'ach-java-arrays',
    title: 'Guardião da Memória',
    description: 'Dominou arrays e manipulação de Strings em Java.',
    icon: 'Database',
    xpReward: 100,
    category: 'java',
  },
  {
    id: 'ach-streak-3',
    title: 'Chama Acesa',
    description: 'Manteve 3 dias consecutivos de prática.',
    icon: 'Flame',
    xpReward: 150,
    category: 'streak',
  },
  {
    id: 'ach-master-coder',
    title: 'Desenvolvedor Poliglota',
    description: 'Executou códigos em mais de 2 linguagens diferentes.',
    icon: 'Sparkles',
    xpReward: 200,
    category: 'mastery',
  },
];
