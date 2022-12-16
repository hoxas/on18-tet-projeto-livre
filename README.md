# Emprega Dev

## Table of Contents

- [Sobre](#about)
- [Estrutura do Projeto](#file_structure)
- [Começando](#getting_started)
- [Usage](#usage)
- [Contributing](../CONTRIBUTING.md)

## Sobre <a name = "about"></a>

API para conectar trabalhadoras com vagas em empresas.

## Estrutura do Projeto <a name = "file_structure"></a>

Projeto feito usando a arquitetura MVC

```
├── src
│   ├── controllers
│   │   ├── companyController.js
│   │   ├── opportunityController.js
│   │   └── workerController.js
│   ├── models
│   │   ├── companyModel.js
│   │   └── workerModel.js
│   ├── public
│   │   └── swagger-ui.css
│   ├── routes
│   │   ├── companyRoutes.js
│   │   ├── opportunityRoutes.js
│   │   └── workerRoutes.js
│   ├── utils
│   │   └── tryCatchWrapper.js
│   └── app.js
├── .env
├── .gitignore
├── config.json
├── index.js
├── package-lock.json
├── package.json
├── README.md
└── vercel.json
```

## Começando <a name = "getting_started"></a>

Essas são as instruções para rodar uma cópia do projeto localmente

### Pré-requisitos

O que você precisa antes de instalar o projeto

```
node >= 16
npm >= 8
git (para clonar o repositório)
```

### Instalando

Clone o repositório

```
git clone https://github.com/hoxas/on18-tet-projeto-livre
```

Entre na pasta do repositório

```
cd on18-tet-projeto-livre
```

Instale módulos node

```
npm install
```

Defina a URI da mongoDB no arquivo .env na raiz do repositório

```
Criar arquivo:
  No Windows:
  type nul > .env

  No Linux:
  touch .env

Dentro do .env coloque:
URI=uri_do_seu_mongodb
```

Rodar servidor

```
npm run start
```

Acesse o servidor no port padrão pela URI e ela te redirecionará para a documentação do Swagger

```
localhost:5000/
```

## Uso <a name = "usage"></a>

Add notes about how to use the system.
