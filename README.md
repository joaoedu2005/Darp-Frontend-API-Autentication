# 🧩 Darp Frontend — Auth API Integration

Este projeto foi desenvolvido como parte de um **desafio técnico de Front-End**, com o objetivo de criar uma interface moderna e funcional para integração com uma **API REST de autenticação** fornecida previamente (Auth API).  
O sistema permite o **registro e login de usuários** de forma intuitiva, utilizando **Angular + TailwindCSS**, com integração total ao backend em **NestJS**.

---

## 🚀 Tecnologias utilizadas

### **Frontend**
- [Angular 17+](https://angular.io/) — Framework principal do projeto  
- [TypeScript](https://www.typescriptlang.org/) — Tipagem estática e segurança no código  
- [Tailwind CSS](https://tailwindcss.com/) — Estilização rápida e responsiva  
- [RxJS](https://rxjs.dev/) — Gerenciamento de assinaturas e streams  
- [Toast personalizado](https://angular.io/guide/standalone-components) — Sistema leve de notificações sem dependências externas  

### **Backend (fornecido no desafio)**
- [NestJS](https://nestjs.com/) — API REST simples de autenticação  
- Armazenamento **em memória** (sem banco de dados)  
- Endpoints:
  - `POST /auth/register` → Cria usuário  
  - `GET /user` → Lista todos  
  - `GET /user/:username` → Busca por username  
  - `DELETE /user/:id` → Remove usuário  

---

## 📸 Interface (UI)

O design foi criado para ser **limpo, fluido e responsivo**, com uma transição suave entre as telas de **Login** e **Cadastro**, incluindo:

- Layout dividido: imagem ilustrativa + card de autenticação  
- Campos interativos com **feedback visual e hover states**  
- Botões sociais: *Sign in with Google / Apple*  
- Toasters dinâmicos para mensagens de sucesso ou erro  

---

## 🧠 Funcionalidades principais

| Recurso | Descrição |
|----------|------------|
| 🧾 **Registro** | Integração direta com o endpoint `/auth/register` |
| 🔐 **Login Simulado** | Verifica existência do usuário via `/user` |
| 🪄 **Toasters Reativos** | Sistema leve de feedback (success / error) |
| 🪶 **Transição Animada** | Mudança visual suave entre login e registro |
| 🎨 **Tailwind Ready** | UI responsiva e de fácil personalização |

---

## ⚙️ Como rodar o projeto

### 🖥️ Backend (Auth API)

git clone https://github.com/joaoedu2005/auth-api.git
cd auth-api
npm install
npm run start:dev

A API estará disponível em:
🔗 http://localhost:3000
🔧 Documentação Swagger: http://localhost:3000/api


### 💻 Frontend

git clone https://github.com/joaoedu2005/Darp-Frontend-API-Autentication.git
cd Darp-Frontend-API-Autentication
npm install
npm start


O frontend roda por padrão em:
🌐 http://localhost:4200
