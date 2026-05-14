# Quick Start Guide

## Setup Rápido (5 minutos)

### 1. Instalar dependências (já feito):
```bash
npm install
```

### 2. Configurar Banco de Dados PostgreSQL:

**Pré-requisito:** PostgreSQL deve estar rodando

Criar o banco de dados:
```bash
createdb simple_api_db
```

### 3. Verificar e Atualizar .env:

O arquivo `.env` já foi criado com:
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/simple_api_db"
```

**Ajuste se necessário** conforme suas credenciais do PostgreSQL.

### 4. Executar Migrations:

```bash
npm run prisma:migrate
```

### 5. Iniciar o Servidor:

**Modo desenvolvimento:**
```bash
npm run dev
```

Ou modo produção:
```bash
npm start
```

O servidor estará em: http://localhost:3000

### 6. Testar a API:

```bash
# Health check
curl http://localhost:3000/health

# Criar uma cidade
curl -X POST http://localhost:3000/cities \
  -H "Content-Type: application/json" \
  -d '{"name":"Rio de Janeiro","state":"RJ"}'

# Listar cidades
curl http://localhost:3000/cities
```

## Documentação Completa

- `README.md` - Documentação da API
- `DATABASE_SETUP.md` - Configuração do banco de dados
- `REQUESTS.postman_collection.json` - Exemplos para Postman/Insomnia

## Scripts Disponíveis

```bash
npm start              # Executar servidor
npm run dev           # Executar com auto-reload
npm run prisma:migrate # Criar/atualizar migrations
npm run prisma:push   # Sincronizar schema com banco
npm run prisma:studio # Abrir interface gráfica do Prisma
```

## Estrutura

```
src/
├── index.js                    # Aplicação principal
├── models/
│   ├── CreateCityDTO.js       # DTO para criação
│   ├── UpdateCityDTO.js       # DTO para atualização
│   └── CityResponseDTO.js     # DTO para resposta
└── routes/
    └── cityRoutes.js          # Rotas CRUD

prisma/
└── schema.prisma              # Modelo de dados
```

## Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/cities` | Criar cidade |
| GET | `/cities` | Listar cidades |
| GET | `/cities/:id` | Obter cidade |
| PUT | `/cities/:id` | Atualizar cidade |
| DELETE | `/cities/:id` | Deletar cidade |

## Problemas Comuns

### PostgreSQL não está rodando
```bash
# Linux
sudo systemctl start postgresql

# macOS
brew services start postgresql
```

### Porta 3000 já em uso
Use variável de ambiente:
```bash
PORT=3001 npm start
```

### Erro de conexão com banco
Verifique `.env` e execute:
```bash
npm run prisma:migrate
```

