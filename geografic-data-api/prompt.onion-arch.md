Você é um agente especialista em desenvolvimento de software. Sua tarefa é implementar uma aplicação nova.

## Stack

- Node.JS v24:
  - Para projeto API:
    - Todas dependências de libraries deve ser na última versão estável disponível. 
    - Deve fornecer endpoint `/docs` para disponibilizar o contrato OpenAI.
    - Utilize Prisma para abstrair acesso a banco de dados.
- Criar projeto de testes unitários.
- PostgreSQL: Como banco de dados principal.
- Kafka: Para gerar eventos de CRUD.

## Instruções gerais

- **Diretórios**:
  - Código da aplicação deve ficar na pasta `src/`.
  - Código de testes unitários deve ficar na pasta `tests/`.
  - Char case para nomes de arquivos e basta deve ser **kebab-case**.
- **Crie um projeto estruturado em Onion Architecture**:
  - Se baseie em boas práticas de desenvolvimento de software.
  - Deve possuir as camadas: `domain`, `application`, `infrastructure` e `api`.
- **API:**
  - Cada entidade deve está em um arquivo de router específico.
  - API requer autenticação por token JWT. Configure o filtro global de autenticação da aplicação, mas deixe-o comentado.
  - Rotas de exclusão devem atualizar o atributo `Active` da entidade para `false`.
  - Rotas devem respeitar o padrão:
    - POST `/` para `Create`.
    - GET `/` para `List`.
    - GET `/:id` para `GetById`.
    - PUT `/:id` para `Update`.
    - DELETE `/:id` para `Remove`.
  - **Rotas:**
    - Utilizar kebab-case (sempre lowercase).
    - Não adicionar prefixo `/api/`.
    - Resource name das rotas devem ser no plural, exemplo: `/cidades/...`.
    - O método list deve permitir filtrar por qualquer atributo.
- **Kafka:**
  - Gere eventos no Kafka para ações de create/update/delete.
  - Sempre adicionar o "Id" da entidade, como "Key" da mensagem do Kafka.
  - Nome do tópico segue o padrão `geografia.<nome-entidade>`. Exemplo: "geografia.pais"
  - Produzir mensagem com método `Produce()` invés de `ProduceAsync()`.
    - Adicionar método de callback logando eventuais falhas.
- **Design de código:**
  - Crie arquivos de extension methods para realizar conversões de DTOs com nome no padrão "<entidade>-mappers".
  - Adicione documentation para todos os campos das entidades de dominio e DTO, e sempre que útil nos demais locais.
  - Não gere código de migrations.
- **Outras instruções:**
  - Não criar arquivo `.gitignore`.

## Sobre a aplicação

O objetivo dessa aplicação é gerenciar dados geográficos para um ecosistema de microserviços.

Ela deve fornecer APIs REST para CRUD (create, read, update, delete).

## Entidades

Abaixo definição de entidades e seus atributos.
Isso será o domínio da aplicação e para cada uma deve existir a classe de entidade, model para request/response de api, e por fim executar o comando para criar o migration em meu computador.

### Pais

**Objetivo**: Gerenciar cadastro de paises.

| Atributo      | Data Type | Descrição                                                                    | Exemplo           |
|---------------|-----------|------------------------------------------------------------------------------|-------------------|
| Id            | String(2) | Udentificador único, sendo no formato do código ISO 3166-1 alpha-2 (Padrão). | "BR", "US"        |
| Nome          | String    | Nome comum do país.                                                          | "Brasil"          |
| CodigoISO3    | String(3) | Código ISO 3166-1 alpha-3.                                                   | "BRA"             |
| CodigoONU     | Integer   | Código numérico da ONU.                                                      | 076               |
| CodigoDDI     | String    | DDI (Código de discagem).                                                    | "+55"             |
| CodigoMoeda   | String(3) | Código da moeda (ISO 4217).                                                  | "BRL"             |
| DefaultLocale | String    | Idioma principal.                                                            | "pt-BR", "en-US"  |
| Ativo         | Boolean   | Indicador se o registro ainda é válido                                       | "true" ou "false" |

### Estado

**Objetivo**: Gerenciar cadastro de estados.

| Atributo | Data Type   | Descrição                                                                 | Exemplo                                           |
|----------|-------------|---------------------------------------------------------------------------|---------------------------------------------------|
| Id       | String(6)   | Identificador único, sendo no formato do código ISO 3166-2                | "BR-SP", "BR-SC", "BR-PR", "US-AK"                |
| PaisId   | String(2)   | Referência a entidade `Pais`.                                             |                                                   |
| Nome     | String      | Nome do estado.                                                           | "São Paulo", "Santa Catarina", "Paraná", "Alaska" |
| Sigla    | String      | Sigla nacional do estado (Código ISO 3166-2 sem a parte inicial do país). | "SP", "SC", "PR", "AK"                            |
| Tipo     | Enum/String | Tipo da subdivisão no país.                                               | "STATE", "PROVINCE", "DEPARTMENT", "DISTRICT".    |
| Ativo    | Boolean     | Indicador se o registro ainda é válido.                                   | "true" ou "false"                                 |

**Category**

Nem todos os países usam "Estado". O Canadá usa Províncias, a Colômbia usa Departamentos e a Argentina, Províncias.
Para evitar conflitos de siglas (como "SP" que poderia existir em outro país), utilize o padrão ISO 3166-2.

Exemplo: Em vez de apenas SP, o código único seria BR-SP.

### Cidade

**Objetivo**: Gerenciar cadastro de cidades.

| Atributo     | Data Type | Descrição                              | Exemplo           |
|--------------|-----------|----------------------------------------|-------------------|
| Id           | UUID      | Identificador único.                   | uuid-v7           | 
| EstadoId     | String(6) | Referência a `Estado`.                 |                   | 
| Nome         | String    | Nome da cidade.                        |                   | 
| CodigoPostal | String    | CEP/Zip local.                         |                   | 
| Latitude     | Decimal   | Coordenada para mapas e logística.     |                   | 
| Longitude    | Decimal   | Coordenada para mapas e logística.     |                   | 
| Ativo        | Boolean   | Indicador se o registro ainda é válido | "true" ou "false" |
