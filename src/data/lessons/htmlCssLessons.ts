import { Lesson } from '../../types';

export const htmlLessons: Lesson[] = [
  {
    id: 'html-intro',
    title: 'Estrutura HTML5 Semântica',
    trackId: 'html',
    category: 'Estruturação Web',
    description: 'Aprenda a estruturar páginas com tags semânticas, cabeçalhos e parágrafos.',
    difficulty: 'Iniciante',
    xp: 50,
    estimatedMinutes: 6,
    theory: `### HTML5 Semântico

HTML é a espinha dorsal de qualquer site ou web app.
O uso de tags semânticas melhora a acessibilidade para leitores de tela e otimiza a indexação para o Google (SEO).

\`\`\`html
<header>
  <h1>DualDev Academy</h1>
</header>
<main>
  <p>Construindo interfaces incríveis!</p>
</main>
\`\`\`

- \`<header>\`: Cabeçalho da página ou seção.
- \`<h1>\` a \`<h6>\`: Títulos em ordem de relevância hierárquica.
- \`<p>\`: Parágrafos de texto corrido.`,
    initialCode: `<!-- TODO: Estruture o cabeçalho semântico da página
     1. Abra a tag <header>
     2. Dentro dela, insira um título <h1> com o texto: DualDev Academy
     3. Insira um parágrafo <p> com o texto: Aprenda desenvolvimento web do zero ao avançado.
     4. Feche a tag </header>
-->

<!-- Escreva sua marcação HTML abaixo: -->
`,
    solutionCode: `<header>
  <h1>DualDev Academy</h1>
  <p>Aprenda desenvolvimento web do zero ao avançado.</p>
</header>`,
    instructions: 'Estruture o cabeçalho com <header>, título <h1> com "DualDev Academy" e parágrafo <p>.',
    hints: ['Tags de bloco como <h1> e <p> separam os conteúdos visualmente.'],
    testCases: [
      {
        id: 't-html-tags',
        description: 'Deve conter tags <header>, <h1> e <p>',
        validator: (code) => {
          const passed = code.includes('<header>') && code.includes('<h1>') && code.includes('</header>');
          return {
            passed,
            message: passed ? 'Estrutura HTML válida!' : 'Certifique-se de incluir as tags <header>, <h1> e fechar </header>.',
          };
        },
      },
    ],
  },

  {
    id: 'html-lists-links',
    title: 'Links e Listas Ordenadas/Não-Ordenadas',
    trackId: 'html',
    category: 'Estruturação Web',
    description: 'Crie listas de itens (<ul>, <ol>, <li>) e links de navegação com hipertexto (<a>).',
    difficulty: 'Iniciante',
    xp: 60,
    estimatedMinutes: 7,
    theory: `### Listas e Hiperlinks

Listas organizam conteúdos correlatos:
- \`<ul>\`: Lista não ordenada (com marcadores/bullets).
- \`<ol>\`: Lista ordenada (numerada sequencialmente).
- \`<li>\`: Cada item individual da lista.

\`\`\`html
<ul>
  <li>Java</li>
  <li>Python</li>
  <li>JavaScript</li>
</ul>
\`\`\`

Links de hipertexto conectam páginas:
\`\`\`html
<a href="https://dualdev.io" target="_blank">Acessar DualDev</a>
\`\`\``,
    initialCode: `<!-- TODO: Crie um menu de navegação:
     1. Crie a tag <nav>
     2. Adicione um <h2> com o texto: Trilhas Disponíveis
     3. Crie uma lista <ul> com 3 itens <li> contendo links <a>:
        - <a href="#java">Trilha Java</a>
        - <a href="#python">Trilha Python</a>
        - <a href="#js">Trilha JavaScript</a>
     4. Feche a lista </ul> e a tag </nav>
-->

<!-- Escreva seu menu abaixo: -->
`,
    solutionCode: `<nav>
  <h2>Trilhas Disponíveis</h2>
  <ul>
    <li><a href="#java">Trilha Java</a></li>
    <li><a href="#python">Trilha Python</a></li>
    <li><a href="#js">Trilha JavaScript</a></li>
  </ul>
</nav>`,
    instructions: 'Crie um menu de navegação utilizando as tags <nav>, <ul>, <li> e links <a>.',
    hints: [
      'A tag <a> utiliza o atributo href para definir o destino do link.',
      'Cada item dentro de <ul> deve ser delimitado por <li>.',
    ],
    testCases: [
      {
        id: 't-html-lists',
        description: 'Deve conter tags <nav>, <ul>, <li> e <a href',
        validator: (code) => {
          const passed = code.includes('<nav>') && code.includes('<ul>') && code.includes('<a href=');
          return {
            passed,
            message: passed ? 'Navegação e listas estruturadas com sucesso!' : 'Verifique se incluiu <nav>, <ul> e links <a href=...>.',
          };
        },
      },
    ],
  },

  {
    id: 'html-forms',
    title: 'Formulários e Campos de Entrada (Forms)',
    trackId: 'html',
    category: 'Interatividade Web',
    description: 'Construa formulários com labels, inputs de texto, email, senha e botões de envio.',
    difficulty: 'Iniciante',
    xp: 75,
    estimatedMinutes: 8,
    theory: `### Formulários na Web

O elemento \`<form>\` agrupa campos de entrada para coletar dados do usuário:

\`\`\`html
<form>
  <label for="email">E-mail do Dev:</label>
  <input type="email" id="email" placeholder="seu@email.com" required />
  
  <button type="submit">Cadastrar</button>
</form>
\`\`\`

- O atributo \`type\` define o comportamento (text, email, password, number).
- A tag \`<label>\` associada com \`for\` e \`id\` garante acessibilidade total.`,
    initialCode: `<!-- TODO: Crie um formulário de cadastro com acessibilidade:
     1. Abra a tag <form>
     2. Campo Nome:
        <label for="nome">Nome Completo:</label>
        <input type="text" id="nome" placeholder="Digite seu nome" required />
     3. Campo E-mail:
        <label for="email">E-mail:</label>
        <input type="email" id="email" placeholder="dev@exemplo.com" required />
     4. Botão de envio:
        <button type="submit">Iniciar Jornada</button>
     5. Feche a tag </form>
-->

<!-- Escreva seu formulário abaixo: -->
`,
    solutionCode: `<form>
  <div class="campo">
    <label for="nome">Nome Completo:</label>
    <input type="text" id="nome" placeholder="Digite seu nome" required />
  </div>

  <div class="campo">
    <label for="email">E-mail:</label>
    <input type="email" id="email" placeholder="dev@exemplo.com" required />
  </div>

  <button type="submit">Iniciar Jornada</button>
</form>`,
    instructions: 'Estruture um formulário de cadastro com campos para nome, email e botão de envio.',
    hints: [
      'Certifique-se de que cada input possui um id correspondente ao for da sua label.',
    ],
    testCases: [
      {
        id: 't-html-form',
        description: 'Deve conter <form>, <input type="email" e <button',
        validator: (code) => {
          const passed = code.includes('<form>') && code.includes('type="email"') && code.includes('<button');
          return {
            passed,
            message: passed ? 'Formulário acessível estruturado!' : 'Campos de formulário esperados não encontrados (<form>, <input type="email"> e <button>).',
          };
        },
      },
    ],
  },

  {
    id: 'html-tables',
    title: 'Tabelas Semânticas de Dados (table)',
    trackId: 'html',
    category: 'Estruturação Web',
    description: 'Organize dados tabulares com <table>, <thead>, <tbody>, <tr>, <th> e <td>.',
    difficulty: 'Intermediário',
    xp: 80,
    estimatedMinutes: 8,
    theory: `### Tabelas Semânticas

Tabelas devem ser usadas exclusivamente para exibir dados bidimensionais (linhas e colunas):

\`\`\`html
<table>
  <thead>
    <tr>
      <th>Tecnologia</th>
      <th>Nível</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Java</td>
      <td>Avançado</td>
    </tr>
  </tbody>
</table>
\`\`\``,
    initialCode: `<!-- TODO: Crie uma tabela semântica de dados:
     1. Abra a tag <table>
     2. No cabeçalho <thead>, crie uma linha <tr> com 3 títulos <th>:
        Linguagem, Módulos, XP Total
     3. No corpo <tbody>, adicione linhas <tr> com células <td> contendo dados das linguagens (ex: Java e Python)
     4. Feche as tags <tbody> e <table>
-->

<!-- Escreva sua tabela abaixo: -->
`,
    solutionCode: `<table>
  <thead>
    <tr>
      <th>Linguagem</th>
      <th>Módulos</th>
      <th>XP Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Java</td>
      <td>7</td>
      <td>520 XP</td>
    </tr>
    <tr>
      <td>Python</td>
      <td>6</td>
      <td>440 XP</td>
    </tr>
  </tbody>
</table>`,
    instructions: 'Monte a tabela de trilhas com cabeçalho (<thead>) e corpo com as linhas de dados (<tbody>).',
    hints: ['Use <th> para células de cabeçalho e <td> para células de dados comuns.'],
    testCases: [
      {
        id: 't-html-table',
        description: 'Deve conter estrutura completa de <table>, <thead> e <tbody>',
        validator: (code) => {
          const passed = code.includes('<table>') && code.includes('<thead>') && code.includes('<tbody>');
          return {
            passed,
            message: passed ? 'Tabela semântica estruturada!' : 'Estrutura da tabela incompleta (verifique <table>, <thead> e <tbody>).',
          };
        },
      },
    ],
  },

  {
    id: 'html-media',
    title: 'Mídias Acessíveis: Imagens e Figuras',
    trackId: 'html',
    category: 'Multimídia',
    description: 'Insira imagens com tags semânticas <figure>, <figcaption> e texto alternativo.',
    difficulty: 'Intermediário',
    xp: 85,
    estimatedMinutes: 7,
    theory: `### Imagens e Acessibilidade

O atributo \`alt\` nas imagens é obrigatório para acessibilidade e leitores de tela:

\`\`\`html
<figure>
  <img src="banner.png" alt="Logotipo do DualDev com tema roxo e ícone de código" />
  <figcaption>Figura 1: Logotipo oficial da academia DualDev.</figcaption>
</figure>
\`\`\``,
    initialCode: `<!-- TODO: Crie um elemento de mídia semântico e acessível:
     1. Abra a tag <figure>
     2. Insira a tag <img> com os atributos:
        src="code-icon.svg"
        alt="Ícone de código em degradê roxo"
     3. Insira a legenda com <figcaption>Ambiente de aprendizagem interativa</figcaption>
     4. Feche a tag </figure>
-->

<!-- Escreva a tag figure abaixo: -->
`,
    solutionCode: `<section class="galeria">
  <figure>
    <img src="code-icon.svg" alt="Ícone de código em degradê roxo" width="64" height="64" />
    <figcaption>Ambiente de aprendizagem interativa</figcaption>
  </figure>
</section>`,
    instructions: 'Declare um bloco de imagem utilizando <figure>, <img alt="..."> e <figcaption>.',
    hints: ['O atributo alt descreve o conteúdo visual da imagem.'],
    testCases: [
      {
        id: 't-html-media',
        description: 'Deve conter <figure>, <img alt= e <figcaption>',
        validator: (code) => {
          const passed = code.includes('<figure>') && code.includes('alt=') && code.includes('<figcaption>');
          return {
            passed,
            message: passed ? 'Mídia acessível validada!' : 'Certifique-se de incluir as tags <figure>, <img alt="..."> e <figcaption>.',
          };
        },
      },
    ],
  },
];

