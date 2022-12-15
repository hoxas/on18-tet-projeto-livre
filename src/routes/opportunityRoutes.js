const routes = require("express").Router();
const controller = require("../controllers/opportunityController");
const tryCatchWrapper = require("../utils/tryCatchWrapper");

/**
 * @swagger
 * tags:
 *  name: Vagas
 *  description: API para CRUD de vagas
 */

/**
 * @swagger
 * /jobs:
 *  get:
 *    summary: Retorna a lista de todas as vagas
 *    tags: [Vagas]
 *    responses:
 *      200:
 *        description: Lista de vagas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/Opportunity"
 *
 * /jobs/{companyId}:
 *  get:
 *    summary: Retorna as vagas da empresa por ID
 *    tags: [Vagas]
 *    parameters:
 *      - in: path
 *        name: companyId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID da empresa
 *    responses:
 *      200:
 *        description: Vagas da empresa retornadas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/Opportunity"
 *      404:
 *        description: Empresa não encontrada
 *      500:
 *        description: Erro de servidor
 *  post:
 *    summary: Salva uma vaga nova na empresa por ID
 *    tags: [Vagas]
 *    parameters:
 *      - in: path
 *        name: companyId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID da empresa
 *    requestBody:
 *      required: true,
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#components/schemas/Opportunity"
 *    responses:
 *      201:
 *        description: A vaga foi salva com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Opportunity"
 *      404:
 *        description: Empresa não encontrada
 *      500:
 *        description: Erro de servidor
 *
 * /jobs/{companyId}/{id}:
 *  get:
 *    summary: Retorna a vaga por ID
 *    tags: [Vagas]
 *    parameters:
 *      - in: path
 *        name: companyId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID da empresa
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID da vaga
 *    responses:
 *      200:
 *        description: Vaga encontrada e retornada
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Opportunity"
 *      404:
 *        description: Vaga não foi encontrada
 *      500:
 *        description: Erro de servidor
 *  delete:
 *    summary: Remove a vaga por ID
 *    tags: [Vagas]
 *    parameters:
 *      - in: path
 *        name: companyId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID da empresa
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID da vaga
 *    responses:
 *      200:
 *        description: Vaga encontrada e excluida com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Opportunity"
 *      404:
 *        description: Vaga não foi encontrada
 *      500:
 *        description: Erro de servidor
 *  patch:
 *    summary: Atualiza a vaga por id
 *    tags: [Vagas]
 *    parameters:
 *      - in: path
 *        name: companyId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID da empresa
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID da vaga
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Opportunity"
 *    responses:
 *      200:
 *        description: Vaga encontrada e alterada com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Opportunity"
 *      404:
 *        description: Vaga não foi encontrada
 *      500:
 *        description: Erro de servidor
 *
 */

routes.get("/", tryCatchWrapper(controller.get));
routes.get("/:companyId", tryCatchWrapper(controller.getByCompanyId));
routes.post("/:companyId", tryCatchWrapper(controller.postByCompanyId));
routes.get("/:companyId/:id", tryCatchWrapper(controller.getByJobId));
routes.delete("/:companyId/:id", tryCatchWrapper(controller.deleteById));
routes.patch("/:companyId/:id", tryCatchWrapper(controller.patchById));

module.exports = routes;
