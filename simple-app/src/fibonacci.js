/*
  Para funcionar "import readline from 'node:readline/promises" sem renomear arquivo para ".mjs",
  é necessário configurar "type": "module" no "package.json". 
 */

import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

// Configura a interface de entrada e saída
const rl = readline.createInterface({ input, output });

try {
    const resposta = await rl.question('Quantos elementos da sequência você deseja? ');
    const n = parseInt(resposta);

    if (isNaN(n) || n <= 0) {
        console.log('Por favor, insira um número inteiro positivo.');
    } else {
        const fib = [0, 1];

        // Cálculo da sequência
        for (let i = 2; i < n; i++) {
            fib[i] = fib[i - 1] + fib[i - 2];
        }

        // Ajuste para casos onde n=1
        const sequenciaResultado = fib.slice(0, n);
        const ultimoElemento = sequenciaResultado.at(-1);

        // Saída formatada
        console.log(`Final da sequência: ${ultimoElemento}`);
        console.log(`Sequência completa: ${sequenciaResultado.join(' ')}`);
    }
} finally {
    rl.close();
}