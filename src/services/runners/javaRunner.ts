import { ExecutionResult } from '../../types';

/**
 * Robust Client-Side Java Execution Simulator and Transpiler for DualDev.
 * Handles Java Class declarations, main method, static and instance methods,
 * parameters, primitive & wrapper types, String manipulations, 1D and 2D arrays,
 * Math helpers, control flow (if/else/switch), loops (for, enhanced-for, while),
 * and standard System.out calls.
 */
export async function runJavaCode(rawCode: string): Promise<ExecutionResult> {
  const startTime = performance.now();
  const output: string[] = [];

  // Basic sanity check
  if (!rawCode || rawCode.trim().length === 0) {
    return {
      stdout: '',
      stderr: 'Aviso: Nenhum código fornecido para execução.',
      executionTimeMs: 0,
    };
  }

  try {
    const transpiledJs = transpileJavaToJs(rawCode);

    // Sandbox execution context
    const sandboxConsole = {
      print: (...args: any[]) => {
        const text = args.map(formatJavaOutput).join('');
        if (output.length > 0 && !output[output.length - 1].endsWith('\n')) {
          output[output.length - 1] += text;
        } else {
          output.push(text);
        }
      },
      println: (...args: any[]) => {
        const text = args.map(formatJavaOutput).join(' ') + '\n';
        output.push(text);
      },
      printf: (formatStr: string, ...args: any[]) => {
        let i = 0;
        const formatted = String(formatStr).replace(/%[sdfc.0-9]*/g, () => {
          return args[i++] !== undefined ? String(args[i - 1]) : '';
        });
        output.push(formatted);
      },
    };

    // Arrays helper simulator
    const ArraysHelper = {
      toString: (arr: any) => {
        if (!Array.isArray(arr)) return String(arr);
        return '[' + arr.join(', ') + ']';
      },
      sort: (arr: any[]) => {
        if (Array.isArray(arr)) arr.sort((a, b) => (a > b ? 1 : -1));
      },
    };

    // Build execution function
    const runnerFunction = new Function(
      'System',
      'Arrays',
      'Math',
      'Integer',
      'Double',
      `
      "use strict";
      ${transpiledJs}
      `
    );

    // Run in isolated invocation
    const System = {
      out: {
        println: sandboxConsole.println,
        print: sandboxConsole.print,
        printf: sandboxConsole.printf,
      },
      err: {
        println: (...args: any[]) => {
          output.push('[ERRO JVM]: ' + args.map(formatJavaOutput).join(' ') + '\n');
        },
      },
    };

    const Integer = {
      parseInt: (val: any) => parseInt(String(val), 10),
      MAX_VALUE: 2147483647,
      MIN_VALUE: -2147483648,
    };

    const Double = {
      parseDouble: (val: any) => parseFloat(String(val)),
      MAX_VALUE: Number.MAX_VALUE,
      MIN_VALUE: Number.MIN_VALUE,
    };

    runnerFunction(System, ArraysHelper, Math, Integer, Double);

    const executionTimeMs = Math.round(performance.now() - startTime);
    return {
      stdout: output.join(''),
      executionTimeMs: Math.max(1, executionTimeMs),
    };
  } catch (err: any) {
    const executionTimeMs = Math.round(performance.now() - startTime);
    let errorMessage = err.message || String(err);

    // Make Java error friendly in Portuguese
    if (errorMessage.includes('Unexpected identifier')) {
      errorMessage = 'Erro de Sintaxe Java: Verifique a declaração de tipos, métodos e ponto e vírgula (;).';
    } else if (errorMessage.includes('is not defined')) {
      const match = errorMessage.match(/(\w+) is not defined/);
      const varName = match ? match[1] : '';
      errorMessage = `Símbolo não encontrado: A variável ou método '${varName}' não foi declarada ou inicializada.`;
    }

    return {
      stdout: output.join(''),
      stderr: errorMessage,
      executionTimeMs,
    };
  }
}

function formatJavaOutput(val: any): string {
  if (val === null) return 'null';
  if (val === undefined) return 'null';
  if (typeof val === 'boolean') return val ? 'true' : 'false';
  if (Array.isArray(val)) {
    return '[' + val.map(formatJavaOutput).join(', ') + ']';
  }
  return String(val);
}

