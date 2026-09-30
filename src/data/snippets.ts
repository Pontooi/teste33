import { TrackId } from '../types';

export interface CodeSnippet {
  id: string;
  prefix: string;
  label: string;
  description: string;
  body: string;
  trackId: TrackId;
}

export const SNIPPETS: CodeSnippet[] = [
  // --- JAVA SNIPPETS ---
  {
    id: 'java-sout',
    prefix: 'sout',
    label: 'sout',
    description: 'System.out.println("");',
    body: 'System.out.println("");',
    trackId: 'java',
  },
  {
    id: 'java-sysout',
    prefix: 'sysout',
    label: 'sysout',
    description: 'System.out.println("");',
    body: 'System.out.println("");',
    trackId: 'java',
  },
  {
    id: 'java-main',
    prefix: 'main',
    label: 'main',
    description: 'public static void main(String[] args) { ... }',
    body: `public static void main(String[] args) {
    
}`,
    trackId: 'java',
  },
  {
    id: 'java-psvm',
    prefix: 'psvm',
    label: 'psvm',
    description: 'public static void main(String[] args) { ... }',
    body: `public static void main(String[] args) {
    
}`,
    trackId: 'java',
  },
  {
    id: 'java-class',
    prefix: 'class',
    label: 'class',
    description: 'public class Main { ... }',
    body: `public class Main {
    public static void main(String[] args) {
        System.out.println("Olá, mundo!");
    }
}`,
    trackId: 'java',
  },
  {
    id: 'java-fori',
    prefix: 'fori',
    label: 'fori',
    description: 'for (int i = 0; i < n; i++) { ... }',
    body: `for (int i = 0; i < 5; i++) {
    System.out.println("Índice: " + i);
}`,
    trackId: 'java',
  },
  {
    id: 'java-fore',
    prefix: 'fore',
    label: 'fore',
    description: 'for (String item : lista) { ... }',
    body: `for (String item : itens) {
    System.out.println(item);
}`,
    trackId: 'java',
  },
  {
    id: 'java-ife',
    prefix: 'ife',
    label: 'ife',
    description: 'if (condicao) { ... } else { ... }',
    body: `if (condicao) {
    
} else {
    
}`,
    trackId: 'java',
  },
  {
    id: 'java-func',
    prefix: 'func',
    label: 'func',
    description: 'public static void meuMetodo() { ... }',
    body: `public static void meuMetodo() {
    
}`,
    trackId: 'java',
  },

  // --- PYTHON SNIPPETS ---
  {
    id: 'py-print',
    prefix: 'print',
    label: 'print',
    description: 'print("")',
    body: 'print("")',
    trackId: 'python',
  },
  {
    id: 'py-pr',
    prefix: 'pr',
    label: 'pr',
    description: 'print("")',
    body: 'print("")',
    trackId: 'python',
  },
  {
    id: 'py-def',
    prefix: 'def',
    label: 'def',
    description: 'def minha_funcao(arg): return ...',
    body: `def minha_funcao(parametro):
    return parametro`,
    trackId: 'python',
  },
  {
    id: 'py-forin',
    prefix: 'forin',
    label: 'forin',
    description: 'for item in lista: print(item)',
    body: `for item in lista:
    print(item)`,
    trackId: 'python',
  },
  {
    id: 'py-forr',
    prefix: 'forr',
    label: 'forr',
    description: 'for i in range(5): ...',
    body: `for i in range(5):
    print("Contagem:", i)`,
    trackId: 'python',
  },
  {
    id: 'py-ife',
    prefix: 'ife',
    label: 'ife',
    description: 'if condicao: ... else: ...',
    body: `if condicao:
    pass
else:
    pass`,
    trackId: 'python',
  },
  {
    id: 'py-main',
    prefix: 'main',
    label: 'main',
    description: 'if __name__ == "__main__":',
    body: `if __name__ == "__main__":
    print("Executando script...")`,
    trackId: 'python',
  },

  // --- JAVASCRIPT SNIPPETS ---
  {
    id: 'js-clg',
    prefix: 'clg',
    label: 'clg',
    description: 'console.log();',
    body: 'console.log();',
    trackId: 'javascript',
  },
  {
    id: 'js-log',
    prefix: 'log',
    label: 'log',
    description: 'console.log();',
    body: 'console.log();',
    trackId: 'javascript',
  },
  {
    id: 'js-afn',
    prefix: 'afn',
    label: 'afn',
    description: 'const minhaFuncao = () => { ... };',
    body: `const minhaFuncao = () => {
  
};`,
    trackId: 'javascript',
  },
  {
    id: 'js-arrow',
    prefix: 'arrow',
    label: 'arrow',
    description: 'const minhaFuncao = (param) => param * 2;',
    body: `const dobrar = (numero) => numero * 2;`,
    trackId: 'javascript',
  },
  {
    id: 'js-fn',
    prefix: 'fn',
    label: 'fn',
    description: 'function nomeFuncao() { ... }',
    body: `function minhaFuncao() {
  
}`,
    trackId: 'javascript',
  },
  {
    id: 'js-forof',
    prefix: 'forof',
    label: 'forof',
    description: 'for (const item of lista) { ... }',
    body: `for (const item of lista) {
  console.log(item);
}`,
    trackId: 'javascript',
  },
  {
    id: 'js-map',
    prefix: 'map',
    label: 'map',
    description: 'const novos = lista.map(item => ...);',
    body: `const transformados = lista.map(item => item * 2);`,
    trackId: 'javascript',
  },
  {
    id: 'js-filter',
    prefix: 'filter',
    label: 'filter',
    description: 'const filtrados = lista.filter(item => ...);',
    body: `const filtrados = lista.filter(item => item > 0);`,
    trackId: 'javascript',
  },
  {
    id: 'js-ife',
    prefix: 'ife',
    label: 'ife',
    description: 'if (condicao) { ... } else { ... }',
    body: `if (condicao) {
  
} else {
  
}`,
    trackId: 'javascript',
  },

  // --- HTML5 SNIPPETS ---
  {
    id: 'html-doc',
    prefix: 'html5',
    label: 'html5',
    description: '<!DOCTYPE html> com estrutura básica',
    body: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Meu Projeto</title>
</head>
<body>
  <header>
    <h1>Título da Página</h1>
  </header>
</body>
</html>`,
    trackId: 'html',
  },
  {
    id: 'html-form',
    prefix: 'form',
    label: 'form',
    description: '<form> com labels, inputs e botão',
    body: `<form>
  <label for="nome">Nome:</label>
  <input type="text" id="nome" required />
  <button type="submit">Enviar</button>
</form>`,
    trackId: 'html',
  },
  {
    id: 'html-nav',
    prefix: 'nav',
    label: 'nav',
    description: '<nav> com lista de links',
    body: `<nav>
  <ul>
    <li><a href="#inicio">Início</a></li>
    <li><a href="#sobre">Sobre</a></li>
  </ul>
</nav>`,
    trackId: 'html',
  },
  {
    id: 'html-table',
    prefix: 'table',
    label: 'table',
    description: '<table> com thead e tbody',
    body: `<table>
  <thead>
    <tr>
      <th>Item</th>
      <th>Valor</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Produto</td>
      <td>R$ 100</td>
    </tr>
  </tbody>
</table>`,
    trackId: 'html',
  },

  // --- CSS3 SNIPPETS ---
  {
    id: 'css-flex',
    prefix: 'flex',
    label: 'flex',
    description: 'display: flex com alinhamento central',
    body: `display: flex;
align-items: center;
justify-content: center;
gap: 16px;`,
    trackId: 'css',
  },
  {
    id: 'css-grid',
    prefix: 'grid',
    label: 'grid',
    description: 'display: grid com repeat(3, 1fr)',
    body: `display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 20px;`,
    trackId: 'css',
  },
  {
    id: 'css-card',
    prefix: 'card',
    label: 'card',
    description: 'Estilo de card moderno com borda e sombra',
    body: `background-color: #120c22;
border: 1px solid #7e22ce;
border-radius: 12px;
padding: 20px;
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);`,
    trackId: 'css',
  },
  {
    id: 'css-hover',
    prefix: 'hover',
    label: 'hover',
    description: 'Transição suave com elevação em :hover',
    body: `transition: transform 0.2s ease, box-shadow 0.2s ease;
&:hover {
  transform: translateY(-2px);
}`,
    trackId: 'css',
  },
];

export function getSnippetsByTrack(trackId: TrackId): CodeSnippet[] {
  return SNIPPETS.filter((s) => s.trackId === trackId);
}
