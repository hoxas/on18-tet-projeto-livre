const routes = require("express").Router();
const controller = require("../controllers/workerController");
const tryCatchWrapper = require("../utils/tryCatchWrapper");

/**
 * @swagger
 * components:
 *  schemas:
 *    Worker:
 *      type: object
 *      required:
 *        - first_name
 *        - last_name
 *        - email
 *        - location
 *        - birth_date
 *      properties:
 *        _id:
 *          type: string
 *          description: Id auto-gerado do trabalhador
 *        first_name:
 *          type: string
 *          description: Primeiro nome do trabalhador
 *        last_name:
 *          type: string
 *          description: Sobrenome do trabalhador
 *        email:
 *          type: string
 *          description: Email do trabalhador
 *        location:
 *          type: string
 *          description: Localização do trabalhador
 *        birth_date:
 *          type: string
 *          description: Data de nascimento do trablhador
 *        experience:
 *          type: array
 *          description: Lista de experiencias
 *          items:
 *            $ref: "#/components/schemas/Experience"
 *        education:
 *          type: array
 *          description: Lista de formações
 *          items:
 *            $ref: "#/components/schemas/Education"
 *        skills:
 *          type: array
 *          description: Lista de habilidades
 *          items:
 *            $ref: "#/components/schemas/Skill"
 *      example:
 *        _id: 21321sda231q
 *        first_name: Ligia
 *        last_name: Ramos
 *        email: ligiaram@hotmail.com
 *        location: São Paulo, SP
 *        birth_date: 05/01/1984
 *        experience: [
 *          {
 *            company: 'Empresa A',
 *            role: 'Dev Jr',
 *            start_date: '08/12/2020',
 *            end_date: '08/12/2022',
 *            description: 'Eu atuei e trabalhei lá',
 *          }
 *        ]
 *        education: [
 *          {
 *            school: 'Escola B',
 *            degree: 'Ensino Médio',
 *            start_date: '09/09/1998',
 *            end_date: '09/09/2001',
 *            description: 'Eu cursei lá',
 *          }
 *        ]
 *        skills: [
 *          {
 *            skill: 'Java',
 *            level: 'Avançado',
 *          }
 *        ]
 *
 *    Experience:
 *      type: object
 *      required:
 *        - company
 *        - role
 *        - start_date
 *      properties:
 *        company:
 *          type: string
 *          description: Nome do trabalhador
 *        role:
 *          type: string
 *          description: Cargo
 *        start_date:
 *          type: string
 *          description: Data de início
 *        end_date:
 *          type: string
 *          description: Data de término
 *        description:
 *          type: string
 *          description: Descrição das atribuições do cargo
 *
 *    Education:
 *      type: object
 *      required:
 *        - school
 *        - degree
 *        - start_date
 *        - end_date
 *      properties:
 *        school:
 *          type: string
 *          description: Nome da instituição de ensino
 *        degree:
 *          type: string
 *          description: Tipo de formação
 *        start_date:
 *          type: string
 *          description: Data de início da formação
 *        end_date:
 *          type: string
 *          description: Data de término da formação
 *        description:
 *          type: string
 *          description: Descrição adicional da formação
 *
 *    Skill:
 *      type: object
 *      required:
 *        - skill
 *        - level
 *      properties:
 *        skill:
 *          type: string
 *          description: Nome da habilidade
 *        level:
 *          type: string
 *          description: Nível da habilidade
 *
 */

/**
 * @swagger
 * tags:
 *  name: Trabalhadores
 *  description: API para CRUD de trabalhadores
 */

/**
 * @swagger
 * /workers:
 *  get:
 *    summary: Retorna a lista de todos os trabalhadores
 *    tags: [Trabalhadores]
 *    responses:
 *      200:
 *        description: Lista dos trabalhadores
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/Worker"
 *  post:
 *    summary: Salva um trabalhador novo no banco de dados
 *    tags: [Trabalhadores]
 *    requestBody:
 *      required: true,
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Worker"
 *    responses:
 *      200:
 *        description: O trabalhador foi salvo com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Worker"
 *      400:
 *        description: Erro de parâmetros
 *      500:
 *        description: Erro de servidor
 *
 * /workers/{id}:
 *  get:
 *    summary: Retorna o trabalhador por ID
 *    tags: [Trabalhadores]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID do trabalhador
 *    responses:
 *      200:
 *        description: Trabalhador encontrado e retornado por ID
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Worker"
 *      404:
 *        description: Trabalhador não foi encontrado
 *  delete:
 *    summary: Remove o trabalhador por ID
 *    tags: [Trabalhadores]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID do trabalhador
 *    responses:
 *      200:
 *        description: O trabalhador foi excluido com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Worker"
 *      404:
 *        description: O trabalhador não foi encontrado
 *  patch:
 *    summary: Atualiza o trabalhador por ID
 *    tags: [Trabalhadores]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID do trabalhador
 *    requestBody:
 *      required: true,
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Worker"
 *    responses:
 *      200:
 *        description: O trabalhador foi atualizado com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Worker"
 *      404:
 *        description: Trabalhador não encontrado
 *      500:
 *        description: Erro de servidor
 */

routes.get("/", tryCatchWrapper(controller.get));
routes.post("/", tryCatchWrapper(controller.post));
routes.get("/:id", tryCatchWrapper(controller.getById));
routes.delete("/:id", tryCatchWrapper(controller.deleteById));
routes.patch("/:id", tryCatchWrapper(controller.patchById));

module.exports = routes;
