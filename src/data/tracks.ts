import { Track } from '../types';
import { javaLessons } from './lessons/javaLessons';
import { pythonLessons } from './lessons/pythonLessons';
import { jsLessons } from './lessons/jsLessons';
import { htmlLessons, cssLessons } from './lessons/htmlCssLessons';

export const tracks: Track[] = [
  {
    id: 'java',
    name: 'Java',
    tagline: 'Linguagem robusta, orientada a objetos e corporativa',
    description: 'Aprenda Java moderno do zero: método main, criação de métodos com parâmetros tipados, manipulação de arrays e strings, orientação a objetos e boas práticas.',
    iconName: 'Coffee',
    badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    accentColor: 'from-orange-500 to-amber-600',
    totalLessons: javaLessons.length,
    totalXp: javaLessons.reduce((acc, curr) => acc + curr.xp, 0),
  },
  {
    id: 'python',
    name: 'Python',
    tagline: 'Sintaxe limpa, inteligência artificial e automação',
    description: 'Domine a linguagem mais requisitada para ciência de dados, IA e scripts rápidos com sintaxe elegante e intuitiva.',
    iconName: 'FileCode2',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    accentColor: 'from-blue-500 to-cyan-600',
    totalLessons: pythonLessons.length,
    totalXp: pythonLessons.reduce((acc, curr) => acc + curr.xp, 0),
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    tagline: 'A linguagem onipresente da Web e Full-Stack',
    description: 'Aprenda JS moderno (ES6+), manipulação de dados assíncrona, closures, funções de ordem superior e integração web.',
    iconName: 'Code',
    badgeColor: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    accentColor: 'from-yellow-500 to-amber-500',
    totalLessons: jsLessons.length,
    totalXp: jsLessons.reduce((acc, curr) => acc + curr.xp, 0),
  },
  {
    id: 'html',
    name: 'HTML5',
    tagline: 'Estruturação semântica e acessibilidade web',
    description: 'A fundação da web: aprenda a estruturar sites e aplicações com boas práticas de semântica e SEO.',
    iconName: 'Globe',
    badgeColor: 'bg-red-500/10 text-red-400 border-red-500/20',
    accentColor: 'from-red-500 to-orange-500',
    totalLessons: htmlLessons.length,
    totalXp: htmlLessons.reduce((acc, curr) => acc + curr.xp, 0),
  },
  {
    id: 'css',
    name: 'CSS3',
    tagline: 'Design de interfaces modernas e responsivas',
    description: 'Dê vida às suas páginas com Flexbox, Grid, cores modernas e transições fluidas.',
    iconName: 'Palette',
    badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    accentColor: 'from-sky-500 to-blue-600',
    totalLessons: cssLessons.length,
    totalXp: cssLessons.reduce((acc, curr) => acc + curr.xp, 0),
  },
];
