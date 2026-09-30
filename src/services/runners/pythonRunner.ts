import { ExecutionResult } from '../../types';

/**
 * Client-Side Python Runner for DualDev.
 * Simulates standard Python scripts, print statements, loops, variables, functions, and lists.
 */
export async function runPythonCode(rawCode: string): Promise<ExecutionResult> {
  const startTime = performance.now();
  const output: string[] = [];

  if (!rawCode || rawCode.trim().length === 0) {
    return {
      stdout: '',
      stderr: 'Aviso: Nenhum código Python fornecido.',
      executionTimeMs: 0,
    };
  }

  try {
    // Check if user has basic python statements
    const lines = rawCode.split('\n');
    let jsBody = '';
    const indentStack: number[] = [0];

    // Transpile basic Python constructs to JS
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith('#')) {
        continue;
      }

      // Calculate indentation
      const indent = line.search(/\S/);
      while (indentStack.length > 1 && indent < indentStack[indentStack.length - 1]) {
        indentStack.pop();
        jsBody += '}\n';
      }

      // print(...)
      if (/^print\s*\(/.test(trimmed)) {
        const content = trimmed.replace(/^print\s*\(/, '').replace(/\)\s*$/, '');
        jsBody += `_pyPrint(${content});\n`;
        continue;
      }

      // def func(a, b):
      const defMatch = trimmed.match(/^def\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*:/);
      if (defMatch) {
        jsBody += `function ${defMatch[1]}(${defMatch[2]}) {\n`;
        indentStack.push(indent + 4);
        continue;
      }

      // for x in range(n):
      const forRangeMatch = trimmed.match(/^for\s+([a-zA-Z0-9_]+)\s+in\s+range\(([^)]+)\)\s*:/);
      if (forRangeMatch) {
        const varName = forRangeMatch[1];
        const rangeArg = forRangeMatch[2];
        jsBody += `for (let ${varName} = 0; ${varName} < ${rangeArg}; ${varName}++) {\n`;
        indentStack.push(indent + 4);
        continue;
      }

      // for item in list:
      const forInMatch = trimmed.match(/^for\s+([a-zA-Z0-9_]+)\s+in\s+([a-zA-Z0-9_]+)\s*:/);
      if (forInMatch) {
        jsBody += `for (let ${forInMatch[1]} of ${forInMatch[2]}) {\n`;
        indentStack.push(indent + 4);
        continue;
      }

      // if condition:
      const ifMatch = trimmed.match(/^if\s+(.+)\s*:/);
      if (ifMatch) {
        let cond = ifMatch[1].replace(/==/g, '===').replace(/\band\b/g, '&&').replace(/\bor\b/g, '||').replace(/\bnot\b/g, '!');
        jsBody += `if (${cond}) {\n`;
        indentStack.push(indent + 4);
        continue;
      }

      // elif condition:
      const elifMatch = trimmed.match(/^elif\s+(.+)\s*:/);
      if (elifMatch) {
        let cond = elifMatch[1].replace(/==/g, '===').replace(/\band\b/g, '&&').replace(/\bor\b/g, '||').replace(/\bnot\b/g, '!');
        jsBody += `} else if (${cond}) {\n`;
        continue;
      }

      // else:
      if (trimmed === 'else:') {
        jsBody += `} else {\n`;
        continue;
      }

      // while condition:
      const whileMatch = trimmed.match(/^while\s+(.+)\s*:/);
      if (whileMatch) {
        let cond = whileMatch[1].replace(/==/g, '===').replace(/\band\b/g, '&&').replace(/\bor\b/g, '||');
        jsBody += `while (${cond}) {\n`;
        indentStack.push(indent + 4);
        continue;
      }

      // return statement
      if (trimmed.startsWith('return ')) {
        jsBody += `${trimmed};\n`;
        continue;
      }

      // variable assignment or function call
      if (trimmed.includes('=')) {
        const parts = trimmed.split('=');
        const varName = parts[0].trim();
        const value = parts.slice(1).join('=').trim();
        // Check if True/False/None
        let jsValue = value
          .replace(/\bTrue\b/g, 'true')
          .replace(/\bFalse\b/g, 'false')
          .replace(/\bNone\b/g, 'null');
        jsBody += `var ${varName} = ${jsValue};\n`;
        continue;
      }

      jsBody += `${trimmed};\n`;
    }

    while (indentStack.length > 1) {
      indentStack.pop();
      jsBody += '}\n';
    }

    const runner = new Function(
      '_pyPrint',
      'len',
      'range',
      'str',
      'int',
      'float',
      'sum',
      'max',
      'min',
      `
      "use strict";
      ${jsBody}
      `
    );

    const _pyPrint = (...args: any[]) => {
      output.push(args.map((a) => (typeof a === 'boolean' ? (a ? 'True' : 'False') : String(a))).join(' ') + '\n');
    };

    const pyLen = (val: any) => {
      if (val === null || val === undefined) return 0;
      if (typeof val.length === 'number') return val.length;
      if (typeof val === 'object') return Object.keys(val).length;
      return 0;
    };

    const pyRange = (stopOrStart: number, maybeStop?: number, step = 1) => {
      const start = maybeStop !== undefined ? stopOrStart : 0;
      const end = maybeStop !== undefined ? maybeStop : stopOrStart;
      const result: number[] = [];
      if (step > 0) {
        for (let i = start; i < end; i += step) result.push(i);
      } else if (step < 0) {
        for (let i = start; i > end; i += step) result.push(i);
      }
      return result;
    };

    const pySum = (arr: number[]) => (Array.isArray(arr) ? arr.reduce((a, b) => a + b, 0) : 0);
    const pyMax = (...args: any[]) => {
      const list = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
      return Math.max(...list);
    };
    const pyMin = (...args: any[]) => {
      const list = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
      return Math.min(...list);
    };

    runner(
      _pyPrint,
      pyLen,
      pyRange,
      String,
      (v: any) => parseInt(v, 10),
      (v: any) => parseFloat(v),
      pySum,
      pyMax,
      pyMin
    );

    return {
      stdout: output.join(''),
      executionTimeMs: Math.round(performance.now() - startTime),
    };
  } catch (err: any) {
    return {
      stdout: output.join(''),
      stderr: `Erro de Execução Python: ${err.message || String(err)}`,
      executionTimeMs: Math.round(performance.now() - startTime),
    };
  }
}
