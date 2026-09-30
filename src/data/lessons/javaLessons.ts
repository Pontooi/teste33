import { Lesson } from '../../types';

export const javaLessons: Lesson[] = [
  {
    id: 'java-intro',
    title: 'Introdução e Primeiro Programa',
    trackId: 'java',
    category: 'Fundamentos',
    description: 'Conheça o Java, entenda o System.out.println e execute seu primeiro código.',
    difficulty: 'Iniciante',
    xp: 50,
    estimatedMinutes: 5,
    theory: `### Bem-vindo ao Java no DualDev!

Java é uma linguagem de programação compilada, orientada a objetos e fortemente tipada.
Para exibir mensagens no terminal (saída padrão), utilizamos:

\`\`\`java
System.out.println("Sua mensagem aqui");
\`\`\`

- \`System\` é uma classe interna que fornece acesso a recursos do sistema.
- \`out\` é a saída padrão do console.
- \`println\` imprime o texto e pula para a próxima linha.
- Toda instrução em Java deve ser finalizada com ponto e vírgula (\`;\`).`,
    initialCode: `public class Main {
    public static void main(String[] args) {
        // TODO: Escreva sua primeira linha de código em Java!
        // Use System.out.println para imprimir exatamente: "Olá, DualDev!"
        
    }
}`,
    solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Olá, DualDev!");
    }
}`,
    instructions: 'Execute o programa com o botão "Executar" e veja a saída no console. Certifique-se de que a mensagem "Olá, DualDev!" seja exibida.',
    hints: [
      'Use System.out.println("Olá, DualDev!");',
      'Não se esqueça do ponto e vírgula no final da linha.',
    ],
    testCases: [
      {
        id: 't1',
        description: 'Deve imprimir "Olá, DualDev!" na saída',
        validator: (code, output) => {
          const passed = output.includes('Olá, DualDev!');
          return {
            passed,
            message: passed
              ? 'Mensagem impressa com sucesso!'
              : 'Não foi encontrada a mensagem "Olá, DualDev!" na saída do console.',
          };
        },
      },
    ],
  },

  {
    id: 'java-class-main',
    title: 'Classe e main',
    trackId: 'java',
    category: 'Estrutura da Linguagem',
    description: 'Aprenda a anatomia da classe Java e por que todo programa começa pelo método main.',
    difficulty: 'Iniciante',
    xp: 75,
    estimatedMinutes: 8,
    theory: `### A Estrutura Básica: Classe e Método main

Em Java, **todo código executável deve estar contido dentro de uma classe**. 

\`\`\`java
public class Main {
    public static void main(String[] args) {
        // Ponto de entrada do programa!
    }
}
\`\`\`

#### Desvendando a assinatura do método \`main\`:
1. **\`public\`**: Modificador de acesso que permite que a máquina virtual (JVM) acesse o método de fora da classe.
2. **\`static\`**: Permite que o método seja executado diretamente pela classe, sem precisar instanciar um objeto primeiro (\`new Main()\`).
3. **\`void\`**: Tipo de retorno que indica que o método não retorna nenhum valor após ser executado.
4. **\`main\`**: Nome reservado que a JVM procura como ponto de partida da aplicação.
5. **\`String[] args\`**: Vetor de argumentos de linha de comando que podem ser passados para o programa.

#### Regras fundamentais:
- O nome da classe deve começar com letra maiúscula (convenção PascalCase, ex: \`Calculadora\`, \`Main\`, \`Usuario\`).
- As chaves \`{ }\` delimitam o corpo da classe e do método.`,
    initialCode: `public class Main {
    // TODO: Declare o método principal 'main' com a assinatura:
    // public static void main(String[] args)
    //
    // E execute as seguintes instruções:
    // 1. Imprima a mensagem exata: "Executando método main no DualDev!"
    // 2. Declare a variável: int versao = 21;
    // 3. Imprima: "Java Versao: " + versao
    
}`,
    solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Executando método main no DualDev!");
        int versao = 21;
        System.out.println("Java Versao: " + versao);
    }
}`,
    instructions: 'Certifique-se de que a classe Main possua o método `public static void main(String[] args)`, que imprima "Executando método main no DualDev!" e em seguida imprima "Java Versao: 21".',
    hints: [
      'A assinatura exata do método deve ser: public static void main(String[] args)',
      'Concatene strings usando o operador + : "Java Versao: " + versao',
      'Finalize cada declaração com ponto e vírgula (;).',
    ],
    testCases: [
      {
        id: 't-main-method',
        description: 'O código deve conter o método `public static void main`',
        validator: (code) => {
          const hasMain = /static\s+void\s+main\s*\(\s*String\s*\[\s*\]\s*[a-zA-Z0-9_]+\s*\)/.test(code);
          return {
            passed: hasMain,
            message: hasMain
              ? 'Assinatura do método main identificada corretamente.'
              : 'O método main com "public static void main(String[] args)" não foi encontrado no código.',
          };
        },
      },
      {
        id: 't-main-output',
        description: 'Deve imprimir "Executando método main no DualDev!"',
        validator: (code, output) => {
          const passed = output.includes('Executando método main no DualDev!');
          return {
            passed,
            message: passed
              ? 'Mensagem do método main exibida com sucesso.'
              : 'A saída deve conter exatamente: "Executando método main no DualDev!"',
          };
        },
      },
      {
        id: 't-main-versao',
        description: 'Deve imprimir a versão Java: "Java Versao: 21"',
        validator: (code, output) => {
          const passed = output.includes('Java Versao: 21');
          return {
            passed,
            message: passed
              ? 'Versão impressa corretamente!'
              : 'A saída deve conter: "Java Versao: 21"',
          };
        },
      },
    ],
  },

  {
    id: 'java-methods-params',
    title: 'Métodos e parâmetros',
    trackId: 'java',
    category: 'Estrutura da Linguagem',
    description: 'Crie métodos reutilizáveis com parâmetros tipados e valores de retorno em Java.',
    difficulty: 'Iniciante',
    xp: 85,
    estimatedMinutes: 10,
    theory: `### Métodos e Parâmetros em Java