export const cssLessons: Lesson[] = [
  {
    id: 'css-intro',
    title: 'Seletores, Cores e Tipografia',
    trackId: 'css',
    category: 'Estilos e Design',
    description: 'Aprenda a aplicar cores, estilizar fontes e selecionar classes e elementos.',
    difficulty: 'Iniciante',
    xp: 50,
    estimatedMinutes: 6,
    theory: `### Fundamentos de CSS3

O CSS (Cascading Style Sheets) estiliza a estrutura HTML:

\`\`\`css
/* Seletor de classe */
.card-titulo {
  color: #9333ea;          /* Cor roxa */
  font-size: 1.5rem;       /* Tamanho da fonte */
  font-weight: 700;        /* Peso em negrito */
  line-height: 1.4;        /* Altura da linha */
}
\`\`\``,
    initialCode: `/* TODO: Estilize o seletor .hero-title
   1. Defina a cor do texto: color: #a855f7;
   2. Defina o tamanho da fonte: font-size: 2rem;
   3. Defina o peso em negrito: font-weight: bold;
*/

.hero-title {
  /* Digite suas propriedades CSS aqui */
}
`,
    solutionCode: `.hero-title {
  color: #a855f7;
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: -0.02em;
}`,
    instructions: 'Estilize o seletor .hero-title com cor roxa, tamanho de fonte e negrito.',
    hints: ['Use color para o texto e font-size para a dimensão da fonte.'],
    testCases: [
      {
        id: 't-css-intro',
        description: 'Deve conter propriedades color e font-size',
        validator: (code) => {
          const passed = code.includes('color:') && code.includes('font-size:');
          return {
            passed,
            message: passed ? 'Seletores e tipografia aplicados!' : 'Propriedades color e font-size não encontradas no código CSS.',
          };
        },
      },
    ],
  },

  {
    id: 'css-box-model',
    title: 'O Modelo de Caixa (Box Model)',
    trackId: 'css',
    category: 'Layout',
    description: 'Entenda margin, padding, border e a propriedade box-sizing: border-box.',
    difficulty: 'Iniciante',
    xp: 65,
    estimatedMinutes: 7,
    theory: `### O Box Model

Todo elemento HTML é uma caixa composta por:
1. **Conteúdo**: Onde fica o texto ou imagem.
2. **Padding**: Espaçamento interno entre o conteúdo e a borda.
3. **Border**: Borda ao redor do padding.
4. **Margin**: Espaçamento externo entre a caixa e outros elementos.

\`\`\`css
.caixa {
  box-sizing: border-box;
  padding: 16px;
  margin: 24px 0;
  border: 1px solid #7e22ce;
  border-radius: 8px;
}
\`\`\``,
    initialCode: `/* TODO: Configure o Box Model para a classe .card-aula
   1. Defina: box-sizing: border-box;
   2. Adicione espaçamento interno: padding: 20px;
   3. Adicione borda: border: 1px solid #a855f7;
   4. Arredonde os cantos: border-radius: 12px;
*/

.card-aula {
  /* Digite suas propriedades aqui */
}
`,
    solutionCode: `.card-aula {
  box-sizing: border-box;
  padding: 20px;
  margin-bottom: 16px;
  border: 1px solid #a855f7;
  border-radius: 12px;
  background-color: #120c22;
}`,
    instructions: 'Configure o box model com padding, border e border-radius.',
    hints: ['box-sizing: border-box garante que o padding seja incluído na largura total.'],
    testCases: [
      {
        id: 't-css-box',
        description: 'Deve conter padding, border e border-radius',
        validator: (code) => {
          const passed = code.includes('padding:') && code.includes('border:') && code.includes('border-radius:');
          return {
            passed,
            message: passed ? 'Box model estruturado com sucesso!' : 'Propriedades de box model ausentes (padding, border e border-radius).',
          };
        },
      },
    ],
  },

  {
    id: 'css-flexbox',
    title: 'Layout Moderno com Flexbox',
    trackId: 'css',
    category: 'Layout',
    description: 'Alinhe itens horizontalmente e verticalmente com display: flex.',
    difficulty: 'Intermediário',
    xp: 80,
    estimatedMinutes: 8,
    theory: `### Flexbox: Alinhamento Perfeito

O Flexbox revolucionou o alinhamento de elementos em uma dimensão:

\`\`\`css
.navbar {
  display: flex;
  align-items: center;          /* Alinhamento no eixo cruzado (vertical) */
  justify-content: space-between; /* Distribuição no eixo principal (horizontal) */
  gap: 16px;                   /* Espaço uniforme entre os itens */
}
\`\`\``,
    initialCode: `/* TODO: Alinhe os itens da barra de navegação com Flexbox:
   1. Ative o flexbox: display: flex;
   2. Distribua os itens para as extremidades: justify-content: space-between;
   3. Alinhe verticalmente ao centro: align-items: center;
   4. Defina o espaçamento entre itens: gap: 12px;
*/

.barra-navegacao {
  /* Digite suas propriedades flex aqui */
}
`,
    solutionCode: `.barra-navegacao {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 24px;
}`,
    instructions: 'Crie uma barra de navegação alinhada com Flexbox (display: flex, justify-content e align-items).',
    hints: ['justify-content: space-between afasta os itens para as pontas.'],
    testCases: [
      {
        id: 't-css-flex',
        description: 'Deve conter display: flex e justify-content',
        validator: (code) => {
          const passed = code.includes('display: flex') && code.includes('justify-content:');
          return {
            passed,
            message: passed ? 'Flexbox validado com sucesso!' : 'Declare display: flex e justify-content no código CSS.',
          };
        },
      },
    ],
  },

  {
    id: 'css-grid',
    title: 'CSS Grid: Grids Bidimensionais',
    trackId: 'css',
    category: 'Layout',
    description: 'Construa grades responsivas com repeat(), minmax() e propriedades grid.',
    difficulty: 'Intermediário',
    xp: 85,
    estimatedMinutes: 9,
    theory: `### CSS Grid Layout

Enquanto Flexbox foca em uma dimensão, o CSS Grid controla linhas E colunas simultaneamente:

\`\`\`css
.cards-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
\`\`\``,
    initialCode: `/* TODO: Crie uma grade de 3 colunas para os cards de trilhas:
   1. Ative a grade com: display: grid;
   2. Crie 3 colunas iguais: grid-template-columns: repeat(3, 1fr);
   3. Defina um espaçamento de: gap: 24px;
*/

.trilhas-grid {
  /* Digite suas regras de grid aqui */
}
`,
    solutionCode: `.trilhas-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}`,
    instructions: 'Estruture uma grade de 3 colunas com display: grid e repeat(3, 1fr).',
    hints: ['A unidade fr representa uma fração do espaço disponível.'],
    testCases: [
      {
        id: 't-css-grid',
        description: 'Deve conter display: grid e grid-template-columns',
        validator: (code) => {
          const passed = code.includes('display: grid') && code.includes('grid-template-columns:');
          return {
            passed,
            message: passed ? 'CSS Grid validado com sucesso!' : 'Propriedades de CSS Grid ausentes (display: grid e grid-template-columns).',
          };
        },
      },
    ],
  },

  {
    id: 'css-effects',
    title: 'Transições, Efeitos Hover e Sombras',
    trackId: 'css',
    category: 'Animações e Efeitos',
    description: 'Adicione polimento visual com transition, box-shadow e estados :hover.',
    difficulty: 'Intermediário',
    xp: 90,
    estimatedMinutes: 8,
    theory: `### Microinterações e Transições Fluidas

Interfaces profissionais reagem suavemente ao cursor do usuário:

\`\`\`css
.botao-primario {
  background: linear-gradient(135deg, #9333ea, #6366f1);
  box-shadow: 0 4px 14px rgba(147, 51, 234, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.botao-primario:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(147, 51, 234, 0.45);
}
\`\`\``,
    initialCode: `/* TODO: Adicione suavidade e microinteração ao botão:
   1. Em .botao-dualdev, adicione:
      transition: transform 0.2s ease;
   2. No estado hover .botao-dualdev:hover, adicione:
      transform: translateY(-2px);
*/

.botao-dualdev {
  background-color: #9333ea;
  color: #ffffff;
  border-radius: 8px;
  /* Digite a transição aqui */
}

.botao-dualdev:hover {
  /* Digite a transformação aqui */
}
`,
    solutionCode: `.botao-dualdev {
  background-color: #9333ea;
  color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(147, 51, 234, 0.3);
  transition: transform 0.2s ease;
}

.botao-dualdev:hover {
  transform: translateY(-2px);
}`,
    instructions: 'Aplique transition e o pseudoseletor :hover para criar uma elevação suave.',
    hints: ['transform: translateY(-2px) eleva o botão suavemente ao passar o mouse.'],
    testCases: [
      {
        id: 't-css-hover',
        description: 'Deve conter transition e :hover com transform',
        validator: (code) => {
          const passed = code.includes('transition:') && code.includes(':hover') && code.includes('transform:');
          return {
            passed,
            message: passed ? 'Transições e efeitos hover validados!' : 'Efeito hover e transition esperados no código CSS.',
          };
        },
      },
    ],
  },
];
