import { Lesson } from '../../types';

export const jsLessons: Lesson[] = [
  {
    id: 'js-intro',
    title: 'Fundamentos: let, const e Concatenação',
    trackId: 'javascript',
    category: 'Fundamentos',
    description: 'Aprenda a declarar variáveis modernas com escopo seguro e formatar mensagens no console.',
    difficulty: 'Iniciante',
    xp: 50,
    estimatedMinutes: 5,
    theory: `### JavaScript Moderno (ES6+)

No JavaScript moderno evitamos o uso de \`var\` devido ao escopo global/de função imprevisível. Em vez disso, utilizamos:

- \`const\`: Para referências que não serão reatribuídas (recomendado como padrão).
- \`let\`: Quando o valor da variável precisa ser alterado ao longo do código.

\`\`\`javascript
const nome = "DualDev";
let xp = 150;
xp += 50;

console.log("Desenvolvedor: " + nome + " | XP: " + xp);
\`\`\`

A função \`console.log()\` exibe valores no terminal e pode receber múltiplos argumentos separados por vírgula.`,
    initialCode: `// TODO: Declare as variáveis modernas e exiba o resultado:
// 1. Crie uma constante: const trilha = "JavaScript";
// 2. Crie uma variável mutável: let nivel = 1;
// 3. Crie uma constante: const bonus = 50;
// 4. Incremente o nível em 1: nivel += 1;
// 5. Exiba no console usando console.log():
//    console.log("Trilha:", trilha, "- Nível:", nivel, "(Bônus: +" + bonus + " XP)");

// Digite seu código abaixo:
`,
    solutionCode: `const trilha = "JavaScript";
let nivel = 1;
const bonus = 50;

nivel += 1;
console.log("Trilha:", trilha, "- Nível:", nivel, "(Bônus: +" + bonus + " XP)");`,
    instructions: 'Declare as variáveis trilha, nivel e bonus, incremente o nível e exiba no console.',
    hints: [
      'console.log exibe valores no console.',
      'Você pode separar variáveis por vírgula para imprimi-las com espaço automático.',
    ],
    testCases: [
      {
        id: 't-js-intro',
        description: 'Deve exibir mensagem formatada com Nível: 2',
        validator: (_code, output) => {
          const passed = output.includes('Trilha: JavaScript') && output.includes('Nível: 2');
          return {
            passed,
            message: passed ? 'Saída e variáveis ES6 validadas!' : 'Esperado "Trilha: JavaScript" e "Nível: 2" no console.',
          };
        },
      },
    ],
  },

  {
    id: 'js-functions',
    title: 'Arrow Functions e Retorno de Valores',
    trackId: 'javascript',
    category: 'Funções',
    description: 'Escreva funções concisas e reutilizáveis utilizando a sintaxe de seta (=>).',
    difficulty: 'Iniciante',
    xp: 65,
    estimatedMinutes: 7,
    theory: `### Arrow Functions em JavaScript

As arrow functions oferecem uma sintaxe muito mais limpa e moderna:

\`\`\`javascript
// Função tradicional
function somar(a, b) {
  return a + b;
}

// Arrow function equivalente
const somarArrow = (a, b) => a + b;

console.log(somarArrow(10, 20)); // 30
\`\`\`

Se houver apenas uma linha de retorno, podemos omitir as chaves \`{}\` e a palavra \`return\` (retorno implícito).`,
    initialCode: `// TODO:
// 1. Crie uma arrow function chamada 'dobrar' que recebe um parâmetro 'numero'
//    e retorna 'numero * 2'
// 2. Chame a função passando 21: const resultado = dobrar(21);
// 3. Imprima no console: console.log("O dobro de 21 é:", resultado);

// Digite sua arrow function abaixo:
`,
    solutionCode: `const dobrar = (numero) => numero * 2;

const resultado = dobrar(21);
console.log("O dobro de 21 é:", resultado);`,
    instructions: 'Declare a arrow function dobrar e exiba o dobro de 21 no terminal (42).',
    hints: [
      'A sintaxe (n) => n * 2 retorna diretamente a multiplicação.',
      'Chame a função passando 21 como parâmetro.',
    ],
    testCases: [
      {
        id: 't-js-func',
        description: 'Deve calcular e exibir 42',
        validator: (_code, output) => {
          const passed = output.includes('42');
          return {
            passed,
            message: passed ? 'Arrow function executada com sucesso!' : 'Esperado resultado 42 no console.',
          };
        },
      },
    ],
  },

  {
    id: 'js-conditionals',
    title: 'Condicionais e Operador Ternário',
    trackId: 'javascript',
    category: 'Controle de Fluxo',
    description: 'Controle o fluxo da aplicação com if/else e expressões ternárias concisas.',
    difficulty: 'Iniciante',
    xp: 75,
    estimatedMinutes: 7,
    theory: `### Decisões no JavaScript

Podemos usar blocos \`if / else\` tradicionais ou o operador ternário para atribuições diretas:

\`\`\`javascript
const idade = 20;
const status = idade >= 18 ? "Maior de idade" : "Menor de idade";
console.log(status);
\`\`\`

Operadores de igualdade estrita:
- \`===\` Compara valor e tipo (sempre preferível)
- \`!==\` Diferente estrito`,
    initialCode: `const pontuacao = 88;

// TODO:
// 1. Use o operador ternário para criar a variável 'situacao':
//    Se pontuacao >= 70 for verdadeiro: "Aprovado", senão "Reprovado"
//    Em seguida, imprima: console.log("Status do aluno:", situacao);
//
// 2. Crie uma estrutura if / else:
//    Se pontuacao >= 90: imprima "Menção: Honra ao Mérito"
//    Senão: imprima "Menção: Bom Desempenho"

// Digite seu código abaixo:
`,
    solutionCode: `const pontuacao = 88;

const situacao = pontuacao >= 70 ? "Aprovado" : "Reprovado";
console.log("Status do aluno:", situacao);

if (pontuacao >= 90) {
  console.log("Menção: Honra ao Mérito");
} else {
  console.log("Menção: Bom Desempenho");
}`,
    instructions: 'Execute a validação condicional com operador ternário e bloco if/else.',
    hints: [
      'A expressão condicao ? valorSeVerdade : valorSeFalso é ideal para variáveis.',
    ],
    testCases: [
      {
        id: 't-js-cond',
        description: 'Deve exibir Status do aluno: Aprovado',
        validator: (_code, output) => {
          const passed = output.includes('Aprovado') && output.includes('Bom Desempenho');
          return {
            passed,
            message: passed ? 'Condicionais validadas!' : 'Esperado "Aprovado" e "Bom Desempenho" na saída.',
          };
        },
      },
    ],
  },

  {
    id: 'js-arrays',
    title: 'Arrays e Laços de Repetição',
    trackId: 'javascript',
    category: 'Estruturas de Dados',
    description: 'Crie listas ordenadas e percorra seus elementos com for...of.',
    difficulty: 'Iniciante',
    xp: 80,
    estimatedMinutes: 8,
    theory: `### Vetores em JavaScript

Arrays são listas dinâmicas indexadas a partir do zero:

\`\`\`javascript
const linguagens = ["JavaScript", "TypeScript", "Node.js"];

console.log("Primeira:", linguagens[0]);
console.log("Quantidade:", linguagens.length);

for (const lang of linguagens) {
  console.log("Linguagem:", lang);
}
\`\`\``,
    initialCode: `// TODO:
// 1. Crie o array: const frameworks = ["React", "Vue", "Angular", "Svelte"];
// 2. Imprima a quantidade total: console.log("Total de frameworks:", frameworks.length);
// 3. Itere pelo array com 'for (const fw of frameworks)' e imprima:
//    console.log("Framework:", fw);

// Digite seu código abaixo:
`,
    solutionCode: `const frameworks = ["React", "Vue", "Angular", "Svelte"];

console.log("Total de frameworks:", frameworks.length);

for (const fw of frameworks) {
  console.log("Framework:", fw);
}`,
    instructions: 'Itere pelo array frameworks exibindo o total de itens e cada nome.',
    hints: [
      'O loop for (const item of lista) é a forma mais legível de percorrer arrays.',
      'frameworks.length retorna 4.',
    ],
    testCases: [
      {
        id: 't-js-arr',
        description: 'Deve iterar por todos os frameworks e exibir o total 4',
        validator: (_code, output) => {
          const passed = output.includes('Total de frameworks: 4') && output.includes('React');
          return {
            passed,
            message: passed ? 'Iteração de array validada!' : 'Esperado total 4 e os nomes dos frameworks.',
          };
        },
      },
    ],
  },

  {
    id: 'js-array-methods',
    title: 'Programação Funcional: map() e filter()',
    trackId: 'javascript',
    category: 'Manipulação de Dados',
    description: 'Transforme e filtre dados de arrays de forma declarativa e imutável.',
    difficulty: 'Intermediário',
    xp: 90,
    estimatedMinutes: 9,
    theory: `### map e filter no JavaScript

Métodos funcionais não alteram o array original:

- \`filter()\`: Retorna um novo array contendo apenas os elementos que passam no teste.
- \`map()\`: Transforma cada item do array aplicando uma função.

\`\`\`javascript
const numeros = [1, 2, 3, 4, 5, 6];

// Filtra apenas pares
const pares = numeros.filter(n => n % 2 === 0); // [2, 4, 6]

// Multiplica por 10
const multiplicados = pares.map(n => n * 10); // [20, 40, 60]
\`\`\``,
    initialCode: `const precos = [10, 25, 40, 55, 80];

// TODO:
// 1. Filtre apenas os preços maiores que 30:
//    const caros = precos.filter(preco => preco > 30);
//    Imprima: console.log("Preços maiores que 30:", caros);
//
// 2. Transforme cada preço filtrado aplicando taxa de 10% (multiplicar por 1.1):
//    const comTaxa = caros.map(preco => preco * 1.1);
//    Imprima: console.log("Com taxa:", comTaxa);

// Digite seu código abaixo:
`,
    solutionCode: `const precos = [10, 25, 40, 55, 80];

const caros = precos.filter(preco => preco > 30);
console.log("Preços maiores que 30:", caros);

const comTaxa = caros.map(preco => preco * 1.1);
console.log("Com taxa:", comTaxa);`,
    instructions: 'Filtre os preços superiores a 30 e mapeie aplicando a taxa.',
    hints: [
      'O método filter retorna um array com [40, 55, 80].',
      'O método map transforma cada número multiplicando por 1.1.',
    ],
    testCases: [
      {
        id: 't-js-map-filter',
        description: 'Deve filtrar e mapear os valores',
        validator: (_code, output) => {
          const passed = output.includes('40') && output.includes('55') && output.includes('80');
          return {
            passed,
            message: passed ? 'Métodos funcionais validados com sucesso!' : 'Valores esperados não encontrados na saída.',
          };
        },
      },
    ],
  },

  {
    id: 'js-objects',
    title: 'Objetos e Desestruturação (Destructuring)',
    trackId: 'javascript',
    category: 'Estruturas de Dados',
    description: 'Modele entidades com objetos literais e extraia propriedades com facilidade.',
    difficulty: 'Intermediário',
    xp: 95,
    estimatedMinutes: 9,
    theory: `### Objetos Literais e Desestruturação

Objetos armazenam pares de chave-valor:

\`\`\`javascript
const usuario = {
  nome: "Davy",
  cargo: "Software Engineer",
  nivel: 5,
};

// Desestruturação elegante ES6
const { nome, cargo } = usuario;
console.log("Colaborador:", nome, "-", cargo);
\`\`\``,
    initialCode: `const dev = {
  nome: "Lucas",
  linguagem: "JavaScript",
  experienciaAnos: 4,
  ativo: true,
};

// TODO:
// 1. Extraia as propriedades 'nome', 'linguagem' e 'experienciaAnos' usando desestruturação:
//    const { nome, linguagem, experienciaAnos } = dev;
//
// 2. Exiba as propriedades no console no seguinte formato:
//    console.log("Dev:", nome);
//    console.log("Especialidade:", linguagem);
//    console.log("Experiência:", experienciaAnos, "anos");

// Digite seu código abaixo:
`,
    solutionCode: `const dev = {
  nome: "Lucas",
  linguagem: "JavaScript",
  experienciaAnos: 4,
  ativo: true,
};

const { nome, linguagem, experienciaAnos } = dev;

console.log("Dev:", nome);
console.log("Especialidade:", linguagem);
console.log("Experiência:", experienciaAnos, "anos");`,
    instructions: 'Extraia as propriedades do objeto dev com desestruturação e exiba suas informações.',
    hints: [
      'A sintaxe const { prop1, prop2 } = objeto extrai as variáveis diretamente.',
    ],
    testCases: [
      {
        id: 't-js-obj',
        description: 'Deve exibir os dados desestruturados do desenvolvedor',
        validator: (_code, output) => {
          const passed = output.includes('Lucas') && output.includes('JavaScript') && output.includes('4 anos');
          return {
            passed,
            message: passed ? 'Desestruturação e objetos validados!' : 'Esperado dados do dev Lucas no console.',
          };
        },
      },
    ],
  },
];
