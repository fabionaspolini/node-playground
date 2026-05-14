# Setup do Banco de Dados

## Pré-requisitos

- PostgreSQL instalado e rodando
- psql (cliente PostgreSQL) disponível no PATH

## Passos para configurar o banco de dados

### 1. Criar o banco de dados

```bash
createdb simple_api_db
```

Ou usando psql:
```bash
psql -U postgres -c "CREATE DATABASE simple_api_db;"
```

### 2. Verificar a configuração do .env

Certifique-se de que o arquivo `.env` contém a URL de conexão correta:
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/simple_api_db"
```

**Nota:** Ajuste `usuario`, `senha`, `host` e `porta` conforme sua configuração do PostgreSQL.

### 3. Executar as migrations

```bash
npm run prisma:migrate
```

Este comando irá:
- Criar a tabela `cities` no banco de dados
- Gerar o cliente Prisma

### 4. (Opcional) Verificar no Prisma Studio

```bash
npm run prisma:studio
```

Esta interface gráfica permite gerenciar os dados do banco de dados visualmente.

## Troubleshooting

### Erro: "connect ECONNREFUSED 127.0.0.1:5432"

Isto significa que o PostgreSQL não está rodando. Inicie o PostgreSQL:

**Linux (sem systemd):**
```bash
pg_ctl start
```

**Linux (com systemd):**
```bash
sudo systemctl start postgresql
```

**macOS:**
```bash
brew services start postgresql
```

**Windows:**
- Abra o PostgreSQL Application
- Ou inicie o serviço via Services do Windows

### Erro: "password authentication failed for user"

Verifique se as credenciais no `.env` estão corretas:
```bash
psql -U postgres -h localhost
```

Se você receber um erro de autenticação, significa que a senha está incorreta.

### Erro: "database 'simple_api_db' does not exist"

Execute novamente:
```bash
createdb simple_api_db
npm run prisma:migrate
```

### Erro: "relation 'cities' does not exist"

Execute as migrations novamente:
```bash
npm run prisma:migrate
```

## Resetar o banco de dados

Para limpar e fazer um reset completo do banco:

```bash
# Resetar e recriar o banco (perderá todos os dados)
npx prisma migrate reset
```

## Configurações avançadas

Para usar um banco de dados remoto, modifique a `DATABASE_URL` no `.env`:

**AWS RDS:**
```
DATABASE_URL="postgresql://usuario:senha@seu-endpoint.rds.amazonaws.com:5432/simple_api_db"
```

**Railway:**
```
DATABASE_URL="postgresql://usuario:senha@seu-host.railway.app:5432/simple_api_db"
```

**Local com porta alternativa:**
```
DATABASE_URL="postgresql://postgres:password@localhost:5433/simple_api_db"
```

## Verificar conexão

Para testar a conexão sem conhecer todos os detalhes, execute:

```bash
npx prisma db execute --stdin
```

E digite:
```sql
SELECT 1;
```

Se receber `1` como resultado, a conexão está funcionando.

