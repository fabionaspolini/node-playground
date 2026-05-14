# Geografia Service

## Executar aplicação

```bash
npm install
npx prisma generate
npm run dev
```

## Executar testes

```bash
npm test
```

## Criar migration localmente

```bash
npx prisma migrate dev --name initial
```

## Estrutura

- src/domain
- src/application
- src/infrastructure
- src/api
- tests