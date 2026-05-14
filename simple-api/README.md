# API CRUD de Cidades

API Node.js para gerenciar cidades usando Express, Prisma e PostgreSQL.

## Requisitos

- Node.js 16+
- PostgreSQL 12+
- npm ou yarn

## Instalação

1. **Instalar dependências:**
```bash
npm install
```

2. **Configurar variáveis de ambiente:**

Edite o arquivo `.env` com suas credenciais do PostgreSQL:
```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/simple_api_db"
PORT=3000
```

3. **Criar o banco de dados (se não existir):**
```bash
createdb simple_api_db
```

4. **Executar as migrations do Prisma:**
```bash
npm run prisma:migrate
```

## Uso

### Iniciar o servidor

**Modo produção:**
```bash
npm start
```

**Modo desenvolvimento (com auto-reload):**
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

### Consultar Prisma Studio (gerenciar dados)
```bash
npm run prisma:studio
```

## Endpoints da API

### 1. Criar uma nova cidade
**POST** `/cities`

Corpo da requisição:
```json
{
  "name": "São Paulo",
  "state": "SP"
}
```

Resposta (201):
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "São Paulo",
  "state": "SP",
  "createdAt": "2024-01-01T10:00:00.000Z",
  "updatedAt": "2024-01-01T10:00:00.000Z"
}
```

### 2. Listar todas as cidades
**GET** `/cities`

Resposta (200):
```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Rio de Janeiro",
    "state": "RJ",
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T10:00:00.000Z"
  },
  {
    "id": "223e4567-e89b-12d3-a456-426614174001",
    "name": "São Paulo",
    "state": "SP",
    "createdAt": "2024-01-01T11:00:00.000Z",
    "updatedAt": "2024-01-01T11:00:00.000Z"
  }
]
```

### 3. Obter uma cidade por ID
**GET** `/cities/{id}`

Resposta (200):
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Rio de Janeiro",
  "state": "RJ",
  "createdAt": "2024-01-01T10:00:00.000Z",
  "updatedAt": "2024-01-01T10:00:00.000Z"
}
```

Resposta (404): Se a cidade não existir

### 4. Atualizar uma cidade
**PUT** `/cities/{id}`

Corpo da requisição (ambos os campos são opcionais):
```json
{
  "name": "Rio de Janeiro",
  "state": "RJ"
}
```

Resposta (200):
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Rio de Janeiro",
  "state": "RJ",
  "createdAt": "2024-01-01T10:00:00.000Z",
  "updatedAt": "2024-01-01T12:00:00.000Z"
}
```

### 5. Deletar uma cidade
**DELETE** `/cities/{id}`

Resposta (200):
```json
{
  "message": "Cidade deletada com sucesso",
  "city": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Rio de Janeiro",
    "state": "RJ",
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

## Estrutura do Projeto

```
simple-api/
├── src/
│   ├── index.js              # Arquivo principal da aplicação
│   ├── models/
│   │   ├── CreateCityDTO.js  # DTO para criação de cidades
│   │   ├── UpdateCityDTO.js  # DTO para atualização de cidades
│   │   └── CityResponseDTO.js # DTO para resposta de cidades
│   └── routes/
│       └── cityRoutes.js     # Rotas CRUD de cidades
├── prisma/
│   └── schema.prisma         # Esquema do banco de dados
├── .env                      # Variáveis de ambiente
├── package.json              # Dependências e scripts
└── README.md                 # Este arquivo
```

## DTOs (Data Transfer Objects)

A API utiliza DTOs para transferir dados entre a camada HTTP e a camada de persistência:

- **CreateCityDTO**: Representa dados para criar uma nova cidade
- **UpdateCityDTO**: Representa dados para atualizar uma cidade (opcionais)
- **CityResponseDTO**: Representa a resposta com dados completos da cidade

Cada DTO possui métodos:
- `fromObject()`: Cria um DTO a partir de um objeto
- `toObject()`: Converte o DTO para um objeto simples

## Esquema do Banco de Dados

### Tabela: cities

| Campo   | Tipo      | Descrição                      |
|---------|-----------|--------------------------------|
| id      | UUID      | ID único da cidade (primária)  |
| name    | VARCHAR   | Nome da cidade                 |
| state   | VARCHAR   | Sigla do estado (UF) - 2 chars |
| createdAt | TIMESTAMP | Data de criação              |
| updatedAt | TIMESTAMP | Data da última atualização   |

## Tratamento de Erros

A API retorna erros estruturados em JSON:

```json
{
  "error": "Descrição do erro"
}
```

Códigos HTTP utilizados:
- `200`: Sucesso (GET, PUT, DELETE)
- `201`: Criado com sucesso (POST)
- `400`: Requisição inválida
- `404`: Recurso não encontrado
- `500`: Erro interno do servidor

## Exemplo de Uso com cURL

```bash
# Criar uma nova cidade
curl -X POST http://localhost:3000/cities \
  -H "Content-Type: application/json" \
  -d '{"name":"Brasília","state":"DF"}'

# Listar todas as cidades
curl http://localhost:3000/cities

# Obter uma cidade específica
curl http://localhost:3000/cities/123e4567-e89b-12d3-a456-426614174000

# Atualizar uma cidade
curl -X PUT http://localhost:3000/cities/123e4567-e89b-12d3-a456-426614174000 \
  -H "Content-Type: application/json" \
  -d '{"name":"Brasília Novacap"}'

# Deletar uma cidade
curl -X DELETE http://localhost:3000/cities/123e4567-e89b-12d3-a456-426614174000
```

## Licença

ISC

