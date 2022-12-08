const routes = require("express").Router();
const controller = require("../controllers/workerController");
const { tryCatchWrapper } = controller;

routes.get("/", tryCatchWrapper(controller.get));
routes.post("/", tryCatchWrapper(controller.post));
routes.get("/:id", tryCatchWrapper(controller.getById));
routes.delete("/:id", tryCatchWrapper(controller.deleteById));
routes.patch("/:id", tryCatchWrapper(controller.patchById));

module.exports = routes;
