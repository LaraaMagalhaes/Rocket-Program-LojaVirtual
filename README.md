# Loja Virtual - Rocket Program

## Descrição

Projeto de uma loja virtual para o desafio FullStack do Rocket Program. A aplicação possui funcionalidades de autenticação, cadastro de produtos, gerenciamento de carrinho de compras e integração frontend/backend.

---

## 🎯 **Tecnologias Utilizadas**

### Backend:

* Node.js
* Express
* SQLite
* Prisma ORM
* JWT (Json Web Token) para autenticação
* Bcrypt para criptografia de senha

### Frontend:

* AngularJS
* JavaScript
* HTML
* Bootstrap
* CSS

### Testes de API:

* Postman

---

## ⚙️ **Configurações Iniciais**

1️⃣ Clone o repositório:

```bash
    git clone https://github.com/LaraaMagalhaes/Rocket-Program-LojaVirtual
```

2️⃣ Instale as dependências para o **Backend**:

```bash
    cd loja-backend
    npm install
```

3️⃣ Instale as dependências para o **Frontend**:

```bash
    cd loja-frontend
    npm install
```

4️⃣ Crie o arquivo `.env` dentro da pasta **loja-backend** com o seguinte conteúdo:

```env
DATABASE_URL="file:./dev.db"
ACCESS_KEY="CHAVE_DE_ACESSO"
```

---

## 🚀 **Executando o Projeto**

### 1️⃣ Iniciando o Backend:

Abra um terminal e rode os seguintes comandos:

```bash
cd loja-backend
npm run dev
```

* O servidor estará disponível em `http://localhost:3000`
* A API estará pronta para receber requisições no Postman.

### 2️⃣ Iniciando o Frontend:

Abra um segundo terminal e execute:

```bash
cd loja-frontend
npx live-server
```

* A aplicação estará disponível em `http://127.0.0.1:8080`
* Login padrão: admin/admin123

---

## 🧪 **Testando a API (Postman)**

1️⃣ Faça a requisição em login para obter o Token JWT.

2️⃣ Use o Token em requisições autenticadas:

* Adicione um Header: `Authorization` com o valor `Bearer SEU_TOKEN` nas requisições.

3️⃣ Endpoints principais:

* `POST /auth/login`: Autenticação.
* `GET /products`: Listar produtos.
* `POST /products`: Adicionar produto (requer token).
* `GET /cart`: Listar itens do carrinho (requer token).
* `POST /cart`: Adicionar item ao carrinho (requer token).
* `PUT /cart/:id`: Atualizar quantidade no carrinho (requer token).
* `DELETE /cart/:id`: Remover item do carrinho (requer token).

---

## 📌 **Autor**

Projeto desenvolvido por Lucas de Matos Oliveira e Anna Lara Magalhaes Monteiro durante o desafio JS Avançado do Rocket Program.
