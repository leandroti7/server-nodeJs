# Plano de Estudos: API de Vídeos com Node.js

Este plano usa como base a API de vídeos construída neste projeto, com Node.js, Fastify, PostgreSQL, variáveis de ambiente e deploy no Render.

## Objetivo final

Evoluir a aplicação para uma API de vídeos completa, com:

- TypeScript
- PostgreSQL e Prisma
- Autenticação JWT
- Validação e tratamento de erros
- Testes automatizados
- Arquitetura organizada
- Docker
- Deploy no Render
- CI/CD com GitHub Actions

## Etapa 1: Consolidar a API atual

### Estudar

- HTTP e REST
- Métodos HTTP e status codes
- Headers, JSON, query params e route params
- Validação de dados
- Tratamento de erros
- Fastify e ciclo de vida das requisições

### Praticar

- Validar `title`, `description`, `duration` e `url`
- Retornar `404` quando o vídeo não existir
- Padronizar respostas de erro
- Adicionar paginação e filtros
- Criar `GET /health`
- Documentar as rotas

## Etapa 2: APIs nativas do Node.js

### Estudar

- `node:http`
- `node:url`
- `node:process`
- `node:events`
- `node:os`
- `node:path`
- `node:buffer`
- `node:util`
- Timers e variáveis de ambiente

### Praticar

- Criar uma versão simples da API usando apenas `node:http`
- Ler configurações com `process.env`
- Trabalhar com caminhos usando `node:path`
- Criar um sistema simples de logs
- Comparar a implementação nativa com Fastify

O objetivo é entender as abstrações do Fastify, não substituir o framework.

## Etapa 3: FileSystem

### Estudar

- `node:fs`
- `node:fs/promises`
- Leitura e escrita de arquivos
- Diretórios
- Arquivos JSON
- Operações assíncronas
- Tratamento de erros

### Praticar

- Exportar vídeos para um arquivo JSON
- Criar um arquivo de logs
- Fazer backup dos dados
- Ler configurações de um arquivo
- Criar um endpoint de exportação

Prefira as APIs assíncronas, como `readFile` e `writeFile` de `node:fs/promises`.

## Etapa 4: Streams e Buffers

### Estudar

- Readable streams
- Writable streams
- Transform streams
- `pipe`
- Backpressure
- Buffers

### Praticar

- Exportar vídeos usando streams
- Processar arquivos grandes sem carregá-los totalmente na memória
- Criar upload e download de arquivos
- Criar uma transformação simples de dados

## Etapa 5: Crypto

### Estudar

- Hash
- HMAC
- Criptografia simétrica e assimétrica
- UUID
- Bytes aleatórios
- Assinaturas digitais

### Praticar

- Gerar tokens aleatórios
- Criar identificadores seguros
- Implementar recuperação de senha
- Entender a assinatura usada por JWT

Para senhas, use `bcrypt` ou `argon2`. Não armazene senhas em texto puro nem use SHA-256 diretamente como substituto de um algoritmo de senha.

## Etapa 6: TypeScript

### Estudar

- Tipos básicos
- `type` e `interface`
- Union types
- Generics
- Classes
- Modificadores de acesso
- Tipagem de funções
- Tipagem de requisições e respostas
- `tsconfig.json`
- Compilação

### Praticar

- Migrar a API para TypeScript gradualmente
- Criar o tipo `Video`
- Tipar controllers, services e repositories
- Tipar erros e respostas
- Configurar desenvolvimento e produção

Exemplo:

```ts
type Video = {
    id: string;
    title: string;
    description: string;
    duration: number;
    url: string;
};
```

Comece por uma camada, como os repositories ou services, em vez de converter tudo de uma vez.

## Etapa 7: SQL e Prisma

### SQL

Estude:

- `SELECT`, `INSERT`, `UPDATE` e `DELETE`
- `WHERE`, `LIKE`, `ORDER BY` e `LIMIT`
- `JOIN`
- Índices
- Chaves primárias e estrangeiras
- Transações
- Migrações

### Prisma

Estude:

- `schema.prisma`
- Models
- Migrations
- Prisma Client
- Relacionamentos
- Seed

### Praticar

- Migrar a tabela `videos` para Prisma
- Criar a tabela `users`
- Relacionar usuários e vídeos
- Substituir a camada `PostgresDatabase` pelo Prisma Repository

Não pule SQL. O ORM simplifica o código, mas não substitui o entendimento do banco.

