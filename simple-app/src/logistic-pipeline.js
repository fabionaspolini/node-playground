/*

1. A Base de Dados: Crie um array com 10 pacotes. Cada pacote é um objeto com id, peso (kg) e destino (ex: "SP", "RJ", "MG").

2. O Processador Assíncrono: Crie uma função chamada processarPacote(pacote).
- Ela deve retornar uma Promise.
- Simule um atraso (IO-bound) usando setTimeout. O tempo de atraso deve ser de 100ms por quilo do pacote (ex: 2kg = 200ms).
- Ao terminar, ela deve retornar uma string: [OK] Pacote ${id} enviado para ${destino}.

3. A Lógica de Agrupamento:
- Agrupe os pacotes por destino.
- Para cada destino, processe os pacotes em série (um após o outro), para não sobrecarregar o "caminhão" daquele estado.
- Porém, os diferentes destinos devem ser processados em paralelo (os pacotes de "SP" e "RJ" podem ser processados ao mesmo tempo).

4. O Relatório Final:
- Ao final de tudo, exiba o tempo total que a simulação levou e o peso total processado.

*/

import { setTimeout } from 'node:timers/promises';
import { performance } from 'node:perf_hooks';

// 1. Base de Dados (Mock de pacotes)
const pacotes = [
    { id: 1, peso: 2, destino: 'SP' },
    { id: 2, peso: 5, destino: 'SP' },
    { id: 3, peso: 1, destino: 'RJ' },
    { id: 4, peso: 3, destino: 'RJ' },
    { id: 5, peso: 2, destino: 'MG' },
    { id: 6, peso: 4, destino: 'MG' },
    { id: 7, peso: 1, destino: 'SP' },
    { id: 8, peso: 2, destino: 'PR' },
    { id: 9, peso: 3, destino: 'PR' },
    { id: 10, peso: 2, destino: 'RJ' },
];

// 2. Processador Assíncrono (Simulador de IO)
async function processarPacote(pacote) {
    const tempoDeEspera = pacote.peso * 1000; // 1000ms por quilo
    await setTimeout(tempoDeEspera);
    return `[OK] Pacote ${pacote.id.toString().padStart(2, '0')} enviado para ${pacote.destino} (${tempoDeEspera}ms)`;
}

// 3. Orquestração do Pipeline
async function iniciarLogistica() {
    console.log('🚀 Iniciando operação logística...\n');
    const tempoInicial = performance.now();

    // Agrupamento por destino usando a feature do Node 24
    const gruposPorDestino = Object.groupBy(pacotes, p => p.destino);

    // Criamos uma lista de "Tarefas de Caminhão"
    // Cada destino é processado em paralelo em relação aos outros
    const promessasDosCaminhoes = Object
        .entries(gruposPorDestino)
        .map(async ([destino, pacotesDoEstado]) => {
            console.log(`🚚 Caminhão de ${destino} carregado com ${pacotesDoEstado.length} pacotes.`);
    
            // Dentro do estado, processamos em SÉRIE (um await por vez)
            for (const pacote of pacotesDoEstado) {
                const resultado = await processarPacote(pacote);
                console.log(resultado);
            }
            
            console.log(`     Fim de viagems para ${destino}`)
    
            return `✅ Entrega de ${pacotesDoEstado.length} pacotes concluída em ${destino}`;
        });

    // Aguarda todos os "caminhões" (promessas) finalizarem
    const resumos = await Promise.all(promessasDosCaminhoes);

    // 4. Relatório Final
    const tempoFinal = performance.now();
    const pesoTotal = pacotes.reduce((acc, p) => acc + p.peso, 0);
    const tempoTotalSegundos = ((tempoFinal - tempoInicial) / 1000).toFixed(2);

    console.log('\n--- RELATÓRIO FINAL ---');
    resumos.forEach(r => console.log(r));
    console.log(`\n📦 Peso Total Processado: ${pesoTotal}kg`);
    console.log(`⏱️ Tempo Total de Simulação: ${tempoTotalSegundos} segundos`);
}

// Execução
await iniciarLogistica();