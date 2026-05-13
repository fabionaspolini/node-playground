/*                         8
 *                      /      \
 *                     /        \
 *                    /          \
 *                   /            \
 *                  /              \
 *                 /                \
 *                4                  12
 *              /   \             /     \
 *             /     \           /       \
 *            /       \         /         \
 *           2         6       10         14
 *          / \       / \     /  \       /  \
 *         1   3     5   7    9   11    13  15
 *
 * - A árvore sempre estará ordenada
 * - Resultado esperado:
 * 1. A partir do root, localizar enéssimo maior elemento
 * 2. Retornar o elemento
 */

import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Função para construir uma árvore balanceada a partir de um array ordenado
function buildBalancedTree(arr) {
    if (arr.length === 0) return null;

    const mid = Math.floor(arr.length / 2);
    const node = new Node(arr[mid]);

    node.left = buildBalancedTree(arr.slice(0, mid));
    node.right = buildBalancedTree(arr.slice(mid + 1));

    return node;
}

// Lógica para encontrar o n-ésimo maior elemento
function findNthLargest(root, state) {
    if (!root || state.count >= state.n) return;

    // 1. Vai para a direita (valores maiores)
    findNthLargest(root.right, state);

    // 2. Processa a raiz
    state.count++;
    if (state.count === state.n) {
        state.result = root.value;
        return;
    }

    // 3. Vai para a esquerda (valores menores)
    findNthLargest(root.left, state);
}

// --- Execução ---

const valores = Array.from({ length: 15 }, (_, i) => i + 1);
const root = buildBalancedTree(valores);

const rl = readline.createInterface({ input, output });

try {
    console.log("Árvore Binária de 1 a 15 criada com sucesso!");
    const resposta = await rl.question('Qual o "n-ésimo" maior valor que você deseja encontrar? (1-15): ');
    const n = parseInt(resposta);

    if (isNaN(n) || n < 1 || n > 15) {
        console.log("Por favor, informe um número entre 1 e 15.");
    } else {
        const state = { n: n, count: 0, result: null };
        findNthLargest(root, state);
        console.log(`O ${n}º maior valor é: ${state.result}`);
    }
} finally {
    rl.close();
}