## Etapa 8: Testes automatizados

Use Vitest ou Jest. Para um projeto moderno em JavaScript ou TypeScript, Vitest é uma opção adequada.

### Estudar

- Testes unitários
- Testes de integração
- Mocks
- Fixtures
- Cobertura
- Testes de API

### Praticar

- Testar criação de vídeos
- Testar busca, atualização e exclusão
- Testar validações
- Testar respostas `400`, `404` e `500`
- Testar repositories com banco de teste

Ordem sugerida:

1. Regras de negócio
2. Repositories
3. Endpoints
4. Integração com PostgreSQL

## Etapa 9: SOLID e arquitetura

### Estudar

- SOLID
- MVC
- Service Layer
- Repository Pattern
- Injeção de dependência
- Arquitetura modular
- Clean Architecture

### Estrutura sugerida

```text
routes
  -> controllers
    -> services
      -> repositories
        -> database
```

Responsabilidades:

- `Controller`: recebe a requisição e envia a resposta
- `Service`: contém as regras de negócio
- `Repository`: acessa o banco
- `Schema`: valida os dados
- `Database`: gerencia a conexão e as consultas

Evite criar abstrações sem necessidade. A arquitetura deve tornar o código mais claro, não apenas maior.

## Etapa 10: Autenticação com JWT

### Estudar

- Cadastro de usuários
- Hash de senha com `bcrypt` ou `argon2`
- Login
- Access tokens
- Expiração
- Hooks e middleware
- Autenticação e autorização
- Propriedade dos recursos

### Praticar

- Criar `POST /users`
- Criar `POST /login`
- Proteger `POST`, `PUT` e `DELETE /videos`
- Permitir alterações apenas pelo proprietário do vídeo
- Manter `GET /videos` público inicialmente

Fluxo:

```text
Cadastro -> Login -> JWT -> Rota protegida -> Usuário autenticado
```

## Etapa 11: Docker

### Estudar

- Imagens e containers
- `Dockerfile`
- `.dockerignore`
- Volumes
- Networks
- Docker Compose
- Variáveis de ambiente

### Praticar

- Criar uma imagem para a API
- Executar PostgreSQL localmente com Docker Compose
- Configurar a API para acessar o banco pelo Compose
- Criar um ambiente separado para testes

Use PostgreSQL via Docker no desenvolvimento e o Neon em produção, se essa continuar sendo sua estratégia.

## Etapa 12: Express e NestJS

### Express

Estude:

- Middleware
- Rotas
- Controllers
- Tratamento de erros
- Integração com JWT e Prisma

O Express deve ser estudado para compreender outro padrão popular do ecossistema Node. Não é necessário migrar imediatamente a aplicação atual.

### NestJS

Estude depois de TypeScript, SOLID e injeção de dependência:

- Modules
- Controllers
- Providers
- Services
- Guards
- Pipes
- Interceptors
- Testes

Depois, crie uma segunda versão da API de vídeos com NestJS para comparar as arquiteturas.

## Etapa 13: Deploy e CI/CD

### Estudar

- Branches e fluxo de Git
- GitHub Actions
- Variáveis de ambiente
- Health checks
- Logs
- Migrações em produção
- Deploy no Render
- Rollback

### Praticar

- Configurar `GET /health`
- Executar testes no GitHub Actions
- Executar lint e typecheck no pipeline
- Bloquear deploy quando os testes falharem
- Configurar variáveis no Render
- Executar migrações durante o deploy
- Monitorar os logs da aplicação

Fluxo esperado:

```text
git push
    -> testes
    -> lint e typecheck
    -> build
    -> deploy no Render
    -> health check
```

## Ordem recomendada

1. Consolidar a API atual e HTTP
2. APIs nativas do Node.js
3. FileSystem
4. Streams e Buffers
5. Crypto
6. TypeScript
7. SQL
8. Prisma
9. Testes automatizados
10. SOLID e arquitetura
11. JWT
12. Docker
13. Express
14. NestJS
15. Deploy e CI/CD

## Projeto final

Evolua esta API para uma plataforma de vídeos com:

- Usuários e autenticação JWT
- CRUD de vídeos
- Controle de proprietário dos vídeos
- TypeScript
- Prisma e PostgreSQL
- Validação
- Testes automatizados
- Docker para desenvolvimento
- Deploy no Render
- GitHub Actions
- Documentação das rotas
