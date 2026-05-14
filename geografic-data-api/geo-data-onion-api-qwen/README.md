# Geo Data API - API de Dados Geográficos

API REST desenvolvida em Node.js com TypeScript usando Onion Architecture para gerenciar dados geográficos (países, estados e cidades).

## Stack

- **Node.js** v24
- **TypeScript** 6.0
- **Express.js** 5.2
- **Prisma** 5.22 (ORM para PostgreSQL)
- **KafkaJS** 2.2 (para eventos)
- **Swagger** 6.2 (documentação OpenAPI)
- **Jest** 30 (testes unitários)

## Estrutura do Projeto (Onion Architecture)

```
geo-data-onion-api-qwen/
├── src/
│   ├── Domain/              # Camada de domínio (entidades, regras de negócio)
│   │   ├── Entities/      # Entidades de domínio (Pais, Estado, Cidade)
│   │   ├── Enums/         # Enumerações
│   │   └── Repositories/  # Interfaces de repositórios
│   ├── Application/       # Camada de aplicação (services, dtos, mappers)
│   │   ├── Dtos/          # Data Transfer Objects
│   │   ├── Services/      # Services de negócio
│   │   ├── Extensions/    # Extension methods
│   │   └── Contracts/     # Contratos da camada de aplicação
│   ├── Infrastructure/    # Camada de infraestrutura (database, kafka, repos)
│   │   ├── Database/      # Contexto do banco de dados
│   │   ├── Kafka/         # Produtor Kafka
│   │   ├── Repositories/  # Implementações de repositórios
│   │   └── UnitOfWork/    # Gerenciamento de transações
│   └── API/               # Camada de API (controllers, routers, middleware)
│       ├── Controllers/   # Controllers da API
│       ├── Routers/       # Routers dos endpoints
│       └── Middleware/    # Middlewares (auth, docs)
├── prisma/
│   └── schema.prisma      # Schema do banco de dados
├── tests/                 # Testes unitários
├── dist/                  # Código compilado
├── src/main.ts            # Ponto de entrada da aplicação
├── package.json
├── tsconfig.json
└── jest.config.js
```

## Endpoints da API

### Países
- `POST /cidades` - Cria um novo país
- `GET /cidades/{id}` - Busca país por ID (ISO 3166-1 alpha-2)
- `GET /cidades` - Lista todos os países (com filtros)
- `PUT /cidades` - Atualiza um país
- `DELETE /cidades/{id}` - Remove (soft delete) um país

### Estados
- `POST /estados` - Cria um novo estado
- `GET /estados/{id}` - Busca estado por ID (ISO 3166-2)
- `GET /estados` - Lista todos os estados (com filtros)
- `PUT /estados` - Atualiza um estado
- `DELETE /estados/{id}` - Remove (soft delete) um estado

### Cidades
- `POST /cidades` - Cria uma nova cidade
- `GET /cidades/{id}` - Busca cidade por ID (UUID)
- `GET /cidades` - Lista todas as cidades (com filtros)
- `PUT /cidades` - Atualiza uma cidade
- `DELETE /cidades/{id}` - Remove (soft delete) uma cidade

### Documentação
- `GET /docs` ou `GET /api-docs` - Documentação Swagger/OpenAPI

## Configuração

### Prerequisites

- Node.js v24+
- PostgreSQL
- Kafka (opcional, para eventos)

### Instalação

```bash
npm install
```

### Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env` e configure:

```env
PORT=3000
NODE_ENV=development

DATABASE_URL="postgresql://postgres:password@localhost:5432/geo_data_db?schema=public"

JWT_SECRET=seu-segredo-super-secreto-aqui-change-in-production
JWT_EXPIRES_IN=1h

KAFKA_BROKERS=localhost:9092
KAFKA_CLIENT_ID=geo-data-api
```

### Rodar Migrations do Prisma

```bash
npx prisma migrate dev
```

### Gerar Prisma Client

```bash
npx prisma generate
```

### Rodar o Servidor

```bash
npm run dev
```

O servidor será iniciado em `http://localhost:3000`

### Rodar os Testes

```bash
npm test
npm run test:coverage
```

### Compilar para Produção

```bash
npm run build
npm start
```

## Eventos Kafka

A API gera eventos para as seguintes ações:

| Tópico | Ações | Chave |
|--------|-------|-------|
| `geografia.pais` | create, update, delete | ID do país (ISO 3166-1 alpha-2) |
| `geografia.estado` | create, update, delete | ID do estado (ISO 3166-2) |
| `geografia.cidade` | create, update, delete | ID da cidade (UUID) |

## Soft Delete

Todas as entidades possuem um atributo `ativo` que é utilizado para soft delete. Ao remover um registro, o campo `ativo` é definido como `false` em vez de excluir fisicamente o dado do banco.

## Autenticação

A API usa JWT para autenticação. O middleware de autenticação está configurado no `main.ts` mas está comentado por padrão para facilitar o desenvolvimento. Para ativar:

1. Configure a variável `JWT_SECRET` no arquivo `.env`
2. Descomente o middleware JWT no arquivo `src/main.ts`

## Documentação.swagger

A documentação OpenAPI está disponível em `/docs` após iniciar o servidor. A documentação é gerada automaticamente usando `swagger-jsdoc`.

## Licença

ISC
