const routes = require("express").Router();
const controller = require("../controllers/companyController.js");
const tryCatchWrapper = require("../utils/tryCatchWrapper");

/**
 * @swagger
 * components:
 *  schemas:
 *    Company:
 *      type: object
 *      required:
 *        - name
 *        - cnpj
 *        - location
 *      properties:
 *        _id:
 *          type: string
 *          description: Id auto-gerado da empresa
 *        name:
 *          type: string
 *          description: Nome da empresa
 *        cnpj:
 *          type: string
 *          description: CNPJ da empresa (deve ser único)
 *        location:
 *          type: string
 *          description: Localidade da empresa
 *        opportunities:
 *          type: array
 *          description: Vagas disponíveis
 *          items:
 *            $ref: "#/components/schemas/Opportunity"
 *      example:
 *        _id: 21321sda231q
 *        name: Farmacon
 *        cnpj: 123123141
 *        location: Remoto
 *        opportunities: [
 *          {
 *            role: 'Dev Jr',
 *            description: 'Aplique abaixo!',
 *            salary: '2000',
 *          }
 *        ]
 *
 *    Opportunity:
 *      type: object
 *      required:
 *        - role
 *        - description
 *      properties:
 *        role:
 *          type: string
 *          description: Cargo a ser preenchido
 *        description:
 *          type: string
 *          description: Descrição do cargo
 *        salary:
 *          type: string
 *          description: Salário do cargo
 *      example: {
 *        _id: 134124142,
 *        role: 'Dev Jr',
 *        description: 'Aplique abaixo!',
 *        salary: '2000',
 *      }
 */

/**
 * @swagger
 * tags:
 *  name: Empresas
 *  description: API para CRUD de empresas
 */

/**
 * @swagger
 * /companies:
 *  get:
 *    summary: Retorna a lista de todas as empresas
 *    tags: [Empresas]
 *    responses:
 *      200:
 *        description: Lista das empresas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/Company"
 *  post:
 *    summary: Salva uma empresa nova no banco de dados
 *    tags: [Empresas]
 *    requestBody:
 *      required: true,
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Company"
 *    responses:
 *      200:
 *        description: A empresa foi salva com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Company"
 *      400:
 *        description: Erro de parâmetros
 *      500:
 *        description: Erro de servidor
 *
 * /companies/{id}:
 *  get:
 *    summary: Retorna empresa por ID
 *    tags: [Empresas]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID da empresa
 *    responses:
 *      200:
 *        description: Empresa encontrada e retornada por ID
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Company"
 *      404:
 *        description: A empresa não foi encontrada
 *  delete:
 *    summary: Remove a empresa por ID
 *    tags: [Empresas]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID da empresa
 *    responses:
 *      200:
 *        description: A empresa foi excluida com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Company"
 *      404:
 *        description: A empresa não foi encontrada
 *  patch:
 *    summary: Atualiza a empresa por ID
 *    tags: [Empresas]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID da empresa
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Company"
 *    responses:
 *      200:
 *        description: A empresa foi atualizada com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Company"
 *      404:
 *        description: Empresa não encontrada
 *      500:
 *        description: Erro de servidor
 */

routes.get("/", tryCatchWrapper(controller.get));
routes.post("/", tryCatchWrapper(controller.post));
routes.get("/:id", tryCatchWrapper(controller.getById));
routes.delete("/:id", tryCatchWrapper(controller.deleteById));
routes.patch("/:id", tryCatchWrapper(controller.patchById));

module.exports = routes;
