import { ExecutionResult } from '../../types';

export async function runJavaScriptCode(code: string): Promise<ExecutionResult> {
  const startTime = performance.now();
  const output: string[] = [];

  try {
    const customConsole = {
      log: (...args: any[]) => {
        output.push(args.map(formatJsArg).join(' ') + '\n');
      },
      warn: (...args: any[]) => {
        output.push('[Aviso]: ' + args.map(formatJsArg).join(' ') + '\n');
      },
      error: (...args: any[]) => {
        output.push('[Erro]: ' + args.map(formatJsArg).join(' ') + '\n');
      },
      info: (...args: any[]) => {
        output.push(args.map(formatJsArg).join(' ') + '\n');
      },
    };

    const fn = new Function('console', `"use strict";\n${code}`);
    const result = fn(customConsole);

    return {
      stdout: output.join(''),
      returnValue: result,
      executionTimeMs: Math.round(performance.now() - startTime),
    };
  } catch (err: any) {
    return {
      stdout: output.join(''),
      stderr: `Erro JavaScript: ${err.message || String(err)}`,
      executionTimeMs: Math.round(performance.now() - startTime),
    };
  }
}

function formatJsArg(arg: any): string {
  if (typeof arg === 'object' && arg !== null) {
    try {
      return JSON.stringify(arg, null, 2);
    } catch {
      return String(arg);
    }
  }
  return String(arg);
}