Um **método** é um bloco de instruções que executa uma tarefa específica e pode ser invocado múltiplas vezes.

\`\`\`java
public class Matematica {
    // Método que recebe dois inteiros e retorna a soma deles
    public static int somar(int a, int b) {
        return a + b;
    }

    // Método 'void' que apenas realiza uma ação e não retorna valor
    public static void saudar(String nome) {
        System.out.println("Olá, " + nome + "!");
    }

    public static void main(String[] args) {
        int resultado = somar(10, 20);
        System.out.println("Resultado: " + resultado); // 30
        saudar("Dev");
    }
}
\`\`\`

#### Componentes de um método:
1. **Modificadores**: \`public static\` (pode ser chamado diretamente pela classe).
2. **Tipo de Retorno**: O tipo de dado que a instrução \`return\` devolve (\`int\`, \`double\`, \`String\`, \`boolean\` ou \`void\` se nada for retornado).
3. **Nome do Método**: Deve começar com letra minúscula (convenção camelCase: \`calcularMedia\`, \`verificarPar\`).
4. **Lista de Parâmetros**: Variáveis delimitadas por parênteses com seus respectivos tipos: \`(double n1, double n2)\`.
5. **Palavra-chave \`return\`**: Devolve o valor e encerra imediatamente a execução do método.`,
    initialCode: `public class Main {
    // TODO 1: Crie o método 'somar' que recebe (int a, int b) e retorna a soma (int)

    // TODO 2: Crie o método 'calcularMedia' que recebe (double nota1, double nota2) e retorna a média (double)

    // TODO 3: Crie o método void 'exibirStatus' que recebe (String nome, double media) e imprime:
    // "Aluno: " + nome + " | Media: " + media

    public static void main(String[] args) {
        // TODO 4: Chame somar(15, 25) e imprima "Soma: " + total
        // Em seguida, calcule a média de 8.0 e 9.0 e chame exibirStatus("Carlos", mediaFinal)
        
    }
}`,
    solutionCode: `public class Main {
    public static int somar(int a, int b) {
        return a + b;
    }

    public static double calcularMedia(double nota1, double nota2) {
        return (nota1 + nota2) / 2.0;
    }

    public static void exibirStatus(String nome, double media) {
        System.out.println("Aluno: " + nome + " | Media: " + media);
    }

    public static void main(String[] args) {
        int total = somar(15, 25);
        System.out.println("Soma: " + total);

        double mediaFinal = calcularMedia(8.0, 9.0);
        exibirStatus("Carlos", mediaFinal);
    }
}`,
    instructions: 'Implemente os métodos `somar` e `calcularMedia` com retorno adequado, além do método `exibirStatus`. Execute no main e garanta que "Soma: 40" e "Aluno: Carlos | Media: 8.5" sejam exibidos.',
    hints: [
      'A média é dada por (nota1 + nota2) / 2.0',
      'Para exibir o status, use System.out.println("Aluno: " + nome + " | Media: " + media);',
      'Chame os métodos criados dentro do método main passando os valores solicitados.',
    ],
    testCases: [
      {
        id: 't-somar-output',
        description: 'Deve calcular e imprimir a soma: "Soma: 40"',
        validator: (code, output) => {
          const passed = output.includes('Soma: 40');
          return {
            passed,
            message: passed
              ? 'Cálculo de soma executado com sucesso!'
              : 'Esperado encontrar "Soma: 40" no console.',
          };
        },
      },
      {
        id: 't-media-output',
        description: 'Deve exibir o status com a média: "Aluno: Carlos | Media: 8.5"',
        validator: (code, output) => {
          const passed = output.includes('Aluno: Carlos | Media: 8.5');
          return {
            passed,
            message: passed
              ? 'Status do aluno e média calculados com perfeição!'
              : 'Esperado encontrar "Aluno: Carlos | Media: 8.5" no console.',
          };
        },
      },
      {
        id: 't-methods-present',
        description: 'Deve conter a definição dos métodos estáticos no código',
        validator: (code) => {
          const hasSomar = /static\s+int\s+somar/.test(code);
          const hasMedia = /static\s+double\s+calcularMedia/.test(code);
          const passed = hasSomar && hasMedia;
          return {
            passed,
            message: passed
              ? 'Declarações dos métodos identificadas corretamente.'
              : 'Verifique se os métodos "public static int somar" e "public static double calcularMedia" estão declarados.',
          };
        },
      },
    ],
  },

  {
    id: 'java-arrays-strings',
    title: 'Arrays e Strings',
    trackId: 'java',
    category: 'Estruturas de Dados',
    description: 'Manipule vetores unidimensionais e métodos nativos de String em Java.',
    difficulty: 'Intermediário',
    xp: 95,
    estimatedMinutes: 12,
    theory: `### Vetores (Arrays) e Strings em Java

Arrays e Strings são as duas estruturas de manipulação de dados mais utilizadas no dia a dia com Java.

#### 1. Arrays (Vetores)
Um array é uma coleção de tamanho fixo com elementos do mesmo tipo.

\`\`\`java
// Declaração e inicialização direta:
int[] numeros = {10, 20, 30, 40, 50};

// Acesso por índice (o primeiro índice sempre é 0):
System.out.println(numeros[0]); // 10

// Tamanho do array:
System.out.println("Tamanho: " + numeros.length); // 5

// Percorrendo com for tradicional:
for (int i = 0; i < numeros.length; i++) {
    System.out.println("Item " + i + ": " + numeros[i]);
}

// Percorrendo com for-each:
for (int num : numeros) {
    System.out.println("Valor: " + num);
}
\`\`\`

#### 2. Strings
Em Java, \`String\` é uma classe (objeto). Métodos principais:
- \`texto.length()\` - Retorna a quantidade de caracteres.
- \`texto.toUpperCase()\` - Retorna em maiúsculas.
- \`texto.toLowerCase()\` - Retorna em minúsculas.
- \`texto.charAt(0)\` - Retorna o caractere na posição informada.
- \`texto.equals("outro")\` - Compara o conteúdo (nunca use \`==\` para comparar conteúdo de Strings em Java!).`,
    initialCode: `public class Main {
    public static void main(String[] args) {
        // TODO 1: Crie um array String[] linguagens contendo: "Java", "Python", "JavaScript"
        
        // TODO 2: Imprima o tamanho do vetor: "Total de linguagens: " + linguagens.length
        
        // TODO 3: Percorra o array com um for e imprima cada linguagem em maiúsculas (.toUpperCase())
        // Formato esperado: "Linguagem: " + linguagens[i].toUpperCase()
        
        // TODO 4: Crie o array int[] notas = {8, 9, 7};, calcule a soma dos itens e imprima:
        // "Soma das notas: " + soma
        
    }
}`,
    solutionCode: `public class Main {
    public static void main(String[] args) {
        String[] linguagens = {"Java", "Python", "JavaScript"};
        System.out.println("Total de linguagens: " + linguagens.length);

        for (int i = 0; i < linguagens.length; i++) {
            System.out.println("Linguagem: " + linguagens[i].toUpperCase());
        }

        int[] notas = {8, 9, 7};
        int soma = 0;
        for (int i = 0; i < notas.length; i++) {
            soma += notas[i];
        }
        System.out.println("Soma das notas: " + soma);
    }
}`,
    instructions: 'Manipule o array de linguagens exibindo o total de itens, percorra o array imprimindo cada item em letras maiúsculas e calcule a soma do array de notas.',
    hints: [
      'Use linguagens.length para obter o tamanho do array.',
      'Para converter uma String para maiúsculo utilize o método .toUpperCase()',
      'Use um laço for com variável acumuladora "soma += notas[i]" para somar as notas.',
    ],
    testCases: [
      {
        id: 't-array-len',
        description: 'Deve exibir o tamanho do array: "Total de linguagens: 3"',
        validator: (code, output) => {
          const passed = output.includes('Total de linguagens: 3');
          return {
            passed,
            message: passed
              ? 'Tamanho do array impresso corretamente.'
              : 'Esperado: "Total de linguagens: 3"',
          };
        },
      },
      {
        id: 't-strings-upper',
        description: 'Deve imprimir os itens em maiúsculo (JAVA, PYTHON, JAVASCRIPT)',
        validator: (code, output) => {
          const hasJava = output.includes('JAVA');
          const hasPython = output.includes('PYTHON');
          const hasJs = output.includes('JAVASCRIPT');
          const passed = hasJava && hasPython && hasJs;
          return {
            passed,
            message: passed
              ? 'Strings convertidas para maiúsculas e impressas com sucesso!'
              : 'Verifique se todas as 3 linguagens estão sendo convertidas com .toUpperCase() e impressas.',
          };
        },
      },
      {
        id: 't-array-sum',
        description: 'Deve calcular e imprimir a soma das notas: "Soma das notas: 24"',
        validator: (code, output) => {
          const passed = output.includes('Soma das notas: 24');
          return {
            passed,
            message: passed
              ? 'Soma do array de notas calculada corretamente (24)!'
              : 'Esperado: "Soma das notas: 24"',
          };
        },
      },
    ],
  },

  {
    id: 'java-variables',
    title: 'Variáveis e Tipos Primitivos',
    trackId: 'java',
    category: 'Fundamentos',
    description: 'Entenda como declarar e utilizar int, double, boolean, char e String em Java.',
    difficulty: 'Iniciante',
    xp: 60,
    estimatedMinutes: 7,
    theory: `### Tipos de Dados em Java

Java é estaticamente tipado: você deve declarar o tipo de cada variável antes de usá-la.

| Tipo | Descrição | Exemplo |
|---|---|---|
| \`int\` | Números inteiros (32-bit) | \`int idade = 25;\` |
| \`double\` | Ponto flutuante com precisão | \`double preco = 49.90;\` |
| \`boolean\` | Verdadeiro ou Falso | \`boolean ativo = true;\` |
| \`char\` | Caractere único entre aspas simples | \`char genero = 'M';\` |
| \`String\` | Texto (objeto não primitivo) | \`String dev = "Ana";\` |

#### Constantes com \`final\`:
\`\`\`java
final double PI = 3.14159; // Não pode ter o valor alterado
\`\`\``,
    initialCode: `public class Main {
    public static void main(String[] args) {
        // TODO: Declare as seguintes variáveis tipadas:
        // 1. String nome = "Dev";
        // 2. int nivel = 5;
        // 3. double pontuacao = 98.5;
        // 4. boolean online = true;
        //
        // Em seguida, imprima cada uma no formato:
        // "Nome: " + nome
        // "Nível: " + nivel
        // "Pontuação: " + pontuacao
        // "Online: " + online
        
    }
}`,
    solutionCode: `public class Main {
    public static void main(String[] args) {
        String nome = "Dev";
        int nivel = 5;
        double pontuacao = 98.5;
        boolean online = true;

        System.out.println("Nome: " + nome);
        System.out.println("Nível: " + nivel);
        System.out.println("Pontuação: " + pontuacao);
        System.out.println("Online: " + online);
    }
}`,
    instructions: 'Execute o código para ver a declaração e exibição das variáveis primitivas.',
    hints: ['Verifique cada variável e sua respectiva linha de impressão.'],
    testCases: [
      {
        id: 't-vars',
        description: 'Deve imprimir os dados do Dev com nível e pontuação',
        validator: (code, output) => {
          const passed = output.includes('Nome: Dev') && output.includes('Nível: 5');
          return {
            passed,
            message: passed ? 'Variáveis impressas com sucesso!' : 'Valores esperados não encontrados na saída.',
          };
        },
      },
    ],
  },

  {
    id: 'java-conditionals',
    title: 'Condicionais (if / else)',
    trackId: 'java',
    category: 'Controle de Fluxo',
    description: 'Tome decisões no fluxo do seu programa Java com estruturas condicionais.',
    difficulty: 'Iniciante',
    xp: 65,
    estimatedMinutes: 8,
    theory: `### Estruturas Condicionais: if, else if e else

Permite executar blocos de código diferentes dependendo de uma condição booleana.

\`\`\`java
int idade = 18;

if (idade >= 18) {
    System.out.println("Maior de idade");
} else {
    System.out.println("Menor de idade");
}
\`\`\`

#### Operadores de comparação:
- \`==\` igual a
- \`!=\` diferente de
- \`>\` maior que
- \`>=\` maior ou igual a
- \`<\` menor que
- \`<=\` menor ou igual a
- \`&&\` E lógico (ambas condições verdadeiras)
- \`||\` OU lógico (pelo menos uma verdadeira)`,
    initialCode: `public class Main {
    public static void main(String[] args) {
        int nota = 85;

        // TODO: Implemente a estrutura condicional if / else if / else:
        // - Se nota >= 90: imprima "Conceito: Excelente"
        // - Se nota >= 70: imprima "Conceito: Aprovado"
        // - Senão: imprima "Conceito: Reprovado"
        
    }
}`,
    solutionCode: `public class Main {
    public static void main(String[] args) {
        int nota = 85;
        if (nota >= 90) {
            System.out.println("Conceito: Excelente");
        } else if (nota >= 70) {
            System.out.println("Conceito: Aprovado");
        } else {
            System.out.println("Conceito: Reprovado");
        }
    }
}`,
    instructions: 'Execute o código e confirme a validação da nota e o conceito "Aprovado".',
    hints: ['Verifique a lógica do if e else if.'],
    testCases: [
      {
        id: 't-cond',
        description: 'Deve imprimir "Conceito: Aprovado" para a nota 85',
        validator: (code, output) => {
          const passed = output.includes('Conceito: Aprovado');
          return {
            passed,
            message: passed ? 'Estrutura condicional validada com sucesso!' : 'Esperado: "Conceito: Aprovado"',
          };
        },
      },
    ],
  },

  {
    id: 'java-loops',
    title: 'Laços de Repetição',
    trackId: 'java',
    category: 'Controle de Fluxo',
    description: 'Aprenda a iterar com loops for, while e calcular sequências em Java.',
    difficulty: 'Iniciante',
    xp: 75,
    estimatedMinutes: 9,
    theory: `### Laços de Repetição em Java

Loops permitem executar o mesmo trecho de código repetidas vezes.

#### 1. Laço \`for\`
Ideal quando você já sabe de antemão quantas vezes deve iterar.

\`\`\`java
for (int i = 1; i <= 5; i++) {
    System.out.println("Contagem: " + i);
}
\`\`\`

#### 2. Laço \`while\`
Executa enquanto uma condição for verdadeira.

\`\`\`java
int contador = 0;
while (contador < 3) {
    System.out.println("While: " + contador);
    contador++;
}
\`\`\``,
    initialCode: `public class Main {
    public static void main(String[] args) {
        // TODO: Crie um laço 'for' para imprimir os números pares de 2 a 10
        // Dica: Inicie com int i = 2, condição i <= 10 e incremente i += 2
        // Em cada repetição, imprima: "Par: " + i
        
    }
}`,
    solutionCode: `public class Main {
    public static void main(String[] args) {
        for (int i = 2; i <= 10; i += 2) {
            System.out.println("Par: " + i);
        }
    }
}`,
    instructions: 'Execute o código e veja a contagem de números pares de 2 até 10.',
    hints: ['O loop incrementa de 2 em 2 (i += 2).'],
    testCases: [
      {
        id: 't-loop',
        description: 'Deve imprimir os pares 2, 4, 6, 8 e 10',
        validator: (code, output) => {
          const passed = output.includes('Par: 2') && output.includes('Par: 10');
          return {
            passed,
            message: passed ? 'Laço executado com perfeição!' : 'Valores pares esperados não encontrados na saída.',
          };
        },
      },
    ],
  },
];