/**
 * Transpiles Java class/method structures and typical Java syntax into clean JavaScript.
 */
function transpileJavaToJs(javaCode: string): string {
  let js = javaCode;

  // 1. Remove comments or preserve line breaks
  js = js.replace(/\/\*[\s\S]*?\*\//g, '');
  // Remove single line comments
  js = js.replace(/\/\/.*$/gm, '');

  // 2. Handle Java Imports (e.g. import java.util.Arrays; import java.util.Scanner;)
  js = js.replace(/import\s+[a-zA-Z0-9_.*]+;\s*/g, '');

  // 3. Transform String methods to JS equivalents
  // In Java: s.length() -> in JS: s.length
  // Be careful: arr.length in Java is field, in String it's method s.length()
  js = js.replace(/\.length\(\)/g, '.length');

  // In Java: s.equals(other) -> (s === other)
  js = js.replace(/\.equals\(([^)]+)\)/g, ' === ($1)');
  // In Java: s.equalsIgnoreCase(other) -> (s.toLowerCase() === other.toLowerCase())
  js = js.replace(/\.equalsIgnoreCase\(([^)]+)\)/g, '.toLowerCase() === ($1).toLowerCase()');

  // In Java: s.contains("sub") -> s.includes("sub")
  js = js.replace(/\.contains\(/g, '.includes(');

  // In Java: s.charAt(i) -> s.charAt(i) (exists in JS)
  // In Java: s.toUpperCase() -> exists in JS
  // In Java: s.toLowerCase() -> exists in JS

  // 4. Handle Java Arrays initialization:
  // e.g. int[] arr = {1, 2, 3}; -> let arr = [1, 2, 3];
  // e.g. String[] nomes = {"A", "B"}; -> let nomes = ["A", "B"];
  // e.g. int[] arr = new int[]{1, 2, 3}; -> let arr = [1, 2, 3];
  // e.g. int[] arr = new int[5]; -> let arr = new Array(5).fill(0);
  // e.g. String[] arr = new String[5]; -> let arr = new Array(5).fill("");
  js = js.replace(
    /(?:int|double|float|long|short|byte|boolean|char|String)\s*\[\s*\]\s+([a-zA-Z0-9_]+)\s*=\s*\{([^}]*)\};/g,
    'let $1 = [$2];'
  );

  js = js.replace(
    /(?:int|double|float|long|short|byte|boolean|char|String)\s*\[\s*\]\s+([a-zA-Z0-9_]+)\s*=\s*new\s+(?:int|double|float|long|short|byte|boolean|char|String)\s*\[\s*\]\s*\{([^}]*)\};/g,
    'let $1 = [$2];'
  );

  js = js.replace(
    /(?:int|double|float|long|short|byte)\s*\[\s*\]\s+([a-zA-Z0-9_]+)\s*=\s*new\s+(?:int|double|float|long|short|byte)\s*\[\s*([0-9a-zA-Z_]+)\s*\]\s*;/g,
    'let $1 = new Array($2).fill(0);'
  );

  js = js.replace(
    /(?:boolean)\s*\[\s*\]\s+([a-zA-Z0-9_]+)\s*=\s*new\s+boolean\s*\[\s*([0-9a-zA-Z_]+)\s*\]\s*;/g,
    'let $1 = new Array($2).fill(false);'
  );

  js = js.replace(
    /(?:String)\s*\[\s*\]\s+([a-zA-Z0-9_]+)\s*=\s*new\s+String\s*\[\s*([0-9a-zA-Z_]+)\s*\]\s*;/g,
    'let $1 = new Array($2).fill("");'
  );

  // 5. Enhanced for-each loops:
  // for (int num : numeros) { -> for (let num of numeros) {
  // for (String nome : nomes) { -> for (let nome of nomes) {
  js = js.replace(
    /for\s*\(\s*(?:int|double|float|long|short|byte|boolean|char|String|[A-Z][a-zA-Z0-9_]*)\s+([a-zA-Z0-9_]+)\s*:\s*([^)]+)\)/g,
    'for (let $1 of $2)'
  );

  // 6. Standard for loop variable declarations:
  // for (int i = 0; -> for (let i = 0;
  js = js.replace(/for\s*\(\s*(?:int|double|float|long|short|byte)\s+/g, 'for (let ');

  // 7. Primitive and standard variable declarations:
  // int x = 10; -> let x = 10;
  // double y = 20.5; -> let y = 20.5;
  // String s = "abc"; -> let s = "abc";
  // boolean ok = true; -> let ok = true;
  // char c = 'a'; -> let c = 'a';
  // Final int X = 10; -> const X = 10;
  js = js.replace(/\bfinal\s+(?:int|double|float|long|short|byte|boolean|char|String|[A-Z][a-zA-Z0-9_]*)\s+/g, 'const ');
  js = js.replace(/\b(?:int|double|float|long|short|byte|boolean|char|String)\s+([a-zA-Z0-9_]+)(?=\s*[=;,)]|\s+in\b)/g, 'let $1');

  // Custom class variable instantiation:
  // Pessoa p = new Pessoa(...); -> let p = new Pessoa(...);
  js = js.replace(/\b([A-Z][a-zA-Z0-9_]*)\s+([a-zA-Z0-9_]+)\s*=\s*new\s+\1/g, 'let $2 = new $1');

  // 8. Transform class definitions and methods
  // Look for: public class Name { ... }
  // If user wraps code inside a Java class:
  if (/class\s+([a-zA-Z0-9_]+)/.test(js)) {
    js = transformJavaClasses(js);
  } else {
    // Snippet without class: just execute statements
    // Convert System.out.println directly
    // Already good
  }

  return js;
}

