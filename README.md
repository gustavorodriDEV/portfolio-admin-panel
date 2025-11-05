# ⚛️ Painel Administrativo (Frontend) - Portfólio Pessoal

Este é o repositório do frontend (React) para o painel de controle do meu portfólio pessoal.

Esta aplicação funciona como um **CMS (Content Management System)** privado, permitindo-me gerenciar dinamicamente o conteúdo exibido no meu site de portfólio (como projetos, habilidades e informações de contato). Ela foi construída para consumir a [API REST em Java/Spring Boot](https://github.com/gustavorodriDEV/portfolio/tree/main/backend) que desenvolvi.

## 🖥️ Demonstração Visual

Abaixo, uma demonstração rápida das principais telas da aplicação, como a tela de login e o dashboard de gerenciamento de projetos.

**[COLOQUE AQUI UM GIF OU SCREENSHOTS DA SUA APLICAÇÃO]**

*(Ex: Mostre a tela de login, o dashboard principal e um formulário de cadastro de projeto)*

---

## ✨ Funcionalidades Principais

* **Autenticação Segura:** Tela de login para acesso restrito ao painel, consumindo o endpoint de autenticação (com Spring Security e JWT) do backend.
* **Gerenciamento de Projetos (CRUD):** Interface completa para Criar, Ler, Atualizar e Deletar os projetos que são exibidos no portfólio.
* **Gerenciamento de Habilidades (CRUD):** Funcionalidade para adicionar, editar ou remover tecnologias e habilidades.
* **[SEU TEXTO AQUI]:** (Ex: Visualização de Mensagens, Gerenciamento de Experiência, etc. Adicione outras funcionalidades que seu painel tenha).

---

## 🛠️ Tecnologias Utilizadas

* **React:** Biblioteca principal para a construção da interface de usuário.
* **React Router DOM:** Para gerenciamento das rotas da aplicação (ex: `/login`, `/dashboard`, `/projetos`).
* **Axios:** (Ou Fetch API) Para realizar as requisições HTTP à API backend.
* **[SEU TEXTO AQUI]:** (Ex: Styled-Components, Material-UI, TailwindCSS) - Como você estilizou a aplicação?
* **[SEU TEXTO AQUI]:** (Ex: Context API, Redux) - Como você gerenciou o estado global (se aplicável)?

---

## 🔗 Conexão com o Backend (API)

Esta aplicação frontend foi desenvolvida especificamente para consumir a API REST que construí em **Java e Spring Boot**. O repositório do backend, contendo toda a lógica de negócio e conexão com o banco de dados, pode ser encontrado aqui:

* **Link do Repositório Backend:** [https://github.com/gustavorodriDEV/portfolio/tree/main/backend](https://github.com/gustavorodriDEV/portfolio/tree/main/backend)

---

## 🚀 Como Executar o Projeto

**Pré-requisito:** Para que o frontend funcione, a [API backend](https://github.com/gustavorodriDEV/portfolio/tree/main/backend) deve estar em execução localmente (geralmente na porta `8080`).
