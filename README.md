# Emprega Dev

## Table of Contents

- [Sobre](#about)
- [Estrutura do Projeto](#file_structure)
- [Começando](#getting_started)
- [Uso](#usage)
- [Tecnologias](#technologies)

## Sobre <a name = "about"></a>

API para conectar trabalhadoras com vagas de empresas.

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

As rotas disponíveis podem ser acessadas com mais detalhes na documentação no link:

### https://on18-tet-projeto-livre.vercel.app/

---

As rotas são:
| Rota | Função | Métodos Aceitos |
|----------------------------|----------------------------------------------------|--------------------|
| /companies | Retorna todas as empresas ou posta empresa nova | GET, POST |
| /companies/{empresaId} | Retorna empresa por ID, deleta ou atualiza | GET, DELETE, PATCH |
| /jobs | Retorna a lista de todas as vagas disponíveis | GET |
| /jobs/{empresaId} | Retorna as vagas da empresa ou posta uma vaga nova | GET, POST |
| /jobs/{empresaId}/{vagaId} | Retorna a vaga por ID, deleta ou atualiza | GET, DELETE, PATCH |
| /workers | Retorna todos os trabalhadores ou posta um novo | GET, POST |
| /workers/{trabalhadorId} | Retorna um trabalhador por ID, deleta ou atualiza | GET, DELETE, PATCH |

## Tecnologias <a name = "technologies"></a>

Tecnologias usadas no projeto:

```
node
npm
express
cors
dotenv
mongoose
swagger-jsdoc
swagger-ui-express
vercel (para deploy)
```
