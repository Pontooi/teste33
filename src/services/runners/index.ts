import { TrackId, ExecutionResult } from '../../types';
import { runJavaCode } from './javaRunner';
import { runPythonCode } from './pythonRunner';
import { runJavaScriptCode } from './jsRunner';

export async function executeCode(trackId: TrackId, code: string): Promise<ExecutionResult> {
  switch (trackId) {
    case 'java':
      return await runJavaCode(code);
    case 'python':
      return await runPythonCode(code);
    case 'javascript':
      return await runJavaScriptCode(code);
    case 'html':
    case 'css':
      // For HTML/CSS, return simulated execution result
      return {
        stdout: 'Renderização do documento HTML/CSS concluída com sucesso no visualizador.',
        executionTimeMs: 15,
      };
    default:
      return {
        stdout: '',
        stderr: `Linguagem não suportada: ${trackId}`,
        executionTimeMs: 0,
      };
  }
}
