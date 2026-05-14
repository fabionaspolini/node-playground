Custo do prompt.

Code agent: qwen-code-cli
Model hosting: AWS Bedrock

## Prompt para implementar repo do zero

╭──────────────────────────────────────────────────────────────────────────────────────────────────╮
│                                                                                                  │
│  Estatísticas de Modelo Para Nerds                                                               │
│                                                                                                  │
│  Métrica                     qwen.qwen3-coder-next                                               │
│  ──────────────────────────────────────────────────────────────────────────────────────────────  │
│  API                                                                                             │
│  Solicitações                153                                                                 │
│  Erros                       0 (0.0%)                                                            │
│  Latência Média              10.3s                                                               │
│                                                                                                  │
│  Tokens                                                                                          │
│  Total                       10.122.121                                                          │
│    ↳ Prompt                  10.057.967                                                          │
│    ↳ Saída                   64.154                                                              │
│                                                                                                  │
╰──────────────────────────────────────────────────────────────────────────────────────────────────╯

**Pricing**

| Model                         | Input $ per mi | Output $ per mi |
|-------------------------------|----------------|-----------------|
| qwen.qwen3-coder-30b-a3b-v1:0 | 0,15           | 0,60            |
| qwen.qwen3-32b-v1:0           | 0,15           | 0,60            |
| qwen.qwen3-next-80b-a3b       | 0,15           | 1,20            |
| qwen.qwen3-coder-next         | 0,50           | 1,20            |

**Total qwen.qwen3-coder-next**

Input: 10.122.121 / 1.000.000 * 0,50 = $ 5,06
Output: 64.154 / 1.000.000 * 1,20 = $ 0,076
Total: $ 5,13

**Análises**

- Prompt não estava muito elaborado para projeto node.
- Agente gastou muitas interações resolvendo problemas da codificação gerada.
- Erros de nomenclatura de campos e breaking changes nas versões mais recentes de influenciaram.

## continue session: Refatoraçao de exclusão das controllers

**Incremental.**

╭──────────────────────────────────────────────────────────────────────────────────────────────────╮
│                                                                                                  │
│  Estatísticas de Modelo Para Nerds                                                               │
│                                                                                                  │
│  Métrica                     qwen.qwen3-coder-next                                               │
│  ──────────────────────────────────────────────────────────────────────────────────────────────  │
│  API                                                                                             │
│  Solicitações                176                                                                 │
│  Erros                       0 (0.0%)                                                            │
│  Latência Média              9.9s                                                                │
│                                                                                                  │
│  Tokens                                                                                          │
│  Total                       12.418.515                                                          │
│    ↳ Prompt                  12.345.917                                                          │
│    ↳ Saída                   72.598                                                              │
│                                                                                                  │
╰──────────────────────────────────────────────────────────────────────────────────────────────────╯

## new session: refatoração para corrigir rota de put

╭──────────────────────────────────────────────────────────────────────────────────────────────────╮
│                                                                                                  │
│  Estatísticas da Sessão                                                                          │
│                                                                                                  │
│  Resumo da Interação                                                                             │
│  ID da Sessão:               80fb3580-5490-4045-a18b-b2818278a069                                │
│  Chamadas de Ferramenta:     11 ( ✓ 11 x 0 )                                                     │
│  Taxa de Sucesso:            100.0%                                                              │
│  Acordo do Usuário:          100.0% (1 revisado)                                                 │
│  Alterações de Código:       +12 -9                                                              │
│                                                                                                  │
│  Desempenho                                                                                      │
│  Tempo Total:                4m 9s                                                               │
│  Agente Ativo:               1m 6s                                                               │
│    » Tempo de API:           34.7s (52.6%)                                                       │
│    » Tempo de Ferramenta:    31.3s (47.4%)                                                       │
│                                                                                                  │
│                                                                                                  │
│  Uso do Modelo                          Reqs     Tokens de Tokens de Saída                       │
│                                                  Entrada                                         │
│  ─────────────────────────────────────────────────────────────────────────                       │
│  qwen.qwen3-coder-next                     8        178.427          1.713                       │
│                                                                                                  │
╰──────────────────────────────────────────────────────────────────────────────────────────────────╯