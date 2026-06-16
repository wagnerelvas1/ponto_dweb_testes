# Testes Automatizados com Playwright

Este projeto contém a suíte de testes automatizados para a aplicação **Ponto Fácil**, desenvolvida utilizando a ferramenta [Playwright](https://playwright.dev/).

---

## 🚀 Como Executar os Testes

Siga os passos abaixo para configurar e rodar os testes em seu ambiente local:

### 1. Pré-requisitos

Certifique-se de ter instalado em sua máquina:
- **Node.js**
- **NPM**

### 2. Inicialização / Instalação das Dependências

Para inicializar ou atualizar o ambiente do Playwright na raiz deste projeto, execute o seguinte comando:

```bash
npm init playwright@latest
```

*(Se o projeto já estiver inicializado, você também pode instalar as dependências declaradas executando `npm install`).*

### 3. Preparação do Banco de Dados (Projeto "Ponto Fácil")

Para garantir que o banco de dados contenha os dados necessários para a execução dos testes, acesse o diretório do projeto **`Ponto Fácil`** e execute:

```bash
php artisan migrate:fresh --seed
```

### 4. Execução dos Testes

Após a preparação do banco de dados, retorne à raiz deste projeto e execute um dos comandos abaixo:

* **Modo Headless** (sem interface gráfica, ideal para execução rápida):
  ```bash
  npx playwright test
  ```

* **Modo Headed** (com interface gráfica, abrindo o navegador para acompanhar a execução):
  ```bash
  npx playwright test --headed
  ```