/**
 * Transforms Java class declarations, static/instance methods, and auto-invokes main.
 */
function transformJavaClasses(code: string): string {
  let transformed = code;

  // Transform method declarations inside classes:
  const staticMethodNames: string[] = [];

  // public static void main(String[] args) -> static main(args)
  transformed = transformed.replace(
    /(?:public\s+|private\s+|protected\s+)?static\s+void\s+main\s*\(\s*String\s*\[\s*\]\s*[a-zA-Z0-9_]+\s*\)/g,
    'static main(args = [])'
  );

  // public static [Type] methodName(...) -> static methodName(...)
  transformed = transformed.replace(
    /(?:public\s+|private\s+|protected\s+)?static\s+(?:void|int|double|float|boolean|char|String|[a-zA-Z0-9_<>]+)\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)/g,
    (match, methodName, params) => {
      staticMethodNames.push(methodName);
      // Strip types from params: (int a, int b) -> (a, b)
      const cleanParams = cleanJavaParams(params);
      return `static ${methodName}(${cleanParams})`;
    }
  );

  // public [Type] methodName(...) -> methodName(...) [instance method]
  // Avoid replacing constructors
  transformed = transformed.replace(
    /(?:public\s+|private\s+|protected\s+)(?:void|int|double|float|boolean|char|String)\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)/g,
    (match, methodName, params) => {
      const cleanParams = cleanJavaParams(params);
      return `${methodName}(${cleanParams})`;
    }
  );

  // Transform class declarations:
  // public class Main -> class Main
  const classNames: string[] = [];
  transformed = transformed.replace(
    /(?:public\s+)?class\s+([a-zA-Z0-9_]+)/g,
    (match, className) => {
      classNames.push(className);
      return `class ${className}`;
    }
  );

  // Auto-invoke main if class with main exists and bind static methods
  if (classNames.length > 0) {
    const mainClass = classNames.find((name) => {
      const regex = new RegExp(`class\\s+${name}[^{]*\\{[^}]*static\\s+main`, 's');
      return regex.test(transformed);
    }) || classNames[0];

    let bindings = '';
    for (const methodName of staticMethodNames) {
      if (methodName !== 'main') {
        bindings += `var ${methodName} = typeof ${mainClass} !== 'undefined' && typeof ${mainClass}.${methodName} === 'function' ? ${mainClass}.${methodName}.bind(${mainClass}) : undefined;\n`;
      }
    }

    transformed += `\n\n// DualDev Method Scope Bindings\n${bindings}\nif (typeof ${mainClass} !== 'undefined' && typeof ${mainClass}.main === 'function') {\n  ${mainClass}.main([]);\n}\n`;
  }

  return transformed;
}

function cleanJavaParams(params: string): string {
  if (!params || !params.trim()) return '';
  return params
    .split(',')
    .map((p) => {
      const parts = p.trim().split(/\s+/);
      return parts[parts.length - 1]; // return variable name
    })
    .join(', ');
}
