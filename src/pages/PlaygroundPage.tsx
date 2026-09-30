import React, { useState } from 'react';
import { TrackId, ExecutionResult } from '../types';
import { executeCode } from '../services/runners';
import { CodeEditor } from '../components/CodeEditor';
import { ConsoleOutput } from '../components/ConsoleOutput';
import { LanguageIcon } from '../components/LanguageIcon';
import { useDualDev } from '../context/DualDevContext';
import { Terminal, Sparkles } from 'lucide-react';

const PRESETS: Record<TrackId, { name: string; code: string }[]> = {
  java: [
    {
      name: 'Classe & Método main',
      code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Bem-vindo ao Playground Java no DualDev!");
        
        String linguagem = "Java 21";
        int ano = 2026;
        System.out.println("Executando: " + linguagem + " em " + ano);
    }
}`,
    },
    {
      name: 'Métodos com Parâmetros',
      code: `public class Matematica {
    public static double calcularImc(double peso, double altura) {
        return peso / (altura * altura);
    }

    public static void main(String[] args) {
        double peso = 75.0;
        double altura = 1.78;
        double imc = calcularImc(peso, altura);
        
        System.out.println("Peso: " + peso + " kg");
        System.out.println("Altura: " + altura + " m");
        System.out.printf("IMC Calculado: %.2f", imc);
    }
}`,
    },
    {
      name: 'Arrays e Strings',
      code: `public class ArraysDemo {
    public static void main(String[] args) {
        String[] desenvolvedores = {"Alice", "Bruno", "Carlos", "Diana"};
        
        System.out.println("--- Lista de Desenvolvedores ---");
        for (int i = 0; i < desenvolvedores.length; i++) {
            System.out.println((i + 1) + ". " + desenvolvedores[i].toUpperCase());
        }

        int[] pontuacoes = {95, 88, 92, 100};
        int maior = pontuacoes[0];
        for (int p : pontuacoes) {
            if (p > maior) maior = p;
        }
        System.out.println("Maior pontuação: " + maior);
    }
}`,
    },
  ],
  python: [
    {
      name: 'Script Básico Python',
      code: `# Playground Python
linguagens = ["Python", "Java", "TypeScript", "Rust"]

print("Linguagens suportadas:")
for idx, lang in enumerate(linguagens, 1):
    print(f"{idx}. {lang}")`,
    },
  ],
  javascript: [
    {
      name: 'Modern JS ES6+',
      code: `// Playground JavaScript
const devs = [
  { name: 'Ana', xp: 450 },
  { name: 'Lucas', xp: 620 },
  { name: 'Carla', xp: 810 }
];

const totalXp = devs.reduce((acc, dev) => acc + dev.xp, 0);
console.log('Total XP da Equipe:', totalXp);
console.log('Devs ordenados:', devs.sort((a, b) => b.xp - a.xp));`,
    },
  ],
  html: [
    {
      name: 'Documento HTML',
      code: `<div class="container">
  <h1>DualDev Playground</h1>
  <p>Ambiente seguro e interativo de testes web.</p>
</div>`,
    },
  ],
  css: [
    {
      name: 'Estilização CSS',
      code: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #0ea5e9, #10b981);
  border-radius: 16px;
  color: white;
}`,
    },
  ],
};

export const PlaygroundPage: React.FC = () => {
  const { recordCodeExecution } = useDualDev();
  const [selectedLanguage, setSelectedLanguage] = useState<TrackId>('java');
  const [code, setCode] = useState<string>(PRESETS.java[0].code);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleLanguageChange = (lang: TrackId) => {
    setSelectedLanguage(lang);
    setCode(PRESETS[lang][0].code);
    setExecutionResult(null);
  };

  const handleRun = async () => {
    setIsRunning(true);
    try {
      const res = await executeCode(selectedLanguage, code);
      setExecutionResult(res);
      recordCodeExecution(selectedLanguage);
    } catch (err: any) {
      setExecutionResult({
        stdout: '',
        stderr: err.message || 'Erro inesperado na execução.',
        executionTimeMs: 0,
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-4">
      
      {/* Playground Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-200/60 dark:border-sky-800/60 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-b from-sky-400 to-blue-600 text-white shadow-xs">
              <Terminal className="h-4 w-4" />
            </div>
            <span>Playground Livre</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-sky-300/70 mt-0.5">
            Escreva e execute códigos livremente sem restrições de lição.
          </p>
        </div>

        {/* Language Tabs & Template Selector */}
        <div className="flex flex-wrap items-center gap-2">
          {(['java', 'python', 'javascript'] as TrackId[]).map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedLanguage === lang
                  ? 'aero-btn-primary shadow-xs'
                  : 'aero-btn-glass text-slate-700 dark:text-sky-200'
              }`}
            >
              <LanguageIcon trackId={lang} className="w-3.5 h-3.5" />
              <span>{lang.toUpperCase()}</span>
            </button>
          ))}

          {/* Preset Selector */}
          <select
            onChange={(e) => {
              const idx = parseInt(e.target.value, 10);
              setCode(PRESETS[selectedLanguage][idx].code);
              setExecutionResult(null);
            }}
            className="bg-white/80 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800 text-slate-800 dark:text-sky-100 text-xs rounded-full px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-sky-400/50 font-medium shadow-xs"
          >
            {PRESETS[selectedLanguage].map((preset, idx) => (
              <option key={idx} value={idx} className="dark:bg-slate-900">
                Modelo: {preset.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Editor & Console Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[580px]">
        {/* Editor */}
        <div className="h-[580px]">
          <CodeEditor
            code={code}
            onChange={setCode}
            onRun={handleRun}
            onReset={() => setCode(PRESETS[selectedLanguage][0].code)}
            trackId={selectedLanguage}
            isRunning={isRunning}
          />
        </div>

        {/* Output */}
        <div className="h-[580px]">
          <ConsoleOutput
            result={executionResult}
            testResults={[]}
            onClear={() => setExecutionResult(null)}
            activeSubTab="output"
            setActiveSubTab={() => {}}
          />
        </div>
      </div>

    </div>
  );
};
