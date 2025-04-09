<h1 align="center"><img src="./assets/icon.svg" width="22" /> Refund API</h1>

<p align="center">💸 Uma API RESTful para controle e gerenciamento de pedidos de reembolso, construída com Node.js, TypeScript e Express.
  <br/><br/>
  <img src="https://img.shields.io/github/last-commit/joschonarth/refund-api?style=for-the-badge&color=1F8459&labelColor=1C1E26" alt="last-commit">
  <img src="https://img.shields.io/github/languages/top/joschonarth/refund-api?style=for-the-badge&color=1F8459&labelColor=1C1E26" alt="top-language">
  <img src="https://img.shields.io/github/languages/count/joschonarth/refund-api?style=for-the-badge&color=1F8459&labelColor=1C1E26" alt="languages-count">
</p>

## 📑 Índice

- [📖 Visão Geral](#-visão-geral)
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [⚙️ Funcionalidades](#️-funcionalidades)
- [🚀 Como Executar o Projeto](#-como-executar-o-projeto)
  - [📋 Pré-requisitos](#-pré-requisitos)
  - [🔧 Instalação](#-instalação)
  - [▶️ Execução](#️-execução)
- [📡 Rotas da Aplicação](#-rotas-da-aplicação)
- [🌐 Front-End](#-front-end)
- [🤝 Contribuições](#-contribuições)
- [⭐ Apoie este Projeto](#-apoie-este-projeto)
- [📞 Contato](#-contato)

## 📖 Visão Geral

Refund é uma aplicação completa para gerenciamento de pedidos de reembolso, permitindo que usuários façam upload de comprovantes e acompanhem seus pedidos. Este repositório contém o back-end da aplicação, uma API RESTful robusta e segura, construída com Node.js e TypeScript, utilizando uma stack moderna e modularizada.

## 🛠️ Tecnologias Utilizadas

- 🟩 Node.js - Ambiente de execução JavaScript no servidor.
- 🟦 TypeScript - Superset do JavaScript com tipagem estática.
- ⚙️ Express - Framework web minimalista e flexível.
- 🧩 Prisma - ORM moderno para manipulação de banco de dados.
- 🗃️ SQLite - Banco de dados leve e embutido.
- 📦 Zod - Validação de esquemas de dados.
- 🔐 JWT - Autenticação via tokens seguros.
- 🔑 Bcrypt - Criptografia de senhas.
- 🌐 CORS - Compartilhamento de recursos entre origens.
- 📤 Multer - Upload de arquivos multipart/form-data.
- 📁 Dotenv - Gerenciamento de variáveis de ambiente.
- 🧹 ESLint - Padronização e análise de código.

## ⚙️ Funcionalidades

### 👤 Usuários

- **Criar usuário**: Registra um novo usuário na aplicação.
- **Login**: Autentica um usuário e retorna um token JWT.

### 💸 Reembolsos

- **Criar pedido de reembolso**: Cadastra uma nova solicitação com dados e comprovante.
- **Listar reembolsos**: Retorna todos os reembolsos solicitados pelo usuário.
- **Visualizar reembolso por ID**: Detalha um reembolso específico.

### 📎 Uploads

- **Enviar arquivos**: Realiza upload de arquivos como comprovantes de reembolso.
- **Buscar arquivos por ID**: Retorna o arquivo enviado.

## 🚀 Como Executar o Projeto

### 📋 Pré-requisitos

- 🟩 [Node.js 20](https://nodejs.org/en/download/)
- 📦 [npm 10](https://www.npmjs.com/)

### 🔧 Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/joschonarth/refund-api.git
    ```

2. Acesse o diretório do projeto:

    ```bash
    cd refund-api
    ```

3. Instale as dependências:

    ```bash
    npm install
    ```

### ▶️ Execução

1. Crie um arquivo `.env` a partir do exemplo:

    ```bash
    cp .env.example .env
    ```

    Edite o arquivo `.env` para configurar as variáveis de ambiente necessárias.

2. Execute as migrações do Prisma:

    ```bash
    npx prisma migrate dev
    ```

3. Inicie a API:

    ```bash
    npm run dev
    ```

A aplicação estará disponível em: [http://localhost:3333](http://localhost:3333)

## 📡 Rotas da Aplicação

### 👤 Criar Usuário

Registra um novo usuário no sistema.

- **Método:** ``POST``  
- **URL:** `/users`
- **Role** `employee`

- **Exemplo de Requisição:**

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "123456"
}
```

### 🔐 Login

Autentica o usuário e retorna um token JWT.

- **Método:** ``POST``  
- **URL:** `/sessions`
- **Role** `employee`

- **Exemplo de Requisição:**

```json
{
  "email": "johndoe@example.com",
  "password": "123456"
}
```

- **Exemplo de Resposta:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "eac522fb-6c33-4676-9925-22fd483e45bf",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "role": "employee",
    "createdAt": "2025-03-29T19:27:29.365Z",
    "updatedAt": "2025-03-29T19:27:29.365Z"
  }
}
```

### 💸 Criar Reembolso

Cadastra uma nova solicitação de reembolso.

- **Método:** ``POST``  
- **URL:** `/refunds`  
- **Autenticação:** Requer token JWT no header `Authorization: Bearer`
- **Role** `employee`

- **Exemplo de Requisição:**

```json
{
  "name": "Reembolso Uber",
  "category": "transport",
  "amount": 45.90,
  "filename": "8a744cc981b36e5c2734-comprovante.png"
}
```

- **Exemplo de Resposta:**

```json
{
  "id": "65cc4911-0868-4954-aef8-f058e410d513",
  "name": "Reembolso Uber",
  "amount": 45.9,
  "category": "transport",
  "filename": "8a744cc981b36e5c2734-comprovante.png",
  "userId": "de837ea6-8080-4506-9e5a-0f7e6df7d1cf",
  "createdAt": "2025-04-09T22:21:51.700Z",
  "updatedAt": "2025-04-09T22:21:51.700Z"
}
```

#### 📋 Listar Reembolsos

Retorna todos os reembolsos do usuário autenticado.

- **Método:** ``GET``  
- **URL:** `/refunds`  
- **Autenticação:** Requer token JWT no header `Authorization: Bearer`
- **Role** `manager`

- **Exemplo de Resposta:**

```json
{
  "refunds": [
    {
      "id": "65cc4911-0868-4954-aef8-f058e410d513",
      "name": "Reembolso Uber",
      "amount": 45.9,
      "category": "transport",
      "filename": "8a744cc981b36e5c2734-comprovante.png",
      "userId": "de837ea6-8080-4506-9e5a-0f7e6df7d1cf",
      "createdAt": "2025-04-09T22:21:51.700Z",
      "updatedAt": "2025-04-09T22:21:51.700Z",
      "user": {
        "id": "eac522fb-6c33-4676-9925-22fd483e45bf",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "role": "employee",
        "createdAt": "2025-03-29T19:27:29.365Z",
        "updatedAt": "2025-03-29T19:27:29.365Z"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "perPage": 10,
    "totalRecords": 1,
    "totalPages": 1
  }
}
```

#### 🔎 Ver Reembolso por ID

Exibe detalhes de um reembolso específico.

- **Método:** GET  
- **URL:** `/refund/:id`  
- **Autenticação:** Requer token JWT no header `Authorization: Bearer`
- **Role** `manager`

- **Exemplo de Resposta:**

```json
{
  "id": "65cc4911-0868-4954-aef8-f058e410d513",
  "name": "Reembolso Uber",
  "amount": 45.9,
  "category": "transport",
  "filename": "8a744cc981b36e5c2734-comprovante.png",
  "userId": "de837ea6-8080-4506-9e5a-0f7e6df7d1cf",
  "createdAt": "2025-04-09T22:21:51.700Z",
  "updatedAt": "2025-04-09T22:21:51.700Z",
  "user": {
    "id": "eac522fb-6c33-4676-9925-22fd483e45bf",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "role": "employee",
    "createdAt": "2025-03-29T19:27:29.365Z",
    "updatedAt": "2025-03-29T19:27:29.365Z"
  }
}
```

### 📤 Enviar Arquivo

Faz upload de um comprovante de reembolso.

- **Método:** POST  
- **URL:** `/uploads`  
- **Formato:** `multipart/form-data` com campo `file`
- **Autenticação:** Requer token JWT no header `Authorization: Bearer`
- **Role** `employee`

- **Exemplo de Resposta:**

```json
{
  "filename": "8a744cc981b36e5c2734-comprovante.png"
}
```

#### 📥 Buscar Arquivo

Busca e retorna um arquivo pelo seu ID.

- **Método:** GET  
- **URL:** `/uploads/:id`
- **Autenticação:** Requer token JWT no header `Authorization: Bearer`
- **Role** `manager`

## 🌐 Front-End

A interface web do Refund oferece uma experiência intuitiva, permitindo que usuários realizem solicitações de reembolso e que gerentes acompanhem e gerenciem as solicitações com facilidade.

👉 Acesse o repositório do front-end [aqui](https://github.com/joschonarth/refund-web).

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests com melhorias ou correções.

## ⭐ Apoie este Projeto

Se este projeto te ajudou ou te inspirou de alguma forma, não esqueça de deixar uma ⭐ no repositório! Isso faz toda a diferença! 🚀

## 📞 Contato

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/joschonarth/)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:joschonarth@gmail.com)
