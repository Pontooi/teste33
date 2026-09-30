import { Lesson } from '../../types';

export const pythonLessons: Lesson[] = [
  {
    id: 'py-intro',
    title: 'Introdução e Função print()',
    trackId: 'python',
    category: 'Fundamentos',
    description: 'Primeiros passos em Python: exibição de dados com print() e execução direta.',
    difficulty: 'Iniciante',
    xp: 50,
    estimatedMinutes: 5,
    theory: `### Bem-vindo ao Python no DualDev!

Python é conhecido mundialmente por sua sintaxe limpa, expressiva e altamente legível.
Ao contrário de linguagens como Java ou C, você não precisa criar uma classe ou método principal para rodar comandos.

\`\`\`python
# Exibir mensagens no console
print("Olá, DualDev!")
print("Aprendendo Python de forma prática.")
\`\`\`

A função \`print()\` pode receber múltiplos argumentos separados por vírgula, e ela os exibe separados por um espaço:

\`\`\`python
print("Ano:", 2026, "- Nível:", 1)
\`\`\``,
    initialCode: `# TODO: Escreva suas primeiras instruções em Python!
# 1. Use a função print() para exibir exatamente: "Olá, DualDev!"
# 2. Em outra linha, use print() para exibir: "Trilha Python ativa com sucesso!"

# Digite seu código abaixo:
`,
    solutionCode: `print("Olá, DualDev!")
print("Trilha Python ativa com sucesso!")`,
    instructions: 'Escreva as instruções usando print() para imprimir "Olá, DualDev!" e "Trilha Python ativa com sucesso!".',
    hints: [
      'Use print("Olá, DualDev!") na primeira linha.',
      'A função print() exibe textos entre aspas simples ou duplas.',
    ],
    testCases: [
      {
        id: 't-py-intro',
        description: 'Deve imprimir "Olá, DualDev!"',
        validator: (_code, output) => {
          const passed = output.includes('Olá, DualDev!');
          return {
            passed,
            message: passed ? 'Mensagem validada no console!' : 'Não encontramos "Olá, DualDev!" na saída.',
          };
        },
      },
    ],
  },

  {
    id: 'py-vars-types',
    title: 'Variáveis e Tipos de Dados',
    trackId: 'python',
    category: 'Fundamentos',
    description: 'Declare variáveis numéricas, de texto e booleanas com tipagem dinâmica.',
    difficulty: 'Iniciante',
    xp: 60,
    estimatedMinutes: 6,
    theory: `### Variáveis e Tipagem Dinâmica

Em Python, você não precisa declarar o tipo explicitamente. A linguagem infere automaticamente:

\`\`\`python
nome = "Alice"        # str (texto)
idade = 24            # int (número inteiro)
salario = 4500.50     # float (ponto flutuante)
ativo = True          # bool (booleano)
\`\`\`

Para formatar strings de forma moderna, podemos concatenar valores ou usar argumentos no \`print\`:

\`\`\`python
print("Dev:", nome, "- Idade:", idade)
\`\`\``,
    initialCode: `# TODO: Crie as seguintes variáveis para o desenvolvedor:
# 1. linguagem com o texto "Python"
# 2. versao com o número inteiro 3
# 3. facil com o valor booleano True
#
# Em seguida, use print() para exibir os valores no formato:
# print("Linguagem:", linguagem)
# print("Versão:", versao)
# print("Produtiva:", facil)

# Digite seu código abaixo:
`,
    solutionCode: `linguagem = "Python"
versao = 3
facil = True

print("Linguagem:", linguagem)
print("Versão:", versao)
print("Produtiva:", facil)`,
    instructions: 'Declare as variáveis linguagem, versao e facil e imprima seus valores.',
    hints: [
      'Em Python valores booleanos iniciam com maiúscula: True ou False.',
      'Use print("Linguagem:", linguagem) para exibir os dados.',
    ],
    testCases: [
      {
        id: 't-py-vars',
        description: 'Deve exibir o nome da linguagem e versão',
        validator: (_code, output) => {
          const passed = output.includes('Python') && output.includes('3');
          return {
            passed,
            message: passed ? 'Variáveis e tipos verificados!' : 'Esperado "Python" e versão "3" na saída.',
          };
        },
      },
    ],
  },

  {
    id: 'py-conditionals',
    title: 'Condicionais (if, elif, else)',
    trackId: 'python',
    category: 'Controle de Fluxo',
    description: 'Tome decisões no código utilizando estruturas condicionais e operadores lógicos.',
    difficulty: 'Iniciante',
    xp: 75,
    estimatedMinutes: 7,
    theory: `### Estruturas Condicionais em Python

Python usa indentação (espaços) para definir blocos de código em vez de chaves \`{}\`:

\`\`\`python
pontuacao = 85

if pontuacao >= 90:
    print("Classificação: Excelente")
elif pontuacao >= 70:
    print("Classificação: Aprovado")
else:
    print("Classificação: Em Recuperação")
\`\`\`

Operadores de comparação:
- \`==\` igual
- \`!=\` diferente
- \`>\` maior que / \`>=\` maior ou igual
- \`<\` menor que / \`<=\` menor ou igual`,
    initialCode: `nota = 82

# TODO: Escreva uma estrutura condicional if / else:
# - Se nota >= 70: imprima "Status: Aprovado"
# - Caso contrário (else): imprima "Status: Reprovado"

# Digite seu bloco condicional abaixo:
`,
    solutionCode: `nota = 82

if nota >= 70:
    print("Status: Aprovado")
else:
    print("Status: Reprovado")`,
    instructions: 'Avalie a pontuação e imprima "Status: Aprovado" para notas a partir de 70.',
    hints: [
      'Lembre-se dos dois pontos (:) após a condição do if e do else.',
      'A indentação de 4 espaços dentro do bloco é fundamental.',
    ],
    testCases: [
      {
        id: 't-py-cond',
        description: 'Deve aprovar a nota informada',
        validator: (_code, output) => {
          const passed = output.includes('Aprovado');
          return {
            passed,
            message: passed ? 'Condicional executada corretamente!' : 'Esperado "Status: Aprovado" no console.',
          };
        },
      },
    ],
  },

  {
    id: 'py-lists',
    title: 'Listas e Iteração for in',
    trackId: 'python',
    category: 'Estruturas de Dados',
    description: 'Manipule coleções ordenadas de elementos e itere com laços for.',
    difficulty: 'Iniciante',
    xp: 80,
    estimatedMinutes: 8,
    theory: `### Listas em Python

Listas são coleções ordenadas delimitadas por colchetes \`[]\`:

\`\`\`python
tecnologias = ["Python", "Java", "TypeScript", "Docker"]

# Acessar pelo índice (inicia em 0)
print("Primeiro:", tecnologias[0])

# Obter o total de itens com len()
print("Total:", len(tecnologias))
\`\`\`

Para percorrer cada elemento:
\`\`\`python
for item in tecnologias:
    print("Estudando:", item)
\`\`\``,
    initialCode: `# TODO:
# 1. Crie a lista: linguagens = ["Python", "JavaScript", "Java", "SQL"]
# 2. Percorra a lista com um laço 'for lang in linguagens:' e imprima "Linguagem:", lang
# 3. Fora do loop, use len() para imprimir: "Total de tecnologias:", len(linguagens)

# Digite seu código abaixo:
`,
    solutionCode: `linguagens = ["Python", "JavaScript", "Java", "SQL"]

for lang in linguagens:
    print("Linguagem:", lang)

print("Total de tecnologias:", len(linguagens))`,
    instructions: 'Percorra a lista de linguagens exibindo cada elemento e o tamanho total da lista.',
    hints: [
      'O comando for lang in linguagens: itera por todos os itens sequencialmente.',
      'Use len(linguagens) para obter a contagem total de itens.',
    ],
    testCases: [
      {
        id: 't-py-lists-iter',
        description: 'Deve iterar pelas linguagens e exibir o total',
        validator: (_code, output) => {
          const passed = output.includes('Python') && output.includes('Total de tecnologias: 4');
          return {
            passed,
            message: passed ? 'Iteração de lista validada com sucesso!' : 'Não encontramos os itens esperados ou o total.',
          };
        },
      },
    ],
  },

  {
    id: 'py-functions',
    title: 'Funções com def e return',
    trackId: 'python',
    category: 'Modularização',
    description: 'Crie funções reutilizáveis com parâmetros e retorno de valores.',
    difficulty: 'Intermediário',
    xp: 85,
    estimatedMinutes: 9,
    theory: `### Funções em Python

Funções são blocos reutilizáveis definidos com a palavra-chave \`def\`:

\`\`\`python
def somar(a, b):
    return a + b

resultado = somar(15, 25)
print("Soma:", resultado) # 40
\`\`\`

Podemos criar funções para cálculos, regras de negócio e validações:

\`\`\`python
def calcular_desconto(preco, percentual):
    desconto = preco * (percentual / 100)
    return preco - desconto
\`\`\``,
    initialCode: `# TODO:
# 1. Defina uma função com 'def calcular_area(largura, altura):'
# 2. A função deve retornar o produto: largura * altura
# 3. Chame a função passando 8 e 5: area = calcular_area(8, 5)
# 4. Imprima o resultado: print("Área calculada:", area)

# Digite sua função abaixo:
`,
    solutionCode: `def calcular_area(largura, altura):
    return largura * altura

area = calcular_area(8, 5)
print("Área calculada:", area)`,
    instructions: 'Defina a função calcular_area, passe as dimensões 8 e 5 e imprima a área calculada (40).',
    hints: [
      'Utilize return largura * altura dentro da função.',
      'Chame a função passando os parâmetros desejados.',
    ],
    testCases: [
      {
        id: 't-py-func',
        description: 'Deve retornar a área calculada 40',
        validator: (_code, output) => {
          const passed = output.includes('40');
          return {
            passed,
            message: passed ? 'Função Python validada com sucesso!' : 'Esperado resultado 40 na saída do console.',
          };
        },
      },
    ],
  },

  {
    id: 'py-loops-range',
    title: 'Loops com range() e Acumuladores',
    trackId: 'python',
    category: 'Estruturas de Repetição',
    description: 'Utilize range() para contagens numéricas, somatórios e iterações precisas.',
    difficulty: 'Intermediário',
    xp: 90,
    estimatedMinutes: 8,
    theory: `### A função range()

A função \`range(fim)\` gera uma sequência numérica de 0 até o limite exclusivo:

\`\`\`python
# Conta de 0 a 4
for i in range(5):
    print("Contagem:", i)
\`\`\`

Podemos somar números e calcular acumuladores:
\`\`\`python
total = 0
for n in range(6): # 0, 1, 2, 3, 4, 5
    total = total + n
print("Soma total:", total) # 15
\`\`\``,
    initialCode: `# TODO:
# 1. Crie uma variável acumuladora: total = 0
# 2. Crie um loop: for i in range(5):
# 3. Dentro do loop, some 'i' em 'total' (total = total + i) e imprima "Passo:", i
# 4. Fora do loop, imprima "Total acumulado:", total

# Digite seu código abaixo:
`,
    solutionCode: `total = 0
for i in range(5):
    total = total + i
    print("Passo:", i)

print("Total acumulado:", total)`,
    instructions: 'Execute a repetição com range(5) e verifique o total acumulado (10).',
    hints: [
      'range(5) gera os valores 0, 1, 2, 3 e 4.',
      'A soma de 0 + 1 + 2 + 3 + 4 resulta em 10.',
    ],
    testCases: [
      {
        id: 't-py-range',
        description: 'Deve acumular o total 10',
        validator: (_code, output) => {
          const passed = output.includes('Total acumulado: 10');
          return {
            passed,
            message: passed ? 'Acumulador e loop com range() aprovados!' : 'Esperado total acumulado 10 na saída.',
          };
        },
      },
    ],
  },
];
